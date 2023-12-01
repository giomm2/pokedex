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
export const CleanDamageContainers = () => {
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
export const ShowDamagePokemon = (damageLink, pokemonTypes) => {
    getDamagePokemons(damageLink).then(
        data => {
            PrintDoubleDamageTo(data.damage_relations, pokemonTypes);
            PrintHalfDamageTo(data.damage_relations, pokemonTypes);
            PrintNoDamageTo(data.damage_relations, pokemonTypes);
            PrintDoubleDamageFrom(data.damage_relations, pokemonTypes);
            PrintHalfDamageFrom(data.damage_relations, pokemonTypes);
            PrintNoDamagefrom(data.damage_relations, pokemonTypes);
        }
    ).catch();
};

/**
 * Print double damage to section
 * @param { object } data
 * @param { object } pokemonTypes  
 */
const PrintDoubleDamageTo = (data, pokemonTypes)=> {
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
const PrintHalfDamageTo = (data, pokemonTypes)=> {
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
const PrintNoDamageTo = (data, pokemonTypes)=> {
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
const PrintDoubleDamageFrom = (data, pokemonTypes)=> {
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
const PrintHalfDamageFrom = (data, pokemonTypes)=> {
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
const PrintNoDamagefrom = (data, pokemonTypes)=> {
    data.no_damage_from.forEach(damage => {
        let li = damage.name;            
        let liText = document.createElement('li');
        liText.className = 'list-eggs';
        liText.textContent = ( li ).charAt(0).toUpperCase() + ( li ).slice(1);
        liText.style.backgroundColor = pokemonTypes[li];
        noDamageFrom.appendChild( liText );
    });
};
