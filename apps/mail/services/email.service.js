import { storageService } from "../../../services/storage.service.js"
import { mailData } from "./mails.data.js"
import { utilService } from "../../../services/util.service.js"

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


function sendMail(mail, title, body) {
    const newMail = {
        id: utilService.makeId(),
        mail,
        title,
        body,
        isRead: true,
        sentAt: new Date(),
        ctg: ['sent']
    }
    let mails = storageService.loadFromStorage(MAILKEY)
    mails.push(newMail)
    storageService.saveToStorage(MAILKEY, mails)
    return Promise.resolve(mails)
}