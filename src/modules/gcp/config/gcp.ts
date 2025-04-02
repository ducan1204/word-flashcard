import { registerAs } from '@nestjs/config';

export default registerAs('gcp', () => ({
    keyFilename: process.env.KEY_FILE_NAME || ',',
}));
