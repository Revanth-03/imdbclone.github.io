//GET HTML Elements
const serachInput = document.getElementById("serach-input");
const searchMovie = document.getElementById("serach-movie");
const serchResult = document.getElementById("serach-results");
const serachSuggestions = document.getElementById("suggestions");

//api URL
const apiKEY = "cdfddc95";
const apiURL1 = `https://www.omdbapi.com/?apikey=${apiKEY}&s`;
const apiURL2 = `https://www.omdbapi.com/?apikey=${apiKEY}&t`;

//Define varables
let favoriteMovies = [];
let movies = [];

//searching suggestions
serachInput.addEventListener("input", () => {
  const searchTerm = serachInput.value;
  if (searchTerm.length < 3) {
    serachSuggestions.innerHTML = "";
    return;
  }
  fetch(`${apiURL1}=${searchTerm}`) //it return the promise
    .then((response) => response.json())
    .then((data) => {
      const suggestions = data.Search;
      displaySuggestions(suggestions);
    });
});

//dispalying the suggestions
function displaySuggestions(suggestions) {
  serachSuggestions.innerHTML = "";

  suggestions.forEach((suggestion) => {
    const listElement = document.createElement("li");
    listElement.classList.add("list-iteam-group");
    listElement.style.listStyleType = "none";
    listElement.textContent = `${suggestion.Title}`;
    listElement.addEventListener("click", () => {
      serachInput.value = `${suggestion.Title}`;
      serachSuggestions.innerHTML = "";
    });
    serachSuggestions.appendChild(listElement);
  });

  // let limit = Math.min(suggestions.length, 15);  ***//to limit the suggestions to 15***

  // for (let i = 0; i < limit; i++) {
  //   const suggestion = suggestions[i];
  //   const listElement = document.createElement("li");

  //   listElement.classList.add("list-iteam-group");
  //   listElement.style.listStyleType = "none";
  //   listElement.textContent = `${suggestion.Title}`;

  // }
}

// searchMovie function will hit the api to get the movies or movie
searchMovie.addEventListener("click", (e) => {
  e.preventDefault();

  if (serachInput.value !== "") {
    let movieName = serachInput.value;

    fetch(`${apiURL1}=${movieName}`)
      .then((response) => {
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        return response.json();
      })
      .then((data) => {
        const movies = data.Search;
        // console.log(movies, "movies", data, "data");
        displayMovies(movies);
      })
      .catch((error) => {
        // console.error(`Error:${error}`);
        fetch(`${apiURL2}=${movieName}`)
          .then((response) => {
            if (!response.ok) {
              throw new Error(`HTTP error! status:${response.status}`);
            }
            response.json();
          })
          .then((data) => {
            const movie = data;
            // console.log(movie, "movie");
            displayMovie(movie);
          })
          .catch((error) => {
            serchResult.innerHTML = "";
            document.querySelector(".res").childNodes[1].style.display = "none";
          
            const fourOFour = document.createElement("h2");
            fourOFour.className = "ms-5";
            fourOFour.innerText = "Search movie not found";
            serchResult.appendChild(fourOFour);
          });
      });
  }
});

//displayMovies function will display movies in frontend by creating a html movieElement
function displayMovies(movies) {
  serchResult.innerHTML = "";
  serachInput.value = "";
  serachSuggestions.innerHTML = "";

  movies.forEach((movie) => {
    const movieElement = document.createElement("div"); //creating the html movieElement
    movieElement.classList.add("col", "d-flex", "flex-column", "mb-5");
    movieElement.style.cursor = "pointer";
    movieElement.innerHTML = `${
      movie.Poster !== "N/A"
        ? `<img src="${movie.Poster}" alt=${movie.Title} height="252px" width="202px" >`
        : `<img src = https://t3.ftcdn.net/jpg/01/75/90/56/240_F_175905605_9i2vz4twiBTKHJho3cJxXcn60Cu0qurq.jpg alt = "coming soon" height="252px" width="202px" >`
    }
      <h2 style="color:white; font-size:1rem !important;" class="ms-1">${
        movie.Title
      }</h2>
      <p  style="color:white;" class="ms-1">${movie.Year}</p>
      <button class="btn btn-outline-danger" id="add-favorite"  style="width:201px; ">Add to Favorites &nbsp <i class="fa-solid fa-heart"></button>`;
    const addFavorite = movieElement.querySelector("#add-favorite");

    addFavorite.addEventListener("click", (e) => {
      e.stopPropagation();
      addFavorite.disabled = true; //allowing the user to do favorite ones
      addFavoriteList(movie);
    });

    //opening the new page when you click on the movieElement
    movieElement.addEventListener("click", () => {
      window.location.href = `movieDetails.html?id=${movie.imdbID}`;
      // window.open(movieDetailsURL, "_blank");
    });

    //dispalying the text "Searching Results"
    document.querySelector(".res").childNodes[1].style.display = "block";

    //add the movieElement div as a children of serchResult div
    serchResult.appendChild(movieElement);
  });
}

//displayMovie function will display movies in frontend by creating a html movieElement
function displayMovie(movie) {
  serchResult.innerHTML = "";
  serachInput.value = "";
  serachSuggestions.innerHTML = "";

  const movieElement = document.createElement("div"); //creating the html movieElement
  movieElement.classList.add("col", "d-flex", "flex-column", "mb-5");
  movieElement.style.cursor = "pointer";
  movieElement.innerHTML = `${
    movie.Poster !== "N/A"
      ? `<img src="${movie.Poster}" alt=${movie.Title} height="252px" width="202px" >`
      : `<img src = https://t3.ftcdn.net/jpg/01/75/90/56/240_F_175905605_9i2vz4twiBTKHJho3cJxXcn60Cu0qurq.jpg alt = "coming soon" height="252px" width="202px" >`
  }
      <h2 style="color:white; font-size:1rem !important;" class="ms-1">${
        movie.Title
      }</h2>
      <p  style="color:white;" class="ms-1">${movie.Year}</p>
      <button class="btn btn-outline-danger" id="add-favorite"  style="width:201px; ">Add to Favorites &nbsp <i class="fa-solid fa-heart"></button>`;
  const addFavorite = movieElement.querySelector("#add-favorite");

  addFavorite.addEventListener("click", (e) => {
    e.stopPropagation();
    addFavorite.disabled = true; //allowing the user to do favorite ones
    addFavoriteList(movie);
  });

  //opening the new page when you click on the movieElement
  movieElement.addEventListener("click", () => {
    window.location.href = `movieDetails.html?id=${movie.imdbID}`;
    // window.open(movieDetailsURL, "_blank");
  });

  //dispalying the text "Searching Results"
  document.querySelector(".res").childNodes[1].style.display = "block";

  //add the movieElement div as a children of serchResult div
  serchResult.appendChild(movieElement);
}

//Adding the favorites to localstorage by clicking the favoratie button
function addFavoriteList(movie) {
  favoriteMovies.push(movie);
  localStorage.setItem("favoriteMovies", JSON.stringify(favoriteMovies));
  console.log("localstorage", localStorage.getItem("favoriteMovies"));
}
