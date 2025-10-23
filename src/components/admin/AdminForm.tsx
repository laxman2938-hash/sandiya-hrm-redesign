"use client";

import { ReactNode, useActionState, useState } from "react";
import { FormState } from "@/app/actions";
import { FileInput } from "./FileInput";

interface AdminFormProps {
  action: (prevState: FormState, formData: FormData) => Promise<FormState>;
  title: string;
  fields: Array<{
    name: string;
    label: string;
    type: "text" | "email" | "url" | "textarea" | "number" | "file";
    placeholder?: string;
    required?: boolean;
    rows?: number;
    accept?: string;
  }>;
  submitButtonText?: string;
  onSuccess?: () => void;
}

export function AdminForm({
  action,
  title,
  fields,
  submitButtonText = "Submit",
  onSuccess,
}: AdminFormProps) {
  const [state, formAction, isPending] = useActionState(action, {
    success: false,
    message: "",
  });

  const [selectedFiles, setSelectedFiles] = useState<Record<string, File>>({});

  const handleFileSelect = (fieldName: string, file: File) => {
    setSelectedFiles((prev) => ({
      ...prev,
      [fieldName]: file,
    }));
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <h2 className="text-2xl font-bold text-gray-900 mb-6">{title}</h2>

      <form action={formAction} className="space-y-5">
        {fields.map((field) => (
          <div key={field.name}>
            {field.type === "file" ? (
              <FileInput
                name={field.name}
                label={field.label}
                required={field.required}
                accept={field.accept}
                onFileSelect={(file) => handleFileSelect(field.name, file)}
              />
            ) : field.type === "textarea" ? (
              <>
                <label htmlFor={field.name} className="block text-sm font-semibold text-gray-700 mb-2">
                  {field.label}
                  {field.required && <span className="text-red-500 ml-1">*</span>}
                </label>
                <textarea
                  id={field.name}
                  name={field.name}
                  placeholder={field.placeholder}
                  required={field.required}
                  rows={field.rows || 4}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition"
                />
              </>
            ) : (
              <>
                <label htmlFor={field.name} className="block text-sm font-semibold text-gray-700 mb-2">
                  {field.label}
                  {field.required && <span className="text-red-500 ml-1">*</span>}
                </label>
                <input
                  id={field.name}
                  type={field.type}
                  name={field.name}
                  placeholder={field.placeholder}
                  required={field.required}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition"
                />
              </>
            )}

            {state.errors?.[field.name] && (
              <p className="text-red-500 text-sm mt-1">
                {state.errors[field.name][0]}
              </p>
            )}
          </div>
        ))}

        {/* Status Messages */}
        {state.message && (
          <div
            className={`p-4 rounded-lg text-sm font-medium ${
              state.success
                ? "bg-green-100 text-green-800"
                : "bg-red-100 text-red-800"
            }`}
          >
            {state.message}
          </div>
        )}

        {/* Submit Button */}
        <button
          type="submit"
          disabled={isPending}
          className="w-full px-6 py-3 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 disabled:bg-gray-400 transition-colors duration-200"
        >
          {isPending ? "Processing..." : submitButtonText}
        </button>
      </form>
    </div>
  );
}
