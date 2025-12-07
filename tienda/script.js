// ===== VARIABLES GLOBALES =====
let currentSlide = 0;
let slideInterval;

// ===== FUNCIONES DEL SLIDER =====
function initSlider() {
    const slides = document.querySelectorAll('.slide');
    const indicators = document.querySelectorAll('.indicator');
    const prevBtn = document.querySelector('.prev-btn');
    const nextBtn = document.querySelector('.next-btn');
    const track = document.querySelector('.slider-track');
    
    if (!slides.length) return;
    
    // Función para cambiar slide
    function goToSlide(index) {
        // Validar índice
        if (index < 0) index = slides.length - 1;
        if (index >= slides.length) index = 0;
        
        currentSlide = index;
        
        // Mover el track
        track.style.transform = `translateX(-${currentSlide * 100}%)`;
        
        // Actualizar indicadores
        indicators.forEach((indicator, i) => {
            indicator.classList.toggle('active', i === currentSlide);
        });
        
        // Actualizar slides
        slides.forEach((slide, i) => {
            slide.classList.toggle('active', i === currentSlide);
        });
    }
    
    // Event listeners para botones
    if (prevBtn) {
        prevBtn.addEventListener('click', () => {
            goToSlide(currentSlide - 1);
            resetInterval();
        });
    }
    
    if (nextBtn) {
        nextBtn.addEventListener('click', () => {
            goToSlide(currentSlide + 1);
            resetInterval();
        });
    }
    
    // Event listeners para indicadores
    indicators.forEach((indicator, index) => {
        indicator.addEventListener('click', () => {
            goToSlide(index);
            resetInterval();
        });
    });
    
    // Autoplay
    function startInterval() {
        slideInterval = setInterval(() => {
            goToSlide(currentSlide + 1);
        }, 5000); // Cambia cada 5 segundos
    }
    
    function resetInterval() {
        clearInterval(slideInterval);
        startInterval();
    }
    
    // Pausar autoplay al hacer hover
    const slider = document.querySelector('.slider');
    if (slider) {
        slider.addEventListener('mouseenter', () => {
            clearInterval(slideInterval);
        });
        
        slider.addEventListener('mouseleave', () => {
            startInterval();
        });
    }
    
    // Iniciar autoplay
    startInterval();
    
    // Asegurar que el primer slide esté activo
    goToSlide(0);
}

// ===== MENÚ MÓVIL =====
function initMobileMenu() {
    const menuToggle = document.getElementById('menuToggle');
    const mobileClose = document.getElementById('mobileClose');
    const navMobile = document.getElementById('navMobile');
    const menuOverlay = document.createElement('div');
    
    if (!menuToggle || !navMobile) return;
    
    // Crear overlay
    menuOverlay.className = 'menu-overlay';
    document.body.appendChild(menuOverlay);
    
    // Función para abrir menú
    function openMenu() {
        navMobile.classList.add('active');
        menuOverlay.classList.add('active');
        document.body.style.overflow = 'hidden';
    }
    
    // Función para cerrar menú
    function closeMenu() {
        navMobile.classList.remove('active');
        menuOverlay.classList.remove('active');
        document.body.style.overflow = '';
    }
    
    // Event listeners
    menuToggle.addEventListener('click', openMenu);
    mobileClose.addEventListener('click', closeMenu);
    menuOverlay.addEventListener('click', closeMenu);
    
    // Cerrar menú al hacer clic en enlace
    const mobileLinks = navMobile.querySelectorAll('.mobile-nav-link');
    mobileLinks.forEach(link => {
        link.addEventListener('click', closeMenu);
    });
}

