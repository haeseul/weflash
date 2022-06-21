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

    const cells = getAll('.main_grid_cell')

    const name_input = get('#input_name')
    const start_screen = get('#start_screen')

    let level_index = 0
    let level = CONSTANT.LEVEL[level_index]

    //-------------------------


    // select level

    get('#btn_level').addEventListener('click', (e) => {
        level_index = level_index > CONSTANT.LEVEL.length - 2 ? 0 : level_index + 1
        level = CONSTANT.LEVEL[level_index]
        e.target.innerHTML = CONSTANT.LEVEL_NAME[level_index]
    })

    get('#btn_play').addEventListener('click', () => {
        if (name_input.value.trim().length > 0) {
            alert(`level => ${level}`)
        } else {
            name_input.classList.add('input-err')
            setTimeout(() => {
                name_input.classList.remove('input-err')
                name_input.focus()
            }, 500);
        }
    })
    
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

    // ------------------------------


    const init = () => {
        const darkmode = JSON.parse(localStorage.getItem('darkmode'))
        document.body.classList.add(darkmode ? 'dark' : 'light')
        get('meta[name="theme_color"]').setAttribute('content', darkmode ? '#1a1a2e' : '#fff')

        const game = getGameInfo()

        get('#btn_continue').style.display = game ? 'grid' : 'none'

        initGameGrid()
    }

    init()
})()