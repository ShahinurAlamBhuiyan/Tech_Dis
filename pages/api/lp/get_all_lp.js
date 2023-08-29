import connect from "@/database/connect";
import lps from '@/models/lps';

export default async function handler(req, res) {
  if (req.method === "POST") {
    await connect.connect();
    const reqBody = await req.json();
    const newBlog = new lps(reqBody);
    await newBlog.save();
    const lp = await lps.find();
    if (lp) {
      return res.json({ message: "Blog added successfully" });
    } else {
      return res.json({ message: "Something went wrong" });
    }
  }

  if (req.method === "GET") {
    await connect.connect();
    const lp = await lps.find();
    if (lp) {
      return res.json(lp);
    } else {
      return res.json({ message: "Something went wrong" });
    }
  }
}
