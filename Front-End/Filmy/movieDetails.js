const params = new URLSearchParams(window.location.search);
const movieId = params.get("id");

const detailsContainer = document.getElementById("movie-details");
const API_URL = "https://filmy-5m8i.vercel.app";

async function loadMovieDetails() {
  if (!movieId) {
    detailsContainer.innerHTML = `
      <div class="error-message">
        <i class="fas fa-exclamation-triangle"></i>
        <h2>No Movie Selected</h2>
        <p>Please go back and select a movie to view details.</p>
        <a href="index.html" class="btn btn-primary" style="margin-top: 20px;">
          <i class="fas fa-arrow-left"></i> Back to Movies
        </a>
      </div>
    `;
    return;
  }

  // Show loading state
  detailsContainer.innerHTML = `
    <div class="movie-details-container">
      <div class="movie-hero loading" style="height: 400px;"></div>
      <div class="movie-content">
        <div class="movie-info">
          <div class="loading" style="height: 100px; margin-bottom: 20px;"></div>
          <div class="loading" style="height: 200px; margin-bottom: 20px;"></div>
          <div class="details-grid">
            <div class="loading" style="height: 100px;"></div>
            <div class="loading" style="height: 100px;"></div>
            <div class="loading" style="height: 100px;"></div>
            <div class="loading" style="height: 100px;"></div>
          </div>
        </div>
        <div class="movie-sidebar">
          <div class="loading" style="height: 400px; border-radius: 15px;"></div>
        </div>
      </div>
    </div>
  `;

  try {
    let res = await fetch(`${API_URL}/api/movies/${movieId}`);
    
    if (!res.ok) {
      throw new Error(`Failed to fetch movie: ${res.status}`);
    }
    
    let data = await res.json();
    const movie = data.movie || data;

    // Generate star rating
    const generateStars = (rating) => {
      const stars = Math.round(rating / 2);
      return '⭐'.repeat(stars) + '☆'.repeat(5 - stars);
    };

    detailsContainer.innerHTML = `
      <div class="movie-details-container">
        <!-- Hero Section -->
        <div class="movie-hero" style="background: linear-gradient(rgba(0,0,0,0.6), rgba(0,0,0,0.8)), url('${movie.image || 'img/placeholder.jpg'}') center/cover;">
          <div class="movie-hero-content">
            <h1 class="movie-title">${movie.title}</h1>
            <div class="movie-meta">
              <span class="meta-item">
                <i class="fas fa-calendar-alt"></i>
                ${movie.releaseYear || "N/A"}
              </span>
              <span class="meta-item">
                <i class="fas fa-clock"></i>
                ${movie.duration ? movie.duration + " min" : "N/A"}
              </span>
              <span class="meta-item">
                <i class="fas fa-star"></i>
                ${movie.rating ? movie.rating + "/10" : "N/A"}
              </span>
            </div>
          </div>
        </div>

        <!-- Main Content -->
        <div class="movie-content">
          <!-- Left Column - Info -->
          <div class="movie-info">
            <p class="movie-description">${movie.description || "No description available."}</p>
            
            <div class="details-grid">
              <div class="detail-card">
                <h3>Director</h3>
                <p>${movie.director || "Unknown"}</p>
              </div>
              
              <div class="detail-card">
                <h3>Genre</h3>
                <p>${movie.genre && movie.genre.length ? movie.genre.join(", ") : "Not specified"}</p>
              </div>
              
              <div class="detail-card">
                <h3>Rating</h3>
                <p>${movie.rating ? generateStars(movie.rating) + ` (${movie.rating}/10)` : "N/A"}</p>
              </div>
              
              <div class="detail-card">
                <h3>Language</h3>
                <p>English</p>
              </div>
            </div>

            <!-- Cast Section -->
            ${movie.cast && movie.cast.length ? `
              <div class="cast-section">
                <h2 style="color: #e50914; margin-bottom: 20px; font-size: 1.5rem;">Cast</h2>
                <div class="cast-grid">
                  ${movie.cast.slice(0, 6).map(actor => `
                    <div class="cast-member">
                      <div class="actor-name">${actor}</div>
                      <div class="actor-role">Actor</div>
                    </div>
                  `).join('')}
                </div>
              </div>
            ` : ''}
          </div>

          <!-- Right Column - Sidebar -->
          <div class="movie-sidebar">
            <!-- Poster -->
            <div class="movie-poster">
              <img src="${movie.image || 'img/placeholder.jpg'}" 
                   alt="${movie.title}" 
                   onerror="this.src='img/placeholder.jpg'">
            </div>

            <!-- Action Buttons -->
            <div class="action-buttons">
              <a href="index.html" class="btn btn-secondary">
                <i class="fas fa-arrow-left"></i> Back to Movies
              </a>
              <a href="#" class="btn btn-primary" onclick="playTrailer('${movie.title}')">
                <i class="fas fa-play"></i> Watch Trailer
              </a>
            </div>

            <!-- Statistics -->
            <div class="stats-grid">
              <div class="stat-item">
                <span class="stat-value">${movie.views ? (movie.views / 1000).toFixed(1) + 'K' : '0'}</span>
                <span class="stat-label">Views</span>
              </div>
              <div class="stat-item">
                <span class="stat-value">${movie.rating || 'N/A'}</span>
                <span class="stat-label">Rating</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    `;
  } catch (err) {
    console.error("Error loading movie details:", err);
    detailsContainer.innerHTML = `
      <div class="error-message">
        <i class="fas fa-exclamation-triangle"></i>
        <h2>Error Loading Movie</h2>
        <p>Failed to load movie details. Please try again later.</p>
        <a href="index.html" class="btn btn-primary" style="margin-top: 20px;">
          <i class="fas fa-arrow-left"></i> Back to Movies
        </a>
      </div>
    `;
  }
}

function playTrailer(movieTitle) {
  alert(`🎬 Trailer for "${movieTitle}"\n\nThis would open a video player or YouTube integration.`);
}

// Load movie details when page loads
document.addEventListener('DOMContentLoaded', loadMovieDetails);