import { Box, Button } from "@radix-ui/themes";
import React from "react";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

const LoadingNewIssuePage = () => {
  return (
    <Box className="max-w-xl">
      <Skeleton height={30} />
      <Skeleton height={200} className="mt-3 mb-3" />
      <Button disabled={true}>Submit New Issue</Button>
    </Box>
  );
};

export default LoadingNewIssuePage;
