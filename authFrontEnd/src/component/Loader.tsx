
const Loader = () => {
  return (
      <div className="absolute w-full h-screen bg-black/20 z-10 flex items-center justify-center gap-2 backdrop-blur-md" role="status" aria-label="Loading">
        <span
          className="size-3 animate-bounce rounded-full bg-indigo-600 dark:bg-indigo-300 "
          aria-hidden="true"
        ></span>
        <span
          className="size-3 animate-bounce rounded-full bg-indigo-600 [animation-delay:0.2s] dark:bg-indigo-300"
          aria-hidden="true"
        ></span>
        <span
          className="size-3 animate-bounce rounded-full bg-indigo-600 [animation-delay:0.4s] dark:bg-indigo-300"
          aria-hidden="true"
        ></span>
      </div>
  )
}

export default Loader
