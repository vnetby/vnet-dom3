import dom from ".";

class DOM {

    constructor() {
        this.window = window;
        this.document = this.window.document;
        this.body = this.document.body;
        this.head = this.document.head;

        this._windowResizeCallbacks = [];
        this._windowResizeTimer = null;

        this._contentLoadCallbacks = [];

        this._modules = {};

        this.initWindowResize();
        this.initContentLoad();
    }


    addModule(name, fn) {
        if (!this._modules[name]) this._modules[name] = fn;
    }


    execModule(name, el, args) {
        if (!this._modules[name]) {
            console.error(`Module ${name} doesn't exists`);
            return;
        }
        this._modules[name](el, args);
    }


    initWindowResize() {
        clearTimeout(this._windowResizeTimer);
        this.window.addEventListener('resize', e => {
            this._windowResizeTimer = setTimeout(() => {
                this._windowResizeCallbacks.forEach(fn => fn && fn(e));
            }, 10);
        });
    }


    onWindowResize(fn) {
        this._windowResizeCallbacks.push(fn);
    }


    onContentLoad(fn) {
        if (this.document.readyState === 'interactive' || this.document.readyState === 'complete') {
            fn();
        } else {
            this._contentLoadCallbacks.push(fn);
        }
    }


    initContentLoad() {
        if (this.document.readyState === 'interactive' || this.document.readyState === 'complete') {
            this._contentLoadCallbacks.forEach(fn => fn);
        } else {
            this.window.addEventListener('DOMContentLoaded', e => {
                this._contentLoadCallbacks.forEach(fn => fn());
            });
        }
    }


    dispatch(el, event, sets) {
        let realSets = {
            bubbles: true, cancelable: true, detail: undefined, ...sets
        };
        event.split(' ').forEach(ev => {
            ev = new CustomEvent(ev, realSets);
            el.dispatchEvent(ev);
        });
    }


    removeStyle(el, style) {
        let attr = el.getAttribute('style');
        if (!attr) return;

        style = style.split(' ').map(item => `(${this._fromCamelCase(item)}[^:]*:[^;]+;?)`).join('|');

        let regex = new RegExp(style, 'g');
        attr = attr.replace(regex, '').trim();

        if (!attr) {
            el.removeAttribute('style');
        } else {
            el.setAttribute('style', attr);
        }
    }


    getCss(el, style) {
        return this.window.getComputedStyle(el)[style];
    }


    addClass(el, className) {
        className.split(' ').forEach(name => !el.classList.contains(name) && el.classList.add(name));
    }

    removeClass(el, className) {
        className.split(' ').forEach(name => el.classList.contains(name) && el.classList.remove(name));
    }

    toggleClass(el, className) {
        className.split(' ').forEach(name => el.classList.contains(name) ? el.classList.remove(name) : el.classList.add(name));
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

        setTimeout(() => {
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


    jsonParse(obj) {
        if (!obj) return null;
        let res = null;

        try {
            res = JSON.parse(obj);
        } catch (err) {
            console.error(err);
        }

        return res;
    }


    jsonStringify(obj) {
        if (!obj) return null;
        let res = null;

        try {
            res = JSON.stringify(obj);
        } catch (err) {
            console.error(err);
        }

        return res;
    }


    async ajax({ url, data, xhrEvents, getXhr, success, error, method, headers }) {
        return new Promise(async (resolve, reject) => {
            data = this._getRequestData(data);
            method = this._getRequstMethod(method, data);

            let xhr = new XMLHttpRequest;
            xhr.open(method, url, true);

            this._setRequestHeader(xhr, headers);

            if (xhrEvents) {
                for (let event in xhrEvents) {
                    if (event === loadend) continue;
                    xhr.addEventListener(event, xhrEvents[event]);
                }
            }

            xhr.addEventListener('loadend', (res) => {
                if (res.target.status !== 200) {
                    error && error(res.target, res);
                } else {
                    success && success(res.target, res);
                    !getXhr && resolve(res.target, res);
                }
            });

            xhr.send(data);

            if (getXhr) {
                resolve(xhr);
            }
        });
    }


    randomStr(length = 10) {
        let result = '';
        let characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
        let charactersLength = characters.length;
        for (let i = 0; i < length; i++) {
            result += characters.charAt(Math.floor(Math.random() * charactersLength));
        }
        return result;
    }


    toCamelCase(str) {
        return str.replace(/-./g, function (letter, index) {
            return letter.replace('-', '').toUpperCase();
        });
    }



    _getRequestData(data) {
        if (!data) return null;

        let type = typeof data;

        if (type === 'string') return data;
        if (type !== 'object') return null;
        if (data instanceof FormData) return data;

        let requestData = new FormData();

        for (let key in data) {
            requestData.append(key, data[key]);
        }

        return requestData;
    }



    _getRequstMethod(method, data) {
        if (method) return method;
        return data ? 'post' : 'get';
    }


    _setRequestHeader(xhr, headers) {
        if (!headers) return;
        for (let key in headers) {
            xhr.setRequestHeader(key, headers[key]);
        }
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