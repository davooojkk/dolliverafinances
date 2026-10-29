import { monedasValidas, categoriasValidas } from "./formData.js";
import { guardarGastos, importarGastos } from "./storage.js";

// array que guarda los gastos en objetos y una función que devuelve la misma array

let gastos = importarGastos(); // los gastos se importan desde local storage

export function obtenerGastos() {
  const gastosObtenidos = gastos.map((gasto) => {
  return {...gasto}
  }); // función básica que utilizaremos bastante, simplemente para no perder inmutabilidad
  return gastosObtenidos;
};

export function validarGastos(nuevoGasto) { // para validar el gasto y no sobrecargar una funcion, codigo ya ajustado!
   const montoValido = Number.isFinite(nuevoGasto.monto) && nuevoGasto.monto > 0;
   const monedaValida = monedasValidas.includes(nuevoGasto.moneda);  
   const categoriaValida = categoriasValidas.includes(nuevoGasto.categoria);
   const descripcionValida = typeof nuevoGasto.descripcion === 'string' && nuevoGasto.descripcion.trim() !== '';
   const fechaValida = !(Number.isNaN(new Date(nuevoGasto.fecha).getTime()));

  return montoValido && monedaValida && categoriaValida && descripcionValida && fechaValida;
}; 

// creamos una función que nos permite agregar un nuevo gasto al array.

export function agregarGastos(nuevoGasto) {
  if(!(validarGastos(nuevoGasto))) {
    return false;
  } 
  let randomNumber = Math.floor(1 + (Math.random() * 10000));
  while  ((gastos.some(gasto => gasto.id === randomNumber))) {
      randomNumber = Math.floor(1 + ( Math.random()  * 10000));
  };
  const addGasto = {...nuevoGasto, id: randomNumber,}
  gastos = [...gastos, addGasto];
  guardarGastos(gastos);
  return true;
};

// con esta función seremos capaces de eliminar gastos del array.
export function eliminarGastos(id) {
  gastos = gastos.filter((g) => g.id !== id);
    guardarGastos(gastos);
};

// aquí el usuario será capaz de editar los gastos del array
export function editarGastos(id, cambios) {
  let edicionValidada = false;
  const gastosEditados = gastos.map((g) => {
    if (g.id === id) {
      const gastoEditado = {
        ...g,
        ...cambios,
        id: g.id
      };
      if (validarGastos(gastoEditado) === true) {
          edicionValidada = true;
          return gastoEditado;
        }
        return g;
    };
        return g;
  });

  if(edicionValidada === true) {
    gastos = gastosEditados;
    guardarGastos(gastos);
  }

  return edicionValidada;
};
