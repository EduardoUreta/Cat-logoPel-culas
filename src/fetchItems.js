export const fetchItems = async(id) => {
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
}