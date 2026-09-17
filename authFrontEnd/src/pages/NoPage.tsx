import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router';

export default function NoPage() {
    const [timer, setTimer] = useState<number>(5);
    const navigate = useNavigate()
    const timerFunc = () => {
        setTimer((prev: number) => (prev - 1))
    }
    useEffect(() => {
        if (timer <= 0) navigate("/")
        const inter = setInterval(() => {
            timerFunc()
        }, 1000);
        return () => {
            clearInterval(inter)
        }
    }, [timer])
    return (
        <main className="grid min-h-screen place-items-center bg-white px-6 py-24 sm:py-32 lg:px-8 dark:bg-slate-900">
            <div className="text-center">
                <p className="text-base font-semibold text-indigo-600 dark:text-indigo-400">
                    404
                </p>
                <h1 className="mt-4 text-4xl font-bold tracking-tight text-slate-900 sm:text-5xl dark:text-white">
                    Page not found
                </h1>
                <p className="mt-6 text-base leading-7 text-slate-600 dark:text-slate-400">
                    Sorry, we couldn’t find the page you’re looking for.
                </p>
                <div className="mt-10 flex flex-col items-center justify-center gap-x-6">
                    <Link
                        to="/"
                        className="rounded-md bg-indigo-600 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 dark:bg-indigo-500 dark:hover:bg-indigo-400"
                    >
                        Go back home
                    </Link>
                    <span className='text-white'>You will be redirected to login page in {timer.toString()}.... </span>
                </div>
            </div>
        </main>
    );
}