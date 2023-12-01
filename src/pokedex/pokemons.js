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

/**
 * Find pokemon-species by ID 
 * @param { Number } idPokemon 
 * @returns { Promise<object> } Pokemon
 */
export const getGeneralInfoPokemon = async(idPokemon) =>{
    const res = await fetch(`https://pokeapi.co/api/v2/pokemon-species/${ idPokemon }`);
    const data = await res.json();
    return data;
};

/**
 * Find the pokemons evolution
 * @param { String } evolutionChain 
 * @returns { Promise<object> } Pokemon
 */
export const getEvolutionPokemon = async(evolutionChain) =>{
    const res = await fetch( evolutionChain );
    const data = await res.json();
    return data;
};

/**
 * Find multiple pokemons
 * @param { Number } offset 
 * @param { Number } limit 
 * @param { String } div 
 * @returns { Promise<object> } Pokemon
 */
export const getMultiplePokemons = async(offset, limit, div) => {
    div.innerHTML = 'Loading ...';
    const res = await fetch(`https://pokeapi.co/api/v2/pokemon/?offset=${ offset }&limit= ${ limit }`);
    const data = await res.json();
    div.innerHTML = ''; 
    return data;
};

/**
 * Find pokemons abilities
 * @param { String } abilityLink 
 * @returns { Promise<object> } Pokemon
 */
export const getAbilityPokemons = async(abilityLink) => {
    const res = await fetch(abilityLink);
    const data = await res.json();
    return data;
};
/**
 * Find pokemons damage
 * @param { String } damageLink 
 * @returns { Promise<object> } Pokemon
 */
export const getDamagePokemons = async(damageLink) => {
    const res = await fetch(damageLink);
    const data = await res.json();
    return data;
};
