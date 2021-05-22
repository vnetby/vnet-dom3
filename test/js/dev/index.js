import $ from "jquery";

import "../../../modules/ElementExtend.js";

import "../../../modules/dropdown";
import "../../../modules/tabs";
// import "../../../modules/cssSlider";

import { setSlide, nextSlide } from "../../../modules/cssSlider";

import "../../css/dev/index.scss";

import dom from "../../../index.js";
import domJSX from "../../../modules/domJSX";



const init = () => {
    // document.findAll('.section-title').on('remove', e => {
    //     e.target.remove();
    // });
    // setTimeout(() => {
    //     document.findAll('.section-title').dispatch('remove');
    // }, 1000);
    // document.find('.section-title').parent().html('test');
    // console.log(document.findAll('.section-title').html('testest'));
    // document.findAll('.section-title').html();
    // let el = document.find();
    // document.findAll('.section-title').addClass('test some-other-class section-title');
    // let el = document.querySelectorAll('.section-title');
    // console.log(document.body.getId);
    // body.each(item => {
    //     console.log(item);
    // });
    // testJQuery();
    // testDOM();
}






const testJQuery = () => {
    let time = performance.now();

    for (let i = 0; i < 10000; i++) {
        // dom('.section-title').html();
        // $('.section-title').html();
        // $('.section-title').addClass('test some-other-class section-title');
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
        document.findAll('.section-title').html();
        // dom('.section-title').addClass('test some-other-class section-title');
        // document.findAll('.section-title').addClass('test some-other-class section-title');
        // dom('.form').html('<input type="text" value="test">');
        // dom('.test-input').attr('value');
        // dom('div').filter(item => !item.classList.contains('dropdown')).addClass('active').removeClass('active');
    }

    let endTime = performance.now();

    console.log(`DOM: ${endTime - time}ms`);
}



init();