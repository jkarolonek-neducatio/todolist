class ListItem {
    constructor(title, completed = false, id) {
        this.title = title;
        this.completed = completed;
        this.id = id;
    }
    create(parent, array) {
        let itemView = document.createElement("LI");
        let remover =  document.createElement("BUTTON");
        let doneCheck = document.createElement('input');
        let innerSpan = document.createElement('span');
        doneCheck.type = "checkbox";
        remover.setAttribute("class", "remover");
        parent.appendChild(itemView);
        itemView.appendChild(innerSpan);
        innerSpan.innerHTML = this.title;
        itemView.appendChild(doneCheck);
        itemView.appendChild(remover);
        remover.innerHTML = "🗙";
        doneCheck.checked = this.completed;

        const element = array[array.length - 1];

        const removeElement = function(event) {
            parent.removeChild(itemView);
            array.splice(array.indexOf(element), 1);
            remover.removeEventListener('click', removeElement);
            doneCheck.removeEventListener('change', checkChange);
            console.log(array);
            fetch(`http://localhost:8080/api/todos/${element.id}`, {
                method: 'delete',
            })
            .then(function(response) {
                return response.json();
            })
        }

        const checkChange = function(event) {
            array[array.indexOf(element)].completed = !array[array.indexOf(element)].completed;
            console.log(array);
        }

        remover.addEventListener('click', removeElement);

        doneCheck.addEventListener('change', checkChange);
    }
}

export default ListItem