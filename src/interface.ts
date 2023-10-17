
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

    addList(name: string | undefined) {
        if (name !== undefined) {
            this.lists[name] = []
            return
        }

        let number = 0
        let lname = "TodoList " + String(number)
        while (Object.keys(this.lists).includes(lname)) {
            number += 1
            lname = "TodoList " + String(number)
        }
        this.lists[lname] = []
    }
    removeList(listName: string) {
        delete this.lists[listName]
    }

    addElemToList(listName: string, text?: string) {
        this.lists[listName].push(new TodoElem(text ?? "Task"))
    }

    removeElemToList(listName: string, elemDate: number) {
        this.lists[listName] = this.lists[listName].filter((x) => x.date !== elemDate)
    }
    modifyTextFromListElem(listName: string, elemDate: number, newText: String) {
        this.lists[listName] = this.lists[listName].map((x: TodoElem) => {
            if (x.date === elemDate) {
                x.text = newText
                return x
            } else {
                return x
            }
        })
    }
    toggleItemFromList(listName: string, elemDate: number) {
        this.lists[listName] = this.lists[listName].map((x: TodoElem) => {
            if (x.date === elemDate) {
                x.checked = !x.checked
                return x
            } else {
                return x
            }
        })
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
