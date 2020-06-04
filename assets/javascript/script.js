console.log('It works!');

/* ---------------------- Variables ---------------------- */

// Top Navigation
const mobileMenuIcon = document.querySelector('.topnav button.icon');

// Modal
const modalInner = document.querySelector('.modal-inner');
const modalOuter = document.querySelector('.modal-outer');

// Modal Buttons
const yahtzeeRulesButtons = document.querySelectorAll('.yahtzeeRulesButton');
const howSiteWorksButtons = document.querySelectorAll('.howSiteWorksButton');
const startPlayingButtons = document.querySelectorAll('.startPlayingButton');


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

    // Click on Outer Modal
    modalOuter.addEventListener('click', closeModal)
    // Add Event Listener for 'Escape' key
    window.addEventListener('keydown', closeModal)
}

// Close modal
function closeModal(event) {
    /*
    if(event.type === 'keydown') {
        if(event.key === 'Escape') {
            modalOuter.classList.remove('open');
            return;
        }
        return;
    }
    if(event.type === 'click') {
        if(event.target.className === 'modal-outer open') {
            modalOuter.classList.remove('open');
        }
        return;
    }
    */
    if(event.key === 'Escape' || event.target.className === 'modal-outer open') {
        modalOuter.classList.remove('open');
        modalOuter.removeEventListener('click', closeModal)
        window.removeEventListener('keydown', closeModal)
    }
}

/* ---------------------- Event Listeners ---------------------- */

// Top Navigation
mobileMenuIcon.addEventListener('click', toggleMobileMenu);

// Open Modals
yahtzeeRulesButtons.forEach(button => button.addEventListener('click', openModal))



