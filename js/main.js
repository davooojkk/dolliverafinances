import {
  agregarGastos,
  eliminarGastos,
  obtenerGastos,
  editarGastos,
} from "./modules/gastos.js";

import { renderGastos } from "./modules/render.js";

import { initSubmitFormulario } from "./modules/formEvents.js";
import { initSubmitEdicion } from "./modules/gastosEvents.js";

initSubmitFormulario();
initSubmitEdicion();
renderGastos(obtenerGastos());
