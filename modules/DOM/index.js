(function () {
    if (typeof window.CustomEvent === "function") return false;

    function CustomEvent(event, params) {
        params = params || { bubbles: false, cancelable: false, detail: undefined };
        var evt = document.createEvent("CustomEvent");
        evt.initCustomEvent(
            event,
            params.bubbles,
            params.cancelable,
            params.detail
        );
        return evt;
    }

    CustomEvent.prototype = window.Event.prototype;

    window.CustomEvent = CustomEvent;
})();

import "@babel/polyfill";

import DOMElement from "./DOMElement";
import DOM from "./DOM";


const dom = (selector, context, single) => {
    return new DOMElement(selector, context, single);
}

dom.__proto__ = new DOM;

export default dom;