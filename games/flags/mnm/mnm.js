function preloading (imageArray) 
{ 
    let n = imageArray.length; 
    for (let i = 0; i < n; i++) { 
        let img = new Image(); 
        img.src = imageArray[i]; 
    } 
} 
preloading([ './images/2u.png', './images/2u-1.png', './images/bu.png' , './images/bu-1.png' , './images/cu.png' , './images/cu-1.png' , './images/d.png' , './images/d-1.png' , './images/end.png' , './images/s.png' , './images/s-1.png' , './images/s2u.png' , './images/s2u-1.png' , './images/sbu.png' , './images/sbu-1.png' , './images/scu.png' , './images/scu-1.png' , './images/win2.gif' , './images/yes.png'])



var i = 0;
var txt = "청기올리지 말고 백기 내려!"; /* The text */
var speed = 50; /* The speed/duration of the effect in milliseconds */

var names = ["청기","백기",""];
var blueAction = ["들어","내려"];
var blueDoubleAction = ["들고","내리고"];
var blueFakeAction = ["들지말고","내리지말고"];
var whiteAction = ["들어","내려"];
var whiteDoubleAction = ["들고","내리고"];
var whiteFakeAction = ["들지말고","내리지말고"];
var sitAction = ["앉아","일어서"];
var sitDoubleAction = ["앉고","일어서고"];
var sitFakeAction = ["앉지말고","일어서지말고"];

var blueflag = 0;
var whiteflag = 0;
var sit = 0;

var missionBlueflag = 0;
var missionWhiteflag = 0;
var missionSit = 0;



// ex) 1. name + action			
//	   2. name + fackaction + othername + action
//     조건 name에 해당하는 flag가 0일때 1번actoin만 가능 , 1일때 2번action만 가능
//     


// 처음가능한 미션.
// 1action
// 청기들어
// 백기들어
// 앉아
// 2action
// 청기들고 백기들어
// 청기들고 앉아
// 백기들고 앉아
// fakeaction
// 청기들지말고 백기들어
// 청기들지말고 앉아
// 백기들지말고 청기들어
// 백기들지말고 앉아
// 앉지말고 청기들어
// 앉지말고 백기들어

//청기가 들려있는상태에서가능한 미션.
//1action
//청기내려
//백기들어
//앉아
//청기내리고 백기들어
//청기내리고 앉아
//백기들고 앉아
//



function typeWriter() {
    if (i < txt.length) {
    $("#mission").html($("#mission").html() + txt.charAt(i));
    i++;
    setTimeout(typeWriter, speed);
    }
}


var missionStr = "";
var arrMissionStr = [];
var actionCount = 0;

arrMissionStr.push("앉아");
arrMissionStr.push("청기");


function loop(){


    if (gameOn == 0)
        return;

    drawState();
    $("#characterno").css("display","none");
    $("#characteryes").css("display","none");
    
    $(".playBtn").css("visibility","visible");
    drawState();
    actionCount = 0


    makeNextMission();
    clearInterval(myInterval);
    xEndPlayPos = 185; // 
        myInterval = setInterval(function () {
        draw();
    }, 100) // 10 * x = 15번 호출되면 3초. 1초에 10번 호출됨.  3초에 30번 호출됨
    // 170번 호출되며 되면 됨.
    // 170 / 30 하여 3초 맞춤!
    tikSound.currentTime=0;
    
}


function endTimer(){


    // 271 ~ 630 까지 돌리기
    // 5.98 을 60번 

    /*
    if (alltimeflagval <= 630 ){
        drawAllTimer();
    }
    alltimeflagval = alltimeflagval + 5.98;
    */
    



    if($("#timer").html() - 1 > 0){
        $('#timer').html($("#timer").html() - 1);
        $(".alltime").animate({'right':(-3)+'px'},20)
            .animate({'right':(+3)+'px'},20)
            .animate({'right':(-3)+'px'},20)
            .animate({'right':(+3)+'px'},20)
            .animate({'right':(0)+'px'},20);
    
    }else {
        $('#timer').html(0);
        stop();
    }
    
}

