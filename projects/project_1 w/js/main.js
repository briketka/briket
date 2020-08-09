"strict";

function insert(simbol) {
    document.getElementById("_input").value += simbol;
}

function clearing() {
    document.getElementById("_input").value = "";
}

function del() {
    let word = document.getElementById("_input").value;
    document.getElementById("_input").value = word.slice(0,  - 1);
}

function ravno() {
    let word = document.getElementById("_input").value;
    if (word) {
    document.getElementById("_input").value = eval(word);
    }
    
}