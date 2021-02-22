import "@babel/polyfill";

import "./modules/slider";


import $ from "jquery";


import dom from "./modules/DOM";



const init = async () => {

    // testJQuery();
    // testDOM();
    await dom.ajax({
        url: '/ajax.php',
        data: dom.jsonStringify({
            name: 'vadzim',
            lastname: 'kananovich'
        }),
        success: (res, event) => {
            console.log(event);
        }
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