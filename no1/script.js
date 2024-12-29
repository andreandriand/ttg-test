document.getElementById("registrationForm").addEventListener("submit", function (event) {
  event.preventDefault();

  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;
  const confirmPassword = document.getElementById("confirmPassword").value;

  let isValid = true;

  // Reset error messages
  document.getElementById("emailError").textContent = "";
  document.getElementById("passwordError").textContent = "";
  document.getElementById("confirmPasswordError").textContent = "";

  // Email validation
  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailPattern.test(email)) {
    document.getElementById("emailError").textContent = "Email tidak valid.";
    isValid = false;
  }

  // Password validation
  if (password.length < 8) {
    document.getElementById("passwordError").textContent = "Password harus terdiri dari minimal 8 karakter.";
    isValid = false;
  }

  // Confirm password validation
  if (password !== confirmPassword) {
    document.getElementById("confirmPasswordError").textContent = "Password dan konfirmasi password harus sama.";
    isValid = false;
  }

  if (isValid) {
    document.getElementById("successMessage").style.display = "block";
    document.getElementById("registrationForm").reset();
  } else {
    document.getElementById("successMessage").style.display = "none";
  }
});
