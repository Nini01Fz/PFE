// Get the modal element
var modal = document.getElementById('gameRulesModal');

// Get the close button
var closeBtn = document.getElementsByClassName('close')[0];

// Function to open the modal
function openModal() {
    modal.style.display = 'block';
}

// Function to close the modal
function closeModal() {
    modal.style.display = 'none';
}

// Close modal when clicking on close button
closeBtn.onclick = function() {
    closeModal();
}

// Close modal when clicking outside the modal content
window.onclick = function(event) {
    if (event.target == modal) {
        closeModal();
    }
}
