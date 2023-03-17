// L'utente clicca su un bottone che genererà una griglia di gioco quadrata.
// Ogni cella ha un numero progressivo, da 1 a 100.
// Ci saranno quindi 10 caselle per ognuna delle 10 righe.
// Quando l'utente clicca su ogni cella, la cella cliccata si colora di azzurro ed emetto un messaggio in console con il numero della cella cliccata.Bonus
// Aggiungere una select accanto al bottone di generazione, che fornisca una scelta tra tre diversi livelli di difficoltà:
// - con difficoltà 1 => 100 caselle, con un numero compreso tra 1 e 100, divise in 10 caselle per 10 righe;
// - con difficoltà 2 => 81 caselle, con un numero compreso tra 1 e 81, divise in 9 caselle per 9 righe;
// - con difficoltà 3 => 49 caselle, con un numero compreso tra 1 e 49, divise in 7 caselle per 7 righe;

/* <div class="square"> 1 </div> */

const playButton = document.getElementById("startGame");
const game = document.getElementById("gameSquare");
const start = document.getElementById("startMessage");
const nBombs = 16;
let counter = 0;

playButton.addEventListener("click", gameStart);

// funzione usata per dare in output un quadrato con un numero scritto al suo interno e di una dimensione specifica in base alla difficoltà scelta
function drawSquare(index, numSquares)
{
    const square = document.createElement("div");
    square.classList.add("square");
    square.style.width = `calc(100% / ${numSquares})`;
    square.style.heigth = square.style.width;
    square.innerHTML = index + 1;
    return square;
}

// funzione usata per dare in output un array di bombe con indice diverso, prendendo in input il numero di caselle disponibili
function createBombs(squareNumbers)
{
    let bombs = [];

    while(bombs.length < 16)
    {
        const bomb = Math.floor(Math.random() * squareNumbers) + 1;
        if(bombs.indexOf(bomb) < 0)
        {
            bombs.push(bomb);
        }
    }
    return bombs;
}

// funzione usata per creare l'area di gioco

function gameStart()
{
    counter = 0;
    game.innerHTML = ``;
    const difficulty = document.getElementById("difficulty").value;
    let squareNumbers;
    let squareForRow;
    switch(difficulty)
    {
        case "facile" :
            squareNumbers = 100;
            squareForRow = 10;
            break;
        case "medio" :
            squareNumbers = 81;
            squareForRow = 9;
            break;
        case "difficile" :
            squareNumbers = 49;
            squareForRow = 7;
            break;
    }

    // ciclo iterativo dove viene costruita l'area di gioco

    const bombs = createBombs(squareNumbers);
    console.log("Lista delle bombe" + " " + bombs);
    console.log(counter);
    // inizio del ciclo iterativo atto a creare l'area di gioco
    for(let i=0 ; i<squareNumbers ; i++)
    {
        // viene creato un quadrato con scritto all'interno il suo indice e con una grandezza definita dal numero di quadrati per riga
        const square = drawSquare(i , squareForRow);
        // inizio del ciclo iterativo atto a scorrere il vettore di bombe
        for(let j=0; j<bombs.length; j++)
        {
            // se l'indice scritto all'interno del quadrato corrisponde ad un elemento del vettore bombs, l'elemento square viene convertito in una bomba
            if(square.innerHTML == bombs[j])
              {
                square.addEventListener("click" , function() 
                    {
                        square.classList.add("bg-danger");
                        endGame();
                    }
                    , {once: true});
              }
        }
            //   altrimenti diventa un quadrato "sicuro"
              if(!square.classList.contains("bg-danger"))
                {
                    square.addEventListener("click" , function() 
                    {
                        square.classList.add("bg-primary");
                        counter++;
                    }
                    , {once: true});
                }

        // il quadrato viene aggiunto alla griglia
        game.appendChild(square);
    }
    game.classList.remove("d-none");
    start.classList.add("d-none");
}

function endGame()
{
    start.classList.remove("d-none");
    start.innerHTML = `<h3 class="text-danger"> Boom! Sei saltato in aria dopo ${counter + 1} click! </h3> `
}