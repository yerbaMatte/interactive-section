'use strict';

const postContainer = document.querySelector('.post-container');
let jsonData;

async function generatePostBox() {
  let commentCode;
  let replyCode;
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
  const orderMain = jsonData.comments.sort((x, i) => x.score - i.score);
  orderMain.forEach((element) => {
    console.log(element);
    commentCode = displayPost(element, '');
    postContainer.insertAdjacentHTML('afterbegin', commentCode);
    // check if main comment has replies
    if (!(element.replies.length === 0)) {
      // sort replies
      const orderReplies = element.replies.sort((x, i) => x.score - i.score);
      // display replies below comment
      orderReplies.forEach((reply) => {
        replyCode = displayPost(reply, 'replyClass');
        postContainer.insertAdjacentHTML('afterbegin', replyCode);
      });
    }
  });
}

generatePostBox();

function displayPost(person, replyClass) {
  return `
  <div class="post-box ${replyClass}">
  <div class="likes-box">
  <button class="btn-rate"><img src="./images/icon-plus.svg" alt="plus"></img></button>
    <p class="likes-counter">${person.score}</p>
    <button class="btn-rate"><img src="./images/icon-minus.svg" alt="minus"></button>
  </div>
  <div class="post-content">
    <div class="post-header">
      <div class="post-info">
        <img src="${person.user.image.webp}" alt="profile-pic" class="profile-pic" />
        <span class="profile-name">${person.user.username}</span>
        <p class="time">${person.createdAt}</p>
      </div>
      <button class="reply">REPLY</button>
    </div>
    <div class="post-text">${person.content}</div>
  </div>
</div> `;
}

// let dogs;

// const doggosy = async function () {
//   const res = await fetch('https://dog.ceo/api/breeds/list/all');
//   console.log(res);
//   const data = await res.json();
//   console.log(data);
//   dogs = data;
// };

// doggosy();
