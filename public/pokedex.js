import {getEvolutionPokemon, getMultiplePokemons, getGeneralInfoPokemon , getPokemon, getCountPokemons} from './pokemons';


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

const btnNext = document.querySelector('#btn-next');
const btnPreview = document.querySelector('#btn-preview');




let offset = 0;
const maxPokemons = getCountPokemons();
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

const groupEggsColor = {
    monster: '#D25064',
	humanshape: '#D29682',
	water1: '#97B5FD',
	water3: '#5876BE',
	bug: '#AAC22A',
	mineral: '#7A6252',
	flying: '#B29AFA',
	amorphous: '#8A8A8A',
	ground: '#E0C068',
	flying: '#A98FF3',
	water2: '#729AFA',
	fairy: '#FFC8F0',
	ditto: '#A664BF',
	plant: '#82D25A',
	dragon: '#7A42FF',
	'no-eggs': '#333333',
	indeterminate: '#0080C0',
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
            printCards(cardContent, idDiv, classDiv , classImg , srcImg , classH1 , txtH1, colorType, namePokemon);

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
            typePokemon.innerHTML = 'Type-' + data.types[0].type.name.charAt(0).toUpperCase() + (data.types[0].type.name).slice(1);
            backGroundColorPokemon(data.types[0].type.name, upPrincipalContent);  
            ShowGeneralInfoPokemon(idPokemon);
            ShowGeneralInfo(idPokemon); 
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

            showEvolutionPokemon(data.evolution_chain.url);

        }
    ).catch();
};

/**
 * Generates the evolution section
 * @param { String } evolutionChainURL 
 */
const showEvolutionPokemon = (evolutionChainURL) => {
    let pokemonName;
    evolutionContent1.innerHTML = '';
    evolutionContent2.innerHTML = '';
    evolutionContent3.innerHTML = '';
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

        printEvolutionCardsPokemon(evolutionContent1, pokemonSelectedEvolutionFrom);

    }).catch();
};

/**
 * Generates the evolution cards
 * @param { HTMLElement } div 
 * @param { String } name 
 */
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

            if ( srcImg === null ){
                srcImg = data.sprites.front_default;
            }
        
        printCards(div, idDiv, classDiv , classImg , srcImg , classH1 , txtH1, colorType, namePokemon)   
    }).catch();    
};

/**Generic method that creates the cards */
const printCards = ( cardDiv, idDiv, classDiv, classImg, srcImg, classH1, txtH1, colorType , namePokemon) => {
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
 * @param { HTMLElement } div 
 */
const backGroundColorPokemon = ( name, div ) => {
    if(name != undefined){
        div.style.backgroundColor = pokemonTypes[name];
    }
    else{
        div.style.backgroundColor = pokemonTypes['unknown'];
    }
};


const ShowGeneralInfo = (idPokemon) => {
    let captureRate, growthRate, isLegendary, isMythical, isBaby;
    let eggGroups = []; 
    const capture = document.querySelector('#capture-rate');
    const growth = document.querySelector('#growth-rate');
    const legendary = document.querySelector('#legendary');
    const mythical = document.querySelector('#mythical');
    const baby = document.querySelector('#baby');
    const eggGroup = document.querySelector('#egg-group');

    eggGroup.innerHTML = '';
    
    getGeneralInfoPokemon(idPokemon).then( 
        data =>{
            captureRate = data.capture_rate;
            growthRate = data.growth_rate.name;
            isLegendary = data.is_legendary;
            isMythical = data.is_mythical;
            isBaby = data.is_baby;
            data.egg_groups.forEach(group => {
                eggGroups.push(group.name);
            });

            capture.textContent = captureRate;
            growth.textContent =  growthRate;
            legendary.src = srcGeneralInfo(isLegendary);
            mythical.src = srcGeneralInfo(isMythical);
            baby.src = srcGeneralInfo(isBaby);


            eggGroups.forEach(egg =>{            
                let eggText = document.createElement('li');
                eggText.className = 'list-eggs';
                eggText.textContent = ( egg ).charAt(0).toUpperCase() + ( egg ).slice(1);
                eggText.style.backgroundColor = groupEggsColor[egg];
                console.log(groupEggsColor[egg]);
                eggGroup.appendChild( eggText );
            });
        }

    ).catch();
};

const srcGeneralInfo = (value) => {
    let src;
    if(value){
        src = './public/assets/images/yes.png';
    }else{
        src = './public/assets/images/no.png';
    }
    return src;
};

/**
 * Add the click action to a pokemon cards
 */
const actionCards = (div,name) => {     
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
