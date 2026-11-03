import { obtenerGastos } from "./modules/gastos/gastos.js";

import { renderGastos } from "./modules/render.js";

import { initSubmitFormulario } from "./modules/formulario/formEvents.js";
import { initSubmitEdicion, initEventosGastos } from "./modules/gastos/gastosEvents.js";
import { initEventosDashboard } from "./modules/dashboard/dashboardEvents.js";
import { iniciarCotizaciones, obtenerCotizaciones } from "./modules/dashboard/cotizaciones.js";
import { prepararDatosGrafico } from "./modules/dashboard/calculos.js";
import { renderGraficoCategorias } from "./modules/dashboard/renderDashboards.js";

initEventosGastos()
initSubmitFormulario();
initSubmitEdicion();
initEventosDashboard();
renderGastos(obtenerGastos());
await iniciarCotizaciones();
const porcentajes = prepararDatosGrafico( obtenerGastos(), obtenerCotizaciones())
renderGraficoCategorias(porcentajes);