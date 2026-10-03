// Cada fila de docentes guarda: identificación, nombre y edad.
let docentes = obtenerMatriz("docentes");
let matrizA = obtenerMatriz("matrizA");
let matrizB = obtenerMatriz("matrizB");

function mostrarMensaje(mensaje) {
    document.getElementById("mensaje").textContent = mensaje;
}

function obtenerMatriz(nombreMatriz) {
    try {
        let datos = localStorage.getItem(nombreMatriz);

        if (datos === null) {
            return [];
        }

        let matriz = JSON.parse(datos);

        if (Array.isArray(matriz)) {
            return matriz;
        }
    } catch (error) {
        mostrarMensaje("No se pudieron recuperar los datos de " + nombreMatriz + ".");
        return [];
    }

    mostrarMensaje("Los datos guardados de " + nombreMatriz + " no son una matriz.");
    return [];
}

function guardarMatriz(nombreMatriz, matriz) {
    try {
        localStorage.setItem(nombreMatriz, JSON.stringify(matriz));
        return true;
    } catch (error) {
        mostrarMensaje("No se pudo guardar. Revisa que el navegador permita localStorage.");
        return false;
    }
}

function pedirNumero(mensaje, entero) {
    let entrada = prompt(mensaje);

    if (entrada === null) {
        mostrarMensaje("Ingreso cancelado.");
        return null;
    }

    if (entrada.trim() === "") {
        mostrarMensaje("Debe ingresar un número.");
        return null;
    }

    let numero = Number(entrada);

    if (!Number.isFinite(numero)) {
        mostrarMensaje("Debe ingresar un número válido.");
        return null;
    }

    if (entero && !Number.isInteger(numero)) {
        mostrarMensaje("Debe ingresar un número entero.");
        return null;
    }

    return numero;
}

function agregarDocente() {
    let identificacion = pedirNumero("Identificación del docente:", true);

    if (identificacion === null) {
        return;
    }

    if (identificacion <= 0) {
        mostrarMensaje("La identificación debe ser un entero positivo.");
        return;
    }

    let nombre = prompt("Nombre del docente:");

    if (nombre === null) {
        mostrarMensaje("Ingreso cancelado.");
        return;
    }

    nombre = nombre.trim();

    if (nombre === "") {
        mostrarMensaje("El nombre no puede estar vacío.");
        return;
    }

    let edad = pedirNumero("Edad del docente:", true);

    if (edad === null) {
        return;
    }

    if (edad <= 0) {
        mostrarMensaje("La edad debe ser un entero positivo.");
        return;
    }

    docentes[docentes.length] = [identificacion, nombre, edad];

    if (!guardarMatriz("docentes", docentes)) {
        docentes.length = docentes.length - 1;
        return;
    }

    listarDocentes();
    mostrarMensaje("Docente agregado.");
}

function listarDocentes() {
    mostrarTabla(docentes, "zonaDocentes", "Docentes", ["Identificación", "Nombre", "Edad"]);

    if (docentes.length === 0) {
        mostrarMensaje("No hay docentes registrados.");
        return;
    }

    mostrarMensaje("Docentes registrados: " + docentes.length + ".");
}

function eliminarDocente() {
    if (docentes.length === 0) {
        mostrarMensaje("No hay docentes registrados.");
        return;
    }

    let identificacionEliminar = pedirNumero("Identificación que desea eliminar:", true);

    if (identificacionEliminar === null) {
        return;
    }

    if (identificacionEliminar <= 0) {
        mostrarMensaje("La identificación debe ser un entero positivo.");
        return;
    }

    let nuevaMatriz = [];
    let eliminados = 0;

    // Solo copiamos las filas que tienen una identificación diferente.
    for (let i = 0; i < docentes.length; i++) {
        if (docentes[i][0] !== identificacionEliminar) {
            nuevaMatriz[nuevaMatriz.length] = docentes[i];
        } else {
            eliminados = eliminados + 1;
        }
    }

    if (eliminados === 0) {
        mostrarMensaje("No se encontró la identificación.");
        return;
    }

    if (!guardarMatriz("docentes", nuevaMatriz)) {
        return;
    }

    docentes = nuevaMatriz;
    listarDocentes();
    mostrarMensaje("Registros eliminados: " + eliminados + ".");
}