function end(){
    clearInterval(myInterval);
    clearInterval(endtimer);
    clearTimeout(wrongloop);
    gameOn = 0;
    tikSound.pause(); //전체타이머 멈출때 끝남!
    //gameoverSound.play();


    //점수 팝업 띄우기!

    setTimeout(function(){
        $(".startBtn").css("visibility","visible");
    }, 1500);
    


    $(".playBtn").css("visibility","hidden");
    $(".text").html("0");
    $(".outer1").css("animation-name","no");
    $(".outer2").css("animation-name","no");
    $(".outer3").css("animation-name","no");
    $(".outerofouter1").css("animation-name","no");
    $(".outerofouter2").css("animation-name","no");
    $(".outerofouter3").css("animation-name","no");
}

function stop(){
    clearInterval(myInterval);
    clearInterval(endtimer);
    clearTimeout(wrongloop);
    gameOn = 0;
    tikSound.pause(); //전체타이머 멈출때 끝남!
    gameoverSound.play();


    //점수 팝업 띄우기!
    
    setTimeout(function(){
        $("#popvs").show();
    }, 1000);


    $("#point2").html($("#point").html() + "점");

    

    setTimeout(function(){
        $(".startBtn").css("visibility","visible");
    }, 1500);
    


    $(".playBtn").css("visibility","hidden");
    $(".text").html("0");
    $(".outer1").css("animation-name","no");
    $(".outer2").css("animation-name","no");
    $(".outer3").css("animation-name","no");
    $(".outerofouter1").css("animation-name","no");
    $(".outerofouter2").css("animation-name","no");
    $(".outerofouter3").css("animation-name","no");
}

function chung(flag){

    if(flag ==1){
        // 눌린거
        $(".btn_cu").attr("src","https://mnmsoft.co.kr/content/chung/images/btn_cuo.png");
        setTimeout(function(){
            // 안 눌린거
            $(".btn_cu").attr("src","https://mnmsoft.co.kr/content/chung/images/btn_cu.png");
        },100);
    }else{
        // 눌린거
        $(".btn_cd").attr("src","https://mnmsoft.co.kr/content/chung/images/btn_cdo.png");
        setTimeout(function(){
            $(".btn_cd").attr("src","https://mnmsoft.co.kr/content/chung/images/btn_cd.png");
        },100);
    }

    actionCount += 1;
    blueflag = flag
    drawState();

    if(actionKind == 1 && actionCount < 2){
        //console.log("2action 대기 아무것도안함")
    }else{
        //console.log(blueflag + "/" + missionBlueflag);
        //console.log(whiteflag + "/" + missionWhiteflag);
        //console.log(sit + "/" + missionSit);
        if(blueflag == missionBlueflag &&
            whiteflag == missionWhiteflag &&
            sit == missionSit){
                pointup();
                //console.log("포인트업");
            }else{
                wrong();
                //console.log("실패");
            }
        //console.log("다음");
    }
}

function sitf(flag){ 


    if(flag ==1){
        $(".btn_s").attr("src","https://mnmsoft.co.kr/content/chung/images/btn_so.png");
        setTimeout(function(){
            $(".btn_s").attr("src","https://mnmsoft.co.kr/content/chung/images/btn_s.png");
        },100);
    }else{
        $(".btn_u").attr("src","https://mnmsoft.co.kr/content/chung/images/btn_uo.png");
        setTimeout(function(){
            $(".btn_u").attr("src","https://mnmsoft.co.kr/content/chung/images/btn_u.png");
        },100);
    }


    actionCount += 1;
    sit = flag


    drawState();

    if(actionKind == 1 && actionCount < 2){
        //console.log("2action 대기 아무것도안함")
    }else{
        /*
        console.log(blueflag + "/" + missionBlueflag);
        console.log(whiteflag + "/" + missionWhiteflag);
        console.log(sit + "/" + missionSit);
        */
        if(blueflag == missionBlueflag &&
            whiteflag == missionWhiteflag &&
            sit == missionSit){
                pointup();
                //console.log("포인트업");
            }else{
                wrong();
                //console.log("실패");
            }
        //console.log("다음");
    }
}


