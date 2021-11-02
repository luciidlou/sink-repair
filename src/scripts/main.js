import { fetchData } from "./dataAccess.js"
import { SinkRepair } from "./SinkRepair.js"


const mainContainer = document.querySelector("#container")

// You need to fetch the data from the API and store it in application state 
// before you can convert the data structures to HTML representations.

const render = () => {
    fetchData().then(
        () => {
            mainContainer.innerHTML = SinkRepair()
        }
    )
}

render()

mainContainer.addEventListener("stateChanged",
    CustomEvent => {
        console.log("State change detected! Regenerating HTML...")
        render()
    }
)