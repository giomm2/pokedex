import { getPokemon, getAbilityPokemons } from '../pokemons';

/**
 * Show the abilities section when a pokemon is selected
 * @param { String } idPokemon 
 */
export const ShowAbilities = (idPokemon) => {
    let abilitiesDescription = {};
    let abilities = [];
    const listAb = document.querySelector('#abilities-list');
    listAb.innerHTML = '';
    getPokemon(idPokemon).then(
        data => {
            data.abilities.forEach(ability => {
                abilitiesDescription[ability.ability.name] = ability.ability.url;
                abilities.push(ability.ability.name);
            });
            abilities.forEach(abi => {            
                let abiText = document.createElement('li');
                abiText.id = abi + '-ability';
                abiText.className = 'strong';
                abiText.textContent = ( abi ).charAt(0).toUpperCase() + ( abi ).slice(1);
                listAb.appendChild( abiText );  
            });
            ShowDescriptionAbilities(abilities,abilitiesDescription);
        }          
    ).catch();
};

/**
 * Show the ability description.
 * @param { Array } abilities 
 * @param { Object } abilitiesDescription 
 */
const ShowDescriptionAbilities = (abilities, abilitiesDescription) => {
    abilities.forEach( 
        abi => {
            getAbilityPokemons(abilitiesDescription[abi]).then(
                data => {
                    let liAbility = document.querySelector('#' + abi + '-ability');
                    let smallText = document.createElement('small');
                    data.effect_entries.forEach( language =>{
                        if(language.language.name === "en"){
                            smallText.textContent = (': ' + language.short_effect);
                            return true;
                        }
                    });                  
                    smallText.className = 'no-strong';
                    liAbility.appendChild( smallText );
                }
            ).catch()
        }
    );
};
