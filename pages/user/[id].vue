<template>
    <div class="page w-full h-screen lg:px-32 lg:py-16 md:px-16 md:py-8">

        <!-- Wrapper -->
        <div v-if="$store.state.loaded && user" class="flex flex-col gap-4">

            <!-- Profile header -->
            <div class="bg-white w-full md:rounded-lg p-6 flex flex-col gap-4">

                <!-- User information -->
                <div class="flex flex-col w-full gap-4">
                    <!-- Avatar and edit button -->
                    <div class="flex gap-8">
                        <img :src="user.photoURL" alt="Avatar" class="w-20 h-20 md:w-32 md:h-32 rounded-full object-fill">
                        <div class="flex flex-col w-full">
                            <h1 class="h-1/2 flex text-xl md:text-2xl">{{ user.displayName }}</h1>
                            <button v-if="!$store.state.user.following.includes(user.uid)" @click="follow()" class="flex py-2 px-3 bg-sky-500 text-stone-100 w-36 rounded-lg justify-around items-center font-semibold text-sm">
                                Follow
                            </button>
                            <button v-else @click="follow()" class="flex py-2 px-3 bg-gray-300 text-stone-100 w-36 rounded-lg justify-around items-center font-semibold text-sm">
                                Unfollow
                            </button>
                            <div class="hidden md:flex justify-between items-center w-1/2 self-center">
                                <div class="flex flex-col items-center w-1/3">
                                    <p class="font-bold">{{ posts.length }}</p>
                                    <p class="md:text-sm">Posts</p>
                                </div>
                                <div class="flex flex-col items-center w-1/3">
                                    <p class="font-bold">{{ followers }}</p>
                                    <p class="md:text-sm">Followers</p>
                                </div>
                                <div class="flex flex-col items-center w-1/3">
                                    <p class="font-bold">{{ user.following?.length }}</p>
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
                            <p class="font-bold">{{ posts.length }}</p>
                            <p class="md:text-sm">Posts</p>
                        </div>
                        <div class="flex flex-col items-center w-1/3">
                            <p class="font-bold">{{ followers }}</p>
                            <p class="md:text-sm">Followers</p>
                        </div>
                        <div class="flex flex-col items-center w-1/3">
                            <p class="font-bold">{{ user.following?.length }}</p>
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
import { collection, doc, getCountFromServer, getDoc, getDocs, orderBy, query, where } from '@firebase/firestore';
import { updateDoc } from 'firebase/firestore';
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
            followers: 0
        }
    },
    computed: {
        loaded() {
            return this.$store.state.loaded;
        }
    },
    methods: {
        async syncData() {
            const id = useRoute().params.id as string;
            if(id === this.$store.state.user.uid) {
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

                const followersQuery = query(collection(this.firebase.firestore, "users"), where("following", "array-contains", this.user.uid));
                const followersSnapshot = await getCountFromServer(followersQuery);
                this.followers = followersSnapshot.data().count;
            }
        },
        async follow() {
            const currentUser = this.$store.state.user as User;
            if(currentUser.following.includes(this.user.uid)) {
                currentUser.following.splice(currentUser.following.indexOf(this.user.uid), 1)
            } else {
                currentUser.following.push(this.user.uid);
            }
            await updateDoc(doc(this.firebase.firestore, "users", currentUser.uid), {
                "following": currentUser.following,
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