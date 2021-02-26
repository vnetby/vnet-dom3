// import $ from "jquery";

import "../../css/dev/index.scss";


import dom from "../../../index.js";

import tabs from "../../../modules/tabs";
import dropdown from "../../../modules/dropdown";
import cssSlider from "../../../modules/cssSlider";

import domJSX from "../../../modules/domJSX";



const init = async () => {
    tabs();
    dropdown();
    cssSlider();
    dom('.js-toggle-slide').on('click', (e, $btn) => {
        e.preventDefault();
        $btn.next().toggleSlide();
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