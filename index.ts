
 // ==========================================
 // SECCIÓN 1: MODELOS Y DATOS FICTICIOS
 // ==========================================

interface Huesped {
    dni: string;
    nombreCompleto: string;
    esVip: boolean;
}

interface Reserva {
    id: string;
    huesped: Huesped;
    noches: number;
    tipoHabitacion: 'simple' | 'suite' | 'familiar';
    costoBasePorNoche: number;
    estado: 'confirmada' | 'cancelada';
}

const dbReservas: Reserva[] = [
    {
        id: "RES-001",
        huesped: { dni: "111222333", nombreCompleto: "Ana María Gomez", esVip: true },
        noches: 3,
        tipoHabitacion: "suite",
        costoBasePorNoche: 250,
        estado: "confirmada"
    },
    {
        id: "RES-002",
        huesped: { dni: "444555666", nombreCompleto: "Carlos Perez", esVip: false },
        noches: 2,
        tipoHabitacion: "simple",
        costoBasePorNoche: 100,
        estado: "confirmada"
    },
    {
        id: "RES-003",
        huesped: { dni: "777888999", nombreCompleto: "Lucía Ramirez", esVip: true },
        noches: 5,
        tipoHabitacion: "familiar",
        costoBasePorNoche: 300,
        estado: "cancelada"
    },
    {
        id: "RES-004",
        huesped: { dni: "123456789", nombreCompleto: "Jorge Lemos", esVip: false },
        noches: 1,
        tipoHabitacion: "simple",
        costoBasePorNoche: 90,
        estado: "confirmada"
    },
    {
        id: "RES-005",
        huesped: { dni: "987654321", nombreCompleto: "Diana Cardona", esVip: true },
        noches: 4,
        tipoHabitacion: "suite",
        costoBasePorNoche: 280,
        estado: "confirmada"
    },
    {
        id: "RES-006",
        huesped: { dni: "456123789", nombreCompleto: "James Diaz", esVip: false },
        noches: 3,
        tipoHabitacion: "familiar",
        costoBasePorNoche: 220,
        estado: "cancelada"
    },
    {
        id: "RES-007",
        huesped: { dni: "321654987", nombreCompleto: "Sofia Vergara", esVip: false },
        noches: 2,
        tipoHabitacion: "suite",
        costoBasePorNoche: 260,
        estado: "confirmada"
    },
    {
        id: "RES-008",
        huesped: { dni: "654987321", nombreCompleto: "Andres Restrepo", esVip: true },
        noches: 6,
        tipoHabitacion: "familiar",
        costoBasePorNoche: 350,
        estado: "confirmada"
    }
];

// ==========================================
// SECCIÓN 2: PROMESA ASÍNCRONA Y SIMULACIÓN DE API
// ==========================================

function sincronizarReservas(data: Reserva[]): Promise<Reserva[]> {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            if (Math.random() < 0.20) {
                reject(
                    new Error("Error 504: Gateway Timeout con Central Hotelera.")
                );
            } else {
                resolve(data);
            }
        }, 2200);
    });
}

// ==========================================
// SECCIÓN 3: LÓGICA DE NEGOCIO Y MÉTRICAS
// ==========================================

function liquidarReserva(r: Reserva): number {
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

// ==========================================
// SECCIÓN 4: MAIN, EJECUCIÓN Y MANEJO DE ERRORES
// ==========================================

async function main(): Promise<void> {
    try {
        console.log("=== SISTEMA DE RESERVAS HOTELERAS ===");
        console.log("Sincronizando reservas...\n");

        const reservas = await sincronizarReservas(dbReservas);

        let ingresosConfirmados = 0;
        let penalizacionesCancelacion = 0;

        const suitesOcupadas = reservas.filter(
            (reserva) =>
                reserva.tipoHabitacion === "suite" &&
                reserva.estado === "confirmada"
        );

        for (const reserva of reservas) {
            const importe = liquidarReserva(reserva);

            if (reserva.estado === "confirmada") {
                ingresosConfirmados += importe;
            } else {
                penalizacionesCancelacion += importe;
            }
        }

        console.log("\n=== REPORTE FINANCIERO ===");
        console.log(
            `Ingresos confirmados: $${ingresosConfirmados.toFixed(2)}`
        );
        console.log(
            `Penalizaciones por cancelación: $${penalizacionesCancelacion.toFixed(2)}`
        );

        console.log("\n=== SUITES OCUPADAS ===");

        if (suitesOcupadas.length === 0) {
            console.log("No hay suites ocupadas.");
        } else {
            for (const reserva of suitesOcupadas) {
                console.log(
                    `${reserva.id} | ${reserva.huesped.nombreCompleto} | ${reserva.noches} noches`
                );
            }
        }
    } catch (error) {
        console.error("\nNo fue posible sincronizar las reservas.");

        if (error instanceof Error) {
            console.error(`Detalle: ${error.message}`);
        } else {
            console.error("Ocurrió un error desconocido.");
        }
    }
}

main();
