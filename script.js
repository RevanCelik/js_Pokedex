let pokemons = [];
let currentIndex = 0;

function captitalizeFirstLetter(string) {
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