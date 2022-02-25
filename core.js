export default html

function html([first, ...string], ...value) {
    const result = value.reduce(
        (acc, cur) => [...acc, cur, string.shift()],
        [first]
    )
    .filter( x => x && x !== true || x===0)
    .join('')
    
    return result
}


export function createStore(reducer) {
    let state = reducer()
    const roots = new Map()

    function render() {
        for (const [root, component] of roots) {
            const output = component()
            root.innerHTML = output
        }
    }

    return {
        attach(component, root) {
            roots.set(root, component)
            render()
        },

        connect(selector = state => state) {
            function connector(component) {
                return (props, ...args) => component(Object.assign({}, props, selector(state), ...args))
            }

            return connector
        },

        dispatch(action, ...args) {
            state = reducer(state, action, args)
            render()
        }
    }

}

