var queryString, svConfigs, ms = Date.now(), currVersion = ms,
    lsRepUrl = window.location.protocol + "//" + window.location.host + "/chat/", autoReconnectInterval = 5000,
    configName = "config.json";
    console.log(lsRepUrl);

function loadScript(a, b) {
    var c = document.createElement("script");
    c.type = "text/javascript", c.readyState ? c.onreadystatechange = function () {
        ("loaded" == c.readyState || "complete" == c.readyState) && (c.onreadystatechange = null, b && b())
    } : (c.onload = function () {
        b && b()
    }, c.onerror = function () {
        setTimeout(function () {
            loadScript(a, b)
        }, autoReconnectInterval)
    }), c.src = a + "?v=" + currVersion, document.getElementsByTagName("head")[0].appendChild(c)
}

function sendPopupMessage(a) {
    $("#homepage").postMessage(a, "*")
}

var QueryString = function () {
    for (var a, b = {}, c = window.location.search.substring(1), d = c.split("&"), e = 0; e < d.length; e++) if (a = d[e].split("="), "undefined" == typeof b[a[0]]) b[a[0]] = a[1]; else if ("string" == typeof b[a[0]]) {
        var f = [b[a[0]], a[1]];
        b[a[0]] = f
    } else b[a[0]].push(a[1]);
    return b
};
$(function () {
    var a = function (a, b) {
        for (var c in a) {
            var d = a[c];
            d && (b ? b.setAttribute("data-" + c, d) : ("lsRepUrl" === c && (lsRepUrl = d), "config" === c && (configName = d)))
        }
    }, b = function () {
        var b = document.getElementById("newdev-embed-script");
        b.src = lsRepUrl + "js/bundle.client.js?v=" + currVersion, b.id = "newdev-embed-script", b.setAttribute("data-source_path", lsRepUrl), b.setAttribute("async", !0), b.setAttribute("data-is_popup", !0);
        var c = queryString.p === void 0 ? null : JSON.parse(decodeURIComponent(escape(window.atob(queryString.p))));
        queryString.isAdmin || (svConfigs.agentName && b.setAttribute("data-names", svConfigs.agentName), svConfigs.agentAvatar && b.setAttribute("data-avatar", svConfigs.agentAvatar)), a(c, b)
    }, c = function () {
        queryString = QueryString();
        var c = queryString.p === void 0 ? null : JSON.parse(decodeURIComponent(escape(window.atob(queryString.p))));
        a(c), $.get(lsRepUrl + "pages/version.txt?v=" + ms, function (a) {
            currVersion = a;
            var c = function () {
                var a = {lsRepUrl: lsRepUrl, lang: svConfigs.smartVideoLanguage};
                smartVideoLocale.init(a, jQuery), b()
            }, d = function () {
                svConfigs.iceServers.requirePass ? $.ajax({
                    type: "POST",
                    url: lsRepUrl + "/server/script.php",
                    data: {type: "getpassphrase"}
                }).done(function (a) {
                    a && (svConfigs.iceServers.passPhrase = a, loadScript(lsRepUrl + "js/i18n.js", c))
                }).fail(function () {
                }) : loadScript(lsRepUrl + "js/i18n.js", c)
            }, e = function () {
                loadScript(svConfigs.appWss + "socket.io/socket.io.js", d)
            };
            $.ajax({
                url: lsRepUrl + "config/" + configName + "?v=" + currVersion,
                type: "GET",
                dataType: "json",
                beforeSend: function (a) {
                    a && a.overrideMimeType && a.overrideMimeType("application/j-son;charset=UTF-8")
                },
                success: function (a) {
                    svConfigs = a, e()
                }
            })
        })
    };
    c()
});