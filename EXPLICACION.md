# Guía del trabajo: docentes y operaciones con matrices

Este proyecto sirve para practicar arreglos, matrices, índices, ciclos `for`, condicionales y almacenamiento en el navegador. La idea principal es guardar datos en JavaScript, recorrerlos con ciclos y mostrar lo que ocurre en una página HTML sencilla.

Hay dos partes:

- Una matriz de docentes que permite agregar, listar y eliminar registros.
- Dos matrices numéricas, A y B, que permiten crear, mostrar, modificar, sumar, restar y multiplicar.

## Cómo ejecutar el proyecto

Los archivos deben permanecer juntos en la misma carpeta:

```text
index.html
style.css
script.js
EXPLICACION.md
```

Abre `index.html` con doble clic y utiliza Chrome o Edge. Si tu navegador predeterminado es otro, puedes hacer clic derecho en el archivo, escoger **Abrir con** y seleccionar Chrome o Edge. No necesitas instalar un servidor, Node.js, un framework ni una librería. Los botones ejecutan las funciones escritas en `script.js`; `style.css` organiza su presentación. Al pedir datos aparecen cuadros de entrada: escribe el dato y pulsa **Aceptar**, o pulsa **Cancelar** para terminar esa acción.

Para volver a encontrar los datos guardados, usa el mismo navegador y el mismo origen. Cuando abres el archivo con doble clic, conviene mantener la misma ruta del archivo y el mismo perfil del navegador. El comportamiento de `localStorage` para direcciones `file:` puede variar entre navegadores. Si cambias de navegador, perfil o ubicación del archivo, no debes asumir que tendrás el mismo almacenamiento. Borrar los datos del navegador también puede borrar lo guardado. Una sesión privada puede perder los datos al cerrar esa sesión.

## 1. Qué es una matriz

Una matriz es una colección de datos organizada en filas y columnas. Por ejemplo:

```text
1  2
3  4
```

Tiene dos filas y dos columnas. En JavaScript podemos escribirla así:

```javascript
let matriz = [
    [1, 2],
    [3, 4]
];
```

La matriz permite conservar y trabajar con los valores durante la ejecución del programa. Una tabla HTML puede mostrar esos valores, pero la tabla y la matriz son cosas distintas. La matriz es el dato que usamos para calcular; la tabla es una forma de presentarlo en pantalla.

## 2. Por qué una matriz es un arreglo de arreglos

Un arreglo guarda varios elementos en una sola variable. Por ejemplo:

```javascript
let fila = [1, 2];
```

Una matriz usa un arreglo principal cuyos elementos son otros arreglos:

```javascript
let matriz = [
    [1, 2],
    [3, 4]
];
```

El arreglo principal contiene dos elementos: la fila `[1, 2]` y la fila `[3, 4]`. Cada fila es un arreglo con sus propios elementos. Por eso decimos “arreglo de arreglos”.

En la parte de docentes, cada fila también es un arreglo, pero sus columnas tienen un significado fijo:

| Columna | Información |
| --- | --- |
| `0` | Identificación |
| `1` | Nombre |
| `2` | Edad |

Por ejemplo, `[1234, "Juan", 32]` es una fila que representa un docente completo.

## 3. Qué representa `matriz[i][j]`

`i` representa la posición de una fila y `j` representa la posición de una columna dentro de esa fila.

Con esta matriz:

```javascript
let matriz = [
    [1, 2],
    [3, 4]
];
```

Los accesos quedan así:

| Expresión | Significado | Valor |
| --- | --- | --- |
| `matriz[0]` | Primera fila completa | `[1, 2]` |
| `matriz[1]` | Segunda fila completa | `[3, 4]` |
| `matriz[0][0]` | Primera fila, primera columna | `1` |
| `matriz[0][1]` | Primera fila, segunda columna | `2` |
| `matriz[1][0]` | Segunda fila, primera columna | `3` |
| `matriz[1][1]` | Segunda fila, segunda columna | `4` |

Primero escogemos la fila con el primer par de corchetes. Después escogemos el elemento dentro de esa fila con el segundo par de corchetes.

En docentes, `docentes[i][0]` consulta la identificación del docente de la fila `i`. `docentes[i][1]` consulta su nombre y `docentes[i][2]` consulta su edad.

## 4. Por qué las posiciones comienzan desde 0

Los arreglos de JavaScript utilizan índices que empiezan en `0`. Es la forma en que el lenguaje identifica sus posiciones.

Un arreglo con tres elementos tiene los índices `0`, `1` y `2`. El tercer elemento existe en la posición `2`, aunque al hablar normalmente lo llamemos “tercer elemento”.

```javascript
let nombres = ["Juan", "Pepa", "Pedro"];
```

| Índice | Elemento |
| --- | --- |
| `0` | Juan |
| `1` | Pepa |
| `2` | Pedro |

Por esa razón, para modificar la primera fila y segunda columna de una matriz, debemos indicar fila `0` y columna `1`.

## 5. Qué hace `.length`

`.length` informa la longitud de un arreglo. En las matrices que construimos sin huecos, `matriz.length` indica cuántas filas hay.

```javascript
let matriz = [
    [1, 2],
    [3, 4]
];
```

Aquí `matriz.length` vale `2`. `matriz[0].length` también vale `2`, porque la primera fila tiene dos elementos. Si las filas tienen la misma cantidad de elementos, podemos usar la longitud de la primera fila como cantidad de columnas de toda la matriz.

La longitud y el último índice no son iguales. Para un arreglo con `2` elementos, la longitud es `2` y el último índice es `1`.

## 6. Por qué usamos `i < matriz.length` y no `i <= matriz.length`

Un ciclo típico es:

```javascript
for (let i = 0; i < matriz.length; i++) {
    // Trabajar con la fila que está en la posición i.
}
```

Tiene tres partes:

1. `let i = 0`: empieza en la primera posición válida.
2. `i < matriz.length`: repite mientras exista una posición por recorrer.
3. `i++`: suma uno a `i` después de cada vuelta.

Si `matriz.length` vale `2`, el recorrido correcto es:

| Valor de `i` | ¿`i < 2`? | Qué ocurre |
| --- | --- | --- |
| `0` | Sí | Se usa la primera fila. |
| `1` | Sí | Se usa la segunda fila. |
| `2` | No | Termina el ciclo. |

Si escribimos `i <= matriz.length`, también entraríamos cuando `i` vale `2`. Intentaríamos leer `matriz[2]`, pero esa fila no existe. La lectura produciría `undefined`; intentar acceder a una columna de esa fila puede causar un error. El límite correcto es `<`.

## 7. Qué es `localStorage`

`localStorage` es un espacio de almacenamiento del navegador. Permite conservar información más allá de la ejecución actual de la página.

Una variable JavaScript pertenece a la ejecución actual. Cuando recargamos la página, el código vuelve a empezar y las variables se crean nuevamente. Si antes guardamos los datos en `localStorage`, el programa puede recuperarlos al comenzar la nueva ejecución.

En este trabajo se guardan tres cosas:

| Clave | Datos guardados |
| --- | --- |
| `docentes` | La matriz de docentes. |
| `matrizA` | La matriz numérica A. |
| `matrizB` | La matriz numérica B. |

Los resultados de suma, resta y multiplicación se pueden calcular nuevamente a partir de A y B. La persistencia requerida corresponde a docentes, A y B.

## 8. Qué es una clave y un valor

Una clave es el nombre con el que identificamos un dato guardado. El valor es el contenido asociado a ese nombre.

Por ejemplo, la clave `matrizA` puede tener el valor de texto `[[1,2],[3,4]]`. El navegador sabe qué dato devolver cuando pedimos la clave `matrizA`.

Las claves distinguen mayúsculas y minúsculas. `matrizA` y `matriza` serían nombres diferentes. Debemos usar el mismo nombre al guardar y al recuperar.

