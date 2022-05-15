;(function () {
    const carousel = document.querySelector(".carousel");
    const cells = carousel.querySelectorAll(".carousel__cell");
    const cellCount = cells.length; // cellCount set from cells-range input value
    let selectedIndex = 0;
    const cellWidth = carousel.offsetWidth;
    // const cellHeight = carousel.offsetHeight;
    // var isHorizontal = true;
    // var rotateFn = isHorizontal ? "rotateY" : "rotateX";
    let radius, theta;theta = 360 / cellCount
    // console.log( cellWidth, cellHeight );
    
    function rotateCarousel() {
      let angle = theta * selectedIndex * -1;
      carousel.style.transform = `translateZ(${-radius}px) rotateY(${angle}deg)`;
    }
    
    let prevButton = document.querySelector(".previous-button");
    prevButton.addEventListener("click", function () {
      selectedIndex--;
      rotateCarousel();
    });
    
    let nextButton = document.querySelector(".next-button");
    nextButton.addEventListener("click", function () {
      selectedIndex++;
      rotateCarousel();
    });
    
    // var cellsRange = document.querySelector(".cells-range");
    // cellsRange.addEventListener("change", changeCarousel);
    // cellsRange.addEventListener("input", changeCarousel);
    
    function changeCarousel() {
      for (let i = 0; i < cells.length; i++) {
        radius = Math.round(cellWidth / 2 / Math.tan(Math.PI / cellCount));
        theta = 360 / cellCount;
        let cell = cells[i];
        if (i < cellCount) {
          // visible cell
          cell.style.opacity = 1;
          let cellAngle = theta * i;
          cell.style.transform = `rotateY(${cellAngle}deg) translateZ(${radius}px)`;
        } else {
          // hidden cell
          cell.style.opacity = 0;
          cell.style.transform = "none";
        }
      }
      console.log(cells.length)
      rotateCarousel();
    }
    
    // var orientationRadios = document.querySelectorAll('input[name="orientation"]');
    // (function () {
    //   for (var i = 0; i < orientationRadios.length; i++) {
    //     var radio = orientationRadios[i];
    //     radio.addEventListener("change", onOrientationChange);
    //   }
    // })();
    
    // function onOrientationChange() {
    //   var checkedRadio = document.querySelector(
    //     'input[name="orientation"]:checked'
    //   );
    //   isHorizontal = checkedRadio.value == "horizontal";
    //   rotateFn = isHorizontal ? "rotateY" : "rotateX";
    //   changeCarousel();
    // }
    
    // set initials
    changeCarousel();
    
  })()
  