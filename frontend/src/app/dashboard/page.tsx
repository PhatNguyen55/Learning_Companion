export default function DashboardPage() {
  return (
    <div className="space-y-6">
      <div className="text-center">
        <h1 className="text-3xl font-bold">Welcome to Learning Companion</h1>
        <p className="text-muted-foreground mt-2">Choose a course to start learning</p>
      </div>

      <div className="grid auto-rows-min gap-4 md:grid-cols-3">
        <div className="bg-gradient-to-br from-blue-100 to-blue-200 aspect-video rounded-xl p-6 flex items-end">
          <h3 className="text-xl font-semibold text-blue-900">📚 Vocabulary</h3>
        </div>
        <div className="bg-gradient-to-br from-green-100 to-green-200 aspect-video rounded-xl p-6 flex items-end">
          <h3 className="text-xl font-semibold text-green-900">✏️ Grammar</h3>
        </div>
        <div className="bg-gradient-to-br from-purple-100 to-purple-200 aspect-video rounded-xl p-6 flex items-end">
          <h3 className="text-xl font-semibold text-purple-900">🎤 Speaking</h3>
        </div>
        <div className="bg-gradient-to-br from-purple-100 to-purple-200 aspect-video rounded-xl p-6 flex items-end">
          <h3 className="text-xl font-semibold text-purple-900">🎤 Listening</h3>
        </div>
        <div className="bg-gradient-to-br from-purple-100 to-purple-200 aspect-video rounded-xl p-6 flex items-end">
          <h3 className="text-xl font-semibold text-purple-900">🎤 Writing</h3>
        </div>
        <div className="bg-gradient-to-br from-purple-100 to-purple-200 aspect-video rounded-xl p-6 flex items-end">
          <h3 className="text-xl font-semibold text-purple-900">🎤 Reading</h3>
        </div>
      </div>
    </div>
  )
}
