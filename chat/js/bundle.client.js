var QueryString = function () {
        for (var e = {}, n = window.location.search.substring(1).split("&"), t = 0; t < n.length; t++) {
            var o = n[t].split("=");
            if (void 0 === e[o[0]]) e[o[0]] = o[1]; else if ("string" == typeof e[o[0]]) {
                var i = [e[o[0]], o[1]];
                e[o[0]] = i
            } else e[o[0]].push(o[1])
        }
        return e
    }, useragent = (navigator.userAgent || navigator.vendor || window.opera).toLowerCase(),
    isiPhone = /iPhone|iPad|iPod/i.test(useragent) || "MacIntel" === navigator.platform && navigator.maxTouchPoints > 1,
    isAndroid = /android/i.test(useragent), isWindowsPhone = /windows phone/i.test(useragent),
    isOpera = !!window.opera || navigator.userAgent.indexOf(" OPR/") >= 0,
    isFirefox = "undefined" != typeof InstallTrigger,
    isSafariA = (!(queryString = QueryString()).isSafari || "false" != queryString.isSafari) && (Object.prototype.toString.call(window.HTMLElement).indexOf("Constructor") > 0 || "[object SafariRemoteNotification]" === (!window.safari || safari.pushNotification).toString()),
    isChrome = !!window.chrome && !isOpera,
    isIEA = (!queryString.isIE || "false" != queryString.isIE) && !!document.documentMode,
    isEdge = (!queryString.isEdge || "false" != queryString.isEdge) && navigator.userAgent.indexOf("Edge") > -1;

function getChromeVersion() {
    var e = navigator.userAgent.match(/Chrom(e|ium)\/([0-9]+)\./);
    return !!e && parseInt(e[2], 10)
}

function loadScript(e, n) {
    var t = document.createElement("script");
    t.type = "text/javascript", t.readyState ? t.onreadystatechange = function () {
        "loaded" != t.readyState && "complete" != t.readyState || (t.onreadystatechange = null, n && n())
    } : t.onload = function () {
        n && n()
    }, t.onerror = function (t) {
        setTimeout(function () {
            loadScript(e, n)
        }, 5e3)
    }, t.src = e + "?v=" + currVersion, document.getElementsByTagName("head")[0].appendChild(t)
}

function stopFullScreenPopup() {
    document.getElementById("exitFullscreenButton") && (document.getElementById("exitFullscreenButton").style.display = "none"), document.getElementById("fullscreenButton") && (document.getElementById("fullscreenButton").style.display = "block"), window.resizeTo(widgetSize.width + (window.outerWidth - window.innerWidth), widgetSize.height + (window.outerHeight - window.innerHeight)), window.moveTo((screen.width - widgetSize.width) / 2, (screen.height - widgetSize.height) / 2)
}

function toggleFullScreen() {
    document.msFullscreenElement || document.fullscreen || document.mozFullScreen || document.webkitIsFullScreen ? stopFullScreen() : showFullScreen()
}

function showFullScreen() {
    if (currentView = "grid") var e = document.getElementById("video_container_small"); else e = document.getElementById("video_container");
    e.requestFullscreen ? e.requestFullscreen() : e.msRequestFullscreen ? e.msRequestFullscreen() : e.mozRequestFullScreen ? e.mozRequestFullScreen() : e.webkitRequestFullscreen && e.webkitRequestFullscreen(), document.getElementById("exitFullscreenButton").style.display = "block"
}

function stopFullScreen() {
    document.fullscreen && document.exitFullscreen ? document.exitFullscreen() : document.fullscreen && document.msExitFullscreen ? document.msExitFullscreen() : document.fullscreen && document.mozCancelFullScreen ? document.mozCancelFullScreen() : document.fullscreen && document.webkitCancelFullScreen && document.webkitCancelFullScreen(), document.getElementById("exitFullscreenButton") && (document.getElementById("exitFullscreenButton").style.display = "none")
}

function changeToUrl(e) {
    for (var n = e, t = new RegExp(/[-a-zA-Z0-9@:%_\+.~#?&\/\/=]{2,256}\.[a-z]{2,4}\b(\/[-a-zA-Z0-9@:%_\+.~#?&\/\/=]*)?/gi), o = n.split(" "), i = 0; i < o.length; i++) o[i].match(t) && (o[i] = '<a target="_blank" href="' + o[i] + '">' + o[i] + "</a>");
    return o.join(" ")
}

document.addEventListener("fullscreenchange", function () {
    document.fullscreen || stopFullScreen()
}, !1), document.addEventListener("mozfullscreenchange", function () {
    document.mozFullScreen || stopFullScreen()
}, !1), document.addEventListener("MSFullscreenChange", function () {
    document.msFullscreenElement || stopFullScreen()
}, !1), document.addEventListener("webkitfullscreenchange", function () {
    document.webkitIsFullScreen || stopFullScreen()
}, !1);
var prevId, prevMsgP, prevBody, errorTimer, incomingAudio, incomingMessage, enterRoom, estimateDif = function (e) {
    var n = parseInt(e / 1e3, 10), t = Math.floor(n / 3600), o = Math.floor((n - 3600 * t) / 60),
        i = n - 3600 * t - 60 * o;
    return t || o || i ? (t = t ? t + (1 == t ? " hour " : " hours ") : "") + (o = o ? o + (1 == o ? " minute " : " minutes ") : "") + (i = i ? i + (1 == i ? " second " : " seconds ") : "") : null
}, generateLink = function (e) {
    sessionId = Math.random().toString(36).slice(2).substring(0, 15);
    var n = {};
    if (lsRepUrl && (n.lsRepUrl = lsRepUrl), $("#roomName").val() && (sessionId = $("#roomName").val()), $("#names").val() && (n.names = $("#names").val()), agentId && (n.agentId = agentId), $("#visitorName").val() && (n.visitorName = $("#visitorName").val()), $("#config").val() && (n.config = $("#config").val()), $("#shortvisitor").val() ? (shortVisitorUrl = $("#shortvisitor").val(), shortVisitorUrl_broadcast = $("#shortvisitor").val() + "_b") : (shortVisitorUrl = Math.random().toString(36).slice(2).substring(0, 6), shortVisitorUrl_broadcast = Math.random().toString(36).slice(2).substring(0, 6)), $("#shortagent").val() ? (shortAgentUrl = $("#shortagent").val(), shortAgentUrl_broadcast = $("#shortagent").val() + "_b") : (shortAgentUrl = Math.random().toString(36).slice(2).substring(0, 6), shortAgentUrl_broadcast = Math.random().toString(36).slice(2).substring(0, 6)), $("#datetime").val()) {
        var t = new Date($("#datetime").val()).toISOString();
        n.datetime = t
    }
    $("#duration").val() && (n.duration = $("#duration").val()), $("#disableVideo").is(":checked") && (n.disableVideo = 1), $("#disableAudio").is(":checked") && (n.disableAudio = 1), $("#disableScreenShare").is(":checked") && (n.disableScreenShare = 1), $("#disableWhiteboard").is(":checked") && (n.disableWhiteboard = 1), $("#disableTransfer").is(":checked") && (n.disableTransfer = 1), $("#autoAcceptVideo").is(":checked") && (n.autoAcceptVideo = 1), $("#autoAcceptAudio").is(":checked") && (n.autoAcceptAudio = 1);
    var o = "";
    e && (o = "&broadcast=1");
    var i = window.btoa(unescape(encodeURIComponent(JSON.stringify(n))));
    visitorUrl = lsRepUrl + "pages/" + roomLinkPage + "?room=" + sessionId + "&p=" + i + o, viewerBroadcastLink = lsRepUrl + "pages/" + roomLinkPage + "?room=" + sessionId + "&p=" + i + o + "&broadcast=1";
    var r = document.createElement("input");
    r.setAttribute("value", visitorUrl), document.body.appendChild(r), r.select(), document.execCommand("copy"), document.body.removeChild(r), $("#roomPass").val() && (n.pass = $("#roomPass").val()), delete n.visitorName, n.isAdmin = 1, i = window.btoa(unescape(encodeURIComponent(JSON.stringify(n)))), agentUrl = lsRepUrl + "pages/" + roomLinkPage + "?room=" + sessionId + "&p=" + i + "&isAdmin=1" + o, agentBroadcastUrl = lsRepUrl + "pages/" + roomLinkPage + "?room=" + sessionId + "&p=" + i + "&isAdmin=1" + o + "&broadcast=1"
}, getCurrentTime = function () {
    return convertTimestamp((new Date).getTime(), !0)
}, guestName = function (e) {
    if (!e) return "Visitor-00";
    e.charCodeAt(0), e.charCodeAt(e.length - 1);
    for (var n = 0, t = 0; t < e.length; t++) n += e.charCodeAt(t);
    return "Visitor-" + parseInt(n % 100 + 1)
}, getCurrentDateFormatted = function () {
    var e = new Date;
    return e.getDate() + "_" + (e.getMonth() + 1) + "_" + e.getFullYear() + "_" + e.getHours() + e.getMinutes() + e.getSeconds()
}, getPrettyDate = function (e) {
    var n = new Date, t = String(n.getDate()).padStart(2, "0"), o = String(n.getMonth() + 1).padStart(2, "0"),
        i = n.getFullYear(), r = new Date(1e3 * e), a = r.getFullYear(), s = ("0" + (r.getMonth() + 1)).slice(-2),
        d = ("0" + r.getDate()).slice(-2), c = ("0" + r.getHours()).slice(-2), l = ("0" + r.getMinutes()).slice(-2);
    return t == d && o == s && i == a ? c + ":" + l : d + "." + s + "." + a + " " + c + ":" + l
}, convertTimestamp = function (e, n) {
    var t = new Date, o = new Date(e),
        i = (t.getFullYear() !== o.getFullYear() && o.getFullYear(), ("0" + (o.getMonth() + 1)).slice(-2), ("0" + o.getDate()).slice(-2), o.getHours()),
        r = o.getMinutes(), a = i >= 12 ? "pm" : "am", s = i % 12;
    return s = s || 12, r = r < 10 ? "0" + r : r, time = s + ":" + r + " " + a, time
}, compareDates = function (e, n) {
    var t = new Date(e);
    t.setHours(0, 0, 0, 0);
    var o = new Date(n);
    return o.setHours(0, 0, 0, 0), t.getTime() === o.getTime()
}, escapeHtmlEntities = function (e) {
    return "undefined" != typeof jQuery ? jQuery("<div/>").text(e).html() : e.replace(/&/g, "&amp;").replace(/>/g, "&gt;").replace(/</g, "&lt;").replace(/"/g, "&quot;")
}, showMessage = function (e, n, t, o, i, r) {
    if (n) {
        var a = getPrettyDate((new Date).getTime() / 1e3);
        if (t = "" !== t && null !== t && "undefined" !== t && void 0 !== t ? t : "" === e ? "" : a, "conference" == conferenceStyle) {
            if ("Me" === e) {
                e = smartVideoLocale.msgStore.me, className = "media media-chat media-chat-reverse"
            } else "" === e ? className = "media media-meta-day" : ($("#peer_name_chat").text(e), playIncomingMessage(), "undefined" === e && (e = "Guest"), className = "p-10 media-chat", i || (i = lsRepUrl + "img/small-avatar.jpg"), f = i, "avatar " + e);
            if (o = o || "", prevId && e == prevId) u = prevMsgP, d = prevBody; else {
                if ((u = $("<div />", {class: className})).attr("data-system-attribue", o), e && "Me" !== e) {
                    var s = $("<h6 />", {});
                    s.appendTo(u), s.html(e)
                }
                var d = $("<div />", {class: "media-body"});
                d.appendTo(u)
            }
            var c;
            (c = $("<p />")).html(n), c.appendTo(d), (c = $("<p />", {class: "meta"})).html('<time datetime="2018">' + t + "</time>"), c.appendTo(d), u.appendTo($("#chat-content")), $("#typing").html(""), prevId = e, prevMsgP = u, prevBody = d, (l = document.getElementById("chat-content")).scrollTop = 999999
        } else {
            var l, u = document.createElement("li"), m = "left", g = "", f = "";
            if ("Me" === e || "Me~" == e.substring(0, 3)) {
                m = "right";
                var v = "";
                if ("Me~" == e.substring(0, 3)) if (e = e.substring(3, 300), v = " right-image", "img/small-avatar.jpg" !== i && i) f = '<img class="direct-chat-img ' + m + '" src="' + i + '" alt="" />'; else f = (f = e.match(/\b(\w)/g).join("").toUpperCase()) ? '<span class="acronym-right">' + f + "</span>" : '<img class="direct-chat-img ' + m + '" src="img/small-avatar.jpg" alt="" />';
                e = smartVideoLocale.msgStore.me, className = "wd-right-bubble" + v
            } else if ("" === e) {
                var p = "";
                "divider" === o && (p = " divider"), className = "wd-system-bubble" + p
            } else if (playIncomingMessage(), "undefined" === e && (e = "Guest"), g = "wd-chat-name", "wd-chat-avatar", className = "wd-left-bubble", i || (i = "/img/small-avatar.jpg"), f = '<img class="direct-chat-img ' + m + " " + guestName(e) + '" src="' + i + '" alt="" />', "He~" == e.substring(0, 3)) if (e = e.substring(3, 500), "/img/small-avatar.jpg" !== i && i) f = '<img class="direct-chat-img ' + m + " " + guestName(e) + '" src="' + i + '" alt="" />'; else {
                f = e.match(/\b(\w)/g).join("").toUpperCase();
                var h = svg1 + f + svg2;
                image = "data:image/svg+xml;base64," + btoa(h), f = f ? '<img class="direct-chat-img ' + m + " " + guestName(e) + '" src="' + image + '" alt="" />' : '<img class="direct-chat-img ' + m + " " + guestName(e) + '" src="/img/small-avatar.jpg" alt="" />'
            }
            o = o || "", u.setAttribute("data-system-attribue", o), u.innerHTML = '<div class="' + className + '">' + f + '<span class="' + g + '">' + e + '</span><span class="timestamp">' + t + "</span><div>" + n + "</div>", (l = document.getElementById("newdev_chat_ul1")).appendChild(u), l.scrollTop = 999999
        }
    }
}, saveChat = function (e, n, t, o, i, r) {
    var a = queryString.names ? queryString.names : svConfigs.agentName, s = (new Date).toISOString();
    $.ajax({
        type: "POST",
        url: lsRepUrl + "/server/script.php",
        data: {
            type: "addchat",
            roomId: roomId || queryString.room,
            message: e,
            agent: a,
            agentId: o,
            from: n,
            participants: Object.keys(r).toString(),
            system: t,
            avatar: i,
            datetime: s
        }
    }).done(function (e) {
    }).fail(function () {
        console.log(!1)
    })
}, ERROR_TIMER = 1e4, toggleError = function (e, n) {
    jQuery("#error_message").show(), jQuery("#error_message_text").html(e), clearTimeout(errorTimer), errorTimer = setTimeout(function () {
        jQuery("#error_message").hide(), jQuery("#error_message_text").html("")
    }, n || ERROR_TIMER)
}, toggleNotification = function (e, n) {
    jQuery("#error_message").toggle(n), jQuery("#error_message_text").html(e)
}, getCookie = function (e) {
    var n = RegExp(e + "=.[^;]*"), t = document.cookie.match(n);
    return t ? t[0].split("=")[1] : null
}, deleteCookie = function (e) {
    document.cookie = e + "=; expires=Thu, 01 Jan 1970 00:00:01 GMT;;path=/"
}, setCookie = function (e, n, t) {
    var o = e, i = n, r = new Date, a = r.getTime() + 36e5 * parseInt(t);
    r.setTime(a), document.cookie = t ? o + "=" + i + ";expires=" + r.toGMTString() + ";path=/" : o + "=" + i + ";path=/"
}, getGuid = function () {
    function e() {
        return Math.floor(65536 * (1 + Math.random())).toString(16).substring(1)
    }

    return e() + e() + "-" + e() + "-" + e() + "-" + e() + "-" + e() + e() + e()
};

function playIncomingCall() {
    if (!document.hasFocus()) {
        (incomingAudio = new Audio).preload = "auto", incomingAudio.autoplay = !0, incomingAudio.loop = !0, incomingAudio.src = lsRepUrl + "/media/ringtone.mp3";
        var e = incomingAudio.play();
        isIEA || void 0 !== e && e.then(function () {
            setTimeout(function () {
                incomingAudio && incomingAudio.pause()
            }, 1e4)
        }).catch(function (e) {
            console.log(e)
        })
    }
}

function playIncomingMessage() {
    if (!document.hasFocus()) {
        (incomingMessage = new Audio).preload = "auto", incomingMessage.autoplay = !0, incomingMessage.loop = !1, incomingMessage.src = lsRepUrl + "/media/msgtone.mp3";
        var e = incomingMessage.play();
        isIEA || void 0 !== e && e.then(function () {
            setTimeout(function () {
                incomingMessage && incomingMessage.pause()
            }, 1e3)
        }).catch(function (e) {
            console.log(e)
        })
    }
}

function playEnterRoom() {
    if (!document.hasFocus()) {
        (enterRoom = new Audio).preload = "auto", enterRoom.autoplay = !0, enterRoom.loop = !1, enterRoom.src = lsRepUrl + "/media/msgtone.mp3", enterRoom.play();
        var e = enterRoom.play();
        void 0 !== e && e.then(function () {
            setTimeout(function () {
                enterRoom && enterRoom.pause()
            }, 1e3)
        }).catch(function (e) {
            console.log(e)
        })
    }
}

function stopIncomingCall() {
    if (isIEA) return incomingAudio && (incomingAudio.pause(), incomingAudio.src = ""), !0;
    if (incomingAudio) {
        var e = incomingAudio.pause();
        void 0 !== e && e.then(function () {
        }).catch(function (e) {
            console.log(e)
        })
    }
}

function bytesToSize(e) {
    if (0 === e) return "0 Bytes";
    var n = parseInt(Math.floor(Math.log(e) / Math.log(1e3)), 10);
    return (e / Math.pow(1e3, n)).toPrecision(3) + " " + ["Bytes", "KB", "MB", "GB", "TB"][n]
}

function hark(e, n) {
    var t = window.webkitAudioContext || window.AudioContext, o = this;
    if (o.events = {}, o.on = function (e, n) {
        o.events[e] = n
    }, o.emit = function () {
        o.events[arguments[0]] && o.events[arguments[0]](arguments[1], arguments[2], arguments[3], arguments[4])
    }, !t) return o;
    var i = (n = n || {}).smoothing || .1, r = n.interval || 50, a = n.threshold, s = n.play, d = n.history || 10,
        c = !0;
    window.audioContext00 || (window.audioContext00 = new t);
    var l, u, m, g = audioContext00.createGain();
    g.connect(audioContext00.destination), g.gain.value = 0, (m = audioContext00.createAnalyser()).fftSize = 512, m.smoothingTimeConstant = i, u = new Float32Array(m.fftSize), l = audioContext00.createMediaStreamSource(e), a = a || -50, l.connect(m), s && m.connect(audioContext00.destination), o.speaking = !1, o.setThreshold = function (e) {
        a = e
    }, o.setInterval = function (e) {
        r = e
    }, o.stop = function () {
        c = !1, o.emit("volume_change", -100, a), o.speaking && (o.speaking = !1, o.emit("stopped_speaking"))
    }, o.speakingHistory = [];
    for (var f = 0; f < d; f++) o.speakingHistory.push(0);
    var v = function () {
        setTimeout(function () {
            if (c) {
                var e = function (e, n) {
                    var t = -1 / 0;
                    e.getFloatFrequencyData(n);
                    for (var o = 4, i = n.length; o < i; o++) n[o] > t && n[o] < 0 && (t = n[o]);
                    return t
                }(m, u);
                o.emit("volume_change", e, a);
                var n = 0;
                if (e > a && !o.speaking) {
                    for (var t = o.speakingHistory.length - 3; t < o.speakingHistory.length; t++) n += o.speakingHistory[t];
                    n >= 2 && (o.speaking = !0, o.emit("speaking"))
                } else if (e < a && o.speaking) {
                    for (var i = 0; i < o.speakingHistory.length; i++) n += o.speakingHistory[i];
                    0 === n && (o.speaking = !1, o.emit("stopped_speaking"))
                }
                o.speakingHistory.shift(), o.speakingHistory.push(0 + (e > a)), v()
            }
        }, r)
    };
    return v(), o
}

var CryptoJS = CryptoJS || function (e, n) {
    var t = {}, o = t.lib = {}, i = function () {
    }, r = o.Base = {
        extend: function (e) {
            i.prototype = this;
            var n = new i;
            return e && n.mixIn(e), n.hasOwnProperty("init") || (n.init = function () {
                n.$super.init.apply(this, arguments)
            }), n.init.prototype = n, n.$super = this, n
        }, create: function () {
            var e = this.extend();
            return e.init.apply(e, arguments), e
        }, init: function () {
        }, mixIn: function (e) {
            for (var n in e) e.hasOwnProperty(n) && (this[n] = e[n]);
            e.hasOwnProperty("toString") && (this.toString = e.toString)
        }, clone: function () {
            return this.init.prototype.extend(this)
        }
    }, a = o.WordArray = r.extend({
        init: function (e, n) {
            e = this.words = e || [], this.sigBytes = null != n ? n : 4 * e.length
        }, toString: function (e) {
            return (e || d).stringify(this)
        }, concat: function (e) {
            var n = this.words, t = e.words, o = this.sigBytes;
            if (e = e.sigBytes, this.clamp(), o % 4) for (var i = 0; i < e; i++) n[o + i >>> 2] |= (t[i >>> 2] >>> 24 - i % 4 * 8 & 255) << 24 - (o + i) % 4 * 8; else if (65535 < t.length) for (i = 0; i < e; i += 4) n[o + i >>> 2] = t[i >>> 2]; else n.push.apply(n, t);
            return this.sigBytes += e, this
        }, clamp: function () {
            var n = this.words, t = this.sigBytes;
            n[t >>> 2] &= 4294967295 << 32 - t % 4 * 8, n.length = e.ceil(t / 4)
        }, clone: function () {
            var e = r.clone.call(this);
            return e.words = this.words.slice(0), e
        }, random: function (n) {
            for (var t = [], o = 0; o < n; o += 4) t.push(4294967296 * e.random() | 0);
            return new a.init(t, n)
        }
    }), s = t.enc = {}, d = s.Hex = {
        stringify: function (e) {
            var n = e.words;
            e = e.sigBytes;
            for (var t = [], o = 0; o < e; o++) {
                var i = n[o >>> 2] >>> 24 - o % 4 * 8 & 255;
                t.push((i >>> 4).toString(16)), t.push((15 & i).toString(16))
            }
            return t.join("")
        }, parse: function (e) {
            for (var n = e.length, t = [], o = 0; o < n; o += 2) t[o >>> 3] |= parseInt(e.substr(o, 2), 16) << 24 - o % 8 * 4;
            return new a.init(t, n / 2)
        }
    }, c = s.Latin1 = {
        stringify: function (e) {
            var n = e.words;
            e = e.sigBytes;
            for (var t = [], o = 0; o < e; o++) t.push(String.fromCharCode(n[o >>> 2] >>> 24 - o % 4 * 8 & 255));
            return t.join("")
        }, parse: function (e) {
            for (var n = e.length, t = [], o = 0; o < n; o++) t[o >>> 2] |= (255 & e.charCodeAt(o)) << 24 - o % 4 * 8;
            return new a.init(t, n)
        }
    }, l = s.Utf8 = {
        stringify: function (e) {
            try {
                return decodeURIComponent(escape(c.stringify(e)))
            } catch (e) {
                throw Error("Malformed UTF-8 data")
            }
        }, parse: function (e) {
            return c.parse(unescape(encodeURIComponent(e)))
        }
    }, u = o.BufferedBlockAlgorithm = r.extend({
        reset: function () {
            this._data = new a.init, this._nDataBytes = 0
        }, _append: function (e) {
            "string" == typeof e && (e = l.parse(e)), this._data.concat(e), this._nDataBytes += e.sigBytes
        }, _process: function (n) {
            var t = this._data, o = t.words, i = t.sigBytes, r = this.blockSize, s = i / (4 * r);
            if (n = (s = n ? e.ceil(s) : e.max((0 | s) - this._minBufferSize, 0)) * r, i = e.min(4 * n, i), n) {
                for (var d = 0; d < n; d += r) this._doProcessBlock(o, d);
                d = o.splice(0, n), t.sigBytes -= i
            }
            return new a.init(d, i)
        }, clone: function () {
            var e = r.clone.call(this);
            return e._data = this._data.clone(), e
        }, _minBufferSize: 0
    });
    o.Hasher = u.extend({
        cfg: r.extend(), init: function (e) {
            this.cfg = this.cfg.extend(e), this.reset()
        }, reset: function () {
            u.reset.call(this), this._doReset()
        }, update: function (e) {
            return this._append(e), this._process(), this
        }, finalize: function (e) {
            return e && this._append(e), this._doFinalize()
        }, blockSize: 16, _createHelper: function (e) {
            return function (n, t) {
                return new e.init(t).finalize(n)
            }
        }, _createHmacHelper: function (e) {
            return function (n, t) {
                return new m.HMAC.init(e, t).finalize(n)
            }
        }
    });
    var m = t.algo = {};
    return t
}(Math);
!function () {
    var e = CryptoJS, n = e.lib.WordArray;
    e.enc.Base64 = {
        stringify: function (e) {
            var n = e.words, t = e.sigBytes, o = this._map;
            e.clamp(), e = [];
            for (var i = 0; i < t; i += 3) for (var r = (n[i >>> 2] >>> 24 - i % 4 * 8 & 255) << 16 | (n[i + 1 >>> 2] >>> 24 - (i + 1) % 4 * 8 & 255) << 8 | n[i + 2 >>> 2] >>> 24 - (i + 2) % 4 * 8 & 255, a = 0; 4 > a && i + .75 * a < t; a++) e.push(o.charAt(r >>> 6 * (3 - a) & 63));
            if (n = o.charAt(64)) for (; e.length % 4;) e.push(n);
            return e.join("")
        }, parse: function (e) {
            var t = e.length, o = this._map;
            (i = o.charAt(64)) && (-1 != (i = e.indexOf(i)) && (t = i));
            for (var i = [], r = 0, a = 0; a < t; a++) if (a % 4) {
                var s = o.indexOf(e.charAt(a - 1)) << a % 4 * 2, d = o.indexOf(e.charAt(a)) >>> 6 - a % 4 * 2;
                i[r >>> 2] |= (s | d) << 24 - r % 4 * 8, r++
            }
            return n.create(i, r)
        }, _map: "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/="
    }
}(), function (e) {
    function n(e, n, t, o, i, r, a) {
        return ((e = e + (n & t | ~n & o) + i + a) << r | e >>> 32 - r) + n
    }

    function t(e, n, t, o, i, r, a) {
        return ((e = e + (n & o | t & ~o) + i + a) << r | e >>> 32 - r) + n
    }

    function o(e, n, t, o, i, r, a) {
        return ((e = e + (n ^ t ^ o) + i + a) << r | e >>> 32 - r) + n
    }

    function i(e, n, t, o, i, r, a) {
        return ((e = e + (t ^ (n | ~o)) + i + a) << r | e >>> 32 - r) + n
    }

    for (var r = CryptoJS, a = (d = r.lib).WordArray, s = d.Hasher, d = r.algo, c = [], l = 0; 64 > l; l++) c[l] = 4294967296 * e.abs(e.sin(l + 1)) | 0;
    d = d.MD5 = s.extend({
        _doReset: function () {
            this._hash = new a.init([1732584193, 4023233417, 2562383102, 271733878])
        }, _doProcessBlock: function (e, r) {
            for (var a = 0; 16 > a; a++) {
                var s = e[d = r + a];
                e[d] = 16711935 & (s << 8 | s >>> 24) | 4278255360 & (s << 24 | s >>> 8)
            }
            a = this._hash.words;
            var d = e[r + 0], l = (s = e[r + 1], e[r + 2]), u = e[r + 3], m = e[r + 4], g = e[r + 5], f = e[r + 6],
                v = e[r + 7], p = e[r + 8], h = e[r + 9], S = e[r + 10], C = e[r + 11], w = e[r + 12], y = e[r + 13],
                b = e[r + 14], _ = e[r + 15], I = n(I = a[0], A = a[1], E = a[2], k = a[3], d, 7, c[0]),
                k = n(k, I, A, E, s, 12, c[1]), E = n(E, k, I, A, l, 17, c[2]), A = n(A, E, k, I, u, 22, c[3]);
            I = n(I, A, E, k, m, 7, c[4]), k = n(k, I, A, E, g, 12, c[5]), E = n(E, k, I, A, f, 17, c[6]), A = n(A, E, k, I, v, 22, c[7]), I = n(I, A, E, k, p, 7, c[8]), k = n(k, I, A, E, h, 12, c[9]), E = n(E, k, I, A, S, 17, c[10]), A = n(A, E, k, I, C, 22, c[11]), I = n(I, A, E, k, w, 7, c[12]), k = n(k, I, A, E, y, 12, c[13]), E = n(E, k, I, A, b, 17, c[14]), I = t(I, A = n(A, E, k, I, _, 22, c[15]), E, k, s, 5, c[16]), k = t(k, I, A, E, f, 9, c[17]), E = t(E, k, I, A, C, 14, c[18]), A = t(A, E, k, I, d, 20, c[19]), I = t(I, A, E, k, g, 5, c[20]), k = t(k, I, A, E, S, 9, c[21]), E = t(E, k, I, A, _, 14, c[22]), A = t(A, E, k, I, m, 20, c[23]), I = t(I, A, E, k, h, 5, c[24]), k = t(k, I, A, E, b, 9, c[25]), E = t(E, k, I, A, u, 14, c[26]), A = t(A, E, k, I, p, 20, c[27]), I = t(I, A, E, k, y, 5, c[28]), k = t(k, I, A, E, l, 9, c[29]), E = t(E, k, I, A, v, 14, c[30]), I = o(I, A = t(A, E, k, I, w, 20, c[31]), E, k, g, 4, c[32]), k = o(k, I, A, E, p, 11, c[33]), E = o(E, k, I, A, C, 16, c[34]), A = o(A, E, k, I, b, 23, c[35]), I = o(I, A, E, k, s, 4, c[36]), k = o(k, I, A, E, m, 11, c[37]), E = o(E, k, I, A, v, 16, c[38]), A = o(A, E, k, I, S, 23, c[39]), I = o(I, A, E, k, y, 4, c[40]), k = o(k, I, A, E, d, 11, c[41]), E = o(E, k, I, A, u, 16, c[42]), A = o(A, E, k, I, f, 23, c[43]), I = o(I, A, E, k, h, 4, c[44]), k = o(k, I, A, E, w, 11, c[45]), E = o(E, k, I, A, _, 16, c[46]), I = i(I, A = o(A, E, k, I, l, 23, c[47]), E, k, d, 6, c[48]), k = i(k, I, A, E, v, 10, c[49]), E = i(E, k, I, A, b, 15, c[50]), A = i(A, E, k, I, g, 21, c[51]), I = i(I, A, E, k, w, 6, c[52]), k = i(k, I, A, E, u, 10, c[53]), E = i(E, k, I, A, S, 15, c[54]), A = i(A, E, k, I, s, 21, c[55]), I = i(I, A, E, k, p, 6, c[56]), k = i(k, I, A, E, _, 10, c[57]), E = i(E, k, I, A, f, 15, c[58]), A = i(A, E, k, I, y, 21, c[59]), I = i(I, A, E, k, m, 6, c[60]), k = i(k, I, A, E, C, 10, c[61]), E = i(E, k, I, A, l, 15, c[62]), A = i(A, E, k, I, h, 21, c[63]);
            a[0] = a[0] + I | 0, a[1] = a[1] + A | 0, a[2] = a[2] + E | 0, a[3] = a[3] + k | 0
        }, _doFinalize: function () {
            var n = this._data, t = n.words, o = 8 * this._nDataBytes, i = 8 * n.sigBytes;
            t[i >>> 5] |= 128 << 24 - i % 32;
            var r = e.floor(o / 4294967296);
            for (t[15 + (i + 64 >>> 9 << 4)] = 16711935 & (r << 8 | r >>> 24) | 4278255360 & (r << 24 | r >>> 8), t[14 + (i + 64 >>> 9 << 4)] = 16711935 & (o << 8 | o >>> 24) | 4278255360 & (o << 24 | o >>> 8), n.sigBytes = 4 * (t.length + 1), this._process(), t = (n = this._hash).words, o = 0; 4 > o; o++) i = t[o], t[o] = 16711935 & (i << 8 | i >>> 24) | 4278255360 & (i << 24 | i >>> 8);
            return n
        }, clone: function () {
            var e = s.clone.call(this);
            return e._hash = this._hash.clone(), e
        }
    }), r.MD5 = s._createHelper(d), r.HmacMD5 = s._createHmacHelper(d)
}(Math), function () {
    var e, n = CryptoJS, t = (e = n.lib).Base, o = e.WordArray, i = (e = n.algo).EvpKDF = t.extend({
        cfg: t.extend({keySize: 4, hasher: e.MD5, iterations: 1}),
        init: function (e) {
            this.cfg = this.cfg.extend(e)
        },
        compute: function (e, n) {
            for (var t = (s = this.cfg).hasher.create(), i = o.create(), r = i.words, a = s.keySize, s = s.iterations; r.length < a;) {
                d && t.update(d);
                var d = t.update(e).finalize(n);
                t.reset();
                for (var c = 1; c < s; c++) d = t.finalize(d), t.reset();
                i.concat(d)
            }
            return i.sigBytes = 4 * a, i
        }
    });
    n.EvpKDF = function (e, n, t) {
        return i.create(t).compute(e, n)
    }
}(), CryptoJS.lib.Cipher || function (e) {
    var n = (g = CryptoJS).lib, t = n.Base, o = n.WordArray, i = n.BufferedBlockAlgorithm, r = g.enc.Base64,
        a = g.algo.EvpKDF, s = n.Cipher = i.extend({
            cfg: t.extend(), createEncryptor: function (e, n) {
                return this.create(this._ENC_XFORM_MODE, e, n)
            }, createDecryptor: function (e, n) {
                return this.create(this._DEC_XFORM_MODE, e, n)
            }, init: function (e, n, t) {
                this.cfg = this.cfg.extend(t), this._xformMode = e, this._key = n, this.reset()
            }, reset: function () {
                i.reset.call(this), this._doReset()
            }, process: function (e) {
                return this._append(e), this._process()
            }, finalize: function (e) {
                return e && this._append(e), this._doFinalize()
            }, keySize: 4, ivSize: 4, _ENC_XFORM_MODE: 1, _DEC_XFORM_MODE: 2, _createHelper: function (e) {
                return {
                    encrypt: function (n, t, o) {
                        return ("string" == typeof t ? f : m).encrypt(e, n, t, o)
                    }, decrypt: function (n, t, o) {
                        return ("string" == typeof t ? f : m).decrypt(e, n, t, o)
                    }
                }
            }
        });
    n.StreamCipher = s.extend({
        _doFinalize: function () {
            return this._process(!0)
        }, blockSize: 1
    });
    var d = g.mode = {}, c = function (e, n, t) {
        var o = this._iv;
        o ? this._iv = void 0 : o = this._prevBlock;
        for (var i = 0; i < t; i++) e[n + i] ^= o[i]
    }, l = (n.BlockCipherMode = t.extend({
        createEncryptor: function (e, n) {
            return this.Encryptor.create(e, n)
        }, createDecryptor: function (e, n) {
            return this.Decryptor.create(e, n)
        }, init: function (e, n) {
            this._cipher = e, this._iv = n
        }
    })).extend();
    l.Encryptor = l.extend({
        processBlock: function (e, n) {
            var t = this._cipher, o = t.blockSize;
            c.call(this, e, n, o), t.encryptBlock(e, n), this._prevBlock = e.slice(n, n + o)
        }
    }), l.Decryptor = l.extend({
        processBlock: function (e, n) {
            var t = this._cipher, o = t.blockSize, i = e.slice(n, n + o);
            t.decryptBlock(e, n), c.call(this, e, n, o), this._prevBlock = i
        }
    }), d = d.CBC = l, l = (g.pad = {}).Pkcs7 = {
        pad: function (e, n) {
            for (var t, i = (t = (t = 4 * n) - e.sigBytes % t) << 24 | t << 16 | t << 8 | t, r = [], a = 0; a < t; a += 4) r.push(i);
            t = o.create(r, t), e.concat(t)
        }, unpad: function (e) {
            e.sigBytes -= 255 & e.words[e.sigBytes - 1 >>> 2]
        }
    }, n.BlockCipher = s.extend({
        cfg: s.cfg.extend({mode: d, padding: l}), reset: function () {
            s.reset.call(this);
            var e = (n = this.cfg).iv, n = n.mode;
            if (this._xformMode == this._ENC_XFORM_MODE) var t = n.createEncryptor; else t = n.createDecryptor, this._minBufferSize = 1;
            this._mode = t.call(n, this, e && e.words)
        }, _doProcessBlock: function (e, n) {
            this._mode.processBlock(e, n)
        }, _doFinalize: function () {
            var e = this.cfg.padding;
            if (this._xformMode == this._ENC_XFORM_MODE) {
                e.pad(this._data, this.blockSize);
                var n = this._process(!0)
            } else n = this._process(!0), e.unpad(n);
            return n
        }, blockSize: 4
    });
    var u = n.CipherParams = t.extend({
        init: function (e) {
            this.mixIn(e)
        }, toString: function (e) {
            return (e || this.formatter).stringify(this)
        }
    }), m = (d = (g.format = {}).OpenSSL = {
        stringify: function (e) {
            var n = e.ciphertext;
            return ((e = e.salt) ? o.create([1398893684, 1701076831]).concat(e).concat(n) : n).toString(r)
        }, parse: function (e) {
            var n = (e = r.parse(e)).words;
            if (1398893684 == n[0] && 1701076831 == n[1]) {
                var t = o.create(n.slice(2, 4));
                n.splice(0, 4), e.sigBytes -= 16
            }
            return u.create({ciphertext: e, salt: t})
        }
    }, n.SerializableCipher = t.extend({
        cfg: t.extend({format: d}), encrypt: function (e, n, t, o) {
            o = this.cfg.extend(o);
            var i = e.createEncryptor(t, o);
            return n = i.finalize(n), i = i.cfg, u.create({
                ciphertext: n,
                key: t,
                iv: i.iv,
                algorithm: e,
                mode: i.mode,
                padding: i.padding,
                blockSize: e.blockSize,
                formatter: o.format
            })
        }, decrypt: function (e, n, t, o) {
            return o = this.cfg.extend(o), n = this._parse(n, o.format), e.createDecryptor(t, o).finalize(n.ciphertext)
        }, _parse: function (e, n) {
            return "string" == typeof e ? n.parse(e, this) : e
        }
    })), g = (g.kdf = {}).OpenSSL = {
        execute: function (e, n, t, i) {
            return i || (i = o.random(8)), e = a.create({keySize: n + t}).compute(e, i), t = o.create(e.words.slice(n), 4 * t), e.sigBytes = 4 * n, u.create({
                key: e,
                iv: t,
                salt: i
            })
        }
    }, f = n.PasswordBasedCipher = m.extend({
        cfg: m.cfg.extend({kdf: g}), encrypt: function (e, n, t, o) {
            return t = (o = this.cfg.extend(o)).kdf.execute(t, e.keySize, e.ivSize), o.iv = t.iv, (e = m.encrypt.call(this, e, n, t.key, o)).mixIn(t), e
        }, decrypt: function (e, n, t, o) {
            return o = this.cfg.extend(o), n = this._parse(n, o.format), t = o.kdf.execute(t, e.keySize, e.ivSize, n.salt), o.iv = t.iv, m.decrypt.call(this, e, n, t.key, o)
        }
    })
}(), function () {
    for (var e = CryptoJS, n = e.lib.BlockCipher, t = e.algo, o = [], i = [], r = [], a = [], s = [], d = [], c = [], l = [], u = [], m = [], g = [], f = 0; 256 > f; f++) g[f] = 128 > f ? f << 1 : f << 1 ^ 283;
    var v = 0, p = 0;
    for (f = 0; 256 > f; f++) {
        var h = (h = p ^ p << 1 ^ p << 2 ^ p << 3 ^ p << 4) >>> 8 ^ 255 & h ^ 99;
        o[v] = h, i[h] = v;
        var S = g[v], C = g[S], w = g[C], y = 257 * g[h] ^ 16843008 * h;
        r[v] = y << 24 | y >>> 8, a[v] = y << 16 | y >>> 16, s[v] = y << 8 | y >>> 24, d[v] = y, y = 16843009 * w ^ 65537 * C ^ 257 * S ^ 16843008 * v, c[h] = y << 24 | y >>> 8, l[h] = y << 16 | y >>> 16, u[h] = y << 8 | y >>> 24, m[h] = y, v ? (v = S ^ g[g[g[w ^ S]]], p ^= g[g[p]]) : v = p = 1
    }
    var b = [0, 1, 2, 4, 8, 16, 32, 64, 128, 27, 54];
    t = t.AES = n.extend({
        _doReset: function () {
            for (var e = (t = this._key).words, n = t.sigBytes / 4, t = 4 * ((this._nRounds = n + 6) + 1), i = this._keySchedule = [], r = 0; r < t; r++) if (r < n) i[r] = e[r]; else {
                var a = i[r - 1];
                r % n ? 6 < n && 4 == r % n && (a = o[a >>> 24] << 24 | o[a >>> 16 & 255] << 16 | o[a >>> 8 & 255] << 8 | o[255 & a]) : (a = o[(a = a << 8 | a >>> 24) >>> 24] << 24 | o[a >>> 16 & 255] << 16 | o[a >>> 8 & 255] << 8 | o[255 & a], a ^= b[r / n | 0] << 24), i[r] = i[r - n] ^ a
            }
            for (e = this._invKeySchedule = [], n = 0; n < t; n++) r = t - n, a = n % 4 ? i[r] : i[r - 4], e[n] = 4 > n || 4 >= r ? a : c[o[a >>> 24]] ^ l[o[a >>> 16 & 255]] ^ u[o[a >>> 8 & 255]] ^ m[o[255 & a]]
        }, encryptBlock: function (e, n) {
            this._doCryptBlock(e, n, this._keySchedule, r, a, s, d, o)
        }, decryptBlock: function (e, n) {
            var t = e[n + 1];
            e[n + 1] = e[n + 3], e[n + 3] = t, this._doCryptBlock(e, n, this._invKeySchedule, c, l, u, m, i), t = e[n + 1], e[n + 1] = e[n + 3], e[n + 3] = t
        }, _doCryptBlock: function (e, n, t, o, i, r, a, s) {
            for (var d = this._nRounds, c = e[n] ^ t[0], l = e[n + 1] ^ t[1], u = e[n + 2] ^ t[2], m = e[n + 3] ^ t[3], g = 4, f = 1; f < d; f++) {
                var v = o[c >>> 24] ^ i[l >>> 16 & 255] ^ r[u >>> 8 & 255] ^ a[255 & m] ^ t[g++],
                    p = o[l >>> 24] ^ i[u >>> 16 & 255] ^ r[m >>> 8 & 255] ^ a[255 & c] ^ t[g++],
                    h = o[u >>> 24] ^ i[m >>> 16 & 255] ^ r[c >>> 8 & 255] ^ a[255 & l] ^ t[g++];
                m = o[m >>> 24] ^ i[c >>> 16 & 255] ^ r[l >>> 8 & 255] ^ a[255 & u] ^ t[g++], c = v, l = p, u = h
            }
            v = (s[c >>> 24] << 24 | s[l >>> 16 & 255] << 16 | s[u >>> 8 & 255] << 8 | s[255 & m]) ^ t[g++], p = (s[l >>> 24] << 24 | s[u >>> 16 & 255] << 16 | s[m >>> 8 & 255] << 8 | s[255 & c]) ^ t[g++], h = (s[u >>> 24] << 24 | s[m >>> 16 & 255] << 16 | s[c >>> 8 & 255] << 8 | s[255 & l]) ^ t[g++], m = (s[m >>> 24] << 24 | s[c >>> 16 & 255] << 16 | s[l >>> 8 & 255] << 8 | s[255 & u]) ^ t[g++], e[n] = v, e[n + 1] = p, e[n + 2] = h, e[n + 3] = m
        }, keySize: 8
    });
    e.AES = n._createHelper(t)
}();
"use strict";
var RTCMultiConnection = function (e, n) {
    var t;

    function o(e, n) {
        function t(e) {
            return !e.audio && !e.video && !e.screen && e.data
        }

        var o = "";
        o += "?userid=" + e.userid, o += "&sessionid=" + e.sessionid, o += "&msgEvent=" + e.socketMessageEvent, o += "&socketCustomEvent=" + e.socketCustomEvent, o += "&autoCloseEntireSession=" + !!e.autoCloseEntireSession, !0 === e.session.broadcast && (o += "&oneToMany=true"), o += "&maxParticipantsAllowed=" + e.maxParticipantsAllowed, e.enableScalableBroadcast && (o += "&enableScalableBroadcast=true", o += "&maxRelayLimitPerUser=" + (e.maxRelayLimitPerUser || 2)), o += "&extra=" + JSON.stringify(e.extra || {}), e.socketCustomParameters && (o += e.socketCustomParameters);
        try {
            io.sockets = {}
        } catch (e) {
        }
        if (e.socketURL || (e.socketURL = "/"), "/" != e.socketURL.substr(e.socketURL.length - 1, 1)) throw'"socketURL" MUST end with a slash.';
        e.enableLogs && ("/" == e.socketURL ? console.info("socket.io url is: ", location.origin + "/") : console.info("socket.io url is: ", e.socketURL));
        try {
            e.socket = io(e.socketURL + o)
        } catch (n) {
            e.socket = io.connect(e.socketURL + o, e.socketOptions)
        }
        var i = e.multiPeersHandler;

        function r(n, t) {
            e.peersBackup[n] || (e.peersBackup[n] = {userid: n, extra: {}}), e.peersBackup[n].extra = t
        }

        e.socket.on("extra-data-updated", function (n, t) {
            e.peers[n] && (e.peers[n].extra = t, e.onExtraDataUpdated({userid: n, extra: t}), r(n, t))
        }), e.socket.on(e.socketMessageEvent, function n(o) {
            if (o.remoteUserId == e.userid) if (e.peers[o.sender] && e.peers[o.sender].extra != o.message.extra && (e.peers[o.sender].extra = o.extra, e.onExtraDataUpdated({
                userid: o.sender,
                extra: o.extra
            }), r(o.sender, o.extra)), o.message.streamSyncNeeded && e.peers[o.sender]) {
                var a = e.streamEvents[o.message.streamid];
                if (!a || !a.stream) return;
                var s = o.message.action;
                if ("ended" === s || "inactive" === s || "stream-removed" === s) return e.peersBackup[a.userid] && (a.extra = e.peersBackup[a.userid].extra), void e.onstreamended(a);
                var d = "both" != o.message.type ? o.message.type : null;
                "function" == typeof a.stream[s] && a.stream[s](d)
            } else if ("dropPeerConnection" !== o.message) {
                if (o.message.allParticipants) return -1 === o.message.allParticipants.indexOf(o.sender) && o.message.allParticipants.push(o.sender), void o.message.allParticipants.forEach(function (n) {
                    i[e.peers[n] ? "renegotiatePeer" : "createNewPeer"](n, {
                        localPeerSdpConstraints: {
                            OfferToReceiveAudio: e.sdpConstraints.mandatory.OfferToReceiveAudio,
                            OfferToReceiveVideo: e.sdpConstraints.mandatory.OfferToReceiveVideo
                        },
                        remotePeerSdpConstraints: {
                            OfferToReceiveAudio: e.session.oneway ? !!e.session.audio : e.sdpConstraints.mandatory.OfferToReceiveAudio,
                            OfferToReceiveVideo: e.session.oneway ? !!e.session.video || !!e.session.screen : e.sdpConstraints.mandatory.OfferToReceiveVideo
                        },
                        isOneWay: !!e.session.oneway || "one-way" === e.direction,
                        isDataOnly: t(e.session)
                    })
                });
                if (o.message.newParticipant) {
                    if (o.message.newParticipant == e.userid) return;
                    if (e.peers[o.message.newParticipant]) return;
                    i.createNewPeer(o.message.newParticipant, o.message.userPreferences || {
                        localPeerSdpConstraints: {
                            OfferToReceiveAudio: e.sdpConstraints.mandatory.OfferToReceiveAudio,
                            OfferToReceiveVideo: e.sdpConstraints.mandatory.OfferToReceiveVideo
                        },
                        remotePeerSdpConstraints: {
                            OfferToReceiveAudio: e.session.oneway ? !!e.session.audio : e.sdpConstraints.mandatory.OfferToReceiveAudio,
                            OfferToReceiveVideo: e.session.oneway ? !!e.session.video || !!e.session.screen : e.sdpConstraints.mandatory.OfferToReceiveVideo
                        },
                        isOneWay: !!e.session.oneway || "one-way" === e.direction,
                        isDataOnly: t(e.session)
                    })
                } else if (o.message.readyForOffer && (e.attachStreams.length && (e.waitingForLocalMedia = !1), e.waitingForLocalMedia)) setTimeout(function () {
                    n(o)
                }, 1); else if (o.message.newParticipationRequest && o.sender !== e.userid) {
                    e.peers[o.sender] && e.deletePeer(o.sender);
                    var c = {
                        extra: o.extra || {},
                        localPeerSdpConstraints: o.message.remotePeerSdpConstraints || {
                            OfferToReceiveAudio: e.sdpConstraints.mandatory.OfferToReceiveAudio,
                            OfferToReceiveVideo: e.sdpConstraints.mandatory.OfferToReceiveVideo
                        },
                        remotePeerSdpConstraints: o.message.localPeerSdpConstraints || {
                            OfferToReceiveAudio: e.session.oneway ? !!e.session.audio : e.sdpConstraints.mandatory.OfferToReceiveAudio,
                            OfferToReceiveVideo: e.session.oneway ? !!e.session.video || !!e.session.screen : e.sdpConstraints.mandatory.OfferToReceiveVideo
                        },
                        isOneWay: void 0 !== o.message.isOneWay ? o.message.isOneWay : !!e.session.oneway || "one-way" === e.direction,
                        isDataOnly: void 0 !== o.message.isDataOnly ? o.message.isDataOnly : t(e.session),
                        dontGetRemoteStream: void 0 !== o.message.isOneWay ? o.message.isOneWay : !!e.session.oneway || "one-way" === e.direction,
                        dontAttachLocalStream: !!o.message.dontGetRemoteStream,
                        connectionDescription: o,
                        successCallback: function () {
                        }
                    };
                    e.onNewParticipant(o.sender, c)
                } else {
                    if (o.message.changedUUID && e.peers[o.message.oldUUID] && (e.peers[o.message.newUUID] = e.peers[o.message.oldUUID], delete e.peers[o.message.oldUUID]), o.message.userLeft) return i.onUserLeft(o.sender), void (o.message.autoCloseEntireSession && e.leave());
                    i.addNegotiatedMessage(o.message, o.sender)
                }
            } else e.deletePeer(o.sender)
        });
        var a = !1;
        e.socket.resetProps = function () {
            a = !1
        }, e.socket.on("connect", function () {
            a || (a = !0, e.enableLogs && console.info("socket.io connection is opened."), setTimeout(function () {
                e.socket.emit("extra-data-updated", e.extra)
            }, 1e3), n && n(e.socket))
        }), e.socket.on("disconnect", function (n) {
            e.onSocketDisconnect(n)
        }), e.socket.on("error", function (n) {
            e.onSocketError(n)
        }), e.socket.on("user-disconnected", function (n) {
            n !== e.userid && (e.onUserStatusChanged({
                userid: n,
                status: "offline",
                extra: e.peers[n] && e.peers[n].extra || {}
            }), e.deletePeer(n))
        }), e.socket.on("user-connected", function (n) {
            n !== e.userid && e.onUserStatusChanged({
                userid: n,
                status: "online",
                extra: e.peers[n] && e.peers[n].extra || {}
            })
        }), e.socket.on("closed-entire-session", function (n, t) {
            e.leave(), e.onEntireSessionClosed({sessionid: n, userid: n, extra: t})
        }), e.socket.on("userid-already-taken", function (n, t) {
            e.onUserIdAlreadyTaken(n, t)
        }), e.socket.on("logs", function (n) {
            e.enableLogs && console.debug("server-logs", n)
        }), e.socket.on("number-of-broadcast-viewers-updated", function (n) {
            e.onNumberOfBroadcastViewersUpdated(n)
        }), e.socket.on("set-isInitiator-true", function (n) {
            n == e.sessionid && (e.isInitiator = !0)
        })
    }

    function i(e) {
        var n = this, t = ["getAllParticipants", "getLength", "selectFirst", "streams", "send", "forEach"];

        function o() {
            e.fbr = new FileBufferReader, e.fbr.onProgress = function (n) {
                e.onFileProgress(n)
            }, e.fbr.onBegin = function (n) {
                e.onFileStart(n)
            }, e.fbr.onEnd = function (n) {
                e.onFileEnd(n)
            }
        }

        e.peers = {
            getLength: function () {
                var e = 0;
                for (var n in this) -1 == t.indexOf(n) && e++;
                return e
            }, selectFirst: function () {
                var e;
                for (var n in this) -1 == t.indexOf(n) && (e = this[n]);
                return e
            }, getAllParticipants: function (e) {
                var n = [];
                for (var o in this) -1 == t.indexOf(o) && o != e && n.push(o);
                return n
            }, forEach: function (n) {
                this.getAllParticipants().forEach(function (t) {
                    n(e.peers[t])
                })
            }, send: function (t, o) {
                var i = this;
                if (!m(t.size) && !m(t.type)) {
                    if (e.enableFileSharing) return void n.shareFile(t, o);
                    "string" != typeof t && (t = JSON.stringify(t))
                }
                if ("text" === t.type || t instanceof ArrayBuffer || t instanceof DataView) {
                    if ("text" === t.type && (t = JSON.stringify(t)), o) {
                        var r = e.peers[o];
                        if (r) return r.channels.length ? void r.channels.forEach(function (e) {
                            e.send(t)
                        }) : (e.peers[o].createDataChannel(), e.renegotiate(o), void setTimeout(function () {
                            i.send(t, o)
                        }, 3e3))
                    }
                    this.getAllParticipants().forEach(function (n) {
                        if (!i[n].channels.length) return e.peers[n].createDataChannel(), e.renegotiate(n), void setTimeout(function () {
                            i[n].channels.forEach(function (e) {
                                e.send(t)
                            })
                        }, 3e3);
                        i[n].channels.forEach(function (e) {
                            e.send(t)
                        })
                    })
                } else M.send({text: t, channel: this, connection: e, remoteUserId: o})
            }
        }, this.uuid = e.userid, this.getLocalConfig = function (t, i, r) {
            return r || (r = {}), {
                streamsToShare: r.streamsToShare || {},
                rtcMultiConnection: e,
                connectionDescription: r.connectionDescription,
                userid: i,
                localPeerSdpConstraints: r.localPeerSdpConstraints,
                remotePeerSdpConstraints: r.remotePeerSdpConstraints,
                dontGetRemoteStream: !!r.dontGetRemoteStream,
                dontAttachLocalStream: !!r.dontAttachLocalStream,
                renegotiatingPeer: !!r.renegotiatingPeer,
                peerRef: r.peerRef,
                channels: r.channels || [],
                onLocalSdp: function (e) {
                    n.onNegotiationNeeded(e, i)
                },
                onLocalCandidate: function (t) {
                    (t = E.processCandidates(e, t)) && n.onNegotiationNeeded(t, i)
                },
                remoteSdp: t,
                onDataChannelMessage: function (t) {
                    if (!e.fbr && e.enableFileSharing && o(), "string" != typeof t && e.enableFileSharing) {
                        var r = this;
                        t instanceof ArrayBuffer || t instanceof DataView ? e.fbr.convertToObject(t, function (e) {
                            r.onDataChannelMessage(e)
                        }) : t.readyForNextChunk ? e.fbr.getNextChunk(t, function (n, t) {
                            e.peers[i].channels.forEach(function (e) {
                                e.send(n)
                            })
                        }, i) : t.chunkMissing ? e.fbr.chunkMissing(t) : e.fbr.addChunk(t, function (n) {
                            e.peers[i].peer.channel.send(n)
                        })
                    } else n.onDataChannelMessage(t, i)
                },
                onDataChannelError: function (e) {
                    n.onDataChannelError(e, i)
                },
                onDataChannelOpened: function (e) {
                    n.onDataChannelOpened(e, i)
                },
                onDataChannelClosed: function (e) {
                    n.onDataChannelClosed(e, i)
                },
                onRemoteStream: function (t) {
                    e.peers[i] && e.peers[i].streams.push(t), n.onGettingRemoteMedia(t, i)
                },
                onRemoteStreamRemoved: function (e) {
                    n.onRemovingRemoteMedia(e, i)
                },
                onPeerStateChanged: function (e) {
                    n.onPeerStateChanged(e), "new" === e.iceConnectionState && n.onNegotiationStarted(i, e), "connected" === e.iceConnectionState && n.onNegotiationCompleted(i, e), -1 !== e.iceConnectionState.search(/closed|failed/gi) && (n.onUserLeft(i), n.disconnectWith(i))
                }
            }
        }, this.createNewPeer = function (n, t) {
            if (!(e.maxParticipantsAllowed <= e.getAllParticipants().length)) {
                if (t = t || {}, e.isInitiator && e.session.audio && "two-way" === e.session.audio && !t.streamsToShare && (t.isOneWay = !1, t.isDataOnly = !1, t.session = e.session), !t.isOneWay && !t.isDataOnly) return t.isOneWay = !0, void this.onNegotiationNeeded({
                    enableMedia: !0,
                    userPreferences: t
                }, n);
                t = e.setUserPreferences(t, n);
                var o = this.getLocalConfig(null, n, t);
                e.peers[n] = new I(o)
            }
        }, this.createAnsweringPeer = function (n, t, o) {
            o = e.setUserPreferences(o || {}, t);
            var i = this.getLocalConfig(n, t, o);
            e.peers[t] = new I(i)
        }, this.renegotiatePeer = function (n, t, o) {
            if (e.peers[n]) {
                t || (t = {}), t.renegotiatingPeer = !0, t.peerRef = e.peers[n].peer, t.channels = e.peers[n].channels;
                var i = this.getLocalConfig(o, n, t);
                e.peers[n] = new I(i)
            } else console.error("Peer (" + n + ") does not exist. Renegotiation skipped.")
        }, this.replaceTrack = function (n, t, o) {
            if (!e.peers[t]) throw"This peer (" + t + ") does not exist.";
            var i = e.peers[t].peer;
            i.getSenders && "function" == typeof i.getSenders && i.getSenders().length ? i.getSenders().forEach(function (i) {
                o && "video" === i.track.kind && (e.peers[t].peer.lastVideoTrack = i.track, i.replaceTrack(n)), o || "audio" !== i.track.kind || (e.peers[t].peer.lastAudioTrack = i.track, i.replaceTrack(n))
            }) : (console.warn("RTPSender.replaceTrack is NOT supported."), this.renegotiatePeer(t))
        }, this.onNegotiationNeeded = function (e, n) {
        }, this.addNegotiatedMessage = function (t, o) {
            if (t.type && t.sdp) return "answer" == t.type && e.peers[o] && e.peers[o].addRemoteSdp(t), "offer" == t.type && (t.renegotiatingPeer ? this.renegotiatePeer(o, null, t) : this.createAnsweringPeer(t, o)), void (e.enableLogs && console.log("Remote peer's sdp:", t.sdp));
            if (t.candidate) return e.peers[o] && e.peers[o].addRemoteCandidate(t), void (e.enableLogs && console.log("Remote peer's candidate pairs:", t.candidate));
            if (t.enableMedia) {
                e.session = t.userPreferences.session || e.session, e.session.oneway && e.attachStreams.length && (e.attachStreams = []), t.userPreferences.isDataOnly && e.attachStreams.length && (e.attachStreams.length = []);
                var i = {};
                e.attachStreams.forEach(function (e) {
                    i[e.streamid] = {isAudio: !!e.isAudio, isVideo: !!e.isVideo, isScreen: !!e.isScreen}
                }), t.userPreferences.streamsToShare = i, n.onNegotiationNeeded({
                    readyForOffer: !0,
                    userPreferences: t.userPreferences
                }, o)
            }
            t.readyForOffer && e.onReadyForOffer(o, t.userPreferences)
        }, this.onGettingRemoteMedia = function (e, n) {
        }, this.onRemovingRemoteMedia = function (e, n) {
        }, this.onGettingLocalMedia = function (e) {
        }, this.onLocalMediaError = function (n, t) {
            e.onMediaError(n, t)
        }, this.shareFile = function (n, t) {
            o(), e.fbr.readAsArrayBuffer(n, function (n) {
                var o = e.getAllParticipants();
                t && (o = [t]), o.forEach(function (t) {
                    e.fbr.getNextChunk(n, function (n) {
                        e.peers[t].channels.forEach(function (e) {
                            e.send(n)
                        })
                    }, t)
                })
            }, {userid: e.userid, chunkSize: "Firefox" === DetectRTC.browser.name ? 15e3 : e.chunkSize || 0})
        };
        var i = new x(e);
        this.onDataChannelMessage = function (n, t) {
            i.receive(JSON.parse(n), t, e.peers[t] ? e.peers[t].extra : {})
        }, this.onDataChannelClosed = function (n, t) {
            n.userid = t, n.extra = e.peers[t] ? e.peers[t].extra : {}, e.onclose(n)
        }, this.onDataChannelError = function (n, t) {
            n.userid = t, event.extra = e.peers[t] ? e.peers[t].extra : {}, e.onerror(n)
        }, this.onDataChannelOpened = function (n, t) {
            e.peers[t].channels.length ? e.peers[t].channels = [n] : (e.peers[t].channels.push(n), e.onopen({
                userid: t,
                extra: e.peers[t] ? e.peers[t].extra : {},
                channel: n
            }))
        }, this.onPeerStateChanged = function (n) {
            e.onPeerStateChanged(n)
        }, this.onNegotiationStarted = function (e, n) {
        }, this.onNegotiationCompleted = function (e, n) {
        }, this.getRemoteStreams = function (n) {
            return n = n || e.peers.getAllParticipants()[0], e.peers[n] ? e.peers[n].streams : []
        }
    }

    function r(e, n, t) {
        if ("undefined" != typeof CustomEvent) {
            var o = new CustomEvent(n, {arguments: t, __exposedProps__: t});
            e.dispatchEvent(o)
        }
    }

    function a(e, n) {
        n.stream && n.stream && n.stream.addEventListener && (n.stream.addEventListener("mute", function (t) {
            (t = e.streamEvents[n.streamid]).session = {
                audio: "audio" === t.muteType,
                video: "video" === t.muteType
            }, e.onmute(t)
        }, !1), n.stream.addEventListener("unmute", function (t) {
            (t = e.streamEvents[n.streamid]).session = {
                audio: "audio" === t.unmuteType,
                video: "video" === t.unmuteType
            }, e.onunmute(t)
        }, !1))
    }

    function s() {
        if (window.crypto && window.crypto.getRandomValues && -1 === navigator.userAgent.indexOf("Safari")) {
            for (var e = window.crypto.getRandomValues(new Uint32Array(3)), n = "", t = 0, o = e.length; t < o; t++) n += e[t].toString(36);
            return n
        }
        return (Math.random() * (new Date).getTime()).toString(36).replace(/\./g, "")
    }

    function d(e, n, t) {
        if (t.autoCreateMediaElement) {
            var o = !1;
            v(e, "video").length || e.isVideo || e.isScreen || (o = !0), "Firefox" === DetectRTC.browser.name && (t.session.video || t.session.screen) && (o = !1);
            var i = document.createElement(o ? "audio" : "video");
            if (i.srcObject = e, i.setAttribute("autoplay", !0), i.setAttribute("playsinline", !0), i.setAttribute("controls", !0), i.setAttribute("muted", !1), i.setAttribute("volume", 1), "Firefox" === DetectRTC.browser.name) {
                var r = "ended";
                "oninactive" in i && (r = "inactive"), i.addEventListener(r, function () {
                    if (currentUserMediaRequest.remove(e.idInstance), "local" === e.type) {
                        r = "ended", "oninactive" in e && (r = "inactive"), T.onSyncNeeded(e.streamid, r), t.attachStreams.forEach(function (n, o) {
                            e.streamid === n.streamid && delete t.attachStreams[o]
                        });
                        var n = [];
                        t.attachStreams.forEach(function (e) {
                            e && n.push(e)
                        }), t.attachStreams = n;
                        var o = t.streamEvents[e.streamid];
                        if (o) return void t.onstreamended(o);
                        this.parentNode && this.parentNode.removeChild(this)
                    }
                }, !1)
            }
            var a = i.play();
            if (void 0 !== a) {
                var s = !1;
                setTimeout(function () {
                    s || (s = !0, n(i))
                }, 1e3), a.then(function () {
                    s || (s = !0, n(i))
                }).catch(function (e) {
                    s || (s = !0, n(i))
                })
            } else n(i)
        } else n({})
    }

    function c(e, n) {
        window.removeEventListener(e, n), window.addEventListener(e, n, !1)
    }

    function l(e) {
        var n = [];
        return e.forEach(function (e) {
            e && n.push(e)
        }), n
    }

    function u(e) {
        return !e.audio && !e.video && !e.screen && e.data
    }

    function m(e) {
        return void 0 === e
    }

    (t = "undefined" != typeof global ? global : null) && "undefined" == typeof window && "undefined" != typeof global && (global.navigator = {
        userAgent: "Fake/5.0 (FakeOS) AppleWebKit/123 (KHTML, like Gecko) Fake/12.3.4567.89 Fake/123.45",
        getUserMedia: function () {
        }
    }, global.console || (global.console = {}), void 0 === global.console.debug && (global.console.debug = global.console.info = global.console.error = global.console.log = global.console.log || function () {
        console.log(arguments)
    }), "undefined" == typeof document && (t.document = {}, document.createElement = document.captureStream = document.mozCaptureStream = function () {
        var e = {
            getContext: function () {
                return e
            }, play: function () {
            }, pause: function () {
            }, drawImage: function () {
            }, toDataURL: function () {
                return ""
            }
        };
        return e
    }, document.addEventListener = document.removeEventListener = t.addEventListener = t.removeEventListener = function () {
    }, t.HTMLVideoElement = t.HTMLMediaElement = function () {
    }), "undefined" == typeof io && (t.io = function () {
        return {
            on: function (e, n) {
                n = n || function () {
                }, "connect" === e && n()
            }, emit: function (e, n, t) {
                t = t || function () {
                }, "open-room" !== e && "join-room" !== e || t(!0, n.sessionid, null)
            }
        }
    }), "undefined" == typeof location && (t.location = {
        protocol: "file:",
        href: "",
        hash: "",
        origin: "self"
    }), "undefined" == typeof screen && (t.screen = {
        width: 0,
        height: 0
    }), "undefined" == typeof URL && (t.URL = {
        createObjectURL: function () {
            return ""
        }, revokeObjectURL: function () {
            return ""
        }
    }), t.window = global), function () {
        var e = "Fake/5.0 (FakeOS) AppleWebKit/123 (KHTML, like Gecko) Fake/12.3.4567.89 Fake/123.45";
        if (h = "object" == typeof process && "object" == typeof process.versions && process.versions.node && !process.browser) {
            var n = process.versions.node.toString().replace("v", "");
            e = "Nodejs/" + n + " (NodeOS) AppleWebKit/" + n + " (KHTML, like Gecko) Nodejs/" + n + " Nodejs/" + n
        }
        !function (n) {
            "undefined" == typeof window && ("undefined" == typeof window && "undefined" != typeof global && (global.navigator = {
                userAgent: e,
                getUserMedia: function () {
                }
            }, n.window = global), "undefined" == typeof location && (n.location = {
                protocol: "file:",
                href: "",
                hash: ""
            }), "undefined" == typeof screen && (n.screen = {width: 0, height: 0}))
        }("undefined" != typeof global ? global : window);
        var t = window.navigator;
        void 0 !== t ? (void 0 !== t.webkitGetUserMedia && (t.getUserMedia = t.webkitGetUserMedia), void 0 !== t.mozGetUserMedia && (t.getUserMedia = t.mozGetUserMedia)) : t = {
            getUserMedia: function () {
            }, userAgent: e
        };
        var o = !!/Android|webOS|iPhone|iPad|iPod|BB10|BlackBerry|IEMobile|Opera Mini|Mobile|mobile/i.test(t.userAgent || ""),
            i = !(-1 === t.userAgent.indexOf("Edge") || !t.msSaveOrOpenBlob && !t.msSaveBlob),
            r = !!window.opera || t.userAgent.indexOf(" OPR/") >= 0, a = void 0 !== window.InstallTrigger,
            s = /^((?!chrome|android).)*safari/i.test(t.userAgent), d = !!window.chrome && !r,
            c = "undefined" != typeof document && !!document.documentMode && !i;

        function l(e, n) {
            var t = 0, o = !1, i = window.setInterval(function () {
                e() && (window.clearInterval(i), n(o)), t++ > 50 && (window.clearInterval(i), n(o = !0))
            }, 10)
        }

        var u = {
            Android: function () {
                return t.userAgent.match(/Android/i)
            }, BlackBerry: function () {
                return t.userAgent.match(/BlackBerry|BB10/i)
            }, iOS: function () {
                return t.userAgent.match(/iPhone|iPad|iPod/i)
            }, Opera: function () {
                return t.userAgent.match(/Opera Mini/i)
            }, Windows: function () {
                return t.userAgent.match(/IEMobile/i)
            }, any: function () {
                return u.Android() || u.BlackBerry() || u.iOS() || u.Opera() || u.Windows()
            }, getOsName: function () {
                var e = "Unknown OS";
                return u.Android() && (e = "Android"), u.BlackBerry() && (e = "BlackBerry"), u.iOS() && (e = "iOS"), u.Opera() && (e = "Opera Mini"), u.Windows() && (e = "Windows"), e
            }
        };
        var m = "Unknown OS", g = "Unknown OS Version";
        var f, v, p = function () {
            for (var e, n = t.appVersion, o = t.userAgent, i = "-", r = [{
                s: "Windows 10",
                r: /(Windows 10.0|Windows NT 10.0)/
            }, {s: "Windows 8.1", r: /(Windows 8.1|Windows NT 6.3)/}, {
                s: "Windows 8",
                r: /(Windows 8|Windows NT 6.2)/
            }, {s: "Windows 7", r: /(Windows 7|Windows NT 6.1)/}, {
                s: "Windows Vista",
                r: /Windows NT 6.0/
            }, {s: "Windows Server 2003", r: /Windows NT 5.2/}, {
                s: "Windows XP",
                r: /(Windows NT 5.1|Windows XP)/
            }, {s: "Windows 2000", r: /(Windows NT 5.0|Windows 2000)/}, {
                s: "Windows ME",
                r: /(Win 9x 4.90|Windows ME)/
            }, {s: "Windows 98", r: /(Windows 98|Win98)/}, {
                s: "Windows 95",
                r: /(Windows 95|Win95|Windows_95)/
            }, {s: "Windows NT 4.0", r: /(Windows NT 4.0|WinNT4.0|WinNT|Windows NT)/}, {
                s: "Windows CE",
                r: /Windows CE/
            }, {s: "Windows 3.11", r: /Win16/}, {s: "Android", r: /Android/}, {
                s: "Open BSD",
                r: /OpenBSD/
            }, {s: "Sun OS", r: /SunOS/}, {s: "Linux", r: /(Linux|X11)/}, {
                s: "iOS",
                r: /(iPhone|iPad|iPod)/
            }, {s: "Mac OS X", r: /Mac OS X/}, {s: "Mac OS", r: /(MacPPC|MacIntel|Mac_PowerPC|Macintosh)/}, {
                s: "QNX",
                r: /QNX/
            }, {s: "UNIX", r: /UNIX/}, {s: "BeOS", r: /BeOS/}, {s: "OS/2", r: /OS\/2/}, {
                s: "Search Bot",
                r: /(nuhk|Googlebot|Yammybot|Openbot|Slurp|MSNBot|Ask Jeeves\/Teoma|ia_archiver)/
            }], a = 0; e = r[a]; a++) if (e.r.test(o)) {
                i = e.s;
                break
            }
            var s = "-";
            switch (/Windows/.test(i) && (/Windows (.*)/.test(i) && (s = /Windows (.*)/.exec(i)[1]), i = "Windows"), i) {
                case"Mac OS X":
                    /Mac OS X (10[\.\_\d]+)/.test(o) && (s = /Mac OS X (10[\.\_\d]+)/.exec(o)[1]);
                    break;
                case"Android":
                    /Android ([\.\_\d]+)/.test(o) && (s = /Android ([\.\_\d]+)/.exec(o)[1]);
                    break;
                case"iOS":
                    /OS (\d+)_(\d+)_?(\d+)?/.test(o) && (s = (s = /OS (\d+)_(\d+)_?(\d+)?/.exec(n))[1] + "." + s[2] + "." + (0 | s[3]))
            }
            return {osName: i, osVersion: s}
        }();
        p && p.osName && "-" != p.osName ? (m = p.osName, g = p.osVersion) : u.any() && "Android" == (m = u.getOsName()) && (g = !!(v = (f = (f || t.userAgent).toLowerCase()).match(/android\s([0-9\.]*)/)) && v[1]);
        var h = "object" == typeof process && "object" == typeof process.versions && process.versions.node;
        "Unknown OS" === m && h && (m = "Nodejs", g = process.versions.node.toString().replace("v", ""));
        var S = !1, C = !1;
        ["captureStream", "mozCaptureStream", "webkitCaptureStream"].forEach(function (e) {
            "undefined" != typeof document && "function" == typeof document.createElement && (!S && e in document.createElement("canvas") && (S = !0), !C && e in document.createElement("video") && (C = !0))
        });
        var w = /^(192\.168\.|169\.254\.|10\.|172\.(1[6-9]|2\d|3[01]))/, y = /([0-9]{1,3}(\.[0-9]{1,3}){3})/,
            b = /[a-f0-9]{1,4}(:[a-f0-9]{1,4}){7}/;
        var I = [], k = [], E = [], A = [];
        t.mediaDevices && t.mediaDevices.enumerateDevices && (t.enumerateDevices = function (e) {
            var n = t.mediaDevices.enumerateDevices();
            n && n.then ? t.mediaDevices.enumerateDevices().then(e).catch(function () {
                e([])
            }) : e([])
        });
        var R = !1;
        void 0 !== _ && "getSources" in _ ? R = !0 : t.mediaDevices && t.mediaDevices.enumerateDevices && (R = !0);
        var T = !1, x = !1, M = !1, P = !1, O = !1;

        function V(e) {
            if (R) if (!t.enumerateDevices && window.MediaStreamTrack && window.MediaStreamTrack.getSources && (t.enumerateDevices = window.MediaStreamTrack.getSources.bind(window.MediaStreamTrack)), !t.enumerateDevices && t.enumerateDevices && (t.enumerateDevices = t.enumerateDevices.bind(t)), t.enumerateDevices) {
                I = [], k = [], E = [], A = [], T = !1, x = !1, M = !1, P = !1, O = !1;
                var n = {};
                t.enumerateDevices(function (t) {
                    t.forEach(function (e) {
                        var t = {};
                        for (var o in e) try {
                            "function" != typeof e[o] && (t[o] = e[o])
                        } catch (e) {
                        }
                        n[t.deviceId + t.label + t.kind] || ("audio" === t.kind && (t.kind = "audioinput"), "video" === t.kind && (t.kind = "videoinput"), t.deviceId || (t.deviceId = t.id), t.id || (t.id = t.deviceId), t.label ? ("videoinput" !== t.kind || O || (O = !0), "audioinput" !== t.kind || P || (P = !0)) : (t.isCustomLabel = !0, "videoinput" === t.kind ? t.label = "Camera " + (A.length + 1) : "audioinput" === t.kind ? t.label = "Microphone " + (k.length + 1) : "audiooutput" === t.kind ? t.label = "Speaker " + (E.length + 1) : t.label = "Please invoke getUserMedia once.", void 0 !== L && L.browser.isChrome && L.browser.version >= 46 && !/^(https:|chrome-extension:)$/g.test(location.protocol || "") && "undefined" != typeof document && "string" == typeof document.domain && document.domain.search && -1 === document.domain.search(/localhost|127.0./g) && (t.label = "HTTPs is required to get label of this " + t.kind + " device.")), "audioinput" === t.kind && (T = !0, -1 === k.indexOf(t) && k.push(t)), "audiooutput" === t.kind && (x = !0, -1 === E.indexOf(t) && E.push(t)), "videoinput" === t.kind && (M = !0, -1 === A.indexOf(t) && A.push(t)), I.push(t), n[t.deviceId + t.label + t.kind] = t)
                    }), void 0 !== L && (L.MediaDevices = I, L.hasMicrophone = T, L.hasSpeakers = x, L.hasWebcam = M, L.isWebsiteHasWebcamPermissions = O, L.isWebsiteHasMicrophonePermissions = P, L.audioInputDevices = k, L.audioOutputDevices = E, L.videoInputDevices = A), e && e()
                })
            } else e && e(); else e && e()
        }

        var L = window.DetectRTC || {};
        L.browser = function () {
            t.appVersion;
            var e, n, o, l = t.userAgent, u = t.appName, m = "" + parseFloat(t.appVersion),
                g = parseInt(t.appVersion, 10);
            if (s && !d && -1 !== l.indexOf("CriOS") && (s = !1, d = !0), r) {
                u = "Opera";
                try {
                    g = (m = t.userAgent.split("OPR/")[1].split(" ")[0]).split(".")[0]
                } catch (e) {
                    m = "0.0.0.0", g = 0
                }
            } else c ? ((n = l.indexOf("rv:")) > 0 ? m = l.substring(n + 3) : (n = l.indexOf("MSIE"), m = l.substring(n + 5)), u = "IE") : d ? (n = l.indexOf("Chrome"), u = "Chrome", m = l.substring(n + 7)) : s ? (n = l.indexOf("Safari"), u = "Safari", m = l.substring(n + 7), -1 !== (n = l.indexOf("Version")) && (m = l.substring(n + 8)), -1 !== t.userAgent.indexOf("Version/") && (m = t.userAgent.split("Version/")[1].split(" ")[0])) : a ? (n = l.indexOf("Firefox"), u = "Firefox", m = l.substring(n + 8)) : (e = l.lastIndexOf(" ") + 1) < (n = l.lastIndexOf("/")) && (u = l.substring(e, n), m = l.substring(n + 1), u.toLowerCase() === u.toUpperCase() && (u = t.appName));
            return i && (u = "Edge", m = t.userAgent.split("Edge/")[1]), -1 !== (o = m.search(/[; \)]/)) && (m = m.substring(0, o)), g = parseInt("" + m, 10), isNaN(g) && (m = "" + parseFloat(t.appVersion), g = parseInt(t.appVersion, 10)), {
                fullVersion: m,
                version: g,
                name: u,
                isPrivateBrowsing: !1
            }
        }(), function (e) {
            var n;
            try {
                if (window.webkitRequestFileSystem) window.webkitRequestFileSystem(window.TEMPORARY, 1, function () {
                    n = !1
                }, function (e) {
                    n = !0
                }); else if (window.indexedDB && /Firefox/.test(window.navigator.userAgent)) {
                    var t;
                    try {
                        (t = window.indexedDB.open("test")).onerror = function () {
                            return !0
                        }
                    } catch (e) {
                        n = !0
                    }
                    void 0 === n && l(function () {
                        return "done" === t.readyState
                    }, function (e) {
                        e || (n = !t.result)
                    })
                } else if (function (e) {
                    var n = e.toLowerCase();
                    if (0 === n.indexOf("msie") && 0 === n.indexOf("trident")) return !1;
                    var t = /(?:msie|rv:)\s?([\d\.]+)/.exec(n);
                    return !!(t && parseInt(t[1], 10) >= 10)
                }(window.navigator.userAgent)) {
                    n = !1;
                    try {
                        window.indexedDB || (n = !0)
                    } catch (e) {
                        n = !0
                    }
                } else if (window.localStorage && /Safari/.test(window.navigator.userAgent)) {
                    try {
                        window.localStorage.setItem("test", 1)
                    } catch (e) {
                        n = !0
                    }
                    void 0 === n && (n = !1, window.localStorage.removeItem("test"))
                }
            } catch (e) {
                n = !1
            }
            l(function () {
                return void 0 !== n
            }, function (t) {
                e(n)
            })
        }(function (e) {
            L.browser.isPrivateBrowsing = !!e
        }), L.browser["is" + L.browser.name] = !0, L.osName = m, L.osVersion = g;
        "object" == typeof process && "object" == typeof process.versions && process.versions["node-webkit"];
        var D = !1;
        ["RTCPeerConnection", "webkitRTCPeerConnection", "mozRTCPeerConnection", "RTCIceGatherer"].forEach(function (e) {
            D || e in window && (D = !0)
        }), L.isWebRTCSupported = D, L.isORTCSupported = "undefined" != typeof RTCIceGatherer;
        var U = !1;
        (L.browser.isChrome && L.browser.version >= 35 ? U = !0 : L.browser.isFirefox && L.browser.version >= 34 ? U = !0 : L.browser.isEdge && L.browser.version >= 17 ? U = !0 : "Android" === L.osName && L.browser.isChrome && (U = !0), /^(https:|chrome-extension:)$/g.test(location.protocol || "")) || ("undefined" != typeof document && "string" == typeof document.domain && document.domain.search && -1 === document.domain.search(/localhost|127.0./g) && (L.browser.isChrome || L.browser.isEdge || L.browser.isOpera) ? U = !1 : L.browser.isFirefox && (U = !1));
        L.isScreenCapturingSupported = U;
        var N = {isSupported: !1, isCreateMediaStreamSourceSupported: !1};
        ["AudioContext", "webkitAudioContext", "mozAudioContext", "msAudioContext"].forEach(function (e) {
            N.isSupported || e in window && (N.isSupported = !0, window[e] && "createMediaStreamSource" in window[e].prototype && (N.isCreateMediaStreamSourceSupported = !0))
        }), L.isAudioContextSupported = N.isSupported, L.isCreateMediaStreamSourceSupported = N.isCreateMediaStreamSourceSupported;
        var B = !1;
        L.browser.isChrome && L.browser.version > 31 && (B = !0), L.isRtpDataChannelsSupported = B;
        var j = !1;
        L.browser.isFirefox && L.browser.version > 28 ? j = !0 : L.browser.isChrome && L.browser.version > 25 ? j = !0 : L.browser.isOpera && L.browser.version >= 11 && (j = !0), L.isSctpDataChannelsSupported = j, L.isMobileDevice = o;
        var F = !1;
        t.getUserMedia ? F = !0 : t.mediaDevices && t.mediaDevices.getUserMedia && (F = !0), L.browser.isChrome && L.browser.version >= 46 && !/^(https:|chrome-extension:)$/g.test(location.protocol || "") && "undefined" != typeof document && "string" == typeof document.domain && document.domain.search && -1 === document.domain.search(/localhost|127.0./g) && (F = "Requires HTTPs"), "Nodejs" === L.osName && (F = !1), L.isGetUserMediaSupported = F;
        var q, Q, W, H = "";
        screen.width && (H += (screen.width ? screen.width : "") + " x " + (screen.height ? screen.height : ""));
        L.displayResolution = H, L.displayAspectRatio = (q = screen.width, Q = screen.height, W = function e(n, t) {
            return 0 == t ? n : e(t, n % t)
        }(q, Q), q / W / (Q / W)).toFixed(2), L.isCanvasSupportsStreamCapturing = S, L.isVideoSupportsStreamCapturing = C, "Chrome" == L.browser.name && L.browser.version >= 53 && (L.isCanvasSupportsStreamCapturing || (L.isCanvasSupportsStreamCapturing = "Requires chrome flag: enable-experimental-web-platform-features"), L.isVideoSupportsStreamCapturing || (L.isVideoSupportsStreamCapturing = "Requires chrome flag: enable-experimental-web-platform-features")), L.DetectLocalIPAddress = function (e, n) {
            if (L.isWebRTCSupported) {
                var t = !0, o = !0;
                !function (e, n) {
                    if ("undefined" == typeof document || "function" != typeof document.getElementById) return;
                    var t = {},
                        o = window.RTCPeerConnection || window.mozRTCPeerConnection || window.webkitRTCPeerConnection;
                    if (!o) {
                        var i = document.getElementById("iframe");
                        if (!i) return;
                        var r = i.contentWindow;
                        o = r.RTCPeerConnection || r.mozRTCPeerConnection || r.webkitRTCPeerConnection
                    }
                    if (!o) return;
                    var a = null;
                    "Chrome" === L.browser && L.browser.version < 58 && (a = {optional: [{RtpDataChannels: !0}]});
                    var s = svConfigs.iceServers, d = new o(s, a);
                    n && (d.addStream ? d.addStream(n) : d.addTrack && n.getTracks()[0] && d.addTrack(n.getTracks()[0], n));

                    function c(n) {
                        if (n) {
                            var o = y.exec(n);
                            if (o) {
                                var i = o[1], r = n.match(w);
                                void 0 === t[i] && e(i, r, !0), t[i] = !0
                            }
                        } else e()
                    }

                    if (d.onicecandidate = function (e) {
                        e.candidate && e.candidate.candidate ? c(e.candidate.candidate) : c()
                    }, !n) try {
                        d.createDataChannel("sctp", {})
                    } catch (e) {
                    }
                    L.isPromisesSupported ? d.createOffer().then(function (e) {
                        d.setLocalDescription(e).then(l)
                    }) : d.createOffer(function (e) {
                        d.setLocalDescription(e, l, function () {
                        })
                    }, function () {
                    });

                    function l() {
                        d.localDescription.sdp.split("\n").forEach(function (e) {
                            e && 0 === e.indexOf("a=candidate:") && c(e)
                        })
                    }
                }(function (n) {
                    n ? n.match(w) ? e("Local: " + n, t = !1, o) : n.match(b) ? e("Public: " + n, t, o = !1) : e("Public: " + n, t, o) : e()
                }, n)
            }
        }, L.isWebSocketsSupported = "WebSocket" in window && 2 === window.WebSocket.CLOSING, L.isWebSocketsBlocked = !L.isWebSocketsSupported, "Nodejs" === L.osName && (L.isWebSocketsSupported = !0, L.isWebSocketsBlocked = !1), L.checkWebSocketsSupport = function (e) {
            e = e || function () {
            };
            try {
                var n, t = new WebSocket("wss://echo.websocket.org:443/");
                t.onopen = function () {
                    L.isWebSocketsBlocked = !1, n = (new Date).getTime(), t.send("ping")
                }, t.onmessage = function () {
                    L.WebsocketLatency = (new Date).getTime() - n + "ms", e(), t.close(), t = null
                }, t.onerror = function () {
                    L.isWebSocketsBlocked = !0, e()
                }
            } catch (n) {
                L.isWebSocketsBlocked = !0, e()
            }
        }, L.load = function (e) {
            V(e = e || function () {
            })
        }, L.MediaDevices = void 0 !== I ? I : [], L.hasMicrophone = T, L.hasSpeakers = x, L.hasWebcam = M, L.isWebsiteHasWebcamPermissions = O, L.isWebsiteHasMicrophonePermissions = P, L.audioInputDevices = k, L.audioOutputDevices = E, L.videoInputDevices = A;
        var z = !1;
        "undefined" != typeof document && "function" == typeof document.createElement && "setSinkId" in document.createElement("video") && (z = !0), L.isSetSinkIdSupported = z;
        var G = !1;
        L.browser.isFirefox && "undefined" != typeof mozRTCPeerConnection ? "getSenders" in mozRTCPeerConnection.prototype && (G = !0) : L.browser.isChrome && "undefined" != typeof webkitRTCPeerConnection && "getSenders" in webkitRTCPeerConnection.prototype && (G = !0), L.isRTPSenderReplaceTracksSupported = G;
        var J = !1;
        L.browser.isFirefox && L.browser.version > 38 && (J = !0), L.isRemoteStreamProcessingSupported = J;
        var Y = !1;
        void 0 !== _ && "applyConstraints" in _.prototype && (Y = !0), L.isApplyConstraintsSupported = Y;
        var $ = !1;
        L.browser.isFirefox && L.browser.version >= 43 && ($ = !0), L.isMultiMonitorScreenCapturingSupported = $, L.isPromisesSupported = !!("Promise" in window), L.version = "1.3.9", void 0 === L && (window.DetectRTC = {});
        var X = window.MediaStream;
        void 0 === X && "undefined" != typeof webkitMediaStream && (X = webkitMediaStream), L.MediaStream = void 0 !== X && "function" == typeof X && Object.keys(X.prototype), L.MediaStreamTrack = void 0 !== _ && Object.keys(_.prototype);
        var K = window.RTCPeerConnection || window.mozRTCPeerConnection || window.webkitRTCPeerConnection;
        L.RTCPeerConnection = void 0 !== K && Object.keys(K.prototype), window.DetectRTC = L, "undefined" != typeof module && (module.exports = L), "function" == typeof define && define.amd && define("DetectRTC", [], function () {
            return L
        })
    }(), "undefined" != typeof cordova && (DetectRTC.isMobileDevice = !0, DetectRTC.browser.name = "Chrome"), navigator && navigator.userAgent && -1 !== navigator.userAgent.indexOf("Crosswalk") && (DetectRTC.isMobileDevice = !0, DetectRTC.browser.name = "Chrome"), window.addEventListener || (window.addEventListener = function (e, n, t) {
        e.attachEvent && e.attachEvent("on" + n, t)
    }), window.attachEventListener = function (e, n, t, o) {
        e.addEventListener(n, t, o)
    };
    var g = window.MediaStream;

    function f(e, n) {
        return (!e.session.audio || "two-way" !== e.session.audio) && ("Firefox" === DetectRTC.browser.name && !1 !== n || !("Chrome" !== DetectRTC.browser.name || DetectRTC.browser.version < 50) && (!0 === typeof n || !(void 0 !== n || !e.session.audio || !e.session.screen || e.session.video) && (n = !0, !0)))
    }

    function v(e, n) {
        return e && e.getTracks ? e.getTracks().filter(function (e) {
            return e.kind === (n || "audio")
        }) : []
    }

    function p() {
        var e = !1;
        try {
            if ("undefined" == typeof RTCRtpTransceiver) return !1;
            if (!("currentDirection" in RTCRtpTransceiver.prototype)) return !1;
            var n = new S;
            try {
                n.addTransceiver("audio"), e = !0
            } catch (e) {
            }
            n.close()
        } catch (n) {
            e = !1
        }
        return e && function () {
            var e = !1;
            try {
                var n = new S({sdpSemantics: "unified-plan"});
                try {
                    var t = n.getConfiguration();
                    e = "unified-plan" == t.sdpSemantics || (t.sdpSemantics, !1)
                } catch (n) {
                    e = !1
                }
            } catch (n) {
                e = !1
            }
            return e
        }()
    }

    function h() {
        if ("undefined" != typeof cordova && void 0 !== cordova.plugins && void 0 !== cordova.plugins.iosrtc) {
            var e = cordova.plugins.iosrtc;
            window.webkitRTCPeerConnection = e.RTCPeerConnection, window.RTCSessionDescription = e.RTCSessionDescription, window.RTCIceCandidate = e.RTCIceCandidate, window.MediaStream = e.MediaStream, window.MediaStreamTrack = e.MediaStreamTrack, navigator.getUserMedia = navigator.webkitGetUserMedia = e.getUserMedia, e.debug.enable("iosrtc*"), "function" == typeof e.selectAudioOutput && e.selectAudioOutput(window.iOSDefaultAudioOutputDevice || "speaker"), e.registerGlobals()
        }
    }

    void 0 === g && "undefined" != typeof webkitMediaStream && (g = webkitMediaStream), void 0 !== g && ("stop" in g.prototype || (g.prototype.stop = function () {
        this.getTracks().forEach(function (e) {
            e.stop()
        })
    })), window.iOSDefaultAudioOutputDevice = window.iOSDefaultAudioOutputDevice || "speaker", document.addEventListener("deviceready", h, !1), h();
    var S, C = {};

    function w(e) {
        return {OfferToReceiveAudio: !!e.OfferToReceiveAudio, OfferToReceiveVideo: !!e.OfferToReceiveVideo}
    }

    void 0 !== window.RTCPeerConnection ? S = window.RTCPeerConnection : "undefined" != typeof mozRTCPeerConnection ? S = mozRTCPeerConnection : "undefined" != typeof webkitRTCPeerConnection && (S = webkitRTCPeerConnection);
    var y = window.RTCSessionDescription || window.mozRTCSessionDescription,
        b = window.RTCIceCandidate || window.mozRTCIceCandidate, _ = window.MediaStreamTrack;

    function I(e) {
        if (void 0 !== window.RTCPeerConnection ? S = window.RTCPeerConnection : "undefined" != typeof mozRTCPeerConnection ? S = mozRTCPeerConnection : "undefined" != typeof webkitRTCPeerConnection && (S = webkitRTCPeerConnection), y = window.RTCSessionDescription || window.mozRTCSessionDescription, b = window.RTCIceCandidate || window.mozRTCIceCandidate, _ = window.MediaStreamTrack, !S) throw"WebRTC 1.0 (RTCPeerConnection) API are NOT available in this browser.";
        var n = e.rtcMultiConnection;
        this.extra = e.remoteSdp ? e.remoteSdp.extra : n.extra, this.userid = e.userid, this.streams = [], this.channels = e.channels || [], this.connectionDescription = e.connectionDescription, this.addStream = function (e) {
            n.addStream(e, t.userid)
        }, this.removeStream = function (e) {
            n.removeStream(e, t.userid)
        };
        var t = this;
        e.remoteSdp && (this.connectionDescription = e.remoteSdp.connectionDescription);
        var o, i = {};
        C.sdpConstraints = w({OfferToReceiveAudio: !0, OfferToReceiveVideo: !0});
        var r = !!e.renegotiatingPeer;
        e.remoteSdp && (r = !!e.remoteSdp.renegotiatingPeer);
        var a = [];
        if (n.attachStreams.forEach(function (e) {
            e && a.push(e)
        }), r) o = e.peerRef; else {
            var s = "all";
            (n.candidates.turn || n.candidates.relay) && (n.candidates.stun || n.candidates.reflexive || n.candidates.host || (s = "relay"));
            try {
                var d = {iceServers: n.iceServers, iceTransportPolicy: n.iceTransportPolicy || s};
                void 0 !== n.iceCandidatePoolSize && (d.iceCandidatePoolSize = n.iceCandidatePoolSize), void 0 !== n.bundlePolicy && (d.bundlePolicy = n.bundlePolicy), void 0 !== n.rtcpMuxPolicy && (d.rtcpMuxPolicy = n.rtcpMuxPolicy), n.sdpSemantics && (d.sdpSemantics = n.sdpSemantics || "unified-plan"), n.iceServers && n.iceServers.length || (d = null, n.optionalArgument = null), o = new S(d, n.optionalArgument)
            } catch (e) {
                try {
                    d = {iceServers: n.iceServers};
                    o = new S(d)
                } catch (e) {
                    o = new S
                }
            }
        }
        !o.getRemoteStreams && o.getReceivers && (o.getRemoteStreams = function () {
            var e = new g;
            return o.getReceivers().forEach(function (n) {
                e.addTrack(n.track)
            }), [e]
        }), !o.getLocalStreams && o.getSenders && (o.getLocalStreams = function () {
            var e = new g;
            return o.getSenders().forEach(function (n) {
                e.addTrack(n.track)
            }), [e]
        }), o.onicecandidate = function (i) {
            if (i.candidate) n.trickleIce && e.onLocalCandidate({
                candidate: i.candidate.candidate,
                sdpMid: i.candidate.sdpMid,
                sdpMLineIndex: i.candidate.sdpMLineIndex
            }); else if (!n.trickleIce) {
                var r = o.localDescription;
                e.onLocalSdp({
                    type: r.type,
                    sdp: r.sdp,
                    remotePeerSdpConstraints: e.remotePeerSdpConstraints || !1,
                    renegotiatingPeer: !!e.renegotiatingPeer || !1,
                    connectionDescription: t.connectionDescription,
                    dontGetRemoteStream: !!e.dontGetRemoteStream,
                    extra: n ? n.extra : {},
                    streamsToShare: p
                })
            }
        }, a.forEach(function (i) {
            e.remoteSdp && e.remoteSdp.remotePeerSdpConstraints && e.remoteSdp.remotePeerSdpConstraints.dontGetRemoteStream || e.dontAttachLocalStream || (i = n.beforeAddingStream(i, t)) && (o.getLocalStreams().forEach(function (e) {
                i && e.id == i.id && (i = null)
            }), i && i.getTracks && i.getTracks().forEach(function (e) {
                try {
                    o.addTrack(e, i)
                } catch (e) {
                }
            }))
        }), o.oniceconnectionstatechange = o.onsignalingstatechange = function () {
            var i = t.extra;
            n.peers[t.userid] && (i = n.peers[t.userid].extra || i), o && (e.onPeerStateChanged({
                iceConnectionState: o.iceConnectionState,
                iceGatheringState: o.iceGatheringState,
                signalingState: o.signalingState,
                extra: i,
                userid: t.userid
            }), o && o.iceConnectionState && -1 !== o.iceConnectionState.search(/closed|failed/gi) && t.streams instanceof Array && t.streams.forEach(function (e) {
                var t = n.streamEvents[e.id] || {streamid: e.id, stream: e, type: "remote"};
                n.onstreamended(t)
            }))
        };
        var c = {OfferToReceiveAudio: !!a.length, OfferToReceiveVideo: !!a.length};
        e.localPeerSdpConstraints && (c = e.localPeerSdpConstraints), C.sdpConstraints = w(c);
        var l = {};
        o.ontrack = function (n) {
            if (n && "track" === n.type) if (n.stream = n.streams[n.streams.length - 1], n.stream.id || (n.stream.id = n.track.id), l[n.stream.id] && "Safari" !== DetectRTC.browser.name) n.track && (n.track.onended = function () {
                o && o.onremovestream(n)
            }); else {
                l[n.stream.id] = n.stream.id;
                var t = {};
                e.remoteSdp && e.remoteSdp.streamsToShare ? t = e.remoteSdp.streamsToShare : e.streamsToShare && (t = e.streamsToShare);
                var r = t[n.stream.id];
                r ? (n.stream.isAudio = r.isAudio, n.stream.isVideo = r.isVideo, n.stream.isScreen = r.isScreen) : (n.stream.isVideo = !!v(n.stream, "video").length, n.stream.isAudio = !n.stream.isVideo, n.stream.isScreen = !1), n.stream.streamid = n.stream.id, i[n.stream.id] = n.stream, e.onRemoteStream(n.stream), n.stream.getTracks().forEach(function (e) {
                    e.onended = function () {
                        o && o.onremovestream(n)
                    }
                }), n.stream.onremovetrack = function () {
                    o && o.onremovestream(n)
                }
            }
        }, o.onremovestream = function (n) {
            n.stream.streamid = n.stream.id, i[n.stream.id] && delete i[n.stream.id], e.onRemoteStreamRemoved(n.stream)
        }, "function" != typeof o.removeStream && (o.removeStream = function (e) {
            e.getTracks().forEach(function (n) {
                o.removeTrack(n, e)
            })
        });
        var u = !0;
        this.addRemoteCandidate = function (e) {
            o.addIceCandidate(new b(e)), isEdge && u && (u = !1, setTimeout(function () {
                o.addIceCandidate(null)
            }, 3e3))
        }, this.addRemoteSdp = function (e, t) {
            t = t || function () {
            }, "Safari" !== DetectRTC.browser.name && (e.sdp = n.processSdp(e.sdp)), o.setRemoteDescription(new y(e)).then(t, function (n) {
                console.error("setRemoteDescription failed", "\n", n, "\n", e.sdp), t()
            }).catch(function (n) {
                console.error("setRemoteDescription failed", "\n", n, "\n", e.sdp), t()
            })
        };
        var m = !0;

        function f(n) {
            n.binaryType = "arraybuffer", n.onmessage = function (n) {
                e.onDataChannelMessage(n.data)
            }, n.onopen = function () {
                e.onDataChannelOpened(n)
            }, n.onerror = function (n) {
                e.onDataChannelError(n)
            }, n.onclose = function (n) {
                e.onDataChannelClosed(n)
            }, n.internalSend = n.send, n.send = function (e) {
                "open" === n.readyState && n.internalSend(e)
            }, o.channel = n
        }

        e.remoteSdp && (m = !1), this.createDataChannel = function () {
            f(o.createDataChannel("sctp", {}))
        }, !0 !== n.session.data || r || (m ? this.createDataChannel() : o.ondatachannel = function (e) {
            f(e.channel)
        }), this.enableDisableVideoEncoding = function (e) {
            var n;
            if (o.getSenders().forEach(function (e) {
                n || "video" !== e.track.kind || (n = e)
            }), n && n.getParameters) {
                var t = n.getParameters();
                t.encodings[1] && (t.encodings[1].active = !!e), t.encodings[2] && (t.encodings[2].active = !!e), n.setParameters(t)
            }
        }, e.remoteSdp && (e.remoteSdp.remotePeerSdpConstraints && (c = e.remoteSdp.remotePeerSdpConstraints), C.sdpConstraints = w(c), this.addRemoteSdp(e.remoteSdp, function () {
            h("createAnswer")
        })), "two-way" != n.session.audio && "two-way" != n.session.video && "two-way" != n.session.screen || (C.sdpConstraints = w({
            OfferToReceiveAudio: "two-way" == n.session.audio || e.remoteSdp && e.remoteSdp.remotePeerSdpConstraints && e.remoteSdp.remotePeerSdpConstraints.OfferToReceiveAudio,
            OfferToReceiveVideo: "two-way" == n.session.video || "two-way" == n.session.screen || e.remoteSdp && e.remoteSdp.remotePeerSdpConstraints && e.remoteSdp.remotePeerSdpConstraints.OfferToReceiveAudio
        }));
        var p = {};

        function h(i) {
            o[i](C.sdpConstraints).then(function (i) {
                "Safari" !== DetectRTC.browser.name && (i.sdp = n.processSdp(i.sdp)), o.setLocalDescription(i).then(function () {
                    n.trickleIce && (e.onLocalSdp({
                        type: i.type,
                        sdp: i.sdp,
                        remotePeerSdpConstraints: e.remotePeerSdpConstraints || !1,
                        renegotiatingPeer: !!e.renegotiatingPeer || !1,
                        connectionDescription: t.connectionDescription,
                        dontGetRemoteStream: !!e.dontGetRemoteStream,
                        extra: n ? n.extra : {},
                        streamsToShare: p
                    }), n.onSettingLocalDescription(t))
                }, function (e) {
                    console.error("setLocalDescription error", e)
                })
            }, function (e) {
                console.error("sdp-error", e)
            })
        }

        o.getLocalStreams().forEach(function (e) {
            p[e.streamid] = {isAudio: !!e.isAudio, isVideo: !!e.isVideo, isScreen: !!e.isScreen}
        }), m && h("createOffer"), o.nativeClose = o.close, o.close = function () {
            if (o) {
                try {
                    o.nativeClose !== o.close && o.nativeClose()
                } catch (e) {
                }
                o = null, t.peer = null
            }
        }, this.peer = o
    }

    var k = function () {
        function e(e, o) {
            var i = t(e);
            return i.videoCodecNumbers ? "vp8" === o && i.vp8LineNumber === i.videoCodecNumbers[0] ? e : "vp9" === o && i.vp9LineNumber === i.videoCodecNumbers[0] ? e : "h264" === o && i.h264LineNumber === i.videoCodecNumbers[0] ? e : e = n(e, o, i) : e
        }

        function n(e, n, t, o) {
            var i = "";
            if ("vp8" === n) {
                if (!t.vp8LineNumber) return e;
                i = t.vp8LineNumber
            }
            if ("vp9" === n) {
                if (!t.vp9LineNumber) return e;
                i = t.vp9LineNumber
            }
            if ("h264" === n) {
                if (!t.h264LineNumber) return e;
                i = t.h264LineNumber
            }
            var r = t.videoCodecNumbersOriginal.split("SAVPF")[0] + "SAVPF ", a = [i];
            return o && (a = []), t.videoCodecNumbers.forEach(function (e) {
                e !== i && a.push(e)
            }), r += a.join(" "), e = e.replace(t.videoCodecNumbersOriginal, r)
        }

        function t(e) {
            var n = {};
            return e.split("\n").forEach(function (e) {
                0 === e.indexOf("m=video") && (n.videoCodecNumbers = [], e.split("SAVPF")[1].split(" ").forEach(function (t) {
                    (t = t.trim()) && t.length && (n.videoCodecNumbers.push(t), n.videoCodecNumbersOriginal = e)
                })), -1 === e.indexOf("VP8/90000") || n.vp8LineNumber || (n.vp8LineNumber = e.replace("a=rtpmap:", "").split(" ")[0]), -1 === e.indexOf("VP9/90000") || n.vp9LineNumber || (n.vp9LineNumber = e.replace("a=rtpmap:", "").split(" ")[0]), -1 === e.indexOf("H264/90000") || n.h264LineNumber || (n.h264LineNumber = e.replace("a=rtpmap:", "").split(" ")[0])
            }), n
        }

        function o(e, n, t) {
            return function (e, n, t, o, i) {
                for (var r = -1 !== t ? t : e.length, a = n; a < r; ++a) if (0 === e[a].indexOf(o) && (!i || -1 !== e[a].toLowerCase().indexOf(i.toLowerCase()))) return a;
                return null
            }(e, 0, -1, n, t)
        }

        function i(e) {
            var n = new RegExp("a=rtpmap:(\\d+) \\w+\\/\\d+"), t = e.match(n);
            return t && 2 === t.length ? t[1] : null
        }

        return {
            removeVPX: function (e) {
                var o = t(e);
                return e = n(e, "vp9", o, !0), e = n(e, "vp8", o, !0)
            }, disableNACK: function (e) {
                if (!e || "string" != typeof e) throw"Invalid arguments.";
                return e = (e = (e = (e = e.replace("a=rtcp-fb:126 nack\r\n", "")).replace("a=rtcp-fb:126 nack pli\r\n", "a=rtcp-fb:126 pli\r\n")).replace("a=rtcp-fb:97 nack\r\n", "")).replace("a=rtcp-fb:97 nack pli\r\n", "a=rtcp-fb:97 pli\r\n")
            }, prioritize: function (e, n) {
                if (n && n.getSenders && n.getSenders().length) {
                    if (!e || "string" != typeof e) throw"Invalid arguments.";
                    n.getSenders().forEach(function (n) {
                        for (var t = n.getParameters(), o = 0; o < t.codecs.length; o++) if (t.codecs[o].mimeType == e) {
                            t.codecs.unshift(t.codecs.splice(o, 1));
                            break
                        }
                        n.setParameters(t)
                    })
                }
            }, removeNonG722: function (e) {
                return e.replace(/m=audio ([0-9]+) RTP\/SAVPF ([0-9 ]*)/g, "m=audio $1 RTP/SAVPF 9")
            }, setApplicationSpecificBandwidth: function (e, n, t) {
                return function (e, n, t) {
                    return n ? void 0 !== isFirefox && isFirefox ? e : (t && (n.screen ? n.screen < 300 && console.warn("It seems that you are using wrong bandwidth value for screen. Screen sharing is expected to fail.") : console.warn("It seems that you are not using bandwidth for screen. Screen sharing is expected to fail.")), n.screen && t && (e = (e = e.replace(/b=AS([^\r\n]+\r\n)/g, "")).replace(/a=mid:video\r\n/g, "a=mid:video\r\nb=AS:" + n.screen + "\r\n")), (n.audio || n.video) && (e = e.replace(/b=AS([^\r\n]+\r\n)/g, "")), n.audio && (e = e.replace(/a=mid:audio\r\n/g, "a=mid:audio\r\nb=AS:" + n.audio + "\r\n")), n.screen ? e = e.replace(/a=mid:video\r\n/g, "a=mid:video\r\nb=AS:" + n.screen + "\r\n") : n.video && (e = e.replace(/a=mid:video\r\n/g, "a=mid:video\r\nb=AS:" + n.video + "\r\n")), e) : e
                }(e, n, t)
            }, setVideoBitrates: function (e, n) {
                return function (e, n) {
                    var t, r = (n = n || {}).min, a = n.max, s = e.split("\r\n"), d = o(s, "a=rtpmap", "VP8/90000");
                    if (d && (t = i(s[d])), !t) return e;
                    var c, l = o(s, "a=rtpmap", "rtx/90000");
                    if (l && (c = i(s[l])), !l) return e;
                    var u = o(s, "a=fmtp:" + c.toString());
                    if (null !== u) {
                        var m = "\r\n";
                        m += "a=fmtp:" + t + " x-google-min-bitrate=" + (r || "228") + "; x-google-max-bitrate=" + (a || "228"), s[u] = s[u].concat(m), e = s.join("\r\n")
                    }
                    return e
                }(e, n)
            }, setOpusAttributes: function (e, n) {
                return function (e, n) {
                    n = n || {};
                    var t, r = e.split("\r\n"), a = o(r, "a=rtpmap", "opus/48000");
                    if (a && (t = i(r[a])), !t) return e;
                    var s = o(r, "a=fmtp:" + t.toString());
                    if (null === s) return e;
                    var d = "";
                    return d += "; stereo=" + (void 0 !== n.stereo ? n.stereo : "1"), d += "; sprop-stereo=" + (void 0 !== n["sprop-stereo"] ? n["sprop-stereo"] : "1"), void 0 !== n.maxaveragebitrate && (d += "; maxaveragebitrate=" + (n.maxaveragebitrate || 1048576)), void 0 !== n.maxplaybackrate && (d += "; maxplaybackrate=" + (n.maxplaybackrate || 1048576)), void 0 !== n.cbr && (d += "; cbr=" + (void 0 !== n.cbr ? n.cbr : "1")), void 0 !== n.useinbandfec && (d += "; useinbandfec=" + n.useinbandfec), void 0 !== n.usedtx && (d += "; usedtx=" + n.usedtx), void 0 !== n.maxptime && (d += "\r\na=maxptime:" + n.maxptime), r[s] = r[s].concat(d), e = r.join("\r\n")
                }(e, n)
            }, preferVP9: function (n) {
                return e(n, "vp9")
            }, preferCodec: e, forceStereoAudio: function (e) {
                for (var n = e.split("\r\n"), t = null, o = 0; o < n.length; o++) if (-1 !== n[o].search("opus/48000")) {
                    var i = extractSdp(n[o], /:(\d+) opus\/48000/i);
                    break
                }
                for (o = 0; o < n.length; o++) {
                    if (-1 !== n[o].search("a=fmtp")) if (extractSdp(n[o], /a=fmtp:(\d+)/) === i) {
                        t = o;
                        break
                    }
                }
                return null === t ? e : (n[t] = n[t].concat("; stereo=1; sprop-stereo=1"), e = n.join("\r\n"))
            }
        }
    }();
    window.BandwidthHandler = k;
    var E = {
        processCandidates: function (e, n) {
            var t = n.candidate, o = e.candidates, i = o.stun, r = o.turn;
            if (m(o.reflexive) || (i = o.reflexive), m(o.relay) || (r = o.relay), (o.host || !t.match(/typ host/g)) && (r || !t.match(/typ relay/g)) && (i || !t.match(/typ srflx/g))) {
                var a = e.iceProtocols;
                if ((a.udp || !t.match(/ udp /g)) && (a.tcp || !t.match(/ tcp /g))) return e.enableLogs && console.debug("Your candidate pairs:", t), {
                    candidate: t,
                    sdpMid: n.sdpMid,
                    sdpMLineIndex: n.sdpMLineIndex
                }
            }
        }
    }, A = {
        getIceServers: function (e) {
            var n = {
                stringify: function (e) {
                    var n = {ct: e.ciphertext.toString(CryptoJS.enc.Base64)};
                    return e.iv && (n.iv = e.iv.toString()), e.salt && (n.s = e.salt.toString()), JSON.stringify(n)
                }, parse: function (e) {
                    var n = JSON.parse(e),
                        t = CryptoJS.lib.CipherParams.create({ciphertext: CryptoJS.enc.Base64.parse(n.ct)});
                    return n.iv && (t.iv = CryptoJS.enc.Hex.parse(n.iv)), n.s && (t.salt = CryptoJS.enc.Hex.parse(n.s)), t
                }
            };
            if (svConfigs.iceServers.requirePass) {
                for (var t = svConfigs.iceServers.iceServers, o = 0; o < t.length; o++) {
                    if (t[o].username) {
                        var i = '{"ct":"' + t[o].username + '","iv":"09644439296d0d45c81236b5643e9662","s":"3132333435363738"}',
                            r = JSON.parse(CryptoJS.AES.decrypt(i, svConfigs.iceServers.passPhrase, {format: n}).toString(CryptoJS.enc.Utf8));
                        t[o].username = r
                    }
                    if (t[o].credential) {
                        i = '{"ct":"' + t[o].credential + '","iv":"09644439296d0d45c81236b5643e9662","s":"3132333435363738"}';
                        var a = JSON.parse(CryptoJS.AES.decrypt(i, svConfigs.iceServers.passPhrase, {format: n}).toString(CryptoJS.enc.Utf8));
                        t[o].credential = a
                    }
                }
                svConfigs.iceServers.iceServers = t, svConfigs.iceServers.requirePass = !1
            }
            return svConfigs.iceServers.iceServers
        }
    };

    function R(e) {
        if (!0 !== currentUserMediaRequest.mutex) {
            currentUserMediaRequest.mutex = !0;
            var n = JSON.stringify(e.localMediaConstraints);
            if (currentUserMediaRequest.streams[n]) r(currentUserMediaRequest.streams[n].stream, !0); else {
                if (!!/BB10|BlackBerry/i.test(navigator.userAgent || "") || void 0 === navigator.mediaDevices || "function" != typeof navigator.mediaDevices.getUserMedia) return navigator.getUserMedia = navigator.getUserMedia || navigator.webkitGetUserMedia || navigator.mozGetUserMedia, void navigator.getUserMedia(e.localMediaConstraints, function (e) {
                    e.streamid = e.streamid || e.id || s(), e.idInstance = n, r(e)
                }, function (n) {
                    e.onLocalMediaError(n, e.localMediaConstraints)
                });
                if (void 0 === navigator.mediaDevices) {
                    navigator.getUserMedia = navigator.getUserMedia || navigator.webkitGetUserMedia || navigator.mozGetUserMedia;
                    var t, o, i = function () {
                    };
                    navigator.mediaDevices = {
                        getUserMedia: function (e) {
                            return navigator.getUserMedia(e, function (e) {
                                e(stream), t = stream
                            }, function (e) {
                                i(e), o = e
                            }), {
                                then: function (e) {
                                    if (!t) return e, {
                                        then: function (e) {
                                            o ? e(o) : i = e
                                        }
                                    };
                                    e(t)
                                }
                            }
                        }
                    }
                }
                if (!0 === e.localMediaConstraints.isScreen) {
                    if (navigator.mediaDevices.getDisplayMedia) navigator.mediaDevices.getDisplayMedia(e.localMediaConstraints).then(function (e) {
                        e.streamid = e.streamid || e.id || s(), e.idInstance = n, r(e)
                    }).catch(function (n) {
                        e.onLocalMediaError(n, e.localMediaConstraints)
                    }); else {
                        if (!navigator.getDisplayMedia) throw new Error("getDisplayMedia API is not availabe in this browser.");
                        navigator.getDisplayMedia(e.localMediaConstraints).then(function (e) {
                            e.streamid = e.streamid || e.id || s(), e.idInstance = n, r(e)
                        }).catch(function (n) {
                            e.onLocalMediaError(n, e.localMediaConstraints)
                        })
                    }
                    return
                }
                navigator.mediaDevices.getUserMedia(e.localMediaConstraints).then(function (e) {
                    e.streamid = e.streamid || e.id || s(), e.idInstance = n, r(e)
                }).catch(function (n) {
                    e.onLocalMediaError(n, e.localMediaConstraints)
                })
            }
        } else currentUserMediaRequest.queueRequests.push(e);

        function r(t, o) {
            !function (e, n) {
                e.mandatory && e.mandatory.chromeMediaSource ? n.isScreen = !0 : e.mozMediaSource || e.mediaSource ? n.isScreen = !0 : e.video ? n.isVideo = !0 : e.audio && (n.isAudio = !0)
            }(e.localMediaConstraints, t);
            var i = "ended";
            "oninactive" in t && (i = "inactive"), t.addEventListener(i, function () {
                delete currentUserMediaRequest.streams[n], currentUserMediaRequest.mutex = !1, currentUserMediaRequest.queueRequests.indexOf(e) && (delete currentUserMediaRequest.queueRequests[currentUserMediaRequest.queueRequests.indexOf(e)], currentUserMediaRequest.queueRequests = l(currentUserMediaRequest.queueRequests))
            }, !1), currentUserMediaRequest.streams[n] = {stream: t}, currentUserMediaRequest.mutex = !1, currentUserMediaRequest.queueRequests.length && R(currentUserMediaRequest.queueRequests.shift()), e.onGettingLocalMedia(t, o)
        }
    }

    window.currentUserMediaRequest = {
        streams: [], mutex: !1, queueRequests: [], remove: function (e) {
            this.mutex = !1;
            var n = this.streams[e];
            if (n) {
                var t = (n = n.stream).currentUserMediaRequestOptions;
                this.queueRequests.indexOf(t) && (delete this.queueRequests[this.queueRequests.indexOf(t)], this.queueRequests = l(this.queueRequests)), this.streams[e].stream = null, delete this.streams[e]
            }
        }
    };
    var T = function () {
        function e(e) {
            if (e) return "string" == typeof e || void 0 === e ? e : e.audio && e.video ? null : e.audio ? "audio" : e.video ? "video" : void 0
        }

        return {
            setHandlers: function (n, t, o) {
                if (n && n.addEventListener) {
                    if (void 0 === t || 1 == t) {
                        var i = "ended";
                        "oninactive" in n && (i = "inactive"), n.addEventListener(i, function () {
                            T.onSyncNeeded(this.streamid, i)
                        }, !1)
                    }
                    n.mute = function (i, a) {
                        i = e(i), void 0 !== a && (t = a), void 0 !== i && "audio" != i || v(n, "audio").forEach(function (e) {
                            e.enabled = !1, o.streamEvents[n.streamid].isAudioMuted = !0
                        }), void 0 !== i && "video" != i || v(n, "video").forEach(function (e) {
                            e.enabled = !1
                        }), void 0 !== t && 1 != t || T.onSyncNeeded(n.streamid, "mute", i), o.streamEvents[n.streamid].muteType = i || "both", r(n, "mute", i)
                    }, n.unmute = function (i, a) {
                        i = e(i), void 0 !== a && (t = a), function () {
                            if (!o.streamEvents[n.streamid].mediaElement) return;
                            var e = o.streamEvents[n.streamid].mediaElement;
                            e.volume = 0, function e(n, t, o, i) {
                                i = (i || 0) + 1;
                                if (i >= t) return;
                                setTimeout(function () {
                                    o(), e(n, t, o, i)
                                }, n)
                            }(200, 5, function () {
                                try {
                                    e.volume += .2
                                } catch (n) {
                                    e.volume = 1
                                }
                            })
                        }(), void 0 !== i && "audio" != i || v(n, "audio").forEach(function (e) {
                            e.enabled = !0, o.streamEvents[n.streamid].isAudioMuted = !1
                        }), void 0 !== i && "video" != i || (v(n, "video").forEach(function (e) {
                            e.enabled = !0
                        }), void 0 !== i && "video" == i && o.streamEvents[n.streamid].isAudioMuted && function e(t) {
                            t || (t = 0), ++t < 100 && o.streamEvents[n.streamid].isAudioMuted && (n.mute("audio"), setTimeout(function () {
                                e(t)
                            }, 50))
                        }()), void 0 !== t && 1 != t || T.onSyncNeeded(n.streamid, "unmute", i), o.streamEvents[n.streamid].unmuteType = i || "both", r(n, "unmute", i)
                    }
                }
            }, onSyncNeeded: function (e, n, t) {
            }
        }
    }();

    function x(e) {
        var n = {};
        return {
            receive: function (t, o, i) {
                var r = t.uuid;
                if (n[r] || (n[r] = []), n[r].push(t.message), t.last) {
                    var a = n[r].join("");
                    t.isobject && (a = JSON.parse(a));
                    var s = {data: a, userid: o, extra: i, latency: (new Date).getTime() - t.sendingTime};
                    e.autoTranslateText ? (s.original = s.data, e.Translator.TranslateText(s.data, function (n) {
                        s.data = n, e.onmessage(s)
                    })) : e.onmessage(s), delete n[r]
                }
            }
        }
    }

    var M = {
        send: function (e) {
            var n = e.connection, t = e.channel, o = e.remoteUserId, i = e.text, r = n.chunkSize || 1e3, a = "", d = !1;
            "string" != typeof i && (d = !0, i = JSON.stringify(i));
            var c = s(), l = (new Date).getTime();
            !function e(i, s) {
                var u = {type: "text", uuid: c, sendingTime: l};
                i && (s = i, u.packets = parseInt(s.length / r));
                s.length > r ? u.message = s.slice(0, r) : (u.message = s, u.last = !0, u.isobject = d);
                t.send(u, o);
                a = s.slice(u.message.length);
                a.length && setTimeout(function () {
                    e(null, a)
                }, n.chunkInterval || 100)
            }(i)
        }
    }, P = {
        handle: function (e) {
            var n = {};
            e.onFileStart = function (t) {
                var o = document.createElement("div");
                if (o.title = t.name, o.innerHTML = "<label>0%</label> <progress></progress>", t.remoteUserId && (o.innerHTML += " (Sharing with:" + t.remoteUserId + ")"), e.filesContainer || (e.filesContainer = document.body || document.documentElement), e.filesContainer.insertBefore(o, e.filesContainer.firstChild), !t.remoteUserId) return n[t.uuid] = {
                    div: o,
                    progress: o.querySelector("progress"),
                    label: o.querySelector("label")
                }, void (n[t.uuid].progress.max = t.maxChunks);
                n[t.uuid] || (n[t.uuid] = {}), n[t.uuid][t.remoteUserId] = {
                    div: o,
                    progress: o.querySelector("progress"),
                    label: o.querySelector("label")
                }, n[t.uuid][t.remoteUserId].progress.max = t.maxChunks
            }, e.onFileProgress = function (e) {
                var t = n[e.uuid];
                t && (e.remoteUserId && !(t = n[e.uuid][e.remoteUserId]) || (t.progress.value = e.currentPosition || e.maxChunks || t.progress.max, function (e, n) {
                    if (-1 !== e.position) {
                        var t = +e.position.toFixed(2).split(".")[1] || 100;
                        n.innerHTML = t + "%"
                    }
                }(t.progress, t.label)))
            }, e.onFileEnd = function (e) {
                var t = n[e.uuid];
                if (t) {
                    if (!e.remoteUserId || (t = n[e.uuid][e.remoteUserId])) {
                        var o = t.div;
                        -1 != e.type.indexOf("image") ? o.innerHTML = '<a href="' + e.url + '" download="' + e.name + '">Download <strong style="color:red;">' + e.name + '</strong> </a><br /><img src="' + e.url + '" title="' + e.name + '" style="max-width: 80%;">' : o.innerHTML = '<a href="' + e.url + '" download="' + e.name + '">Download <strong style="color:red;">' + e.name + '</strong> </a><br /><iframe src="' + e.url + '" title="' + e.name + '" style="width: 80%;border: 0;height: inherit;margin-top:1em;"></iframe>'
                    }
                } else console.error("No such progress-helper element exist.", e)
            }
        }
    }, O = {
        handle: function (e) {
            e.autoTranslateText = !1, e.language = "en", e.googKey = "AIzaSyCgB5hmFY74WYB-EoWkhr9cAGr6TiTHrEE", e.Translator = {
                TranslateText: function (n, t) {
                    var o = document.createElement("script");
                    o.type = "text/javascript";
                    var i = encodeURIComponent(n), r = "method" + e.token();
                    window[r] = function (e) {
                        e.data && e.data.translations[0] && t ? t(e.data.translations[0].translatedText) : e.error && "Daily Limit Exceeded" === e.error.message ? console.error('Text translation failed. Error message: "Daily Limit Exceeded."') : e.error ? console.error(e.error.message) : console.error(e)
                    };
                    var a = "https://www.googleapis.com/language/translate/v2?key=" + e.googKey + "&target=" + (e.language || "en-US") + "&callback=window." + r + "&q=" + i;
                    o.src = a, document.getElementsByTagName("head")[0].appendChild(o)
                }, getListOfLanguages: function (n) {
                    var t = new XMLHttpRequest;
                    t.onreadystatechange = function () {
                        if (t.readyState == XMLHttpRequest.DONE) {
                            var e = JSON.parse(t.responseText);
                            if (e && e.data && e.data.languages) return void n(e.data.languages);
                            if (e.error && "Daily Limit Exceeded" === e.error.message) return void console.error('Text translation failed. Error message: "Daily Limit Exceeded."');
                            if (e.error) return void console.error(e.error.message);
                            console.error(e)
                        }
                    };
                    var o = "https://www.googleapis.com/language/translate/v2/languages?key=" + e.googKey + "&target=en";
                    t.open("GET", o, !0), t.send(null)
                }
            }
        }
    };
    !function (t) {
        n = n || {useDefaultDevices: !0}, t.channel = t.sessionid = (e || location.href.replace(/\/|:|#|\?|\$|\^|%|\.|`|~|!|\+|@|\[|\||]|\|*. /g, "").split("\n").join("").split("\r").join("")) + "";
        var r = new i(t), l = {};

        function m(e) {
            if (t.socketAutoReConnect = !0, t.socket) e && e(t.socket); else {
                if (void 0 === o) if ("undefined" != typeof FirebaseConnection) window.SocketConnection = FirebaseConnection; else {
                    if ("undefined" == typeof PubNubConnection) throw"SocketConnection.js seems missed.";
                    window.SocketConnection = PubNubConnection
                }
                new o(t, function (n) {
                    e && e(t.socket)
                })
            }
        }

        function h(e, n) {
            t.socket.emit("join-room", {
                sessionid: t.sessionid,
                session: t.session,
                mediaConstraints: t.mediaConstraints,
                sdpConstraints: t.sdpConstraints,
                streams: w(),
                extra: t.extra,
                password: void 0 !== t.password && "object" != typeof t.password ? t.password : ""
            }, function (o, i) {
                if (!0 === o) {
                    if (t.enableLogs && console.log("isRoomJoined: ", o, " roomid: ", t.sessionid), t.peers[t.sessionid]) return;
                    r.onNegotiationNeeded(e)
                }
                !1 === o && t.enableLogs && console.warn("isRoomJoined: ", i, " roomid: ", t.sessionid), n(o, t.sessionid, i)
            })
        }

        function C(e) {
            t.enableLogs && console.log("Sending open-room signal to socket.io"), t.waitingForLocalMedia = !1, t.socket.emit("open-room", {
                sessionid: t.sessionid,
                session: t.session,
                mediaConstraints: t.mediaConstraints,
                sdpConstraints: t.sdpConstraints,
                streams: w(),
                extra: t.extra,
                identifier: t.publicRoomIdentifier,
                password: void 0 !== t.password && "object" != typeof t.password ? t.password : ""
            }, function (n, o) {
                !0 === n && (t.enableLogs && console.log("isRoomOpened: ", n, " roomid: ", t.sessionid), e(n, t.sessionid)), !1 === n && (t.enableLogs && console.warn("isRoomOpened: ", o, " roomid: ", t.sessionid), e(n, t.sessionid, o))
            })
        }

        function w() {
            try {
                return t.streamEvents.selectAll("local").map(function (e) {
                    return {streamid: e.streamid, tracks: e.stream.getTracks().length}
                })
            } catch (e) {
                return []
            }
        }

        function y(e, n) {
            if (t.dontCaptureUserMedia || e.isDataOnly) n(); else {
                var o = {};
                e.localPeerSdpConstraints.OfferToReceiveAudio && (o.audio = t.mediaConstraints.audio), e.localPeerSdpConstraints.OfferToReceiveVideo && (o.video = t.mediaConstraints.video);
                var i = e.session || t.session;
                i.oneway && "two-way" !== i.audio && "two-way" !== i.video && "two-way" !== i.screen ? n() : (i.oneway && i.audio && "two-way" === i.audio && (i = {audio: !0}), (i.audio || i.video || i.screen) && (i.screen ? "Edge" === DetectRTC.browser.name ? navigator.getDisplayMedia({
                    video: !0,
                    audio: f(t)
                }).then(function (e) {
                    e.isScreen = !0, r.onGettingLocalMedia(e), !i.audio && !i.video || f(t) ? n(e) : t.invokeGetUserMedia(null, n)
                }, function (e) {
                    console.error("Unable to capture screen on Edge. HTTPs and version 17+ is required.")
                }) : t.invokeGetUserMedia({
                    audio: f(t),
                    video: !0,
                    isScreen: !0
                }, !i.audio && !i.video || f(t) ? n : t.invokeGetUserMedia(null, n)) : (i.audio || i.video) && t.invokeGetUserMedia(null, n, i)))
            }
        }

        function b(e, n) {
            e ? (n.audio && v(e, "audio").forEach(function (e) {
                e.applyConstraints(n.audio)
            }), n.video && v(e, "video").forEach(function (e) {
                e.applyConstraints(n.video)
            })) : t.enableLogs && console.error("No stream to applyConstraints.")
        }

        function I(e, n, o) {
            n ? r.replaceTrack(e, n, o) : t.peers.getAllParticipants().forEach(function (n) {
                r.replaceTrack(e, n, o)
            })
        }

        r.onGettingLocalMedia = function (e, n) {
            if (n = n || function () {
            }, l[e.streamid]) n(); else {
                l[e.streamid] = !0;
                try {
                    e.type = "local"
                } catch (e) {
                }
                t.setStreamEndHandler(e), d(e, function (o) {
                    o.id = e.streamid, o.muted = !0, o.volume = 0, -1 === t.attachStreams.indexOf(e) && t.attachStreams.push(e), void 0 !== T && T.setHandlers(e, !0, t), t.streamEvents[e.streamid] = {
                        stream: e,
                        type: "local",
                        mediaElement: o,
                        userid: t.userid,
                        extra: t.extra,
                        streamid: e.streamid,
                        isAudioMuted: !0
                    };
                    try {
                        !function (e, n) {
                            if (n.stream && v(n.stream, "audio").length) {
                                if (!e || !n) throw"Both arguments are required.";
                                if (e.onspeaking && e.onsilence) {
                                    if (void 0 === hark) throw"hark.js not found.";
                                    hark(n.stream, {
                                        onspeaking: function () {
                                            e.onspeaking(n)
                                        }, onsilence: function () {
                                            e.onsilence(n)
                                        }, onvolumechange: function (t, o) {
                                            e.onvolumechange && e.onvolumechange(merge({volume: t, threshold: o}, n))
                                        }
                                    })
                                }
                            }
                        }(t, t.streamEvents[e.streamid]), a(t, t.streamEvents[e.streamid]), t.onstream(t.streamEvents[e.streamid])
                    } catch (e) {
                    }
                    n()
                }, t)
            }
        }, r.onGettingRemoteMedia = function (e, n) {
            try {
                e.type = "remote"
            } catch (e) {
            }
            t.setStreamEndHandler(e, "remote-stream"), d(e, function (o) {
                o.id = e.streamid, void 0 !== T && T.setHandlers(e, !1, t), t.streamEvents[e.streamid] = {
                    stream: e,
                    type: "remote",
                    userid: n,
                    extra: t.peers[n] ? t.peers[n].extra : {},
                    mediaElement: o,
                    streamid: e.streamid
                }, a(t, t.streamEvents[e.streamid]), t.onstream(t.streamEvents[e.streamid])
            }, t)
        }, r.onRemovingRemoteMedia = function (e, n) {
            var o = t.streamEvents[e.streamid];
            o || (o = {
                stream: e,
                type: "remote",
                userid: n,
                extra: t.peers[n] ? t.peers[n].extra : {},
                streamid: e.streamid,
                mediaElement: t.streamEvents[e.streamid] ? t.streamEvents[e.streamid].mediaElement : null
            }), t.peersBackup[o.userid] && (o.extra = t.peersBackup[o.userid].extra), t.onstreamended(o), delete t.streamEvents[e.streamid]
        }, r.onNegotiationNeeded = function (e, n, o) {
            o = o || function () {
            };
            var i = {remoteUserId: n = n || e.remoteUserId, message: e = e || "", sender: t.userid};
            e.remoteUserId && e.message && e.sender && (i = e), m(function () {
                t.socket.emit(t.socketMessageEvent, i, o)
            })
        }, r.onUserLeft = function (e) {
            t.deletePeer(e)
        }, r.disconnectWith = function (e, n) {
            t.socket && t.socket.emit("disconnect-with", e, n || function () {
            }), t.deletePeer(e)
        }, t.socketOptions = {transport: "polling"}, t.openOrJoin = function (e, n) {
            n = n || function () {
            }, t.checkPresence(e, function (e, o) {
                if (e) {
                    t.sessionid = o;
                    var i, r, a = !!t.session.oneway, s = u(t.session);
                    r = {
                        OfferToReceiveAudio: t.sdpConstraints.mandatory.OfferToReceiveAudio,
                        OfferToReceiveVideo: t.sdpConstraints.mandatory.OfferToReceiveVideo
                    }, i = {
                        OfferToReceiveAudio: a ? !!t.session.audio : t.sdpConstraints.mandatory.OfferToReceiveAudio,
                        OfferToReceiveVideo: a ? !!t.session.video || !!t.session.screen : t.sdpConstraints.mandatory.OfferToReceiveVideo
                    };
                    var d = {
                        remoteUserId: t.sessionid,
                        message: {
                            newParticipationRequest: !0,
                            isOneWay: a,
                            isDataOnly: s,
                            localPeerSdpConstraints: i,
                            remotePeerSdpConstraints: r
                        },
                        sender: t.userid
                    };
                    y(d.message, function () {
                        h(d, n)
                    })
                } else t.waitingForLocalMedia = !0, t.isInitiator = !0, t.sessionid = o || t.sessionid, u(t.session) ? C(n) : t.captureUserMedia(function () {
                    C(n)
                })
            })
        }, t.waitingForLocalMedia = !1, t.open = function (e, n) {
            n = n || function () {
            }, t.waitingForLocalMedia = !0, t.isInitiator = !0, t.sessionid = e || t.sessionid, m(function () {
                u(t.session) ? C(n) : t.captureUserMedia(function () {
                    C(n)
                })
            })
        }, t.peersBackup = {}, t.deletePeer = function (e) {
            if (e && t.peers[e]) {
                var n = {userid: e, extra: t.peers[e] ? t.peers[e].extra : {}};
                if (t.peersBackup[n.userid] && (n.extra = t.peersBackup[n.userid].extra), t.onleave(n), t.peers[e]) {
                    t.peers[e].streams.forEach(function (e) {
                        e.stop()
                    });
                    var o = t.peers[e].peer;
                    if (o && "closed" !== o.iceConnectionState) try {
                        o.close()
                    } catch (e) {
                    }
                    t.peers[e] && (t.peers[e].peer = null, delete t.peers[e])
                }
            }
        }, t.rejoin = function (e) {
            if (!t.isInitiator && e && Object.keys(e).length) {
                var n = {};
                t.peers[e.remoteUserId] && (n = t.peers[e.remoteUserId].extra, t.deletePeer(e.remoteUserId)), e && e.remoteUserId && (t.join(e.remoteUserId), t.onReConnecting({
                    userid: e.remoteUserId,
                    extra: n
                }))
            }
        }, t.join = function (e, n) {
            t.sessionid = !!e && (e.sessionid || e.remoteUserId || e) || t.sessionid, t.sessionid += "";
            var o = !1, i = !1, r = !1, a = !1;
            if (e && e.session || !e || "string" == typeof e) {
                var s = e && e.session || t.session;
                r = !!s.oneway, a = u(s), i = {
                    OfferToReceiveAudio: t.sdpConstraints.mandatory.OfferToReceiveAudio,
                    OfferToReceiveVideo: t.sdpConstraints.mandatory.OfferToReceiveVideo
                }, o = {
                    OfferToReceiveAudio: r ? !!t.session.audio : t.sdpConstraints.mandatory.OfferToReceiveAudio,
                    OfferToReceiveVideo: r ? !!t.session.video || !!t.session.screen : t.sdpConstraints.mandatory.OfferToReceiveVideo
                }
            }
            var d = function () {
            };
            "function" == typeof (n = n || {}) && (d = n, n = {}), void 0 !== n.localPeerSdpConstraints && (o = n.localPeerSdpConstraints), void 0 !== n.remotePeerSdpConstraints && (i = n.remotePeerSdpConstraints), void 0 !== n.isOneWay && (r = n.isOneWay), void 0 !== n.isDataOnly && (a = n.isDataOnly);
            var c = {
                remoteUserId: t.sessionid,
                message: {
                    newParticipationRequest: !0,
                    isOneWay: r,
                    isDataOnly: a,
                    localPeerSdpConstraints: o,
                    remotePeerSdpConstraints: i
                },
                sender: t.userid
            };
            return y(c.message, function () {
                m(function () {
                    h(c, d)
                })
            }), c
        }, t.publicRoomIdentifier = "", t.getUserMedia = t.captureUserMedia = function (e, n) {
            e = e || function () {
            };
            var o = n || t.session;
            t.dontCaptureUserMedia || u(o) ? e() : (o.audio || o.video || o.screen) && (o.screen ? "Edge" === DetectRTC.browser.name ? navigator.getDisplayMedia({
                video: !0,
                audio: f(t)
            }).then(function (i) {
                if (i.isScreen = !0, r.onGettingLocalMedia(i), !o.audio && !o.video || f(t)) e(i); else {
                    var a = {};
                    for (var s in o) "screen" !== s && (a[s] = o[s]);
                    t.invokeGetUserMedia(n, e, a)
                }
            }, function (e) {
                console.error("Unable to capture screen on Edge. HTTPs and version 17+ is required.")
            }) : t.invokeGetUserMedia({audio: f(t), video: !0, isScreen: !0}, function (i) {
                if (!o.audio && !o.video || f(t)) e(i); else {
                    var r = {};
                    for (var a in o) "screen" !== a && (r[a] = o[a]);
                    t.invokeGetUserMedia(n, e, r)
                }
            }) : (o.audio || o.video) && t.invokeGetUserMedia(n, e, o))
        }, t.onbeforeunload = function (e, n) {
            t.closeBeforeUnload && (t.peers.getAllParticipants().forEach(function (e) {
                r.onNegotiationNeeded({userLeft: !0}, e), t.peers[e] && t.peers[e].peer && t.peers[e].peer.close(), delete t.peers[e]
            }), n || t.closeSocket(), t.isInitiator = !1)
        }, window.ignoreBeforeUnload ? t.closeBeforeUnload = !1 : (t.closeBeforeUnload = !0, window.addEventListener("beforeunload", t.onbeforeunload, !1)), t.userid = s(), t.changeUserId = function (e, n) {
            n = n || function () {
            }, t.userid = e || s(), t.socket.emit("changed-uuid", t.userid, n)
        }, t.extra = {}, t.attachStreams = [], t.session = {
            audio: !0,
            video: !0
        }, t.enableFileSharing = !1, t.bandwidth = {screen: !1, audio: !1, video: !1}, t.codecs = {
            audio: "opus",
            video: "VP9"
        }, t.processSdp = function (e) {
            return p() ? e : "Safari" === DetectRTC.browser.name ? e : ("VP8" === t.codecs.video.toUpperCase() && (e = k.preferCodec(e, "vp8")), "VP9" === t.codecs.video.toUpperCase() && (e = k.preferCodec(e, "vp9")), "H264" === t.codecs.video.toUpperCase() && (e = k.preferCodec(e, "h264")), "G722" === t.codecs.audio && (e = k.removeNonG722(e)), "Firefox" === DetectRTC.browser.name ? e : ((t.bandwidth.video || t.bandwidth.screen) && (e = k.setApplicationSpecificBandwidth(e, t.bandwidth, !!t.session.screen)), t.bandwidth.video && (e = k.setVideoBitrates(e, {
                min: 8 * t.bandwidth.video * 1024,
                max: 8 * t.bandwidth.video * 1024
            })), t.bandwidth.audio && (e = k.setOpusAttributes(e, {
                maxaveragebitrate: 8 * t.bandwidth.audio * 1024,
                maxplaybackrate: 8 * t.bandwidth.audio * 1024,
                stereo: 1,
                maxptime: 3
            })), e))
        }, void 0 !== k && (t.BandwidthHandler = t.CodecsHandler = k), t.mediaConstraints = {
            audio: {
                mandatory: {},
                optional: t.bandwidth.audio ? [{bandwidth: 8 * t.bandwidth.audio * 1024 || 1048576}] : []
            },
            video: {
                mandatory: {},
                optional: t.bandwidth.video ? [{bandwidth: 8 * t.bandwidth.video * 1024 || 1048576}, {facingMode: "user"}] : [{facingMode: "user"}]
            }
        }, "Firefox" === DetectRTC.browser.name && (t.mediaConstraints = {
            audio: !0,
            video: !0
        }), n.useDefaultDevices || DetectRTC.isMobileDevice || DetectRTC.load(function () {
            var e, n;
            if (DetectRTC.MediaDevices.forEach(function (o) {
                "audioinput" === o.kind && !1 !== t.mediaConstraints.audio && (e = o), "videoinput" === o.kind && !1 !== t.mediaConstraints.video && (n = o)
            }), e) {
                if ("Firefox" === DetectRTC.browser.name) return void (!0 !== t.mediaConstraints.audio ? t.mediaConstraints.audio.deviceId = e.id : t.mediaConstraints.audio = {deviceId: e.id});
                1 == t.mediaConstraints.audio && (t.mediaConstraints.audio = {
                    mandatory: {},
                    optional: []
                }), t.mediaConstraints.audio.optional || (t.mediaConstraints.audio.optional = []);
                var o = [{sourceId: e.id}];
                t.mediaConstraints.audio.optional = o.concat(t.mediaConstraints.audio.optional)
            }
            if (n) {
                if ("Firefox" === DetectRTC.browser.name) return void (!0 !== t.mediaConstraints.video ? t.mediaConstraints.video.deviceId = n.id : t.mediaConstraints.video = {deviceId: n.id});
                1 == t.mediaConstraints.video && (t.mediaConstraints.video = {
                    mandatory: {},
                    optional: []
                }), t.mediaConstraints.video.optional || (t.mediaConstraints.video.optional = []);
                o = [{sourceId: n.id}];
                t.mediaConstraints.video.optional = o.concat(t.mediaConstraints.video.optional)
            }
        }), t.sdpConstraints = {
            mandatory: {OfferToReceiveAudio: !0, OfferToReceiveVideo: !0},
            optional: [{VoiceActivityDetection: !1}]
        }, t.sdpSemantics = null, t.iceCandidatePoolSize = null, t.bundlePolicy = null, t.rtcpMuxPolicy = null, t.iceTransportPolicy = null, t.optionalArgument = {
            optional: [{DtlsSrtpKeyAgreement: !0}, {googImprovedWifiBwe: !0}, {googScreencastMinBitrate: 300}, {googIPv6: !0}, {googDscp: !0}, {googCpuUnderuseThreshold: 55}, {googCpuOveruseThreshold: 85}, {googSuspendBelowMinBitrate: !0}, {googCpuOveruseDetection: !0}],
            mandatory: {}
        }, t.iceServers = A.getIceServers(t), t.candidates = {host: !0, stun: !0, turn: !0}, t.iceProtocols = {
            tcp: !0,
            udp: !0
        }, t.onopen = function (e) {
            t.enableLogs && console.info("Data connection has been opened between you & ", e.userid)
        }, t.onclose = function (e) {
            t.enableLogs && console.warn("Data connection has been closed between you & ", e.userid)
        }, t.onerror = function (e) {
            t.enableLogs && console.error(e.userid, "data-error", e)
        }, t.onmessage = function (e) {
            t.enableLogs && console.debug("data-message", e.userid, e.data)
        }, t.send = function (e, n) {
            t.peers.send(e, n)
        }, t.close = t.disconnect = t.leave = function () {
            t.onbeforeunload(!1, !0)
        }, t.closeEntireSession = function (e) {
            e = e || function () {
            }, t.socket.emit("close-entire-session", function n() {
                t.getAllParticipants().length ? setTimeout(n, 100) : (t.onEntireSessionClosed({
                    sessionid: t.sessionid,
                    userid: t.userid,
                    extra: t.extra
                }), t.changeUserId(null, function () {
                    t.close(), e()
                }))
            })
        }, t.onEntireSessionClosed = function (e) {
            t.enableLogs && console.info("Entire session is closed: ", e.sessionid, e.extra)
        }, t.onstream = function (e) {
            var n = t.videosContainer;
            n.insertBefore(e.mediaElement, n.firstChild);
            var o = e.mediaElement.play();
            void 0 === o ? setTimeout(function () {
                e.mediaElement.play()
            }, 2e3) : o.catch(function () {
            }).then(function () {
                setTimeout(function () {
                    e.mediaElement.play()
                }, 2e3)
            })
        }, t.onstreamended = function (e) {
            e.mediaElement || (e.mediaElement = document.getElementById(e.streamid)), e.mediaElement && e.mediaElement.parentNode && e.mediaElement.parentNode.removeChild(e.mediaElement)
        }, t.direction = "many-to-many", t.removeStream = function (e, n) {
            var o;
            t.attachStreams.forEach(function (n) {
                n.id === e && (o = n)
            }), o ? (t.peers.getAllParticipants().forEach(function (e) {
                if (!n || e === n) {
                    var i = t.peers[e];
                    try {
                        i.peer.removeStream(o)
                    } catch (e) {
                    }
                }
            }), t.renegotiate()) : console.warn("No such stream exist.", e)
        }, t.addStream = function (e, n) {
            if (e.getTracks) return -1 === t.attachStreams.indexOf(e) && (e.streamid || (e.streamid = e.id), t.attachStreams.push(e)), void t.renegotiate(n);

            function o(o) {
                e.streamCallback && e.streamCallback(o), t.renegotiate(n)
            }

            u(e) ? t.renegotiate(n) : (e.audio || e.video || e.screen) && (e.screen ? "Edge" === DetectRTC.browser.name ? navigator.getDisplayMedia({
                video: !0,
                audio: f(t)
            }).then(function (n) {
                n.isScreen = !0, r.onGettingLocalMedia(n), !e.audio && !e.video || f(t) ? o(n) : t.invokeGetUserMedia(null, function (e) {
                    o(e)
                })
            }, function (e) {
                console.error("Unable to capture screen on Edge. HTTPs and version 17+ is required.")
            }) : t.invokeGetUserMedia({audio: f(t), video: !0, isScreen: !0}, function (n) {
                !e.audio && !e.video || f(t) ? o(n) : t.invokeGetUserMedia(null, function (e) {
                    o(e)
                })
            }) : (e.audio || e.video) && t.invokeGetUserMedia(null, o))
        }, t.invokeGetUserMedia = function (e, n, o) {
            o || (o = t.session), e || (e = t.mediaConstraints), R({
                onGettingLocalMedia: function (t) {
                    var o = e.video;
                    o && (o.mediaSource || o.mozMediaSource ? t.isScreen = !0 : o.mandatory && o.mandatory.chromeMediaSource && (t.isScreen = !0)), t.isScreen || (t.isVideo = !!v(t, "video").length, t.isAudio = !t.isVideo && v(t, "audio").length), r.onGettingLocalMedia(t, function () {
                        "function" == typeof n && n(t)
                    })
                }, onLocalMediaError: function (e, n) {
                    r.onLocalMediaError(e, n)
                }, localMediaConstraints: e || {audio: !!o.audio && e.audio, video: !!o.video && e.video}
            })
        }, t.applyConstraints = function (e, n) {
            if (_ && _.prototype.applyConstraints) {
                var o;
                if (n) return t.streamEvents[n] && (o = t.streamEvents[n].stream), void b(o, e);
                t.attachStreams.forEach(function (n) {
                    b(n, e)
                })
            } else alert("track.applyConstraints is NOT supported in your browser.")
        }, t.replaceTrack = function (e, n, o) {
            if (e = e || {}, S.prototype.getSenders) if (e instanceof _) I(e, n, o); else {
                if (e instanceof g) return v(e, "video").length && I(v(e, "video")[0], n, !0), void (v(e, "audio").length && I(v(e, "audio")[0], n, !1));
                if (u(e)) throw"connection.replaceTrack requires audio and/or video and/or screen.";
                (e.audio || e.video || e.screen) && (e.screen ? "Edge" === DetectRTC.browser.name ? navigator.getDisplayMedia({
                    video: !0,
                    audio: f(t)
                }).then(function (n) {
                    n.isScreen = !0, r.onGettingLocalMedia(n), !e.audio && !e.video || f(t) ? i(n) : t.invokeGetUserMedia(null, i)
                }, function (e) {
                    console.error("Unable to capture screen on Edge. HTTPs and version 17+ is required.")
                }) : t.invokeGetUserMedia({
                    audio: f(t),
                    video: !0,
                    isScreen: !0
                }, !e.audio && !e.video || f(t) ? i : t.invokeGetUserMedia(null, i)) : (e.audio || e.video) && t.invokeGetUserMedia(null, i))
            } else t.addStream(e);

            function i(i) {
                t.replaceTrack(i, n, o || e.video || e.screen)
            }
        }, t.resetTrack = function (e, n) {
            e || (e = t.getAllParticipants()), "string" == typeof e && (e = [e]), e.forEach(function (e) {
                var o = t.peers[e].peer;
                void 0 !== n && !0 !== n || !o.lastVideoTrack || t.replaceTrack(o.lastVideoTrack, e, !0), void 0 !== n && !1 !== n || !o.lastAudioTrack || t.replaceTrack(o.lastAudioTrack, e, !1)
            })
        }, t.renegotiate = function (e) {
            e ? r.renegotiatePeer(e) : t.peers.getAllParticipants().forEach(function (e) {
                r.renegotiatePeer(e)
            })
        }, t.setStreamEndHandler = function (e, n) {
            if (e && e.addEventListener && (n = !!n, !e.alreadySetEndHandler)) {
                e.alreadySetEndHandler = !0;
                var o = "ended";
                "oninactive" in e && (o = "inactive"), e.addEventListener(o, function () {
                    if (e.idInstance && currentUserMediaRequest.remove(e.idInstance), !n) {
                        var o = [];
                        t.attachStreams.forEach(function (n) {
                            n.id != e.id && o.push(n)
                        }), t.attachStreams = o
                    }
                    var i = t.streamEvents[e.streamid];
                    if (i || (i = {
                        stream: e,
                        streamid: e.streamid,
                        type: n ? "remote" : "local",
                        userid: t.userid,
                        extra: t.extra,
                        mediaElement: t.streamEvents[e.streamid] ? t.streamEvents[e.streamid].mediaElement : null
                    }), n && t.peers[i.userid]) {
                        var r = t.peers[i.userid].peer;
                        o = [];
                        r.getRemoteStreams().forEach(function (n) {
                            n.id != e.id && o.push(n)
                        }), t.peers[i.userid].streams = o
                    }
                    i.userid === t.userid && "remote" === i.type || (t.peersBackup[i.userid] && (i.extra = t.peersBackup[i.userid].extra), t.onstreamended(i), delete t.streamEvents[e.streamid])
                }, !1)
            }
        }, t.onMediaError = function (e, n) {
            t.enableLogs && console.error(e, n)
        }, t.autoCloseEntireSession = !1, t.filesContainer = t.videosContainer = document.body || document.documentElement, t.isInitiator = !1, t.shareFile = r.shareFile, void 0 !== P && P.handle(t), void 0 !== O && O.handle(t), t.token = s, t.onNewParticipant = function (e, n) {
            t.acceptParticipationRequest(e, n)
        }, t.acceptParticipationRequest = function (e, n) {
            n.successCallback && (n.successCallback(), delete n.successCallback), r.createNewPeer(e, n)
        }, void 0 !== T && (t.StreamsHandler = T), t.onleave = function (e) {
        }, t.invokeSelectFileDialog = function (e) {
            var n = new FileSelector;
            n.accept = "*.*", n.selectSingleFile(e)
        }, t.onmute = function (e) {
            if (e && e.mediaElement) if ("both" === e.muteType || "video" === e.muteType) {
                e.mediaElement.src = null;
                var n = e.mediaElement.pause();
                void 0 !== n ? n.then(function () {
                    e.mediaElement.poster = e.snapshot || "https://cdn.webrtc-experiment.com/images/muted.png"
                }) : e.mediaElement.poster = e.snapshot || "https://cdn.webrtc-experiment.com/images/muted.png"
            } else "audio" === e.muteType && (e.mediaElement.muted = !0)
        }, t.onunmute = function (e) {
            e && e.mediaElement && e.stream && ("both" === e.unmuteType || "video" === e.unmuteType ? (e.mediaElement.poster = null, e.mediaElement.srcObject = e.stream, e.mediaElement.play()) : "audio" === e.unmuteType && (e.mediaElement.muted = !1))
        }, t.onExtraDataUpdated = function (e) {
            e.status = "online", t.onUserStatusChanged(e, !0)
        }, t.getAllParticipants = function (e) {
            return t.peers.getAllParticipants(e)
        }, void 0 !== T && (T.onSyncNeeded = function (e, n, o) {
            t.peers.getAllParticipants().forEach(function (t) {
                r.onNegotiationNeeded({streamid: e, action: n, streamSyncNeeded: !0, type: o || "both"}, t)
            })
        }), t.connectSocket = function (e) {
            m(e)
        }, t.closeSocket = function () {
            try {
                io.sockets = {}
            } catch (e) {
            }
            t.socket && ("function" == typeof t.socket.disconnect && t.socket.disconnect(), "function" == typeof t.socket.resetProps && t.socket.resetProps(), t.socket = null)
        }, t.getSocket = function (e) {
            return !e && t.enableLogs && console.warn("getSocket.callback paramter is required."), e = e || function () {
            }, t.socket ? e(t.socket) : m(function () {
                e(t.socket)
            }), t.socket
        }, t.getRemoteStreams = r.getRemoteStreams;
        var E = ["selectFirst", "selectAll", "forEach"];
        if (t.streamEvents = {
            selectFirst: function (e) {
                return t.streamEvents.selectAll(e)[0]
            }, selectAll: function (e) {
                e || (e = {
                    local: !0,
                    remote: !0,
                    isScreen: !0,
                    isAudio: !0,
                    isVideo: !0
                }), "local" == e && (e = {local: !0}), "remote" == e && (e = {remote: !0}), "screen" == e && (e = {isScreen: !0}), "audio" == e && (e = {isAudio: !0}), "video" == e && (e = {isVideo: !0});
                var n = [];
                return Object.keys(t.streamEvents).forEach(function (o) {
                    var i = t.streamEvents[o];
                    if (-1 === E.indexOf(o)) {
                        var r = !0;
                        e.local && "local" === i.type && (r = !1), e.remote && "remote" === i.type && (r = !1), e.isScreen && i.stream.isScreen && (r = !1), e.isVideo && i.stream.isVideo && (r = !1), e.isAudio && i.stream.isAudio && (r = !1), e.userid && i.userid === e.userid && (r = !1), !1 === r && n.push(i)
                    }
                }), n
            }
        }, t.socketURL = "/", t.socketMessageEvent = "RTCMultiConnection-Message", t.socketCustomEvent = "RTCMultiConnection-Custom-Message", t.DetectRTC = DetectRTC, t.setCustomSocketEvent = function (e) {
            e && (t.socketCustomEvent = e), t.socket && t.socket.emit("set-custom-socket-event-listener", t.socketCustomEvent)
        }, t.getNumberOfBroadcastViewers = function (e, n) {
            t.socket && e && n && t.socket.emit("get-number-of-users-in-specific-broadcast", e, n)
        }, t.onNumberOfBroadcastViewersUpdated = function (e) {
            t.enableLogs && t.isInitiator && console.info("Number of broadcast (", e.broadcastId, ") viewers", e.numberOfBroadcastViewers)
        }, t.onUserStatusChanged = function (e, n) {
            t.enableLogs && !n && console.info(e.userid, e.status)
        }, t.getUserMediaHandler = R, t.multiPeersHandler = r, t.enableLogs = !0, t.setCustomSocketHandler = function (e) {
            void 0 !== o && (o = e)
        }, t.chunkSize = 4e4, t.maxParticipantsAllowed = 1e3, t.disconnectWith = r.disconnectWith, t.checkPresence = function (e, n) {
            e = e || t.sessionid, "SSEConnection" !== o.name ? t.socket ? t.socket.emit("check-presence", e + "", function (e, o, i) {
                t.enableLogs && console.log("checkPresence.isRoomExist: ", e, " roomid: ", o), n(e, o, i)
            }) : t.connectSocket(function () {
                t.checkPresence(e, n)
            }) : SSEConnection.checkPresence(e, function (e, o, i) {
                if (!t.socket) return e || (t.userid = o), void t.connectSocket(function () {
                    n(e, o, i)
                });
                n(e, o)
            })
        }, t.onReadyForOffer = function (e, n) {
            t.multiPeersHandler.createNewPeer(e, n)
        }, t.setUserPreferences = function (e) {
            return t.dontAttachStream && (e.dontAttachLocalStream = !0), t.dontGetRemoteStream && (e.dontGetRemoteStream = !0), e
        }, t.updateExtraData = function () {
            t.socket.emit("extra-data-updated", t.extra)
        }, t.enableScalableBroadcast = !1, t.maxRelayLimitPerUser = 3, t.dontCaptureUserMedia = !1, t.dontAttachStream = !1, t.dontGetRemoteStream = !1, t.onReConnecting = function (e) {
            t.enableLogs && console.info("ReConnecting with", e.userid, "...")
        }, t.beforeAddingStream = function (e) {
            return e
        }, t.beforeRemovingStream = function (e) {
            return e
        }, "undefined" != typeof isChromeExtensionAvailable && (t.checkIfChromeExtensionAvailable = isChromeExtensionAvailable), "undefined" != typeof isFirefoxExtensionAvailable && (t.checkIfChromeExtensionAvailable = isFirefoxExtensionAvailable), "undefined" != typeof getChromeExtensionStatus && (t.getChromeExtensionStatus = getChromeExtensionStatus), t.modifyScreenConstraints = function (e) {
            return e
        }, t.onPeerStateChanged = function (e) {
            t.enableLogs && -1 !== e.iceConnectionState.search(/closed|failed/gi) && console.error("Peer connection is closed between you & ", e.userid, e.extra, "state:", e.iceConnectionState)
        }, t.isOnline = !0, c("online", function () {
            t.isOnline = !0
        }), c("offline", function () {
            t.isOnline = !1
        }), t.isLowBandwidth = !1, navigator && navigator.connection && navigator.connection.type && (t.isLowBandwidth = -1 !== navigator.connection.type.toString().toLowerCase().search(/wifi|cell/g), t.isLowBandwidth)) {
            if (t.bandwidth = {
                audio: !1,
                video: !1,
                screen: !1
            }, t.mediaConstraints.audio && t.mediaConstraints.audio.optional && t.mediaConstraints.audio.optional.length) {
                var x = [];
                t.mediaConstraints.audio.optional.forEach(function (e) {
                    void 0 === e.bandwidth && x.push(e)
                }), t.mediaConstraints.audio.optional = x
            }
            if (t.mediaConstraints.video && t.mediaConstraints.video.optional && t.mediaConstraints.video.optional.length) {
                x = [];
                t.mediaConstraints.video.optional.forEach(function (e) {
                    void 0 === e.bandwidth && x.push(e)
                }), t.mediaConstraints.video.optional = x
            }
        }
        t.getExtraData = function (e, n) {
            if (!e) throw"remoteUserId is required.";
            if ("function" != typeof n) return t.peers[e] ? t.peers[e].extra : t.peersBackup[e] ? t.peersBackup[e].extra : {};
            t.socket.emit("get-remote-user-extra-data", e, function (e, t, o) {
                n(e, t, o)
            })
        }, n.autoOpenOrJoin && t.openOrJoin(t.sessionid), t.onUserIdAlreadyTaken = function (e, n) {
            t.close(), t.closeSocket(), t.isInitiator = !1, t.userid = t.token(), t.join(t.sessionid), t.enableLogs && console.warn("Userid already taken.", e, "Your new userid:", t.userid)
        }, t.trickleIce = !0, t.version = "3.6.9", t.onSettingLocalDescription = function (e) {
            t.enableLogs && console.info("Set local description for remote user", e.userid)
        }, t.resetScreen = function () {
            sourceId = null, DetectRTC && DetectRTC.screen && delete DetectRTC.screen.sourceId, currentUserMediaRequest = {
                streams: [],
                mutex: !1,
                queueRequests: []
            }
        }, t.autoCreateMediaElement = !0, t.password = null, t.setPassword = function (e, n) {
            n = n || function () {
            }, t.socket ? t.socket.emit("set-password", e, n) : (t.password = e, n(!0, t.sessionid, null))
        }, t.onSocketDisconnect = function (e) {
            t.enableLogs && console.warn("socket.io connection is closed")
        }, t.onSocketError = function (e) {
            t.enableLogs && console.warn("socket.io connection is failed")
        }, t.errors = {
            ROOM_NOT_AVAILABLE: "Room not available",
            INVALID_PASSWORD: "Invalid password",
            USERID_NOT_AVAILABLE: "User ID does not exist",
            ROOM_PERMISSION_DENIED: "Room permission denied",
            ROOM_FULL: "Room full",
            DID_NOT_JOIN_ANY_ROOM: "Did not join any room yet",
            INVALID_SOCKET: "Invalid socket",
            PUBLIC_IDENTIFIER_MISSING: "publicRoomIdentifier is required",
            INVALID_ADMIN_CREDENTIAL: "Invalid username or password attempted"
        }
    }(this)
};
"undefined" != typeof module && (module.exports = exports = RTCMultiConnection), "function" == typeof define && define.amd && define("RTCMultiConnection", [], function () {
    return RTCMultiConnection
}), function () {
    function e() {
        function e(e, n) {
            n = n || function (e) {
                postMessage(e)
            };
            var t = e.file;
            t.uuid || (t.uuid = (100 * Math.random()).toString().replace(/\./g, ""));
            var o = e.chunkSize || 15e3;
            e.extra && e.extra.chunkSize && (o = e.extra.chunkSize);
            var i, r = 0, a = o, s = Math.floor(Math.min(1e8, a) / o) * o, d = Math.ceil(t.size / o);
            t.maxChunks = d;
            var c = 0, l = [];
            n({
                currentPosition: c,
                uuid: t.uuid,
                maxChunks: d,
                size: t.size,
                name: t.name,
                type: t.type,
                lastModifiedDate: (t.lastModifiedDate || new Date).toString(),
                start: !0
            });
            var u, m = new FileReader;
            m.onloadend = function (e) {
                e.target.readyState == FileReader.DONE && function (e, r, a) {
                    i = Math.ceil(r.byteLength / o);
                    for (var s = 0; s < i; s++) {
                        var u = s * o;
                        l[c] = r.slice(u, Math.min(u + o, r.byteLength)), n({
                            uuid: t.uuid,
                            buffer: l[c],
                            currentPosition: c,
                            maxChunks: d,
                            size: t.size,
                            name: t.name,
                            lastModifiedDate: (t.lastModifiedDate || new Date).toString(),
                            type: t.type
                        }), c++
                    }
                    c == d && !0;
                    a()
                }(t.name, e.target.result, function () {
                    (++r + 1) * s < t.size ? (u = t.slice(r * s, (r + 1) * s), m.readAsArrayBuffer(u)) : r * s < t.size ? (u = t.slice(r * s, t.size), m.readAsArrayBuffer(u)) : (t.url = URL.createObjectURL(t), n({
                        currentPosition: c,
                        uuid: t.uuid,
                        maxChunks: d,
                        size: t.size,
                        name: t.name,
                        lastModifiedDate: (t.lastModifiedDate || new Date).toString(),
                        url: URL.createObjectURL(t),
                        type: t.type,
                        end: !0
                    }))
                })
            }, c += 1, u = t.slice(r * s, (r + 1) * s), m.readAsArrayBuffer(u)
        }

        this.readAsArrayBuffer = function (n, t) {
            var o = t.earlyCallback;

            function i(e) {
                n.chunks[e.uuid] || (n.chunks[e.uuid] = {currentPosition: -1}), t.extra = t.extra || {userid: 0}, e.userid = t.userid || t.extra.userid || 0, e.extra = t.extra, n.chunks[e.uuid][e.currentPosition] = e, e.end && o && (o(e.uuid), o = null), e.maxChunks > 200 && 200 == e.currentPosition && o && (o(e.uuid), o = null)
            }

            delete t.earlyCallback, e(t, i)
        }
    }

    function n(e) {
        var n = this;
        n.chunks = {}, n.chunksWaiters = {}, n.receive = function t(o, i) {
            if (o.uuid) {
                if (o.start && !n.chunks[o.uuid] && (n.chunks[o.uuid] = {}, e.onBegin && e.onBegin(o)), !o.end && o.buffer && (n.chunks[o.uuid][o.currentPosition] = o.buffer), o.end) {
                    var r = n.chunks[o.uuid], a = [];
                    Object.keys(r).forEach(function (e, n) {
                        a.push(r[e])
                    });
                    var s = new Blob(a, {type: o.type});
                    (s = function (e, n) {
                        if (e || (e = {}), !n) return e;
                        for (var t in n) try {
                            e[t] = n[t]
                        } catch (e) {
                        }
                        return e
                    }(s, o)).url = URL.createObjectURL(s), s.uuid = o.uuid, s.size || console.error("Something went wrong. Blob Size is 0."), e.onEnd && e.onEnd(s), delete n.chunks[o.uuid], delete n.chunksWaiters[o.uuid]
                }
                o.buffer && e.onProgress && e.onProgress(o), o.end || (i(o), n.chunksWaiters[o.uuid] = function () {
                    setTimeout(function e() {
                        o.buffer && n.chunks[o.uuid] && (o.currentPosition == o.maxChunks || n.chunks[o.uuid][o.currentPosition] || (i(o), setTimeout(e, 5e3)))
                    }, 5e3)
                }, n.chunksWaiters[o.uuid]())
            } else e.convertToObject(o, function (e) {
                t(e)
            })
        }
    }

    var t = {
        ConvertToArrayBuffer: function (e, n) {
            g.pack(e, function (e) {
                n(e.buffer)
            })
        }, ConvertToObject: function (e, n) {
            g.unpack(e, n)
        }
    };
    var o = Uint8Array.BYTES_PER_ELEMENT, i = Uint16Array.BYTES_PER_ELEMENT, r = Uint32Array.BYTES_PER_ELEMENT, a = {
            NULL: 0,
            UNDEFINED: 1,
            STRING: 2,
            NUMBER: 3,
            BOOLEAN: 4,
            ARRAY: 5,
            OBJECT: 6,
            INT8ARRAY: 7,
            INT16ARRAY: 8,
            INT32ARRAY: 9,
            UINT8ARRAY: 10,
            UINT16ARRAY: 11,
            UINT32ARRAY: 12,
            FLOAT32ARRAY: 13,
            FLOAT64ARRAY: 14,
            ARRAYBUFFER: 15,
            BLOB: 16,
            FILE: 16,
            BUFFER: 17
        },
        s = [null, null, "Uint16", "Float64", "Uint8", null, null, "Int8", "Int16", "Int32", "Uint8", "Uint16", "Uint32", "Float32", "Float64", "Uint8", "Uint8", "Uint8"],
        d = function (e) {
            var n = 0, t = 0, d = 0, c = new ArrayBuffer(e[0].byte_length + e[0].header_size), l = new DataView(c);
            for (t = 0; t < e.length; t++) {
                e[t].header_size;
                var u = e[t].type, m = e[t].length, g = e[t].value, f = e[t].byte_length, v = s[u],
                    p = null === v ? 0 : window[v + "Array"].BYTES_PER_ELEMENT;
                switch (u === a.BUFFER ? l.setUint8(n, a.BLOB, !1) : l.setUint8(n, u, !1), n += o, u !== a.ARRAY && u !== a.OBJECT || (l.setUint16(n, m, !1), n += i), l.setUint32(n, f, !1), n += r, u) {
                    case a.NULL:
                    case a.UNDEFINED:
                        break;
                    case a.STRING:
                        for (d = 0; d < m; d++, n += p) l.setUint16(n, g.charCodeAt(d), !1);
                        break;
                    case a.NUMBER:
                    case a.BOOLEAN:
                        0, l["set" + v](n, g, !1), n += p;
                        break;
                    case a.INT8ARRAY:
                    case a.INT16ARRAY:
                    case a.INT32ARRAY:
                    case a.UINT8ARRAY:
                    case a.UINT16ARRAY:
                    case a.UINT32ARRAY:
                    case a.FLOAT32ARRAY:
                    case a.FLOAT64ARRAY:
                        new Uint8Array(l.buffer, n, f).set(new Uint8Array(g.buffer)), n += f;
                        break;
                    case a.ARRAYBUFFER:
                    case a.BUFFER:
                        new Uint8Array(l.buffer, n, f).set(new Uint8Array(g)), n += f;
                        break;
                    case a.BLOB:
                    case a.ARRAY:
                    case a.OBJECT:
                        break;
                    default:
                        throw"TypeError: Unexpected type found."
                }
                0
            }
            return l
        }, c = function (e, n) {
            var t, d, l, u, m, g = 0;
            t = e.getUint8(n, !1), n += o, t !== a.ARRAY && t !== a.OBJECT || (d = e.getUint16(n, !1), n += i), l = e.getUint32(n, !1), n += r;
            var f = s[t], v = null === f ? 0 : window[f + "Array"].BYTES_PER_ELEMENT;
            switch (t) {
                case a.NULL:
                case a.UNDEFINED:
                    0, u = null;
                    break;
                case a.STRING:
                    d = l / v;
                    var p = [];
                    for (g = 0; g < d; g++) {
                        var h = e.getUint16(n, !1);
                        n += v, p.push(String.fromCharCode(h))
                    }
                    u = p.join("");
                    break;
                case a.NUMBER:
                    u = e.getFloat64(n, !1), n += v;
                    break;
                case a.BOOLEAN:
                    u = 1 === e.getUint8(n, !1), n += v;
                    break;
                case a.INT8ARRAY:
                case a.INT16ARRAY:
                case a.INT32ARRAY:
                case a.UINT8ARRAY:
                case a.UINT16ARRAY:
                case a.UINT32ARRAY:
                case a.FLOAT32ARRAY:
                case a.FLOAT64ARRAY:
                case a.ARRAYBUFFER:
                    m = e.buffer.slice(n, n + l), n += l, u = t === a.ARRAYBUFFER ? m : new window[f + "Array"](m);
                    break;
                case a.BLOB:
                    if (window.Blob) {
                        var S = c(e, n), C = c(e, S.cursor);
                        n = C.cursor, u = new Blob([C.value], {type: S.value})
                    } else m = e.buffer.slice(n, n + l), n += l, u = new Buffer(m);
                    break;
                case a.ARRAY:
                    for (u = [], g = 0; g < d; g++) n = (m = c(e, n)).cursor, u.push(m.value);
                    break;
                case a.OBJECT:
                    for (u = {}, g = 0; g < d; g++) {
                        var w = c(e, n), y = c(e, w.cursor);
                        n = y.cursor, u[w.value] = y.value
                    }
                    break;
                default:
                    throw"TypeError: Type not supported."
            }
            return {value: u, cursor: n}
        }, l = function (e, n) {
            for (var t = e.length, o = [], i = 0, r = 0, a = 0; a < e.length; a++) !function (a) {
                u(e[a], function (e) {
                    if (o[a] = e, r += e[0].header_size + e[0].byte_length, ++i === t) {
                        for (var s = [], d = 0; d < o.length; d++) s = s.concat(o[d]);
                        n(s, r)
                    }
                })
            }(a)
        }, u = function (e, n) {
            var t, d, c = o + r, u = 0, m = 0, g = e;
            switch (d = function (e) {
                var n = void 0;
                if (void 0 === e) n = a.UNDEFINED; else if (null === e) n = a.NULL; else {
                    var t = e.constructor.name, o = e.constructor.toString().match(/\w+/g)[1];
                    if (void 0 !== t && void 0 !== a[t.toUpperCase()]) n = a[t.toUpperCase()]; else if (void 0 !== o && void 0 !== a[o.toUpperCase()]) n = a[o.toUpperCase()]; else switch (typeof e) {
                        case"string":
                            n = a.STRING;
                            break;
                        case"number":
                            n = a.NUMBER;
                            break;
                        case"boolean":
                            n = a.BOOLEAN;
                            break;
                        case"object":
                            e instanceof Array ? n = a.ARRAY : e instanceof Int8Array ? n = a.INT8ARRAY : e instanceof Int16Array ? n = a.INT16ARRAY : e instanceof Int32Array ? n = a.INT32ARRAY : e instanceof Uint8Array ? n = a.UINT8ARRAY : e instanceof Uint16Array ? n = a.UINT16ARRAY : e instanceof Uint32Array ? n = a.UINT32ARRAY : e instanceof Float32Array ? n = a.FLOAT32ARRAY : e instanceof Float64Array ? n = a.FLOAT64ARRAY : e instanceof ArrayBuffer ? n = a.ARRAYBUFFER : e instanceof Blob ? n = a.BLOB : e instanceof Buffer ? n = a.BUFFER : e instanceof Object && (n = a.OBJECT)
                    }
                }
                return n
            }(e), t = null == s[d] ? 0 : window[s[d] + "Array"].BYTES_PER_ELEMENT, d) {
                case a.UNDEFINED:
                case a.NULL:
                    break;
                case a.NUMBER:
                case a.BOOLEAN:
                    u = t;
                    break;
                case a.STRING:
                    u += (m = e.length) * t;
                    break;
                case a.INT8ARRAY:
                case a.INT16ARRAY:
                case a.INT32ARRAY:
                case a.UINT8ARRAY:
                case a.UINT16ARRAY:
                case a.UINT32ARRAY:
                case a.FLOAT32ARRAY:
                case a.FLOAT64ARRAY:
                    u += (m = e.length) * t;
                    break;
                case a.ARRAY:
                    return void l(e, function (t, o) {
                        n([{type: d, length: e.length, header_size: c + i, byte_length: o, value: null}].concat(t))
                    });
                case a.OBJECT:
                    var f = [];
                    for (var v in e) e.hasOwnProperty(v) && (f.push(v), f.push(e[v]), m++);
                    return void l(f, function (e, t) {
                        n([{type: d, length: m, header_size: c + i, byte_length: t, value: null}].concat(e))
                    });
                case a.ARRAYBUFFER:
                    u += e.byteLength;
                    break;
                case a.BLOB:
                    var p = e.type, h = new FileReader;
                    return h.onload = function (e) {
                        l([p, e.target.result], function (e, t) {
                            n([{type: d, length: m, header_size: c, byte_length: t, value: null}].concat(e))
                        })
                    }, h.onerror = function (e) {
                        throw"FileReader Error: " + e
                    }, void h.readAsArrayBuffer(e);
                case a.BUFFER:
                    u += e.length;
                    break;
                default:
                    throw'TypeError: Type "' + e.constructor.name + '" not supported.'
            }
            n([{type: d, length: m, header_size: c, byte_length: u, value: g}].concat([]))
        }, m = function (e, n) {
            var t = e instanceof DataView ? e : new DataView(e);
            return c(t, 0).value
        };
    var g = {
        pack: function (e, n) {
            try {
                0, u(e, function (e) {
                    n(d(e))
                })
            } catch (e) {
                throw e
            }
        }, unpack: function (e, n) {
            try {
                0;
                var t = m(e);
                0, n(t)
            } catch (e) {
                throw e
            }
        }
    };
    window.FileConverter = t, window.FileSelector = function () {
        var e = this, n = function () {
        };

        function t(t, o, i) {
            t = t || function () {
            };
            var r = document.createElement("input");
            r.type = "file", o && (r.multiple = !0), i && (r.webkitdirectory = !0), r.accept = e.accept, r.onclick = function () {
                r.clickStarted = !0
            }, document.body.onfocus = function () {
                setTimeout(function () {
                    r.clickStarted && (r.clickStarted = !1, r.value || n())
                }, 500)
            }, r.onchange = function () {
                if (o) {
                    if (!r.files.length) return void console.error("No file selected.");
                    var e = [];
                    return Array.from(r.files).forEach(function (n) {
                        n.url = n.webkitRelativePath, e.push(n)
                    }), void t(e)
                }
                r.files[0] ? (t(r.files[0]), r.parentNode.removeChild(r)) : console.error("No file selected.")
            }, r.style.display = "none", (document.body || document.documentElement).appendChild(r), function (e) {
                if ("function" == typeof e.click) return void e.click();
                if ("function" == typeof e.change) return void e.change();
                if (void 0 !== document.createEvent("Event")) {
                    if ("function" == typeof (n = document.createEvent("Event")).initEvent && "function" == typeof e.dispatchEvent) return n.initEvent("click", !0, !0), void e.dispatchEvent(n)
                }
                var n = new MouseEvent("click", {view: window, bubbles: !0, cancelable: !0});
                e.dispatchEvent(n)
            }(r)
        }

        e.selectSingleFile = function (e, o) {
            o && (n = o), t(e)
        }, e.selectMultipleFiles = function (e, o) {
            o && (n = o), t(e, !0)
        }, e.selectDirectory = function (e, o) {
            o && (n = o), t(e, !0, !0)
        }, e.accept = "*.*"
    }, window.FileBufferReader = function () {
        var o = this, i = new e;
        o.chunks = {}, o.users = {}, o.readAsArrayBuffer = function (e, n, t) {
            var r = {
                file: e, earlyCallback: function (e) {
                    n(a(e, {currentPosition: -1}))
                }, extra: t || {userid: 0}
            };
            e.extra && Object.keys(e.extra).length && Object.keys(e.extra).forEach(function (n) {
                r.extra[n] = e.extra[n]
            }), i.readAsArrayBuffer(o, r)
        }, o.getNextChunk = function (e, n, t) {
            var i;
            void 0 !== e.currentPosition && (i = e.currentPosition, e = e.uuid);
            var r = o.chunks[e];
            if (r) {
                void 0 !== t ? (o.users[t + ""] || (o.users[t + ""] = {
                    fileUUID: e,
                    userid: t,
                    currentPosition: -1
                }), void 0 !== i && (o.users[t + ""].currentPosition = i), o.users[t + ""].currentPosition++, i = o.users[t + ""].currentPosition) : (void 0 !== i && (o.chunks[e].currentPosition = i), o.chunks[e].currentPosition++, i = o.chunks[e].currentPosition);
                var s = r[i];
                if (!s) return delete o.chunks[e], void o.convertToArrayBuffer({
                    chunkMissing: !0,
                    currentPosition: i,
                    uuid: e
                }, n);
                s = a(s), void 0 !== t && (s.remoteUserId = t + ""), s.start && o.onBegin(s), s.end && o.onEnd(s), o.onProgress(s), o.convertToArrayBuffer(s, function (e) {
                    s.currentPosition != s.maxChunks ? n(e, !1) : n(e, !0)
                })
            }
        };
        var r = new n(o);

        function a(e, n) {
            if (null == e || "object" != typeof e) return e;
            if (e.constructor != Object && e.constructor != Array) return e;
            if (e.constructor == Date || e.constructor == RegExp || e.constructor == Function || e.constructor == String || e.constructor == Number || e.constructor == Boolean) return new e.constructor(e);
            for (var t in n = n || new e.constructor, e) n[t] = void 0 === n[t] ? a(e[t], null) : n[t];
            return n
        }

        o.addChunk = function (e, n) {
            e && r.receive(e, function (e) {
                o.convertToArrayBuffer({readyForNextChunk: !0, currentPosition: e.currentPosition, uuid: e.uuid}, n)
            })
        }, o.chunkMissing = function (e) {
            delete r.chunks[e.uuid], delete r.chunksWaiters[e.uuid]
        }, o.onBegin = function () {
        }, o.onEnd = function () {
        }, o.onProgress = function () {
        }, o.convertToObject = t.ConvertToObject, o.convertToArrayBuffer = t.ConvertToArrayBuffer, o.setMultipleUsers = function () {
        }
    }
}();
var publicRoomIdentifier, connection, videoConnection, screenConnection, tenant, role, sessionId, sessionForChat,
    roomId, socket, streamConstraints, recentFile, conversationPanel, tempStream, lsDesigner, conferenceStyle,
    classVideo, videoElementContainer, videoWidgetContainer, roomLinkPage, facingMode, iphoneLocalStream,
    localVideoStream, caller_name, caller_phone, caller_avatar, caller_email, peer_name, peer_phone, peer_avatar,
    peer_logo, peer_background, peer_email, lsRepUrl, ui_handler, notify_handler, jQEngager, pluginInstalled,
    pluginController, comm_controller, visitors, queryString, videoDevices, multiStreamRecorder, agentId, recordScreen,
    recordCamera, recordingTimer, videoDefault, videoCurrent, audioSource, videoSource, testAudioTrack, testVideoTrack,
    videoSelect, audioInputSelect, audioOutputSelect, sourceBuffer, passRoom, agentAvatar, visitorName, agentName,
    datetime, duration, token, room, disableVideo, disableAudio, disableScreenShare, disableWhiteboard, disableTransfer,
    autoAcceptVideo, autoAcceptAudio, translator, roomPrd, forceClose = !1, autoReconnectInterval = 5e3,
    popupNotifications = [], repeatStatInterval = 2e3, visitorRinging = [], requirePassComm = !1,
    RMCMediaTrack = {cameraStream: null, cameraTrack: null, screen: null}, comController = function () {
        var e = this;
        this.init = function (t, o) {
            requirePassComm = void 0 !== passRoom && passRoom, roomId = o, role = t, sessionId = getCookie("sessionId") && "admin" !== getCookie("sessionId") ? getCookie("sessionId") : getGuid(), queryString.s && (sessionId = queryString.s);
            var i = "admin" === role ? "a" : "";
            if (sessionForChat = getCookie("sessionForChat") ? getCookie("sessionForChat") : sessionId + i, "admin" === role && (sessionId = "admin"), queryString.isAdmin && (sessionId += "a"), facingMode = svConfigs.videoScreen.primaryCamera ? svConfigs.videoScreen.primaryCamera : "user", setCookie("sessionId", sessionId, 1), setCookie("sessionForChat", sessionForChat, 1), window.enableAdapter = !0, publicRoomIdentifier = "dashboard", tenant = "dashboard", (connection = new RTCMultiConnection).enableLogs = !!svConfigs.videoScreen.enableLogs && svConfigs.videoScreen.enableLogs, connection.iceServers = svConfigs.iceServers.iceServers, connection.socketURL = svConfigs.appWss, conferenceStyle = svConfigs.videoScreen && "conference" === svConfigs.videoScreen.videoContainerStyle ? "conference" : "simple", classVideo = "conference" === conferenceStyle ? "sourcevideo" : "bigvideo", videoElementContainer = "conference" === conferenceStyle ? "video_container_small" : "video_container", videoWidgetContainer = "conference" === conferenceStyle ? "w.html" : "widget.html", roomLinkPage = "conference" == conferenceStyle ? "r.html" : "room.html", connection.publicRoomIdentifier = publicRoomIdentifier, connection.onbeforeunload = function () {
            }, connection.session = {audio: !1, video: !1, data: !0}, connection.processSdp = function (e) {
                return e
            }, void 0 !== names) var r = names[sessionId] ? names[sessionId].name : guestName(sessionId); else r = guestName(sessionId);
            if (connection.extra = {
                role: role,
                name: r,
                tenant: tenant,
                sessionId: sessionId,
                ua: navigator.userAgent,
                referrer: document.title,
                roomId: roomId,
                isAdmin: queryString.isAdmin || "admin" == role ? 1 : 0,
                pass: requirePassComm,
                callerInfo: localStorage.getItem("prd") ? JSON.parse(localStorage.getItem("prd")) : ""
            }, connection.onopen = function (e) {
                if (svConfigs.videoScreen.enableLogs && console.log("You are connected with: " + connection.getAllParticipants().join(", ")), lsDesigner && lsDesigner.pointsLength <= 0 && setTimeout(function () {
                    connection.send("plz-sync-points")
                }, 1e3), "popup" == e.extra.role) if (e.extra.isAdmin) {
                    var n = jQEngager.Event("AdminPopupOnline", {
                        sessionId: e.extra.sessionId,
                        isAdmin: 1,
                        pass: e.extra.pass
                    });
                    jQEngager(document).trigger(n)
                } else {
                    if (e.extra.callerInfo) e = {
                        sessionId: e.extra.sessionId,
                        isAdmin: e.extra.isAdmin,
                        name: e.extra.callerInfo ? e.extra.callerInfo.name : e.extra.name,
                        callerInfo: e.extra.callerInfo,
                        pass: e.extra.pass
                    }; else e = {sessionId: e.extra.sessionId, isAdmin: e.extra.isAdmin, pass: e.extra.pass};
                    n = jQEngager.Event("PopupOnline", e);
                    jQEngager(document).trigger(n)
                }
                if (e.extra && "admin" == e.extra.role) {
                    n = jQEngager.Event("AdminOnline");
                    jQEngager(document).trigger(n)
                }
            }, connection.onclose = connection.onerror = connection.onleave = function (e) {
                var n = jQEngager.Event("PopupLeft", {sessionId: e.userid, isAdmin: 0});
                if (jQEngager(document).trigger(n), e.extra && "admin" == e.extra.role) {
                    n = jQEngager.Event("AdminOffline");
                    jQEngager(document).trigger(n)
                }
                e.extra && "visitor" == e.extra.role && (jQEngager("#simpleButton" + e.extra.sessionId).hide(), jQEngager("#chats-lsv-admin").remove("#simpleButton" + e.extra.sessionId))
            }, connection.onUserStatusChanged = function (n) {
                if (svConfigs.videoScreen.enableLogs && console.log("onUserStatusChanged", n), "offline" == n.status) {
                    if (0 == connection.getAllParticipants().length) {
                        var t = jQEngager.Event("AdminPopupOffline");
                        jQEngager(document).trigger(t), e.handleCallTermination()
                    }
                    t = jQEngager.Event("PopupLeft", {sessionId: n.userid, isAdmin: 0});
                    jQEngager(document).trigger(t)
                }
                if ("online" == n.status && connection.getAllParticipants().length > 0 && n.extra && n.extra.sessionId != sessionId) {
                    if (n.extra.callerInfo) n = {
                        sessionId: n.extra.sessionId,
                        isAdmin: n.extra.isAdmin,
                        name: n.extra.callerInfo ? n.extra.callerInfo.name : n.extra.name,
                        callerInfo: n.extra.callerInfo,
                        pass: n.extra.pass
                    }; else n = {sessionId: n.extra.sessionId, isAdmin: n.extra.isAdmin, pass: n.extra.pass};
                    t = jQEngager.Event("PopupOnline", n);
                    jQEngager(document).trigger(t)
                }
            }, connection.onPeerStateChanged = function (e) {
                if (svConfigs.videoScreen.enableLogs && console.log("On PeerStateChanged", e), "closed" == e.iceConnectionState && e.extra && e.extra.isAdmin) {
                    var n = jQEngager.Event("AdminOffline");
                    jQEngager(document).trigger(n);
                    n = jQEngager.Event("AdminPopupOffline");
                    jQEngager(document).trigger(n);
                    for (var t = 0; t < popupNotifications.length; t++) popupNotifications[t] == e.extra.sessionId && popupNotifications.splice(t, 1)
                }
            }, this.onGettingWebRTCStats = function (e, n) {
                videoConnection.peers[n] || e.nomore();
                bytesToSize(e.bandwidth.speed), e.encryption, e.audio.recv.codecs.concat(e.video.recv.codecs).join(", "), bytesToSize(e.audio.bytesReceived + e.video.bytesReceived), e.connectionType.remote.candidateType.join(", "), e.connectionType.remote.transport.join(", "), e.results.forEach(function (e) {
                    if ("ssrc" === e.type && "Channel-audio-1" === e.transportId) {
                        var n = e.packetsLost;
                        e.packetsSent, e.audioInputLevel, e.googTrackId, e.mediaType, e.id.indexOf("_send");
                        "\n", "packetsLost: " + n
                    }
                })
            }, this.joinBroadcastLooper = function () {
                videoConnection.extra.broadcaster = !1, videoConnection.dontCaptureUserMedia = !0, videoConnection.session.oneway = !0, function e() {
                    videoConnection.checkPresence(roomId + "_video", function (n, t, o) {
                        o._room && o._room.isFull && alert("Room is full."), n ? videoConnection.join(roomId + "_video", function (e, n, t) {
                            t ? console.error("join", t, roomId + "_video") : setTimeout(function () {
                                var e = jQEngager.Event("MakeBigBroadcast");
                                jQEngager(document).trigger(e)
                            }, 3e3)
                        }) : setTimeout(e, 5e3)
                    })
                }()
            }, this.startScreenConnection = function (e, n) {
                screenConnection.openOrJoin(roomId + "_screen", function (t, o, i) {
                    screenConnection.isInitiator = e, (e || screenConnection.extra.sessionId !== n) && (screenConnection.extra = {sessionId: n}), e && socket.emit(connection.socketCustomEvent, {
                        type: "startScreenShare",
                        role: role,
                        tenant: tenant,
                        sessionId: n,
                        roomId: roomId
                    })
                })
            }, connection.onmessage = function (n) {
                if (!0 !== n.data.typing) if (!1 !== n.data.typing) if (n.data.chatMessage) if (n.data.privateId) {
                    if (n.data.privateId == e.getSessionId()) {
                        d = jQEngager.Event("ChatMessage", {
                            msg: n.data.chatMessage,
                            date: n.data.date,
                            sessionId: n.data.sessionId,
                            privateId: n.data.privateId
                        });
                        jQEngager(document).trigger(d)
                    }
                    if (n.data.privateId && "admin" === role) {
                        jQEngager("#simpleButton" + n.data.privateId).show();
                        var t = $("#contentChatsimple" + n.data.privateId)[0], o = $("#nameChat" + n.data.privateId).val();
                        const e = `\n                                <div class="msg-lsv left-msg-lsv">\n                                  <div class="msg-lsv-bubble">\n                                    <div class="msg-lsv-info">\n                                      <div class="msg-lsv-info-name">${o}</div>\n                                      <div class="msg-lsv-info-time">${getPrettyDate((new Date).getTime() / 1e3)}</div>\n                                    </div>\n\n                                    <div class="msg-lsv-text">${n.data.chatMessage}</div>\n                                  </div>\n                                </div>\n                              `;
                        if (t.insertAdjacentHTML("beforeend", e), t.scrollTop += 500, playEnterRoom(), svConfigs.serverSide.chatHistory) {
                            var i = n.data.privateId, r = [];
                            r[sessionForChat] = {}, r[i] = {}, saveChat(n.data.chatMessage, o, "", null, null, r)
                        }
                    }
                } else {
                    d = jQEngager.Event("ChatMessage", {
                        msg: n.data.chatMessage,
                        date: n.data.date,
                        sessionId: n.data.sessionId
                    });
                    jQEngager(document).trigger(d)
                } else if (n.data.translateMessage) {
                    d = jQEngager.Event("TranslateMessage", {msg: n.data.translateMessage, sessionId: n.data.sessionId});
                    jQEngager(document).trigger(d)
                } else {
                    if ("voiceSpeaking" === n.data) {
                        d = jQEngager.Event("VoiceSpeaking", {id: n.userid});
                        jQEngager(document).trigger(d)
                    }
                    if ("voiceSilence" === n.data) {
                        d = jQEngager.Event("VoiceSilence", {id: n.userid});
                        jQEngager(document).trigger(d)
                    }
                    if (lsDesigner && "plz-sync-points" === n.data) lsDesigner.sync(); else if (n.data.whiteboardData) {
                        d = jQEngager.Event("WhiteboardSync");
                        if (jQEngager(document).trigger(d), queryString.isAdmin || localStorage.getItem("hasPrivileges") || e.startWhiteboard(), lsDesigner || e.startWhiteboard(), n.data.whiteboardData) {
                            var a = n.data.whiteboardData, s = screen.width / n.data.width;
                            a.points.forEach(function (e) {
                                "text" == e[0] ? (e[1][1] = e[1][1] * s, e[1][2] = e[1][2] * s) : "image" == e[0] || "pdf" == e[0] ? (e[1][1] = e[1][1] * s, e[1][2] = e[1][2] * s, e[1][3] = e[1][3] * s, e[1][4] = e[1][4] * s) : (e[1][0] = e[1][0] * s, e[1][1] = e[1][1] * s, e[1][2] = e[1][2] * s, e[1][3] = e[1][3] * s)
                            }), lsDesigner.syncData(a)
                        } else lsDesigner.clearCanvas()
                    }
                } else {
                    var d = jQEngager.Event("SendTyping", {typing: !1});
                    jQEngager(document).trigger(d)
                } else {
                    var d = jQEngager.Event("SendTyping", {typing: !0, sessionId: n.userid});
                    jQEngager(document).trigger(d)
                }
            }, queryString.room) {
                (videoConnection = new RTCMultiConnection).enableLogs = !!svConfigs.videoScreen.enableLogs && svConfigs.videoScreen.enableLogs, videoConnection.iceServers = svConfigs.iceServers.iceServers, videoConnection.socketURL = svConfigs.appWss, videoConnection.maxParticipantsAllowed = svConfigs.maxParticipantsAllowed ? svConfigs.maxParticipantsAllowed : 1e3, videoConnection.publicRoomIdentifier = publicRoomIdentifier, queryString.broadcast ? videoConnection.sdpConstraints.mandatory = {
                    OfferToReceiveAudio: !0,
                    OfferToReceiveVideo: !!queryString.isAdmin
                } : videoConnection.sdpConstraints.mandatory = {
                    OfferToReceiveAudio: !0,
                    OfferToReceiveVideo: !0
                }, videoConnection.extra = {sessionId: sessionId}, videoConnection.onPeerStateChanged = function (e) {
                }, videoConnection.onspeaking = function (n) {
                    audio_on && video_on && e.getStream() && connection.send("voiceSpeaking")
                }, videoConnection.onsilence = function (e) {
                    connection.send("voiceSilence")
                }, videoConnection.onMediaError = function (e) {
                    if ("Permission denied" === e.message) {
                        e = jQEngager.Event("TogglePermissionDenied");
                        jQEngager(document).trigger(e), socket.emit(connection.socketCustomEvent, {
                            type: "endCall",
                            role: role,
                            tenant: tenant,
                            sessionId: sessionId,
                            roomId: roomId
                        })
                    } else videoConnection.openOrJoin(roomId + "_video", function (e, n, t) {
                        t && console.error("openOrJoin", t, n)
                    })
                }, connection.chunkSize = 16e3, connection.enableFileSharing = !0, connection.onUserIdAlreadyTaken = function (e, n) {
                }, connection.autoSaveToDisk = !1;
                var a = {};
                if (connection.onFileProgress = function (e, n) {
                    var t = a[e.uuid];
                    t.progress[0].value = e.currentPosition || e.maxChunks || t.progress[0].max
                }, connection.onFileStart = function (e) {
                    if (e.userid === connection.userid) {
                        if (!recentFile.started) {
                            recentFile.started = !0;
                            var n = jQEngager.Event("IncomingFileTransfer", {name: e.name, sender: !0, fileId: e.uuid});
                            jQEngager(document).trigger(n)
                        }
                    } else {
                        n = jQEngager.Event("IncomingFileTransfer", {name: e.name, sender: !1, fileId: e.uuid});
                        jQEngager(document).trigger(n)
                    }
                    a[e.uuid] = {progress: jQEngager("#progress" + e.uuid)}, a[e.uuid].progress.max = e.maxChunks
                }, connection.onFileEnd = function (n) {
                    var t = e.getFileHTML(n);
                    if (n.userid === connection.userid) if (recentFile) {
                        recentFile.userIndex++;
                        var o = connection.getAllParticipants()[recentFile.userIndex];
                        o ? connection.send(recentFile, o) : recentFile = null
                    } else recentFile = null; else jQEngager("#download" + n.uuid).html(t)
                }, videoConnection.onstream = function (t) {
                    if (svConfigs.videoScreen.enableLogs && console.log("videoConnection.onstream", t), videoConnection.videosContainer = document.getElementById(videoElementContainer), "local" === t.type) {
                        var o = jQEngager.Event("LocalVideoStarted");
                        if (jQEngager(document).trigger(o), t.stream.isVideo) iphoneLocalStream = RMCMediaTrack.cameraStream = t.stream, RMCMediaTrack.cameraTrack = e.getTracks(t.stream, "video")[0], isiPhone && e.checkMediaDevices(), (r = document.getElementById("localVideo")).setAttribute("data-sessionId", t.extra.sessionId), r.setAttribute("volume", 0), r.setAttribute("autoplay", ""), r.setAttribute("muted", ""), r.setAttribute("playsinline", ""), r.srcObject = svConfigs.videoScreen.videoFileStream ? localVideoStream : t.stream, RMCMediaTrack.selfVideo = r, void 0 !== (l = r.play()) && l.then(function () {
                            r.play()
                        }).catch(function (e) {
                            console.log(e)
                        }), videoConnection.extra.screen && (RMCMediaTrack.cameraTrack.onended = RMCMediaTrack.cameraTrack.onmute = RMCMediaTrack.cameraTrack.oninactive = function () {
                            n = !1, videoConnection.extra.screen = !1, e.handleScreenShareTermination()
                        })
                    } else {
                        if (void 0 === t.extra.sessionId) return;
                        $(".sourcevideo").each(function () {
                            $(this).attr("id"), t.extra.sessionId
                        }), $(".bigvideo").each(function () {
                            $(this).attr("id"), t.extra.sessionId
                        });
                        var i = document.getElementById("remoteVideoSpan" + t.extra.sessionId),
                            r = document.getElementById(t.extra.sessionId);
                        i && i.remove(), r && r.remove(), t.mediaElement.controls = !1, t.mediaElement.removeAttribute("src"), t.mediaElement.removeAttribute("srcObject");
                        var a = document.createElement("video");
                        a.id = t.extra.sessionId;
                        var s = videoConnection.getAllParticipants().length;
                        if (a.setAttribute("class", classVideo), "conference" !== conferenceStyle) {
                            var d = s > 1 ? "49%" : "98%";
                            a.style.width = d
                        }
                        try {
                            a.setAttributeNode(document.createAttribute("autoplay")), a.setAttributeNode(document.createAttribute("playsinline")), a.setAttributeNode(document.createAttribute("videoautoplay"))
                        } catch (o) {
                            a.playsinline = !0, a.autoplay = !0, a.videoautoplay = !0
                        }
                        var c = t.stream;
                        if ("srcObject" in a ? a.srcObject = c : a[navigator.mozGetUserMedia ? "mozSrcObject" : "src"] = navigator.mozGetUserMedia ? c : (window.URL || window.webkitURL).createObjectURL(c), videoConnection.videosContainer.appendChild(a), queryString.broadcast) {
                            var l;
                            o = jQEngager.Event("RemoteVideoStarted");
                            jQEngager(document).trigger(o), queryString.token ? toggleNotification(smartVideoLocale.msgStore.welcomeBroadcast, !0) : toggleNotification(smartVideoLocale.msgStore.incomingBroadcast, !0), void 0 !== (l = a.play()) && l.then(function () {
                                toggleNotification("", !1), a.play()
                            }).catch(function (e) {
                                $("#incomingBroadcast").click(function () {
                                    toggleNotification("", !1), a.play()
                                })
                            })
                        } else {
                            o = jQEngager.Event("RemoteVideoStarted");
                            jQEngager(document).trigger(o), a.play()
                        }
                        visitorRinging = [], setTimeout(function () {
                            connection.send("voiceSpeaking")
                        }, 1500)
                    }
                    if (queryString.broadcast) if ("remote" === t.type && videoConnection.isInitiator) {
                        var u = [];
                        videoConnection.getAllParticipants().forEach(function (e) {
                            u.push({pid: e, broadcaster: !0 === videoConnection.peers[e].extra.broadcaster})
                        }), videoConnection.socket.emit(videoConnection.socketCustomEvent, {
                            roomId: roomId,
                            participants: u
                        })
                    } else "remote" !== t.type || videoConnection.extra.broadcaster || videoConnection.socket.emit(videoConnection.socketCustomEvent, {
                        giveAllParticipants: !0,
                        roomId: roomId
                    });
                    videoConnection.onUserStatusChanged(t), e.initHark({
                        stream: t.stream,
                        streamedObject: t,
                        connection: videoConnection
                    })
                }, videoConnection.onstreamended = function (n) {
                    if (n.extra) {
                        var t = document.getElementById(n.extra.sessionId);
                        t && (t.parentNode.removeChild(t), $("#remoteVideoSpan" + n.extra.sessionId).remove());
                        var o = jQEngager.Event("RemoteVideoStopped");
                        jQEngager(document).trigger(o);
                        var i = videoConnection.getAllParticipants().length;
                        0 === i && e.handleCallTermination(), queryString.broadcast && !queryString.isAdmin && "local" !== n.type && 0 === i && (toggleError(smartVideoLocale.msgStore.broadcastStopped, 5e3), setTimeout(function () {
                            location.reload()
                        }, 1e3))
                    }
                }, videoConnection.onUserStatusChanged = function (n) {
                    var t = [];
                    connection.getAllParticipants().forEach(function (n) {
                        t.push(e.getFullName(n))
                    }), t = t.length ? [connection.extra.userFullName || "You"].concat(t) : ["Only You"]
                }, videoConnection.onopen = function () {
                    svConfigs.videoScreen.enableLogs && console.log("You are connected with: " + connection.getAllParticipants().join(", "))
                }, videoConnection.onclose = function () {
                    videoConnection.getAllParticipants().length
                }, videoConnection.onEntireSessionClosed = function (e) {
                    videoConnection && (videoConnection.leave(), videoConnection.streamEvents.selectAll({local: !0}).forEach(function (e) {
                        e.stream.getAudioTracks()[0].stop(), e.stream.getVideoTracks()[0].stop()
                    }));
                    var n = jQEngager.Event("CallEnded");
                    jQEngager(document).trigger(n)
                }, "conference" == conferenceStyle && (connection.autoCloseEntireSession = !1, videoConnection.autoCloseEntireSession = !1), !queryString.broadcast && svConfigs.videoScreen.separateScreenShare) {
                    (screenConnection = new RTCMultiConnection).enableLogs = !!svConfigs.videoScreen.enableLogs && svConfigs.videoScreen.enableLogs, screenConnection.maxParticipantsAllowed = svConfigs.maxParticipantsAllowed ? svConfigs.maxParticipantsAllowed : 1e3, screenConnection.closeBeforeUnload = !1, screenConnection.iceServers = svConfigs.iceServers.iceServers, screenConnection.socketURL = svConfigs.appWss, screenConnection.publicRoomIdentifier = publicRoomIdentifier, screenConnection.autoCloseEntireSession = !1, screenConnection.sdpConstraints.mandatory = {
                        OfferToReceiveAudio: !1,
                        OfferToReceiveVideo: !0
                    };
                    var s = {
                        mandatory: {
                            maxWidth: screen.width > 1920 ? screen.width : 1920,
                            maxHeight: screen.height > 1080 ? screen.height : 1080
                        }, optional: []
                    };
                    screenConnection.mediaConstraints = s, screenConnection.session = {
                        screen: !0,
                        oneway: !0
                    }, screenConnection.onstream = function (e) {
                        if ("local" === e.type) var n = document.getElementById("localScreen"); else n = document.getElementById("remoteScreen");
                        try {
                            n.setAttributeNode(document.createAttribute("autoplay")), n.setAttributeNode(document.createAttribute("playsinline"))
                        } catch (t) {
                            n.setAttribute("autoplay", !0), n.setAttribute("playsinline", !0)
                        }
                        if ("local" === e.type) {
                            n.volume = 0;
                            try {
                                n.setAttributeNode(document.createAttribute("muted"))
                            } catch (t) {
                                n.setAttribute("muted", !0)
                            }
                        } else {
                            var t = jQEngager.Event("RemoteScreenShareStarted");
                            jQEngager(document).trigger(t)
                        }
                        n.srcObject = e.stream
                    }, screenConnection.onstreamended = function (n) {
                        var t = jQEngager.Event("ScreenShareEnded");
                        jQEngager(document).trigger(t), e.handleScreenShareTermination()
                    }, screenConnection.onMediaError = function (n) {
                        if ("Concurrent mic process limit." === n.message) {
                            if (DetectRTC.audioInputDevices.length <= 1) return void alert("Please select external microphone. Check github issue number 483.");
                            var t = DetectRTC.audioInputDevices[1].deviceId;
                            screenConnection.mediaConstraints.audio = {deviceId: t}
                        }
                        if ("Permission denied" === n.message) {
                            n = jQEngager.Event("ScreenShareEnded");
                            jQEngager(document).trigger(n), e.handleScreenShareTermination()
                        }
                    }
                }
            }
            e.connect()
        }, this.connect = function () {
            this.updateListOfRooms = function (n) {
                jQEngager("#visitors").empty(), jQEngager("#visitorsCount").html(0);
                var t = 0;
                n.forEach(function (n, o) {
                    n.participants.forEach(function (o, i) {
                        var r = connection.peers[o];
                        if (r) {
                            var a = r.extra, s = jQEngager("#visitors").find("#" + a.sessionId),
                                d = a.ua ? detect.parse(a.ua) : "", c = d ? d.browser.name : "", l = d ? d.os.name : "",
                                u = a.callerInfo && a.callerInfo.name ? a.callerInfo.name : guestName(a.sessionId),
                                m = '<a href="javascript:void(0);" id="chat' + a.sessionId + '">Start chat</a>',
                                g = '<section class="msger-lsv" id="simpleButton' + a.sessionId + '" style="display: none;">                            <header class="msger-lsv-header">                                <div class="msger-lsv-header-title">                                        ' + u + '                                </div>                                <div class="msger-lsv-header-options">                                        <a href="javascript:void(0);" title="" class="close-but-wd-small" id="closeSimpleChat' + a.sessionId + '"><span></span></a>                                </div>                        </header>                        <main class="msger-lsv-chat" id="contentChatsimple' + a.sessionId + '">                        </main>                        <form class="msger-lsv-inputarea" id="form' + a.sessionId + '">                                <input type="text" id="input' + a.sessionId + '" class="msger-lsv-input" placeholder="Enter your message...">                                <input type="hidden" id="nameChat' + a.sessionId + '" value="' + u + '">                                <button type="submit" class="msger-lsv-send-btn">Send</button>                        </form>                </section>';
                            if (s.length > 0) {
                                var f = s[0];
                                f.innerHTML = '<div class="col-sm-10 col-xs-10">                                                                        <div class="messages msg_receive">                                                                                <p>' + u + " " + a.referrer + " " + m + "<br/>" + l + " " + c + "</p>                                                                                                                                                        </div>                                                                </div>", jQEngager(s[0]).replaceWith(f)
                            } else m = '<a href="javascript:void(0);" id="chat' + a.sessionId + '">Start chat</a>', (f = document.createElement("div")).className = "row msg_container base_receive", f.id = a.sessionId, f.innerHTML = '<div class="col-sm-10 col-xs-10">                                                                        <div class="messages msg_receive">                                                                                <p>' + u + " " + a.referrer + " " + m + "<br/>" + l + " " + c + "</p>                                                                                                                                                        </div>                                                                </div>", jQEngager("#visitors").append(f), t++;
                            if ($("#chat" + a.sessionId).off("click"), $("#chat" + a.sessionId).click(function () {
                                $("#simpleButton" + a.sessionId).show()
                            }), 0 == jQEngager("#chats-lsv-admin").find("#simpleButton" + a.sessionId).length) {
                                jQEngager("#chats-lsv-admin").append(g), $("#chat" + a.sessionId).click(function () {
                                    $("#simpleButton" + a.sessionId).show()
                                }), $("#closeSimpleChat" + a.sessionId).click(function () {
                                    $("#simpleButton" + a.sessionId).hide()
                                });
                                var v = function (e, n, t, o) {
                                    if (!t) return;
                                    var i = $("#contentChatsimple" + a.sessionId)[0];
                                    const r = `\n                                <div class="msg-lsv ${n}-msg-lsv">\n                                  <div class="msg-lsv-bubble">\n                                    <div class="msg-lsv-info">\n                                      <div class="msg-lsv-info-name">${e}</div>\n                                      <div class="msg-lsv-info-time">${o || getPrettyDate((new Date).getTime() / 1e3)}</div>\n                                    </div>\n\n                                    <div class="msg-lsv-text">${t}</div>\n                                  </div>\n                                </div>\n                              `;
                                    i.insertAdjacentHTML("beforeend", r), i.scrollTop += 500
                                };
                                $("#form" + a.sessionId).submit(function (n) {
                                    n.preventDefault();
                                    var t = $("#input" + a.sessionId), o = t.val();
                                    if (v("Me", "right", o), t.val(""), e.addLocalChat(o, null, a.sessionId), svConfigs.serverSide.chatHistory) {
                                        var i = svConfigs.agentName ? svConfigs.agentName : "Agent", r = a.sessionId,
                                            s = [];
                                        s[sessionForChat] = {}, s[r] = {}, saveChat(o, i, "", null, null, s)
                                    }
                                }), svConfigs.serverSide.chatHistory && $.ajax({
                                    type: "POST",
                                    url: lsRepUrl + "/server/script.php",
                                    data: {type: "getchat", roomId: roomId, sessionId: a.sessionId, agentId: null}
                                }).done(function (e) {
                                    e && JSON.parse(e).forEach(function (e) {
                                        var n = svConfigs.agentName ? svConfigs.agentName : "Agent";
                                        if (e.from == n) var t = "Me", o = "right"; else t = e.from, o = "left";
                                        var i = getPrettyDate(e.date_created);
                                        v(t, o, e.message, i)
                                    })
                                }).fail(function () {
                                })
                            }
                            if ("popup" == n.extra.role) {
                                var p = jQEngager("#visitors").find("#" + a.sessionId),
                                    h = jQEngager("#visitors").find("#room" + a.sessionId), S = !1;
                                if (jQEngager("#roomid_" + n.extra.roomId).html(n.extra.roomId + ' <img src="../img/online.png" alt="waiting to connect">'), n.participants.forEach(function (e, t) {
                                    connection.peers[e] || (S = !0, jQEngager("#roomid_" + n.extra.roomId).html(n.extra.roomId + ' <img src="../img/offline.png" alt="busy">'))
                                }), p.length > 0 && 0 === h.length && !S && (setTimeout(function () {
                                    var e = p.children().children().children(), t = {};
                                    t.names = svConfigs.agentName ? svConfigs.agentName : guestName(a.sessionId), lsRepUrl && (t.lsRepUrl = lsRepUrl), agentId && (t.agentId = agentId);
                                    var o = window.btoa(unescape(encodeURIComponent(JSON.stringify(t)))),
                                        i = lsRepUrl + "pages/" + roomLinkPage + "?room=" + n.extra.roomId + "&p=" + o + "&isAdmin=1",
                                        r = document.createElement("span");
                                    r.id = "room" + a.sessionId, r.innerHTML = ' <a href="' + i + '" target="_blank">Enter Room</a>', e.append(r)
                                }, 200), -1 == jQEngager.inArray(a.sessionId, popupNotifications))) {
                                    playEnterRoom();
                                    var C = jQEngager.Event("EnterPageNotification", {name: u});
                                    jQEngager(document).trigger(C), popupNotifications.push(a.sessionId)
                                }
                            }
                        }
                    }), jQEngager("#visitorsCount").html(t)
                })
            }, this.looper = function () {
                connection.socket.emit("get-public-rooms", publicRoomIdentifier, function (n) {
                    e.updateListOfRooms(n), setTimeout(e.looper, 3e3)
                })
            }, connection.connectSocket(function (n) {
                socket = n, connection.changeUserId(sessionId, null), e.showStatusBar("Connected to the chat server!", 5e3);
                var t = jQEngager.Event("CommConnected");
                jQEngager(document).trigger(t), "admin" === role && e.looper();
                socket.on("connect", function (n) {
                    e.showStatusBar("Connected to the chat server!", 5e3)
                }), socket.on("disconnect", function (n) {
                    e.showStatusBar("Unable to connect to the chat server! Kindly refresh", 1e4);
                    var t = jQEngager.Event("AdminOffline");
                    jQEngager(document).trigger(t), jQEngager("#visitors").empty(), location.reload()
                }), socket.on(connection.socketCustomEvent, function (n) {
                    if ("initCall" === n.type && sessionId !== n.sessionId && n.roomId === roomId) {
                        connection.getAllParticipants().forEach(function (e) {
                            visitorRinging.push(e)
                        });
                        var t = jQEngager.Event("IncomingCall", {autoaccept: n.autoaccept, sessionId: n.sessionId});
                        jQEngager(document).trigger(t)
                    }
                    if ("customerHere" === n.type && sessionId !== n.sessionId && "dashboard" === roomId) {
                        jQEngager("#roomid_" + n.roomId).html(n.roomId + ' <img src="../img/online.png" alt="waiting to connect">');
                        t = jQEngager.Event("EnterCustomerNotification", {name: n.name, roomId: n.roomId});
                        jQEngager(document).trigger(t), setTimeout(function () {
                            jQEngager("#roomid_" + n.roomId).html(n.roomId)
                        }, 1e4)
                    }
                    if ("customerOut" === n.type && sessionId !== n.sessionId && "dashboard" === roomId && jQEngager("#roomid_" + n.roomId).html(n.roomId), "endCall" === n.type && sessionId !== n.sessionId && n.roomId === roomId && setTimeout(function () {
                        var e = visitorRinging.indexOf(n.sessionId);
                        if (-1 !== e && visitorRinging.splice(e, 1), 0 == videoConnection.getAllParticipants().length && 0 == visitorRinging.length) {
                            var t = jQEngager.Event("CallEnded");
                            jQEngager(document).trigger(t)
                        }
                    }, 200), "remoteVideoUnmuted" === n.type && sessionId !== n.sessionId && n.roomId === roomId) {
                        t = jQEngager.Event("RemoteVideoUnmuted", {sessionId: n.sessionId});
                        jQEngager(document).trigger(t)
                    }
                    if ("startScreenShare" === n.type && n.roomId === roomId) if (queryString.broadcast) {
                        t = jQEngager.Event("VoiceSpeaking", {id: n.sessionId});
                        jQEngager(document).trigger(t)
                    } else sessionId !== n.sessionId && e.startScreenConnection(!1, n.sessionId);
                    if ("remoteVideoMuted" === n.type && sessionId !== n.sessionId && n.roomId === roomId) {
                        t = jQEngager.Event("RemoteVideoMuted", {sessionId: n.sessionId});
                        jQEngager(document).trigger(t)
                    }
                    if ("remoteAudioUnmuted" === n.type && sessionId !== n.sessionId && n.roomId === roomId) {
                        t = jQEngager.Event("RemoteAudioUnmuted", {sessionId: n.sessionId});
                        jQEngager(document).trigger(t)
                    }
                    if ("remoteAudioMuted" === n.type && sessionId !== n.sessionId && n.roomId === roomId) {
                        t = jQEngager.Event("RemoteAudioMuted", {sessionId: n.sessionId});
                        jQEngager(document).trigger(t)
                    }
                    if ("revokePriveleges" === n.type && sessionId == n.sessionId && n.roomId === roomId) {
                        t = jQEngager.Event("RevokePriveleges", {sessionId: n.sessionId});
                        jQEngager(document).trigger(t)
                    }
                    if ("grantPriveleges" === n.type && sessionId == n.sessionId && n.roomId === roomId) {
                        t = jQEngager.Event("GrantPriveleges", {sessionId: n.sessionId});
                        jQEngager(document).trigger(t)
                    }
                    if ("blockUser" === n.type && n.roomId === roomId) {
                        t = jQEngager.Event("BlockUser", {sessionId: n.sessionId});
                        jQEngager(document).trigger(t)
                    }
                    if ("forceAudioMuted" === n.type && n.roomId === roomId) {
                        t = jQEngager.Event("ForceAudioMuted", {sessionId: n.sessionId});
                        jQEngager(document).trigger(t)
                    }
                    if ("forceAudioMutedAll" === n.type && n.roomId === roomId) {
                        t = jQEngager.Event("ForceAudioMutedAll");
                        jQEngager(document).trigger(t)
                    }
                    if ("forceDelete" === n.type && n.roomId === roomId) {
                        connection.leave();
                        t = jQEngager.Event("ForceDelete", {sessionId: n.sessionId});
                        jQEngager(document).trigger(t)
                    }
                    if ("forceDeleteAll" === n.type && sessionId !== n.sessionId && n.roomId === roomId) {
                        connection.leave();
                        t = jQEngager.Event("ForceDeleteAll");
                        jQEngager(document).trigger(t)
                    }
                    if ("setPresent" === n.type && n.roomId === roomId) {
                        t = jQEngager.Event("SetPresent", {sessionId: n.sessionId, present: n.present});
                        jQEngager(document).trigger(t)
                    }
                    if ("endMeeting" === n.type && n.roomId === roomId) {
                        t = jQEngager.Event("EndMeeting", {sessionId: n.sessionId});
                        jQEngager(document).trigger(t)
                    }
                    if ("adminOnline" === n.type && n.roomId === roomId) {
                        t = jQEngager.Event("AdminOnline");
                        jQEngager(document).trigger(t)
                    }
                    if ("toVideo" === n.type && sessionId !== n.sessionId && n.roomId === roomId) {
                        t = jQEngager.Event("ToVideo");
                        jQEngager(document).trigger(t)
                    }
                    if ("startRecording" === n.type && sessionId !== n.sessionId && n.roomId === roomId) {
                        t = jQEngager.Event("RemoteStartRecording");
                        jQEngager(document).trigger(t)
                    }
                    if ("stopRecording" === n.type && sessionId !== n.sessionId && n.roomId === roomId) {
                        t = jQEngager.Event("RemoteStopRecording");
                        jQEngager(document).trigger(t)
                    }
                    if ("rejectCall" === n.type && sessionId !== n.sessionId && n.roomId === roomId) {
                        var o = visitorRinging.indexOf(n.sessionId);
                        if (-1 !== o && visitorRinging.splice(o, 1), 0 == visitorRinging.length) {
                            t = jQEngager.Event("CallEnded");
                            jQEngager(document).trigger(t)
                        }
                    }
                    if ("setCallerInfo" === n.type && sessionId !== n.sessionId && n.roomId === roomId) {
                        t = jQEngager.Event("CallerInfo", {
                            sessionId: n.sessionId,
                            callerInfo: n.callerInfo,
                            isAdmin: n.isAdmin
                        });
                        jQEngager(document).trigger(t)
                    }
                    if ("clearCanvas" === n.type && sessionId !== n.sessionId && n.roomId === roomId && lsDesigner && lsDesigner.clearCanvas(), "sendCallerBack" === n.type && n.roomId === roomId) {
                        t = jQEngager.Event("SendCallerBack", {access: n.access, sessionId: n.sessionId});
                        jQEngager(document).trigger(t)
                    }
                    if (n.participants && videoConnection && !videoConnection.isInitiator && !videoConnection.extra.broadcaster && n.roomId == roomId && n.participants.forEach(function (e) {
                        e.pid !== videoConnection.userid && -1 === videoConnection.getAllParticipants().indexOf(e.pid) && (videoConnection.extra.broadcaster || !1 !== e.broadcaster) && videoConnection.join(e.pid, function (e, n, t) {
                        })
                    }), n.giveAllParticipants && videoConnection && videoConnection.isInitiator && n.roomId == roomId) {
                        var i = [];
                        videoConnection.getAllParticipants().forEach(function (e) {
                            i.push({pid: e, broadcaster: !0 === videoConnection.peers[e].extra.broadcaster})
                        }), connection.socket.emit(connection.socketCustomEvent, {participants: i}), toggleError(smartVideoLocale.msgStore.broadcastViewers + " " + i.length, 5e3), $("#wd-widget-content-whiteboard").is(":visible") && lsDesigner && lsDesigner.sync()
                    }
                }), connection.checkPresence(roomId, function (e, n) {
                    !0 === e ? connection.join(roomId, function (e, n, t) {
                        queryString.isAdmin && socket.emit(connection.socketCustomEvent, {
                            type: "adminOnline",
                            role: "popup",
                            sessionId: sessionId,
                            roomId: roomId
                        }), svConfigs.videoScreen.enableLogs && console.log("joined to " + n), t && location.reload()
                    }) : connection.open(roomId, function (e, n, t) {
                        queryString.isAdmin && socket.emit(connection.socketCustomEvent, {
                            type: "adminOnline",
                            role: "popup",
                            sessionId: sessionId,
                            roomId: roomId
                        }), t && location.reload()
                    }), "admin" === role && (connection.isInitiator = !0)
                })
            })
        }, this.renegotiate = function (e) {
            facingMode = "user" === facingMode ? "environment" : "user", navigator.mediaDevices.getUserMedia({
                video: {facingMode: facingMode},
                audio: audio_on
            }).then(function (e) {
                !function (e, n) {
                    n ? videoConnection.lastCamera || (videoConnection.lastCamera = videoConnection.attachStreams[0]) : videoConnection.lastCamera = e;
                    videoConnection.getAllParticipants().forEach(function (n) {
                        var t = videoConnection.peers[n].peer;
                        if (t.getSenders) {
                            var o = e.clone().getVideoTracks()[0], i = e.clone().getAudioTracks()[0];
                            t.getSenders().forEach(function (e) {
                                e && e.track && ("video" === e.track.kind && o ? (e.track.id != o.id && e.replaceTrack(o), o = null) : "audio" === e.track.kind && i && (e.track.id != i.id && e.replaceTrack(i), i = null))
                            })
                        }
                    })
                }(e)
            }), videoConnection.streamEvents.selectAll({local: !0}).forEach(function (e) {
                e.stream.isAudio && e.stream.getAudioTracks()[0].stop(), e.stream.isVideo && e.stream.getVideoTracks()[0].stop()
            }), videoConnection.attachStreams.forEach(function (e) {
                e.stop()
            }), streamConstraints = {
                video: e ? {deviceId: {exact: e}} : {facingMode: facingMode},
                audio: audio_on
            }, videoConnection.mediaConstraints = streamConstraints, videoConnection.session = {
                video: !0,
                audio: audio_on
            }, videoConnection.join(roomId + "_video")
        }, this.initCall = function (n, t, o, i, r, a, s) {
            videoConnection.extra.roomOwner = !0;
            var d = n || ("initVideo" === this.id ? "Video" : "Audio"), c = r ? {deviceId: {exact: r}} : {};
            audio_on || (c = !1), s && jQEngager.extend(!0, c, s);
            var l = o ? {deviceId: {exact: o}} : {facingMode: facingMode};
            switch (a && jQEngager.extend(!0, l, a), d) {
                case"Video":
                    var u = !0;
                    streamConstraints = {video: l, audio: c};
                    break;
                case"Audio":
                    u = !1, streamConstraints = {audio: c, video: !1};
                    break;
                default:
                    u = !0, streamConstraints = {video: l, audio: c}
            }
            if (queryString.broadcast) {
                var m = function () {
                    queryString.isAdmin && svConfigs.videoScreen.videoFileStream ? (videoConnection.dontCaptureUserMedia = !0, videoConnection.attachStreams = [localVideoStream], videoConnection.extra.broadcaster = !0, videoConnection.openOrJoin(roomId + "_video", function (e, n, t) {
                        if (t) console.error("openOrJoin", t, n); else {
                            var o = jQEngager.Event("LocalVideoStarted");
                            jQEngager(document).trigger(o)
                        }
                    })) : (videoConnection.session = {
                        audio: !(!queryString.isAdmin && !localStorage.getItem("hasPrivileges")),
                        video: !!queryString.isAdmin,
                        broadcast: !0
                    }, videoConnection.mediaConstraints = {
                        audio: !(!queryString.isAdmin && !localStorage.getItem("hasPrivileges")) && c,
                        video: !!queryString.isAdmin && l
                    }, queryString.isAdmin || localStorage.getItem("hasPrivileges") ? (videoConnection.extra.broadcaster = !0, videoConnection.openOrJoin(roomId + "_video", function (e, n, t) {
                        t && console.error("openOrJoin", t, n)
                    })) : (videoConnection.extra.roomOwner = !1, e.joinBroadcastLooper()))
                };
                if (svConfigs.videoScreen.videoFileStream) {
                    var g = document.getElementById("localVideo");

                    function f() {
                        localVideoStream || (g.captureStream ? (localVideoStream = g.captureStream(), m()) : g.mozCaptureStream && (localVideoStream = g.mozCaptureStream(), m()))
                    }

                    g.setAttribute("volume", 0), g.setAttribute("autoplay", ""), g.setAttribute("muted", ""), g.setAttribute("loop", ""), g.setAttribute("playsinline", ""), g.setAttribute("src", svConfigs.videoScreen.videoFileStream), g.oncanplay = f, g.readyState >= 3 && f();
                    var v = g.play();
                    void 0 !== v && v.then(function () {
                        g.play()
                    }).catch(function (e) {
                        toggleError(smartVideoLocale.msgStore.videoFormatNotAllowed, 5e3)
                    })
                } else m()
            } else {
                videoConnection.DetectRTC.load(function () {
                    var n = [];
                    if (videoConnection.DetectRTC.videoInputDevices.forEach(function (e) {
                        var t = {};
                        t.value = e.id, t.text = e.label, n.push(t)
                    }), 0 === videoConnection.DetectRTC.videoInputDevices.length) {
                        var o = jQEngager.Event("VideoRemoved");
                        jQEngager(document).trigger(o), socket.emit(connection.socketCustomEvent, {
                            type: "remoteVideoMuted",
                            role: role,
                            tenant: tenant,
                            sessionId: i,
                            roomId: roomId
                        })
                    }
                    if (0 === videoConnection.DetectRTC.audioInputDevices.length) {
                        o = jQEngager.Event("AudioRemoved");
                        jQEngager(document).trigger(o), socket.emit(connection.socketCustomEvent, {
                            type: "remoteAudioMuted",
                            role: role,
                            tenant: tenant,
                            sessionId: i,
                            roomId: roomId
                        })
                    }
                    if (videoConnection.DetectRTC.videoInputDevices) {
                        o = jQEngager.Event("MediaDevices", {devices: n});
                        jQEngager(document).trigger(o)
                    }
                    streamConstraints.video = video_on ? streamConstraints.video : streamConstraints.video = !1, streamConstraints.audio = audio_on ? streamConstraints.audio : streamConstraints.audio = !1, videoConnection.mediaConstraints = streamConstraints, videoConnection.session = {
                        video: !!video_on && u,
                        audio: audio_on
                    }, video_on || (videoConnection.session.oneway = !0), videoConnection.checkPresence(roomId + "_video", function (n, o) {
                        if (!0 === n ? videoConnection.join(roomId + "_video", function (n, t, o) {
                            o && (e.handleCallTermination(), videoConnection.closeEntireSession(function () {
                                videoConnection.openOrJoin(roomId + "_video")
                            }))
                        }) : videoConnection.open(roomId + "_video", function (n, t, o) {
                            o && (svConfigs.videoScreen.enableLogs && console.log(o), e.handleCallTermination(), videoConnection.closeEntireSession(function () {
                                videoConnection.openOrJoin(roomId + "_video")
                            }))
                        }), !video_on) {
                            var r = jQEngager.Event("LocalVideoStarted");
                            jQEngager(document).trigger(r)
                        }
                        "simple" == conferenceStyle && socket.emit(connection.socketCustomEvent, {
                            type: "initCall",
                            role: role,
                            tenant: tenant,
                            autoaccept: t,
                            sessionId: i,
                            roomId: roomId
                        }), connection.getAllParticipants().forEach(function (e) {
                            visitorRinging.push(e)
                        })
                    })
                })
            }
        }, this.leave = function () {
            connection.getAllParticipants().forEach(function (e) {
                connection.disconnectWith(e)
            })
        }, this.customerHere = function (e) {
            socket.emit(connection.socketCustomEvent, {
                type: "customerHere",
                name: e,
                role: role,
                tenant: tenant,
                sessionId: sessionId,
                roomId: roomId
            })
        }, this.customerOut = function (e) {
            socket.emit(connection.socketCustomEvent, {
                type: "customerOut",
                name: e,
                role: role,
                tenant: tenant,
                sessionId: sessionId,
                roomId: roomId
            })
        }, this.toggleAudio = function () {
            var e = 1, n = 1;
            videoConnection.attachStreams.forEach(function (t) {
                t.getAudioTracks().forEach(function (t) {
                    e = t.enabled = !t.enabled, n = 0
                })
            }), 1 == n && (videoConnection.mediaConstraints.audio = !0, videoConnection.addStream({audio: !0}));
            var t = e ? "AudioUnmuted" : "AudioMuted", o = e ? "remoteAudioUnmuted" : "remoteAudioMuted",
                i = jQEngager.Event(t);
            jQEngager(document).trigger(i), socket.emit(connection.socketCustomEvent, {
                type: o,
                role: role,
                tenant: tenant,
                sessionId: sessionId,
                roomId: roomId
            })
        }, this.toggleVideo = function () {
            var e = 1, n = 1;
            videoConnection.attachStreams.forEach(function (t) {
                t.getVideoTracks().forEach(function (t) {
                    e = t.enabled = !t.enabled, n = 0
                })
            }), 1 == n && (videoConnection.mediaConstraints.video = !0, videoConnection.addStream({video: !0}), videoConnection.session.oneway = !1);
            var t = e ? "VideoUnmuted" : "VideoMuted", o = e ? "remoteVideoUnmuted" : "remoteVideoMuted",
                i = jQEngager.Event(t);
            jQEngager(document).trigger(i), socket.emit(connection.socketCustomEvent, {
                type: o,
                role: role,
                tenant: tenant,
                sessionId: sessionId,
                roomId: roomId
            })
        }, this.joinBroadcast = function () {
            videoConnection.streamEvents.selectAll({local: !0}).forEach(function (e) {
                e.stream.isAudio && e.stream.getAudioTracks()[0].stop(), e.stream.isVideo && e.stream.getVideoTracks()[0].stop()
            }), videoConnection.attachStreams.forEach(function (e) {
                e.stop()
            }), videoConnection.mediaConstraints.video = svConfigs.videoScreen.broadcastAttendeeVideo, videoConnection.mediaConstraints.audio = !0, videoConnection.addStream({
                video: svConfigs.videoScreen.broadcastAttendeeVideo,
                audio: !0
            }), videoConnection.session.oneway = !1, svConfigs.videoScreen.allowOtherSee && (videoConnection.extra.broadcaster = !0, videoConnection.openOrJoin(roomId + "_video", function (e, n, t) {
                if (t) console.error("openOrJoin", t, n); else if (!videoConnection.isInitiator) {
                    var o = videoConnection.dontCaptureUserMedia;
                    videoConnection.dontCaptureUserMedia = !0, videoConnection.open(videoConnection.userid, function (e, n, t) {
                        t ? console.error("open", t, n) : (videoConnection.dontCaptureUserMedia = o, videoConnection.isInitiator = !1)
                    })
                }
            }))
        }, this.revokeBroadcast = function () {
            videoConnection.streamEvents.selectAll({local: !0}).forEach(function (e) {
                e.stream.isAudio && e.stream.getAudioTracks()[0].stop(), e.stream.isVideo && e.stream.getVideoTracks()[0].stop()
            }), videoConnection.attachStreams.forEach(function (e) {
                e.stop()
            }), videoConnection.mediaConstraints.video = !1, videoConnection.mediaConstraints.audio = !1, videoConnection.addStream({
                video: !1,
                audio: !1
            }), videoConnection.session.oneway = !0, document.getElementById("localVideo").srcObject = null
        }, this.answerCall = function (n, t, o, i, r, a) {
            var s = i ? {deviceId: {exact: i}} : {};
            if (a && jQEngager.extend(!0, s, a), n) var d = o ? {deviceId: {exact: o}} : {facingMode: facingMode}; else d = !1;
            r && jQEngager.extend(!0, d, r), streamConstraints = {video: d, audio: s}, videoConnection.session = {
                video: n,
                audio: !0
            }, videoConnection.mediaConstraints = streamConstraints, t && setTimeout(function () {
                videoConnection.openOrJoin(roomId + "_video", function (n, t, o) {
                    o && (e.handleCallTermination(), location.reload())
                })
            }, 200)
        }, this.startStopIphone = function () {
            facingMode = "user" === facingMode ? "environment" : "user", e.forceStopCall()
        }, this.forceStopCall = function () {
            videoConnection.streamEvents.selectAll({local: !0}).forEach(function (n) {
                n.stream && n.stream.isAudio && n.stream.getAudioTracks().length > 0 && (n.stream.getAudioTracks()[0].stop(), e.getTracks(n.stream, "audio").forEach(function (e) {
                    n.stream.removeTrack(e)
                }), e.getTracks(n.stream, "audio").forEach(function (e) {
                    n.stream.removeTrack(e)
                })), n.stream && n.stream.isVideo && n.stream.getVideoTracks().length > 0 && (n.stream.getVideoTracks()[0].stop(), e.getTracks(n.stream, "video").forEach(function (e) {
                    n.stream.removeTrack(e)
                }), e.getTracks(n.stream, "video").forEach(function (e) {
                    n.stream.removeTrack(e)
                }))
            }), videoConnection.attachStreams.forEach(function (e) {
                e.stop()
            }), videoConnection.leave(), document.getElementById("localVideo").srcObject = null, streamConstraints = {
                video: {facingMode: facingMode = "user" === facingMode ? "environment" : "user"},
                audio: audio_on
            }, videoConnection.mediaConstraints = streamConstraints, videoConnection.session = {
                video: video_on,
                audio: audio_on
            };
            var n = function () {
                videoConnection.getAllParticipants().forEach(function (e) {
                    var n, t, o = videoConnection.peers[e].peer;
                    o.getSenders && (videoConnection.streamEvents.selectAll({local: !0}).forEach(function (e) {
                        e.stream.isAudio && (t = e.stream.getAudioTracks()[0]), e.stream.isVideo && (n = e.stream.getVideoTracks()[0])
                    }), o.getSenders().forEach(function (e) {
                        e && e.track && ("video" === e.track.kind && n ? (e.track.id != n.id && e.replaceTrack(n), n = null) : "audio" === e.track.kind && t && (e.track.id != t.id && e.replaceTrack(t), t = null))
                    }))
                })
            };
            videoConnection.checkPresence(roomId, function (e, t) {
                !0 === e ? videoConnection.join(roomId + "_video", function (e, t, o) {
                    n()
                }) : connection.open(roomId + "_video", function (e, t, o) {
                    n()
                })
            })
        }, this.handleCallTermination = function () {
            videoConnection && "conference" != conferenceStyle && (videoConnection.streamEvents.selectAll({local: !0}).forEach(function (n) {
                n.stream.isAudio && (n.stream.getAudioTracks()[0].stop(), e.getTracks(n.stream, "audio").forEach(function (e) {
                    n.stream.removeTrack(e)
                })), n.stream.isVideo && (n.stream.getVideoTracks()[0].stop(), e.getTracks(n.stream, "video").forEach(function (e) {
                    n.stream.removeTrack(e)
                }))
            }), videoConnection.attachStreams.forEach(function (e) {
                e.stop()
            }), 0 == videoConnection.getAllParticipants().length ? videoConnection.closeSocket() : videoConnection.leave())
        }, this.reconnectWebsocket = function (n) {
            forceClose || (svConfigs.videoScreen.enableLogs && console.log("WebSocketClient reconnecting in " + autoReconnectInterval, n), setTimeout(function () {
                svConfigs.videoScreen.enableLogs && console.log("WebSocketClient: reconnecting..."), e.connect()
            }, autoReconnectInterval))
        }, this.getRoomId = function () {
            return roomId
        }, this.checkMediaDevices = function () {
            videoConnection.DetectRTC.load(function () {
                var e = [];
                videoConnection.DetectRTC.videoInputDevices.forEach(function (n) {
                    var t = {};
                    t.value = n.id, t.text = n.label, e.push(t)
                });
                var n = jQEngager.Event("MediaDevices", {devices: e});
                jQEngager(document).trigger(n)
            })
        }, this.getParticipants = function () {
            return connection.getAllParticipants()
        }, this.getVideoSessions = function () {
            return videoConnection ? videoConnection.getAllParticipants().length : 0
        }, this.getTracks = function (e, n) {
            return e && e.getTracks ? e.getTracks().filter(function (e) {
                return e.kind === (n || "audio")
            }) : []
        }, this.addStreamStopListener = function (e, n) {
            e.addEventListener("ended", function () {
                n(), n = function () {
                }
            }, !1), e.addEventListener("inactive", function () {
                n(), n = function () {
                }
            }, !1), e.getTracks().forEach(function (e) {
                e.addEventListener("ended", function () {
                    n(), n = function () {
                    }
                }, !1), e.addEventListener("inactive", function () {
                    n(), n = function () {
                    }
                }, !1)
            })
        }, this.addToJoinScreenShare = function () {
            screenConnection && screenConnection.checkPresence(roomId + "_screen", function (e, n, t) {
                setTimeout(function () {
                    screenConnection.isInitiator = !1, screenConnection.extra.sessionId !== sessionId && (screenConnection.extra = {sessionId: sessionId}), e && screenConnection.join(roomId + "_screen", function (e, n, t) {
                        t && console.error("join", t, roomId + "_screen")
                    })
                }, 1e3)
            })
        }, this.startScreenShareConf = function () {
            e.startScreenConnection(!0, sessionId)
        }, this.screenHelper = function (e) {
            if (svConfigs.videoScreen.screenConstraint) var n = svConfigs.videoScreen.screenConstraint; else n = {
                mandatory: {
                    maxWidth: screen.width > 1920 ? screen.width : 1920,
                    maxHeight: screen.height > 1080 ? screen.height : 1080
                }, optional: []
            };
            navigator.mediaDevices.getDisplayMedia ? navigator.mediaDevices.getDisplayMedia(n).then(n => {
                e(n)
            }, e => {
                var n = jQEngager.Event("ScreenShareEnded");
                jQEngager(document).trigger(n)
            }) : navigator.getDisplayMedia ? navigator.getDisplayMedia(n).then(n => {
                e(n)
            }, e => {
                var n = jQEngager.Event("ScreenShareEnded");
                jQEngager(document).trigger(n)
            }) : toggleNotification("getDisplayMedia API is not available in this browser.", !0)
        };
        var n = !1;
        this.getScreenStream = function (t) {
            e.screenHelper(function (o) {
                RMCMediaTrack.screen = e.getTracks(o, "video")[0], RMCMediaTrack.selfVideo.srcObject = o, function e() {
                    "ended" !== RMCMediaTrack.screen.readyState ? setTimeout(e, 1e3) : RMCMediaTrack.screen.onended()
                }(), n = !1, RMCMediaTrack.screen.onended = function () {
                    e.handleScreenShareTermination()
                }, t(o)
            })
        }, this.replaceTrack = function (e) {
            e && "ended" !== e.readyState && videoConnection.getAllParticipants().forEach(function (n) {
                var t = videoConnection.peers[n].peer;
                if (t.getSenders) {
                    var o = e;
                    t.getSenders().forEach(function (e) {
                        e && e.track && "video" === e.track.kind && o && (e.replaceTrack(o), o = null)
                    })
                }
            })
        }, this.startScreenShare = function () {
            RMCMediaTrack.cameraStream ? e.getScreenStream(function (n) {
                videoConnection.getAllParticipants().length > 0 && e.replaceTrack(RMCMediaTrack.screen), videoConnection.attachStreams.forEach(function (n) {
                    e.getTracks(n, "video").forEach(function (e) {
                        n.removeTrack(e)
                    }), n.addTrack(RMCMediaTrack.screen)
                })
            }) : (videoConnection.mediaConstraints.screen = !0, videoConnection.addStream({
                video: !0,
                screen: !0
            }), videoConnection.extra.screen = !0), socket.emit(connection.socketCustomEvent, {
                type: "startScreenshare",
                role: role,
                tenant: tenant,
                sessionId: sessionId,
                roomId: roomId
            })
        },
            this.rejectCall = function () {
                socket.emit(connection.socketCustomEvent, {
                    type: "rejectCall",
                    role: role,
                    tenant: tenant,
                    sessionId: sessionId,
                    roomId: roomId
                })
            },
            this.stopRecording = function () {
            },
            this.getSessionId = function () {
                return sessionId
            },
            this.getRemoteSessionId = function () {
                return ""
            },
            this.getVideoStream = function () {
            var e = !1;
            return videoConnection ? videoConnection.attachStreams.forEach(function (n) {
                n.getVideoTracks().forEach(function (n) {
                    e = n.enabled
                })
            }) : e = !1, e
        }, this.getStream = function () {
            return !!videoConnection && videoConnection.getAllParticipants().length > 0
        }, this.getRemoteStream = function (e) {
            var n;
            return videoConnection && Object.keys(videoConnection.streamEvents).forEach(function (t) {
                var o = videoConnection.streamEvents[t];
                if (o.stream && o.extra.sessionId == e) return n = o.stream, !1
            }), n
        }, this.endCall = function (n) {
            socket.emit(connection.socketCustomEvent, {
                type: "endCall",
                role: role,
                tenant: tenant,
                sessionId: sessionId,
                roomId: roomId,
                msg: n
            }), videoConnection && (videoConnection.streamEvents.selectAll({local: !0}).forEach(function (n) {
                n.stream.isAudio && (n.stream.getAudioTracks()[0].stop(), e.getTracks(n.stream, "audio").forEach(function (e) {
                    n.stream.removeTrack(e)
                })), n.stream.isVideo && (n.stream.getVideoTracks()[0].stop(), e.getTracks(n.stream, "video").forEach(function (e) {
                    n.stream.removeTrack(e)
                }))
            }), videoConnection.leave())
        }, this.setMute = function (e) {
            socket.emit(connection.socketCustomEvent, {
                type: "forceAudioMuted",
                role: role,
                tenant: tenant,
                sessionId: e,
                roomId: roomId
            })
        }, this.setMuteAll = function () {
            socket.emit(connection.socketCustomEvent, {
                type: "forceAudioMutedAll",
                role: role,
                tenant: tenant,
                roomId: roomId
            })
        }, this.setDelete = function (e) {
            socket.emit(connection.socketCustomEvent, {
                type: "forceDelete",
                role: role,
                tenant: tenant,
                sessionId: e,
                roomId: roomId
            })
        }, this.setClose = function () {
            forceClose = !0, connection.closeEntireSession()
        }, this.setPresentUser = function (e, n) {
            socket.emit(connection.socketCustomEvent, {
                type: "setPresent",
                role: role,
                tenant: tenant,
                present: n,
                sessionId: e,
                roomId: roomId
            })
        }, this.setDeleteAll = function (e) {
            socket.emit(connection.socketCustomEvent, {
                type: "forceDeleteAll",
                role: role,
                tenant: tenant,
                sessionId: e,
                roomId: roomId
            })
        }, this.revokePriveleges = function (e) {
            socket.emit(connection.socketCustomEvent, {
                type: "revokePriveleges",
                role: role,
                tenant: tenant,
                sessionId: e,
                roomId: roomId
            })
        }, this.blockUser = function (e) {
            socket.emit(connection.socketCustomEvent, {
                type: "blockUser",
                role: role,
                tenant: tenant,
                sessionId: e,
                roomId: roomId
            })
        }, this.endMeeting = function (e) {
            socket.emit(connection.socketCustomEvent, {
                type: "endMeeting",
                role: role,
                tenant: tenant,
                sessionId: e,
                roomId: roomId
            })
        }, this.toVideo = function () {
            socket.emit(connection.socketCustomEvent, {
                type: "toVideo",
                role: role,
                tenant: tenant,
                sessionId: sessionId,
                roomId: roomId
            })
        }, this.grantPriveleges = function (e) {
            socket.emit(connection.socketCustomEvent, {
                type: "grantPriveleges",
                role: role,
                tenant: tenant,
                sessionId: e,
                roomId: roomId
            })
        }, this.getScreenStreamConnections = function () {
            return !!screenConnection && screenConnection.getAllParticipants().length > 0
        }, this.startRecording = function () {
            socket.emit(connection.socketCustomEvent, {
                type: "startRecording",
                role: role,
                tenant: tenant,
                sessionId: sessionId,
                roomId: roomId
            })
        }, this.stopRecording = function () {
            socket.emit(connection.socketCustomEvent, {
                type: "stopRecording",
                role: role,
                tenant: tenant,
                sessionId: sessionId,
                roomId: roomId
            })
        }, this.setCallerInfo = function (e, n) {
            socket.emit(connection.socketCustomEvent, {
                type: "setCallerInfo",
                role: role,
                tenant: tenant,
                sessionId: sessionId,
                roomId: roomId,
                callerInfo: e,
                isAdmin: n
            }), connection.extra = {
                role: role,
                name: name,
                tenant: tenant,
                sessionId: sessionId,
                roomId: roomId,
                isAdmin: queryString.isAdmin || "admin" == role ? 1 : 0,
                pass: requirePassComm,
                callerInfo: e
            }
        }, this.sendCallerBack = function (e, n) {
            socket.emit(connection.socketCustomEvent, {
                type: "sendCallerBack",
                role: role,
                tenant: tenant,
                sessionId: n,
                roomId: roomId,
                access: e
            })
        }, this.handleScreenShareTermination = function () {
            if (queryString.broadcast || !svConfigs.videoScreen.separateScreenShare) {
                if (n) return;
                n = !0, RMCMediaTrack.cameraStream && (e.getTracks(RMCMediaTrack.cameraStream, "video")[0].readyState && (e.getTracks(RMCMediaTrack.cameraStream, "video").forEach(function (e) {
                    RMCMediaTrack.cameraStream.getVideoTracks()[0].stop(), RMCMediaTrack.cameraStream.removeTrack(e)
                }), RMCMediaTrack.cameraStream.addTrack(RMCMediaTrack.cameraTrack)), RMCMediaTrack.selfVideo.srcObject = RMCMediaTrack.cameraStream, e.replaceTrack(RMCMediaTrack.cameraTrack), videoConnection.attachStreams = [RMCMediaTrack.cameraStream]);
                var t = jQEngager.Event("ScreenShareEnded");
                jQEngager(document).trigger(t)
            } else {
                if (!screenConnection) return;
                screenConnection && screenConnection.streamEvents.selectAll({local: !0}).forEach(function (e) {
                    e.stream.getVideoTracks()[0].stop()
                }), screenConnection.attachStreams.forEach(function (e) {
                    e.stop()
                }), screenConnection.isInitiator = !1, screenConnection.extra = {sessionId: null}, screenConnection.closeSocket()
            }
        }, this.addLocalChat = function (e, n, t) {
            e && e.replace(/ /g, "").length && (connection.send({
                chatMessage: e,
                privateId: t,
                date: n,
                sessionId: sessionId
            }), connection.send({typing: !1}))
        }, this.sendTranslateMessage = function (e) {
            e && e.replace(/ /g, "").length && connection.send({translateMessage: e, sessionId: sessionId})
        }, this.sendTyping = function (e) {
            e ? connection.send({typing: !0}) : connection.send({typing: !1})
        }, this.getFileHTML = function (e) {
            return '<a href="' + (e.url || URL.createObjectURL(e)) + '" target="_blank" download="' + e.name + '">Download: <b>' + e.name + "</b></a>"
        }, this.getFullName = function (e) {
            var n = e;
            return connection.peers[e] && connection.peers[e].extra && connection.peers[e].extra.userFullName && (n = connection.peers[e].extra.userFullName), n
        }, this.sendFile = function (e) {
            recentFile = e, connection.getAllParticipants().length >= 1 && (recentFile.userIndex = 0, connection.send(recentFile, connection.getAllParticipants()[recentFile.userIndex]))
        }, this.setWhiteboardTools = function () {
            lsDesigner && (lsDesigner.destroy(), lsDesigner = null), e.startWhiteboard()
        }, this.whiteboardTools = function () {
            lsDesigner.setSelected("pencil"), lsDesigner.setTools({
                line: !0,
                arrow: !0,
                pencil: !0,
                marker: !0,
                dragSingle: !0,
                dragMultiple: !0,
                eraser: !0,
                pdf: !0,
                rectangle: !0,
                arc: !0,
                text: !0,
                image: !0,
                zoom: !0,
                lineWidth: !0,
                colorsPicker: !0,
                extraOptions: !0,
                undo: !0
            }), lsDesigner.icons = {
                pencil: lsRepUrl + "img/whiteboard/pencil.png",
                marker: lsRepUrl + "img/whiteboard/brush.png",
                eraser: lsRepUrl + "img/whiteboard/eraser.png",
                text: lsRepUrl + "img/whiteboard/text.png",
                image: lsRepUrl + "img/whiteboard/image.png",
                dragSingle: lsRepUrl + "img/whiteboard/dragSingle.png",
                dragMultiple: lsRepUrl + "img/whiteboard/dragMultiple.png",
                line: lsRepUrl + "img/whiteboard/line.png",
                arrow: lsRepUrl + "img/whiteboard/arrow.png",
                pdf: lsRepUrl + "img/whiteboard/pdf.png",
                zoom_in: lsRepUrl + "img/whiteboard/zoom_in.png",
                zoom_out: lsRepUrl + "img/whiteboard/zoom_out.png",
                arc: lsRepUrl + "img/whiteboard/arc.png",
                rectangle: lsRepUrl + "img/whiteboard/rectangle.png",
                lineWidth: lsRepUrl + "img/whiteboard/lineWidth.png",
                undo: lsRepUrl + "img/whiteboard/undo.png",
                colorsPicker: lsRepUrl + "img/whiteboard/colorsPicker.png",
                extraOptions: lsRepUrl + "img/whiteboard/extraOptions.png"
            }
        }, this.initHark = function (e) {
            if (!window.hark) throw"Please link hark.js";
            var n = e.connection, t = e.streamedObject, o = hark(e.stream, {});
            o.on("speaking", function () {
                n.onspeaking(t)
            }), o.on("stopped_speaking", function () {
                n.onsilence(t)
            })
        }, this.startWhiteboard = function () {
            if (!lsDesigner) {
                (lsDesigner = new CanvasDesigner).widgetHtmlURL = lsRepUrl + "pages/whiteboard.html", lsDesigner.widgetJsURL = lsRepUrl + "js/whiteboard.widget.js", queryString.isAdmin || svConfigs.whiteboard.allowAnonymous || localStorage.getItem("hasPrivileges") ? (e.whiteboardTools(), lsDesigner.addSyncListener(function (e) {
                    connection.send({width: screen.width, whiteboardData: e})
                })) : (lsDesigner.setTools({}), lsDesigner.setSelected("")), lsDesigner.pointsLength <= 0 && setTimeout(function () {
                    connection.send("plz-sync-points")
                }, 1e3);
                var n = document.getElementById("whiteboard_canvas");
                lsDesigner.appendTo(n)
            }
            setTimeout(function () {
                lsDesigner.sync()
            }, 2e3)
        }, this.clearCanvas = function () {
            lsDesigner ? (lsDesigner.clearCanvas(), socket.emit(connection.socketCustomEvent, {
                type: "clearCanvas",
                role: role,
                tenant: tenant,
                sessionId: sessionId,
                roomId: roomId
            })) : e.startWhiteboard(), setTimeout(function () {
                lsDesigner.sync()
            }, 2e3)
        }, this.showStatusBar = function (e, n) {
            jQEngager("#statusbar").html(e), jQEngager("#statusbar").show(), setTimeout(function () {
                jQEngager("#statusbar").hide()
            }, n)
        }
    }, uiHandler = function () {
        var e, n, t = this;
        this.init = function (t, o, i) {
            e = t, o, n = i
        }, this.setMobileChatOnly = function () {
            (isAndroid || isiPhone) && e(".wd-v-share").hide(), t.displayChatOnly()
        }, this.setVideoBoxOff = function (n) {
            audio_on = !1, video_on = !1, t.setMuteButton(), t.setVideoButton(), e("#wd-widget-content-" + n + " .wd-video-box-on").hide(), e("#wd-widget-content-video-ringing").hide(), e("#wd-widget-content-video-waiting").hide(), e("#unsupported_div").show()
        }, this.toggleHeaderChat = function (n) {
            e(".header-auido-video").hide()
        }, this.displayScreenShare = function () {
            svConfigs.videoScreen && !0 === svConfigs.videoScreen.chat ? (e(".wd-chat-box").show(), e(".wd-video-box").css("width", "70%"), e(".wd-chat-box").css("width", "30%")) : (e(".wd-chat-box").hide(), e(".wd-video-box").css("width", "100%"), e(".wd-video-box").css("border-right", 0)), e(".wd-avatar-agent").hide(), e("#mainleft_div").show(), e("#wd-widget-content-whiteboard").hide(), e("#wd-widget-content-video").show()
        }, this.displayVideoOnly = function () {
            "simple" == conferenceStyle && svConfigs.videoScreen && !0 === svConfigs.videoScreen.chat ? (e(".wd-chat-box").show(), e(".wd-video-box").css("width", "70%"), e(".wd-chat-box").css("width", "30%")) : (e(".wd-chat-box").hide(), e(".wd-video-box").css("width", "100%"), e(".wd-video-box").css("border-right", 0)), e("#mainleft_div").show(), e("#wd-widget-content-whiteboard").hide(), e("#wd-widget-content-video").show(), e("." + classVideo).each(function () {
                var n = this.id;
                e("#" + n).detach().appendTo("#" + videoElementContainer), e("#" + n).removeClass("smallvideo")
            })
        }, this.displayChatOnly = function () {
            n.getStream(n.getRemoteSessionId()) ? (e("#call_audio_video").hide(), e("#slide_video").show()) : (e("#slide_video").hide(), svConfigs.videoScreen && (!1 === svConfigs.videoScreen.onlyAgentButtons || queryString.isAdmin) && e("#call_audio_video").show()), svConfigs.videoScreen && !0 === svConfigs.videoScreen.chat ? e(".wd-v-text").hide() : e(".wd-v-text").show(), e("#mainleft_div").hide(), e(".wd-chat-box").show(), e(".wd-chat-box").css("width", "100%"), e("#wd-widget-content-whiteboard").hide()
        }, this.restoreVideoBox = function () {
            "conference" == conferenceStyle ? (e("#wd-widget-content-greenroom").hide(), e("#wd-widget-content-prev").hide(), isAndroid || isiPhone || (stopFullScreenPopup(), e("#invideo").attr("style", "")), e("#invideo").show(), e(".wd-video-c").hide()) : (e("#call_audio_video").hide(), isAndroid || isiPhone || (stopFullScreenPopup(), e("#mainleft_div").attr("style", "")), e("#mainleft_div").show())
        }, this.syncVideoChatPanelsPos = function () {
            var n = e("#newdev_video"), t = e("#newdev_chat");
            e("#newdev_video").is(":visible") ? (panel_xpos = n.css("left"), panel_ypos = n.css("top"), t.css("left", panel_xpos), t.css("top", panel_ypos)) : e("#newdev_chat").is(":visible") && (panel_xpos = t.css("left"), panel_ypos = t.css("top"), n.css("left", panel_xpos), n.css("top", panel_ypos))
        }, this.setScreenDisabled = function (n) {
            n ? (e(".wd-v-share").addClass("disabled"), e("#screenshare_div").addClass("disabled"), "simple" == conferenceStyle ? e("." + classVideo).each(function () {
                var n = this.id;
                e("#" + n).detach().appendTo("#small_video"), e("#" + n).addClass("smallvideo")
            }) : e(".bigvideo").hide()) : (e(".wd-v-share").removeClass("disabled"), e("#screenshare_div").removeClass("disabled"), "simple" == conferenceStyle ? e("." + classVideo).each(function () {
                var n = this.id;
                e("#" + n).detach().appendTo("#" + videoElementContainer), e("#" + n).removeClass("smallvideo")
            }) : (e(".bigvideo").show(), e(".sourcevideo").show()))
        }, this.setDisabled = function (n) {
            n ? (e("#raisehand_div").addClass("disabled"), e("#exit_meeting").addClass("disabled"), e("#call_video").addClass("disabled"), e("#call_audio").addClass("disabled"), e("#file_transfer").addClass("disabled"), e("#startscreenshare").addClass("disabled"), e("#callButton_1").addClass("disabled"), e("#callAudioButton_1").addClass("disabled"), e("#newdev_chat_message1").addClass("disabled"), e("#whiteboard").addClass("disabled"), e("#startVideoButton").addClass("disabled"), e(".startVideoButton").addClass("disabled"), e("#answer_call_button").addClass("disabled"), e("#answer_audiocall_button").addClass("disabled"), e("#reject_call_button").addClass("disabled"), e(".wd-v-share").addClass("disabled")) : (e("#raisehand_div").removeClass("disabled"), e("#exit_meeting").removeClass("disabled"), e("#call_video").removeClass("disabled"), e("#call_audio").removeClass("disabled"), e("#startscreenshare").removeClass("disabled"), e("#file_transfer").removeClass("disabled"), (queryString.room || queryString.broadcast) && e("#callButton_1").removeClass("disabled"), queryString.room && e("#callAudioButton_1").removeClass("disabled"), e("#newdev_chat_message1").removeClass("disabled"), e("#whiteboard").removeClass("disabled"), e("#startVideoButton").removeClass("disabled"), e(".startVideoButton").removeClass("disabled"), e("#answer_call_button").removeClass("disabled"), e("#answer_audiocall_button").removeClass("disabled"), e("#reject_call_button").removeClass("disabled"), e(".wd-v-share").removeClass("disabled"))
        }, this.toggleWidget = function () {
            e("#nd_widget_content").toggle(), e(".agent-address-wd").hide(), e("#peer_email_video").toggle(!1)
        }, this.toggleVisitors = function (n) {
            e("#nd_widget_visitors").toggle(n)
        }, this.setAgentOnlyButtons = function () {
            e(".wd-v-pickupaudio").hide(), e(".wd-v-pickup").hide(), e(".wd-v-share").hide(), e(".header-auido-video").hide(), e("#screenshareLi").hide(), e("#snapshotLi").hide(), e("#recordingLi").hide(), e("#whiteboardLi").hide(), e("#cameraSwitch").hide()
        }, this.disableScreenShare = function () {
            e(".wd-v-share").hide(), e("#startscreenshare").hide()
        }, this.disableVideo = function () {
            e("#startVideoButton").hide(), e(".wd-v-pickup").hide(), e("#call_video").hide(), e("#answer_call_button").hide(), e(".muteVideo").prop("checked", !0), e(".muteVideo").hide(), e(".turnOffCamera").hide()
        }, this.disableAudio = function () {
            e(".wd-v-pickupaudio").hide(), e("#call_audio").hide(), e("#answer_audiocall_button").hide(), e(".muteAudio").prop("checked", !0), e(".muteAudio").hide(), e(".muteMe").hide()
        }, this.disableWhiteboard = function () {
            e("#whiteboard").hide()
        }, this.disableTransfer = function () {
            e("#file_transfer").hide()
        }, this.setVideoBox = function () {
            e("#recordingIcon").hide(), e("#newdev_video").show(), e("#mainleft_div").children().hide(), e("#video_container").show(), e("#video_container_oneway").hide(), e("#video_container_oneway_agent").hide(), e(".wd-v-nosound").removeClass("disabledDiv"), e("#video_back").show()
        }, this.setOneWay = function () {
            e("#localVideo").hide(), e("#video_container_oneway").show(), e("#local_video_div").hide(), e(".wd-v-video").attr("class", "wd-v-novideo"), e(".wd-v-novideo").addClass("disabledDiv"), e(".wd-v-sound").attr("class", "wd-v-nosound"), e(".wd-v-nosound").addClass("disabledDiv")
        }, this.togglePermissionError = function () {
            t.syncVideoChatPanelsPos(), t.togglePermissionWidget(!1), t.setVideoBox(), e("#permission_browsers_error").children().hide(), isChrome && e("#permission_div_error_chrome").show(), isFirefox && e("#permission_div_error_firefox").show(), e("#wd-widget-error").show(), t.setVideoButton()
        }, this.toggleInstaWhiteboard = function () {
            window.resizeTo(window.screen.availWidth, window.screen.availHeight), stopIncomingCall(), t.syncVideoChatPanelsPos(), e("#mainleft_div").show(), "simple" == conferenceStyle && svConfigs.videoScreen && !0 === svConfigs.videoScreen.chat ? (e(".wd-chat-box").show(), e(".wd-chat-box").css("width", "30%"), e(".wd-video-box").css("width", "70%"), e(".wd-video-box").css("border-right", 0), e(".wd-v-text").hide()) : (e(".wd-chat-box").hide(), e(".wd-video-box").css("width", "100%"), e(".wd-video-box").css("border-right", 0), e(".wd-v-text").show()), e("#wd-widget-content-whiteboard").show(), e("#wd-widget-content-chat-main").hide(), e("#wd-widget-content-video").hide(), e("#wd-avatar-agent").hide(), e("#video_container_chat").hide(), (queryString.isAdmin || localStorage.getItem("hasPrivileges")) && (e(".wd-v-tovideo").show(), e("#cleanCanvas").show()), e("." + classVideo).each(function () {
                var n = this.id;
                e("#" + n).detach().appendTo("#whiteboard_video"), e("#" + n).addClass("smallvideo")
            }), e(".bigvideo").each(function () {
                var n = this.id;
                e("#" + n).detach().appendTo("#whiteboard_video"), e("#" + n).addClass("smallvideo")
            }), e(".broadcastvideo").each(function () {
                e(this).detach().appendTo("#whiteboard_video"), e(this).addClass("smallvideo")
            })
        }, this.toggleInstaChat = function () {
            stopIncomingCall(), window.outerHeight == screen.availHeight && void 0 !== widgetSize ? stopFullScreenPopup() : stopFullScreen(), e(".wd-video-c").removeClass("disabled"), t.syncVideoChatPanelsPos(), t.togglePermissionWidget(!0), t.setVideoBox(), e("#recordingIcon").hide(), e("#wd-widget-content-chat-main").show(), e("#wd-avatar-agent").show(), svConfigs.videoScreen && !0 === svConfigs.videoScreen.chat ? e(".wd-v-text").hide() : e(".wd-v-text").show(), e(".wd-v-recording").hide(), e("#video_container_chat").hide(), e("#wd-widget-content-whiteboard").hide(), audio_on = video_on = !0, t.setVideoButton(), t.setMuteButton()
        }, this.toggleInstaChatScreen = function () {
            t.syncVideoChatPanelsPos(), t.togglePermissionWidget(!0), t.setVideoBox(), e("#wd-widget-content-chat-main").show(), e(".wd-avatar-agent").hide(), e("#video_container_chat").show(), e("#wd-widget-content-whiteboard").hide(), t.setVideoButton(), t.setMuteButton()
        }, this.onIncomingChat = function () {
            t.restoreVideoBox()
        }, this.onIncomingVideo = function () {
            t.restoreVideoBox()
        }, this.toggleRinging = function (n) {
            t.setMobileChatOnly(), t.displayVideoOnly(), e("#toggle_icon").removeClass("video"), e("#wd-widget-content-video").hide(), e("#wd-widget-content-chat-main").hide(), e("#wd-widget-content-video-waiting").hide(), e("#wd-widget-content-video-ringing").show(), e("#wd-widget-content-whiteboard").hide(), e("#answer_call_button").off(), e("#answer_audiocall_button").off(), e("#reject_call_button").off(), e("#answer_call_button").on("click", function () {
                video_on = !0, t.setVideoButton(), t.toggleVideoBox(!1), n(!0)
            }), e("#answer_audiocall_button").on("click", function () {
                isiPhone ? (video_on = !0, video_iphone_on = !1) : video_on = !1, t.setVideoButton(), n(!0), t.toggleVideoBox(!1)
            }), e("#reject_call_button").on("click", function () {
                n(!1), t.toggleInstaChat()
            })
        }, this.toggleVideoBox = function (n) {
            stopIncomingCall(), e("#wd-widget-content-chat-main").hide(), e("#wd-widget-content-greenroom").hide(), e("#wd-widget-content-prev").hide(), e("#wd-widget-content-video-ringing").hide(), e("#wd-widget-content-whiteboard").hide(), !0 === n ? (svConfigs.videoScreen && !0 === svConfigs.videoScreen.chat ? (e("#call_audio_video").hide(), e(".wd-v-text").hide()) : e(".wd-v-text").show(), e("#wd-widget-content-video").show(), e("#wd-widget-content-video-waiting").hide(), e("." + classVideo).each(function () {
                var n = this.id;
                e("#" + n).detach().appendTo("#" + videoElementContainer), e("#" + n).removeClass("smallvideo")
            })) : 4 == n ? (e(".wd-chat-box").hide(), e(".wd-video-box").css("width", "100%"), e(".wd-video-box").css("border-right", 0), e("#wd-widget-content-greenroom").show(), e("#wd-widget-content-video").hide(), e("#wd-widget-content-video-waiting").hide()) : (e("#wd-widget-content-video").hide(), e("#wd-widget-content-video-waiting").show(), "simple" == conferenceStyle && svConfigs.videoScreen && !0 === svConfigs.videoScreen.chat ? (e(".wd-chat-box").show(), e(".wd-video-box").css("width", "70%"), e(".wd-chat-box").css("width", "30%")) : (e(".wd-chat-box").hide(), e(".wd-video-box").css("width", "100%"), e(".wd-video-box").css("border-right", 0)))
        }, this.setWidgetValues = function () {
            e("#peer_name_video").html(peer_name), e(".peer_name_video").html(peer_name), e("#peer_name_chat").html(peer_name), e(".dw-chat-avatar").attr("src", peer_avatar), e("#peer_email_video").html(peer_email), e("#peer_email_chat").html(peer_email), e(".agent-address-wd a").attr("href", "mailto:" + peer_email), e("#peer_phone_video").html(peer_phone), e("#peer_phone_chat").html(peer_phone);
            var n = getCurrentTime();
            e("#timestamp").html(n), peer_avatar ? e("#nd_widget_content .peer_avatar").attr("src", peer_avatar) : e("#nd_widget_content .peer_avatar").attr("src", lsRepUrl + "img/small-avatar.jpg");
            var t = document.querySelector(".bg-site4");
            peer_background && null != t && (t.style.background = "url(" + peer_background + ") no-repeat center center", t.style.backgroundSize = "cover"), peer_logo && (e("#nd_widget_content .firm-logo-wd img").attr("src", peer_logo), e("#nd_widget_content .firm-logo-wd img").width(100), e("#nd_widget_content .firm-logo-wd img").height("auto")), e("#popup_widget_text").html(popup_message)
        }, this.toggleInstaVideo = function (e) {
            t.syncVideoChatPanelsPos(), t.setMuteButton(), t.setVideoBox(), t.setVideoButton(), t.toggleVideoBox(e)
        }, this.togglePermissionWidget = function (n, o, i) {
            isAndroid || (n ? (o ? e("#wd-widget-content-video-waiting").show() : e("#wd-widget-content-video-waiting").hide(), e("#permission_div").hide()) : (e("#wd-widget-content-chat-main").hide(), e("#wd-widget-content-video-waiting").hide(), t.permissionDisplay()))
        }, this.permissionDisplay = function () {
            var n = video_on ? "video" : "";
            e("#permission_browsers").children().hide(), e("#permission_div_span").show(), isChrome && e("#permission_div_chrome" + n).show(), isFirefox && e("#permission_div_firefox" + n).show(), isIEA && e("#permission_div_ie" + n).show(), e("#wd-widget-content-video-waiting").hide(), e("#permission_div").show()
        }, this.resetCallHoldState = function () {
            e("#on_hold").hide()
        }, this.setMuteButton = function () {
            audio_on ? (e(".wd-v-nosound").attr("class", "wd-v-sound"), e(".fa-microphone-slash").closest("a").addClass("active")) : (e(".wd-v-sound").attr("class", "wd-v-nosound"), e(".fa-microphone-slash").closest("a").removeClass("active"))
        }, this.setRecordingUi = function (n) {
            n ? (e(".wd-v-recording").removeClass("recording-off"), e(".wd-v-recording").addClass("recording-on"), e("#startRecording").addClass("active")) : (e(".wd-v-recording").removeClass("recording-on"), e(".wd-v-recording").addClass("recording-off"), e("#startRecording").removeClass("active"))
        }, this.setScreenButton = function (n) {
            !isChrome && !isFirefox || isAndroid || isiPhone || (n ? (e(".wd-v-share").hide(), e(".wd-v-stopshare").show(), e("#startscreenshare").hide(), e("#screensharestop_div").show()) : (e(".wd-v-share").show(), e(".wd-v-stopshare").hide(), e("#screensharestop_div").hide(), e("#startscreenshare").show()))
        }, this.setVideoButton = function () {
            video_on ? (e("#local_video_div").show(), e(".wd-v-novideo").attr("class", "wd-v-video"), e(".fa-video-camera").closest("a").addClass("active")) : (e("#local_video_div").hide(), e(".wd-v-video").attr("class", "wd-v-novideo"), e(".fa-video-camera").closest("a").removeClass("active"))
        }, this.showTranslateMessage = function (n) {
            e("#translate_message").css("width", e(".bigvideo.bigvideoadd").css("width")), e("#translate_message").css("bottom", e(".bigvideo.bigvideoadd").css("bottom")), e("#translate_message").show(), e("#translate_message").html(n)
        }, this.setLocalRemote = function (n) {
            e("#localVideo").removeClass("localvideo"), e("#localVideo").addClass(classVideo)
        }, this.setRemoteLocal = function (n) {
            e("#localVideo").removeClass(classVideo), e("#localVideo").addClass("localvideo")
        }, this.changeSpanPostition = function (n) {
            e("#remoteVideoSpan" + n).remove(), setTimeout(function () {
                var t = e(e("#" + n)).position();
                if (t && "localVideo" != n) {
                    var o = names[n] ? names[n].name : peer_name,
                        i = e("<h2 />", {id: "remoteVideoSpan" + n, class: "sourcevideospan"});
                    i.css("left", t.left), i.css("top", t.top), i.appendTo($("#video_container_small")), i.html(o)
                }
            }, 0)
        }, this.makeAllSmall = function () {
            e(".bigvideo").each(function () {
                if (e(this).is(":visible") && "conference" === svConfigs.videoScreen.videoContainerStyle) {
                    var n = e(this).attr("id");
                    e("#" + n).detach().appendTo("#video_container_small"), e("#" + n).removeClass("bigvideo"), e("#" + n).removeClass("bigvideoadd"), e("#" + n).addClass("sourcevideo")
                }
            }), t.changeSpanPositions()
        }, this.makeAllSmallGrid = function () {
            e(".bigvideogrid").each(function () {
                if (e(this).is(":visible") && "conference" === svConfigs.videoScreen.videoContainerStyle) {
                    var n = e(this).attr("id");
                    e("#remoteVideoSpan" + n).remove(), e("#" + n).detach().appendTo("#video_container_small"), e("#" + n).removeClass("bigvideogrid"), e("#" + n).removeClass("bigvideoadd"), e("#" + n).addClass("sourcevideo")
                }
            }), t.changeSpanPositions()
        }, this.changeSpanPositions = function () {
            e(".sourcevideospan").remove(), "list" == currentView ? (e(".bigvideo").each(function () {
                if (e(this).is(":visible") && "conference" === svConfigs.videoScreen.videoContainerStyle) {
                    var n = e(this).attr("id");
                    t.changeSpanPostition(n)
                }
            }), e(".sourcevideo").each(function () {
                if (e(this).is(":visible") && "conference" === svConfigs.videoScreen.videoContainerStyle) {
                    var n = e(this).attr("id");
                    t.changeSpanPostition(n)
                }
            })) : e(".bigvideogrid").each(function () {
                var n = e(this).attr("id");
                e("#" + n).css("height", "98%"), t.changeSpanPostition(n)
            })
        }, this.makeBig = function () {
            e(".sourcevideo").each(function () {
                var t = e(this).attr("id");
                e("#fullScreen").show(), e("#" + t).detach().appendTo("#video_container"), e("#" + t).removeClass("sourcevideo"), e("#" + t).addClass("bigvideo"), e("#" + t).addClass("bigvideoadd"), n.getVideoSessions() > 1 ? (e("#" + t).css("height", "85%"), e("#" + t).css("height", "85%")) : (e("#" + t).css("height", "98%"), e("#" + t).css("height", "98%"))
            }), t.changeSpanPositions()
        }, this.makeBigGrid = function () {
            e(".sourcevideo").each(function () {
                var n = e(this).attr("id");
                e("#" + n).css("height", "98%"), e("#" + n).css("height", "98%"), e("#remoteVideoSpan" + n).remove(), e("#fullScreen").show(), e("#" + n).detach().appendTo("#video_container_small"), e("#" + n).removeClass("sourcevideo"), e("#" + n).addClass("bigvideogrid"), e("#" + n).addClass("bigvideoadd")
            }), t.changeSpanPositions()
        }, this.changeView = function (n) {
            function o() {
                e(".fa-th-large").closest("a").addClass("active"), currentView = "grid", t.makeAllSmall(), e("#video_container_small").removeClass("video_container_small"), e("#video_container_small").addClass("video_container_grid"), e("#localVideo").detach().appendTo("#video_container_small"), e("#localVideo").prependTo("#video_container_small"), e("#localVideo").removeClass("localvideo"), e("#localVideo").removeClass("localvideo"), e("#localVideo").addClass("bigvideogrid"), e("#localVideo").addClass("bigvideoadd"), t.makeBigGrid()
            }

            function i() {
                e(".fa-th-large").closest("a").removeClass("active"), currentView = "list", t.makeAllSmallGrid(), e("#localVideo").detach().appendTo("#local_video_div"), e("#video_container_small").removeClass("video_container_grid"), e("#video_container_small").addClass("video_container_small"), e("#localVideo").addClass("localvideo"), e("#localVideo").removeClass("bigvideogrid"), e("#localVideo").removeClass("bigvideoadd"), e("#localVideo").removeClass("sourcevideo"), t.makeAllSmall()
            }

            "list" == currentView ? n ? o() : i() : n ? i() : o(), $(".video_container_small .sourcevideo").off("click"), $(".video_container_small .sourcevideo").on("click", function () {
                var n = e.Event("VoiceSpeaking", {id: this.id});
                e(document).trigger(n)
            }), localStorage.setItem("currentView", currentView)
        }
    }, notifyHandler = function () {
        var e = this;
        this.init = function () {
            e.isNotificationSupported() ? "granted" !== Notification.permission && Notification.requestPermission() : console.log("Your browser does not support Notifications.")
        }, jQEngager(document).on("EnterPageNotification", function (n) {
            if (!document.hasFocus()) {
                var t = n.name ? n.name : "Visitor", o = smartVideoLocale.msgStore.incomingText;
                o = o.replace("{{user}}", t), e.showNotification(o)
            }
        }), jQEngager(document).on("EnterCustomerNotification", function (n) {
            if (!document.hasFocus()) {
                var t = n.name ? n.name : "Visitor", o = smartVideoLocale.msgStore.userWaitingRoom;
                o = (o = o.replace("{{user}}", t)).replace("{{room}}", n.roomId), e.showNotification(o)
            }
        }), jQEngager(document).on("IncomingCall", function (n) {
            document.hasFocus() || e.showNotification("Visitor is calling you.")
        }), this.showNotification = function (n) {
            if (e.isNotificationSupported()) if ("granted" === Notification.permission) {
                var t = new Notification(n, {
                    icon: lsRepUrl + "/img/logo.png",
                    body: smartVideoLocale.msgStore.clickOpenPage,
                    vibrate: [500, 110, 500, 110, 500]
                });
                t.onclick = function () {
                    try {
                        window.focus()
                    } catch (e) {
                        console.log(e)
                    }
                }, setTimeout(t.close.bind(t), 1e4)
            } else "denied" !== Notification.permission && Notification.requestPermission().then(function (e) {
                "granted" === e && (t = new Notification("Hi there!"))
            }); else console.log("Your browser does not support Notifications. Use Latest Chrome/Safari to save the world.")
        }, this.requestPermissions = function () {
            "granted" !== Notification.permission && Notification.requestPermission()
        }, this.isNotificationSupported = function () {
            return "Notification" in window
        }
    }, popup_instance = null, names = [], popup_message = "", widgetSize = {width: 750, height: 564}, video_on = !0,
    audio_on = !0, isOnline = !1, remoteVideoSessions = 0, inCall = [], videoCurrentId = 0, audioCurrentId = 0,
    audioOutputCurrentId = 0, startNextCamera = !1, requirePass = !1, timerVars = [], startedRecroding = !1,
    is_widget_opened = !1, is_callerback = !1, is_chat_opened = !1, isLsvAdmin = !1, currentView = "list",
    main = function () {
        jQEngager = jQuery;
        var e = document.currentScript || document.getElementById("newdev-embed-script");
        if (null == e || null == e) {
            var n = document.getElementsByTagName("script"), t = n.length - 1;
            e = n[t]
        }
        jQuery(document).ready(function (n) {
            if (room = e.getAttribute("data-room_id") ? e.getAttribute("data-room_id") : queryString.room, lsRepUrl = e.getAttribute("data-source_path"), agentAvatar = peer_avatar = e.getAttribute("data-avatar") ? e.getAttribute("data-avatar") : lsRepUrl + "img/small-avatar.jpg", agentName = peer_name = e.getAttribute("data-names") ? e.getAttribute("data-names") : svConfigs.agentName, visitorName = e.getAttribute("data-visitorName") ? e.getAttribute("data-visitorName") : "", passRoom = e.getAttribute("data-pass") ? e.getAttribute("data-pass") : passRoom, datetime = e.getAttribute("data-datetime") ? e.getAttribute("data-datetime") : "", duration = e.getAttribute("data-duration") ? e.getAttribute("data-duration") : "", agentId = e.getAttribute("data-agentId") ? e.getAttribute("data-agentId") : "", isLsvAdmin = e.getAttribute("data-isAdmin") ? e.getAttribute("data-isAdmin") : queryString.isAdmin, (comm_controller = new comController).init("popup", room), (notify_handler = new notifyHandler).init(), localStorage.getItem("prd")) {
                var t = localStorage.getItem("prd");
                t = JSON.parse(t), queryString.isAdmin ? agentName = agentName || t.name : visitorName = visitorName || t.name
            } else agentName = agentName || "";
            localStorage.getItem("facingMode") && (facingMode = localStorage.getItem("facingMode")), localStorage.setItem("facingMode", facingMode), localStorage.getItem("currentView") && (currentView = localStorage.getItem("currentView")), localStorage.setItem("currentView", currentView), token = queryString.token ? queryString.token : "", disableVideo = !!e.getAttribute("data-disableVideo"), disableAudio = !!e.getAttribute("data-disableAudio"), disableScreenShare = !!e.getAttribute("data-disableScreenShare"), disableWhiteboard = !!e.getAttribute("data-disableWhiteboard"), disableTransfer = !!e.getAttribute("data-disableTransfer"), autoAcceptVideo = !!e.getAttribute("data-autoAcceptVideo"), autoAcceptAudio = !!e.getAttribute("data-autoAcceptAudio"), "conference" == conferenceStyle && (widgetSize = {
                width: 800,
                height: 600
            }), svConfigs.serverSide && svConfigs.serverSide.agentInfo && agentId && n.ajax({
                type: "POST",
                url: lsRepUrl + "/server/script.php",
                data: {type: "getagent", tenant: agentId}
            }).done(function (e) {
                e && (e = JSON.parse(e), agentName = e.first_name + " " + e.last_name)
            }).fail(function () {
            }), (isiPhone || isAndroid) && (svConfigs.videoScreen.chat = !1), svConfigs.videoScreen && !0 === svConfigs.videoScreen.chat && (widgetSize.width = 1052);
            var o = n("<div>", {class: "nd-widget-container_lead", id: "newdev-widget"});
            n(document).on("AdminPopupOffline", function (e) {
                isOnline = !1
            }), n(document).on("VisitorsRoom", function (e) {
                visitors = e.count
            }), n(window).on("unload", function () {
                f()
            }), n(window).on("resize", function () {
                ui_handler.changeSpanPositions()
            });
            var i = function (e) {
                if (names[e.sessionId] || (names[e.sessionId] = {}), e.callerInfo.name && names[e.sessionId] && names[e.sessionId].name !== e.callerInfo.name) {
                    if (names[e.sessionId].username) var t = names[e.sessionId].username;
                    names[e.sessionId] = {
                        name: e.callerInfo.name,
                        email: e.callerInfo.email
                    }, t && (names[e.sessionId].username = t), e.callerInfo.isAdmin && agentName && (names[e.sessionId].name = agentName), n("#peer_name_chat").text(names[e.sessionId].name), function (e) {
                        var t = smartVideoLocale.msgStore.incomingText;
                        if (t && names[e.sessionId] && n("#incoming_text").html(t.replace("{{caller_name}}", names[e.sessionId].name)), e.sessionId !== comm_controller.getSessionId()) {
                            var o = smartVideoLocale.msgStore.joinedChat;
                            if (o && -1 == names[e.sessionId].name.indexOf(svConfigs.anonVisitor)) {
                                var i = o.replace("{{caller_name}}", names[e.sessionId].name);
                                svConfigs.videoScreen && svConfigs.videoScreen.waitingRoom ? toggleError(i, 5e3) : (showMessage("", i, null, "joinedChat"), svConfigs.serverSide.chatHistory && saveChat(i, "", "joinedChat", agentId, "", names))
                            }
                        }
                    }(e)
                }
                var o = e.callerInfo.avatar ? e.callerInfo.avatar : lsRepUrl + "img/small-avatar.jpg";
                names[e.sessionId] && (names[e.sessionId].avatar = o, names[e.sessionId].priv = e.callerInfo.priv, e.callerInfo.username && (names[e.sessionId].username = e.callerInfo.username)), names[e.sessionId].muted = e.callerInfo.muted, names[e.sessionId].video = e.callerInfo.video, names[e.sessionId].isAdmin = !!e.callerInfo.isAdmin && e.callerInfo.isAdmin, e.callerInfo.isAdmin && agentName && (names[e.sessionId].name = agentName), n(".dw-chat-avatar").attr("src", o), "conference" !== conferenceStyle && n(".direct-chat-img left " + guestName(e.callerInfo.name)).attr("src", o), u(), r()
            }, r = function () {
                if ("conference" == conferenceStyle) {
                    n("#attendeesList").empty();
                    var e = 0;
                    for (var t in names) {
                        var o = "";
                        t == comm_controller.getSessionId() && (o = " (Me) ");
                        var i = "", a = "", s = "", d = n("ul#attendeesList");
                        if ("undefined" !== names[t].muted && (1 == names[t].muted ? (i = '<i class="fa fa-microphone-slash"></i> ', a = "") : (a = "", i = '<i class="fa fa-microphone"></i> ', a = t !== comm_controller.getSessionId() ? '<span class="user-action"><a data-typeid="' + t + '" href="#" id="muteAttendee' + t + '"><i class="fa fa-fw fa-volume-off"></i> Mute</a></span>' : '<span class="user-action"><a data-typeid="' + t + '" href="#" id="muteAllAttendee"><i class="fa fa-fw fa-volume-off"></i> Mute All</a></span>')), "undefined" !== names[t].muted && names[t].video && (s = '<i class="fa fa-tv"></i> '), t !== comm_controller.getSessionId()) var c = ' <span class="user-action"><a data-typeid="' + t + '" href="#" id="private' + t + '"><i class="fa fa-comment"></i> Private</a></span>'; else c = "";
                        if (queryString.isAdmin) {
                            var l = blockIcon = "";
                            if (queryString.broadcast) if (names[t].priv) l = ' <span class="user-action"><a data-typeid="' + t + '" href="#" id="revoke' + t + '"><i class="fa fa-stop-circle-o"></i> ' + (f = smartVideoLocale.msgStore.revoke) + "</a></span>"; else names[t].raiseHand && (l = ' <span class="user-action"><a data-typeid="' + t + '" href="#" id="grant' + t + '"><i class="fa fa-hand-paper-o"></i> ' + (f = smartVideoLocale.msgStore.grant) + "</a></span>");
                            if ((svConfigs.serverSide.loginForm || svConfigs.serverSide.token) && t !== comm_controller.getSessionId()) {
                                var u = smartVideoLocale.msgStore.block;
                                blockIcon = ' <span class="user-action"><a data-typeid="' + t + '" href="#" id="block' + t + '"><i class="fa fa-stop"></i> ' + u + "</a></span>"
                            }
                            n("<li>" + i + s + '<span class="mx-10">' + names[t].name + o + "</span>" + a + c + l + blockIcon + "</li>").appendTo(d), n("#grant" + t).on("click", function (e) {
                                for (var t in names) names[t].priv && (names[t].priv = !1, comm_controller.revokePriveleges(t));
                                names[n(this).attr("data-typeid")].priv = !0, comm_controller.grantPriveleges(n(this).attr("data-typeid"))
                            }), n("#block" + t).on("click", function (e) {
                                if (1 == confirm(smartVideoLocale.msgStore.sureBlock)) {
                                    var t = names[n(this).attr("data-typeid")].username ? names[n(this).attr("data-typeid")].username : names[n(this).attr("data-typeid")].email;
                                    n.ajax({
                                        type: "POST",
                                        url: lsRepUrl + "/server/script.php",
                                        data: {type: "blockuser", username: t}
                                    }).done(function (e) {
                                    }).fail(function () {
                                    }), delete names[n(this).attr("data-typeid")], comm_controller.blockUser(n(this).attr("data-typeid")), r(), setTimeout(function () {
                                        ui_handler.toggleVisitors(!1), r()
                                    }, 500)
                                }
                            }), n("#revoke" + t).on("click", function (e) {
                                names[n(this).attr("data-typeid")].priv = !1, comm_controller.revokePriveleges(n(this).attr("data-typeid")), setTimeout(function () {
                                    ui_handler.toggleVisitors(!1), r()
                                }, 500)
                            }), n("#muteAttendee" + t).on("click", function (e) {
                                comm_controller.setMute(n(this).attr("data-typeid")), setTimeout(function () {
                                    ui_handler.toggleVisitors(!1), r()
                                }, 500)
                            })
                        } else n("<li>" + i + s + '<span class="mx-10">' + names[t].name + o + "</span>" + c + "</li>").appendTo(d);
                        n("#private" + t).on("click", function (e) {
                            var t = n(this).attr("data-typeid");
                            n("#visitor_message").show(), n("#send_message_to").html(smartVideoLocale.msgStore.sendMessageTo + names[t].name), n("#private_message_button").off(), n("#private_message_button").on("click", function () {
                                var o = n("#private_message_small").val();
                                S(o, !0, t), n("#private_message_small").val(""), n("#visitor_message").hide(), e.stopPropagation()
                            }), e.stopPropagation()
                        }), t !== comm_controller.getSessionId() && (peer_avatar = names[t].avatar, peer_name = names[t].name, peer_name_id = t), n("<li><hr/></li>").appendTo(d), e++
                    }
                    e > 0 ? (n(".dw-chat-avatar").show(), n(".dw-chat-avatar").attr("src", peer_avatar), n("#peer_name_chat").html(peer_name), n("#showProfile").show()) : (n(".dw-chat-avatar").hide(), n("#peer_name_chat").html(""), n("#showProfile").hide()), n("#muteAllAttendee").on("click", function () {
                        comm_controller.setMuteAll()
                    })
                } else {
                    n("#visitors").empty();
                    e = 0;
                    for (var t in names) {
                        if (t !== comm_controller.getSessionId()) {
                            var m = n("ul#visitors"),
                                g = n("<li/>").addClass("ui-menu-item").attr("role", "menuitem").appendTo(m);
                            if (n("<a/>").addClass("ui-all").attr("typeid", t).text(names[t].name).attr("title", smartVideoLocale.msgStore.sendMessageTo + names[t].name).appendTo(g).click(function () {
                                n(this).attr("typeid") != comm_controller.getSessionId() && p(n(this).attr("typeid"))
                            }), queryString.isAdmin && queryString.broadcast) {
                                if (names[t].priv) var f = smartVideoLocale.msgStore.revoke,
                                    v = lsRepUrl + "img/revoke.png"; else names[t].raiseHand ? (f = smartVideoLocale.msgStore.grant, v = lsRepUrl + "img/grant.png") : f = "";
                                if (f) n("<img/>").attr("typeid", t).addClass("centerImg").attr("src", v).attr("title", f + " " + names[t].name).appendTo(g).click(function () {
                                    n(this).attr("typeid") != comm_controller.getSessionId() && (names[n(this).attr("typeid")].priv ? (names[n(this).attr("typeid")].priv = !1, comm_controller.revokePriveleges(n(this).attr("typeid"))) : (names[n(this).attr("typeid")].priv = !0, comm_controller.grantPriveleges(n(this).attr("typeid")))), setTimeout(function () {
                                        ui_handler.toggleVisitors(!1), r()
                                    }, 500)
                                })
                            }
                            if (queryString.isAdmin && (svConfigs.serverSide.loginForm || svConfigs.serverSide.token)) {
                                u = smartVideoLocale.msgStore.block;
                                n("<img/>").addClass("centerImg").attr("typeid", t).attr("title", u + " " + names[t].name).attr("src", lsRepUrl + "img/block.png").appendTo(g).click(function () {
                                    1 == confirm(smartVideoLocale.msgStore.sureBlock) && (n.ajax({
                                        type: "POST",
                                        url: lsRepUrl + "/server/script.php",
                                        data: {type: "blockuser", username: names[n(this).attr("typeid")].username}
                                    }).done(function (e) {
                                        console.log("blocked")
                                    }).fail(function () {
                                    }), delete names[n(this).attr("typeid")], comm_controller.blockUser(n(this).attr("typeid")), r(), setTimeout(function () {
                                        ui_handler.toggleVisitors(!1), r()
                                    }, 500))
                                })
                            }
                        }
                        t !== comm_controller.getSessionId() && (peer_avatar = names[t].avatar, peer_name = names[t].name), e++
                    }
                }

                function p(e) {
                    n("#visitor_message").show(), n("#send_message_to").html(smartVideoLocale.msgStore.sendMessageTo + names[e].name), n("#private_message_button").off(), n("#private_message_button").on("click", function () {
                        var t = n("#private_message_small").text();
                        S(t, !0, e), n("#visitor_message").hide(), setTimeout(function () {
                            ui_handler.toggleVisitors(!1)
                        }, 500), n("#private_message_small").text("")
                    })
                }

                e > 2 ? (n(".dw-chat-avatar").attr("src", lsRepUrl + "img/listusers.png"), n("#peer_name_chat").html("...")) : (n(".dw-chat-avatar").attr("src", peer_avatar), n("#peer_name_chat").html(peer_name))
            }, a = function () {
                comm_controller.getStream() || (stopIncomingCall(), m(!0), "conference" == conferenceStyle ? ui_handler.displayVideoOnly() : (inCall = [], n("#localVideo").hide(), n("#video_back").show(), ui_handler.toggleInstaChat(), setTimeout(function () {
                    R(!1)
                }, 500)))
            };

            function s(e) {
                !function (e, n) {
                    var t;
                    t = {video: !0}, navigator.mediaDevices.getDisplayMedia ? navigator.mediaDevices.getDisplayMedia(t).then(e).catch(n) : navigator.getDisplayMedia(t).then(e).catch(n)
                }(function (n) {
                    !function (e, n) {
                        e.addEventListener("ended", function () {
                            n(), n = function () {
                            }
                        }, !1), e.addEventListener("inactive", function () {
                            n(), n = function () {
                            }
                        }, !1), e.getTracks().forEach(function (e) {
                            e.addEventListener("ended", function () {
                                n(), n = function () {
                                }
                            }, !1), e.addEventListener("inactive", function () {
                                n(), n = function () {
                                }
                            }, !1)
                        })
                    }(n, function () {
                        m(!0), ui_handler.setRecordingUi(!1), comm_controller.stopRecording()
                    }), e(n)
                }, function (e) {
                    console.error(e), alert("Unable to capture your screen. Please check console logs.\n" + e)
                })
            }

            function d(e) {
                var n = document.createElement("video");
                n.autoplay = !0, n.muted = !0, n.srcObject = e, n.style.display = "none", (document.body || document.documentElement).appendChild(n)
            }

            var c = function () {
                m(!1), comm_controller.startRecording(), ui_handler.setRecordingUi(!0)
            }, l = function () {
                if (startedRecroding = !0, comm_controller.startRecording(), ui_handler.setRecordingUi(!0), svConfigs.recording.screen) s(function (e) {
                    var n;
                    recordScreen = e, d(e), n = function (n) {
                        recordCamera = n, d(n), e.width = window.screen.width, e.height = window.screen.height, e.fullcanvas = !0, n.width = 320, n.height = 240, n.top = e.height - n.height, n.left = e.width - n.width, (multiStreamRecorder = RecordRTC([e, n], {
                            type: "video",
                            mimeType: "video/webm"
                        })).startRecording(), recordingTimer = setInterval(c, 6e4)
                    }, navigator.mediaDevices.getUserMedia({audio: !0, video: !0}).then(n)
                }); else {
                    if (queryString.isAdmin) {
                        var e = [];
                        for (var n in names) if (svConfigs.recording.oneWay) {
                            if (n != comm_controller.getSessionId()) {
                                var t = comm_controller.getRemoteStream(n);
                                e.push(t)
                            }
                        } else t = comm_controller.getRemoteStream(n), e.push(t)
                    }
                    (multiStreamRecorder = RecordRTC(e, {
                        type: "video",
                        mimeType: "video/webm",
                        disableLogs: !0,
                        bitsPerSecond: 10485760
                    })).startRecording()
                }
            }, u = function () {
                if (!is_chat_opened && (is_chat_opened = !0, svConfigs.serverSide.chatHistory)) {
                    if (queryString.isAdmin) for (var e in names) e !== comm_controller.getSessionId() && (t = e); else var t = comm_controller.getSessionId();
                    n.ajax({
                        type: "POST",
                        url: lsRepUrl + "/server/script.php",
                        data: {type: "getchat", roomId: room, sessionId: t, agentId: agentId}
                    }).done(function (e) {
                        e && JSON.parse(e).forEach(function (e) {
                            var n = svConfigs.agentName ? svConfigs.agentName : "Agent";
                            if (names[comm_controller.getSessionId()] && (e.from == names[comm_controller.getSessionId()].name || queryString.isAdmin && e.from == n)) var t = "Me"; else t = e.from;
                            if (queryString.isAdmin || !e.system) {
                                var o = getPrettyDate(e.date_created);
                                showMessage(t, e.message, o, e.system, e.avatar)
                            }
                        })
                    }).fail(function () {
                        console.log(!1)
                    })
                }
            }, m = function (e) {
                ui_handler.setRecordingUi(!1), comm_controller.stopRecording(), multiStreamRecorder && multiStreamRecorder.stopRecording(function () {
                    g(e), e && svConfigs.recording.screen && (clearInterval(recordingTimer), [recordScreen, recordCamera].forEach(function (e) {
                        e.getTracks().forEach(function (e) {
                            e.stop()
                        })
                    }))
                })
            }, g = function (e) {
                if (startedRecroding) {
                    var t = URL.createObjectURL(multiStreamRecorder.getBlob());
                    if (svConfigs.recording.download) {
                        const e = document.createElement("a");
                        e.style.display = "none", e.href = t, e.download = "record_" + getCurrentDateFormatted() + ".webm", document.body.appendChild(e), e.click(), setTimeout(function () {
                            document.body.removeChild(e)
                        }, 100)
                    }
                    if (svConfigs.recording.saveServer) {
                        var o = "record_" + room + "_" + getCurrentDateFormatted() + ".webm", i = new FormData;
                        i.append("video-filename", o), i.append("video-blob", multiStreamRecorder.getBlob()), i.append("room", room), i.append("agentName", agentName), i.append("agentId", agentId), i.append("isFfmpeg", 1 == svConfigs.recording.transcode), function (n, t) {
                            var o = new XMLHttpRequest;
                            o.onreadystatechange = function () {
                                4 == o.readyState && 200 == o.status && (e ? (multiStreamRecorder.destroy(), multiStreamRecorder = null) : multiStreamRecorder.startRecording())
                            }, o.open("POST", n), o.send(t)
                        }(lsRepUrl + "/server/saverecord.php", i), n.ajax({
                            type: "POST",
                            url: lsRepUrl + "/server/script.php",
                            data: {
                                type: "addrecording",
                                roomId: roomId || queryString.room,
                                filename: o,
                                agentId: agentId
                            }
                        }).done(function (e) {
                        }).fail(function () {
                            console.log(!1)
                        })
                    }
                    n("#recording_message").show(), n(".recordinglink").attr("href", t), n(".recordinglink").click(function () {
                        n("#recording_message").hide()
                    }), n(".close-but-wd-small").on("click", function () {
                        window.URL.revokeObjectURL(t), n("#recording_message").hide()
                    }), startedRecroding = !1
                }
            }, f = function () {
                stopIncomingCall(), "conference" == conferenceStyle ? ui_handler.displayVideoOnly() : ui_handler.toggleInstaChat(), comm_controller.getStream() && (m(!0), comm_controller.handleCallTermination(), y()), comm_controller.endCall("hang up call")
            }, v = function () {
                setCookie("lsvGreenRoom", "1"), n("<link>", {
                    rel: "stylesheet",
                    type: "text/css",
                    href: lsRepUrl + "css/cloud.css?v=" + currVersion
                }).appendTo("head"), n("<link>", {
                    rel: "stylesheet",
                    type: "text/css",
                    href: lsRepUrl + "css/sky-forms.css?v=" + currVersion
                }).appendTo("head");
                var e = n("#videoPreview")[0];
                audioInputSelect = document.querySelector("select#audioSource"), audioOutputSelect = document.querySelector("select#audioOutput"), videoSelect = document.querySelector("select#videoSource");
                var t = [audioInputSelect, audioOutputSelect, videoSelect];

                function o(e) {
                    var n = t.map(function (e) {
                        return e.value
                    });
                    t.forEach(function (e) {
                        for (; e.firstChild;) e.removeChild(e.firstChild)
                    });
                    for (var o = 0; o !== e.length; ++o) {
                        var i = e[o], r = document.createElement("option");
                        r.value = i.deviceId, "audioinput" === i.kind ? (r.text = i.label || "microphone " + (audioInputSelect.length + 1), r.dataset.icon = "fa fa-microphone mr-2", audioInputSelect.appendChild(r)) : "audiooutput" === i.kind ? (r.text = i.label || "speaker " + (audioOutputSelect.length + 1), r.dataset.icon = "fa fa-headphones mr-2", audioOutputSelect.appendChild(r)) : "videoinput" === i.kind && (r.dataset.icon = "fa fa-video-camera mr-2", r.text = i.label || "camera " + (videoSelect.length + 1), videoSelect.appendChild(r))
                    }
                    t.forEach(function (e, t) {
                        Array.prototype.slice.call(e.childNodes).some(function (e) {
                            return e.value === n[t]
                        }) && (e.value = n[t])
                    }), document.getElementById("audioSource").selectedIndex = audioCurrentId, document.getElementById("audioOutput").selectedIndex = audioOutputCurrentId, document.getElementById("videoSource").selectedIndex = videoCurrentId
                }

                audioCurrentId = localStorage.getItem("audioCurrentId") > 0 ? parseInt(localStorage.getItem("audioCurrentId")) : 0, videoCurrentId = localStorage.getItem("videoCurrentId") > 0 ? parseInt(localStorage.getItem("videoCurrentId")) : 0, videoSource = localStorage.getItem("videoSource") ? localStorage.getItem("videoSource") : void 0, audioOutputCurrentId = localStorage.getItem("audioOutputCurrentId") > 0 ? localStorage.getItem("audioOutputCurrentId") : 0;
                var i = !videoSource || {deviceId: videoSource ? {exact: videoSource} : void 0};
                isIEA && (i = !0);
                var r = {audio: !0, video: i};

                function a(n) {
                    if (testAudioTrack = n.getAudioTracks()[0], testVideoTrack = n.getVideoTracks()[0], testAudioTrack.enabled = !1, window.stream = n, e.srcObject = n, !isIEA) return e.srcObject = n, navigator.mediaDevices.enumerateDevices()
                }

                function s() {
                    window.stream && window.stream.getTracks().forEach(function (e) {
                        e.stop()
                    }), audioSource = audioInputSelect.value, videoSource = videoSelect.value, videoCurrentId = videoSelect.selectedIndex, audioCurrentId = audioInputSelect.selectedIndex, localStorage.setItem("videoCurrentId", videoCurrentId), localStorage.setItem("videoSource", videoSource), localStorage.setItem("audioCurrentId", audioCurrentId);
                    var e = {
                        audio: !!audio_on && {deviceId: audioSource ? {exact: audioSource} : void 0},
                        video: {deviceId: videoSource ? {exact: videoSource} : void 0}
                    };
                    "undefined" == typeof Promise ? navigator.getUserMedia(e, a, d) : navigator.mediaDevices.getUserMedia(e).then(a).then(o).catch(d)
                }

                function d(e) {
                    console.log("navigator.getUserMedia error: ", e)
                }

                "undefined" == typeof Promise || navigator.mediaDevices.getUserMedia(r).then(a).then(function () {
                    navigator.mediaDevices.enumerateDevices().then(o).catch(d)
                }).catch(function e(n) {
                    if ("NotReadableError" === n.name && audio_on) audio_on = !1; else {
                        if ("OverconstrainedError" !== n.name) return;
                        localStorage.removeItem("videoSource"), localStorage.removeItem("videoCurrentId"), localStorage.removeItem("audioCurrentId");
                        var t = {audio: !0, video: !0}
                    }
                    "undefined" == typeof Promise || navigator.mediaDevices.getUserMedia(t).then(a).then(function () {
                        navigator.mediaDevices.enumerateDevices().then(o).catch(d)
                    }).catch(e)
                }), audioInputSelect && (audioInputSelect.onchange = s), audioOutputSelect && (audioOutputSelect.onchange = function () {
                    (audioOutputCurrentId = audioOutputSelect.selectedIndex) > 0 && localStorage.setItem("audioOutputCurrentId", audioOutputCurrentId);
                    var n, t, o = audioOutputSelect.value;
                    t = o, void 0 !== (n = e).sinkId ? n.setSinkId(t).then(function () {
                    }).catch(function (e) {
                        var n = e;
                        "SecurityError" === e.name && (n = "You need to use HTTPS for selecting audio output device: " + e), console.error(n), audioOutputSelect.selectedIndex = 0
                    }) : console.warn("Browser does not support output device selection.")
                }), videoSelect && (videoSelect.onchange = s), "simple" == conferenceStyle && (ui_handler.toggleInstaChat(), ui_handler.restoreVideoBox(), n("#popup_widget_text_videos").show(), ui_handler.toggleInstaVideo(4))
            }, p = function (e) {
                audio_on = !n(".muteAudio").is(":checked"), video_on = !n(".muteVideo").is(":checked"), disableAudio && (audio_on = !1), disableVideo && (video_on = !1), window.stream && window.stream.getTracks().forEach(function (e) {
                    e.stop()
                }), ui_handler.restoreVideoBox(), ui_handler.toggleInstaVideo(!1);
                var t = video_on ? "Video" : "Audio";
                comm_controller.initCall(t, e, videoSource, comm_controller.getSessionId(), audioSource, svConfigs.videoScreen.videoConstraint, svConfigs.videoScreen.audioConstraint)
            }, h = function (e, t) {
                if (isOnline) if (x(comm_controller.getSessionId(), video_on), queryString.broadcast || !svConfigs.videoScreen.greenRoom || getCookie("lsvGreenRoom")) {
                    ui_handler.restoreVideoBox(), ui_handler.toggleInstaVideo(!1);
                    var o = video_on ? "Video" : "Audio";
                    comm_controller.initCall(o, e, t, comm_controller.getSessionId(), audioSource, svConfigs.videoScreen.videoConstraint, svConfigs.videoScreen.audioConstraint)
                } else v(), n("#startVideoButton").off(), n("#startVideoButton").on("click", function () {
                    p(e)
                }); else T()
            }, S = function (e, n, t) {
                e = escapeHtmlEntities(e), t && (e = '<small id="private">' + smartVideoLocale.msgStore.private + "</small> " + e), n && showMessage("Me", e);
                var o = (new Date).toLocaleTimeString();
                comm_controller.addLocalChat(e, o, t), svConfigs.serverSide.chatHistory && saveChat(e, names[comm_controller.getSessionId()].name, "", agentId, names[comm_controller.getSessionId()].avatar, names)
            }, C = function (e) {
                if ("conference" == conferenceStyle) {
                    if (n("#" + e).val()) {
                        var t = n("#" + e).val();
                        S(t, !0), n("#" + e).val("")
                    }
                } else if (n("#" + e).text()) {
                    t = n("#" + e).text();
                    S(t, !0), n("#" + e).html("")
                }
            }, w = function (e) {
                e ? (n("#wd-widget-content-video").show(), n("#local_video_div").show(), !queryString.broadcast && svConfigs.videoScreen.separateScreenShare && (n("#localScreen").show(), n("#localVideo").hide()), n("#showHideVideo").addClass("disabled")) : (n("#remoteScreenChat").hide(), !queryString.broadcast && svConfigs.videoScreen.separateScreenShare && (n("#remoteScreen").hide(), n("#localScreen").hide()), comm_controller.getStream() || "conference" == conferenceStyle ? (n("#local_video_div").show(), n("#localVideo").show()) : (n("#local_video_div").hide(), n("#localVideo").hide()), n("#showHideVideo").removeClass("disabled")), (svConfigs.videoScreen && 0 == svConfigs.videoScreen.onlyAgentButtons || queryString.isAdmin) && ui_handler.setScreenButton(e)
            }, y = function () {
                w(!1), comm_controller.handleScreenShareTermination(), comm_controller.getStream() || ("conference" == conferenceStyle ? ui_handler.displayVideoOnly() : ui_handler.toggleInstaChat())
            }, b = function () {
                if (queryString.broadcast || !svConfigs.videoScreen.separateScreenShare) if (audio_on) ui_handler.restoreVideoBox(), comm_controller.startScreenShare(), w(!0); else {
                    audio_on = !audio_on;
                    var e = localStorage.getItem("prd");
                    (e = JSON.parse(e)).muted = !audio_on, e.room = room, localStorage.setItem("prd", JSON.stringify(e)), comm_controller.toggleAudio(), setTimeout(function () {
                        ui_handler.restoreVideoBox(), comm_controller.startScreenShare(), w(!0)
                    }, 500)
                } else y(), ui_handler.restoreVideoBox(), comm_controller.startScreenShareConf(), w(!0)
            }, _ = function () {
                if (queryString.isAdmin && (isOnline = !0), audio_on = !n(".muteAudio").is(":checked"), video_on = !n(".muteVideo").is(":checked"), disableAudio && (audio_on = !1), disableVideo && (video_on = !1), names[comm_controller.getSessionId()].muted = !audio_on, names[comm_controller.getSessionId()].video = video_on, names[comm_controller.getSessionId()].room = room, names[comm_controller.getSessionId()].name = queryString.isAdmin ? agentName : visitorName || guestName(comm_controller.getSessionId()), names[comm_controller.getSessionId()].isAdmin = queryString.isAdmin, names[comm_controller.getSessionId()].priv = !!localStorage.getItem("hasPrivileges"), n("#ng_caller_name").val() && (queryString.isAdmin ? agentName = n("#ng_caller_name").val() : visitorName = n("#ng_caller_name").val(), names[comm_controller.getSessionId()].name = n("#ng_caller_name").val()), requirePass && localStorage.getItem("prd")) {
                    var e = JSON.parse(localStorage.getItem("prd"));
                    names[comm_controller.getSessionId()].password = e.password
                } else comm_controller.setCallerInfo(names[comm_controller.getSessionId()], queryString.isAdmin);
                localStorage.setItem("prd", JSON.stringify(names[comm_controller.getSessionId()])), svConfigs.videoScreen.greenRoom ? (n("#wd-widget-content-greenroom").show(), n("#startVideoButton").off(), n("#startVideoButton").on("click", function () {
                    p(!1)
                }), v()) : (r(), ui_handler.setVideoButton(), h(!0)), requirePass = !1
            }, I = function () {
                var e = new Date, n = new Date(datetime);
                if (n.setMinutes(n.getMinutes() + parseInt(duration)), e > new Date(datetime) && n > e) return !0;
                var t = new Date, o = new Date(datetime), i = Math.abs(o - t) / 1e3, r = Math.floor(i / 86400);
                i -= 86400 * r;
                var a = Math.floor(i / 3600) % 24;
                i -= 3600 * a;
                var s = Math.floor(i / 60) % 60;
                if (i -= 60 * s, diffString = "", r > 0) {
                    var d = r > 1 ? smartVideoLocale.msgStore.days : smartVideoLocale.msgStore.day;
                    diffString = r + " " + d
                }
                if (0 === r && a > 0) {
                    var c = a > 1 ? smartVideoLocale.msgStore.hours : smartVideoLocale.msgStore.hour;
                    diffString = a + " " + c
                }
                if (0 === r && 0 == a && s > 0 && (diffString = s + " " + smartVideoLocale.msgStore.minutes), diffString && new Date(datetime) > e) {
                    var l = smartVideoLocale.msgStore.notexactAppointment,
                        u = getPrettyDate(new Date(datetime).getTime() / 1e3),
                        m = (m = l.replace("{{timemeeting}}", u)).replace("{{diffString}}", diffString);
                    toggleNotification(m, !0)
                } else toggleNotification(smartVideoLocale.msgStore.appointmentPast, !0);
                return ui_handler.displayChatOnly(), ui_handler.setDisabled(!0), !1
            }, k = function (e) {
                toggleNotification("", !1), is_widget_opened = "conference" == conferenceStyle ? n("#wd-widget-content-greenroom").is(":visible") || n("#wd-widget-content-video-waiting").is(":visible") || n("#wd-widget-content-video").is(":visible") || is_widget_opened : n("#nd_widget_content").is(":visible"), caller_name = caller_name || "", caller_email = caller_email || "", caller_phone = caller_phone || "", is_widget_opened || ui_handler.toggleWidget(), "conference" == conferenceStyle ? fileInput = document.querySelector("input#filetransfer") : ("chat" === e ? ui_handler.toggleInstaChat() : "video" === e ? ui_handler.toggleInstaVideo() : 4 !== e || is_widget_opened || ui_handler.toggleInstaVideo(4), document.getElementById("newdev_chat_message1").focus()), r()
            }, E = function (e) {
                n(".new_chat_badge_container").hide(), n(".wd-chat-box").is(":visible") ? (ui_handler.displayVideoOnly(), !0 === e && h(!1)) : ui_handler.displayChatOnly()
            }, A = function () {
                if (names[comm_controller.getSessionId()] || (names[comm_controller.getSessionId()] = {}), queryString.broadcast) {
                    if (localStorage.removeItem("hasPrivileges"), svConfigs.serverSide.token) return is_widget_opened || comm_controller.getVideoSessions() || n("#invideo").is(":visible") || n("#ng_info").is(":visible") || (is_widget_opened = !0, ui_handler.setDisabled(!0), n.ajax({
                        type: "POST",
                        url: lsRepUrl + "server/script.php",
                        data: {type: "logintoken", isAdmin: queryString.isAdmin, token: token, roomId: room}
                    }).done(function (e) {
                        return e ? (e = JSON.parse(e), ui_handler.setDisabled(!1), names[comm_controller.getSessionId()] = {
                            name: e.first_name + " " + e.last_name,
                            avatar: svConfigs.agentAvatar ? lsRepUrl + svConfigs.agentAvatar : lsRepUrl + "img/small-avatar.jpg",
                            isAdmin: queryString.isAdmin,
                            username: e.username
                        }, names[comm_controller.getSessionId()].priv = localStorage.getItem("hasPrivileges"), queryString.isAdmin ? agentName = names[comm_controller.getSessionId()].name : visitorName = names[comm_controller.getSessionId()].name, comm_controller.setCallerInfo(names[comm_controller.getSessionId()], !0), e.name = e.first_name + " " + e.last_name, e.isAdmin = queryString.isAdmin, e.room = room, delete e.password, localStorage.setItem("prd", JSON.stringify(e)), toggleNotification("", !1), ui_handler.setDisabled(!1), r(), "conference" == conferenceStyle && (queryString.isAdmin ? (isOnline = !0, _()) : (n("#ng_info").show(), n("#cameraMicChoose").hide(), n("#ng_caller_name").hide(), n("#login-conference-title").html(smartVideoLocale.msgStore.welcomeBroadcast), n("#continue-button").off(), n("#continue-button").on("click", function () {
                            n("#ng_info").hide(), isOnline = !0, _()
                        }))), !1) : (toggleNotification(smartVideoLocale.msgStore.notValidToken, !0), localStorage.removeItem("prd"), localStorage.removeItem("hasPrivileges"), comm_controller.setClose(comm_controller.getSessionId()), ui_handler.displayChatOnly(), ui_handler.setDisabled(!0), !1)
                    }).fail(function () {
                    })), !1;
                    if ("conference" !== conferenceStyle) return ui_handler.toggleWidget(), ui_handler.toggleInstaChat(), ui_handler.displayVideoOnly(), ui_handler.toggleHeaderChat(), queryString.broadcast && n("#raisehand_div").show(), n("#localVideo").hide(), n(".wd-avatar-agent").hide(), n("#video_container_chat").show(), n("#wd-widget-content-video").hide(), queryString.isAdmin && (isOnline = !0, n("#callAudioButton_1").addClass("disabled"), n(".peer_avatar").hide()), !1;
                    k("chat"), queryString.isAdmin && (isOnline = !0)
                }
                if (comm_controller.getVideoSessions() || n("#invideo").is(":visible") || n("#ng_info").is(":visible")) {
                    e = localStorage.getItem("prd");
                    comm_controller.setCallerInfo(JSON.parse(e), queryString.isAdmin)
                } else {
                    if (k("chat"), !queryString.isAdmin && duration && datetime) if (!I()) return !1;
                    if (!queryString.isAdmin && requirePass) return toggleNotification("", !1), n("#ng_info").show(), ui_handler.displayChatOnly(), ui_handler.setDisabled(!0), visitorName && n("#ng_caller_name").val(visitorName), svConfigs.entryForm.showEmail && n("#ng_caller_email").show(), svConfigs.entryForm.showAvatar && n("#ng_caller_avatar").show(), n("#ng_password").show(), n("#continue-button").off(), n("#continue-button").on("click", function () {
                        is_callerback = !1;
                        var e = {};
                        e.name = visitorName || n("#ng_caller_name").val(), n("#ng_caller_name").val() && (e.email = n("#ng_caller_name").val()), n("#ng_caller_avatar").val() && (e.avatar = n("#ng_caller_avatar").val()), e.password = n("#ng_password").val(), e.room = room, comm_controller.setCallerInfo(e, !1), localStorage.setItem("prdTmp", JSON.stringify(e))
                    }), !1;
                    if (localStorage.getItem("prd")) {
                        var e = localStorage.getItem("prd");
                        e = JSON.parse(e), roomPrd = e.room
                    }
                    if (visitorName && !queryString.isAdmin && !svConfigs.serverSide.loginForm && !queryString.broadcast) {
                        svConfigs.entryForm.enabled = !1;
                        var t = {name: visitorName, room: room};
                        localStorage.setItem("prd", JSON.stringify(t))
                    }
                    if (localStorage.getItem("prd") && roomPrd == room && !svConfigs.serverSide.loginForm && !queryString.broadcast) svConfigs.entryForm.enabled = !1, (e = localStorage.getItem("prd")) && (e = JSON.parse(e)), comm_controller.setCallerInfo(e, queryString.isAdmin), names[comm_controller.getSessionId()] = {
                        name: e ? e.name : caller_name,
                        avatar: e ? e.avatar : caller_avatar,
                        email: e ? e.email : caller_email
                    };
                    if (svConfigs.entryForm.enabled) {
                        var o = function () {
                            caller_name = n("#ng_caller_name").val(), caller_email = n("#ng_caller_email").val(), caller_avatar = n("#ng_caller_avatar").val(), toggleNotification("", !1);
                            var e = {name: caller_name, email: caller_email, avatar: caller_avatar, room: room};
                            svConfigs.serverSide && svConfigs.serverSide.loginForm ? isLsvAdmin ? (ui_handler.setDisabled(!0), n("#ng_info").show(), n.ajax({
                                type: "POST",
                                url: lsRepUrl + "server/script.php",
                                data: {
                                    type: "loginadmin",
                                    email: n("#ng_caller_email").val(),
                                    password: n("#ng_password").val()
                                }
                            }).done(function (t) {
                                if (!t || 200 != t) return toggleNotification(smartVideoLocale.msgStore.notValidPassword, !0), !1;
                                ui_handler.setDisabled(!1), n("#ng_info").hide(), comm_controller.setCallerInfo(e, !1), localStorage.setItem("prd", JSON.stringify(e)), "conference" == conferenceStyle && _()
                            }).fail(function () {
                                return !1
                            })) : (ui_handler.setDisabled(!0), n("#ng_info").show(), n.ajax({
                                type: "POST",
                                url: lsRepUrl + "server/script.php",
                                data: {
                                    type: "login",
                                    email: n("#ng_caller_email").val(),
                                    password: n("#ng_password").val()
                                }
                            }).done(function (t) {
                                if (!t || 200 != t) return toggleNotification(smartVideoLocale.msgStore.notValidPassword, !0), !1;
                                ui_handler.setDisabled(!1), n("#ng_info").hide(), comm_controller.setCallerInfo(e, !1), localStorage.setItem("prd", JSON.stringify(e)), "conference" == conferenceStyle && _()
                            }).fail(function () {
                                return !1
                            })) : (localStorage.setItem("prd", JSON.stringify(e)), svConfigs.entryForm.private && requirePass ? e.password = n("#ng_password").val() : (n("#ng_info").hide(), n("#continue-button").off(), ui_handler.setDisabled(!1)), comm_controller.setCallerInfo(e, queryString.isAdmin), "conference" == conferenceStyle && _())
                        };
                        if (svConfigs.entryForm.required || svConfigs.entryForm.private) {
                            (svConfigs.entryForm.private && requirePass || svConfigs.serverSide.loginForm) && (isOnline = !1, n("#ng_password").show()), svConfigs.entryForm.showEmail && n("#ng_caller_email").show(), svConfigs.entryForm.showAvatar && n("#ng_caller_avatar").show(), i = function (e) {
                                var t = /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/;
                                13 == e.keyCode && "" !== n("#ng_caller_name").val() && "" !== n("#ng_caller_email").val() && t.test(n("#ng_caller_email").val()) && o();
                                var i = !svConfigs.entryForm.showEmail || "" !== n("#ng_caller_email").val() && t.test(n("#ng_caller_email").val()),
                                    r = !svConfigs.entryForm.showAvatar || "" !== n("#ng_caller_avatar").val();
                                "" !== n("#ng_caller_name").val() && i && r ? n("#continue-button").removeClass("disabled") : n("#continue-button").addClass("disabled")
                            }, n("#ng_caller_name").keyup(function (e) {
                                i(e)
                            }), n("#ng_caller_email").keyup(function (e) {
                                i(e)
                            }), n("#ng_password").keyup(function (e) {
                                i(e)
                            }), n("#ng_caller_avatar").keyup(function (e) {
                                i(e)
                            }), n("#ng_caller_name").blur(function (e) {
                                i(e)
                            }), n("#ng_caller_email").blur(function (e) {
                                i(e)
                            }), n("#ng_password").blur(function (e) {
                                i(e)
                            }), n("#ng_caller_avatar").blur(function (e) {
                                i(e)
                            }), n("#continue-button").addClass("disabled")
                        }
                        ui_handler.displayChatOnly(), ui_handler.setDisabled(!0), "conference" == conferenceStyle && (svConfigs.videoScreen.greenRoom ? (n("#wd-widget-content-greenroom").show(), v(), n("#startVideoButton").off(), n("#startVideoButton").on("click", function () {
                            p(!1)
                        })) : (queryString.broadcast && !queryString.isAdmin && n("#cameraMicChoose").hide(), queryString.isAdmin ? n("#ng_caller_name").val(agentName) : n("#ng_caller_name").val(visitorName))), n("#ng_info").show(), setTimeout(function () {
                            n("#ng_caller_name").focus()
                        }, 500), n("#continue-button").off(), n("#continue-button").on("click", function () {
                            o()
                        }), svConfigs.showEntryForm = !1
                    } else {
                        if (queryString.isAdmin && agentName) svConfigs.entryForm.enabled = !1, (e = localStorage.getItem("prd")) && ((e = JSON.parse(e)).name = names[comm_controller.getSessionId()].name, e.avatar = names[comm_controller.getSessionId()].avatar), names[comm_controller.getSessionId()] = {
                            name: svConfigs.agentName ? svConfigs.agentName : "",
                            avatar: svConfigs.agentAvatar ? svConfigs.agentAvatar : lsRepUrl + "img/small-avatar.jpg",
                            room: room
                        }, comm_controller.setCallerInfo(e, !0), localStorage.setItem("prd", JSON.stringify(names[comm_controller.getSessionId()]));
                        isOnline ? (ui_handler.displayChatOnly(), toggleNotification("", !1), ui_handler.setDisabled(!1)) : ui_handler.setDisabled(!0), svConfigs.videoScreen.greenRoom && (v(), n("#startVideoButton").off(), n("#startVideoButton").on("click", function () {
                            p(!1)
                        }))
                    }
                    (e = localStorage.getItem("prd")) && (0 == (e = JSON.parse(e)).video && (disableVideo = !0), 1 == e.muted && (disableAudio = !0)), names[comm_controller.getSessionId()] = {
                        name: e ? e.name : caller_name,
                        avatar: e ? e.avatar : caller_avatar,
                        email: e ? e.email : caller_email
                    }, 0 == svConfigs.entryForm.enabled && "conference" == conferenceStyle && (isOnline = !0, ui_handler.setDisabled(!1), _())
                }
                var i;
                r()
            }, R = function (e) {
                e ? n.ajax({
                    type: "POST",
                    url: lsRepUrl + "server/script.php",
                    data: {type: "endmeeting", agentId: agentId, roomId: room}
                }).done(function (e) {
                    setTimeout(function () {
                        toggleNotification(smartVideoLocale.msgStore.meetingHasEnded, !0), localStorage.removeItem("prd"), localStorage.removeItem("hasPrivileges"), comm_controller.setClose(comm_controller.getSessionId()), ui_handler.displayChatOnly(), ui_handler.setDisabled(!0), isOnline = !1
                    }, 150)
                }).fail(function () {
                }) : 1 != svConfigs.serverSide.feedback || queryString.isAdmin || getCookie("lsvRateRoom") || comm_controller.getVideoSessions() || (n("#feedback_form").show(), n("#feedback-button").click(function () {
                    if (n("#feedback_form").hide(), token) var e = token; else e = names[comm_controller.getSessionId()].name ? names[comm_controller.getSessionId()].name : guestName(comm_controller.getSessionId());
                    n.ajax({
                        type: "POST",
                        url: lsRepUrl + "server/script.php",
                        data: {
                            type: "feedback",
                            roomId: room,
                            sessionId: comm_controller.getSessionId(),
                            rate: n("#ratestars").rateit("value"),
                            text: n("#feedback_message").val(),
                            userId: e
                        }
                    }).done(function (e) {
                        e && setCookie("lsvRateRoom", "1", 240)
                    }).complete(function () {
                        setCookie("lsvRateRoom", "1", 240)
                    }).fail(function () {
                        console.log(!1)
                    })
                }))
            }, T = function () {
                if (comm_controller.getParticipants() > 0) console.log("setOffline return"); else {
                    if (!queryString.isAdmin && duration && datetime && setTimeout(function () {
                        if (!I()) return !1
                    }, 50), !comm_controller.getVideoSessions() && !n("#invideo").is(":visible")) {
                        if (ui_handler.setDisabled(!0), smartVideoLocale.msgStore.waitingOtherParty) var e = smartVideoLocale.msgStore.waitingOtherParty; else e = "Waiting for the other party to join";
                        comm_controller.customerHere(visitorName), toggleNotification(e, !0)
                    }
                    r()
                }
            }, x = function (e, n) {
                names[e] && (names[e].video = n), r()
            };

            function M() {
                if ("conference" == conferenceStyle) var t = "roomconference.css"; else t = "room.css";
                var s = n("<link>", {
                    rel: "stylesheet",
                    type: "text/css",
                    href: lsRepUrl + "css/" + t + "?v=" + currVersion
                });
                (n(document.body).append(o), s.appendTo("head"), 1 == svConfigs.serverSide.feedback) && n("<link>", {
                    rel: "stylesheet",
                    type: "text/css",
                    href: lsRepUrl + "css/rateit.css?v=" + currVersion
                }).appendTo("head");
                n.get(lsRepUrl + "pages/" + videoWidgetContainer + "?v=" + currVersion, function (t) {
                    o.append(t), ui_handler.setWidgetValues(), svConfigs.serverSide.checkRoom && n.ajax({
                        type: "POST",
                        url: lsRepUrl + "server/script.php",
                        data: {type: "getroom", token: token, isAdmin: queryString.isAdmin, roomId: room}
                    }).done(function (e) {
                        e ? (e = JSON.parse(e)).title && (document.title = e.title) : R(!0)
                    }).fail(function () {
                    }), "conference" == conferenceStyle && (n("#showProfile").show(), !(isChrome || isFirefox || isOpera || isSafariA) || isiPhone || isAndroid || !queryString.room && !queryString.broadcast || n("#screenshareLi").show(), queryString.broadcast && !queryString.isAdmin && n("#screenshareLi").hide(), svConfigs.recording.enabled && queryString.isAdmin && !isiPhone && !isAndroid && n("#recordingLi").show(), svConfigs.videoScreen.getSnapshot && n("#snapshotLi").show()), "conference" == conferenceStyle && queryString.broadcast && !queryString.isAdmin && (n("#showHideVideo").hide(), n("#showHideAudio").hide(), n("#raisehandLi").show(), n("#raisehandLi1").show(), n("#localVideo").hide(), n("#snapshotLi").hide()), "conference" == conferenceStyle && queryString.broadcast && svConfigs.videoScreen.videoFileStream && (n("#showHideVideo").hide(), n("#showHideAudio").hide(), n("#localVideo").hide(), n("#snapshotLi").hide(), n("#raisehandLi").hide(), n("#whiteboardLi").hide(), n("#screenshareLi").hide(), n("#recordingLi").hide(), n("#changeViewLi").hide()), disableWhiteboard && n("#whiteboardLi").hide(), disableScreenShare && n("#screenshareLi").hide(), n(document).on("LSLocaleUpdated", function (e) {
                        n("#cancel_call_button span").html(smartVideoLocale.msgStore.Cancel), n("#waitingToConnect").html(smartVideoLocale.msgStore.waitingToConnect), n("#answer_audiocall_button").attr("title", smartVideoLocale.msgStore.answerWithAudio), n("#answer_audiocall_button1").attr("title", smartVideoLocale.msgStore.answerWithAudio), n("#callAudioButton_4").attr("title", smartVideoLocale.msgStore.callWithAudio), n("#callAudioButton_1").attr("title", smartVideoLocale.msgStore.callWithAudio), n("#call_audio").attr("title", smartVideoLocale.msgStore.callWithAudio), n("#answer_call_button1").attr("title", smartVideoLocale.msgStore.answerWithVideo), n("#answer_call_button").attr("title", smartVideoLocale.msgStore.answerWithVideo), n("#reject_call_button").attr("title", smartVideoLocale.msgStore.rejectCall);
                        var t = smartVideoLocale.msgStore.incomingText;
                        n("#incoming_text").html(t.replace("{{caller_name}}", peer_name)), n("#callButton_4").attr("title", smartVideoLocale.msgStore.callWithVideo), n("#callButton_1").attr("title", smartVideoLocale.msgStore.callWithVideo), n("#call_video").attr("title", smartVideoLocale.msgStore.callWithVideo), n("#exit_meeting").attr("title", smartVideoLocale.msgStore.exitMeeting), n("#file_transfer").attr("title", smartVideoLocale.msgStore.fileTransfer), n("#showHideVideo").attr("title", smartVideoLocale.msgStore.showHideVideo), n("#showHideAudio").attr("title", smartVideoLocale.msgStore.showHideAudio), n(".wd-v-share").attr("title", smartVideoLocale.msgStore.startShare), n("#startscreenshare").attr("title", smartVideoLocale.msgStore.startShare), n("#stopscreenshare").attr("title", smartVideoLocale.msgStore.stopShare), n(".wd-v-stopshare").attr("title", smartVideoLocale.msgStore.stopShare), n("#cameraSwitch").attr("title", smartVideoLocale.msgStore.cameraSwitch), n("#hangupButton").attr("title", smartVideoLocale.msgStore.hangupButton), n("#enableScreenShare").html(smartVideoLocale.msgStore.enableScreenShare), n("#screensharelink").attr("src", "https://chrome.google.com/webstore/detail/" + svConfigs.chromePluginId), n(".swipe_text_video").html(smartVideoLocale.msgStore.videoScreen), n(".swipe_text").html(smartVideoLocale.msgStore.chatScreen), n(".login-wd-title").html(smartVideoLocale.msgStore.nameFieldForm), n("#login-conference-title").html(smartVideoLocale.msgStore.formConferenceTitle), n("#continue-button").html(smartVideoLocale.msgStore.continueButton), n("#ng_caller_name").attr("placeholder", smartVideoLocale.msgStore.namePlaceholder), n("#ng_caller_avatar").attr("placeholder", smartVideoLocale.msgStore.avatarPlaceholder), n("#ng_password").attr("placeholder", smartVideoLocale.msgStore.passwordPlaceholder), n("#answer_audiocall_button span").html(smartVideoLocale.msgStore.audio), n("#answer_call_button span").html(smartVideoLocale.msgStore.video), n("#reject_call_button span").html(smartVideoLocale.msgStore.reject), n(".wd-v-recording recording-on").attr("title", smartVideoLocale.msgStore.stopRecording), n(".wd-v-recording recording-off").attr("title", smartVideoLocale.msgStore.startRecording), n(".recordingIcon").attr("title", smartVideoLocale.msgStore.recording), n("#whiteboard").attr("title", smartVideoLocale.msgStore.whiteboard), n("#changeView").attr("title", smartVideoLocale.msgStore.changeView), n("#raisehand").attr("title", smartVideoLocale.msgStore.raiseHand), n("#raisehand1").attr("title", smartVideoLocale.msgStore.raiseHand), n("#snapshot").attr("title", smartVideoLocale.msgStore.getSnapshot), n(".recordinglink").html(smartVideoLocale.msgStore.previewRecording), n("#snapshotLink").html(smartVideoLocale.msgStore.snapshotDownload), n(".acceptFile").html(smartVideoLocale.msgStore.acceptFile), n(".rejectFile").html(smartVideoLocale.msgStore.rejectFile), n("#cleanCanvas").attr("title", smartVideoLocale.msgStore.wb_clearall);
                        var o = isiPhone ? smartVideoLocale.msgStore.notSupportedIos : smartVideoLocale.msgStore.notSupportedError;
                        n("#not_supported").html(o), n("#startVideoButton").html(smartVideoLocale.msgStore.continueToCall), n("#chooseVideoAudio").html(smartVideoLocale.msgStore.chooseOptions), n(".feedback-title").html(smartVideoLocale.msgStore.feedbackFieldForm), n("#feedback-button").html(smartVideoLocale.msgStore.feedbackButton), n(".muteMe").html(smartVideoLocale.msgStore.muteMe), n(".turnOffCamera").html(smartVideoLocale.msgStore.turnOffCamera), n("#startRecording").attr("title", smartVideoLocale.msgStore.startRecording), n("#end_meeting").attr("title", smartVideoLocale.msgStore.endMeeting)
                    }), n(document).on("RemoteVideoSessions", function (e) {
                        remoteVideoSessions = e.count
                    }), n(document).on("IncomingCall", function (e) {
                        if ("conference" == conferenceStyle) ui_handler.setWidgetValues(), ui_handler.onIncomingVideo(), e.autoaccept || comm_controller.getVideoSessions() ? setTimeout(function () {
                            comm_controller.answerCall(video_on, !0)
                        }, 1e3) : (playIncomingCall(), ui_handler.toggleRinging(function (e) {
                            e ? comm_controller.answerCall(video_on, !0) : comm_controller.rejectCall()
                        })); else {
                            ui_handler.setWidgetValues(), ui_handler.onIncomingVideo();
                            var t = smartVideoLocale.msgStore.incomingText;
                            n("#incoming_text").html(t.replace("{{caller_name}}", peer_name)), autoAcceptVideo || autoAcceptAudio || svConfigs.videoScreen.autoAcceptVideo || svConfigs.videoScreen.autoAcceptAudio || e.autoaccept || comm_controller.getVideoSessions() ? queryString.isAdmin && setTimeout(function () {
                                svConfigs.videoScreen.greenRoom && !getCookie("lsvGreenRoom") ? (v(), n("#startVideoButton").click(function () {
                                    window.stream && window.stream.getTracks().forEach(function (e) {
                                        e.stop()
                                    }), inCall.push(e.sessionId), comm_controller.answerCall(video_on, !1, videoSource, audioSource, svConfigs.videoScreen.videoConstraint, svConfigs.videoScreen.audioConstraint)
                                })) : ((svConfigs.videoScreen.autoAcceptAudio || autoAcceptAudio) && (video_on = !1), (svConfigs.videoScreen.autoAcceptVideo || autoAcceptVideo) && (video_on = !0), ui_handler.setMobileChatOnly(), ui_handler.displayVideoOnly(), inCall.push(e.sessionId), comm_controller.answerCall(video_on, !1, videoSource, audioSource, svConfigs.videoScreen.videoConstraint, svConfigs.videoScreen.audioConstraint))
                            }, 1e3) : (playIncomingCall(), ui_handler.toggleRinging(function (t) {
                                t ? remoteVideoSessions > 0 ? (n("#wd-widget-content-video-waiting").show(), setTimeout(function () {
                                    h(!0)
                                }, 1e3), inCall.includes(e.sessionId) || (inCall.push(e.sessionId), comm_controller.answerCall(video_on, !0, videoSource, audioSource, svConfigs.videoScreen.videoConstraint, svConfigs.videoScreen.audioConstraint))) : svConfigs.videoScreen.greenRoom && !getCookie("lsvGreenRoom") ? (v(), n("#startVideoButton").click(function () {
                                    window.stream && window.stream.getTracks().forEach(function (e) {
                                        e.stop()
                                    }), inCall.push(e.sessionId), comm_controller.answerCall(video_on, !0, videoSource, audioSource, svConfigs.videoScreen.videoConstraint, svConfigs.videoScreen.audioConstraint)
                                })) : (inCall.push(e.sessionId), comm_controller.answerCall(video_on, !0, videoSource, audioSource, svConfigs.videoScreen.videoConstraint, svConfigs.videoScreen.audioConstraint)) : comm_controller.rejectCall()
                            }))
                        }
                    }), n(".wd-v-hangup").on("click", function () {
                        f()
                    }), n(document).off("LocalVideoStarted"), n(document).on("LocalVideoStarted", function (t) {
                        n("#localVideo").show(), ("conference" == conferenceStyle || queryString.broadcast) && (ui_handler.toggleVideoBox(!0), x(comm_controller.getSessionId(), video_on));
                        var o = !1, i = svConfigs.transcribe ? svConfigs.transcribe.direction : "";
                        "agent" == i ? o = isChrome && queryString.isAdmin && svConfigs.transcribe && 1 == svConfigs.transcribe.enabled : "visitor" == i ? o = isChrome && !queryString.isAdmin && svConfigs.transcribe && 1 == svConfigs.transcribe.enabled : "both" == i && (o = isChrome && svConfigs.transcribe && 1 == svConfigs.transcribe.enabled), o && loadScript("../js/translator.js", function () {
                            translator = new Translator;
                            var n = e.getAttribute("data-langFrom") ? e.getAttribute("data-langFrom") : svConfigs.transcribe.language,
                                t = e.getAttribute("data-langTo") ? e.getAttribute("data-langTo") : svConfigs.transcribe.languageTo;
                            "both" != i || queryString.isAdmin || (n = e.getAttribute("data-langTo") ? e.getAttribute("data-langTo") : svConfigs.transcribe.languageTo, t = e.getAttribute("data-langFrom") ? e.getAttribute("data-langFrom") : svConfigs.transcribe.language), translator.voiceToText(function (e) {
                                t && svConfigs.transcribe.apiKey ? translator.translateLanguage(e, {
                                    from: n,
                                    to: t,
                                    callback: function (e) {
                                        comm_controller.sendTranslateMessage(e, !1)
                                    },
                                    api_key: svConfigs.transcribe.apiKey
                                }) : comm_controller.sendTranslateMessage(e, !1)
                            }, n)
                        }), !queryString.broadcast && svConfigs.videoScreen.separateScreenShare && comm_controller.addToJoinScreenShare()
                    }), n("#end_meeting").on("click", function () {
                        if (f(), localStorage.removeItem("prd"), localStorage.removeItem("hasPrivileges"), queryString.isAdmin) comm_controller.setDeleteAll(), n("#invideo").hide(), n("#ng_info").show(), n("#continue-button").on("click", function () {
                            var e = {
                                name: caller_name = n("#ng_caller_name").val(),
                                email: caller_email,
                                avatar: caller_avatar,
                                room: room
                            };
                            localStorage.setItem("prd", JSON.stringify(e)), comm_controller.setCallerInfo(e, queryString.isAdmin), n("#ng_info").hide(), _()
                        }); else {
                            var e = function () {
                                svConfigs.entryForm.enabled ? (localStorage.removeItem("prd"), localStorage.removeItem("hasPrivileges"), location.reload()) : location.href = "/"
                            };
                            1 != svConfigs.serverSide.feedback || queryString.isAdmin || getCookie("lsvRateRoom") || comm_controller.getVideoSessions() ? e() : (n("#feedback_form").show(), n("#feedback-button").click(function () {
                                if (n("#feedback_form").hide(), token) var t = token; else t = names[comm_controller.getSessionId()].name ? names[comm_controller.getSessionId()].name : guestName(comm_controller.getSessionId());
                                n.ajax({
                                    type: "POST",
                                    url: lsRepUrl + "server/script.php",
                                    data: {
                                        type: "feedback",
                                        roomId: room,
                                        sessionId: comm_controller.getSessionId(),
                                        rate: n("#ratestars").rateit("value"),
                                        text: n("#feedback_message").val(),
                                        userId: t
                                    }
                                }).done(function (e) {
                                    e && setCookie("lsvRateRoom", "1", 240)
                                }).complete(function () {
                                    setCookie("lsvRateRoom", "1", 240), e()
                                }).fail(function () {
                                    console.log(!1)
                                })
                            }))
                        }
                    }), n("#cancel_call_button").on("click", function () {
                        f()
                    }), n("#callButton_1").on("click", function () {
                        video_on = video_iphone_on = !0, ui_handler.setVideoButton(), h(!1)
                    }), n("#callAudioButton_1").on("click", function () {
                        ringBackStart = !0, video_on = !1, ui_handler.setVideoButton(), h(!1)
                    }), n(document).on("NotSupportedBrowser", function (e) {
                        comm_controller.rejectCall(), ui_handler.setVideoBoxOff("video")
                    }), n(document).off("RemoteSpanPosition"), n(document).on("RemoteSpanPosition", function (e) {
                        var t = names[e.sessionId] ? names[e.sessionId].name : peer_name,
                            o = n("<h2 />", {id: "remoteVideoSpan" + e.sessionId, class: "sourcevideospan"});
                        o.css("postion", "absolute"), o.css("top", e.position.top + "px"), o.css("left", e.position.left + "px"), o.appendTo(n("#" + videoElementContainer)), o.html(t)
                    }), n(document).off("MakeBigBroadcast"), n(document).on("MakeBigBroadcast", function (e) {
                        ui_handler.makeBig()
                    }), n(document).off("VoiceSpeaking"), n(document).on("VoiceSpeaking", function (e) {
                        if ("grid" != currentView) {
                            var t = e.id;
                            if (n("#" + t).is(":visible") && !n("#wd-widget-content-whiteboard").is(":visible")) if (clearTimeout(timerVars[t]), svConfigs.videoScreen && "conference" === svConfigs.videoScreen.videoContainerStyle && jQEngager("#" + t)) {
                                if (!(svConfigs.videoScreen.videoConference || names[t].isAdmin || queryString.isAdmin || jQEngager("#" + t).hasClass("bigvideo"))) return;
                                ui_handler.makeAllSmall(), comm_controller.getScreenStreamConnections() || (n("#fullScreen").show(), n("#" + t).detach().appendTo("#video_container"), n("#" + t).removeClass("sourcevideo"), n("#" + t).addClass("bigvideo"), n("#" + t).addClass("bigvideoadd"), comm_controller.getVideoSessions() > 1 ? (n("#" + t).css("height", "85%"), n("#" + t).css("height", "85%")) : (n("#" + t).css("height", "98%"), n("#" + t).css("height", "98%")), ui_handler.changeSpanPositions())
                            } else jQEngager("#" + t).css("border", "1px solid #484d75")
                        }
                    }), n(document).off("VoiceSilence"), n(document).on("VoiceSilence", function (e) {
                        if (svConfigs.videoScreen.videoConference) {
                            var t = e.id;
                            n("#" + t).is(":visible") && (timerVars[t] = setTimeout(function () {
                                svConfigs.videoScreen && "conference" === svConfigs.videoScreen.videoContainerStyle && jQEngager("#" + t) || jQEngager("#" + t).css("border", "1px solid #fff"), n("#translate_message").hide()
                            }, 5e3))
                        }
                    }), n("#changeView").click(function () {
                        ui_handler.changeView(!0)
                    });
                    var s, d, c, g, p, I = function () {
                        g = null, n("#snapshotData").hide(), n(".recordinglink").attr("href", "")
                    };
                    svConfigs.videoScreen.getSnapshot && n("#snapshotLi").click(function () {
                        if (s = n(".bigvideoadd")[0], d = n("#snapshotCanvas")[0], 500, s) {
                            c = s.videoHeight / (s.videoWidth / 500), isNaN(c) && (c = 375);
                            var e = d.getContext("2d");
                            c ? (d.width = 500, d.height = c, e.drawImage(s, 0, 0, 500, c), g = d.toDataURL("image/png"), n("#snapshotData").show(), n("#snapshotLink").attr("href", g), n("#snapshotLink").attr("download", peer_name + ".png"), n("#snapshotLink").click(function () {
                                I()
                            }), n(".close-but-wd-small").on("click", function () {
                                I()
                            })) : I()
                        }
                    });
                    n(document).off("RemoteVideoStarted"), n(document).on("RemoteVideoStarted", function (e) {
                        var t = document.querySelector("video#videoPreview");
                        if (t && (t.src = "", t.srcObject = null), "conference" == conferenceStyle) !isChrome && !isFirefox || isiPhone || isAndroid || !queryString.isAdmin || 1 != svConfigs.recording.enabled || 0 != svConfigs.recording.autoStart || n(".fa-circle").show(), n("#permission_div").hide(), n("#video_back").hide(), stopIncomingCall(), n("#wd-widget-content-whiteboard").is(":visible") || (ui_handler.toggleVideoBox(!0), (isChrome || isFirefox) && !isiPhone && !isAndroid && queryString.isAdmin && svConfigs.recording.enabled && svConfigs.recording.autoStart && l()), x(comm_controller.getSessionId(), video_on), playEnterRoom(), ui_handler.changeView(!1); else {
                            !isChrome && !isFirefox || isiPhone || isAndroid || !queryString.isAdmin || 1 != svConfigs.recording.enabled || 0 != svConfigs.recording.autoStart || n(".wd-v-recording").show(), n("#permission_div").hide(), n("#video_back").hide(), stopIncomingCall();
                            try {
                                ui_handler.toggleVideoBox(!0), (isChrome || isFirefox) && !isiPhone && !isAndroid && queryString.isAdmin && svConfigs.recording.enabled && svConfigs.recording.autoStart && l()
                            } catch (e) {
                                console.log(e)
                            }
                        }
                        I()
                    }), n(document).on("VideoRemoved", function (e) {
                        video_on = !1, ui_handler.setVideoButton(), x(comm_controller.getSessionId(), !1), names[comm_controller.getSessionId()].video = !1, names[comm_controller.getSessionId()].room = room, localStorage.setItem("prd", JSON.stringify(names[comm_controller.getSessionId()]))
                    }), n(document).on("AudioRemoved", function (e) {
                        ui_handler.disableAudio(), audio_on = !1, ui_handler.setMuteButton(), names[comm_controller.getSessionId()] && (names[comm_controller.getSessionId()].muted = !0, names[comm_controller.getSessionId()].room = room, localStorage.setItem("prd", JSON.stringify(names[comm_controller.getSessionId()]))), r()
                    }), n(document).on("VideoMuted", function (e) {
                        ui_handler.disableVideo(), video_on = !1, ui_handler.setVideoButton(), x(comm_controller.getSessionId(), !1), n("#localVideo").hide()
                    }), n(document).on("VideoUnmuted", function (e) {
                        video_on = !0, ui_handler.setVideoButton(), x(comm_controller.getSessionId(), !0), n("#localVideo").show()
                    }), n(document).on("AudioMuted", function (e) {
                        audio_on = !1, ui_handler.setMuteButton(), names[comm_controller.getSessionId()] && (names[comm_controller.getSessionId()].muted = !0), r()
                    }), n(document).on("AudioUnmuted", function (e) {
                        audio_on = !0, ui_handler.setMuteButton(), names[comm_controller.getSessionId()] && (names[comm_controller.getSessionId()].muted = !1), r()
                    }), n(document).on("RemoteVideoMuted", function (e) {
                        n("#" + e.sessionId).hide(), n("#remoteVideoSpan" + e.sessionId).hide(), x(e.sessionId, !1)
                    }), n(document).on("BlockUser", function (e) {
                        comm_controller.getSessionId() == e.sessionId && (f(), localStorage.removeItem("prd"), localStorage.removeItem("hasPrivileges"), comm_controller.setClose(comm_controller.getSessionId()), delete names[e.sessionId], location.reload())
                    }), n(document).on("RevokePriveleges", function (e) {
                        names[e.sessionId].priv = !1, comm_controller.getSessionId() == e.sessionId && (n(".fa-hand-paper-o").closest("a").removeClass("active"), localStorage.removeItem("hasPrivileges"), n("#hangupBroadcastButton").trigger("click"), comm_controller.revokeBroadcast(), n("#screenshareLi").hide(), n("#whiteboardLi").hide(), n("#localVideo").hide())
                    }), n(document).on("GrantPriveleges", function (e) {
                        names[e.sessionId].priv = !0, comm_controller.getSessionId() == e.sessionId && (localStorage.setItem("hasPrivileges", !0), n(".fa-hand-paper-o").closest("a").removeClass("active"), comm_controller.joinBroadcast(), !(isChrome || isFirefox || isOpera || isSafariA) || isiPhone || isAndroid || !queryString.room && !queryString.broadcast || n("#screenshareLi").show(), 1 == svConfigs.whiteboard.enabled && svConfigs.whiteboard.allowAnonymous && n("#whiteboardLi").show())
                    }), n(document).on("RemoteVideoUnmuted", function (e) {
                        n("#" + e.sessionId).show(), n("#remoteVideoSpan" + e.sessionId).show(), x(e.sessionId, !0)
                    }), n(document).on("RemoteAudioMuted", function (e) {
                        names[e.sessionId] && (names[e.sessionId].muted = !0), r()
                    }), n(document).on("RemoteAudioUnmuted", function (e) {
                        names[e.sessionId] && (names[e.sessionId].muted = !1), r()
                    }), n(document).on("ForceAudioMuted", function (e) {
                        if (e.sessionId == comm_controller.getSessionId()) {
                            audio_on = !1;
                            var n = localStorage.getItem("prd");
                            (n = JSON.parse(n)).muted = !audio_on, n.room = room, localStorage.setItem("prd", JSON.stringify(n)), comm_controller.toggleAudio()
                        }
                    }), n(document).on("ForceAudioMutedAll", function (e) {
                        audio_on = !1;
                        var n = localStorage.getItem("prd");
                        (n = JSON.parse(n)).muted = !audio_on, n.room = room, localStorage.setItem("prd", JSON.stringify(n)), comm_controller.toggleAudio()
                    }), n(document).on("ForceDelete", function (e) {
                        e.sessionId == comm_controller.getSessionId() && (f(), n("#invideo").hide(), localStorage.removeItem("prd"), localStorage.removeItem("hasPrivileges"), location.reload())
                    }), n(document).on("ForceDeleteAll", function (e) {
                        f(), is_widget_opened = !1, n("#invideo").hide(), localStorage.removeItem("prd"), localStorage.removeItem("hasPrivileges"), location.reload()
                    }), n("#fullscreenButton").on("click", function () {
                        n("#fullScreen").hide(), n("#exitFullScreen").show(), toggleFullScreen()
                    }), n("#exitFullscreenButton").on("click", function () {
                        n("#fullScreen").show(), n("#exitFullScreen").hide(), toggleFullScreen()
                    }), n("#call_video").off(), n("#call_audio").off(), n("#call_video").on("click", function () {
                        video_on = !0, E(!0)
                    }), n("#call_audio").on("click", function () {
                        isiPhone ? (video_on = !0, video_iphone_on = !1) : video_on = !1, E(!0)
                    }), n(".wd-v-text").on("click", function () {
                        E(!1)
                    }), n("#slide_video").on("click", function () {
                        E(!1)
                    }), (isAndroid || isiPhone) && (n("#mainleft_div").on("swipe", function () {
                        E(!1)
                    }), n(".wd-chat-box").on("swipe", function () {
                        E(!1)
                    })), n("#showHideAudio").on("click", function () {
                        audio_on || video_on || comm_controller.initCall("Audio", !1, videoSource, comm_controller.getSessionId(), audioSource, svConfigs.videoScreen.videoConstraint, svConfigs.videoScreen.audioConstraint), audio_on = !audio_on;
                        var e = localStorage.getItem("prd");
                        (e = JSON.parse(e)).muted = !audio_on, e.room = room, localStorage.setItem("prd", JSON.stringify(e)), comm_controller.toggleAudio()
                    }), n("#showHideVideo").on("click", function () {
                        audio_on || video_on || comm_controller.initCall("Video", !1, videoSource, comm_controller.getSessionId(), audioSource, svConfigs.videoScreen.videoConstraint, svConfigs.videoScreen.audioConstraint), video_on = !video_on;
                        var e = localStorage.getItem("prd");
                        (e = JSON.parse(e)).video = video_on, e.room = room, localStorage.setItem("prd", JSON.stringify(e)), comm_controller.toggleVideo()
                    }), n(document).on("RemoteVideoStopped", function (e) {
                        ui_handler.changeView(!1)
                    }), n(document).on("MediaDevices", function (e) {
                        (videoDevices = e.devices).length > 1 && (n("#cameraSwitch").show(), n("#cameraSwitch").off(), n("#cameraSwitch").click(function () {
                            (videoCurrentId += 1) === videoDevices.length && (videoCurrentId = 0), video_on = !0, isiPhone ? comm_controller.forceStopCall() : comm_controller.renegotiate(videoDevices[videoCurrentId].value)
                        }))
                    }), n(document).on("RestartVideo", function (e) {
                        f(), video_on = !0, ui_handler.displayVideoOnly(), setTimeout(function () {
                            h(!0)
                        }, 1e3)
                    }), n(document).on("CallAccepted", function (e) {
                        stopIncomingCall()
                    }), n(document).on("CallRejected", function (e) {
                        stopIncomingCall()
                    }), n(document).on("CallFailed", function (e) {
                        stopIncomingCall()
                    }), n(document).on("LocalVideoStopped", function (e) {
                    }), n(document).on("ChatRejected", function (e) {
                    }), n(document).off("CallEnded"), n(document).on("CallEnded", function (e) {
                        a(e.sessionId)
                    }), n(document).off("TogglePermissionDenied"), n(document).on("TogglePermissionDenied", function (e) {
                        a(e.sessionId), ui_handler.togglePermissionWidget(!1)
                    }), n(document).on("CheckPopup", function (e) {
                        comm_controller.setPing(comm_controller.getSessionId())
                    }), n(document).off("CallerInfo"), n(document).on("CallerInfo", function (e) {
                        e.callerInfo && e.callerInfo.name && (passRoom || e.callerInfo.password ? (queryString.isAdmin && comm_controller.sendCallerBack(e.callerInfo.password == passRoom, e.sessionId), e.callerInfo.password == passRoom && i(e)) : i(e))
                    }), n(document).off("AdminPopupOffline"), n(document).on("AdminPopupOffline", function (e) {
                        "conference" != conferenceStyle && (isOnline = !1, T())
                    }), n(document).off("PopupOffline"), n(document).on("PopupOffline", function (e) {
                        "conference" != conferenceStyle && (isOnline = !1, T())
                    }), n(document).off("PopupLeft"), n(document).on("PopupLeft", function (e) {
                        if (names[e.sessionId] && names[e.sessionId].name) {
                            var t = smartVideoLocale.msgStore.leftChat.replace("{{caller_name}}", names[e.sessionId].name);
                            svConfigs.videoScreen && svConfigs.videoScreen.waitingRoom ? toggleError(t, 5e3) : (showMessage("", t, null, "leftChat"), svConfigs.serverSide.chatHistory && saveChat(t, "", "leftChat", agentId, "", names))
                        }
                        var o = document.getElementById(e.sessionId);
                        o && (o.parentNode.removeChild(o), n("#remoteVideoSpan" + e.sessionId).remove()), delete names[e.sessionId], r()
                    }), n(".box-title").on("click", function () {
                        ui_handler.toggleVisitors(!0)
                    }), n("#toVideo").on("click", function () {
                        comm_controller.getStream() || "conference" == conferenceStyle ? (ui_handler.displayVideoOnly(), comm_controller.toVideo(), ui_handler.changeView(!1)) : ui_handler.toggleInstaChat()
                    }), n(document).on("ToVideo", function (e) {
                        ui_handler.displayVideoOnly(), ui_handler.changeView(!1)
                    }), n("#cleanCanvas").on("click", function () {
                        comm_controller.clearCanvas()
                    }), n(document).on("WhiteboardSync", function (e) {
                        "list" == currentView ? ui_handler.makeAllSmall() : ui_handler.makeAllSmallGrid(), ui_handler.toggleInstaWhiteboard()
                    }), n("#mainleft_div").hover(function () {
                        n(".wd-video-c").delay(200).show()
                    }, function () {
                        n(".wd-video-c").delay(200).hide()
                    }), n("#whiteboard").off(), n("#whiteboard").on("click", function () {
                        "list" == currentView ? ui_handler.makeAllSmall() : ui_handler.makeAllSmallGrid(), ui_handler.toggleInstaWhiteboard(), n("#cleanCanvas").show(), (queryString.isAdmin || localStorage.getItem("hasPrivileges")) && comm_controller.startWhiteboard()
                    }), n("#raisehand").off(), n("#raisehand").on("click", function () {
                        S("raiseHand");
                        var e = smartVideoLocale.msgStore.raiseHandText.replace("{{caller_name}}", names[comm_controller.getSessionId()].name);
                        n(".fa-hand-paper-o").closest("a").addClass("active"), svConfigs.videoScreen && svConfigs.videoScreen.waitingRoom ? toggleError(e, 5e3) : showMessage("", e, null, "raiseHand")
                    }), n("#raisehand1").off(), n("#raisehand1").on("click", function () {
                        S("raiseHand");
                        var e = smartVideoLocale.msgStore.raiseHandText.replace("{{caller_name}}", names[comm_controller.getSessionId()].name);
                        n(".fa-hand-paper-o").closest("a").addClass("active"), svConfigs.videoScreen && svConfigs.videoScreen.waitingRoom ? toggleError(e, 5e3) : showMessage("", e, null, "raiseHand")
                    }), 1 == svConfigs.whiteboard.enabled && (queryString.isAdmin && !svConfigs.videoScreen.videoFileStream && (n("#whiteboard_div").show(), n("#whiteboardLi").show()), loadScript("../js/canvas-designer-widget.js", function () {
                    })), 1 == svConfigs.serverSide.roomInfo && queryString.isAdmin && n("#exitmeeting_div").show(), 1 == svConfigs.serverSide.feedback && loadScript("../js/jquery.rateit.js", function () {
                    }), n(document).off("ChatMessage"), n(document).on("ChatMessage", function (e) {
                        var t = names[e.sessionId] ? names[e.sessionId].name : peer_name,
                            o = names[e.sessionId] ? names[e.sessionId].avatar : peer_avatar;
                        if ("raiseHand" == e.msg) {
                            var i = smartVideoLocale.msgStore.raiseHandText.replace("{{caller_name}}", names[e.sessionId].name);
                            svConfigs.videoScreen && svConfigs.videoScreen.waitingRoom ? toggleError(i, 5e3) : showMessage("", i, null, "raiseHand"), names[e.sessionId].raiseHand = !0, r(), setTimeout(function () {
                                names[e.sessionId].raiseHand = !1, r()
                            }, 15e4)
                        } else if ("sendFile" == e.msg) {
                            var a = e.sessionId ? names[e.sessionId].name : peer_name,
                                s = smartVideoLocale.msgStore.incomingFile;
                            s = s.replace("{{caller_name}}", a), svConfigs.videoScreen && svConfigs.videoScreen.waitingRoom ? toggleError(s, 5e3) : showMessage("", s, null, "sendFile")
                        } else showMessage(t, e.msg, null, null, o);
                        "conference" == conferenceStyle ? n("#formito_chat").hasClass("is-open") ? n(".new_chat_badge_container").hide() : n(".new_chat_badge_container").show() : svConfigs.videoScreen && !0 === svConfigs.videoScreen.chat ? n(".wd-v-text").hide() : n(".new_chat_badge_container").show()
                    }), n(document).off("TranslateMessage"), n(document).on("TranslateMessage", function (e) {
                        var n = names[e.sessionId] ? names[e.sessionId].name : peer_name;
                        names[e.sessionId] && names[e.sessionId].avatar;
                        ui_handler.showTranslateMessage(n + ": " + e.msg)
                    }), n(document).off("SendTyping"), n(document).on("SendTyping", function (e) {
                        if (e.typing) {
                            n('li[data-system-attribue="chatTyping"]').remove(), n('div[data-system-attribue="chatTyping"]').remove();
                            var t = names[e.sessionId] ? names[e.sessionId].name : guestName(e.sessionId);
                            showMessage("", t + " is typing", null, "chatTyping")
                        } else n('li[data-system-attribue="chatTyping"]').remove(), n('div[data-system-attribue="chatTyping"]').remove()
                    });
                    var k = 0;
                    n("#newdev_chat_message1").keyup(function (e) {
                        if (clearTimeout(p), ++k % 3 == 0 && comm_controller.sendTyping(!0), p = setTimeout(function () {
                            comm_controller.sendTyping(!1)
                        }, 1200), "conference" == conferenceStyle) var t = n("#newdev_chat_message1").val(); else t = n("#newdev_chat_message1").text();
                        13 == e.keyCode && t && (user_act = !0, S(t, !0), n("#newdev_chat_message1").html(""), n("#newdev_chat_message1").val(""), comm_controller.sendTyping(!1))
                    }), isOnline || queryString.isAdmin ? setTimeout(function () {
                        A()
                    }, 100) : T(), n(document).off("IncomingFileTransfer"), n(document).on("IncomingFileTransfer", function (e) {
                        if (e.sender) {
                            var n = smartVideoLocale.msgStore.sendingFile;
                            showMessage("", n + e.name + '<br/><div class="progress"><progress id="progress' + e.fileId + '" max="0" value="0"></progress></div>', null, "fileTransfer")
                        } else {
                            var t = e.fileId,
                                o = e.name + '<br/><div class="progress"><progress id="progress' + t + '" max="0" value="0"></progress></div><span id="download' + t + '"></span>';
                            showMessage("", o, null, "fileTransfer"), svConfigs.serverSide.chatHistory && saveChat(smartVideoLocale.msgStore.receivingFile + e.name, "", "fileTransfer", agentId, "", names)
                        }
                    }), n("#file_transfer").off(), n("#file_transfer").on("click", function (e) {
                        (new FileSelector).selectSingleFile(function (e) {
                            S("sendFile"), comm_controller.sendFile(e)
                        })
                    }), n(document).off("SendCallerBack"), n(document).on("SendCallerBack", function (e) {
                        if (!queryString.isAdmin && e.sessionId == comm_controller.getSessionId() && !is_callerback) {
                            if (is_callerback = !0, toggleNotification("", !1), !e.access) return localStorage.removeItem("prd"), localStorage.removeItem("prdTmp"), location.reload(), !1;
                            isOnline = !0, ui_handler.setDisabled(!1), n("#ng_info").hide(), n("#continue-button").off(), localStorage.getItem("prdTmp") && (localStorage.setItem("prd", localStorage.getItem("prdTmp")), localStorage.removeItem("prdTmp"));
                            var t = localStorage.getItem("prd");
                            names[comm_controller.getSessionId()] = {
                                name: t ? t.name : caller_name,
                                avatar: t ? t.avatar : caller_avatar,
                                email: t ? t.email : caller_email
                            }, "conference" == conferenceStyle && _()
                        }
                    }), n("#newdev_chat_button1").click(function (e) {
                        C("newdev_chat_message1")
                    }), n(document).off("AdminPopupOnline"), n(document).on("AdminPopupOnline", function (e) {
                        isOnline = !0, requirePass = null != e.pass && e.pass, A()
                    }), n(document).off("PopupOnline"), n(document).on("PopupOnline", function (e) {
                        e.sessionId && "visitor" !== e.sessionId && (names[e.sessionId] || (names[e.sessionId] = {
                            avatar: e.avatar ? e.avatar : lsRepUrl + "img/small-avatar.jpg",
                            name: e.name ? e.name : guestName(e.sessionId)
                        }, e.callerInfo && i(e), u()), isOnline = !0, requirePass = null != e.pass && e.pass, A(e.sessionId))
                    }), n(".wd-v-recording").on("click", function () {
                        multiStreamRecorder && "recording" == multiStreamRecorder.getState() ? m(!0) : l()
                    }), n("#startRecording").on("click", function () {
                        multiStreamRecorder && "recording" == multiStreamRecorder.getState() ? m(!0) : l()
                    }), n(document).on("RemoteStartRecording", function (e) {
                        n(".recordingIcon").show()
                    }), n(document).on("RemoteStopRecording", function (e) {
                        n(".recordingIcon").hide()
                    }), n(document).on("ScreenShareFailed", function (e) {
                        toggleError("Screen Share failed"), w(!1)
                    }), n(document).off("RemoteScreenShareStarted"), n(document).on("RemoteScreenShareStarted", function (e) {
                        !queryString.broadcast && svConfigs.videoScreen.separateScreenShare && ("list" == currentView ? ui_handler.makeAllSmall() : ui_handler.makeAllSmallGrid()), ui_handler.displayScreenShare(), n("#remoteScreen").show(), ui_handler.setScreenDisabled(!0)
                    }), n(document).off("ScreenShareEnded"), n(document).on("ScreenShareEnded", function (e) {
                        ui_handler.setScreenDisabled(!1), w(!1), n("#remoteScreen").is(":visible") || comm_controller.getStream() || ("conference" == conferenceStyle ? ui_handler.displayVideoOnly() : ui_handler.toggleInstaChat())
                    }), n(document).on("EndMeeting", function (e) {
                        R(!1)
                    }), n("#exit_meeting").on("click", function () {
                        n("#hangupBroadcastButton").trigger("click"), f(), comm_controller.endMeeting(), R(!0)
                    }), (isChrome || isFirefox || isOpera || isSafariA) && !isiPhone && (queryString.room || queryString.broadcast || localStorage.getItem("hasPrivileges")) && (n(".wd-v-share").show(), n("#screenshare_div").show(), n(document).on("PluginDetected", function (e) {
                        pluginInstalled = !0
                    }), n(document).on("PluginNotDetected", function (e) {
                        pluginInstalled = !1
                    }), n(".control-ss > a").click(function () {
                        n(".control-ss").hide()
                    }));
                    var M = function () {
                        b()
                    };
                    n(".wd-v-share").on("click", function () {
                        M()
                    }), n("#startscreenshare").off("click", function () {
                    }), n("#startscreenshare").on("click", function () {
                        isOnline ? (ui_handler.displayVideoOnly(), M()) : T()
                    }), n(".wd-v-stopshare").on("click", function () {
                        y()
                    }), n("#stopscreenshare").on("click", function () {
                        y()
                    }), (queryString.isAdmin || queryString.broadcast) && (isChrome || isFirefox || isOpera) && !isiPhone && 1 == svConfigs.recording.enabled && loadScript(lsRepUrl + "js/msr.js", function () {
                    }), svConfigs.videoScreen && svConfigs.videoScreen.onlyAgentButtons && !queryString.isAdmin && ui_handler.setAgentOnlyButtons(), disableVideo && ui_handler.disableVideo(), disableAudio && ui_handler.disableAudio(), disableScreenShare && ui_handler.disableScreenShare(), disableWhiteboard && ui_handler.disableWhiteboard(), disableTransfer && ui_handler.disableTransfer(), n(document).on("click", ".closebtn", function () {
                        n("body").removeClass("menuopen"), n(".menu-link").removeClass("active")
                    }), n(document).on("click", ".fo-icon", function () {
                        n(".formito-launcher").toggleClass("is-open"), n(".new_chat_badge_container").hide()
                    }), n(document).on("click", ".fa-users", function (e) {
                        n("#attendees").toggle(), e.stopPropagation()
                    }), n(document.body).on("click", function (e) {
                        var t = e.target.id;
                        "private_message_small" !== t && "fausers" !== t && (n("#attendees").hide(), n("#visitor_message").hide())
                    }), n(document).mouseup(function (e) {
                        var t;
                        (t = n("#nd_widget_visitors")).is(e.target) || 0 !== t.has(e.target).length || ui_handler.toggleVisitors(!1), (t = n("#feedback_form")).is(e.target) || 0 !== t.has(e.target).length || n("#feedback_form").hide()
                    }), smartVideoLocale.persistMsgStore(smartVideoLocale.msgStore), r(), loadScript(lsRepUrl + "js/additional.js", function () {
                    })
                })
            }

            (ui_handler = new uiHandler).init(jQuery, o, comm_controller), jQuery(document).on("CommConnected", function (e) {
                function n() {
                    deleteCookie("lsvGreenRoom")
                }

                if (window.addEventListener ? window.addEventListener("beforeunload", n, !1) : window.attachEvent("onbeforeunload", n), isAndroid || isiPhone) {
                    loadScript("https://webrtc.github.io/adapter/adapter-latest.js", void loadScript("https://code.jquery.com/mobile/1.4.5/jquery.mobile-1.4.5.min.js", M()))
                } else loadScript(isIEA ? "https://cdn.temasys.com.sg/adapterjs/0.15.x/adapter.screenshare.js" : "https://webrtc.github.io/adapter/adapter-latest.js", M())
            })
        });
        const o = e => {
            switch (e.type) {
                case"pagehide":
                case"pageshow":
                    e.persisted;
                    break;
                case"focus":
                    isiPhone && comm_controller.startStopIphone()
            }
        };
        ["pagehide", "pageshow", "focus", "unload", "load", "blur"].forEach(e => window.addEventListener(e, o))
    };

function loadScript(e, n) {
    var t = document.createElement("script");
    t.type = "text/javascript", t.readyState ? t.onreadystatechange = function () {
        "loaded" != t.readyState && "complete" != t.readyState || (t.onreadystatechange = null, n && n())
    } : t.onload = function () {
        n && n()
    }, t.src = e + "?v=" + currVersion, document.getElementsByTagName("head")[0].appendChild(t)
}

var init = new main;