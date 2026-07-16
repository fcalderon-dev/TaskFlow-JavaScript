import { Tarea } from "./tarea.js";

//Administra la lista de tareas de la aplicación.
export class GestorTareas {

    
    constructor() {
        this.listaTareas = [];
        this.ultimoId = 0;
    }

    //Carga las tareas almacenadas en localStorage.
    cargarTareas(tareasGuardadas) {

    this.listaTareas = tareasGuardadas.map(
        tarea => {

            const nuevaTarea = new Tarea(
                tarea.id,
                tarea.descripcion,
                tarea.fechaLimite
            );
            nuevaTarea.estado = tarea.estado;
            nuevaTarea.fechaCreacion = tarea.fechaCreacion;

            return nuevaTarea;

        }
    );


    if (this.listaTareas.length > 0) {

        this.ultimoId = Math.max(
            ...this.listaTareas.map(tarea => tarea.id)
        );
        }
    }

    //Crea una nueva tarea y la agrega al listado.
    agregarTarea(descripcion, fechaLimite) {

        if (!descripcion.trim()) {
            throw new Error("La descripción no puede estar vacía.");
        }

        this.ultimoId++;

        const nuevaTarea = new Tarea(
            this.ultimoId,
            descripcion,
            fechaLimite
        );
        this.listaTareas.push(nuevaTarea);

        return nuevaTarea;
    }

    eliminarTarea(id) {
        this.listaTareas = this.listaTareas.filter(
            tarea => tarea.id !== id    
        );
    }

    buscarTarea(id) {
        return this.listaTareas.find(
            tarea => tarea.id === id
        );
    }

    editarTarea(id, nuevaDescripcion, nuevaFecha) {

        const tarea = this.buscarTarea(id);

        if (tarea) {
            tarea.editar(nuevaDescripcion, nuevaFecha);

        }

    }

    // Cambia el estado de una tarea según si ID.
    cambiarEstado(id) {
        const tarea = this.buscarTarea(id);

        if (tarea) {
            tarea.cambiarEstado();
        }
    }

    mostrarTareas() {
        return this.listaTareas;
    }

}