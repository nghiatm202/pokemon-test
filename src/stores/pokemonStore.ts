import { ref } from 'vue'
import { defineStore } from 'pinia'
import { Pokemon } from '@/types/pokemon';
import { types } from '@/composiable/pokemonTypeColor';
import { useRoute } from 'vue-router';

import axios from 'axios'

export const pokemonStore = defineStore('pokemon', () => {
    const route = useRoute();
    const pokemonInfo: any = ref();

    const propPokemon: any = ref({
        index: route.query?.page ? Number(route.query.page) : 1,
        quantity: 10,
        type: route.query?.type ? route.query.type : '',
        sort: route.query?.sort ? route.query.sort : 'number',
        total: 100
    })

    async function getPokemonInfo () {
        const page = `page[number]=${propPokemon.value.index ? propPokemon.value.index : '1'}`;
        const quantityPage = `page[size]=${propPokemon.value.quantity ? propPokemon.value.quantity : '1'}`;
        const sortPage = `sort=${propPokemon.value.sort ? propPokemon.value.sort : 'number'}`
        const filterType = `filter[type]=${propPokemon.value.type ? propPokemon.value.type : ''}`;

        const query = `?${page}&${quantityPage}&${filterType}&${sortPage}`;

        const response = await axios.get(query);

        const pokemonIndex = Promise.all(response.data.data.map(async (pokemon: any) => {
            const pokemonTypes = types();
            const pokemonType1 = pokemonTypes.find((type: any) => type.number === String(pokemon.type_1));
            const pokemonType2 = pokemonTypes.find((type: any) => type.number === String(pokemon.type_2));
            const combineTypes = [pokemonType1, pokemonType2];

            // if inside comebineTypes array have undefined, remove that undefined
            const finalTypes = combineTypes.filter((type: any) => type !== undefined);
            pokemon.types = finalTypes;

            // return pokemon

            return pokemon
        }));

        return pokemonIndex.then((pokemonIndex: Pokemon[]) => {
            pokemonInfo.value = pokemonIndex
            return pokemonInfo.value
        });
    }

    async function getTotalLengthPokemon() {
        const query = `?filter[type]=${propPokemon.value.type ? propPokemon.value.type : ''}`;
        const response = await axios.get(query);
        console.log("response: ", response);

        propPokemon.value.total = response.data.meta.total;

        return response.data.data.length;
    }

    const downloadImage = async (pokemonId: number | string, pokemonName: string) => {
        const link = document.createElement('a');
        link.href = `https://api.eien-development.com/api/pokemon-api/pokemons/${pokemonId}/sprite`;
        link.download = `${pokemonName}.webp`;
        link.click();
    }

    return {
        propPokemon,
        pokemonInfo,
        getPokemonInfo,
        downloadImage,
        getTotalLengthPokemon,
    }
})