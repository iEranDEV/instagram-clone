<template>
    <div class="w-full h-full overflow-auto pb-20 md:pr-4">
            <form v-if="$store.state.loaded && user" class="h-full w-full flex flex-col gap-8" @submit.prevent="updateUser()">
                <!-- User avatar -->
                <div class="flex">
                    <img :src="user.photoURL" alt="Avatar" class="w-16 h-16 rounded-full">
                    <input @change="submitPhoto" id="avatar_input" ref="avatar_input" type="file" name="image" accept="image/png, image/jpeg" style="display: none;">
                    <div class="flex flex-col h-full justify-center pl-5">
                        <p @click="$refs.avatar_input.click()" class="text-sky-500 font-semibold hover:cursor-pointer">Change your profile photo</p>
                        <p class="text-stone-400 text-sm">The recommended photo size is 512x512</p>
                        <p class="text-stone-400 text-sm">Chosen photo:</p>
                        <span v-if="file" class="text-stone-400 text-sm underline">{{ file.name }}</span>
                        <span v-else class="text-stone-400 text-sm underline">None</span>
                    </div>
                </div>

                <!-- Username -->
                <div class="max-w-md">
                    <label for="username" class="font-semibold">Username</label>
                    <input type="text" id="username" name="username" placeholder="Username" class="form-input bg-stone-100 my-1" v-model="user.displayName">
                    <p class="text-stone-400 text-sm">
                        Your username is displayed on your profile and helps your friends find you. It is not used for logging in
                    </p>
                </div>

                <!-- Full name -->
                <div class="max-w-md">
                    <label for="fullname" class="font-semibold">Full name</label>
                    <input type="text" id="fullname" name="fullname" placeholder="Full name" class="form-input bg-stone-100 my-1" v-model="user.fullName">
                </div>

                <!-- BIO -->
                <div class="max-w-md">
                    <label for="bio" class="font-semibold">Bio</label>
                    <textarea name="bio" id="bio" cols="30" rows="3" class="form-input bg-stone-100 my-1" placeholder="Something cool B)" maxlength="200" v-model="user.bio"></textarea>
                    <p class="text-stone-400 text-sm">
                        0/200
                    </p>
                </div>

                <!-- Email -->
                <div class="max-w-md">
                    <label for="email" class="font-semibold">Email</label>
                    <input type="email" id="email" name="email" placeholder="Email" class="form-input bg-stone-100 my-1" v-model="user.email">
                    <p class="text-stone-400 text-sm">
                        The e-mail address is used to log in to the website. Remember to confirm the new address after changing it
                    </p>
                </div> 

                <button type="submit" class="btn bg-sky-500 md:w-40">Save changes</button>
            </form>
    </div>
</template>

<script lang="ts">
import { updateEmail } from '@firebase/auth';
import { doc, setDoc } from '@firebase/firestore';
import { getDownloadURL, uploadBytes, ref } from '@firebase/storage';
import { FirebaseError } from '@firebase/util';
import { getDoc } from 'firebase/firestore';
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
            file: {},
            user: {} as User,
        }
    },
    computed: {
        loaded() {
            return this.$store.state.loaded;
        }
    },
    mounted() {
        if(this.$store.state.user.uid != undefined) this.user = this.$store.state.user as User;
    },
    watch: {
        loaded(oldVal, newVal) {
            if(oldVal) {
                this.user = this.$store.state.user as User;
            }
        }
    },
    methods: {
        async updateUser() {
            if(this.file instanceof File) {
                let url = await uploadBytes(ref(this.firebase.storage, this.file.name), this.file).then(async (snapshot) => {
                    return getDownloadURL(snapshot.ref).then((url) => {
                        return url;
                    })
                });
                if(url) this.user.photoURL = url;
                await this.updateFirebaseUser();
            } else {
                await this.updateFirebaseUser();
            }
        },
        async updateFirebaseUser() {
            const snap_old = await getDoc(doc(this.firebase.firestore, "users", this.user.uid));
            if(snap_old.exists()) {
                const user_old = snap_old.data();
                if(user_old.email != this.user.email && this.firebase.auth.currentUser) {
                    await updateEmail(this.firebase.auth.currentUser, this.user.email).catch((error) => {
                        return error as FirebaseError;
                    })
                }
                await setDoc(doc(this.firebase.firestore, "users", this.user.uid), this.user).catch((error) => {
                    return error as FirebaseError;
                })
            }
        },
        submitPhoto(event: Event) {
            const target = event.target as HTMLInputElement;
            if(target && target.files) {
                this.file = target.files[0];
            }
        }
    }
})
</script>


<style>

</style>