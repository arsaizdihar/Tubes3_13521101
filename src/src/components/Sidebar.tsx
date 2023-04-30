import { useQuery } from "@tanstack/react-query";
import clsx from "clsx";
import { useRouter } from "next/router";
import { useContext } from "react";
import { useNewChat } from "~/hooks/useNewChat";
import { getHistories } from "~/utils/api-client";
import { AlgorithmContext } from "./AlgorithmContext";
import HistoryNav from "./HistoryNav";

function Sidebar({ mobile }: { mobile?: boolean }) {
  if (mobile) {
    return <SidebarImpl />;
  }
  return (
    <div className="hidden flex-col bg-gray-900 md:flex md:w-[260px]">
      <div className="flex h-full min-h-0 flex-col">
        <SidebarImpl />
      </div>
    </div>
  );
}

function SidebarImpl() {
  const { data: histories } = useQuery(["histories"], getHistories);
  const [alg, setAlg] = useContext(AlgorithmContext);
  const router = useRouter();
  const onNewChat = useNewChat();
  return (
    <div className="scrollbar-trigger flex h-full w-full flex-1 items-start border-white/20">
      <nav className="flex h-full flex-1 flex-col space-y-1 p-2">
        <button
          className="mb-1 flex flex-shrink-0 cursor-pointer items-center gap-3 rounded-md border border-white/20 px-3 py-3 text-sm text-white transition-colors duration-200 hover:bg-gray-500/10"
          onClick={onNewChat}
        >
          <svg
            stroke="currentColor"
            fill="none"
            strokeWidth="2"
            viewBox="0 0 24 24"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="h-4 w-4"
            height="1em"
            width="1em"
            xmlns="http://www.w3.org/2000/svg"
          >
            <line x1="12" y1="5" x2="12" y2="19"></line>
            <line x1="5" y1="12" x2="19" y2="12"></line>
          </svg>
          New chat
        </button>
        <div className="-mr-2 flex-1 flex-col overflow-y-auto border-b border-white/20">
          <div className="flex flex-col gap-2 pb-2 text-sm text-gray-100">
            {histories?.map((history) => (
              <HistoryNav key={history.roomId} history={history} />
            ))}
          </div>
        </div>
        <h4 className="py-1 text-center text-xl font-medium text-white">
          Algorithm
        </h4>
        <div className="flex flex-col space-y-3 pl-2">
          <button
            onClick={() => setAlg("KMP")}
            type="button"
            className={clsx(
              "rounded-lg border border-gray-600 px-4 py-2 text-sm font-medium text-white hover:bg-gray-500 hover:text-white focus:z-10 focus:text-white focus:ring-2 focus:ring-blue-500",
              alg === "KMP" ? "bg-gray-500" : "bg-gray-700"
            )}
          >
            KMP
          </button>
          <button
            onClick={() => setAlg("BM")}
            type="button"
            className={clsx(
              "rounded-lg border border-gray-600 px-4 py-2 text-sm font-medium text-white hover:bg-gray-500 hover:text-white focus:z-10 focus:text-white focus:ring-2 focus:ring-blue-500",
              alg === "BM" ? "bg-gray-500" : "bg-gray-700"
            )}
          >
            BM
          </button>
        </div>
      </nav>
    </div>
  );
}

export default Sidebar;
