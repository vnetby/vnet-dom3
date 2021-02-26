import "./style.scss";

import dom from "../DOM";


let HAS_BODY_EVENTS = false;



const dropdown = context => {
  setBodyEvents();
  dom('.js-toggle-dropdown', context).each(btn => {
    init(btn);
  });
}



const setBodyEvents = () => {
  if (HAS_BODY_EVENTS) return;
  HAS_BODY_EVENTS = true;

  dom.body.addEventListener('click', e => {
    closeDropdowns();
  });
}



const init = btn => {
  let $target = dom(`#${btn.dataset.target}`);

  dom(btn).on('click', (e, $btn) => {
    e.preventDefault();
    e.stopPropagation();

    closeDropdowns(e.currentTarget);

    if ($btn.hasClass('active')) {
      $target.removeClass('active');
      $btn.removeClass('active');
    } else {
      $target.addClass('active');
      $btn.addClass('active');
    }

  });

  $target.on('click', e => {
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



export default dropdown;