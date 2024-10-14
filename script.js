document.addEventListener('DOMContentLoaded', () => {
    const form = document.querySelector('form');
    const firstNameInput = document.querySelector('.firstnameDiv input');
    const lastNameInput = document.querySelector('.lastnameDiv input');
    const emailInput = document.querySelector('.emailInput');
    const messageInput = document.querySelector('.messageInput');
    const consentCheckbox = document.querySelector('.consentDiv input');
    const queryRadios = document.querySelectorAll('.queryType input');
    const alertDiv = document.querySelector('.alert');
    const messageSentCheckbox = document.querySelector('.messageSent input');


    
   
    alertDiv.style.display = 'none';

    // Function to show error message for an input
    function showError(input, message) {
        const parentDiv = input.parentElement;
        let errorMessage = parentDiv.querySelector('small');
        if (!errorMessage) {
            errorMessage = document.createElement('small');
            errorMessage.style.color = 'red';
            errorMessage.style.display='block';
            parentDiv.appendChild(errorMessage);
        }
        errorMessage.textContent = message;
        
        
    }

    // Function to clear error message for an input
    function clearError(input) {
        const parentDiv = input.parentElement;
        const errorMessage = parentDiv.querySelector('small');
        if (errorMessage) {
            parentDiv.removeChild(errorMessage);
        }
    }

    // Function to validate email format
    function isValidEmail(email) {
        const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
        return emailRegex.test(email);
    }

    

    // Form submit event listener
    form.addEventListener('submit', (event) => {
        event.preventDefault(); // Prevent default form submission

    // Clear any previous error messages
        clearError(firstNameInput);
        clearError(lastNameInput);
        clearError(emailInput);
        clearError(messageInput);

        let isValid = true;

        // Validate first name
        if (firstNameInput.value.trim() === '') {
            showError(firstNameInput, 'First name is required');
            isValid = false;
        }

        // Validate last name
        if (lastNameInput.value.trim() === '') {
            showError(lastNameInput, 'Last name is required');
            isValid = false;
        }

        // Validate email
        if (emailInput.value.trim() === '') {
            showError(emailInput, 'Email is required');
            isValid = false;
        } else if (!isValidEmail(emailInput.value.trim())) {
            showError(emailInput, 'Invalid email format');
            isValid = false;
        }

        // Validate message
        if (messageInput.value.trim() === '') {
            showError(messageInput, 'Message is required');
            isValid = false;
        }

        // Validate that a query type is selected
        const querySelected = Array.from(queryRadios).some(radio => radio.checked);
        if (!querySelected) {
            showError(queryRadios[0].parentElement, 'Please select a query type');
            isValid = false;
        } else {
            clearError(queryRadios[0].parentElement);
        }

        // Validate consent checkbox
        if (!consentCheckbox.checked) {
            showError(consentCheckbox, 'You must agree to be contacted');
            isValid = false;
        } else {
            clearError(consentCheckbox);
        }

        // If all validations pass, show the success message
        if (isValid) {
            alertDiv.style.display = 'block'; // Show the alert message
            messageSentCheckbox.checked = true; // Mark the "Message Sent!" checkbox
            form.reset(); // Clear the form
        }
    });
});
