import { getCompletions, saveCompletion } from "./dataAccess.js"

const convertCompletionToListElement = (array) => {
    // const plumbers = getPlumbers()
    return `<li class="list-item">
            Request # ${array.id} is described as "${array.description}". It needs to be serviced at "${array.address}". It has a budget of $${array.budget}, and needs to be done by ${array.neededBy}.
            <button class="request__delete" id="request--${array.id}">Delete</button>
            </li>
    `
}

export const Completions = () => {
    const completions = getCompletions()
    let html = `
    <ul class="list-container">
        ${completions.map(convertCompletionToListElement)
        }
    </ul>
    `

    return html
}

const mainContainer = document.querySelector("#container")

mainContainer.addEventListener(
    "change",
    (event) => {
        const date = new Date(String)
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
