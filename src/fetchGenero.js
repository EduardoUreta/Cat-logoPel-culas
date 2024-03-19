// Devuelve lista de todos los generos con id y nombre

export const fetchGenero = async(filtro = 'movie') => {

    const tipo = filtro === 'movie' ? 'movie' : 'tv';

    const url = `https://api.themoviedb.org/3/genre/${filtro}/list?api_key=2e1da73607287c1dc456a74b1643b9f6&language=es-MX&page=1`;

    try {
        const respuesta = await fetch(url);
        const data = await respuesta.json();
        //retorna un listado 0 : {id: 28, name: 'Acción'}
        return data.genres;
    } catch (error) {
        console.log(error.message);
    }
}