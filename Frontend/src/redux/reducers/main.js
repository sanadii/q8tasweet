import { combineReducers } from "redux";
import { cartreducer } from "./reducer";
import roleReducer from "./roleReducer";
import rankReducer from "./rankReducer";


const rootred = combineReducers({
    cartreducer,
    role: roleReducer,
    rank: rankReducer
});


export default rootred