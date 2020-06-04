console.log('It works!');

/* ---------------------- Variables ---------------------- */
const mobileMenuIcon = document.querySelector('.topnav button.icon');


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

/* ---------------------- Event Listeners ---------------------- */
mobileMenuIcon.addEventListener('click', toggleMobileMenu);