// Select the form and the formats list
const form = document.getElementById('format-form');
const formatsList = document.getElementById('formats-list');

// Load saved email formats from local storage when the page loads
document.addEventListener('DOMContentLoaded', loadFormats);

function loadFormats() {
    const storedFormats = JSON.parse(localStorage.getItem('emailFormats')) || [];
    
    // Loop through stored formats and display them
    storedFormats.forEach((format, index) => {
        addFormatToList(format.name, format.content, index);
    });
}

// Event listener for form submission
form.addEventListener('submit', function(e) {
    e.preventDefault();

    // Get input values from the form
    const formatName = document.getElementById('format-name').value;
    const formatContent = document.getElementById('format-content').value;

    // Add the new format to the displayed list
    const index = saveFormat(formatName, formatContent);
    addFormatToList(formatName, formatContent, index);

    // Clear the form
    form.reset();
});

function addFormatToList(name, content, index) {
    // Create a new list item with the email format
    const li = document.createElement('li');
    li.innerHTML = `
        <h3>${name}</h3>
        <div class="content">${content}</div>
        <button class="copy-btn" data-content="${content}">Copy</button>
        <button class="delete-btn" data-index="${index}">Delete</button>
    `;
    
    // Append the new format to the formats list
    formatsList.appendChild(li);
    
    // Add event listener for delete and copy buttons
    li.querySelector('.delete-btn').addEventListener('click', deleteFormat);
    li.querySelector('.copy-btn').addEventListener('click', copyFormat);
}

function saveFormat(name, content) {
    // Retrieve the current list of saved formats from local storage
    const storedFormats = JSON.parse(localStorage.getItem('emailFormats')) || [];

    // Add the new format to the list
    const index = storedFormats.push({ name, content }) - 1;

    // Save the updated list back to local storage
    localStorage.setItem('emailFormats', JSON.stringify(storedFormats));

    return index;
}

function deleteFormat(e) {
    const index = e.target.getAttribute('data-index');

    // Retrieve the current list of saved formats
    let storedFormats = JSON.parse(localStorage.getItem('emailFormats'));

    // Remove the format at the given index
    storedFormats.splice(index, 1);

    // Update local storage
    localStorage.setItem('emailFormats', JSON.stringify(storedFormats));

    // Refresh the displayed formats
    formatsList.innerHTML = '';
    loadFormats();
}

function copyFormat(e) {
    const content = e.target.getAttribute('data-content');

    // Create a temporary input element to copy the content
    const tempInput = document.createElement('input');
    tempInput.value = content;
    document.body.appendChild(tempInput);
    tempInput.select();
    document.execCommand('copy');
    document.body.removeChild(tempInput);

    // Alert the user that the content has been copied
    alert('Content copied to clipboard!');
}
