// -8000.app.github.dev/api/leaderboard
import ApiList from './ApiList'

export default function Leaderboard() {
  return (
    <section>
      <h2>Leaderboard</h2>
      <ApiList
        resource="leaderboard"
        renderItem={l => (
          <div>
            <strong>{l.user?.name || l.user}</strong> — points: {l.points} — rank: {l.rank}
          </div>
        )}
      />
    </section>
  )
}
