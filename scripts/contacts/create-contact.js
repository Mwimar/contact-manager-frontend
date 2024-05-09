const createContactForm = document.querySelector("#save-contact-form");
const token = localStorage.getItem("token");

async function addContact(event) {
  event.preventDefault();
  const formData = new FormData(event.target);
  const userData = {};

  formData.forEach((value, key) => {
    userData[key] = value;
  });
  let response;
  try {
    response = await fetch("http://localhost:5001/api/contacts", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(userData),
    });

    if (!response.ok) {
      console.log("No response");
    }
    const userData = response;
    console.log(userData);
  } catch (error) {
    alert("Could not save Contact");
  }
}
createContactForm.addEventListener("submit", addContact);
