import { useState, type SubmitEvent } from 'react'

const Login = () => {
  const [email, setEmail] = useState<string>('')
  const [password, setPassword] = useState<string>('')

  const handleSubmit = ( e: SubmitEvent ) => {
    e.preventDefault()
    
  }

  return (
    <div className="flex h-screen w-full items-center justify-center bg-zinc-950 text-zinc-100 p-4">
      <div className="w-full max-w-md rounded-2xl bg-zinc-900/80 p-8 border border-zinc-800 shadow-xl backdrop-blur-sm">
        <div className="mb-6 text-center">
          <h1 className="text-2xl font-bold tracking-tight">Welcome back</h1>
          <p className="mt-1 text-sm text-zinc-400">Please enter your credentials to log in</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-xs font-medium text-zinc-300 mb-1.5" htmlFor="email">
              Username
            </label>
            <input
              id="email"
              type="email"
              required
              placeholder="username"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full rounded-lg bg-zinc-950 px-3.5 py-2.5 text-sm text-zinc-100 border border-zinc-800 outline-none transition focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 placeholder:text-zinc-600"
            />
          </div>

          <div>
            <div className="flex items-center justify-between mb-1.5">
              <label className="text-xs font-medium text-zinc-300" htmlFor="password">
                Password
              </label>
              <button onClick={()=>{alert(`user name is ${"user"} and password is ${"1234"}`)}} className="text-xs text-indigo-400 hover:text-indigo-300 transition">
                Forgot?
              </button>
            </div>
            <input
              id="password"
              type="password"
              required
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full rounded-lg bg-zinc-950 px-3.5 py-2.5 text-sm text-zinc-100 border border-zinc-800 outline-none transition focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 placeholder:text-zinc-600"
            />
          </div>

          <button
            type="submit"
            className="w-full cursor-pointer rounded-lg bg-indigo-600 px-4 py-2.5 text-sm font-semibold text-white shadow-sm transition hover:bg-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 focus:ring-offset-zinc-900 active:bg-indigo-700"
          >
            Sign in
          </button>
        </form>

       
      </div>
    </div>
  )
}

export default Login