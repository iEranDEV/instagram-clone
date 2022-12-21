export {};

declare global {
    type User = {
        uid: string,
        displayName: string,
        fullName: string,
        email: string,
        createdAt: string,
        photoURL: string,
        bio: string,
    }
}