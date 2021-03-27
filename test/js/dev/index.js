import $ from "jquery";


import "../../../modules/dropdown";
import "../../../modules/tabs";
// import "../../../modules/cssSlider";

import { setSlide, nextSlide } from "../../../modules/cssSlider";

import "../../css/dev/index.scss";

import dom from "../../../index.js";



const init = () => {
    // const showValue = input => {
    //     console.log(input.attr('value'));
    // }
    // dom('.test-input').each(input => {
    //     input = dom(input);
    //     showValue(input);
    //     input.on('click focus blur change input', e => {
    //         showValue(input);
    //     })
    // });
    // let el = dom('.js-toggle-dropdown').map();
    // let items = dom('.js-toggle-dropdown');
    // dom('.js-toggle-dropdown').module('dropdown');
    // dom('.js-dom-tabs').module('tabs');

    // dom('.js-toggle-slide').on('click', (e) => {
    //     e.preventDefault();
    //     dom(e.currentTarget).next().toggleSlide();
    // });

    // dom('.js-slider').module('cssSlider').on('init', (e, _slider) => {
    // });

    // testDOM();
    // testJQuery();
}






const testJQuery = () => {
    let time = performance.now();

    for (let i = 0; i < 10000; i++) {
        // $('.test-input').attr('value');
        // $('div').filter((i, item) => !item.classList.contains('dropdown')).addClass('active').removeClass('active');
        // $('.js-toggle-dropdown').parent().addClass('test');
        // $('div').removeClass('is-div is-div');
    }

    let endTime = performance.now();

    console.log(`JQUERY: ${endTime - time}ms`);
}


const testDOM = () => {
    let time = performance.now();

    for (let i = 0; i < 10000; i++) {
        // dom('.test-input').attr('value');
        // dom('div').filter(item => !item.classList.contains('dropdown')).addClass('active').removeClass('active');
    }

    let endTime = performance.now();

    console.log(`DOM: ${endTime - time}ms`);
}



init();