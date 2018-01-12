var removeSVG = '<svg version="1.1" id="Layer_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" viewBox="0 0 22 22" style="enable-background:new 0 0 22 22;" xml:space="preserve"> <g> <g> <path class="fill" d="M16.1,3.6h-1.9V3.3c0-1.3-1-2.3-2.3-2.3h-1.7C8.9,1,7.8,2,7.8,3.3v0.2H5.9c-1.3,0-2.3,1-2.3,2.3v1.3 c0,0.5,0.4,0.9,0.9,1v10.5c0,1.3,1,2.3,2.3,2.3h8.5c1.3,0,2.3-1,2.3-2.3V8.2c0.5-0.1,0.9-0.5,0.9-1V5.9 C18.4,4.6,17.4,3.6,16.1,3.6z M9.1,3.3c0-0.6,0.5-1.1,1.1-1.1h1.7c0.6,0,1.1,0.5,1.1,1.1v0.2H9.1V3.3z M16.3,18.7 c0,0.6-0.5,1.1-1.1,1.1H6.7c-0.6,0-1.1-0.5-1.1-1.1V8.2h10.6L16.3,18.7L16.3,18.7z M17.2,7H4.8V5.9c0-0.6,0.5-1.1,1.1-1.1h10.2 c0.6,0,1.1,0.5,1.1,1.1V7z"/> </g> <g> <g> <path class="fill" d="M11,18c-0.4,0-0.6-0.3-0.6-0.6v-6.8c0-0.4,0.3-0.6,0.6-0.6s0.6,0.3,0.6,0.6v6.8C11.6,17.7,11.4,18,11,18z"/> </g> <g> <path class="fill" d="M8,18c-0.4,0-0.6-0.3-0.6-0.6v-6.8C7.4,10.2,7.7,10,8,10c0.4,0,0.6,0.3,0.6,0.6v6.8C8.7,17.7,8.4,18,8,18z" /> </g> <g> <path class="fill" d="M14,18c-0.4,0-0.6-0.3-0.6-0.6v-6.8c0-0.4,0.3-0.6,0.6-0.6c0.4,0,0.6,0.3,0.6,0.6v6.8 C14.6,17.7,14.3,18,14,18z"/> </g> </g> </g></svg>';
var completeSVG = '<svg version="1.1" id="Layer_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" viewBox="0 0 22 22" style="enable-background:new 0 0 22 22;" xml:space="preserve"><g> <path class="st1" d="M9.7,14.4L9.7,14.4c-0.2,0-0.4-0.1-0.5-0.2l-2.7-2.7c-0.3-0.3-0.3-0.8,0-1.1s0.8-0.3,1.1,0l2.1,2.1l4.8-4.8 c0.3-0.3,0.8-0.3,1.1,0s0.3,0.8,0,1.1l-5.3,5.3C10.1,14.3,9.9,14.4,9.7,14.4z"/> </g> </svg>';

//get to-do list data from localstorage, if there is no old data create a new data object
var data = (localStorage.getItem("todolist"))? JSON.parse(localStorage.getItem("todolist")):{
	todo:[],
	completed:[]
};

console.log(data); //testing

//if there is old to-do data, load it into the DOM
if (data.todo.length){
	for(var i=0; i<data.todo.length; i++) {
		addItemDOM(data.todo[i],i+1,false);
	}
}

if (data.completed.length) {
	for(var i=0; i<data.completed.length; i++) {
		addItemDOM(data.completed[i],i+1,true);
	}
}

document.getElementById("addItem").addEventListener("click", addNewItem);

function addNewItem(){
	var inputValue = document.getElementById("itemInput").value;
	var inputDeadline = document.getElementById("DeadlineInput").value;
	if (inputValue && inputDeadline) {
		var ItemData = {item:inputValue, deadline:inputDeadline};
		var posToDOM = checkPosToInsert(ItemData,data.todo);
		addItemDOM(ItemData, posToDOM, false);
		// data.todo.push(ItemData);//push value into data todo array
		updateDataInStorage();//save the updated data object into localStorage
		document.getElementById("itemInput").value = ""; //clear the input text after added the item
		document.getElementById("DeadlineInput").value = "";
	}else{
		alert("Please enter both item and deadline.");
	}
}

