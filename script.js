let currentPokemon;
let pokemon;
let allPokemon = [];
let currentType;
let currentColor;
let pokemonAmount;

async function loadPokemon() {
    for (let i = 0; i < allPokemon.length; i++) {
        let url = `https://pokeapi.co/api/v2/pokemon/${allPokemon[i]}`;
        let response = await fetch(url);
        currentPokemon = await response.json();

        renderPokemonCard(currentPokemon, i);
    }
}


async function loadPokemonNames() {
    let url = `https://pokeapi.co/api/v2/pokemon?limit=${pokemonAmount}&offset=0`;
    let response = await fetch(url);
    pokemon = await response.json();
    for (i = 0; i < pokemon['results'].length; i++) {
        allPokemon.push(pokemon['results'][i]['name']);
    }
    loadPokemon();
}


function changePokemonAmount() {
    let amount = document.getElementById('amountInput').value;
    if (amount > 0) {
        allPokemon = [];
        renderClear();
        pokemonAmount = amount;
        loadPokemonNames();
    } else {
        alert('Number too small!');
    }
}


function renderPokemonCard(currentPokemon, i) {
    card = document.getElementById('main');
    card.innerHTML += /*html*/ `
        <div class="pokemon-card" id="pokemonCard${i}">
            <div class="pokemon-card-left">
            <strong id="pokemonCardName" class="pokemon-card-name">${currentPokemon['name']}</strong>
            <div class="pokemon-card-type" id="pokemonCardType${i}"> 
            </div>
        </div>
        <div class="pokemon-card-right">
            <div class="pokemon-card-id">
                <span># ${currentPokemon['id']}</span>
            </div>
            <div class="pokemon-card-img">
                <img src="${currentPokemon['sprites']['front_default']}">
            </div>
        </div>
    `;
    renderPokemonTypes(currentPokemon, i);
}


function renderPokemonTypes(currentPokemon, index) {
    for (let i = 0; i < currentPokemon['types'].length; i++) {
        document.getElementById(`pokemonCardType${index}`).innerHTML += `
        <div class="pokemon-card-type-bubble">
            <span>${currentPokemon['types'][i]['type']['name']}</span>
        </div>
        `;
        checkForType(currentPokemon['types'][0]['type']['name']);
        applyCardColor(index);
    }
}

function checkForType(currentType) {
    if (currentPokemon == 'normal') {
        currentColor = 'gray';
    }
    if (currentType == 'fire') {
        currentColor = 'red';
    }
    if (currentType == 'water') {
        currentColor = 'blue'
    }
    if (currentType == 'grass') {
        currentColor = 'green'
    }
    if (currentType == 'electric') {
        currentColor = 'yellow';
    }
    if (currentType == 'ice') {
        currentColor = 'light-blue';
    }
    if (currentType == 'fighting') {
        currentColor = 'dark-red';
    }
    if (currentType == 'poison') {
        currentColor = 'pink';
    }
    if (currentType == 'ground') {
        currentColor = 'dark-yellow';
    }
    if (currentType == 'flying') {
        currentColor = 'light-pink';
    }
    if (currentPokemon == 'psychic') {
        currentColor = 'dark-pink';
    }
    if (currentPokemon == 'bug') {
        currentColor = 'yellow-green';
    }
    if (currentPokemon == 'rock') {
        currentColor = 'light-brown';
    }
    if (currentPokemon == 'ghost') {
        currentColor = 'dark-violet';
    }
    if (currentPokemon == 'dark') {
        currentColor = 'brown';
    }
    if (currentPokemon == 'dragon') {
        currentColor = 'violet';
    }
    if (currentPokemon == 'steel') {
        currentColor = 'light-gray';
    }
    if (currentPokemon == 'fairy') {
        currentColor = 'bright-pink';
    }
}


function applyCardColor(i) {
    document.getElementById(`pokemonCard${i}`).classList.add(currentColor);
}


function renderClear() {
    document.getElementById('main').innerHTML = ``;
}