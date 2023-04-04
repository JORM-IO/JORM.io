document.addEventListener('DOMContentLoaded', function() {

const $ = (selector) => document.querySelector(selector);
const $$ = (selector) => document.querySelectorAll(selector);

// console.log screen width
console.log(window.innerWidth);

    let body = $('body');
    let s = 0;

    setInterval(function() {
        s++
        requestAnimationFrame(function() {
            body.style.background = `linear-gradient(${s}deg, rgba(86,145,159,1) 0%, rgba(121,185,140,1) 100%)  no-repeat center center fixed`;
        });
    }, 50);

    const add_ripple = (e, timeout=0) => {
        setTimeout(function() {
            let x = e.clientX;
            let y = e.clientY;
            let ripple = document.createElement('div');
            ripple.classList.add('ripple');
            ripple.style.position = 'fixed';
            ripple.style.left = x - 50 + 'px';
            ripple.style.top = y - 50 + 'px';
            body.appendChild(ripple);
            setTimeout(function() {
                ripple.remove();
            }, 1000);
        }, timeout);
    }

  
    // add a fixed div where the user clicks on the page and add a class to it .ripple and remove it after 1s
    document.addEventListener('click', function(e) {
        add_ripple(e);
        add_ripple(e, 100);
    } );

    // add touch event for mobile devices
    document.addEventListener('touchstart', function(e) {
        add_ripple(e);
    });

});