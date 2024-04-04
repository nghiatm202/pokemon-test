<template>
    <div class="flex justify-center mt-5">
        <button
            v-ripple-effect="{ backgroundColor: 'rgba(255,255,255, 0.3)' }"
            class="btn relative overflow-hidden bg-slate-100 py-2 px-4 rounded-l-lg uppercase border border-slate-200 hover:text-white hover:bg-slate-600 transition-all"
            :disabled="currentPage === 1"
            @click="decreaseNumber">
            prev
        </button>
        <input 
            type="text" 
            :value="currentPage"
            @keydown.enter="inputPageChange"
            class="flex w-12 px-1 border border-slate-200 text-center bg-slate-100 focus:outline-none"
        />
        <button
            v-ripple-effect="{ backgroundColor: 'rgba(255,255,255, 0.3)' }"
            class="btn relative overflow-hidden bg-slate-100 py-2 px-4 rounded-r-lg uppercase border border-slate-200 hover:text-white hover:bg-slate-600 transition-all"
            :disabled="currentPage === totalPages"
            @click="increaseNumber">
            next
        </button>
    </div>
</template>

<script setup lang="ts">
const props = defineProps<{ currentPage: number, totalPages: number }>()

const emit = defineEmits<{
    (e: 'changePage', page: number): void,
    (e: 'inputPageChange', page: number): void,
}>()

const inputPageChange = (event: KeyboardEvent | InputEvent | any) => {
    const target = event.target as HTMLInputElement;
    emit('inputPageChange', Number(target.value));
}

const decreaseNumber = () => {
    emit('changePage', props.currentPage - 1)
}

const increaseNumber = () => {
    emit('changePage', props.currentPage + 1)
}

</script>

