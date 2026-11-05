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
    const canvas = document.querySelector('#grafico-categorias');
    const parrafo = document.querySelector('#grafico-gastos p');
    const sinGastos = !porcentajes || Object.keys(porcentajes).length === 0;
    parrafo.hidden = !sinGastos;
    canvas.style.display = sinGastos ? 'none' : 'block';
    if (sinGastos) return;

    const labels = Object.keys(porcentajes);
    const data = Object.values(porcentajes);

    const coloresCategorias = {
        consumo: '#a6aab2',
        fastfood: '#ef4548',
        'gasto fijo': '#59b4bb',
        insumos: '#7795a3',
        'salud-cuidado': '#688773',
        hogar: '#b4a6b5',
        mascota: '#d88a65',
        transporte: '#8c66ab'
    };

    const backgroundColores = labels.map((label) => {
        return coloresCategorias[label]
    });

    if (instanciaGrafico !== null) {
        instanciaGrafico.data.labels = labels;
        instanciaGrafico.data.datasets[0].data = data;
        instanciaGrafico.update();
        return;
    }

    instanciaGrafico = new Chart(canvas, {
        type: 'pie',
        data: {
            labels: labels,
            datasets: [{
                data: data,
                backgroundColor: backgroundColores,
                borderColor: '#171b1e',
                borderWidth: 0,
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
    const dashboard = document.querySelector('#vista-dashboards');
    if(dashboard.classList.contains('visible')) {
        const porcentajes = prepararDatosGrafico(
        obtenerGastos(),
        obtenerCotizaciones()
    );

    if (porcentajes === null) return;

    renderGraficoCategorias(porcentajes);
    }
}

export function renderCotizaciones(cotizacionesActuales) {
    const cotizacionSection = document.querySelector('#cotizacion-oficial');

    const cotizacionPesos = document.createElement('h2');
    const cotizacionReales = document.createElement('h2')
    const cotizacionFecha = document.createElement('span')

    cotizacionPesos.innerText = cotizacionesActuales.UYU;
    cotizacionReales.innerText = cotizacionesActuales.BRL;
    cotizacionFecha.innerText = cotizacionesActuales.fecha.toLocaleTimeString('es-UY');
    cotizacionSection.replaceChildren(cotizacionPesos, cotizacionReales, cotizacionFecha);
}

export function renderTotalGastos(resultado) {
    const totalHTML = document.querySelector('#total-gastos-usd');
    totalHTML.innerText = `${resultado}`
}