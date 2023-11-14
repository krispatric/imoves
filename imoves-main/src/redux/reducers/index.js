import { combineReducers } from 'redux'; // allow us to combine several reducers into one to keep code clean
import { auth } from './auth'
import { posts } from './posts'

const Reducers = combineReducers({
  auth,
  posts
})

export default Reducers;
