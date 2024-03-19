import { cargarGenerosPantalla } from './cargarGenerosPantalla';
import { cargarTitulos } from './cargarTitulos';
import { fetchPopulares } from './fetchPopulares';

import './Busqueda/listenerFiltroTipo';
import './Busqueda/listenerFiltroGenero';
import './Busqueda/listenerBuscar'
import './paginacion'
import './listenerItems'
import './listenerPopUp'

const cargarPeliculas = async() => {
    const resultados = await fetchPopulares('movie');
    cargarTitulos(resultados);
    cargarGenerosPantalla('movie');
};

cargarPeliculas();
