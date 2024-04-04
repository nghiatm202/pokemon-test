export interface PokemonSprite {
    back_default: string;
    back_female: string | null;
    back_shiny: string;
    back_shiny_female: string | null;
}

export interface PokemonType {
    slot: number;
    type: {
        name: string;
        url: string;
    };
}

export interface PokemonVersionSprites { // Example: Generation I 
    "red-blue": PokemonSprite;
    yellow: PokemonSprite;
}

export interface Pokemon {
    id: string;
    number: number;
    name: string;
    type_1: number;
    type_2: number | null;
    total: number;
    hp: number;
    attack: number;
    defense: number;
    sp_atk: number;
    sp_def: number;
    speed: number;
    generation: number;
    legendary: boolean;
    sprites: PokemonSprite;
    versions: Record < string, PokemonVersionSprites > ; // Record for flexible keys
}

export interface PokemonFilters {
    index: number | string,
    quantity?: number,
    name?: string; // Optional name filter
    sort?: string;
    generation?: number | string; 
    legendary?: 0 | 1; // Assuming 0 represents 'not legendary', 1 represents 'legendary' 
    type?: number | string | null | any;
    min_total?: number | string;
    max_total?: number | string; 
    min_speed?: number | string;
    max_speed?: number | string;
    min_sp_def?: number | string; 
    max_sp_def?: number | string; 
    min_sp_atk?: number | string;
    max_sp_atk?: number | string;
    min_hp?: number | string; 
    max_hp?: number | string;
    min_defense?: number | string;
    max_defense?: number | string;
    min_attack?: number | string;
    max_attack?: number | string;
}

interface PokemonTypeColor {
    type: number | string; // The type number (e.g., '0', '1', '2', etc.)
    color: string; // The associated hex color code
}

export type PokemonTypeNumbers = Record<string, PokemonTypeColor>; 
