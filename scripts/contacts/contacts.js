async function loadContacts() {
  // if (event && event.preventDefault) {
  //   event.preventDefault(); // Prevent default action (e.g., form submission)
  // }

  let response;

  try {
    response = await fetch("http://localhost:5001/api/contacts/");
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
  } catch (error) {
    console.log("Error Parsing JSON");
  }
}

loadContacts();

// async function loadContacts() {
//   try {
//     const response = await fetch("https://localhost:5001/api/contacts", {
//       method: "GET",
//       headers: {
//         "Content-Type": "application/json", // corrected header name
//       },
//     });

//     if (!response.ok) {
//       throw new Error("Failed to fetch contacts");
//     }

//     const responseData = await response.json(); // Parse response as JSON
//     console.log(responseData); // Output the parsed data
//   } catch (error) {
//     console.error("Something went wrong:", error.message);
//     // Handle the error appropriately (e.g., show error message to the user)
//   }
// }

// loadContacts();
