<template>
    <div class="page w-full h-screen lg:px-32 lg:py-16 md:px-16 md:py-8">

        <!-- Wrapper -->
        <div v-if="$store.state.loaded && user" class="flex flex-col gap-4">

            <!-- Profile header -->
            <div class="bg-white w-full md:rounded-lg p-6 flex flex-col gap-4">
                
                <!-- Buttons -->
                <div class="w-full flex justify-end items-center gap-4">
                    <NuxtLink to="/post/new">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-7 h-7 md:w-6 md:h-6">
                        <path stroke-linecap="round" stroke-linejoin="round" d="M12 9v6m3-3H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    </NuxtLink>
                    <NuxtLink to="/post/saved">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-7 h-7 md:w-6 md:h-6">
                            <path stroke-linecap="round" stroke-linejoin="round" d="M17.593 3.322c1.1.128 1.907 1.077 1.907 2.185V21L12 17.25 4.5 21V5.507c0-1.108.806-2.057 1.907-2.185a48.507 48.507 0 0111.186 0z" />
                        </svg>
                    </NuxtLink>
                    <NuxtLink to="/user/settings">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-7 h-7 md:w-6 md:h-6">
                            <path stroke-linecap="round" stroke-linejoin="round" d="M9.594 3.94c.09-.542.56-.94 1.11-.94h2.593c.55 0 1.02.398 1.11.94l.213 1.281c.063.374.313.686.645.87.074.04.147.083.22.127.324.196.72.257 1.075.124l1.217-.456a1.125 1.125 0 011.37.49l1.296 2.247a1.125 1.125 0 01-.26 1.431l-1.003.827c-.293.24-.438.613-.431.992a6.759 6.759 0 010 .255c-.007.378.138.75.43.99l1.005.828c.424.35.534.954.26 1.43l-1.298 2.247a1.125 1.125 0 01-1.369.491l-1.217-.456c-.355-.133-.75-.072-1.076.124a6.57 6.57 0 01-.22.128c-.331.183-.581.495-.644.869l-.213 1.28c-.09.543-.56.941-1.11.941h-2.594c-.55 0-1.02-.398-1.11-.94l-.213-1.281c-.062-.374-.312-.686-.644-.87a6.52 6.52 0 01-.22-.127c-.325-.196-.72-.257-1.076-.124l-1.217.456a1.125 1.125 0 01-1.369-.49l-1.297-2.247a1.125 1.125 0 01.26-1.431l1.004-.827c.292-.24.437-.613.43-.992a6.932 6.932 0 010-.255c.007-.378-.138-.75-.43-.99l-1.004-.828a1.125 1.125 0 01-.26-1.43l1.297-2.247a1.125 1.125 0 011.37-.491l1.216.456c.356.133.751.072 1.076-.124.072-.044.146-.087.22-.128.332-.183.582-.495.644-.869l.214-1.281z" />
                            <path stroke-linecap="round" stroke-linejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                        </svg>
                    </NuxtLink>
                </div>

                <!-- User information -->
                <div class="flex flex-col w-full gap-4">
                    <!-- Avatar and edit button -->
                    <div class="flex gap-8">
                        <img :src="user.photoURL" alt="Avatar" class="w-20 h-20 md:w-32 md:h-32 rounded-full object-fill">
                        <div class="flex flex-col w-full">
                            <h1 class="h-1/2 flex text-xl md:text-2xl">{{ user.displayName }}</h1>
                            <NuxtLink to="/user/settings" class="h-1/2 flex items-center justify-center btn bg-sky-500 md:hidden">Edit profile</NuxtLink>
                            <NuxtLink to="/user/settings" class="hidden md:flex py-2 px-3 bg-sky-500 text-stone-100 w-36 rounded-lg justify-around items-center font-semibold text-sm">
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-5 h-5">
                                    <path stroke-linecap="round" stroke-linejoin="round" d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10" />
                                </svg>
                                Edit profile
                            </NuxtLink>
                            <div class="hidden md:flex justify-between items-center w-1/2 self-center">
                                <div class="flex flex-col items-center w-1/3">
                                    <p class="font-bold" v-if="posts">{{ posts.length }}</p>
                                    <p class="md:text-sm">Posts</p>
                                </div>
                                <div class="flex flex-col items-center w-1/3">
                                    <p class="font-bold">{{ followers }}</p>
                                    <p class="md:text-sm">Followers</p>
                                </div>
                                <div class="flex flex-col items-center w-1/3">
                                    <p class="font-bold" v-if="user.following">{{ user.following.length }}</p>
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
                            <p class="font-bold" v-if="posts">{{ posts.length }}</p>
                            <p class="md:text-sm">Posts</p>
                        </div>
                        <div class="flex flex-col items-center w-1/3">
                            <p class="font-bold">{{ followers }}</p>
                            <p class="md:text-sm">Followers</p>
                        </div>
                        <div class="flex flex-col items-center w-1/3">
                            <p class="font-bold" v-if="user.following">{{ user.following.length }}</p>
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
import { collection, getDocs, orderBy, query, where } from '@firebase/firestore';
import { getCountFromServer } from 'firebase/firestore';
import { defineComponent } from 'vue'

export default defineComponent({
    setup() {
        definePageMeta({
            middleware: ['auth']
        });
        const firebase = useFirebase();

        return {
            firebase,
        }
    },
    computed: {
        loaded() {
            return this.$store.state.loaded;
        }
    },
    data() {
        return {
            posts: Array<Post>(),
            followers: 0,
            user: {} as User
        }
    },
    methods: {
        async syncData() {
            this.user = this.$store.state.user as User;

            const q = query(collection(this.firebase.firestore, "posts"), where("author", "==", this.user.uid), orderBy("createdAt", "desc"));
            const querySnapshot = await getDocs(q);
            querySnapshot.forEach((doc) => {
                this.posts.push(doc.data() as Post);
            })

            const followersQuery = query(collection(this.firebase.firestore, "users"), where("following", "array-contains", this.user.uid));
            const followersSnapshot = await getCountFromServer(followersQuery);
            this.followers = followersSnapshot.data().count;
        }
    },
    mounted() {
        if(this.$store.state.user.uid != undefined) this.syncData();
    },
    watch: {
        loaded(oldVal, newVal) {
            if(oldVal) {
                this.syncData();
            }
        }
    }
})
</script>

<style scoped>

</style>