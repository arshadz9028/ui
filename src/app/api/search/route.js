import { NextResponse } from "next/server";
import Yadi from "../../../models/Yadi";
import { connectDB } from "../../../database/conn";

export async function GET(req) {
  try {
    await connectDB();

    const { searchParams } = new URL(req.url);
    const q = searchParams.get("q")?.trim() || "";
    const page = Number(searchParams.get("page") || 1);
    const limit = Number(searchParams.get("limit") || 50);

    if (!q) return NextResponse.json({ total: 0, results: [] });

    const regex = new RegExp(q, "i");

    const orConditions = [
      { voter_id: regex },
      { address: regex },
      { address_original: regex },
      { name: regex },
      { name_original: regex },
      { father_or_husband: regex },
      { father_or_husband_original: regex },
      { _raw_line: regex },
      { ward: regex },
      { file_name: regex }
    ];

    if (/^\d+$/.test(q)) {
      orConditions.push({ sno: Number(q) });
    }

    // Count total matches
    const total = await Yadi.countDocuments({ $or: orConditions });

    // Pagination logic
    // const results = await Yadi.find({ $or: orConditions })
    //   .skip((page - 1) * limit)
    //   .limit(limit);
const results = await Yadi.find(
  { $or: orConditions },
  {
    sno: 1,
    voter_id: 1,
    name_original: 1,
    father_or_husband_original: 1,
    address_original: 1,
    ward: 1,
    file_name: 1,
    page: 1,
    _raw_line: 1
  }
)
.skip((page - 1) * limit)
.limit(limit);

    return NextResponse.json({ total, page, limit, results });

  } catch (error) {
    console.log("❗ Search error:", error);
    return NextResponse.json({ error: true }, { status: 500 });
  }
}
