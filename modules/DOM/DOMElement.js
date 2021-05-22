import dom from "./index";

class DOMElement {

    constructor(selector, context, single) {
        this._selector = null;
        this._isSingle = null;
        this._context = null;
        this._element = null;

        this.length = null;

        this._setArguments(selector, context, single);
        this._setElement();
        this.length = this._element.length;
        // this._loop(this._element, (item, i) => this[i] = item);
    }


    /**
     * 
     * @return {Array} (this._elements)
     * 
     */
    get(index = null) {
        if (index === null) return this._element;
        if (index < 0) return null;
        return this._element[index];
    }


    first() {
        return this.get(0);
    }


    last() {
        return this.get(this.length - 1);
    }


    /**
     * 
     * @param {string/null} selector
     * @param {boolean} single
     * 
     * - Удаляет елементы либо находит по selector и удаляет
     * 
     */
    remove(selector, single) {
        if (!selector) {
            this.each(item => item.parentNode && item.parentNode.removeChild(item));
            return this;
        }
        this.find(selector, single).each(item => item.parentNode && item.parentNode.removeChild(item));
        return this;
    }


    /**
     * 
     * @param {function} fn
     * 
     * - Пробегается циклом по this._elements
     *  
     */
    each(fn) {
        if (!this.length) return this;
        let i = 0;
        while (i < this.length) {
            fn(this._element[i], i, this._element);
            i++;
        }
        return this;
    }


    /**
     * 
     * @param {string} selector 
     * @param {boolean} single
     * 
     * @return {DOMElement}
     * 
     * - Находит элементы по селектору
     * 
     */
    find(selector, single) {
        let res = [];

        this.each(item => {
            if (!item) return;

            if (single) {
                res.push(item.querySelector(selector));
            } else {
                this._loop(item.querySelectorAll(selector), (el) => {
                    res.push(el);
                });
            }
        });

        return dom(res);
    }


    filter(fn) {
        return dom(this._element.filter(fn));
    }


    module(name, args) {
        return this.each(item => dom.execModule(name, item, args));
    }


    parent() {
        let items = [];
        this.each(el => {
            let parent = el.parentNode;
            if (!parent || !parent.tagName || items.indexOf(parent) !== -1) return;
            items.push(parent);
        });
        return dom(items);
    }


    append(item) {
        return this.each(el => el.appendChild(item));
    }


    child(single) {
        let items = [];
        this.each(el => {
            if (single) {
                let child = el.firstChild;
                while (!child || !child.tagName) {
                    if (child === null) break;
                    child = child.nextSibling;
                }
                if (!child || !child.tagName) return;
                items.push(child);
                return;
            }
            let children = this._collectionToArray(el.children);
            if (!children || !children.length) return;
            this._loop(children, child => items.push(child));
        });
        return dom(items);
    }


    next() {
        let items = [];
        this.each(el => {
            let next = el.nextSibling;
            while (!next || !next.tagName) {
                if (next === null) break;
                next = next.nextSibling;
            }
            if (!next || !next.tagName) return;
            items.push(next);
        });
        return dom(items);
    }


    prev() {
        let items = [];
        this.each(el => {
            let prev = el.previousSibling;
            while (!prev || !prev.tagName) {
                if (prev === null) break;
                prev = prev.previousSibling;
            }
            if (!prev || !prev.tagName) return;
            items.push(prev);
        });
        return dom(items);
    }


    closest(selector) {
        let res = [];
        let search;

        if (typeof selector === 'string') {
            search = this._collectionToArray(dom.document.querySelectorAll(selector));
        } else {
            search = [selector];
        }

        let total = search.length;

        if (!total) return dom(res);

        this.each(el => {
            let parent = el.parentNode;
            while (!parent || !parent.tagName || search.indexOf(parent) === -1 || res.indexOf(parent) !== -1) {
                if (parent === null) break;
                parent = parent.parentNode;
            }
            if (!parent || !parent.parentNode) return;
            res.push(parent);
        });

        return dom(res);
    }



    wrap(wrapper) {
        if (typeof wrapper === 'string') {
            let div = dom.create('div');
            div.innerHTML = wrapper;

            let child = div.firstChild;

            while (!child || !child.tagName) {
                if (child === null) break;
                child = child.firstChild;
            }

            if (!child) {
                wrapper = null;
            } else {
                wrapper = child;
            }
        }

        if (!wrapper) return;

        let child = wrapper.firstChild;

        while (!child || !child.tagName) {
            if (child === null) break;
            child = child.firstChild;
        }

        if (!child) child = wrapper;

        return this.each(el => {
            el.parentNode.insertBefore(wrapper, el);
            child.appendChild(el);
        });
    }


