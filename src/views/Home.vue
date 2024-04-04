<script setup lang="ts">
import { storeToRefs } from "pinia";
import { pokemonStore } from "@/stores/pokemonStore";
import { computed, onBeforeMount, markRaw, defineAsyncComponent } from "vue";
import { Pokemon, PokemonTypeNumbers } from "@/types/pokemon";
import { useModal } from "@/composiable/useModal";

import { typeColors, types } from "@/composiable/pokemonTypeColor";
import { isColorDark } from "@/composiable/isColorDark";

import { useRoute, useRouter } from "vue-router";

import cardComponent from "@/components/cardComponent.vue";
import cardSkeletonComponent from "@/components/cardSkeletonComponent.vue";
import paginationComponent from "@/components/paginationComponent.vue";

const modalComponent = defineAsyncComponent(
  () => import("@/components/modalComponent.vue")
);
const pokemonStatusListComponent = defineAsyncComponent(
  () => import("@/pattern/pokemonStatusList.vue")
);

const route = useRoute();
const router = useRouter();

const modal = useModal();

const pokemon = pokemonStore();

const { pokemonInfo, propPokemon } = storeToRefs(pokemon);

// const isOpenModal = ref(false);
// const stats = reactive(['all', 'total', 'hp', 'attack', 'defense', 'special-attack', 'special-defense', 'speed']);
const pokemonTypes = computed(() => types());

const pokemonIndex = computed(() => pokemonInfo.value);

const totalListPokemon = computed(() => {
  const value = propPokemon.value.total / propPokemon.value.quantity;
  return Math.floor(value) + (value % 1 > 0.05 ? 1 : 0);
});

function callPokemonModal(information: Pokemon) {
  modal.component.value = markRaw(modalComponent);
  modal.showModal(information);
}

async function downloadImage(item: any) {
  const id = item.id;
  const name = item.name;
  return pokemon.downloadImage(id, name);
}

async function handlePageChange(page: number) {
  // const filterTypeQuery = route.query.type;
  propPokemon.value.index = page;

  router.push({ query: { ...route.query, page: propPokemon.value.index } });
  // pokemonInfo.value = null;

  await pokemon.getPokemonInfo();

  if (pokemonIndex.value.length <= 0) {
  }
}

async function inputChangePage(page: number) {
  if (page) await handlePageChange(page);
  else return;
}

async function filterTypePokemon(event: Event, item: PokemonTypeNumbers | any) {
  const target = event.target as HTMLButtonElement;

  // remove the previous active
  const parentGroup = target.offsetParent;
  const activeButton = parentGroup?.querySelector(".active.opacity-100");
  activeButton?.classList.remove("active", "opacity-100");
  activeButton?.classList.add("opacity-25");

  if (!target.classList.contains("active")) {
    target.classList.add("active", "opacity-100");
    target.classList.remove("opacity-25");

    propPokemon.value.type = item.number;
    router.push({ query: { ...route.query, type: propPokemon.value.type } });

    // pokemonInfo.value = null;

    await pokemon.getPokemonInfo();
    await pokemon.getTotalLengthPokemon();
  } else {
    return;
  }
}

onBeforeMount(async () => {
  await pokemon.getPokemonInfo();
  await pokemon.getTotalLengthPokemon();

  console.log(pokemonIndex.value);
  console.log(pokemonTypes.value);
  console.log(totalListPokemon.value);
});
</script>

