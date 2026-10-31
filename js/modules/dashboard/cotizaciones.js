let cotizacionesActuales = null;

async function cotizacionDolar() {
    try {
        const apiResultado = await fetch('https://api.exchangerate.fun/latest?base=USD');
        if  (!apiResultado.ok) {
            throw new Error('Error al consultar las cotizaciones!');
        }

        const cotizacion = await apiResultado.json();

        cotizacionesActuales = {BRL: cotizacion.rates.BRL, UYU: cotizacion.rates.UYU};
        return cotizacionesActuales;
    }

    catch {
        console.error('La consulta API no logró completarse. Es probable que las cotizaciones actuales no sean precisas!');
        return cotizacionesActuales;
    }
}

export function iniciarCotizaciones() {
    cotizacionDolar();
    setInterval(cotizacionDolar, 300  * 1000)
};

export function obtenerCotizaciones() {
    return cotizacionesActuales;
};