    find(selector, single) {
        let res = [];
        this.each(el => {
            if (single) {
                let item = el.querySelector(selector);
                if (!item || res.indexOf(item) !== -1) return;
                res.push(item);
                return;
            }
            this._loop(el.querySelectorAll(selector), item => res.push(item));
        });
        return dom(res);
    }


    html(str) {
        if (typeof str === 'undefined') {
            let html = '';
            this.each(el => html += el.innerHTML);
            return html;
        }
        this.each(el => el.innerHTML = str);
        return this;
    }


    addClass(className) {
        return this.each(el => dom.addClass(el, className));
    }


    removeClass(className) {
        return this.each(el => dom.removeClass(el, className));
    }


    toggleClass(className) {
        return this.each(el => dom.toggleClass(el, className));
    }

    hasClass(className) {
        return this._element.every(item => item.classList.contains(className));
    }

    slideUp() {
        return this.each(el => {
            dom.slideUp(el);
        });
    }


    attr(attr, value) {
        if (typeof value !== 'undefined') {
            return this.each(item => {
                item.setAttribute(attr, value);
            });
        }

        if (!this._element[0]) return undefined;

        if (attr.match(/^data-/)) {
            attr = dom.toCamelCase(attr.replace(/^data-/, ''));
            return this._element[0].dataset[attr];
        }

        attr = dom.toCamelCase(attr);

        return this._element[0][attr];
    }


    hasAttr(attr) {
        return this._element.every(item => item.hasAttribute(attr));
    }



    slideDown() {
        let timer;
        return this.each(el => {
            dom.slideDown(el);
        });
    }


    toggleSlide() {
        this.each(el => {
            dom.toggleSlide(el);
        });
    }



    on(event, fn) {
        return this.each(el => {
            if (!el) return;
            event.split(' ').forEach(ev => {
                if (!ev) return;
                el.addEventListener(ev, (e) => {
                    fn(e, this);
                });
            });
        });
    }


    dispatch(event, sets) {
        return this.each(item => {
            dom.dispatch(item, event, sets);
        });
    }


    preventDefault(event = 'click') {
        return this.each(el => {
            el.addEventListener(event, e => e.preventDefault());
        });
    }


    stopPropagation(event = 'click') {
        return this.each(el => {
            el.addEventListener(event, e => e.stopPropagation());
        });
    }


    click() {
        return this.each(el => el.click());
    }


    focus() {
        return this.each(el => el.focus());
    }


    reset() {
        return this.each(item => {
            if (!item.parentNode) return;
            let clone = item.cloneNode(true);
            item.parentNode.replaceChild(clone, item);
        });
    }


    ////////////////////////////////////////////////////////////////
    //                        PRIVATE METHODS
    ///////////////////////////////////////////////////////////////

    _loop(arr, fn) {
        if (!arr) return;
        let total = arr.length;
        if (!total) return;
        let i = 0;
        while (i < total) {
            fn(arr[i], i, arr);
            i++;
        }
    }


    _setArguments(selector, context, single) {
        let selectType = typeof selector;

        if (selectType === 'object' && typeof selector.length !== 'undefined' && !selector.tagName) {
            this._selector = selector;
            this._isSingle = false;
            this._context = dom.body;
            this._element = selector;
            this._loop(selector, (el, i) => this[i] = el);
            return;
        }

        if (selectType === 'undefined') {
            selector = dom.body;
        }

        this._selector = selector;

        let cType = typeof context;
        let sType = typeof single;

        if (cType === 'undefined') {
            this._isSingle = this._selector === dom.body ? true : false;
            this._context = dom.body;
            return;
        }

        if (cType === 'boolean') {
            this._isSingle = context;
            this._context = dom.body;
            return;
        }

        if (cType === 'string') {
            this._context = dom.document.querySelector(context);
        } else {
            this._context = context;
        }


        if (sType === 'boolean') {
            this._isSingle = single;
        } else {
            this._isSingle = false;
        }
    }


    _setElement() {
        if (this._element) return;

        let sType = typeof this._selector;

        if (sType === 'string') {
            if (this._isSingle) {
                let el = this._context.querySelector(this._selector);
                if (el) {
                    this._element = [el];
                    this[0] = el;
                } else {
                    this._element = [];
                }
            } else {
                this._element = this._collectionToArray(this._context.querySelectorAll(this._selector), true);
            }
            return;
        }

        if (sType === 'object') {
            this._element = [this._selector];
            this[0] = this._selector;
        }
    }


    _collectionToArray(collection, setThis = false) {
        if (!collection) return [];

        let total = collection.length;

        if (!total) return [];

        let res = [];
        let i = 0;

        while (i < total) {
            if (setThis) this[i] = collection[i];
            res[i] = collection[i];
            i++;
        }

        return res;
    }

}



export default DOMElement;