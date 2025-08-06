import prisma from "@/prisma/client";
import dynamic from "next/dynamic";
import { notFound } from "next/navigation";
import { cache } from "react";
import IssueFormSkeleton from "./loading";

const IssueForm = dynamic(() => import("@/app/issues/_components/IssueForm"), {
  loading: () => <IssueFormSkeleton />,
});

interface Props {
  params: Promise<{ id: string }>;
}

const fetchIssue = cache((issueId: number) => prisma.issue.findUnique({ where: { id: issueId } }));

const EditIssuePage = async ({ params }: Props) => {
  const { id } = await params;
  if (isNaN(Number(id))) notFound();

  const issueId = parseInt(id);
  const issue = await fetchIssue(issueId);
  if (!issue) notFound();

  return <IssueForm issue={issue} />;
};

export async function generateMetadata({ params }: Props) {
  const { id } = await params;
  const issue = await fetchIssue(parseInt(id));

  return {
    title: "Editing Issue - " + issue?.title,
    description: "Editing issue " + issue?.id,
  };
}

export default EditIssuePage;
