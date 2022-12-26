<template>
    <div class="page w-full h-screen lg:px-32 lg:py-16 md:px-16 md:py-8 mb-10 md:mb-0">
        <div class="w-full h-screen md:h-full md:rounded-lg p-6 bg-white flex flex-col gap-2 md:gap-4">

            <div class="flex flex-col w-full md:flex-row md:mb-1">
                <!-- Upload image box -->
                <div @click="$refs.avatar_input.click()" class="w-full md:w-52 xl:w-2/5 flex flex-col justify-center py-10 items-center border-2 border-gray-300 text-gray-300 border-dashed rounded-lg hover:bg-gray-50 hover:border-gray-400 hover:text-gray-400 cursor-pointer">
                    <input @change="submitPhoto" id="avatar_input" ref="avatar_input" type="file" name="image" accept="image/png, image/jpeg" style="display: none;">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
                        <path stroke-linecap="round" stroke-linejoin="round" d="M2.25 15.75l5.159-5.159a2.25 2.25 0 013.182 0l5.159 5.159m-1.5-1.5l1.409-1.409a2.25 2.25 0 013.182 0l2.909 2.909m-18 3.75h16.5a1.5 1.5 0 001.5-1.5V6a1.5 1.5 0 00-1.5-1.5H3.75A1.5 1.5 0 002.25 6v12a1.5 1.5 0 001.5 1.5zm10.5-11.25h.008v.008h-.008V8.25zm.375 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z" />
                    </svg>
                    <p>
                        Click to <span class="font-semibold">upload photo</span>
                    </p>
                </div>

                <!-- Uploaded images -->
                <div class="py-6 md:py-0 md:ml-6">
                    <p class="font-semibold text-gray-500">Your pictures</p>
                    <div class="w-full grid grid-cols-5 gap-2 my-1">
                        <!-- <div v-for="number in 10" :key="number" class="h-16 w-16 xl:h-20 xl:w-20 bg-gray-100 rounded-lg"></div> -->
                        <div v-for="file in files" :key="file.name" class="image-preview">
                            <img :src="getUrl(file)" alt="Test" class="h-16 w-16 xl:h-20 xl:w-20 rounded-lg">
                            <div @click="deletePhoto(file)" class="absolute -top-1 -right-1 w-5 h-5 hover:w-6 hover:h-6 transition-all bg-red-500 rounded-full flex justify-center items-center text-gray-100 cursor-pointer">
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="3" stroke="currentColor" class="w-4 h-4">
                                    <path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12" />
                                </svg>
                            </div>
                        </div>
                        <div v-for="number in (10 - files.length)" :key="number" class="image-preview"></div>
                    </div>
                </div>
            </div>

            <!-- Description -->
            <div class="max-w-md">
                <label for="description" class="font-semibold text-gray-500">Description</label>
                <textarea rows=3 type="text" v-model="description" id="description" name="description" placeholder="Describe your pictures" class="form-input bg-stone-100 my-1"></textarea>
            </div>

            <!-- Tags -->
            <div class="max-w-md">
                <div class="flex justify-between items-center">
                    <label for="tags" class="font-semibold text-gray-500">Tags</label>
                    <p class="text-stone-400 text-sm">
                        {{ tags.length }}/10
                    </p>
                </div>
                <input @keydown="tagInput" type="text" id="tags" name="tags" placeholder="Add tags to your pictures" class="form-input bg-stone-100 my-1" />
                <div class="w-full flex flex-wrap gap-x-4 gap-y-2 my-1">
                    <p v-for="tag in tags" :key="tag" class="bg-gray-100 rounded-full flex justify-between gap-2 items-center px-3 py-1">
                        <span>{{ tag }}</span>
                        <svg @click="deleteTag(tag)" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-4 h-4">
                            <path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12" />
                        </svg>
                    </p>
                </div>
            </div>

            <button @click="uploadPost()" type="submit" class="btn bg-sky-500 md:w-40">Upload post</button>

        </div>
    </div>
</template>

<script lang="ts">
import { collection, doc } from '@firebase/firestore';
import { setDoc } from 'firebase/firestore';
import { uploadBytes, ref, getDownloadURL } from 'firebase/storage';
import { ref as vueRef } from 'vue';
import { defineComponent } from 'vue'

export default defineComponent({
    setup() {
        const firebase = useFirebase();
        const description = vueRef('');

        return {
            firebase,
            description
        }
    },
    data() {
        return {
            files: Array<File>(),
            tags: Array<string>(),
            urls: Array<string>(),
        }
    },
    methods: {
        submitPhoto(event: Event) {
            const target = event.target as HTMLInputElement;
            if(target && target.files) {
                this.files.push(target.files[0]);
            }
        },
        getUrl(file: File) {
            return URL.createObjectURL(file);
        },
        deletePhoto(file: File) {
            let index = this.files.indexOf(file);
            this.files.splice(index, 1)
        },
        tagInput(event: KeyboardEvent) {
            if(event.key === ' ') {
                event.preventDefault();
                let target = event.target as HTMLInputElement;
                let tag = target.value;
                target.value = '';
                this.tags.push(tag);
            }
        },
        deleteTag(tag: string) {
            let index = this.tags.indexOf(tag);
            this.tags.splice(index, 1)
        },
        async uploadPost() {
            for(const file of this.files) {
                const url = await uploadBytes(ref(this.firebase.storage, file.name), file).then(async (snapshot) => {
                    return getDownloadURL(snapshot.ref).then((url) => {
                        return url;
                    })
                })
                this.urls.push(url);
            }

            const postRef = doc(collection(this.firebase.firestore, "posts"));
            const post: Post = {
                id: postRef.id,
                author: (this.$store.state.user as User).uid,
                description: this.description,
                createdAt: new Date(),
                photos: this.urls,
                tags: this.tags,
                likedBy: Array<string>()
            }
            await setDoc(postRef, post);
        }
    }
})
</script>


<style>

</style>