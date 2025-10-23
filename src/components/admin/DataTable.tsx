"use client";

import { useActionState } from "react";
import { FormState } from "@/app/actions";

interface DataTableProps {
  title: string;
  data: Array<Record<string, any>>;
  columns: Array<{
    key: string;
    label: string;
    render?: (value: any) => ReactNode;
  }>;
  onDelete: (id: number) => Promise<FormState>;
  onEdit?: (id: number) => void;
  emptyMessage?: string;
}

import { ReactNode } from "react";

export function DataTable({
  title,
  data,
  columns,
  onDelete,
  onEdit,
  emptyMessage = "No records found",
}: DataTableProps) {
  const [, deleteAction, isPending] = useActionState(
    async (prevState: FormState, formData: FormData) => {
      const id = parseInt(formData.get("id") as string);
      return await onDelete(id);
    },
    { success: false, message: "" }
  );

  if (data.length === 0) {
    return (
      <div className="bg-white rounded-lg shadow-md p-6 text-center text-gray-600">
        <p className="text-lg">{emptyMessage}</p>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full text-sm text-gray-700">
          <thead className="bg-gray-100 border-b border-gray-300">
            <tr>
              {columns.map((col) => (
                <th key={col.key} className="px-6 py-4 text-left font-semibold text-gray-900">
                  {col.label}
                </th>
              ))}
              <th className="px-6 py-4 text-left font-semibold text-gray-900">Actions</th>
            </tr>
          </thead>
          <tbody>
            {data.map((row, idx) => (
              <tr
                key={row.id || idx}
                className="border-b border-gray-200 hover:bg-gray-50 transition-colors"
              >
                {columns.map((col) => (
                  <td key={col.key} className="px-6 py-4">
                    {col.render ? col.render(row[col.key]) : row[col.key]}
                  </td>
                ))}
                <td className="px-6 py-4 space-x-2 flex">
                  {onEdit && (
                    <button
                      onClick={() => onEdit(row.id)}
                      className="px-3 py-1 bg-blue-500 text-white text-xs font-medium rounded hover:bg-blue-600 transition"
                    >
                      Edit
                    </button>
                  )}
                  <form action={deleteAction} className="inline">
                    <input type="hidden" name="id" value={row.id} />
                    <button
                      type="submit"
                      disabled={isPending}
                      className="px-3 py-1 bg-red-500 text-white text-xs font-medium rounded hover:bg-red-600 disabled:bg-gray-400 transition"
                    >
                      Delete
                    </button>
                  </form>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
