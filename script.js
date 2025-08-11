document.addEventListener('DOMContentLoaded', () = {

     Инициализация AOS (Animate On Scroll)
    AOS.init({
        duration 800,
        once true,
    });

     Бургер-меню для мобильных
    const burger = document.querySelector('.burger-menu');
    const nav = document.querySelector('.nav');
    
    burger.addEventListener('click', () = {
        nav.classList.toggle('active');
        burger.classList.toggle('active');
    });

     Валидация и отправка формы
    const contactForm = document.getElementById('contactForm');
    const formMessage = document.querySelector('.form-message');

     Маска для телефона
    const phoneInput = document.getElementById('phone');
    if (phoneInput) {
        Inputmask({ mask +7 (999) 999-99-99 }).mask(phoneInput);
    }

    contactForm.addEventListener('submit', async (e) = {
        e.preventDefault();
        
         Сброс сообщений
        formMessage.style.display = 'none';
        formMessage.className = 'form-message';
        
        const formData = new FormData(contactForm);
        const submitButton = contactForm.querySelector('.submit-button');

        submitButton.disabled = true;
        submitButton.textContent = 'Отправка...';

        try {
            const response = await fetch('handler.php', {
                method 'POST',
                body formData
            });

            const result = await response.json();

            if (result.success) {
                formMessage.textContent = 'Спасибо! Мы свяжемся с вами в течение часа';
                formMessage.classList.add('success');
                contactForm.reset();
            } else {
                formMessage.textContent = result.message  'Произошла ошибка. Попробуйте еще раз.';
                formMessage.classList.add('error');
            }
        } catch (error) {
            console.error('Error', error);
            formMessage.textContent = 'Ошибка сервера. Попробуйте позже.';
            formMessage.classList.add('error');
        } finally {
            formMessage.style.display = 'block';
            submitButton.disabled = false;
            submitButton.textContent = 'Получить консультацию';
        }
    });

     Параллакс-эффект на главном экране (для JS-реализации)
     window.addEventListener('scroll', () = {
         const hero = document.querySelector('.hero');
         let scrollPosition = window.pageYOffset;
         hero.style.backgroundPositionY = -scrollPosition  0.5 + 'px';
     });
});