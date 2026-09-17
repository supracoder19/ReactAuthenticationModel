import React, { useEffect } from 'react'
import { useUser } from '../utility/UserContext'



const ProtectedPage: React.FC = () => {
  const userDetails = useUser();
  useEffect(() => {
  userDetails?.setUser(prev=>(
    {
      ...prev,
      username:"user",
      accessToken:"hello"
    }
  ))
  }, [])
  useEffect(() => {
  console.log(userDetails?.user)
  }, [userDetails?.user])
  return (
    <div className="min-h-screen w-full bg-zinc-950 text-zinc-100 flex flex-col">
      {/* Top Navigation Bar */}
      <header className="w-full border-b border-zinc-800 bg-zinc-900/50 backdrop-blur-sm px-6 py-4 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="size-3 rounded-full bg-indigo-500 animate-pulse" />
          <a href='https://github.com/supracoder19' target="_blank" className="font-semibold text-sm tracking-wide text-zinc-200 hover:underline cursor-pointer">
            Vist Me supracoder19
          </a>
        </div>

        {/* Logout Button in top right */}
        <button
          onClick={()=>{}}
          type="button"
          className=" cursor-pointer rounded-lg bg-zinc-800 hover:bg-red-700 px-4 py-2 text-xs font-medium text-zinc-200 border border-zinc-700 transition active:scale-95 flex items-center gap-2"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="size-4"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M15.75 9V5.25A2.25 2.25 0 0 0 13.5 3h-6a2.25 2.25 0 0 0-2.25 2.25v13.5A2.25 2.25 0 0 0 7.5 21h6a2.25 2.25 0 0 0 2.25-2.25V15M12 9l-3 3m0 0 3 3m-3-3h12"
            />
          </svg>
          Logout
        </button>
      </header>

      {/* Main Content Area */}
      <main className="flex-1 flex items-center justify-center p-6">
        <div className="max-w-xl w-full bg-zinc-900/80 border border-zinc-800 rounded-2xl p-8 shadow-2xl backdrop-blur-sm text-center">
          <div className="inline-flex items-center justify-center size-12 rounded-xl bg-indigo-500/10 text-indigo-400 border border-indigo-500/20 mb-6">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="size-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M16.5 10.5V6.75a4.5 4.5 0 1 0-9 0v3.75m-.75 11.25h10.5a2.25 2.25 0 0 0 2.25-2.25v-6.75a2.25 2.25 0 0 0-2.25-2.25H6.75a2.25 2.25 0 0 0-2.25 2.25v6.75a2.25 2.25 0 0 0 2.25 2.25Z"
              />
            </svg>
          </div>

          <h1 className="text-3xl font-bold tracking-tight text-white mb-3">
            Authentication Management System
          </h1>

          <p className="text-zinc-400 text-sm leading-relaxed mb-6">
            Welcome to the platform! I am building this project to explore modern authentication patterns, secure session workflows, and seamless user identity management.
          </p>

          <div className="grid grid-cols-2 gap-4 text-left border-t border-zinc-800/80 pt-6">
            <div className="rounded-lg bg-zinc-950 p-4 border border-zinc-800">
              <span className="block text-xs font-semibold text-zinc-400 uppercase tracking-wider mb-1">
                Security
              </span>
              <p className="text-xs text-zinc-300">
                Encrypted token handling & session states
              </p>
            </div>
            <div className="rounded-lg bg-zinc-950 p-4 border border-zinc-800">
              <span className="block text-xs font-semibold text-zinc-400 uppercase tracking-wider mb-1">
                Architecture
              </span>
              <p className="text-xs text-zinc-300">
                Clean, modular React & TypeScript setup
              </p>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}

export default ProtectedPage