## 9. Qué hace `setItem()`

`localStorage.setItem(clave, valor)` guarda un valor asociado a una clave. Si la clave ya existe, actualiza su valor.

El ejemplo principal es:

```javascript
localStorage.setItem("matrizA", JSON.stringify(matrizA));
```

Primero `JSON.stringify(matrizA)` convierte la matriz en texto. Después `setItem()` guarda ese texto con el nombre `matrizA`.

Después de modificar o eliminar información, debemos volver a guardar la matriz actualizada. Cambiar una variable no cambia automáticamente lo almacenado en el navegador.

## 10. Qué hace `getItem()`

`localStorage.getItem(clave)` busca el valor guardado con ese nombre. Devuelve texto si existe, o `null` si la clave no existe.

```javascript
let datos = localStorage.getItem("matrizA");
```

`datos` todavía no es una matriz. Es el texto almacenado. Si no hay información, puede valer `null`. Por eso debemos comprobar ese caso antes de usar los datos como una matriz.

## 11. Qué hace `JSON.stringify()`

Convierte un dato de JavaScript en texto con formato JSON. En este proyecto convierte arreglos de arreglos en texto que podemos guardar.

```javascript
let matriz = [[1, 2], [3, 4]];
let texto = JSON.stringify(matriz);
```

El contenido de `texto` es:

```text
[[1,2],[3,4]]
```

La variable `matriz` sigue siendo una matriz. La variable `texto` es una cadena de caracteres que la representa. Los espacios que usamos para leer el código no son necesarios para que JSON conserve las filas y los valores.

## 12. Qué hace `JSON.parse()`

Realiza el paso contrario: toma texto JSON válido y reconstruye el dato de JavaScript.

```javascript
let texto = "[[1,2],[3,4]]";
let matriz = JSON.parse(texto);
```

Después podemos usar `matriz[0][1]`, cuyo valor es `2`.

El recorrido completo es:

```text
Matriz en JavaScript
    → JSON.stringify()
    → Texto JSON
    → localStorage.setItem()
    → Dato guardado en el navegador

Dato guardado en el navegador
    → localStorage.getItem()
    → Texto JSON
    → JSON.parse()
    → Matriz en JavaScript
```

Si el texto no tiene formato JSON válido, `JSON.parse()` genera un error. Por eso el código debe manejar la lectura y no asumir que todo contenido guardado es correcto.

## 13. Cómo se agrega un docente

Cada docente se convierte en una fila con este orden:

```text
[identificación, nombre, edad]
```

El procedimiento general es pedir los tres datos, comprobarlos y colocar la fila al final de la matriz. La identificación y la edad deben ser numéricas. El nombre debe contener texto. Al terminar hay que guardar la matriz completa con la clave `docentes`.

La identificación puede repetirse porque la tarea pide comprobar que la eliminación maneja todas las coincidencias. Que dos docentes tengan la misma identificación no significa que debamos agregar una copia extra al eliminar.

## 14. Cómo se crea Matriz A

Crear A requiere pedir la cantidad de filas y columnas. Ambas cantidades deben ser enteros positivos. Después hay que recorrer cada fila y cada columna para pedir sus valores.

Un ciclo externo crea las filas. Un ciclo interno llena las columnas de cada fila. Si pedimos dos filas y dos columnas, las posiciones que se llenan, en orden, son `[0][0]`, `[0][1]`, `[1][0]` y `[1][1]`.

Cuando la captura termina correctamente, A debe guardarse bajo la clave `matrizA`.

## 15. Cómo se crea Matriz B

B usa el mismo procedimiento que A, pero sus datos y su clave son independientes. Se guarda bajo el nombre `matrizB`.

Por ejemplo, tener A de tamaño `2 × 2` no impide crear B de tamaño `2 × 3`. Lo que cambia es cuáles operaciones pueden hacerse: sumar y restar requieren tamaños iguales, mientras que multiplicar tiene otra condición.

## 16. Cómo funciona la suma

La suma agrega los valores que ocupan la misma posición en A y B. Antes de recorrerlas debemos comprobar que tengan la misma cantidad de filas y columnas.

```text
A:        B:        A + B:
1  2      5  6      6   8
3  4      7  8      10  12
```

Los cálculos son:

- Posición `[0][0]`: `1 + 5 = 6`.
- Posición `[0][1]`: `2 + 6 = 8`.
- Posición `[1][0]`: `3 + 7 = 10`.
- Posición `[1][1]`: `4 + 8 = 12`.

El ciclo `i` recorre las filas. El ciclo `j` recorre las columnas. Cada cálculo produce un elemento de una nueva matriz de resultado.

## 17. Cómo funciona la resta

La resta también trabaja posición por posición y requiere el mismo tamaño en A y B. El orden importa: el botón debe calcular A menos B.

```text
A:        B:        A - B:
1  2      5  6      -4  -4
3  4      7  8      -4  -4
```

Por ejemplo, en la posición `[0][1]` se calcula `2 - 6`, que da `-4`. No se calcula `6 - 2`, porque eso sería B menos A.

También utiliza un ciclo para las filas y otro para las columnas.

## 18. Cómo funciona la multiplicación

La multiplicación de matrices combina cada fila de A con cada columna de B. No consiste en multiplicar solamente los valores de la misma posición.

La condición es:

```text
Cantidad de columnas de A = cantidad de filas de B.
```

Si A tiene tamaño `m × n` y B tiene tamaño `n × p`, el resultado tendrá tamaño `m × p`. La letra `n` representa la cantidad de productos que debemos sumar para cada posición del resultado.

Con el ejemplo de la tarea:

```text
A:        B:        A × B:
1  2      5  6      19  22
3  4      7  8      43  50
```

Los cálculos son:

- `[0][0]`: `1 × 5 + 2 × 7 = 5 + 14 = 19`.
- `[0][1]`: `1 × 6 + 2 × 8 = 6 + 16 = 22`.
- `[1][0]`: `3 × 5 + 4 × 7 = 15 + 28 = 43`.
- `[1][1]`: `3 × 6 + 4 × 8 = 18 + 32 = 50`.

Un ejemplo con tamaños diferentes también sirve: A puede ser `2 × 3` y B puede ser `3 × 2`. El resultado será `2 × 2`. La condición se cumple porque las tres columnas de A coinciden con las tres filas de B.

## 19. Por qué la multiplicación necesita tres ciclos

Cada ciclo cumple una tarea distinta:

| Variable | Qué recorre | Qué decide |
| --- | --- | --- |
| `i` | Filas de A | La fila del resultado. |
| `j` | Columnas de B | La columna del resultado. |
| `k` | Columnas de A y filas de B | Los productos que se acumulan para esa posición. |

Para calcular `[0][0]`, `i` vale `0` y `j` vale `0`. El índice `k` cambia:

1. `suma` empieza en `0`.
2. Cuando `k = 0`, se agrega `A[0][0] × B[0][0]`, es decir, `1 × 5`. `suma` queda en `5`.
3. Cuando `k = 1`, se agrega `A[0][1] × B[1][0]`, es decir, `2 × 7`. `suma` queda en `19`.
4. Termina el ciclo `k` y se guarda `19` en el resultado `[0][0]`.
5. El ciclo `j` avanza a la siguiente columna y `suma` debe comenzar nuevamente en `0`.

Si no reiniciamos `suma` para cada posición, mezclaríamos cálculos de posiciones diferentes y el resultado sería incorrecto.

## 20. Cómo funciona la modificación

Modificar un elemento requiere escoger A o B, indicar una fila, indicar una columna e introducir el nuevo valor.

Si A es:

```text
1  2
3  4
```

Y escogemos fila `0`, columna `1` y valor `10`, quedará:

