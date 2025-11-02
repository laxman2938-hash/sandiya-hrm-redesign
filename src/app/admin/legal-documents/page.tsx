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
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {documents.map((doc: LegalDocumentModel) => (
                  <div
                    key={doc.id}
                    className="border border-gray-200 rounded-lg overflow-hidden hover:shadow-lg transition-shadow"
                  >
                    <div className="relative group">
                      <img
                        src={doc.image}
                        alt={doc.title}
                        className="w-full h-64 object-cover"
                      />
                      <a
                        href={doc.image}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center"
                      >
                        <div className="text-white text-center">
                          <svg className="w-12 h-12 mx-auto mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                          </svg>
                          <p className="text-sm font-semibold">Click to View Full Size</p>
                        </div>
                      </a>
                    </div>
                    <div className="p-4">
                      <h3 className="font-semibold text-gray-900 mb-1">{doc.title}</h3>
                      <p className="text-xs text-gray-500 mb-3">
                        Added: {new Date(doc.createdAt).toLocaleDateString()}
                      </p>
                      <div className="flex gap-2">
                        <a
                          href={doc.image}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex-1 px-3 py-2 bg-blue-500 text-white text-xs font-medium rounded hover:bg-blue-600 transition text-center"
                        >
                          View Document
                        </a>
                        <form
                          action={async () => {
                            "use server";
                            await deleteLegalDocument(doc.id);
                          }}
                          className="flex-1"
                        >
                          <button
                            type="submit"
                            className="w-full px-3 py-2 bg-red-500 text-white text-xs font-medium rounded hover:bg-red-600 transition"
                          >
                            Delete
                          </button>
                        </form>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-12">
                <div className="text-6xl mb-4">📜</div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">No Legal Documents</h3>
                <p className="text-gray-600 mb-4">
                  Upload important legal documents like licenses, certificates, and compliance documents.
                </p>
                <div className="text-sm text-gray-500">
                  💡 Tip: Display legal documents to build trust and show compliance.
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export const dynamic = "force-dynamic";
