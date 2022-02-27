const TODOS_STORAGE_KEY = 'TODOS' 

export default {
    get() {
        const localData = localStorage.getItem(TODOS_STORAGE_KEY)
        return JSON.parse(localData) || []
    },
    set(todos) {
        const localData = JSON.stringify(todos)
        localStorage.setItem(TODOS_STORAGE_KEY, localData)
    }
}