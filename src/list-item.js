class ListItem {
    constructor(liValue, isDone = false) {
        this.liValue = liValue;
        this.isDone = isDone;
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
        innerSpan.innerHTML = this.liValue;
        itemView.appendChild(doneCheck);
        itemView.appendChild(remover);
        remover.innerHTML = "🗙";
        doneCheck.checked = this.isDone;

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