"use strict";

let butt = document.getElementById("button");
butt.onclick = () => {
    let color = ["red" , "green" , "blue" , "pink"];
    let rnd_4 = Math.floor(Math.random() * 4);
    let id = document.getElementById("div");
    id.style.backgroundColor = color[rnd_4];
}