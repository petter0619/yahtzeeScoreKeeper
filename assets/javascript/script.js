console.log('It works!');

/* ---------------------- Variables ---------------------- */

// Top Navigation
const mobileMenuIcon = document.querySelector('.topnav button.icon');

// Modal
const modalInner = document.querySelector('.modal-inner');
const modalOuter = document.querySelector('.modal-outer');

// Modal Buttons
const modalButtons = document.querySelectorAll('.modalButton');
const closeModalIcon = modalInner.querySelector('#closeModalIcon');


/* ---------------------- Function Definitions ---------------------- */

/* Toggle between showing and hiding the navigation menu links when the user clicks on the hamburger menu / bar icon */
function toggleMobileMenu() {
    const navLinks = document.getElementById('navLinks');
    if (navLinks.style.display === 'block') {
        navLinks.style.display = 'none';
    } else {
        navLinks.style.display = 'block';
    }
}

// Open modal
function openModal(event) {
    // Show the modal
    modalOuter.classList.add('open');

    //Hide all modalInner div's
    modalInner.querySelectorAll(`div`).forEach(div => div.setAttribute('style', 'display:none;'));

    //Show the div that matches the button
    const buttonRole = event.currentTarget.getAttribute('role');
    modalInner.querySelector(`div[role=${buttonRole}]`).setAttribute('style', 'display: block;');

    // Add Event Listeners for closing the modal
    modalOuter.addEventListener('click', closeModal);
    closeModalIcon.addEventListener('click', closeModal);
    window.addEventListener('keydown', closeModal);
}

// Close modal
function closeModal(event) {
    if(event.key === 'Escape' || event.target.className.includes('modal-outer') || event.currentTarget === closeModalIcon) {
        modalOuter.classList.remove('open');
        modalOuter.removeEventListener('click', closeModal);
        closeModalIcon.addEventListener('click', closeModal);
        window.removeEventListener('keydown', closeModal);
    }
}

/* ---------------------- Event Listeners ---------------------- */

// Top Navigation
mobileMenuIcon.addEventListener('click', toggleMobileMenu);

// Open Modals
modalButtons.forEach(button => button.addEventListener('click', openModal))



