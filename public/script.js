'use strict';

const formElement = document.getElementById('form');
const inputElement = document.getElementById('prompt');
const responseElement = document.querySelector('.response__text');
const buttonElement = document.querySelector('.prompt__btn');
const messagesElement = document.querySelector('.messages');
const baseURL = 'http://127.0.0.1:3000/';

document.addEventListener('DOMContentLoaded', () => {
  fetch('/api')
    .then(response => {
      return response.json();
    })
    .then(data => {
      const {response} = data;
      let html = `
      <div class="response message message--ai">
        <p class="response__text">${response}</p>
      </div>`;
      console.log(data);
      messagesElement.insertAdjacentHTML('beforeend', html);
      //responseElement.textContent = response;
    })
    .catch(error => {
      console.error(error);
    });
});

async function askQuestion(question) {
  await fetch('/chat', {
    method: 'POST',
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      prompt: question
    })
  })
  .then(response => response.json())
  .then(data => {
    let promptHtml = `
    <div class="response message message--human">
      <p class="response__text">${question}</p>
    </div>`;
    let responseHtml = `
    <div class="response message message--ai">
      <p class="response__text">${data.message.response}</p>
      <div class="triangle triangle--left"></div>
    </div>`;
    messagesElement.insertAdjacentHTML('beforeend', promptHtml);
    messagesElement.insertAdjacentHTML('beforeend', responseHtml);
    //responseElement.textContent += data.message.response + '\n';
  });
}

buttonElement.addEventListener('click', (e) => {
  e.preventDefault();
  if (inputElement.value === '') {
    alert("El campo no puede estar vacío");
  } else {
    askQuestion(inputElement.value);
    formElement.reset();
  }
});
