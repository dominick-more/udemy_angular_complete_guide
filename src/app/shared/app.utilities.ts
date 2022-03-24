export type Nillable<T> = T | undefined | null;

export const isFunction = (value: unknown): value is Function => {
    return typeof value === 'function';
}

export const isNil = (value: unknown): value is undefined | null => {
    return value === undefined || value === null;
}

export const isNumeric = (value: unknown): value is number => {
    return typeof value === 'number';
}

export const isString = (value: unknown): value is string => {
    return typeof value === 'string';
}

export const isPlainObject = (value: unknown): value is object => {
    return !!value && typeof value === 'object' && value.constructor === Object;
}

export const isNotBlank = (value?: string): value is string => {
    return (value !== undefined) && !/^\s*$/.test(value);
}

export const hasOwnProperty = <T, K extends PropertyKey>(obj: T, prop: K): obj is T & Record<K, unknown> => {
    return Object.prototype.hasOwnProperty.call(obj, prop);
}

export const getDefaultIfNil = <T>(value: Nillable<T>, def: T | (() => T)): T => {
    if (!isNil(value)) {
        return value;
    }
    return isFunction(def) ? def() : def;
}