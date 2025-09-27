document
  .getElementById("register-form")
  .addEventListener("submit", async (e) => {
    e.preventDefault();

    const username = document.getElementById("username").value.trim();
    const email = document.getElementById("email").value.trim();
    const password = document.getElementById("password").value;
    const confirmPassword = document.getElementById("confirmPassword").value;

      console.log("Form data:", { username, email, password: "***" });

    // Validation
    if (password !== confirmPassword) {
      alert("Passwords do not match");
      return;
    }

    if (password.length < 6) {
      alert("Password must be at least 6 characters long");
      return;
    }

    try {
      let res = await fetch("http://localhost:5050/api/auth/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: username,
          email,
          password,
        }),
        credentials: "include",
      });

      let data = await res.json();

      if (!res.ok) {
        alert(data.msg || "Registration failed");
        return;
      }

      alert(
        "Account created successfully! Please login with your credentials."
      );
      console.log("✅ register.js loaded successfully!");

      // Redirect to login page
      window.location.href = "../login/login.html";
    } catch (err) {
      console.error("Register error:", err);
      alert("Something went wrong, please try again later.");
    }
  });
