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
        remover.addEventListener('click', function(event) {
            parent.removeChild(itemView);
            array.splice(array.indexOf(itemView, 1));
            console.log(array);
        });
        doneCheck.addEventListener('click', function(event) {
        });
    }
}

export default ListItem