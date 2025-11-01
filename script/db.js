let pokemons = [];
let pokemonList = [];

async function fetchDataJson() {
  showLoader();
  let response = await fetch('https://pokeapi.co/api/v2/pokemon?limit=30&offset=0');
  let responseAsJson = await response.json();
  pokemons = responseAsJson.results;
  pokemonList = pokemons;
  await renderPokemon(pokemonList);
  hideLoader();
}

async function fetchMorePokemon() {
  const button = document.getElementById('loadPokemon');
  button.disabled = true;
  showLoader();
  let response = await fetch('https://pokeapi.co/api/v2/pokemon?limit=60&offset=0');
  let responseAsJson = await response.json();
  pokemons = responseAsJson.results;
  pokemonList = pokemons;
  await renderPokemon(pokemonList);
  hideLoader();
  button.disabled = false;
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
    pokemonContainer.innerHTML += renderPokemonTemplate({i, name, primaryType, secondaryType, detail});
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

  overlayInfo.innerHTML = pokemonInOverlayTemplate({name: p.name,  detail, hpPokemon, abilityPokemon, heightPokemon, weightPokemon, primaryType, secondaryType});
}