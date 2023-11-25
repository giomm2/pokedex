/**
 * Find pokemon by name
 * @param { String }  pokemon 
 * @returns { Promise<object> } Pokemon
 */
export const getPokemon  = async(pokemon) =>  {
    const res = await fetch(`https://pokeapi.co/api/v2/pokemon/${ pokemon.toLowerCase() }`);
    const data = await res.json();
    return data;
};

export const getGeneralInfoPokemon = async(idPokemon) =>{
    const res = await fetch(`https://pokeapi.co/api/v2/pokemon-species/${ idPokemon }`);
    const data = await res.json();
    return data;
};

export const getEvolutionPokemon = async(evolutionChain) =>{
    const res = await fetch( evolutionChain );
    const data = await res.json();
    return data;
};

export const getMultiplePokemons = async(offset, limit) => {
    const res = await fetch(`https://pokeapi.co/api/v2/pokemon/?offset=${ offset }&limit= ${ limit }`);
    const data = await res.json();
    return data;
};