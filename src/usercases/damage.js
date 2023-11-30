import { getDamagePokemons } from '../pokemons';

/**
 * Global variables
 */
const doubleDamageTo = document.querySelector('#doble-damage-to');
const halfDamageTo = document.querySelector('#half-damage-to');
const noDamageTo = document.querySelector('#no-damage-to');
const doubleDamageFrom = document.querySelector('#doble-damage-from');
const halfDamageFrom = document.querySelector('#half-damage-from');
const noDamageFrom = document.querySelector('#no-damage-from');

/**
 * Clean damage containers 
 */
export const cleanDamageContainers = () => {
    doubleDamageTo.innerHTML = '';
    halfDamageTo.innerHTML = ''; 
    noDamageTo.innerHTML = ''; 
    doubleDamageFrom.innerHTML = ''; 
    halfDamageFrom.innerHTML = ''; 
    noDamageFrom.innerHTML = ''; 
};

/**
 * Function that calls the prints methods
 * @param { String } damageLink
 * @param { object } pokemonTypes  
 */
export const showDamagePokemon = (damageLink, pokemonTypes) => {
    getDamagePokemons(damageLink).then(
        data => {
            printDoubleDamageTo(data.damage_relations, pokemonTypes);
            printHalfDamageTo(data.damage_relations, pokemonTypes);
            printNoDamageTo(data.damage_relations, pokemonTypes);
            printDoubleDamageFrom(data.damage_relations, pokemonTypes);
            printHalfDamageFrom(data.damage_relations, pokemonTypes);
            printNoDamagefrom(data.damage_relations, pokemonTypes);
        }
    ).catch();
};

/**
 * Print double damage to section
 * @param { object } data
 * @param { object } pokemonTypes  
 */
const printDoubleDamageTo = (data, pokemonTypes)=> {
    data.double_damage_to.forEach(damage => {
        let li = damage.name;            
        let liText = document.createElement('li');
        liText.className = 'list-eggs';
        liText.textContent = ( li ).charAt(0).toUpperCase() + ( li ).slice(1);
        liText.style.backgroundColor = pokemonTypes[li];
        doubleDamageTo.appendChild( liText );
    });
};

/**
 * Print half damage to section
 * @param { object } data
 * @param { object } pokemonTypes  
 */
const printHalfDamageTo = (data, pokemonTypes)=> {
    data.half_damage_to.forEach(damage => {
        let li = damage.name;            
        let liText = document.createElement('li');
        liText.className = 'list-eggs';
        liText.textContent = ( li ).charAt(0).toUpperCase() + ( li ).slice(1);
        liText.style.backgroundColor = pokemonTypes[li];
        halfDamageTo.appendChild( liText );
    });
};

/**
 * Print no damage to section
 * @param { object } data
 * @param { object } pokemonTypes  
 */
const printNoDamageTo = (data, pokemonTypes)=> {
    data.no_damage_to.forEach(damage => {
        let li = damage.name;            
        let liText = document.createElement('li');
        liText.className = 'list-eggs';
        liText.textContent = ( li ).charAt(0).toUpperCase() + ( li ).slice(1);
        liText.style.backgroundColor = pokemonTypes[li];
        noDamageTo.appendChild( liText );
    });
};

/**
 * Print double damage from section
 * @param { object } data
 * @param { object } pokemonTypes  
 */
const printDoubleDamageFrom = (data, pokemonTypes)=> {
    data.double_damage_from.forEach(damage => {
        let li = damage.name;            
        let liText = document.createElement('li');
        liText.className = 'list-eggs';
        liText.textContent = ( li ).charAt(0).toUpperCase() + ( li ).slice(1);
        liText.style.backgroundColor = pokemonTypes[li];
        doubleDamageFrom.appendChild( liText );
    });
};

/**
 * Print half damage from section
 * @param { object } data 
 * @param { object } pokemonTypes 
 */
const printHalfDamageFrom = (data, pokemonTypes)=> {
    data.half_damage_from.forEach(damage => {
        let li = damage.name;            
        let liText = document.createElement('li');
        liText.className = 'list-eggs';
        liText.textContent = ( li ).charAt(0).toUpperCase() + ( li ).slice(1);
        liText.style.backgroundColor = pokemonTypes[li];
        halfDamageFrom.appendChild( liText );
    });
};

/**
 * Print no damage from section
 * @param { object } data
 * @param { object } pokemonTypes  
 */
const printNoDamagefrom = (data, pokemonTypes)=> {
    data.no_damage_from.forEach(damage => {
        console.log('no damage', damage.name)
        let li = damage.name;            
        let liText = document.createElement('li');
        liText.className = 'list-eggs';
        liText.textContent = ( li ).charAt(0).toUpperCase() + ( li ).slice(1);
        liText.style.backgroundColor = pokemonTypes[li];
        noDamageFrom.appendChild( liText );
    });
};
