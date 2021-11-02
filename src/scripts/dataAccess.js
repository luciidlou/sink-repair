
const mainContainer = document.querySelector("#container")


const applicationState = {
    requests: [],
    completions: [],
    plumbers: []
}

const API = "http://localhost:8088"

// The fetch function fetches the data from the API (.json file)
// We are using a second .then method to store that data in our applicationState object
export const fetchData = () => {
    fetch(`${API}/requests`)
        .then(response => response.json())
        .then(
            (serviceRequests) => {
                // Store the external state in application state
                applicationState.requests = serviceRequests
            }
        )
    fetch(`${API}/completions`)
        .then(response => response.json())
        .then(
            (completions) => {
                // Store the external state in application state
                applicationState.completions = completions
            }
        )
    return fetch(`${API}/plumbers`)
        .then(response => response.json())
        .then(
            (plumbers) => {
                // Store the external state in application state
                applicationState.plumbers = plumbers
            }
        )
}

// GET FUNCTIONS (called when we want to access COPIES of our data)
export const getRequests = () => {
    const sortedRequests = applicationState.requests.sort((a, b) => {
        return new Date(b.neededBy) - new Date(a.neededBy)
    })
    return sortedRequests.map(request => ({ ...request }))
}
export const getPlumbers = () => {
    return applicationState.plumbers.map(plumber => ({ ...plumber }))
}
export const getCompletions = () => {
    return applicationState.completions.map(completion => ({ ...completion }))
}

// --- HTTP REQUEST METHODS
// GET	Please give me this resource.
// POST	Please create something new.
// PUT	Please modify an existing resource.
// DELETE	Please delete an existing.

// This function performs the POST request in order to save the request object to the API (the request object we want to POST is passed in as an argument to the function)
export const sendRequest = (userServiceRequest) => {
    const fetchOptions = {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(userServiceRequest)
    }
    // We then return a fetch call on the array from the API that we want the user input data to. Pass in our newly decared fetchOptions object as the second argument in the fetch call
    return fetch(`${API}/requests`, fetchOptions)
        .then(response => response.json())
        .then(() => {
            mainContainer.dispatchEvent(new CustomEvent("stateChanged"))
        })
}

// This function uses the DELETE request to remove the object with the id specified in the argument
export const deleteRequest = (id) => {
    return fetch(`${API}/requests/${id}`, { method: "DELETE" })
        .then(
            () => {
                mainContainer.dispatchEvent(new CustomEvent("stateChanged"))
            }
        )
}




// saveCompletion() - This will perform the POST request to save the completion object to the API
export const saveCompletion = (userServiceRequest) => {
    const fetchOptions = {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(userServiceRequest)
    }


    return fetch(`${API}/completions`, fetchOptions)
        .then(response => response.json())
        .then(() => {
            mainContainer.dispatchEvent(new CustomEvent("stateChanged"))
        })
}


