"use strict";

const $ul_pagesNav = $("#pages-nav");
const $div_bookArea = $("#book-area");

const numBooks = 20;
const maxPerPage = 6;
const numPages = Math.ceil(numBooks/maxPerPage);

const books = [...Array(numBooks).keys()].map((i) => ({
  bookId: i,
  title: "Book Title ${i}",
  author: "Author Name ${i}",
}));

$ul_pagesNav.append(generateNav(books));

function generateNav(books){

    let navButtons = [];

    console.log(numPages);

    if(numPages>1){
        let $previous = $("<li>").addClass("page-item").addClass("disabled");        
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

        let pageLinks = [...Array(numPages).keys()].map(page => {
            let $page = $("<li>").addClass("page-item");
            let $pageLink = $("<a>")
            .addClass("page-link")
            .html(page+1)
            .attr("href", "javascript:void(0)")
            .attr("page", page)
            .click(onClick_Page);
            $page.append($pageLink);
            return $page;            
        });
        pageLinks[0].addClass("active");
        navButtons.splice(1,0,...pageLinks);
    }
    return navButtons;
}

function onClick_Page(){
    
    console.log("click page");
};

function onClick_Next(){
    console.log("click previous");
};

function onClick_Previous(){
    console.log("click next");
};