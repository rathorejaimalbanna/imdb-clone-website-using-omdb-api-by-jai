//details: http://www.omdbapi.com/?i=tt3896198&apikey=6fe40a8f
//title : https://omdbapi.com/?s=thor&page=1&apikey=6fe40a8f
/* <button type="button" class="btn btn-sm btn-outline-danger">Remove</button> */


const searchbox = document.getElementById("searchbox");
const searchlist = document.getElementById("searchlist");
const resultGrid = document.getElementById('result-grid')
const resultbox = document.getElementById('resultbox');



// search through api
async function loadMovies(searchitem) {
    var link = `https://omdbapi.com/?s=${searchitem}&page=1&apikey=6fe40a8f`;
    var request = await fetch(`${link}`);
    var data = await request.json();
    console.log(data.Search);
    if (data.Response == "True") displayMovieList(data.Search);
}




// keypress and search functions
function findMovies() {
    let searchitem = (searchbox.value).trim();
    if (searchitem.length > 0) {
        loadMovies(searchitem)
        resultbox.style.display = ''

    }
    else if (
        searchbox.value == ''
    ) {
        resultbox.style.display = 'none'
    }

}




function displayMovieList(movies) {
    resultbox.innerHTML = "";
    for (let idx = 0; idx < movies.length; idx++) {
        let movieListItem = document.createElement('div');
        movieListItem.dataset.id = movies[idx].imdbID; // setting movie id in  data-id
        movieListItem.classList.add('movieCard');
        movieListItem.innerHTML = `
        <div class="col ">
        <div class="card shadow-sm" >
            <div id='poster' style="background-image: url(${movies[idx].Poster}">
            <svg  >
            </svg>
        </div>
            <div class="card-body" >
                <h3>${movies[idx].Title}</h3>
                <p>${movies[idx].Year}</p>
                <p class="card-text"></p>
                <div class="d-flex justify-content-between align-items-center">
                    <div class="btn-group">
                <button class='detailbutton' style="font-weight:500" type="button" class="btn btn-sm btn-outline-secondary"'>Movie Details</button>
                        
                    </div>
                    <small class="text-body-secondary">9 mins</small>
                </div>
            </div>
        </div>
    </div>
        `;
        resultbox.appendChild(movieListItem);
    }
    loadMoviesdetails();
}


function addfav() {
    var favbutton = document.getElementById('favbutton')
    var favbox = document.getElementById('favmoviebox');
    // var favmovie = favbutton.parentElement.parentElement.parentElement.parentElement;
    // favbox.appendChild(favmovie);
    console.log(favbox)
    // console.log(favmovie)


}

function removefav(a) {
    // var removebutton = document.getElementById('removebutton');
    removebutton.parentElement.parentElement.parentElement.parentElement.remove()
}



function loadMoviesdetails() {
    const searchListMovies = resultbox.querySelectorAll('.movieCard');
    searchListMovies.forEach(movie => {
        movie.addEventListener('click', async () => {
            // console.log(movie.dataset.id);
            const result = await fetch(`http://www.omdbapi.com/?i=${movie.dataset.id}&apikey=fc1fef96`);
            const movieDetails = await result.json();
            console.log(movieDetails);
            displayMovieDetails(movieDetails);
            resultbox.style.display = "none";
        });
    });
}

function displayMovieDetails(details) {
    resultGrid.innerHTML = `
    <div class = "movie-poster">
        <img src = "${(details.Poster != "N/A") ? details.Poster : "image_not_found.png"}" alt = "movie poster">
    </div>
    <div class = "movie-info">
        <h3 class = "movie-title">${details.Title}</h3>
        <ul class = "movie-misc-info">
            <li class = "year">Year: ${details.Year}</li>
            <li class = "rated">Ratings: ${details.Rated}</li>
            <li class = "released">Released: ${details.Released}</li>
        </ul>
        <p class = "genre"><b>Genre:</b> ${details.Genre}</p>
        <p class = "writer"><b>Writer:</b> ${details.Writer}</p>
        <p class = "actors"><b>Actors: </b>${details.Actors}</p>
        <p class = "plot"><b>Plot:</b> ${details.Plot}</p>
        <p class = "language"><b>Language:</b> ${details.Language}</p>
        <p class = "awards"><b><i class = "fas fa-award"></i></b> ${details.Awards}</p>
    </div>
    `;
}
