import Head from 'next/head'
import Header from '@components/Header'
import Footer from '@components/Footer'
import Link from 'next/link'

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
        <Link href="/api/authorize?landingUrl=/me">
          <div className="login">Login using sgID</div>
        </Link>
      </main>

      <Footer />
    </div>
  )
}
