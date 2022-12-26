<template>
    <div class="page w-full sm:px-20 2xl:px-96 xl:px-80 lg:px-48 md:px-40">

        <!-- Wrapper -->
        <div v-if="$store.state.loaded && user && posts" class="w-full">

            <div v-if="posts.length === 0" class="w-full h-screen flex flex-col justify-center items-center text-gray-400">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M2.25 15.75l5.159-5.159a2.25 2.25 0 013.182 0l5.159 5.159m-1.5-1.5l1.409-1.409a2.25 2.25 0 013.182 0l2.909 2.909m-18 3.75h16.5a1.5 1.5 0 001.5-1.5V6a1.5 1.5 0 00-1.5-1.5H3.75A1.5 1.5 0 002.25 6v12a1.5 1.5 0 001.5 1.5zm10.5-11.25h.008v.008h-.008V8.25zm.375 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z" />
                </svg>
                <p class="text-center">No posts found, follow others to see their uploaded photos</p>
            </div>
            <div v-else class="flex flex-col items-center gap-8 py-4 w-full">
                <HomePost v-for="post in posts" :key="post.id" :post="post"></HomePost>
            </div>

        </div>

    </div>
</template>

<script lang="ts">
import { collection, query } from '@firebase/firestore';
import { getDocs, orderBy, where } from 'firebase/firestore';
import HomePost from '~/components/post/HomePost.vue'
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
    components: {
        HomePost,
    },
    data() {
        return {
            posts: Array<Post>(),
            user: {} as User
        }
    },
    computed: {
        loaded() {
            return this.$store.state.loaded;
        }
    },
    methods: {
        async syncData() {
            this.user = this.$store.state.user;

            const q = query(collection(this.firebase.firestore, "posts"), where('author', 'in', this.user.following), orderBy('createdAt', 'desc'));
            const querySnapshot = await getDocs(q);
            querySnapshot.forEach((doc) => {
                this.posts.push(doc.data() as Post);
            })
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