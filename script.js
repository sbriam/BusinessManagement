document.addEventListener("DOMContentLoaded", init)
const URL_API = 'https://localhost:7270/api/'

var customers = []

function init() {
    search()
}

function add() {
    clean()
    openForm()
}

function openForm() {
    htmlModal = document.getElementById("modal");
    htmlModal.setAttribute("class", "modale opened")
}

function closeModal() {
    htmlModal = document.getElementById("modal");
    htmlModal.setAttribute("class", "modale")
} 


async function search() {
    var url = URL_API + 'customer'
    var response = await fetch(url, {
        "method": 'GET',
        "headers": {
            "Content-Type": 'application/json'
        }
    })
    customers = await response.json();

    var html = ''
    for (let customer of customers) {
        var row = `<tr>
        <td>${customer.firstName}</td>
        <td>${customer.lastName}</td>
        <td>${customer.email}</td>
        <td>${customer.phone}</td> 
        <td>
           <a href="#" onclick="edit(${customer.id})" class="myButton">Edit</a>
           <a href="#" onclick="remove(${customer.id})"class="btnDelete">Delete</a>
        </td>   
    </tr>`
    html = html + row;
    }

document.querySelector('#customers > tbody').outerHTML = html
}


function edit(id) {
    openForm()
   var customer = customers.find(x => x.id == id)
    document.getElementById('txtId').value = customer.id
    document.getElementById('txtFirstname').value = customer.firstName
    document.getElementById('txtLastname').value = customer.lastName
    document.getElementById('txtEmail').value = customer.email
    document.getElementById('txtPhone').value = customer.phone 
    document.getElementById('txtAddress').value = customer.address
}

async function remove(id) {
    answer = confirm('are you sure to remove it?') 
    if (answer) {
        var url = URL_API + 'customer/' + id
        await fetch(url, {
            "method": 'DELETE',
            "headers": {
                "Content-Type": 'application/json'
            }
        })
        window.location.reload();
    }
}

function clean(){
    document.getElementById('txtId').value = 
    document.getElementById('txtFirstname').value = ''
    document.getElementById('txtLastname').value = ''
    document.getElementById('txtEmail').value = ''
    document.getElementById('txtPhone').value = ''
    document.getElementById('txtAddress').value = ''
}

async function save() {
    var data = {
        "Address": document.getElementById('txtAddress').value, 
        "Email": document.getElementById('txtEmail').value,
        "Firstname": document.getElementById('txtFirstname').value,
        "Lastname": document.getElementById('txtLastname').value,
        "Phone": document.getElementById('txtPhone').value
    }

    var id = document.getElementById('txtId').value 
    if (id != '') {
        data.id = id
    }

        var url = URL_API + 'customer/'
        await fetch(url, {
            "method": id != ''? 'PUT' : 'POST',
            "body": JSON.stringify(data),
            "headers": {
                "Content-Type": 'application/json'
            }
        })
        window.location.reload();
    }