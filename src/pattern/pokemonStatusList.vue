<template>
    <div class="block relative bg-slate-100 border border-slate-300 rounded-xl py-3 px-4">
        <h4 class="h4 text-lg uppercase font-bold mb-2">
            <span class="inline-block text-md uppercase font-bold mr-2">Total: </span>
            <span class="inline-block relative text-md">{{ item.total }}</span>
        </h4>
        
        <ul class="statsCategory flex flex-col columns-2 flex-wrap max-h-[100px] list-none">
            <li class="stateGroupItem block relative">
                <span class="inline-block text-md uppercase font-bold mr-2">Atk: </span>
                <span class="inline-block relative text-md">{{ item.attack }}</span>
            </li>
            <li class="stateGroupItem block relative">
                <span class="inline-block text-md uppercase font-bold mr-2">Def: </span>
                <span class="inline-block relative text-md">{{ item.defense }}</span>
            </li>
            <li class="stateGroupItem block relative">
                <span class="inline-block text-md uppercase font-bold mr-2">Speed: </span>
                <span class="inline-block relative text-md">{{ item.speed }}</span>
            </li>
            <li class="stateGroupItem block relative">
                <span class="inline-block text-md uppercase font-bold mr-2">sp_atk: </span>
                <span class="inline-block relative text-md">{{ item.sp_atk }}</span>
            </li>
            <li class="stateGroupItem block relative">
                <span class="inline-block text-md uppercase font-bold mr-2">sp_def: </span>
                <span class="inline-block relative text-md">{{ item.sp_def }}</span>
            </li>
        </ul>
    </div>
</template>

<script setup lang="ts">
defineProps<{
    item: {
        total: number,
        attack: number, 
        defense: number, 
        speed: number, 
        sp_atk: number, 
        sp_def: number 
    } 
}>()

</script>

<style scoped>

</style>