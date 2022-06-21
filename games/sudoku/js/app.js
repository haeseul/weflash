;( () => {
    'use strict'

    const get = (target) => document.querySelector(target)

    get('#dark-mode-toggle').addEventListener('click', () => {
        document.body.classList.toggle('dark')
        const isDarkMode = document.body.classList.contains('dark')
        localStorage.setItem('darkmode', isDarkMode)
        // change mobile status bar color
        get('meta[name="theme-color"]').setAttribute('content', isDarkMode ? '#1a1a2e' : '#fff')
    })


    // initial value

    const name_input = get('#input-name')
    const start_screen = get('#start-screen')

    let level_index = 0
    let level = CONSTANT.LEVEL[level_index]

    //-------------------------

    get('#btn-level').addEventListener('click', (e) => {
        level_index = level_index + 1 > CONSTANT.LEVEL.length - 1 ? 0 : level_index + 1
        level = CONSTANT.LEVEL[level_index]
        e.target.innerHTML = CONSTANT.LEVEL_NAME[level_index]
    })

    get('#btn-play').addEventListener('click', () => {
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

        
    }

    // ------------------------------


    const init = () => {
        const darkmode = JSON.parse(localStorage.getItem('darkmode'))
        document.body.classList.add(darkmode ? 'dark' : 'light')
        get('meta[name="theme-color"]').setAttribute('content', darkmode ? '#1a1a2e' : '#fff')

        const game = getGameInfo()

        get('#btn-continue').style.display = game ? 'grid' : 'none'
    }

    init()
})()