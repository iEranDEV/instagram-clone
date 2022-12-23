<template>
    <div class="page w-full h-full lg:px-8 lg:py-32 md:px-4 md:py-32 md:mb-0">
        <div class="w-full h-full md:h-full md:rounded-lg md:overflow-hidden flex flex-col md:flex-row" v-if="post.photos">

            <!-- Photos -->
            <PostCarousel :photos="post.photos"></PostCarousel>

            <!-- Wrapper -->
            <div class="flex flex-col gap-2 w-full h-full md:bg-white md:w-80 overflow-auto">

                <div class="flex flex-col gap-4 bg-white border-b-2 md:border-b-1 border-gray-200 p-4">
                    <!-- Author data -->
                    <div class="w-full flex justify-between items-center" v-if="author.uid">
                        <div class="flex gap-4 items-center">
                            <img :src="author.photoURL" alt="Author profile" class="w-10 h-10">
                            <p class="font-semibold">{{ author.displayName }}</p>
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

                    <div class="flex items-center w-full gap-2">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
                            <path stroke-linecap="round" stroke-linejoin="round" d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z" />
                        </svg>

                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
                            <path stroke-linecap="round" stroke-linejoin="round" d="M17.593 3.322c1.1.128 1.907 1.077 1.907 2.185V21L12 17.25 4.5 21V5.507c0-1.108.806-2.057 1.907-2.185a48.507 48.507 0 0111.186 0z" />
                        </svg>

                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
                            <path stroke-linecap="round" stroke-linejoin="round" d="M7.217 10.907a2.25 2.25 0 100 2.186m0-2.186c.18.324.283.696.283 1.093s-.103.77-.283 1.093m0-2.186l9.566-5.314m-9.566 7.5l9.566 5.314m0 0a2.25 2.25 0 103.935 2.186 2.25 2.25 0 00-3.935-2.186zm0-12.814a2.25 2.25 0 103.933-2.185 2.25 2.25 0 00-3.933 2.185z" />
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
import { getDoc, doc } from '@firebase/firestore';
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
    }
})
</script>


<style>
</style>