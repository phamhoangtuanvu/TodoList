import storage from "./util/storage.js"

const init = {
    todos: storage.get(),
    filter: 'all',
    filters: {
        all: () => true,
        active: todo => !todo.isCompleted,
        completed: todo => todo.isCompleted,
    },
    editingIndex: null
}

const actions = {
    add({ todos }, args) {  
        if (args) {
            todos.push({
                title: args,
                isCompleted: false
            })
            storage.set(todos)
        }
    },
    toggle({ todos }, index) {
        const todo = todos[index]
        todo.isCompleted = !todo.isCompleted
        storage.set(todos)
    },
    toggleAll({ todos }, isChecked) {
        todos.map((todo) => {
            todo.isCompleted = isChecked 
        })
        storage.set(todos)
    },
    destroy({todos}, index ) {
        todos.splice(index,1)
        storage.set(todos)
    },
    switchFilter(state, type) {
        state.filter = type
    },
    clearCompleted(state) {
        state.todos = state.todos.filter(state.filters.active)
        storage.set(state.todos)
    },
    editing(state, index) {
        state.editingIndex = index
    },
    endEditing(state, value) {
        if (state.editingIndex != null) {    
            if (value) {    
                state.todos[state.editingIndex].title = value
                storage.set(state.todos)
            } else {
                this.destroy(state, state.editingIndex)
            }
            state.editingIndex = null
            
        }
    },
    cancelEditing(state) {
        state.editingIndex = null
    }
}

export default function reducer(state = init, action, args) {
    actions[action] && actions[action](state, ...args)
    return state
}