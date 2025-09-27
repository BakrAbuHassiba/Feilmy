//TOGGLE
// const ball = document.querySelector(".toggle-ball");
// const items = document.querySelectorAll(
//   ".container,.movie-list-title,.navbar-container,.sidebar,.left-menu-icon,.toggle"
// );

// ball.addEventListener("click", () => {
//   items.forEach((item) => {
//     item.classList.toggle("active");
//   });
//   ball.classList.toggle("active");
// });
const API_URL = "https://filmy-dusky.vercel.app";

const ball = document.querySelector(".toggle-ball");
const items = document.querySelectorAll(
  ".container, .movie-list-title, .navbar, .navbar-container, .sidebar, .left-menu-icon, .toggle, .hero, .featured-content, .footer, .movie-list-container"
);

ball.addEventListener("click", () => {
  items.forEach((item) => {
    item.classList.toggle("active");
  });
  ball.classList.toggle("active");

  // Toggle dark mode in localStorage
  const isDarkMode = document.body.classList.contains("active");
  localStorage.setItem("darkMode", isDarkMode);
});

// Check login status when page loads
document.addEventListener("DOMContentLoaded", function () {
  const isLoggedIn = localStorage.getItem("isLoggedIn") === "true";
  const loginBtnLink = document.getElementById("login-btn-link");
  const logoutBtn = document.getElementById("logout-btn");

  if (isLoggedIn) {
    if (loginBtnLink) loginBtnLink.style.display = "none";
    if (logoutBtn) logoutBtn.style.display = "block";
  } else {
    if (loginBtnLink) loginBtnLink.style.display = "block";
    if (logoutBtn) logoutBtn.style.display = "none";
  }

  if (logoutBtn) {
    logoutBtn.addEventListener("click", function () {
      localStorage.removeItem("isLoggedIn");
      localStorage.removeItem("token");
      window.location.href = "/";
    });
  }
});

//animation for sections
const sections = document.querySelectorAll("section");
const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("show");
      }
    });
  },
  { threshold: 0.2 }
);
sections.forEach((sec) => observer.observe(sec));

document.querySelectorAll(".menu-list a, .sidebar a").forEach((link) => {
  link.addEventListener("click", function (e) {
    e.preventDefault();
    const targetId = this.getAttribute("href");
    const targetElement = document.querySelector(targetId);
    if (targetElement) {
      window.scrollTo({
        top: targetElement.offsetTop - 50,
        behavior: "smooth",
      });
    }
  });
});

async function getMovies() {
  // let res = await fetch("http://localhost:5050/api/movies/");
  // const res = await fetch(`${API_BASE_URL}/movies/`);
  const res = await fetch(`${API_URL}/api/movies/`);

  let data = await res.json();
  return data.movies;
}

// Filter movies by genre
function filterMoviesByGenre(movies, genre) {
  if (!movies) return [];

  return movies.filter((movie) => {
    if (!movie.genre || !Array.isArray(movie.genre)) return false;

    return movie.genre.some((g) =>
      g.toLowerCase().includes(genre.toLowerCase())
    );
  });
}

// Render movies to a specific container
// Render movies to a specific container
function renderMoviesToContainer(containerId, movies, maxItems = 12) {
  const container = document.getElementById(containerId);
  if (!container) return;

  container.innerHTML = "";

  if (!movies || movies.length === 0) {
    container.innerHTML = `<div class="no-movies">No movies found</div>`;
    return;
  }

  movies.slice(0, maxItems).forEach((movie) => {
    let card = document.createElement("div");
    card.classList.add("movie-list-item");

    // Determine rating class for color coding
    const rating = parseFloat(movie.rating) || 0;
    let ratingClass = "low";
    if (rating >= 7) ratingClass = "high";
    else if (rating >= 5) ratingClass = "medium";

    card.innerHTML = `
      <div class="movie-list-item-img-wrapper">
        <img class="movie-list-item-img" 
             src="${movie.image || "img/placeholder.jpg"}" 
             alt="${movie.title}" 
             onerror="this.src='img/placeholder.jpg'">
        
        <!-- Rating Badge -->
        <div class="movie-list-item-rating ${ratingClass}">
          ${movie.rating || "N/A"}
        </div>
        
        <!-- Year Badge -->
        <div class="movie-list-item-year">
          ${movie.releaseYear || "Unknown"}
        </div>
        
        <div class="movie-list-item-overlay">
          <span class="movie-list-item-title">${movie.title}</span>
          <p class="movie-list-item-desc">${
            movie.description
              ? movie.description.substring(0, 100) + "..."
              : "No description available"
          }</p>
          
          <!-- Additional rating info in overlay -->
          <div style="display: flex; gap: 15px; margin-bottom: 15px; color: #ffd700;">
            <span>⭐ ${movie.rating || "N/A"}/10</span>
            <span>📅 ${movie.releaseYear || "Unknown"}</span>
          </div>
          
          <button class="movie-list-item-button">
            <a href="./movieDetails.html?id=${movie._id}">View Details</a>
          </button>
        </div>
      </div>
    `;

    container.appendChild(card);
  });
}

