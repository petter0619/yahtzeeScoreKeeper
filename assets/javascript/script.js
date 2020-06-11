console.log('script.js found!');

/* ---------------------- Variables ---------------------- */

// Top Navigation
const mobileMenuIcon = document.querySelector('.topnav button.icon');

// startScreen + gameScreen
const startScreen = document.querySelector('#startScreen');

// Modal
const modalInner = document.querySelector('.modal-inner');
const modalOuter = document.querySelector('.modal-outer');

// Modal Buttons
const modalButtons = document.querySelectorAll('.modalButton');
//const closeModalIcon = modalInner.querySelector('#closeModalIcon');

// startPlaying Modal => Add Players List
const addPlayerList = document.querySelector('.addPlayer');
const list = document.querySelector('.playersAdded');
let playersList = []; // Create empty array to hold our 'state'


/* ---------------------- Function Definitions ---------------------- */

// ----------------> Top Navigation Functions
/* Toggle between showing and hiding the navigation menu links when the user clicks on the hamburger menu / bar icon */
function toggleMobileMenu() {
    const navLinks = document.getElementById('navLinks');
    if (navLinks.style.display === 'block') {
        navLinks.style.display = 'none';
    } else {
        navLinks.style.display = 'block';
    }
}


// ----------------> Modal Functions
// Open modal
function openModal(event) {
    // Show the modal
    modalOuter.classList.add('open');

    //Hide all modalInner div's
    modalInner.querySelectorAll(`.modal-inner > div`).forEach(div => div.setAttribute('style', 'display:none;'));

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

// ----------------> startPlaying Modal => Add Players List Functions

function handleAddPlayerSubmit(e) {
    // Prevent formSubmit from changing URL
    e.preventDefault();
    // Max 6 players to the list
    if(playersList.length >= 6) {
        alert('Max 6 players allowed!');
        return;
    }
    // Grab the value of the input
    const name = e.currentTarget.playerName.value;
    // IF input is empty string, don't submit it
    if(!name) {return};
    // Store the input value + itemId in the 'items' array
    const player = {
        name: name,
        id: Date.now(),
    }
    // Push the items into our state
    playersList.push(player);
    // Clear the form
    e.target.reset(); 
    // Fire off custom event for items being updated
    list.dispatchEvent(new CustomEvent('playersUpdated'));
}

function displayPlayer() {
    const html = playersList.map(player => { 
        return `<li class="player"> 
            <span class="playerName">${player.name}</span>
            <button aria-label="Remove ${player.name}" value="${player.id}">&times;</button>
        </li>`;
    }).join('');
    list.innerHTML = html;
}

function deletePlayer(id) {
    // Update items array without item with argument ID
    playersList = playersList.filter(player => player.id !== id);
    list.dispatchEvent(new CustomEvent('playersUpdated'));
}


/* ---------------------- Event Listeners ---------------------- */

// ----------------> Top Navigation
mobileMenuIcon.addEventListener('click', toggleMobileMenu);

// ----------------> Open Modals
modalButtons.forEach(button => button.addEventListener('click', openModal))


// ----------------> startPlaying Modal => Add Players List <-------------------------- !!! Move into Open Modal function????
addPlayerList.addEventListener('submit', handleAddPlayerSubmit);
list.addEventListener('playersUpdated', displayPlayer); 
// Event delegation: listen for the click on the <ul> but delegate the event to the button (IF statement); if that is what was clicked
list.addEventListener('click', function (e) { 
    const id = parseInt(e.target.value);
    // Listening for event on the list, but don't to anything unless click was on a button (in the list)
    if(e.target.matches('button')) {
        deletePlayer(id); // ID is placed on button via interpelation
    }
});