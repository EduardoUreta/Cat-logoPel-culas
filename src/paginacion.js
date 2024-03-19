import { fetchBusqueda } from "./Busqueda/fetchBusqueda";
import { cargarTitulos } from "./cargarTitulos";

const paginaAnterior = document.getElementById('pagina-anterior');
const paginaSiguiente = document.getElementById('pagina-siguiente');

paginaSiguiente.addEventListener('click', async(e) => {
    e.preventDefault();
    
    const paginaActual = parseInt(document.getElementById('populares').dataset.pagina); //1

    try {
        const resultados = await fetchBusqueda(paginaActual+1);

        document.getElementById('populares').setAttribute('data-pagina', parseInt(paginaActual + 1))

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