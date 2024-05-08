const contactListElement = document.querySelector("#contact-list");
async function loadContacts() {
  const token = localStorage.getItem("token");

  let response;

  try {
    response = await fetch("http://localhost:5001/api/contacts/", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  } catch (error) {
    alert("Something went wrong");
    console.log("FAILED TO FETCH DATA");
    return;
  }

  if (!response.ok) {
    alert("Something went wrong");
    console.log("failed to give response");
    return;
  }

  try {
    const responseData = await response.json();
    console.log(responseData);
    const contacts = responseData;

    for (const contact of contacts) {
      createContactListItem(contact.email, contact.name, contact.phone);
    }
  } catch (error) {
    console.log("Error Parsing JSON");
  }
}

function createContactListItem(contactEmail, contactName, contactPhone) {
  const newContactListElement = document.createElement("li");

  const contactEmailElement = document.createElement("h3");
  contactEmailElement.textContent = contactEmail;

  const contactNameElement = document.createElement("h4");
  contactNameElement.textContent = contactName;

  const contactPhoneElement = document.createElement("h5");
  contactPhoneElement.textContent = contactPhone;

  newContactListElement.appendChild(contactEmailElement);
  newContactListElement.appendChild(contactNameElement);
  newContactListElement.appendChild(contactPhoneElement);

  newContactListElement.appendChild(newContactListElement);
}

loadContacts();
