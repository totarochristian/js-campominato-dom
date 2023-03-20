const numberOfBomb = 16;
const squareEasy = 10;
const squareMedium = 9;
const squareHard = 7;
const bombs = [];
const bombsImages = ["bomb1.png","bomb2.png","bomb3.png","bomb4.png"];
const grassImages = ["grass.png","grass2.png"];
const resultLose = ["Peccato, hai perso!","Ritenta, magari sarai più fortunato!","Hai perso, ahahaha!","Vai a zappare, magari in quello sarai più bravo...","Che noia...","Batterti è stato facilissimo!","Cerca di non farmi perdere altro tempo..."];
const resultWin = ["Bravissimo, hai vinto la partita!","Complimenti, sei il vincitore!"];
let points;
let numSquare;
let gameOver;
let timeStart;
let backgroundMusic;

function BtnPlayClicked(){
    points = 0;
    gameOver = false;
    const difficulty = parseInt(document.getElementById("difficulty").value);
    numSquare = GetNumberOfSquares(difficulty);
    DrawField(numSquare);
    ChoseBombPositions(numSquare);
    DefineBackgroundMusic();
    document.getElementById("gameResult").classList.add("d-none");
    timeStart = new Date();
}

function GetNumberOfSquares(difficulty){
    let res = 0;
    switch(difficulty){
        case 1: 
            res = squareEasy;
            break;
        case 2:
            res = squareMedium;
            break;
        case 3:
            res = squareHard;
            break;
    }
    return res;
}

function DrawField(squares){
    document.documentElement.style.setProperty('--numOfSquarePerRow', squares);
    CleanChildsOfElementById("gameContainer");
    for(let i=1; i<=(squares*squares); i++)
        DrawSquare(i);
}

function DrawSquare(index){
    const sqr = document.createElement("div");
    sqr.id = "square_" + index;
    sqr.classList.add("square");
    sqr.classList.add("d-flex");
    sqr.classList.add("d-f-just-center");
    sqr.classList.add("d-f-vert-align-center");
    sqr.classList.add("fw-bold");
    sqr.classList.add("fs-p");
    sqr.classList.add("trans-all-0_2s-linear");
    sqr.classList.add("pd-0_5rem");
    sqr.innerText = index;
    sqr.addEventListener("click",UserClickSquare,true);
    document.getElementById("gameContainer").appendChild(sqr);
}

function CleanChildsOfElementById(id){
    const gc = document.getElementById(id);
    gc.innerHTML = '';
}

function IsBomb(index){
    return bombs.indexOf(index) >= 0 ? true : false;
}

function PlaySound(name){
    let sound = new Audio(name);
	sound.play();
}

function UserClickSquare(){
    if(!gameOver){
        const index = parseInt(this.innerText);
        if(IsBomb(index))
            UserClickedBomb(this);
        else
            UserClickedGrass(this);
    }
}

function UserClickedBomb(obj){
    const imgName = bombsImages[GetRandomInt(bombsImages.length-1,0)];
    obj.innerHTML = '<img class="height-100-p" src="../assets/img/'+imgName+'"></img>';
    PlaySound("../assets/sound/bomb.mp3");
    GameOver();
}

function UserClickedGrass(obj){
    const imgName = grassImages[GetRandomInt(grassImages.length-1,0)];
    obj.innerHTML = '<img class="height-100-p" src="../assets/img/'+imgName+'"></img>';
    PlaySound("../assets/sound/grass.wav");
    points+=10;
    obj.removeEventListener("click", UserClickSquare, true);
}

function ChoseBombPositions(numSquare){
    bombs.length = 0;
    for(let i=0; i<numberOfBomb; i++){
        let pos = GetRandomInt(numSquare*numSquare,1);
        if(bombs.indexOf(pos)<0)
            bombs.push(pos);
        else
            i--;
    }
}

/**
 * Function that will generate a random int
 * @param {bigint} max Max value of the interval
 * @param {bigint} min Min value of the interval
 * @returns {bigint} Generated random int value
 */
function GetRandomInt(max,min) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1) + min);
}

function GameOver(){
    gameOver = true;
    console.log("Game over! Points: "+points);
    backgroundMusic.pause();

    document.getElementById("gameResultText").innerText = GetResultString();
    document.getElementById("gameResult").classList.remove("d-none");
    document.getElementById("gameResultScore").innerText = points;
    document.getElementById("gameResultDuration").innerText = GetDurationInSeconds();
}

function DefineBackgroundMusic(){
    backgroundMusic = new Audio("../assets/sound/music_background.mp3");
    backgroundMusic.loop = true;
    backgroundMusic.play();
}

function GetResultString(){
    let res = '';
    if(points<(10*(numSquare*numSquare - numberOfBomb)))
        res = resultLose[GetRandomInt(resultLose.length-1,0)];
    else
        res = resultWin[GetRandomInt(resultWin.length-1,0)];
    return res;
}

function GetDurationInSeconds(){
    let timeEnd = new Date();
    let sec = Math.floor((timeEnd-timeStart)/1000);
    let min = 0;
    let hours = 0;
    while(sec>=60){
        sec-=60;
        min++;
        if(min>=60){
            min-=60;
            hours++;
        }
    }
    return hours + " h " + min + " m " + sec + " s";
}