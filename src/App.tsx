import React, { useState } from 'react';
import './App.css';

function App() {
  let [todos, setTodos] = useState({
    "my cool list": []
  })


  return (
    <div id="root" className="vbox">
      <div className="hbox expandX center space-around">
        <div style={{
          marginTop: 20,
          marginBottom: 20,
          padding: 15,
          borderRadius: 10,
          backgroundColor: "rgb(179, 154, 154)",
        }}>TODO APP
        </div>
      </div>

      <div className="hbox expandXY">
        {/* <!-- List selectors --> */}
        <div className="vbox expandY">
          <div className="center expandX box"
            style={{
              border: "1px black solid",
            }}>
            <div>Todo lists</div>
          </div>
          <div
            className="vbox expandY children-elem"
            style={{
              minWidth: 300, minHeight: 700
            }}>
            <div></div>
          </div>
        </div>
        {/* <!-- Here are the todo lists --> */}
        <div className="vbox expandY">
          <div className="center expandX box"
            style={{ border: "1px black solid " }}>
            <div>My cool list</div>
          </div>

          <div className="vbox expandY children-elem"
            style={{
              minWidth: 300,
              minHeight: 700,
            }}>
            <div></div>
          </div>
        </div>
      </div>
      <footer className="box footer expandXY expandCXY" style={{ minHeight: 70 }}>
        <div className='center'>Not connected to the server</div>
      </footer>
    </div>


  );
}

export default App;
