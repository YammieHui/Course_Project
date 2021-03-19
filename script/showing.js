let cinemaInfo = getCinemas();
let movieInfo = getMovies();

function selectedList(v) {
  if (v == -1) {
    // if the function is called when window is loaded (argument == -1) -> Generate dropdown list of the cinemas
    for (let i = 0; i < cinemaInfo.length; i++) {
      document.getElementById("select").innerHTML +=
        '<option value="' + i + '">' + cinemaInfo[i].branchName + "</option>";
    }
    v = cinemaInfo[0];
  } else {
    v = cinemaInfo[v];
  }

  // Clear content in container when another option in dropdown list is selected
  document.querySelector("#formContainer").innerHTML = "";
  // Generate cinema name header
  document.querySelector("#formHeader").innerHTML = v.branchName;

  for (let i = 0; i < v.movies.length; i++) {
    for (let j = 0; j < movieInfo.length; j++) {
      if (movieInfo[j].id == v.movies[i].id) {
        // Generate a form for each movie
        document.querySelector("#formContainer").innerHTML +=
          '<form action="ticket.html" method="get">' +
          '<div><img src="../image/' +
          movieInfo[j].thumbnail +
          '" alt="' +
          movieInfo[j].name +
          '">' +
          '<input type="text" name="movieName" value="' +
          movieInfo[j].name +
          '" disabled>' +
          '<select name="index">' +
          "</select>" +
          '<input type="submit" value="Buy Ticket" onclick="enableData(' +
          i +
          ')">' +
          "</div>" +
          "</form>";

        // Generate a dropdown list of movie sessions for each form
        for (let k = 0; k < v.movies[i].shows.length; k++) {
          document.getElementsByName("index")[i].innerHTML +=
            '<option value="' +
            v.movies[i].shows[k].index +
            '">' +
            v.movies[i].shows[k].datetime +
            "</option>";
        }
      }
    }
  }
}

// Enable sending of movie name value by enabling the disabled textbox
function enableData(i) {
  document.getElementsByName("movieName")[i].disabled = false;
}
