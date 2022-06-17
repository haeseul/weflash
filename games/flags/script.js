;( () => {
    'use strict'
  
    const get = (target) => document.querySelector(target)

    var idx = 0
    var text = "청기 올리지 말고 백기 내려"
    var speed = 50

    var gameOn
    var myInterval
    var endtimer
    var wrongloop

    const $startButton = get('.start_button')
    const $startModal = get('.start')
    const $endMask = get('.end_mask')
    const $endModal = get('.end')
    const $endPoint = get('.end_point')
    const $restartButton = get('.restart_button')
    const $point = get('.point')
    const $time = get('.time')
    const $playBtns = get('.playBtns')
    const $statement = get('.statement')
    const $result = get('.result')
    const $resultImg = get('.result_img')
    const $progressbar = get('.progressbar')
    const $bar = get('.bar')
    const $char = get('.char')
    const $flags = get('.flags')
    const $blue_flag = get('.blue_flag')
    const $white_flag = get('.white_flag')

    const $btnBlueUp = get('.btn_blue_up')
    const $btnStand = get('.btn_stand')
    const $btnWhiteUp = get('.btn_white_up')
    const $btnBlueDown = get('.btn_blue_down')
    const $btnSit = get('.btn_sit')
    const $btnWhiteDown = get('.btn_white_down')

    const names = ["청기","백기",""];
    const blueAction = ["들어","내려"];
    const blueDoubleAction = ["들고","내리고"];
    const blueFakeAction = ["들지말고","내리지말고"];
    const whiteAction = ["들어","내려"];
    const whiteDoubleAction = ["들고","내리고"];
    const whiteFakeAction = ["들지말고","내리지말고"];
    const sitAction = ["앉아","일어서"];
    const sitDoubleAction = ["앉고","일어서고"];
    const sitFakeAction = ["앉지말고","일어서지말고"];

    var blueflag = 0;
    var whiteflag = 0;
    var sitflag = 0;

    var act
    var statementBlueflag 
    var statementWhiteflag 
    var statementSit 

    var statementStr 
    var arrstatementStr 
    var actCount

    const $progress = get('.progress')
    const ctx = $progress.getContext('2d')

    var x = 15
    var y = 30
    var xMax = 185
    var playing = 185
    var r = 10
    var startAngle = (Math.PI / 180) * 90
    var endAngle = (Math.PI / 180) * 270

    const progBar = () => {
        ctx.beginPath()
        ctx.arc(x, y, r, startAngle, endAngle, false)
        ctx.arc(xMax, y, r, endAngle, startAngle, false)
        ctx.lineTo(x, y+r)
        ctx.fillStyle = "rgb(255, 255, 255)"
        ctx.fill()
        ctx.closePath()

        if (1 < playing) {
            ctx.beginPath()
            ctx.arc(x, y, r, startAngle, endAngle, false)
            ctx.arc(playing, y, r, endAngle, startAngle, false)
            ctx.lineTo(x, y+r)
            ctx.fillStyle = "rgba(0, 97, 132, 0.511)"
            ctx.fill()
            ctx.closePath()
        } else {
            wrong()
        }

        // 테두리
        // ctx.beginPath()
        // ctx.arc(x, y, r+1, startAngle, endAngle, false)
        // ctx.arc(xMax, y, r+1, endAngle, startAngle, false)
        // ctx.lineTo(x, y+r+1)
        // ctx.lineWidth = 1
        // ctx.strokeStyle = "rgb(128,128,128)"
        // ctx.stroke()
        // ctx.closePath()

        // 명암
        ctx.beginPath()
        ctx.arc(25, 27, 3, startAngle, endAngle, false)
        ctx.arc(35, 27, 3, endAngle, startAngle, false)
        ctx.lineTo(25, 27 + 3)
        ctx.fillStyle = "rgba(215, 238, 247, 0.5)"
        ctx.fill()
        ctx.closePath()

        ctx.beginPath()
        ctx.arc(45, 27, 3, startAngle, endAngle, false)
        ctx.arc(ctx.canvas.width - 25, 27, 3, endAngle, startAngle, false)
        ctx.lineTo(45, 27 + 3)
        ctx.fillStyle = "rgba(215, 238, 247, 0.5)"
        ctx.fill()
        ctx.closePath()

        playing -= 6.16
    }

    const playNext = (flag) => {
        clearInterval(myInterval)

        if(flag == 1) {
            setTimeout(() => {
                loop()
            }, 1500);
        } else {
            setTimeout(() => {
                loop()
            }, 2000);
        }
    }

    const pointUp = () => {
        $resultImg.classList.remove('wrong')
        $resultImg.classList.add('correct')
        $result.style.visibility = "visible"
        $statement.style.visibility = "hidden"

        $point.innerText = parseInt($point.innerText, 10) + 1
        clearInterval(myInterval)
        $playBtns.style.visibility = "hidden"

        playNext(1)
    }

    const wrong = () => {
        $resultImg.classList.remove('add')
        $resultImg.classList.add('wrong')
        $result.style.visibility = "visible"
        $statement.style.visibility = "hidden"

        clearInterval(myInterval)
        $playBtns.style.visibility = "hidden"

        playNext(0)
    }


    const blue = (flag) => {
        actCount += 1
        blueflag = flag
        draw()

        if (act == 1 && actCount < 2) {
            console.log("2action 대기")
        } else {
            if (blueflag == statementBlueflag &&
                whiteflag == statementWhiteflag &&
                sitflag == statementSit) {
                    pointUp()
                    console.log("point++")
            } else {
                wrong()
                console.log("wrong")
            } 
        }
    }

    const white = (flag) => {
        actCount += 1
        whiteflag = flag
        draw()

        if (act == 1 && actCount < 2) {
            console.log("2action 대기")
        } else {
            if (blueflag == statementBlueflag &&
                whiteflag == statementWhiteflag &&
                sitflag == statementSit) {
                    pointUp()
                    console.log("point++")
            } else {
                wrong()
                console.log("wrong")
            } 
        }
    }

    const sit = (flag) => {
        actCount += 1
        sitflag = flag
        draw()

        if (act == 1 && actCount < 2) {
            console.log("2action 대기")
        } else {
            if (blueflag == statementBlueflag &&
                whiteflag == statementWhiteflag &&
                sitflag == statementSit) {
                    pointUp()
                    console.log("point++")
            } else {
                wrong()
                console.log("wrong")
            } 
        }
    }


    const draw = () => {
        var state = blueflag + "" + sitflag + "" + whiteflag

        switch (state) {
            case "000": // 기본
                $char.src = "./images/char_up.png"
                $blue_flag.classList.remove('click')
                $white_flag.classList.remove('click')
                break;
            case "100": // 청기 up
                $char.src = "./images/char_up.png"
                $blue_flag.classList.add('click')
                $white_flag.classList.remove('click')
                break
            case "010": // 앉음
                $char.src = "./images/char_down.png"
                $blue_flag.classList.remove('click')
                $white_flag.classList.remove('click')
                break
            case "001": // 백기 up
                $char.src = "./images/char_up.png"
                $blue_flag.classList.remove('click')
                $white_flag.classList.add('click')
                break
            case "110": // 앉고 청기 up
                $char.src = "./images/char_down.png"
                $blue_flag.classList.add('click')
                $white_flag.classList.remove('click')
                break
            case "011": // 앉고 백기 up
                $char.src = "./images/char_down.png"
                $blue_flag.classList.remove('click')
                $white_flag.classList.add('click')
                break
            case "101": // 청기 up 백기 up
                $char.src = "./images/char_up.png"
                $blue_flag.classList.add('click')
                $white_flag.classList.add('click')
                break
            case "111": // 청기 up 앉고 백기 up
                $char.src = "./images/char_down.png"
                $blue_flag.classList.add('click')
                $white_flag.classList.add('click')
                break
            default:
                break;
        }
    }

    // 선택 안 된 name 고르기
    const nextName = (name) => {
        var rand = Math.random()
        var next = Math.floor(rand * 2)
        switch (name) {
            case 0:
                if (next == 0) {
                    name = 1
                } else {
                    name = 2
                }
                break;
            case 1:
                if (next == 0) {
                    name = 0
                } else {
                    name = 2
                }
                break;
            case 2:
                if (next == 0) {
                    name = 0
                } else {
                    name = 1
                }
                break;
            default:
                break;
        }

        statementStr = statementStr + " " + names[name]
        if (names[name] != "") {
            arrstatementStr.push(names[name])
        }
        return name
    }

    // statement action 맨 뒤 처리
    const makeLastAction = (name) => {
        switch (name) {
            case 0:
                if (blueflag == 0){
                    statementStr += blueAction[0];
                    arrstatementStr.push(blueAction[0]);
                    statementBlueflag = 1;
                }else{
                    statementStr += blueAction[1];
                    arrstatementStr.push(blueAction[1]);
                    statementBlueflag = 0;
                }
                break;
            case 1 :
                if (whiteflag == 0){
                    statementStr += whiteAction[0];
                    arrstatementStr.push(whiteAction[0]);
                    statementWhiteflag = 1;
                }else{
                    statementStr += whiteAction[1];
                    arrstatementStr.push(whiteAction[1]);
                    statementWhiteflag = 0;
                }
                break;
            case 2 :
                if (sitflag == 0){
                    statementStr += sitAction[0];
                    arrstatementStr.push(sitAction[0]);
                    statementSit = 1;
                }else{
                    statementStr += sitAction[1];
                    arrstatementStr.push(sitAction[1]);
                    statementSit = 0;
                }						
                break;
        
            default:
                break;
        }
    }

    // 2 action 연결문자 만들기
    const makeDoubleAction = (name) => {
        switch(name){
            case 0 :
                if (blueflag == 0){
                    statementStr +=  blueDoubleAction[0];
                    arrstatementStr.push(blueDoubleAction[0]);
                    statementBlueflag = 1;
                }else{
                    statementStr +=  blueDoubleAction[1];
                    arrstatementStr.push(blueDoubleAction[1]);
                    statementBlueflag = 0;
                }
                break;
            case 1 :
                if (whiteflag == 0){
                    statementStr +=  whiteDoubleAction[0];
                    arrstatementStr.push(whiteDoubleAction[0]);
                    statementWhiteflag = 1;
                }else{
                    statementStr +=  whiteDoubleAction[1];
                    arrstatementStr.push(whiteDoubleAction[1]);
                    statementWhiteflag = 0;
                }
                break;
            case 2 :
                if (sitflag == 0){
                    statementStr +=  sitDoubleAction[0];
                    arrstatementStr.push(sitDoubleAction[0]);
                    statementSit = 1;
                }else{
                    statementStr +=  sitDoubleAction[1];
                    arrstatementStr.push(sitDoubleAction[1]);
                    statementSit = 0;
                }						
                break;
            default : 
                break;
        }
    }

    // fake action 만들기 (checkFlag 변경X)
    const makeFakeAction = (name) => {
        switch(name){
            case 0 :
                if (blueflag == 0){
                    statementStr += blueFakeAction[0];
                    arrstatementStr.push(blueFakeAction[0]);
                }else{
                    statementStr += blueFakeAction[1];
                    arrstatementStr.push(blueFakeAction[1]);
                }
                break;
            case 1 :
                if (whiteflag == 0){
                    statementStr += whiteFakeAction[0];
                    arrstatementStr.push(whiteFakeAction[0]);
                }else{
                    statementStr += whiteFakeAction[1];
                    arrstatementStr.push(whiteFakeAction[1]);
                }
                break;
            case 2 :
                if (sitflag == 0){
                    statementStr += sitFakeAction[0];
                    arrstatementStr.push(sitFakeAction[0]);
                }else{
                    statementStr += sitFakeAction[1];
                    arrstatementStr.push(sitFakeAction[1]);
                }						
                break;
            default : 
                break;
        }
    }

    const makeAction = (name, act) => {
        var name2
        switch (act) {
            case 0:
                makeLastAction(name)
                break;
            case 1:
                makeDoubleAction(name)
                name2 = nextName(name)
                makeLastAction(name2)
                break;
            case 2:
                makeFakeAction(name)
                name2 = nextName(name)
                makeLastAction(name2)
            default:
                break;
        }
    }

    const statementWriter = () => {
        if (idx < text.length) {
            $statement.innerText = $statement.innerText + text.charAt(idx)
            idx += 1
            setTimeout(statementWriter, speed)
        }
    }
    
    const makeStatement = () => {
        statementStr = ""
        arrstatementStr = []

        // 1 action, 2 action, fake action 중 선택
        var rand = Math.random()
        act = Math.floor(rand * 3)
        
        // 청기, 백기, 앉아 중 선택
        var name = Math.floor(rand * 3)
        statementStr = names[name]

        if (names[name] != "" ){
            arrstatementStr.push(names[name])
        }

        // 현 상태로 statement 변경
        statementBlueflag = blueflag
        statementWhiteflag = whiteflag
        statementSit = sitflag
        makeAction(name, act)
        text = statementStr

        // statement 초기화
        $statement.innerText = ""
        idx = 0
        statementWriter()

    }

    const loop = () => {
        if (gameOn == 0) {
            return
        }

        draw()

        $result.style.visibility = "hidden"
        $statement.style.visibility = "visible"
        $playBtns.style.visibility = "visible"
        draw()
        actCount = 0

        makeStatement()
        clearInterval(myInterval)

        playing = 185
        myInterval = setInterval(() => {
            progBar()
        }, 100);
    }

    const endTimer = () => {
        if ($time.innerText - 1 > 0) {
            $time.innerText -= 1
        } else {
            $time.innerText = 0
            stop()
        }
    }

    const stop = () => {
        clearInterval(myInterval)
        clearInterval(endtimer)
        clearInterval(wrongloop)
        gameOn = 0

        setTimeout(() => {
            $endModal.style.display = 'block'
        }, 1000);

        $endPoint.innerText = $point.innerText + "점"
    }

    const start = () => {
        $startModal.classList.add("hide");
        $playBtns.style.visibility = "visible"

        blueflag = 0
        whiteflag = 0
        sitflag = 0
        $point.innerText = 0
        $time.innerText = 1
        gameOn = 1

        endtimer = setInterval(endTimer, 1000)
        loop()
    }

    const init = () => {
        $startButton.addEventListener('click', () => {
            start()
        })

        $restartButton.addEventListener('click', () => {
            start()
            $endModal.style.display = 'none';
        })

        $endMask.addEventListener('click', () => {
            location.reload()
        })

        $btnBlueUp.addEventListener('click', () => {blue(1)})
        $btnStand.addEventListener('click', () => {sit(0)})
        $btnWhiteUp.addEventListener('click', () => {white(1)})
        $btnBlueDown.addEventListener('click', () => {blue(0)})
        $btnSit.addEventListener('click', () => {sit(1)})
        $btnWhiteDown.addEventListener('click', () => {white(0)})
    }

    init()
})()
