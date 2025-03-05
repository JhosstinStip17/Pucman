
const pacMan = document.querySelector(".pac-man");
const ghosts = document.querySelectorAll(".ghost");
const ghostArray = [...ghosts]; // Convierte el NodeList en un arreglo
const scoreDisplay = document.getElementById("score");
const popup = document.getElementById("popup");
const popupText = document.getElementById("popup-text");
const gameBoard = document.getElementById("game-board");
const objects = document.querySelectorAll(".object");

let score = 0;
let gamePaused = false;
const ghostPositions = [];
let pacManSpeed = 4; // Velocidad de Pac-Man
let keysPressed = {}; // Objeto para rastrear teclas presionadas


ghosts.forEach((ghost) => {
    ghostPositions.push({
        top: ghost.style.top,
        left: ghost.style.left
    });
});


function restartGame() {
    pacMan.style.top = "380px";
    pacMan.style.left = "680px";

    ghosts.forEach((ghost, index) => {
        ghost.style.top = ghostPositions[index].top;
        ghost.style.left = ghostPositions[index].left;
    });

    score = 0;
    scoreDisplay.textContent = "Points: " + score;
    gamePaused = false;
    objects.forEach((object) => (object.style.display = "block"));
}

restartGame(); // Iniciar el juego

const gameWidth = 1900; // Ancho del cuadro de juego
const gameHeight = 940; // Alto del cuadro de juego


// movimiento por teclado
document.addEventListener("keydown", (e) => {
    if (gamePaused) return; // Añadir esta línea al inicio

    const step = 40;
    let top = parseInt(window.getComputedStyle(pacMan).getPropertyValue("top"));
    let left = parseInt(window.getComputedStyle(pacMan).getPropertyValue("left"));

    switch (e.key) {
        case "ArrowUp":
            if (top > 0 && !isWallCollision(top - step, left) && top > 0) {
                pacMan.style.top = (top - step) + "px";
            }
            break;
        case "ArrowDown":
            if (top < gameHeight - step && !isWallCollision(top + step, left)) {
                pacMan.style.top = (top + step) + "px";
            }
            break;
        case "ArrowLeft":
            if (left > 0 && !isWallCollision(top, left - step)) {
                pacMan.style.left = (left - step) + "px";
            }
            break;
        case "ArrowRight":
            if (left < gameWidth - step && !isWallCollision(top, left + step)) {
                pacMan.style.left = (left + step) + "px";
            }
            break;
    }

    // Lógica de colisión con el objeto
    let pacManRect = pacMan.getBoundingClientRect();
    let objects = document.querySelectorAll(".object");
    for (const object of objects) {
        let objectRect = object.getBoundingClientRect();
        if (
            pacManRect.left < objectRect.right &&
            pacManRect.right > objectRect.left &&
            pacManRect.top < objectRect.bottom &&
            pacManRect.bottom > objectRect.top
        ) {
            // Pac-Man ha tocado un objeto
            object.style.display = "none";
            const message = object.getAttribute("data-message");
            showPopup(message);
        }
    }

    // Lógica de colisión con el fantasma
    if (!gamePaused) { // Añadir esta condición
        ghosts.forEach((ghost) => {
            let ghostRect = ghost.getBoundingClientRect();
            if (
                pacManRect.left < ghostRect.right &&
                pacManRect.right > ghostRect.left &&
                pacManRect.top < ghostRect.bottom &&
                pacManRect.bottom > ghostRect.top
            ) {
                restartGame();
            }
        });
    }
});


function movePacMan() {
    if (gamePaused) {
        return; // Si el juego está pausado, no se ejecuta la lógica de movimiento de Pac-Man
    }
    // Lógica de colisión con el objeto
    let pacManRect = pacMan.getBoundingClientRect();
    let objectRect = object.getBoundingClientRect();
    ghosts.forEach((ghost) => {

        if (
            object.style.display !== "none" &&
            pacManRect.left < objectRect.right &&
            pacManRect.right > objectRect.left &&
            pacManRect.top < objectRect.bottom &&
            pacManRect.bottom > objectRect.top
        ) {
            restartGame();

            // Pac-Man ha tocado un objeto
            object.style.display = "none";
            score += 10;
            scoreDisplay.textContent = "Points: " + score;

            // Obtener el mensaje específico del objeto
            const message = object.getAttribute("data-message");

            showPopup(message);
            gamePaused = true;
        }
    });
}


// Lógica para detectar colisión con las paredes
function isWallCollision(top, left) {
    const walls = document.querySelectorAll(".wall");
    for (const wall of walls) {
        const wallRect = wall.getBoundingClientRect();
        if (
            top < wallRect.bottom &&
            top + 30 > wallRect.top &&
            left < wallRect.right &&
            left + 30 > wallRect.left
        ) {
            return true; // Colisión con la pared
        }
    }
    return false; // Sin colisión con la pared
}

