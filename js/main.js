import {
  agregarGastos,
  eliminarGastos,
  obtenerGastos,
  editarGastos,
} from "./modules/gastos.js";

import { renderGastos } from "./modules/render.js";

renderGastos(obtenerGastos());
