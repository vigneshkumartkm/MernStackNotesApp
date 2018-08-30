import fetch from 'node-fetch'


export const addNotes = (note) => ({
  type: 'ADD_NOTES',
  note 
});

export const reset = () => ({
    type: "RESET"
})

export const startAddNotes = (note = {}) => {
  return (dispatch) => {
    
    
    return (fetch("/addnotes", {
          method: 'POST', // or 'PUT'
          body: JSON.stringify(note), // data can be `string` or {object}!
          headers:{
            'Content-Type': 'application/json'
          }
            })
    .then((res)=> {
       
        if(res.status !== 200) { return Promise.reject(res.status) }
        return res.json().then((savedNote) => {return dispatch(addNotes([savedNote])) })})
    .catch((err) => {return Promise.reject(err)}) )
      
    }}

export const startGetNotes = (userId = {}) => {
  return (dispatch) => {
    
    
    return (fetch("/getnotes", {
          method: 'POST', // or 'PUT'
          body: JSON.stringify(userId), // data can be `string` or {object}!
          headers:{
            'Content-Type': 'application/json'
          }
            })
    .then((res)=> {
       
        if(res.status !== 200) { return Promise.reject(res.status) }
        return res.json().then((allNote) => {return dispatch(addNotes(allNote)) })})
    .catch((err) => {return Promise.reject(err)}) )
      
    }}