function crearMatriz(nombreMatriz) {
    let filas = pedirNumero("Cantidad de filas de " + nombreMatriz + ":", true);

    if (filas === null) {
        return;
    }

    if (filas <= 0) {
        mostrarMensaje("Las filas deben ser un entero positivo.");
        return;
    }

    let columnas = pedirNumero("Cantidad de columnas de " + nombreMatriz + ":", true);

    if (columnas === null) {
        return;
    }

    if (columnas <= 0) {
        mostrarMensaje("Las columnas deben ser un entero positivo.");
        return;
    }

    let matriz = [];

    for (let i = 0; i < filas; i++) {
        matriz[i] = [];

        for (let j = 0; j < columnas; j++) {
            let valor = pedirNumero("Valor de " + nombreMatriz + "[" + i + "][" + j + "]:", false);

            if (valor === null) {
                return;
            }

            matriz[i][j] = valor;
        }
    }

    // La matriz anterior se reemplaza solo cuando todos los valores están listos.
    if (!guardarMatriz(nombreMatriz, matriz)) {
        return;
    }

    if (nombreMatriz === "matrizA") {
        matrizA = matriz;
    } else {
        matrizB = matriz;
    }

    mostrarMatrices();
    limpiarResultado();
    mostrarMensaje(nombreMatriz + " creada y guardada.");
}

function mostrarMatrices() {
    mostrarTabla(matrizA, "zonaMatrizA", "Matriz A", null);
    mostrarTabla(matrizB, "zonaMatrizB", "Matriz B", null);

    if (matrizA.length === 0 || matrizB.length === 0) {
        mostrarMensaje("Primero debe crear las matrices A y B.");
        return;
    }

    mostrarMensaje("Matrices A y B mostradas.");
}

function modificarMatriz(nombreMatriz) {
    let matriz;

    if (nombreMatriz === "matrizA") {
        matriz = matrizA;
    } else {
        matriz = matrizB;
    }

    if (matriz.length === 0) {
        mostrarMensaje("Primero debe crear " + nombreMatriz + ".");
        return;
    }

    let fila = pedirNumero("Fila a modificar (desde 0):", true);

    if (fila === null) {
        return;
    }

    if (fila < 0 || fila >= matriz.length) {
        mostrarMensaje("La fila no existe.");
        return;
    }

    let columna = pedirNumero("Columna a modificar (desde 0):", true);

    if (columna === null) {
        return;
    }

    if (columna < 0 || columna >= matriz[fila].length) {
        mostrarMensaje("La columna no existe.");
        return;
    }

    let nuevoValor = pedirNumero("Nuevo valor:", false);

    if (nuevoValor === null) {
        return;
    }

    let valorAnterior = matriz[fila][columna];
    matriz[fila][columna] = nuevoValor;

    if (!guardarMatriz(nombreMatriz, matriz)) {
        matriz[fila][columna] = valorAnterior;
        return;
    }

    mostrarMatrices();
    limpiarResultado();
    mostrarMensaje(nombreMatriz + " modificada y guardada.");
}

function validarMatrices(mismoTamano) {
    if (matrizA.length === 0 || matrizB.length === 0) {
        mostrarMensaje("Primero debe crear las matrices A y B.");
        return false;
    }

    if (mismoTamano) {
        if (matrizA.length !== matrizB.length || matrizA[0].length !== matrizB[0].length) {
            mostrarMensaje("Las matrices deben tener el mismo tamaño.");
            return false;
        }
    } else {
        if (matrizA[0].length !== matrizB.length) {
            mostrarMensaje("Las columnas de A deben ser iguales a las filas de B.");
            return false;
        }
    }

    return true;
}

