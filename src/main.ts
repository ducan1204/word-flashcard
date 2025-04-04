import { NestFactory } from '@nestjs/core';
import { NestExpressApplication } from '@nestjs/platform-express';
import { join } from 'path';
import { AppModule } from './modules/app/app.module';
import { ValidationPipe } from '@nestjs/common';
import { ErrorCode } from './exceptions/error-code';
import { LogicalException } from './exceptions/logical-exception';
import { ValidationError } from 'class-validator';
import { AllExceptionsFilter } from './exceptions/all-exceptions-filter';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);
  app.enableCors();
  app.useStaticAssets(join(__dirname, '..', 'public'));
  app.setBaseViewsDir(join(__dirname, '..', 'views'));
  app.setViewEngine('hbs');
  app.useGlobalPipes(
    new ValidationPipe({
      transform: true,
      exceptionFactory: (errors: ValidationError[]) => {
        const descriptions: Record<string, string[]> = {};

        const getErrorDescription = (error: any, prefix = '') => {
          const currentPrefix = `${prefix ? prefix + '.' : ''}`;

          if (error.constraints) {
            const constraintDescription: string[] = [];
            const constraints = Object.keys(error.constraints);
            for (const constraint of constraints) {
              constraintDescription.push(error.constraints[`${constraint}`]);
            }
            descriptions[`${currentPrefix}${error.property}`] = constraintDescription;
          }

          if (error.children && Array.isArray(error.children)) {
            error.children.forEach((item: any) => {
              getErrorDescription(item, `${currentPrefix}${error.property}`);
            });
          }
        };

        errors.forEach((error) => {
          getErrorDescription(error);
        });
        throw new LogicalException(ErrorCode.VALIDATION_ERROR, 'Validation error.', descriptions);
      },
    }),
  );

  app.useGlobalFilters(new AllExceptionsFilter());

  const port = process.env.PORT || 3000; // Render sets PORT; 3000 is just a local fallback
  console.log(`Starting NestJS on port: ${port}`);
  await app.listen(port, '0.0.0.0');
  console.log(`Application is running on: ${await app.getUrl()}`);
}
bootstrap();
