import { WithId } from '../types/type-script';

export const isNil = (value: unknown): value is undefined | null => {
    return value === undefined || value === null;
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

export const isTypeWithId = (value: unknown): value is WithId => {
    return isPlainObject(value) && hasOwnProperty(value, 'id') && typeof value.id === 'string';
}