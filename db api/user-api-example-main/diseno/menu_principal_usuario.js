const toggle = document.querySelector(".toggle");
const menuDashboard = document.querySelector(".menu-dashboard");
const iconoMenu = toggle.querySelector("i");
const enlacesMenu = document.querySelectorAll(".enlace");

toggle.addEventListener("click", () => {
    menuDashboard.classList.toggle("open");

    if(iconoMenu.classList.contains("bx-menu")){
        iconoMenu.classList.replace("bx-menu", "bx-x");
    } else {
        iconoMenu.classList.replace("bx-x", "bx-menu");
    }
});

enlacesMenu.forEach(enlace => {
    enlace.addEventListener("click", () => {
        menuDashboard.classList.add("open");
        iconoMenu.classList.replace("bx-menu", "bx-x");
    });
});


document.addEventListener('DOMContentLoaded', () => {
    const carousel = document.querySelector('.carousel');
    const slides = document.querySelectorAll('.carousel-slide');
    let currentIndex = 0;
    const slideInterval = 3000; // Intervalo de tiempo en milisegundos (3000ms = 3 segundos)

    const updateCarousel = () => {
        const percentage = -(100 / slides.length) * currentIndex; // Ajuste para calcular el desplazamiento
        carousel.style.transform = `translateX(${percentage}%)`;
    };

    const nextSlide = () => {
        currentIndex = (currentIndex + 1) % slides.length;
        updateCarousel();
    };

    setInterval(nextSlide, slideInterval);
});