```text
1  10
3  4
```

Las posiciones deben ser enteras y estar dentro de los límites. Para una matriz de `2 × 2`, las filas válidas son `0` y `1`, y las columnas válidas también son `0` y `1`. La posición `2` no existe.

Después de actualizar el elemento, se debe guardar nuevamente la matriz que fue modificada. Si modificamos A, guardamos la clave `matrizA`; si modificamos B, guardamos `matrizB`.

## 21. Cómo funciona el método eliminar corregido

La eliminación recorre la matriz original y conserva en una matriz nueva solamente las filas cuya identificación sea diferente de la que se quiere eliminar.

Con la identificación `1234`, el recorrido esperado es:

| Fila original | ¿Identificación distinta de `1234`? | Acción |
| --- | --- | --- |
| `[1234, "Juan", 32]` | No | No se copia. |
| `[5678, "Pepa", 28]` | Sí | Se copia a la nueva matriz. |
| `[1234, "Pedro", 40]` | No | No se copia. |

La matriz final contiene solamente:

```javascript
[
    [5678, "Pepa", 28]
]
```

El ciclo revisa todas las filas; no debe terminar después de la primera coincidencia. Por eso elimina también el segundo registro con identificación `1234`.

Al finalizar, se guarda la matriz nueva con la clave `docentes`. Si el guardado funciona, se reemplaza la matriz anterior por la nueva.

## 22. Por qué una nueva matriz evita espacios vacíos al eliminar

La matriz nueva empieza vacía. Cada registro que se conserva se coloca en su siguiente posición libre, que es `nuevaMatriz.length`.

Si no hemos conservado ningún registro, esa longitud vale `0`. El primer registro conservado se escribe en la posición `0`. Después la longitud vale `1`; el segundo registro conservado se escribiría en la posición `1`.

No usamos el índice original como destino. Por ejemplo, Pepa estaba en la fila `1` de la matriz original, pero al ser la primera fila conservada queda en la fila `0` de la nueva.

Tampoco usamos `delete` para quitar posiciones de un arreglo. El procedimiento construye una secuencia completa desde el índice `0`. Cada fila conservada se copia una vez, así que la eliminación no introduce duplicados. Si ya hubiera dos filas iguales que no corresponden a la identificación eliminada, ambas se conservarían; este método elimina por identificación, no corrige duplicados ajenos a esa eliminación.

## 23. Cómo comprobar `localStorage` con F12

En Chrome o Edge puedes revisar el almacenamiento así:

1. Abre el proyecto y crea o guarda los datos.
2. Pulsa `F12`. En algunos teclados debes usar `Fn + F12`.
3. Selecciona la pestaña **Application** o **Aplicación**. Si está escondida, busca en el menú de más pestañas.
4. Dentro de **Storage** o **Almacenamiento**, abre **Local Storage**.
5. Selecciona la entrada correspondiente a la página.
6. Busca las claves `docentes`, `matrizA` y `matrizB`.
7. Observa la columna del valor: contiene texto JSON.
8. Recarga la página y verifica que los datos todavía se muestran al listarlos o consultar las matrices.

También puedes consultar las claves desde la pestaña **Console** o **Consola**:

```javascript
localStorage.getItem("docentes")
localStorage.getItem("matrizA")
localStorage.getItem("matrizB")
```

Para ver una matriz como dato de JavaScript:

```javascript
JSON.parse(localStorage.getItem("matrizA"))
```

Si la clave no existe, `getItem()` devuelve `null`. Si los valores se guardaron correctamente, verás el contenido de los arreglos.

## Funciones del código explicadas paso a paso

Antes de leer las funciones, revisa estas ideas:

- Una **función** reúne instrucciones para una tarea. Un botón puede llamar a una función.
- Un **parámetro** es un dato que recibe la función entre sus paréntesis.
- `return valor;` devuelve un dato y termina la función.
- `return;` termina la función sin entregar un dato útil.
- `===` significa igualdad estricta; `!==` significa diferencia estricta.
- `&&` significa “y”, `||` significa “o” y `!` significa “no”.
- `true` y `false` son valores booleanos para indicar si una condición se cumple.
- `null` indica ausencia de un valor; no es lo mismo que una matriz vacía ni que el número cero.
- `let` permite declarar una variable que puede cambiar.
- Las variables `docentes`, `matrizA` y `matrizB` están fuera de las funciones para que las distintas acciones puedan utilizarlas.

Los bloques siguientes corresponden al código de `script.js`.

### Inicio del programa y relación con el HTML

El comienzo del archivo recupera las tres matrices:

```javascript
// Cada fila de docentes guarda: identificación, nombre y edad.
let docentes = obtenerMatriz("docentes");
let matrizA = obtenerMatriz("matrizA");
let matrizB = obtenerMatriz("matrizB");
```

Si es la primera vez que abrimos el proyecto y las claves no existen, cada variable recibe `[]`. Si ya se habían guardado, recibe sus datos recuperados. Aunque la definición de `obtenerMatriz()` se encuentre más abajo en el archivo, JavaScript permite llamar a una función declarada de esta forma.

En el HTML, `<script src="script.js" defer></script>` carga el JavaScript. `defer` permite que el HTML termine de prepararse antes de ejecutar el archivo, por lo que las zonas donde se muestran los datos ya existen.

Cada botón tiene un `onclick` que indica la función que debe ejecutarse. Por ejemplo:

```html
<button type="button" onclick="crearMatriz('matrizA')">Crear Matriz A</button>
```

La palabra `"matrizA"` identifica tanto la clave del almacenamiento como la matriz que debe cambiar la función. El botón de B usa `'matrizB'`. Las comillas simples o dobles pueden delimitar textos de JavaScript; aquí el HTML usa comillas dobles para el atributo y simples para el texto que contiene.

| Botón | Función llamada |
| --- | --- |
| Agregar docente | `agregarDocente()` |
| Listar docentes | `listarDocentes()` |
| Eliminar docente | `eliminarDocente()` |
| Crear Matriz A | `crearMatriz('matrizA')` |
| Crear Matriz B | `crearMatriz('matrizB')` |
| Mostrar matrices | `mostrarMatrices()` |
| Modificar Matriz A | `modificarMatriz('matrizA')` |
| Modificar Matriz B | `modificarMatriz('matrizB')` |
| Sumar A + B | `sumarMatrices()` |
| Restar A - B | `restarMatrices()` |
| Multiplicar A × B | `multiplicarMatrices()` |

`index.html` contiene el título, las secciones, los botones y las zonas de resultados. `style.css` mejora la legibilidad de botones y tablas. `script.js` contiene los datos, las validaciones y las operaciones.

### Función 1: `mostrarMensaje()`

```javascript
function mostrarMensaje(mensaje) {
    document.getElementById("mensaje").textContent = mensaje;
}
```

**Qué recibe:** un parámetro llamado `mensaje`, que contiene el texto que se quiere mostrar.

**Qué hace:** busca en el HTML el elemento cuyo `id` es `mensaje` y coloca allí el texto recibido.

**Qué devuelve:** no devuelve un dato para hacer cálculos. Su efecto es cambiar lo que se ve en pantalla.

**Variables:** solo utiliza el parámetro `mensaje`; no necesita un arreglo ni un ciclo.

**Paso a paso:** si otra función llama a `mostrarMensaje("Docente agregado.")`, `document.getElementById("mensaje")` encuentra el párrafo de avisos y `.textContent = mensaje` cambia su texto por “Docente agregado.”.

`document` representa la página. `getElementById()` busca un elemento por su identificador. `textContent` permite leer o cambiar el texto de ese elemento. Así no tenemos que repetir la misma instrucción de presentación en cada función.

### Función 2: `obtenerMatriz()`

```javascript
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
```

