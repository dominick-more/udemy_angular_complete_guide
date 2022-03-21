import { Injectable } from '@angular/core';
import User from './user.model';

@Injectable()
export default class UserService {
    private readonly users: Readonly<User>[] = [
        {
          id: 1,
          name: 'Max'
        },
        {
          id: 2,
          name: 'Anna'
        },
        {
          id: 3,
          name: 'Chris'
        }
    ];

    getUserById(id: number | undefined): User | undefined {
        const user = (id !== undefined) ? this.users.find(
            (u) => {
                return u.id === id;
            }
        ) : undefined;
        return user !== undefined ? {...user} : undefined;
    }
    
    getUsers(): User[] {
        return this.users.map((user) => ({...user}));
    }

    updateUser(id: number, userUpdate: Partial<Omit<User, 'id'>>) {
        const index = this.users.findIndex(
            (u) => {
                return u.id === id;
            }
        );
        if (index !== -1) {
            const user = this.users[index];
            this.users[index] = {...user, ...userUpdate};
        }
    }
}