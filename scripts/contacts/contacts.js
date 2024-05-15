const contactList = document.querySelector("#contact-list");
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

//edit contact function
async function editContact(event) {
  const clickedButton = event.target;

  console.log("The Clicked Button Is: ", clickedButton);
}

//delete contact function
async function deleteContact(event) {
  const clickedButton = event.target;
  const contactElement = clickedButton.parentElement.parentElement;
  const contactId = contactElement.dataset.id;
  console.log("The Contact Id is :", contactId);
}

function createContactListItem(contactEmail, contactName, contactPhone) {
  const newContactListElement = document.createElement("li");

  const contactEmailElement = document.createElement("h3");
  contactEmailElement.textContent = contactEmail;

  const contactNameElement = document.createElement("h4");
  contactNameElement.textContent = contactName;

  const contactPhoneElement = document.createElement("h5");
  contactPhoneElement.textContent = contactPhone;

  const editContactButtonElement = document.createElement("button");
  editContactButtonElement.textContent = "EDIT";
  editContactButtonElement.classList.add("edit-button");
  editContactButtonElement.addEventListener("click", editContact);

  const deleteContactButtonElement = document.createElement("button");
  deleteContactButtonElement.textContent = "DELETE";
  deleteContactButtonElement.classList.add("delete-contact");
  deleteContactButtonElement.addEventListener("click", deleteContact);
  const contactActionsWrapper = document.createElement("div");

  contactActionsWrapper.appendChild(editContactButtonElement);
  contactActionsWrapper.appendChild(deleteContactButtonElement);

  newContactListElement.appendChild(contactEmailElement);
  newContactListElement.appendChild(contactNameElement);
  newContactListElement.appendChild(contactPhoneElement);
  newContactListElement.appendChild(contactActionsWrapper);

  contactList.appendChild(newContactListElement);
}

loadContacts();
