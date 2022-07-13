document.addEventListener('DOMContentLoaded', () => {
    const get = (target) => document.querySelector(target)

    const start_screen = get('.start-screen')
    const game_container = get('.game-container')
    const end_screen = get('.end-screen')

    const bird = get('.bird')
    const gameDisplay = get('.game-container')
    const ground = get('.ground')

    let birdLeft = 220
    let birdBottom = 100
    let gravity = 2
    let isGameOver = false
    let gap = 430

    function startGame() {
        birdBottom -= gravity
        bird.style.bottom = birdBottom + 'px'
        bird.style.left = birdLeft + 'px'
    }
    let gameTimerId = setInterval(startGame, 20)

    // spacebar 누를 때만 점프 가능
    function control(e) {
        if (e.keyCode === 32) {
            jump()
        }
    }

    function jump() {
        if (birdBottom < 500) birdBottom += 50
        bird.style.bottom = birdBottom + 'px'
        console.log(birdBottom)
    }
    document.addEventListener('keyup', control)

    function generateObstacle() {
        let obstacleLeft = 500
        let randomHeight = Math.random() * 120
        console.log(randomHeight)
        let obstacleBottom = randomHeight

        const obstacle = document.createElement('div')
        const topObstacle = document.createElement('div')
        if (!isGameOver) {
            obstacle.classList.add('obstacle')
            topObstacle.classList.add('topObstacle')
        }
        gameDisplay.appendChild(obstacle)
        gameDisplay.appendChild(topObstacle)
        obstacle.style.left = obstacleLeft + 'px'
        obstacle.style.bottom = obstacleBottom + 'px'
        topObstacle.style.left = obstacleLeft + 'px'
        topObstacle.style.bottom = obstacleBottom + gap + 'px'

        function moveObstacle() {
            obstacleLeft -= 2
            obstacle.style.left = obstacleLeft + 'px'
            topObstacle.style.left = obstacleLeft + 'px'

            if (obstacleLeft === -100) {
                clearInterval()
                gameDisplay.removeChild(obstacle)
                gameDisplay.removeChild(topObstacle)
            }

            if (
                obstacleLeft > 200 && obstacleLeft < 280 && birdLeft === 220 && 
                (birdBottom < obstacleBottom + 148 || birdBottom > obstacleBottom + gap - 198) ||
                birdBottom === 0
                ) {
                gameOver()
                clearInterval(timerId)
            }
        }
        let timerId = setInterval(moveObstacle, 20)
        if (!isGameOver) setTimeout(generateObstacle, 3500)  // 3초마다 장애물 생기기
    }

    function gameOver() {
        clearInterval(gameTimerId)
        console.log('game over')
        isGameOver = true
        document.removeEventListener('keyup', control)
        game_container.classList.remove('active')
        end_screen.classList.add('active')
    }

    generateObstacle()

    get('.start-btn').addEventListener('click', () => {
        start_screen.classList.remove('active')
        game_container.classList.add('active')
    })

    get('.replay-btn').addEventListener('click', () => {
        generateObstacle()
        end_screen.classList.remove('active')
        game_container.classList.add('active')
    })
})