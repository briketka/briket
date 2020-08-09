"use strict";

let number_max = prompt("Введите максимально загадываемое число" , 100);

let number_comp = Math.round( Math.random() * number_max );

let leigth = prompt("Компьютер загадал число" , number_comp);


// console.log(`number_max = ${number_max}`);
// console.log(`number_comp = ${number_comp}`);
let start = 0;
let end = number_max ;
let step = 0;
let alg = 0;
while ( true ) {
    step++;
    alg = Math.ceil( (end - start) / 2 + start );
    // console.log(`step = ${step} , alg = ${alg}`);
    document.write(`step = ${step} , alg = ${alg} <br/>`);
    if ( alg == number_comp ) {
        alert(`Твоя программа определила загаданное компьютером число ${number_comp} за ${step} шагов`);
        break;
    }
    else {
        if ( alg > number_comp ) {
            end = alg ;
        }
        else {
            start = alg;
        }
    }

    // step++;
    // alg++;
    // console.log(`step = ${step} , alg = ${alg}`);
    // if ( alg == number_comp ) {
    //     alert(`Твоя программа определила загаданное компьютером число ${number_comp} за ${step} шагов`);
    //     break;
    // }
    
}