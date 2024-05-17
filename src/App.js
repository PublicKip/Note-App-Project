import React, { useState } from 'react';
import './App.scss';
import Searchbar from './components/molecules/Searchbar/Searchbar';
import NoteForm from './components/organisms/NoteForm/NoteForm';
import NotesList from './components/organisms/NotesList/NotesList';
import DeleteNoteForm from './components/organisms/DeleteNoteForm/DeleteNoteForm';
import Auth0ProviderWithHistory from './auth0Provider';
import { useAuth0 } from '@auth0/auth0-react';
import { deleteNote } from './redux/reducers/notesReducers';

import { connect } from "react-redux";
import TabsContainer from './components/molecules/TabsContainer/TabsContainer';
import EmptyState from './components/organisms/EmptyState/EmptyState';

import store from "./redux/store";
import axios from 'axios';

import logo from "./assets/icons/small K&N.png"

// GET FROM ATLAS
async function getNotes(userID) {
  try {
    const response = await axios.get('http://localhost:3010/FromAtlas' + '?userID=' + userID);
    console.log(response.data);
    var stringedResponse = JSON.stringify(response.data)
    window.localStorage.setItem("notes", stringedResponse)
  } catch (error) {
    console.error(error);
  }
}

// SEND TO ATLAS
let currentArray = store.getState().notes;
console.log(store.getState().notes);

async function postNotes(userID) {
  try {
    const response = await axios.post('http://localhost:3010/ToAtlas' + '?userID=' + userID, currentArray);
    console.log(response);
  } catch (error) {
    console.error(error);
  }
}

function App(props) {
  const [isDeleteNoteFormOpen, setIsDeleteNoteFormOpen] = useState(false);
  const [noteIdToDelete, setNoteIdToDelete] = useState('');
  const { user, loginWithRedirect, isAuthenticated, logout } = useAuth0();

  const toggleDeleteNoteForm = (e) => {
    // Check if e exists and has a target property before accessing it
    const noteElement = e && e.target && e.target.closest('.note');
    const noteId = noteElement ? noteElement.getAttribute('note-id') : '';
    setIsDeleteNoteFormOpen(!isDeleteNoteFormOpen);
    setNoteIdToDelete(noteId);
  };

// runs twice everytime anything on page changes
// don't know how to fix
{isAuthenticated ? postNotes(user.nickname) : console.log('Not logged in')} // if Authenticated, send email to get route, else log error
{isAuthenticated ? getNotes(user.nickname) : console.log('Not logged in')} // if Authenticated, send email to post route, else log error

  let loginButton = <button className="button__login" onClick={() => { loginWithRedirect() }}> Log In </button>;
  let logoutButton = <button className="button__login" onClick={() => { logout() }}> Log out </button>;

  return (
    <>
      <div className="App">
        Logged in: {isAuthenticated ? "yes" : "no"}<br />
        {isAuthenticated ? logoutButton : loginButton}
        <Searchbar />
        <div className="container">
          <h1>
            <img src={logo} alt='Keys & Notes' />
          </h1>
          <TabsContainer />
          {props.notes.length > 0 ? (
            <NotesList deleteFormOpenStateHandler={toggleDeleteNoteForm} />
          ) : (
            <EmptyState text="You don't have any notes" />
          )}
        </div>
        {props.isNotesFormOpen && <NoteForm open={props.isNotesFormOpen} />}
        {isDeleteNoteFormOpen && (
          <DeleteNoteForm
            isDeleteNoteFormOpen={isDeleteNoteFormOpen}
            deleteNote={noteIdToDelete && console.log(noteIdToDelete)}
            deleteFormOpenStateHandler={toggleDeleteNoteForm}
            toggleDeleteNoteForm={toggleDeleteNoteForm} // Pass toggleDeleteNoteForm as a prop
          />
        )}
      </div>
    </>
  );
}

const mapStateToProps = (state) => ({
  isNotesFormOpen: state.noteForm.isNotesFormOpen,
  notes: state.notes,
});

const mapDispatchToProps = (dispatch) => ({
  deleteNote: (obj) => dispatch(deleteNote(obj))
});

export default connect(mapStateToProps, mapDispatchToProps)(App);

