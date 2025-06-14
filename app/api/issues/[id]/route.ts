import authOptions from "@/app/auth/authOptions";
import { patchIssueSchema } from "@/app/validationSchemas";
import prisma from "@/prisma/client";
import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";

export async function PATCH(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  // check authenticated
  const session = await getServerSession(authOptions);
  if (!session) return NextResponse.json({}, { status: 401 });

  // validate request
  const body = await request.json();
  const validation = patchIssueSchema.safeParse(body);
  if (!validation.success) return NextResponse.json(validation.error.format(), { status: 400 });

  // check valid issue
  const { id } = await params;
  if (isNaN(Number(id))) return NextResponse.json({ error: "Invalid issue" }, { status: 400 });

  const issueId = parseInt(id);
  const issue = await prisma.issue.findUnique({ where: { id: issueId } });
  if (!issue) return NextResponse.json({ error: "Invalid issue" }, { status: 404 });

  // destructure validated data
  const { title, description, assignedToUserId } = validation.data;

  // check if assignedToUserId is provided that the user exists
  if (assignedToUserId) {
    const assignedToUser = await prisma.user.findUnique({
      where: { id: assignedToUserId },
    });
    if (!assignedToUser) return NextResponse.json({ error: "Invalid user" }, { status: 400 });
  }

  // update the issue!
  const updatedIssue = await prisma.issue.update({
    where: { id: issue.id },
    data: { title, description, assignedToUserId },
  });

  return NextResponse.json(updatedIssue);
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) {
  const session = await getServerSession(authOptions);
  if (!session) return NextResponse.json({}, { status: 401 });

  const { id } = await params;
  if (isNaN(Number(id))) return NextResponse.json({ error: "Invalid issue" }, { status: 400 });

  const issueId = parseInt(id);
  const issue = await prisma.issue.findUnique({ where: { id: issueId } });
  if (!issue) return NextResponse.json({ error: "Invalid issue" }, { status: 404 });

  await prisma.issue.delete({
    where: { id: issue.id },
  });
  return new NextResponse(null, { status: 204 });
}
