class DOM {

    constructor() {
        this.window = window;
        this.document = this.window.document;
        this.body = this.document.body;
        this.head = this.document.head;
    }


    removeStyle(el, style) {
        let attr = el.getAttribute('style');
        if (!attr) return;

        style = style.split(' ').map(item => `(${item}[^:]*:[^;]+;?)`).join('|');

        let regex = new RegExp(style, 'g');
        attr = attr.replace(regex, '').trim();

        if (!attr) {
            el.removeAttribute('style');
        } else {
            el.setAttribute('style', attr);
        }
    }


    addClass(el, className) {
        className.split(' ').forEach(name => !el.classList.contains(name) && el.classList.add(name));
    }

    removeClass(el, className) {
        className.split(' ').forEach(name => el.classList.contains(name) && el.classList.remove(name));
    }

    hasClass(el, className) {
        return el.classList.contains(className);
    }


    slideDown(el) {
        if (el.classList.contains('slide-down')) return;
        this.removeClass(el, 'slide-up');
        this.addClass(el, 'slide-down');

        let transition = this.window.getComputedStyle(el).transitionDuration || 0;
        transition = parseFloat(transition) * 1000;

        let prevHeight = el.offsetHeight;

        el.style.width = `${el.offsetWidth}px`;
        el.style.position = 'absolute';
        el.style.height = 'auto';

        let height = el.offsetHeight;

        el.style.height = `${prevHeight}px`;

        this.removeStyle(el, 'position width');

        setTimeout(() => {
            if (!el.classList.contains('slide-down')) return;
            el.style.height = `${height}px`;
        }, 60);

        setTimeout(() => {
            if (!el.classList.contains('slide-down')) return;
            this.removeStyle(el, 'height');
        }, transition + 60);
    }



    slideUp(el) {
        if (el.classList.contains('slide-up')) return;
        this.removeClass(el, 'slide-down');
        this.addClass(el, 'slide-up');

        let height = el.offsetHeight;
        el.style.height = `${height}px`;

        el.dataset.slideUpTimer = setTimeout(() => {
            if (!el.classList.contains('slide-up')) return;
            el.style.height = '0px';
        }, 60);
    }


    toggleSlide(el) {
        if (el.classList.contains('slide-up')) {
            this.slideDown(el);
        } else {
            this.slideUp(el);
        }
    }



    create(tag, attrs) {
        let item = this.document.createElement(tag);

        if (!attrs) return item;

        let attrType = typeof attrs;

        if (attrType === 'string') {
            item.setAttribute('class', attrs);
            return item;
        }

        if (attrType === 'object') {
            for (let key in attrs) {
                let attrName = this._getAttrName(key);
                if (!attrName) continue;
                item.setAttribute(attrName, attrs[key]);
            }
        }

        return item;
    }



    _getAttrName(attr) {
        if (!attr) return false;
        if (attr === 'className') return 'class';
        return this._fromCamelCase(attr);
    }


    _fromCamelCase(str) {
        if (!str) return false;
        return str.replace(/\.?([A-Z])/g, (x, y) => "-" + y.toLowerCase()).replace(/^-/, "");
    }

}



export default DOM;