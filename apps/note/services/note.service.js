import {utilService} from '../../../services/util.service.js'
import {storageService} from '../../../services/storage.service.js'

export const noteService ={
    query,



}



const KEY = 'notesDB'


function query(){
    let notes = _loadFromStorage()
    if(!notes){
        notes = createNotes()
        _saveToStorage(notes)
    }


    return Promise.resolve(notes)
}







function createNotes() {
    return [
        {
         id: "n101",
         type: "note-txt",
         isPinned: true,
         info: {
         txt: "Fullstack Me Baby!"
         }
        },
        {
         id: "n102",
         type: "note-img",
         info: {
         url: "http://some-img/me",
         title: "Bobi and Me"
         },
         style: {
         backgroundColor: "#00d"
         }
        },
        {
         id: "n103",
         type: "note-todos",
         info: {
         label: "Get my stuff together",
         todos: [
         { txt: "Driving liscence", doneAt: null },
         { txt: "Coding power", doneAt: 187111111 }
         ]
         }
        }
        ];
}

function _saveToStorage(books) {
    storageService.saveToStorage(KEY, books)
}

function _loadFromStorage() {
    return storageService.loadFromStorage(KEY)
}