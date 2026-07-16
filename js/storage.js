//Guarda la lista de tareas en localStorage.
export function guardarTareas(tareas) {

    localStorage.setItem(
        "taskflow",
        JSON.stringify(tareas)
    );

}

//Recupera las tareas almacenadas en localStorage.
export function cargarTareas() {

    const tareasGuardadas = localStorage.getItem("taskflow");

    if (tareasGuardadas) {

        return JSON.parse(tareasGuardadas);

    }

    return [];

}