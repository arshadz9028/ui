import { NextResponse } from "next/server";
import Yadi from "../../../models/Yadi";
import { connectDB } from "../../../database/conn";
export async function GET(req) {
  try {
    await connectDB();
    const { searchParams } = new URL(req.url);
    const query = searchParams.get("q");
    const page = parseInt(searchParams.get("page")) || 1;
    const limit = parseInt(searchParams.get("limit")) || 50;
    
    console.log("Received search query:", query, "Page:", page, "Limit:", limit);
    if (!query) {
      return NextResponse.json({ error: "Search query is required" }, { status: 400 });
    }
    
    const searchFilter = {
      $or: [
        { epic: { $regex: query, $options: "i" } },
        { house: { $regex: query, $options: "i" } },
        { name: { $regex: query, $options: "i" } },
        { relative: { $regex: query, $options: "i" } },
        { relation: { $regex: query, $options: "i" } },
      ],
    };
    
    // Get total count (without pagination)
    const total = await Yadi.countDocuments(searchFilter);
    
    // Get paginated results
    const skip = (page - 1) * limit;
    const results = await Yadi.find(searchFilter)
      .skip(skip)
      .limit(limit)
      .lean();
    
    console.log("Total matches:", total, "Returning:", results.length);
    return NextResponse.json({ results, total });
  } catch (error) {
    console.error("Error occurred while searching:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}