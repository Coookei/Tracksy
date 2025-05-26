import { Status } from "@prisma/client";
import { Badge } from "@radix-ui/themes";
import type { ThemeProps } from "@radix-ui/themes";
import { CSSProperties } from "react";

// Use radix-ui themes CSS variables for accent colors, rather than making this a client component and using context
const THEME_ACCENT_STYLE: CSSProperties = {
  backgroundColor: "var(--accent-a3)",
  color: "var(--accent-a11)",
};

type AccentColor = ThemeProps["accentColor"];
type BadgeEntry =
  | { label: string; color: AccentColor; style?: never }
  | { label: string; color?: never; style: CSSProperties };
const statusMap: Record<Status, BadgeEntry> = {
  OPEN: { label: "Open", color: "red" },
  IN_PROGRESS: { label: "In Progress", style: THEME_ACCENT_STYLE }, // use theme accent color for in progress badge
  CLOSED: { label: "Closed", color: "green" },
};

const IssueStatusBadge = ({ status }: { status: Status }) => {
  return (
    <Badge style={statusMap[status].style} color={statusMap[status].color}>
      {statusMap[status].label}
    </Badge>
  );
};

export default IssueStatusBadge;
