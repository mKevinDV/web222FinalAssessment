// all of my data is availble on the global 'window' object.
// creating local variables to work with it in this file.
const { reviewData } = window;

// for debugging, displaying all of my data in the console.
// used it to verify the "add review" form adds a new object to the reviewData array
console.log({ reviewData }, "App Data");

//
//
//
//
//

// function to load the reviews
function loadReviews() {
  // select the reviews div
  var reviewsContainer = document.getElementById("reviews");

  // loop through the sorted review data and create a new card for each review
  reviewData.forEach((review) => {
    // create a new card element
    var card = document.createElement("div");
    card.classList.add("card");

    // create a card child div with the review name and rating
    var cardHeader = document.createElement("div");
    cardHeader.classList.add("card-header");
    var nameElement = document.createElement("h3");
    nameElement.textContent = review.name;
    var ratingElement = document.createElement("h4");
    ratingElement.textContent = `${review.rating}/5`;
    cardHeader.appendChild(nameElement);
    cardHeader.appendChild(ratingElement);

    // create a card child div with the review text date
    var cardBody = document.createElement("div");
    cardBody.classList.add("card-body");
    var textElement = document.createElement("p");
    textElement.textContent = review.text;
    var dateElement = document.createElement("datetime");
    dateElement.textContent = review.date;
    cardBody.appendChild(textElement);
    cardBody.appendChild(dateElement);

    // append the both child divs to the card div
    card.appendChild(cardHeader);
    card.appendChild(cardBody);

    // append the new card to the reviews div
    reviewsContainer.appendChild(card);
  });
}

// call the loadReviews function when the page loads
window.addEventListener("load", loadReviews);

//
//
//
//
//

// everything below is for adding a new review

// function to clear existing cards on page
function clearReviewCards() {
  var reviewContainer = document.querySelector("#reviews");
  reviewContainer.innerHTML = "";
}

// selecting the add-review form
var addReviewForm = document.querySelector("#add-review");

// what to do when the user adds a review
addReviewForm.addEventListener("submit", (event) => {
  // typically when a submit button is hit, the page will be refreshed.
  // .preventDefault() will tell prevent this event from doing anything more
  // and in turn, prevent page from reloading; need to be able to display new
  // review without page reloading.
  event.preventDefault();

  // get today's date
  var date = new Date().toLocaleDateString();

  // retrieve the information entered into the form
  var name = document.querySelector("#name").value;
  var rating = document.querySelector("#rating").value;
  var text = document.querySelector("#review-text").value;

  // create a temp empty object for new review to be added
  var newReview = {
    name,
    date,
    rating,
    text
  };

  // add the new review to the reviewData array
  reviewData.push(newReview);
  // clear existing cards
  clearReviewCards();
  // reload the reviewData array, which will include the new review
  loadReviews(reviewData);
  // resets the form (didn't have to, but it will make it look like)
  addReviewForm.reset();
});