**Qué recibe:** `nombreMatriz`, una clave como `"docentes"`, `"matrizA"` o `"matrizB"`.

**Qué hace:** consulta el almacenamiento, transforma el texto JSON en un dato de JavaScript y comprueba que el dato recuperado sea un arreglo.

**Qué devuelve:** el arreglo recuperado si la lectura es correcta, o `[]` si no hay información o no se puede recuperar.

**Variables:** `nombreMatriz` identifica la clave; `datos` guarda el texto leído; `matriz` guarda el dato reconstruido. `error` es el dato que recibe el bloque `catch` si falla alguna instrucción dentro del `try`.

**Recorrido con A guardada como `[[1,2],[3,4]]`:**

1. Se llama a `obtenerMatriz("matrizA")`.
2. `let datos = localStorage.getItem(nombreMatriz);` busca la clave `matrizA`. La variable `datos` recibe el texto `"[[1,2],[3,4]]"`.
3. `if (datos === null)` pregunta si la clave no existe. En este ejemplo sí existe, por lo que no entra en ese bloque.
4. `let matriz = JSON.parse(datos);` convierte el texto en `[[1, 2], [3, 4]]`, un arreglo de arreglos que JavaScript puede recorrer.
5. `Array.isArray(matriz)` comprueba si el dato principal es un arreglo. Devuelve `true` en este ejemplo.
6. `return matriz;` entrega el dato al lugar desde donde se llamó la función y termina su ejecución.
7. En `let matrizA = obtenerMatriz("matrizA");`, lo devuelto queda asignado a la variable `matrizA`.

**Si la clave no existe:** `getItem()` devuelve `null`; la condición `datos === null` se cumple y `return [];` devuelve un arreglo vacío. En este proyecto una matriz vacía representa que todavía no se ha creado o recuperado una matriz.

**Si la lectura falla:** `try` contiene las instrucciones que pueden producir un error. `catch` muestra un mensaje y devuelve `[]`. Esto incluye texto que no se puede interpretar como JSON y un navegador que impide acceder al almacenamiento.

**Si el JSON existe pero no es un arreglo:** por ejemplo, si contiene el número `7`, `Array.isArray()` devuelve `false`. El programa llega al mensaje final y devuelve `[]`.

Esta comprobación revisa el arreglo principal. Las filas regulares y numéricas de A y B se producen al crearlas con los botones. La función no revisa una por una las filas de datos que alguien haya cambiado manualmente desde las herramientas del navegador.

### Función 3: `guardarMatriz()`

```javascript
function guardarMatriz(nombreMatriz, matriz) {
    try {
        localStorage.setItem(nombreMatriz, JSON.stringify(matriz));
        return true;
    } catch (error) {
        mostrarMensaje("No se pudo guardar. Revisa que el navegador permita localStorage.");
        return false;
    }
}
```

**Qué recibe:** `nombreMatriz`, la clave; y `matriz`, el arreglo que se quiere guardar.

**Qué hace:** convierte la matriz a texto JSON y lo guarda en `localStorage`.

**Qué devuelve:** `true` si el guardado termina bien y `false` si ocurre un error. Son valores booleanos: `true` significa verdadero y `false` significa falso.

**Variables:** los dos parámetros y `error` dentro de `catch`.

**Ejemplo:** `guardarMatriz("matrizA", [[1, 2], [3, 4]])` hace lo siguiente:

1. `JSON.stringify(matriz)` produce el texto `[[1,2],[3,4]]`.
2. `localStorage.setItem(nombreMatriz, ...)` guarda ese texto bajo la clave `matrizA`.
3. `return true;` informa a la función que llamó que se guardó correctamente.

Si el navegador no permite guardar, la instrucción produce un error; `catch` muestra “No se pudo guardar. Revisa que el navegador permita localStorage.” y devuelve `false`.

Las funciones que cambian datos consultan este resultado. Por ejemplo, `if (!guardarMatriz(...))` significa “si no se logró guardar”. El símbolo `!` invierte un valor booleano: `!true` es `false` y `!false` es `true`. Así se evita tratar como guardado un cambio que solamente ocurrió en una variable.

### Función 4: `pedirNumero()`

```javascript
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
```

**Qué recibe:** `mensaje`, el texto de la pregunta; y `entero`, que puede ser `true` o `false`. Con `true` exige un número entero; con `false` también permite decimales.

**Qué hace:** abre una ventana `prompt`, revisa la entrada y la convierte en número.

**Qué devuelve:** un número válido, o `null` si el usuario cancela o la entrada no sirve.

**Variables:** `entrada` contiene lo que escribió el usuario; `numero` contiene su conversión numérica.

**Ejemplo:** `pedirNumero("Cantidad de filas:", true)` con la entrada `"2"`:

1. `prompt(mensaje)` muestra la pregunta y devuelve el texto `"2"`.
2. `entrada === null` es falso porque el usuario aceptó la entrada.
3. `entrada.trim() === ""` es falso. `trim()` quita espacios de los extremos para comprobar si solamente se ingresaron espacios.
4. `Number(entrada)` convierte `"2"` en el número `2`. Esto importa porque sumar dos textos no hace lo mismo que sumar dos números.
5. `Number.isFinite(numero)` comprueba que sea un número finito. El operador `!` hace que el `if` se cumpla cuando no lo es.
6. `entero && !Number.isInteger(numero)` combina dos condiciones. `&&` significa “y”. Solo rechaza decimales si la llamada exige un entero.
7. `return numero;` entrega `2`.

**Otros recorridos:**

| Entrada y llamada | Resultado |
| --- | --- |
| Cancelar el cuadro | Devuelve `null` y muestra “Ingreso cancelado.”. |
| Texto vacío o solo espacios | Devuelve `null` y exige un número. |
| `"hola"` | La conversión no da un número válido; devuelve `null`. |
| `"2.5"` con `entero = true` | Devuelve `null` porque no es entero. |
| `"2.5"` con `entero = false` | Devuelve el número `2.5`. |
| `"0"` | Devuelve el número `0`; la función que lo recibe decidirá si lo permite. |
| `"-4"` con `entero = false` | Devuelve `-4`; es un valor permitido para una matriz. |

Para los decimales se puede usar punto, por ejemplo `2.5`. Una entrada como `2,5` no se convierte mediante `Number()` en un número válido.

Esta función no decide por sí sola si el número debe ser positivo. Crear una matriz y agregar un docente hacen esa comprobación después. Por otro lado, modificar una posición permite el índice `0`, que es válido.

`null` no es lo mismo que `0`: `null` indica que no se obtuvo una entrada válida; `0` es un número que puede ser útil como valor de matriz o como índice. Por eso las demás funciones comparan expresamente con `=== null`.

### Función 5: `agregarDocente()`

```javascript
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
```

**Qué recibe:** no recibe parámetros. Usa los datos introducidos por `prompt`.

**Qué hace:** valida identificación, nombre y edad, agrega una fila a `docentes`, guarda la matriz y actualiza la tabla.

**Qué devuelve:** no devuelve un dato. Los `return;` terminan la función cuando una entrada no sirve, se cancela o no se logra guardar.

**Variables:** `identificacion`, `nombre`, `edad` y la matriz general `docentes`.

**Ejemplo desde una matriz vacía, con 1234, Juan y 32:**

1. Pide identificación con `pedirNumero(..., true)`, de modo que exige un entero.
2. Si devuelve `null`, termina. Si es `0` o negativo, también termina con un aviso.
3. Pide el nombre con `prompt()`. Si se cancela, termina.
4. `nombre = nombre.trim();` quita espacios de los extremos. Un nombre como `" Juan "` pasa a ser `"Juan"`. Si queda vacío, lo rechaza.
5. Pide la edad como entero. También debe ser mayor que `0`.
6. `docentes[docentes.length] = [identificacion, nombre, edad];` coloca la fila al final. Como la longitud inicial es `0`, escribe en `docentes[0]`.
7. La matriz queda `[[1234, "Juan", 32]]`.
8. Guarda bajo la clave `docentes`.
9. Si el guardado se logra, llama a `listarDocentes()` y muestra “Docente agregado.”.

