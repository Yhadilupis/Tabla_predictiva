class Pila {
    constructor() {
      this.elementos = [];
    }
  
    push(elemento) {
      this.elementos.push(elemento);
    }
  
    pop() {
      if (this.estaVacia()) {
        throw new Error("La pila está vacía");
      }
      return this.elementos.pop();
    }
  
    peek() {
      if (this.estaVacia()) {
        throw new Error("La pila está vacía");
      }
      return this.elementos[this.elementos.length - 1];
    }
  
    estaVacia() {
      return this.elementos.length === 0;
    }
  
    tamaño() {
      return this.elementos.length;
    }
  
    imprimir() {
      console.log(this.elementos);
    }
  
  }
  
  const tabla = {
      E: { 'alter table': ['D', 'C'] },
      C: { 'alter table': ['alter table'] },
      D: { '[a-z]': ['V', 'A', 'I'] }, 
      I: { '[a-z]': ['L'] },
      L: { '[a-z]': ['[a-z]'] },
      R: {'[a-z]': ['L', 'R']},
      A: { 'add': ['add'] },
      V: { '[a-z]': ['T', '[a-z]'] },
      T: { '[varchar-date]': ['[varchar-date]'] }
  }
  
  const terminales = ['alter table', '[a-z]', 'add', '[varchar-date]', '$'];
  const noTerminales = ['E', 'C', 'D', 'L', 'I', 'A', 'V', 'T'];
  const palabrasReservadas = ['add', 'varchar', 'date', 'alter', 'table'];
  
  const main = (data) => {
      const pila = new Pila();
      const tokens = data.trim().split(" ");
      tokens[0] = tokens[0] + " " + tokens[1]
      tokens.splice(1, 1);
  
      if(tokens.length != 5 || !/[a-z]+/.test(tokens[1]) || palabrasReservadas.includes(tokens[1]) || !/[a-z]+/.test(tokens[3]) || palabrasReservadas.includes(tokens[3])) return false;
  
      let X;
      let M;
      pila.push('$');
      pila.push('E');
      
      do {
          X = pila.pop();
          if(terminales.includes(X)){
              if(X == '$') return true;
              if(X != tokens[0] && X != '[a-z]' && X != 'varchar' && X != 'date' && X != '[varchar-date]') return false;
              if(X == '[varchar-date]'){
                  if(!/^(varchar|date)$/.test(tokens[0])) return false;
              }
              tokens.shift();
          }else if(noTerminales.includes(X)){
              M = Object.values(tabla[X])
              M[0].forEach(element => pila.push(element));
          }else{
              return false;
          }
      } while (X != '$');
      return true;
  }
  
  //const result = main("alter table hola add dad varchar");
  //console.log(result);

  function parser() {
    const cadena = document.getElementById("string").value;
    const hasNumber = /\d/.test(cadena); 

    if (hasNumber) {
        const areaTexto = document.getElementById("areaTexto");
        areaTexto.textContent = "La cadena no debe contener números.";
        return; 
    }

    const result = main(cadena);
    const areaTexto = document.getElementById("areaTexto");

    if (result) {
        areaTexto.textContent = "La cadena es válida.";
    } else {
        areaTexto.textContent = "La cadena no es válida.";
    }
}
