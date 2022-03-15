//App.js
import React, {useState, useEffect} from 'react';
import "./App.css"
import firebase from "firebase/compat/app";
import "firebase/compat/database";
import Navbar from './components/Navbar';
import NotedAdd from './components/NoteAdd';
import Notebook from './components/Notebook/Notebook';


const firebaseConfig = {
  apiKey: "AIzaSyCUnqo4uuIll41Wh1A3v5M2q-efkoXuvMk",
  authDomain: "notebook-b2bf1.firebaseapp.com",
  projectId: "notebook-b2bf1",
  storageBucket: "notebook-b2bf1.appspot.com",
  messagingSenderId: "843332315999",
  appId: "1:843332315999:web:329521b2660c376df224ea",
  measurementId: "G-G7YMQGR5NR"
};

firebase.initializeApp(firebaseConfig);

const App = () => {
 const [noteBookData, setNoteBookData] = useState([]);
  const updateNotes = () => {
    firebase
      .database()
      .ref("notebook")
      .on("child_added",(snapshot) => {
        let note = {
          id: snapshot.key,
          title: snapshot.val().title,
          description: snapshot.val().description
        };
        let notebook = noteBookData;
        notebook.push(note);
        setNoteBookData([...noteBookData]);
      });
    firebase
      .database()
      .ref("notebook")
      .on("child_removed",(snapshot) => {
        let notebook = noteBookData;
        notebook = noteBookData.filter((note) => note.id !== snapshot.key);
        setNoteBookData(notebook);
      });
  }
  useEffect(() => {
    updateNotes();
  },[]);

  return (
    <div className='app'>
      <Navbar />
      <div className='note-section'>
        <NotedAdd />
        <Notebook notebook={noteBookData} />
      </div>
    </div>
  )
}

export default App