export function obtenerDatosFormulario(formulario) {
    const inputs = formulario.querySelectorAll("input, select");

    let datos = {};
    inputs.forEach((input) => {
        const inputClave = input.id;
        const inputValor = input.value;

        if (input.type === "number") {
        datos[inputClave] = Number(inputValor);
        } else {
        datos[inputClave] = inputValor
        }

    });

    return datos;
}

// función que se usa en diversos lugares, es la misma función que obtenerCambiosFormulario en anteriores versiones