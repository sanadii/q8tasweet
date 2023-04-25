import { combineReducers } from "redux";
import { cartreducer } from "./reducer";
import roleReducer from "./roleReducer";
import rankReducer from "./rankReducer";
import userDetailReducer from "./userDetailReducer";


const rootred = combineReducers({
    cartreducer,
    role: roleReducer,
    rank: rankReducer,
    userDetail: userDetailReducer
});


export default rootred