function addItemDOM(text, pos, complete) {
	var addTarget = (complete)? document.getElementById("completed"):document.getElementById("todo");

	var li_OfList = document.createElement("li");

	var item_name = document.createElement("p");
	item_name.innerText = text.item;

	var item_deadline = document.createElement("p");
	item_deadline.innerText = text.deadline;
	// item_deadline.innerText = text.deadline.getDate +"-"+ (text.deadline.getMonth+1) +"-"+ text.deadline.getFullYear ;

	var div_OfList = document.createElement("div");
	div_OfList.id = "buttons";

	var remove_button = document.createElement("button");
	remove_button.id = "remove";
	remove_button.addEventListener("click",deleteItem);

	var complete_button = document.createElement("button");
	complete_button.id = "complete";
	complete_button.addEventListener("click",completeItem);

	var tooltip_InRemoveButton = document.createElement("span");
	tooltip_InRemoveButton.classList.add("tooltip");
	tooltip_InRemoveButton.innerText = "Remove Item";

	var tooltip_InCompleteButton = document.createElement("span");
	tooltip_InCompleteButton.classList.add("tooltip");
	tooltip_InCompleteButton.innerText = (complete)? "Mark Incomplete":"Mark Complete";

	remove_button.innerHTML = removeSVG;
	remove_button.appendChild(tooltip_InRemoveButton);
	complete_button.innerHTML = completeSVG;
	complete_button.appendChild(tooltip_InCompleteButton);
	div_OfList.appendChild(remove_button);
	div_OfList.appendChild(complete_button);
	li_OfList.appendChild(item_name);
	li_OfList.appendChild(item_deadline);
	li_OfList.appendChild(div_OfList);

	addTarget.insertBefore(li_OfList,addTarget.children[pos]);
}


// delete item from lists, when the "remove" button is pressed
function deleteItem() {
	var liOfThisItem = this.parentElement.parentElement;
	var ulOfThisItem = liOfThisItem.parentElement;
	var id = ulOfThisItem.id;
	var itemValue = liOfThisItem.children[0].innerText;
	var deadlineValue = liOfThisItem.children[1].innerText;

	console.log(itemValue); //testing
	console.log(deadlineValue);

	//remove the correspnding value from data array(from todo or complete array)
	if(id === "todo") {
		data.todo.splice(data.todo.findIndex(function(a) {return a.item === itemValue;}),1);
	}else {
		data.completed.splice(data.completed.findIndex(function(a) {return a.item === itemValue;}),1);
	}
	//save the updated data object into localStorage
	console.log(data);
	updateDataInStorage();

	ulOfThisItem.removeChild(liOfThisItem);
}

// when "complete" button is pressed, move the item to "Item Completed" or "Item To Do", change the tooltip

function completeItem() {	
	var liOfThisItem = this.parentElement.parentElement;
	var ulOfThisItem = liOfThisItem.parentElement;
	var id = ulOfThisItem.id;
	var itemValue = liOfThisItem.children[0].innerText;
	var deadlineValue = liOfThisItem.children[1].innerText;
	var posToDOM;
	console.log(itemValue); //testing
	console.log(deadlineValue);
	
	//remove the correspnding value from data array(from todo or complete array)
	//push the value into another array
	if(id === "todo") {
		//console.log(data.todo.findIndex(function(a) {return a.item === itemValue;}));
		data.todo.splice(data.todo.findIndex(function(a) {return a.item === itemValue;}),1);
		// data.completed.push({item:itemValue, deadline:deadlineValue});
		posToDOM = checkPosToInsert({item:itemValue, deadline:deadlineValue},data.completed);
	}else {
		//console.log(data.completed.findIndex(function(a) {return a.item === itemValue;}));
		data.completed.splice(data.completed.findIndex(function(a) {return a.item === itemValue;}),1);
		posToDOM = checkPosToInsert({item:itemValue, deadline:deadlineValue},data.todo);
	}
	//save the updated data object into localStorage
	console.log(data);
	updateDataInStorage();
	//change the tooltip
	this.lastChild.innerText = (id === "todo")? "Mark Incomplete":"Mark Complete";
	var moveTo = (id === "todo")? document.getElementById("completed"):document.getElementById("todo");
	moveTo.insertBefore(liOfThisItem,moveTo.children[posToDOM]);
	
}

//function to store data object into local storage
function updateDataInStorage() {
	localStorage.setItem("todolist", JSON.stringify(data));
}

//the item should be ordered in ascending of deadline
//everytime add/move an item the position have to be determined
function checkPosToInsert(item,array) {
	var pos;
	var arrLen;
	array.push(item);
	arrLen = array.length;
	array.sort(function(a,b) {
		return (new Date(a.deadline) - new Date(b.deadline));
	});
	console.log(data);
	pos = array.indexOf(item);
	return pos+1;
}



















