import { legacy_createStore as createStore } from 'redux';
import reducer from './reducer';

// ==============================|| REDUX - MAIN STORE ||============================== //

const store = createStore(reducer);
const persister = 'App';

export { store, persister };
