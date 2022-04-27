import { storageService } from "../../../services/storage.service.js"
import { mailData } from "./mails.data.js"

export const emailService = {
    query,
    getMailById,
    unreadMailCount,
    sendMail
}

const MAILKEY = 'mailDB'

function query() {
    let mails = storageService.loadFromStorage(MAILKEY)
    if (!mails || mails.length === 0) {
        mails = mailData.query()
        storageService.saveToStorage(MAILKEY, mails)
    }

    return Promise.resolve(mails)
}

function getMailById(mailId) {
    let mails = storageService.loadFromStorage(MAILKEY)
    return mails.find(mail => mailId === mail.id)
}

function unreadMailCount() {
    let mails = storageService.loadFromStorage(MAILKEY)
    const unreadMails = mails.filter(mail => {
        return mail.isRead === false
    })
    return unreadMails.length
}


function sendMail() {

}