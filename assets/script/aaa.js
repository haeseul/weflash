;(function () {
    'use strict'

    const get = (target) => {
        return document.querySelector(target)
    }

    const carousel = get('.carousel')

    const init = () => {
        for (let index = 1; index <= 16; index++) {
            const carouselItem = document.createElement('div');
            const carouselImage = document.createElement('img');
            const carouselText = document.createTextNode('안녕하세요');
            carouselItem.appendChild(carouselImage);
            carouselImage.src = ""
            carousel.appendChild(carouselItem);
        }
    }

    init()
})()