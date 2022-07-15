const container = document.querySelector(".container")

const setting = () => {

    const games = ["2048", "block", "bubble", "flags", "landmine", "memory", "snake", "sudoku", "tetris", "wordle", "1", "2", "3", "4", "5", "6"]
    for (let i = 0; i < games.length; i++) {
        const imgArr = games[i];
        const game = document.createElement("div");
        const input = document.createElement("input")
        input.setAttribute('type', 'radio');
        input.setAttribute('name', 'gameInfo')
        input.setAttribute('value', imgArr);
        input.setAttribute('id', imgArr);

        const label = document.createElement("label");

        // label.setAttribute('for', imgArr);
        const gameImg = document.createElement("img");
        const gameName = document.createElement("div");

        gameImg.src = `../assets/images/games/${imgArr}.png`;
        game.classList.add("game");
        gameName.classList.add("gameName");
        gameImg.classList.add("gameImg")

        gameName.innerHTML = `${imgArr}`
        container.appendChild(game);
        game.appendChild(label);
        label.appendChild(input);
        setTimeout(() => {
            game.classList.add("flipped");
            label.appendChild(gameImg);
            game.appendChild(gameName);
        }, i * 100);

        // game.addEventListener('click', () => {
        //     location.href = `../games/${imgArr}/index.html`
        // })

    }
}

setting()