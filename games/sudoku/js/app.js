;( () => {
    'use strict'

    const get = (target) => document.querySelector(target)
    const getAll = (target) => document.querySelectorAll(target)

    get('#dark_mode_toggle').addEventListener('click', () => {
        document.body.classList.toggle('dark')
        const isDarkMode = document.body.classList.contains('dark')
        localStorage.setItem('darkmode', isDarkMode)
        // change mobile status bar color
        get('meta[name="theme_color"]').setAttribute('content', isDarkMode ? '#1a1a2e' : '#fff')
    })


    // initial value

    const start_screen = get('#start_screen')
    const game_screen = get('#game_screen')
    const pause_screen = get('#pause_screen')

    const cells = getAll('.main_grid_cell')

    const name_input = get('#input_name')

    const player_name = get('#player_name')
    const game_level = get('#game_level')
    const game_time = get('#game_time')
    const main_game_info_time = get('.main_game_info_time')

    let level_index = 0
    let level = CONSTANT.LEVEL[level_index]

    let timer = null
    let pause = false
    let seconds = 0

    // ------------------------------------------------------


    const getGameInfo = () => JSON.parse(localStorage.getItem('game'))


    // add space for each 0 cells
    
    const initGameGrid = () => {
        let index = 0

        for (let i=0; i < Math.pow(CONSTANT.GRID_SIZE, 2); i++) {
            let row = Math.floor(i / CONSTANT.GRID_SIZE)
            let col = i % CONSTANT.GRID_SIZE
            if (row === 2 || row === 5) cells[index].style.marginBottom = '10px'
            if (col === 2 || col === 5) cells[index].style.marginRight = '10px'
            
            index++
        }
    }

    // ------------------------------------------------------


    const setPlayerName = (name) => localStorage.setItem('player_name', name)
    const getPlayerName = () => localStorage.getItem('player_name')

    const showTime = (seconds) => new Date(seconds * 1000).toISOString().substr(11, 8)

    const initSudoku = () => {
        
    }

    const startGame = () => {
        start_screen.classList.remove('active')
        game_screen.classList.add('active')
        main_game_info_time.style.visibility = 'visible'
        
        player_name.innerHTML = name_input.value.trim()
        setPlayerName(name_input.value.trim())

        game_level.innerHTML = CONSTANT.LEVEL_NAME[level_index]

        seconds = 0

        timer = setInterval(() => {
            if (!pause) {
                seconds += 1
                game_time.innerHTML = showTime(seconds)
            }
        }, 1000);
    }


    const returnStartScreen = () => {
        clearInterval(timer)
        pause = false
        seconds = 0
        start_screen.classList.add('active')
        game_screen.classList.remove('active')
        pause_screen.classList.remove('active')
        main_game_info_time.style.visibility = 'hidden'
        game_time.innerHTML = '00:00:00'
    }


    // button event

    get('#btn_level').addEventListener('click', (e) => {
        level_index = level_index > CONSTANT.LEVEL.length - 2 ? 0 : level_index + 1
        level = CONSTANT.LEVEL[level_index]
        e.target.innerHTML = CONSTANT.LEVEL_NAME[level_index]
    })

    get('#btn_play').addEventListener('click', () => {
        if (name_input.value.trim().length > 0) {
            startGame()
        } else {
            name_input.classList.add('input-err')
            setTimeout(() => {
                name_input.classList.remove('input-err')
                name_input.focus()
            }, 500);
        }
    })

    get('#btn_pause').addEventListener('click', () => {
        pause_screen.classList.add('active')
        pause = true
    })

    get('#btn_resume').addEventListener('click', () => {
        pause_screen.classList.remove('active')
        pause = false
    })

    get('#btn_new_game').addEventListener('click', () => {
        returnStartScreen()
    })

    // ------------------------------------------------------


    const init = () => {
        const darkmode = JSON.parse(localStorage.getItem('darkmode'))
        document.body.classList.add(darkmode ? 'dark' : 'light')
        get('meta[name="theme_color"]').setAttribute('content', darkmode ? '#1a1a2e' : '#fff')

        const game = getGameInfo()

        get('#btn_continue').style.display = game ? 'grid' : 'none'

        initGameGrid()

        if (getPlayerName()) {
            name_input.value = getPlayerName()
        } else {
            name_input.focus()
        }
    }

    init()
})()