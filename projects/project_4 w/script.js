"use strict";

let canvas = document.getElementById("canvas");
let ctx = canvas.getContext("2d");

let w = canvas.width = window.innerWidth - 240 - 1 ;
let h = canvas.height = window.innerHeight;

let nMax = 500 ;
let h_nMax = document.getElementById("nMax");
let h_nMax_output = document.getElementById("nMax_output");

let rMin = 5;
let h_rMin = document.getElementById("rMin");
let h_rMin_output = document.getElementById("rMin_output");

let rMax = 20;
let h_rMax = document.getElementById("rMax");
let h_rMax_output = document.getElementById("rMax_output");

let ball_gravitation_to_greatBall_parametr = 10;
let h_ball_gravitation_to_greatBall_parametr = document.getElementById("ball_gravitation_to_greatBall_parametr");
let h_ball_gravitation_to_greatBall_parametr_output = document.getElementById("ball_gravitation_to_greatBall_parametr_output");

let ball_antiGravitation_to_greatBall_parametr = 10;
let h_ball_antiGravitation_to_greatBall_parametr = document.getElementById("ball_antiGravitation_to_greatBall_parametr");
let h_ball_antiGravitation_to_greatBall_parametr_output = document.getElementById("ball_antiGravitation_to_greatBall_parametr_output");

let ball_antiGravitation_together_parametr = 50;
let h_ball_antiGravitation_together_parametr = document.getElementById("ball_antiGravitation_together_parametr");
let h_ball_antiGravitation_together_parametr_output = document.getElementById("ball_antiGravitation_together_parametr_output");

let h_ball_create = document.getElementById("ball_create");
let h_ball_create_checked;
let h_ball_size_rost = document.getElementById("ball_size_rost");
let h_ball_size_rost_checked;
let h_clearCanvas = document.getElementById("clearCanvas");
let h_clearCanvas_checked;
let h_paint_greatBall = document.getElementById("paint_greatBall");
let h_paint_greatBall_checked;
let h_paint_ball = document.getElementById("paint_ball");
let h_paint_ball_checked;
let h_paint_fon = document.getElementById("paint_fon");
let h_paint_fon_checked;
let h_paint_text = document.getElementById("paint_text");
let h_paint_text_checked;
let h_paint_window = document.getElementById("paint_window");
let h_paint_window_checked;
let h_paint_apple = document.getElementById("paint_apple");
let h_paint_apple_checked;
let h_paint_color_alpha_ball_way = document.getElementById("paint_color_alpha_ball_way");
let h_paint_color_alpha_ball_way_checked;
let h_paint_color_alpha_ball_old = document.getElementById("paint_color_alpha_ball_old");
let h_paint_color_alpha_ball_old_checked;
let h_paint_color_alpha_contur_way = document.getElementById("paint_color_alpha_contur_way");
let h_paint_color_alpha_contur_way_checked;
let h_paint_color_alpha_contur_old = document.getElementById("paint_color_alpha_contur_old");
let h_paint_color_alpha_contur_old_checked;
let h_shadow = document.getElementById("shadow");
let h_shadow_checked;
let h_parallax = document.getElementById("parallax");
let h_parallax_checked;
let h_ball_gravitation_to_greatBall = document.getElementById("ball_gravitation_to_greatBall");
let h_ball_gravitation_to_greatBall_checked;
let h_ball_antiGravitation_to_greatBall = document.getElementById("ball_antiGravitation_to_greatBall");
let h_ball_antiGravitation_to_greatBall_checked;
let h_ball_antiGravitation_together = document.getElementById("ball_antiGravitation_together");
let h_ball_antiGravitation_together_checked;

let h_color_fon = document.getElementsByName('color_fon');
let h_color_fon_return;
let h_color_greatBall = document.getElementsByName('color_greatBall');
let h_color_greatBall_return;
let h_color_ball_array = document.getElementsByName('color_ball_array');
let h_color_ball_array_return;

