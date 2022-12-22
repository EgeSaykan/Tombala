var unused;
var used;
var drawButton;
var mouseclicked;
var beforeLast;
var last;
var backgroundTime;
var currentTime;
var wheelTime;
var clickCounter;
const wheelWaitTime = 8000;
const numberOfArcs = 12;

function setup() {
    cnv = createCanvas(windowWidth * 0.9, windowHeight * 0.9); cnv.position(windowWidth * 0.05, windowHeight * 0.05);
    mouseclicked = false;
    wheelTime = 0.0;
    clickCounter = 0;
    currentTime = millis();
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
    drawButton = new GameModeButtons(45, width * 0.15, height * 0.1, "DRAW", "Comic Sans MS", [0, 102, 153]);
    last = 0;
    beforeLast = 0;
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
    currentTime = millis();
    background(220 + sin(backgroundTime) * 50, 180 - sin(backgroundTime) * 25, 110 + sin(backgroundTime) * 20);
    for (let i = 0; i < 9; i++){
        for (let m = 0; m < 10; m++){
            if (unused[i][m] != 0){
                drawNumber(unused[i][m], [20, 20, 50], width * (0.01 + 0.04 * m), height * (0.1 + 0.1 * i), m, i);
            }
            if (used[i][m] != 0 && wheelTime == 0){
                drawNumber(used[i][m], [20, 20, 50], width * (0.61 + 0.04 * m), height * (0.1 + 0.1 * i), m, i);
            }
            else if (used[i][m] != 0 && used[i][m] != last){
                drawNumber(used[i][m], [20, 20, 50], width * (0.61 + 0.04 * m), height * (0.1 + 0.1 * i), m, i);
            }
            else if (used[i][m] != 0 && used[i][m] == last){
                drawNumber(used[i][m], [20, 20, 50], width * (0.01 + 0.04 * m), height * (0.1 + 0.1 * i), m, i);
            }
        }
    }

    drawButton.drawButton();
    mouseclicked = false;

    if (drawButton.clicked && wheelTime == 0 && clickCounter < 90){
        let randomY = Math.ceil(Math.random() * 9);
        let randomX = Math.ceil(Math.random() * 10);
        while (unused[randomY - 1][randomX - 1] == 0) {
            randomY = Math.ceil(Math.random() * 9);
            randomX = Math.ceil(Math.random() * 10);
        }
        wheelTime = currentTime;
        unused[randomY - 1][randomX - 1] = 0;
        used[randomY - 1][randomX - 1] = (randomY - 1) * 10 + randomX;
        last = (randomY - 1) * 10 + randomX;
        clickCounter++;
        beforeLast = 0;
    }
    if (wheelTime != 0) {
        let diff = currentTime - wheelTime;
        if (diff >= wheelWaitTime) {
            wheelTime = 0.0;
        }

        push();
        noStroke();
        console.log(PI * diff / (wheelWaitTime))
        fill(219, 174, 48, Math.min(sin(PI * diff / (wheelWaitTime * 0.8)) * 2550, 255));
        circle(width / 2, height / 2 + 50, height * 0.7);
        fill(171, 67, 191, Math.min(sin(PI * diff / (wheelWaitTime * 0.8)) * 2550, 255));
        for (let i = 0; i < wheelWaitTime; i++){
            arc(width / 2, height / 2 + 50, height * 0.7, height * 0.7, 2 *i * PI / (numberOfArcs / 2) + diff / 100, 2 * i * PI / (numberOfArcs / 2) + PI / (numberOfArcs / 2) + diff / 100)
        }


        if (diff < 0.8 * wheelWaitTime && diff > 0.1 * wheelWaitTime) {
            stroke(23, 54, 39);
        }
        fill(235, 61, 38, Math.min(sin(PI * diff / (wheelWaitTime * 0.8)) * 2550, 255));
        circle(width / 2, height / 2 + 50, height * 0.15);
        
        if (wheelWaitTime - diff < 7000 && diff < wheelWaitTime * 0.8 && Math.floor((wheelWaitTime - diff) / 1000 - 1) != 0){
            textSize(48);
            fill(103, 81, 184);
            textAlign(CENTER, TOP);
            text(Math.floor((wheelWaitTime - diff) / 1000 - 1), width / 2, height / 2 + 30);
        }
        
        
        pop();
        if (diff >= wheelWaitTime * 0.8){
            beforeLast = last;
        }/*
        else{
            
            beforeLast = last;
        }*/

    }

    push();
    fill(25, 125, 20);
    textSize(48);
    textAlign(CENTER, TOP);
    if (beforeLast != 0){
        text(beforeLast, width / 2, height / 2 + 30);
    }

    pop();
    if (backgroundTime > 2 * PI){
        backgroundTime = 0.0;
    }
    backgroundTime += 0.01
}

// this is called when mouse is clicked
function mouseClicked() {
    mouseclicked = true;    // playerObject global variable which is true if mouse is clicked that run

}