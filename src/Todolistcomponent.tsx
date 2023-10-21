import React, { } from 'react';
import { Data } from './interface'
import { } from "./Listcontainer"
import './App.css';


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

function Todolistcomponent(props: {
    listname: string,
    setData: any,
    setListSelector: any,
    selected: boolean,
    children: never[]
}) {
    return (
        <div className='expandX' style={{
            minHeight: 60,
        }}
            onClick={() => props.setListSelector((ls: Array<string>) => {
                let copy = [...ls]
                if (copy.includes(props.listname)) { 
                    copy.splice(copy.indexOf(props.listname),1)
                    return copy
                }

                if (ls.length <= 1) {
                    copy.push(props.listname)
                } else {
                    copy.push(props.listname)
                    copy.reverse()
                    copy.pop()
                    copy.reverse()
                }
                return copy
            })}
        >
            <div className='hbox space-between list-selector-element'
                style={{
                    margin: "auto",
                    marginBottom: 10,
                    backgroundColor: props.selected ? "var(--color4)" : ""
                }}
            >
                <div></div>
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
                                console.log("`",text,"`",)
                                if (text == "" || text == " ") { text = props.listname; document.getElementById(props.listname)!.innerText = props.listname }
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
        </div>
    );
}

export default Todolistcomponent;
