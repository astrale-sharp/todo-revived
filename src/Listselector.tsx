import Todolistcomponent from "./Todolistcomponent"
import { Data } from "./interface";

const buttonStyle = {
    minWidth: 20,
    minHeight: 20,
    marginTop: 7,
    marginBottom: 7,
    marginLeft: "auto",
    marginRight: "auto",
}



function Listselector(props: {
    lists: string[],
    setData: any,
    setListSelector: any,
    listSelector: Array<string>
}) {
    let elems = props.lists.map(name => <Todolistcomponent
        setListSelector={props.setListSelector}
        listname={name}
        selected={props.listSelector.includes(name)}
        key={"select-" + name}
        setData={props.setData}
    >
    </Todolistcomponent>)

    return (
        <div className="vbox list-selector-root">
            <div className="expandX box list-selector-title auto-marginC">
                <div>Todo lists</div>
            </div>
            <div
                className="vbox"
                style={{
                    minWidth: 300, minHeight: 300
                }}>
                <div style={{ minHeight: 10 }}></div>
                {elems}

                <button
                    onClick={() => props.setData((data: Data) => data.addList())}
                    style={{ ...buttonStyle }}>
                    {/* onClick={ () => props.setData((data: Data) => data)  } */}
                    <span style={{ margin: "auto" }}
                    >+</span>
                </button>
            </div>
        </div>
    );
}


export default Listselector;