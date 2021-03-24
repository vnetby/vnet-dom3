import "./style.scss";

import dom from "../DOM/";
import domJSX from "../domJSX";


let INITED_SLIDERS = [];


const cssSlider = (slider, sets) => {
    if (INITED_SLIDERS.indexOf(slider) > -1) return;
    INITED_SLIDERS.push(slider);

    init(slider, sets);
}



const init = (slider, args) => {
    let _slider = dom(slider);

    let before = dom.window.getComputedStyle(slider, ':before');

    let defSets = {
        slidesToShow: 1,
        draggable: false,
        dots: false
    };

    let sets = getSliderSets(slider, defSets, args, before);

    dom.onWindowResize(e => sets = getSliderSets(slider, defSets, args, before));

    setInterval(() => {
        // console.log(sets);
    }, 1000);

    _slider.addClass('dom-css-slider');

    let id = dom.randomStr();


    let wrap = (<div className="slider-wrap"></div>);
    let outher = (<div className="slider-outher" style="transition-duration: 0s;"></div>);

    wrap.appendChild(outher);

    _slider.append(wrap);

    let activeSlide = _slider.find('.slide-item.active').get(0);

    _slider.child().each((slide, i) => {
        if (slide === wrap) return;

        let content = (<div className="slide-content"></div>);

        slide.appendChild(content);

        dom(slide).child().each(el => {
            if (el === content) return;
            content.appendChild(el);
        });

        outher.appendChild(slide);

        let input = (
            <input
                type="radio"
                name={id}
                id={`${id}${i}`}
                className="slider-ancor"
                onChange={e => onSlideChange(_slider)}
            >
            </input>
        );

        if ((!activeSlide && i === 0) || (activeSlide && activeSlide === slide)) {
            input.checked = true;
            dom.addClass(slide, 'active');
        }

        outher.insertBefore(input, slide);
    });

    if (slider.hasAttribute('data-dots')) {
        _slider.append(createDots(outher));
    }

    onSlideChange(_slider);
    initDraggable(_slider);

    outher.addEventListener('transitionend', e => {
        if (e.target !== outher) return;
        setVisibleSlides(_slider);
        lazyLoad(_slider);
    });

    dom.onWindowResize(e => {
        onSlideChange(_slider);
    });

    setTimeout(() => {
        dom.removeStyle(outher, 'transitionDuration');
        setVisibleSlides(_slider);
        lazyLoad(_slider);
        _slider.addClass('loaded');
        _slider.dispatch('init');
    }, 10);
}


const getSliderSets = (slider, defSets, sets = {}, before = {}) => {
    let beforeSets = getBeforeSets(before.content);

    let settings = {};

    Object.keys(defSets).forEach(key => {
        let type = typeof defSets[key];
        if (type === "boolean") {
            if (slider.dataset.hasOwnProperty(key)) {
                if (slider.dataset[key] === 'false') {
                    settings[key] = false;
                    return;
                }
                settings[key] = true;
                return;
            }
            if (beforeSets.hasOwnProperty(key)) {
                if (beforeSets === 'false') {
                    settings[key] = false;
                }
                settings[key] = true;
                return;
            }
            settings[key] = defSets[key];
            return;
        }
        if (type === "number") {
            if (slider.dataset.hasOwnProperty(key)) {
                settings[key] = parseFloat(slider.dataset[key]);
                return;
            }
            if (beforeSets.hasOwnProperty(key)) {
                settings[key] = parseFloat(beforeSets[key]);
                return;
            }
            settings[key] = defSets[key];
            return;
        }
        if (slider.dataset.hasOwnProperty(key)) {
            settings[key] = slider.dataset[key];
            return;
        }
        if (beforeSets.hasOwnProperty(key)) {
            settings[key] = beforeSets[key];
            return;
        }
        settings[key] = defSets[key];
    });
    return { ...settings, ...sets };
}



