// ==========================================
// SECCIÓN 1: MODELOS Y DATOS FICTICIOS
// ==========================================
export interface Huesped {
    dni: string;
    nombreCompleto: string;
    esVip: boolean;
}

export interface Reserva {
    id: string;
    huesped: Huesped;
    noches: number;
    tipoHabitacion: 'simple' | 'suite' | 'familiar';
    costoBasePorNoche: number;
    estado: 'confirmada' | 'cancelada';
}

export const dbReservas: Reserva[] = [
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
/* PRUEBA DE COLABORACIÓN: Adrián Mejía
Sistema de Reservas Hoteleras con Temporadas y Penalizaciones
Función sincronizarReservas(): Promise<Reserva[]> con latencia de 2.2s y fallo
aleatorio del 20% ("Error 504 Gateway Timeout con Central Hotelera").*/

function sincronizarReservas(data: Reserva[]): Promise<Reserva[]> { //Reserva marcará en error hasta tener la parte de Dev 1.
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (Math.random() < 0.20) {
        reject(new Error("Error 504: Gateway Timeout con Central Hotelera."));
      } else {
        resolve(data);
      }
    }, 2200);
  });
}


// ==========================================
// SECCIÓN 3: LÓGICA DE NEGOCIO Y MÉTRICAS
// ==========================================


// ==========================================
// SECCIÓN 4: MAIN, EJECUCIÓN Y MANEJO DE ERRORES
// ==========================================