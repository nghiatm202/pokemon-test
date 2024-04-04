<script setup lang="ts">

</script>

<template>
    <div class="modalContainer">
        <div
            @click="$emit('onClose')"
            class="block w-full h-full absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
        ></div>

        <div class="modal-content px-3">
            <div class="block relative rounded-xl bg-slate-100 px-6 py-4">
                <div class="modal-body" role="dialog" aria-modal="true">
                    <slot></slot>
                </div>

                <button
                    @click="$emit('onClose')"
                    class="btn block w-full text-black bg-slate-200 py-2 px-4 rounded-lg uppercase hover:text-white hover:bg-slate-600 transition-all">
                close</button>
            </div>
        </div>
    </div>
</template>

<style lang="scss" scoped>
.modalContainer {
    display: block;
    position: fixed;
    top: 0;
    left: 0;

    width: 100%;
    height: 100%;

    padding: 1rem;
    background-color: rgba($color: #161616, $alpha: 0.2);

    cursor: pointer;
    z-index: 9999;

    .modal-content {
        display: flex;
        flex-direction: column;
        align-items: stretch;
        justify-content: space-between;

        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);

        max-width: 720px;
        width: 100%;
        height: auto;

        min-height: 420px;
        max-height: 620px;

        margin: auto;

        cursor: auto;
        overflow-x: clip;
        overflow-y: auto;

        @media screen and (min-width: 768px) {
            max-height: 820px;
        }
    }
}
</style>