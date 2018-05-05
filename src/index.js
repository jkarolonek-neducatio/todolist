import './main.scss'
import 'whatwg-fetch'
import ListItem from "./list-item";

document.addEventListener("DOMContentLoaded", function(event) {
  const addButton = document.getElementById('add-item');
  const listContainer = document.getElementById('list-container');
  const list = document.createElement("UL");
  let itemInput = document.getElementById('item-input');
  
  listContainer.appendChild(list);
  let listObjects = [];


  fetch('http://localhost:8080/api/todos')
  .then(function(response) {
    return response.json();
  })
  .then(function(data) {
    for (let i = 0; i < data.length; i++) {
      let listElement = new ListItem(data[i].title, data[i].completed, data[i].id);
      listObjects.push(listElement);
      listElement.create(list, listObjects);
    }
  });

  function addListItem() {
    let itemValue = itemInput.value;
    let listElement = new ListItem(itemValue, false);
    listObjects.push(listElement);

    listElement.create(list, listObjects);
    fetch('http://localhost:8080/api/todos', {
      method: 'post',
      body: JSON.stringify(listElement)
    })
    .then(function(response) {
      return response.json();
    })
    .then(res => listElement.id = res.id)

    itemInput.value = '';
  }

  addButton.addEventListener('click', (event) => {
    addListItem();
  });

  itemInput.addEventListener('keyup', (key) => {
    if (key.keyCode === 13) {
      addListItem();
    }
  });
});