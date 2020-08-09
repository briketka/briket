export function $(id) {
    return document.getElementById(id);
  }

 export function _(value) {
    console.log(value);
 } 

 export function rnd(value) {
     if (value == 0) { value = 1 ; }
     return Math.round(Math.random() * value); 
 }
