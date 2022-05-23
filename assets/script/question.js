;(function () {
    'use strict'
    
    let num = 0 //문제 번호

    let mbti_list = ['','','','','','','','','','','','','','','','','','','','']
    
    const q = { //문제들의 객체
        0: {"title": "게임 중 당신이 더욱 성취감을 느낄 때는?", "mbti_type": "SN", "A": "내 전략이 도움이 별로 안됐더라도 게임만 이겼음 됐지~", "B": "게임은 졌지만 내 전략이 정말 큰 도움이 됐다. 내 말이 맞았지!"},
        1: {"title": "게임 시작 전, 캐릭터를 고를 때 당신은?", "mbti_type": "TF", "A": "무조건 강력한 스킬을 가진 캐릭터!", "B": "무엇보다 내가 몰입할 수 있어야지!"},
        2: {"title": "나에게 더 짜릿한 승리는?", "mbti_type": "JP", "A": "상대가 내 예상대로 움직여서 승리. 넌 내 손 안에 있다!", "B": "상대가 예상치 못한 행동을 했지만 순발력인 대처로 승리. 나에겐 어림도 없다!"},
        3: {"title": "퇴근 준비 중인 당신에게 친구가 같이 게임하자고 연락한다면?", "mbti_type": "EI", "A": "E", "B": "I"},
        4: {"title": "문제 5번", "mbti_type": "SN", "A": "S", "B": "N"},
        5: {"title": "문제 6번", "mbti_type": "TF", "A": "T", "B": "F"},
        6: {"title": "문제 7번", "mbti_type": "JP", "A": "J", "B": "P"},
        7: {"title": "문제 8번", "mbti_type": "EI", "A": "E", "B": "I"},
        8: {"title": "문제 9번", "mbti_type": "SN", "A": "S", "B": "N"},
        9: {"title": "문제 10번", "mbti_type": "TF", "A": "T", "B": "F"},
        10: {"title": "문제 11번", "mbti_type": "JP", "A": "J", "B": "P"},
        11: {"title": "문제 12번", "mbti_type": "EI", "A": "E", "B": "I"},
        12: {"title": "문제 13번", "mbti_type": "SN", "A": "S", "B": "N"},
        13: {"title": "문제 14번", "mbti_type": "TF", "A": "T", "B": "F"},
        14: {"title": "문제 15번", "mbti_type": "JP", "A": "J", "B": "P"},
        15: {"title": "문제 16번", "mbti_type": "EI", "A": "E", "B": "I"},
        16: {"title": "문제 17번", "mbti_type": "SN", "A": "S", "B": "N"},
        17: {"title": "문제 18번", "mbti_type": "TF", "A": "T", "B": "F"},
        18: {"title": "문제 19번", "mbti_type": "JP", "A": "J", "B": "P"},
        19: {"title": "문제 20번", "mbti_type": "EI", "A": "E", "B": "I"},
    }

    const get = (target) => {
        return document.querySelector(target)
    }

    const question = get('.question')
    const answer1_text = get('.answer1_text')
    const answer2_text = get('.answer2_text')
    const answer1 = get('.answer1')
    const answer2 = get('.answer2')
    const $nextBtn = get('.next_button')
    const $prevBtn = get('.prev_button')
    const $questionPage = get('.question_page')
    const $resultPage = get('.test_result')
    const $answer1 = get('.answer1')
    const $answer2 = get('.answer2')

    const $tetris = get('.tetris')


    let mbti_value = "N"


    const test = () => {
        question.innerHTML = q[num]["title"]
        answer1_text.innerHTML = q[num]["A"]
        answer2_text.innerHTML = q[num]["B"]
    }

    const clickA = () => {
        if (num == 0) {
            $nextBtn.disabled = false
        } else {
            $prevBtn.disabled = false
            $nextBtn.disabled = false
        }

        if (q[num]["mbti_type"] == "SN") {
            mbti_value = "S"
        } else if (q[num]["mbti_type"] == "TF") {
            mbti_value = "T"
        } else if (q[num]["mbti_type"] == "JP") {
            mbti_value = "J"
        } else if (q[num]["mbti_type"] == "EI") {
            mbti_value = "E"
        }

        
        if ($answer2.classList["value"] == "answer2 click") {
            $answer2.classList.toggle('click')
            $answer1.classList.toggle('click')
        } else if ($answer1.classList["value"] == "answer1") {
            $answer1.classList.toggle('click')
        }
    }


    const clickB = () => {
        if (num == 0) {
            $nextBtn.disabled = false
        } else {
            $prevBtn.disabled = false
            $nextBtn.disabled = false
        }
        
        if (q[num]["mbti_type"] == "SN") {
            mbti_value = "N"
        } else if (q[num]["mbti_type"] == "TF") {
            mbti_value = "F"
        } else if (q[num]["mbti_type"] == "JP") {
            mbti_value = "P"
        } else if (q[num]["mbti_type"] == "EI") {
            mbti_value = "I"
        }

        
        if ($answer1.classList["value"] == "answer1 click") {
            $answer1.classList.toggle('click')
            $answer2.classList.toggle('click')
        } else if ($answer2.classList["value"] == "answer2") {
            $answer2.classList.toggle('click')
        }
        
    }

    function getCount(mbti_list) {
        return mbti_list.reduce((pv, cv) => {
            pv[cv] = (pv[cv] || 0) + 1;
            return pv;
        }, {});
    }

    const cal = () => {
        const cal_value = getCount(mbti_list)
        const s_count = parseInt(cal_value["S"])
        const t_count = parseInt(cal_value["T"])
        const j_count = parseInt(cal_value["J"])
        const e_count = parseInt(cal_value["E"])

        let mbti = "";
        (e_count > 2) ? mbti += "E" : mbti += "I";
        (s_count > 2) ? mbti += "S" : mbti += "N";
        (t_count > 2) ? mbti += "T" : mbti += "F";
        (j_count > 2) ? mbti += "J" : mbti += "P"

        console.log(mbti)
        alert(mbti)

    }

    const buildTetris = () => {
        // 테트리스 블록 추가하기
        for (let i = 20; i >= 1; i--) {
            const tetrisBlock = document.createElement('img')
            tetrisBlock.src = `../assets/images/tetris/${i}.png`
            tetrisBlock.className = `tetris_block_${i} none`
            $tetris.appendChild(tetrisBlock)
        }
    }
    
    const tetrisFall = () => {
        const $tetrisBlock = get(`.tetris_block_${num}`)
        $tetrisBlock.style.marginButtom = 80 + 'px'
        console.log($tetrisBlock)
        $tetrisBlock.classList.toggle('none')
    }

    const tetrisUndo = () => {
        const $tetrisBlock = get(`.tetris_block_${num+1}`)
        console.log($tetrisBlock)
        $tetrisBlock.classList.toggle('none')
    }

    const tetrisLast = () => {
        const $tetrisBlock = get('.tetris_block_20')
        console.log($tetrisBlock)
        $tetrisBlock.classList.toggle('none')
    }

    const init = () => {
        buildTetris()

        answer1.addEventListener('click', () => {
            clickA()
        })

        answer2.addEventListener('click', () => {
            clickB()
        })

        $nextBtn.addEventListener('click', () => {
            $prevBtn.disabled = false
            mbti_list[num] = mbti_value
            console.log(mbti_list)
            
            if ($answer1.classList["value"] == "answer1 click") {
                $answer1.classList.toggle('click')
            }
            if ($answer2.classList["value"] == "answer2 click") {
                $answer2.classList.toggle('click')
            }
            
            if (num == 19) {
                tetrisLast()
                cal()
                $questionPage.classList.toggle('show')
                $resultPage.classList.toggle('show')
                $nextBtn.disabled = true
                $tetris.style.display = "none"
            } else {
                num++
                test()
                
                $nextBtn.disabled = true
            }

            tetrisFall()
        })

        $prevBtn.addEventListener('click', () => {
            if ($answer1.classList["value"] == "answer1 click") {
                $answer1.classList.toggle('click')
            }
            if ($answer2.classList["value"] == "answer2 click") {
                $answer2.classList.toggle('click')
            }
            num--
            test()
            if (num == 0) {
                $prevBtn.disabled = true
                $nextBtn.disabled = true
            } else {
                $nextBtn.disabled = true
            }

            tetrisUndo()
        })
        
    }
    init()
  })()
  