import { Inter } from 'next/font/google'
import './globals.css'
import Image from 'next/image'
import Link from 'next/link'
import FluxLogo from "./app-logo-dark.svg"

const inter = Inter({ subsets: ['latin'] })
export const metadata = {
  title: 'Flux Node App',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <div className='flex flex-col min-h-screen'>
          <nav className="sticky top-0 z-50 bg-gray-900 text-white w-screen border-b-2 border-[#464849]">
            <div className='grid grid-cols-3 w-full px-6 py-4 items-center'>
              <div>
                <Link className="text-3xl font-bold font-heading" href="/">
                  <Image className="h-9" src={FluxLogo} alt="logo" />
                </Link>
              </div>
              <div className='text-center'>
                <Link className="hover:text-sky-500" href="/">Home</Link>
                <Link className="mx-4 hover:text-sky-500" href="/nodes">Nodes</Link>
                <Link className="hover:text-sky-500" href="/guides">Guides</Link>
              </div>
            </div>
          </nav>
          <main className="flex-grow">
            <div className="mt-3 mx-5 mb-3">
              {children}
            </div>
          </main>
          <footer className="bg-gray-900 w-full">
            <div className='grid grid-cols-3 w-full px-10 py-4'>
              <div>
                <h1 className="text-xl mb-3 font-bold">Follow us</h1>
                <div className='flex'>
                  <div className=''>
                    <Link href="https://twitter.com/fluxprotocol" target='_blank'>
                      <svg className='fill-sky-500 hover:fill-sky-300' width={50} height={50}>
                        <path d="M11 4c-3.854 0-7 3.146-7 7v28c0 3.854 3.146 7 7 7h28c3.854 0 7-3.146 7-7V11c0-3.854-3.146-7-7-7H11zm0 2h28c2.774 0 5 2.226 5 5v28c0 2.774-2.226 5-5 5H11c-2.774 0-5-2.226-5-5V11c0-2.774 2.226-5 5-5zm2.086 7 9.223 13.104L13 37h2.5l7.938-9.293L29.977 37h7.937L27.79 22.613 36 13h-2.5l-6.84 8.01L21.023 13h-7.937zm3.828 2h3.065l14.107 20H31.02L16.914 15z" />
                      </svg>
                    </Link>
                  </div>
                  <Link href="https://discord.gg/8zYbQ3r" target='_blank'>
                    <svg className='fill-sky-500 hover:fill-sky-300' width={50} height={50}>
                      <path d="M24.402 9c-6.601 0-12.8.5-16.101 1.2-2.2.5-4.102 2-4.5 4.3C3.402 16.898 3 20.5 3 25s.398 8 .898 10.5c.403 2.2 2.301 3.8 4.5 4.3 3.504.7 9.5 1.2 16.102 1.2s12.598-.5 16.098-1.2c2.203-.5 4.101-2 4.5-4.3.402-2.5.902-6.098 1-10.598 0-4.5-.5-8.101-1-10.601-.399-2.2-2.297-3.801-4.5-4.301-3.5-.5-9.598-1-16.196-1Zm0 2c7.2 0 12.996.598 15.797 1.098 1.5.402 2.7 1.402 2.899 2.703.601 3.199 1 6.601 1 10.101C44 29.2 43.5 32.7 43.098 35.2c-.297 1.899-2.297 2.5-2.899 2.703-3.601.7-9.601 1.196-15.601 1.196S12.5 38.699 9 37.902C7.5 37.5 6.3 36.5 6.102 35.2 5.3 32.4 5 28.7 5 25c0-4.602.402-8 .8-10.098C6.103 13 8.2 12.398 8.7 12.2 12 11.5 18.101 11 24.401 11ZM19 17v16l14-8Zm2 3.402L29 25l-8 4.598Z" />
                    </svg>
                  </Link>
                  <Link href="abv.bg" target='_blank'>
                    <svg className='fill-sky-500 hover:fill-sky-300' width={50} height={50}>
                      <path d="M0 25v18h50V7H0v18zm48-14.7C48 11.6 26.7 29 25.1 29 23.5 29 2.5 12 2.2 10.4 1.9 9.2 5.4 9 24.9 9 43.1 9 48 9.3 48 10.3zM25 32c.3 0 5.6-4.1 11.8-9L48 13.9V41H2V13.9L13.2 23c6.2 4.9 11.5 9 11.8 9z" />
                    </svg>
                  </Link>
                </div>
              </div>
            </div>
          </footer>
        </div>
      </body >
    </html >
  )
}
