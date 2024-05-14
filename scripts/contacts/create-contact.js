const saveContactForm = document.querySelector("#save-contact-form");

async function getUserIdFromToken() {
  const token = localStorage.getItem("token");
  if (!token) {
    console.error("No token found in localStorage.");
    return null;
  }

  try {
    const decodedToken = JSON.parse(atob(token.split(".")[1]));
    return decodedToken.user.id; // Assuming 'user.id' is the key for user ID in the token payload
  } catch (error) {
    console.error("Error decoding token:", error);
    return null;
  }
}

function validateContactData(contactData) {
  const requiredFields = ["name", "phone", "email"]; // Add all required fields here
  for (let field of requiredFields) {
    if (!contactData[field]) {
      alert(`Please fill out the ${field} field.`);
      return false;
    }
  }
  return true;
}

async function addContact(event) {
  event.preventDefault();

  const userId = await getUserIdFromToken();
  if (!userId) {
    alert("You are not authenticated. Please log in.");
    return;
  }

  const formData = new FormData(saveContactForm);
  const contactData = { user_id: userId };

  formData.forEach((value, key) => {
    contactData[key] = value;
  });

  if (!validateContactData(contactData)) {
    return; // Stop the function if validation fails
  }

  try {
    const response = await fetch("http://localhost:5001/api/contacts", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(contactData),
    });

    if (!response.ok) {
      throw new Error("Failed to save contact. Status: " + response.status);
    }

    const result = await response.json();
    console.log(result);

    window.location.href = "http://localhost:5500/views/current.html";
  } catch (error) {
    console.error("Error:", error);
    response.json().then((errorDetails) => {
      alert("Could not save contact: " + errorDetails.message);
    });
  }
}

// Add event listener to the form for the 'submit' event

//edit contact function
async function editContact() {}

//delete contact function
async function deleteContact() {}
saveContactForm.addEventListener("submit", addContact);
