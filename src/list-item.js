class ListItem {
    constructor(liValue, isDone = false) {
        this.liValue = liValue;
        this.isDone = isDone;
    }
    create(parent, array) {
        let itemView = document.createElement("LI");
        let remover =  document.createElement("BUTTON");
        remover.setAttribute("class", "remover");
        parent.appendChild(itemView);
        itemView.innerHTML = this.liValue;
        itemView.appendChild(remover);
        remover.innerHTML = "🗙";
        remover.addEventListener('click', function(event) {
            parent.removeChild(itemView);
            array.splice(array.indexOf(itemView, 1));
            console.log(array);
        });
    }
}

export default ListItem