<template>
    <div v-if="post && author" @dblclick="viewPost()" class="w-full max-w-xl flex flex-wrap flex-col gap-2 md:rounded-lg md:border md:border-gray-200">
        <div class="flex gap-4 items-center p-2">
            <img :src="author.photoURL" alt="avatar" class="w-10 h-10 rounded-full">
            <NuxtLink :to="'/user/' + author.uid">
                <p class="font-semibold">{{ author.displayName }}</p>
            </NuxtLink>
        </div>
        <PostCarousel :photos="post.photos"></PostCarousel>
        <div class="flex items-center w-full gap-6 px-2">
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
        <NuxtLink :to="'/post/' + post.id" class="px-2 pb-4">
            <p class="text-gray-500 uppercase text-xs">click to add and view comments</p>
        </NuxtLink>
    </div>
</template>

<script lang="ts">
import { getDoc } from '@firebase/firestore';
import { doc, updateDoc } from 'firebase/firestore';
import { defineComponent, PropType } from 'vue'

export default defineComponent({
    setup() {
        const firebase = useFirebase();

        return {
            firebase,
        }
    },
    data() {
        return  {
            author: {} as User,
        }
    },
    props: {
        post: Object as PropType<Post>,
    },
    async mounted() {
        const authorSnapshot = await getDoc(doc(this.firebase.firestore, "users", (this.post as Post).author));
        if(authorSnapshot.exists()) {
            this.author = authorSnapshot.data() as User;
        }
    },
    methods: {
        viewPost() {
            navigateTo('/post/' + (this.post as Post).id);
        },
        async savePost() {
            const user = (this.$store.state.user as User);
            if(user.saved.includes((this.post as Post).id)) {
                user.saved.splice(user.saved.indexOf((this.post as Post).id), 1);
            } else {
                user.saved.push((this.post as Post).id);
            }
            await updateDoc(doc(this.firebase.firestore, "users", user.uid), {
                "saved": user.saved,
            })
        },
        async likePost() {
            const user = this.$store.state.user as User;
            if((this.post as Post).likedBy.includes(user.uid)) {
                (this.post as Post).likedBy.splice((this.post as Post).likedBy.indexOf(user.uid), 1);
            } else {
                (this.post as Post).likedBy.push(user.uid);
            }
            await updateDoc(doc(this.firebase.firestore, "posts", (this.post as Post).id), {
                "likedBy": (this.post as Post).likedBy,
            })
        }
    }
})
</script>

<style>

</style>