import React, { } from 'react';
import { TodoElem, Data } from './interface'
import { ListProps } from "./Listcontainer"
import { useDraggable } from '@dnd-kit/core';
import { CSS } from '@dnd-kit/utilities';
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
    let bgColor = props.value.checked ? "var(--correct-green)" : ""
    let textColor = props.value.checked? "gray" : ""
    let pp = props.pprops
    let setData = pp.setData
    let textId = "text-" + props.value.date.toString()

    function handleKeyDown(key: React.KeyboardEvent<HTMLDivElement>) {
        if (key.key === 'Enter') {
            key.preventDefault()
            key.currentTarget.blur()
            let text = document.getElementById(textId)?.innerText ?? "."
            text = text.replaceAll("\n", "")
            if (text === "" || text === "\n") {
                text = props.value.text; document.getElementById(textId)!.innerText = props.value.text
            }
            console.log("`", text, "`")
            props.setData((data: Data) => data.modifyTextFromListElem(pp.name, props.value.date, text))
        }
        if (key.key === "Escape") {
            document.getElementById(textId)!.innerText = props.value.text
        }
    }

    const { attributes, listeners, setNodeRef, transform } = useDraggable({
        id: props.value.date.toString(),
        data: props.value
    });
    const style = {
        // Outputs `translate3d(x, y, 0)`
        transform: CSS.Translate.toString(transform),
    };


    return (
        <div className='expandX' style={{height : 150}}>
            <div
                className='vbox todo-element-root'
                id={props.value.date.toString()}
                style={{
                    ...style,
                    minWidth : "90%",
                    margin : "auto"
                }}>
                <div
                    className='todo-element-date expandX hbox space-around auto-marginC'
                    ref={setNodeRef}
                    {...listeners}
                    {...attributes}
                    style={{
                        minHeight: 30,
                        margin: "auto",
                        cursor: "move",
                    }}>
                    <div>
                        {props.value.dateString.split("\n")[0]}
                    </div>
                    <div>
                        {props.value.dateString.split("\n")[1]}
                    </div>
                </div>
                <div className='hbox space-between expandXY todo-element-text'
                    style={{
                        backgroundColor: bgColor,
                        color : textColor
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
                        id={textId}
                        key={props.value.date.toString()}
                        contentEditable
                        suppressContentEditableWarning
                        onKeyDown={handleKeyDown}


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
        </div>

    );
}

export default Todoelcomponent;
