import React, { useEffect } from 'react';
import { TodoElem, Data } from './interface'
import { ListProps } from "./Listcontainer"
import './App.css';


const buttonStyle = {
    minWidth: 30,
    minHeight: 30,
    marginTop: "auto",
    marginBottom: "auto",
    marginLeft: 5,
    marginRight: 5,
    inset: 0,
    alignContent: "center",
    justifyContent: "center"
}

function Todolistcomponent(props: { listname: string, setData: any, children: never[] }) {
    return (
        <div className='hbox space-between expandXY' style={{
            backgroundColor: "aliceblue",
            minHeight: 50,
            border: "black 1px solid"
        }}>
            <div
                id={props.listname}
                key={props.listname}
                contentEditable
                suppressContentEditableWarning
                onKeyDown={
                    (key) => {
                        if (key.key === 'Enter') {
                            key.preventDefault()
                            let text = document.getElementById(props.listname)?.innerText ?? " . "
                            text = text.replaceAll("\n", "")
                            if (text === "") { text = props.listname; document.getElementById(props.listname)!.innerText = props.listname }
                            console.log("`", text, "`")
                            props.setData((data: Data) => data.renameList(props.listname, text))
                        }
                        if (key.key === "Escape") {
                            document.getElementById(props.listname)!.innerText = props.listname
                        }
                    }
                }
                style={{
                    margin: "auto",
                    outlineOffset: 4,
                }}>{props.listname}</div>
            <button
                onClick={x => props.setData((data: Data) => data.removeList(props.listname))}
                style={{ color: "red", ...buttonStyle }}>
                <div className='' style={{ margin: "auto", padding: "auto", }}>
                    x
                </div>
            </button>
        </div>
    );
}

export default Todolistcomponent;
