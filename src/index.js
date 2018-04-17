import './main.scss'
import 'whatwg-fetch'
import ListItem from "./list-item";

document.addEventListener("DOMContentLoaded", function(event) {
  const addButton = document.getElementById('add-item');
  const listContainer = document.getElementById('list-container');
  const list = document.createElement("UL");
  
  listContainer.appendChild(list);
  let externalArray = [{liValue: "item1", isDone: false},{liValue: "item2", isDone: true}];
  let listObjects = [];

  for (let i = 0; i < externalArray.length; i++) {
    let listElement = new ListItem(externalArray[i].liValue, externalArray[i].isDone);
    listObjects.push(listElement);
    listElement.create(list, listObjects);
  }
  console.log(listObjects);

  function addListItem() {
    let itemValue = document.getElementById('item-input').value;
    let listElement = new ListItem(itemValue, false);
    listObjects.push(listElement);

    listElement.create(list, listObjects);
  }

  addButton.addEventListener('click', function(event) {
    addListItem();
  });
});