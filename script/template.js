function renderPokemonTemplate({i, name, primaryType, secondaryType, detail}) {
    return `
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

function pokemonInOverlayTemplate({name, detail, hpPokemon, abilityPokemon, heightPokemon, weightPokemon, primaryType, secondaryType}) {
   return `
  <div class="overlay-background">
        <div class="${primaryType} border-style-overlay">
            <h2>${capitalizeFirstLetter(name)}</h2>
            <img src="${detail.sprites.front_default}" alt="${name}" class="overlay-img">
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