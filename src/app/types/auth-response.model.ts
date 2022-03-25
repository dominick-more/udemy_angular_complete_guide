type AuthResponseUser = {
    email: string;
    id: number;
}

type AuthResponse = {
    accessToken: string;
    user: AuthResponseUser;
}

export default AuthResponse;

export type {
    AuthResponseUser
}
