// ------------ HEADER COMMENT ------------

// this file declares GameModeButtons


// ------------ Classes ------------

// creates a text button at given y location and text
// changes colour when mouse hovers over it
// GameModeButtons.clicked is set to true if it is clicked on
// this class will be used for main buttons such as game start
class GameModeButtons {
    
    constructor(y, givenWidth, givenHeight, name, fontFamily, Pcolour){
        this.x = width * 0.5;           // x position of the button
        this.y = y / 100 * height;      // the y provided as the parameter is a percentage for where the y position will be on the canvas
        this.width = givenWidth;        // width of the hitbox
        this.height = givenHeight;      // height of the hitbox
        this.text = name;               // the text to display
        this.fontFamily = fontFamily;   // font family of the text
        this.colour = Pcolour           // colour of the text
        this.clicked = false            // keeps a track of if the button has been clicked or not
        this.ghostButton = false        // ignore button properties and just display it if true
    }

    // returns true if the mouse is over the button
    ifHovered(){ 
        if (this.x + this.width*0.5 >= mouseX && mouseX >= this.x - this.width*0.5 && this.y <= mouseY && mouseY <= this.y + this.height) {return true;}
        return false;
    }

    // displays the text of the button for given colour
    drawButton(){
        this.clicked = false;
        push();
        
        textFont(this.fontFamily);
        if (this.ifHovered() == true && this.ghostButton == false){ fill(this.colour); }
        else { fill(0); }
        textAlign(CENTER, TOP);
        textSize(12);
        textSize(this.width / textWidth(this.text) * 12);
        text(this.text, 0, this.y, width);
        if (this.isClicked() == true) { this.clicked = true; }
        pop();
        
    }


    // returns true if the user clicks on the button
    isClicked(){
        if (this.x + this.width*0.5 >= mouseX && mouseX >= this.x - this.width*0.5 && this.y <= mouseY && mouseY <= this.y + this.height && mouseclicked === true) {return true;}
        return false;
    }
}