Si luego se agrega Pepa, `docentes.length` vale `1`; su fila se coloca en la posición `1`.

**Si falla guardar:** la fila ya se había añadido a la variable, así que `docentes.length = docentes.length - 1;` reduce la longitud y retira la última fila que se acababa de agregar. Con esto se recupera el contenido anterior en memoria.

Se permiten identificaciones repetidas para poder realizar la prueba que pide el profesor. Como la identificación se maneja como número, escribir `001234` tiene el mismo valor numérico que escribir `1234`.

### Función 6: `listarDocentes()`

```javascript
function listarDocentes() {
    mostrarTabla(docentes, "zonaDocentes", "Docentes", ["Identificación", "Nombre", "Edad"]);

    if (docentes.length === 0) {
        mostrarMensaje("No hay docentes registrados.");
        return;
    }

    mostrarMensaje("Docentes registrados: " + docentes.length + ".");
}
```

**Qué recibe:** no recibe parámetros.

**Qué hace:** dibuja los docentes en su zona de la página y muestra cuántos hay.

**Qué devuelve:** no devuelve un dato; si no hay registros, termina después del mensaje.

**Variables:** utiliza `docentes`, que ya existe fuera de la función.

**Recorrido con tres docentes:**

1. Llama a `mostrarTabla()` pasando la matriz, la zona `"zonaDocentes"`, el título `"Docentes"` y los nombres de las tres columnas.
2. La función de presentación crea una fila HTML para cada docente.
3. `docentes.length === 0` es falso.
4. Muestra “Docentes registrados: 3.”.

Con una matriz vacía, `mostrarTabla()` presenta “No hay datos guardados.” en la zona y luego `listarDocentes()` muestra “No hay docentes registrados.” en el párrafo de mensajes. Listar no altera la matriz ni guarda un nuevo valor.

### Función 7: `eliminarDocente()`

```javascript
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
```

**Qué recibe:** no recibe parámetros. Pide la identificación que se desea eliminar.

**Qué hace:** recorre todas las filas y copia las que se deben conservar a una matriz nueva. Luego guarda esa matriz y la usa como la nueva lista de docentes.

**Qué devuelve:** no devuelve un dato. Puede terminar antes si no hay docentes, se cancela, la identificación no es válida, no hay coincidencias o falla el guardado.

**Variables:**

| Variable | Para qué sirve |
| --- | --- |
| `docentes` | Matriz original de docentes. |
| `identificacionEliminar` | Número que debe buscarse en la columna `0`. |
| `nuevaMatriz` | Matriz de los registros que sí se conservarán. |
| `eliminados` | Cuenta cuántas filas coinciden con la identificación. |
| `i` | Recorre los índices de la matriz original. |

**Recorrido completo con la prueba del profesor:**

La matriz original tiene Juan en `0`, Pepa en `1` y Pedro en `2`. Juan y Pedro tienen identificación `1234`.

1. Comprueba que haya docentes.
2. Pide `1234` y valida que sea un entero positivo.
3. Crea `nuevaMatriz = []` y `eliminados = 0`.
4. Cuando `i = 0`, `docentes[0][0]` vale `1234`. La condición `!== identificacionEliminar` es falsa, por eso no copia a Juan y aumenta `eliminados` a `1`.
5. Cuando `i = 1`, `docentes[1][0]` vale `5678`. La condición es verdadera; copia la fila de Pepa en `nuevaMatriz[0]`, porque la longitud de la matriz nueva todavía era `0`.
6. Cuando `i = 2`, la identificación es otra vez `1234`. No copia a Pedro y aumenta `eliminados` a `2`.
7. Cuando `i = 3`, `i < docentes.length` es falso. Termina el ciclo.
8. `eliminados === 0` es falso: sí se encontraron registros.
9. Guarda `[[5678, "Pepa", 28]]` bajo la clave `docentes`.
10. Solo después de un guardado correcto hace `docentes = nuevaMatriz;`.
11. Vuelve a listar y muestra “Registros eliminados: 2.”.

`!==` significa “es diferente de”, comparando también el tipo del dato. Tanto la identificación almacenada por el programa como la identificación buscada son números.

**Por qué funciona:** no cambia la matriz original mientras la está recorriendo. Cada vuelta revisa una fila original y decide si la copia. La posición de destino depende de la longitud nueva, por eso queda seguida desde `0`. No utiliza `filter()` ni deja huecos con `delete`.

Si no hay coincidencias, `eliminados` sigue en `0` y aparece “No se encontró la identificación.”. Si todos los docentes coinciden, la matriz nueva queda vacía y se guarda `[]`, que también es un resultado correcto. Si falla el guardado, la variable `docentes` todavía conserva la matriz anterior.

### Función 8: `crearMatriz()`

```javascript
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
```

**Qué recibe:** `nombreMatriz`, que los botones envían como `"matrizA"` o `"matrizB"`.

**Qué hace:** pide dimensiones y valores, arma una matriz con dos ciclos, la guarda y actualiza A o B.

**Qué devuelve:** no devuelve un dato. Termina sin reemplazar la matriz anterior si una entrada no sirve o se cancela.

**Variables:**

| Variable | Para qué sirve |
| --- | --- |
| `nombreMatriz` | Decide qué clave y qué matriz general se actualizarán. |
| `filas` | Cantidad de filas, entero positivo. |
| `columnas` | Cantidad de columnas, entero positivo. |
| `matriz` | Matriz nueva que se está construyendo. |
| `i` | Fila actual. |
| `j` | Columna actual. |
| `valor` | Número que se guardará en la posición actual. |

**Recorrido para crear A de 2 × 2:**

1. El botón ejecuta `crearMatriz("matrizA")`.
2. Pide `filas = 2` y `columnas = 2`. `pedirNumero(..., true)` exige enteros; las condiciones `<= 0` exigen que sean positivos.
3. Inicia `matriz = []`.
4. El ciclo externo empieza con `i = 0`. `matriz[i] = [];` crea un arreglo vacío para la primera fila.
5. El ciclo interno empieza con `j = 0`. Pide el valor de `matrizA[0][0]`; ingresamos `1`.
6. Escribe `matriz[0][0] = 1`.
7. `j` avanza a `1`; pide `matrizA[0][1]`; ingresamos `2`. La primera fila queda `[1, 2]`.
8. El ciclo interno termina cuando `j = 2`.
9. `i` avanza a `1` y crea la segunda fila con `matriz[1] = []`.
10. Repite las columnas con los valores `3` y `4`.
11. La matriz local queda `[[1, 2], [3, 4]]`.
12. La guarda bajo `matrizA`. Si guardar falla, termina sin asignarla a A.
13. Como `nombreMatriz === "matrizA"`, asigna `matrizA = matriz;`.
14. Muestra las matrices, limpia el resultado anterior y confirma el guardado.

**Para B:** el botón llama a `crearMatriz("matrizB")`. El recorrido es el mismo, pero guarda la clave `matrizB` y entra en el `else` que actualiza `matrizB`.

`pedirNumero(..., false)` permite que los valores sean enteros, decimales, cero o negativos. Las dimensiones y los valores son reglas distintas.

**Si el usuario cancela a mitad del llenado:** la función termina antes de guardar. La matriz parcial era una variable local, por eso la A o B anterior sigue disponible. Volver a crear una matriz reemplaza todos sus valores únicamente al completar las entradas y guardarlas correctamente.

