
export class TodoElem {
    "date": number
    "dateString": String
    "checked": boolean
    "text": String
    constructor(text: string, date: number = Date.now()) {
        let d = new Date(date)
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
}


export class Data {
    "lists": { [key: string]: Array<TodoElem> }

    addList(name?: string) {
        let copy = {...this}
        if (name !== undefined) {
            copy.lists[name] = []
            return
        }

        let number = 0
        let lname = "TodoList " + String(number)
        while (Object.keys(copy.lists).includes(lname)) {
            number += 1
            lname = "TodoList " + String(number)
        }
        copy.lists[lname] = []
        return copy
    }
    removeList(listName: string) {
        let copy = {...this}
        delete copy.lists[listName]
        return copy
    }

    addElemToList(listName: string, elem?: TodoElem) {
        let copy = {...this}
        copy.lists[listName].push(elem ?? new TodoElem("Task"))
        return copy
    }

    removeElemToList(listName: string, elemDate: number) {
        let copy = {...this}
        copy.lists[listName] = copy.lists[listName].filter((x) => x.date !== elemDate)
        return copy
    }
    modifyTextFromListElem(listName: string, elemDate: number, newText: String) {
        let copy = {...this}
        copy.lists[listName] = copy.lists[listName].map((x: TodoElem) => {
            if (x.date === elemDate) {
                x.text = newText
                return x
            } else {
                return x
            }
        })
        return copy
    }
    toggleItemFromList(listName: string, elemDate: number) {
        let copy = {...this}

        let found = false
        copy.lists[listName] = copy.lists[listName].map((x: TodoElem) => {
            if (x.date === elemDate) {
                found = true
                x.checked = !x.checked
                return x
            } else {
                return x
            }
        })
        if (!found) {console.warn("invalid elemData in toggleItemFromList")}
        return copy
    }
    listEntries() {
        return Object.entries(this.lists)
    }


    constructor() {
        return {
            lists: {},
            addList: this.addList,
            removeList: this.removeList,
            addElemToList: this.addElemToList,
            removeElemToList: this.removeElemToList,
            modifyTextFromListElem: this.modifyTextFromListElem,
            toggleItemFromList: this.toggleItemFromList,
            listEntries: this.listEntries,
        }
    }
}
