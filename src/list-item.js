class ListItem {
    constructor(liValue, isDone = false) {
        this.liValue = liValue;
        this.isDone = isDone;
    }
    create(parent, array) {
        let itemView = document.createElement("LI");
        let remover =  document.createElement("BUTTON");
        let doneCheck = document.createElement('input');
        doneCheck.type = "checkbox";
        remover.setAttribute("class", "remover");
        parent.appendChild(itemView);
        itemView.innerHTML = this.liValue;
        itemView.appendChild(remover);
        itemView.appendChild(doneCheck);
        remover.innerHTML = "🗙";
        const element = array[array.length - 1];

        const removeElement = function(event) {
            parent.removeChild(itemView);
            array.splice(array.indexOf(element), 1);
            remover.removeEventListener('click', removeElement);
            doneCheck.removeEventListener('change', checkChange);
            console.log(array);
        }

        const checkChange = function(event) {
            array[array.indexOf(element)].isDone = !array[array.indexOf(element)].isDone;
            console.log(array);
        }

        remover.addEventListener('click', removeElement);

        doneCheck.addEventListener('change', checkChange);
    }
}

export default ListItem