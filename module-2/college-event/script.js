const form = document.getElementById("registrationForm");
const message = document.getElementById("message");
form.addEventListener("submit", function(event) {

    event.preventDefault();

    const name = document.getElementById("name").value;
    const email = document.getElementById("email").value;
    const phone = document.getElementById("phone").value;
    const department = document.getElementById("department").value;
    const selectedEvent = document.getElementById("event").value;

    if (
        name === "" ||
        email === "" ||
        phone === "" ||
        department === "" ||
        selectedEvent === ""
    ) {
        message.textContent = "Please fill all the fields.";
message.className = "error-message";
return;
    }

    message.textContent =
    `Registration successful! Welcome ${name} 🎉`;

message.className = "success-message";

    form.reset();
});
function toggleMenu() {
    const navLinks = document.getElementById("navLinks");

    navLinks.classList.toggle("active");
}
function showEventDetails(eventName) {

    const modal = document.getElementById("eventModal");
    const title = document.getElementById("modalTitle");
    const description = document.getElementById("modalDescription");

    title.textContent = eventName;

    if (eventName === "Code Fest") {
        description.textContent =
            "Code Fest is a programming event where students can demonstrate their coding and problem-solving skills.";
    }

    else if (eventName === "Cultural Fest") {
        description.textContent =
            "Cultural Fest includes music, dance and other exciting cultural performances.";
    }

    else if (eventName === "Sports Meet") {
        description.textContent =
            "Sports Meet gives students an opportunity to participate in various sports competitions.";
    }

    modal.style.display = "flex";
}


function closeEventDetails() {

    document.getElementById("eventModal").style.display = "none";

}