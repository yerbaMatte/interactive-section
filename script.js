'use strict';

const postContainer = document.querySelector('.post-container');
let jsonData;

async function addPost() {
  let htmlCode;
  try {
    // the `fetch()` call will either return a Response or throw an error
    const response = await fetch('./data.json');
    if (!response.ok) {
      throw new Error(`HTTP error: ${response.status}`);
    }
    // after this line, our function will wait for the `response.json()` call to be settled the `response.json()` call will either return the parsed JSON object or throw an error
    jsonData = await response.json();
  } catch (error) {
    console.error(`Could not get products: ${error}`);
  }
  // sort main comments from the best and display them

  htmlCode = addHTML(0);
  postContainer.insertAdjacentHTML('afterbegin', htmlCode);

  console.log(jsonData.comments);
}

addPost();

function addHTML(person) {
  return `
  <div class="post-box">
  <div class="likes-box">
  <button class="btn-rate"><img src="./images/icon-plus.svg" alt="plus"></img></button>
    <p class="likes-counter">${jsonData.comments[person].score}</p>
    <button class="btn-rate"><img src="./images/icon-minus.svg" alt="minus"></button>
  </div>
  <div class="post-content">
    <div class="post-header">
      <div class="post-info">
        <img src="${jsonData.comments[person].user.image.webp}" alt="profile-pic" class="profile-pic" />
        <span class="profile-name">${jsonData.comments[person].user.username}</span>
        <p class="time">${jsonData.comments[person].createdAt}</p>
      </div>
      <button class="reply">REPLY</button>
    </div>
    <div class="post-text">${jsonData.comments[person].content}</div>
  </div>
</div>`;
}