function html_init() {
    h_nMax.min = 0 ;
    h_nMax.max = 1000 ;
    h_nMax.value = nMax ;

    h_rMin.min = 1 ;
    h_rMin.max = 100 ;
    h_rMin.value = rMin ;

    h_rMax.min = 1 ;
    h_rMax.max = 100 ;
    h_rMax.value = rMax ;

    h_ball_gravitation_to_greatBall_parametr.min = 0;
    h_ball_gravitation_to_greatBall_parametr.max = 100;
    h_ball_gravitation_to_greatBall_parametr.value = ball_gravitation_to_greatBall_parametr; // 1

    h_ball_antiGravitation_to_greatBall_parametr.min = 0;
    h_ball_antiGravitation_to_greatBall_parametr.max = 100;
    h_ball_antiGravitation_to_greatBall_parametr.value = ball_antiGravitation_to_greatBall_parametr; // 100

    h_ball_antiGravitation_together_parametr.min = 0;
    h_ball_antiGravitation_together_parametr.max = 100;
    h_ball_antiGravitation_together_parametr.value = ball_antiGravitation_together_parametr; // 5
}

function h_radio_return(name) {
    for (let i = 0 ; i < name.length ; i++) {
        if (name[i].checked) {
            return name[i].value ;            
        }
    }
}

function html_send_recive() {
    // html_out
    nMax = +h_nMax.value ;
    rMin = +h_rMin.value ;
    rMax = +h_rMax.value ;

    ball_gravitation_to_greatBall_parametr = +h_ball_gravitation_to_greatBall_parametr.value;
    ball_antiGravitation_to_greatBall_parametr = +h_ball_antiGravitation_to_greatBall_parametr.value;
    ball_antiGravitation_together_parametr = +h_ball_antiGravitation_together_parametr.value;

    h_ball_create_checked = h_ball_create.checked;
    h_ball_size_rost_checked = h_ball_size_rost.checked;
    h_clearCanvas_checked = h_clearCanvas.checked;
    h_paint_greatBall_checked = h_paint_greatBall.checked;
    h_paint_ball_checked = h_paint_ball.checked;
    h_paint_fon_checked = h_paint_fon.checked;
    h_paint_text_checked = h_paint_text.checked;
    h_paint_window_checked = h_paint_window.checked;
    h_paint_apple_checked = h_paint_apple.checked;
    h_paint_color_alpha_ball_way_checked = h_paint_color_alpha_ball_way.checked;
    h_paint_color_alpha_ball_old_checked = h_paint_color_alpha_ball_old.checked;
    h_paint_color_alpha_contur_way_checked = h_paint_color_alpha_contur_way.checked;
    h_paint_color_alpha_contur_old_checked = h_paint_color_alpha_contur_old.checked;
    h_shadow_checked = h_shadow.checked;
    h_parallax_checked = h_parallax.checked;
    h_ball_gravitation_to_greatBall_checked = h_ball_gravitation_to_greatBall.checked;
    h_ball_antiGravitation_to_greatBall_checked = h_ball_antiGravitation_to_greatBall.checked;
    h_ball_antiGravitation_together_checked = h_ball_antiGravitation_together.checked;

    h_color_fon_return = h_radio_return(h_color_fon);
    h_color_greatBall_return = h_radio_return(h_color_greatBall);
    h_color_ball_array_return = h_radio_return(h_color_ball_array);

    // html_in  
    h_nMax_output.value = h_nMax.value ;   
    h_rMin_output.value = h_rMin.value ;
    h_rMax_output.value = h_rMax.value ;

    h_ball_gravitation_to_greatBall_parametr_output.value = h_ball_gravitation_to_greatBall_parametr.value;
    h_ball_antiGravitation_to_greatBall_parametr_output.value = h_ball_antiGravitation_to_greatBall_parametr.value;
    h_ball_antiGravitation_together_parametr_output.value = h_ball_antiGravitation_together_parametr.value;
}

function fon_color() {    
    canvas.style.backgroundColor = h_color_fon_return ;
}

function clearCanvas() {
    if (h_clearCanvas_checked) { ctx.clearRect(0 , 0 , w , h) }
}

let color_array;

