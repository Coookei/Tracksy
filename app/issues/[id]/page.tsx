import prisma from "@/prisma/client";
import { notFound } from "next/navigation";

interface Props {
  params: Promise<{ id: string }>;
}

const IssueDetailPage = async ({ params }: Props) => {
  const { id } = await params;

  if (isNaN(Number(id))) notFound();

  const issueId = parseInt(id);
  const issue = await prisma.issue.findUnique({ where: { id: issueId } });

  if (!issue) notFound();

  return (
    <div>
      <p>{issue.title}</p>
      <p>{issue.description}</p>
      <p>Status: {issue.status}</p>
      <p>Created at: {issue.createdAt.toDateString()}</p>
    </div>
  );
};

export default IssueDetailPage;
