var gameOn;
var myInterval;
var endtimer;
var wrongloop;
var tikSound = document.getElementById("tiksound");
var gameoverSound = document.getElementById("gameoversound");
var wrongSound = document.getElementById("wrongsound");
var successSound = document.getElementById("successsound");


var 청기 = document.getElementById("청기");
var 백기 = document.getElementById("백기");
var 들어 = document.getElementById("들어");
var 내려 = document.getElementById("내려");
var 들고 = document.getElementById("들고");
var 내리고 = document.getElementById("내리고");
var 들지말고 = document.getElementById("들지말고");
var 내리지말고 = document.getElementById("내리지말고");
var 앉아 = document.getElementById("앉아");
var 일어서 = document.getElementById("일어서");
var 앉고 = document.getElementById("앉고");
var 일어서고 = document.getElementById("일어서고");
var 앉지말고 = document.getElementById("앉지말고");
var 일어서지말고 = document.getElementById("일어서지말고");



window.addEventListener('pagehide', function(){
    end();
});
document.addEventListener('webkitvisibilitychange', function(){
    end();
});
document.addEventListener('visibilitychange', function(){
    end();
});

function init(){


    
    $(".startBtn").css("visibility","hidden");
    $(".playBtn").css("visibility","visible");
    $("#character").attr("src","./images/d.png");
    blueflag = 0;
    whiteflag = 0;
    sit = 0;
    $("#point").html(0);
    $('#timer').html(5);
    gameOn = 1;

    alltimeflagval = 271;
    endtimer = setInterval(endTimer, 1000);
    $(".outer1").css("animation-name","spin1");
    $(".outer2").css("animation-name","spin2");
    $(".outer3").css("animation-name","spin3");
    $(".outerofouter1").css("animation-name","spin1");
    $(".outerofouter2").css("animation-name","spin2");
    $(".outerofouter3").css("animation-name","spin3");
    tikSound.play();
    loop();

}