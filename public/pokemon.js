const imgPrincipal = document.querySelector('#img-principal');
let pokemonSearch = document.querySelector('#pokemon-search');
const btnSearch = document.querySelector('#btn-search');
const txtError = document.querySelector('#txt-error');
const txtPrincipal = document.querySelector('#principal-title');

const upPrincipalContent = document.querySelector('#up-principal-content');
const cardContent = document.querySelector('#card-content');

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

const  FindPokemon  = async(pokemon) =>  {
    const res = await fetch(`https://pokeapi.co/api/v2/pokemon/${ pokemon.toLowerCase() }`);
    const data = await res.json();
    /* console.log(data);
    console.log(data.types[0].type.name); */
 
    return data;
};
const LimitedPokemon = async(offset,limit) =>  {
    const res = await fetch(`https://pokeapi.co/api/v2/pokemon/?offset=${ offset }&limit= ${ limit }`);
    const data = await res.json();
    console.log(data);
    let  pokemonCard = '';
    data.results.forEach(pokemon => {
        FindPokemon(pokemon.name).then(data => {
            cardContent.innerHTML += '<div class=' + '"card"'+ `id="${ data.species.name }"`+'>' +
            '<img class=' + '"img-card"' + 'src='+`"${ data.sprites.other.dream_world.front_default }"`+'>' +
            '<h1 class=' + "txt-card" + `>${ (data.species.name).charAt(0).toUpperCase() + (data.species.name).slice(1) }</h1>
            </div>`;
            pokemonCard = document.querySelector(`#${ data.species.name }` ); 
            if(data.types[0].type.name != undefined){
                pokemonCard.style.backgroundColor = pokemonTypes[data.types[0].type.name];
            }
            else{
                pokemonCard.style.backgroundColor = pokemonTypes['unknown'];
            }
            (function () {
                pokemonCard.addEventListener('click', () => {
                actionFindPokemon(data.species.name);
                console.log(data.species.name)
            });
            }());
        }).catch();
    });
    
 
    return data;
};

const actionFindPokemon = (pokemonSearch) =>{
    FindPokemon(pokemonSearch).then(data => {
        
        imgPrincipal.src = data.sprites.other.dream_world.front_default;
        txtPrincipal.innerHTML = (data.species.name).charAt(0).toUpperCase() + (data.species.name).slice(1);
        
        if(data.types[0].type.name != undefined){
            upPrincipalContent.style.backgroundColor = pokemonTypes[data.types[0].type.name];
        }
        else{
            upPrincipalContent.style.backgroundColor = pokemonTypes['unknown'];
        }
    
    }).catch((error) => {console.error(error); txtError.innerHTML = 'Invalid Pokemon'});
};

btnSearch.addEventListener('click', () => {
    pokemonSearch = document.querySelector('#pokemon-search').value;
    actionFindPokemon(pokemonSearch);
});


pokemonSearch.addEventListener('click', () => {
    txtError.innerHTML = '';
});

LimitedPokemon(1,12);




 