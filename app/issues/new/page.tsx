"use client";
import { Button, TextField } from "@radix-ui/themes";
import MDEditor from "@uiw/react-md-editor";
import { ChangeEvent, useState } from "react";
import rehypeSanitize from "rehype-sanitize";

const NewIssuePage = () => {
  const [value, setValue] = useState<string | undefined>("");

  const handleChange = (
    value?: string | undefined,
    event?: ChangeEvent<HTMLTextAreaElement> | undefined
  ) => {
    setValue(value);
    console.log("markdown: ", value);
  };

  return (
    <div className="max-w-xl space-y-3">
      <TextField.Root placeholder="Title"></TextField.Root>

      <MDEditor
        data-color-mode="light"
        value={value}
        onChange={handleChange}
        textareaProps={{
          placeholder: "Please describe your issue here...",
          // maxLength: 10,
        }}
        previewOptions={{
          rehypePlugins: [[rehypeSanitize]],
        }}
      />

      <Button>Submit New Issue</Button>
    </div>
  );
};

export default NewIssuePage;
