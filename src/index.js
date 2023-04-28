require('./style.css')
const { gsap } = require("gsap");
const dayjs = require('dayjs')
var utc = require('dayjs/plugin/utc')
var timezone = require('dayjs/plugin/timezone')
var customParseFormat = require('dayjs/plugin/customParseFormat')
var isBetween = require('dayjs/plugin/isBetween')
var fa = require('font-awesome/css/font-awesome.css');

dayjs.extend(isBetween)
dayjs.extend(customParseFormat)
dayjs.extend(utc)
dayjs.extend(timezone)

function getDeviceOperatingSystem() {
    var userAgent = navigator.userAgent || navigator.vendor || window.opera;

    if (/windows phone/i.test(userAgent)) {
        return "Windows";
    }

    if (/android/i.test(userAgent)) {
        return "Android";
    }

    if (/iPad|iPhone|iPod/.test(userAgent) && !window.MSStream) {
        return "iOS";
    }

    return "unknown";
}

const cjcoAppBarStart = async (data) => {

    var mainUrl;
    var ctaText = data.text;

    if (typeof data.icon == 'undefined') {
        data.icon = true
    }

    // get device type
    var device = getDeviceOperatingSystem();

    // create app bar wrapper
    if (document.querySelector('.cjco-app-wrapper')) {
        return;
    }
    var appWrapper = document.createElement("div")
    appWrapper.classList.add('cjco-app-wrapper')
    appWrapper.style.background = data.backgroud

    // create app bar link
    var appHref = document.createElement("a")
    appHref.classList.add('cjco-app-url')

    // create app bar inner block
    var appInner = document.createElement("div")
    appInner.classList.add('cjco-app-inner')
    appInner.style.color = data.color

    // create app bar text
    var appText = document.createElement("p")
    appText.classList.add('cjco-app-text', 'flow-up')

    // create app bar icon wrap
    var appIconWrap = document.createElement("i")
    appIconWrap.classList.add('cjco-app-icon-wrap', 'flow-up')

    if (data.target) {
        appHref.target = data.target
    } else {
        appHref.target = '_blank'
    }

    if (data.url) {
        mainUrl = data.url
    } else {
        if (device == 'Android') {
            if (data.android) {
                mainUrl = data.android
            }
        }
        else if (device == 'iOS') {
            if (data.ios) {
                mainUrl = data.ios
            }
        }
        else {
            if (data.ios) {
                mainUrl = data.ios
            }
        }
    }

    appHref.href = mainUrl
    appText.innerHTML = ctaText;

    if (data.automate) {
        data.automate.forEach(async automate => {

            let weekDayIndex, currentDate, currentStoreDate, currentStoreTime, startStoreTime, endStoreTime;

            var week = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

            const weekDayIndexAPI = dayjs().day();

            currentDate = dayjs().tz(`${automate.country}/${automate.city}`).format();

            currentStoreDate = dayjs().format('YYYY-MM-DD')
            startDate = dayjs.tz(`${currentStoreDate} ${automate.startTime}`, `${automate.country}/${automate.city}`).format();
            endDate = dayjs.tz(`${currentStoreDate} ${automate.endTime}`, `${automate.country}/${automate.city}`).format();

            if (automate.days) {
                automate.days.forEach((day) => {

                    if (week.includes(day)) {
                        weekDayIndex = week.indexOf(day);

                        if (weekDayIndexAPI == weekDayIndex) {

                            if (dayjs(currentDate).isBetween(startDate, endDate)) {
                                mainUrl = automate.url
                                ctaText = automate.text
                            }

                        }
                    } else {
                        throw Error('Insert a correct name of weekday. Inserted: ' + day)
                    }

                })
            }

            appHref.href = mainUrl
            appText.innerHTML = ctaText;

        });
    }

    const body = document.body
    body.appendChild(appWrapper)
    appWrapper.appendChild(appHref)
    appHref.appendChild(appInner)
    appInner.append(appText)

    if (data.icon == true) {
        // create app bar icon
        var appIcon = document.createElement("i")
        appIcon.classList.add('cjco-app-icon')

        if (data.url) {
            appIcon.classList.add('fa', 'fa-arrow-right')
        } else {
            if (device == 'Windows') {
                appIcon.classList.add('fa-brands', 'fa-windows')
            }
            else if (device == 'Android') {
                appIcon.classList.add('fab', 'fa-google-play')
            }
            else if (device == 'iOS') {
                appIcon.classList.add('fa-brands', 'fa-app-store')
            }
            else {
                appIcon.classList.add('fa-brands', 'fa-app-store')
            }
        }
        appInner.append(appIconWrap)
        appIconWrap.appendChild(appIcon)
    }

    var barHeight = appWrapper.clientHeight;

    var tl = gsap.timeline()

    tl.from('.cjco-app-wrapper', {
        y: barHeight - 6,
        duration: 2.6,
        ease: 'elastic.inOut(1, 0.5)'
    })

    tl.from('.flow-up', {
        y: 50,
        duration: 2.6,
        stagger: 0.2,
        ease: 'elastic.inOut(1, 0.5)'
    }, -0.0001)

}

const cjcoAppBar = (data) => {

    // meta
    if (!document.querySelector("meta[name=viewport]")) {
        var meta = document.createElement('meta');
        meta.name = "viewport";
        meta.content = "width=device-width,initial-scale=1.0";
        document.getElementsByTagName('head')[0].appendChild(meta);
    }

    window.addEventListener("DOMContentLoaded", () => {
        if (window.matchMedia("(max-width: 600px)").matches) {
            cjcoAppBarStart(data)
        }
    })
    window.addEventListener('resize', function (event) {
        if (window.matchMedia("(max-width: 600px)").matches) {
            cjcoAppBarStart(data)
        }
    }, true);
}

