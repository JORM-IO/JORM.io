const _ = {
    log: function() {
        console.log(...arguments)
    },
    $: function(selector) {
        return document.querySelector(selector)
    },
    $$: function(selector) {
        return document.querySelectorAll(selector)
    },
    observe: function (
        targets, 
        intersect_function, 
        unintersect_function=function(){}, 
        unobserve=false, 
        options={
            root: null,
            rootMargin: '0px 0px 80px 0px',
            threshold: 1
        }
    ) {
        let callback = (entries, observer) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    intersect_function(entry);
                    if (unobserve) {
                        observer.unobserve(entry.target);
                    }
                } else {
                    unintersect_function(entry);
                }
                
            });
        };
    
        let observer = new IntersectionObserver(callback, options);
        targets.forEach(el => observer.observe(el))
    },
    onScroll: function (callback) {
        // on scroll mouse
        let last_scrollY = 0
        let last_scrollX = 0
        window.addEventListener('scroll', function(event) {
            let scrollY = window.scrollY
            let scrollX = window.scrollX
            let scrollY_diff = scrollY - last_scrollY
            let scrollX_diff = scrollX - last_scrollX
            last_scrollY = scrollY
            last_scrollX = scrollX
            
            callback(scrollY, scrollX, scrollY_diff, scrollX_diff)
        })

        // on scroll touch
        let last_touchY = 0
        let last_touchX = 0
        window.addEventListener('touchmove', function() {
            let touchY = window.scrollY
            let touchX = window.scrollX
            let touchY_diff = touchY - last_touchY
            let touchX_diff = touchX - last_touchX
            last_touchY = touchY
            last_touchX = touchX

            callback(touchY, touchX, touchY_diff, touchX_diff)
        })
    }

    
}

const log = (msg) => console.log(msg)

window.onbeforeunload = function () {
    window.scrollTo(0, 0);
}

function logo_animation() {
    // initial animation
    let logo_small = _.$('.logo_small')

    let [img1, img2] = _.$$('.logo_big img')
    let logo = _.$('.logo_big')
    
    setTimeout(function() {
        logo.classList.remove('s0')
        logo.classList.add('s1')
        img1.classList.remove('s0')
        img1.classList.add('s1')
        img2.classList.remove('s0')
        img2.classList.add('s1')
    }, 100)

    setTimeout(function() {
        let hamburger = _.$('.hamburger')
        hamburger.classList.remove('s0')
    }, 800)
    
    
    // scroll animation
    let lastScale = 1
    let lastY = 20
    let lastX = -150
    let logo_animation_done = false
    function handle_logo_animation(scroll_diff) {
        // logo animation
        logo.classList.remove('s1')
        logo.classList.add('s2')
        img1.classList.remove('s1')
        img1.classList.add('s2')
        img2.classList.remove('s1')
        img2.classList.add('s2')


        let newScale = lastScale - scroll_diff / 200
        if (newScale < 0) newScale = 0
        if (newScale > 1) newScale = 1
        lastScale = newScale

        let newOpacity = newScale * 100
        if (newOpacity < 0) newOpacity = 0
        if (newOpacity > 100) newOpacity = 100

        // img1.style.opacity = `${newOpacity / 100}`
        // img2.style.opacity = `${newOpacity / 100}`

        let newRotateX = (1 - newScale) * 90
        if (newRotateX < 0) newRotateX = 0
        if (newRotateX > 90) newRotateX = 90
        
        let newTranslateY = lastY - scroll_diff / 10
        if (newTranslateY < 0) newTranslateY = 0
        if (newTranslateY > 20) newTranslateY = 20
        lastY = newTranslateY

        let img1_translateY = newTranslateY * 1.0
        let img2_translateY = newTranslateY * 1.01

        if (img1_translateY < 0) img1_translateY = 0
        if (img1_translateY > 20) img1_translateY = 20
        if (img2_translateY < 0) img2_translateY = 0
        if (img2_translateY > 20) img2_translateY = 20


        // img1.style.transform = `translate(20%, ${img1_translateY}%)`
        // img2.style.transform = `translate(20%, ${img2_translateY}%)`

        if (!logo_animation_done) {
            let newOpacity_small = (1 - newScale) * 100
            if (newOpacity_small < 0) newOpacity_small = 0
            if (newOpacity_small > 100) newOpacity_small = 100
            logo_small.style.opacity = newOpacity_small + '%'

            let newRotateX_small = newScale * 90
            if (newRotateX_small < 0) newRotateX_small = 0
            if (newRotateX_small > 90) newRotateX_small = 90
            // logo_small.style.transform = `rotateX(${newRotateX_small}deg)`

            let newTranslateX_small = lastX + scroll_diff 
            if (newTranslateX_small < -150) newTranslateX_small = -150
            if (newTranslateX_small > 0) newTranslateX_small = 0
            lastX = newTranslateX_small
            logo.style.transition = 'all 0.25s ease-out'
            logo_small.style.transform = `translateX(${newTranslateX_small}px)`

            if (newRotateX_small === 0) {
                logo_animation_done = true
            }
        }


    }



    let last_scroll = 0
    window.addEventListener('scroll', function() {
        let scroll = window.scrollY
        let scroll_diff = scroll - last_scroll
        last_scroll = scroll
        

        if (scroll > 0) {
            handle_logo_animation(scroll_diff)
            // handle_card_animation(scroll_diff)
        }
        else {
            logo.classList.remove('s2')
            logo.classList.add('s1')
            img1.classList.remove('s2')
            img1.classList.add('s1')
            img2.classList.remove('s2')
            img2.classList.add('s1')
        }


    })

    // on scroll touch
    let last_touch = 0
    window.addEventListener('touchmove', function() {
        let touch = window.scrollY
        let touch_diff = touch - last_touch
        last_touch = touch
        if (touch > 0) {
            handle_logo_animation(touch_diff)
            // handle_card_animation(touch_diff)
        }
        else {
            logo.classList.remove('s2')
            logo.classList.add('s1')
            img1.classList.remove('s2')
            img1.classList.add('s1')
            img2.classList.remove('s2')
            img2.classList.add('s1')
        }
    })
}