function bak(flag){

    if(flag ==1){
        $(".btn_bu").attr("src","https://mnmsoft.co.kr/content/chung/images/btn_buo.png");
        setTimeout(function(){
            $(".btn_bu").attr("src","https://mnmsoft.co.kr/content/chung/images/btn_bu.png");
        },100);
    }else{
        $(".btn_bd").attr("src","https://mnmsoft.co.kr/content/chung/images/btn_bdo.png");
        setTimeout(function(){
            $(".btn_bd").attr("src","https://mnmsoft.co.kr/content/chung/images/btn_bd.png");
        },100);
    }

    actionCount += 1;
    whiteflag = flag

    drawState();

    if(actionKind == 1 && actionCount < 2){
        //console.log("2action 대기 아무것도안함")
    }else{
        /*
        console.log(blueflag + "/" + missionBlueflag);
        console.log(whiteflag + "/" + missionWhiteflag);
        console.log(sit + "/" + missionSit);
        */
        if(blueflag == missionBlueflag &&
            whiteflag == missionWhiteflag &&
            sit == missionSit){
                pointup();
                //console.log("포인트업");
            }else{
                wrong();
                //console.log("실패");
                
            }
        //console.log("다음");
    }
}

function drawState(){
    var state = blueflag + "" + sit + "" + whiteflag;
    //console.log(state);
    switch(state){
        case "000" :  //기본자세
            $("#character").attr("src","https://mnmsoft.co.kr/content/chung/images/d.png");
            break;
        case "100" :  // 청기듬
            $("#character").attr("src","https://mnmsoft.co.kr/content/chung/images/cu.png");
            break;
        case "010" :  // 앉음
            $("#character").attr("src","https://mnmsoft.co.kr/content/chung/images/s.png");
            break;
        case "001" :   // 백기듬
            $("#character").attr("src","https://mnmsoft.co.kr/content/chung/images/bu.png");
            break;
        case "110" :   // 앉고 청기듬
            $("#character").attr("src","https://mnmsoft.co.kr/content/chung/images/scu.png");
            break;
        case "011" :   // 앉고 백기듬
            $("#character").attr("src","https://mnmsoft.co.kr/content/chung/images/sbu.png");
            break;
        case "101" :   // 청기 백기 듬
            $("#character").attr("src","https://mnmsoft.co.kr/content/chung/images/2u.png");
            break;
        case "111" :   // 앉고 청기 백기 듬
            $("#character").attr("src","https://mnmsoft.co.kr/content/chung/images/s2u.png");
            break;
        default : 
            break;
    }
}


function nextPlay(flag){


    clearInterval(myInterval);


    if (flag == 1){
        setTimeout(function(){
            loop();
        }, 1500);
    }else{
        setTimeout(function(){
            loop();
        }, 2000);
    }

}

function pointup(){

    
    $("#characteryes").css("display","");

    $("#point").html(parseInt($("#point").html(),10) + 1);
    successSound.play();
    //키입력 막고 다음이 될때 까지 기다림!
    clearInterval(myInterval);
    $(".playBtn").css("visibility","hidden");

    nextPlay(1);

}

function wrong(){

    

    $("#characterno").css("display","");
    cry(blueflag + "" + sit + "" + whiteflag);

    wrongSound.play();
    //키입력 막고 다음이 될때 까지 기다림!
    clearInterval(myInterval);
    $(".playBtn").css("visibility","hidden");

    nextPlay(0);

    $(".reouter3").css("animation-name","no");
    $(".reouter2").css("animation-name","no");
    $(".reouter1").css("animation-name","no");

}