<template>
  <section class="sectionPokemon">
    <div class="rewriteContainer p-3">
      <!-- <div class="flex justify-end items-center gap-2 mb-3">
                <button
                    v-ripple-effect="{ backgroundColor: 'rgba(255,255,255,0.3)' }"
                    class="py-1 px-2 rounded-md focus:outline-none"
                    :class="[propPokemon.order === 'asc' ? 'bg-primary text-white' : 'bg-gray-400 text-dark']"
                    @click="propPokemon.order = 'asc'; router.push({ query: { ...route.query, order: propPokemon.order } })"
                >
                    Increase
                </button>
                <button
                    v-ripple-effect="{ backgroundColor: 'rgba(255,255,255,0.3)' }"
                    class="py-1 px-2 rounded-md focus:outline-none"
                    :class="[propPokemon.order === 'desc' ? 'bg-primary text-white' : 'bg-gray-400 text-dark']"
                    @click="propPokemon.order = 'desc'; router.push({ query: { ...route.query, order: propPokemon.order } })"
                >
                    Descrease
                </button>
            </div> -->

      <ul
        class="flex flex-row flex-nowrap md:flex-wrap overflow-auto pb-3 md:pb-0 gap-3 list-none mb-5"
      >
        <li v-for="(item, index) in pokemonTypes" :key="index">
          <button
            v-ripple-effect="{ backgroundColor: 'rgba(255,255,255,0.3)' }"
            :class="[
              `${isColorDark(item.color) ? 'text-white' : 'text-dark'}`,
              propPokemon.type
                ? propPokemon.type === item.number
                  ? 'active opacity-100'
                  : 'opacity-25'
                : index === 0
                ? 'active opacity-100'
                : 'opacity-25',
            ]"
            :style="{ backgroundColor: typeColors[item.type].color }"
            @click="filterTypePokemon($event, item)"
            class="btn block relative overflow-hidden text-black border-black hover:opacity-100 py-2 px-4 rounded-lg transition-all"
          >
            {{ item.type.toUpperCase() }}
          </button>
        </li>
      </ul>

      <div
        class="cardContainer grid grid-cols-[repeat(auto-fill,minmax(300px,1fr))] gap-4"
      >
        <template v-if="pokemonIndex">
          <template v-if="pokemonIndex.length > 0">
            <slot v-for="item in pokemonIndex" :key="item.id">
              <cardComponent
                :item="item"
                :key="item"
                @callPopup="callPokemonModal(item)"
                @downloadImage="downloadImage"
              />
            </slot>
          </template>

          <h3
            v-else
            class="flex justify-center items-center py-7 px-2 text-2xl font-bold uppercase text-center"
          >
            No any relative pokemon
          </h3>
        </template>

        <cardSkeletonComponent v-else v-for="item in 8" :key="item" />
      </div>

      <paginationComponent
        :currentPage="Number(propPokemon.index)"
        :totalPages="Number(totalListPokemon)"
        @changePage="handlePageChange"
        @inputPageChange="inputChangePage"
      />
    </div>

    <Teleport to="#modal">
      <component
        :is="modal.component.value"
        v-if="modal.show.value"
        @onClose="modal.hideModal"
      >
        <div class="grid grid-cols-1 mb-5">
          <!-- <img
                        width="202"
                        height="202"
                        decoding="async"
                        loading="lazy"
                        class="block relative max-w-[280px] w-auto md:w-full md:max-w-full p-5 rounded-xl mx-auto pointer-events-none select-none mb-3 mt-7"
                        :src="modal.item.value.sprites.other['official-artwork'].front_default"
                        :alt="modal.item.value.name"
                    /> -->

          <div class="block relative py-5">
            <div class="block relative text-center md:text-start">
              <small class="block relative text-gray-400 mb-3"
                >#{{ modal.item.value.id }}</small
              >
              <h2
                class="h2 text-3xl uppercase font-bold pl-1 mb-1"
                :style="{ color: modal.item.value.types[0].color }"
              >
                {{ modal.item.value.name }}
              </h2>

              <ul
                class="typeCategory flex flex-row flex-wrap justify-center md:justify-start list-none mb-5"
              >
                <li
                  v-for="(item, index) in modal.item.value.types"
                  :key="index"
                >
                  <span
                    class="capitalize bg-gray-200 text-gray-900 rounded-full px-2 py-1 text-xs mr-2 mb-2"
                    :style="{
                      backgroundColor: item.color,
                      color: isColorDark(item.color) ? '#ffffff' : '#161616',
                    }"
                  >
                    {{ item.type }}
                  </span>
                </li>
                <li v-if="modal.item.value.legendary === 1">
                  <span
                    class="capitalize bg-red-500 text-white rounded-full px-2 py-1 text-xs mr-2 mb-2"
                  >
                    legendary
                  </span>
                </li>
              </ul>
            </div>

            <div class="block relative mb-5">
              <h3 class="h3 text-2xl uppercase font-bold nunito pl-1 mb-1">
                HP: {{ modal.item.value.hp }}
              </h3>
              <div
                class="flex flex-col relative bg-slate-100 border border-slate-300 rounded-xl p-1"
              >
                <div class="block relative w-full h-2 bg-green-500 rounded-xl">
                  <span
                    class="block absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-sm text-white"
                  ></span>
                </div>
              </div>
            </div>

            <div class="block relative">
              <h3 class="h3 text-2xl uppercase font-bold nunito pl-2 mb-1">
                Stats
              </h3>

              <pokemonStatusListComponent :item="modal.item.value" />
            </div>
          </div>
        </div>
      </component>
    </Teleport>
  </section>
</template>

<style lang="scss" scoped>
.v-enter-active,
.v-leave-active {
  transition: opacity 0.5s ease;
}

.v-enter-from,
.v-leave-to {
  opacity: 0;
}

.sectionPokemon {
  display: block;
  position: relative;
  width: 100%;
  height: auto;

  margin-block: 3rem;

  .rewriteContainer {
    display: block;
    position: relative;
    max-width: 1440px;
    width: 100%;
    height: auto;
    margin: auto;
  }
}
</style>
