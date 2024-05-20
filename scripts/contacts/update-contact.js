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
