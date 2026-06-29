// -8000.app.github.dev/api/teams
import ApiList from './ApiList'

export default function Teams() {
  return (
    <section>
      <h2>Teams</h2>
      <ApiList
        resource="teams"
        renderItem={t => (
          <div>
            <strong>{t.name}</strong> — members: {t.members ? t.members.length : 0} — points: {t.totalPoints}
          </div>
        )}
      />
    </section>
  )
}
