"use client";

import { ErrorMessage, Skeleton, Spinner } from "@/app/components";
import { createIssueSchema } from "@/app/validationSchemas";
import { zodResolver } from "@hookform/resolvers/zod";
import { Issue } from "@prisma/client";
import { Button, Callout, TextArea, TextField } from "@radix-ui/themes";
import axios from "axios";
import dynamic from "next/dynamic";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import rehypeSanitize from "rehype-sanitize";
import { z } from "zod";

const MDEditor = dynamic(() => import("@uiw/react-md-editor"), {
  ssr: false,
  loading: () => <Skeleton height={200} />,
});

type IssueFormData = z.infer<typeof createIssueSchema>;

const IssueForm = ({ issue }: { issue?: Issue }) => {
  const router = useRouter();
  const {
    register,
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<IssueFormData>({
    resolver: zodResolver(createIssueSchema),
  });
  const [showEditor, setShowEditor] = useState(false);
  const [error, setError] = useState("");
  const [isSubmitting, setSubmitting] = useState(false);

  const onSubmit = handleSubmit(async (data) => {
    try {
      setSubmitting(true);
      await axios.post("/api/issues", data);
      router.push("/issues");
    } catch (error) {
      setSubmitting(false);
      setError("An unexpected error has occurred. Please try again later.");
    }
  });

  return (
    <div className="max-w-xl">
      {error && (
        <Callout.Root color="red" className="mb-5">
          <Callout.Text>{error}</Callout.Text>
        </Callout.Root>
      )}
      <form className="space-y-3" onSubmit={onSubmit}>
        <div className="space-y-1">
          <TextField.Root placeholder="Title" defaultValue={issue?.title} {...register("title")} />
          <ErrorMessage>{errors.title?.message}</ErrorMessage>
        </div>
        <div className="space-y-1">
          {showEditor ? (
            <Controller
              name="description"
              control={control}
              defaultValue={issue?.description}
              render={({ field }) => (
                <MDEditor
                  autoFocusEnd={true}
                  data-color-mode="light"
                  {...field}
                  ref={(ref) => {
                    field.ref({
                      focus: () => {
                        ref?.textarea?.focus();
                      },
                    });
                  }}
                  textareaProps={{
                    placeholder: "Please describe your issue here...",
                    maxLength: createIssueSchema.shape.description.maxLength as number,
                  }}
                  previewOptions={{
                    rehypePlugins: [[rehypeSanitize]],
                  }}
                />
              )}
            />
          ) : (
            <TextArea
              placeholder="Please describe your issue here..."
              defaultValue={issue?.description}
              onFocus={() => setShowEditor(true)}
              rows={8}
            />
          )}
          <ErrorMessage>{errors.description?.message}</ErrorMessage>
        </div>
        <Button disabled={isSubmitting}>
          Submit New Issue
          {isSubmitting && <Spinner />}
        </Button>
      </form>
    </div>
  );
};

export default IssueForm;
