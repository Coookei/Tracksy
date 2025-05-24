"use client";
import { Button, Callout, Text, TextField } from "@radix-ui/themes";
import MDEditor from "@uiw/react-md-editor";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import rehypeSanitize from "rehype-sanitize";
import { zodResolver } from "@hookform/resolvers/zod";
import { createIssueSchema } from "@/app/validationSchemas";
import { z } from "zod";

type IssueForm = z.infer<typeof createIssueSchema>;

const NewIssuePage = () => {
  const router = useRouter();
  const {
    register,
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<IssueForm>({
    resolver: zodResolver(createIssueSchema),
  });
  const [error, setError] = useState("");

  return (
    <div className="max-w-xl">
      {error && (
        <Callout.Root color="red" className="mb-5">
          <Callout.Text>{error}</Callout.Text>
        </Callout.Root>
      )}
      <form
        className="space-y-3"
        onSubmit={handleSubmit(async (data) => {
          try {
            await axios.post("/api/issues", data);
            router.push("/issues");
          } catch (error) {
            console.error(error);
            setError("An unexpected error has occurred. Please try again later.");
          }
        })}
      >
        <TextField.Root placeholder="Title" {...register("title")} />
        {errors.title && (
          // Wrap in div to use form y spacing as Text does not support Tailwind classes
          <div>
            <Text color="red" as="p">
              {errors.title.message}
            </Text>
          </div>
        )}
        <Controller
          name="description"
          control={control}
          render={({ field }) => (
            <MDEditor
              data-color-mode="light"
              {...field}
              textareaProps={{
                placeholder: "Please describe your issue here...",
                // maxLength: 10,
              }}
              previewOptions={{
                rehypePlugins: [[rehypeSanitize]],
              }}
            />
          )}
        />
        {errors.description && (
          <div>
            <Text color="red" as="p">
              {errors.description.message}
            </Text>
          </div>
        )}
        <Button>Submit New Issue</Button>
      </form>
    </div>
  );
};

export default NewIssuePage;
