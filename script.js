let currentIndex = 0;

function capitalizeFirstLetter(string) {
  return string.charAt(0).toUpperCase() + string.slice(1);
}

document.getElementById('overlay-pokemon').addEventListener('click', function (event) {
  event.stopPropagation();
});

function navigate(direction, event) {
  event.stopPropagation();
  currentIndex += direction;

  if (currentIndex < 0) {
    currentIndex = pokemons.length - 1;
  } else if (currentIndex >= pokemons.length) {
    currentIndex = 0;
  }
  showPokemonInOverlay(currentIndex);
}

function filterPokemonNames() {
  const pokemonValue = document.getElementById("pokemonName").value.toLowerCase();
  const warning = document.getElementById("search-warning");
  const notFound = document.getElementById("not-found");
  
  if (pokemonValue.length < 3) {
    pokemonList = pokemons;
    warning.style.display = "block";
    notFound.style.display = "none";
  } else {
    pokemonList = pokemons.filter(p => p.name.toLowerCase().includes(pokemonValue));
    warning.style.display = "none";
    notFound.style.display = pokemonList.length ? "none" : "block";
  }
  renderPokemon(pokemonList);
}

function toggleOverlay(i) {
  const overlayRef = document.getElementById('overlay');

  if (i !== undefined) {
    currentIndex = i;
    showPokemonInOverlay(currentIndex);
    overlayRef.classList.remove('d_none');
    document.body.style.overflow = 'hidden';
  } else {
    overlayRef.classList.add('d_none');
    document.body.style.overflow = '';
  }
}

function openOverlayByName(name) {
  const index = pokemons.findIndex(p => p.name === name);
  const notfound = document.getElementById("not-found");
  
  if (index !== -1) {
    toggleOverlay(index);
    notfound.style.display = "none";
  } else {
    notfound.style.display = "block";
  }
}