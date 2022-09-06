// initialState 
const initialState = [
    {
        id: 0,
        value: 0,
        incrementBy: 2,
        decrementBy: 1,
    },
];

// Acton types
const ADD_COUNTER = " addCounter";
const RESET_COUNTER = "resetCounter";
const INCREMENT_COUNT = "increment";
const DECREMENT_COUNT = "decrement";

// Actions 
const addCounter = () => {
    return {
        type: ADD_COUNTER,
    }
}
const resetCounter = () => {
    return {
        type: RESET_COUNTER,
    }
}
const incrementCounter = (counterId, value) => {
    return {
        type: INCREMENT_COUNT,
        payload: {
            counterId,
            value,
        }
    }
}
const decrementCounter = (counterId, value) => {
    return {
        type: DECREMENT_COUNT,
        payload: {
            counterId,
            value,
        }

    }
}


// counter id function
function nextCounterId(counters) {
    const maxId = counters.reduce((maxId, counter) => {
        Math.max(counter.id, maxId), -1
    })
    return maxId + 1;
}
function incrementHandler(counterId, value) {
    store.dispatch(incrementCounter(counterId, value))
}
function decrementHandler(counterId, value) {
   store.dispatch(decrementCounter(counterId, value))
}


// counter reducer
function counterReducer(state = initialState, action) {
    if (action.type === ADD_COUNTER) {
        return [
            ...state,
            {
                id: nextCounterId(state),
                value: 0,
                incrementBy: Math.floor(Math.
                    random() * 10) + 10,
                decrementBy: Math.floor(Math.
                    random() * 10) + 5,

            },
        ]

    };

    if (action.type === RESET_COUNTER){

        return state.map((counter) => ({
            ...counter,
            value: 0

        }))


    };

    if (action.type === INCREMENT_COUNT){

        const { counterId, value } = action.payload;
        return state.map((counter) => {
         if (counter.id === counterId){
            return {
                ...counter,
                value: counter.value + value,
            }
         }
         return { 
            ...counter, 
        }
        })

    };

    if (action.type === DECREMENT_COUNT){

        const { counterId, value } = action.payload;
        return state.map((counter) => {
         if (counter.id === counterId){
            return {
                ...counter,
                value: counter.value - value,
            }
         }
         return { 
            ...counter, }
        })

    };
    
    return state;

}



const store = Redux.createStore(counterReducer)

// DOM
const countersContainer = document.getElementById("counters-container");

const addCounterButton = document.getElementById("add-countr");
const resetCounterButton = document.getElementById("reset-counter");

//  render create

const render = () => {
    const state = store.getState();
    let counterUi = "";

    state.forEach((counter) => {
        counterUi += `<div class="p-4 h-auto flex flex-col items-center justify-center space-y-5 bg-white rounded shadow">
        <div class="text-2xl font-semibold">${counter.value}</div>
        <div class="flex space-x-3">
            <button id="increment" class="bg-indigo-400 text-white px-3 py-2 rounded shadow"
             onclick ="incrementHandler(${counter.id},${counter.incrementBy})" >
                Increment
            </button>
            <button id="decrement"
                class="bg-red-400 text-white px-3 py-2 rounded shadow"
                onclick ="decrementHandler(${counter.id},${counter.decrementBy})">
                Decrement
            </button>
        </div>
    </div>`;
    });

    countersContainer.innerHTML = counterUi;

}

render();

store.subscribe(render);


// click listener
addCounterButton.addEventListener("click", () => {
    store.dispatch(addCounter());

})

resetCounterButton.addEventListener("click", () => {
    store.dispatch(resetCounter())
})



