const contactName = document.querySelector("#save-contact");

async function loadContact() {
  try {
    const urlParams = new URLSearchParams(window.location.search);
    const contactId = urlParams.get("contactId");
    if (!contactId) {
      throw new Error("Contact ID not found in URL");
    }
    const token = localStorage.getItem("token");
    const response = await fetch(
      `http://localhost:5001/api/contacts/${contactId}`,
      {
        method: "GET",
        headers: { Authorization: `Bearer ${token}` },
      }
    );

    if (!response.ok) {
      throw new Error("Failed to fetch contact details");
    }

    const contactDetails = await response.json();
    console.log("Contact Details:", contactDetails);

    //populating existing User Data
    document.getElementById("name").value = contactDetails.name;
    document.getElementById("email").value = contactDetails.email;
    document.getElementById("phone").value = contactDetails.phone;
  } catch (error) {
    alert("Error fetching contact details: " + error.message);
    console.log("Error Fetching Contact:", error.message);
  }
}
loadContact();

async function update(event) {
  event.preventDefault();
  const urlParams = new URLSearchParams(window.location.search);
  const contactId = urlParams.get("contactId");
  if (!contactId) {
    throw new Error("Contact id not found in URL");
  }
  const formData = new FormData(event.target);
  const userData = {};

  formData.forEach((value, key) => {
    userData[key] = value;
  });

  try {
    const token = localStorage.getItem("token");
    if (!token) {
      throw new Error("Token not found");
    }

    const response = await fetch(
      `http://localhost:5001/api/contacts/${contactId}`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(userData),
      }
    );

    if (!response.ok) {
      throw new Error("Failed to update Contact");
    }
    const updatedContact = await response.json();
    alert("Contact Updated!");
    window.location.href = "http://localhost:5500/views/current.html";
  } catch (error) {
    alert("Error Updating Contact");
    console.log(error.message);
  }
}
