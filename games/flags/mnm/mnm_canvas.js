//console.log("width:" + document.body.clientWidth);
//console.log("height:" + document.body.clientHeight);

//alert("width:" + document.body.clientWidth);
//alert("height:" + document.body.clientHeight);

/*

var canvas2 = document.getElementById("canvas2");
var ctx2 = canvas2.getContext('2d');		
ctx2.globalCompositeOperation='destination-over';

var timerimg = new Image();
timerimg.src = "./images/timer.png";
var drawImageXSize = 80;
var drawImageYSize = drawImageXSize * timerimg.height / timerimg.width;
var drawImageXPos = (canvas2.width/2)-(drawImageXSize/2);
var drawImageYPos = (canvas2.height/2)-(drawImageYSize/2);

*/

/*
ctx2.beginPath();
ctx2.drawImage(timerimg,drawImageXPos,drawImageYPos,drawImageXSize,drawImageXSize * timerimg.height / timerimg.width);
ctx2.arc(canvas2.width/2,canvas2.height/2 + 12,29,0,Math.PI*2,false);
ctx2.fillStyle = "rgba(241,93,94,1)";
ctx2.fill();
*/

/*

var alltimeflagval = 271;
function drawAllTimer(){

    ctx2.beginPath();
    ctx2.clearRect(0,0,canvas2.width,canvas2.height);

    ctx2.beginPath();
    ctx2.drawImage(timerimg,drawImageXPos,drawImageYPos,drawImageXSize,drawImageXSize * timerimg.height / timerimg.width);
    ctx2.arc(canvas2.width/2,canvas2.height/2 + 12,29,Math.PI/180*270,Math.PI/180*alltimeflagval,true) // 271 ~ 630
    ctx2.lineTo(canvas2.width/2,canvas2.height/2 + 12);
    ctx2.fillStyle = "rgba(241,93,94,1)";
    ctx2.fill();
}



*/



var canvas = document.getElementById("canvas");
var ctx = canvas.getContext('2d');

var stopflag = 0;
var width;
var xPos = 15;
var yPos = 30;
var xEndPos = 185; //테두리및 안에 모두 지울때 사용
var xEndPlayPos = 185; //시간흐름때 사용.
var rVal = 10;

// canvas 사이즈는 200
// 앞뒤 시작점 15 끝점 15  을 빼면 170!
// 


var framecallCount = 0;


var drawFrame1;
function draw(){


    //안에 빨간색을 모두 흰색으로 칠하기 (지우기)
    
    ctx.beginPath();
    //ctx.clearRect(0,0,canvas.width,canvas.height);
    ctx.arc(xPos, yPos, rVal, (Math.PI / 180) * 90, (Math.PI / 180) * 270, false); // Outer circle
    ctx.arc(xEndPos , yPos, rVal, (Math.PI / 180) * 270, (Math.PI / 180) * 90, false); // Outer circle
    ctx.lineTo(xPos, yPos + rVal);
    ctx.fillStyle = "rgb(255,255,255)";
    ctx.fill();
    ctx.closePath();
    

    if (1 < xEndPlayPos){
    //안에 빨간색
    ctx.beginPath();
    ctx.arc(15, yPos, rVal, (Math.PI / 180) * 90, (Math.PI / 180) * 270, false); // Outer circle
    ctx.arc(xEndPlayPos, yPos, rVal, (Math.PI / 180) * 270, (Math.PI / 180) * 90, false); // Outer circle
    ctx.lineTo(xPos, yPos + rVal);
    ctx.fillStyle = "rgb(241,93,94)";
    ctx.fill();
    ctx.closePath();
    }else{
        wrong();
    }

    //테두리
    ctx.beginPath();
    ctx.arc(xPos, yPos, rVal + 1, (Math.PI / 180) * 90, (Math.PI / 180) * 270, false); // Outer circle
    ctx.arc(xEndPos, yPos, rVal + 1, (Math.PI / 180) * 270, (Math.PI / 180) * 90, false); // Outer circle
    ctx.lineTo(xPos, yPos + rVal + 1);
    ctx.lineWidth = 4;
    ctx.fillStyle = "rgb(0,0,0)";
    ctx.stroke();

    //명암 효과1
    ctx.beginPath();
    ctx.arc(25, 27, 3, (Math.PI / 180) * 90, (Math.PI / 180) * 270, false); // Outer circle
    ctx.arc(35 , 27, 3, (Math.PI / 180) * 270, (Math.PI / 180) * 90, false); // Outer circle
    ctx.lineTo(25, 27 + 3);
    ctx.fillStyle = "rgb(215,238,247)";
    ctx.fill();
    ctx.closePath();

    //명암 효과2
    ctx.beginPath();
    ctx.arc(45, 27, 3, (Math.PI / 180) * 90, (Math.PI / 180) * 270, false); // Outer circle
    ctx.arc(ctx.canvas.width - 25 , 27, 3, (Math.PI / 180) * 270, (Math.PI / 180) * 90, false); // Outer circle
    ctx.lineTo(45, 27 + 3);
    ctx.fillStyle = "rgb(215,238,247)";
    ctx.fill();
    ctx.closePath();

    
    //console.log(xPos + "/" + xEndPlayPos);
    xEndPlayPos = xEndPlayPos - 6.16;


}
