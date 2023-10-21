import React, { useEffect, useState } from 'react';
import { Data, TodoElem } from './interface'
import './App.css';
import Listcontainer from './Listcontainer'
import Listselector from './Listselector';
import { DndContext, DragEndEvent } from '@dnd-kit/core';


const path = "/"

function setServer(data: Data) {
  fetch(path + "setdata", {
    method: "POST",
    mode: "cors",
    headers: {
      'Accept': 'application/json; charset=UTF-8',
      'Content-Type': 'application/json; charset=UTF-8',
    },
    body: data.__ToJSON()
  })
    .catch((err) => {
      console.log(err.message);
    });
}

function getServer(callback: any) {
  fetch(path + "getdata", {
    mode: "cors",
    headers: {
      'Accept': 'application/json; charset=UTF-8',
      'Content-Type': 'application/json; charset=UTF-8',
    }
  })
    .then((response) => response.json())
    .then((data) => new Data().__FromJSON(JSON.stringify(data)))
    .then((data) => callback(data))
    .catch((err) => {
      console.warn("Couldn't connect to the server", "if you're on github.io it's expected behavior, no server here")
      callback(new Data())
    })
}


function App() {
  let [data, setData] = useState<Data | undefined>(undefined)
  const [listSelector, setListSelector] = useState<Array<string>>([])

  function handleDragEnd(e: DragEndEvent) {
    if (!e.over?.data.current) return
    if (!e.active.data.current) return
    setData((data) => data!.moveElemFromToList(e.over?.data.current!.listTo, e.active.data.current!.date))
  }

  // get data from the server once
  useEffect(() => { getServer(setData) }, [])
  // set data on change
  useEffect(() => { if (data !== undefined) setServer(data!) }, [data])

  // selected/highlighted data


  if (data === undefined) {
    return <div>Loading from server...</div>
  }


  let list_selected = data!.listEntries().filter(([list_name, todos]) => listSelector.includes(list_name))
  let list_unselected = data!.listEntries().filter(([list_name, todos]) => !listSelector.includes(list_name))

  let map = (x: [string, TodoElem[]][]) => x.map(([list_name, todos]) =>
    <Listcontainer
      data={data!}
      setData={(x: any) => setData(x)}
      key={list_name}
      name={list_name}
      elements={todos} >
    </Listcontainer>)

  let list_selected_el = map(list_selected)
  let list_unselected_el = map(list_unselected)

  return (
    <DndContext onDragEnd={handleDragEnd}>
      <div id="root" className="vbox">
        <div className="hbox space-around expandX">
          <div
            className='app-name'
          >TODO APP
          </div>
        </div>

        <div className="hbox " style={{ gap: 20 }}>
          <div style={{ width: 10 }}></div>

          <Listselector
            listSelector={listSelector}
            setListSelector={setListSelector}
            lists={Object.keys(data!.lists)}
            setData={setData}
          ></Listselector>

          {list_selected_el}
          {list_unselected_el}
        </div>
      </div>
    </DndContext>


  );
}

export default App;
