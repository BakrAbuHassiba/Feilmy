//TOGGLE
const ball = document.querySelector(".toggle-ball");
const items = document.querySelectorAll(
  ".container,.movie-list-title,.navbar-container,.sidebar,.left-menu-icon,.toggle"
);

ball.addEventListener("click", () => {
  items.forEach((item) => {
    item.classList.toggle("active");
  });
  ball.classList.toggle("active");
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
  let res = await fetch("http://localhost:5050/api/movies/");
  let data = await res.json();
  return data.movies;
}

// Initialize arrows function
function initializeArrows() {
  const leftArrows = document.querySelectorAll(".left-arrow");
  const rightArrows = document.querySelectorAll(".right-arrow");
  const movieLists = document.querySelectorAll(".movie-list");

  leftArrows.forEach((arrow, i) => {
    const itemNumber =
      movieLists[i].querySelectorAll(".movie-list-item").length;
    let clickCounter = 0;

    arrow.addEventListener("click", () => {
      const ratio = Math.floor(window.innerWidth / 270);
      clickCounter--;

      // For left arrow (going backwards)
      if (clickCounter >= 0) {
        const currentTransform =
          movieLists[i].computedStyleMap().get("transform")[0].x.value || 0;
        movieLists[i].style.transform = `translateX(${
          currentTransform + 300
        }px)`;
      } else {
        // If at the beginning, either loop to end or reset to start
        movieLists[i].style.transform = "translateX(0)";
        clickCounter = 0;
      }
    });
  });

  rightArrows.forEach((arrow, i) => {
    const itemNumber =
      movieLists[i].querySelectorAll(".movie-list-item").length;
    let clickCounter = 0;

    arrow.addEventListener("click", () => {
      const ratio = Math.floor(window.innerWidth / 270);
      clickCounter++;

      if (itemNumber - (4 + clickCounter) + (4 - ratio) >= 0) {
        const currentTransform =
          movieLists[i].computedStyleMap().get("transform")[0].x.value || 0;
        movieLists[i].style.transform = `translateX(${
          currentTransform - 300
        }px)`;
      } else {
        movieLists[i].style.transform = "translateX(0)";
        clickCounter = 0;
      }
    });
  });
}

async function renderMovies() {
  try {
    let movies = await getMovies();
    let container = document.getElementById("movie-list");
    container.innerHTML = "";

    movies.slice(0, 12).forEach((movie) => {
      let card = document.createElement("div");
      card.classList.add("movie-list-item");

      card.innerHTML = `
        <img class="movie-list-item-img" src="${movie.image}" alt="${
        movie.title
      }">
        <span class="movie-list-item-title">${movie.title}</span>
        <p class="movie-list-item-desc">${movie.description.substring(
          0,
          100
        )}...</p>
        <p class="movie-list-item-rating">⭐ ${movie.rating} | ${
        movie.releaseYear
      }</p>
        <button class="movie-list-item-button">
          <a href="./details.html?id=${
            movie._id
          }" style="color:white;text-decoration:none;">View Details</a>
        </button>
      `;
      container.appendChild(card);
    });

    // ✅ Initialize arrows AFTER movies are loaded
    initializeArrows();
  } catch (err) {
    console.error("Error fetching movies:", err);
  }
}

// Call renderMovies when page loads
document.addEventListener("DOMContentLoaded", function () {
  renderMovies();
});
