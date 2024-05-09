const createContactForm = document.querySelector("#save-contact-form");

function getUserIdFromToken() {
  const token = localStorage.getItem("token");
  if (!token) return null;

  try {
    const decodedToken = JSON.parse(atob(token.split(".")[1])); // Decode the payload part of the JWT
    return decodedToken.user_id; // Assuming 'user_id' is the key for user ID in the token payload
  } catch (error) {
    console.error("Error decoding token:", error);
    return null;
  }
}

async function addContact(event) {
  event.preventDefault();
  const formData = new FormData(event.target);
  const contactData = {};

  formData.forEach((value, key) => {
    contactData[key] = value;
  });

  const userId = getUserIdFromToken();
  if (!userId) {
    alert("You are Not Authenticated");
    return;
  }

  contactData.user_id = userId;

  try {
    const response = await fetch("http://localhost:5001/api/contacts", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(contactData),
    });

    if (!response.ok) {
      throw new Error("Failed to save contact. Status: " + response.status);
    }

    const result = await response.json();
    console.log(result);
    alert("Contact saved successfully!");
    window.location.href = "http://localhost:5500/views/current.html";
  } catch (error) {
    console.error("Error:", error);
    alert("Could not save contact: " + error.message);
  }
}

createContactForm.addEventListener("submit", addContact);