function select_color() { 
    switch(h_color_ball_array_return) {
        case 'color_array_1':
            color_array = [ "Blue" ,  "Green" , "Indigo" , "Orange" , "Pink" , "	Purple" , "Red" , "DeepPink" , "Teal" , "Yellow"];         
            break;
        case 'color_array_2':
            color_array = [ "Red" , "Green" , "Blue" ];    
            break;
        case 'color_array_3':
            color_array = [ "Black" , "White" ];        
            break;
        case 'color_array_4':
            color_array = [ "Red" ];        
            break;
        case 'color_array_5':
            color_array = [ "Blue" ];        
            break;
        case 'color_array_6':
            color_array = [ "White" ];        
            break;
        case 'color_array_7':
            color_array = [ "Grey" ];        
            break;
        default:
            color_array = [ "Grey" ];        
            break;        
    }        
}

let mousePos = {};

function mouse_position(event) {
    mousePos = {
        x : event.x - canvas.offsetLeft ,
        // x : event.clientX  - canvas.offsetLeft,
        y : event.y - canvas.offsetTop ,
    }
}

canvas.onmousemove = (event) => {
    mouse_position(event);
    
    greatBall.pos.x = mousePos.x;
    greatBall.pos.y = mousePos.y;
}

let mass;
let color;
let rStart = 0;
let r;
let alpha = 1.0;

class Ball {
    constructor() {
        this.pos = { x : mousePos.x -5 + Math.random() * 10 , y : mousePos.y - 5 + Math.random() * 10 };
        // this.pos = { x : w /3  + Math.random() * w/3  , y : h / 3 + Math.random() * h / 3 };
        this.mass = mass;
        this.color = color;
        this.rStart = rStart;
        this.r = r;
        this.alpha = alpha;
    }
}

let greatBall = new Ball();

greatBall.alpha = 0.5;
greatBall.mass = 100.0;
greatBall.r = rMax + 5;

function paint_greatBall() {
    if (h_paint_greatBall_checked) {
    ctx.fillStyle = ctx.strokeStyle  = greatBall.color = h_color_greatBall_return;  
    ctx.beginPath();       
    // ctx.arc(greatBall.pos.x - xParallax_4, greatBall.pos.y - yParallax_4 , greatBall.r , 0 , Math.PI * 2 , true);
    ctx.arc(greatBall.pos.x , greatBall.pos.y , greatBall.r , 0 , Math.PI * 2 , true);
    ctx.closePath();
    ctx.fill();
    }
}

let dx;
let dy;

function parallax_delta_calculate() { 
    if (h_parallax_checked) {
        dx = mousePos.x - w / 2 ;
        dy = mousePos.y - h / 2 ; 
    }
    else {
        dx = 0.0 ;
        dy = 0.0 ;
    }
}




let xParallaxDelta = w / 100 ;
let yParallaxDelta = h / 100 ;

function paint_fon() {
    if (h_paint_fon_checked) {
        ctx.fillStyle = ctx.strokeStyle  = "white";
        // ctx.fillStyle = ctx.strokeStyle  = "black";
        ctx.globalAlpha = 0.15;
        ctx.lineWidth = 10; 
        ctx.beginPath();

        let Sm_11 = 0.1;
        let Sm_12 = 0.15;
        let Sm_13 = 0.2;

        let Sm_21 = 0.05;
        let Sm_22 = 0.12;
        let Sm_23 = 0.17;

        // горизонтальные линии

        ctx.moveTo( 0 , h * 0 / 3 - dy * Sm_12 - dx * Sm_22 );
        ctx.lineTo( w , h * 0 / 3 - dy * Sm_12 + dx * Sm_22 );

        ctx.moveTo( 0 , h * 1 / 3 - dy * Sm_11 - dx * Sm_21 );
        ctx.lineTo( w , h * 1 / 3 - dy * Sm_11 + dx * Sm_21 );

        ctx.moveTo( 0 , h * 2 / 3 - dy * Sm_11 + dx * Sm_21 );
        ctx.lineTo( w , h * 2 / 3 - dy * Sm_11 - dx * Sm_21 );

        ctx.moveTo( 0 , h * 3 / 3 - dy * Sm_12 + dx * Sm_22 );
        ctx.lineTo( w , h * 3 / 3 - dy * Sm_12 - dx * Sm_22 );

        // вертикальные линии

        ctx.moveTo( w * 0 / 5 - dx * Sm_13 - dy * Sm_23 , 0 );
        ctx.lineTo( w * 0 / 5 - dx * Sm_13 + dy * Sm_23 , h );

        ctx.moveTo( w * 1 / 5 - dx * Sm_12 - dy * Sm_22 , 0 );
        ctx.lineTo( w * 1 / 5 - dx * Sm_12 + dy * Sm_22 , h );

        ctx.moveTo( w * 2 / 5 - dx * Sm_11 - dy * Sm_21 , 0 );
        ctx.lineTo( w * 2 / 5 - dx * Sm_11 + dy * Sm_21 , h );

        ctx.moveTo( w * 3 / 5 - dx * Sm_11 + dy * Sm_21 , 0 );
        ctx.lineTo( w * 3 / 5 - dx * Sm_11 - dy * Sm_21 , h );

        ctx.moveTo( w * 4 / 5 - dx * Sm_12 + dy * Sm_22 , 0 );
        ctx.lineTo( w * 4 / 5 - dx * Sm_12 - dy * Sm_22 , h );

        ctx.moveTo( w * 5 / 5 - dx * Sm_13 + dy * Sm_23 , 0 );
        ctx.lineTo( w * 5 / 5 - dx * Sm_13 - dy * Sm_23 , h );

        ctx.closePath();
        ctx.stroke();
    }
}

