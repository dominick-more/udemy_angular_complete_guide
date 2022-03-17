import { EventEmitter, Injectable } from '@angular/core';

type UserStatus = 'active' | 'inactive';

type User = {
    name: string;
    status: UserStatus;
}

type GetUsersParams = {
    statuses?: UserStatus[];
}

type UserStatusChangeValue = {
    name: string;
    old: UserStatus,
    new: UserStatus
}

@Injectable()
export default class UserService {
    readonly users: User[] = [
        {name: 'Max', status: 'active'},
        {name: 'Anna', status: 'active'},
        {name: 'Chris', status: 'inactive'},
        {name: 'Manu', status: 'inactive'}
    ];

    readonly statusChangeEmitter = new EventEmitter<UserStatusChangeValue>();

    setStatus(name: string, status: UserStatus) {
        const user = this.users.find((user) => user.name === name);
        if (!user || user.status === status) {
            return;
        }
        const value: UserStatusChangeValue = {
            name: user.name,
            old: user.status,
            new: status
        }
        user.status = status;
        this.statusChangeEmitter.emit(value);
    }

    getUsers(params?: GetUsersParams) {
        return this.users.filter((user) => {
            return params?.statuses === undefined ||
                params?.statuses.includes(user.status);
        });
    }
}

export type {
    GetUsersParams,
    User,
    UserStatus,
    UserStatusChangeValue
}