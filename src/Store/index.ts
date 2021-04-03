import {combineReducers} from 'redux';
import configureStore from './createStore';
import rootSaga from './sagas';
import {allEmployeesReducer, employeeByIdReducer} from './Demo/reducer';

/* ------------- Assemble The Reducers ------------- */
const rootReducer = combineReducers({
  allEmployees: allEmployeesReducer,
  employeeById: employeeByIdReducer,
});

// Create the store
export const createStore = () => configureStore(rootReducer, rootSaga);

// Create Types for our AppState
// eslint-disable-next-line no-undef
export type GlobalState = ReturnType<typeof rootReducer>;

export interface StandardApiState<T> {
  data: T;
  status: string;
  isLoading: boolean;
  isError: boolean;
  errorMessage: string;
  dateFetched: Date;
}
