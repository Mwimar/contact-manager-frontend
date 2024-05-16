async function updateContact(event) {
  const clickedButton = event.target;
  const contactElement = clickedButton.parentElement.parentElement;
  const contactId = contactElement.dataset.id;

  try {
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
    window.location.href = `http://localhost:5500/views/update-contact.html?${contactId}`;
    // Further logic to handle editing the contact
  } catch (error) {
    alert("Error fetching contact details: " + error.message);
    console.log("Error Fetching Contact:", error.message);
  }
}
