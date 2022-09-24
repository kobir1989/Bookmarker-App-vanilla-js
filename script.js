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
  if (!formValidation(siteNameValue, siteUrlValue)) {
    return false;
  }

  const bookmark = {
    name: siteNameValue,
    url: siteUrlValue,
  };
  if (localStorage.getItem('bookmarks') === null) {
    let bookmarks = [];
    bookmarks.push(bookmark);
    localStorage.setItem('bookmarks', JSON.stringify(bookmarks));
  } else {
    const bookmarks = JSON.parse(localStorage.getItem('bookmarks'));
    bookmarks.push(bookmark);
    localStorage.setItem('bookmarks', JSON.stringify(bookmarks));
  }
  fetchBookmarks();
  siteName.value = '';
  siteUrl.value = '';
}

function deleteBookmark(url) {
  console.log(url);
  const bookmarks = JSON.parse(localStorage.getItem('bookmarks'));
  for (let i = 0; i < bookmarks.length; i++) {
    if (bookmarks[i].url == url) {
      bookmarks.splice(i, 1);
    }
  }
  localStorage.setItem('bookmarks', JSON.stringify(bookmarks));
  //refetch
  fetchBookmarks();
}

function fetchBookmarks() {
  const bookmarks = JSON.parse(localStorage.getItem('bookmarks'));
  output.innerHTML = '';
  for (let i = 0; i < bookmarks.length; i++) {
    const name = bookmarks[i].name;
    const url = bookmarks[i].url;

    output.innerHTML += `
      <div class='rounded flex justify-between items-start w-full bg-[#fff] my-4 p-6'>
      <h3 class='text-[1.3rem]'>${name}</h3>
     <div>
     <button  class='mx-4 bg-[#394865] border-[1px] border-[#B270A2] text-[#fff] w-[5rem]
      h-[2rem] rounded font-medium hover:text-[#F96666]'><a href='${url}'>Visit</a></button>
      <button class='bg-[#FFD1D1] border-[1px] border-[#E64848]
       w-[5rem] h-[2rem] rounded font-medium hover:text-[#D61C4E]'
       onclick="deleteBookmark('${url}')" >Delete</button>
      </div>
      </div>
      `;
  }
}

//Form Validation check

function formValidation(siteNameValue, siteUrlValue) {
  if (!siteNameValue || !siteUrlValue) {
    alert('Please Fill in the form');
    return;
  }

  const expression =
    /(ftp|http|https):\/\/(\w+:{0,1}\w*@)?(\S+)(:[0-9]+)?(\/|\/([\w#!:.?+=&%@!\-\/]))?/;
  const regex = new RegExp(expression);
  if (!siteUrlValue.match(regex)) {
    alert('Please use a valid URL (exp: https://www.goole.com)');
    return;
  }
  return true;
}
