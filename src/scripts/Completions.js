// import { getCompletions, saveCompletion } from "./dataAccess.js"

// const convertCompletionToListElement = (obj) => {
//     return `<li class="list-item">
//             ${obj.description}
//             <button class="request__delete" id="request--${obj.id}">Delete</button>
//             </li>
//     `
// }

// export const Completions = () => {
//     const completions = getCompletions()
//     let html = `
//     <ul class="list-container">
//         ${completions.map(convertCompletionToListElement)
//         }
//     </ul>
//     `

//     return html
// }

// const mainContainer = document.querySelector("#container")

// mainContainer.addEventListener(
//     "change",
//     (event) => {
//         const date = new Date()
//         if (event.target.id === "plumbers") {
//             const [requestId, plumberId] = event.target.value.split("--")

//             /*
//                 This object should have 3 properties
//                    1. requestId
//                    2. plumberId
//                    3. date_created
//             */
//             const completion = {
//                 requestId: requestId,
//                 plumberId: plumberId,
//                 date_created: date
//             }

//             /*
//                 Invoke the function that performs the POST request
//                 to the `completions` resource for your API. Send the
//                 completion object as a parameter.
//              */
//             saveCompletion(completion)
//         }
//     }
// )
