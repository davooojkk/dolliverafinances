import { eliminarGastos, editarGastos, gastos } from './gastos.js'
import { renderGastos } from './render.js';



export function initEliminarGastos() {
    const botonesEliminar = document.querySelectorAll('.eliminar');
    botonesEliminar.forEach((boton) => {
    boton.addEventListener('click', () => { eliminarGastos(Number(boton.dataset.id)) })});
};

export function initEditarGastos() {
    const botonesEditar = document.querySelectorAll('.editar');
    const formularioEditar = document.querySelector('#form-editar')

    botonesEditar.forEach((boton) => {
        const gastoSeleccionado = gastos.find(g => g.id === Number(boton.dataset.id));
  

        boton.addEventListener('click', () => {
          formularioEditar.classList.add('editando')
          formularioEditar.dataset.id = gastoSeleccionado.id
           Object.entries(gastoSeleccionado).forEach(([clave, valor]) => {

                if(formularioEditar.elements.namedItem(clave)) {
                    formularioEditar.elements.namedItem(clave).value = valor;
                };
          });
    });

});

const inputs = formularioEditar.querySelectorAll('input, select')

 formularioEditar.addEventListener('submit', (event) => {
        event.preventDefault();
        let cambios = {};
        inputs.forEach((input) => {
            const inputClave = input.id;
            const inputValor = input.value;
        
            if(input.type === 'number') {
                cambios[inputClave] = Number(inputValor);
            } else {
                cambios[inputClave] = inputValor;
            }
        })

        editarGastos(Number(formularioEditar.dataset.id), cambios);
        formularioEditar.classList.remove('editando')
    });
};