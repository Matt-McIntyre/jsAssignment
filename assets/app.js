"use strict";

const maxPerPage = 6;
const fakeBooks = [...Array(20).keys()].map((i) => ({
  id: i + 1,
  title: "Book Title " + (i + 1),
  author: "Author Name " + (i + 1),
}));

let currentPage = 0;
$("#pages-nav").append(generateNav(fakeBooks, maxPerPage));
updateDisplay();

function updateDisplay() {
  $("#book-area").empty().append(showBooks(fakeBooks, currentPage, maxPerPage));
}

function onClick_Page() {
  currentPage = parseInt($(this).attr("page"));
  updateDisplay(currentPage);
}

function onClick_Next() {
  if (currentPage < Math.ceil(fakeBooks.length / maxPerPage)-1) {
    currentPage++;
    updateDisplay();
  }
}

function onClick_Previous() {
  if (currentPage > 0) {
    currentPage--;
    updateDisplay();
  }
}

function generateNav(books, maxPerPage) {
  let navButtons = [];
  let numPages = Math.ceil(books.length / maxPerPage);

  if (numPages > 1) {
    let $previous = $("<li>").addClass("page-item");
    let $previousLink = $("<a>")
      .addClass("page-link")
      .html("Previous")
      .attr("href", "javascript:void(0)")
      .click(onClick_Previous);
    $previous.append($previousLink);
    navButtons.push($previous);

    let $next = $("<li>").addClass("page-item");
    let $nextLink = $("<a>")
      .addClass("page-link")
      .html("Next")
      .attr("href", "javascript:void(0)")
      .click(onClick_Next);
    $next.append($nextLink);
    navButtons.push($next);

    let pageLinks = [...Array(numPages).keys()].map((page) => {
      let $page = $("<li>").addClass("page-item");
      let $pageLink = $("<a>")
        .addClass("page-link")
        .html(page + 1)
        .attr("href", "javascript:void(0)")
        .attr("page", page)
        .click(onClick_Page);
      $page.append($pageLink);
      return $page;
    });

    navButtons.splice(1, 0, ...pageLinks);
  }
  return navButtons;
}

function showBooks(books, page, maxPerPage) {
  let minIndex = maxPerPage * page;
  let maxIndex = minIndex + maxPerPage;
  return books
    .filter((b, i) => i >= minIndex && i < maxIndex)
    .map((book) => {
      let $cardDiv = $("<div>").addClass("card");
      let bookInfo =
        "Id: ${book.id}, Title: ${book.title}, Author: ${book.author}";
      console.log(bookInfo);
      console.log(book.title);
      let $cardBody = $("<div>")
        .addClass("card-body")
        .html(
          "Id: " +
            book.id +
            ", Title: " +
            book.title +
            ", Author: " +
            book.author
        );
      $cardDiv.append($cardBody);
      return $cardDiv;
    });
}
