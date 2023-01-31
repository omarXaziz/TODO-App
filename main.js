//targeted by Id and stored in a variable
let form = document.getElementById("form");
let tittle = document.getElementById("textInput");
let errorMsg = document.getElementById("errorMsg");
let post = document.getElementById("entries");
let date = document.getElementById("date");
let description = document.getElementById("description");
let addBtn = document.getElementById("addBtn")
//

//stopping the default feature of the form,so that it stays onthe  screen untill users closes it
form.addEventListener("submit", (e) => {
    e.preventDefault();     //this function stops the feature.
    formValidation(); 
});
//


//checking if the form is empty or not.
let formValidation = (e) => {
    if (tittle.value === "") {
        errorMsg.innerHTML = "Form can't be empty";     //if form is empty.
    } else {
        acceptData();       
        addBtn.setAttribute("data-bs-dismiss", "modal");    //'closeBtn' attribute is put into 'addBtn',
        //so that form closes automatically after clicking 'Add'.
    }
}
//

//an array named 'data' is declared.
let data = [];
let acceptData = () => {
    data.push({
        text : tittle.value,
        date : date.value,
        description : description.value
        }); //pushing the data in the arrray an object. 'text','date',description' are the attributes.

    localStorage.setItem("data" , JSON.stringify(data)); //stored data in the local storage.
    createPost();
}
//

//creating the posts 
let createPost = () => {
    data.map((x,y)=>{   //data mapped. x is index and y is an id.
        post.innerHTML = "";
        return post.innerHTML += //the whole post is created in the screen and 'edit','delete' buttons with actions.
        `<div id="y"> 
            <p class="fw-bold" >${x.text}</p>
            <p class="text-secondary small" >${x.date}</p>
            <p>${x.description}</p>

            <span id="btn">
                <p id="btn">
                    <i data-bs-toggle="modal" data-bs-target="form" onClick = "editPost(this)" class="fa-solid fa-pen-to-square"></i>
                    <i onClick = "deletePost(this)" class="fa-solid fa-trash"></i>
                </p>
            </span>
        </div>`
    });
    
        formReset();
}
//

//resting all the values on the screen
let formReset = ()=>{
    tittle.value = "";
    date.value = "";
    description.value = "";
}
//


//delete post when deleteBtn is clicked
let deletePost = (e) =>{
    e.parentElement.parentElement.parentElement.remove(); //traversing to top where data is stored and remove it.
    data.splice(e.parentElement.parentElement.parentElement.id , 1); //this functions removes element from array ,'1' means number of unit.
    localStorage.setItem("data" , JSON.stringify(data));    //updating the array,so that deleted element is removed
}
//


//edit an existing post
let editPost = (e) =>{
    let selectedTask = e.parentElement.parentElement.parentElement; //traversing to the top where data is stored.
    tittle.value = selectedTask.children[0].innerHTML; //setting the data into the form from index 0.
    date.value = selectedTask.children[1].innerHTML;  //setting the data into the form from index 1.
    description.value = selectedTask.children[2].innerHTML;  //setting the data into the form from index 2.

    selectedTask.remove();  //the previous version is deleted.
}
//

//es07 funtion which retrives data.
(()=>{
    data = JSON.parse(localStorage.getItem("data")); //retriving data from the local storage and again store it into the 'data' array.
    createPost(); //displays posts on the screen ,so that after refresh it doesn't dissapear. 
})()
//
