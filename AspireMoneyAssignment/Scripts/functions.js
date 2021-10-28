// Javascript
// Declaring variables

var name;
var email;
var phone;
var city;
var code;
var range;

// Getting values of variables
name = document.getElementById("nameID").value;
email = document.getElementById("emailID").value;
phone = document.getElementById("phoneID").value;
city = document.getElementById("cityID").value;
code = document.getElementById("codeID").value;
range = document.getElementById("customRange1").value;

//update name 
updateName = document.getElementById("upDateNameID").value;

// Onchange functions to get the current value of variables

let check = false;
function nameOnChange(e) {
    name = e
}
function emailOnChange(e) {
    email = e
}
function phoneOnChange(e) {
    phone = e
}
function cityOnChange(e) {
    city = e
}
function codeOnChange(e) {
    code = e
}
function upDateOnChange(e) {
    updateName = e
}
//Declaring range variable, getting and displaying current value for range
var slider =  document.getElementById("customRange1");
var output = document.getElementById("demo");
output.innerHTML = "$ " + slider.value; // Display the default slider value
// Update the current slider value (each time you drag the slider handle)
slider.oninput = function () {
    output.innerHTML = "$ " + this.value;
    range = output.innerHTML;
}

var apiData = [];

//onCLick Edit
var indexId;

function onClickEdit() {
    $("#myModal").modal()
    indexId = event.path[2].cells[6].innerText;
    console.log("row index", event.path[2].cells[6].innerText)
};

//modal Function

function modalUpdate() {

    var obj = {
        todo_id: indexId,
        name: updateName
    };

    //POST API options
    const options = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(obj),
    };

    //fetch method to post data to mongodb 
    fetch('https://us-east-1.aws.webhooks.mongodb-realm.com/api/client/v2.0/app/testing-skqpg/service/myProfileApi/incoming_webhook/apiEdit', options)
        .then(data => {
            if (!data.ok) {
                throw Error(data.status);
            }
            return data.json();
        }).then(registered => {
            console.log(registered);

        }).catch(e => {
            console.log(e);
        });
    document.getElementById("upDateNameID").value = "";
}

//Delete function
function deleteModal(event) {

    var obj = {
        todo_id: indexId,
    };

    //POST API options
    const options = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(obj),
    };

    //fetch method to post data to mongodb 
    fetch('https://us-east-1.aws.webhooks.mongodb-realm.com/api/client/v2.0/app/testing-skqpg/service/myProfileApi/incoming_webhook/delete', options)
        .then(data => {
            if (!data.ok) {
                throw Error(data.status);
            }
            return data.json();
        }).then(registered => {
            console.log(registered);

        }).catch(e => {
            console.log(e);
        });

}
// Function For Edit button

function apiTest() {
    const api_url = "https://us-east-1.aws.webhooks.mongodb-realm.com/api/client/v2.0/app/testing-skqpg/service/myProfileApi/incoming_webhook/api";

    // Defining async function
    async function getapi(api_url) {

        // Storing response
        const response = await fetch(api_url);

        // Storing data in form of JSON
        var data = await response.json();
        apiData.push(data);
        console.log(data);
        var temp = "";
        data.forEach((itemData) => {
            temp += "<tr>";
            temp += "<td>" + itemData.name + "</td>";
            temp += "<td>" + itemData.email + "</td>";
            temp += "<td>" + itemData.phone + "</td>";
            temp += "<td>" + itemData.code + "</td>";
            temp += "<td>" + itemData.cite + "</td>"; 
            temp += "<td>" + itemData.range + "</td>";
            temp += "<td>" + itemData._id.$oid; + "</td>";
            temp += "<td> <button onClick='onClickEdit()' data-toggle='modal' data-target='#exampleModal' class='button'> Edit </button></td>";
            temp += "<td> <button onClick='onClickEdit()' data-toggle='modal' data-target='#exampleModal2' class='button'> Delete </button></td></tr>";
        });
        document.getElementById('data').innerHTML = temp;
        if (response) {
            hideloader();
        }
        show(data);
    }
    // Calling that async function
    getapi(api_url);

}

console.log("data", apiData);

// Function to Use POST API
function onClickPost() {
  //Declaring variables to post

    if (name === "" || email === "" || phone === "" || city === "" || code === "") {
        //Error Message
        return document.getElementById("checkTextID").innerHTML = "Dont Leave Any Field Blank";
    }

    else {
        //Remove Error Message
        document.getElementById("checkTextID").innerHTML = "";
    const registered = {
        name: name,
        email: email,
        phone: phone,
        cite: city,
        code: code,
        range: range,
    };
    //POST API options
    const options = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(registered),
    };

    //fetch method to post data to mongodb 
    fetch('https://us-east-1.aws.webhooks.mongodb-realm.com/api/client/v2.0/app/testing-skqpg/service/myProfileApi/incoming_webhook/postApi', options)
        .then(data => {
            if (!data.ok) {
                throw Error(data.status);
            }
            return data.json();
        }).then(registered => {
            console.log(registered);
           
        }).catch(e => {
            console.log(e);
        });

    document.getElementById("nameID").value = "";
    document.getElementById("nameID").value = "";
    document.getElementById("emailID").value = "";
    document.getElementById("phoneID").value = "";
    document.getElementById("cityID").value = "";
    document.getElementById("codeID").value = "";
        document.getElementById("customRange1").value = "25000";
        output.innerHTML = "$ 25000";
    }



}
apiTest();


