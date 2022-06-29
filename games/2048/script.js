;( () => {
    'use strict'

    const get = (target) => document.querySelector(target)
    const getAll = (target) => document.querySelectorAll(target)

    const table = get('.table')
    const $score = get('score')
    
    let data = []
    const index = [1,2,3,4]

    const start = () => {
        const fragment = document.createDocumentFragment()

        index.forEach(function () {
            const rowData = []
            data.push(rowData)
            const tr = document.createElement('tr')

            index.forEach(() => {
                rowData.push(0)
                const td = document.createElement('td')
                tr.appendChild(td)
            })
            fragment.appendChild(tr)
        })
        table.appendChild(fragment)
    }

    const put2 = () => {
        const emptyCells = []
        data.forEach((rowData, i) => {
            rowData.forEach((cellData, j) => {
                if(!cellData) {
                    emptyCells.push([i, j])
                }
            })
        })

        const randomCell = emptyCells[Math.floor(Math.random() * emptyCells.length)]
        data[randomCell[0]][randomCell[1]] = 2
        console.log(data)
    }

    const draw = () => {
        data.forEach((rowData, i) => {
            rowData.forEach((cellData, j) => {
                const target = table.children[i].children[j]
                if (cellData > 0) {
                    target.innerText = cellData
                    target.className = 'color-' + cellData
                } else {
                    target.innerText = ''
                    target.className = ''
                }
            })
        })
    }

    const moveCells = (direction) => {
        switch (direction){
            case 'left':{   //case 문에 {} 를 사용하는 이유는 내부의 변수 를 새롭게 생성시 {} 를 사용해주는 것이 좋다
                const newData = [[],[],[],[]];
                data.forEach((rowData, i) => {
                    rowData.forEach((cellData, j) => {
                        if (cellData){
                            const currentRow = newData[i] //newData = 지금 줄
                            const prevData = currentRow[currentRow.length - 1];
                            if(prevData === cellData){  //직전의 값이 지금 값과 같을 경우....
                                const score = parseInt($score.textContent);
                                $score.textContent = score + currentRow[currentRow.length -1]*2;
                                currentRow[currentRow.length -1 ] *= -2;
                            } else {
                                newData[i].push(cellData);  //빈칸 제외하고 왼쪽 부터 넣어줌    
                            }
                            
                        }
                    });
                });
                console.log(newData);
                index.forEach((rowData, i)=>{
                    index.forEach((cellData,j) =>{
                        data[i][j] = Math.abs(newData[i][j]) || 0; //원본 데이터 수정된 데이터
                    });
                });
                break;
            }
            case 'right':{
                const newData = [[],[],[],[]];
                data.forEach((rowData,i) => {
                    rowData.forEach((cellData, j)=>{
                        if(rowData[3-j]) {
                            const currentRow = newData[i]
                            const prevData = currentRow[currentRow.length -1];
                            if (prevData === rowData[3-j]) {
                                const score = parseInt($score.textContent);
                                $score.textContent = score + currentRow[currentRow.length -1]*2;
                                currentRow[currentRow.length - 1]*= -2;
                            } else {
                                newData[i].push(rowData[3-j]);
                            }
                        }
                    });
                });
                console.log(newData);
                index.forEach((rowData,i) => {
                    index.forEach((cellData,j) =>{
                        data[i][3-j] = Math.abs(newData[i][j]) || 0;
                    });
                })
                break;
            }
            case 'up':{
                const newData = [[],[],[],[]];
                data.forEach((rowData,i) =>{
                    rowData.forEach((cellData,j) =>{
                        if (cellData) {
                            const currentRow = newData[j];
                            const prevData = currentRow[currentRow.length -1];
                            if (prevData === cellData) {
                                const score = parseInt($score.textContent);
                                $score.textContent = score + currentRow[currentRow.length -1]*2;
                                currentRow[currentRow.length -1] *= -2;
                            } else {
                                newData[j].push(cellData);
                            }
                        }
                    });
                });
                console.log(newData);
                index.forEach((cellData, i) => {
                    index.forEach((rowData , j) => {
                    data[j][i] = Math.abs(newData[i][j]) || 0;
                    });
                });
                break;
            }
            case 'down':{
                const newData = [[],[],[],[]];
                data.forEach((rowData, i) => {
                    rowData.forEach((cellData,j) =>{
                        if(data[3-i][j]) {
                            const currentRow = newData[j];
                            const prevData = currentRow[currentRow.length - 1];
                            if (prevData === data[3-i][j]) {
                                const score = parseInt($score.textContent);
                                $score.textContent = score + currentRow[currentRow.length -1]*2;
                                currentRow[currentRow.length -1] *= -2;
                            } else {
                                newData[j].push(data[3 -i][j]);
                            }
                        }
                    });
                });
                console.log (newData);
                index.forEach((cellData,i) => {
                    index.forEach((rowData,j) => {
                        data[3-j][i] = Math.abs(newData[i][j]) || 0;
                    });
                })
                
                break;
            }
        }

        if (data.flat().includes(2048)) {
            draw()
            setTimeout(() => {
                alert('Win')
            }, 0);
        } else if(!data.flat().includes(0)) {
            alert(`패배. Score: ${score.innerText}`)
        } else {
            put2()
            draw()
        }
    }

    window.addEventListener('keyup', (e) => {
        if (e.key === 'ArrowDataUp') {
            moveCells('up')
        } else if (e.key === 'ArrowDataDown') {
            moveCells('down')
        } else if (e.key === 'ArrowDataLeft') {
            moveCells('left')
        } else if (e.key === 'ArrowDataRight') {
            moveCells('right')
        }
    })
    
    const init = () => {
        start()
        put2()
        draw()
    }

    init()
})()