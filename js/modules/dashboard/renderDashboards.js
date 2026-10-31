export function renderTotalMoneda(total, moneda) {
    const totalMoneda = document.querySelector('#total-moneda');
    const monedaSeleccionada = document.querySelector('#moneda-seleccionada');
    totalMoneda.innerText = total;
    monedaSeleccionada.innerText = moneda;
};