import "./style.scss";

import dom from "../DOM";




const tabs = (context, selector = '.js-dom-tabs') => {
  dom(selector).each(tab => {
    init(tab);
  }, context);
}



const init = wrap => {
  dom('.tab-link', wrap).on('click', (e, $btn) => {
    e.preventDefault();

    if ($btn.hasClass('active')) return;

    dom('.tab-link', wrap).removeClass('active');
    $btn.addClass('active');

    dom('.tab', wrap).removeClass('active');
    dom(`#${e.currentTarget.dataset.target}`, wrap).addClass('active');
  });
}



export default tabs;