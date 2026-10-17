import { agregarGastos, obtenerGastos } from "./gastos.js";
import { renderGastos } from "./render.js";



const formulario = document.querySelector('#gastos-form'); // seleccionamos el formulario del evento.
const mensajeError = document.querySelector('#mensaje-error');

function submitFormulario(event) {
    event.preventDefault();
    const inputs = document.querySelectorAll('#gastos-form input, #gastos-form select');
    let nuevoGasto = {};
    inputs.forEach(input => {
        let propiedad = input.id;
        let valor = input.value; // descubrí algo nuevo: consultamos el valor del input con value.

        if (input.type === 'number') {
            valor = Number(valor);
        };

        nuevoGasto[propiedad] = valor;
    });
    const gastoAgregado = agregarGastos(nuevoGasto);
    if(gastoAgregado === true) {
        renderGastos(obtenerGastos());
    } else {
        mensajeError.classList.add('error');
    };
};

export function initSubmitFormulario() {
    formulario.addEventListener('submit', submitFormulario); // le asignamos el eventListener de submit
}