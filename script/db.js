async function fetchDataJson() {
  let response = await fetch('https://pokeapi.co/api/v2/pokemon?limit=30&offset=0');
  let responseAsJson = await response.json();
  let pokemons = responseAsJson.results;

  renderPokemon(pokemons);
}

async function fetchMorePokemon() {
  let response = await fetch('https://pokeapi.co/api/v2/pokemon?limit=60&offset=0');
  let responseAsJson = await response.json();
  let pokemons = responseAsJson.results;

  renderPokemon(pokemons);
}

async function renderPokemon(pokemonList) {
  let pokemonContainer = document.getElementById("pokemon-content");
  pokemonContainer.innerHTML = "";

  for (let i = 0; i < pokemonList.length; i++) {
    const {name, url} = pokemonList[i];
    const response = await fetch(url);
    const detail = await response.json();

    pokemons[i] = {
      name,
      image: detail.sprites.front_default,
      types: detail.types,
      stats: detail.stats,
      weight: detail.weight,
      height: detail.height,
      abilities: detail.abilities
    };

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

function showPokemonInOverlay(index) {
  const overlayInfo = document.getElementById('overlay-info');
  const p = pokemons[index];

  let hpPokemon = '—';
  const hpData = p.stats.find(s => s.stat.name === "hp");
  if (hpData) {
    hpPokemon = hpData.base_stat;
  }

  let abilityPokemon = '—';
  if (p.abilities && p.abilities.length > 0) {
    const abilityNames = p.abilities.map(a =>
      capitalizeFirstLetter(a.ability.name)
    );
    abilityPokemon = abilityNames.join(', ');
  }

  let heightPokemon = '—';
  if (typeof p.height === 'number') {
    heightPokemon = (p.height / 10).toFixed(2) + ' m';
  }

  overlayInfo.innerHTML = `
  <div class="overlay-background">
    <div class="${p.types[0].type.name} border-style-overlay">
    <h2>${capitalizeFirstLetter(p.name)}</h2>
    <img src="${p.image}" alt="${p.name}" class="overlay-img">
    <div class="type-container">${p.types.map(t => `<div class="type-style">${capitalizeFirstLetter(t.type.name)}</div>`).join('')}</div>
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
        <p>${(p.weight / 10).toFixed(1)} kg</p>
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

// renderPokemon(pokemons)



// Second 30: https://pokeapi.co/api/v2/pokemon?limit=30&offset=30