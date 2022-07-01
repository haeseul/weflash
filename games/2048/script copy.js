;( () => {
    'use strict'

    const get = (target) => document.querySelector(target)
    const getAll = (target) => document.querySelectorAll(target)

    const $table = get('.table')
    let $score = get('score')

    let board = Array(Array(0,0,0,0),Array(0,0,0,0),Array(0,0,0,0),Array(0,0,0,0))
    let score


    // 새로운 숫자 생성
    const generate = () => {
        let count = 0
        for (let i = 0; i < 4; i++) {
            for (let j = 0; j < 4; j++) {
                if (board[i][j] == 0) count++
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
                if (board[i][j] == 0) continue
                let cell = document.getElementById(i + '' + j)
                cell.innerHTML = board[i][j]==0 ? '' : board[i][j]
                cell.classList.add('color-' + cell.innerHTML)
            }
        }
    }

    const choose2or4 = () => {
        // 2가 나올 확률 90%
        const rand = parseInt(Math.random() * 10)
        return (rand == 0)? 4 : 2
    }

    const rotate = (n) => {
        
    }

    const move = () => {
        
    }

    
    const keyDownEventHandler = (e) => {
        switch (e.keyCode) {
            case 38: // up
                console.log(e.keyCode)
                move()
                break;
            case 40: // down
                console.log(e.keyCode)
                rotate(2)
                move()
                rotate(2)
                break;
            case 37: // left
                console.log(e.keyCode)
                rotate(1)
                move()
                rotate(3)
                break;
            case 39: // right
                console.log(e.keyCode)
                rotate(3)
                move()
                rotate(1)
                break;
            default:
                break;
        }
    }


    
    const init = () => {
        document.onkeydown = keyDownEventHandler
        // board 초기화
        score = 0
        for (let i = 0; i < 4; i++) {
            for (let j = 0; j < 4; j++) {
                board[i][j] = 0
            }
        }
        // 2개의 칸 채우기
        for (let i = 0; i < 2; i++) {
            let rand = parseInt(Math.random() * 16)
            let x = rand % 4
            let y = parseInt(rand / 4)
            if (board[y][x] == 0) board[y][x] = choose2or4()
            else i--
        }
        update()
    }

    init()
})()