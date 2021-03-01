import "./style.scss";

import dom from "../DOM";


let INITED_ITEMS = [];


const tabs = wrap => {
  if (INITED_ITEMS.indexOf(wrap) > -1) return;

  dom('.tab-link', wrap).on('click', (e) => {
    e.preventDefault();

    let _btn = dom(e.currentTarget);

    if (_btn.hasClass('active')) return;

    dom('.tab-link', wrap).removeClass('active');
    _btn.addClass('active');

    dom('.tab', wrap).removeClass('active');
    dom(`#${e.currentTarget.dataset.target}`, wrap).addClass('active');
  });

  INITED_ITEMS.push(wrap);
}


dom.addModule('tabs', tabs);
// dom.modules.tabs = tabs;