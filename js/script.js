// creat year for footer
let rightNow = new Date();
let year = rightNow.getFullYear();
document.getElementById("year").innerText = year;

// Create function for get input values
function getInputValues(id) {
    return document.getElementById(id).value;

}
// create function for randomid
function getRandomId() {
    return Math.random().toString(36).slice(2);
}
// create function for output
function showOutput(output) {
    document.getElementById("output").innerHTML = output;
}
// create function for clear output
function clearOutput() {
    document.getElementById("output").innerHTML = "";
}

// Email format for email test get from google
let emailFormat = /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9_\.\-])+\.)+([a-zA-Z0-9]{2,4})+$/;

// Array
let users = [];


// create constructor

function User(firstName, lastName, email, dob, status, role) {
    this.firstName = firstName;
    this.lastName = lastName;
    this.email = email;
    this.dob = dob;
    this.status = status;
    this.role = role;
    this.id = getRandomId();
    this.dateCreated = new Date().getTime();
    // this.calculateAge = function (){

    //     // calculate age from birthday also put in this function and we use prototype
    // }

}

User.prototype.calculateAge = function () {

    let dob = new Date(this.dob);
    let currentDate = new Date();

    let month_diff = currentDate.getTime() - dob.getTime();
    let age_dt = new Date(month_diff);

    let year = age_dt.getFullYear();
    let age = Math.abs(year - 1970);

    return age;
}



function handleSubmit() {

    event.preventDefault();


    let firstName = getInputValues("firstName");
    let lastName = getInputValues("lastName");
    let email = getInputValues("email");
    let dob = getInputValues("dob");

    firstName = firstName.trim();
    lastName = lastName.trim();
    email = email.trim();

    if (firstName.length < 3) {
        showNotification("Please enter your first name correctly.", "error");
        return;
    }
    //    if(lastName.length < 3){
    //     alert("Enter the first name correctly")
    //    }
    if (!emailFormat.test(email)) {
        showNotification("Please enter your email correctly.", "error");
        return;
    }
    if (!dob) {
        showNotification("Please enter your date of birth.", "error");
        return;
    }


    let user = new User(firstName, lastName, email, dob, "active", "student");

    users.push(user)
    showNotification("A new user has been successfully added.", "success");
    showTable();

    // object
    //     let user = {
    //         firstName,      // property and value name same
    //         lastName,        // property and value name same
    //         email,          // property and value name same
    //         dob,             // property and value name same
    //     }
    // another data add in object
    //     user.id = getRandomId();
    //     user.datecreated = new Date().getTime();
    //     user.status = "active";
    //     user.role = "student";
    //     console.log(user)
}


// calculate age from birthday date
// function calculateAge() {
//     let dob = new Date(dob);
//     let currentDate = new Date();

//     let month_diff = currentDate.getTime() - dob.getTime();
//     let age_dt = new Date(month_diff);

//     let year = age_dt.getFullYear();
//     let age = Math.abs(year - 1970);

//     return age;
// }

// show image
// function showImage(){
//     <div class="modal" tabindex="-1" id="myModel">
//   <div class="modal-dialog">
//     <div class="modal-content">
//       <div class="modal-header">
//         <h5 class="modal-title">Modal title</h5>
//         <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
//       </div>
//       <div class="modal-body">
//         <p>Modal body text goes here.</p>
//       </div>
//       <div class="modal-footer">
//         <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
//         <button type="button" class="btn btn-primary">Save changes</button>
//       </div>
//     </div>
//   </div>
// </div> 
// }
// show output table function
function showTable() {

    if (!users.length) {
        showNotification("There is not a single user available.", "error");
        return;
    }

    let tableStartingCode = " <div class='table-responsive'></div><table class='table'>"
    let tableHead = "<thead><tr><th>#</th><th>First Name</th><th>Last Name</th><th>Email</th><th>Date of Birth</th><th>Age</th></tr></thead>"
    let tableEndingCode = "</table></div>"

    let tableBody = " ";

    for (let i = 0; i < users.length; i++) {
        tableBody += "<tr><th>" + (i + 1) + "</th><td>" + users[i].firstName + "</td><td>" + users[i].lastName + "</td><td>" + users[i].email + "</td><td>" + users[i].dob + "</td><td>" + users[i].calculateAge() + "</td></tr>"
    }

    let table = tableStartingCode + tableHead + "<tbody>" + tableBody + "</tbody>" + tableEndingCode
    // console.log(table);
    showOutput(table);
}

// print user in console
function printUsers() {

    if (!users.length) {
        showNotification("There is not a single user available.", "error")
    }

    // for(let i = 2; i < 10; i++){
    //     let user = users[i];
    //     console.log(user);
    // }

    for (let user of users) {
        console.log(user);
    }
}

// Create function for notify
function showNotification(msg, type) {

    let color;

    switch (type) {
        case "success":
            color = "linear-gradient(to left, #1d976c, #93f9b9)"
            break;
        case "error":
            color = "linear-gradient(to top, #ed213a, #93291e)"
            break;
        default:
            color = "#000"
            break;
    }

    Toastify({
        text: msg,
        duration: 3000,
        // destination: "https://github.com/apvarun/toastify-js",
        // newWindow: true,
        close: true,
        gravity: "top", // `top` or `bottom`
        position: "center", // `left`, `center` or `right`
        stopOnFocus: true, // Prevents dismissing of toast on hover
        style: {
            background: color,
        },
        // onClick: function () { } // Callback after click
    }).showToast();
}

// clear output result

function clearOutputBtn() {

    let outputBox = document.getElementById("output").innerHTML;

    if (!outputBox.length) {
        showNotification("it's already empty.", "error")
    } else {
        clearOutput();
        showNotification("Output / Result box has been cleard.", "success")
    }
}