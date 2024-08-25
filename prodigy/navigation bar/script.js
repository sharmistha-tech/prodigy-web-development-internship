// script.js
window.addEventListener('scroll', function() {
    const navbar = document.querySelector('.navbar');
    if (window.scrollY > 50) {
        navbar.style.backgroundColor = 'rgba(0, 0, 0, 0.8)';
    } else {
        navbar.style.backgroundColor = 'transparent';
    }
});

const menuItems = document.querySelectorAll('.menu-item a');

menuItems.forEach(item => {
    item.addEventListener('mouseover', () => {
        item.style.color = '#ff6600';
    });

    item.addEventListener('mouseout', () => {
        item.style.color = 'white';
    });
});
