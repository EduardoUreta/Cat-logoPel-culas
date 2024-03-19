// Obtener el id, nombre, guardarlo y devolver el nombre del genero
// Se le pasa el primer genero y el listado de generos
// Por lo tanto, por cada genero, compara el primer ID y el ID del genero
// Si coinciden, lo guarda en nombreGenero

export const traducirGenero = (id, generos) => {
    let nombreGenero;

    generos.forEach(item => {
        if(id === item.id){
            nombreGenero = item.name;
        }
    });

    return nombreGenero;
}