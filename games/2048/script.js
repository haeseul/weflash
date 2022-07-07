;( () => {
    'use strict'

    const get = (target) => document.querySelector(target)

    const start_screen = get('#start_screen')
    const game_screen = get('#game_screen')
    const pause_screen = get('#pause_screen')
    const result_screen = get('#result_screen')

    let $score = get('.score')
    const $time = get('.time')
    const $result_score = get('.result_score')
    const $result_time = get('.result_time')

    let timer = null
    let pause = false
    let seconds = 0

    let board = Array(Array(0,0,0,0),Array(0,0,0,0),Array(0,0,0,0),Array(0,0,0,0))
    let score


    // 새로운 숫자 생성
    const generate = () => {
        let count = 0
        for (let i = 0; i < 4; i++) {
            for (let j = 0; j < 4; j++) {
                if (board[i][j] == 0) count++;
            }
        }
        while(true) {
            for (let i = 0; i < 4; i++) {
                for (let j = 0; j < 4; j++) {
                    if (board[i][j] == 0) {
                        let rand = parseInt(Math.random() * count)
                        if (rand == 0) {
                            board[i][j] = choose2or4()
                            return
                        }
                    }
                }
            }
        }
    }


    // table에 표시
    const update = () => {
        for (let i = 0; i < 4; i++) {
            for (let j = 0; j < 4; j++) {
                let cell = document.getElementById(i + '' + j)
                cell.innerHTML = board[i][j]==0 ? '' : board[i][j]
                coloring(cell)
            }
        }
        $score.innerHTML = score
    }

    const coloring = (cell) => {
        let cellNum = parseInt(cell.innerHTML)
        switch (cellNum) {
            case 0:
            case 2: 
                cell.style.background= "#eee4da"
                cell.style.color= "#776e65"
                break;
            case 4: 
                cell.style.background= "#eee1c9"
                cell.style.color= "#776e65"
                break;
            case 8: 
                cell.style.background= "#f3b27a"
                cell.style.color= "#fff"
                break;
            case 16: 
                cell.style.background= "#f69664"
                cell.style.color= "#fff"
                break;
            case 32: 
                cell.style.background= "#f77c5f"
                cell.style.color= "#fff"
                break;
            case 64: 
                cell.style.background= "#f75f3b"
                cell.style.color= "#fff"
                break;
            case 128: 
                cell.style.background= "#edd073"
                cell.style.color= "#776e65"
                break;
            case 256: 
                cell.style.background= "#edcc62"
                cell.style.color= "#776e65"
                break;
            case 512: 
                cell.style.background= "#edc950"
                cell.style.color= "#776e65"
                break;
            case 1024: 
                cell.style.background= "#edc53f"
                cell.style.color= "#776e65"
                break;
            case 2048: 
                cell.style.background= "#edc22e"
                cell.style.color= "#776e65"
                break;
        
            default:
                if (cellNum > 2048) {
                    cell.style.background= "#E51A1A"
                    cell.style.color= "#776e65"
                } else {
                    cell.style.background= "#9e9184"
                    cell.style.color= "#776e65"
                }
                break;
        }
    }

    const choose2or4 = () => {
        // 2가 나올 확률 90%
        const rand = parseInt(Math.random() * 10)
        return (rand == 0)? 4 : 2
    }

    const checkGameOver = () => {
        for(let i=0;i<4;i++){
            let colCheck = board[i][0];
            if(colCheck==0) return;
            for(let j=1;j<4;j++){
                if(board[i][j]==colCheck || board[i][j]==0) return;
                else colCheck = board[i][j];
            }
        }
        for(let i=0;i<4;i++){
            let rowCheck = board[0][i];
            if(rowCheck==0) return;
            for(let j=1;j<4;j++){
                if(board[j][i]==rowCheck || board[j][i]==0) return;
                else rowCheck = board[j][i];
            }
        }

        showResult()
    }

    const rotate = (n) => {
        while(n--) {
            let tmpBoard = Array(Array(0,0,0,0),Array(0,0,0,0),Array(0,0,0,0),Array(0,0,0,0))
            for(let i=0;i<4;i++)
                for(let j=0;j<4;j++)
                    tmpBoard[i][j]=board[i][j];
            for(let i=0;i<4;i++)
                for(let j=0;j<4;j++)
                    board[j][3-i]=tmpBoard[i][j];
        }
    }

    const move = () => {
        let isMoved = false
        let isPlused = Array(Array(0,0,0,0),Array(0,0,0,0),Array(0,0,0,0),Array(0,0,0,0))
        for(let i=1;i<4;i++){
            for(let j=0;j<4;j++){
                if(board[i][j]==0) continue;
                let tempY = i-1;
                while(tempY>0 && board[tempY][j]==0) tempY--;
                if(board[tempY][j]==0){
                    board[tempY][j]=board[i][j];
                    board[i][j]=0;
                    isMoved=true;
                }
                else if(board[tempY][j]!=board[i][j]){
                    if(tempY+1==i) continue;
                    board[tempY+1][j]=board[i][j];
                    board[i][j]=0;
                    isMoved=true;
                }
                else{
                    if(isPlused[tempY][j]==0){
                        board[tempY][j]*=2;
                        score+=board[tempY][j];
                        board[i][j]=0;
                        isPlused[tempY][j]=1;
                        isMoved=true;
                    }
                    else{
                        board[tempY+1][j]=board[i][j];
                        board[i][j]=0;
                        isMoved=true;
                    }
                }
            }
        }
        if (isMoved) generate();
        else checkGameOver();
    }

    
    const keyDownEventHandler = (e) => {
        switch (e.keyCode) {
            case 38: // up
                move();
                break;
            case 40: // down
                rotate(2);
                move();
                rotate(2);
                break;
            case 37: // left
                rotate(1);
                move();
                rotate(3);
                break;
            case 39: // right
                rotate(3);
                move();
                rotate(1);
                break;
        }
        update()
    }

    const showTime = (seconds) => new Date(seconds * 1000).toISOString().substr(11, 8)
    
    const returnStartScreen = () => {
        console.clear()
        clearInterval(timer)
        pause = false
        seconds = 0
        start_screen.classList.add('active')
        game_screen.classList.remove('active')
        pause_screen.classList.remove('active')
        $time.innerHTML = '00:00:00'
        result_screen.classList.remove('active')
    }

    const showResult = () => {
        clearInterval(timer)
        $time.innerHTML = '00:00:00'
        result_screen.classList.add('active')
        $result_score.innerHTML = score
        $result_time.innerHTML = showTime(seconds)
    }

    const init = () => {
        document.onkeydown = keyDownEventHandler
        
        // board 초기화
        score = 0
        seconds = 0

        showTime(seconds)

        timer = setInterval(() => {
            if (!pause) {
                seconds += 1
                $time.innerHTML = showTime(seconds)
            }
        }, 1000);

        for (let i = 0; i < 4; i++) {
            for (let j = 0; j < 4; j++) {
                board[i][j] = 0
            }
        }
        // 2개의 칸 채우기
        for (let i = 0; i < 2; i++) {
            let rand = parseInt(Math.random() * 16);
            let x = rand % 4;
            let y = parseInt(rand / 4);
            if (board[y][x] == 0) board[y][x] = choose2or4();
            else i--;
        }
        update()
    }

    

    get('.start_btn').addEventListener('click', () => {
        init()
        start_screen.classList.remove('active')
        game_screen.classList.add('active')
    })

    get('.pause').addEventListener('click', () => {
        pause_screen.classList.add('active')
        pause = true
    })

    get('.btn_resume').addEventListener('click', () => {
        pause_screen.classList.remove('active')
        pause = false
    })

    get('.new_game').addEventListener('click', () => {
        returnStartScreen()
    })

    get('#btn_new_game').addEventListener('click', () => {
        returnStartScreen()
    })
    
    get('#btn_new_game_2').addEventListener('click', () => {
        returnStartScreen()
    })
})()