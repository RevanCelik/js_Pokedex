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
        let imageResponse = await fetch(pokemon.url);
        let imageDetail = await imageResponse.json();

        pokemonContainer.innerHTML += `
            <div>
                <div>
                    <strong>Name: ${pokemon.name}</strong>
                </div>
                <div>
                <img class="style-mouseover" src="${imageDetail.sprites.front_default}">
                </div>
            </div>    
                `;
    }
}




// Second 30: https://pokeapi.co/api/v2/pokemon?limit=30&offset=30