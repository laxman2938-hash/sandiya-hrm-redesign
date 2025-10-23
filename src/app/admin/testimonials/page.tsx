import { prisma } from "@/lib/prisma";
import { AdminForm } from "@/components/admin/AdminForm";
import { createTestimonial, deleteTestimonial } from "@/app/actions";

export const metadata = {
  title: "Testimonials | Admin",
};

export default async function TestimonialsPage() {
  const testimonials = await prisma.testimonial.findMany({
    orderBy: { createdAt: "desc" },
  });

  const formFields = [
    {
      name: "name",
      label: "Client Name",
      type: "text" as const,
      placeholder: "e.g., Mamta Shrestha",
      required: true,
    },
    {
      name: "company",
      label: "Company Name",
      type: "text" as const,
      placeholder: "e.g., Global Tech Solutions",
      required: false,
    },
    {
      name: "quote",
      label: "Testimonial",
      type: "textarea" as const,
      placeholder: "Write the testimonial message here...",
      required: true,
      rows: 4,
    },
  ];

  return (
    <div className="space-y-8">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-1">
          <AdminForm
            action={createTestimonial}
            title="Add Testimonial"
            fields={formFields}
            submitButtonText="Add Testimonial"
          />
        </div>
        <div className="lg:col-span-2">
          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">
              Testimonials ({testimonials.length})
            </h2>
            {testimonials.length > 0 ? (
              <div className="space-y-4">
                {testimonials.map((testimonial: any) => (
                  <div
                    key={testimonial.id}
                    className="border-l-4 border-blue-500 bg-gray-50 p-4 rounded hover:shadow-md transition-shadow"
                  >
                    <div className="flex justify-between items-start">
                      <div className="flex-1">
                        <p className="text-sm italic text-gray-700 mb-2">"{testimonial.quote}"</p>
                        <p className="font-semibold text-gray-900">{testimonial.name}</p>
                        {testimonial.company && (
                          <p className="text-sm text-gray-600">{testimonial.company}</p>
                        )}
                        <p className="text-xs text-gray-500 mt-1">
                          {new Date(testimonial.createdAt).toLocaleDateString()}
                        </p>
                      </div>
                      <form
                        action={async () => {
                          "use server";
                          await deleteTestimonial(testimonial.id);
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
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-center text-gray-600">No testimonials yet. Add one above!</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export const dynamic = "force-dynamic";
