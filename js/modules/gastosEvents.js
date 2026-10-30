import { eliminarGastos, editarGastos, obtenerGastos } from "./gastos.js";
import { renderGastos } from "./render.js";

export function initEventosGastos() {
  const gastosList = document.querySelector(".gastos-list");

  gastosList.addEventListener("click", (event) => {
    if (event.target.matches(".eliminar")) {
      manejarEliminacion(event.target.dataset.id);
    }
    if (event.target.matches(".editar")) {
      manejarEdicion(event.target.dataset.id);
    }
  });
}

function manejarEliminacion(id) {
  const eliminado = eliminarGastos(id);
  if (eliminado) {
    renderGastos(obtenerGastos());
  } else {
    window.alert("No hemos conseguido eliminar el gasto!");
  }
}

function manejarEdicion(id) {
  const formularioEditar = document.querySelector("#form-editar");
  const gastoSeleccionado = obtenerGastos().find(
    (g) => String(g.id) === String(id),
  );
  if (gastoSeleccionado === undefined) {
    return;
  }
  formularioEditar.classList.add("editando");
  formularioEditar.dataset.id = gastoSeleccionado.id;
  Object.entries(gastoSeleccionado).forEach(([clave, valor]) => {
    if (formularioEditar.elements.namedItem(clave)) {
      formularioEditar.elements.namedItem(clave).value = valor;
    }
  });
}

export function initSubmitEdicion() {
  const formularioEditar = document.querySelector("#form-editar");


  formularioEditar.addEventListener('submit', (event) => {
    event.preventDefault();
    const edicion = editarGastos(String(formularioEditar.dataset.id), obtenerCambiosFormulario(formularioEditar));

    if(edicion) {
        renderGastos(obtenerGastos());
        formularioEditar.classList.remove('editando')
    } else {
        window.alert('Los cambios no fueron finalizados! Intente nuevamente...')
    }
  });

  
}

function obtenerCambiosFormulario(formulario) {
    const inputs = formulario.querySelectorAll("input, select");

    let cambios = {};
    inputs.forEach((input) => {
        const inputClave = input.id;
        const inputValor = input.value;

        if (input.type === "number") {
        cambios[inputClave] = Number(inputValor);
        } else {
        cambios[inputClave] = inputValor
        }

    });

    return cambios;
}
