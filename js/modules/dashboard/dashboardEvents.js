import { renderTotalMoneda } from "./renderDashboards.js";
import { calcularTotalMonedas } from "./calculos.js";
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


