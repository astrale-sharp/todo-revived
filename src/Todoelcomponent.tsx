import React, { } from 'react';
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

function Todoelcomponent(props: { value: TodoElem, pprops: ListProps, setData: any }) {
    let mark = props.value.checked ? <span>✔</span> : <span>&nbsp;&nbsp;</span>
    let bgColor = props.value.checked ? "lightgreen" : ""
    let pp = props.pprops
    let setData = pp.setData


    return (
        <div className='vbox expandX test' style={{
            border: "black 1px solid",
            backgroundColor: "gainsboro",
        }}>
            <div style={{
                minHeight: 20,
                margin: "auto"
            }}>
                {props.value.dateString.split("\n")[0]}
                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                {props.value.dateString.split("\n")[1]}
            </div>
            <div className='hbox space-between expandXY self-elem'
                style={{
                    backgroundColor: bgColor
                }}
            >
                <button
                    className=''
                    style={{ ...buttonStyle }}
                    onClick={() => setData((data: Data) => data.toggleItemFromList(pp.name, props.value.date))}
                >
                    <div className='reset'
                        style={{ margin: "auto", padding: "auto" }}>
                        {mark}
                    </div>
                </button>
                <div
                    style={{
                        margin: "auto",
                        overflow: "auto",
                        outlineOffset: 8,
                        wordBreak: "break-word",
                    }}
                    id={props.value.date.toString()}
                    key={props.value.date.toString()}
                    contentEditable
                    suppressContentEditableWarning
                    onKeyDown={
                        (key) => {
                            if (key.key === 'Enter') {
                                key.preventDefault()
                                key.currentTarget.blur()
                                let text = document.getElementById(props.value.date.toString())?.innerText ?? "."
                                text = text.replaceAll("\n", "")
                                if (text === "" || text === "\n") {
                                    text = props.value.text; document.getElementById(props.value.date.toString())!.innerText = props.value.text
                                }
                                console.log("`", text, "`")
                                props.setData((data: Data) => data.modifyTextFromListElem(pp.name, props.value.date, text))
                            }
                            if (key.key === "Escape") {
                                document.getElementById(props.value.date.toString())!.innerText = props.value.text
                            }
                        }
                    }


                >{props.value.text}</div>
                <button
                    onClick={() => { setData((data: Data) => data.removeElemFromList(pp.name, props.value.date)) }}
                    style={{ color: "red", ...buttonStyle }}>
                    <div className=''
                        style={{
                            margin: "auto",
                            padding: "auto",
                        }}>
                        x
                    </div>
                </button>
            </div>
        </div>
    );
}

export default Todoelcomponent;
