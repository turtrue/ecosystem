// About
const menu = document.querySelector('.menu-about');
const menuAboutLinks = document.querySelectorAll('.menu-about__link');
const aboutSlides = document.querySelectorAll('.about__slide');

// Hide menu about links and show one
function hideMenuAboutLinksAndShowOne(e) {
    menuAboutLinks.forEach(link => {
        link.classList.remove('active');
    });
    e.target.classList.add('active');
}

// Hide aboutSlides and show one
function hideAboutSlidesAndShowOne(e) {
    aboutSlides.forEach(slide => {
        slide.classList.remove('active');
    });
    const nextSlide = document.querySelector(`.${e.target.dataset.slide}`);
    nextSlide.classList.add('active');
}

menu.onmouseover = (e) => {
    if (e.target.classList.contains('menu-about__link')) {
        hideMenuAboutLinksAndShowOne(e);
        hideAboutSlidesAndShowOne(e);
    }
}



// Clients
// const clientsItems = document.querySelectorAll('.clients__item');
// const clientsItemsDescr = document.querySelectorAll('.clients__item-descr');
// const clientsItemsDescrCloseBtns =
//     document.querySelectorAll('.clients__item-descr-close');

// clientsItems.forEach(item => {
//     item.addEventListener('click', () => {
//         const descrId = item.dataset.descr_id;
//         const descr = document.querySelector(`#${descrId}`);
//         descr.classList.add('active');

//         clientsItems.forEach(item => {
//             item.classList.add('active');
//         });
//     });
// });

// clientsItemsDescrCloseBtns.forEach(btn => {
//     btn.addEventListener('click', () => {
//         clientsItems.forEach(item => {
//             item.classList.remove('active');
//         });

//         clientsItemsDescr.forEach(descr => {
//             descr.classList.remove('active');
//         });
//     });
// });



// Form
const form = document.querySelector('#form');
const formMessage = document.querySelector('#form-message');
const formLoader = document.querySelector('#form-loader');
const formBtn = document.querySelector('#form-btn');

// Submit form
async function postData(url = '', data = {}) {
    formLoader.classList.add('active');

    const response = await fetch(url, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    });

    return await response.json();
}

// Form submission notification message
function notificationMessage(node, message, cls) {
    if (!node.classList.contains(cls)) {
        node.className = `message ${cls}`;
        node.textContent = message;

        setTimeout(() => {
            node.classList.remove(cls);
        }, 3000);
    }
}

formBtn.addEventListener('click', event => {
    event.preventDefault();

    const formData = new FormData(form);
    const name = formData.get('name').trim();
    const phone = formData.get('phone').trim();
    const email = formData.get('email').trim();
    const isFormStatement = true;

    if (name && phone && email) {
        form.reset();

        postData('/emails/statement', { name, phone, email, isFormStatement })
            .then(data => {
                formLoader.classList.remove('active');
                const message = data;
                notificationMessage(formMessage, message, 'success');
            })
            .catch((e) => {
                console.log(e);
                formLoader.classList.remove('active');
                const message = 'Что-то пошло не так';
                notificationMessage(formMessage, message, 'error');
            });
    } else {
        const message = 'Необходимо заполнить все поля'
        notificationMessage(formMessage, message, 'error');
    }
});

// https://michalsnik.github.io/aos/
AOS.init();