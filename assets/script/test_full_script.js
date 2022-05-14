;(function () {
    'use strict'

    const get = (target) => {
        return document.querySelector(target)
    }

    const carousel = get('.carousel')
    const prevButton = get('.carousel_prev_button')
    const nextButton = get('.carousel_nest_button')

    const init = () => {
        for (let index = 1; index <= 16; index++) {
            const carouselItem = document.createElement('div');
            const carouselImage = document.createElement('img');
            carouselImage.src = `https://via.placeholder.com/200x150?text=img${index}`;
            carouselItem.className = 'carousel_item';
            carouselItem.appendChild(carouselImage);
            carousel.appendChild(carouselItem);


        }
        // const six = get('.carousel_item:nth-child(16)');
        // six.style.transform = 'rotateY(22.5deg)';
        // six.style.backgroundColor='white';
    }


    init()
})()