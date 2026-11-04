let cotizacionesActuales = null;

async function cotizacionDolar() {
    try {
        const apiResultado = await fetch('https://api.exchangerate.fun/latest?base=USD');
        if  (!apiResultado.ok) {
            throw new Error('Error al consultar las cotizaciones!');
        }

        const cotizacion = await apiResultado.json();
        const fecha = new Date()

        cotizacionesActuales = {BRL: cotizacion.rates.BRL.toFixed(1), UYU: cotizacion.rates.UYU.toFixed(1), fecha};
        return cotizacionesActuales;
    }

    catch {
        console.error('La consulta API no logró completarse. Es probable que las cotizaciones actuales no sean precisas!');
        return cotizacionesActuales;
    }
}

export async function iniciarCotizaciones(actualizarGrafico, renderCotizaciones) {
    const cotizaciones = await cotizacionDolar();
    await actualizarGrafico();
    if (cotizaciones !== null) {
    renderCotizaciones(cotizaciones);
    }
    setInterval(async () => { 
        const cotizaciones = await cotizacionDolar();
        await actualizarGrafico();
        if (cotizaciones !== null) {
             renderCotizaciones(cotizaciones);
            }
    }, 300 * 1000);
};

export function obtenerCotizaciones() {
    return cotizacionesActuales;
};