let ball = [];

function ball_propety_init() {
    color = color_array[Math.round(Math.random() * (color_array.length - 1))];
    r = Math.round( rMin + (rMax - rMin) * Math.random() );
    mass = 0.04 * r * r / rMax;
}

let timer_create_ball;

canvas.onmousedown= (event) => {
    timer_create_ball = setInterval(ball_create , 20);
}

canvas.onmouseup= (event) => {
    clearInterval(timer_create_ball);
}

function ball_create() {
    ball_propety_init();
    ball.push(new Ball());  
}

function ball_del() {
    if (ball.length > nMax) {
        ball.shift();
        ball.shift();  
    }
}

function ball_auto_create() {
    if (h_ball_create_checked) {
        ball_create();
    } 
}

function paint_ball() {
    
    if (h_paint_ball_checked) {

        if (h_shadow_checked) {
            // ctx.save();
            // ctx.shadowColor = "grey"; // Цвет тени. Поддерживаются стандарты RGB, RGBA, HSL, HEX и некоторые другие
            ctx.shadowColor = "white";
            // ctx.shadowColor = "blue";
            // ctx.shadowOffsetX = 1; // Горизонтальная длина тени относительно текста
            // ctx.shadowOffsetY = 1; // Высота тени относительно текста
            ctx.shadowBlur = 10; // Эффект размытия тени; чем больше значение, тем сильнее эффект
            // ctx.restore(); 
        }
        else {
            ctx.shadowBlur = 0;      
        }


        let alpha_delta_old;
        alpha_delta_old = 1.0 / ball.length ;
      

        for (let i = 0 ; i < ball.length ; i++) {           
            ctx.fillStyle = ctx.strokeStyle  = ball[i].color;          
            
            let alpha_r =  1.0 / Math.pow( 1.01 , Math.pow( Math.pow( mousePos.x - ball[i].pos.x , 2) + Math.pow( mousePos.y - ball[i].pos.y  , 2 ) , 0.5 ) ) ;
    
            ctx.globalAlpha = 1;

            if (h_paint_color_alpha_ball_way_checked) {
                ctx.globalAlpha = alpha_r;
            }
 
            if (h_paint_color_alpha_ball_old_checked) {
                ctx.globalAlpha =  i * alpha_delta_old;
            }
            
            ctx.beginPath();                  
            ctx.arc(ball[i].pos.x - dx * 0.1 , ball[i].pos.y - dy * 0.1 , ball[i].rStart , 0 , Math.PI * 2 , true);     
            // ctx.arc(ball[i].pos.x, ball[i].pos.y, ball[i].rStart , 0 , Math.PI * 2 , true);
            ctx.closePath();
            ctx.fill();

            ctx.globalAlpha = 1;

            if (h_paint_color_alpha_contur_way_checked) {
                ctx.globalAlpha = alpha_r;
            }
 
            if (h_paint_color_alpha_contur_old_checked) {
                ctx.globalAlpha =  i * alpha_delta_old;
            }

            ctx.lineWidth = 1;
            ctx.beginPath(); 
            ctx.arc(ball[i].pos.x - dx * 0.1, ball[i].pos.y - dy * 0.1 , ball[i].rStart , 0 , Math.PI * 2 , true);
            ctx.closePath();
            ctx.stroke();
        }
    }
}

