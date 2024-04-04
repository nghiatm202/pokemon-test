import { ref } from "vue";

const component = ref();
const item = ref<any>();

const show = ref(false);

export const useModal = () => {
    return {
        component,
        item,
        show,

        // methods to show/hide modal
        showModal: (props?: any) => { 
            item.value = props || {}; 
            show.value = true; 
        },
        hideModal: () => { 
            show.value = false

            item.value = {};
        },
    }
}
