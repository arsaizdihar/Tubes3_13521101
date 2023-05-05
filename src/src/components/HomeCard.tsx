import clsx from "clsx";
import BorderGradient from "./BorderGradient";
import { inputRef } from "./MessageForm";

function HomeCard({
  title,
  subtitle,
  content,
  className,
  textMessage,
}: {
  title: string;
  subtitle?: string;
  content: string;
  className?: string;
  textMessage: string;
}) {
  return (
    <BorderGradient
      className={clsx(
        className,
        "group flex items-stretch self-stretch rounded-[20px] text-left duration-1000",
        "h-full w-full cursor-pointer"
      )}
      onClick={() => {
        if (inputRef.current) {
          inputRef.current.value = textMessage;
          inputRef.current.focus();
        }
      }}
      As={"button"}
    >
      <div className="m-px flex-1 rounded-[20px] bg-gray-800 p-7">
        {subtitle && <h3 className="text-xs text-[#9FA6AD]">{subtitle}</h3>}
        <h2 className={clsx("text-xl text-[#20D59C]", subtitle && "mt-2")}>
          {title}
        </h2>
        <p className="mt-2.5 text-[#9FA6AD] duration-500 group-hover:text-white">
          {content}
        </p>
      </div>
    </BorderGradient>
  );
}

export default HomeCard;