function showPopup(text) {
    gamePaused = true;
    //formulario 1
    if (text.includes('[FORM1]')) {
        const form1Html = `
                <form id="form1">
                <br><label for="field1">What does HTML stand for?</label><br><br>
                    <input type="radio" name="answer" value="">a) Hyper Transfer Markup Language <br>
                    <input type="radio" name="answer" value="1">b) Hyper Text Markup Language<br>
                    <input type="radio" name="answer" value="">c) Hyperlink Text Markup Language <br>
                    <input type="radio" name="answer" value="">d) High Tech Markup Language<br>
                    <br>
                    <button type="submit">Continuar</button>
                </form>
            `;
        text = text.replace('[FORM1]', form1Html);
    }

    //formulario 2
    if (text.includes('[FORM2]')) {
        const form2Html = `
                <form id="form2">
                <br><label for="field1">Which of the following is a programming language?</label><br><br>
                    <input type="radio" name="answer" value="1">a) Python<br>
                    <input type="radio" name="answer" value="">b) CPU<br>
                    <input type="radio" name="answer" value="">c) GPU<br>
                    <input type="radio" name="answer" value="">d) RAM<br>
                    <br>
                    <button type="submit">Continuar</button>
                </form>
            `;
        text = text.replace('[FORM2]', form2Html);
    }

    // formulario 3
    if (text.includes('[FORM3]')) {
        const form3Html = `
                <form id="form3">
                <br><label for="field1">Which data structure is used to store a collection of elements with no specific order?</label><br><br>
                    <input type="radio" name="answer" value="1">a) Queue<br>
                    <input type="radio" name="answer" value="">b) Stack <br>
                    <input type="radio" name="answer" value="">c) Array <br>
                    <input type="radio" name="answer" value="">d) Set<br>
                    <br>
                    <button type="submit">Continuar</button>
                </form>
            `;
        text = text.replace('[FORM3]', form3Html);
    }

    // formulario 4
    if (text.includes('[FORM4]')) {
        const form4Html = `
                <form id="form4">
                <br><label for="field1">What is the primary function of a loop in programming?</label><br><br>
                    <input type="radio" name="answer" value="1">a) To make decisions<br>
                    <input type="radio" name="answer" value="">b) To define functions <br>
                    <input type="radio" name="answer" value="">c) To repeat a block of code <br>
                    <input type="radio" name="answer" value="">d) To perform arithmetic operations<br>
                    <br>
                    <button type="submit">Continuar</button>
                </form>
            `;
        text = text.replace('[FORM4]', form4Html);
    }

    // formulario 5
    if (text.includes('[FORM5]')) {
        const form5Html = `
                <form id="form5">
                <br><label for="field1">Which of the following is a version control system?</label><br><br>
                    <input type="radio" name="answer" value="1">a) Git <br>
                    <input type="radio" name="answer" value="">b) HTML  <br>
                    <input type="radio" name="answer" value="">c) CSS  <br>
                    <input type="radio" name="answer" value="">d) HTTP <br>
                    <br>
                    <button type="submit">Continuar</button>
                </form>
            `;
        text = text.replace('[FORM5]', form5Html);
    }

    // formulario 6
    if (text.includes('[FORM6]')) {
        const form6Html = `
                <form id="form6">
                <br><label for="field1">What is the file extension commonly used for Python scripts? </label><br><br>
                    <input type="radio" name="answer" value="">a) .html <br>
                    <input type="radio" name="answer" value="">b) .txt   <br>
                    <input type="radio" name="answer" value="1">c) .py  <br>
                    <input type="radio" name="answer" value="">d) .java <br>
                    <br>
                    <button type="submit">Continuar</button>
                </form>
            `;
        text = text.replace('[FORM6]', form6Html);
    }

    // formulario 7
    if (text.includes('[FORM7]')) {
        const form7Html = `
                <form id="form7">
                <br><label for="field1">Which of the following is a widely used relational database management system?  </label><br><br>
                    <input type="radio" name="answer" value="">a) HTML  <br>
                    <input type="radio" name="answer" value="">b) JSON  <br>
                    <input type="radio" name="answer" value="">c) XML   <br>
                    <input type="radio" name="answer" value="1">d) MySQL <br>
                    <br>
                    <button type="submit">Continuar</button>
                </form>
            `;
        text = text.replace('[FORM7]', form7Html);
    }

    // formulario 8
    if (text.includes('[FORM8]')) {
        const form8Html = `
                <form id="form8">
                <br><label for="field1">What does IDE stand for in programming? </label><br><br>
                    <input type="radio" name="answer" value="">a) Intelligent Design Engineering   <br>
                    <input type="radio" name="answer" value="1">b) Integrated Development Environment   <br>
                    <input type="radio" name="answer" value="">c) Internet Data Exchange   <br>
                    <input type="radio" name="answer" value="">d) Initial Deployment Environment <br>
                    <br>
                    <button type="submit">Continuar</button>
                </form>
            `;
        text = text.replace('[FORM8]', form8Html);
    }

    // formulario 9
    if (text.includes('[FORM9]')) {
        const form9Html = `
                <form id="form9">
                <br><label for="field1">In web development, what does CSS stand for? </label><br><br>
                    <input type="radio" name="answer" value="1">a) Cascading Style Sheet <br>
                    <input type="radio" name="answer" value="">b) Computer System Software <br>
                    <input type="radio" name="answer" value="">c) Creative Style Solution <br>
                    <input type="radio" name="answer" value="">d) Centralized Script Service <br>
                    <br>
                    <button type="submit">Continuar</button>
                </form>
            `;
        text = text.replace('[FORM9]', form9Html);
    }

    // formulario 10
    if (text.includes('[FORM10]')) {
        const form10Html = `
                <form id="form10">
                <br><label for="field1">What is the main purpose of conditional statements in programming?</label><br><br>
                    <input type="radio" name="answer" value="">a) To create comments <br>
                    <input type="radio" name="answer" value="">b) To define functions <br>
                    <input type="radio" name="answer" value="">c) To make decisions  <br>
                    <input type="radio" name="answer" value="1">d) To repeat code <br>
                    <br>
                    <button type="submit">Continuar</button>
                </form>
            `;
        text = text.replace('[FORM10]', form10Html);
    }


    popupText.innerHTML = text;
    popup.style.display = "flex";

    // Add event listeners to all possible forms
    const forms = [
        document.getElementById("form1"),
        document.getElementById("form2"),
        document.getElementById("form3"),
        document.getElementById("form4"),
        document.getElementById("form5"),
        document.getElementById("form6"),
        document.getElementById("form7"),
        document.getElementById("form8"),
        document.getElementById("form9"),
        document.getElementById("form10")
    ];

    forms.forEach(form => {
        if (form) {
            // Remove any existing event listeners to prevent multiple attachments
            form.removeEventListener('submit', handleFormSubmission);
            form.addEventListener('submit', handleFormSubmission);
        }
    });

    if (form1) {
        const firstInput1 = form1.querySelector("input");
        if (firstInput1) {
            firstInput1.focus();
        }
    } else if (form2) {
        const firstInput2 = form2.querySelector("input");
        if (firstInput2) {
            firstInput2.focus();
        }
    } else if (form3) {
        const firstInput3 = form3.querySelector("input");
        if (firstInput3) {
            firstInput3.focus();
        }
    } else if (form4) {
        const firstInput4 = form4.querySelector("input");
        if (firstInput4) {
            firstInput4.focus();
        }
    } else if (form5) {
        const firstInput5 = form5.querySelector("input");
        if (firstInput5) {
            firstInput5.focus();
        }
    } else if (form6) {
        const firstInput6 = form6.querySelector("input");
        if (firstInput6) {
            firstInput6.focus();
        }
    } else if (form7) {
        const firstInput7 = form7.querySelector("input");
        if (firstInput7) {
            firstInput7.focus();
        }
    } else if (form8) {
        const firstInput8 = form8.querySelector("input");
        if (firstInput8) {
            firstInput8.focus();
        }
    } else if (form9) {
        const firstInput9 = form9.querySelector("input");
        if (firstInput9) {
            firstInput9.focus();
        }
    } else if (form10) {
        const firstInput10 = form10.querySelector("input");
        if (firstInput10) {
            firstInput10.focus();
        }
    }

}

