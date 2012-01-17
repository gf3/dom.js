// Feature tests
var ft = {};

// Thank you to John-David Dalton for his input on this feature test.
ft.scrollElement = (function() {
    var div, bak, scrollTop, scrollElement;

    bak = {}, bak.des = document.documentElement.style.cssText, bak.bs = document.body.style.cssText;
    document.body.insertBefore((div = document.createElement('div')), document.body.firstChild);
    
    document.body.style.margin = document.documentElement.style.margin = '0';
    document.body.style.height = document.documentElement.style.height = 'auto';
    div.style.cssText = 'display:block;height:9001px;';
    
    scrollTop = document.documentElement.scrollTop;
    scrollElement = ++document.documentElement.scrollTop && document.documentElement.scrollTop === scrollTop + 1
                    ? document.documentElement
                    : document.body;
    
    document.body.removeChild(div);
    document.documentElement.style.cssText = bak.des;
    document.body.style.cssText = bak.bs;
    
    return scrollElement;
})();

// Utility
function isString(o) {
    return Object.prototype.toString.call(o) == "[object Object]";
}

function timeout(delay, fn) {
    return setTimeout(fn, delay);
}

function methodize(fn) {
    var args = drop(1, arguments);
    return function (el) {
        return fn.apply(null, [].concat(el, args, drop(1, arguments)));
    }
}

// Events
function on(target, eventName, fn) {
    return target.addEventListener(eventName, fn, false);
}

function off(target, eventName, fn) {
    return target.removeEventListener(eventName, fn, false);
}

// DOM
function query(selector, context) {
    return toArray((context || document).querySelectorAll(selector));
}

function queryOne(selector, context) {
    return (context || document).querySelector(selector);
}

function make(tag, content) {
    var el = document.createElement(tag);

    content || (content = "");
    if (isString(content))
        el.innerHTML = content;
    else
        el.appendChild(content);

    return el;
}

function insertAfter(ael, bel) {
    if (bel.nextSibling)
        return bel.parentNode.insertBefore(ael, bel.nextSibling);
    else
        return bel.parentNode.appendChild(ael);
}

function addClass(el, className) {
    el.classList.add(className);
}

function removeClass(el, className) {
    el.classList.remove(className);
}

// Styling
function style(el, pseudo, prop) {
    if (!prop) {
        prop = pseudo;
        pseudo = null;
    }
    return window.getComputedStyle(el, pseudo).getPropertyValue(prop);
}

function setStyle(el, prop, val) {
    if (!val && isString(prop))
        for (k in prop)
            setStyle(el, k, prop[k]);
    else {
        prop = prop.replace(/-([a-z])/ig, function (m, l) {
            return l.toUpperCase();
        });
        el.style[prop] = val;
    }
}

function offset(el) {
    var left = 0,
        top = 0;

    if (el.offsetParent)
        do {
            left += el.offsetLeft;
            top  += el.offsetTop;
        } while (el = el.offsetParent)

    return {0: left, 1: top, left: left, top: top};
}

