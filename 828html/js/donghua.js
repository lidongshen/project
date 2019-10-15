//速度
function animate1(obj, attr, end, speed, callback) {
    var t = setInterval(function () {
        var start = parseInt(getComputedStyle(obj, null)[attr]) ? parseInt(getComputedStyle(obj, null)[attr]) : 0
        var val = start + speed
        if (start < end) {
            if (val >= end) {
                clearInterval(t)
                val = end
                if (callback) {
                    callback()
                }
            }
        } else {
            if (val <= end) {
                clearInterval(t)
                val = end
                if (callback) {
                    callback()
                }
            }
        }
        obj.style[attr] = val + "px"
    }, 40)
}


//路程
var movefn = {
    linear: function (c, t, d, b) {
        return c * t / d + b
    },
    easein: function (c, t, d, b) {
        return b + c * (t /= d) * t
    },
    easeout: function (c, t, d, b) {
        return b - c * (t /= d) * (t - 2)
    }
}

function animate2(obj, attrobj, duration, fun, callback) {

    if (arguments.length == 2) {
        var d = 1000
        var f = "linear"
        var call = null
    } else if (arguments.length == 3) {
        if (typeof arguments[2] == "number") {
            var d = arguments[2]
            var f = "linear"
            var call = null
        } else if (typeof arguments[2] == "string") {
            var d = 1000
            var f = arguments[2]
            var call = null
        } else if (typeof arguments[2] == "function") {
            var d = 1000
            var f = "linear"
            var call = arguments[2]
        }
    } else if (arguments.length == 4) {
        if (typeof arguments[3] == "string") {
            var d = duration
            var f = arguments[3]
            var call = null
        } else if (typeof arguments[3] == "function") {
            var d = duration
            var f = "linear"
            var call = arguments[3]
        }
    } else if (arguments.length == 5) {
        var d = duration
        var f = fun
        var call = callback
    }


    var begin = [], change = [], val = []
    for (var i in attrobj) {
        begin[i] = parseInt(getComputedStyle(obj, null)[i]) ? parseInt(getComputedStyle(obj, null)[i]) : 0
        change[i] = attrobj[i] - begin[i]
    }


    var t = 0
    var t1 = setInterval(function () {
        t += 40
        for (var i in attrobj) {
            val[i] = movefn[f](change[i], t, d, begin[i])
        }
        if (t > d) {
            clearInterval(t1)
            for (var i in attrobj) {
                obj.style[i] = attrobj[i]+"px"
            }
            if (call) {
                call()
            }
        } else {
            for (var i in attrobj) {
                obj.style[i] = val[i] + "px"
            }
        }

    }, 40)
}

function animate(obj, attrobj, duration, fun, callback) {

    if (arguments.length == 2) {
        var d = 1000
        var f = "linear"
        var call = null
    } else if (arguments.length == 3) {
        if (typeof arguments[2] == "number") {
            var d = arguments[2]
            var f = "linear"
            var call = null
        } else if (typeof arguments[2] == "string") {
            var d = 1000
            var f = arguments[2]
            var call = null
        } else if (typeof arguments[2] == "function") {
            var d = 1000
            var f = "linear"
            var call = arguments[2]
        }
    } else if (arguments.length == 4) {
        if (typeof arguments[3] == "string") {
            var d = duration
            var f = arguments[3]
            var call = null
        } else if (typeof arguments[3] == "function") {
            var d = duration
            var f = "linear"
            var call = arguments[3]
        }
    } else if (arguments.length == 5) {
        var d = duration
        var f = fun
        var call = callback
    }


    var begin = [], change = [], val = []
    for (var i in attrobj) {
        begin[i] = parseInt(getComputedStyle(obj, null)[i]) ? parseInt(getComputedStyle(obj, null)[i]) : 0
        change[i] = attrobj[i] - begin[i]
    }


    var t = 0
    function move() {
        var t1
        t += 40
        for (var i in attrobj) {
            val[i] = movefn[f](change[i], t, d, begin[i])
        }
        if (t > d) {
            cancelAnimationFrame(t1)
            for (var i in attrobj) {
                if (i == "opacity") {
                    obj.style[i] = attrobj[i]
                } else {
                    obj.style[i] = attrobj[i] + "px"
                }

            }
            if (call) {
                call()
            }
        } else {
            for (var i in attrobj) {
                if (i == "opacity") {
                    obj.style[i] = val[i]
                } else {
                    obj.style[i] = val[i] + "px"
                }

            }
            t1 = requestAnimationFrame(move)
        }
    }

    move()
}

