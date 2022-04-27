import { storageService } from "../../../services/storage.service"
import { mailData } from "./mails.data"

export const emailService = {

}

const MAILKEY = 'mailDB'

function query() {
    let mails = storageService.loadFromStorage(MAILKEY)
    if (!mails || mails.length === 0) {
        mails = mailData.query()
        storageService.saveToStorage(BOOKKEY, books)
    }

    return Promise.resolve(mails)
}



