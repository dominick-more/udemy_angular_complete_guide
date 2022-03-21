import { EventEmitter } from '@angular/core';
import Server from './server.model';

export default class ServerService {
  private readonly servers: Readonly<Server>[] = [
    {
      id: 1,
      name: 'Productionserver',
      status: 'online'
    },
    {
      id: 2,
      name: 'Testserver',
      status: 'offline'
    },
    {
      id: 3,
      name: 'Devserver',
      status: 'offline'
    }
  ];

  public readonly serverUpdateEmitter = new EventEmitter<Server[]>();

  getServers() {
    return this.servers.map((server) => ({...server}));
  }

  getServerById(id: number | undefined): Server | undefined {
    const server = (id !== undefined) ? this.servers.find(
      (s) => {
        return s.id === id;
      }
    ) : undefined;
    return server !== undefined ? {...server} : undefined;
  }

  updateServer(id: number, serverUpdate: Partial<Omit<Server, 'id'>>) {
    const index = this.servers.findIndex(
      (s) => {
        return s.id === id;
      }
    );
    if (index !== -1) {
      const server = this.servers[index];
      this.servers[index] = {...server, ...serverUpdate};
      this.serverUpdateEmitter.emit(this.getServers());
    }
  }
}
