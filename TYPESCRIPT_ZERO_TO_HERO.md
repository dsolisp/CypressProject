# TypeScript: Zero to Hero 🚀

Guía completa de TypeScript enfocada en entrevistas técnicas. Cubre los conceptos fundamentales que DEBES dominar.

---

## 📚 Tabla de Contenidos

1. [¿Qué es TypeScript?](#qué-es-typescript)
2. [Tipos Básicos](#tipos-básicos)
3. [Interfaces y Type Aliases](#interfaces-y-type-aliases)
4. [Funciones](#funciones)
5. [Generics](#generics)
6. [Clases y OOP](#clases-y-oop)
7. [Utility Types](#utility-types)
8. [Preguntas Frecuentes en Entrevistas](#preguntas-frecuentes-en-entrevistas)

---

## ¿Qué es TypeScript?

TypeScript es un **superset** de JavaScript que añade **tipado estático opcional**.

**¿Por qué usarlo?**

- ✅ Detecta errores en tiempo de compilación
- ✅ Mejor autocompletado y IntelliSense
- ✅ Código más mantenible y documentado
- ✅ Refactoring más seguro

```typescript
// JavaScript
function suma(a, b) {
  return a + b;
}
suma(5, '10'); // "510" 😱

// TypeScript
function suma(a: number, b: number): number {
  return a + b;
}
suma(5, '10'); // ❌ Error: Argument of type 'string' is not assignable to parameter of type 'number'
```

---

## Tipos Básicos

### Primitivos

```typescript
// String
let nombre: string = 'Daniel';

// Number
let edad: number = 25;
let precio: number = 99.99;

// Boolean
let activo: boolean = true;

// Any (evitar en producción)
let cualquierCosa: any = 'texto';
cualquierCosa = 42; // ✅ OK

// Unknown (más seguro que any)
let desconocido: unknown = 'texto';
// desconocido.toUpperCase(); // ❌ Error
if (typeof desconocido === 'string') {
  desconocido.toUpperCase(); // ✅ OK
}

// Void (funciones sin retorno)
function log(mensaje: string): void {
  console.log(mensaje);
}

// Null y Undefined
let n: null = null;
let u: undefined = undefined;

// Never (funciones que nunca retornan)
function error(mensaje: string): never {
  throw new Error(mensaje);
}
```

### Arrays

```typescript
// Array de números
let numeros: number[] = [1, 2, 3];
let numeros2: Array<number> = [1, 2, 3]; // sintaxis genérica

// Array de strings
let nombres: string[] = ['Ana', 'Luis'];

// Array mixto (union type)
let mixto: (string | number)[] = [1, 'dos', 3];
```

### Tuplas

```typescript
// Tupla: array con tipos fijos en posiciones específicas
let persona: [string, number] = ['Daniel', 25];

// Desestructuración
let [nombre, edad] = persona;

// Tupla con elementos opcionales
let coordenada: [number, number, number?] = [10, 20];
```

### Enums

```typescript
// Enum numérico
enum Direccion {
  Arriba, // 0
  Abajo, // 1
  Izquierda, // 2
  Derecha, // 3
}

let dir: Direccion = Direccion.Arriba;

// Enum de strings
enum Estado {
  Activo = 'ACTIVE',
  Inactivo = 'INACTIVE',
  Pendiente = 'PENDING',
}

let estadoUsuario: Estado = Estado.Activo;
```

### Literal Types

```typescript
// Solo acepta valores específicos
let semaforo: 'rojo' | 'amarillo' | 'verde';
semaforo = 'rojo'; // ✅
// semaforo = "azul"; // ❌ Error

// Números literales
let dado: 1 | 2 | 3 | 4 | 5 | 6;

// Combinado con tipos
type Respuesta = 'si' | 'no' | number;
```

---

## Interfaces y Type Aliases

### Interfaces

```typescript
// Interface básica
interface Usuario {
  id: number;
  nombre: string;
  email: string;
  edad?: number; // propiedad opcional
  readonly dni: string; // solo lectura
}

const usuario: Usuario = {
  id: 1,
  nombre: 'Daniel',
  email: 'daniel@example.com',
  dni: '12345678',
};

// usuario.dni = "87654321"; // ❌ Error: readonly

// Extender interfaces
interface Admin extends Usuario {
  permisos: string[];
  nivel: number;
}

const admin: Admin = {
  id: 2,
  nombre: 'Ana',
  email: 'ana@example.com',
  dni: '87654321',
  permisos: ['read', 'write', 'delete'],
  nivel: 5,
};

// Interfaces para funciones
interface Calculadora {
  (a: number, b: number): number;
}

const sumar: Calculadora = (a, b) => a + b;

// Index Signature
interface Diccionario {
  [key: string]: string;
}

const traducciones: Diccionario = {
  hello: 'hola',
  bye: 'adiós',
};
```

### Type Aliases

```typescript
// Type alias básico
type ID = string | number;

type Punto = {
  x: number;
  y: number;
};

// Union types
type Resultado = 'exito' | 'error' | 'pendiente';

// Intersection types
type Empleado = {
  id: number;
  nombre: string;
};

type Departamento = {
  departamento: string;
  jefe: string;
};

type EmpleadoCompleto = Empleado & Departamento;

const empleado: EmpleadoCompleto = {
  id: 1,
  nombre: 'Carlos',
  departamento: 'IT',
  jefe: 'Ana',
};
```

### Interface vs Type

```typescript
// ¿Cuándo usar cada uno?

// Interface: preferible para objetos y clases
interface Persona {
  nombre: string;
  edad: number;
}

// Se pueden extender/fusionar
interface Persona {
  email: string; // ✅ fusión de declaraciones
}

// Type: preferible para unions, intersections, primitivos
type Color = 'rojo' | 'verde' | 'azul';
type Coordenada = [number, number];
type Callback = (data: string) => void;
```

---

## Funciones

### Tipos de Funciones

```typescript
// Función con tipos
function sumar(a: number, b: number): number {
  return a + b;
}

// Arrow function
const restar = (a: number, b: number): number => a - b;

// Parámetros opcionales
function saludar(nombre: string, apellido?: string): string {
  return apellido ? `Hola ${nombre} ${apellido}` : `Hola ${nombre}`;
}

// Parámetros por defecto
function crear(nombre: string, activo: boolean = true): void {
  console.log(`${nombre} - ${activo}`);
}

// Rest parameters
function sumarTodos(...numeros: number[]): number {
  return numeros.reduce((acc, n) => acc + n, 0);
}

sumarTodos(1, 2, 3, 4, 5); // 15
```

### Function Overloading

```typescript
// Sobrecarga de funciones
function procesar(x: string): string;
function procesar(x: number): number;
function procesar(x: string | number): string | number {
  if (typeof x === 'string') {
    return x.toUpperCase();
  }
  return x * 2;
}

procesar('hola'); // "HOLA"
procesar(5); // 10
```

### This en funciones

```typescript
interface Tarjeta {
  valor: number;
}

interface Mazo {
  tarjetas: Tarjeta[];
  crearBarajar(this: Mazo): () => void;
}

let mazo: Mazo = {
  tarjetas: [{ valor: 1 }],
  crearBarajar: function (this: Mazo) {
    return () => {
      // this es Mazo
      console.log(this.tarjetas);
    };
  },
};
```

---

## Generics

Los Generics permiten crear componentes reutilizables que funcionan con **cualquier tipo**.

### Funciones Genéricas

```typescript
// Sin generics
function identidadNumero(arg: number): number {
  return arg;
}

function identidadString(arg: string): string {
  return arg;
}

// Con generics
function identidad<T>(arg: T): T {
  return arg;
}

let numero = identidad<number>(42);
let texto = identidad<string>('hola');
let auto = identidad({ marca: 'Toyota' }); // inferencia automática

// Generic con arrays
function primerElemento<T>(arr: T[]): T | undefined {
  return arr[0];
}

primerElemento([1, 2, 3]); // number
primerElemento(['a', 'b']); // string
```

### Interfaces Genéricas

```typescript
interface Respuesta<T> {
  data: T;
  error: string | null;
  timestamp: number;
}

interface Usuario {
  id: number;
  nombre: string;
}

const respuestaUsuario: Respuesta<Usuario> = {
  data: { id: 1, nombre: 'Ana' },
  error: null,
  timestamp: Date.now(),
};

const respuestaNumeros: Respuesta<number[]> = {
  data: [1, 2, 3],
  error: null,
  timestamp: Date.now(),
};
```

### Clases Genéricas

```typescript
class Cola<T> {
  private datos: T[] = [];

  agregar(item: T): void {
    this.datos.push(item);
  }

  quitar(): T | undefined {
    return this.datos.shift();
  }

  size(): number {
    return this.datos.length;
  }
}

const colaNumeros = new Cola<number>();
colaNumeros.agregar(1);
colaNumeros.agregar(2);

const colaStrings = new Cola<string>();
colaStrings.agregar('primero');
```

### Constraints (Restricciones)

```typescript
// Restringir el tipo genérico
interface ConLongitud {
  length: number;
}

function logLongitud<T extends ConLongitud>(arg: T): T {
  console.log(arg.length); // ✅ sabemos que tiene length
  return arg;
}

logLongitud('hola'); // ✅ string tiene length
logLongitud([1, 2, 3]); // ✅ array tiene length
// logLongitud(42);         // ❌ number no tiene length

// Keyof constraint
function getPropiedad<T, K extends keyof T>(obj: T, key: K): T[K] {
  return obj[key];
}

let persona = { nombre: 'Ana', edad: 30 };
getPropiedad(persona, 'nombre'); // ✅ "Ana"
// getPropiedad(persona, "email"); // ❌ Error
```

---

## Clases y OOP

### Clases Básicas

```typescript
class Persona {
  // Propiedades
  nombre: string;
  edad: number;

  // Constructor
  constructor(nombre: string, edad: number) {
    this.nombre = nombre;
    this.edad = edad;
  }

  // Métodos
  saludar(): string {
    return `Hola, soy ${this.nombre}`;
  }
}

const persona = new Persona('Daniel', 25);
console.log(persona.saludar());
```

### Modificadores de Acceso

```typescript
class CuentaBancaria {
  public titular: string; // accesible desde cualquier lugar
  private saldo: number; // solo dentro de la clase
  protected numeroCuenta: string; // clase y subclases

  constructor(titular: string, saldoInicial: number) {
    this.titular = titular;
    this.saldo = saldoInicial;
    this.numeroCuenta = this.generarNumero();
  }

  // Método público
  public depositar(monto: number): void {
    this.saldo += monto;
  }

  public getSaldo(): number {
    return this.saldo;
  }

  // Método privado
  private generarNumero(): string {
    return Math.random().toString(36).substring(7);
  }
}

const cuenta = new CuentaBancaria('Ana', 1000);
cuenta.depositar(500);
console.log(cuenta.getSaldo()); // 1500
// console.log(cuenta.saldo); // ❌ Error: private
```

### Sintaxis Abreviada

```typescript
// Forma larga
class Producto1 {
  nombre: string;
  precio: number;

  constructor(nombre: string, precio: number) {
    this.nombre = nombre;
    this.precio = precio;
  }
}

// Forma abreviada (equivalente)
class Producto2 {
  constructor(
    public nombre: string,
    public precio: number
  ) {}
}
```

### Readonly

```typescript
class Usuario {
  readonly id: number;
  nombre: string;

  constructor(id: number, nombre: string) {
    this.id = id;
    this.nombre = nombre;
  }

  cambiarNombre(nuevoNombre: string): void {
    this.nombre = nuevoNombre; // ✅
    // this.id = 123;           // ❌ Error: readonly
  }
}
```

### Herencia

```typescript
class Animal {
  constructor(public nombre: string) {}

  moverse(distancia: number = 0): void {
    console.log(`${this.nombre} se movió ${distancia}m`);
  }
}

class Perro extends Animal {
  ladrar(): void {
    console.log('¡Guau guau!');
  }

  // Override
  moverse(distancia: number = 5): void {
    console.log('Corriendo...');
    super.moverse(distancia);
  }
}

const perro = new Perro('Rex');
perro.ladrar();
perro.moverse(10);
```

### Clases Abstractas

```typescript
abstract class Forma {
  constructor(public color: string) {}

  // Método abstracto (debe implementarse en subclases)
  abstract calcularArea(): number;

  // Método concreto
  describir(): string {
    return `Forma de color ${this.color}`;
  }
}

class Circulo extends Forma {
  constructor(
    color: string,
    public radio: number
  ) {
    super(color);
  }

  calcularArea(): number {
    return Math.PI * this.radio ** 2;
  }
}

// const forma = new Forma("rojo"); // ❌ Error: no se puede instanciar
const circulo = new Circulo('rojo', 5);
console.log(circulo.calcularArea());
```

### Getters y Setters

```typescript
class Empleado {
  private _salario: number = 0;

  get salario(): number {
    return this._salario;
  }

  set salario(nuevoSalario: number) {
    if (nuevoSalario < 0) {
      throw new Error('Salario no puede ser negativo');
    }
    this._salario = nuevoSalario;
  }
}

const emp = new Empleado();
emp.salario = 5000; // usa el setter
console.log(emp.salario); // usa el getter
```

### Miembros Estáticos

```typescript
class Utilidades {
  static PI: number = 3.14159;

  static calcularCircunferencia(radio: number): number {
    return 2 * this.PI * radio;
  }
}

console.log(Utilidades.PI);
console.log(Utilidades.calcularCircunferencia(5));
// No se necesita instanciar
```

---

## Utility Types

TypeScript incluye tipos de utilidad built-in muy útiles.

### Partial&lt;T&gt;

Hace todas las propiedades opcionales.

```typescript
interface Usuario {
  id: number;
  nombre: string;
  email: string;
}

// Útil para actualizaciones parciales
function actualizarUsuario(id: number, cambios: Partial<Usuario>): void {
  // cambios puede tener solo algunas propiedades
}

actualizarUsuario(1, { nombre: 'Ana' }); // ✅
actualizarUsuario(2, { email: 'nuevo@example.com' }); // ✅
```

### Required&lt;T&gt;

Hace todas las propiedades obligatorias.

```typescript
interface Config {
  host?: string;
  port?: number;
}

const config: Required<Config> = {
  host: 'localhost',
  port: 3000,
  // Ambas propiedades son requeridas
};
```

### Readonly&lt;T&gt;

Hace todas las propiedades readonly.

```typescript
interface Punto {
  x: number;
  y: number;
}

const punto: Readonly<Punto> = { x: 10, y: 20 };
// punto.x = 5; // ❌ Error: readonly
```

### Pick&lt;T, K&gt;

Selecciona solo ciertas propiedades.

```typescript
interface Usuario {
  id: number;
  nombre: string;
  email: string;
  password: string;
}

type UsuarioPublico = Pick<Usuario, 'id' | 'nombre' | 'email'>;

const usuarioPublico: UsuarioPublico = {
  id: 1,
  nombre: 'Ana',
  email: 'ana@example.com',
  // password no está permitido
};
```

### Omit&lt;T, K&gt;

Excluye ciertas propiedades.

```typescript
interface Usuario {
  id: number;
  nombre: string;
  email: string;
  password: string;
}

type UsuarioSinPassword = Omit<Usuario, 'password'>;

const usuario: UsuarioSinPassword = {
  id: 1,
  nombre: 'Ana',
  email: 'ana@example.com',
  // password no está permitido
};
```

### Record&lt;K, T&gt;

Crea un tipo objeto con claves K y valores T.

```typescript
type Rol = 'admin' | 'usuario' | 'invitado';

const permisos: Record<Rol, string[]> = {
  admin: ['read', 'write', 'delete'],
  usuario: ['read', 'write'],
  invitado: ['read'],
};
```

### Exclude&lt;T, U&gt; y Extract&lt;T, U&gt;

```typescript
type T1 = 'a' | 'b' | 'c';
type T2 = 'a' | 'e';

type Excluido = Exclude<T1, T2>; // "b" | "c"
type Extraido = Extract<T1, T2>; // "a"
```

### ReturnType&lt;T&gt;

Obtiene el tipo de retorno de una función.

```typescript
function obtenerUsuario() {
  return { id: 1, nombre: 'Ana' };
}

type Usuario = ReturnType<typeof obtenerUsuario>;
// Usuario = { id: number; nombre: string; }
```

### Parameters&lt;T&gt;

Obtiene los tipos de parámetros de una función como tupla.

```typescript
function crearUsuario(nombre: string, edad: number, activo: boolean) {
  // ...
}

type Params = Parameters<typeof crearUsuario>;
// [string, number, boolean]
```

---

## Preguntas Frecuentes en Entrevistas

### 1. ¿Cuál es la diferencia entre `interface` y `type`?

**Respuesta:**

- **Interface**: mejor para objetos y clases, soporta fusión de declaraciones, extends más natural
- **Type**: más flexible, soporta unions, intersections, primitivos, tuplas

```typescript
// Solo type puede hacer esto
type ID = string | number;
type Punto = [number, number];

// Interface soporta fusión
interface Usuario {
  nombre: string;
}
interface Usuario {
  edad: number;
} // ✅ se fusionan

// Type no se puede redeclarar
type Animal = { especie: string };
// type Animal = { nombre: string; } // ❌ Error
```

### 2. ¿Qué es `any` vs `unknown`?

**Respuesta:**

- **any**: desactiva type-checking completamente (inseguro)
- **unknown**: tipo seguro para valores desconocidos, requiere type-checking antes de usar

```typescript
let valorAny: any = 'texto';
valorAny.toUpperCase(); // ✅ compila pero puede fallar en runtime

let valorUnknown: unknown = 'texto';
// valorUnknown.toUpperCase(); // ❌ Error
if (typeof valorUnknown === 'string') {
  valorUnknown.toUpperCase(); // ✅ OK después de verificar
}
```

### 3. ¿Qué son los Generics y por qué son útiles?

**Respuesta:**
Los generics permiten crear componentes reutilizables que trabajan con múltiples tipos manteniendo type safety.

```typescript
// Sin generics: necesitas funciones separadas
function imprimirString(valor: string): string {
  return valor;
}
function imprimirNumber(valor: number): number {
  return valor;
}

// Con generics: una sola función
function imprimir<T>(valor: T): T {
  return valor;
}
```

### 4. ¿Qué es el `type narrowing`?

**Respuesta:**
Es el proceso de refinar tipos a través de checks condicionales.

```typescript
function procesarValor(valor: string | number) {
  // Type narrowing con typeof
  if (typeof valor === 'string') {
    return valor.toUpperCase(); // TS sabe que es string
  }
  return valor.toFixed(2); // TS sabe que es number
}

// Con clases (instanceof)
class Perro {
  ladrar() {}
}
class Gato {
  maullar() {}
}

function hacerSonido(animal: Perro | Gato) {
  if (animal instanceof Perro) {
    animal.ladrar();
  } else {
    animal.maullar();
  }
}
```

### 5. ¿Qué es `readonly` vs `const`?

**Respuesta:**

- **const**: para variables, no se puede reasignar
- **readonly**: para propiedades de objetos/clases, no se puede modificar

```typescript
const arr = [1, 2, 3];
arr.push(4); // ✅ OK, const no previene mutación

let arrReadonly: readonly number[] = [1, 2, 3];
// arrReadonly.push(4); // ❌ Error: readonly

class Usuario {
  readonly id: number;
  constructor(id: number) {
    this.id = id;
  }
}
```

### 6. ¿Cuándo usar `null` vs `undefined`?

**Respuesta:**

- **undefined**: ausencia de valor (no inicializado)
- **null**: ausencia intencional de valor

```typescript
let sinInicializar: string | undefined;
let sinValor: string | null = null;

// Configuración
interface Config {
  timeout?: number; // undefined = no configurado
  cache: number | null; // null = deshabilitado intencionalmente
}
```

### 7. ¿Qué son los Type Guards?

**Respuesta:**
Funciones que ayudan a TypeScript a inferir tipos más específicos.

```typescript
interface Pez {
  nadar(): void;
}
interface Ave {
  volar(): void;
}

// Type guard personalizado
function esPez(animal: Pez | Ave): animal is Pez {
  return (animal as Pez).nadar !== undefined;
}

function mover(animal: Pez | Ave) {
  if (esPez(animal)) {
    animal.nadar(); // TS sabe que es Pez
  } else {
    animal.volar(); // TS sabe que es Ave
  }
}
```

### 8. ¿Qué es `keyof` y cómo se usa?

**Respuesta:**
`keyof` crea un union type de todas las claves de un objeto.

```typescript
interface Persona {
  nombre: string;
  edad: number;
  email: string;
}

type ClavesPersona = keyof Persona; // "nombre" | "edad" | "email"

function obtenerValor<T, K extends keyof T>(obj: T, key: K): T[K] {
  return obj[key];
}

const persona: Persona = { nombre: 'Ana', edad: 30, email: 'ana@test.com' };
obtenerValor(persona, 'nombre'); // ✅ "Ana"
// obtenerValor(persona, "telefono"); // ❌ Error
```

### 9. ¿Diferencia entre `public`, `private`, y `protected`?

**Respuesta:**

```typescript
class Ejemplo {
  public publico: string; // accesible desde cualquier lugar
  private privado: string; // solo dentro de esta clase
  protected protegido: string; // esta clase y subclases

  constructor() {
    this.publico = 'todos pueden ver';
    this.privado = 'solo yo';
    this.protegido = 'yo y mis hijos';
  }
}

class Hijo extends Ejemplo {
  metodo() {
    console.log(this.publico); // ✅
    console.log(this.protegido); // ✅
    // console.log(this.privado); // ❌ Error
  }
}
```

### 10. ¿Qué es `Partial<T>` y cuándo usarlo?

**Respuesta:**
Convierte todas las propiedades en opcionales. Útil para updates parciales.

```typescript
interface Usuario {
  id: number;
  nombre: string;
  email: string;
  edad: number;
}

function actualizarUsuario(id: number, cambios: Partial<Usuario>): Usuario {
  const usuarioActual = obtenerUsuario(id);
  return { ...usuarioActual, ...cambios };
}

// Solo actualizar email
actualizarUsuario(1, { email: 'nuevo@example.com' });
```

---

## 🎯 Tips para Entrevistas

### ✅ DO

- Usa tipos específicos en lugar de `any`
- Aprovecha la inferencia de tipos cuando es obvia
- Usa `readonly` para inmutabilidad
- Prefiere `unknown` sobre `any` para valores desconocidos
- Usa utility types (`Partial`, `Pick`, `Omit`, etc.)
- Documenta con JSDoc cuando sea necesario

### ❌ DON'T

- Evita `any` a toda costa (demuestra que entiendes TypeScript)
- No uses type assertions (`as`) innecesariamente
- No ignores errores del compilador
- No uses `!` (non-null assertion) sin justificación

### 💡 Ejemplos de Código Limpio

```typescript
// ❌ Mal
function procesar(data: any): any {
  return data.value;
}

// ✅ Bien
interface Datos {
  value: string;
}

function procesar(data: Datos): string {
  return data.value;
}

// ❌ Mal
const usuario = datos as Usuario;

// ✅ Bien
function esUsuario(datos: unknown): datos is Usuario {
  return (
    typeof datos === 'object' &&
    datos !== null &&
    'id' in datos &&
    'nombre' in datos
  );
}

if (esUsuario(datos)) {
  console.log(datos.nombre);
}
```

---

## 📖 Recursos Adicionales

- [TypeScript Official Docs](https://www.typescriptlang.org/docs/)
- [TypeScript Playground](https://www.typescriptlang.org/play)
- [Type Challenges](https://github.com/type-challenges/type-challenges)

---

## 🎓 Ejercicios Prácticos

### Ejercicio 1: Tipos Básicos

```typescript
// Completa los tipos
function combinar(input1: ???, input2: ???): ??? {
  if (typeof input1 === "number" && typeof input2 === "number") {
    return input1 + input2;
  }
  return input1.toString() + input2.toString();
}

// Respuesta: function combinar(input1: number | string, input2: number | string): number | string
```

### Ejercicio 2: Generics

```typescript
// Implementa una función genérica que devuelva el último elemento de un array
function ultimo<???>(arr: ???): ??? {
  // tu código aquí
}

// Respuesta:
function ultimo<T>(arr: T[]): T | undefined {
  return arr[arr.length - 1];
}
```

### Ejercicio 3: Interfaces

```typescript
// Crea una interface para un producto de e-commerce con:
// - id (obligatorio)
// - nombre (obligatorio)
// - precio (obligatorio)
// - descuento (opcional)
// - categorias (array de strings)

// Respuesta:
interface Producto {
  id: number;
  nombre: string;
  precio: number;
  descuento?: number;
  categorias: string[];
}
```

---

**¡Buena suerte en tu entrevista! 🚀**
