import { obtenerGastos } from "../gastos/gastos.js";
import { obtenerCotizaciones } from "./cotizaciones.js";
import { prepararDatosGrafico } from "./calculos.js";

export function renderTotalMoneda(total, moneda) {
    const totalMoneda = document.querySelector('#total-moneda');
    const monedaSeleccionada = document.querySelector('#moneda-seleccionada');
    totalMoneda.innerText = total;
    monedaSeleccionada.innerText = moneda;
};

const graficoGastos = document.querySelector('#grafico-gastos')

let instanciaGrafico = null;

export function renderGraficoCategorias(porcentajes) {
    graficoGastos.hidden = !porcentajes || Object.keys(porcentajes).length === 0;
    if (graficoGastos.hidden) return;

    const labels = Object.keys(porcentajes);
    const data = Object.values(porcentajes);

    if (instanciaGrafico !== null) {
        instanciaGrafico.data.labels = labels;
        instanciaGrafico.data.datasets[0].data = data;
        instanciaGrafico.update();
        return;
    }
    const canvas = document.querySelector('#grafico-categorias');
    instanciaGrafico = new Chart(canvas, {
        type: 'pie',
        data: {
            labels: labels,
            datasets: [{
                data: data,
                backgroundColor: ['#ef4548', '#d88a65', '#7795a3', '#b4a6b5', '#bb8e59', '#688773', '#ab667e', '#a6aab2'],
                borderColor: '#171b1e',
                borderWidth: 2,
            }]
        },
        options: {
            maintainAspectRatio: false,
            animation: { duration: 250 },
            plugins: { legend: { labels: {
                color: '#c5cccb', font: { family: 'IBM Plex Mono', size: 10 },
                boxWidth: 10, boxHeight: 10, padding: 8
            } } }
        }
    });
    document.fonts.ready.then(() => instanciaGrafico.update('none'));
};

export function actualizarGrafico() {
    const porcentajes = prepararDatosGrafico(
        obtenerGastos(),
        obtenerCotizaciones()
    );

    if (porcentajes === null) return;

    renderGraficoCategorias(porcentajes);
}