function ball_size_rost() {   
    for (let i = 0; i < ball.length; i++) {   
        if (h_ball_size_rost_checked) {      
            if ( ball[i].rStart < ball[i].r) {
                ball[i].rStart += 1 ;
            }                       
        }      
        else {
            ball[i].rStart = ball[i].r;
        }    
    }   

}

// let div_n = document.createElement('div');
    // div_n.className = "divClass";
    // div_n.id = "divId";
    // div.innerHTML = "<strong>111</strong> 111 ";
    // div_n.innerHTML = ""; 
    // document.body.before(div);
    // document.body.prepend(div_n);
    // document.body.append(div);
    // document.body.after(div;

// panel.insertAdjacentHTML('beforebegin' , '<div class="MyClass">111</div>');
// panel.insertAdjacentHTML('afterbegin' , '<div class="MyClass">111</div>');
// panel.insertAdjacentHTML('beforeend' , '<div class="MyClass">111</div>');
// panel.insertAdjacentHTML('afterend' , '<div class="MyClass">111</div>');

let time_last;
let time_delta;
let fps = 0 ;
let i_kadr = 0 ;

function myFps() { 
    time_delta = Math.round( 1 / ( Date.now() - time_last ) * 1000 );
    time_last = Date.now();

    if ( i_kadr > 50 ) {
        fps = time_delta;
        i_kadr = 0;
    }    
    i_kadr++; 
}

let let_1 = 0; // Вспомогательная переменная для вывода на экран нужного мне параметра
let let_2 = 0;
let let_3 = 0;
let let_4 = 0;
let let_5 = 0;
let let_6 = 0;
let let_7 = 0;
let let_8 = 0;
let let_9 = 0;

function paint_text() {
    ctx.globalAlpha = 1.0 ;
    if (h_paint_text_checked) {
        ctx.fillStyle = ctx.strokeStyle  = "white";
        ctx.font = "20px serif";
        ctx.textBaseline = "hanging";
        ctx.fillText(`n = ${ball.length}`, 10, 10);
        myFps();
        ctx.fillText(`fps = ${fps}`, 10, 30);
        // ctx.fillText(`let_1 = ${let_1}`, 10, 50);
        // ctx.fillText(`let_2 = ${let_2}`, 10, 70);
        // ctx.fillText(`let_3 = ${let_3}`, 10, 90);
        // ctx.fillText(`let_4 = ${let_4}`, 10, 110);
        // ctx.fillText(`let_5 = ${let_5}`, 10, 130);
        // ctx.fillText(`let_6 = ${let_6}`, 10, 150);
        // ctx.fillText(`let_7 = ${let_7}`, 10, 170);
        // ctx.fillText(`let_8 = ${let_8}`, 10, 190);
        // ctx.fillText(`let_9 = ${let_9}`, 10, 210);
    }    
}

function paint_window() {
    if (h_paint_window_checked) {
        ctx.fillStyle = ctx.strokeStyle  = "white";
        ctx.lineWidth = 4;
        ctx.arc( w / 2 , h / 2 , w / 4 , 0 , Math.PI * 2 , true);
        // ctx.rect( w / 4 , h / 4 , w * 2 / 4 , h * 2 / 4  );
        ctx.clip();
    }    
}

