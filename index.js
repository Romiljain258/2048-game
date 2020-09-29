let block = document.getElementById("block");
let scoreDis = document.getElementById('score');
let win = document.getElementById('win');
let loose = document.getElementById('loose');

let arrOfNum=[];
let score=0;

for (let i = 0; i < 4; i++) {
    let row = document.createElement('div');
    row.style.height = "52px";

    for (let i = 0; i < 4; i++) {
        let column = document.createElement('div');
        column.textContent = ' ';
        column.style.verticalAlign='top'; //now it will not come down
        arrOfNum.push(column);
        column.setAttribute('class', 'foo');
        row.appendChild(column);
    }
    block.appendChild(row);
}

//generate two random number
function generateNum(){
   let number = Math.floor(Math.random()*arrOfNum.length);
   if(arrOfNum[number].textContent == ' '){
       arrOfNum[number].textContent = 2;
       youLoose();
   }
   else{
    generateNum();
   }
}
generateNum();
generateNum();

//swipe Left
function swipeLeftSide(){
    for(let i=0;i<16;i++){
       if( i%4===0 ){
          let firstCol = arrOfNum[i].textContent;
          let secCol = arrOfNum[i+1].textContent;
          let thirdCol = arrOfNum[i+2].textContent;
          let fourthCol = arrOfNum[i+3].textContent;
       
          //array of 4 column in row
          let rowEle = [parseInt(firstCol), parseInt(secCol), parseInt(thirdCol), parseInt(fourthCol)];

          let filterVal = rowEle.filter(val=>val>=2);

          let insertZero = 4 - filterVal.length;

          //making new empty array & fill 0, for rest blocks.
          let arrayOfzero = Array(insertZero).fill(' ');
          
          let finalArr = filterVal.concat(arrayOfzero);
        // console.log(finalArr);

          arrOfNum[i].textContent = finalArr[0];
          arrOfNum[i+1].textContent = finalArr[1];
          arrOfNum[i+2].textContent = finalArr[2];
          arrOfNum[i+3].textContent = finalArr[3];
       }
    }
}

//swipe Right
function swipeRightSide(){
     for(let i=0;i<16;i++){
        if( i%4===0 ){
           let firstCol = arrOfNum[i].textContent;
           let secCol = arrOfNum[i+1].textContent;
           let thirdCol = arrOfNum[i+2].textContent;
           let fourthCol = arrOfNum[i+3].textContent;
        
           //array of 4 column in row
           let rowEle = [parseInt(firstCol), parseInt(secCol), parseInt(thirdCol), parseInt(fourthCol)];

           let filterVal = rowEle.filter(val=>val>=2);

           let insertZero = 4 - filterVal.length;

           //making new empty array & fill 0, for rest blocks.
           let arrayOfzero = Array(insertZero).fill(' ');
           
           let finalArr = arrayOfzero.concat(filterVal);
        //    console.log(finalArr);

           arrOfNum[i].textContent = finalArr[0];
           arrOfNum[i+1].textContent = finalArr[1];
           arrOfNum[i+2].textContent = finalArr[2];
           arrOfNum[i+3].textContent = finalArr[3];
        }
     }
}

//swipe down
function swipeDownSide(){
    let size=4;
     for(let i=0;i<4;i++){
        let firstCol = arrOfNum[i].textContent;
        let secCol = arrOfNum[i+size].textContent;
        let thirdCol = arrOfNum[i+(size*2)].textContent;
        let fourthCol = arrOfNum[i+(size*3)].textContent;

        let rowEle = [parseInt(firstCol), parseInt(secCol), parseInt(thirdCol), parseInt(fourthCol)];

        let filterVal = rowEle.filter(val=>val>=2);

        let insertZero = 4 - filterVal.length;

        //making new empty array & fill 0, for rest blocks.
        let arrayOfzero = Array(insertZero).fill(' ');
        
        let finalArr = arrayOfzero.concat(filterVal);
     //    console.log(finalArr);

        arrOfNum[i].textContent = finalArr[0];
        arrOfNum[i+size].textContent = finalArr[1];
        arrOfNum[i+(size*2)].textContent = finalArr[2];
        arrOfNum[i+(size*3)].textContent = finalArr[3];
     }
}

