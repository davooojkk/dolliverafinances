import { obtenerCotizaciones } from "./cotizaciones.js";

export function calcularTotalMonedas(gastos, moneda) {
    const totalMoneda = gastos.filter((gasto) => gasto.moneda === moneda)
    .reduce((acc, gasto) => {
       
        const total = acc + gasto.monto;

        return total;
    }, 0);
    
    return totalMoneda;
}

export function convertirUSD(gasto, cotizaciones) {
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
        
        porcentajes[categoria] = Number(((monto / totalUSD) * 100).toFixed(1));


    }

    return porcentajes;

}

export function prepararDatosGrafico(gastos, cotizaciones) {

    const totalUSD = calcularTotalUSD(gastos, cotizaciones);
    const gastosCategorias = calcularGastosCategorias(gastos, cotizaciones);
    const porcentajesCategorias = calcularPorcentajesCategorias(gastosCategorias, totalUSD);

    return porcentajesCategorias;
};


// aquí tenemos la función que se encarga de calcular hace cuanto tiempo se hicieron los gastos
// para poder mostrar el dashboard de suma de gastos en los último x meses, usamos esto
export function calcularGastosPeriodo(periodo, gastos) {
    const today = new Date(); // seleccionamos la fecha de hoy pa
    const fechaLimite = today.setMonth(today.getMonth() - periodo); // restamos tres meses al mes actual, para usar esta fecha como referencia de corte

    const gastosPeriodo = gastos.filter((gasto) => { return new Date(gasto.fecha) >= fechaLimite })
    
    const total = calcularTotalUSD(gastosPeriodo, obtenerCotizaciones());

    return total.toFixed(1);
}

export function calcularTotalesGrafico(periodo, gastos, convertirUSD) {
    const gastosPorMes = {};
    const gastosPorSemana = {};
    const today = new Date();
    const fechaLimite = new Date(today);
    fechaLimite.setMonth(fechaLimite.getMonth() - periodo);
    fechaLimite.setHours(0, 0, 0, 0);

    const gastosPeriodo = gastos.filter((gasto) => { 
        const fecha = new Date(`${gasto.fecha}T00:00:00`);
        return (fecha >= fechaLimite && fecha <= today)})

    for (const gasto of gastosPeriodo) {
        if(periodo === 1) {
            const diasAtras = (today - new Date(gasto.fecha)) / 86400000;
            if(diasAtras > 28) { continue }

            const posicion = 28 - diasAtras

            const semana = `Semana ${Math.floor(posicion / 7) + 1}`

            if(!(semana in gastosPorSemana)) {
            gastosPorSemana[semana] = 0;
        } 

            gastosPorSemana[semana] += convertirUSD(gasto, obtenerCotizaciones());

        }

        const mes = gasto.fecha.split('-').slice(0,2).join('-');
    

        if(!(mes in gastosPorMes)) {
            gastosPorMes[mes] = 0;
        } 

    gastosPorMes[mes] += convertirUSD(gasto, obtenerCotizaciones());
    }

    if(periodo === 1) { return gastosPorSemana; }       
    
    return gastosPorMes;
}