import cuid from "cuid";
import { GetServerSideProps, type NextPage } from "next";
import dynamic from "next/dynamic";
import { useState } from "react";
import { AlgorithmContext } from "~/components/AlgorithmContext";
import Navbar from "~/components/Navbar";
import Sidebar from "~/components/Sidebar";

const ChatSection = dynamic(() => import("~/components/ChatSection"), {
  ssr: false,
});

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const { roomId } = ctx.query;
  if (typeof roomId !== "string" || !cuid.isCuid(roomId)) {
    const newRoomId = cuid();
    return {
      redirect: {
        destination: `/?roomId=${newRoomId}`,
        permanent: false,
      },
    };
  }
  return {
    props: {},
  };
};

const Home: NextPage = () => {
  const algState = useState<"KMP" | "BM">("KMP");
  return (
    <AlgorithmContext.Provider value={algState}>
      <main className="dark relative flex h-screen overflow-hidden bg-gray-800 font-soehne">
        <Sidebar />
        <div className="flex h-full max-w-full flex-1 flex-col">
          <Navbar />
          <ChatSection />
        </div>
      </main>
    </AlgorithmContext.Provider>
  );
};

export default Home;
