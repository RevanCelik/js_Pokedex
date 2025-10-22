let pokemons = [];
let pokemonList = [];

async function fetchDataJson() {
  let response = await fetch('https://pokeapi.co/api/v2/pokemon?limit=30&offset=0');
  let responseAsJson = await response.json();
  pokemons = responseAsJson.results;
  pokemonList = pokemons;

  renderPokemon(pokemonList);
}

async function fetchMorePokemon() {
  let response = await fetch('https://pokeapi.co/api/v2/pokemon?limit=60&offset=0');
  let responseAsJson = await response.json();
  pokemons = responseAsJson.results;
  pokemonList = pokemons;

  renderPokemon(pokemonList);
}

async function renderPokemon(pokemonList) {
  let pokemonContainer = document.getElementById("pokemon-content");
  pokemonContainer.innerHTML = "";

  for (let i = 0; i < pokemonList.length; i++) {
    const {name, url} = pokemonList[i];
    const response = await fetch(url);
    const detail = await response.json();

    const primaryType = detail.types[0]?.type.name;
    const secondaryType = detail.types[1]?.type.name;

    pokemonContainer.innerHTML += `
            <div onclick="toggleOverlay(${i})" class="${primaryType} hover-effect border-style-pokemon">
                <div>
                    <strong>${capitalizeFirstLetter(name)}</strong>
                </div>

                <div class="type-style">${capitalizeFirstLetter(primaryType)}</div>
                ${secondaryType ? `<div class="type-style">${capitalizeFirstLetter(secondaryType)}</div>` : ""}

                <div class="image-center">
                <img src="${detail.sprites.front_default}">
                </div>
            </div>    
                `;
  }
}

async function showPokemonInOverlay(index) {
  const overlayInfo = document.getElementById('overlay-info');
  const p = pokemons[index];

  const response = await fetch(p.url);
  const detail = await response.json();

  let hpPokemon = detail.stats.find(s => s.stat.name === "hp")?.base_stat || '-';
  let abilityPokemon = detail.abilities.map(a => capitalizeFirstLetter(a.ability.name)).join (', ') || '-';
  let heightPokemon = (detail.height / 10).toFixed(2) + ' m';
  let weightPokemon = (detail.weight / 10).toFixed(1) + ' kg';

  const primaryType = detail.types[0]?.type.name;
  const secondaryType = detail.types[1]?.type.name;

  overlayInfo.innerHTML = `
  <div class="overlay-background">
    <div class="${primaryType} border-style-overlay">
    <h2>${capitalizeFirstLetter(p.name)}</h2>
    <img src="${detail.sprites.front_default}" alt="${p.name}" class="overlay-img">
    <div class="type-container">
    <div class="type-style">${capitalizeFirstLetter(primaryType)}</div>
    ${secondaryType ? `<div class="type-style">${capitalizeFirstLetter(secondaryType)}</div>` : ""}
    </div>
    <div class="overlay-card-style">
      <div class="overlay-pokemon-left">
        <p>HP:</p>
        <p>Height:</p>
        <p>Weight:</p>
        <p>Abilities:</p>
      </div>
      <div class="overlay-pokemon-right">
        <p>${hpPokemon}</p>
        <p>${heightPokemon}</p>
        <p>${weightPokemon}</p>
        <p>${abilityPokemon}</p>
      </div>
    </div>
  </div>
  `;
}

function toggleOverlay(i) {
  const overlayRef = document.getElementById('overlay');

  if (i !== undefined) {
    currentIndex = i;
    showPokemonInOverlay(currentIndex);
    overlayRef.classList.remove('d_none');
  } else {
    overlayRef.classList.add('d_none');
  }
}