const isValidHttpUrl = (string) => {
    let url;
    try {
        url = new URL(string);
    } catch (_) {
        return false;
    }
    return url.protocol === "http:" || url.protocol === "https:";
}

const attention = (data) => {
    var defaults = {
        titles: [document.title],
        effect: 'blink',
        delay: 1000,
        // seperator: ' \u200e'
        seperator: '•'
    };
    const oldTitle = document.title;
    var timeoutId;
    var favLink = document.querySelector("link[rel~='icon']");
    const oldFav = favLink.href;

    // blinking
    function TitleBlinker(data) {
        var _instance = {};

        var totalTiles = data.message.length;
        tempTitles = data.message;

        function updateTitle() {
            for (var x = 0; x <= (totalTiles * 2); x += 2) {
                tempTitles.splice(x, 0, " \u200e");
            }

            tempTitles.shift();
            data.message = tempTitles;
        }

        function blink() {
            updateTitle();

            var i = 0;

            timeoutId = setInterval(function () {

                text = data.message[i];
                document.title = text;

                if (i == (data.message.length - 1)) {
                    i = 0;
                } else {
                    i++;
                }

            }, data.delay || defaults.delay);
        }

        function clear() {
            if (timeoutId) {
                clearInterval(timeoutId);
            }
            document.title = oldTitle;
            window.onmousemove = null;
            timeoutId = null;
        }

        _instance.init = blink;

        _instance.stop = clear;

        return _instance;

    }
    function BlinkTitle(data) {
        var _instance = {};

        var index = 0;
        var timeoutId;

        var updateTitle = function () {
            document.title = data.message[index];
            index = (index + 1) % data.message.length;
        };
        var clear = function () {
            clearInterval(timeoutId);
            document.title = oldTitle;
            window.onmousemove = null;
            timeoutId = null;
        };
        var blink = function () {
            if (!timeoutId) {
                timeoutId = setInterval(updateTitle, data.delay || defaults.delay);
                window.onmousemove = clear;
            }
        };

        _instance.init = blink;

        _instance.stop = clear;

        return _instance;
    };
    var blink = new BlinkTitle(data);

    // scrolling
    function MovingTitle(data, visibleLetters) {
        var _instance = {};

        var writeText;

        if (data.seperator) {
            writeText = ` ${data.message.join(` ` + data.seperator + ` `)} ${data.seperator} `;
        } else {
            writeText = ` ${data.message.join(` ` + defaults.seperator + ` `)} ${defaults.seperator} `;
        }

        var _currId = 0;
        var _numberOfLetters = writeText.length;

        function updateTitle() {
            _currId += 1;
            if (_currId > _numberOfLetters - 1) {
                _currId = 0;
            }

            var startId = _currId;
            var endId = startId + visibleLetters;
            var finalText;
            if (endId < _numberOfLetters - 1) {
                finalText = writeText.substring(startId, endId);
            } else {
                var cappedEndId = _numberOfLetters;
                endId = endId - cappedEndId;

                finalText = writeText.substring(startId, cappedEndId) + writeText.substring(0, endId);
            }

            document.title = finalText;
        }

        function marquee() {
            timeoutId = setInterval(updateTitle, data.delay);
        }

        function clear() {
            if (timeoutId) {
                clearInterval(timeoutId);
            }
            document.title = oldTitle;
            window.onmousemove = null;
            timeoutId = null;
        };

        _instance.init = marquee;

        _instance.stop = clear;

        return _instance;
    }
    var marquee = new MovingTitle(data, 40);

    // favicon
    function BlinkFaviconEmoji(data) {
        var _instance = {};

        let timeoutId;
        let index = 0;

        let updateFavicon = function () {
            if (!isValidHttpUrl(data.favicon.icon[index])) {
                document.querySelector("link[rel~='icon']").setAttribute("href", `data:image/svg+xml,<svg xmlns=%22http://www.w3.org/2000/svg%22 viewBox=%220 0 100 100%22><text y=%22.9em%22 font-size=%2290%22>${data.favicon.icon[index]}</text></svg>`);
            } else {
                document.querySelector("link[rel~='icon']").setAttribute("href", data.favicon.icon[index]);
            }
            index = (index + 1) % data.favicon.icon.length;
        };

        let clear = function () {
            clearInterval(timeoutId);
            document.querySelector("link[rel~='icon']").setAttribute("href", oldFav);
            window.onmousemove = null;
            timeoutId = null;
        };

        let blink = function () {
            if (!timeoutId) {
                timeoutId = setInterval(updateFavicon, data.favicon.delay || defaults.delay);
                window.onmousemove = clear;
            }
        }

        _instance.init = blink;

        _instance.stop = clear;

        return _instance;
    }
    var favEmoji = new BlinkFaviconEmoji(data);

    window.addEventListener("DOMContentLoaded", () => {
        document.addEventListener("visibilitychange", function () {
            if (document.visibilityState === "visible") {
                if (data.effect == 'blink') {
                    blink.stop();
                } else if (data.effect == 'scroll') {
                    marquee.stop();
                }

                if (data.favicon) {
                    favEmoji.stop();
                }
            } else {
                if (data.effect == 'blink') {
                    blink.init();
                } else if (data.effect == 'scroll') {
                    marquee.init();
                }

                if (data.favicon) {
                    favEmoji.init();
                }
            }
        });
    });

}

module.exports = {
    appBar: function (data) {
        new cjcoAppBar(data);
    },
    attention: function (data) {
        new attention(data);
    }
};