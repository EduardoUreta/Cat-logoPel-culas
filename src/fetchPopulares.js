import { fetchGenero } from "./fetchGenero";
import { traducirGenero } from "./traducirGenero";

// Obtener las peliculas y por cada resultado, obtener su genero y guardarlo en propiedad nueva

export const fetchPopulares = async(filtro = 'movie', pagina = 1) => {

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