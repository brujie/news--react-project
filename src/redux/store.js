import {
  legacy_createStore as createStore,
  combineReducers
} from 'redux';
import {
  changeCollapsed
} from './reducers/changeCollapsed'
import {
  changeLoading
} from './reducers/changeLoading'
import {
  persistStore,
  persistReducer
} from 'redux-persist'
import storage from 'redux-persist/lib/storage'

// 持久化redux数据
const persistConfig = {
  key: 'loading',
  storage,
  blacklist:['changeLoading'] // 取消持久化
}
const reducer = combineReducers({
  changeCollapsed,
  changeLoading
})
const _persistReducer = persistReducer(persistConfig, reducer)

const store = createStore(_persistReducer);

const persistor = persistStore(store);

export {
  store,
  persistor
};