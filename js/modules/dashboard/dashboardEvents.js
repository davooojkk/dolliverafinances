import { renderTotalGastos, renderTotalMoneda } from "./renderDashboards.js";
import { calcularGastosPeriodo, calcularTotalMonedas } from "./calculos.js";
import { obtenerGastos } from "../gastos/gastos.js";

const dashboardTotalMoneda = document.querySelector('#formulario-gastos-moneda');
const monedasValidas = dashboardTotalMoneda.querySelector('#monedas')

export function initEventosDashboard() {
    monedasValidas.addEventListener('change', actualizarTotalMonedas);
}

export function actualizarTotalMonedas() {
    const moneda = monedasValidas.value;
    renderTotalMoneda(calcularTotalMonedas(obtenerGastos(), moneda), moneda)
}

export function initFiltroPeriodo() {
    const totalGastos = document.querySelector('#gastos-totales');
    let periodo = 1;
    totalGastos.addEventListener('click', (event) => {
        const boton = event.target;
        if(!(boton.dataset.periodo)) { return }
        periodo = Number(boton.dataset.periodo);
        
        calcularPeriodo(periodo)
    });

    return () => calcularPeriodo;
}


function calcularPeriodo(periodo) { 
    renderTotalGastos(calcularGastosPeriodo(periodo, obtenerGastos())) // funcion para evitar duplicar logica en la función initFiltroperiodo
}