function paint_apple() {
    if (h_paint_apple_checked) { 
        ctx.fillStyle = ctx.strokeStyle  = "black";
        ctx.beginPath();
        ctx.moveTo(0, 0);
        ctx.lineTo(w , 0);
        ctx.lineTo(w , h);
        ctx.lineTo(w / 2 , h);
        ctx.lineTo(w / 2, 500);
        ctx.quadraticCurveTo(w / 2 + 100 , 500 , w / 2 + 155 , 400 );
        ctx.arc(w / 2 + 200 , 310, 100 , Math.PI * 0.654 , Math.PI * 1.327 , false)   
        ctx.quadraticCurveTo(w / 2 + 100 , 158 , w / 2 , 200 );
        ctx.lineTo(w / 2, 170);
        ctx.quadraticCurveTo(w / 2 + 90 , 160 , w / 2 + 100 , 70);
        ctx.quadraticCurveTo(w / 2 + 10 , 80 , w / 2  , 170 );    
        ctx.lineTo(w / 2, 200);
        ctx.bezierCurveTo(w / 2 - 230 , 100 , w / 2 - 230 , 500 , w / 2 , 500);
        ctx.lineTo(w / 2, h);
        ctx.lineTo(0, h);          
        ctx.closePath();
        ctx.fill();
    }
}

function ball_gravitation_and_antiGravitationto_greatBall_and_antiGravitation_together () {
    for (let i = 0; i < ball.length; i++) {
        let deltaX;
        let deltaY;
        let deltaX_Qwadrat; 
        let deltaY_Qwadrat; 
        let zQwadrat;
        let z; 
        let stepX;
        let stepY;
        if (h_ball_gravitation_to_greatBall_checked || h_ball_antiGravitation_to_greatBall_checked) {
            deltaX = ball[i].pos.x - mousePos.x  ;
            deltaY = ball[i].pos.y - mousePos.y  ;
            deltaX_Qwadrat = Math.pow( deltaX  , 2 ) ; 
            deltaY_Qwadrat = Math.pow( deltaY  , 2 ) ; 
            zQwadrat = deltaX_Qwadrat + deltaY_Qwadrat ;
            z = Math.pow( zQwadrat , 1 / 2 ) ; 
            stepX = deltaX / z ;
            stepY = deltaY / z ;
        }
        if (h_ball_gravitation_to_greatBall_checked) { 
            if (( deltaX < 0) || ( deltaX > 0)){           
                ball[i].pos.x -=  ball_gravitation_to_greatBall_parametr / 10 * stepX;
            }
            if (( deltaY < 0) || ( deltaY > 0)) {
                ball[i].pos.y -= ball_gravitation_to_greatBall_parametr / 10 * stepY;
            }
        }
        if (h_ball_antiGravitation_to_greatBall_checked) {
             ball[i].pos.x += (ball_antiGravitation_to_greatBall_parametr * 10 / z) * stepX ;           
             ball[i].pos.y += (ball_antiGravitation_to_greatBall_parametr * 10 / z) * stepY ;
        }
        let j = i + 1;
        if (h_ball_antiGravitation_together_checked) {
            for (j ; j < ball.length ; j++) {
                deltaX = ball[i].pos.x - ball[j].pos.x  ;
                deltaY = ball[i].pos.y - ball[j].pos.y  ;
                deltaX_Qwadrat = Math.pow( deltaX  , 2 ) ; 
                deltaY_Qwadrat = Math.pow( deltaY  , 2 ) ;        
                zQwadrat = deltaX_Qwadrat + deltaY_Qwadrat ;
                z = Math.pow( zQwadrat , 1 / 2 ) ; 
                stepX = deltaX / z ;
                stepY = deltaY / z ;
                ball[i].pos.x += ball[j].mass * (ball_antiGravitation_together_parametr / 10 / z) * stepX ;           
                ball[i].pos.y += ball[j].mass * (ball_antiGravitation_together_parametr / 10 / z) * stepY ;
            }
        } 
    }
}

function main() {
    // let_1 = 0 ; 
    // let_2 = 0;
    // let_3 = 0;
    // let_4 = 0;
    // let_5 = 0;
    // let_6 = 0;
    // let_7 = 0;
    // let_8 = 0;
    // let_9 = 0;

    fon_color();
    clearCanvas();
    select_color();
    parallax_delta_calculate();
    paint_fon();
    ball_auto_create();
    ball_del();
    paint_greatBall();
    paint_ball();
    ball_size_rost();       
    paint_text();
    paint_window(); 
    paint_apple();     
    ball_gravitation_and_antiGravitationto_greatBall_and_antiGravitation_together();
}

html_init();
setInterval(html_send_recive , 100)
setInterval(main , 20);