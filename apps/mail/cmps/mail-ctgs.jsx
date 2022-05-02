import { emailService } from "../services/email.service.js"

export function MailCtgs({ toggleNav }) {
    const ctgs = emailService.getCtgs()
    return ctgs.map((ctg, idx) => <div style={{ color: ctg.color }} key={idx} className="ctg" onClick={() => toggleNav(ctg.ctg)}>
        ❤ {ctg.ctg}
    </div >)
}