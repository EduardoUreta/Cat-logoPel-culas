import { fetchGenero } from "../fetchGenero";
import { traducirGenero } from "../traducirGenero";

export const fetchBusqueda = async(pagina = 1) => {
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

}