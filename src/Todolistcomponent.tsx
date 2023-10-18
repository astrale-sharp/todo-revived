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
            minHeight: 50
        }}>
            <div style={{ margin: "auto" }}>{props.listname}</div>
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
