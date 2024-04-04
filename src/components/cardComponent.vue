<script setup lang="ts">
import { isColorDark } from '@/composiable/isColorDark';

const props = defineProps<{ item: any }>();

const emit = defineEmits<{
    (e: 'downloadImage', item: any): void,
    (e: 'callPopup', event: Event, item: any): void
}>();

const downloadImage = () => {
    emit('downloadImage', props.item)
}

const callPopup = (event: Event, item: any) => {
    emit('callPopup', event, item)
}

</script>

<template>
    <div
        v-bind="$attrs"
        class="pokemonCard btn block relative border border-black rounded-xl py-3 px-4 hover:bg-slate-200 transition-all overflow-hidden"
        
    >
        <button
            v-ripple-effect
            class="btn block relative w-full"
            @click="callPopup($event, item)">
            <span class="number absolute numberPosition" :style="{ color: item.types[0].color}">#{{ item.number }}</span>
            
            <div class="pokemonCard__info text-left mt-20">
                <div class="block relative card-head">

                    <h6 class="text-xs text-gray-400 break-words mb-2">ID: {{ item.id }}</h6>
                    <h2 class="text-2xl nunito mb-3 uppercase font-bold" :style="{color: item.types[0].color}">{{ item.name }}</h2>
                </div>

                <div class="flex flex-wrap flex-row justify-start items-start">
                    <span
                    v-for="(type) in item.types"
                        class="uppercase rounded-full px-2 py-1 text-xs mr-2 mb-2"
                        :class="[isColorDark(type.color) ? 'text-white' : 'text-dark',]"
                        :key="type.number"
                        :style="{backgroundColor: type.color}"
                    >
                        {{ type.type }}
                    </span>
                </div>
            </div>
        </button>

        <button
            v-ripple-effect
            class="btn block overflow-hidden rounded-lg py-3 px-4 pokemonCard__download absolute top-3 right-3 opacity-50 hover:opacity-100 transition-opacity"
            @click="downloadImage"
        >
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-download" viewBox="0 0 16 16">
                <path d="M.5 9.9a.5.5 0 0 1 .5.5v2.5a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1v-2.5a.5.5 0 0 1 1 0v2.5a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2v-2.5a.5.5 0 0 1 .5-.5"/>
                <path d="M7.646 11.854a.5.5 0 0 0 .708 0l3-3a.5.5 0 0 0-.708-.708L8.5 10.293V1.5a.5.5 0 0 0-1 0v8.793L5.354 8.146a.5.5 0 1 0-.708.708z"/>
            </svg>
        </button>
    </div>
</template>

<style lang="scss" scoped>

.numberPosition {
    display: block;
    font-size: 42px;
    font-weight: 700;

    top: 0px;
    left: 10px;
    opacity: .5;
}

.skeleton {
    @keyframes placeholderPulse {
        0% {
            opacity: 1;
        }
        50% {
            opacity: 0.4;
        }
        100% {
            opacity: 1;
        }
    }

    animation-duration: 1.2s;
    animation-iteration-count: infinite;
    animation-name: placeholderPulse;
    animation-timing-function: ease-in-out;
    background-color: #ddd;
    border-radius: 0.5rem;
    height: 15rem;
    margin: 1.5rem 0;
}

</style>

