import { obtenerGastos } from "./modules/gastos/gastos.js";

import { renderGastos } from "./modules/render.js";

import { initSubmitFormulario } from "./modules/formulario/formEvents.js";
import { initSubmitEdicion, initEventosGastos } from "./modules/gastos/gastosEvents.js";
import { initEventosDashboard } from "./modules/dashboard/dashboardEvents.js";
import { iniciarCotizaciones, obtenerCotizaciones } from "./modules/dashboard/cotizaciones.js";
import { actualizarGrafico, renderCotizaciones } from "./modules/dashboard/renderDashboards.js";
import { initVistas } from "./modules/animaciones/navegacion.js";

initVistas();
initEventosGastos()
initSubmitFormulario();
initSubmitEdicion();
initEventosDashboard();
renderGastos(obtenerGastos());
await iniciarCotizaciones(actualizarGrafico, renderCotizaciones);
renderCotizaciones(obtenerCotizaciones());