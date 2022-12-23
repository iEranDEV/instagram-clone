<template>
    <div class="w-full page" id="test">
        <p>
            {{ useState('user') }}
        </p>
    </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
    setup() {
    },
})
</script>


<style>

#test {
    height: 1000px;
}

</style>