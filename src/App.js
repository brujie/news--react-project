import IndexRouter from './router/indexRouter.js'
import { Provider } from 'react-redux'
import {store,persistor} from './redux/store'
import {PersistGate} from 'redux-persist/integration/react'
function App() {
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <IndexRouter/>
      </PersistGate>
  </Provider>
  );
}

export default App;
