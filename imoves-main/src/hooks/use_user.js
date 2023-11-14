import { useQuery } from 'react-query'
import { USER_KEY } from './query_keys'
import { get_user_by_id } from '../services/user'

export const use_user = (user_id, options = {}) => {
  return useQuery([ USER_KEY, user_id ], () => get_user_by_id(user_id), options)
}
