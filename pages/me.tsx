import Head from "next/head";
import Header from "@components/Header";
import Footer from "@components/Footer";
import { useQuery } from "@tanstack/react-query";

const title = "Your Profile";

export default function Home() {
  const { data, isLoading, isError } = useQuery(["whoami"], async () => {
    const response = await fetch("/api/whoami", { credentials: "same-origin" });
    return response.json();
  });

  return (
    <div className="container">
      <Head>
        <title>{title}</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main>
        <Header title={title} />
        {isLoading ? (
          <div>Retrieving details about you...</div>
        ) : isError ? (
          <div>
            There was an error logging in! Click the button below to try again.
          </div>
        ) : data.sub ? (
          <div className="profile">
            {Object.entries(data.data).map(([scope, value]) => (
              <>
                <div className="heading">{scope}</div>
                <div>{value as string}</div>
              </>
            ))}
          </div>
        ) : (
          <div>You are not logged in! Click the button below to do so.</div>
        )}
        <a className="login" href="/api/authorize/logout">
          <div>Logout and Start Again</div>
        </a>
      </main>

      <Footer />
    </div>
  );
}
