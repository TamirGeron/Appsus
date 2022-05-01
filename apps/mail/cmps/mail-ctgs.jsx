import { emailService } from "../services/email.service.js"

export function MailCtgs({ toggleNav }) {
    const ctgs = emailService.getCtgs()
    return ctgs.map((ctg, idx) => <div key={idx} className="ctg" onClick={() => toggleNav(ctg)}>
        {ctg}
    </div >)
}