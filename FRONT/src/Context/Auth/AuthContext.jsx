import { createContext, useReducer } from 'react';
import { authReducer } from './authReducer';
import { types } from './types/types';

export const AuthContext = createContext();

const init = () => { 
  const token = JSON.parse( localStorage.getItem('token') )
  const user = JSON.parse( localStorage.getItem('user') )

  return {
    logged: !!token,
    user: { id: 'abc', user}, //TODO: esto tiene que ser de la misma manera que esta en el login 
  }
}

export const AuthProvider = ({ children }) => {
  const [ authState, dispatch ] = useReducer( authReducer, {}, init )

  const login = ( data ) => {
    const user = { id: 'abc', data } //TODO: aca hay que esperar lo que manda fran desde el back y se arma bien el objeto
    const action = {
      type: types.login,
      payload: user
    }
    localStorage.setItem('token', JSON.stringify(data.token) )
    localStorage.setItem('user', JSON.stringify(data) )
    dispatch(action)
  }

  const logout = () => { 
    const action = { type: types.logout }
    localStorage.removeItem('token')
    dispatch(action)
  }

  return (
    <AuthContext.Provider value={{ authState, login: login, logout: logout }}>
      {children}
    </AuthContext.Provider>
  );
};
