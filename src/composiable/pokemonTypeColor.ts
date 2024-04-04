import { PokemonTypeNumbers } from "@/types/pokemon";

const colours: PokemonTypeNumbers = {
	normal: { type: '0', color: '#A8A77A'},
	fire: { type: '1', color: '#eaab7e'},
	water: { type: '2', color: '#95b7ff'},
	grass: { type: '3', color: '#7AC74C'},
	electric: { type: '4', color: '#F7D02C'},
	ice: { type: '5', color: '#96D9D6'},
	fighting: { type: '6', color: '#C22E28'},
	poison: { type: '7', color: '#A33EA1'},
	ground: { type: '8', color: '#E2BF65'},
	flying: { type: '9', color: '#A98FF3'},
	psychic: { type: '10', color: '#F95587'},
	bug: { type: '11', color: '#A6B91A'},
	rock: { type: '12', color: '#B6A136'},
	ghost: { type: '13', color: '#735797'},
	dark: { type: '14', color: '#705746'},
	dragon: { type: '15', color: '#6F35FC'},
	steel: { type: '16', color: '#B7B7CE'},
	fairy: { type: '17', color: '#D685AD'},
};
export const types = () => {
	return Object.keys(colours).map((key) => ({ number: colours[key].type, type: key, color: colours[key].color }));
}

export const type = (type: any) => colours[type.color] || '#777';
export const typeColors = colours;