function cry(state){
    switch(state){
        case "000" :  //기본자세
            $("#character").attr("src","./images/d-1.png");
            break;
        case "100" :  // 청기듬
            $("#character").attr("src","./images/cu-1.png");
            break;
        case "010" :  // 앉음
            $("#character").attr("src","./images/s-1.png");
            break;
        case "001" :   // 백기듬
            $("#character").attr("src","./images/bu-1.png");
            break;
        case "110" :   // 앉고 청기듬
            $("#character").attr("src","./images/scu-1.png");
            break;
        case "011" :   // 앉고 백기듬
            $("#character").attr("src","./images/sbu-1.png");
            break;
        case "101" :   // 청기 백기 듬
            $("#character").attr("src","./images/2u-1.png");
            break;
        case "111" :   // 앉고 청기 백기 듬
            $("#character").attr("src","./images/s2u-1.png");
            break;
        default : 
            break;
    }
}




function missionChk(){
    
    // 0은 아직 할께 더 있음
    // 1은 성공
    blueflag = missionBlueflag;
    whiteflag = missionWhiteflag;
    sit = missionSit;
    // 2는 실패


}

var actionKind;
function makeNextMission(){
    //console.log("makeNextMission");
    missionStr = "";
    arrMissionStr = [];

    // 1.랜덤 1actoin을 할꺼냐 2action을 할꺼냐 fackaction을 할꺼냐 3가지중 한가지 선택
    var myRandom = Math.random();
    actionKind = Math.floor( myRandom * 3 )
    //console.log(actionKind);

    // 2.name을 청기를 할꺼냐 백기를 할꺼냐 앉아일어서를 할꺼냐 선택
    var nameIdx = Math.floor( myRandom * 3 )
    missionStr = names[nameIdx];

    if (names[nameIdx] != ""){
        arrMissionStr.push(names[nameIdx]);
    }
    


    //미션값을 현생타로 변경후에 새로운 미션을 한다.
    missionBlueflag = blueflag
    missionWhiteflag = whiteflag
    missionSit = sit



    makeActionStr(nameIdx,actionKind); //전역변수 missionStr 를 세팅하고 필요한 변수를 세팅한다.
    
    //console.log(missionStr + ":" + missionBlueflag + "/" + missionWhiteflag +"/" + missionSit + "현상태 : " + blueflag + "/" + whiteflag + "/" + sit);

    txt = missionStr;
    
    //미션칸 초기화
    $("#mission").html("");
    i = 0;
    typeWriter();
    speech();

    /*
    blueflag = missionBlueflag;
    whiteflag = missionWhiteflag;
    sit = missionSit;
    */

}

function speech(){
    //첫마디만 말함. 나머진 이벤트로!
    if (arrMissionStr.length >= 1){
        if (arrMissionStr[0] != ""){
            eval(arrMissionStr[0]).play();
        }
        arrMissionStr.shift();
    }			
}

function makeActionStr(nameIdx,actionKind){
    var nameIdx2
    // 문자열 종류에 따른 switch 문을 1차로 호출하고 내부에서 2차 이름에 따른 switch문 호출
    switch(actionKind){
        case 0 : 
            makeActionStrLast(nameIdx);
            break;
        case 1 :
            makeActionStrDouble(nameIdx);
            nameIdx2 = secondName(nameIdx)
            makeActionStrLast(nameIdx2);
            break;
        case 2 :
            makeActionStrFake(nameIdx);
            nameIdx2 = secondName(nameIdx)
            makeActionStrLast(nameIdx2);
            break;
        default : 
            break;
    }
}

function secondName(nameIdx){
    //랜덤으로 0,1의 숫자를 가져와서
    //남은 name 배열중에 0이면 배열앞에꺼 , 1이면 배열 뒤에꺼를 고른다.
    var myRandom = Math.random();
    var tempNameIdx = Math.floor( myRandom * 2 )
    switch(nameIdx){
        case 0 : 
            if(tempNameIdx == 0){
                nameIdx = 1
            }else{
                nameIdx = 2
            }
            break;
        case 1 :
            if(tempNameIdx == 0){
                nameIdx = 0
            }else{
                nameIdx = 2
            }						
            break;
        case 2 :
            if(tempNameIdx ==0){
                nameIdx = 0
            }else{
                nameIdx = 1
            }						
            break;
        default : 
            break;
    }
    missionStr = missionStr + " " + names[nameIdx];
    if (names[nameIdx] != ""){
        arrMissionStr.push(names[nameIdx]);
    }
    return nameIdx;
}


