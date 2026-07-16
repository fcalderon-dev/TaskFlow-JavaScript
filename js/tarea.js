/**
 * Representa una tarea dentro de la aplicación.
 */
export class Tarea {

    constructor(id, descripcion, fechaLimite = null) {

        this.id = id;
        this.descripcion = descripcion;
        this.estado = false;
        this.fechaCreacion = new Date();
        this.fechaLimite = fechaLimite;
    }

    /**
     * Cambia el estado de la tarea entre pendiente y completada.
     */
    cambiarEstado() {

        this.estado = !this.estado;
    }

    /**
     * Actualiza la descripción y la fecha límite de la tarea.
     */
    editar(nuevaDescripcion, fechaLimite) {

        if (!nuevaDescripcion.trim()) {
            throw new Error("La descripción no puede estar vacía.");
        }

        this.descripcion = nuevaDescripcion;
        this.fechaLimite = fechaLimite;
    }

}