function handleFormSubmission(event) {
    event.preventDefault(); // Prevent default form submission

    // Find the selected radio button
    const selectedRadio = event.target.querySelector('input[name="answer"]:checked');
    
    if (!selectedRadio) {
        alert("Please select an answer!");
        return;
    }

    // Check if the selected answer is correct (has value "1")
    const isCorrect = selectedRadio.value === "1";

    if (isCorrect) {
        // Correct answer - add points
        score += 10;
        scoreDisplay.textContent = "Points: " + score;
        alert("Correct answer! +10 Points");
    } else {
        // Incorrect answer - no points added
        alert("Wrong answer. Try again.");
    }

    // Close the popup
    closePopup();
}

// Cerrar el popup
function closePopup() {
    popup.style.display = "none";
    gamePaused = false;
    gameBoard.focus(); // Devolver el enfoque al tablero de juego
}

// Primero definimos una función para encontrar el mejor camino alrededor de las paredes
function findBestDirection(ghost, pacMan, otherGhosts) {
    const directions = [
        { dx: 0, dy: -2, name: 'up' },    // Arriba
        { dx: 0, dy: 2, name: 'down' },   // Abajo
        { dx: -2, dy: 0, name: 'left' },  // Izquierda
        { dx: 2, dy: 0, name: 'right' }   // Derecha
    ];

    const ghostTop = parseInt(window.getComputedStyle(ghost).getPropertyValue("top"));
    const ghostLeft = parseInt(window.getComputedStyle(ghost).getPropertyValue("left"));
    const pacManTop = parseInt(window.getComputedStyle(pacMan).getPropertyValue("top"));
    const pacManLeft = parseInt(window.getComputedStyle(pacMan).getPropertyValue("left"));

    // Calcula las distancias para cada dirección posible
    const possibleMoves = directions.map(dir => {
        const newTop = ghostTop + dir.dy;
        const newLeft = ghostLeft + dir.dx;

        // Si hay una pared en esta dirección, asigna una puntuación alta (peor)
        if (isWallCollision(newTop, newLeft)) {
            return {
                direction: dir.name,
                score: Number.MAX_VALUE
            };
        }

        // Verificar colisión con otros fantasmas
        const wouldCollideWithGhosts = otherGhosts.some(otherGhost => {
            if (otherGhost === ghost) return false;
            const otherTop = parseInt(window.getComputedStyle(otherGhost).getPropertyValue("top"));
            const otherLeft = parseInt(window.getComputedStyle(otherGhost).getPropertyValue("left"));

            return (
                newTop < otherTop + 30 &&
                newTop + 30 > otherTop &&
                newLeft < otherLeft + 30 &&
                newLeft + 30 > otherLeft
            );
        });

        if (wouldCollideWithGhosts) {
            return {
                direction: dir.name,
                score: Number.MAX_VALUE
            };
        }

        // Calcula la distancia Manhattan al Pac-Man desde la nueva posición
        const distance = Math.abs(newTop - pacManTop) + Math.abs(newLeft - pacManLeft);

        return {
            direction: dir.name,
            score: distance
        };
    });

    // Encuentra la dirección con la menor puntuación (mejor movimiento)
    const bestMove = possibleMoves.reduce((best, current) =>
        current.score < best.score ? current : best
    );

    return bestMove.direction;
}


