import { prisma } from "@/lib/prisma";
import { AdminForm } from "@/components/admin/AdminForm";
import { createLegalDocument, deleteLegalDocument } from "@/app/actions";

type LegalDocumentModel = {
  id: number;
  title: string;
  image: string;
  createdAt: string | Date;
};

export const metadata = {
  title: "Legal Documents | Admin",
};

export default async function LegalDocumentsPage() {
  const documents = await prisma.legalDocument.findMany({
    orderBy: { createdAt: "desc" },
  });

  const formFields = [
    {
      name: "title",
      label: "Document Title",
      type: "text" as const,
      placeholder: "e.g., Work Permit Policy",
      required: true,
    },
    {
      name: "image",
      label: "Upload Document Image",
      type: "file" as const,
      accept: "image/jpeg,image/png,image/webp,image/gif",
      required: true,
    },
  ];

  return (
    <div className="space-y-8">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-1">
          <AdminForm
            action={createLegalDocument}
            title="Add Legal Document"
            fields={formFields}
            submitButtonText="Add Document"
          />
        </div>
        <div className="lg:col-span-2">
          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">
              Legal Documents ({documents.length})
            </h2>
            {documents.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {documents.map((doc: LegalDocumentModel) => (
                  <div
                    key={doc.id}
                    className="border border-gray-200 rounded-lg overflow-hidden hover:shadow-lg transition-shadow"
                  >
                    <img
                      src={doc.image}
                      alt={doc.title}
                      className="w-full h-40 object-cover"
                    />
                    <div className="p-4">
                      <h3 className="font-semibold text-gray-900">{doc.title}</h3>
                      <p className="text-xs text-gray-500 mt-2">
                        {new Date(doc.createdAt).toLocaleDateString()}
                      </p>
                      <form
                        action={async () => {
                          "use server";
                          await deleteLegalDocument(doc.id);
                        }}
                        className="mt-3"
                      >
                        <button
                          type="submit"
                          className="w-full px-3 py-1 bg-red-500 text-white text-xs font-medium rounded hover:bg-red-600 transition"
                        >
                          Delete
                        </button>
                      </form>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-center text-gray-600">No documents yet. Add one above!</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export const dynamic = "force-dynamic";
