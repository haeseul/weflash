const container = document.querySelector(".container")

const setting = () => {
    const games = ["2048", "block", "bubble", "flags", "landmine", "memory", "snake", "sudoku", "tetris", "wordle", "1", "2", "3", "4", "5", "6"]
    const colors = ["#f3a683", "#f7d794", "#778beb", "#e77f67", "#f19066", "#f5cd79", "#546de5", "#e15f41", "#786fa6", "#f8a5c2", "#63cdda","#ea8685", "#574b90", "#f78fb3", "#3dc1d3", "#e66767"]
    const text = ["게임설명", "게임설명", "게임설명", "게임설명", "게임설명", "게임설명", "게임설명", "게임설명", "게임설명", "게임설명", "게임설명", "게임설명", "게임설명", "게임설명", "게임설명", "게임설명"]
    const one = document.createElement("div")
    const two = document.createElement("div")
    const three = document.createElement("div")
    const four = document.createElement("div")
    for (let i = 0; i < games.length; i++) {
        const imgArr = games[i];
        const color = colors[i];
        const textArr = text[i];
        const card = document.createElement("div");
        const img = document.createElement("img");
        const badge = document.createElement("badge");

        card.classList.add("card");
        img.classList.add("ii");
        badge.classList.add("badge");
        badge.classList.add("flipped")

        badge.style.backgroundColor = color;
        img.src = `../assets/images/packman.png`;

        const content = document.createElement("div");
        const title = document.createElement("div");
        const des = document.createElement("div");
        const a = document.createElement("a");

        title.innerHTML = imgArr;
        des.innerHTML = textArr;
        a.innerHTML = "게임 시작";
        a.href = `../games/${imgArr}/index.html`

        content.classList.add("content");
        title.classList.add("title");
        des.classList.add("des");

        content.appendChild(title);
        content.appendChild(des);
        content.appendChild(a);

        card.appendChild(content);
        card.appendChild(badge);
        card.appendChild(img);
        
        one.classList.add("one")
        two.classList.add("two")
        three.classList.add("three")
        four.classList.add("four")
        
        if (i <=4) {
            one.appendChild(card);
        } else if (i <= 8) {
            two.appendChild(card);
        } else if (i <= 13) {
            three.appendChild(card);
        } else {
            four.appendChild(card);
        }
        
        setTimeout(() => {
            badge.classList.remove("flipped");
            img.style.display = "flex";
        }, i * 100)
        
    }
    container.appendChild(one);
    container.appendChild(two);
    container.appendChild(three);
    container.appendChild(four);
}

setting()