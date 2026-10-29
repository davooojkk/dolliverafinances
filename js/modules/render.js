import { initEditarGastos, initEliminarGastos } from "./gastosEvents.js";

export function renderGastos(gastos) {

  const bloqueGastos = document.querySelector(".gastos-list");
  const gastosOrdenados = gastos.toSorted((a, b) => {
  const fechaA = a.fecha.split("/").reverse().join("-");
  const fechaB = b.fecha.split("/").reverse().join("-");

    return fechaB.localeCompare(fechaA);
  });

  bloqueGastos.innerHTML = "";
  gastosOrdenados.forEach((gasto) => {
    const tarjeta = document.createElement("div");
    bloqueGastos.appendChild(tarjeta);
    const descripcion = document.createElement("p");
    const categoria = document.createElement("p");
    const moneda = document.createElement("span");
    const monto = document.createElement("span")
    const fecha = document.createElement("span");
    const eliminarBoton = document.createElement('button');
    const editarBoton = document.createElement('button');
    tarjeta.append(descripcion, categoria, monto, moneda, fecha, eliminarBoton, editarBoton);
    descripcion.innerText = gasto.descripcion;
    categoria.innerText = gasto.categoria;
    moneda.innerText = gasto.moneda;
    monto.innerText = gasto.monto;
    fecha.innerText = gasto.fecha.split('-', 3).reverse().join('/');
    eliminarBoton.innerText = 'eliminar'
    eliminarBoton.dataset.id = gasto.id
    eliminarBoton.classList.add('eliminar')
    editarBoton.innerText = 'editar'
    editarBoton.dataset.id = gasto.id
    editarBoton.classList.add('editar')
  });

  initEliminarGastos();
  initEditarGastos();

}


/**
 * Aquí renderizamos los objetos de la lista para que todos los gastos aparezcan en la home.
 *
 * Fue interesante aprender cosas como el método toSorted() que me permitió ordenar
 * los valores del array para mostrar todo en fechas ordenadas.
 *
 * Mi entendimiento:
 *
 * Lo que hace toSorted es comparar a & b para luego decidir qué hacer con el orden.
 * La función hace una resta entre los dos términos, si el resultado es negativo,
 * el primer término pasa a ocupar el primer lugar y el segundo el segundo.
 * Si da positivo, el segundo término invierte su lugar con el primero.
 * Si da cero, se mantiene el orden.
 *
 * Explicación formal IA:
 *
 * @param {number} a - Primer elemento comparado.
 * @param {number} b - Segundo elemento comparado.
 * @returns {number}
 *   - < 0  → `a` se coloca antes que `b` (orden: [a, b])
 *   - > 0  → `b` se coloca antes que `a` (orden: [b, a])
 *   - === 0 → No cambia el orden relativo
 */
function compare(a, b) {
  return a - b; // ascendente
}

// Uso:
[40, 10, 100, 5].toSorted((a, b) => a - b); // [5, 10, 40, 100]
[40, 10, 100, 5].toSorted((a, b) => b - a); // [100, 40, 10, 5]   