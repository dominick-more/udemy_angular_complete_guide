import { Injectable, OnDestroy, OnInit } from '@angular/core';
import UserService, { UserStatus, UserStatusChangeValue } from './user.service';

@Injectable()

export class UserStatusCounterService implements OnDestroy {
    
    private readonly statusCounter: {[key in UserStatus]: number; } = {
        'active': 0,
        'inactive': 0
    };

    constructor(private readonly userService: UserService) {
        this.userService.statusChangeEmitter.subscribe(this.handleUserStatusChange);
    }

    ngOnDestroy() {
        this.userService.statusChangeEmitter.unsubscribe();
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