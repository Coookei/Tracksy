import { Skeleton } from "@/app/components";
import { Box } from "@radix-ui/themes";

const IssueFormSkeleton = () => {
  return (
    <Box className="max-w-xl">
      <Skeleton height={30} />
      <Skeleton height={200} className="mt-3 mb-3" />
      <Skeleton height={32} width={120} />
    </Box>
  );
};

export default IssueFormSkeleton;
