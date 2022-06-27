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
    const number_inputs = getAll('.number')

    const player_name = get('#player_name')
    const game_level = get('#game_level')
    const game_time = get('#game_time')
    const main_game_info_time = get('.main_game_info_time')

    let level_index = 0
    let level = CONSTANT.LEVEL[level_index]

    let timer = null
    let pause = false
    let seconds = 0

    let su = undefined
    let su_answer = undefined

    let selected_cell = -1

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

    const clearSudoku = () => {
        for (let i = 0; i < Math.pow(CONSTANT.GRID_SIZE, 2); i++) {
            cells[i].innerHTML = ''
            cells[i].classList.remove('filled')
            cells[i].classList.remove('selected')
        }
    }

    const initSudoku = () => {
        // clear old sudoku
        clearSudoku()
        resetBg()
        
        // generate sudoku puzzle
        su = sudokuGen(level)
        su_answer = [...su.question]
        console.table(su_answer)

        // show sudoku to div
        for (let i = 0; i < Math.pow(CONSTANT.GRID_SIZE, 2); i++) {
            let row = Math.floor(i / CONSTANT.GRID_SIZE)
            let col = i % CONSTANT.GRID_SIZE

            cells[i].setAttribute('data-value', su.question[row][col])

            if (su.question[row][col] !== 0) {
                cells[i].classList.add('filled')
                cells[i].innerHTML = su.question[row][col]
            }
        }
    }


    // cells hover change

    const hoverBg = (index) => {
        let row = Math.floor(index / CONSTANT.GRID_SIZE)
        let col = index % CONSTANT.GRID_SIZE

        let box_start_row = row - row % 3
        let box_start_col = col - col % 3

        for (let i = 0; i < CONSTANT.BOX_SIZE; i++) {
            for (let j = 0; j < CONSTANT.BOX_SIZE; j++) {
                let cell = cells[9 * (box_start_row + i) + (box_start_col + j)]
                cell.classList.add('hover')
            }
        }

        // col hover
        let step = 9
        while (index - step >= 0) {
            cells[index - step].classList.add('hover')
            step += 9
        }
        step = 9
        while (index + step < Math.pow(CONSTANT.GRID_SIZE, 2)) {
            cells[index + step].classList.add('hover')
            step += 9
        }

        // row hover
        step = 1
        while (index - step >= row * 9) {
            cells[index - step].classList.add('hover')
            step += 1
        }
        step = 1
        while (index + step < row * 9 + 9) {
            cells[index + step].classList.add('hover')
            step += 1
        }
    }

    const resetBg = () => {
        cells.forEach(e => e.classList.remove('hover'))
    }

    const checkErr = (value) => {
        const addErr = (cell) => {
            if (parseInt(cell.getAttribute('data-value')) === value) {
                cell.classList.add('err')
                cell.classList.add('cell-err')
                setTimeout(() => {
                    cell.classList.remove('cell-err')
                }, 500);
            }
        }

        let index = selected_cell

        let row = Math.floor(index / CONSTANT.GRID_SIZE)
        let col = index % CONSTANT.GRID_SIZE

        let box_start_row = row - row % 3
        let box_start_col = col - col % 3

        for (let i = 0; i < CONSTANT.BOX_SIZE; i++) {
            for (let j = 0; j < CONSTANT.BOX_SIZE; j++) {
                let cell = cells[9 * (box_start_row + i) + (box_start_col + j)]
                if(!cell.classList.contains('selected')) addErr(cell)
            }
        }

        // col hover
        let step = 9
        while (index - step >= 0) {
            addErr(cells[index - step])
            step += 9
        }
        step = 9
        while (index + step < Math.pow(CONSTANT.GRID_SIZE, 2)) {
            addErr(cells[index + step])
            step += 9
        }

        // row hover
        step = 1
        while (index - step >= row * 9) {
            addErr(cells[index - step])
            step += 1
        }
        step = 1
        while (index + step < row * 9 + 9) {
            addErr(cells[index + step])
            step += 1
        }
    }

    const removeErr = () => cells.forEach(e => e.classList.remove('err'))

    const initNumberInputEvent = () => {
        number_inputs.forEach((e, index) => {
            e.addEventListener('click', () => {
                if (!cells[selected_cell].classList.contains('filled')) {
                    cells[selected_cell].innerHTML = index + 1
                    cells[selected_cell].setAttribute('data-value', index + 1)
                    
                    // add to answer
                    let row = Math.floor(selected_cell / CONSTANT.GRID_SIZE)
                    let col = selected_cell % CONSTANT.GRID_SIZE
                    su_answer[row][col] = index + 1

                    // save game

                    removeErr()
                    checkErr(index + 1)
                    cells[selected_cell].classList.add('zoom-in')
                    setTimeout(() => {
                        cells[selected_cell].classList.remove('zoom-in')
                    }, 500);

                    // check game win

                }
            })
        })
    }

    const initCellsEvent = () => {
        cells.forEach((e, index) => {
            e.addEventListener('click', () => {
                if (!e.classList.contains('filled')) {
                    cells.forEach(e => e.classList.remove('selected'))

                    selected_cell = index
                    e.classList.remove('err')
                    e.classList.add('selected')
                    resetBg()
                    hoverBg(index)
                }
            })
        })
    }

    // ------------------------------------------------------

    const startGame = () => {
        start_screen.classList.remove('active')
        game_screen.classList.add('active')
        main_game_info_time.style.visibility = 'visible'
        
        player_name.innerHTML = name_input.value.trim()
        setPlayerName(name_input.value.trim())

        game_level.innerHTML = CONSTANT.LEVEL_NAME[level_index]

        seconds = 0
        showTime(seconds)

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
            initSudoku()
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
        initCellsEvent()
        initNumberInputEvent()

        if (getPlayerName()) {
            name_input.value = getPlayerName()
        } else {
            name_input.focus()
        }
    }

    init()
})()