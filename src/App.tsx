import React, { useState } from 'react';
import { Data, TodoElem } from './interface'
import './App.css';
import Listcontainer from './Listcontainer'

function App() {
  //list data
  let [data, setData] = useState<I.Data>(
    new I.Data()
  )
  // selected/highlighted data
  const [listSelector, setListSelector] = useState<Array<string>>([])

  let list_selected = data.listEntries().filter(([list_name, todos]) => listSelector.includes(list_name))
  let list_unselected = data.listEntries().filter(([list_name, todos]) => !listSelector.includes(list_name))

  let map = (x : [string, I.TodoElem[]][]) => x.map(([list_name, todos]) =>
   ( <Listcontainer
      data={data}
      setData={setData}
      key={list_name}
      name={list_name}
      elems={todos}
    >
    </Listcontainer>))
  let list_selected_el = map(list_selected)
  let list_unselected_el = map(list_unselected)

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
