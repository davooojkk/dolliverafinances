import { agregarGastos, obtenerGastos } from "./gastos.js";
import { renderGastos } from "./render.js";



const formulario = document.querySelector('#gastos-form'); // seleccionamos el formulario del evento.

function submitFormulario(event) {
    event.preventDefault();
    const inputs = document.querySelectorAll('#gastos-form input');
    let nuevoGasto = {};
    inputs.forEach(input => {
        let propiedad = input.id;
        let valor = input.value; // descubrí algo nuevo: consultamos el valor del input con value.

        if (input.type === 'number') {
            valor = Number(valor);
        };

        nuevoGasto[propiedad] = valor;
    });
    agregarGastos(nuevoGasto);
    renderGastos(obtenerGastos());
};

export function initSubmitFormulario() {
    formulario.addEventListener('submit', submitFormulario); // le asignamos el eventListener de submit
}