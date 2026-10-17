// array que guarda los gastos en objetos y una función que devuelve la misma array

let gastos = [];

export function obtenerGastos() {
  return gastos;
};

import { monedasValidas, categoriasValidas } from "./formData";

export function validarGastos(nuevoGasto) { // para validar el gasto y no sobrecargar una funcion
    if(!(Number.isFinite(nuevoGasto.monto) && nuevoGasto.monto > 0)) {
      return false;
    }
    if(!(monedasValidas.includes(nuevoGasto.moneda))) {
      return false;
    };
    if(!(categoriasValidas.includes(nuevoGasto.categoria))) {
      return false;
    };
    if(nuevoGasto.descripcion.trim() === '') {
      return false;
    };
    if(Number.isNaN(new Date(nuevoGasto.fecha).getTime())) {
      return false;
    };

    return true;
}; 

// creamos una función que nos permite agregar un nuevo gasto al array.

export function agregarGastos(nuevoGasto) {
  if(!(validarGastos(nuevoGasto))) {
    return false;
  } else {
   let randomNumber = Math.floor(1 + (Math.random() * 10000));
  while  ((gastos.some(gasto => gasto.id === randomNumber))) {
      randomNumber = Math.floor(1 + ( Math.random()  * 10000));
  }
  const addGasto = {...nuevoGasto, id: randomNumber,}
   gastos = [...gastos, addGasto];
   return true;
};

// con esta función seremos capaces de eliminar gastos del array.
export function eliminarGastos(id) {
  gastos = gastos.filter((g) => g.id !== id);
};

// aquí el usuario será capaz de editar los gastos del array
export function editarGastos(id, cambios) {
  const gastosEditados = gastos.map((g) => {
    if (g.id === id) {
      g = {
        ...g,
        ...cambios,
        id: g.id
      };

      return g;
    };

    return g
  });
  
  gastos = gastosEditados;
};
 
