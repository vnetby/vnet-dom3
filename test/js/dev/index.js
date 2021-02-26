// import $ from "jquery";

import "../../css/dev/index.scss";

import "../../../modules/dropdown";
import "../../../modules/tabs";
import "../../../modules/cssSlider";


import dom from "../../../index.js";



const init = () => {
    dom('.js-toggle-dropdown').module('dropdown');
    dom('.js-dom-tabs').module('tabs');

    dom('.js-toggle-slide').on('click', (e) => {
        e.preventDefault();
        dom(e.currentTarget).next().toggleSlide();
    });
}






const testJQuery = () => {
    let time = performance.now();

    for (let i = 0; i < 100; i++) {
        $('div').removeClass('is-div is-div');
    }

    let endTime = performance.now();

    console.log(`JQUERY: ${endTime - time}ms`);
}


const testDOM = () => {
    let time = performance.now();

    for (let i = 0; i < 100; i++) {
        dom('div').removeClass('is-div is-div other-div third-div');
    }

    let endTime = performance.now();

    console.log(`DOM: ${endTime - time}ms`);
}



init();