// 문자열 처리 함수는 3종료
// 중간문자,fake문자,마지막문자 를 만드는 함수.
// 1Action 은 무조건 마지막 문자를 만드는 함수만 호출
// 중간문자,마지막문자를 세팅하는건 해당 체크 flag 를 변경


// 마지막 처리 함수
function makeActionStrLast(nameIdx){
    switch(nameIdx){
        case 0 :
            if (blueflag == 0){
                missionStr = missionStr + blueAction[0];
                arrMissionStr.push(blueAction[0]);
                missionBlueflag = 1;
            }else{
                missionStr = missionStr + blueAction[1];
                arrMissionStr.push(blueAction[1]);
                missionBlueflag = 0;
            }
            break;
        case 1 :
            if (whiteflag == 0){
                missionStr = missionStr + whiteAction[0];
                arrMissionStr.push(whiteAction[0]);
                missionWhiteflag = 1;
            }else{
                missionStr = missionStr + whiteAction[1];
                arrMissionStr.push(whiteAction[1]);
                missionWhiteflag = 0;
            }
            break;
        case 2 :
            if (sit == 0){
                missionStr = missionStr + sitAction[0];
                arrMissionStr.push(sitAction[0]);
                missionSit = 1;
            }else{
                missionStr = missionStr + sitAction[1];
                arrMissionStr.push(sitAction[1]);
                missionSit = 0;
            }						
            break;
        default : 
            break;
    }
}

// 2action 연결문자를 만드는 함수
function makeActionStrDouble(nameIdx){
    switch(nameIdx){
        case 0 :
            if (blueflag == 0){
                missionStr = missionStr +  blueDoubleAction[0];
                arrMissionStr.push(blueDoubleAction[0]);
                missionBlueflag = 1;
            }else{
                missionStr = missionStr +  blueDoubleAction[1];
                arrMissionStr.push(blueDoubleAction[1]);
                missionBlueflag = 0;
            }
            break;
        case 1 :
            if (whiteflag == 0){
                missionStr = missionStr +  whiteDoubleAction[0];
                arrMissionStr.push(whiteDoubleAction[0]);
                missionWhiteflag = 1;
            }else{
                missionStr = missionStr +  whiteDoubleAction[1];
                arrMissionStr.push(whiteDoubleAction[1]);
                missionWhiteflag = 0;
            }
            break;
        case 2 :
            if (sit == 0){
                missionStr = missionStr +  sitDoubleAction[0];
                arrMissionStr.push(sitDoubleAction[0]);
                missionSit = 1;
            }else{
                missionStr = missionStr +  sitDoubleAction[1];
                arrMissionStr.push(sitDoubleAction[1]);
                missionSit = 0;
            }						
            break;
        default : 
            break;
    }
}

// fake 연결문자를 만드는 함수 , checkFlag 를 변경하지 않는다!
function makeActionStrFake(nameIdx){
    
    switch(nameIdx){
        case 0 :
            if (blueflag == 0){
                missionStr = missionStr +  blueFakeAction[0];
                arrMissionStr.push(blueFakeAction[0]);
            }else{
                missionStr = missionStr +  blueFakeAction[1];
                arrMissionStr.push(blueFakeAction[1]);
            }
            break;
        case 1 :
            if (whiteflag == 0){
                missionStr = missionStr +  whiteFakeAction[0];
                arrMissionStr.push(whiteFakeAction[0]);
            }else{
                missionStr = missionStr +  whiteFakeAction[1];
                arrMissionStr.push(whiteFakeAction[1]);
            }
            break;
        case 2 :
            if (sit == 0){
                missionStr = missionStr +  sitFakeAction[0];
                arrMissionStr.push(sitFakeAction[0]);
            }else{
                missionStr = missionStr +  sitFakeAction[1];
                arrMissionStr.push(sitFakeAction[1]);
            }						
            break;
        default : 
            break;
    }
    
}
