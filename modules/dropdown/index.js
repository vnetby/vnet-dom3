import "./style.scss";

import dom from "../DOM";


let HAS_BODY_EVENTS = false;

let INITED_ITEMS = [];



const dropdown = (btn) => {
  setBodyEvents();
  if (INITED_ITEMS.indexOf(btn) > -1) return;
  init(btn);
  INITED_ITEMS.push(btn);
}



const setBodyEvents = () => {
  if (HAS_BODY_EVENTS) return;
  HAS_BODY_EVENTS = true;

  dom.body.addEventListener('click', e => {
    closeDropdowns();
  });
}



const init = btn => {
  let _target = dom(`#${btn.dataset.target}`);

  let _btn = dom(btn);


  _btn.on('click', (e) => {
    e.preventDefault();
    e.stopPropagation();

    closeDropdowns(e.currentTarget);

    if (_btn.hasClass('active')) {
      _target.removeClass('active');
      _btn.removeClass('active');
    } else {
      _target.addClass('active');
      _btn.addClass('active');
    }

  });

  _target.on('click', e => {
    e.stopPropagation();
  });
}



const closeDropdowns = (excludeBtn) => {
  dom('.js-toggle-dropdown').each(btn => {
    if (btn === excludeBtn) return;
    dom(`#${btn.dataset.target}`).removeClass('active');
    dom(btn).removeClass('active');
  });
}

dom.modules.dropdown = dropdown;