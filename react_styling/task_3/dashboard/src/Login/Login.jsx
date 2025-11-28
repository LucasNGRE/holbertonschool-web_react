import WithLogging from '../HOC/WithLogging'

function Login() {
  return (
    <div className="flex h-[45vh] flex-col border-t-4 border-[color:var(--main-color)] px-10 py-5">
      <p className="text-xl">
        Login to access the full dashboard
      </p>

      <form className="mt-8 flex items-center gap-3 text-lg">
        <label htmlFor="email">Email</label>
        <input
          type="email"
          name="user_email"
          id="email"
          className="rounded border px-2 py-1"
        />

        <label htmlFor="password">Password</label>
        <input
          type="password"
          name="user_password"
          id="password"
          className="rounded border px-2 py-1"
        />

        <button className="ml-2 rounded border px-3 py-1 hover:bg-gray-100">
          OK
        </button>
      </form>
    </div>
  )
}

const LoginWithLogging = WithLogging(Login)
export default LoginWithLogging
