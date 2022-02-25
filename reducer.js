const init = {
    cars: ['BMV','Poscher','Audi']
}

export default function reducer(state = init, action, args) {
    console.log(action, args);
    switch (action) {
        case 'ADD':
            state.cars = [...state.cars, ...args]
            return state
            break
    
        default:
            return state
    }
}