// ===== FORMULARIO DE CONTACTO =====
function initContactForm() {
    const contactForm = document.getElementById('contactForm');
    
    if (!contactForm) return;
    
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Validación básica
        const name = document.getElementById('name').value.trim();
        const phone = document.getElementById('phone').value.trim();
        const message = document.getElementById('message').value.trim();
        
        if (!name || !phone || !message) {
            showAlert('Por favor, completa todos los campos obligatorios (*)', 'error');
            return;
        }
        
        // Validar teléfono (formato básico)
        const phoneRegex = /^[\d\s\-\+\(\)]{8,15}$/;
        if (!phoneRegex.test(phone.replace(/\D/g, ''))) {
            showAlert('Por favor, ingresa un número de teléfono válido', 'error');
            return;
        }
        
        // Mostrar loading
        const submitBtn = contactForm.querySelector('button[type="submit"]');
        const originalText = submitBtn.innerHTML;
        submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Enviando...';
        submitBtn.disabled = true;
        
        // Simular envío
        setTimeout(() => {
            // En un caso real, aquí iría una petición AJAX
            showAlert('¡Mensaje enviado con éxito! Te contactaremos pronto.', 'success');
            
            // Resetear formulario
            contactForm.reset();
            
            // Restaurar botón
            submitBtn.innerHTML = originalText;
            submitBtn.disabled = false;
        }, 2000);
    });
}

// ===== FAQ =====
function initFAQ() {
    const faqItems = document.querySelectorAll('.faq-item');
    
    faqItems.forEach(item => {
        const question = item.querySelector('.faq-question');
        
        question.addEventListener('click', () => {
            // Cerrar otros items
            faqItems.forEach(otherItem => {
                if (otherItem !== item && otherItem.classList.contains('active')) {
                    otherItem.classList.remove('active');
                }
            });
            
            // Toggle current item
            item.classList.toggle('active');
        });
    });
}

// ===== CARRITO =====
function initCart() {
    let cartCount = 0;
    const cartBtn = document.querySelector('.cart-btn');
    const cartCountElement = document.querySelector('.cart-count');
    const addCartButtons = document.querySelectorAll('.btn-add-cart');
    
    if (!cartBtn || !cartCountElement) return;
    
    // Función para actualizar contador
    function updateCartCount() {
        cartCountElement.textContent = cartCount;
        cartCountElement.style.display = cartCount > 0 ? 'flex' : 'none';
    }
    
    // Event listeners para botones "Agregar"
    addCartButtons.forEach(button => {
        button.addEventListener('click', function() {
            // Obtener información del producto
            const productCard = this.closest('.product-card');
            const productTitle = productCard.querySelector('.product-title').textContent;
            const productPrice = productCard.querySelector('.current-price').textContent;
            
            // Aumentar contador
            cartCount++;
            updateCartCount();
            
            // Mostrar notificación
            showAlert(`"${productTitle}" agregado al carrito`, 'success');
            
            // Animación
            this.style.backgroundColor = '#25D366';
            this.innerHTML = '<i class="fas fa-check"></i> Agregado';
            
            setTimeout(() => {
                this.style.backgroundColor = '';
                this.innerHTML = '<i class="fas fa-plus"></i> Agregar';
            }, 2000);
        });
    });
    
    // Inicializar contador
    updateCartCount();
}

