// -8000.app.github.dev/api/workouts
import ApiList from './ApiList'

export default function Workouts() {
  return (
    <section>
      <h2>Workouts</h2>
      <ApiList
        resource="workouts"
        renderItem={w => (
          <div>
            <strong>{w.activity?.name || w.activity}</strong> — {w.durationMinutes} min — {w.calories} cal
          </div>
        )}
      />
    </section>
  )
}
