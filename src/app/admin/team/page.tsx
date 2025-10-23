import { prisma } from "@/lib/prisma";
import { AdminForm } from "@/components/admin/AdminForm";
import { createTeamMember, deleteTeamMember } from "@/app/actions";

export const metadata = {
  title: "Team Management | Admin",
};

export default async function TeamPage() {
  const teamMembers = await prisma.teamMember.findMany({
    orderBy: { createdAt: "desc" },
  });

  const formFields = [
    {
      name: "name",
      label: "Full Name",
      type: "text" as const,
      placeholder: "e.g., John Doe",
      required: true,
    },
    {
      name: "designation",
      label: "Designation",
      type: "text" as const,
      placeholder: "e.g., HR Manager",
      required: false,
    },
    {
      name: "image",
      label: "Upload Photo",
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
            action={createTeamMember}
            title="Add Team Member"
            fields={formFields}
            submitButtonText="Add Member"
          />
        </div>
        <div className="lg:col-span-2">
          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">
              Team Members ({teamMembers.length})
            </h2>
            {teamMembers.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {teamMembers.map((member: any) => (
                  <div
                    key={member.id}
                    className="border border-gray-200 rounded-lg overflow-hidden hover:shadow-lg transition-shadow"
                  >
                    <img
                      src={member.image}
                      alt={member.name}
                      className="w-full h-40 object-cover"
                    />
                    <div className="p-4">
                      <h3 className="font-semibold text-gray-900">{member.name}</h3>
                      {member.designation && (
                        <p className="text-sm text-gray-600">{member.designation}</p>
                      )}
                      <p className="text-xs text-gray-500 mt-2">
                        {new Date(member.createdAt).toLocaleDateString()}
                      </p>
                      <form
                        action={async () => {
                          "use server";
                          await deleteTeamMember(member.id);
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
              <p className="text-center text-gray-600">No team members yet. Add one above!</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export const dynamic = "force-dynamic";
