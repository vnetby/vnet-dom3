
/**
 * 
 * 
 * - НЕ ИСПОЛЬЗОВАТЬ !!!! 
 * - В РАЗРАБОТКЕ
 * 
 * 
 */

// ELEMENT EXTENDS

Element.prototype.find = function (selector) {
    return this.querySelector(selector);
}

Element.prototype.findAll = function (selector) {
    return this.querySelectorAll(selector);
}

Element.prototype.remove = function () {
    this.parentNode.removeChild(this);
    return this;
}

Element.prototype.addClass = function (className) {
    className.split(' ').forEach(name => {
        if (this.classList.contains(name)) return;
        this.classList.add(name);
    });
    return this;
}

Element.prototype.removeClass = function (className) {
    className.split(' ').forEach(name => {
        if (!this.classList.contains(name)) return;
        this.classList.add(name);
    });
    return this;
}

Element.prototype.html = function (text) {
    if (typeof text === 'undefined') {
        return this.innerHTML;
    }
    this.innerHTML = text;
    return this;
}

Element.prototype.parent = function () {
    return this.parentNode;
}

Element.prototype.on = function (e, fn) {
    this.addEventListener(e, fn);
    return this;
}

Element.prototype.dispatch = function (e, sets) {
    let realSets = {
        bubbles: true, cancelable: true, detail: undefined, ...sets
    };
    e.split(' ').forEach(ev => {
        this.dispatchEvent(new CustomEvent(ev, realSets));
    });
    return this;
}


// NODELIST EXTENDS

NodeList.prototype.each = function (fn) {
    this.forEach((item, i) => {
        fn(item, i);
    });
    return this;
}

NodeList.prototype.remove = function () {
    this.forEach(item => item.remove());
    return this;
}

NodeList.prototype.addClass = function (className) {
    this.forEach(item => item.addClass(className));
    return this;
}

NodeList.prototype.removeClass = function (className) {
    this.forEach(item => item.removeClass(className));
    return this;
}

NodeList.prototype.html = function (html) {
    if (typeof html === 'undefined') {
        let str = [];
        this.forEach(el => str.push(el.html(html)));
        return str;
    }
    this.forEach(el => el.html(html));
    return this;
}

NodeList.prototype.on = function (e, fn) {
    this.forEach(el => el.on(e, fn));
    return this;
}

NodeList.prototype.dispatch = function (e, sets) {
    this.forEach(el => el.dispatch(e, sets));
    return this;
}


// HTMLDOCUMENT EXTENDS

HTMLDocument.prototype.find = Element.prototype.find;
HTMLDocument.prototype.findAll = Element.prototype.findAll;





// HELPERS FUNCTIONS

// function each(arr, fn) {
//     let i = 0;
//     while (i < arr.length) {
//         fn(arr[i], i, arr);
//         i++;
//     }
// }