// Función mejorada para mover el fantasma
function moveGhost(ghost) {
    if (gamePaused) return;

    const ghostTop = parseInt(window.getComputedStyle(ghost).getPropertyValue("top"));
    const ghostLeft = parseInt(window.getComputedStyle(ghost).getPropertyValue("left"));
    
    // Pasar todos los fantasmas excepto el actual
    const otherGhosts = ghostArray.filter(g => g !== ghost);
    const bestDirection = findBestDirection(ghost, pacMan, otherGhosts);
    const speed = 2;

    // Aplica el movimiento basado en la mejor dirección
    switch (bestDirection) {
        case 'up':
            if (!isWallCollision(ghostTop - speed, ghostLeft)) {
                ghost.style.top = (ghostTop - speed) + "px";
            }
            break;
        case 'down':
            if (!isWallCollision(ghostTop + speed, ghostLeft)) {
                ghost.style.top = (ghostTop + speed) + "px";
            }
            break;
        case 'left':
            if (!isWallCollision(ghostTop, ghostLeft - speed)) {
                ghost.style.left = (ghostLeft - speed) + "px";
            }
            break;
        case 'right':
            if (!isWallCollision(ghostTop, ghostLeft + speed)) {
                ghost.style.left = (ghostLeft + speed) + "px";
            }
            break;
    }

    // Verifica colisión con Pac-Man
    let ghostRect = ghost.getBoundingClientRect();
    let pacManRect = pacMan.getBoundingClientRect();

    if (
        ghostRect.left < pacManRect.right &&
        ghostRect.right > pacManRect.left &&
        ghostRect.top < pacManRect.bottom &&
        ghostRect.bottom > pacManRect.top
    ) {
        restartGame();
    }
}

// Actualiza la función que mueve todos los fantasmas
function moveAllGhosts() {
    ghostArray.forEach(ghost => {
        moveGhost(ghost);
    });
}

clearInterval(window.ghostInterval);
window.ghostInterval = setInterval(moveAllGhosts, 15);
setInterval(movePacMan, 5);





