### Error #1: Cannot use import statement outside a module

**Ubicación:** Línea 1

**Tipo de error:** Sintaxis

**Qué estaba mal:** Lo que se encontraba mal era el método por el cuál se estaba realizando el uso de módulos. Se tenía definida la sintaxis de CommonJS, mientras que el archivo servidor-malo.js estaba usando import.

**Cómo lo corregí:** En package.json, se cambió la línea 16:
```
"type": "commonjs"
```
Se modificó a:
```
"type": "module"
```

**Por qué funciona ahora:** Ahora no se da este error debido a que ya no se está utilizando dos métodos diferentes para el uso de módulos.

<hr>

### Error #2: missing &#41; after argument list

**Ubicación:** Línea 30

**Tipo de error:** Sintaxis

**Qué estaba mal:** El bloque de código que empieza en la línea 7 abre un paréntesis, pero no lo cierra.

**Cómo lo corregí:** En las líneas 7-30, se hizo el siguiente cambio:
```
const server = http.createServer(async (req, res) => {
    ...
}
```
Se cambió a:
```
const server = http.createServer(async (req, res) => {
    ...
})
```

**Por qué funciona ahora:** El código funciona ahora debido a que se corrigió la falta del cierre de paréntesis.

<hr>

### Error #3: missing &#41; after argument list

**Ubicación:** Línea 34

**Tipo de error:** Sintaxis

**Qué estaba mal:** El bloque de código que empieza en la línea 32 abre un paréntesis, pero no lo cierra.

**Cómo lo corregí:** En las líneas 32-34, se hizo el siguiente cambio:
```
server.listen(PORT, () => {
  console.log("Servidor corriendo en http://localhost:3000")
}
```
Se cambió a:
```
server.listen(PORT, () => {
  console.log("Servidor corriendo en http://localhost:3000")
})
```

**Por qué funciona ahora:** Al igual que en el error anterior, el código funciona ahora debido a que se corrigió la falta del cierre de paréntesis.