// ===== FUNCIONES DE UTILIDAD =====
function showAlert(message, type = 'info') {
    // Crear alerta
    const alert = document.createElement('div');
    alert.className = `alert alert-${type}`;
    alert.innerHTML = `
        <span>${message}</span>
        <button class="alert-close"><i class="fas fa-times"></i></button>
    `;
    
    // Estilos para la alerta
    alert.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        padding: 16px 20px;
        background-color: ${type === 'success' ? '#d4edda' : '#f8d7da'};
        color: ${type === 'success' ? '#155724' : '#721c24'};
        border: 1px solid ${type === 'success' ? '#c3e6cb' : '#f5c6cb'};
        border-radius: 8px;
        display: flex;
        align-items: center;
        justify-content: space-between;
        gap: 16px;
        max-width: 400px;
        z-index: 9999;
        box-shadow: 0 4px 12px rgba(0,0,0,0.1);
        animation: slideIn 0.3s ease;
    `;
    
    // Estilo para el botón de cerrar
    const closeBtn = alert.querySelector('.alert-close');
    closeBtn.style.cssText = `
        background: none;
        border: none;
        color: inherit;
        cursor: pointer;
        font-size: 14px;
        padding: 0;
    `;
    
    // Animación
    const style = document.createElement('style');
    style.textContent = `
        @keyframes slideIn {
            from {
                transform: translateX(100%);
                opacity: 0;
            }
            to {
                transform: translateX(0);
                opacity: 1;
            }
        }
    `;
    document.head.appendChild(style);
    
    // Event listener para cerrar
    closeBtn.addEventListener('click', () => {
        alert.style.animation = 'slideOut 0.3s ease forwards';
        
        // Crear animación de salida
        const slideOutStyle = document.createElement('style');
        slideOutStyle.textContent = `
            @keyframes slideOut {
                from {
                    transform: translateX(0);
                    opacity: 1;
                }
                to {
                    transform: translateX(100%);
                    opacity: 0;
                }
            }
        `;
        document.head.appendChild(slideOutStyle);
        
        setTimeout(() => {
            alert.remove();
            slideOutStyle.remove();
        }, 300);
    });
    
    // Agregar al DOM
    document.body.appendChild(alert);
    
    // Auto-remover después de 5 segundos
    setTimeout(() => {
        if (alert.parentNode) {
            alert.style.animation = 'slideOut 0.3s ease forwards';
            setTimeout(() => alert.remove(), 300);
        }
    }, 5000);
}

// ===== SCROLL SUAVE =====
function initSmoothScroll() {
    const links = document.querySelectorAll('a[href^="#"]');
    
    links.forEach(link => {
        link.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            
            if (href === '#') return;
            
            const target = document.querySelector(href);
            if (target) {
                e.preventDefault();
                
                // Cerrar menú móvil si está abierto
                const navMobile = document.getElementById('navMobile');
                if (navMobile && navMobile.classList.contains('active')) {
                    navMobile.classList.remove('active');
                    document.querySelector('.menu-overlay')?.classList.remove('active');
                    document.body.style.overflow = '';
                }
                
                // Scroll suave
                window.scrollTo({
                    top: target.offsetTop - 80,
                    behavior: 'smooth'
                });
            }
        });
    });
}

// ===== SCROLL HEADER =====
function initScrollHeader() {
    const header = document.querySelector('.header');
    let lastScroll = 0;
    
    window.addEventListener('scroll', () => {
        const currentScroll = window.pageYOffset;
        
        if (currentScroll > 100) {
            header.style.boxShadow = '0 2px 10px rgba(0,0,0,0.1)';
        } else {
            header.style.boxShadow = '0 2px 4px rgba(0,0,0,0.05)';
        }
        
        lastScroll = currentScroll;
    });
}

// ===== INICIALIZACIÓN =====
document.addEventListener('DOMContentLoaded', function() {
    console.log('Tennis_nba - Página cargada');
    
    // Inicializar todas las funcionalidades
    initSlider();
    initMobileMenu();
    initContactForm();
    initFAQ();
    initCart();
    initSmoothScroll();
    initScrollHeader();
    
    // Añadir estilos para las alertas
    const alertStyle = document.createElement('style');
    alertStyle.textContent = `
        .alert {
            position: fixed;
            top: 20px;
            right: 20px;
            padding: 16px 20px;
            border-radius: 8px;
            display: flex;
            align-items: center;
            justify-content: space-between;
            gap: 16px;
            max-width: 400px;
            z-index: 9999;
            box-shadow: 0 4px 12px rgba(0,0,0,0.1);
            animation: slideIn 0.3s ease;
        }
        
        .alert-success {
            background-color: #d4edda;
            color: #155724;
            border: 1px solid #c3e6cb;
        }
        
        .alert-error {
            background-color: #f8d7da;
            color: #721c24;
            border: 1px solid #f5c6cb;
        }
        
        .alert-close {
            background: none;
            border: none;
            color: inherit;
            cursor: pointer;
            font-size: 14px;
            padding: 0;
        }
        
        @keyframes slideIn {
            from {
                transform: translateX(100%);
                opacity: 0;
            }
            to {
                transform: translateX(0);
                opacity: 1;
            }
        }
        
        @keyframes slideOut {
            from {
                transform: translateX(0);
                opacity: 1;
            }
            to {
                transform: translateX(100%);
                opacity: 0;
            }
        }
    `;
    document.head.appendChild(alertStyle);
});

// ===== MANEJO DE ERRORES =====
window.addEventListener('error', function(e) {
    console.error('Error en la página:', e.error);
});