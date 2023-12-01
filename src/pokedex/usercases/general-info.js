import { getGeneralInfoPokemon } from '../pokemons';

/**
 * Global variables
 */
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
 * Show the general information of the Pokemon selected
 * @param { Number } idPokemon 
 */
export const ShowGeneralInfo = (idPokemon) => {
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

            eggGroups.forEach(egg => {            
                let eggText = document.createElement('li');
                eggText.className = 'list-eggs';
                eggText.textContent = ( egg ).charAt(0).toUpperCase() + ( egg ).slice(1);
                eggText.style.backgroundColor = groupEggsColor[egg];
                eggGroup.appendChild( eggText );
            });
        }
    ).catch();
};

/**
 * Sets the correct image
 * @param {S} value 
 * @returns Route image
 */
const srcGeneralInfo = (value) => {
    let src;
    if(value){
        src = './assets/images/yes.png';
    }else{
        src = './assets/images/no.png';
    }
    return src;
};