const getBeforeSets = before => {
    if (!before || before === 'none') return {};
    let settings = {};
    before.replace(/[^\w\:\;]/g, '').split(';').forEach(row => {
        row = row.split(':');
        if (typeof row[1] === 'undefined') row[1] = true;
        settings[row[0]] = row[1];
    });
    return settings;
}




const createDots = (outher) => {
    return (
        <div className="slider-dots">
            <div className="dots-outher">
                {
                    dom(outher).find('.slider-ancor').get().map(input => {
                        let _input = dom(input);
                        let _slide = _input.next();

                        let label = (
                            <label className="slide-dot" for={input.id}></label>
                        );

                        if (input.checked) {
                            dom.addClass(label, 'active');
                        }

                        let thumb = _slide.attr('data-thumb');
                        if (thumb) {
                            label.appendChild(<img src={thumb}></img>);
                            label.classList.add('has-thumb');
                        }

                        return label;
                    })
                }
            </div>
        </div>
    );
}



const onSlideChange = (_slider) => {
    let _input = _slider.find('.slider-ancor:checked');
    let _slide = _input.next();

    let id = _input.attr('id');

    _slider.find('.slide-item.active').removeClass('active');
    _slider.find('.slide-dot.active').removeClass('active');

    _slide.addClass('active');
    _slider.find(`.slide-dot[for="${id}"]`).addClass('active');

    translateOuther(_slider);
}



const setVisibleSlides = _slider => {
    let _wrap = _slider.find('.slider-wrap');

    let sliderWidth = _wrap.get(0).offsetWidth;
    let sliderHeight = _wrap.get(0).offsetHeight;

    let sliderRect = _wrap.get(0).getBoundingClientRect();
    let sliderLeft = sliderRect.left;
    let sliderTop = sliderRect.top;

    let minLeft = sliderLeft;
    let maxLeft = sliderLeft + sliderWidth;


    let minTop = sliderTop;
    let maxTop = sliderTop + sliderHeight;

    _slider.find('.slide-item').removeClass('visible').each(slide => {
        // slide.className = slide.className.replace(/visible-[\d]+|visible/gi, '');

        let rect = slide.getBoundingClientRect();

        let width = slide.offsetWidth;
        let height = slide.offsetHeight;

        let left = rect.left;
        let right = left + width;

        let top = rect.top;
        let bottom = top + height;


        if ((right > minLeft + 10 && left < maxLeft - 10)) {
            slide.classList.add('visible');
        }
    });

}


const lazyLoad = _slider => {
    _slider.find('.slide-item.visible').each(slide => {
        dom(slide).find('img[data-lazy]').each(img => {
            if (img.classList.contains('lazy-loaded')) return;
            img.addEventListener('load', e => {
                setTimeout(() => {
                    img.classList.add('lazy-loaded');
                }, 10);
            });
            img.src = img.dataset.lazy;
        });
    });
}




const translateOuther = (_slider) => {
    let translate;
    let _input = _slider.find('.slider-ancor:checked');
    let _slide = _input.next();
    let _outher = _input.parent();
    let _wrap = _outher.parent();

    if (_slider.hasAttr('data-vertical')) {
        let top = _slide.get(0).offsetTop;
        _outher.get(0).style.transform = `translateY(-${top}px)`;
        translate = top;
    } else {
        let slideLeft = _slide.get(0).offsetLeft;
        let wrapWidth = _wrap.get(0).offsetWidth;
        let totalWidth = _outher.find('.slide-item').get().map(item => item.offsetWidth).reduce((accum, val) => accum + val) - wrapWidth;
        let slideWidth = _slide.get(0).offsetWidth;
        let centerWidth = wrapWidth / 2 - slideWidth / 2;

        let left = -(slideLeft - centerWidth);

        if (left > 0) left = 0;
        if (Math.abs(left) > totalWidth) left = -totalWidth;

        if (totalWidth < 0) {
            left = 0;
            _slider.addClass('no-translate');
        } else {
            _slider.removeClass('no-translate');
        }

        _outher.get(0).style.transform = `translateX(${left}px)`;
        translate = left;
    }

    _outher.attr('data-translate', translate);
}




