<template>
    <div class="page w-full h-full lg:px-8 lg:py-32 md:px-4 md:py-32 md:mb-0">
        <div class="w-full h-full md:h-full md:rounded-lg md:overflow-hidden flex flex-col md:flex-row" v-if="post.photos && $store.state.loaded">

            <!-- Photos -->
            <PostCarousel :photos="post.photos"></PostCarousel>

            <!-- Wrapper -->
            <div class="flex flex-col gap-2 w-full h-full md:bg-white md:w-80 overflow-auto">

                <div class="flex flex-col gap-4 bg-white border-b-2 md:border-b-1 border-gray-200 p-4">
                    <!-- Author data -->
                    <div class="w-full flex justify-between items-center" v-if="author.uid">
                        <div class="flex gap-4 items-center">
                            <img :src="author.photoURL" alt="Author profile" class="w-10 h-10">
                            <NuxtLink :to="'/user/' + author.uid"><p class="font-semibold">{{ author.displayName }}</p></NuxtLink>
                        </div>
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
                            <path stroke-linecap="round" stroke-linejoin="round" d="M6.75 12a.75.75 0 11-1.5 0 .75.75 0 011.5 0zM12.75 12a.75.75 0 11-1.5 0 .75.75 0 011.5 0zM18.75 12a.75.75 0 11-1.5 0 .75.75 0 011.5 0z" />
                        </svg>
                    </div>

                    <div class="flex flex-col">
                        <p class="whitespace-pre">{{ post.description }}</p>
                        <p class="flex gap-2">
                            <span v-for="tag in post.tags" :key="tag" class="text-sky-500 font-semibold">#{{ tag }}</span>
                        </p>
                    </div>

                    <div class="flex items-center w-full gap-6">
                        <div class="flex gap-2 items-center">
                            <svg @click="likePost()" xmlns="http://www.w3.org/2000/svg" :fill="post.likedBy.includes($store.state.user.uid) ? '#f43f5e' : 'none'" viewBox="0 0 24 24" stroke-width="1.5" :stroke="post.likedBy.includes($store.state.user.uid) ? '#f43f5e' : 'currentColor'" class="w-6 h-6 cursor-pointer">
                                <path stroke-linecap="round" stroke-linejoin="round" d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z" />
                            </svg>
                            <p class="font-semibold">
                                {{ post.likedBy.length }}
                            </p>
                        </div>

                        <svg @click="savePost()" xmlns="http://www.w3.org/2000/svg" :fill="$store.state.user.saved.includes(post.id) ? 'currentColor' : 'none'" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6 cursor-pointer">
                            <path stroke-linecap="round" stroke-linejoin="round" d="M17.593 3.322c1.1.128 1.907 1.077 1.907 2.185V21L12 17.25 4.5 21V5.507c0-1.108.806-2.057 1.907-2.185a48.507 48.507 0 0111.186 0z" />
                        </svg>
                    </div>
                </div>

                <div id="comments" class="px-4 h-full">
                    TODO: Comments
                </div>

            </div>

        </div>
    </div>
</template>

<script lang="ts">
import { getDoc, doc, updateDoc } from '@firebase/firestore';
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
    data() {
        return {
            post: {} as Post,
            author: {} as User,
        }
    },
    async mounted() {
        const snapshot = await getDoc(doc(this.firebase.firestore, "posts", useRoute().params.id as string));
        if(snapshot.exists()) {
            this.post = snapshot.data() as Post;
            const authorSnap = await getDoc(doc(this.firebase.firestore, "users", this.post.author));
            if(authorSnap.exists()) {
                this.author = authorSnap.data() as User;
            }
        }
    },
    methods: {
        async savePost() {
            const user = (this.$store.state.user as User);
            if(user.saved.includes(this.post.id)) {
                user.saved.splice(user.saved.indexOf(this.post.id), 1);
            } else {
                user.saved.push(this.post.id);
            }
            await updateDoc(doc(this.firebase.firestore, "users", user.uid), {
                "saved": user.saved,
            })
        },
        async likePost() {
            const user = this.$store.state.user as User;
            if(this.post.likedBy.includes(user.uid)) {
                this.post.likedBy.splice(this.post.likedBy.indexOf(user.uid), 1);
            } else {
                this.post.likedBy.push(user.uid);
            }
            await updateDoc(doc(this.firebase.firestore, "posts", this.post.id), {
                "likedBy": this.post.likedBy,
            })
        }
    }
})
</script>


<style>
</style>