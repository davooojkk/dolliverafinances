// array que guarda los gastos en objetos y una función que devuelve la misma array

let gastos = [];

export function obtenerGastos() {
  return gastos;
};

// creamos una función que nos permite agregar un nuevo gasto al array.



export function agregarGastos(nuevoGasto) {
  const randomNumber = Math.floor(1 + (Math.random() * 10000));
  const addGasto = {...nuevoGasto, id: randomNumber,}
  

  gastos = [...gastos, addGasto];
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
 
