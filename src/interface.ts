
export class TodoElem {
    "date": number
    "dateString": String
    "checked": boolean
    "text": string
    constructor(text: string, date: number = Date.now()) {
        let d = new Date(date)
        let d_fmt = String(d.toLocaleDateString()) + "\n"
            + String(d.getHours()) + "h "
            + String(d.getMinutes()) + "min "
            + String(d.getSeconds()) + "sec"
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

    __ToJSON() {
        // return "love"
        return JSON.stringify(Object.entries(this.lists).map(([name, todo]) => [name, todo.map(x => JSON.stringify(x))]))
    }

    __FromJSON(data: string) {
        let instance = new Data()
        let data0: Array<[string, string[]]> = JSON.parse(data)
        let data1: Array<[string, TodoElem[]]> = data0.map(([k, v]) => [k, v.map(x => JSON.parse(x))])
        data1.forEach(([x,y]) => instance.lists[x] = y)
        return instance
    }

    addList(name?: string) {
        let copy = { ...this }
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
        let copy = { ...this }
        delete copy.lists[listName]
        return copy
    }

    addElemToList(listName: string, elem?: TodoElem) {
        let copy = { ...this }
        let newelem = elem ?? new TodoElem("Task")
        if (!copy.lists[listName].find(x => x.date === newelem.date)) {
            copy.lists[listName].push(newelem)
        }
        return copy
    }

    removeElemFromList(listName: string, elemDate: number) {
        let copy = { ...this }
        copy.lists[listName] = copy.lists[listName].filter((x) => x.date !== elemDate)
        return copy
    }

    modifyTextFromListElem(listName: string, elemDate: number, newText: string) {
        let copy = { ...this }
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
        let copy = { ...this }

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
        if (!found) { console.warn("invalid elemData in toggleItemFromList") }
        return copy
    }
    editItemText(listName: string, elemDate: number, newText: string) {
        let copy = { ...this }
        copy.lists.listName = copy.lists.listName.map((x) => {
            if (x.date !== elemDate) { return x }
            else {
                let y = { ...x }
                y.text = newText
                return y
            }
        })
        return copy
    }

    renameList(listName: string, newName: string) {
        if (listName === newName) return this
        let copy = { ...this }
        copy.lists[newName] = copy.lists[listName]
        delete copy.lists[listName]
        return copy
    }

    moveElemFromToList(listTo: string, elemDate: number) {
        let copy = { ...this }
        let [listFrom, _] = copy.listEntries().find(
            ([_, todos]) => todos.find(x => x.date === elemDate) !== undefined
        )!
        let idx = copy.lists[listFrom].findIndex((elem) => elem.date == elemDate)
        let elem = copy.lists[listFrom][idx]
        copy.lists[listFrom].splice(idx, 1)
        copy.lists[listTo].push(elem)
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
            removeElemFromList: this.removeElemFromList,
            modifyTextFromListElem: this.modifyTextFromListElem,
            toggleItemFromList: this.toggleItemFromList,
            listEntries: this.listEntries,
            renameList: this.renameList,
            editItemText: this.editItemText,
            moveElemFromToList: this.moveElemFromToList,
            __ToJSON: this.__ToJSON,
            __FromJSON: this.__FromJSON,
        }
    }
}
