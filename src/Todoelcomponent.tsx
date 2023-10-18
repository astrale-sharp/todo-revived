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

function Todoelcomponent(props: { value: TodoElem, pprops: ListProps, setData: any }) {
    let mark = props.value.checked ? <span>✔</span> : <span>&nbsp;&nbsp;</span>
    let pp = props.pprops
    let setData = pp.setData


    return (
        <div className='hbox space-between expandXY'>
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
            <div>{props.value.text}</div>
            <button style={{ color: "red", ...buttonStyle }}>
                <div className='' style={{ margin: "auto", padding: "auto", }}>
                    x
                </div>
            </button>
        </div>
    );
}

export default Todoelcomponent;
