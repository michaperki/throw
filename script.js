const email = document.querySelector("#email");
const submitButton = document.getElementById("submit-button");

submitButton.addEventListener("click", (e) => {
    e.preventDefault();
    checkInputs();
});

function checkInputs() {
    const emailValue = email.value.trim();

    if (emailValue === "") {
        setErrorFor(email, "Email cannot be blank");
    } else if (!isEmail(emailValue)) {
        setErrorFor(email, "Email is not valid");
    } else {
        setSuccessFor(email);
        saveToGoogleSheet(emailValue); // Save email to Google Sheet
    }
}

function setErrorFor(input, message) {
    const formControl = input.parentElement;
    const errorLabel = formControl.querySelector("small");

    errorLabel.innerText = message;
    formControl.classList.add("error");
}

function setSuccessFor(input) {
    const formControl = input.parentElement;
    formControl.classList.remove("error");
    formControl.classList.add("success");
}

function isEmail(email) {
    return /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/.test(email);
}

const emailForm = document.getElementById("email-form");
const successMessage = document.getElementById("success-message");

emailForm.addEventListener("submit", function (e) {
  e.preventDefault(); // Prevent the default form submission behavior
  checkInputs();
});

function saveToGoogleSheet(email) {
  // Replace 'YOUR_GOOGLE_FORM_LINK' with your Google Form link
  const googleFormLink = 'https://docs.google.com/forms/d/e/1FAIpQLSeVzzCKygDe_J0A1TW-aY_aY4A_9bbUf6_FrZHwd3e0-1Xi4A/viewform?usp=sf_link';

  // Replace 'YOUR_FIELD_ID' with the actual field ID from your Google Form
  const fieldId = 'entry.email';

  const submitUrl = `${googleFormLink}/formResponse?${fieldId}=${email}`;

  // Create an image element to submit the form
  const img = new Image();
  img.src = submitUrl;
  img.width = 1;
  img.height = 1;

  // Append the image to the document to submit the form
  document.body.appendChild(img);

  // Hide the form and show the success message
  emailForm.style.display = "none";
  successMessage.style.display = "block";
}
