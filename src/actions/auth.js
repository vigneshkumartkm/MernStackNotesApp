import fetch from 'node-fetch'


export const login = (userData) => ({
  type: 'LOGIN',
  userData 
});

export const logout = () => ({
    type: 'LOGOUT'
})

export const startSignUp = (userCredentials = {}) => {
  return (dispatch) => {
    const { userId, password} = userCredentials;
    
    console.log("In start login")
    
    
    
/*    return (fetch("http://localhost:3000/signup", */
      return (fetch("/signup", 
        
        {
          method: 'POST', // or 'PUT'
          body: JSON.stringify(userCredentials), // data can be `string` or {object}!
          headers:{
            'Content-Type': 'application/json'
          }
            })
    .then((res)=> {
       
        if(res.status !== 200) { return Promise.reject(res.status) }
        return res.json().then((userData) => {return dispatch(login(userData)) })})
    .catch((err) => {return Promise.reject(err)}) )
      
    }}




export const startLogin = (userCredentials = {}) => {
  return (dispatch) => {
    const { userId, password} = userCredentials;
    
    console.log("In start login")
    
    
    
    return (fetch("/login", {
          method: 'POST', // or 'PUT'
          body: JSON.stringify(userCredentials), // data can be `string` or {object}!
          headers:{
            'Content-Type': 'application/json'
          }
            })
    .then((res)=> {
       
        if(res.status !== 200) { return Promise.reject(res.status) }
        return res.json().then((userData) => {return dispatch(login(userData)) })})
    .catch((err) => {if (err == 404) {return Promise.reject(404)} 
                     else{return Promise.reject(err)}} ) )
      
    }}
    
