<<<<<<< HEAD
import { createStore as reduxCreateStore } from "redux"
=======
import { createStore as reduxCreateStore } from "redux";
>>>>>>> 1b65452296f9b64db5c5804c56412248e76fad44

const reducer = (state, action) => {
  if (action.type === `INCREMENT`) {
    return Object.assign({}, state, {
<<<<<<< HEAD
      count: state.count + 1,
    })
  }
  return state
}

const initialState = { count: 0 }

const createStore = () => reduxCreateStore(reducer, initialState)
export default createStore
=======
      count: state.count + 1
    });
  }
  return state;
};

const initialState = { count: 0 };

const createStore = () => reduxCreateStore(reducer, initialState);
export default createStore;
>>>>>>> 1b65452296f9b64db5c5804c56412248e76fad44
