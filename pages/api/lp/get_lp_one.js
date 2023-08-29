import connect from "@/database/connect";
import lps from '@/models/lps';


export default async function handler(req, res) {
    if (req.method === "POST") {
        await connect.connect();
        const reqBody = await req;
        const { id } = reqBody.body;
        const lp = await lps.findOne({ _id: id });
        // console.log(lp)
        if (lp) {
            return res.json(lp);
        } else {
            return res.json({ message: "Something went wrong" });
        }
    }
}


