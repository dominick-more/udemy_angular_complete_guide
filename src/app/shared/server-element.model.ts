type ServerElementType = 'server' | 'blueprint';

type ServerElement = {
    type: ServerElementType;
    name: string;
    content: string;
}

export default ServerElement;

export type {
    ServerElementType
}