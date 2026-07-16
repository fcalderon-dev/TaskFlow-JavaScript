import { GestorTareas } from "./gestorTareas.js";
import { guardarTareas, cargarTareas } from "./storage.js";
import {
    obtenerTareasAPI,
    guardarTareaAPI
} from "./api.js";

const gestor = new GestorTareas();

//Elementos del DOM

const formulario = document.getElementById("formTarea");
const inputDescripcion = document.getElementById("descripcion");
const inputFecha = document.getElementById("fecha");
const listaTareas = document.getElementById("listaTareas");
const contadorCaracteres = document.getElementById("contadorCaracteres");
const mensaje = document.getElementById("mensaje");

// Renderiza la lista de tareas en el DOM.
function renderizarTareas() {
    
    listaTareas.innerHTML = "";

    if (gestor.mostrarTareas().length === 0) {
        listaTareas.innerHTML = `
        <p>No hay tareas registradas.</p>
    `;

    return;
    }

    gestor.mostrarTareas().forEach(tarea => {
        const tarjeta = document.createElement("div");
        tarjeta.classList.add("tarea");
        if (tarea.estado) {
            tarjeta.classList.add("completada");
        }

        tarjeta.innerHTML = `

            <h3>${tarea.descripcion}</h3>

            <p>
                📅 ${tarea.fechaLimite || "Sin fecha límite"}
            </p>

            <p class="contador" data-fecha="${tarea.fechaLimite}">
                
            </p>

            <p>
                Estado:
                ${tarea.estado ? "✅ Completada" : "⏳ Pendiente"}
            </p>

            <button data-id="${tarea.id}" class="btnCompletar">
                Completar
            </button>

            <button data-id="${tarea.id}" class="btnEditar">
                 Editar
            </button>

            <button data-id="${tarea.id}" class="btnEliminar">
                Eliminar
            </button>
        `;

        listaTareas.appendChild(tarjeta);

    });

}

//Actualiza el contador de días restantes para cada tarea.
function actualizarContadores() {

    const contadores = document.querySelectorAll(".contador");


    contadores.forEach(contador => {

        const fecha = contador.dataset.fecha;


        if (!fecha) {
            contador.textContent = "";
            return;
        }


        const fechaLimite = new Date(fecha);

        const ahora = new Date();


        const diferencia = fechaLimite - ahora;


        if (diferencia <= 0) {

            contador.textContent = "⚠️ Fecha vencida";

            return;
        }


        const dias = Math.ceil(
            diferencia / (1000 * 60 * 60 * 24)
        );


        contador.textContent =
            `⏳ Quedan ${dias} día(s)`;

    });

}

const tareasGuardadas = cargarTareas();

gestor.cargarTareas(tareasGuardadas);

renderizarTareas();


//Evento submit

formulario.addEventListener("submit", async (e) => {
    e.preventDefault();

    try {
        const nuevaTarea = gestor.agregarTarea(
            inputDescripcion.value,
            inputFecha.value
        );

        await guardarTareaAPI(nuevaTarea);

        guardarTareas(
            gestor.mostrarTareas()
        );

        renderizarTareas();

        mensaje.textContent = " ✅ Tarea agregada correctamente.";
        mensaje.classList.add("mostrar");

        setTimeout(() => {
            mensaje.textContent = "";
            mensaje.classList.remove("mostrar");
        }, 2000);

        formulario.reset();

        contadorCaracteres.textContent = "0 caracteres";
    } catch (error) {
        alert(error.message);
    }
});

//Evento 
inputDescripcion.addEventListener("keyup", () => {
    contadorCaracteres.textContent =
        `${inputDescripcion.value.length} caracteres`;
});

listaTareas.addEventListener("click", (e) => {

    const id = Number(e.target.dataset.id);

    if (e.target.classList.contains("btnCompletar")) {

    gestor.cambiarEstado(id);

    guardarTareas(
        gestor.mostrarTareas()
    );



}

    if (e.target.classList.contains("btnEditar")) {

        const tarea = gestor.buscarTarea(id);

        const nuevaDescripcion = prompt(

            "Editar descripción:",

            tarea.descripcion
        );

        if  (nuevaDescripcion === null) {
                return;
            }
            const nuevaFecha = prompt(
                "Editar fecha límite (AAAA-MM-DD):",
                tarea.fechaLimite || ""
            );
        if (nuevaFecha === null) {
            return;
        }

        gestor.editarTarea(
            id,
            nuevaDescripcion,
            nuevaFecha
        );

        guardarTareas(
            gestor.mostrarTareas()
        );

        renderizarTareas();
    }

    if (e.target.classList.contains("btnEliminar")) {

        gestor.eliminarTarea(id);

        guardarTareas(
            gestor.mostrarTareas()
        );

        renderizarTareas();

    }

});


// Evento mouseover
listaTareas.addEventListener("mouseover", (e) => {

    const tarea = e.target.closest(".tarea");

    if (tarea) {

        tarea.style.transform = "scale(1.02)";
        tarea.style.transition = "0.2s";

    }

});


// Evento mouseout
listaTareas.addEventListener("mouseout", (e) => {

    const tarea = e.target.closest(".tarea");

    if (tarea) {

        tarea.style.transform = "scale(1)";

    }

});

setInterval(() => {

    actualizarContadores();

}, 1000);

//Obtiene tareas desde una API externa.
async function cargarTareasAPI() {

    const tareas = await obtenerTareasAPI();

    console.log("Primeras tareas de la API:");

    console.log(tareas.slice(0, 5));

}
cargarTareasAPI();
