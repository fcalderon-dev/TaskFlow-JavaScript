const URL_API = "https://jsonplaceholder.typicode.com/todos";

//Obtiene tareas desde una API externa utilizando fetch.
export async function obtenerTareasAPI() {
    try {
        const respuesta = await fetch(URL_API);

        if (!respuesta.ok) {

            throw new Error("No se pudieron obtener las tareas."); 

        }

        const datos = await respuesta.json();

        return datos;

    } catch (error) {

        console.error(error);

        return [];
    }

}

// Envía una tarea a la API mediante una petición POST.
export async function guardarTareaAPI(tarea) {

    try {

        const respuesta = await fetch( URL_API, {

            method: "POST",

            headers: {

                "Content-Type": "application/json"
            },

            body: JSON.stringify(tarea)

        });

        if (!respuesta.ok) {

            throw new Error("No se pudo guardar la tarea.");

        }
        const datos = await respuesta.json();

        return datos;

    }catch (error) {

        console.error(error);

        return null;


    }

}