import React, { useState } from 'react';
import { Data, TodoElem } from './interface'
import './App.css';
import Listcontainer from './Listcontainer'
import Listselector from './Listselector';


const init = () => {
  let data = new Data()
  let listName = "My dang list"
  data.addList(listName)
  data.addElemToList(listName, new TodoElem("Do the thing", Date.now() - 1000 * 3600))// one hour ago
  data.addElemToList(listName, new TodoElem("Wake up", Date.now()))// one hour ago
  return data
}

function App() {
  //list data
  let [data, setData] = useState<Data>(init())
  // selected/highlighted data
  const [listSelector, setListSelector] = useState<Array<string>>([])

  let list_selected = data.listEntries().filter(([list_name, todos]) => listSelector.includes(list_name))
  let list_unselected = data.listEntries().filter(([list_name, todos]) => !listSelector.includes(list_name))

  let map = (x: [string, TodoElem[]][]) => x.map(([list_name, todos]) =>
    <Listcontainer
      data={data}
      setData={(x: any) => setData(x)}
      key={list_name}
      name={list_name}
      elements={todos} >
    </Listcontainer>)

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
        <Listselector
          lists={Object.keys(data.lists)}
          setData={setData}
        ></Listselector>
        {list_selected_el}
        {list_unselected_el}
      </div>
      <footer className="box footer expandXY expandCXY" style={{ minHeight: 70, marginTop: "auto" }}>
        <div className='center'>Not connected to the server</div>
      </footer>
    </div>


  );
}

export default App;
