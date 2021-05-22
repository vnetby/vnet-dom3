import $ from "jquery";


import "../../../modules/dropdown";
import "../../../modules/tabs";
// import "../../../modules/cssSlider";

import { setSlide, nextSlide } from "../../../modules/cssSlider";

import "../../css/dev/index.scss";

import dom from "../../../index.js";
import domJSX from "../../../modules/domJSX";



const init = () => {
    console.log(dom('.section-title').html());
    // testDOM();
    // testJQuery();
}






const testJQuery = () => {
    let time = performance.now();

    for (let i = 0; i < 10000; i++) {
        dom('.form').find('.section-title').parent().next();
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
        $('.section-title').parent().next();
        // dom('.form').html('<input type="text" value="test">');
        // dom('.test-input').attr('value');
        // dom('div').filter(item => !item.classList.contains('dropdown')).addClass('active').removeClass('active');
    }

    let endTime = performance.now();

    console.log(`DOM: ${endTime - time}ms`);
}



init();