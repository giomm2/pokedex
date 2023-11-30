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

export const getCountPokemons  = async() =>  {
    const res = await fetch(`https://pokeapi.co/api/v2/pokemon/`);
    const data = await res.json();
    return data.count;
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

export const getMultiplePokemons = async(offset, limit, div) => {
    div.innerHTML = 'Loading ...';
    const res = await fetch(`https://pokeapi.co/api/v2/pokemon/?offset=${ offset }&limit= ${ limit }`);
    const data = await res.json();
    div.innerHTML = ''; 
    return data;
};

export const getAbilityPokemons = async(abilityLink) => {
    const res = await fetch(abilityLink);
    const data = await res.json();
    return data;
};
export const getDamagePokemons = async(damageLink) => {
    const res = await fetch(damageLink);
    const data = await res.json();
    return data;
};