import { getMultiplePokemons, getGeneralInfoPokemon , getPokemon } from './pokemons';
import { ShowDamagePokemon, CleanDamageContainers } from './usercases/damage';
import { ShowEvolutionPokemon } from './usercases/evolution'
import { ShowGeneralInfo } from './usercases/general-info'
import { ShowAbilities } from './usercases/abilities'

/**
 * Global variables
 */
const imgPrincipal = document.querySelector('#img-principal');
let pokemonSearch = document.querySelector('#pokemon-search');
const btnSearch = document.querySelector('#btn-search');
const txtError = document.querySelector('#txt-error');
const txtPrincipal = document.querySelector('#principal-title');
const upPrincipalContent = document.querySelector('#up-principal-content');
const typePokemon = document.querySelector('#pokemon-type');
const generationPokemon = document.querySelector('#pokemon-generation');
const habitatPokemon = document.querySelector('#pokemon-habitat');
const idPokemonDiv = document.querySelector('#pokemon-id');
const btnNext = document.querySelector('#btn-next');
const btnPreview = document.querySelector('#btn-preview');
const btnGeneralInfo = document.querySelector('#btn-general-info');
const btnDamage = document.querySelector('#btn-damage-info');
const btnAbilities = document.querySelector('#btn-abilities-info');
const generalContent = document.querySelector('#general-content');
const abilitiesContent = document.querySelector('#abilities-content');
const damageContent = document.querySelector('#damage-content');
let offset = 0;
const pokemonTypes = {
    normal: '#A8A77A',
	fire: '#EE8130',
	water: '#6390F0',
	electric: '#F7D02C',
	grass: '#7AC74C',
	ice: '#96D9D6',
	fighting: '#C22E28',
	poison: '#A33EA1',
	ground: '#E2BF65',
	flying: '#A98FF3',
	psychic: '#F95587',
	bug: '#A6B91A',
	rock: '#B6A136',
	ghost: '#735797',
	dragon: '#6F35FC',
	dark: '#705746',
	steel: '#B7B7CE',
	fairy: '#D685AD',
    unknown: '#111111',
};

/**
 * Find pokemons limited by offset and limit
 * @param { Integer } offset 
 * @param { Integer } limit 
 */
const Pagination = (offset,limit) =>  {
    let cardContent = document.querySelector('#card-content');
    
    getMultiplePokemons(offset,limit, cardContent).then(data =>{
        data.results.forEach(pokemon => {
        getPokemon(pokemon.name).then(data => {
            let idDiv = data.species.name ,
                classDiv = 'card',
                classImg = 'img-card',
                srcImg = data.sprites.other.dream_world.front_default,
                classH1 = 'txt-card',
                txtH1 = ( data.species.name ).charAt(0).toUpperCase() + ( data.species.name ).slice(1),
                colorType = data.types[0].type.name,
                namePokemon = data.species.name;
        
            if ( srcImg === null ){
                srcImg = data.sprites.front_default;
            }
            PrintCards(cardContent, idDiv, classDiv , classImg , srcImg , classH1 , txtH1, colorType, namePokemon);
            }).catch();           
        });
    });   
};

/**
 * Find pokemon by search 
 * @param { String } pokemonSearch 
 */
const ShowSelectedPokemon = (pokemonSearch) =>{
    let idPokemon;
    typePokemon.innerHTML = '';
    CleanDamageContainers();
    getPokemon(pokemonSearch).then(
        data => { 
            idPokemon = data.id;

            if ( data.sprites.other.dream_world.front_default === null ){
                imgPrincipal.src = data.sprites.front_default;
            } else { 
                imgPrincipal.src = data.sprites.other.dream_world.front_default;
            }            
            txtPrincipal.innerHTML = (data.species.name).charAt(0).toUpperCase() + (data.species.name).slice(1);
            idPokemonDiv.innerHTML = '#' + idPokemon.toString();
            data.types.forEach(type => {           
                let typeText = document.createElement('small');
                let br = document.createElement('br');
                typeText.className = '';
                typeText.textContent = ( type.type.name ).charAt(0).toUpperCase() + ( type.type.name ).slice(1);
                typeText.style.backgroundColor = pokemonTypes[type.type.name];
                typePokemon.appendChild( typeText );
                typePokemon.appendChild( br );
                ShowDamagePokemon(type.type.url, pokemonTypes);
            });
            //typePokemon.innerHTML = 'Type-' + data.types[0].type.name.charAt(0).toUpperCase() + (data.types[0].type.name).slice(1);
            BackGroundColorPokemon(data.types[0].type.name, upPrincipalContent);  
            ShowGeneralInfoPokemon(idPokemon);
            ShowGeneralInfo(idPokemon);
            ShowAbilities(pokemonSearch); 
        }
    ).catch((error) => {console.error(error); txtError.innerHTML = 'Invalid Pokemon'}); 
};

