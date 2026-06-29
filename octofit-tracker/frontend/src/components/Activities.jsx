// -8000.app.github.dev/api/activities
import ApiList from './ApiList'

export default function Activities() {
  return (
    <section>
      <h2>Activities</h2>
      <ApiList
        resource="activities"
        renderItem={a => (
          <div>
            <strong>{a.name}</strong> — MET: {a.met}
          </div>
        )}
      />
    </section>
  )
}
