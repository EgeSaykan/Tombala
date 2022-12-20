var unused;
var used;
var drawButton;
var mouseclicked;
var last;
var backgroundTime;

function setup() {
    cnv = createCanvas(windowWidth * 0.9, windowHeight * 0.9); cnv.position(windowWidth * 0.05, windowHeight * 0.05);
    mouseclicked = false;
    unused = [];
    used = [];
    for (let i = 0; i < 9; i++){
        unused.push([]);
        used.push([]);
        for (let m = 0; m < 10; m++){
            unused[i].push(1 + m + i * 10);
            used[i].push(0);
        }
    }
    console.log(unused)
    drawButton = new GameModeButtons(45, width * 0.15, height * 0.1, "DRAW", "Comic Sans MS", [0, 102, 153]);
    last = 0;
    backgroundTime = 0.0;
}

function drawNumber(text_, colour_, x, y, m, i){

    push();
    if ((m + i) % 2 == 0){
        fill(225, 100, 150, 150);
        rect(x, y - 18, 20, 20);

    }
    else {
        fill(0, 125, 50, 150);
        rect(x, y - 18, 20, 20);
    }

    fill(colour_);
    textSize(18);
    text(text_, x, y);
    pop();

}
  
function draw() {
    background(220 + sin(backgroundTime) * 50, 180 - sin(backgroundTime) * 25, 110 + sin(backgroundTime) * 20);
    for (let i = 0; i < 9; i++){
        for (let m = 0; m < 10; m++){
            if (unused[i][m] != 0){
                drawNumber(unused[i][m], [20, 20, 50], width * (0.01 + 0.04 * m), height * (0.1 + 0.1 * i), m, i)
            }
            if (used[i][m] != 0){
                drawNumber(used[i][m], [20, 20, 50], width * (0.61 + 0.04 * m), height * (0.1 + 0.1 * i), m, i)
            }
        }
    }

    drawButton.drawButton();
    mouseclicked = false;

    if (drawButton.clicked){
        let randomY = Math.ceil(Math.random() * 9);
        let randomX = Math.ceil(Math.random() * 10);
        console.log(randomX - 1, randomY - 1, randomY * 10 + randomX)

        unused[randomY - 1][randomX - 1] = 0;
        used[randomY - 1][randomX - 1] = (randomY - 1) * 10 + randomX;
        last = (randomY - 1) * 10 + randomX;
    }

    push();
    fill(25, 125, 20);
    textSize(48);
    textAlign(CENTER, TOP);
    if (last != 0){
        text(last, width / 2, height / 2 + 30);
    }

    pop();
    if (backgroundTime > 2 * Math.PI){
        backgroundTime = 0.0;
    }
    backgroundTime += 0.01
}

// this is called when mouse is clicked
function mouseClicked() {
    mouseclicked = true;    // playerObject global variable which is true if mouse is clicked that run

}