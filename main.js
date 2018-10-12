// Event Listener for form submit
document.querySelector("#myForm").addEventListener("submit", saveBookmark); // run saveBookmark when a form is submitted within #myForm

document.querySelector('#filter').addEventListener('keyup', filterBookmarks);

// Filter bookmarks
function filterBookmarks() {
    var filterValue = document.querySelector('#filter').value.toUpperCase();
    var bookmarkNames = document.querySelectorAll('.name');

    for (var i = 0; i < bookmarkNames.length; i++) {
        var name = bookmarkNames[i].textContent.toUpperCase();
        if (name.includes(filterValue)) {
            bookmarkNames[i].parentElement.style.display = 'block';
        } else {
            bookmarkNames[i].parentElement.style.display = 'none';
        }
    }
}

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

        // Create div
        var div = document.createElement('div');
        // Create h3
        var h3 = document.createElement('h3');
        h3.textContent = name;
        h3.className = 'name';
        // Create link
        var a = document.createElement('a');
        a.href = url;
        a.className = 'btn btn-success';
        a.textContent = 'Visit';
        // Create button
        var button = document.createElement('button');
        button.className = 'btn btn-danger';
        button.textContent = 'Delete';
        button.addEventListener('click', function(e) {
            var siteName = e.target.parentElement.children[0].textContent;
            deleteBookmark(siteName);
        });
        div.appendChild(h3);
        div.appendChild(a);
        div.appendChild(button);
        bookmarksResult.appendChild(div);
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
