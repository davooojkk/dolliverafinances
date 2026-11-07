import { renderTotalGastos, renderTotalMoneda } from "./renderDashboards.js";
import { renderGraficoPeriodo } from "./renderDashboards.js";
import {
    calcularGastosPeriodo,
    calcularTotalesGrafico,
    calcularTotalMonedas,
    convertirUSD
} from "./calculos.js";

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
    const botones = document.querySelectorAll('#gastos-totales button')
    botones[0].classList.add('activo')
    let periodo = 1;

    totalGastos.addEventListener('click', (event) => {
        botones.forEach((b) => { b.classList.remove('activo') })
        const boton = event.target;
        boton.classList.add('activo')
        if(!(boton.dataset.periodo)) { return }
        periodo = Number(boton.dataset.periodo);
        
        calcularPeriodo(periodo)
    });

    return () => calcularPeriodo(periodo);
}

function calcularPeriodo(periodo) { 
    renderTotalGastos(calcularGastosPeriodo(periodo, obtenerGastos())) // funcion para evitar duplicar logica en la función initFiltroperiodo
    const datos = calcularTotalesGrafico(periodo, obtenerGastos(), convertirUSD);
    renderGraficoPeriodo(datos);
}