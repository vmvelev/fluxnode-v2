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
          <nav className="sticky top-0 z-50 bg-gray-900 text-white w-screen">
            <div className='grid grid-cols-3 w-full px-6 py-4 items-center'>
              <div>
                <Link className="text-3xl font-bold font-heading" href="/">
                  <Image className="w-1/4" src={FluxLogo} alt="logo" />
                </Link>
              </div>
              <div className='text-center'>
                <Link className="text-2xl hover:text-sky-500" href="/">Home</Link>
                <Link className="text-2xl mx-4 hover:text-sky-500" href="/nodes">Nodes</Link>
                <Link className="text-2xl hover:text-sky-500" href="/guides">Guides</Link>
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
              <div className='grid'>
                <h1 className="text-xl mb-2 font-bold">Follow us</h1>
                <div className='flex'>
                  <Link href="https://twitter.com/2ndTLMining" target='_blank'>
                    <div className="bg-[url('./socialIcons/twitter-white.png')] hover:bg-[url('./socialIcons/twitter-sky.png')] bg-cover h-10 w-10">
                    </div>
                  </Link>
                  <Link href="https://www.youtube.com/channel/UCO-gfYYQL22oibzOjr1SnHA" target='_blank'>
                    <div className="bg-[url('./socialIcons/youtube-white.png')] hover:bg-[url('./socialIcons/youtube-sky.png')] bg-cover ml-1 h-10 w-10">
                    </div>
                  </Link>
                  <Link href="mailto:2ndtlmining@gmail.com" target='_blank'>
                    <div className="bg-[url('./socialIcons/email-white.png')] hover:bg-[url('./socialIcons/email-sky.png')] bg-cover ml-1 h-10 w-10">
                    </div>
                  </Link>
                  <Link href="https://github.com/2ndtlmining/Fluxnode" target='_blank'>
                    <div className="bg-[url('./socialIcons/github-white.png')] hover:bg-[url('./socialIcons/github-sky.png')] bg-cover ml-1 h-10 w-10">
                    </div>
                  </Link>
                </div>
              </div>
              <div className='grid text-center place-items-center'>
                <h1 className='text-md'>Donations are very much appreciated!</h1>
                <h1 className='text-md'>Please consider donating to keep the website development going.</h1>
              </div>
              <div className='text-center mt-3'>
                <h1 className='text-md'>Flux address: t1ebxupkNYVQiswfwi7xBTwwKtioJqwLmUG</h1>
                <h1 className='text-md'>BTC Address: 1MjMuVLEaAd8HJd3mh94L8qQe4cE6tH87V</h1>
              </div>
            </div>
          </footer>
        </div>
      </body>
    </html>
  )
}
