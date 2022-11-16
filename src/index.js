require('./style.css')
require('@fortawesome/fontawesome-free/js/fontawesome')
require('@fortawesome/fontawesome-free/js/solid')
require('@fortawesome/fontawesome-free/js/regular')
require('@fortawesome/fontawesome-free/js/brands')
const {gsap} =  require("gsap");
const {ScrollTrigger} = require("gsap/ScrollTrigger");

gsap.registerPlugin(ScrollTrigger);

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

const cjcoAppBarStart=(data)=>{
    // console data
    // console.log(data.url)
    // console.log(data.text)

    // get device type
    var device = getDeviceOperatingSystem();

    // create app bar wrapper
    var appWrapper = document.createElement("div")
    appWrapper.classList.add('cjco-app-wrapper')
    appWrapper.style.background = data.backgroud

    // create app bar link
    var appHref = document.createElement("a")
    appHref.classList.add('cjco-app-url')
    appHref.target = '_blank'

    if(device == 'Android'){
        appHref.href = data.android
    }
    else if(device == 'iOS'){
        appHref.href = data.ios
    }
    else{
        appHref.href = data.ios
    }


    // create app bar inner block
    var appInner = document.createElement("div")
    appInner.classList.add('cjco-app-inner')
    appInner.style.color = data.color

    // create app bar text
    var appText = document.createElement("p")
    appText.innerHTML = data.text;
    appText.classList.add('cjco-app-text', 'flow-up')

    // create app bar icon wrap
    var appIconWrap = document.createElement("i")
    appIconWrap.classList.add('cjco-app-icon-wrap', 'flow-up')

    // create app bar icon
    var appIcon = document.createElement("i")
    appIcon.classList.add('cjco-app-icon')

    if(device == 'Windows'){
        appIcon.classList.add('fa-brands', 'fa-windows')
    }
    else if(device == 'Android'){
        appIcon.classList.add('fab', 'fa-google-play')
    }
    else if(device == 'iOS'){
        appIcon.classList.add('fa-brands', 'fa-app-store')
    }
    else{
        appIcon.classList.add('fa-brands', 'fa-app-store')
    }

    appIconWrap.appendChild(appIcon)

    const body = document.body
    body.appendChild(appWrapper)
    appWrapper.appendChild(appHref)
    appHref.appendChild(appInner)
    appInner.append(appText)
    appInner.append(appIconWrap)

    var barHeight = appWrapper.clientHeight;

    var tl = gsap.timeline()

    tl.from('.cjco-app-wrapper', {
        y: barHeight-6,
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

const cjcoAppBar=(data)=>{

    // meta
    if(!document.querySelector("meta[name=viewport]")){
        var meta = document.createElement('meta');
        meta.name = "viewport";
        meta.content = "width=device-width,initial-scale=1.0";
        document.getElementsByTagName('head')[0].appendChild(meta);
    }

    window.addEventListener("DOMContentLoaded", () => {
        if(window.matchMedia("(max-width: 600px)").matches){
            cjcoAppBarStart(data)
        }
    })
    window.addEventListener('resize', function(event) {
        if(window.matchMedia("(max-width: 600px)").matches){
            cjcoAppBarStart(data)
        }
    }, true);
}

module.exports = {
    appBar: function (data) {
        new cjcoAppBar(data);
    }
};