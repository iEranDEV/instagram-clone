<template>
    <div class="w-full page" id="test">
        <p>
            {{ useRoute() }}
        </p>
    </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
    setup() {
        console.log(useRoute());
    },
})
</script>


<style>

#test {
    height: 1000px;
}

</style>