function case_modal_onScroll(e){
    console.log(e)
}







document.addEventListener('DOMContentLoaded', function() {

    let hero_video = _.$('.hero_video')
    // hero_video.src = "https://jorm.io/dev/assets/mixkit-top-aerial-shot-of-seashore-with-rocks-1090-large.mp4"
    hero_video.play()

    
    

    // logo animations
    logo_animation()


    window.addEventListener('scroll', function() {
        let scroll = window.scrollY
        if (scroll > 1000) {
            _.$('footer').style.zIndex = 103
            _.$('footer').style.opacity = 0.9
            _.$('.scroll_down_arrow').style.display = 'none'
            _.$('.logo_big').style.display = 'none'
        } else {
            _.$('footer').style.opacity = 0
            _.$('.scroll_down_arrow').style.display = 'flex'
            _.$('.logo_big').style.display = 'block'
        }
    })



    let case_id = ''
    _.$$('.case').forEach(function(item) {
        item.addEventListener('click', function(e) {
            case_id = e.target.getAttribute('data-case')
            if (case_id) {
                _.$(`.case_modal.${case_id}`).classList.add('active')
                _.$('.hamburger').classList.toggle('no_modal')
                _.$('.hamburger').classList.toggle('case_modal_apx')
                _.$('.hamburger').classList.toggle('active')

            }
            _.$('body').classList.add('no_scroll')
        })
    })

    

    let image_viewer_src = ''
    _.$$('.open-image-viewer').forEach(function(item) {
        item.addEventListener('click', function(e) {
            image_viewer_src = e.target.getAttribute('src')
            if (image_viewer_src) {
                _.$(`.image-viewer`).classList.add('active')
                let image_viewer_img = _.$('.image-viewer .image-viewer-img')

                image_viewer_img.setAttribute('src', image_viewer_src)

                let menu_class = _.$('.hamburger').classList
                menu_class.toggle('img_viewer')
                
                if (menu_class.contains('no_modal')) {
                    menu_class.toggle('no_modal')
                    menu_class.toggle('active')
                }

                if(_.$('body').classList.contains('no_scroll')) {}
                else _.$('body').classList.add('no_scroll')


                let images = _.$$('.open-image-viewer img')
                let image_index = 0
                images.forEach(function(item, index) {
                    if (item.getAttribute('src') === image_viewer_src) {
                        image_index = index
                    }
                })

                // insert all images in image-viewer-controls-images
                let image_viewer_controls_images = _.$('.image-viewer-controls-images')
                image_viewer_controls_images.innerHTML = ''
                images.forEach(function(item) {
                    let img = document.createElement('img')
                    img.setAttribute('src', item.getAttribute('src'))
                    image_viewer_controls_images.appendChild(img)
                })

                // set active image in image-viewer-controls-images
                let image_viewer_controls_images_img = _.$$('.image-viewer-controls-images img')
                image_viewer_controls_images_img.forEach(function(item, index) {
                    if (index === image_index) {
                        item.classList.add('active')
                    }
                })

                // change image on click
                image_viewer_controls_images_img.forEach(function(item, index) {
                    item.addEventListener('click', function() {
                        image_viewer_img.setAttribute('src', item.getAttribute('src'))
                        image_viewer_controls_images_img.forEach(function(item) {
                            item.classList.remove('active')
                        })
                        item.classList.add('active')
                    })
                })

                // change image on arrow click
                _.$('.image-viewer-prev').addEventListener('click', function() {
                    if (image_index > 0) {
                        image_index--
                        image_viewer_img.setAttribute('src', images[image_index].getAttribute('src'))
                        image_viewer_controls_images_img.forEach(function(item) {
                            item.classList.remove('active')
                        })
                        image_viewer_controls_images_img[image_index].classList.add('active')
                    } else {
                        image_index = images.length - 1
                        image_viewer_img.setAttribute('src', images[image_index].getAttribute('src'))
                        image_viewer_controls_images_img.forEach(function(item) {
                            item.classList.remove('active')
                        })
                        image_viewer_controls_images_img[image_index].classList.add('active')
                    }
                })

                _.$('.image-viewer-next').addEventListener('click', function() {
                    if (image_index < images.length - 1) {
                        image_index++
                        image_viewer_img.setAttribute('src', images[image_index].getAttribute('src'))
                        image_viewer_controls_images_img.forEach(function(item) {
                            item.classList.remove('active')
                        })
                        image_viewer_controls_images_img[image_index].classList.add('active')
                    } else {
                        image_index = 0
                        image_viewer_img.setAttribute('src', images[image_index].getAttribute('src'))
                        image_viewer_controls_images_img.forEach(function(item) {
                            item.classList.remove('active')
                        })
                        image_viewer_controls_images_img[image_index].classList.add('active')
                    }
                })

                // 

            }
        })
    })





    _.$('.hamburger').addEventListener('click', function() {
        if (_.$('.hamburger').classList.contains('no_modal')) {
            _.$('.hamburger').classList.toggle('active')
            _.$('nav .menu').classList.toggle('open')
            _.$('.floating_filter').classList.toggle('open')
            _.$('.scroll_down_arrow').classList.toggle('hidden')
            _.$('.logo_big').classList.toggle('hidden')
            _.$('body').classList.toggle('no_scroll')
            _.$('.logo_small').classList.toggle('no_mix_blend_mode')
            _.$('.hamburger').classList.toggle('no_mix_blend_mode')
        }
        else if (_.$('.hamburger').classList.contains('img_viewer')) {
            _.$(`.image-viewer`).classList.remove('active')
            _.$('.hamburger').classList.toggle('img_viewer')
            

            if (_.$('.hamburger').classList.contains('case_modal_apx')) {
                console.log('case modal is active')
            }
            else {
                _.$('body').classList.remove('no_scroll')
                _.$('.hamburger').classList.toggle('no_modal')
                _.$('.hamburger').classList.toggle('active')
            }
        }
        else {
            _.$(`.case_modal.${case_id}`).classList.remove('active')
            _.$('body').classList.remove('no_scroll')
            _.$('.hamburger').classList.toggle('no_modal')
            _.$('.hamburger').classList.toggle('active')
        }
    })



    _.$$('.case_modal_outer').forEach(function(item) {
        item.addEventListener('scroll', function(event) {
            let scrollTop = event.target.scrollTop



            requestAnimationFrame(function() {
                _.$(`.case_modal.${case_id} .modal_images img:first-child`).style.height = `calc(80vh - ${scrollTop}px)`
                _.$(`.case_modal.${case_id} .modal_images img:first-child`).style.top = `${scrollTop}px`

                
            })
        })

        
    })

    // let last_carousel_scrollX = 0
    // let carousel_in_view = false
    // _.onScroll(function(scrollY, scrollX, scrollY_diff, scrollX_diff) {
    //     let item = _.$(".carousel")

    //     // if in view
    //     if ( 
    //         (item.getBoundingClientRect().top < window.innerHeight - 150) 
    //         && (item.getBoundingClientRect().bottom > 150)
    //     ) {
    //         let newRotateX = last_carousel_scrollX - scrollY_diff / 10
    //         if (newRotateX < last_carousel_scrollX - 60) console.log("too fast")
    //         last_carousel_scrollX = newRotateX

    //         if (newRotateX > -300 && newRotateX < 0) {
    //             item.style.transform = `rotateX(${newRotateX}deg)`
    //             carousel_in_view = true
    //             // console.log("in view")
    //         } else {
    //             carousel_in_view = false
    //         }
    //     }
    //     else {
    //         carousel_in_view = false
    //         // console.log("not in view")

    //     }
    // })


    // main scroll animation
    // let last_cardsWrapper_scrollY = 100
    // _.onScroll(function(scrollY, scrollX, scrollY_diff, scrollX_diff) {
    //     let item = _.$("main")
    //     log(scrollY)

    //     if (!carousel_in_view) {
    //         // decrese top property of main with scrollY_diff
    //         let top = item.getBoundingClientRect().top
    //         let newTop = top - scrollY / 10
            
    //         last_cardsWrapper_scrollY = newTop
    //         item.style.top = newTop + 'px'
    //     }
  
    // })















})