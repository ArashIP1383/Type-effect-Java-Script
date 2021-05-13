const typer = document.getElementsByTagName("TYPEEFFECT")[0]

let texts 
let index = -1;
let currentString;
let letters = "";
let fontsize;
let fontwaight;
let fontfamily;

let word = typer.getAttribute('words');
let speedTypeAT = typer.getAttribute('speed-type');
let speedEraserAT = typer.getAttribute('spedd-erase');
let waitTypeAT = typer.getAttribute('wait-type');
let waitEraseAT = typer.getAttribute('wait-erase');
let waitStartAT = typer.getAttribute('wait-start');
let blinkSpeedAT = typer.getAttribute('speed-blink');

let speedType = 100;
let speedErase = 50;
let waitErase = 1000;
let waitType = 1000;
let waitStart = 1000;
let blinkSpeed;

const timer = ms => new Promise(res => setTimeout(res, ms));

async function variables(){
    if(typer != null){
        typer.style.display = "inline-block"
        fontsize = typer.style.fontSize;
        fontwaight = typer.style.fontWeight;
        fontfamily = typer.style.fontFamily;
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
            width: 3px;
            font-family: ${fontfamily}
            font-waight: ${fontwaight}px
            font-size: ${fontsize}px !important;
            animation: blink ${blinkSpeed}s infinite;
        }
        @keyframes blink{
            0%{background-color: white;}
            50%{background: transparent;}
            100%{background-color: black;}
        }`
    }else{
        animation = `.typecrow{
            display: inline-block;
            font-weight: bold;
            margin-right: 0.1rem;
            margin-left: 0.1rem;
            width: 3px;
            font-size: ${fontsize}px !important;
            animation: none;
            background-color: black;
        }`
    }
    style.innerHTML = animation;
    document.head.appendChild(style);
}


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
        typer.innerHTML = `<span>${letters}</span>` 
        typer.innerHTML += `<span class="typecrow">&nbsp;</span>`
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
        typer.innerHTML = `<span>${letters}</span>` 
        typer.innerHTML += `<span class="typecrow">&nbsp;</span>`
        style(false)
        await timer (speedErase);
        if(letters === ""){
            style(true);
            await timer(waitType);
            type();
        }
    }
}

document.addEventListener('DOMContentLoaded', async() =>{
    variables()
    style(true)
    await timer(waitStart)
    type()
})
