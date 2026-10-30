import {
  agregarGastos,
  eliminarGastos,
  obtenerGastos,
  editarGastos,
} from "./modules/gastos.js";

import { renderGastos } from "./modules/render.js";

import { initSubmitFormulario } from "./modules/formEvents.js";
import { initSubmitEdicion, initEventosGastos } from "./modules/gastosEvents.js";

initEventosGastos()
initSubmitFormulario();
initSubmitEdicion();
renderGastos(obtenerGastos());
