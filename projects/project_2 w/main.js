"use strict";

let canvas = document.getElementById("canvas");
canvas.width = window.innerWidth - 2 - 200;
canvas.height = window.innerHeight - 2;

let ctx = canvas.getContext("2d");

let n = 5; // количество элементов
let r_min = 50;
let r_max = 50;
let density_min = 0;
let density_max = 1;
let m_min = Math.floor(Math.PI * Math.pow(r_min , 2) * density_min);
let m_max = Math.floor(Math.PI * Math.pow(r_max , 2) * density_max);
let speed_min = 1;
let speed_max = 5;
// let event = false;
let visibleVector = true; // визуализация вектора направления движения

let color = "black";


let maxNX = Math.floor(canvas.width / ( 2 * r_max ));
let maxNY = Math.floor(canvas.height / ( 2 * r_max ));
let maxN = maxNX * maxNY;

if (maxN < n) {
    alert(`число элементов n равное ${n} , превывшает допустимое maxN = ${maxN}`)
}

let myAudio = new Audio;
myAudio.src = "blip1.wav"; // назначение звукового файла


let input_1 = document.getElementById("input_1");
input_1.value = n;

let input_2 = document.getElementById("input_2");
input_2.value = r_min;

let input_3 = document.getElementById("input_3");
input_3.value = r_max;

let input_4 = document.getElementById("input_4");
input_4.value = density_min;

let input_5 = document.getElementById("input_5");
input_5.value = density_max;

let input_6 = document.getElementById("input_6");
input_6.value = speed_min;

let input_7 = document.getElementById("input_7");
input_7.value = speed_max;


let btnStart = document.getElementById("button_1");
btnStart.onclick = () => {
    console.log("click button 1");
};

let btn_2 = document.getElementById("button_2");
btn_2.onclick = () => {
    console.log("click button 2");
};



class Pipl {
    constructor(name , x , y , r , density, m, color , speed , vector ) {
        this.name = name; // имя
        this.x = x; // координата x
        this.y = y; // координата y
        this.r = r; // радиус
        this.density = density; // плотность материала
        this.m = m; // масса
        this.color = color; // цвет
        this.speed = speed; // скорость
        this.vector = vector; // 
        this.event = { // событие - столкновение
            fact : false ,
            sosed_j: 1000 ,
        }
    }
};

let pipls = [];

let colorBi_n = 14 ;

let colorBi = [
"Gray" ,
"Silver" ,
"White" ,
"Fuchsia" ,
"Purple" ,
"Red" ,
"Maroon" ,
"Yellow" ,
"Olive" ,
"Lime" ,
"Green" ,
"Aqua" ,
"Teal" ,
"Blue" ,
"Navy" ,
]

for (let i = 0; i < n; i++) {
    let name = "pipl_" + i ;
    let x = r_max + Math.floor(Math.random() * canvas.width * (1 - 2 * r_max / canvas.width));
    let y = r_max + Math.floor(Math.random() * canvas.height * (1 - 2 * r_max / canvas.height));
    let r = Math.floor(r_min + Math.random() * ( r_max - r_min ) );
    let density = density_min + Math.random() * ( density_max - density_min) ; 
    let m = Math.floor(Math.PI * Math.pow(r , 2) * density);


    let checkbox_0 = document.getElementById("checkbox_0");

// -------------------------------------------------------------

    let color_random = checkbox_0.checked ;

    if (color_random == true) {
        color = `RGB(${Math.floor(Math.random() * 255 * (1- m / m_max))},${Math.floor(Math.random() * 255 * (1 - m / m_max))},${Math.floor(Math.random() * 255  * (1 - m / m_max))})`;
    }
    else {
        color =  colorBi[Math.floor(Math.random() * colorBi_n)];
    }

// -------------------------------------------------------------
  
    let speed = speed_min + Math.random() * ( speed_max - speed_min );
    let vector = Math.floor(Math.random() * 2 * Math.PI);

    pipls.push( new Pipl(name, x, y, r, density, m, color, speed, vector) );                
};




