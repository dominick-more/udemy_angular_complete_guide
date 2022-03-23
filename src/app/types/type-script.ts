type WithId = {
    id: string;
}

type WithOptional<T, K extends keyof T> = Omit<T, K> & Partial<Pick<T, K>>;
type WithRequired<T, K extends keyof T> = Omit<T, K> & Required<Pick<T, K>>;

export type {
    WithOptional,
    WithRequired,
    WithId
}