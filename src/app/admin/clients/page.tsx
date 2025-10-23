import { prisma } from "@/lib/prisma";
import { AdminForm } from "@/components/admin/AdminForm";
import { createClient, deleteClient } from "@/app/actions";

export const metadata = {
  title: "Clients | Admin",
};

export default async function ClientsPage() {
  const clients = await prisma.client.findMany({
    orderBy: { createdAt: "desc" },
  });

  const formFields = [
    {
      name: "name",
      label: "Client Name",
      type: "text" as const,
      placeholder: "e.g., Global Tech Solutions",
      required: true,
    },
    {
      name: "logo",
      label: "Upload Logo",
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
            action={createClient}
            title="Add Client"
            fields={formFields}
            submitButtonText="Add Client"
          />
        </div>
        <div className="lg:col-span-2">
          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">
              Clients ({clients.length})
            </h2>
            {clients.length > 0 ? (
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                {clients.map((client: any) => (
                  <div
                    key={client.id}
                    className="border border-gray-200 rounded-lg p-4 hover:shadow-lg transition-shadow text-center"
                  >
                    <img
                      src={client.logo}
                      alt={client.name}
                      className="h-16 w-16 object-contain mx-auto mb-2"
                    />
                    <h3 className="font-semibold text-gray-900 text-sm">{client.name}</h3>
                    <p className="text-xs text-gray-500 mt-1">
                      {new Date(client.createdAt).toLocaleDateString()}
                    </p>
                    <form
                      action={async () => {
                        "use server";
                        await deleteClient(client.id);
                      }}
                      className="mt-3"
                    >
                      <button
                        type="submit"
                        className="w-full px-2 py-1 bg-red-500 text-white text-xs font-medium rounded hover:bg-red-600 transition"
                      >
                        Delete
                      </button>
                    </form>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-center text-gray-600">No clients yet. Add one above!</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export const dynamic = "force-dynamic";
