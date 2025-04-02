export abstract class DomainModel {
    public copyWith(modifyObject: { [P in keyof this]?: this[P] }): this {
        return Object.assign(Object.create(this.constructor.prototype), { ...this, ...modifyObject });
    }

    public abstract toJson(showHidden: boolean): Record<string, any>;
}