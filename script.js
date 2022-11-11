let categorie = document.getElementById('categorie');
let yes = document.getElementById('yesScore');
let no = document.getElementById('noScore');
let question = document.getElementById('question');
let btnReponse = document.querySelectorAll('.btnReponse');
let check = document.getElementById('check');
let clear = document.getElementById('clear');
let motQuestion = `<span>Question : <span/> <br/>`;
let data;
let choix;
let bonneReponse;
let valeurStoredX;
console.log(localStorage.ValeurX);
console.log(localStorage.ValeurY);
let x;
function initX() {
    if (localStorage.ValeurX == undefined) {
        x = 0;
        yes.textContent = x;
    } else {
        x = localStorage.ValeurX;
        yes.textContent = localStorage.ValeurX;
    }
}
initX();



// function fYes() {
//     x++;
//     valeurStoredX = localStorage.getItem('ValeurX');
//     yes.textContent = valeurStoredX;
// }
// fYes();
let valeurStoredY;
let y;
function initY() {
    if (localStorage.ValeurY == undefined) {
        y = 0;
        no.textContent = y;
    } else {
        y = localStorage.ValeurY;
        no.textContent = localStorage.ValeurY;
    }
}
initY();

// function fNo() {
//     y++
//     valeurStoredY = localStorage.getItem('ValeurY');
//     no.textContent = valeurStoredY;
// }
// fNo();

function req() {
    let xhr = new XMLHttpRequest();
    xhr.open("GET", 'https://opentdb.com/api.php?amount=1');
    xhr.responseType = "json";
    xhr.send();
    xhr.onload = function () {
        if (xhr.status != 200) {
            alert(xhr.statusText);
        } else {
            data = xhr.response.results[0];
            //alert('Nouvelle req après le check')
        }
    };
    xhr.onerror = function() {
        alert('La requête a échoué !');
    }
}

req();

function miseEnPlace() {
    setTimeout(() => {
        console.log(data);
        let categoriePiocher = data.category;
        if (categoriePiocher.includes("Entertainment: ")) {
            let categorieModifier = categoriePiocher.slice(15);
            categorie.textContent = categorieModifier;
        } else {
            categorie.textContent = data.category;
        }
    
        question.innerHTML = motQuestion + data.question;
    
        let tableauReponses = [
            data.correct_answer,
            data.incorrect_answers[0],
            data.incorrect_answers[1],
            data.incorrect_answers[2],
        ];
        bonneReponse = tableauReponses[0];
        console.log(bonneReponse);
        tableauReponses.sort();
    
        for (let i = 0; i < tableauReponses.length; i++) {
            btnReponse[i].textContent = tableauReponses[i];
            btnReponse[i].addEventListener('click', fChoix);
            btnReponse[i].style.background = '#F7BD09';
                function fChoix() {
                    choix = btnReponse[i].textContent;
                    for (let i = 0; i < btnReponse.length; i++) {
                        btnReponse[i].style.background = '#F7BD09';
                    }
                    btnReponse[i].style.background = '#218cb7';
                    console.log(choix);
                }
        }
    }, 1000);
}
miseEnPlace();

check.addEventListener('click', fCheck);
    function fCheck() {
        req();
        miseEnPlace();
        if(choix === bonneReponse) {
            x++;
            localStorage.setItem('ValeurX', x);
            valeurStoredX = localStorage.getItem('ValeurX');
            yes.textContent = valeurStoredX;
            console.log("Valeur de x++ : " + localStorage.ValeurX);
        } else {
            y++;
            localStorage.setItem('ValeurY', y);
            valeurStoredY = localStorage.getItem('ValeurY');
            no.textContent = valeurStoredY;
            console.log("Valeur de y++ :" + localStorage.ValeurY);
        }
    }

    clear.addEventListener('click', fClear);
        function fClear() {
            localStorage.clear();
            initX();
            initY();
            yes.textContent = 0;
            no.textContent = 0;
            req();
            miseEnPlace();
        }