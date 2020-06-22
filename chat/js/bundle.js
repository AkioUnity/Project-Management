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
    isFirefox = "undefined" != typeof InstallTrigger, queryString = QueryString(),
    isSafariA = (!queryString.isSafari || "false" != queryString.isSafari) && (Object.prototype.toString.call(window.HTMLElement).indexOf("Constructor") > 0 || "[object SafariRemoteNotification]" === (!window.safari || safari.pushNotification).toString()),
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
        i = n.getFullYear(), r = new Date(1e3 * e), s = r.getFullYear(), a = ("0" + (r.getMonth() + 1)).slice(-2),
        c = ("0" + r.getDate()).slice(-2), d = ("0" + r.getHours()).slice(-2), u = ("0" + r.getMinutes()).slice(-2);
    return t == c && o == a && i == s ? d + ":" + u : c + "." + a + "." + s + " " + d + ":" + u
}, convertTimestamp = function (e, n) {
    var t = new Date, o = new Date(e),
        i = (t.getFullYear() !== o.getFullYear() && o.getFullYear(), ("0" + (o.getMonth() + 1)).slice(-2), ("0" + o.getDate()).slice(-2), o.getHours()),
        r = o.getMinutes(), s = i >= 12 ? "pm" : "am", a = i % 12;
    return a = a || 12, r = r < 10 ? "0" + r : r, time = a + ":" + r + " " + s, time
}, compareDates = function (e, n) {
    var t = new Date(e);
    t.setHours(0, 0, 0, 0);
    var o = new Date(n);
    return o.setHours(0, 0, 0, 0), t.getTime() === o.getTime()
}, escapeHtmlEntities = function (e) {
    return "undefined" != typeof jQuery ? jQuery("<div/>").text(e).html() : e.replace(/&/g, "&amp;").replace(/>/g, "&gt;").replace(/</g, "&lt;").replace(/"/g, "&quot;")
}, showMessage = function (e, n, t, o, i, r) {
    if (n) {
        var s = getPrettyDate((new Date).getTime() / 1e3);
        if (t = "" !== t && null !== t && "undefined" !== t && void 0 !== t ? t : "" === e ? "" : s, "conference" == conferenceStyle) {
            if ("Me" === e) {
                e = smartVideoLocale.msgStore.me, className = "media media-chat media-chat-reverse"
            } else "" === e ? className = "media media-meta-day" : ($("#peer_name_chat").text(e), playIncomingMessage(), "undefined" === e && (e = "Guest"), className = "p-10 media-chat", i || (i = lsRepUrl + "img/small-avatar.jpg"), g = i, "avatar " + e);
            if (o = o || "", prevId && e == prevId) l = prevMsgP, c = prevBody; else {
                if ((l = $("<div />", {class: className})).attr("data-system-attribue", o), e && "Me" !== e) {
                    var a = $("<h6 />", {});
                    a.appendTo(l), a.html(e)
                }
                var c = $("<div />", {class: "media-body"});
                c.appendTo(l)
            }
            var d;
            (d = $("<p />")).html(n), d.appendTo(c), (d = $("<p />", {class: "meta"})).html('<time datetime="2018">' + t + "</time>"), d.appendTo(c), l.appendTo($("#chat-content")), $("#typing").html(""), prevId = e, prevMsgP = l, prevBody = c, (u = document.getElementById("chat-content")).scrollTop = 999999
        } else {
            var u, l = document.createElement("li"), m = "left", f = "", g = "";
            if ("Me" === e || "Me~" == e.substring(0, 3)) {
                m = "right";
                var p = "";
                if ("Me~" == e.substring(0, 3)) if (e = e.substring(3, 300), p = " right-image", "img/small-avatar.jpg" !== i && i) g = '<img class="direct-chat-img ' + m + '" src="' + i + '" alt="" />'; else g = (g = e.match(/\b(\w)/g).join("").toUpperCase()) ? '<span class="acronym-right">' + g + "</span>" : '<img class="direct-chat-img ' + m + '" src="img/small-avatar.jpg" alt="" />';
                e = smartVideoLocale.msgStore.me, className = "wd-right-bubble" + p
            } else if ("" === e) {
                var v = "";
                "divider" === o && (v = " divider"), className = "wd-system-bubble" + v
            } else if (playIncomingMessage(), "undefined" === e && (e = "Guest"), f = "wd-chat-name", "wd-chat-avatar", className = "wd-left-bubble", i || (i = "/img/small-avatar.jpg"), g = '<img class="direct-chat-img ' + m + " " + guestName(e) + '" src="' + i + '" alt="" />', "He~" == e.substring(0, 3)) if (e = e.substring(3, 500), "/img/small-avatar.jpg" !== i && i) g = '<img class="direct-chat-img ' + m + " " + guestName(e) + '" src="' + i + '" alt="" />'; else {
                g = e.match(/\b(\w)/g).join("").toUpperCase();
                var h = svg1 + g + svg2;
                image = "data:image/svg+xml;base64," + btoa(h), g = g ? '<img class="direct-chat-img ' + m + " " + guestName(e) + '" src="' + image + '" alt="" />' : '<img class="direct-chat-img ' + m + " " + guestName(e) + '" src="/img/small-avatar.jpg" alt="" />'
            }
            o = o || "", l.setAttribute("data-system-attribue", o), l.innerHTML = '<div class="' + className + '">' + g + '<span class="' + f + '">' + e + '</span><span class="timestamp">' + t + "</span><div>" + n + "</div>", (u = document.getElementById("newdev_chat_ul1")).appendChild(l), u.scrollTop = 999999
        }
    }
}, saveChat = function (e, n, t, o, i, r) {
    var s = queryString.names ? queryString.names : svConfigs.agentName, a = (new Date).toISOString();
    $.ajax({
        type: "POST",
        url: lsRepUrl + "/server/script.php",
        data: {
            type: "addchat",
            roomId: roomId || queryString.room,
            message: e,
            agent: s,
            agentId: o,
            from: n,
            participants: Object.keys(r).toString(),
            system: t,
            avatar: i,
            datetime: a
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
    var o = e, i = n, r = new Date, s = r.getTime() + 36e5 * parseInt(t);
    r.setTime(s), document.cookie = t ? o + "=" + i + ";expires=" + r.toGMTString() + ";path=/" : o + "=" + i + ";path=/"
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

var notifyHandler = function () {
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
};
!function (e) {
    var n, t = {
        msgStore: {}, persistMsgStore: function (e) {
            this.msgStore = e;
            var t = n.Event("LSLocaleUpdated");
            n(document).trigger(t)
        }, setLanguage: function (e, o) {
            n.ajax({
                url: o + "locales/" + e + ".json", dataType: "json", success: function (e) {
                    t.persistMsgStore(e)
                }, error: function (e) {
                    n.getJSON(o + "locales/en_US.json", function (e) {
                        t.persistMsgStore(e)
                    })
                }
            })
        }, initMsgStore: function (e) {
            var n = e.lang;
            t.setLanguage(n, e.lsRepUrl)
        }, init: function (e, t) {
            n = t, this.initMsgStore(e)
        }
    };
    e.smartVideoLocale = t
}(window);
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
    }, s = o.WordArray = r.extend({
        init: function (e, n) {
            e = this.words = e || [], this.sigBytes = null != n ? n : 4 * e.length
        }, toString: function (e) {
            return (e || c).stringify(this)
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
            return new s.init(t, n)
        }
    }), a = t.enc = {}, c = a.Hex = {
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
            return new s.init(t, n / 2)
        }
    }, d = a.Latin1 = {
        stringify: function (e) {
            var n = e.words;
            e = e.sigBytes;
            for (var t = [], o = 0; o < e; o++) t.push(String.fromCharCode(n[o >>> 2] >>> 24 - o % 4 * 8 & 255));
            return t.join("")
        }, parse: function (e) {
            for (var n = e.length, t = [], o = 0; o < n; o++) t[o >>> 2] |= (255 & e.charCodeAt(o)) << 24 - o % 4 * 8;
            return new s.init(t, n)
        }
    }, u = a.Utf8 = {
        stringify: function (e) {
            try {
                return decodeURIComponent(escape(d.stringify(e)))
            } catch (e) {
                throw Error("Malformed UTF-8 data")
            }
        }, parse: function (e) {
            return d.parse(unescape(encodeURIComponent(e)))
        }
    }, l = o.BufferedBlockAlgorithm = r.extend({
        reset: function () {
            this._data = new s.init, this._nDataBytes = 0
        }, _append: function (e) {
            "string" == typeof e && (e = u.parse(e)), this._data.concat(e), this._nDataBytes += e.sigBytes
        }, _process: function (n) {
            var t = this._data, o = t.words, i = t.sigBytes, r = this.blockSize, a = i / (4 * r);
            if (n = (a = n ? e.ceil(a) : e.max((0 | a) - this._minBufferSize, 0)) * r, i = e.min(4 * n, i), n) {
                for (var c = 0; c < n; c += r) this._doProcessBlock(o, c);
                c = o.splice(0, n), t.sigBytes -= i
            }
            return new s.init(c, i)
        }, clone: function () {
            var e = r.clone.call(this);
            return e._data = this._data.clone(), e
        }, _minBufferSize: 0
    });
    o.Hasher = l.extend({
        cfg: r.extend(), init: function (e) {
            this.cfg = this.cfg.extend(e), this.reset()
        }, reset: function () {
            l.reset.call(this), this._doReset()
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
            for (var i = 0; i < t; i += 3) for (var r = (n[i >>> 2] >>> 24 - i % 4 * 8 & 255) << 16 | (n[i + 1 >>> 2] >>> 24 - (i + 1) % 4 * 8 & 255) << 8 | n[i + 2 >>> 2] >>> 24 - (i + 2) % 4 * 8 & 255, s = 0; 4 > s && i + .75 * s < t; s++) e.push(o.charAt(r >>> 6 * (3 - s) & 63));
            if (n = o.charAt(64)) for (; e.length % 4;) e.push(n);
            return e.join("")
        }, parse: function (e) {
            var t = e.length, o = this._map;
            (i = o.charAt(64)) && (-1 != (i = e.indexOf(i)) && (t = i));
            for (var i = [], r = 0, s = 0; s < t; s++) if (s % 4) {
                var a = o.indexOf(e.charAt(s - 1)) << s % 4 * 2, c = o.indexOf(e.charAt(s)) >>> 6 - s % 4 * 2;
                i[r >>> 2] |= (a | c) << 24 - r % 4 * 8, r++
            }
            return n.create(i, r)
        }, _map: "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/="
    }
}(), function (e) {
    function n(e, n, t, o, i, r, s) {
        return ((e = e + (n & t | ~n & o) + i + s) << r | e >>> 32 - r) + n
    }

    function t(e, n, t, o, i, r, s) {
        return ((e = e + (n & o | t & ~o) + i + s) << r | e >>> 32 - r) + n
    }

    function o(e, n, t, o, i, r, s) {
        return ((e = e + (n ^ t ^ o) + i + s) << r | e >>> 32 - r) + n
    }

    function i(e, n, t, o, i, r, s) {
        return ((e = e + (t ^ (n | ~o)) + i + s) << r | e >>> 32 - r) + n
    }

    for (var r = CryptoJS, s = (c = r.lib).WordArray, a = c.Hasher, c = r.algo, d = [], u = 0; 64 > u; u++) d[u] = 4294967296 * e.abs(e.sin(u + 1)) | 0;
    c = c.MD5 = a.extend({
        _doReset: function () {
            this._hash = new s.init([1732584193, 4023233417, 2562383102, 271733878])
        }, _doProcessBlock: function (e, r) {
            for (var s = 0; 16 > s; s++) {
                var a = e[c = r + s];
                e[c] = 16711935 & (a << 8 | a >>> 24) | 4278255360 & (a << 24 | a >>> 8)
            }
            s = this._hash.words;
            var c = e[r + 0], u = (a = e[r + 1], e[r + 2]), l = e[r + 3], m = e[r + 4], f = e[r + 5], g = e[r + 6],
                p = e[r + 7], v = e[r + 8], h = e[r + 9], C = e[r + 10], S = e[r + 11], y = e[r + 12], w = e[r + 13],
                E = e[r + 14], b = e[r + 15], k = n(k = s[0], R = s[1], T = s[2], I = s[3], c, 7, d[0]),
                I = n(I, k, R, T, a, 12, d[1]), T = n(T, I, k, R, u, 17, d[2]), R = n(R, T, I, k, l, 22, d[3]);
            k = n(k, R, T, I, m, 7, d[4]), I = n(I, k, R, T, f, 12, d[5]), T = n(T, I, k, R, g, 17, d[6]), R = n(R, T, I, k, p, 22, d[7]), k = n(k, R, T, I, v, 7, d[8]), I = n(I, k, R, T, h, 12, d[9]), T = n(T, I, k, R, C, 17, d[10]), R = n(R, T, I, k, S, 22, d[11]), k = n(k, R, T, I, y, 7, d[12]), I = n(I, k, R, T, w, 12, d[13]), T = n(T, I, k, R, E, 17, d[14]), k = t(k, R = n(R, T, I, k, b, 22, d[15]), T, I, a, 5, d[16]), I = t(I, k, R, T, g, 9, d[17]), T = t(T, I, k, R, S, 14, d[18]), R = t(R, T, I, k, c, 20, d[19]), k = t(k, R, T, I, f, 5, d[20]), I = t(I, k, R, T, C, 9, d[21]), T = t(T, I, k, R, b, 14, d[22]), R = t(R, T, I, k, m, 20, d[23]), k = t(k, R, T, I, h, 5, d[24]), I = t(I, k, R, T, E, 9, d[25]), T = t(T, I, k, R, l, 14, d[26]), R = t(R, T, I, k, v, 20, d[27]), k = t(k, R, T, I, w, 5, d[28]), I = t(I, k, R, T, u, 9, d[29]), T = t(T, I, k, R, p, 14, d[30]), k = o(k, R = t(R, T, I, k, y, 20, d[31]), T, I, f, 4, d[32]), I = o(I, k, R, T, v, 11, d[33]), T = o(T, I, k, R, S, 16, d[34]), R = o(R, T, I, k, E, 23, d[35]), k = o(k, R, T, I, a, 4, d[36]), I = o(I, k, R, T, m, 11, d[37]), T = o(T, I, k, R, p, 16, d[38]), R = o(R, T, I, k, C, 23, d[39]), k = o(k, R, T, I, w, 4, d[40]), I = o(I, k, R, T, c, 11, d[41]), T = o(T, I, k, R, l, 16, d[42]), R = o(R, T, I, k, g, 23, d[43]), k = o(k, R, T, I, h, 4, d[44]), I = o(I, k, R, T, y, 11, d[45]), T = o(T, I, k, R, b, 16, d[46]), k = i(k, R = o(R, T, I, k, u, 23, d[47]), T, I, c, 6, d[48]), I = i(I, k, R, T, p, 10, d[49]), T = i(T, I, k, R, E, 15, d[50]), R = i(R, T, I, k, f, 21, d[51]), k = i(k, R, T, I, y, 6, d[52]), I = i(I, k, R, T, l, 10, d[53]), T = i(T, I, k, R, C, 15, d[54]), R = i(R, T, I, k, a, 21, d[55]), k = i(k, R, T, I, v, 6, d[56]), I = i(I, k, R, T, b, 10, d[57]), T = i(T, I, k, R, g, 15, d[58]), R = i(R, T, I, k, w, 21, d[59]), k = i(k, R, T, I, m, 6, d[60]), I = i(I, k, R, T, S, 10, d[61]), T = i(T, I, k, R, u, 15, d[62]), R = i(R, T, I, k, h, 21, d[63]);
            s[0] = s[0] + k | 0, s[1] = s[1] + R | 0, s[2] = s[2] + T | 0, s[3] = s[3] + I | 0
        }, _doFinalize: function () {
            var n = this._data, t = n.words, o = 8 * this._nDataBytes, i = 8 * n.sigBytes;
            t[i >>> 5] |= 128 << 24 - i % 32;
            var r = e.floor(o / 4294967296);
            for (t[15 + (i + 64 >>> 9 << 4)] = 16711935 & (r << 8 | r >>> 24) | 4278255360 & (r << 24 | r >>> 8), t[14 + (i + 64 >>> 9 << 4)] = 16711935 & (o << 8 | o >>> 24) | 4278255360 & (o << 24 | o >>> 8), n.sigBytes = 4 * (t.length + 1), this._process(), t = (n = this._hash).words, o = 0; 4 > o; o++) i = t[o], t[o] = 16711935 & (i << 8 | i >>> 24) | 4278255360 & (i << 24 | i >>> 8);
            return n
        }, clone: function () {
            var e = a.clone.call(this);
            return e._hash = this._hash.clone(), e
        }
    }), r.MD5 = a._createHelper(c), r.HmacMD5 = a._createHmacHelper(c)
}(Math), function () {
    var e, n = CryptoJS, t = (e = n.lib).Base, o = e.WordArray, i = (e = n.algo).EvpKDF = t.extend({
        cfg: t.extend({keySize: 4, hasher: e.MD5, iterations: 1}),
        init: function (e) {
            this.cfg = this.cfg.extend(e)
        },
        compute: function (e, n) {
            for (var t = (a = this.cfg).hasher.create(), i = o.create(), r = i.words, s = a.keySize, a = a.iterations; r.length < s;) {
                c && t.update(c);
                var c = t.update(e).finalize(n);
                t.reset();
                for (var d = 1; d < a; d++) c = t.finalize(c), t.reset();
                i.concat(c)
            }
            return i.sigBytes = 4 * s, i
        }
    });
    n.EvpKDF = function (e, n, t) {
        return i.create(t).compute(e, n)
    }
}(), CryptoJS.lib.Cipher || function (e) {
    var n = (f = CryptoJS).lib, t = n.Base, o = n.WordArray, i = n.BufferedBlockAlgorithm, r = f.enc.Base64,
        s = f.algo.EvpKDF, a = n.Cipher = i.extend({
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
                        return ("string" == typeof t ? g : m).encrypt(e, n, t, o)
                    }, decrypt: function (n, t, o) {
                        return ("string" == typeof t ? g : m).decrypt(e, n, t, o)
                    }
                }
            }
        });
    n.StreamCipher = a.extend({
        _doFinalize: function () {
            return this._process(!0)
        }, blockSize: 1
    });
    var c = f.mode = {}, d = function (e, n, t) {
        var o = this._iv;
        o ? this._iv = void 0 : o = this._prevBlock;
        for (var i = 0; i < t; i++) e[n + i] ^= o[i]
    }, u = (n.BlockCipherMode = t.extend({
        createEncryptor: function (e, n) {
            return this.Encryptor.create(e, n)
        }, createDecryptor: function (e, n) {
            return this.Decryptor.create(e, n)
        }, init: function (e, n) {
            this._cipher = e, this._iv = n
        }
    })).extend();
    u.Encryptor = u.extend({
        processBlock: function (e, n) {
            var t = this._cipher, o = t.blockSize;
            d.call(this, e, n, o), t.encryptBlock(e, n), this._prevBlock = e.slice(n, n + o)
        }
    }), u.Decryptor = u.extend({
        processBlock: function (e, n) {
            var t = this._cipher, o = t.blockSize, i = e.slice(n, n + o);
            t.decryptBlock(e, n), d.call(this, e, n, o), this._prevBlock = i
        }
    }), c = c.CBC = u, u = (f.pad = {}).Pkcs7 = {
        pad: function (e, n) {
            for (var t, i = (t = (t = 4 * n) - e.sigBytes % t) << 24 | t << 16 | t << 8 | t, r = [], s = 0; s < t; s += 4) r.push(i);
            t = o.create(r, t), e.concat(t)
        }, unpad: function (e) {
            e.sigBytes -= 255 & e.words[e.sigBytes - 1 >>> 2]
        }
    }, n.BlockCipher = a.extend({
        cfg: a.cfg.extend({mode: c, padding: u}), reset: function () {
            a.reset.call(this);
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
    var l = n.CipherParams = t.extend({
        init: function (e) {
            this.mixIn(e)
        }, toString: function (e) {
            return (e || this.formatter).stringify(this)
        }
    }), m = (c = (f.format = {}).OpenSSL = {
        stringify: function (e) {
            var n = e.ciphertext;
            return ((e = e.salt) ? o.create([1398893684, 1701076831]).concat(e).concat(n) : n).toString(r)
        }, parse: function (e) {
            var n = (e = r.parse(e)).words;
            if (1398893684 == n[0] && 1701076831 == n[1]) {
                var t = o.create(n.slice(2, 4));
                n.splice(0, 4), e.sigBytes -= 16
            }
            return l.create({ciphertext: e, salt: t})
        }
    }, n.SerializableCipher = t.extend({
        cfg: t.extend({format: c}), encrypt: function (e, n, t, o) {
            o = this.cfg.extend(o);
            var i = e.createEncryptor(t, o);
            return n = i.finalize(n), i = i.cfg, l.create({
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
    })), f = (f.kdf = {}).OpenSSL = {
        execute: function (e, n, t, i) {
            return i || (i = o.random(8)), e = s.create({keySize: n + t}).compute(e, i), t = o.create(e.words.slice(n), 4 * t), e.sigBytes = 4 * n, l.create({
                key: e,
                iv: t,
                salt: i
            })
        }
    }, g = n.PasswordBasedCipher = m.extend({
        cfg: m.cfg.extend({kdf: f}), encrypt: function (e, n, t, o) {
            return t = (o = this.cfg.extend(o)).kdf.execute(t, e.keySize, e.ivSize), o.iv = t.iv, (e = m.encrypt.call(this, e, n, t.key, o)).mixIn(t), e
        }, decrypt: function (e, n, t, o) {
            return o = this.cfg.extend(o), n = this._parse(n, o.format), t = o.kdf.execute(t, e.keySize, e.ivSize, n.salt), o.iv = t.iv, m.decrypt.call(this, e, n, t.key, o)
        }
    })
}(), function () {
    for (var e = CryptoJS, n = e.lib.BlockCipher, t = e.algo, o = [], i = [], r = [], s = [], a = [], c = [], d = [], u = [], l = [], m = [], f = [], g = 0; 256 > g; g++) f[g] = 128 > g ? g << 1 : g << 1 ^ 283;
    var p = 0, v = 0;
    for (g = 0; 256 > g; g++) {
        var h = (h = v ^ v << 1 ^ v << 2 ^ v << 3 ^ v << 4) >>> 8 ^ 255 & h ^ 99;
        o[p] = h, i[h] = p;
        var C = f[p], S = f[C], y = f[S], w = 257 * f[h] ^ 16843008 * h;
        r[p] = w << 24 | w >>> 8, s[p] = w << 16 | w >>> 16, a[p] = w << 8 | w >>> 24, c[p] = w, w = 16843009 * y ^ 65537 * S ^ 257 * C ^ 16843008 * p, d[h] = w << 24 | w >>> 8, u[h] = w << 16 | w >>> 16, l[h] = w << 8 | w >>> 24, m[h] = w, p ? (p = C ^ f[f[f[y ^ C]]], v ^= f[f[v]]) : p = v = 1
    }
    var E = [0, 1, 2, 4, 8, 16, 32, 64, 128, 27, 54];
    t = t.AES = n.extend({
        _doReset: function () {
            for (var e = (t = this._key).words, n = t.sigBytes / 4, t = 4 * ((this._nRounds = n + 6) + 1), i = this._keySchedule = [], r = 0; r < t; r++) if (r < n) i[r] = e[r]; else {
                var s = i[r - 1];
                r % n ? 6 < n && 4 == r % n && (s = o[s >>> 24] << 24 | o[s >>> 16 & 255] << 16 | o[s >>> 8 & 255] << 8 | o[255 & s]) : (s = o[(s = s << 8 | s >>> 24) >>> 24] << 24 | o[s >>> 16 & 255] << 16 | o[s >>> 8 & 255] << 8 | o[255 & s], s ^= E[r / n | 0] << 24), i[r] = i[r - n] ^ s
            }
            for (e = this._invKeySchedule = [], n = 0; n < t; n++) r = t - n, s = n % 4 ? i[r] : i[r - 4], e[n] = 4 > n || 4 >= r ? s : d[o[s >>> 24]] ^ u[o[s >>> 16 & 255]] ^ l[o[s >>> 8 & 255]] ^ m[o[255 & s]]
        }, encryptBlock: function (e, n) {
            this._doCryptBlock(e, n, this._keySchedule, r, s, a, c, o)
        }, decryptBlock: function (e, n) {
            var t = e[n + 1];
            e[n + 1] = e[n + 3], e[n + 3] = t, this._doCryptBlock(e, n, this._invKeySchedule, d, u, l, m, i), t = e[n + 1], e[n + 1] = e[n + 3], e[n + 3] = t
        }, _doCryptBlock: function (e, n, t, o, i, r, s, a) {
            for (var c = this._nRounds, d = e[n] ^ t[0], u = e[n + 1] ^ t[1], l = e[n + 2] ^ t[2], m = e[n + 3] ^ t[3], f = 4, g = 1; g < c; g++) {
                var p = o[d >>> 24] ^ i[u >>> 16 & 255] ^ r[l >>> 8 & 255] ^ s[255 & m] ^ t[f++],
                    v = o[u >>> 24] ^ i[l >>> 16 & 255] ^ r[m >>> 8 & 255] ^ s[255 & d] ^ t[f++],
                    h = o[l >>> 24] ^ i[m >>> 16 & 255] ^ r[d >>> 8 & 255] ^ s[255 & u] ^ t[f++];
                m = o[m >>> 24] ^ i[d >>> 16 & 255] ^ r[u >>> 8 & 255] ^ s[255 & l] ^ t[f++], d = p, u = v, l = h
            }
            p = (a[d >>> 24] << 24 | a[u >>> 16 & 255] << 16 | a[l >>> 8 & 255] << 8 | a[255 & m]) ^ t[f++], v = (a[u >>> 24] << 24 | a[l >>> 16 & 255] << 16 | a[m >>> 8 & 255] << 8 | a[255 & d]) ^ t[f++], h = (a[l >>> 24] << 24 | a[m >>> 16 & 255] << 16 | a[d >>> 8 & 255] << 8 | a[255 & u]) ^ t[f++], m = (a[m >>> 24] << 24 | a[d >>> 16 & 255] << 16 | a[u >>> 8 & 255] << 8 | a[255 & l]) ^ t[f++], e[n] = p, e[n + 1] = v, e[n + 2] = h, e[n + 3] = m
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
                var s = e.streamEvents[o.message.streamid];
                if (!s || !s.stream) return;
                var a = o.message.action;
                if ("ended" === a || "inactive" === a || "stream-removed" === a) return e.peersBackup[s.userid] && (s.extra = e.peersBackup[s.userid].extra), void e.onstreamended(s);
                var c = "both" != o.message.type ? o.message.type : null;
                "function" == typeof s.stream[a] && s.stream[a](c)
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
                    var d = {
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
                    e.onNewParticipant(o.sender, d)
                } else {
                    if (o.message.changedUUID && e.peers[o.message.oldUUID] && (e.peers[o.message.newUUID] = e.peers[o.message.oldUUID], delete e.peers[o.message.oldUUID]), o.message.userLeft) return i.onUserLeft(o.sender), void (o.message.autoCloseEntireSession && e.leave());
                    i.addNegotiatedMessage(o.message, o.sender)
                }
            } else e.deletePeer(o.sender)
        });
        var s = !1;
        e.socket.resetProps = function () {
            s = !1
        }, e.socket.on("connect", function () {
            s || (s = !0, e.enableLogs && console.info("socket.io connection is opened."), setTimeout(function () {
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
                } else P.send({text: t, channel: this, connection: e, remoteUserId: o})
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
                    (t = T.processCandidates(e, t)) && n.onNegotiationNeeded(t, i)
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
                e.peers[n] = new k(o)
            }
        }, this.createAnsweringPeer = function (n, t, o) {
            o = e.setUserPreferences(o || {}, t);
            var i = this.getLocalConfig(n, t, o);
            e.peers[t] = new k(i)
        }, this.renegotiatePeer = function (n, t, o) {
            if (e.peers[n]) {
                t || (t = {}), t.renegotiatingPeer = !0, t.peerRef = e.peers[n].peer, t.channels = e.peers[n].channels;
                var i = this.getLocalConfig(o, n, t);
                e.peers[n] = new k(i)
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
        var i = new A(e);
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

    function s(e, n) {
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

    function a() {
        if (window.crypto && window.crypto.getRandomValues && -1 === navigator.userAgent.indexOf("Safari")) {
            for (var e = window.crypto.getRandomValues(new Uint32Array(3)), n = "", t = 0, o = e.length; t < o; t++) n += e[t].toString(36);
            return n
        }
        return (Math.random() * (new Date).getTime()).toString(36).replace(/\./g, "")
    }

    function c(e, n, t) {
        if (t.autoCreateMediaElement) {
            var o = !1;
            p(e, "video").length || e.isVideo || e.isScreen || (o = !0), "Firefox" === DetectRTC.browser.name && (t.session.video || t.session.screen) && (o = !1);
            var i = document.createElement(o ? "audio" : "video");
            if (i.srcObject = e, i.setAttribute("autoplay", !0), i.setAttribute("playsinline", !0), i.setAttribute("controls", !0), i.setAttribute("muted", !1), i.setAttribute("volume", 1), "Firefox" === DetectRTC.browser.name) {
                var r = "ended";
                "oninactive" in i && (r = "inactive"), i.addEventListener(r, function () {
                    if (currentUserMediaRequest.remove(e.idInstance), "local" === e.type) {
                        r = "ended", "oninactive" in e && (r = "inactive"), M.onSyncNeeded(e.streamid, r), t.attachStreams.forEach(function (n, o) {
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
            var s = i.play();
            if (void 0 !== s) {
                var a = !1;
                setTimeout(function () {
                    a || (a = !0, n(i))
                }, 1e3), s.then(function () {
                    a || (a = !0, n(i))
                }).catch(function (e) {
                    a || (a = !0, n(i))
                })
            } else n(i)
        } else n({})
    }

    function d(e, n) {
        window.removeEventListener(e, n), window.addEventListener(e, n, !1)
    }

    function u(e) {
        var n = [];
        return e.forEach(function (e) {
            e && n.push(e)
        }), n
    }

    function l(e) {
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
            r = !!window.opera || t.userAgent.indexOf(" OPR/") >= 0, s = void 0 !== window.InstallTrigger,
            a = /^((?!chrome|android).)*safari/i.test(t.userAgent), c = !!window.chrome && !r,
            d = "undefined" != typeof document && !!document.documentMode && !i;

        function u(e, n) {
            var t = 0, o = !1, i = window.setInterval(function () {
                e() && (window.clearInterval(i), n(o)), t++ > 50 && (window.clearInterval(i), n(o = !0))
            }, 10)
        }

        var l = {
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
                return l.Android() || l.BlackBerry() || l.iOS() || l.Opera() || l.Windows()
            }, getOsName: function () {
                var e = "Unknown OS";
                return l.Android() && (e = "Android"), l.BlackBerry() && (e = "BlackBerry"), l.iOS() && (e = "iOS"), l.Opera() && (e = "Opera Mini"), l.Windows() && (e = "Windows"), e
            }
        };
        var m = "Unknown OS", f = "Unknown OS Version";
        var g, p, v = function () {
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
            }], s = 0; e = r[s]; s++) if (e.r.test(o)) {
                i = e.s;
                break
            }
            var a = "-";
            switch (/Windows/.test(i) && (/Windows (.*)/.test(i) && (a = /Windows (.*)/.exec(i)[1]), i = "Windows"), i) {
                case"Mac OS X":
                    /Mac OS X (10[\.\_\d]+)/.test(o) && (a = /Mac OS X (10[\.\_\d]+)/.exec(o)[1]);
                    break;
                case"Android":
                    /Android ([\.\_\d]+)/.test(o) && (a = /Android ([\.\_\d]+)/.exec(o)[1]);
                    break;
                case"iOS":
                    /OS (\d+)_(\d+)_?(\d+)?/.test(o) && (a = (a = /OS (\d+)_(\d+)_?(\d+)?/.exec(n))[1] + "." + a[2] + "." + (0 | a[3]))
            }
            return {osName: i, osVersion: a}
        }();
        v && v.osName && "-" != v.osName ? (m = v.osName, f = v.osVersion) : l.any() && "Android" == (m = l.getOsName()) && (f = !!(p = (g = (g || t.userAgent).toLowerCase()).match(/android\s([0-9\.]*)/)) && p[1]);
        var h = "object" == typeof process && "object" == typeof process.versions && process.versions.node;
        "Unknown OS" === m && h && (m = "Nodejs", f = process.versions.node.toString().replace("v", ""));
        var C = !1, S = !1;
        ["captureStream", "mozCaptureStream", "webkitCaptureStream"].forEach(function (e) {
            "undefined" != typeof document && "function" == typeof document.createElement && (!C && e in document.createElement("canvas") && (C = !0), !S && e in document.createElement("video") && (S = !0))
        });
        var y = /^(192\.168\.|169\.254\.|10\.|172\.(1[6-9]|2\d|3[01]))/, w = /([0-9]{1,3}(\.[0-9]{1,3}){3})/,
            E = /[a-f0-9]{1,4}(:[a-f0-9]{1,4}){7}/;
        var k = [], I = [], T = [], R = [];
        t.mediaDevices && t.mediaDevices.enumerateDevices && (t.enumerateDevices = function (e) {
            var n = t.mediaDevices.enumerateDevices();
            n && n.then ? t.mediaDevices.enumerateDevices().then(e).catch(function () {
                e([])
            }) : e([])
        });
        var x = !1;
        void 0 !== b && "getSources" in b ? x = !0 : t.mediaDevices && t.mediaDevices.enumerateDevices && (x = !0);
        var M = !1, A = !1, P = !1, O = !1, D = !1;

        function j(e) {
            if (x) if (!t.enumerateDevices && window.MediaStreamTrack && window.MediaStreamTrack.getSources && (t.enumerateDevices = window.MediaStreamTrack.getSources.bind(window.MediaStreamTrack)), !t.enumerateDevices && t.enumerateDevices && (t.enumerateDevices = t.enumerateDevices.bind(t)), t.enumerateDevices) {
                k = [], I = [], T = [], R = [], M = !1, A = !1, P = !1, O = !1, D = !1;
                var n = {};
                t.enumerateDevices(function (t) {
                    t.forEach(function (e) {
                        var t = {};
                        for (var o in e) try {
                            "function" != typeof e[o] && (t[o] = e[o])
                        } catch (e) {
                        }
                        n[t.deviceId + t.label + t.kind] || ("audio" === t.kind && (t.kind = "audioinput"), "video" === t.kind && (t.kind = "videoinput"), t.deviceId || (t.deviceId = t.id), t.id || (t.id = t.deviceId), t.label ? ("videoinput" !== t.kind || D || (D = !0), "audioinput" !== t.kind || O || (O = !0)) : (t.isCustomLabel = !0, "videoinput" === t.kind ? t.label = "Camera " + (R.length + 1) : "audioinput" === t.kind ? t.label = "Microphone " + (I.length + 1) : "audiooutput" === t.kind ? t.label = "Speaker " + (T.length + 1) : t.label = "Please invoke getUserMedia once.", void 0 !== U && U.browser.isChrome && U.browser.version >= 46 && !/^(https:|chrome-extension:)$/g.test(location.protocol || "") && "undefined" != typeof document && "string" == typeof document.domain && document.domain.search && -1 === document.domain.search(/localhost|127.0./g) && (t.label = "HTTPs is required to get label of this " + t.kind + " device.")), "audioinput" === t.kind && (M = !0, -1 === I.indexOf(t) && I.push(t)), "audiooutput" === t.kind && (A = !0, -1 === T.indexOf(t) && T.push(t)), "videoinput" === t.kind && (P = !0, -1 === R.indexOf(t) && R.push(t)), k.push(t), n[t.deviceId + t.label + t.kind] = t)
                    }), void 0 !== U && (U.MediaDevices = k, U.hasMicrophone = M, U.hasSpeakers = A, U.hasWebcam = P, U.isWebsiteHasWebcamPermissions = D, U.isWebsiteHasMicrophonePermissions = O, U.audioInputDevices = I, U.audioOutputDevices = T, U.videoInputDevices = R), e && e()
                })
            } else e && e(); else e && e()
        }

        var U = window.DetectRTC || {};
        U.browser = function () {
            t.appVersion;
            var e, n, o, u = t.userAgent, l = t.appName, m = "" + parseFloat(t.appVersion),
                f = parseInt(t.appVersion, 10);
            if (a && !c && -1 !== u.indexOf("CriOS") && (a = !1, c = !0), r) {
                l = "Opera";
                try {
                    f = (m = t.userAgent.split("OPR/")[1].split(" ")[0]).split(".")[0]
                } catch (e) {
                    m = "0.0.0.0", f = 0
                }
            } else d ? ((n = u.indexOf("rv:")) > 0 ? m = u.substring(n + 3) : (n = u.indexOf("MSIE"), m = u.substring(n + 5)), l = "IE") : c ? (n = u.indexOf("Chrome"), l = "Chrome", m = u.substring(n + 7)) : a ? (n = u.indexOf("Safari"), l = "Safari", m = u.substring(n + 7), -1 !== (n = u.indexOf("Version")) && (m = u.substring(n + 8)), -1 !== t.userAgent.indexOf("Version/") && (m = t.userAgent.split("Version/")[1].split(" ")[0])) : s ? (n = u.indexOf("Firefox"), l = "Firefox", m = u.substring(n + 8)) : (e = u.lastIndexOf(" ") + 1) < (n = u.lastIndexOf("/")) && (l = u.substring(e, n), m = u.substring(n + 1), l.toLowerCase() === l.toUpperCase() && (l = t.appName));
            return i && (l = "Edge", m = t.userAgent.split("Edge/")[1]), -1 !== (o = m.search(/[; \)]/)) && (m = m.substring(0, o)), f = parseInt("" + m, 10), isNaN(f) && (m = "" + parseFloat(t.appVersion), f = parseInt(t.appVersion, 10)), {
                fullVersion: m,
                version: f,
                name: l,
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
                    void 0 === n && u(function () {
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
            u(function () {
                return void 0 !== n
            }, function (t) {
                e(n)
            })
        }(function (e) {
            U.browser.isPrivateBrowsing = !!e
        }), U.browser["is" + U.browser.name] = !0, U.osName = m, U.osVersion = f;
        "object" == typeof process && "object" == typeof process.versions && process.versions["node-webkit"];
        var L = !1;
        ["RTCPeerConnection", "webkitRTCPeerConnection", "mozRTCPeerConnection", "RTCIceGatherer"].forEach(function (e) {
            L || e in window && (L = !0)
        }), U.isWebRTCSupported = L, U.isORTCSupported = "undefined" != typeof RTCIceGatherer;
        var N = !1;
        (U.browser.isChrome && U.browser.version >= 35 ? N = !0 : U.browser.isFirefox && U.browser.version >= 34 ? N = !0 : U.browser.isEdge && U.browser.version >= 17 ? N = !0 : "Android" === U.osName && U.browser.isChrome && (N = !0), /^(https:|chrome-extension:)$/g.test(location.protocol || "")) || ("undefined" != typeof document && "string" == typeof document.domain && document.domain.search && -1 === document.domain.search(/localhost|127.0./g) && (U.browser.isChrome || U.browser.isEdge || U.browser.isOpera) ? N = !1 : U.browser.isFirefox && (N = !1));
        U.isScreenCapturingSupported = N;
        var B = {isSupported: !1, isCreateMediaStreamSourceSupported: !1};
        ["AudioContext", "webkitAudioContext", "mozAudioContext", "msAudioContext"].forEach(function (e) {
            B.isSupported || e in window && (B.isSupported = !0, window[e] && "createMediaStreamSource" in window[e].prototype && (B.isCreateMediaStreamSourceSupported = !0))
        }), U.isAudioContextSupported = B.isSupported, U.isCreateMediaStreamSourceSupported = B.isCreateMediaStreamSourceSupported;
        var _ = !1;
        U.browser.isChrome && U.browser.version > 31 && (_ = !0), U.isRtpDataChannelsSupported = _;
        var V = !1;
        U.browser.isFirefox && U.browser.version > 28 ? V = !0 : U.browser.isChrome && U.browser.version > 25 ? V = !0 : U.browser.isOpera && U.browser.version >= 11 && (V = !0), U.isSctpDataChannelsSupported = V, U.isMobileDevice = o;
        var F = !1;
        t.getUserMedia ? F = !0 : t.mediaDevices && t.mediaDevices.getUserMedia && (F = !0), U.browser.isChrome && U.browser.version >= 46 && !/^(https:|chrome-extension:)$/g.test(location.protocol || "") && "undefined" != typeof document && "string" == typeof document.domain && document.domain.search && -1 === document.domain.search(/localhost|127.0./g) && (F = "Requires HTTPs"), "Nodejs" === U.osName && (F = !1), U.isGetUserMediaSupported = F;
        var Q, q, W, z = "";
        screen.width && (z += (screen.width ? screen.width : "") + " x " + (screen.height ? screen.height : ""));
        U.displayResolution = z, U.displayAspectRatio = (Q = screen.width, q = screen.height, W = function e(n, t) {
            return 0 == t ? n : e(t, n % t)
        }(Q, q), Q / W / (q / W)).toFixed(2), U.isCanvasSupportsStreamCapturing = C, U.isVideoSupportsStreamCapturing = S, "Chrome" == U.browser.name && U.browser.version >= 53 && (U.isCanvasSupportsStreamCapturing || (U.isCanvasSupportsStreamCapturing = "Requires chrome flag: enable-experimental-web-platform-features"), U.isVideoSupportsStreamCapturing || (U.isVideoSupportsStreamCapturing = "Requires chrome flag: enable-experimental-web-platform-features")), U.DetectLocalIPAddress = function (e, n) {
            if (U.isWebRTCSupported) {
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
                    var s = null;
                    "Chrome" === U.browser && U.browser.version < 58 && (s = {optional: [{RtpDataChannels: !0}]});
                    var a = svConfigs.iceServers, c = new o(a, s);
                    n && (c.addStream ? c.addStream(n) : c.addTrack && n.getTracks()[0] && c.addTrack(n.getTracks()[0], n));

                    function d(n) {
                        if (n) {
                            var o = w.exec(n);
                            if (o) {
                                var i = o[1], r = n.match(y);
                                void 0 === t[i] && e(i, r, !0), t[i] = !0
                            }
                        } else e()
                    }

                    if (c.onicecandidate = function (e) {
                        e.candidate && e.candidate.candidate ? d(e.candidate.candidate) : d()
                    }, !n) try {
                        c.createDataChannel("sctp", {})
                    } catch (e) {
                    }
                    U.isPromisesSupported ? c.createOffer().then(function (e) {
                        c.setLocalDescription(e).then(u)
                    }) : c.createOffer(function (e) {
                        c.setLocalDescription(e, u, function () {
                        })
                    }, function () {
                    });

                    function u() {
                        c.localDescription.sdp.split("\n").forEach(function (e) {
                            e && 0 === e.indexOf("a=candidate:") && d(e)
                        })
                    }
                }(function (n) {
                    n ? n.match(y) ? e("Local: " + n, t = !1, o) : n.match(E) ? e("Public: " + n, t, o = !1) : e("Public: " + n, t, o) : e()
                }, n)
            }
        }, U.isWebSocketsSupported = "WebSocket" in window && 2 === window.WebSocket.CLOSING, U.isWebSocketsBlocked = !U.isWebSocketsSupported, "Nodejs" === U.osName && (U.isWebSocketsSupported = !0, U.isWebSocketsBlocked = !1), U.checkWebSocketsSupport = function (e) {
            e = e || function () {
            };
            try {
                var n, t = new WebSocket("wss://echo.websocket.org:443/");
                t.onopen = function () {
                    U.isWebSocketsBlocked = !1, n = (new Date).getTime(), t.send("ping")
                }, t.onmessage = function () {
                    U.WebsocketLatency = (new Date).getTime() - n + "ms", e(), t.close(), t = null
                }, t.onerror = function () {
                    U.isWebSocketsBlocked = !0, e()
                }
            } catch (n) {
                U.isWebSocketsBlocked = !0, e()
            }
        }, U.load = function (e) {
            j(e = e || function () {
            })
        }, U.MediaDevices = void 0 !== k ? k : [], U.hasMicrophone = M, U.hasSpeakers = A, U.hasWebcam = P, U.isWebsiteHasWebcamPermissions = D, U.isWebsiteHasMicrophonePermissions = O, U.audioInputDevices = I, U.audioOutputDevices = T, U.videoInputDevices = R;
        var H = !1;
        "undefined" != typeof document && "function" == typeof document.createElement && "setSinkId" in document.createElement("video") && (H = !0), U.isSetSinkIdSupported = H;
        var G = !1;
        U.browser.isFirefox && "undefined" != typeof mozRTCPeerConnection ? "getSenders" in mozRTCPeerConnection.prototype && (G = !0) : U.browser.isChrome && "undefined" != typeof webkitRTCPeerConnection && "getSenders" in webkitRTCPeerConnection.prototype && (G = !0), U.isRTPSenderReplaceTracksSupported = G;
        var $ = !1;
        U.browser.isFirefox && U.browser.version > 38 && ($ = !0), U.isRemoteStreamProcessingSupported = $;
        var J = !1;
        void 0 !== b && "applyConstraints" in b.prototype && (J = !0), U.isApplyConstraintsSupported = J;
        var X = !1;
        U.browser.isFirefox && U.browser.version >= 43 && (X = !0), U.isMultiMonitorScreenCapturingSupported = X, U.isPromisesSupported = !!("Promise" in window), U.version = "1.3.9", void 0 === U && (window.DetectRTC = {});
        var K = window.MediaStream;
        void 0 === K && "undefined" != typeof webkitMediaStream && (K = webkitMediaStream), U.MediaStream = void 0 !== K && "function" == typeof K && Object.keys(K.prototype), U.MediaStreamTrack = void 0 !== b && Object.keys(b.prototype);
        var Y = window.RTCPeerConnection || window.mozRTCPeerConnection || window.webkitRTCPeerConnection;
        U.RTCPeerConnection = void 0 !== Y && Object.keys(Y.prototype), window.DetectRTC = U, "undefined" != typeof module && (module.exports = U), "function" == typeof define && define.amd && define("DetectRTC", [], function () {
            return U
        })
    }(), "undefined" != typeof cordova && (DetectRTC.isMobileDevice = !0, DetectRTC.browser.name = "Chrome"), navigator && navigator.userAgent && -1 !== navigator.userAgent.indexOf("Crosswalk") && (DetectRTC.isMobileDevice = !0, DetectRTC.browser.name = "Chrome"), window.addEventListener || (window.addEventListener = function (e, n, t) {
        e.attachEvent && e.attachEvent("on" + n, t)
    }), window.attachEventListener = function (e, n, t, o) {
        e.addEventListener(n, t, o)
    };
    var f = window.MediaStream;

    function g(e, n) {
        return (!e.session.audio || "two-way" !== e.session.audio) && ("Firefox" === DetectRTC.browser.name && !1 !== n || !("Chrome" !== DetectRTC.browser.name || DetectRTC.browser.version < 50) && (!0 === typeof n || !(void 0 !== n || !e.session.audio || !e.session.screen || e.session.video) && (n = !0, !0)))
    }

    function p(e, n) {
        return e && e.getTracks ? e.getTracks().filter(function (e) {
            return e.kind === (n || "audio")
        }) : []
    }

    function v() {
        var e = !1;
        try {
            if ("undefined" == typeof RTCRtpTransceiver) return !1;
            if (!("currentDirection" in RTCRtpTransceiver.prototype)) return !1;
            var n = new C;
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
                var n = new C({sdpSemantics: "unified-plan"});
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

    void 0 === f && "undefined" != typeof webkitMediaStream && (f = webkitMediaStream), void 0 !== f && ("stop" in f.prototype || (f.prototype.stop = function () {
        this.getTracks().forEach(function (e) {
            e.stop()
        })
    })), window.iOSDefaultAudioOutputDevice = window.iOSDefaultAudioOutputDevice || "speaker", document.addEventListener("deviceready", h, !1), h();
    var C, S = {};

    function y(e) {
        return {OfferToReceiveAudio: !!e.OfferToReceiveAudio, OfferToReceiveVideo: !!e.OfferToReceiveVideo}
    }

    void 0 !== window.RTCPeerConnection ? C = window.RTCPeerConnection : "undefined" != typeof mozRTCPeerConnection ? C = mozRTCPeerConnection : "undefined" != typeof webkitRTCPeerConnection && (C = webkitRTCPeerConnection);
    var w = window.RTCSessionDescription || window.mozRTCSessionDescription,
        E = window.RTCIceCandidate || window.mozRTCIceCandidate, b = window.MediaStreamTrack;

    function k(e) {
        if (void 0 !== window.RTCPeerConnection ? C = window.RTCPeerConnection : "undefined" != typeof mozRTCPeerConnection ? C = mozRTCPeerConnection : "undefined" != typeof webkitRTCPeerConnection && (C = webkitRTCPeerConnection), w = window.RTCSessionDescription || window.mozRTCSessionDescription, E = window.RTCIceCandidate || window.mozRTCIceCandidate, b = window.MediaStreamTrack, !C) throw"WebRTC 1.0 (RTCPeerConnection) API are NOT available in this browser.";
        var n = e.rtcMultiConnection;
        this.extra = e.remoteSdp ? e.remoteSdp.extra : n.extra, this.userid = e.userid, this.streams = [], this.channels = e.channels || [], this.connectionDescription = e.connectionDescription, this.addStream = function (e) {
            n.addStream(e, t.userid)
        }, this.removeStream = function (e) {
            n.removeStream(e, t.userid)
        };
        var t = this;
        e.remoteSdp && (this.connectionDescription = e.remoteSdp.connectionDescription);
        var o, i = {};
        S.sdpConstraints = y({OfferToReceiveAudio: !0, OfferToReceiveVideo: !0});
        var r = !!e.renegotiatingPeer;
        e.remoteSdp && (r = !!e.remoteSdp.renegotiatingPeer);
        var s = [];
        if (n.attachStreams.forEach(function (e) {
            e && s.push(e)
        }), r) o = e.peerRef; else {
            var a = "all";
            (n.candidates.turn || n.candidates.relay) && (n.candidates.stun || n.candidates.reflexive || n.candidates.host || (a = "relay"));
            try {
                var c = {iceServers: n.iceServers, iceTransportPolicy: n.iceTransportPolicy || a};
                void 0 !== n.iceCandidatePoolSize && (c.iceCandidatePoolSize = n.iceCandidatePoolSize), void 0 !== n.bundlePolicy && (c.bundlePolicy = n.bundlePolicy), void 0 !== n.rtcpMuxPolicy && (c.rtcpMuxPolicy = n.rtcpMuxPolicy), n.sdpSemantics && (c.sdpSemantics = n.sdpSemantics || "unified-plan"), n.iceServers && n.iceServers.length || (c = null, n.optionalArgument = null), o = new C(c, n.optionalArgument)
            } catch (e) {
                try {
                    c = {iceServers: n.iceServers};
                    o = new C(c)
                } catch (e) {
                    o = new C
                }
            }
        }
        !o.getRemoteStreams && o.getReceivers && (o.getRemoteStreams = function () {
            var e = new f;
            return o.getReceivers().forEach(function (n) {
                e.addTrack(n.track)
            }), [e]
        }), !o.getLocalStreams && o.getSenders && (o.getLocalStreams = function () {
            var e = new f;
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
                    streamsToShare: v
                })
            }
        }, s.forEach(function (i) {
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
        var d = {OfferToReceiveAudio: !!s.length, OfferToReceiveVideo: !!s.length};
        e.localPeerSdpConstraints && (d = e.localPeerSdpConstraints), S.sdpConstraints = y(d);
        var u = {};
        o.ontrack = function (n) {
            if (n && "track" === n.type) if (n.stream = n.streams[n.streams.length - 1], n.stream.id || (n.stream.id = n.track.id), u[n.stream.id] && "Safari" !== DetectRTC.browser.name) n.track && (n.track.onended = function () {
                o && o.onremovestream(n)
            }); else {
                u[n.stream.id] = n.stream.id;
                var t = {};
                e.remoteSdp && e.remoteSdp.streamsToShare ? t = e.remoteSdp.streamsToShare : e.streamsToShare && (t = e.streamsToShare);
                var r = t[n.stream.id];
                r ? (n.stream.isAudio = r.isAudio, n.stream.isVideo = r.isVideo, n.stream.isScreen = r.isScreen) : (n.stream.isVideo = !!p(n.stream, "video").length, n.stream.isAudio = !n.stream.isVideo, n.stream.isScreen = !1), n.stream.streamid = n.stream.id, i[n.stream.id] = n.stream, e.onRemoteStream(n.stream), n.stream.getTracks().forEach(function (e) {
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
        var l = !0;
        this.addRemoteCandidate = function (e) {
            o.addIceCandidate(new E(e)), isEdge && l && (l = !1, setTimeout(function () {
                o.addIceCandidate(null)
            }, 3e3))
        }, this.addRemoteSdp = function (e, t) {
            t = t || function () {
            }, "Safari" !== DetectRTC.browser.name && (e.sdp = n.processSdp(e.sdp)), o.setRemoteDescription(new w(e)).then(t, function (n) {
                console.error("setRemoteDescription failed", "\n", n, "\n", e.sdp), t()
            }).catch(function (n) {
                console.error("setRemoteDescription failed", "\n", n, "\n", e.sdp), t()
            })
        };
        var m = !0;

        function g(n) {
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
            g(o.createDataChannel("sctp", {}))
        }, !0 !== n.session.data || r || (m ? this.createDataChannel() : o.ondatachannel = function (e) {
            g(e.channel)
        }), this.enableDisableVideoEncoding = function (e) {
            var n;
            if (o.getSenders().forEach(function (e) {
                n || "video" !== e.track.kind || (n = e)
            }), n && n.getParameters) {
                var t = n.getParameters();
                t.encodings[1] && (t.encodings[1].active = !!e), t.encodings[2] && (t.encodings[2].active = !!e), n.setParameters(t)
            }
        }, e.remoteSdp && (e.remoteSdp.remotePeerSdpConstraints && (d = e.remoteSdp.remotePeerSdpConstraints), S.sdpConstraints = y(d), this.addRemoteSdp(e.remoteSdp, function () {
            h("createAnswer")
        })), "two-way" != n.session.audio && "two-way" != n.session.video && "two-way" != n.session.screen || (S.sdpConstraints = y({
            OfferToReceiveAudio: "two-way" == n.session.audio || e.remoteSdp && e.remoteSdp.remotePeerSdpConstraints && e.remoteSdp.remotePeerSdpConstraints.OfferToReceiveAudio,
            OfferToReceiveVideo: "two-way" == n.session.video || "two-way" == n.session.screen || e.remoteSdp && e.remoteSdp.remotePeerSdpConstraints && e.remoteSdp.remotePeerSdpConstraints.OfferToReceiveAudio
        }));
        var v = {};

        function h(i) {
            o[i](S.sdpConstraints).then(function (i) {
                "Safari" !== DetectRTC.browser.name && (i.sdp = n.processSdp(i.sdp)), o.setLocalDescription(i).then(function () {
                    n.trickleIce && (e.onLocalSdp({
                        type: i.type,
                        sdp: i.sdp,
                        remotePeerSdpConstraints: e.remotePeerSdpConstraints || !1,
                        renegotiatingPeer: !!e.renegotiatingPeer || !1,
                        connectionDescription: t.connectionDescription,
                        dontGetRemoteStream: !!e.dontGetRemoteStream,
                        extra: n ? n.extra : {},
                        streamsToShare: v
                    }), n.onSettingLocalDescription(t))
                }, function (e) {
                    console.error("setLocalDescription error", e)
                })
            }, function (e) {
                console.error("sdp-error", e)
            })
        }

        o.getLocalStreams().forEach(function (e) {
            v[e.streamid] = {isAudio: !!e.isAudio, isVideo: !!e.isVideo, isScreen: !!e.isScreen}
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

    var I = function () {
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
            var r = t.videoCodecNumbersOriginal.split("SAVPF")[0] + "SAVPF ", s = [i];
            return o && (s = []), t.videoCodecNumbers.forEach(function (e) {
                e !== i && s.push(e)
            }), r += s.join(" "), e = e.replace(t.videoCodecNumbersOriginal, r)
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
                for (var r = -1 !== t ? t : e.length, s = n; s < r; ++s) if (0 === e[s].indexOf(o) && (!i || -1 !== e[s].toLowerCase().indexOf(i.toLowerCase()))) return s;
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
                    var t, r = (n = n || {}).min, s = n.max, a = e.split("\r\n"), c = o(a, "a=rtpmap", "VP8/90000");
                    if (c && (t = i(a[c])), !t) return e;
                    var d, u = o(a, "a=rtpmap", "rtx/90000");
                    if (u && (d = i(a[u])), !u) return e;
                    var l = o(a, "a=fmtp:" + d.toString());
                    if (null !== l) {
                        var m = "\r\n";
                        m += "a=fmtp:" + t + " x-google-min-bitrate=" + (r || "228") + "; x-google-max-bitrate=" + (s || "228"), a[l] = a[l].concat(m), e = a.join("\r\n")
                    }
                    return e
                }(e, n)
            }, setOpusAttributes: function (e, n) {
                return function (e, n) {
                    n = n || {};
                    var t, r = e.split("\r\n"), s = o(r, "a=rtpmap", "opus/48000");
                    if (s && (t = i(r[s])), !t) return e;
                    var a = o(r, "a=fmtp:" + t.toString());
                    if (null === a) return e;
                    var c = "";
                    return c += "; stereo=" + (void 0 !== n.stereo ? n.stereo : "1"), c += "; sprop-stereo=" + (void 0 !== n["sprop-stereo"] ? n["sprop-stereo"] : "1"), void 0 !== n.maxaveragebitrate && (c += "; maxaveragebitrate=" + (n.maxaveragebitrate || 1048576)), void 0 !== n.maxplaybackrate && (c += "; maxplaybackrate=" + (n.maxplaybackrate || 1048576)), void 0 !== n.cbr && (c += "; cbr=" + (void 0 !== n.cbr ? n.cbr : "1")), void 0 !== n.useinbandfec && (c += "; useinbandfec=" + n.useinbandfec), void 0 !== n.usedtx && (c += "; usedtx=" + n.usedtx), void 0 !== n.maxptime && (c += "\r\na=maxptime:" + n.maxptime), r[a] = r[a].concat(c), e = r.join("\r\n")
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
    window.BandwidthHandler = I;
    var T = {
        processCandidates: function (e, n) {
            var t = n.candidate, o = e.candidates, i = o.stun, r = o.turn;
            if (m(o.reflexive) || (i = o.reflexive), m(o.relay) || (r = o.relay), (o.host || !t.match(/typ host/g)) && (r || !t.match(/typ relay/g)) && (i || !t.match(/typ srflx/g))) {
                var s = e.iceProtocols;
                if ((s.udp || !t.match(/ udp /g)) && (s.tcp || !t.match(/ tcp /g))) return e.enableLogs && console.debug("Your candidate pairs:", t), {
                    candidate: t,
                    sdpMid: n.sdpMid,
                    sdpMLineIndex: n.sdpMLineIndex
                }
            }
        }
    }, R = {
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
                        var s = JSON.parse(CryptoJS.AES.decrypt(i, svConfigs.iceServers.passPhrase, {format: n}).toString(CryptoJS.enc.Utf8));
                        t[o].credential = s
                    }
                }
                svConfigs.iceServers.iceServers = t, svConfigs.iceServers.requirePass = !1
            }
            return svConfigs.iceServers.iceServers
        }
    };

    function x(e) {
        if (!0 !== currentUserMediaRequest.mutex) {
            currentUserMediaRequest.mutex = !0;
            var n = JSON.stringify(e.localMediaConstraints);
            if (currentUserMediaRequest.streams[n]) r(currentUserMediaRequest.streams[n].stream, !0); else {
                if (!!/BB10|BlackBerry/i.test(navigator.userAgent || "") || void 0 === navigator.mediaDevices || "function" != typeof navigator.mediaDevices.getUserMedia) return navigator.getUserMedia = navigator.getUserMedia || navigator.webkitGetUserMedia || navigator.mozGetUserMedia, void navigator.getUserMedia(e.localMediaConstraints, function (e) {
                    e.streamid = e.streamid || e.id || a(), e.idInstance = n, r(e)
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
                        e.streamid = e.streamid || e.id || a(), e.idInstance = n, r(e)
                    }).catch(function (n) {
                        e.onLocalMediaError(n, e.localMediaConstraints)
                    }); else {
                        if (!navigator.getDisplayMedia) throw new Error("getDisplayMedia API is not availabe in this browser.");
                        navigator.getDisplayMedia(e.localMediaConstraints).then(function (e) {
                            e.streamid = e.streamid || e.id || a(), e.idInstance = n, r(e)
                        }).catch(function (n) {
                            e.onLocalMediaError(n, e.localMediaConstraints)
                        })
                    }
                    return
                }
                navigator.mediaDevices.getUserMedia(e.localMediaConstraints).then(function (e) {
                    e.streamid = e.streamid || e.id || a(), e.idInstance = n, r(e)
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
                delete currentUserMediaRequest.streams[n], currentUserMediaRequest.mutex = !1, currentUserMediaRequest.queueRequests.indexOf(e) && (delete currentUserMediaRequest.queueRequests[currentUserMediaRequest.queueRequests.indexOf(e)], currentUserMediaRequest.queueRequests = u(currentUserMediaRequest.queueRequests))
            }, !1), currentUserMediaRequest.streams[n] = {stream: t}, currentUserMediaRequest.mutex = !1, currentUserMediaRequest.queueRequests.length && x(currentUserMediaRequest.queueRequests.shift()), e.onGettingLocalMedia(t, o)
        }
    }

    window.currentUserMediaRequest = {
        streams: [], mutex: !1, queueRequests: [], remove: function (e) {
            this.mutex = !1;
            var n = this.streams[e];
            if (n) {
                var t = (n = n.stream).currentUserMediaRequestOptions;
                this.queueRequests.indexOf(t) && (delete this.queueRequests[this.queueRequests.indexOf(t)], this.queueRequests = u(this.queueRequests)), this.streams[e].stream = null, delete this.streams[e]
            }
        }
    };
    var M = function () {
        function e(e) {
            if (e) return "string" == typeof e || void 0 === e ? e : e.audio && e.video ? null : e.audio ? "audio" : e.video ? "video" : void 0
        }

        return {
            setHandlers: function (n, t, o) {
                if (n && n.addEventListener) {
                    if (void 0 === t || 1 == t) {
                        var i = "ended";
                        "oninactive" in n && (i = "inactive"), n.addEventListener(i, function () {
                            M.onSyncNeeded(this.streamid, i)
                        }, !1)
                    }
                    n.mute = function (i, s) {
                        i = e(i), void 0 !== s && (t = s), void 0 !== i && "audio" != i || p(n, "audio").forEach(function (e) {
                            e.enabled = !1, o.streamEvents[n.streamid].isAudioMuted = !0
                        }), void 0 !== i && "video" != i || p(n, "video").forEach(function (e) {
                            e.enabled = !1
                        }), void 0 !== t && 1 != t || M.onSyncNeeded(n.streamid, "mute", i), o.streamEvents[n.streamid].muteType = i || "both", r(n, "mute", i)
                    }, n.unmute = function (i, s) {
                        i = e(i), void 0 !== s && (t = s), function () {
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
                        }(), void 0 !== i && "audio" != i || p(n, "audio").forEach(function (e) {
                            e.enabled = !0, o.streamEvents[n.streamid].isAudioMuted = !1
                        }), void 0 !== i && "video" != i || (p(n, "video").forEach(function (e) {
                            e.enabled = !0
                        }), void 0 !== i && "video" == i && o.streamEvents[n.streamid].isAudioMuted && function e(t) {
                            t || (t = 0), ++t < 100 && o.streamEvents[n.streamid].isAudioMuted && (n.mute("audio"), setTimeout(function () {
                                e(t)
                            }, 50))
                        }()), void 0 !== t && 1 != t || M.onSyncNeeded(n.streamid, "unmute", i), o.streamEvents[n.streamid].unmuteType = i || "both", r(n, "unmute", i)
                    }
                }
            }, onSyncNeeded: function (e, n, t) {
            }
        }
    }();

    function A(e) {
        var n = {};
        return {
            receive: function (t, o, i) {
                var r = t.uuid;
                if (n[r] || (n[r] = []), n[r].push(t.message), t.last) {
                    var s = n[r].join("");
                    t.isobject && (s = JSON.parse(s));
                    var a = {data: s, userid: o, extra: i, latency: (new Date).getTime() - t.sendingTime};
                    e.autoTranslateText ? (a.original = a.data, e.Translator.TranslateText(a.data, function (n) {
                        a.data = n, e.onmessage(a)
                    })) : e.onmessage(a), delete n[r]
                }
            }
        }
    }

    var P = {
        send: function (e) {
            var n = e.connection, t = e.channel, o = e.remoteUserId, i = e.text, r = n.chunkSize || 1e3, s = "", c = !1;
            "string" != typeof i && (c = !0, i = JSON.stringify(i));
            var d = a(), u = (new Date).getTime();
            !function e(i, a) {
                var l = {type: "text", uuid: d, sendingTime: u};
                i && (a = i, l.packets = parseInt(a.length / r));
                a.length > r ? l.message = a.slice(0, r) : (l.message = a, l.last = !0, l.isobject = c);
                t.send(l, o);
                s = a.slice(l.message.length);
                s.length && setTimeout(function () {
                    e(null, s)
                }, n.chunkInterval || 100)
            }(i)
        }
    }, O = {
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
    }, D = {
        handle: function (e) {
            e.autoTranslateText = !1, e.language = "en", e.googKey = "AIzaSyCgB5hmFY74WYB-EoWkhr9cAGr6TiTHrEE", e.Translator = {
                TranslateText: function (n, t) {
                    var o = document.createElement("script");
                    o.type = "text/javascript";
                    var i = encodeURIComponent(n), r = "method" + e.token();
                    window[r] = function (e) {
                        e.data && e.data.translations[0] && t ? t(e.data.translations[0].translatedText) : e.error && "Daily Limit Exceeded" === e.error.message ? console.error('Text translation failed. Error message: "Daily Limit Exceeded."') : e.error ? console.error(e.error.message) : console.error(e)
                    };
                    var s = "https://www.googleapis.com/language/translate/v2?key=" + e.googKey + "&target=" + (e.language || "en-US") + "&callback=window." + r + "&q=" + i;
                    o.src = s, document.getElementsByTagName("head")[0].appendChild(o)
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
        var r = new i(t), u = {};

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
                streams: y(),
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

        function S(e) {
            t.enableLogs && console.log("Sending open-room signal to socket.io"), t.waitingForLocalMedia = !1, t.socket.emit("open-room", {
                sessionid: t.sessionid,
                session: t.session,
                mediaConstraints: t.mediaConstraints,
                sdpConstraints: t.sdpConstraints,
                streams: y(),
                extra: t.extra,
                identifier: t.publicRoomIdentifier,
                password: void 0 !== t.password && "object" != typeof t.password ? t.password : ""
            }, function (n, o) {
                !0 === n && (t.enableLogs && console.log("isRoomOpened: ", n, " roomid: ", t.sessionid), e(n, t.sessionid)), !1 === n && (t.enableLogs && console.warn("isRoomOpened: ", o, " roomid: ", t.sessionid), e(n, t.sessionid, o))
            })
        }

        function y() {
            try {
                return t.streamEvents.selectAll("local").map(function (e) {
                    return {streamid: e.streamid, tracks: e.stream.getTracks().length}
                })
            } catch (e) {
                return []
            }
        }

        function w(e, n) {
            if (t.dontCaptureUserMedia || e.isDataOnly) n(); else {
                var o = {};
                e.localPeerSdpConstraints.OfferToReceiveAudio && (o.audio = t.mediaConstraints.audio), e.localPeerSdpConstraints.OfferToReceiveVideo && (o.video = t.mediaConstraints.video);
                var i = e.session || t.session;
                i.oneway && "two-way" !== i.audio && "two-way" !== i.video && "two-way" !== i.screen ? n() : (i.oneway && i.audio && "two-way" === i.audio && (i = {audio: !0}), (i.audio || i.video || i.screen) && (i.screen ? "Edge" === DetectRTC.browser.name ? navigator.getDisplayMedia({
                    video: !0,
                    audio: g(t)
                }).then(function (e) {
                    e.isScreen = !0, r.onGettingLocalMedia(e), !i.audio && !i.video || g(t) ? n(e) : t.invokeGetUserMedia(null, n)
                }, function (e) {
                    console.error("Unable to capture screen on Edge. HTTPs and version 17+ is required.")
                }) : t.invokeGetUserMedia({
                    audio: g(t),
                    video: !0,
                    isScreen: !0
                }, !i.audio && !i.video || g(t) ? n : t.invokeGetUserMedia(null, n)) : (i.audio || i.video) && t.invokeGetUserMedia(null, n, i)))
            }
        }

        function E(e, n) {
            e ? (n.audio && p(e, "audio").forEach(function (e) {
                e.applyConstraints(n.audio)
            }), n.video && p(e, "video").forEach(function (e) {
                e.applyConstraints(n.video)
            })) : t.enableLogs && console.error("No stream to applyConstraints.")
        }

        function k(e, n, o) {
            n ? r.replaceTrack(e, n, o) : t.peers.getAllParticipants().forEach(function (n) {
                r.replaceTrack(e, n, o)
            })
        }

        r.onGettingLocalMedia = function (e, n) {
            if (n = n || function () {
            }, u[e.streamid]) n(); else {
                u[e.streamid] = !0;
                try {
                    e.type = "local"
                } catch (e) {
                }
                t.setStreamEndHandler(e), c(e, function (o) {
                    o.id = e.streamid, o.muted = !0, o.volume = 0, -1 === t.attachStreams.indexOf(e) && t.attachStreams.push(e), void 0 !== M && M.setHandlers(e, !0, t), t.streamEvents[e.streamid] = {
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
                            if (n.stream && p(n.stream, "audio").length) {
                                if (!e || !n) throw"Both arguments are required.";
                                if (e.onspeaking && e.onsilence) {
                                    if ("undefined" == typeof hark) throw"hark.js not found.";
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
                        }(t, t.streamEvents[e.streamid]), s(t, t.streamEvents[e.streamid]), t.onstream(t.streamEvents[e.streamid])
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
            t.setStreamEndHandler(e, "remote-stream"), c(e, function (o) {
                o.id = e.streamid, void 0 !== M && M.setHandlers(e, !1, t), t.streamEvents[e.streamid] = {
                    stream: e,
                    type: "remote",
                    userid: n,
                    extra: t.peers[n] ? t.peers[n].extra : {},
                    mediaElement: o,
                    streamid: e.streamid
                }, s(t, t.streamEvents[e.streamid]), t.onstream(t.streamEvents[e.streamid])
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
                    var i, r, s = !!t.session.oneway, a = l(t.session);
                    r = {
                        OfferToReceiveAudio: t.sdpConstraints.mandatory.OfferToReceiveAudio,
                        OfferToReceiveVideo: t.sdpConstraints.mandatory.OfferToReceiveVideo
                    }, i = {
                        OfferToReceiveAudio: s ? !!t.session.audio : t.sdpConstraints.mandatory.OfferToReceiveAudio,
                        OfferToReceiveVideo: s ? !!t.session.video || !!t.session.screen : t.sdpConstraints.mandatory.OfferToReceiveVideo
                    };
                    var c = {
                        remoteUserId: t.sessionid,
                        message: {
                            newParticipationRequest: !0,
                            isOneWay: s,
                            isDataOnly: a,
                            localPeerSdpConstraints: i,
                            remotePeerSdpConstraints: r
                        },
                        sender: t.userid
                    };
                    w(c.message, function () {
                        h(c, n)
                    })
                } else t.waitingForLocalMedia = !0, t.isInitiator = !0, t.sessionid = o || t.sessionid, l(t.session) ? S(n) : t.captureUserMedia(function () {
                    S(n)
                })
            })
        }, t.waitingForLocalMedia = !1, t.open = function (e, n) {
            n = n || function () {
            }, t.waitingForLocalMedia = !0, t.isInitiator = !0, t.sessionid = e || t.sessionid, m(function () {
                l(t.session) ? S(n) : t.captureUserMedia(function () {
                    S(n)
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
            var o = !1, i = !1, r = !1, s = !1;
            if (e && e.session || !e || "string" == typeof e) {
                var a = e && e.session || t.session;
                r = !!a.oneway, s = l(a), i = {
                    OfferToReceiveAudio: t.sdpConstraints.mandatory.OfferToReceiveAudio,
                    OfferToReceiveVideo: t.sdpConstraints.mandatory.OfferToReceiveVideo
                }, o = {
                    OfferToReceiveAudio: r ? !!t.session.audio : t.sdpConstraints.mandatory.OfferToReceiveAudio,
                    OfferToReceiveVideo: r ? !!t.session.video || !!t.session.screen : t.sdpConstraints.mandatory.OfferToReceiveVideo
                }
            }
            var c = function () {
            };
            "function" == typeof (n = n || {}) && (c = n, n = {}), void 0 !== n.localPeerSdpConstraints && (o = n.localPeerSdpConstraints), void 0 !== n.remotePeerSdpConstraints && (i = n.remotePeerSdpConstraints), void 0 !== n.isOneWay && (r = n.isOneWay), void 0 !== n.isDataOnly && (s = n.isDataOnly);
            var d = {
                remoteUserId: t.sessionid,
                message: {
                    newParticipationRequest: !0,
                    isOneWay: r,
                    isDataOnly: s,
                    localPeerSdpConstraints: o,
                    remotePeerSdpConstraints: i
                },
                sender: t.userid
            };
            return w(d.message, function () {
                m(function () {
                    h(d, c)
                })
            }), d
        }, t.publicRoomIdentifier = "", t.getUserMedia = t.captureUserMedia = function (e, n) {
            e = e || function () {
            };
            var o = n || t.session;
            t.dontCaptureUserMedia || l(o) ? e() : (o.audio || o.video || o.screen) && (o.screen ? "Edge" === DetectRTC.browser.name ? navigator.getDisplayMedia({
                video: !0,
                audio: g(t)
            }).then(function (i) {
                if (i.isScreen = !0, r.onGettingLocalMedia(i), !o.audio && !o.video || g(t)) e(i); else {
                    var s = {};
                    for (var a in o) "screen" !== a && (s[a] = o[a]);
                    t.invokeGetUserMedia(n, e, s)
                }
            }, function (e) {
                console.error("Unable to capture screen on Edge. HTTPs and version 17+ is required.")
            }) : t.invokeGetUserMedia({audio: g(t), video: !0, isScreen: !0}, function (i) {
                if (!o.audio && !o.video || g(t)) e(i); else {
                    var r = {};
                    for (var s in o) "screen" !== s && (r[s] = o[s]);
                    t.invokeGetUserMedia(n, e, r)
                }
            }) : (o.audio || o.video) && t.invokeGetUserMedia(n, e, o))
        }, t.onbeforeunload = function (e, n) {
            t.closeBeforeUnload && (t.peers.getAllParticipants().forEach(function (e) {
                r.onNegotiationNeeded({userLeft: !0}, e), t.peers[e] && t.peers[e].peer && t.peers[e].peer.close(), delete t.peers[e]
            }), n || t.closeSocket(), t.isInitiator = !1)
        }, window.ignoreBeforeUnload ? t.closeBeforeUnload = !1 : (t.closeBeforeUnload = !0, window.addEventListener("beforeunload", t.onbeforeunload, !1)), t.userid = a(), t.changeUserId = function (e, n) {
            n = n || function () {
            }, t.userid = e || a(), t.socket.emit("changed-uuid", t.userid, n)
        }, t.extra = {}, t.attachStreams = [], t.session = {
            audio: !0,
            video: !0
        }, t.enableFileSharing = !1, t.bandwidth = {screen: !1, audio: !1, video: !1}, t.codecs = {
            audio: "opus",
            video: "VP9"
        }, t.processSdp = function (e) {
            return v() ? e : "Safari" === DetectRTC.browser.name ? e : ("VP8" === t.codecs.video.toUpperCase() && (e = I.preferCodec(e, "vp8")), "VP9" === t.codecs.video.toUpperCase() && (e = I.preferCodec(e, "vp9")), "H264" === t.codecs.video.toUpperCase() && (e = I.preferCodec(e, "h264")), "G722" === t.codecs.audio && (e = I.removeNonG722(e)), "Firefox" === DetectRTC.browser.name ? e : ((t.bandwidth.video || t.bandwidth.screen) && (e = I.setApplicationSpecificBandwidth(e, t.bandwidth, !!t.session.screen)), t.bandwidth.video && (e = I.setVideoBitrates(e, {
                min: 8 * t.bandwidth.video * 1024,
                max: 8 * t.bandwidth.video * 1024
            })), t.bandwidth.audio && (e = I.setOpusAttributes(e, {
                maxaveragebitrate: 8 * t.bandwidth.audio * 1024,
                maxplaybackrate: 8 * t.bandwidth.audio * 1024,
                stereo: 1,
                maxptime: 3
            })), e))
        }, void 0 !== I && (t.BandwidthHandler = t.CodecsHandler = I), t.mediaConstraints = {
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
        }, t.iceServers = R.getIceServers(t), t.candidates = {host: !0, stun: !0, turn: !0}, t.iceProtocols = {
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

            l(e) ? t.renegotiate(n) : (e.audio || e.video || e.screen) && (e.screen ? "Edge" === DetectRTC.browser.name ? navigator.getDisplayMedia({
                video: !0,
                audio: g(t)
            }).then(function (n) {
                n.isScreen = !0, r.onGettingLocalMedia(n), !e.audio && !e.video || g(t) ? o(n) : t.invokeGetUserMedia(null, function (e) {
                    o(e)
                })
            }, function (e) {
                console.error("Unable to capture screen on Edge. HTTPs and version 17+ is required.")
            }) : t.invokeGetUserMedia({audio: g(t), video: !0, isScreen: !0}, function (n) {
                !e.audio && !e.video || g(t) ? o(n) : t.invokeGetUserMedia(null, function (e) {
                    o(e)
                })
            }) : (e.audio || e.video) && t.invokeGetUserMedia(null, o))
        }, t.invokeGetUserMedia = function (e, n, o) {
            o || (o = t.session), e || (e = t.mediaConstraints), x({
                onGettingLocalMedia: function (t) {
                    var o = e.video;
                    o && (o.mediaSource || o.mozMediaSource ? t.isScreen = !0 : o.mandatory && o.mandatory.chromeMediaSource && (t.isScreen = !0)), t.isScreen || (t.isVideo = !!p(t, "video").length, t.isAudio = !t.isVideo && p(t, "audio").length), r.onGettingLocalMedia(t, function () {
                        "function" == typeof n && n(t)
                    })
                }, onLocalMediaError: function (e, n) {
                    r.onLocalMediaError(e, n)
                }, localMediaConstraints: e || {audio: !!o.audio && e.audio, video: !!o.video && e.video}
            })
        }, t.applyConstraints = function (e, n) {
            if (b && b.prototype.applyConstraints) {
                var o;
                if (n) return t.streamEvents[n] && (o = t.streamEvents[n].stream), void E(o, e);
                t.attachStreams.forEach(function (n) {
                    E(n, e)
                })
            } else alert("track.applyConstraints is NOT supported in your browser.")
        }, t.replaceTrack = function (e, n, o) {
            if (e = e || {}, C.prototype.getSenders) if (e instanceof b) k(e, n, o); else {
                if (e instanceof f) return p(e, "video").length && k(p(e, "video")[0], n, !0), void (p(e, "audio").length && k(p(e, "audio")[0], n, !1));
                if (l(e)) throw"connection.replaceTrack requires audio and/or video and/or screen.";
                (e.audio || e.video || e.screen) && (e.screen ? "Edge" === DetectRTC.browser.name ? navigator.getDisplayMedia({
                    video: !0,
                    audio: g(t)
                }).then(function (n) {
                    n.isScreen = !0, r.onGettingLocalMedia(n), !e.audio && !e.video || g(t) ? i(n) : t.invokeGetUserMedia(null, i)
                }, function (e) {
                    console.error("Unable to capture screen on Edge. HTTPs and version 17+ is required.")
                }) : t.invokeGetUserMedia({
                    audio: g(t),
                    video: !0,
                    isScreen: !0
                }, !e.audio && !e.video || g(t) ? i : t.invokeGetUserMedia(null, i)) : (e.audio || e.video) && t.invokeGetUserMedia(null, i))
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
        }, t.autoCloseEntireSession = !1, t.filesContainer = t.videosContainer = document.body || document.documentElement, t.isInitiator = !1, t.shareFile = r.shareFile, void 0 !== O && O.handle(t), void 0 !== D && D.handle(t), t.token = a, t.onNewParticipant = function (e, n) {
            t.acceptParticipationRequest(e, n)
        }, t.acceptParticipationRequest = function (e, n) {
            n.successCallback && (n.successCallback(), delete n.successCallback), r.createNewPeer(e, n)
        }, void 0 !== M && (t.StreamsHandler = M), t.onleave = function (e) {
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
        }, void 0 !== M && (M.onSyncNeeded = function (e, n, o) {
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
        var T = ["selectFirst", "selectAll", "forEach"];
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
                    if (-1 === T.indexOf(o)) {
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
        }, t.getUserMediaHandler = x, t.multiPeersHandler = r, t.enableLogs = !0, t.setCustomSocketHandler = function (e) {
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
        }, t.isOnline = !0, d("online", function () {
            t.isOnline = !0
        }), d("offline", function () {
            t.isOnline = !1
        }), t.isLowBandwidth = !1, navigator && navigator.connection && navigator.connection.type && (t.isLowBandwidth = -1 !== navigator.connection.type.toString().toLowerCase().search(/wifi|cell/g), t.isLowBandwidth)) {
            if (t.bandwidth = {
                audio: !1,
                video: !1,
                screen: !1
            }, t.mediaConstraints.audio && t.mediaConstraints.audio.optional && t.mediaConstraints.audio.optional.length) {
                var A = [];
                t.mediaConstraints.audio.optional.forEach(function (e) {
                    void 0 === e.bandwidth && A.push(e)
                }), t.mediaConstraints.audio.optional = A
            }
            if (t.mediaConstraints.video && t.mediaConstraints.video.optional && t.mediaConstraints.video.optional.length) {
                A = [];
                t.mediaConstraints.video.optional.forEach(function (e) {
                    void 0 === e.bandwidth && A.push(e)
                }), t.mediaConstraints.video.optional = A
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
});
var publicRoomIdentifier, connection, videoConnection, screenConnection, tenant, role, sessionId, sessionForChat,
    roomId, socket, streamConstraints, recentFile, conversationPanel, tempStream, lsDesigner, conferenceStyle,
    classVideo, videoElementContainer, videoWidgetContainer, roomLinkPage, facingMode, iphoneLocalStream,
    localVideoStream, forceClose = !1, autoReconnectInterval = 5e3, popupNotifications = [], repeatStatInterval = 2e3,
    visitorRinging = [], requirePassComm = !1, RMCMediaTrack = {cameraStream: null, cameraTrack: null, screen: null},
    comController = function () {
        var e = this;
        this.init = function (t, o) {
            requirePassComm = "undefined" != typeof passRoom && passRoom, roomId = o, role = t, sessionId = getCookie("sessionId") && "admin" !== getCookie("sessionId") ? getCookie("sessionId") : getGuid(), queryString.s && (sessionId = queryString.s);
            var i = "admin" === role ? "a" : "";
            if (sessionForChat = getCookie("sessionForChat") ? getCookie("sessionForChat") : sessionId + i, "admin" === role && (sessionId = "admin"), queryString.isAdmin && (sessionId += "a"), facingMode = svConfigs.videoScreen.primaryCamera ? svConfigs.videoScreen.primaryCamera : "user", setCookie("sessionId", sessionId, 1), setCookie("sessionForChat", sessionForChat, 1), window.enableAdapter = !0, publicRoomIdentifier = "dashboard", tenant = "dashboard", (connection = new RTCMultiConnection).enableLogs = !!svConfigs.videoScreen.enableLogs && svConfigs.videoScreen.enableLogs, connection.iceServers = svConfigs.iceServers.iceServers, connection.socketURL = svConfigs.appWss, conferenceStyle = svConfigs.videoScreen && "conference" === svConfigs.videoScreen.videoContainerStyle ? "conference" : "simple", classVideo = "conference" === conferenceStyle ? "sourcevideo" : "bigvideo", videoElementContainer = "conference" === conferenceStyle ? "video_container_small" : "video_container", videoWidgetContainer = "conference" === conferenceStyle ? "w.html" : "widget.html", roomLinkPage = "conference" == conferenceStyle ? "r.html" : "room.html", connection.publicRoomIdentifier = publicRoomIdentifier, connection.onbeforeunload = function () {
            }, connection.session = {audio: !1, video: !1, data: !0}, connection.processSdp = function (e) {
                return e
            }, "undefined" != typeof names) var r = names[sessionId] ? names[sessionId].name : guestName(sessionId); else r = guestName(sessionId);
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
                        c = jQEngager.Event("ChatMessage", {
                            msg: n.data.chatMessage,
                            date: n.data.date,
                            sessionId: n.data.sessionId,
                            privateId: n.data.privateId
                        });
                        jQEngager(document).trigger(c)
                    }
                    if (n.data.privateId && "admin" === role) {
                        jQEngager("#simpleButton" + n.data.privateId).show();
                        var t = $("#contentChatsimple" + n.data.privateId)[0],
                            o = $("#nameChat" + n.data.privateId).val();
                        const e = `\n                                <div class="msg-lsv left-msg-lsv">\n                                  <div class="msg-lsv-bubble">\n                                    <div class="msg-lsv-info">\n                                      <div class="msg-lsv-info-name">${o}</div>\n                                      <div class="msg-lsv-info-time">${getPrettyDate((new Date).getTime() / 1e3)}</div>\n                                    </div>\n\n                                    <div class="msg-lsv-text">${n.data.chatMessage}</div>\n                                  </div>\n                                </div>\n                              `;
                        if (t.insertAdjacentHTML("beforeend", e), t.scrollTop += 500, playEnterRoom(), svConfigs.serverSide.chatHistory) {
                            var i = n.data.privateId, r = [];
                            r[sessionForChat] = {}, r[i] = {}, saveChat(n.data.chatMessage, o, "", null, null, r)
                        }
                    }
                } else {
                    c = jQEngager.Event("ChatMessage", {
                        msg: n.data.chatMessage,
                        date: n.data.date,
                        sessionId: n.data.sessionId
                    });
                    jQEngager(document).trigger(c)
                } else if (n.data.translateMessage) {
                    c = jQEngager.Event("TranslateMessage", {
                        msg: n.data.translateMessage,
                        sessionId: n.data.sessionId
                    });
                    jQEngager(document).trigger(c)
                } else {
                    if ("voiceSpeaking" === n.data) {
                        c = jQEngager.Event("VoiceSpeaking", {id: n.userid});
                        jQEngager(document).trigger(c)
                    }
                    if ("voiceSilence" === n.data) {
                        c = jQEngager.Event("VoiceSilence", {id: n.userid});
                        jQEngager(document).trigger(c)
                    }
                    if (lsDesigner && "plz-sync-points" === n.data) lsDesigner.sync(); else if (n.data.whiteboardData) {
                        c = jQEngager.Event("WhiteboardSync");
                        if (jQEngager(document).trigger(c), queryString.isAdmin || localStorage.getItem("hasPrivileges") || e.startWhiteboard(), lsDesigner || e.startWhiteboard(), n.data.whiteboardData) {
                            var s = n.data.whiteboardData, a = screen.width / n.data.width;
                            s.points.forEach(function (e) {
                                "text" == e[0] ? (e[1][1] = e[1][1] * a, e[1][2] = e[1][2] * a) : "image" == e[0] || "pdf" == e[0] ? (e[1][1] = e[1][1] * a, e[1][2] = e[1][2] * a, e[1][3] = e[1][3] * a, e[1][4] = e[1][4] * a) : (e[1][0] = e[1][0] * a, e[1][1] = e[1][1] * a, e[1][2] = e[1][2] * a, e[1][3] = e[1][3] * a)
                            }), lsDesigner.syncData(s)
                        } else lsDesigner.clearCanvas()
                    }
                } else {
                    var c = jQEngager.Event("SendTyping", {typing: !1});
                    jQEngager(document).trigger(c)
                } else {
                    var c = jQEngager.Event("SendTyping", {typing: !0, sessionId: n.userid});
                    jQEngager(document).trigger(c)
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
                var s = {};
                if (connection.onFileProgress = function (e, n) {
                    var t = s[e.uuid];
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
                    s[e.uuid] = {progress: jQEngager("#progress" + e.uuid)}, s[e.uuid].progress.max = e.maxChunks
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
                        if (jQEngager(document).trigger(o), t.stream.isVideo) iphoneLocalStream = RMCMediaTrack.cameraStream = t.stream, RMCMediaTrack.cameraTrack = e.getTracks(t.stream, "video")[0], isiPhone && e.checkMediaDevices(), (r = document.getElementById("localVideo")).setAttribute("data-sessionId", t.extra.sessionId), r.setAttribute("volume", 0), r.setAttribute("autoplay", ""), r.setAttribute("muted", ""), r.setAttribute("playsinline", ""), r.srcObject = svConfigs.videoScreen.videoFileStream ? localVideoStream : t.stream, RMCMediaTrack.selfVideo = r, void 0 !== (u = r.play()) && u.then(function () {
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
                        var s = document.createElement("video");
                        s.id = t.extra.sessionId;
                        var a = videoConnection.getAllParticipants().length;
                        if (s.setAttribute("class", classVideo), "conference" !== conferenceStyle) {
                            var c = a > 1 ? "49%" : "98%";
                            s.style.width = c
                        }
                        try {
                            s.setAttributeNode(document.createAttribute("autoplay")), s.setAttributeNode(document.createAttribute("playsinline")), s.setAttributeNode(document.createAttribute("videoautoplay"))
                        } catch (o) {
                            s.playsinline = !0, s.autoplay = !0, s.videoautoplay = !0
                        }
                        var d = t.stream;
                        if ("srcObject" in s ? s.srcObject = d : s[navigator.mozGetUserMedia ? "mozSrcObject" : "src"] = navigator.mozGetUserMedia ? d : (window.URL || window.webkitURL).createObjectURL(d), videoConnection.videosContainer.appendChild(s), queryString.broadcast) {
                            var u;
                            o = jQEngager.Event("RemoteVideoStarted");
                            jQEngager(document).trigger(o), queryString.token ? toggleNotification(smartVideoLocale.msgStore.welcomeBroadcast, !0) : toggleNotification(smartVideoLocale.msgStore.incomingBroadcast, !0), void 0 !== (u = s.play()) && u.then(function () {
                                toggleNotification("", !1), s.play()
                            }).catch(function (e) {
                                $("#incomingBroadcast").click(function () {
                                    toggleNotification("", !1), s.play()
                                })
                            })
                        } else {
                            o = jQEngager.Event("RemoteVideoStarted");
                            jQEngager(document).trigger(o), s.play()
                        }
                        visitorRinging = [], setTimeout(function () {
                            connection.send("voiceSpeaking")
                        }, 1500)
                    }
                    if (queryString.broadcast) if ("remote" === t.type && videoConnection.isInitiator) {
                        var l = [];
                        videoConnection.getAllParticipants().forEach(function (e) {
                            l.push({pid: e, broadcaster: !0 === videoConnection.peers[e].extra.broadcaster})
                        }), videoConnection.socket.emit(videoConnection.socketCustomEvent, {
                            roomId: roomId,
                            participants: l
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
                    var a = {
                        mandatory: {
                            maxWidth: screen.width > 1920 ? screen.width : 1920,
                            maxHeight: screen.height > 1080 ? screen.height : 1080
                        }, optional: []
                    };
                    screenConnection.mediaConstraints = a, screenConnection.session = {
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
                            var s = r.extra, a = jQEngager("#visitors").find("#" + s.sessionId),
                                c = s.ua ? detect.parse(s.ua) : "", d = c ? c.browser.name : "", u = c ? c.os.name : "",
                                l = s.callerInfo && s.callerInfo.name ? s.callerInfo.name : guestName(s.sessionId),
                                m = '<a href="javascript:void(0);" id="chat' + s.sessionId + '">Start chat</a>',
                                f = '<section class="msger-lsv" id="simpleButton' + s.sessionId + '" style="display: none;">                            <header class="msger-lsv-header">                                <div class="msger-lsv-header-title">                                        ' + l + '                                </div>                                <div class="msger-lsv-header-options">                                        <a href="javascript:void(0);" title="" class="close-but-wd-small" id="closeSimpleChat' + s.sessionId + '"><span></span></a>                                </div>                        </header>                        <main class="msger-lsv-chat" id="contentChatsimple' + s.sessionId + '">                        </main>                        <form class="msger-lsv-inputarea" id="form' + s.sessionId + '">                                <input type="text" id="input' + s.sessionId + '" class="msger-lsv-input" placeholder="Enter your message...">                                <input type="hidden" id="nameChat' + s.sessionId + '" value="' + l + '">                                <button type="submit" class="msger-lsv-send-btn">Send</button>                        </form>                </section>';
                            if (a.length > 0) {
                                var g = a[0];
                                g.innerHTML = '<div class="col-sm-10 col-xs-10">                                                                        <div class="messages msg_receive">                                                                                <p>' + l + " " + s.referrer + " " + m + "<br/>" + u + " " + d + "</p>                                                                                                                                                        </div>                                                                </div>", jQEngager(a[0]).replaceWith(g)
                            } else m = '<a href="javascript:void(0);" id="chat' + s.sessionId + '">Start chat</a>', (g = document.createElement("div")).className = "row msg_container base_receive", g.id = s.sessionId, g.innerHTML = '<div class="col-sm-10 col-xs-10">                                                                        <div class="messages msg_receive">                                                                                <p>' + l + " " + s.referrer + " " + m + "<br/>" + u + " " + d + "</p>                                                                                                                                                        </div>                                                                </div>", jQEngager("#visitors").append(g), t++;
                            if ($("#chat" + s.sessionId).off("click"), $("#chat" + s.sessionId).click(function () {
                                $("#simpleButton" + s.sessionId).show()
                            }), 0 == jQEngager("#chats-lsv-admin").find("#simpleButton" + s.sessionId).length) {
                                jQEngager("#chats-lsv-admin").append(f), $("#chat" + s.sessionId).click(function () {
                                    $("#simpleButton" + s.sessionId).show()
                                }), $("#closeSimpleChat" + s.sessionId).click(function () {
                                    $("#simpleButton" + s.sessionId).hide()
                                });
                                var p = function (e, n, t, o) {
                                    if (!t) return;
                                    var i = $("#contentChatsimple" + s.sessionId)[0];
                                    const r = `\n                                <div class="msg-lsv ${n}-msg-lsv">\n                                  <div class="msg-lsv-bubble">\n                                    <div class="msg-lsv-info">\n                                      <div class="msg-lsv-info-name">${e}</div>\n                                      <div class="msg-lsv-info-time">${o || getPrettyDate((new Date).getTime() / 1e3)}</div>\n                                    </div>\n\n                                    <div class="msg-lsv-text">${t}</div>\n                                  </div>\n                                </div>\n                              `;
                                    i.insertAdjacentHTML("beforeend", r), i.scrollTop += 500
                                };
                                $("#form" + s.sessionId).submit(function (n) {
                                    n.preventDefault();
                                    var t = $("#input" + s.sessionId), o = t.val();
                                    if (p("Me", "right", o), t.val(""), e.addLocalChat(o, null, s.sessionId), svConfigs.serverSide.chatHistory) {
                                        var i = svConfigs.agentName ? svConfigs.agentName : "Agent", r = s.sessionId,
                                            a = [];
                                        a[sessionForChat] = {}, a[r] = {}, saveChat(o, i, "", null, null, a)
                                    }
                                }), svConfigs.serverSide.chatHistory && $.ajax({
                                    type: "POST",
                                    url: lsRepUrl + "/server/script.php",
                                    data: {type: "getchat", roomId: roomId, sessionId: s.sessionId, agentId: null}
                                }).done(function (e) {
                                    e && JSON.parse(e).forEach(function (e) {
                                        var n = svConfigs.agentName ? svConfigs.agentName : "Agent";
                                        if (e.from == n) var t = "Me", o = "right"; else t = e.from, o = "left";
                                        var i = getPrettyDate(e.date_created);
                                        p(t, o, e.message, i)
                                    })
                                }).fail(function () {
                                })
                            }
                            if ("popup" == n.extra.role) {
                                var v = jQEngager("#visitors").find("#" + s.sessionId),
                                    h = jQEngager("#visitors").find("#room" + s.sessionId), C = !1;
                                if (jQEngager("#roomid_" + n.extra.roomId).html(n.extra.roomId + ' <img src="../img/online.png" alt="waiting to connect">'), n.participants.forEach(function (e, t) {
                                    connection.peers[e] || (C = !0, jQEngager("#roomid_" + n.extra.roomId).html(n.extra.roomId + ' <img src="../img/offline.png" alt="busy">'))
                                }), v.length > 0 && 0 === h.length && !C && (setTimeout(function () {
                                    var e = v.children().children().children(), t = {};
                                    t.names = svConfigs.agentName ? svConfigs.agentName : guestName(s.sessionId), lsRepUrl && (t.lsRepUrl = lsRepUrl), agentId && (t.agentId = agentId);
                                    var o = window.btoa(unescape(encodeURIComponent(JSON.stringify(t)))),
                                        i = lsRepUrl + "pages/" + roomLinkPage + "?room=" + n.extra.roomId + "&p=" + o + "&isAdmin=1",
                                        r = document.createElement("span");
                                    r.id = "room" + s.sessionId, r.innerHTML = ' <a href="' + i + '" target="_blank">Enter Room</a>', e.append(r)
                                }, 200), -1 == jQEngager.inArray(s.sessionId, popupNotifications))) {
                                    playEnterRoom();
                                    var S = jQEngager.Event("EnterPageNotification", {name: l});
                                    jQEngager(document).trigger(S), popupNotifications.push(s.sessionId)
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
        }, this.initCall = function (n, t, o, i, r, s, a) {
            videoConnection.extra.roomOwner = !0;
            var c = n || ("initVideo" === this.id ? "Video" : "Audio"), d = r ? {deviceId: {exact: r}} : {};
            audio_on || (d = !1), a && jQEngager.extend(!0, d, a);
            var u = o ? {deviceId: {exact: o}} : {facingMode: facingMode};
            switch (s && jQEngager.extend(!0, u, s), c) {
                case"Video":
                    var l = !0;
                    streamConstraints = {video: u, audio: d};
                    break;
                case"Audio":
                    l = !1, streamConstraints = {audio: d, video: !1};
                    break;
                default:
                    l = !0, streamConstraints = {video: u, audio: d}
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
                        audio: !(!queryString.isAdmin && !localStorage.getItem("hasPrivileges")) && d,
                        video: !!queryString.isAdmin && u
                    }, queryString.isAdmin || localStorage.getItem("hasPrivileges") ? (videoConnection.extra.broadcaster = !0, videoConnection.openOrJoin(roomId + "_video", function (e, n, t) {
                        t && console.error("openOrJoin", t, n)
                    })) : (videoConnection.extra.roomOwner = !1, e.joinBroadcastLooper()))
                };
                if (svConfigs.videoScreen.videoFileStream) {
                    var f = document.getElementById("localVideo");

                    function g() {
                        localVideoStream || (f.captureStream ? (localVideoStream = f.captureStream(), m()) : f.mozCaptureStream && (localVideoStream = f.mozCaptureStream(), m()))
                    }

                    f.setAttribute("volume", 0), f.setAttribute("autoplay", ""), f.setAttribute("muted", ""), f.setAttribute("loop", ""), f.setAttribute("playsinline", ""), f.setAttribute("src", svConfigs.videoScreen.videoFileStream), f.oncanplay = g, f.readyState >= 3 && g();
                    var p = f.play();
                    void 0 !== p && p.then(function () {
                        f.play()
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
                        video: !!video_on && l,
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
        }, this.answerCall = function (n, t, o, i, r, s) {
            var a = i ? {deviceId: {exact: i}} : {};
            if (s && jQEngager.extend(!0, a, s), n) var c = o ? {deviceId: {exact: o}} : {facingMode: facingMode}; else c = !1;
            r && jQEngager.extend(!0, c, r), streamConstraints = {
                video: c,
                audio: a
            }, videoConnection.session = {
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
        }, this.rejectCall = function () {
            socket.emit(connection.socketCustomEvent, {
                type: "rejectCall",
                role: role,
                tenant: tenant,
                sessionId: sessionId,
                roomId: roomId
            })
        }, this.stopRecording = function () {
        }, this.getSessionId = function () {
            return sessionId
        }, this.getRemoteSessionId = function () {
            return ""
        }, this.getVideoStream = function () {
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
            var n = e.connection, t = e.streamedObject, o = e.stream, i = hark(o, {});
            i.on("speaking", function () {
                n.onspeaking(t)
            }), i.on("stopped_speaking", function () {
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
    };