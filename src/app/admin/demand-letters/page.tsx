import { prisma } from "@/lib/prisma";
import { AdminForm } from "@/components/admin/AdminForm";
import { createDemandLetter, deleteDemandLetter } from "@/app/actions";

export const metadata = {
  title: "Demand Letters | Admin",
};

export default async function DemandLettersPage() {
  const demands = await prisma.demandLetter.findMany({
    orderBy: { createdAt: "desc" },
  });

  const formFields = [
    {
      name: "title",
      label: "Job Title",
      type: "text" as const,
      placeholder: "e.g., Nurse, Security Guard",
      required: true,
    },
    {
      name: "image",
      label: "Upload Demand Letter",
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
            action={createDemandLetter}
            title="Add Demand Letter"
            fields={formFields}
            submitButtonText="Add Job"
          />
        </div>
        <div className="lg:col-span-2">
          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">
              Active Demands ({demands.length})
            </h2>
            {demands.length > 0 ? (
              <div className="space-y-3">
                {demands.map((demand: any) => (
                  <div
                    key={demand.id}
                    className="flex items-center justify-between p-4 border border-gray-200 rounded-lg hover:shadow-md transition-shadow"
                  >
                    <div className="flex-1">
                      <h3 className="font-semibold text-gray-900">{demand.title}</h3>
                      <p className="text-sm text-gray-600">
                        ID: {demand.id} • {new Date(demand.createdAt).toLocaleDateString()}
                      </p>
                    </div>
                    <img
                      src={demand.image}
                      alt={demand.title}
                      className="h-12 w-12 object-cover rounded ml-4"
                    />
                    <form
                      action={async () => {
                        "use server";
                        await deleteDemandLetter(demand.id);
                      }}
                      className="ml-2"
                    >
                      <button
                        type="submit"
                        className="px-3 py-1 bg-red-500 text-white text-xs font-medium rounded hover:bg-red-600 transition"
                      >
                        Delete
                      </button>
                    </form>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-center text-gray-600">No active demands. Add one above!</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export const dynamic = "force-dynamic";
