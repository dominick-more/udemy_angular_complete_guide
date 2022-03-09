import { Component, OnInit } from '@angular/core';

@Component({
    selector: 'app-server',
    templateUrl: './server.component.html',
    styles: [ `
        .online {
            color: white;
        }
    `]
})

export class ServerComponent implements OnInit {
    serverId: number = 10;
    #serverStatus: ServiceStatus = 'offline';

    ngOnInit(): void {
        this.#serverStatus = Math.random() > 0.5 ? 'online' : 'offline';
    }

    getServerStatus(): ServiceStatus {
        return this.#serverStatus;
    }

    getServerStatusColor(): string {
      return this.#serverStatus === 'online' ? 'lightgreen' : 'pink';  
    }
}

export type ServiceStatus = 'offline' | 'online';