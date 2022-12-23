<template>
    <div class="page w-full h-screen lg:px-32 lg:py-16 md:px-16 md:py-8">

        <!-- Wrapper -->
        <div v-if="user" class="flex flex-col gap-4">

            <!-- Profile header -->
            <div class="bg-white w-full md:rounded-lg p-6 flex flex-col gap-4">

                <!-- User information -->
                <div class="flex flex-col w-full gap-4">
                    <!-- Avatar and edit button -->
                    <div class="flex gap-8">
                        <img :src="user.photoURL" alt="Avatar" class="w-20 h-20 md:w-32 md:h-32 rounded-full object-fill">
                        <div class="flex flex-col w-full">
                            <h1 class="h-1/2 flex text-xl md:text-2xl">{{ user.displayName }}</h1>
                            <button class="flex py-2 px-3 bg-sky-500 text-stone-100 w-36 rounded-lg justify-around items-center font-semibold text-sm">
                                Follow
                            </button>
                            <div class="hidden md:flex justify-between items-center w-1/2 self-center">
                                <div class="flex flex-col items-center w-1/3">
                                    <p class="font-bold">0</p>
                                    <p class="md:text-sm">Posts</p>
                                </div>
                                <div class="flex flex-col items-center w-1/3">
                                    <p class="font-bold">0</p>
                                    <p class="md:text-sm">Followers</p>
                                </div>
                                <div class="flex flex-col items-center w-1/3">
                                    <p class="font-bold">0</p>
                                    <p class="md:text-sm">Following</p>
                                </div>
                            </div>
                        </div>
                    </div>
                    <!-- Name and bio -->
                    <div class="flex flex-col gap-2 md:w-2/3">
                        <p>{{ user.fullName }}</p>
                        <span class="w-full text-sm whitespace-pre">{{ user.bio }}</span>
                    </div>
                    <hr class="md:hidden">
                    <!-- Profile stats (mobile view) -->
                    <div class="flex items-center md:hidden">
                        <div class="flex flex-col items-center w-1/3">
                            <p class="font-bold">0</p>
                            <p class="md:text-sm">Posts</p>
                        </div>
                        <div class="flex flex-col items-center w-1/3">
                            <p class="font-bold">0</p>
                            <p class="md:text-sm">Followers</p>
                        </div>
                        <div class="flex flex-col items-center w-1/3">
                            <p class="font-bold">0</p>
                            <p class="md:text-sm">Following</p>
                        </div>
                    </div>
                </div>
            </div>

            <!-- Posts section -->
            <div class="w-full grid grid-cols-3 gap-2" v-if="posts">
                <post-image v-for="post in posts" :key="post.id" :post="post"></post-image>
            </div>

        </div>

    </div>
</template>

<script lang="ts">
import { collection, doc, getDoc, getDocs, orderBy, query, where } from '@firebase/firestore';
import { defineComponent } from 'vue'

export default defineComponent({
    setup() {
        const firebase = useFirebase();

        return {
            firebase,
        }
    },
    data() {
        return {
            posts: Array<Post>(),
            user: {} as User,
        }
    },
    async mounted() {

        const id = useRoute().params.id as string;
        if(id === this.firebase.auth.currentUser?.uid) {
            navigateTo('/user/');
        } else {
            const userSnapshot = await getDoc(doc(this.firebase.firestore, "users", id))
            if(userSnapshot.exists()) {
                this.user = userSnapshot.data() as User;
            }

            const q = query(collection(this.firebase.firestore, "posts"), where("author", "==", id), orderBy("createdAt", "desc"));
            const querySnapshot = await getDocs(q);
            querySnapshot.forEach((doc) => {
                this.posts.push(doc.data() as Post);
            })
        }
    }
})
</script>

<style scoped>

</style>