import { NextRequest, NextResponse } from "next/server";
import { adminAuth } from "@/lib/firebaseAdmin";

const ADMIN_SECRET = process.env.ADMIN_SECRET;

export async function POST(req: NextRequest) {
  const body = await req.json();
  const { secret, email, courseId, courseIds } = body;

  if (secret !== ADMIN_SECRET) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  // Accept either a single courseId or an array of courseIds
  const idsToGrant: string[] = Array.isArray(courseIds)
    ? courseIds
    : courseId
    ? [courseId]
    : [];

  if (idsToGrant.length === 0) {
    return NextResponse.json({ error: "No course specified" }, { status: 400 });
  }

  try {
    const user = await adminAuth.getUserByEmail(email);
    const existingClaims = user.customClaims || {};

    // Normalize whatever format paidCourses is currently in (old array or object)
    let paidCourses: Record<string, boolean> = {};

    if (Array.isArray(existingClaims.paidCourses)) {
      for (const id of existingClaims.paidCourses) {
        paidCourses[id] = true;
      }
    } else if (existingClaims.paidCourses && typeof existingClaims.paidCourses === "object") {
      paidCourses = { ...existingClaims.paidCourses };
    }

    for (const id of idsToGrant) {
      paidCourses[id] = true;
    }

    await adminAuth.setCustomUserClaims(user.uid, { paidCourses });

    return NextResponse.json({ success: true, paidCourses });
  } catch (error: any) {
    console.error("grant-access error:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}