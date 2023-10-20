import React, { useState } from 'react';
import { Data, TodoElem } from './interface'
import Todoelcomponent from "./Todoelcomponent"
import './App.css';
import { useDroppable } from '@dnd-kit/core';

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
    let [checkedVisible, SetCheckedVisible] = useState(false)
    const { isOver, setNodeRef } = useDroppable({
        id: props.name,
        data: { listTo: props.name },
    });

    const borderColor = isOver ? "red" : "black";

    let elements = props.elements
        .sort((a, b) => a.date - b.date)
        .map((x: TodoElem) =>
            [x.checked,
            <Todoelcomponent
                key={x.date}
                value={x}
                setData={props.setData}
                pprops={props}
            ></Todoelcomponent>]
        );
    let unchecked = elements.filter(([checked, el]) => !checked).map(([_, el]) => el)
    let checked = elements.filter(([checked, el]) => checked).map(([_, el]) => el)

    return (
        <div id={props.name}
            className="vbox expandY"
            ref={setNodeRef}
            style={{
                backgroundColor: "aliceblue",
                border: "1px solid",
                borderColor: borderColor
            }}>
            <div className="center expandXY hbox space-between"
                style={{
                    border: "1px black solid",
                    backgroundColor: "aliceblue",
                    minHeight: 30
                }}>

                <button
                    style={{
                        backgroundColor: checkedVisible ? "lightgreen" : "",
                        ...buttonStyle
                    }}
                    onClick={(x) => SetCheckedVisible(x => !x)}>
                    &#9728;
                </button>
                <div
                    className="expandX center">
                    {props.name}
                </div>
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
                    minWidth: 320,
                    minHeight: 700,
                    width: 320,
                    // overflow: "auto",

                }}>
                {unchecked}

                <button
                    onClick={() => { props.setData((data: Data) => data.addElemToList(props.name)) }}
                    style={{
                        marginLeft: "auto",
                        marginRight: "auto",
                        marginTop: 5,
                        marginBottom: 5,
                    }}> <span>+</span>
                </button>

                {checkedVisible ? checked : null}

            </div>
        </div>
    );
}


export default Listcontainer;