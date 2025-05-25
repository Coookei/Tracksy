import { Status } from "@prisma/client";
import { Badge } from "@radix-ui/themes";

const statusMap: Record<Status, { label: string; color: "red" | "cyan" | "green" }> = {
  OPEN: { label: "Open", color: "red" },
  IN_PROGRESS: { label: "In Progress", color: "cyan" },
  CLOSED: { label: "Closed", color: "green" },
};

const IssueStatusBadge = ({ status }: { status: Status }) => {
  const badge = statusMap[status];
  return <Badge color={badge.color}>{badge.label}</Badge>;
};

export default IssueStatusBadge;
