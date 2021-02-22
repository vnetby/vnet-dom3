import "@babel/polyfill";

import "./modules/slider";


import $ from "jquery";


import dom from "./modules/DOM";



const init = () => {

    // testJQuery();
    // testDOM();

    dom('.link').on('click', (e, el) => {
        e.preventDefault();
        el.next().toggleSlide();
    });

    // dom('div').addClass('is-div');
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