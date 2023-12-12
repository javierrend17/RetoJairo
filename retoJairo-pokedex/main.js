<<<<<<< Updated upstream
=======
const divBody = document.querySelector("#app")

divBody.innerHTML = `
<img class="titulo" src="https://static.vecteezy.com/system/resources/previews/027/127/591/original/pokemon-logo-pokemon-icon-transparent-free-png.png" alt="imagenTitulo">

  <div class="card">
    <p>Busca tu pokemon:<p/>
    
    <input type="text" id="nameInput" placeholder="ej. pikachu">
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

    function capitalizarPrimeraLetra(texto) {
      return texto.charAt(0).toUpperCase() + texto.slice(1);
    }
  
    // Mostrar los detalles en el DOM
    divBody.innerHTML = `
      <div class="finalCard">
      <h2>${capitalizarPrimeraLetra(pokemonDetails.nombre)}</h2>
      <img src="${pokemonDetails.imagen}" alt="${pokemonDetails.nombre}">
      <p><strong>Tipo:</strong> ${pokemonDetails.tipos}</p>
      <button id="BotonVolver">Volver</button>
      <div/>
    `;
    
    const VolverButton = document.querySelector("#BotonVolver")
    VolverButton.addEventListener('click', () => {location.reload();});
  })
    
  .catch(error => {
    divBody.innerHTML = `
      <p>${error.message}</p>
      <button id="BotonVolver">Volver</button>
    `

    const VolverButton = document.querySelector("#BotonVolver")
    VolverButton.addEventListener('click', () => {location.reload();});
  });
}
>>>>>>> Stashed changes
