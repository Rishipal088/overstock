import dbconnection from "@/dbconnection"
import { NextApiRequest, NextApiResponse } from "next"

export default async function handler(req:NextApiRequest, res:NextApiResponse) {
  const dbconn = await dbconnection();
  try {
    const { shoeId } = req.query;
    const query = "SELECT * from shoe where shoe_id = ?"
    const values = [shoeId]
    const [results] = await dbconn.execute(query, values)
    dbconn.end()
    res.status(200).json({ results })
  } catch (e: any) {
    res.status(500).json({ error: e.message })
  }
}