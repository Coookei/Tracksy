"use client";

import { Skeleton } from "@/app/components";
import { User } from "@prisma/client";
import { Select } from "@radix-ui/themes";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";

const AssigneeSelect = () => {
  const {
    data: users,
    error,
    isLoading,
  } = useQuery<User[]>({
    queryKey: ["users"],
    queryFn: () => axios.get<User[]>("/api/users").then((res) => res.data),
    staleTime: 60 * 1000,
    retry: 3,
  });

  if (error) return null;

  const skeletons = [1, 2, 3];

  return (
    <Select.Root>
      <Select.Trigger placeholder="Assign..." />
      {/* position="popper" allows the menu to be opened even when all the elements are disabled */}
      <Select.Content position={isLoading ? "popper" : undefined}>
        <Select.Group>
          <Select.Label>{isLoading ? "Loading..." : "Suggestions"}</Select.Label>
          {isLoading &&
            skeletons.map((skel) => (
              <Select.Item key={`skel-${skel}`} value={`skel-${skel}`} disabled aria-disabled>
                <Skeleton width="10rem" />
              </Select.Item>
            ))}

          {users?.map((user) => (
            <Select.Item key={user.id} value={user.id}>
              {user.name}
            </Select.Item>
          ))}
        </Select.Group>
      </Select.Content>
    </Select.Root>
  );
};

export default AssigneeSelect;
