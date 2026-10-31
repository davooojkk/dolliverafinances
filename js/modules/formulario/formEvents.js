import { agregarGastos, obtenerGastos } from "../gastos/gastos.js";
import { renderGastos } from "../render.js";
import { obtenerDatosFormulario } from "./formUtils.js";



const formulario = document.querySelector('#gastos-form'); // seleccionamos el formulario del evento.
const mensajeError = document.querySelector('#mensaje-error');

function submitFormulario(event) {
    event.preventDefault();
    const nuevoGasto = obtenerDatosFormulario(formulario);
    const gastoAgregado = agregarGastos(nuevoGasto);
    if(gastoAgregado === true) {
        renderGastos(obtenerGastos());
        actualizarTotalMoneda();
        mensajeError.classList.remove("error")
    } else {
        mensajeError.classList.add('error');
    };
};

export function initSubmitFormulario() {
    formulario.addEventListener('submit', submitFormulario); // le asignamos el eventListener de submit
}