**Por qué se limpia el resultado:** si ya habíamos calculado A + B, ese resultado dependía de los valores anteriores. Al cambiar A o B, conviene volver a elegir la operación para obtener el resultado nuevo.

### Función 9: `mostrarMatrices()`

```javascript
function mostrarMatrices() {
    mostrarTabla(matrizA, "zonaMatrizA", "Matriz A", null);
    mostrarTabla(matrizB, "zonaMatrizB", "Matriz B", null);

    if (matrizA.length === 0 || matrizB.length === 0) {
        mostrarMensaje("Primero debe crear las matrices A y B.");
        return;
    }

    mostrarMensaje("Matrices A y B mostradas.");
}
```

**Qué recibe:** no recibe parámetros.

**Qué hace:** muestra A y B en sus dos zonas y avisa si falta alguna.

**Qué devuelve:** no devuelve un dato. Un `return;` termina la función cuando alguna está vacía.

**Variables:** utiliza las matrices generales `matrizA` y `matrizB`.

**Paso a paso:** llama a `mostrarTabla()` una vez para A y otra para B. Pasa `null` como encabezados, porque estas tablas numéricas no usan títulos como “Identificación” o “Edad”.

Después, `matrizA.length === 0 || matrizB.length === 0` comprueba si falta A o falta B. `||` significa “o”: basta con que una de las condiciones sea verdadera.

Si solamente se creó A, su tabla sí se muestra y la zona de B informa que no hay datos; el aviso indica “Primero debe crear las matrices A y B.”. Si ambas existen, muestra “Matrices A y B mostradas.”. Mostrar no modifica datos ni los guarda nuevamente.

### Función 10: `modificarMatriz()`

```javascript
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
```

**Qué recibe:** `nombreMatriz`, enviado por el botón como `"matrizA"` o `"matrizB"`.

**Qué hace:** selecciona la matriz, comprueba sus límites, cambia una posición y guarda el cambio.

**Qué devuelve:** no devuelve un dato. Puede terminar por falta de matriz, entrada inválida, cancelación o fallo de guardado.

**Variables:** `matriz` es la matriz seleccionada; `fila` y `columna` son sus índices; `nuevoValor` es el número recibido; `valorAnterior` conserva el dato previo para recuperarlo si falla el guardado.

**Recorrido al cambiar A[0][1] de 2 a 10:**

1. El botón llama a `modificarMatriz("matrizA")`.
2. `matriz = matrizA;` permite trabajar con A desde el nombre local `matriz`. Esto no crea una copia de todos sus datos: ambos nombres se refieren al mismo arreglo.
3. Comprueba que `matriz.length` no sea `0`.
4. Pide la fila entera: ingresamos `0`.
5. `fila < 0 || fila >= matriz.length` es falso, porque `0` está dentro de las dos filas.
6. Pide la columna entera: ingresamos `1`.
7. `columna < 0 || columna >= matriz[fila].length` también es falso.
8. Pide el nuevo valor: ingresamos `10`.
9. Guarda el valor previo en `valorAnterior`, que queda en `2`.
10. Escribe `matriz[0][1] = 10`. Como `matriz` se refiere a A, A queda `[[1, 10], [3, 4]]`.
11. Guarda con la clave `matrizA`.
12. Si se guardó, muestra A y B, limpia el resultado anterior y confirma el cambio.

**Si falla guardar:** `matriz[fila][columna] = valorAnterior;` restaura el `2`. De ese modo, el valor que quedó solamente en memoria no se conserva como un cambio exitoso.

Si se introduce fila `2` para una matriz de dos filas, `fila >= matriz.length` es verdadero y la función termina. El rango correcto va desde `0` hasta `length - 1`. Si se cancela antes de escribir el valor, la matriz tampoco cambia.

### Función 11: `validarMatrices()`

```javascript
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
```

**Qué recibe:** `mismoTamano`, un booleano que indica la regla de dimensiones. Se usa `true` para suma/resta y `false` para multiplicación.

**Qué hace:** comprueba primero que existan las dos matrices. Después aplica la condición de tamaño que corresponde.

**Qué devuelve:** `true` si se puede operar y `false` si falta una matriz o las dimensiones no sirven. También muestra el motivo cuando devuelve `false`.

**Variables:** el parámetro `mismoTamano` y las matrices generales A y B.

**Ejemplo para suma:** con A y B de `2 × 2`, se llama a `validarMatrices(true)`.

1. Ninguna está vacía, así que la primera condición no se cumple.
2. `mismoTamano` es verdadero, así que entra en el primer bloque.
3. Compara `matrizA.length` con `matrizB.length`: ambas tienen dos filas.
4. Compara `matrizA[0].length` con `matrizB[0].length`: ambas tienen dos columnas.
5. Como no hay diferencia, llega a `return true;`.

Si A fuera `2 × 2` y B fuera `2 × 3`, el segundo tamaño sería diferente y devolvería `false` con “Las matrices deben tener el mismo tamaño.”. La resta usa exactamente la misma validación.

**Ejemplo para multiplicación:** con A de `2 × 3` y B de `3 × 2`, se llama a `validarMatrices(false)`.

1. Ambas existen.
2. Como `mismoTamano` es falso, entra en el `else`.
3. `matrizA[0].length` vale `3`, que es la cantidad de columnas de A.
4. `matrizB.length` vale `3`, que es la cantidad de filas de B.
5. Los tamaños coinciden; devuelve `true`.

Si las columnas de A fueran `2` y las filas de B fueran `3`, mostraría “Las columnas de A deben ser iguales a las filas de B.” y devolvería `false`.

Las matrices creadas por el programa tienen el mismo número de columnas en cada fila; por eso aquí basta consultar la primera fila para conocer la cantidad de columnas.

### Función 12: `sumarMatrices()`

```javascript
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
```

**Qué recibe:** no recibe parámetros; toma las matrices generales A y B.

**Qué hace:** verifica tamaños, construye una nueva matriz sumando posición por posición y muestra el resultado.

**Qué devuelve:** no devuelve la matriz con `return`; la presenta mediante `mostrarTabla()`.

**Variables:** `resultado` guarda la matriz calculada; `i` recorre las filas; `j` recorre las columnas.

**Recorrido:**

1. `limpiarResultado()` quita la operación que se hubiera mostrado antes.
2. `validarMatrices(true)` exige que existan A y B y que tengan igual tamaño.
3. Si la validación devuelve `false`, `!false` es `true`, así que el `if` entra y `return;` detiene la suma.
4. Si es válida, empieza con `resultado = []`.
5. Con `i = 0`, crea `resultado[0] = []`.
6. Con `j = 0`, calcula `1 + 5` y escribe `resultado[0][0] = 6`.
7. Con `j = 1`, calcula `2 + 6` y escribe `resultado[0][1] = 8`.
8. Con `i = 1`, crea la segunda fila.
9. Sus columnas reciben `3 + 7 = 10` y `4 + 8 = 12`.
10. Muestra `[[6, 8], [10, 12]]` en `zonaResultado`.

A y B conservan sus valores. `resultado` es una matriz nueva para la operación. No se guarda con una clave adicional porque el requisito es conservar A y B, con las que podemos volver a calcularla.

### Función 13: `restarMatrices()`

```javascript
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
```

**Qué recibe:** no recibe parámetros; utiliza A y B.

**Qué hace:** comprueba que tengan igual tamaño y calcula A menos B en cada posición.

**Qué devuelve:** no devuelve un dato; muestra la matriz de resultado.

**Variables:** `resultado`, `i` y `j`, con el mismo papel que en la suma.

**Recorrido con la prueba de 2 × 2:**

