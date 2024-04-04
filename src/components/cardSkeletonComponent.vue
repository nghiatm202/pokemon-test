<template>
    <div class="pokemonCard__skeleton block relative w-full h-full border border-light rounded-xl">
        <div class="pokemonCard__skeleton__info flex flex-col justify-start items-start py-2 px-3 gap-4">
            <div class="skeleton__rect bg-gray-300 w-2/3 h-6 mb-2 text-left rounded-lg"></div>
            <div class="flex flex-cols flex-wrap justify-start items-start mb-2">
                <div class="skeleton__rect bg-gray-300 w-16 h-6 mr-2 mb-2 rounded-lg" v-for="i in 3" :key="i"></div>
            </div>
            <div class="flex flex-cols flex-wrap justify-start items-start">
                <div class="skeleton__rect bg-gray-300 w-16 h-6 mr-2 mb-2 rounded-lg" v-for="i in 2" :key="i"></div>
            </div>
            <div class="flex flex-cols flex-wrap justify-start items-start">
                <div class="skeleton__rect bg-gray-300 w-16 h-6 mr-2 mb-2 rounded-lg" v-for="i in 3" :key="i"></div>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">

</script>

<style lang="scss" scoped>

.skeleton__rect {
    animation: pulse 2s infinite ease-in-out;
}

@keyframes pulse {
    0% {
        opacity: .2;
    }
    50% {
        opacity: .6;
    }
    100% {
        opacity: .2;
    }
}

</style>