function sumarMatrices() {
    limpiarResultado();

    if (!validarMatrices(true)) {
        return;
    }

    let resultado = [];

    for (let i = 0; i < matrizA.length; i++) {
        resultado[i] = [];

        for (let j = 0; j < matrizA[i].length; j++) {
            resultado[i][j] = matrizA[i][j] + matrizB[i][j];
        }
    }

    mostrarTabla(resultado, "zonaResultado", "Suma A + B", null);
    mostrarMensaje("Suma realizada.");
}

function restarMatrices() {
    limpiarResultado();

    if (!validarMatrices(true)) {
        return;
    }

    let resultado = [];

    for (let i = 0; i < matrizA.length; i++) {
        resultado[i] = [];

        for (let j = 0; j < matrizA[i].length; j++) {
            resultado[i][j] = matrizA[i][j] - matrizB[i][j];
        }
    }

    mostrarTabla(resultado, "zonaResultado", "Resta A - B", null);
    mostrarMensaje("Resta realizada.");
}

function multiplicarMatrices() {
    limpiarResultado();

    if (!validarMatrices(false)) {
        return;
    }

    let filasA = matrizA.length;
    let columnasA = matrizA[0].length;
    let columnasB = matrizB[0].length;
    let resultado = [];

    for (let i = 0; i < filasA; i++) {
        resultado[i] = [];

        for (let j = 0; j < columnasB; j++) {
            let suma = 0;

            // k recorre una fila de A y una columna de B al mismo tiempo.
            for (let k = 0; k < columnasA; k++) {
                suma = suma + matrizA[i][k] * matrizB[k][j];
            }

            resultado[i][j] = suma;
        }
    }

    mostrarTabla(resultado, "zonaResultado", "Multiplicación A × B", null);
    mostrarMensaje("Multiplicación realizada.");
}

function mostrarTabla(matriz, zona, titulo, encabezados) {
    let contenedor = document.getElementById(zona);
    contenedor.textContent = "";

    if (matriz.length === 0) {
        let subtitulo = document.createElement("h3");
        subtitulo.textContent = titulo;
        contenedor.appendChild(subtitulo);

        let aviso = document.createElement("p");
        aviso.textContent = "No hay datos guardados.";
        contenedor.appendChild(aviso);
        return;
    }

    let tabla = document.createElement("table");
    let descripcion = document.createElement("caption");
    descripcion.textContent = titulo + " (" + matriz.length + " filas, " + matriz[0].length + " columnas)";
    tabla.appendChild(descripcion);

    if (encabezados !== null) {
        let filaEncabezado = document.createElement("tr");

        for (let j = 0; j < encabezados.length; j++) {
            let celda = document.createElement("th");
            celda.textContent = encabezados[j];
            celda.scope = "col";
            filaEncabezado.appendChild(celda);
        }

        tabla.appendChild(filaEncabezado);
    }

    for (let i = 0; i < matriz.length; i++) {
        let fila = document.createElement("tr");

        for (let j = 0; j < matriz[i].length; j++) {
            let celda = document.createElement("td");
            celda.textContent = matriz[i][j];
            fila.appendChild(celda);
        }

        tabla.appendChild(fila);
    }

    contenedor.appendChild(tabla);
}

function limpiarResultado() {
    let zona = document.getElementById("zonaResultado");
    zona.textContent = "";

    let titulo = document.createElement("h3");
    titulo.textContent = "Resultado de la operación";
    zona.appendChild(titulo);

    let aviso = document.createElement("p");
    aviso.textContent = "Selecciona una operación para ver el resultado.";
    zona.appendChild(aviso);
}

// Las tablas se dibujan con las matrices recuperadas al cargar la página.
mostrarTabla(docentes, "zonaDocentes", "Docentes", ["Identificación", "Nombre", "Edad"]);
mostrarTabla(matrizA, "zonaMatrizA", "Matriz A", null);
mostrarTabla(matrizB, "zonaMatrizB", "Matriz B", null);
