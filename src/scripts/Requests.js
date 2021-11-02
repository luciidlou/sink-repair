import { deleteRequest, getRequests, getPlumbers, saveCompletion, getCompletions } from "./dataAccess.js"


// In the following code, you will need to define the function that will be passed to the map() method.

// The function you write will convert each service request object into HTML representations. Since it is 
// wrapped with a <ul> element, make each one an <li> element showing only the description of the request to start.

// For example, if you write a function named convertRequestToListElement, then you would update the code below 
// to requests.map(convertRequestToListElement).


const convertRequestToListElement = (request) => {
    const plumbers = getPlumbers()
    const completions = getCompletions()

    const foundCompletion = completions.find(completion => {
        const requestId = completion.requestId
        return parseInt(requestId) === request.id
    })

    if (foundCompletion) {
        return `<li class="list-item__completed">
                ${request.description}
                <button class="request__delete" id="request--${request.id}">Delete</button>
                </li>
        `
    }
    else {
        return `<li class="list-item__request">
                ${request.description}
                <select class="plumbers" id="plumbers">
                <option value="">Choose</option>
                ${plumbers.map(
                    plumber => {
                        return `<option value="${request.id}--${plumber.id}">${plumber.name}</option>`
                    }
                    ).join("")
                }
                </select>
                <button class="request__delete" id="request--${request.id}">Delete</button>
                </li>
        `
    }
}

export const Requests = () => {
    const requests = getRequests()
    let html = `
    <ul class="list-container">
    ${requests.map(convertRequestToListElement).join("")
        }
    </ul>
    `

    return html
}


const mainContainer = document.querySelector("#container")

mainContainer.addEventListener("click", click => {
    if (click.target.id.startsWith("request--")) {
        const [, requestId] = click.target.id.split("--")
        deleteRequest(parseInt(requestId))
    }
})


mainContainer.addEventListener(
    "change",
    (event) => {
        const date = new Date()
        if (event.target.id === "plumbers") {
            const [requestId, plumberId] = event.target.value.split("--")

            /*
                This object should have 3 properties
                   1. requestId
                   2. plumberId
                   3. date_created
            */
            const completion = {
                requestId: requestId,
                plumberId: plumberId,
                date_created: date
            }

            /*
                Invoke the function that performs the POST request
                to the `completions` resource for your API. Send the
                completion object as a parameter.
             */
            saveCompletion(completion)
        }
    }
)




