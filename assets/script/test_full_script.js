;(function () {
    'use strict'

    const get = (target) => {
        return document.querySelector(target)
    }
    
    const carousel = get('.carousel');
    const carouselItem = carousel.querySelectorAll('.carousel.item');
    const itemWidth = carousel.offsetWidth;

    const itemCount = 16;
    const theta = 360 / itemCount;
    let selectedIndex = 0;
    const radius = Math.round(itemWidth / 2 / Math.tan(Math.PI / itemCount));
    console.log(radius);
    const prevButton = get('.carousel_prev_button');
    const nextButton = get('.carousel_nest_button');

    const rotateCarousel = () => {
        let angle = theta * selectedIndex * -1;
        carousel.style.transform = "translateZ(" + -radius + "px) rotateY(" + angle + "deg)";
    }

    // prevButton.addEventListener("click", () => {
    //     selectedIndex--;
    //     rotateCarousel();
    // })
    
    // nextButton.addEventListener("click", () => {
    //     selectedIndex++;
    //     rotateCarousel();
    // })

    const changeCarousel = () => {
        for (let i = 0; i < carouselItem.length; i++) {
            let item = carouselItem[i];
            if (i < itemCount) {
                item.style.opacity = 1;
                let itemAngle = theta * i;
                item.style.transform = "rotateY(" + itemAngle + "deg) translateZ(" + radius + "px)";
            } else {
                item.style.opacity = 0;
                item.style.transform = "none";
            }
        }
        rotateCarousel();
        // console.log(carouselItem.length);
    }

    const init = () => {
        for (let index = 1; index <= itemCount; index++) {
            // carouselItem = document.createElement('div');
            // carouselImage = document.createElement('img');
            // carouselImage.src = `https://via.placeholder.com/200x150?text=img${index}`;
            // carouselItem.className = 'carousel_item';
            // carouselItem.appendChild(carouselImage);
            // carousel.appendChild(carouselItem);
            // carouselItem = get('.carousel_item');
            
            changeCarousel();
        }
        // const six = get('.carousel_item:nth-child(16)');
        // six.style.transform = 'rotateY(22.5deg)';
        // six.style.backgroundColor='white';
    }


    init()
})()