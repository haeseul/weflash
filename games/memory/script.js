const horizontal = 3; // 가로
const vertical = 3; // 세로
// container 요소를 검색
const container = document.querySelector(".container");

// 카드 세팅
const setting = (hori, verti) => {
  for (let i = 0; i < hori * verti; i++) {
    // 문서객체를 생성
    
    const num = i + 1;
    const card = document.createElement("div");
    const cardInner = document.createElement("div");
    const front = document.createElement("div");
    const back = document.createElement("div");

    // 생성한 문서객체에 클래스를 부여
    card.classList.add("card");
    cardInner.classList.add("cardInner");
    front.classList.add("front");
    back.classList.add("back");

    front.classList.add(num);

    // 문서객체를 추가하기
    container.appendChild(card);
    card.appendChild(cardInner);
    cardInner.appendChild(front);
    cardInner.appendChild(back);


    // 앞면에 카드 색 넣기
    front.style.backgroundColor = "navy";
    // 뒷면에 카드 색 넣기
    back.style.backgroundColor = "gray";
    let list = [];
    // toggle기능 부여
    card.addEventListener("click", aa);
    function aa (event) {
        card.classList.toggle("flipped");
        const target = (event.target.classList[1]);
        console.log(target);
        return list;
    }
}
};



setting(horizontal, vertical);
function shuffleArray(array) {
    array.sort(() => Math.random() - 0.5);
  }
  
  let arr = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
  shuffleArray(arr);
  console.log(arr);
