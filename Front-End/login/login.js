document.getElementById("login-form").addEventListener("submit", async (e) => {
  e.preventDefault();

  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;

  try {
    let res = await fetch("http://localhost:5050/api/auth/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, password }),
      credentials: "include",
    });

    let data = await res.json();

    if (!res.ok) {
      alert(data.msg || "Login failed");
      return;
    }

    console.log("🎉 Login Successful for:", email);

    localStorage.setItem("token", data.tkn);
    localStorage.setItem("isLoggedIn", "true"); // ✅ Set login status
    alert("Login successful!");

    window.location.href = "/Feilmy/Front-End/Filmy/index.html";
  } catch (err) {
    console.error("Login error:", err);
    alert("Something went wrong, try again later.");
  }
});
