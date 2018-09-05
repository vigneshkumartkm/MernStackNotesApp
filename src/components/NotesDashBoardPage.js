import React from 'react';
import { connect } from 'react-redux';
import {Link} from 'react-router-dom';
import {startAddNotes , startGetNotes , startRemoveNote , startUpdateNote} from '../actions/notes'

class NotesDashboardPage extends React.Component {
    
    state = { notesAdded: false , error: false, notesLoading: true , editId: "" }
    
    onSubmit = (e) => {
        
        e.preventDefault();
        let note = e.target.elements.notes.value;
        e.target.elements.notes.value = "";
        let userId = this.props.userData.userId;
        this.props.startAddNotes({userId, note})
        .then(() => this.setState(() => ({notesAdded: true})))
        .catch(() => this.setState(() => ({error: true})))
    
    }
    
    
    handleRemove = (e) => {
        
        e.preventDefault();
        let id = e.target.dataset.id;
        this.props.startRemoveNote(id);
        
    }
    
    handleUpdate = (e) => {
        
        e.preventDefault();
        let _id = e.target.dataset.id;
        let note = e.target.elements.updatedNote.value
        this.props.startUpdateNote({_id, note});
        this.setState(()=> ({editId: ""}))
        
        
    }
    
    showEdit = (e) => {
        
        e.preventDefault();
        let id = e.target.dataset.id;
        this.setState(()=> ({editId: id}))
    }
    
    componentDidMount = () => {
        
        if (!this.props.userData.userId) { return this.props.history.push('/')}
        this.props.startGetNotes({userId: this.props.userData.userId})
        .then(() => {this.setState(() => ({notesLoading: false}))})
    } 

    
    render = () => (
        
        <div>
            <div className="userHeader" >
                <h3 className="username">User : {this.props.userData.userId}</h3>
                <Link className="button" to="/" > Logout </Link>
            </div>
            {this.state.notesLoading ? 
                <h1>Your Notes are loading...</h1> :
            (<div>
                {this.state.notesAdded && <h2>Added Notes Sucessfully</h2>}
                {this.state.error && <h2>Something went wrong</h2>}
                
                <div className="formclass">
                <h2> Add Notes </h2>
                <form onSubmit={this.onSubmit}>
                    <input type="text" name="notes" placeholder="Your notes" />
                    <button>Add </button>
                </form>
                </div>
                
                <div className="notelist">
                <h2> Your Notes</h2>
                {<ol className="notelist__ol">
                  {this.props.notes.map((item) =>
    
                    (<li key={item._id}>
                            {(item._id == this.state.editId) ? 
                             (<form data-id={item._id} onSubmit={this.handleUpdate}>
                                <input type="text" name="updatedNote" placeHolder={item.note}/>
                                <div className="modifyButton"><button className="smallButton">update</button></div>
                             </form> )
                             :
                            (
                            <div>{item.note}
                                <div className="modifyButton" >
                                <button className="smallButton" data-id={item._id}  
                                    onClick={this.showEdit}>EDIT</button> 
                                <button className="smallButton" data-id={item._id} 
                                    onClick={this.handleRemove}>REMOVE </button>
                                </div>
                            </div>) }
                   </li> ))}
                 </ol>}
                </div>
      </div>
                )
            }
        </div>
    )
}



const mapStateToProps = (state) => {return {userData: state.userData , notes: state.notes}};

const mapDispatchToProps = (dispatch) =>
                    
({startAddNotes: (note) => dispatch(startAddNotes(note)), 
  startGetNotes: (note) => dispatch(startGetNotes(note)) ,
  startRemoveNote: (note) => dispatch(startRemoveNote(note)),
  startUpdateNote: (idAndNote) => dispatch(startUpdateNote(idAndNote))
 });

export default connect(mapStateToProps , mapDispatchToProps)(NotesDashboardPage);
