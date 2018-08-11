/*!
 * Whale v1.5.2
 * Copyright 2017-2018 zkreations
 * Developed by José Gregorio (fb.com/JGMateran)
 * Licensed under MIT (github.com/zkreations/whale/blob/master/LICENSE)
 */
var whale = function() {
    "use strict";
    function e(t, a) {
        return e.addElements(t, a);
    }
    function t(e, t) {
        for (var a = 0, n = e.length; a < n && !1 !== t.call(e[a], a, e[a]); a++) ;
        return e;
    }
    function a(e) {
        return e.trim();
    }
    function n(e) {
        return (" " + (e.getAttribute("class") || "") + " ").replace(/[\t\r\n\f]/g, " ");
    }
    function l(e, t) {
        return -1 < n(e).indexOf(t);
    }
    function s(e, s) {
        var c = n(e);
        t(s.split(" "), function(t, n) {
            n = a(n), l(e, n) || (c += n + " ");
        }), e.setAttribute("class", a(c));
    }
    function c(e, l) {
        t(l.split(" "), function(t, l) {
            e.setAttribute("class", a(n(e).replace(" " + a(l) + " ", " ")));
        });
    }
    function i(e, a) {
        t(a.split(" "), function(t, a) {
            (l(e, a) ? c : s)(e, a);
        });
    }
    return e.extend = function(e) {
        var t, a, n, l = 1, s = arguments.length;
        for (l === s && (e = this, l--); l < s; l++) if (null != (t = arguments[l])) for (n in t) (a = t[n]) !== e[n] && (e[n] = a);
        return e;
    }, t([ s, c, i ], function(e, a) {
        a.collection = function(e, n) {
            t(e, function(e, t) {
                a(t, n);
            });
        };
    }), e.components = {}, e.addElements = function(t, a) {
        var n;
        if (a) e.components[t] = a; else for (n in t) e.components[n] = t[n];
        return this;
    }, e.extend({
        trim: a,
        forEach: t,
        hasClass: l,
        addClass: s,
        removeClass: c,
        toggleClass: i
    }), window.addEventListener("load", function() {
        var t, a = e.components;
        for (t in a) for (var n = 0, l = document.querySelectorAll("." + t), s = l.length, c = a[t]; n < s; n++) new c(l[n], n, t);
    }), e;
}();

!function() {
    "use strict";
    function e(e) {
        var t = this.classes;
        whale.forEach(e.querySelectorAll("a"), function(e, a) {
            var n = a.parentNode, l = n.querySelectorAll("ul"), s = n.querySelectorAll("a"), c = document.createElement("span"), i = l[0];
            l.length && (whale.addClass(n, t.parent), whale.addClass(c, t.arrow), a.appendChild(c), 
            a.addEventListener("click", function(e) {
                e.preventDefault(), whale.hasClass(i, t.active) ? (whale.removeClass.collection(l, t.active), 
                whale.removeClass.collection(s, t.active)) : whale.addClass.collection([ a, i ], t.active);
            }));
        });
    }
    function t(e) {
        var t = this.classes, a = e.querySelectorAll("." + t.item), n = e.querySelectorAll("." + t.panel);
        a.length && whale.forEach(a, function(l, s) {
            var c = s.href.split("#")[1], i = e.querySelector("#" + c);
            i && (whale.hasClass(i, t.active) && whale.addClass(s, t.active), s.addEventListener("click", function(e) {
                e.preventDefault(), whale.forEach([ a, n ], function(e, a) {
                    whale.removeClass.collection(a, t.active);
                }), whale.addClass.collection([ s, i ], t.active);
            }));
        });
    }
    function a(e) {
        var t = this.classes, a = e.getAttribute(this.data.target), n = document.getElementById(a);
        e.addEventListener("click", function(a) {
            if (a.preventDefault(), whale.hasClass(n, t.active)) whale.removeClass.collection([ e, n ], t.active); else {
                whale.addClass.collection([ e, n ], t.active);
                var l = function(s) {
                    var c = s.target;
                    s === a || c === n || n.contains(c) || (whale.removeClass.collection([ e, n ], t.active), 
                    document.removeEventListener("click", l));
                };
                document.addEventListener("click", l);
            }
        });
    }
    e.prototype = {
        classes: {
            active: "is-active",
            parent: "is-parent",
            arrow: "is-arrow"
        }
    }, t.prototype.classes = {
        item: "wjs-item",
        panel: "wjs-panel",
        active: "is-active"
    };
    var n = a.prototype = {
        classes: {
            active: "is-active"
        },
        data: {
            target: "data-target"
        }
    }, l = {};
    function s(e) {
        var t = this.classes, a = e.querySelector("." + t.button), n = e.querySelector("." + t.content), l = t.active;
        whale.hasClass(n, l) && whale.addClass(a, l), a.addEventListener("click", function() {
            whale.toggleClass.collection([ a, n ], l);
        });
    }
    function c(e) {
        var t = this.defaults, a = t.width, n = t.height, l = "left=" + (screen.width - a) / 2 + ",top=" + (screen.height - n) / 2 + ",width=" + a + ",height=" + n;
        e.addEventListener("click", function(e) {
            e.preventDefault(), window.open(this.href, this.target, l);
        });
    }
    whale.forEach([ "addClass", "removeClass", "toggleClass" ], function(e, t) {
        l[t] = function(e) {
            var a, l = e.getAttribute(n.data.target), s = document.querySelectorAll("." + l);
            s && e.addEventListener("click", function() {
                (a = whale[t])(e, n.classes.active), a.collection(s, n.classes.active);
            });
        };
    }), s.prototype = {
        classes: {
            active: "is-active",
            content: "wjs-container",
            button: "wjs-button"
        }
    }, c.prototype = {
        defaults: {
            width: 600,
            height: 400
        }
    }, whale.addElements(l).addElements({
        "wjs-menu": e,
        "wjs-tab": t,
        "wjs-spoiler": s,
        "wjs-outsite": a,
        "wjs-window": c
    });
}();