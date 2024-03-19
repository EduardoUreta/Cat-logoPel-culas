export const cargarTitulos = (resultados = []) => {

    const contenedor = document.querySelector('#populares .main__grid');

    try {
        contenedor.innerHTML = '';

        resultados.forEach(item => {
            const plantilla = `
            <div class="main__media" data-id="${item.id}">
                <<a href="#" class="main__media-thumb">
                    <img class="main__media-img" src="https://image.tmdb.org/t/p/w500/${item.poster_path}" alt="" />
                </a>
                <p class="main__media-titulo">${item.title || item.name}</p>
                <p class="main__media-genero" style="text-align: center">${item.genero || ''}</p>
                <p class="main__media-fecha">${item.release_date || item.first_air_date.slice(0,4)}</p>
    
            </div>>
            `
            // Aquí uso la nueva variable item.genero para que se muestre
    
            contenedor.insertAdjacentHTML('beforeend', plantilla);
        });
    } catch (error) {
        console.log(error.message);
    }

};