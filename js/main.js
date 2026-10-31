import { obtenerGastos } from "./modules/gastos/gastos.js";

import { renderGastos } from "./modules/render.js";

import { initSubmitFormulario } from "./modules/formulario/formEvents.js";
import { initSubmitEdicion, initEventosGastos } from "./modules/gastos/gastosEvents.js";
import { initEventosDashboard } from "./modules/dashboard/dashboardEvents.js";
import { iniciarCotizaciones } from "./modules/dashboard/cotizaciones.js";

initEventosGastos()
initSubmitFormulario();
initSubmitEdicion();
initEventosDashboard();
renderGastos(obtenerGastos());
iniciarCotizaciones();
