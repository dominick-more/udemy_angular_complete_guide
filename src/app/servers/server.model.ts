type ServerStatus = 'online' | 'offline';

type Server = {
    id: number;
    name: string;
    status: ServerStatus;
}

export default Server;

export type {
    ServerStatus
}