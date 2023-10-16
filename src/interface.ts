export type Data = {
    [key: string]: Array<TodoElem>
}

export type TodoElem = {
    date: number
    dateString: String
    checked: boolean
    text: String
}

export function createTodoElem(text: string, date: number = Date.now())  {
    let d = new Date()
    d.setDate(date)
    // let d = new Date()

    let d_fmt = String(d.toLocaleDateString()) + "\n" 
        + String(d.getHours()) + "h:" 
        + String(d.getMinutes()) + "min:" 
        // + String(d.getSeconds()) + "sec"
    return {
        date: date,
        checked: false,
        text: text,
        dateString: d_fmt
    }
}


export function addList(data: Data) {
    let number = 0
    let lname = "TodoList " + String(number)
    while (Object.keys(data).includes(lname)) {
        number += 1
        lname = "TodoList " + String(number)
    }
    let updated = { ...data }
    updated[lname] = []
    return updated
}

export function removeList(data: Data, listName: string) {
    let updated : Data = { ...data }
    delete updated[listName]
    return updated

}

export function addElemToList(data: Data, listName: string) {
    let updated = { ...data }
    updated[listName].push(createTodoElem(""))
    return updated
}

export function removeElemToList(data: Data, listName: string, elemDate: number) {
    let updated = { ...data }
    updated[listName] = updated[listName].filter((x) => x.date != elemDate)
    return updated
}

export function modifyTextFromListElem(data: Data, listName: string, elemDate: number, newText: String) {
    let updated = { ...data }
    updated[listName] = updated[listName].map((x: TodoElem) => {
        if (x.date == elemDate) {
            x.text = newText
            return x
        } else {
            return x
        }
    })
    return updated
}

export function toggleItemFromList(data: Data, listName: string, elemDate: number) {
    let updated = { ...data }
    updated[listName] = updated[listName].map((x: TodoElem) => {
        if (x.date == elemDate) {
            x.checked = !x.checked
            return x
        } else {
            return x
        }
    })
    return updated
}

