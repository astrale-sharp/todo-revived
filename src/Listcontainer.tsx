import React, { useState } from 'react';
import { Data, TodoElem } from './interface'
import Todoelcomponent from "./Todoelcomponent"
import './App.css';

const buttonStyle = {
    minWidth: 7,
    minHeight: 7,
    marginTop: "auto",
    marginBottom: "auto",
    marginLeft: 5,
    marginRight: 5,
    inset: 0,
    alignContent: "center",
    justifyContent: "center"
}

export type ListProps = {
    data: Data,
    setData: any,
    name: string,
    elements: TodoElem[],
    [key: string]: any,
}

// props:
// data
// setData
// key
// name
// elements
function Listcontainer(props: ListProps) {
    let elements = props.elements.map((x: TodoElem) =>
        <Todoelcomponent
            key={x.date}
            value={x}
            setData={props.setData}
            pprops={props}
        ></Todoelcomponent>
    );

    return (
        <div id="todo-list-container" className="vbox expandY">
            <div className="center expandXY hbox space-between"
                style={{
                    border: "1px black solid",
                    backgroundColor: "aliceblue",
                    minHeight: 30
                }}>
                <div
                    className="expandX center">
                    {props.name}</div>
                <button
                    onClick={() => props.setData((data: Data) => data.removeList(props.name))}
                    style={{ color: "red", ...buttonStyle }}>
                    <div className='' style={{ margin: "auto", padding: "auto", }}>
                        x
                    </div>
                </button>
            </div>

            <div className="vbox expandXY"
                style={{
                    minWidth: 300,
                    minHeight: 700,
                }}>
                {elements}
                
                <button
                    onClick={() => { props.setData((data: Data) => data.addElemToList(props.name)) }}
                    style={{
                        marginLeft: "auto",
                        marginRight: "auto",
                        marginTop: 5,
                        marginBottom: 5,
                    }}> <span>+</span></button>

            </div>
        </div>
    );
}


export default Listcontainer;