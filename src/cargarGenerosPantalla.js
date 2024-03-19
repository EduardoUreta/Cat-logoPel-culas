import { fetchGenero } from "./fetchGenero";

const contenedorGeneros = document.getElementById('filtro-generos');
export const cargarGenerosPantalla = async(filtro) => {

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