'use strict';

// Devuelve lista de todos los generos con id y nombre

const fetchGenero = async(filtro = 'movie') => {

    const url = `https://api.themoviedb.org/3/genre/${filtro}/list?api_key=2e1da73607287c1dc456a74b1643b9f6&language=es-MX&page=1`;

    try {
        const respuesta = await fetch(url);
        const data = await respuesta.json();
        //retorna un listado 0 : {id: 28, name: 'Acción'}
        return data.genres;
    } catch (error) {
        console.log(error.message);
    }
};

const contenedorGeneros = document.getElementById('filtro-generos');
const cargarGenerosPantalla = async(filtro) => {

    const generos = await fetchGenero(filtro);

    // Borrar todos los botones antes de hacer el forEach, para que no se dupliquen
    contenedorGeneros.innerHTML = '';

    generos.forEach(item => {
        const btn = document.createElement('button');
        btn.classList.add('btn');
        btn.innerText = item.name;
        btn.setAttribute('data-id', item.id);

        contenedorGeneros.appendChild(btn);

    });
};

const cargarTitulos = (resultados = []) => {

    const contenedor = document.querySelector('#populares .main__grid');

    try {
        contenedor.innerHTML = '';

        resultados.forEach(item => {
            const plantilla = `
            <div class="main__media" data-id="${item.id}">
                <<a href="#" class="main__media-thumb">
                    <img class="main__media-img" src="https://image.tmdb.org/t/p/w500/${item.poster_path}" alt="" />
                </a>
                <p class="main__media-titulo">${item.title || item.name}</p>
                <p class="main__media-genero" style="text-align: center">${item.genero || ''}</p>
                <p class="main__media-fecha">${item.release_date || item.first_air_date.slice(0,4)}</p>
    
            </div>>
            `;
            // Aquí uso la nueva variable item.genero para que se muestre
    
            contenedor.insertAdjacentHTML('beforeend', plantilla);
        });
    } catch (error) {
        console.log(error.message);
    }

};

// Obtener el id, nombre, guardarlo y devolver el nombre del genero
// Se le pasa el primer genero y el listado de generos
// Por lo tanto, por cada genero, compara el primer ID y el ID del genero
// Si coinciden, lo guarda en nombreGenero

const traducirGenero = (id, generos) => {
    let nombreGenero;

    generos.forEach(item => {
        if(id === item.id){
            nombreGenero = item.name;
        }
    });

    return nombreGenero;
};

// Obtener las peliculas y por cada resultado, obtener su genero y guardarlo en propiedad nueva

const fetchPopulares = async(filtro = 'movie', pagina = 1) => {

    const tipo = filtro === 'movie' ? 'movie' : 'tv';
    const url = `https://api.themoviedb.org/3/${tipo}/popular?api_key=2e1da73607287c1dc456a74b1643b9f6&language=es-MX&page=${pagina}`;
    const generos = await fetchGenero(tipo); //retorna un listado 0 : {id: 28, name: 'Acción'}    

    try {   
        const respuesta = await fetch(url);
        const data = await respuesta.json();
        const resultados = data.results;

        resultados.forEach(item => {
            item.genero = traducirGenero(item.genre_ids[0], generos);
        });
        // Retorna el nombre del genero y lo guarda en una nueva variable item.genero

        return resultados;
    } catch (error) {
        console.log(error.message);
    }
};

const filtroPelicula = document.getElementById('movie');
const filtroSerie = document.getElementById('tv');

filtroPelicula.addEventListener('click', async(e) => {
    e.preventDefault();

    // Cargar los generos en la barra lateral
    cargarGenerosPantalla('movie');

    // Obtener los resultados
    const resultados = await fetchPopulares('movie');

    // Mostrarlos en el DOM
    cargarTitulos(resultados);

    // Cambiar color activo
    filtroPelicula.classList.add('btn--active');
    filtroSerie.classList.remove('btn--active');

    // Cambiar texto
    document.querySelector('#populares .main__titulo').innerText = 'Películas Populares';
    
});

filtroSerie.addEventListener('click', async(e) => {
    e.preventDefault();

    // Cargar los generos en la barra lateral
    cargarGenerosPantalla('tv');

    // Obtener los resultados
    const resultados = await fetchPopulares('tv');

    // Mostrarlos en el DOM
    cargarTitulos(resultados);

    // Cambiar color activo
    filtroPelicula.classList.remove('btn--active');
    filtroSerie.classList.add('btn--active');

    // Cambiar texto
    document.querySelector('#populares .main__titulo').innerText = 'Series Populares';

});

const contenedor$1 = document.getElementById('filtro-generos');

contenedor$1.addEventListener('click', (e) => {
    e.preventDefault();

    if(e.target.closest('button')){
        // Remover la clase activa
        contenedor$1.querySelector('.btn--active')?.classList.remove('btn--active');

        // Agregar la clase activa al boton que se clickea
        e.target.classList.add('btn--active');
    }
});

