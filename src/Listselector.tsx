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



function Listselector(props: { lists: string[], setData: any }) {
    let elems = props.lists.map(name => <Todolistcomponent
        listname={name}
        setData={props.setData}
    >
    </Todolistcomponent>)

    return (
        <div className="vbox expandY" style={{ minHeight: "100vh" }}>
            <div className="expandX box"
                style={{
                    border: "1px black solid",
                    minHeight: 30,
                    backgroundColor: "lightgreen",
                }}>
                <div style={{ userSelect: "none", margin: "auto" }}>Todo lists</div>
            </div>
            <div
                className="vbox"
                style={{
                    minWidth: 300, minHeight: 300
                }}>
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