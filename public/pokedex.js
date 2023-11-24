const imgPrincipal = document.querySelector('#img-principal');
let pokemonSearch = document.querySelector('#pokemon-search');
const btnSearch = document.querySelector('#btn-search');
const txtError = document.querySelector('#txt-error');
const txtPrincipal = document.querySelector('#principal-title');

const upPrincipalContent = document.querySelector('#up-principal-content');
const cardContent = document.querySelector('#card-content');

const typePokemon = document.querySelector('#pokemon-type');
const generationPokemon = document.querySelector('#pokemon-generation');
const habitatPokemon = document.querySelector('#pokemon-habitat');
const idPokemonDiv = document.querySelector('#pokemon-id');

let pokemonCardIds = [];
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
 * Find pokemon by name
 * @param { String }  pokemon 
 * @returns { Promise<object> } Pokemon
 */
const getPokemon  = async(pokemon) =>  {
    const res = await fetch(`https://pokeapi.co/api/v2/pokemon/${ pokemon.toLowerCase() }`);
    const data = await res.json();
    return data;
};

const getGeneralInfoPokemon = async(idPokemon) =>{
    const res = await fetch(`https://pokeapi.co/api/v2/pokemon-species/${ idPokemon }`);
    const data = await res.json();
    return data;
};

const getEvolutionPokemon = async(evolutionChain) =>{
    const res = await fetch(`https://pokeapi.co/api/v2/evolution-chain/${ evolutionChain }`);
    const data = await res.json();
    return data;
};

const getMultiplePokemons = async(offset, limit) => {
    const res = await fetch(`https://pokeapi.co/api/v2/pokemon/?offset=${ offset }&limit= ${ limit }`);
    const data = await res.json();
    return data;
};

/**
 * Find pokemon limited by offset and limit
 * @param { Integer } offset 
 * @param { Integer } limit 
 */
const LimitedPokemon = (offset,limit) =>  {
    getMultiplePokemons(offset,limit).then(data =>{
        console.log(data);
        let  pokemonCard = '';
        let count = 0;
        data.results.forEach(pokemon => {
        getPokemon(pokemon.name).then(data => {
            cardContent.innerHTML += 
            '<div class=' + '"card"'+ `id="${ data.species.name }"`+'>' +
            '<img class=' + '"img-card"' + 'src='+`"${ data.sprites.other.dream_world.front_default }"`+'>' +
            '<h1 class=' + "txt-card" + `>${ ( data.species.name ).charAt(0).toUpperCase() + ( data.species.name ).slice(1) }</h1>
            </div>`;
            pokemonCard = document.querySelector(`#${ data.species.name }` ); 
            pokemonCardIds.push(data.species.name);

            backGroundColorPokemon(data.types[0].type.name, pokemonCard);

            count++;
            if(limit === count) {
                actionCards();
            }
            }).catch();    
        });
    });   
};

/**
 * Add the click action to a pokemon cards
 */
const actionCards = () =>{ 
    pokemonCardIds.forEach(name => {     
        let idPokemon = document.querySelector('#' + name);       
        idPokemon.addEventListener('click', () => {
            ShowSelectedPokemon(name);
            console.log(name)
        });  
    });
};

/**
 * Find pokemon by search 
 * @param { String } pokemonSearch 
 */
const ShowSelectedPokemon = (pokemonSearch) =>{
    let idPokemon;
    let evolutionChainPokemon;

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
        }
    ).catch();
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




 