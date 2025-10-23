import { prisma } from "@/lib/prisma";
import { AdminForm } from "@/components/admin/AdminForm";
import { DataTable } from "@/components/admin/DataTable";
import { createGalleryImage, deleteGalleryImage } from "@/app/actions";

// Minimal type to satisfy TS during build without relying on Prisma type generation path
type GalleryImageModel = {
  id: number;
  title: string;
  image: string;
  createdAt: string | Date;
};

export const metadata = {
  title: "Gallery Management | Admin",
};


export default async function GalleryPage() {
  const galleryImages: GalleryImageModel[] = await prisma.galleryImage.findMany({
    orderBy: { createdAt: "desc" },
  });

  const formFields = [
    {
      name: "title",
      label: "Image Title",
      type: "text" as const,
      placeholder: "e.g., Summer Event 2024",
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

  const tableColumns = [
    { key: "id", label: "ID" },
    { key: "title", label: "Title" },
    {
      key: "image",
      label: "Preview",
      render: (value: string) => (
        <img
          src={value}
          alt="Gallery"
          className="h-10 w-10 object-cover rounded"
        />
      ),
    },
    {
      key: "createdAt",
      label: "Created",
      render: (value: Date) => new Date(value).toLocaleDateString(),
    },
  ];

  return (
    <div className="space-y-8">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-1">
          <AdminForm
            action={createGalleryImage}
            title="Add Gallery Image"
            fields={formFields}
            submitButtonText="Add Image"
          />
        </div>
        <div className="lg:col-span-2">
          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">
              Gallery Images ({galleryImages.length})
            </h2>
            {galleryImages.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {galleryImages.map((image: GalleryImageModel) => (
                  <div
                    key={image.id}
                    className="border border-gray-200 rounded-lg overflow-hidden hover:shadow-lg transition-shadow"
                  >
                    <img
                      src={image.image}
                      alt={image.title}
                      className="w-full h-40 object-cover"
                    />
                    <div className="p-3">
                      <h3 className="font-semibold text-gray-900">{image.title}</h3>
                      <p className="text-xs text-gray-600 mt-1">
                        {new Date(image.createdAt).toLocaleDateString()}
                      </p>
                      <form
                        action={async () => {
                          "use server";
                          await deleteGalleryImage(image.id);
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
              <p className="text-center text-gray-600">No gallery images yet. Add one above!</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export const dynamic = "force-dynamic";
