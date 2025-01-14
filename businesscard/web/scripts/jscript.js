﻿var RAD = Math.PI / 180;
var PI = Math.PI;
var TWOPI = Math.PI * 2;
var ONEOPI = 1 / Math.PI;
var PIO2 = Math.PI / 2;
var PIO4 = Math.PI / 4;
var PIO8 = Math.PI / 8;
var PIO16 = Math.PI / 16;
var PIO32 = Math.PI / 32;
var Rnd = Math.random;
var Sin = Math.sin;
var Cos = Math.cos;
var Sqrt = Math.sqrt;
var Floor = Math.floor;
var Atan2 = Math.atan2;
var Ceil = Math.ceil;
function randomInt(a, b)
{
    return ~ ~(Rnd() * (b - a + 1) + a)
}
function weightedRandom(b)
{
    var a = Rnd();
    if (a < 0.5)
    {
        return 1 - Math.pow(1 - a, b !== undefined ? b : 2) / 2
    }
    return 0.5 + Math.pow((a - 0.5) * 2, b !== undefined ? b : 2) / 2
}
function calcNormalVector(b, d, f, a, c, e)
{
    return new Vector3D((d * e) - (f * c), -((e * b) - (a * f)), (b * c) - (d * a)).norm()
}
function extend(d, e, c)
{
    var b = function ()
    {
    }, a; b.prototype = e.prototype; d.prototype = new b(); d.prototype.constructor = d; d.superclass = e.prototype; if (e.prototype.constructor == Object.prototype.constructor) { e.prototype.constructor = e } if (c) { for (a in c) { if (c.hasOwnProperty(a)) { d.prototype[a] = c[a] } } }
} function isArray(a) { return (a.constructor.toString().indexOf("Array") !== -1) } (function () { Vector = function (x, y) { this.x = x; this.y = y; return this }; Vector.prototype = { x: 0, y: 0, clone: function () { return new Vector(this.x, this.y) }, set: function (v) { this.x = v.x; this.y = v.y; return this }, add: function (v) { this.x += v.x; this.y += v.y; return this }, nadd: function (v) { return new Vector(this.x + v.x, this.y + v.y) }, sub: function (v) { this.x -= v.x; this.y -= v.y; return this }, nsub: function (v) { return new Vector(this.x - v.x, this.y - v.y) }, dot: function (v) { return this.x * v.x + this.y * v.y }, length: function () { return Sqrt(this.x * this.x + this.y * this.y) }, distance: function (v) { var xx = this.x - v.x, yy = this.y - v.y; return Sqrt(xx * xx + yy * yy) }, theta: function () { return Atan2(this.y, this.x) }, thetaTo: function (vec) { var v = this.clone().norm(), w = vec.clone().norm(); return Math.acos(v.dot(w)) }, thetaTo2: function (vec) { return Atan2(vec.y, vec.x) - Atan2(this.y, this.x) }, norm: function () { var len = this.length(); this.x /= len; this.y /= len; return this }, nnorm: function () { var len = this.length(); return new Vector(this.x / len, this.y / len) }, rotate: function (a) { var ca = Cos(a), sa = Sin(a); with (this) { var rx = x * ca - y * sa, ry = x * sa + y * ca; x = rx; y = ry } return this }, nrotate: function (a) { var ca = Cos(a), sa = Sin(a); return new Vector(this.x * ca - this.y * sa, this.x * sa + this.y * ca) }, invert: function () { this.x = -this.x; this.y = -this.y; return this }, ninvert: function () { return new Vector(-this.x, -this.y) }, scale: function (s) { this.x *= s; this.y *= s; return this }, nscale: function (s) { return new Vector(this.x * s, this.y * s) }, scaleTo: function (s) { var len = s / this.length(); this.x *= len; this.y *= len; return this }, nscaleTo: function (s) { var len = s / this.length(); return new Vector(this.x * len, this.y * len) } } })(); (function () { Vector3D = function (a, c, b) { this.x = a; this.y = c; this.z = b; return this }; Vector3D.prototype = { x: 0, y: 0, z: 0, clone: function () { return new Vector3D(this.x, this.y, this.z) }, set: function (a) { this.x = a.x; this.y = a.y; this.z = a.z; return this }, add: function (a) { this.x += a.x; this.y += a.y; this.z += a.z; return this }, sub: function (a) { this.x -= a.x; this.y -= a.y; this.z -= a.z; return this }, dot: function (a) { return this.x * a.x + this.y * a.y + this.z * a.z }, cross: function (a) { return new Vector3D(this.y * a.z - this.z * a.y, this.z * a.x - this.x * a.z, this.x * a.y - this.y * a.x) }, length: function () { return Sqrt(this.x * this.x + this.y * this.y + this.z * this.z) }, distance: function (b) { var c = this.x - b.x, d = this.y - b.y, a = this.z - b.z; return Sqrt(c * c + d * d + a * a) }, thetaTo: function (b) { var a = this.y * b.z - this.z * b.y, d = this.z * b.x - this.x * b.z, c = this.x * b.y - this.y * b.x; return Atan2(Sqrt(a * a + d * d + c * c), this.dot(b)) }, thetaTo2: function (a) { return Math.acos(this.dot(a) / (Sqrt(this.x * this.x + this.y * this.y + this.z * this.z) * Sqrt(a.x * a.x + a.y * a.y + a.z * a.z))) }, norm: function () { var a = this.length(); this.x /= a; this.y /= a; this.z /= a; return this }, scale: function (a) { this.x *= a; this.y *= a; this.z *= a; return this } } })(); (function () { Preloader = function () { this.images = new Array(); return this }; Preloader.prototype = { images: null, callback: null, counter: 0, addImage: function b(c, d) { var e = this; c.url = d; c.onload = function () { e.counter++; if (e.counter === e.images.length) { e.callback.call(e) } }; this.images.push(c) }, onLoadCallback: function a(e) { this.counter = 0; this.callback = e; for (var d = 0, c = this.images.length; d < c; d++) { this.images[d].src = this.images[d].url } } } })();