const fetchBusqueda = async(pagina = 1) => {
    const tipo = document.querySelector('.main__filtros .btn--active').id;
    const idGenero = document.querySelector('#filtro-generos .btn--active')?.dataset.id;
    const añoInicial = document.getElementById('años-min').value || 1950;
    const añoFinal = document.getElementById('años-max').value || 2024;

    let url;
    if(tipo === 'movie'){
        url = `https://api.themoviedb.org/3/discover/movie?api_key=2e1da73607287c1dc456a74b1643b9f6&language=es-MX&region=US&sort_by=popularity.desc&include_adult=false&include_video=false&release_date.gte=${añoInicial}&release_date.lte=${añoFinal}&with_genres=${idGenero}&with_watch_monetization_types=flatrate&page=${pagina}`;
    } else if(tipo === 'tv'){
        url = `https://api.themoviedb.org/3/discover/tv?api_key=2e1da73607287c1dc456a74b1643b9f6&language=es-MX&region=US&sort_by=popularity.desc&first_air_date.gte=${añoInicial}&first_air_date.lte=${añoFinal}&timezone=America%2FNew_York&with_genres=${idGenero}&include_null_first_air_dates=false&with_watch_monetization_types=flatrate&with_status=0&with_types=0&page=${pagina}`;
    }

    let generos = await fetchGenero();
    //retorna un listado 0 : {id: 28, name: 'Acción'}

    try {
        const respuesta = await fetch(url);
        const datos = await respuesta.json();
        let resultados = datos.results;

        resultados.forEach(item => {
            item.genero = traducirGenero(item.genre_ids[0], generos); 
            // Retorna el nombre del genero y lo guarda en una nueva variable item.genero
        });
        
        return resultados;
    } catch (error) {
        console.log(error.message);
    }

};

const btnBuscar = document.getElementById('btn-buscar');

btnBuscar.addEventListener('click', async(e) => {
    e.preventDefault();

    const resultados = await fetchBusqueda();

    cargarTitulos(resultados);
});

const paginaAnterior = document.getElementById('pagina-anterior');
const paginaSiguiente = document.getElementById('pagina-siguiente');

paginaSiguiente.addEventListener('click', async(e) => {
    e.preventDefault();
    
    const paginaActual = parseInt(document.getElementById('populares').dataset.pagina); //1

    try {
        const resultados = await fetchBusqueda(paginaActual+1);

        document.getElementById('populares').setAttribute('data-pagina', parseInt(paginaActual + 1));

        console.log(resultados);
        cargarTitulos(resultados);

        window.scrollTo(0,0);
    } catch (error) {
        console.log(error.message);
    }
});

paginaAnterior.addEventListener('click', async(e) => {
    e.preventDefault();
    
    const paginaActual = parseInt(document.getElementById('populares').dataset.pagina); //1

    try {
        if (paginaActual > 1) {
            const resultados = await fetchBusqueda(paginaActual-1);
            document.getElementById('populares').setAttribute('data-pagina', parseInt(paginaActual - 1));
            
            console.log(resultados);
            cargarTitulos(resultados);
            window.scrollTo(0,0);
        };      

    } catch (error) {
        console.log(error.message);
    }
});

const fetchItems = async(id) => {
    const tipo = document.querySelector('.main__filtros .btn--active').id;

    try {
        const url = `https://api.themoviedb.org/3/${tipo}/${id}?api_key=2e1da73607287c1dc456a74b1643b9f6&language=es-MX`;
		const respuesta = await fetch(url);
		const datos = await respuesta.json();

        console.log(datos);
		return datos;
    } catch (error) {
        console.log(error.message);
    }
};

const contenedor = document.getElementById('populares');
const popUp$1 = document.getElementById('media');

contenedor.addEventListener('click', async (e) => {
    if(e.target.closest('.main__media')){
        // Activar PopUp
        popUp$1.classList.add('media--active');

        const id = e.target.closest('.main__media').dataset.id;
        const resultado = await fetchItems(id);
        
        const plantilla = `
            <div class="media__backdrop">
				<img
					src="https://image.tmdb.org/t/p/w500/${resultado.backdrop_path}"
					class="media__backdrop-image"
				/>
			</div>
			<div class="media__imagen">
				<img
					src="https://image.tmdb.org/t/p/w500/${resultado.poster_path}"
					class="media__poster"
				/>
			</div>
			<div class="media__info">
				<h1 class="media__titulo">${resultado.title || resultado.name}</h1>
				<p class="media__fecha">${resultado.release_date || resultado.first_air_date}</p>
				<p class="media__overview">${resultado.overview}</p>
			</div>
			<button class="media__btn">
				<svg
					xmlns="http://www.w3.org/2000/svg"
					width="16"
					height="16"
					fill="currentColor"
					viewBox="0 0 16 16"
					class="media__btn-icono"
				>
					<path
						d="M2.146 2.854a.5.5 0 1 1 .708-.708L8 7.293l5.146-5.147a.5.5 0 0 1 .708.708L8.707 8l5.147 5.146a.5.5 0 0 1-.708.708L8 8.707l-5.146 5.147a.5.5 0 0 1-.708-.708L7.293 8 2.146 2.854Z"
					/>
				</svg>
			</button>
        `;

        document.querySelector('#media .media__contenedor').innerHTML = plantilla;

    }
});

const popUp = document.getElementById('media');

popUp.addEventListener('click', (e) => {
    if(e.target.closest('button')){
        popUp.classList.remove('media--active');
    }
});

const cargarPeliculas = async() => {
    const resultados = await fetchPopulares('movie');
    cargarTitulos(resultados);
    cargarGenerosPantalla('movie');
};

cargarPeliculas();
//# sourceMappingURL=bundle.js.map