/**
 * Generate the general information section
 * @param { Number } idPokemon 
 */
const ShowGeneralInfoPokemon = (idPokemon) => {
    getGeneralInfoPokemon(idPokemon).then(
        data => {
            generationPokemon.innerHTML = 'Generation-' + data.generation.name.substring(11).toUpperCase();           
            if(data.habitat != undefined && data.habitat != null){
                habitatPokemon.innerHTML = 'Habitat-' + data.habitat.name.charAt(0).toUpperCase() + (data.habitat.name).slice(1) ;
            } else{
                habitatPokemon.innerHTML = 'Habitat-Unknown'
            }
            ShowEvolutionPokemon(data.evolution_chain.url,);
        }
    ).catch();
};

/**Generic method that creates the cards */
export const PrintCards = ( cardDiv, idDiv, classDiv, classImg, srcImg, classH1, txtH1, colorType , namePokemon) => {
    let divItem, divCardPokemon, imgCard, txtCard, pokemonCard;
    
    divItem = document.createElement('div');
    divItem.id = idDiv;
    divItem.className = classDiv;
    cardDiv.appendChild(divItem);
    divCardPokemon = document.querySelector('#' + idDiv);
    imgCard = document.createElement('img');
    imgCard.className = classImg;
    imgCard.src= srcImg;
    divCardPokemon.appendChild(imgCard);
    txtCard = document.createElement('h1');
    txtCard.innerHTML = txtH1;
    txtCard.className = classH1;
    divCardPokemon.appendChild(txtCard);

    pokemonCard = document.querySelector('#' + idDiv);
    BackGroundColorPokemon(colorType, pokemonCard);
    ActionCards(pokemonCard, namePokemon);
};

/**
 * Set the pokemon background color 
 * @param { String } name 
 * @param { HTMLElement } div 
 */
const BackGroundColorPokemon = ( name, div ) => {
    if(name != undefined){
        div.style.backgroundColor = pokemonTypes[name];
    }
    else{
        div.style.backgroundColor = pokemonTypes['unknown'];
    }
};

/**
 * Add the click action to a pokemon cards
 */
const ActionCards = (div,name) => {     
    div.addEventListener('click', () => {
         ShowSelectedPokemon(name);
    });  
};

/**Action button search */
btnSearch.addEventListener('click', () => {
    pokemonSearch = document.querySelector('#pokemon-search').value;
    ShowSelectedPokemon(pokemonSearch);
});

pokemonSearch.addEventListener('keypress', function (e) {
    if (e.key === 'Enter') {
        pokemonSearch = document.querySelector('#pokemon-search').value;
        ShowSelectedPokemon(pokemonSearch);
    }
});

/**Clean text input when click */
pokemonSearch.addEventListener('click', () => {
    txtError.innerHTML = '';
});

/**Actions buttons general, abilities, damage */
btnGeneralInfo.addEventListener('click', () => {
    generalContent.style.display = 'block';
    abilitiesContent.style.display = 'none';
    damageContent.style.display = 'none';
    btnGeneralInfo.classList.add('btn-clicked');
    btnAbilities.classList.remove('btn-clicked');
    btnDamage.classList.remove('btn-clicked');

});

btnAbilities.addEventListener('click', () => {
    generalContent.style.display = 'none';
    abilitiesContent.style.display = 'block';
    damageContent.style.display = 'none';
    btnGeneralInfo.classList.remove('btn-clicked');
    btnAbilities.classList.add('btn-clicked');
    btnDamage.classList.remove('btn-clicked');

});

btnDamage.addEventListener('click', () => {
    generalContent.style.display = 'none';
    abilitiesContent.style.display = 'none';
    damageContent.style.display = 'block';
    btnGeneralInfo.classList.remove('btn-clicked');
    btnAbilities.classList.remove('btn-clicked');
    btnDamage.classList.add('btn-clicked');
});

/**Button next for pagination */
btnNext.addEventListener('click', () => {
    offset += 12;
    if (offset > 0)
    {
        btnPreview.disabled = false;
    }
    else{
        btnPreview.disabled = true;
    }
    Pagination( offset, 12 );
});

/**Button preview for pagination */
btnPreview.addEventListener('click', () => {   
    offset -= 12;
    if (offset > 0)
    {
        btnPreview.disabled = false;      
        
    } else {
        btnPreview.disabled = true;
    }  
    Pagination( offset, 12 ); 
});

/**Init application */
Pagination( offset, 12 );
ShowSelectedPokemon('pikachu');
