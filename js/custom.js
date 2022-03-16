function headerslider() {
    var slide = document.querySelector('.header .slide')
    if (!slide) return;
    var slideW = slide.offsetWidth
    var ul = slide.querySelector('ul')
    var li = slide.querySelectorAll('li')
    var liL = li.length
    var index = 0

    //prev
    var prev = document.createElement('div');
    prev.className = 'prev';
    prev.onclick = function() {
        now(-1);
    };
    slide.appendChild(prev);

    //next
    var next = document.createElement('div');
    next.className = 'next';
    next.onclick = function() {
        now(1);
    };
    slide.appendChild(next);

    function now(i) {
        var now = (index + i + liL) % liL;
        move(now);
    }
    function init() {
        // console.log('init');
        slideW = slide.offsetWidth
        li.forEach(function(i) {
            i.style.width = slideW + 'px'
            i.style.display = 'flex'
        })
        ul.style.width = slideW * liL + 'px'
        ul.style.marginLeft = '0px'
        // ul.style.transition = 'margin-left .8s'

        //point
        var points = slide.querySelector('.points');
        if (points) {
            points.innerHTML = '';
        } else {
            points = document.createElement('div');
            points.className = 'points'
        }

        for (let i = 0; i < liL; i++) {
            var dot = document.createElement('span');
            if (i == 0) {
                dot.classList.add('active')
            }
            dot.onclick = function() {
                move(i);
            };
            // console.log(points)
            points.append(dot);
        }
        slide.append(points)
        slide.style.opacity = '1';
    }
    function move(i) {
        index = i;
        //move
        var dis = i * slideW;
        ul.style.marginLeft = -dis + 'px'

        //active
        var spans = slide.querySelectorAll('.points span')
        for(var o=0; o<spans.length;o++) {
            spans[o].classList.remove('active')
            li[o].classList.remove('active')
        }
        spans[i].classList.add('active');
        li[i].classList.add('active')
    }
    window.addEventListener('resize', function() {
        init();
    });
    init();
}
function navBtn() {
    var nav = document.querySelector('.header .nav')
    var btn = nav.querySelector('.btn')
    btn.addEventListener('click',function () {
       if(nav.classList.contains('active')){
           nav.classList.remove('active')
       }else{
           nav.classList.add('active')
       }
    })

    var links = document.querySelectorAll('.navBtn')
    links.forEach(function (i) {
        i.addEventListener('click',function (e) {
            e.preventDefault()
            nav.classList.remove('active')
            goto(this)
        })
    })


}
function goto(o) {
    var offsetTop = document.querySelector('.'+o.getAttribute('href')).offsetTop;
    var isanimation = false;
    (function timer() {
        var scrollHeight = (document.documentElement.scrollHeight || document.body.scrollHeight)-window.innerHeight;
        var scollTop = document.documentElement.scrollTop || document.body.scrollTop;
        var itarget = scollTop - offsetTop;
        var ispeed = itarget < 0 ? Math.ceil(-itarget / 16) : Math.floor(-itarget / 16);
        if (Math.abs(itarget) < 1 || isanimation || scrollHeight==scollTop && offsetTop!=0) {
            document.documentElement.scrollTop = document.body.scrollTop = offsetTop;
        } else {
            document.documentElement.scrollTop = document.body.scrollTop = scollTop + ispeed;
            (window.requestAnimationFrame && requestAnimationFrame(timer)) || setTimeout(timer, 24);
        }
    })()
    document.addEventListener('mousewheel', function() {
        isanimation = true
    })
}
function scrollShowObj() {
    var scrollAnimation = document.querySelectorAll(".animation");
    // console.log(scrollAnimation)
    if (!scrollAnimation.length) return;
    function getoffset(el) {
        var box = el.getBoundingClientRect();
        return {
            top: box.top + window.pageYOffset - document.documentElement.clientTop,
            left: box.left + window.pageXOffset - document.documentElement.clientLeft
        }
    }
    function scrollLoad(){
        for (var i = 0; i < scrollAnimation.length; i++) {
            var scrollY = window.scrollY || window.pageYOffset; //IE
            var slideInAt = (scrollY + window.innerHeight) - scrollAnimation[i].offsetHeight / 2;
            var offsetTop = getoffset(scrollAnimation[i]).top;
            var vBottom = offsetTop + scrollAnimation[i].offsetHeight;
            var isShow = slideInAt > offsetTop;
            var isScroll = window.scrollY < vBottom;
            if (isShow) {
                scrollAnimation[i].classList.add('active');
            }
        }
    }
    document.addEventListener('scroll', function() {
        scrollLoad();
    })
}
function scrollTopFn() {
    window.scrollTo (0,0);
    var currentScroll = document.documentElement.scrollTop || document.body.scrollTop;
    if (currentScroll > 0) {
        window.requestAnimationFrame(scrollTopFn);
        //     window.scrollTo (0,currentScroll - (currentScroll/5));
    }else{
        scrollShowObj();
    }
}
function index() {
    navBtn();
    headerslider();
    scrollTopFn();

    //load hide
    var load = document.querySelector('.load');
    load.classList.add('hide')

    //headerslider Text show
    var li = document.querySelector('.header .slide li')
    li.classList.add('active')
}

window.onload = function() {
    index();
}