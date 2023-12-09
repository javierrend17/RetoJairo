const divBody = document.querySelector("#app")


divBody.innerHTML = `
  <h1>PokeInfo.com</h1>

  <div class="card">
    <p>Busca el nombre de tu pokemon:<p/>
    <label for="nameInput">Nombre:</label>
    <input type="text" id="nameInput" placeholder="Ingrese un pokemon">
    <br>
    <button id="BotonBuscar">Buscar</button>
  </div>
  `

const botonEnviar = document.querySelector("#BotonBuscar")
botonEnviar.addEventListener('click', buscarPokemon);

function buscarPokemon(){
  const pokemonInput = document.querySelector('#nameInput').value;

  // Hacer la solicitud a la PokeAPI
  fetch(`https://pokeapi.co/api/v2/pokemon/${pokemonInput}`)
    .then(response => {
      if (!response.ok) {
            throw new Error('No se encontraron resultados para el Pokémon ingresado.');
      }
      return response.json();
    })
    .then(data => {
      // Manipular la respuesta para obtener detalles relevantes
      const pokemonDetails = {
        nombre: data.name,
        imagen: data.sprites.front_default,
        tipos: data.types.map(type => type.type.name).join(', ')
      };

      // Mostrar los detalles en el DOM
      divBody.innerHTML = `
        <h2>${pokemonDetails.nombre}</h2>
        <img src="${pokemonDetails.imagen}" alt="${pokemonDetails.nombre}">
        <p><strong>Tipo:</strong> ${pokemonDetails.tipos}</p>
        <button id="BotonVolver">Volver</button>
      `;
      
      const VolverButton = document.querySelector("#BotonVolver")
      VolverButton.addEventListener('click', () => {location.reload();});
    })
      
    .catch(error => {
      // Mostrar un mensaje de error si el Pokémon no existe
      divBody.innerHTML = `
        <p>${error.message}</p>
        <button id="BotonVolver">Volver</button>
      `;
      const VolverButton = document.querySelector("#BotonVolver")
      VolverButton.addEventListener('click', () => {location.reload();});
    });
}