// Initialize arrows function
function initializeArrows() {
  const leftArrows = document.querySelectorAll(".left-arrow");
  const rightArrows = document.querySelectorAll(".right-arrow");
  const movieLists = document.querySelectorAll(".movie-list");

  movieLists.forEach((movieList, i) => {
    const items = movieList.querySelectorAll(".movie-list-item");
    const itemWidth = 290; // 270px width + 20px gap
    const visibleItems = Math.floor(movieList.offsetWidth / itemWidth);
    let currentPosition = 0;
    const maxPosition = Math.max(0, items.length - visibleItems);

    function updateArrows() {
      const leftArrow = leftArrows[i];
      const rightArrow = rightArrows[i];

      leftArrow.classList.toggle("hidden", currentPosition === 0);
      rightArrow.classList.toggle("hidden", currentPosition >= maxPosition);
    }

    leftArrows[i].addEventListener("click", () => {
      if (currentPosition > 0) {
        currentPosition--;
        movieList.style.transform = `translateX(-${
          currentPosition * itemWidth
        }px)`;
        updateArrows();
      }
    });

    rightArrows[i].addEventListener("click", () => {
      if (currentPosition < maxPosition) {
        currentPosition++;
        movieList.style.transform = `translateX(-${
          currentPosition * itemWidth
        }px)`;
        updateArrows();
      }
    });

    updateArrows();

    window.addEventListener("resize", () => {
      const newVisibleItems = Math.floor(movieList.offsetWidth / itemWidth);
      const newMaxPosition = Math.max(0, items.length - newVisibleItems);

      if (currentPosition > newMaxPosition) {
        currentPosition = newMaxPosition;
        movieList.style.transform = `translateX(-${
          currentPosition * itemWidth
        }px)`;
      }

      updateArrows();
    });
  });
}

async function renderAllSections() {
  try {
    let movies = await getMovies();
    console.log("🎬 Total movies loaded:", movies.length);

    // Section 2: ALL MOVIES
    renderMoviesToContainer("movie-list", movies, 12);
    console.log("✅ Section 2 - ALL MOVIES loaded");

    // Section 3: DRAMA movies
    const dramaMovies = filterMoviesByGenre(movies, "drama");
    renderMoviesToContainer("drama-movies", dramaMovies, 12);
    console.log("✅ Section 3 - DRAMA movies:", dramaMovies.length);

    // Section 5: ACTION movies
    const actionMovies = filterMoviesByGenre(movies, "action");
    renderMoviesToContainer("action-movies", actionMovies, 12);
    console.log("✅ Section 5 - ACTION movies:", actionMovies.length);

    // Section 6: ADVENTURE movies
    const adventureMovies = filterMoviesByGenre(movies, "adventure");
    renderMoviesToContainer("adventure-movies", adventureMovies, 12);
    console.log("✅ Section 6 - ADVENTURE movies:", adventureMovies.length);

    // Initialize arrows AFTER all movies are loaded
    initializeArrows();
  } catch (err) {
    console.error("Error fetching movies:", err);
  }
}

// Call when page loads
document.addEventListener("DOMContentLoaded", function () {
  renderAllSections();
});
