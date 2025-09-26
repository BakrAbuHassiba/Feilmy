document.getElementById("register-form").addEventListener("submit", async (e) => {
  e.preventDefault();

  const username = document.getElementById("username").value.trim();
  const email = document.getElementById("email").value.trim();
  const password = document.getElementById("password").value;
  const confirmPassword = document.getElementById("confirmPassword").value;

  if (password !== confirmPassword) {
    alert("Passwords do not match");
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
      credentials: "include", // so cookies are set if backend sends them
    });

    let data = await res.json();

    if (!res.ok) {
      alert(data.msg || "Registration failed");
      return;
    }

    // ✅ Save token in localStorage
    localStorage.setItem("token", data.tkn);

    alert("Account created successfully!");

    // redirect to login or homepage
    window.location.href = "../login/login.html";
  } catch (err) {
    console.error("Register error:", err);
    alert("Something went wrong, please try again later.");
  }
});
