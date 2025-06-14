"use client";

import { Skeleton } from "@/app/components";
import { Issue, User } from "@prisma/client";
import { Select } from "@radix-ui/themes";
import { useQuery } from "@tanstack/react-query";
import axios, { AxiosError } from "axios";
import toast, { Toaster } from "react-hot-toast";

const AssigneeSelect = ({ issue }: { issue: Issue }) => {
  const { data: users, error, isLoading } = useUsers();
  toast.remove(); // don't show any previous toasts

  if (isLoading) return <Skeleton height="2rem" />;
  if (error) return null;

  const handleValueChange = async (userId: string) => {
    const promise = axios
      .patch<Issue>(`/api/issues/${issue.id}`, {
        assignedToUserId: userId === "null" ? null : userId,
      })
      .then((res) => res.data);
    sendToast(promise);
  };

  const sendToast = (promise: Promise<Issue>) => {
    toast.promise(
      promise,
      {
        loading: "Submitting changes...",
        success: (data) =>
          `Successfully ${data.assignedToUserId === null ? "removed" : "updated"} assignee!`,
        error: (err: AxiosError) => `Error updating issue: ${err.message}`,
      },
      { style: { minWidth: "280px" } },
    );
  };

  return (
    <>
      <Select.Root
        onValueChange={handleValueChange}
        defaultValue={issue.assignedToUserId || "null"}
      >
        <Select.Trigger placeholder="Assign..." />
        <Select.Content>
          <Select.Group>
            <Select.Label>Suggestions</Select.Label>
            <Select.Item value="null">Unassigned</Select.Item>
            {users?.map((user) => (
              <Select.Item key={user.id} value={user.id}>
                {user.name}
              </Select.Item>
            ))}
          </Select.Group>
        </Select.Content>
      </Select.Root>
      <Toaster />
    </>
  );
};

const useUsers = () =>
  useQuery<User[]>({
    queryKey: ["users"],
    queryFn: () => axios.get<User[]>("/api/users").then((res) => res.data),
    staleTime: 60 * 1000,
    retry: 3,
  });

export default AssigneeSelect;
