const typer = document.getElementsByTagName("TYPEEFFECT")
const timer = ms => new Promise(res => setTimeout(res, ms));

if(typer != null ){
    for(let b of typer){
        class t {
            constructor(word,waiteraser,waittyper,speedtyper,speederaser){
                //get vaiables {
                    //get words as a string and converted to array
                this.texts = word
                    //index of word array 
                this.indexs = -1
                    //get word from index of array
                this.currenstring = ""
                this.waiteraser = waiteraser
                this.waittyper = waittyper
                this.speedtyper = speedtyper
                this.speederaser = speederaser
                //}
            }
            
            //It is a typer code 
            async typerb() {
                let letter = "";
                let wordArray = this.texts
                if(wordArray.length > this.indexs){
                    this.indexs ++;
                    this.currentstring = wordArray[this.indexs];  
                }
                if(this.indexs >= wordArray.length){
                    this.indexs = 0;
                    this.currentstring = wordArray[this.indexs];
                }
                for(var i = 0; i < wordArray[this.indexs].length; i++){
                    letter += this.currentstring.charAt(i);
                    b.innerHTML = `<span>${letter}</span>` 
                    b.innerHTML += `<span class="typecrow">&nbsp;</span>`
                    style(false);
                    await timer(this.speedtyper);
                    if(letter === this.currentstring){
                        style(true);
                        await timer(this.waittyper);
                        this.eraser()
                    }
                }
                
            }

            async eraser(){
                let letter = "";
                let vb = this.texts
                for(var i = vb[this.indexs].length; i > 0;i--){
                    letter = this.currentstring.substring(0, i-1);
                    b.innerHTML = `<span>${letter}</span>` 
                    b.innerHTML += `<span class="typecrow">&nbsp;</span>`  
                    style(false)
                    await timer (this.speederaser);
                    if(letter === ""){
                        style(true);
                        await timer(this.waittyper);
                        this.typerb()
                    }
                }
            }
            
        }

        class v{
            constructor(word,speedtypeAT,speederaserAT,waittypeAT,waiteraseAT,waitstartAT,blinkspeedAT){
                this.word = word
                this.speedtypeAT = speedtypeAT
                this.speederaserAT = speederaserAT
                this.waiteraseAT = waiteraseAT
                this.waitstartAT = waitstartAT
                this.blinkspeedAT = blinkspeedAT
                this.waittypeAT = waittypeAT
            }

            variables(){
                console.log(b.style.fontFamily)
                let texts;
                let speedType = 100;
                let speedErase = 50;
                let waitErase = 1000;
                let waitType = 1000;
                let waitStart = 1000;
                let blinkSpeed;
                if(this.word != null){
                    texts = JSON.parse("[" + this.word + "]");
                }

                if(this.blinkspeedAT == null){
                    blinkSpeed = 0.5;
                }else blinkSpeed = parseFloat(this.blinkspeedAT);
            
                if(this.speederaserAT !=null){
                    speedErase = parseFloat(this.speederaserAT) ;
                }else if(this.speederaserAT == null && this.speedtypeAT != null){
                    var se = parseFloat(this.speedtypeAT) ;
                    speedErase = Math.abs(se - 40);
                }
                if(this.speedtypeAT != null){
                    speedType = parseFloat(this.speedtypeAT);
                }else if(this.speedtypeAT == null && this.speederaserAT != null){
                    var jooonz = parseFloat(this.speederaserAT) + 40;
                    speedType = jooonz;
                }
                if(this.waittypeAT != null){
                    waitType = parseFloat(this.waittypeAT);
                }else if(this.waittypeAT == null && this.waitstartAT != null){
                    var jooone  = parseFloat(this.waitstartAT);
                    waitType = jooone;
                }else if(this.waittypeAT == null && this.waiteraseAT != null){
                    var jooonr  = parseFloat(this.waiteraseAT);
                    waitType = jooonr;
                } 
                if(this.waitstartAT != null){
                    waitStart = parseFloat(this.waitstartAT);
                }else if(this.waitstartAT == null && this.waittypeAT != null){
                    var jooont  = parseFloat(this.waittypeAT);
                    waitStart = jooont;
                }else if(this.waitstartAT == null && this.waiteraseAT != null){
                    var jooony  = parseFloat(this.waiteraseAT);
                    waitStart = jooony;
                }
                if(this.waiteraseAT != null){
                    waitErase = parseFloat(this.waiteraseAT);
                }else if(this.waiteraseAT == null && this.waitstartAT != null){
                    var jooonu  = parseFloat(this.waitstartAT);
                    waitErase = jooonu;
                }else if(this.waiteraseAT == null && this.waittypeAT != null){
                    var joooni = parseFloat(this.waittypeAT);
                    waitErase = joooni;
                }
                
                let c = new t(texts,waitErase,waitType,speedType,speedErase);
                c.typerb();
            }

        }

        let word 
        let speedTypeAT 
        let speedEraserAT 
        let waitTypeAT 
        let waitEraseAT 
        let waitStartAT 
        let blinkSpeedAT 

        word = b.getAttribute('words');
        speedTypeAT = b.getAttribute('speed-type');
        speedEraserAT = b.getAttribute('spedd-erase');
        waitTypeAT = b.getAttribute('wait-type');
        waitEraseAT = b.getAttribute('wait-erase');
        waitStartAT = b.getAttribute('wait-start');
        blinkSpeedAT = b.getAttribute('speed-blink');
        let vari = new v(word,speedTypeAT,speedEraserAT,waitEraseAT,waitStartAT,blinkSpeedAT)
        vari.variables()
            
        function style(isBlinking){
            b.style.display = "block"
            console.log(b.style.fontSize)
            var style = document.createElement('style');
            var animation;
            if(isBlinking == true) {
                animation = `.typecrow{
                    display: inline-block;
                    font-weight: bold;
                    margin-right: 0.1rem;
                    margin-left: 0.1rem;
                    width: 3px;
                    font-family: ${vari.fontfamily};
                    font-waight: ${vari.fontwaight};
                    font-size: ${vari.fontsize}px !important;
                    animation: blink ${vari.blinkspeedv}s infinite;
                    font-size: ${vari.fontsize}px !important;
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
                    font-family: ${vari.fontfamily};
                    font-waight: ${vari.fontwaight};
                    font-size: ${vari.fontsize}px !important;
                    animation: none;
                    background-color: black;
                }`
            }
            style.innerHTML = animation;
            document.head.appendChild(style);
        }
    }
}