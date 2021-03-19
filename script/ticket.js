// Get data from query string
function getVar(attr) {
  let query = window.location.search.substring(1);
  let vars = query.split("&");

  for (let i = 0; i < vars.length; i++) {
    let pair = vars[i].split("=");
    if (pair[0] == attr) {
      return pair[1];
    }
  }
  return null;
}

// Fill in the headings
function fillVar() {
  let index = getVar("index");
  let cinemaInfo = getCinemas();

  for (let i = 0; i < cinemaInfo.length; i++) {
    for (let j = 0; j < cinemaInfo[i].movies.length; j++) {
      for (let k = 0; k < cinemaInfo[i].movies[j].shows.length; k++) {
        if (cinemaInfo[i].movies[j].shows[k].index == index) {
          document.getElementsByName("cinema")[0].value =
            cinemaInfo[i].branchName;
          document.getElementsByName("datetime")[0].value =
            cinemaInfo[i].movies[j].shows[k].datetime;
          document.getElementsByName("house")[0].value =
            cinemaInfo[i].movies[j].shows[k].house;
        }
      }
    }
  }

  document.getElementsByName("movieName")[0].value = getVar(
    "movieName"
  ).replaceAll("+", " ");
}

// Set up eventhandler for seats when page is loaded
function init() {
  let seat = document.querySelectorAll("td ~ td");
  for (let i = 0; i < seat.length; i++) {
    seat[i].onclick = function () {
      booked(i);
    };
  }
}

// Change background color and remove the event handler when the td element is clicked
function booked(i) {
  let seat = document.querySelectorAll("td ~ td");

  seat[i].style.backgroundColor = "#246494";
  seat[i].style.color = "white";

  // Remove the event handler
  seat[i].onclick = null;
  // Call the specific function to create a booked seat in seat block
  getSeat(i);
}

// Create a booked seat in seat block
function getSeat(i) {
  let bookedSeat;

  // Get the seat code
  if (i >= 0 && i < 4) {
    bookedSeat = "A";
    bookedSeat += i + 1;
  } else if (i >= 4 && i < 8) {
    bookedSeat = "B";
    if ((i + 1) % 4 != 0) {
      bookedSeat += (i + 1) % 4;
    } else {
      bookedSeat += "4";
    }
  } else if (i >= 8 && i < 12) {
    bookedSeat = "C";
    if ((i + 1) % 4 != 0) {
      bookedSeat += (i + 1) % 4;
    } else {
      bookedSeat += "4";
    }
  }

  // Set value of an input element as the seat code
  document.getElementById("bookedSeat").innerHTML +=
    '<input name="seat" value="' + bookedSeat + '" disabled></input>';
}

// Enable sending of value by enabling the disabled textbox
function enableData() {
  for (let n = 0; n < document.querySelectorAll("input").length; n++) {
    document.querySelectorAll("input")[n].disabled = false;
  }
}
