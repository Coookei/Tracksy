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
import ErrorMessage from "@/app/components/ErrorMessage";
import Spinner from "@/app/components/Spinner";

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
          <TextField.Root placeholder="Title" {...register("title")} />
          <ErrorMessage>{errors.title?.message}</ErrorMessage>
        </div>
        <div className="space-y-1">
          <Controller
            name="description"
            control={control}
            render={({ field }) => (
              <MDEditor
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

export default NewIssuePage;
