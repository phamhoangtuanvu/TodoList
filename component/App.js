import html from "../core.js"
import { connect } from "../store.js"

const connector = connect()

function App({ cars }) {
    return html`
        <ul>
            ${cars.map((car) => `<li>${car}</li>`).join('')}
        </ul>

        <button onclick="dispatch('ADD','Honda')">Add car</button>
    `
}


export default connector(App) 