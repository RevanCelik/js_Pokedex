async function fetchDataJson() {
    let response = await fetch('https://pokeapi.co/api/v2/pokemon?limit=30&offset=0');
    let responseAsJson = await response.json();
    let pokemons = responseAsJson.results;

    renderPokemon(pokemons);
}

async function renderPokemon(pokemons) {
    let pokemonContainer = document.getElementById("pokemon-content");
    pokemonContainer.innerHTML = "";

    for (let i = 0; i < pokemons.length; i++) {
        let pokemon = pokemons[i];
        let response = await fetch(pokemon.url);
        let detailData = await response.json();

        pokemonContainer.innerHTML += `
            <div class="${detailData.types[0].type.name}">
                <div>
                    <strong>${captitalizeFirstLetter(pokemon.name)}</strong>
                </div>

                <div>${detailData.types[0].type.name}</div>
                ${detailData.types[1] ? `<div>${detailData.types[1].type.name}</div>` : ""}

                <div>
                <img class="style-mouseover" src="${detailData.sprites.front_default}">
                </div>
            </div>    
                `;
    }
}




// Second 30: https://pokeapi.co/api/v2/pokemon?limit=30&offset=30