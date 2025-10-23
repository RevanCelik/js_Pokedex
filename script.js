let currentIndex = 0;

function capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
}

document.getElementById('overlay-pokemon').addEventListener('click', function(event) {
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

  if (pokemonValue.length < 3) {
    pokemonList = pokemons;
    warning.style.display = "block";
  } else {
  pokemonList = pokemons.filter(p => p.name.toLowerCase().includes(pokemonValue));
  warning.style.display = "none";
  }
  renderPokemon(pokemonList);
}