1. Limpia la operación anterior y llama a `validarMatrices(true)`.
2. Si la validación falla, termina.
3. Crea la matriz `resultado`.
4. Para `i = 0`, crea la primera fila.
5. En `j = 0`, calcula `matrizA[0][0] - matrizB[0][0]`, es decir, `1 - 5 = -4`.
6. En `j = 1`, calcula `2 - 6 = -4`.
7. Para `i = 1`, los cálculos son `3 - 7 = -4` y `4 - 8 = -4`.
8. Muestra `[[-4, -4], [-4, -4]]`.

La operación usa el símbolo `-`. El orden de sus operandos es A y luego B. Cada vuelta calcula solo una posición y la guarda en la misma posición del resultado.

### Función 14: `multiplicarMatrices()`

```javascript
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
```

**Qué recibe:** no recibe parámetros; usa las matrices generales A y B.

**Qué hace:** valida la condición de multiplicación y calcula cada posición mediante tres ciclos.

**Qué devuelve:** no devuelve un dato al botón; dibuja la matriz calculada.

**Variables:**

| Variable | Significado con el ejemplo 2 × 2 |
| --- | --- |
| `filasA` | Filas de A y del resultado: `2`. |
| `columnasA` | Productos que se suman por posición: `2`. |
| `columnasB` | Columnas de B y del resultado: `2`. |
| `resultado` | Matriz nueva que va a contener los cálculos. |
| `i` | Fila seleccionada de A y del resultado. |
| `j` | Columna seleccionada de B y del resultado. |
| `k` | Columna de A y fila de B que se combinan. |
| `suma` | Acumula los productos para una posición. |

**Recorrido completo:**

1. Limpia la operación anterior.
2. `validarMatrices(false)` comprueba que columnas de A y filas de B coincidan.
3. Lee las dimensiones y crea `resultado = []`.
4. Con `i = 0`, crea la primera fila.
5. Con `j = 0`, inicia `suma = 0`.
6. Con `k = 0`, agrega `1 × 5`; `suma` queda en `5`.
7. Con `k = 1`, agrega `2 × 7`; `suma` queda en `19`.
8. Termina `k` y escribe `resultado[0][0] = 19`.
9. Con `j = 1`, reinicia `suma = 0`.
10. Los dos valores de `k` agregan `1 × 6` y `2 × 8`; guarda `22` en `resultado[0][1]`.
11. Con `i = 1`, crea la segunda fila.
12. Con `j = 0`, acumula `3 × 5 + 4 × 7`, que da `43`.
13. Con `j = 1`, acumula `3 × 6 + 4 × 8`, que da `50`.
14. Muestra `[[19, 22], [43, 50]]`.

La expresión `suma = suma + ...` toma el acumulado anterior y le añade un producto. Cada nueva posición necesita su propio acumulado, por eso `let suma = 0;` está dentro del ciclo `j`.

El ciclo `k` está dentro de los otros dos porque debe completar todos los productos de una posición antes de guardar su resultado y pasar a la siguiente.

### Función 15: `mostrarTabla()`

```javascript
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
```

**Qué recibe:** cuatro parámetros:

| Parámetro | Para qué sirve | Ejemplo |
| --- | --- | --- |
| `matriz` | Datos que se mostrarán. | `matrizA` o `docentes`. |
| `zona` | `id` del contenedor en el HTML. | `"zonaMatrizA"`. |
| `titulo` | Nombre que acompaña a la tabla. | `"Matriz A"`. |
| `encabezados` | Arreglo con títulos de columnas o `null`. | `["Identificación", "Nombre", "Edad"]`. |

**Qué hace:** construye elementos HTML y coloca los datos de cada posición en una celda.

**Qué devuelve:** no devuelve una matriz ni un cálculo. Su efecto es crear la presentación en la página.

**Variables:** `contenedor` representa la zona elegida; `subtitulo` y `aviso` se usan cuando no hay datos; `tabla` es la tabla HTML; `descripcion` es su título; `filaEncabezado` y las celdas `th` forman sus encabezados; `fila` y las celdas `td` representan sus valores; `i` y `j` recorren los datos.

**Recorrido para A:**

1. `document.getElementById(zona)` encuentra el contenedor `zonaMatrizA`.
2. `contenedor.textContent = "";` quita su contenido anterior para no acumular varias tablas.
3. Si la matriz está vacía, crea un título `h3` y un párrafo `p` con “No hay datos guardados.”. Los añade con `appendChild()` y termina.
4. Si hay datos, `document.createElement("table")` crea una tabla.
5. Crea un `caption`, que es una descripción de la tabla, con el título y sus dimensiones. Por ejemplo: “Matriz A (2 filas, 2 columnas)”.
6. Para A se recibió `encabezados = null`, así que no crea títulos de columna.
7. El ciclo `i` crea una fila HTML `tr` por cada fila de la matriz.
8. El ciclo `j` crea una celda HTML `td` por cada valor.
9. `celda.textContent = matriz[i][j];` escribe el valor de la matriz dentro de la celda.
10. `fila.appendChild(celda);` añade la celda a la fila.
11. `tabla.appendChild(fila);` añade cada fila terminada a la tabla.
12. `contenedor.appendChild(tabla);` coloca la tabla completa en la página.

**Para docentes:** `encabezados` sí es un arreglo. El primer ciclo sobre esos encabezados crea tres celdas `th`: Identificación, Nombre y Edad. `scope = "col"` indica que cada una es encabezado de una columna. Después los ciclos de datos muestran las filas de docentes.

Esta función no calcula ni guarda datos. Recibe una matriz ya preparada y la presenta. Los ciclos se parecen a los de suma, pero aquí cada vuelta crea una celda HTML en lugar de hacer una operación matemática.

### Función 16: `limpiarResultado()`

```javascript
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
```

**Qué recibe:** no recibe parámetros.

**Qué hace:** borra el resultado anterior y muestra una indicación para elegir una operación.

**Qué devuelve:** no devuelve un dato.

**Variables:** `zona` representa el contenedor `zonaResultado`; `titulo` es el elemento `h3`; `aviso` es el párrafo `p`.

**Ejemplo:** si antes se mostró la suma, `zona.textContent = "";` retira esa tabla. Luego crea el texto “Resultado de la operación” y el aviso “Selecciona una operación para ver el resultado.”.

Las funciones de operaciones llaman a esta función antes de validar. Si la operación no puede hacerse, el resultado anterior ya no aparece como si correspondiera a la operación que se acaba de pedir. Crear o modificar A o B también la llama porque los datos usados para calcular cambiaron.

### Presentación automática al abrir la página

Al final del archivo se dibujan las matrices recuperadas:

```javascript
// Las tablas se dibujan con las matrices recuperadas al cargar la página.
mostrarTabla(docentes, "zonaDocentes", "Docentes", ["Identificación", "Nombre", "Edad"]);
mostrarTabla(matrizA, "zonaMatrizA", "Matriz A", null);
mostrarTabla(matrizB, "zonaMatrizB", "Matriz B", null);
```

Estas instrucciones muestran los datos sin que haya que pulsar primero los botones. Si todavía no hay matrices, cada zona muestra su aviso de ausencia de datos.

### Cancelaciones y cambios completos

Los cuadros `prompt` ofrecen Aceptar y Cancelar. Cancelar devuelve `null`. Todas las acciones que piden datos comprueban ese caso antes de continuar.

El programa termina la acción actual cuando una entrada no es válida; el usuario puede pulsar nuevamente el botón para volver a intentarlo. No usa un ciclo para repetir la misma pregunta indefinidamente.

Los cambios se conservan solo si se logra guardar:

| Acción | Cómo mantiene los datos anteriores si falla el guardado |
| --- | --- |
| Agregar docente | Retira la última fila que acababa de añadir. |
| Eliminar docente | Guarda la matriz nueva antes de reemplazar `docentes`. |
| Crear A o B | Guarda la matriz local completa antes de asignarla a A o B. |
| Modificar A o B | Repone el `valorAnterior` en la posición cambiada. |