//swipe Up
function swipeUpSide(){
    let size=4;
     for(let i=0;i<4;i++){
        let firstCol = arrOfNum[i].textContent;
        let secCol = arrOfNum[i+size].textContent;
        let thirdCol = arrOfNum[i+(size*2)].textContent;
        let fourthCol = arrOfNum[i+(size*3)].textContent;

        let rowEle = [parseInt(firstCol), parseInt(secCol), parseInt(thirdCol), parseInt(fourthCol)];

        let filterVal = rowEle.filter(val=>val>=2);

        let insertZero = 4 - filterVal.length;

        //making new empty array & fill 0, for rest blocks.
        let arrayOfzero = Array(insertZero).fill(' ');
        
        let finalArr = filterVal.concat(arrayOfzero);
     //    console.log(finalArr);

        arrOfNum[i].textContent = finalArr[0];
        arrOfNum[i+size].textContent = finalArr[1];
        arrOfNum[i+(size*2)].textContent = finalArr[2];
        arrOfNum[i+(size*3)].textContent = finalArr[3];
     }
}


function combineRow(){
     for(let i=0;i<15;i++){
        if(arrOfNum[i].textContent===arrOfNum[i+1].textContent && arrOfNum[i].textContent!=' ' && arrOfNum[i+1].textContent!=' '){
            let sum= parseInt(arrOfNum[i].textContent)+ parseInt(arrOfNum[i+1].textContent);
            arrOfNum[i].textContent = sum;
            arrOfNum[i+1].textContent = ' ';
            score=score+sum;
            scoreDis.innerHTML=score;
        }
     }
     checkForWin();
}

function combineColumn(){
    let size=4;
    for(let i=0;i<12;i++){
       if(arrOfNum[i].textContent===arrOfNum[i+size].textContent && arrOfNum[i].textContent!=' ' && arrOfNum[i+1].textContent!=' '){
           let sum= parseInt(arrOfNum[i].textContent)+ parseInt(arrOfNum[i+size].textContent);
           arrOfNum[i].textContent = sum;
           arrOfNum[i+size].textContent = ' ';
           score=score+sum;
           scoreDis.innerHTML=score;
       }
    }
    checkForWin();
}


//keys functions
function controls(e){
    if(e.keyCode === 50){ //keyCode info website
        keyRight();
    }
    else if(e.keyCode === 49){
        keyLeft();
    }
    else if(e.keyCode === 51){
        keyUp();
    }
    else if(e.keyCode === 52){
        keyDown();
    }
}
document.addEventListener('keyup',controls);

function keyRight(){
    swipeRightSide();
    combineRow();
    swipeRightSide();
    generateNum();
}

function keyLeft(){
    swipeLeftSide();
    combineRow();
    swipeLeftSide();
    generateNum();
}

function keyDown(){
    swipeDownSide();
    combineColumn();
    swipeDownSide();
    generateNum();
}

function keyUp(){
    swipeUpSide();
    combineColumn();
    swipeUpSide();
    generateNum();
}

//check for win
function checkForWin(){
    for(let i=0;i<arrOfNum.length;i++){
        if(score==2048){
            win.innerHTML="you won";
            document.removeEventListener('keyup',controls);
        }
    }
}

//for loose
function youLoose(){
    let zeros =0;
    for(let i=0;i<arrOfNum.length;i++){
        if(arrOfNum[i].innerHTML==' '){
            zeros++;
        }
    }
    if(zeros===0){
        loose.innerHTML="you Loose";
     // document.removeEventListener('keyup',controls);
    }
}