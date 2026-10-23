// ==========================================
// SECCIÓN 1: MODELOS Y DATOS FICTICIOS
// ==========================================


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