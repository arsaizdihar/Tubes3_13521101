import { useRouter } from "next/router";
import { ApiHistory } from "~/utils/api-client";
import NavButton from "./NavButton";

function HistoryNav({ history }: { history: ApiHistory }) {
  const router = useRouter();
  const isActive = router.query.roomId === history.roomId;
  return (
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
          <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path>
        </svg>
      }
      isActive={isActive}
      text={history.question}
      onClick={() =>
        router.push({ pathname: "/", search: `?roomId=${history.roomId}` })
      }
    />
  );
}

export default HistoryNav;
