const form = document.getElementById('form');
const siteName = document.getElementById('siteName');
const siteUrl = document.getElementById('siteUrl');
const output = document.getElementById('bookmarksResults');
form.addEventListener('submit', (e) => {
  e.preventDefault();
  saveBookmark();
});

function saveBookmark() {
  let siteNameValue = siteName.value;
  let siteUrlValue = siteUrl.value;
  const bookmark = {
    name: siteNameValue,
    url: siteUrlValue,
  };
  if (localStorage.getItem('bookmarks') === null) {
    let bookmarks = [];
    bookmarks.push(bookmark);
    console.log(bookmarks);
    localStorage.setItem('bookmarks', JSON.stringify(bookmarks));
  } else {
    const bookmarks = JSON.parse(localStorage.getItem('bookmarks'));
    bookmarks.push(bookmark);
    localStorage.setItem('bookmarks', JSON.stringify(bookmarks));
  }
}

function fetchBookmarks() {
  const bookmarks = JSON.parse(localStorage.getItem('bookmarks'));
  console.log(bookmarks);
}
