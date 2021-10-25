import { deleteRequest, getRequests } from "./dataAccess.js"


// In the following code, you will need to define the function that will be passed to the map() method.

// The function you write will convert each service request object into HTML representations. Since it is 
// wrapped with a <ul> element, make each one an <li> element showing only the description of the request to start.

// For example, if you write a function named convertRequestToListElement, then you would update the code below 
// to requests.map(convertRequestToListElement).


const convertRequestToListElement = (array) => {
    // const requests = getRequests()
    return `<li class="list-item">
            Request # ${array.id} needs to be serviced at "${array.address}" has a budget of $${array.budget}, and needs to be done by ${array.neededBy}.
            <button class="request__delete" id="request--${array.id}">Delete</button>
            </li>
    `
}

export const Requests = () => {
    const requests = getRequests()
    
    let html = `
    <ul class="list-container">
    ${
        requests.map(convertRequestToListElement)
    }
    </ul>
    `
    
    return html
}

const mainContainer = document.querySelector("#container")

mainContainer.addEventListener("click", click => {
    if (click.target.id.startsWith("request--")) {
        const [,requestId] = click.target.id.split("--")
        deleteRequest(parseInt(requestId))
    }
})
