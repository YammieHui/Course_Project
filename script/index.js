let movieInfo = getMovies();

// Generate movie list by getting movie info from movies.js
function movieList() {
  for (let i = 0; i < movieInfo.length; i++) {
    //Generate list for nowshowing movies
    if (movieInfo[i].type == "now") {
      document.getElementById("nowVideoDiv").innerHTML +=
        "<div>" +
        "<dt><span>Movie: </span>" +
        movieInfo[i].name +
        "</dt>" +
        '<dd class="thumbnail"><img onclick="switchVideo(' +
        (movieInfo[i].id - 1) +
        ')" src="../image/' +
        movieInfo[i].thumbnail +
        '" alt="' +
        movieInfo[i].name +
        '"></dd>' +
        "<dd><span>Cast: </span>" +
        movieInfo[i].cast +
        "</dd>" +
        "<dd><span>Director: </span>" +
        movieInfo[i].director +
        "</dd>" +
        "<dd><span>Duration: </span>" +
        movieInfo[i].duration +
        " mins</dd>" +
        "</div>";
    }

    //Generate list for upcoming movies
    if (movieInfo[i].type == "upcoming") {
      document.getElementById("upcomingVideoDiv").innerHTML +=
        "<div>" +
        "<dt><span>Movie: </span>" +
        movieInfo[i].name +
        "</dt>" +
        '<dd class="thumbnail"><img onclick="switchVideo(' +
        (movieInfo[i].id - 1) +
        ')" src="../image/' +
        movieInfo[i].thumbnail +
        '" alt="' +
        movieInfo[i].name +
        '"></dd>' +
        "<dd><span>Cast: </span>" +
        movieInfo[i].cast +
        "</dd>" +
        "<dd><span>Director: </span>" +
        movieInfo[i].director +
        "</dd>" +
        "<dd><span>Duration: </span>" +
        movieInfo[i].duration +
        " mins</dd>" +
        "</div>";
    }
  }
}

let position = 1; // Position in list for video-playing purpose

// Play the video of first movie in the list
function firstPlay() {
  document.getElementsByTagName("video")[0].innerHTML =
    '<source id="mp4" src="' +
    movieInfo[0].src +
    '" type="video/mp4">' +
    '<source id="ogg" src="' +
    movieInfo[0].src.substring(0, movieInfo[0].src.length - 3) +
    'ogg" type="video/ogg">' +
    "<h4>Your browser does not support the video tag.</h4>";
}

// Auto play the videos in sequence
function autoVideo() {
  // Reloop the list of videos from the first movie
  if (position == movieInfo.length) {
    position = 0;
    document.getElementsByTagName("video")[0].onended = function () {
      setTimeout(autoVideo, 2000);
    };
  }

  document.getElementById("mp4").src = movieInfo[position].src;
  document.getElementById("ogg").src =
    movieInfo[position].src.substring(0, movieInfo[position].src.length - 3) +
    "ogg";
  document.getElementsByTagName("video")[0].load();

  position++;
}

// Play the specified video when its thumbnail is clicked
function switchVideo(n) {
  document.getElementsByTagName("video")[0].pause();

  document.getElementById("mp4").src = movieInfo[n].src;
  document.getElementById("ogg").src =
    movieInfo[n].src.substring(0, movieInfo[n].src.length - 3) + "ogg";
  document.getElementsByTagName("video")[0].load();

  // Change the position in the list
  position = n + 1;
}
