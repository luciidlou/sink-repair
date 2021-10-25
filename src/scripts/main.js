import { fetchRequests } from "./dataAccess.js"
import { SinkRepair } from "./SinkRepair.js"


const mainContainer = document.querySelector("#container")

// You need to fetch the data from the API and store it in application state 
// before you can convert the data structures to HTML representations.

const render = () => {
    fetchRequests().then(
        () => {
            mainContainer.innerHTML = SinkRepair()
        }
    )
}

render()

mainContainer.addEventListener("stateChanged",
    CustomEvent => {
        render()
    }
)