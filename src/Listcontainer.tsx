import React, { useState } from 'react';
import { Data, TodoElem } from './interface'
import Todoelcomponent from "./Todoelcomponent"
import './App.css';
import { useDroppable } from '@dnd-kit/core';

const buttonStyle = {
    width: 20,
    weight: 20,
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
    children: never[]
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

    const borderColor = isOver ? "red" : "";

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
            className="vbox list-container-root"
            ref={setNodeRef}
            style={{ borderColor: borderColor }}>
            <div className="list-container-title center expandX hbox space-between">
                <button
                    style={{
                        backgroundColor: checkedVisible ? "var(--correct-green)" : "",
                        ...buttonStyle,
                        marginLeft: 15,
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
                    style={{
                        color: "red",
                        ...buttonStyle,
                        marginRight: 15,
                    }}
                >
                    <div className='' style={{ margin: "auto", padding: "auto", }}>
                        x
                    </div>
                </button>
            </div>

            <div className="vbox expandXY list-container-todo-section">
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