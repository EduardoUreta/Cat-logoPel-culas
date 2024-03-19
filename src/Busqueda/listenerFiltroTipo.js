import { cargarGenerosPantalla } from "../cargarGenerosPantalla";
import { cargarTitulos } from "../cargarTitulos";
import { fetchPopulares } from "../fetchPopulares";

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