export function guardarGastos(gastos) {
    localStorage.setItem("gastos", JSON.stringify(gastos)); // aprendi que stringfy convierte js en string.
}

export function importarGastos() {
     try {
        return JSON.parse(localStorage.getItem("gastos")) ?? []; 
     }

     catch {
        console.error('JSON corrupto');
        return [];
     }
     /* 
        aprendi dos cosas interesantes

        JSON.parse trae ese string que hice con stringfy y lo devuelve a js de nuevo

        y ?? que sirve para darle alternativas a js caso el primer valor sea null.
     */
}

