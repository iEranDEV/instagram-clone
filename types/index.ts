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
        saved: Array<string>
    }

    type Post = {
        id: string,
        author: string,
        description: string,
        createdAt: Date,
        photos: Array<string>,
        tags: Array<string>,
        likedBy: Array<string>
    }
}