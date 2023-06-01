onload = () =>{
    const load = document.getElementById('load')

    setTimeout(() =>{
        load.style.display = 'none'
    }, 2000)
}

const scrollHeader = () =>{
    const header = document.getElementById('header')
    this.scrollY >= 50 ? header.classList.add('scroll-header') 
                       : header.classList.remove('scroll-header')
}
window.addEventListener('scroll', scrollHeader)

let mixerProducts = mixitup('.products__content', {
    selectors: {
        target: '.products__card'
    },
    animation: {
        duration: 300
    }
});

mixerProducts.filter('.delicacies')

const linkProducts = document.querySelectorAll('.products__item')

function activeProducts(){
    linkProducts.forEach(l=> l.classList.remove('active-product'))
    this.classList.add('active-product')
}

linkProducts.forEach(l=> l.addEventListener('click', activeProducts))






let mixerProducts1 = mixitup('.products__content1', {
    selectors: {
        target: '.products__card1'
    },
    animation: {
        duration: 300
    }
});

mixerProducts1.filter('.product')

const linkProducts1 = document.querySelectorAll('.products__item1')

function activeProducts1(){
    linkProducts1.forEach(l=> l.classList.remove('active-product1'))
    this.classList.add('active-product1')
}

linkProducts1.forEach(l=> l.addEventListener('click', activeProducts1))