import {getEvolutionPokemon, getMultiplePokemons, getGeneralInfoPokemon , getPokemon} from './pokemons';


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

let pokemonSelectedEvolutionFrom = '';

const evolutionContent1 = document.querySelector('#evolution-content-1');
const evolutionContent2 = document.querySelector('#evolution-content-2');
const evolutionContent3 = document.querySelector('#evolution-content-3');

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
 * Find pokemon limited by offset and limit
 * @param { Integer } offset 
 * @param { Integer } limit 
 */
const LimitedPokemon = (offset,limit) =>  {
    getMultiplePokemons(offset,limit).then(data =>{
        data.results.forEach(pokemon => {
        getPokemon(pokemon.name).then(data => {
            let cardContent = document.querySelector('#card-content'),
            idDiv = data.species.name ,
            classDiv = 'card',
            classImg = 'img-card',
            srcImg = data.sprites.other.dream_world.front_default,
            classH1 = 'txt-card',
            txtH1 = ( data.species.name ).charAt(0).toUpperCase() + ( data.species.name ).slice(1),
            colorType = data.types[0].type.name,
            namePokemon = data.species.name;
        
            printCards(cardContent, idDiv, classDiv , classImg , srcImg , classH1 , txtH1, colorType, namePokemon);

            }).catch();           
        });
    });   
};

/**
 * Add the click action to a pokemon cards
 */
const actionCards = (div,name) =>{     
    div.addEventListener('click', () => {
         ShowSelectedPokemon(name);
    });  
};

/**
 * Find pokemon by search 
 * @param { String } pokemonSearch 
 */
const ShowSelectedPokemon = (pokemonSearch) =>{
    let idPokemon;
    evolutionContent1.innerHTML = '';
    evolutionContent2.innerHTML = '';
    evolutionContent3.innerHTML = '';

    getPokemon(pokemonSearch).then(
        data => { 
            idPokemon = data.id; 
            imgPrincipal.src = data.sprites.other.dream_world.front_default;
            txtPrincipal.innerHTML = (data.species.name).charAt(0).toUpperCase() + (data.species.name).slice(1);
            idPokemonDiv.innerHTML = '#' + idPokemon.toString();
            typePokemon.innerHTML = 'Type-' + data.types[0].type.name.charAt(0).toUpperCase() + (data.types[0].type.name).slice(1);
            backGroundColorPokemon(data.types[0].type.name, upPrincipalContent);  
            ShowGeneralInfoPokemon(idPokemon); 
        }
    ).catch((error) => {console.error(error); txtError.innerHTML = 'Invalid Pokemon'});

    
};

const ShowGeneralInfoPokemon = (idPokemon) => {
    getGeneralInfoPokemon(idPokemon).then(
        data => {
            generationPokemon.innerHTML = 'Generation-' + data.generation.name.substring(11).toUpperCase();
            
            if(data.habitat != undefined && data.habitat != null){
                habitatPokemon.innerHTML = 'Habitat-' + data.habitat.name.charAt(0).toUpperCase() + (data.habitat.name).slice(1) ;
            } else{
                habitatPokemon.innerHTML = 'Habitat-Unknown'
            }

            showEvolutionPokemon(data.evolution_chain.url);

        }
    ).catch();
};

const showEvolutionPokemon = (evolutionChainURL) => {
    let pokemonName;
    getEvolutionPokemon(evolutionChainURL).then(
        data => {
            pokemonSelectedEvolutionFrom = data.chain.species.name;
            
            data.chain.evolves_to.forEach( function (pokemon, i){
                pokemonName = pokemon.species.name;
                printEvolutionCardsPokemon(evolutionContent2, pokemonName);
                
                data.chain.evolves_to[i].evolves_to.forEach( pokemon2 => {
                    pokemonName= pokemon2.species.name;
                    printEvolutionCardsPokemon(evolutionContent3, pokemonName);
                });
            });

        console.log(pokemonSelectedEvolutionFrom);

        printEvolutionCardsPokemon(evolutionContent1, pokemonSelectedEvolutionFrom);

    }).catch();
};


const printEvolutionCardsPokemon  =  (div, name) => {
    getPokemon(name).then(data => {
        let idDiv = data.species.name + '-evo',
            classDiv = 'card-evo',
            classImg = 'img-card-evo',
            srcImg = data.sprites.other.dream_world.front_default,
            classH1 = 'txt-card',
            txtH1 = ( data.species.name ).charAt(0).toUpperCase() + ( data.species.name ).slice(1),
            colorType = data.types[0].type.name,
            namePokemon = data.species.name;
        
        printCards(div, idDiv, classDiv , classImg , srcImg , classH1 , txtH1, colorType, namePokemon)   
    }).catch();    
};

const printCards = ( cardDiv, idDiv, classDiv, classImg, srcImg, classH1, txtH1, colorType , namePokemon) =>{
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
    backGroundColorPokemon(colorType, pokemonCard);
    actionCards(pokemonCard, namePokemon);
};

/**
 * Set the pokemon background color 
 * @param { String } name 
 * @param { String } div 
 */
const backGroundColorPokemon = ( name, div ) =>{
    if(name != undefined){
        div.style.backgroundColor = pokemonTypes[name];
    }
    else{
        div.style.backgroundColor = pokemonTypes['unknown'];
    }
};

/**
 * Section with actions
 */
btnSearch.addEventListener('click', () => {
    pokemonSearch = document.querySelector('#pokemon-search').value;
    ShowSelectedPokemon(pokemonSearch);
});


pokemonSearch.addEventListener('click', () => {
    txtError.innerHTML = '';
});

LimitedPokemon(0,12);
ShowSelectedPokemon('pikachu');