let timer = setInterval(function() {
        
    ctx.clearRect(0 , 0 , canvas.width , canvas.height);
    for ( let i = 0 ; i < n ; i++ ) {

        // pipls[i].color = color = `RGB(${Math.floor(Math.random() * 255 )},${Math.floor(Math.random() * 255)},${Math.floor(Math.random() * 255 )})`;
        
        if ( ( (pipls[i].x - pipls[i].r) <= 0) || ( (pipls[i].x + pipls[i].r) >= canvas.width) ) {
            pipls[i].vector = ( Math.PI - pipls[i].vector );    

            pipls[i].event.fact = true; 
            pipls[i].event.sosed_j = 1000 ;    
        }
        else {
            pipls[i].event.fact = false;     
        };

        if ( ( (pipls[i].y - pipls[i].r) <= 0) || ( (pipls[i].y + pipls[i].r) >= canvas.height) ) {
            pipls[i].vector = ( - pipls[i].vector );

            pipls[i].event.fact = true;
            pipls[i].event.sosed_j = 1000 ;    
        }
        else {
            pipls[i].event.fact = false;     
        } 

        let j = i ;
        j += 1 ;
        for ( j ; j < n ; j++ ) {
            
            if ( Math.sqrt( Math.pow(Math.abs(pipls[i].x - pipls[j].x) , 2) + Math.pow(Math.abs(pipls[i].y - pipls[j].y) , 2)) <= (pipls[i].r + pipls[j].r)  ) {
                pipls[i].event.fact = true;

                console.log(`столкновение i = ${i} с j = ${j}`);

                if (pipls[i].event.sosed_j == j) {
                    console.log(`в предыдущем событии записан j равное = ${j} , значит - ничего не менять - пусть продалжают траекторию`);
                }
                else {

                    pipls[i].event.sosed_j = j;

                    console.log(`в предыдущем событии записан j не равное = ${j} , значит - изменить траекторию`);

                    let deltaX = (pipls[i].x - pipls[j].x);
                    let deltaY = (pipls[i].y - pipls[j].y);
                    let tangens = deltaY / deltaX;
                    let arctangens = Math.atan(tangens)  + Math.PI / 2;

                    pipls[i].vector =( 2 * arctangens - pipls[i].vector );  
                    pipls[j].vector =( 2 * arctangens - pipls[j].vector );

                }
            }
            else {

                console.log(`нет столкновения между i = ${i} с j = ${j}`);
                
                pipls[i].event.fact = false;
            }    
           
        };

        // pipls[i].event.sosed_j = 1000;
                
        ctx.beginPath();
        ctx.arc(pipls[i].x , pipls[i].y , pipls[i].r , 0 , 2 * Math.PI);
        ctx.fillStyle = pipls[i].color;
        ctx.strokeStyle = '#000000';
        ctx.lineWidth = 1;

        ctx.closePath();
        ctx.fill();
        ctx.stroke();

        ctx.fillStyle = "black";
        ctx.font = "48px serif";
        ctx.fillText(`${i}`, pipls[i].x - 12, pipls[i].y +12 );
        
        let checkbox_1 = document.getElementById("checkbox_1");
        visibleVector = checkbox_1.checked ;

        if (visibleVector) {
            ctx.beginPath();
            ctx.moveTo(pipls[i].x , pipls[i].y);
            ctx.lineTo( (pipls[i].x + 10 * pipls[i].speed * Math.cos(pipls[i].vector) )  , ( pipls[i].y + 10 * pipls[i].speed * Math.sin(pipls[i].vector) ) ) ;            
            ctx.strokeStyle = '#ff0000';
            ctx.lineWidth = 2;
            ctx.fill();
            ctx.stroke();
            ctx.moveTo( (pipls[i].x + 10 * pipls[i].speed * Math.cos(pipls[i].vector) )  , ( pipls[i].y + 10 * pipls[i].speed * Math.sin(pipls[i].vector) ) ) ;
            ctx.lineTo( (pipls[i].x + 8 * pipls[i].speed * Math.cos(pipls[i].vector + Math.PI/20) )  , ( pipls[i].y + 8 * pipls[i].speed * Math.sin(pipls[i].vector + Math.PI/20) ) ) ;
            ctx.lineTo( (pipls[i].x + 8 * pipls[i].speed * Math.cos(pipls[i].vector - Math.PI/20) )  , ( pipls[i].y + 8 * pipls[i].speed * Math.sin(pipls[i].vector - Math.PI/20) ) ) ;
            ctx.fillStyle = '#ff0000';
            ctx.lineWidth = 2;
            ctx.closePath();
            ctx.fill();
            ctx.stroke();
        }

        let checkbox_2 = document.getElementById("checkbox_2");
        let audioCheck = checkbox_2.checked ;

        if (pipls[i].event.fact) {
            if (audioCheck) {
                myAudio.play();
            }           
        }
      
        pipls[i].x += pipls[i].speed * Math.cos(pipls[i].vector);
        pipls[i].y += pipls[i].speed * Math.sin(pipls[i].vector);
        }; 
    }

, 10);


