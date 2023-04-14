import { useQuery } from "@tanstack/react-query";
import { useRouter } from "next/router";
import { getHistories } from "~/utils/api-client";
import HistoryNav from "./HistoryNav";
import NavButton from "./NavButton";

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
  const router = useRouter();
  return (
    <div className="scrollbar-trigger flex h-full w-full flex-1 items-start border-white/20">
      <nav className="flex h-full flex-1 flex-col space-y-1 p-2">
        <button
          className="mb-1 flex flex-shrink-0 cursor-pointer items-center gap-3 rounded-md border border-white/20 px-3 py-3 text-sm text-white transition-colors duration-200 hover:bg-gray-500/10"
          onClick={() => {
            router.push("/");
          }}
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
        <NavButton
          icon={
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
              <polyline points="3 6 5 6 21 6"></polyline>
              <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path>
              <line x1="10" y1="11" x2="10" y2="17"></line>
              <line x1="14" y1="11" x2="14" y2="17"></line>
            </svg>
          }
          text="Clear conversations"
        />
      </nav>
    </div>
  );
}

export default Sidebar;
