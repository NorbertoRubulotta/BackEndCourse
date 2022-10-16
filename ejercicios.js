/================================================/
/* lista= [];

function mostrarLista(lista){
if (lista.lenght == 0) {
  console.log(`lista vacia`);} else {
    console.log(lista);
  }
} 
mostrarLista([1,4,5]);
mostrarLista([]);

(function (lista){
if (lista.lenght == 0){ 
  console.log(`lista vacia`);} else {
    console.log(lista);
  }
})([1,25,6]) */

/* function crearMultiplicador (num1){
  return function (num2){
    return num1 * num2;
  }
}
console.log(crearMultiplicador(3)(4));

const duplicar = crearMultiplicador(2);

console.log(duplicar(3));
console.log(duplicar(7)); */



/* class Contador {

static acumulador = 0;

  constructor (nombre){
    this.nombre = nombre;
    this.cuenta = 0;
  }

acumula() {
 this.cuenta++; 
 Contador.acumulador++;
}
obtenerResponsable (){
  return this.nombre;
}

obetenerCuentaIndividual (){
  return this.cuenta;
}

obtenerCuentaGlobal() {
  return Contador.acumulador
}


}

const r1 = new Contador('res1')
const r2 = new Contador('res2')

r1.acumula()
r1.acumula()

r2.acumula()
r2.acumula()
r2.acumula()

console.log(`r1 ind: ${r1.obetenerCuentaIndividual()}`)
console.log(`r1 glob: ${r1.obtenerCuentaGlobal()}`)

console.log(`r2 ind: ${r2.obetenerCuentaIndividual()}`)
console.log(`r2 glob: ${r2.obtenerCuentaGlobal()}`) */