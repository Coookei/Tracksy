import prisma from "@/prisma/client";
import dynamic from "next/dynamic";
import { notFound } from "next/navigation";
import IssueFormSkeleton from "./loading";

const IssueForm = dynamic(() => import("@/app/issues/_components/IssueForm"), {
  loading: () => <IssueFormSkeleton />,
});

interface Props {
  params: Promise<{ id: string }>;
}

const EditIssuePage = async ({ params }: Props) => {
  const { id } = await params;

  if (isNaN(Number(id))) notFound();

  const issueId = parseInt(id);
  const issue = await prisma.issue.findUnique({ where: { id: issueId } });

  if (!issue) notFound();

  return <IssueForm issue={issue} />;
};

export async function generateMetadata({ params }: Props) {
  const { id } = await params;
  const issue = await prisma.issue.findUnique({ where: { id: parseInt(id) } });

  return {
    title: "Editing Issue - " + issue?.title,
    description: "Editing issue " + issue?.id,
  };
}

export default EditIssuePage;
