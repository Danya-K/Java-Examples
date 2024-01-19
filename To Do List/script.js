const inputBox = document.getElementById("input-box");
const listContainer = document.getElementById("list-container")

//Making add button so it can add new checks to the list
function addCheck() {
    if(inputBox.value === ''){
        alert("Write down the Task you want to do for later")
    }
    else{
        let li = document.createElement("li"); //Creates element called 'li' and storing in it in 'li' variable
        li.innerHTML = inputBox.value; //Adds text in the variable li
        listContainer.appendChild(li); //Text will be displayed in the 'listContainer'
        let span = document.createElement("span");
        span.innerHTML = "\u00d7" //Will add cross icon in the 'span' element
        li.appendChild(span); 
    }
    inputBox.value = "" //Clears the input field
}

listContainer.addEventListener("click", function (e) { //Assigns what happens when click on the elements
    if (e.target.tagName === "LI") { //If clicked on the Li 
        e.target.classList.toggle("checked"); //The text will be marked
    } else if (e.target.tagName === "SPAN") { //If clicked on cross 
        e.target.parentElement.remove(); //Will remove the section
    }
}, false);

