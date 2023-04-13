import Head from 'next/head'
import Header from '@components/Header'
import Footer from '@components/Footer'

const title = 'sgID demo'

export default function Home() {
  return (
    <div className="container">
      <Head>
        <title>{title}</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main>
        <Header title={title} />
        <a className="login" href="/api/authorize?landingUrl=/api/whoami">
          <div>
            Login using sgID
          </div>
        </a>
      </main>

      <Footer />
    </div>
  )
}
