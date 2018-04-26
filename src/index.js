import './main.scss'
import 'whatwg-fetch'
import ListItem from "./list-item";

document.addEventListener("DOMContentLoaded", function(event) {
  const addButton = document.getElementById('add-item');
  const listContainer = document.getElementById('list-container');
  const list = document.createElement("UL");
  
  listContainer.appendChild(list);
  let listObjects = [];


  fetch('http://localhost:8080/api/todos')
  .then(function(response) {
    return response.json();
  })
  .then(function(data) {
    console.log(data);
    for (let i = 0; i < data.length; i++) {
      let listElement = new ListItem(data[i].title, data[i].completed, data[i].id);
      listObjects.push(listElement);
      listElement.create(list, listObjects);
    }
  });

  function addListItem() {
    let itemValue = document.getElementById('item-input').value;
    let listElement = new ListItem(itemValue, false);
    listObjects.push(listElement);

    listElement.create(list, listObjects);
    fetch('http://localhost:8080/api/todos', {
      method: 'post',
      body: JSON.stringify(listElement)
    })
    .then(function(response) {
      console.log(response);
      return response.json().then(res => console.log(res));
    })
  }

  addButton.addEventListener('click', function(event) {
    addListItem();
    console.log(listObjects);
  });
});