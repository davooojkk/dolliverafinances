export function calcularTotalMonedas(gastos, moneda) {
    const totalMoneda = gastos.filter((gasto) => gasto.moneda === moneda)
    .reduce((acc, gasto) => {
       
        const total = acc + gasto.monto;

        return total;
    }, 0);
    
    return totalMoneda;
}

function convertirUSD(gasto, cotizaciones) {
    if(gasto.moneda.toLowerCase() === 'usd') {
        return gasto.monto;
    }
      if(!cotizaciones) {
        return null;
    }
    if(gasto.moneda.toLowerCase() === 'brl') {
        return gasto.monto / cotizaciones.BRL;
    }
    if(gasto.moneda.toLowerCase() === 'uyu') {
        return gasto.monto / cotizaciones.UYU;
    }
}

function calcularTotalUSD(gastos, cotizaciones) {
    const totalUSD = gastos.map((gasto) => { return convertirUSD(gasto, cotizaciones); })
    .reduce((acc, monto) => {

        if(acc === null || monto === null) {
            return null;
        }

        return acc + monto;

    }, 0)
    
    return totalUSD;
    
}

function calcularGastosCategorias(gastos, cotizaciones) {
    const objetoGastos = {};
    for (const gasto of gastos) {
        const montoUSD = convertirUSD(gasto, cotizaciones);
        if(montoUSD === null) { return null; };
        if(objetoGastos[gasto.categoria] === undefined) { objetoGastos[gasto.categoria] = 0}
        objetoGastos[gasto.categoria] += montoUSD;   
    }

    return objetoGastos;
}

function calcularPorcentajesCategorias(gastosCategorias, totalUSD) {
    if(totalUSD === null) { return null; };
    if(totalUSD === 0) { return {}; };

    const porcentajes = {};

    for (const [categoria, monto] of Object.entries(gastosCategorias)) {
        
        porcentajes[categoria] = (monto / totalUSD) * 100;


    }

    const porcentajesNormalizados = porcentajes.map((p) => p.toFixed(1));

    return porcentajesNormalizados;

}

export function prepararDatosGrafico(gastos, cotizaciones) {

    const totalUSD = calcularTotalUSD(gastos, cotizaciones);
    const gastosCategorias = calcularGastosCategorias(gastos, cotizaciones);
    const porcentajesCategorias = calcularPorcentajesCategorias(gastosCategorias, totalUSD);

    return porcentajesCategorias;

};