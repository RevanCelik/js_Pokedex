async function fetchDataJson() {
    let response = await fetch('https://pokeapi.co/api/v2/pokemon?limit=30&offset=0');
    let responseAsJson = await response.json();
    let pokemons = responseAsJson.results;

    renderPokemon(pokemons);
}

async function renderPokemon(pokemonList) {
    let pokemonContainer = document.getElementById("pokemon-content");
    pokemonContainer.innerHTML = "";

    for (let i = 0; i < pokemonList.length; i++) {
        let pokemon = pokemonList[i];
        let response = await fetch(pokemon.url);
        let detailData = await response.json();

        pokemons[i] = {
            name: pokemon.name,
            image: detailData.sprites.front_default,
            types: detailData.types,
            stats: detailData.stats,
            weight: detailData.weight
        };

        pokemonContainer.innerHTML += `
            <div onclick="toggleOverlay(${i})" class="${detailData.types[0].type.name} hover-effect">
                <div>
                    <strong>${captitalizeFirstLetter(pokemon.name)}</strong>
                </div>

                <div>${detailData.types[0].type.name}</div>
                ${detailData.types[1] ? `<div>${detailData.types[1].type.name}</div>` : ""}

                <div>
                <img src="${detailData.sprites.front_default}">
                </div>
            </div>    
                `;
    }
}

function showPokemonInOverlay(index) {
    const overlayInfo = document.getElementById('overlay-info');
    const p = pokemons[index];

    const hp = p.stats.find(s => s.stat.name === "hp").base_stat;
    const attack = p.stats.find(s => s.stat.name === "attack").base_stat;
    const defense = p.stats.find(s => s.stat.name === "defense").base_stat;

    overlayInfo.innerHTML = `
    <div class="${p.types[0].type.name}">
    <img src="${p.image}" alt="${p.name}" class="overlay-img">
    <h2>${captitalizeFirstLetter(p.name)}</h2>
    <p>Typ: ${p.types.map(t => captitalizeFirstLetter(t.type.name)).join(', ')}</p>
    <p>HP: ${hp}</p>
    <p>Attack: ${attack}</p>
    <p>Defense: ${defense}</p>
    <p>Weight: ${(p.weight / 10).toFixed(1)} kg</p>
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