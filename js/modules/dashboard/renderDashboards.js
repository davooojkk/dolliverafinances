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
        consumo: '#66758F',
        fastfood: '#F52236',
        'gasto fijo': '#00AEBB',
        insumos: '#397F9E',
        'salud-cuidado': '#318354',
        hogar: '#A36BA7',
        mascota: '#ED743A',
        transporte: '#873DBD'
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

    let grafico = null;

export function renderGraficoPeriodo(datos) {
    const labels = Object.keys(datos);
    const data = Object.values(datos);
    const canvas = document.querySelector('#grafico-periodos')


    if(grafico === null) {
        grafico = new Chart(canvas, {
        type: 'line',
        data: {
            labels: labels,
            datasets: [{
                label: 'Gastos en USD', 
                data: data,
                borderColor: '#ef4548',
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

    })
    return;
    }

    grafico.data.labels = labels;
    grafico.data.datasets[0].data = data;
    grafico.update()
}
