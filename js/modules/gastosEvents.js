import { eliminarGastos, editarGastos } from './gastos.js'



export function initEliminarGastos() {
    const botonesEliminar = document.querySelectorAll('.eliminar');
    botonesEliminar.forEach((boton) => {
    boton.addEventListener('click', () => { eliminarGastos(Number(boton.dataset.id)) })});
};

export function initEditarGastos() {
    const botonesEditar = document.querySelectorAll('.editar');

    botonesEliminar.forEach((boton) => {
    boton.addEventListener('click', () => { eliminarGastos(Number(boton.dataset.id)) })});
};

