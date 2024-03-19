import { cargarTitulos } from "../cargarTitulos";
import { fetchBusqueda } from "./fetchBusqueda";

const btnBuscar = document.getElementById('btn-buscar');

btnBuscar.addEventListener('click', async(e) => {
    e.preventDefault();

    const resultados = await fetchBusqueda();

    cargarTitulos(resultados);
});