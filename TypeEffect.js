const textshower = document.getElementsByClassName('type')[0];
const textstyle = document.querySelector('.variables');
const typecrow = document.getElementsByClassName('typecrow')[0];
console.log(textstyle);

let word = textstyle.getAttribute('data-words');
let speedTypeAT = textstyle.getAttribute('data-s-t');
let speedEraserAT = textstyle.getAttribute('data-s-e');
let waitTypeAT = textstyle.getAttribute('data-w-t');
let waitEraseAT = textstyle.getAttribute('data-w-e');
let waitStartAT = textstyle.getAttribute('data-w-s');
let blinkSpeedAT = textstyle.getAttribute('data-blink-s');

let texts;
let index = -1;
let currentString;
let letters = "";

let speedType = 100;
let speedErase = 50;
let waitErase = 1000;
let waitType = 1000;
let waitStart = 1000;
let blinkSpeed = 0.5;
let fontsize;
    
const timer = ms => new Promise(res => setTimeout(res, ms));



async function variables(){
    var size = parseFloat(window.getComputedStyle(textstyle,null).getPropertyValue('font-size'));
    fontsize = size ;

    if(typecrow != null){
        typecrow.innerHTML = '&nbsp;';
    }
    if(textshower != null){
        textshower.style.display = "inline-block";
    }
    if(word != null){
        texts = JSON.parse("[" + word + "]");
    }
    if(blinkSpeedAT == null){
        blinkSpeed = 0.5;
    }else blinkSpeed = parseFloat(blinkSpeedAT);

    if(speedEraserAT !=null){
        speedErase = parseFloat(speedEraserAT) ;
    }else if(speedEraserAT == null && speedTypeAT != null){
        var se = parseFloat(speedTypeAT) ;
        speedErase = se - 40;
    }
    if(speedTypeAT != null){
        speedType = parseFloat(speedTypeAT);
    }else if(speedTypeAT == null && speedEraserAT != null){
        var jooonz = parseFloat(speedEraserAT) + 40;
        speedType = jooonz;
    }
    if(waitTypeAT != null){
        waitType = parseFloat(waitTypeAT);
    }else if(waitTypeAT == null && waitStartAT != null){
        var jooone  = parseFloat(waitStartAT);
        waitType = jooone;
    }else if(waitTypeAT == null && waitEraseAT != null){
        var jooonr  = parseFloat(waitEraseAT);
        waitType = jooonr;
    } 
    if(waitStartAT != null){
        waitStart = parseFloat(waitStartAT);
    }else if(waitStartAT == null && waitTypeAT != null){
        var jooont  = parseFloat(waitTypeAT);
        waitStart = jooont;
    }else if(waitStartAT == null && waitEraseAT != null){
        var jooony  = parseFloat(waitEraseAT);
        waitStart = jooony;
    }
    if(waitEraseAT != null){
        waitErase = parseFloat(waitEraseAT);
    }else if(waitEraseAT == null && waitStartAT != null){
        var jooonu  = parseFloat(waitStartAT);
        waitErase = jooonu;
    }else if(waitEraseAT == null && waitTypeAT != null){
        var joooni = parseFloat(waitTypeAT);
        waitErase = joooni;
    }
}

function style(isBlinking){
    var style = document.createElement('style');
    var animation;
    if(isBlinking == true) {
        animation = `.typecrow{
            display: inline-block;
            font-weight: bold;
            margin-right: 0.1rem;
            margin-left: 0.1rem;
            margin-top: 2rem;
            width: 3px;
            font-size: ${fontsize}px !important;
            animation: blink ${blinkSpeed}s infinite;
        }
        
        @keyframes blink{
            0%{background-color: white;}
            50%{background: transparent;}
            100%{background-color: black;}
        }
        
        .type{
            margin-top: 2rem;
        }`; 
    }else{
        animation = `.typecrow{
            display: inline-block;
            font-weight: bold;
            margin-right: 0.1rem;
            margin-left: 0.1rem;
            width: 3px;
            font-size: ${fontsize}px !important;
            animation: none;
            margin-top: 2rem;
            background-color: black;
        }
        
        .type{
            margin-top: 2rem;
        }`;
    }
    style.innerHTML = animation;
    document.head.appendChild(style);
}

//Type function
async function type(){
    if(texts.length > index){
        index++;
        currentString = texts[index];
    }
    if(index >= texts.length){
        index = 0;
        currentString = texts[index];
    }
    for(var i = 0; i < texts[index].length; i++){
        letters += currentString.charAt(i);
        textshower.textContent = letters;
        style(false);
        await timer(speedType);
        if(letters === currentString){
            style(true);
            await timer(waitErase);
            erase();
        }
    }
}

//Erase Function
async function erase(){
    for(var i = texts[index].length; i > 0;i--){
        letters = currentString.substring(0, i-1);
        textshower.textContent = letters;
        style(false);
        await timer (speedErase);
        if(letters === ""){
            style(true);
            await timer(waitType);
            type();
        }
    }
}

//Start listener
document.addEventListener("DOMContentLoaded",async function loader(){
        variables();
        style(true);
        await timer(waitStart);
        type();
    }
);
