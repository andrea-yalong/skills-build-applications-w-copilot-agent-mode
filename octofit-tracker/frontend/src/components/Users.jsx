import ApiList from './ApiList'

export default function Users() {
  return (
    <section>
      <h2>Users</h2>
      <ApiList
        resource="users"
        renderItem={u => (
          <div>
            <strong>{u.name}</strong> — {u.email} — points: {u.points}
          </div>
        )}
      />
    </section>
  )
}
