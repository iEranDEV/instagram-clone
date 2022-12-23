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

    type Post = {
        id: string,
        author: string,
        description: string,
        createdAt: string,
        photos: Array<string>,
        tags: Array<string>,
    }
}