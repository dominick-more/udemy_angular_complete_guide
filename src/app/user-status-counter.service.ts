import { Injectable } from '@angular/core';
import UserService, { UserStatus, UserStatusChangeValue } from './user.service';

@Injectable()
export class UserStatusCounterService {
    
    private readonly statusCounter: {[key in UserStatus]: number; };

    constructor(private readonly userService: UserService) {
        this.statusCounter = {
            'active': 0,
            'inactive': 0
        };
        this.userService.statusChangeEmitter.subscribe(this.handleUserStatusChange);
    }

    private handleUserStatusChange = (value: UserStatusChangeValue) => {
        for (const status of ['active', 'inactive']) {
            if ((value.new === status) && (value.old !== status)) {
                this.statusCounter[status] = this.statusCounter[status] + 1;
                break;
            }
        }
    };

    getStatusChanges(status: UserStatus): number {
        return this.statusCounter[status];
    }
}