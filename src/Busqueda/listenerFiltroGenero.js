const contenedor = document.getElementById('filtro-generos');

contenedor.addEventListener('click', (e) => {
    e.preventDefault();

    if(e.target.closest('button')){
        // Remover la clase activa
        contenedor.querySelector('.btn--active')?.classList.remove('btn--active');

        // Agregar la clase activa al boton que se clickea
        e.target.classList.add('btn--active');
    }
});