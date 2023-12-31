import Card from "@/components/Home/Card";
import Leftside from "@/components/Home/Leftside";
import Search from "@/components/Home/Search";
import Head from "next/head";
// import { api } from "@/utils/api";

export default function Home() {
  // const hello = api.example.hello.useQuery({ text: "from Sonix Tone" });

  return (
    <>
      <Head>
        <title>Sonix Tone</title>
        <meta name="description" content="Generated by Fremen" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className="container flex min-h-screen max-w-7xl flex-col">
        <div className="container my-5 flex flex-col sm:flex-row">
          <div className="relative mx-auto flex w-full max-w-lg flex-col items-center justify-center">
            <div className="absolute -left-40 top-20 hidden flex-col items-end sm:flex">
              <Leftside />
            </div>
            <Search />
            <Card />
            <Card />
            <Card />
            <Card />
          </div>
        </div>
      </main>
    </>
  );
}
