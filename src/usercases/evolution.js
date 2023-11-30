import { PrintCards } from '../pokedex'
import { getEvolutionPokemon, getPokemon } from '../pokemons';

/**
 * Global variables
 */
const evolutionContent1 = document.querySelector('#evolution-content-1');
const evolutionContent2 = document.querySelector('#evolution-content-2');
const evolutionContent3 = document.querySelector('#evolution-content-3');

/**
 * Generates the evolution section
 * @param { String } evolutionChainURL 
 */
export const ShowEvolutionPokemon = (evolutionChainURL) => {
    let pokemonName;
    evolutionContent1.innerHTML = '';
    evolutionContent2.innerHTML = '';
    evolutionContent3.innerHTML = '';
    let pokemonSelectedEvolutionFrom = '';
    getEvolutionPokemon(evolutionChainURL).then(
        data => {
            pokemonSelectedEvolutionFrom = data.chain.species.name;
            
            data.chain.evolves_to.forEach( function (pokemon, i){
                pokemonName = pokemon.species.name;
                PrintEvolutionCardsPokemon(evolutionContent2, pokemonName);
                
                data.chain.evolves_to[i].evolves_to.forEach( pokemon2 => {
                    pokemonName= pokemon2.species.name;
                    PrintEvolutionCardsPokemon(evolutionContent3, pokemonName);
                });
            });

        PrintEvolutionCardsPokemon(evolutionContent1, pokemonSelectedEvolutionFrom);

    }).catch();
};

/**
 * Generates the evolution cards
 * @param { HTMLElement } div 
 * @param { String } name 
 */
const PrintEvolutionCardsPokemon  =  (div, name) => {
    getPokemon(name).then(data => {
        let idDiv = data.species.name + '-evo',
            classDiv = 'card-evo',
            classImg = 'img-card-evo',
            srcImg = data.sprites.other.dream_world.front_default,
            classH1 = 'txt-card',
            txtH1 = ( data.species.name ).charAt(0).toUpperCase() + ( data.species.name ).slice(1),
            colorType = data.types[0].type.name,
            namePokemon = data.species.name;

            if ( srcImg === null ){
                srcImg = data.sprites.front_default;
            }
        PrintCards(div, idDiv, classDiv , classImg , srcImg , classH1 , txtH1, colorType, namePokemon)   
    }).catch();    
};