`try` y `catch` permiten informar un problema de lectura o escritura de almacenamiento mediante un mensaje sencillo. Lo principal que debes comprender es el orden: preparar datos, intentar guardarlos y confirmar el cambio cuando se guardaron correctamente.

## Pruebas que debes poder repetir

Estos son los pasos y los resultados esperados. Una prueba esperada no significa por sí sola que ya fue ejecutada.

### Prueba 1: operaciones

1. Crea A con dos filas, dos columnas y los valores `1`, `2`, `3`, `4`, en ese orden.
2. Crea B con dos filas, dos columnas y los valores `5`, `6`, `7`, `8`, en ese orden.
3. Muestra las matrices y verifica las posiciones.
4. Pulsa sumar, restar y multiplicar.

| Operación | Primera fila del resultado | Segunda fila del resultado |
| --- | --- | --- |
| A + B | `6, 8` | `10, 12` |
| A - B | `-4, -4` | `-4, -4` |
| A × B | `19, 22` | `43, 50` |

### Prueba 2: eliminar identificaciones repetidas

1. Agrega `1234`, `Juan`, `32`.
2. Agrega `5678`, `Pepa`, `28`.
3. Agrega `1234`, `Pedro`, `40`.
4. Lista los docentes: deben aparecer tres filas.
5. Elimina la identificación `1234`.
6. Lista otra vez: debe aparecer solamente `5678`, `Pepa`, `28`.
7. Revisa la clave `docentes`: debe contener `[[5678,"Pepa",28]]`.

### Prueba 3: persistencia

1. Conserva las matrices y el docente de las pruebas anteriores.
2. Recarga la página.
3. Lista docentes y muestra matrices: los datos deben conservarse.
4. Cierra la pestaña y vuelve a abrir el mismo `index.html` desde la misma ruta y navegador.
5. Repite la consulta y revisa las tres claves en `localStorage`.

### Prueba 4: modificación

1. Con A igual a `[[1, 2], [3, 4]]`, modifica fila `0`, columna `1`, valor `10`.
2. A debe quedar `[[1, 10], [3, 4]]`.
3. Recarga y muestra A otra vez: el `10` debe conservarse.
4. Si quieres repetir exactamente la prueba 1, vuelve a poner `2` en esa posición antes de operar.

### Prueba 5: validaciones

| Caso | Qué debe comprobar el programa |
| --- | --- |
| Filas `0`, negativas, decimales o texto | La cantidad debe ser un entero positivo. |
| Columnas inválidas | La cantidad debe ser un entero positivo. |
| Valor de matriz no numérico | Debe solicitar o exigir un número. |
| Nombre vacío o solo espacios | Debe exigir un nombre. |
| Identificación o edad no numérica | Debe exigir un número. |
| Operar sin A o sin B | Debe indicar que primero se creen las matrices. |
| Sumar/restar `2 × 2` con `2 × 3` | Debe rechazar la operación por diferente tamaño. |
| Multiplicar A `2 × 2` por B `3 × 2` | Debe rechazarla porque columnas de A y filas de B no coinciden. |
| Modificar una posición negativa o fuera del tamaño | Debe indicar que la posición no es válida. |
| Listar/eliminar sin docentes | Debe indicar que no hay docentes. |
| Eliminar una identificación que no existe | Debe informar que no se encontró. |

## Qué estudiar para explicarlo al profesor

Estudia estos puntos en este orden:

1. **Arreglos:** cómo crear `[]`, consultar una posición y agregar un elemento al final con `arreglo[arreglo.length]`.
2. **Matrices:** cómo representar una fila con otro arreglo y leer `matriz[i][j]`.
3. **Índices:** por qué empiezan en `0` y cómo relacionar longitud con último índice.
4. **Ciclos `for`:** inicio, condición, incremento y por qué el límite usa `<`.
5. **Ciclos anidados:** el ciclo exterior selecciona la fila y el interior recorre sus columnas.
6. **Condicionales:** cómo `if` decide si un dato es válido y qué filas se conservan al eliminar.
7. **Entrada y conversión:** los datos que escribe el usuario y cómo convertir una entrada de texto en número.
8. **Persistencia:** diferencias entre una variable en memoria y un dato de `localStorage`.
9. **JSON:** matriz → `JSON.stringify()` → texto, y texto → `JSON.parse()` → matriz.
10. **Claves:** `docentes`, `matrizA` y `matrizB`; cómo las usan `setItem()` y `getItem()`.
11. **Docentes:** orden fijo de las tres columnas y eliminación de todas las coincidencias con una matriz nueva.
12. **Suma y resta:** igualdad de dimensiones y cálculo posición por posición.
13. **Multiplicación:** columnas de A igual a filas de B; papel de `i`, `j`, `k` y de la variable acumuladora.
14. **Modificación:** validar fila y columna, asignar un valor y guardar el cambio.
15. **Presentación:** la matriz guarda los datos y la tabla HTML los muestra.

Practica sin memorizar frases: dibuja una matriz `2 × 2`, escribe sus índices y sigue a mano cada vuelta de los ciclos. Explica qué valor tiene cada variable antes y después de una vuelta. Si puedes hacer ese recorrido, podrás explicar el programa y corregir errores sencillos.

## Estado de la verificación

Se comprobaron las funciones y los once botones en un navegador. Para introducir datos de forma repetible, se utilizó una copia temporal de prueba con respuestas controladas en lugar de los cuadros `prompt`. La copia se retiró después. Por tanto, las pruebas de entrada validaron las funciones con respuestas simuladas; no se interactuó con cuadros `prompt` nativos durante esa parte de la verificación.

También se abrió el `index.html` final en el navegador, se comprobaron las tablas recuperadas y se pulsó su botón de multiplicación. La recarga y el cierre y reapertura en el mismo origen conservaron docentes, A y B. No se detectaron errores de JavaScript durante esas pruebas.

| Comprobación realizada | Resultado observado |
| --- | --- |
| Suma con A `[[1,2],[3,4]]` y B `[[5,6],[7,8]]` | `[[6,8],[10,12]]`. |
| Resta con esas matrices | `[[-4,-4],[-4,-4]]`. |
| Multiplicación con esas matrices | `[[19,22],[43,50]]`. |
| Eliminar `1234` de los tres docentes del ejemplo | Quedó solamente `[[5678,"Pepa",28]]`. |
| Recargar con matrices y docentes guardados | Los tres datos se recuperaron. |
| Modificar A `[0][1]` a `10` y B `[1][1]` a `-0.5` | Los cambios se conservaron al recargar; después se restauraron los valores del ejemplo. |
| Multiplicación rectangular, A de `2 × 3` y B de `3 × 2` | Resultado `[[58,64],[139,154]]`, de tamaño `2 × 2`. |
| Dimensiones incompatibles para suma, resta o multiplicación | Las operaciones se rechazaron con los mensajes correspondientes. |
| Veintiún casos de validación y cancelación | Se rechazaron los casos inválidos y se conservaron los datos anteriores. |
| Eliminar el último docente | Se guardó una matriz vacía; listar y eliminar indicaron que no había docentes. |
| Cerrar y volver a abrir el proyecto final en el mismo origen | Se recuperaron Pepa, A y B; multiplicar volvió a dar el resultado esperado. |

Los casos de validación incluyeron dimensiones cero, negativas, decimales y vacías; valores de matriz con texto o `Infinity`; nombre vacío; identificación y edad inválidas; índices negativos, fuera de rango o decimales; y cancelaciones. Las pruebas de cancelación usaron la respuesta `null`, que es lo que devuelve `prompt` cuando se cancela.

La comprobación de persistencia se realizó en el origen usado durante las pruebas del navegador. Al ejecutar por doble clic desde un archivo local, sigue las indicaciones de navegador y ruta explicadas al principio.
