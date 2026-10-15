// array que guarda los gastos en objetos y una función que devuelve la misma array

let gastos = [
  {
    id: 1,
    nombre: "Surtido Carnes",
    moneda: "BRL",
    monto: 250,
    categoria: "insumos",
    fecha: "11/07/2026",
  },
  {
    id: 2,
    nombre: "Pantalla Celular",
    monto: 75,
    moneda: "BRL",
    categoria: "emergencia",
    fecha: "21/09/2026",
  },
  {
    id: 3,
    nombre: "Alquiler",
    moneda: "BRL",
    monto: 250,
    categoria: "gastos fijos",
    fecha: "21/07/2024",
  },
  {
    id: 4,
    nombre: "mensualidad OpenAI",
    moneda: "BRL",
    monto: 250,
    categoria: "gastos fijos",
    fecha: "11/03/2026",
  },
  {
    id: 5,
    nombre: "Bizcochos y Masitas",
    moneda: "BRL",
    monto: 250,
    categoria: "consumo",
    fecha: "03/01/2026",
  },
];

export function obtenerGastos() {
  return gastos;
};

// creamos una función que nos permite agregar un nuevo gasto al array.

export function agregarGastos(nuevoGasto) {
  gastos = [...gastos, nuevoGasto];
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
 
