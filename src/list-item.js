class ListItem {
    constructor(title, completed = false, id) {
        this.title = title;
        this.completed = completed;
        this.id = id;
    }
    create(parent, arr) {
        let itemView = document.createElement("LI");
        let remover =  document.createElement("BUTTON");
        let doneCheck = document.createElement('input');
        let listItemInput = document.createElement('input');
        let editButton = document.createElement('button');
        doneCheck.type = "checkbox";
        listItemInput.type = "text";
        remover.setAttribute("class", "remover");
        listItemInput.setAttribute("class", "list-item-input");
        parent.appendChild(itemView);
        itemView.appendChild(listItemInput);
        listItemInput.value = this.title;
        itemView.appendChild(doneCheck);
        itemView.appendChild(remover);
        remover.innerHTML = "🗙";
        doneCheck.checked = this.completed;

        const element = arr[arr.length - 1];


        
        const removeElement = function(event) {
            fetch(`/api/todos/${element.id}`, {
                method: 'delete',
            })
            .then(function(response) {
                return response.json();
            })
            .then(function(data) {
                parent.removeChild(itemView);
                arr.splice(arr.indexOf(element), 1);
                remover.removeEventListener('click', removeElement);
                doneCheck.removeEventListener('change', checkChange);
                listItemInput.removeEventListener('input', valChange);
            });
        }

        const checkChange = function(event) {
            event.preventDefault()
            arr[arr.indexOf(element)].completed = !arr[arr.indexOf(element)].completed;
            fetch(`/api/todos/${element.id}`, {
                method: 'put',
                body: JSON.stringify(arr[arr.indexOf(element)])
            })
            .then(function(response) {
                return response.json();
            }).catch(function() {
                doneCheck.checked = !element.completed;
                arr[arr.indexOf(element)].completed = !arr[arr.indexOf(element)].completed;
            });
        }

        const valChange = function(event) {
            let initialVal = element.title;
            element.title = listItemInput.value;
            fetch(`/api/todos/${element.id}`, {
                method: 'put',
                body: JSON.stringify(arr[arr.indexOf(element)])
            })
            .then(function(response) {
                return response.json();
            })
            .catch(function() {
                element.title = initialVal;
                listItemInput.value = initialVal;
            });
        }

        remover.addEventListener('click', removeElement);

        doneCheck.addEventListener('change', checkChange);

        listItemInput.addEventListener('blur', valChange);

        listItemInput.addEventListener('keyup', (key) => {
            if (key.keyCode === 13) {
              valChange;
              listItemInput.blur();
            }
          });
    }
}

export default ListItem