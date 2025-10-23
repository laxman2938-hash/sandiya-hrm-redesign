import { prisma } from "@/lib/prisma";
import { AdminForm } from "@/components/admin/AdminForm";
import { createEmploymentCategory, deleteEmploymentCategory } from "@/app/actions";

export const metadata = {
  title: "Employment Categories | Admin",
};

export default async function EmploymentCategoriesPage() {
  const categories = await prisma.employmentCategory.findMany({
    orderBy: { createdAt: "desc" },
  });

  const formFields = [
    {
      name: "title",
      label: "Category Title",
      type: "text" as const,
      placeholder: "e.g., Nurses, Engineers",
      required: true,
    },
    {
      name: "image",
      label: "Upload Image",
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
            action={createEmploymentCategory}
            title="Add Category"
            fields={formFields}
            submitButtonText="Add Category"
          />
        </div>
        <div className="lg:col-span-2">
          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">
              Employment Categories ({categories.length})
            </h2>
            {categories.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {categories.map((cat: any) => (
                  <div
                    key={cat.id}
                    className="border border-gray-200 rounded-lg overflow-hidden hover:shadow-lg transition-shadow"
                  >
                    <img
                      src={cat.image}
                      alt={cat.title}
                      className="w-full h-40 object-cover"
                    />
                    <div className="p-4">
                      <h3 className="font-semibold text-gray-900">{cat.title}</h3>
                      <p className="text-xs text-gray-500 mt-2">
                        {new Date(cat.createdAt).toLocaleDateString()}
                      </p>
                      <form
                        action={async () => {
                          "use server";
                          await deleteEmploymentCategory(cat.id);
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
              <p className="text-center text-gray-600">No categories yet. Add one above!</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export const dynamic = "force-dynamic";