const initDraggable = _slider => {
    if (!_slider.hasAttr('data-draggable')) return;

    _slider.find('.slider-outher img').each(img => img.setAttribute('draggable', 'false'));

    let _outher = _slider.find('.slider-outher');



    let _input = _slider.find('.slider-ancor:checked');
    let _slide = _input.next();

    let isVertical = _slider.hasAttr('data-vertical');

    let startTranslate = parseFloat(_outher.attr('data-translate')) || 0;
    let isDown = false;
    let startLeft = 0;
    let startTop = 0;
    let lastLeftDrag = 0;
    let lastTopDrag = 0;
    let slideWidth = _slide.get(0).offsetWidth;
    let slideHeight = _slide.get(0).offsetHeight;

    _outher.on('mousedown', e => {
        if (_slider.get(0).classList.contains('no-translate')) return;
        isDown = true;
        startLeft = e.pageX;
        startTop = e.pageY;

        startTranslate = parseFloat(_outher.attr('data-translate')) || 0;

        slideWidth = _slide.get(0).offsetWidth;
        slideHeight = _slide.get(0).offsetHeight;

        _outher.get(0).style.transitionDuration = '0s';
    });

    _outher.on('mouseup mouseleave', e => {
        if (_slider.get(0).classList.contains('no-translate')) return;
        isDown = false;
        dom.removeStyle(_outher.get(0), 'transitionDuration');

        let minDrag = getMinDrag(_slider, slideWidth, slideHeight);

        if (isVertical) {
            if (Math.abs(lastTopDrag) >= minDrag) {
                if (lastTopDrag > 0) {
                    nextSlide(_slider);
                } else {
                    prevSlide(_slider);
                }
            } else {
                translateOuther(_slider);
            }
        } else {
            if (Math.abs(lastLeftDrag) >= minDrag) {
                if (lastLeftDrag > 0) {
                    nextSlide(_slider);
                } else {
                    prevSlide(_slider);
                }
            } else {
                translateOuther(_slider);
            }
        }

        lastLeftDrag = 0;
        lastTopDrag = 0;
    });

    _outher.on('mousemove', e => {
        if (_slider.get(0).classList.contains('no-translate')) return;
        if (!isDown) return;

        lastLeftDrag = startLeft - e.pageX;
        lastTopDrag = startTop - e.pageY;

        if (!isVertical) {
            let translate = startTranslate - lastLeftDrag;
            _outher.get(0).style.transform = `translateX(${translate}px)`;
        } else {
            let translate = startTranslate - lastTopDrag;
            _outher.get(0).style.transform = `translateY(${translate}px)`;
        }
    });

}



export const nextSlide = _slider => {
    let inputs = _slider.find('.slider-ancor').get();
    let activeIndex = inputs.findIndex(input => input.checked);

    setSlide(_slider, activeIndex + 1, inputs);
}


export const prevSlide = _slider => {
    let inputs = _slider.find('.slider-ancor').get();
    let activeIndex = inputs.findIndex(input => input.checked);

    setSlide(_slider, activeIndex - 1, inputs);
}



export const setSlide = (_slider, index, inputs) => {
    if (!inputs) {
        inputs = _slider.find('.slider-ancor').get();
    }
    let current = inputs.find(input => input.checked);

    if (!inputs[index]) {
        if (current) {
            dom.dispatch(current, 'change');
        }
        return;
    }

    if (current) current.checked = false;

    inputs[index].checked = true;

    dom.dispatch(inputs[index], 'change');
}



const getMinDrag = (_slider, slideWidth, slideHeight) => {
    let isVertical = _slider.hasAttr('data-vertical');
    let threshold = parseFloat(_slider.attr('data-threshold')) || 5;

    let minDrag = 0;

    if (isVertical) {
        minDrag = slideHeight / threshold;
    } else {
        minDrag = slideWidth / threshold;
    }

    return minDrag;
}



dom.addModule('cssSlider', cssSlider);