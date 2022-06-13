;( () => {
    'use strict'
  
    const get = (target) => document.querySelector(target)

    let trial = 5
    var time = 4

    const $startButton = get('.start_button')
    const $startModal = get('.start')
    const $statement = get('.statement')
    const $progressbar = get('.progressbar')
    const $bar = get('.bar')
    const $characters = get('.characters')
    const $char1 = get('.char1')
    const $char2 = get('.char2')
    const $buttons = get('.buttons')
    const $left_button = get('.left_button')
    const $right_button = get('.right_button')

    const flags = new Array("청기", "백기", "둘 다")
    const controls_simple = new Array("올려", "내려", "올리지 마", "내리지 마")
    const controls_up = new Array("올리고", "올리지 말고")
    const controls_down = new Array("내리고", "내리지 말고")
    const action = new Array("앉아", "일어나", "앉지마", "일어나지 마")

    const start = () => {
        $startButton.addEventListener('click', () => {
            $startModal.classList.add("hide");
        })
    }

    const clickLeft = () => {
        if ($left_button.classList["value"] == "left_button click") {
            $left_button.classList.toggle('click')
        } else if ($left_button.classList["value"] == "left_button") {
            $left_button.classList.toggle('click')
        }
    }
    const clickRight = () => {
        if ($right_button.classList["value"] == "right_button click") {
            $right_button.classList.toggle('click')
        } else if ($right_button.classList["value"] == "right_button") {
            $right_button.classList.toggle('click')
        }
    }


    const randomItem = (arr) => {
        return arr[Math.floor(Math.random() * arr.length)]
    }

    const randomItem2 = (arr1, arr2) => {
        let random = Math.floor((Math.random() * 9) + 1)
        console.log(random)
        if (random % 2 == 0) {
            console.log("arr1")
            return randomItem(arr1)
        } else {
            console.log("arr2")
            return randomItem(arr2)
        }
    }

    const makeStatement = () => {
        if (trial < 3) {
            $statement.innerText = 
            randomItem(flags) + " " + randomItem(controls_simple)
        } else {
            $statement.innerText = 
            randomItem(flags) + " " + randomItem2(controls_up, controls_down) + " " + randomItem(action)
        }
    }

    const init = () => {
        start()
        makeStatement()

        $left_button.addEventListener('click', () => {
            clickLeft()
        })
        $right_button.addEventListener('click', () => {
            clickRight()
        })
    }

    init()
})()
