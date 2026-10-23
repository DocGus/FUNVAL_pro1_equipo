// ==========================================
// SECCIÓN 1: MODELOS Y DATOS FICTICIOS
// ==========================================


// ==========================================
// SECCIÓN 2: PROMESA ASÍNCRONA Y SIMULACIÓN DE API
// ==========================================


// ==========================================
// SECCIÓN 3: LÓGICA DE NEGOCIO Y MÉTRICAS
// ==========================================


import { Reserva, dbReservas } from "./reservas";

export function liquidarReserva(r: Reserva): number {
    let total = r.noches * r.costoBasePorNoche;

    if (r.huesped.esVip) {
        total = total * 0.85;
    }

    if (r.tipoHabitacion === "suite") {
        total = total * 1.10;
    }

    if (r.estado === "cancelada") {
        return Number((total * 0.40).toFixed(2));
    }

    return Number(total.toFixed(2));
}

// Prueba de la función
dbReservas.forEach((reserva) => {
    console.log(
        reserva.id,
        reserva.huesped.nombreCompleto,
        liquidarReserva(reserva)
    );
});

// ==========================================
// SECCIÓN 4: MAIN, EJECUCIÓN Y MANEJO DE ERRORES
// ==========================================