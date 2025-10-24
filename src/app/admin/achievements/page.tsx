import { prisma } from "@/lib/prisma";
import { AdminForm } from "@/components/admin/AdminForm";
import { createAchievement, deleteAchievement } from "@/app/actions";

type AchievementModel = {
  id: number;
  title: string;
  image: string;
  createdAt: string | Date;
};

export const metadata = {
  title: "Achievements | Admin",
};

export default async function AchievementsPage() {
  const achievements = await prisma.achievement.findMany({
    orderBy: { createdAt: "desc" },
  });

  const formFields = [
    {
      name: "title",
      label: "Achievement Title",
      type: "text" as const,
      placeholder: "e.g., Best Company Award 2024",
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
            action={createAchievement}
            title="Add Achievement"
            fields={formFields}
            submitButtonText="Add Achievement"
          />
        </div>
        <div className="lg:col-span-2">
          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">
              Achievements ({achievements.length})
            </h2>
            {achievements.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {achievements.map((achievement: AchievementModel) => (
                  <div
                    key={achievement.id}
                    className="border border-gray-200 rounded-lg overflow-hidden hover:shadow-lg transition-shadow"
                  >
                    <img
                      src={achievement.image}
                      alt={achievement.title}
                      className="w-full h-40 object-cover"
                    />
                    <div className="p-4">
                      <h3 className="font-semibold text-gray-900">{achievement.title}</h3>
                      <p className="text-xs text-gray-500 mt-2">
                        {new Date(achievement.createdAt).toLocaleDateString()}
                      </p>
                      <form
                        action={async () => {
                          "use server";
                          await deleteAchievement(achievement.id);
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
              <div className="text-center py-12">
                <div className="text-6xl mb-4">🏆</div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">No Achievements Yet</h3>
                <p className="text-gray-600 mb-4">
                  Showcase your company's accomplishments, awards, and certifications here.
                </p>
                <div className="text-sm text-gray-500">
                  💡 Tip: Add certificates, awards, and milestones to build credibility.
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
