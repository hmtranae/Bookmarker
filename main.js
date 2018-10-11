// Event Listener for form submit
document.querySelector("#myForm").addEventListener("submit", saveBookmark); // run saveBookmark when a form is submitted within #myForm

// Save Bookmarks
function saveBookmark(e) {
    e.preventDefault(); // prevents submit's default action (refresh page when clicked)

    // Get User input
    var siteName = document.querySelector("#siteName").value;
    var siteUrl = document.querySelector("#siteUrl").value;

    // Create an object for bookmark
    var bookmark = {
        name: siteName,
        url: siteUrl
    };

    // Check if name or url is empty
    if (siteName === "" || siteUrl === "") {
        alert("Site name and URL cannot be empty");
        return false;
    }
    
    // Store bookmarks array into local storage

    // Check if the bookmarks array exists
    if (localStorage.getItem("bookmarks") === null) { // if bookmarks array is empty
        // Init bookmarks array
        var bookmarks = [];
        // Adding new bookmark into array
        bookmarks.push(bookmark);
        // Set to localStorage
        localStorage.setItem("bookmarks", JSON.stringify(bookmarks));
    } else { // if bookmarks exists
        // Get bookmarks from local storage
        var bookmarks = JSON.parse(localStorage.getItem("bookmarks"));
        // Add new bookmark into bookmarks
        bookmarks.push(bookmark);
        // Reset bookmarks to localStorage
        localStorage.setItem("bookmarks", JSON.stringify(bookmarks));
    }
    // Reset the form: make the inputs empty
    document.querySelector("#myForm").reset();

    fetchBookmarks(); // Displays each bookmark object in bookmarks array
}

// fetch Bookmarks
function fetchBookmarks() {
    // Get bookmarks from localStorage
    var bookmarks = JSON.parse(localStorage.getItem("bookmarks"));

    // Get the output div by id
    var bookmarksResult = document.querySelector("#bookmarksResult");

    // Reset the output div
    bookmarksResult.innerHTML = "";

    // Loop through bookmarks
    for (var i = 0; i < bookmarks.length; i++) {
        var name = bookmarks[i].name;
        var url = bookmarks[i].url;

        bookmarksResult.innerHTML +=
            "<div>" +
            "<h3>" +
            name +
            " " +
            '<a target="_blank" class="btn btn-success" href="' +
            url +
            '">Visit</a> ' +
            '<button class="btn btn-danger" onclick="deleteBookmark(\'' +
            name +
            "')\">Delete</button>" +
            "</h3>" +
            "</div>";
    }
}

function deleteBookmark(name) {
    // Get bookmarks from localStorage
    var bookmarks = JSON.parse(localStorage.getItem("bookmarks"));

    // Loop thourgh bookmarks
    for (var i = 0; i < bookmarks.length; i++) {
        // Remove the bookmark with the given name
        if (bookmarks[i].name === name) {
            bookmarks.splice(i, 1);
            break;
        }
    }

    // Reset bookmarks back to localStorage
    localStorage.setItem("bookmarks", JSON.stringify(bookmarks));

    // Re-fetch bookmarks Result
    fetchBookmarks();
}
