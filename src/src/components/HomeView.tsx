import Image from "next/image";
import Avatar1 from "~/assets/avatar1.png";
import Avatar2 from "~/assets/avatar2.png";
import Avatar3 from "~/assets/avatar3.png";
import BorderGradient from "./BorderGradient";

const avatars = [
  {
    image: Avatar1,
    name: "Arsa Izdihar I.",
    nim: "13521101",
  },
  {
    image: Avatar2,
    name: "Alisha Listya",
    nim: "13521171",
  },
  {
    image: Avatar3,
    name: "Vanessa Rebecca",
    nim: "13521151",
  },
];

function HomeView() {
  return (
    <div className="w-full px-6 text-gray-800 dark:text-gray-100 md:flex md:h-full md:max-w-2xl md:flex-col lg:max-w-3xl">
      <h1 className="mb-10 ml-auto mr-auto mt-6 flex items-center justify-center gap-2 text-center text-4xl font-semibold sm:mb-8 sm:mt-[20vh]">
        ChitGPT
      </h1>
      <div className="flex cursor-pointer justify-center space-x-5">
        {avatars.map((avatar, idx) => {
          return (
            <BorderGradient
              from="#96949E"
              to="rgba(83, 82, 89, 0.2)"
              className="group rounded-[20px] hover:bg-transparent"
            >
              <div className=" m-px flex items-center rounded-[20px] bg-gray-800 duration-700">
                <Image src={avatar.image} alt={"avatar" + idx} />
                <div className="w-0 overflow-hidden p-0 duration-700 group-hover:w-[8.25rem] group-hover:pl-2.5 group-hover:pr-4">
                  <p className="hidden whitespace-nowrap group-hover:block">
                    {avatar.name}
                  </p>
                  <p className="hidden whitespace-nowrap text-[#757575] group-hover:block">
                    {avatar.nim}
                  </p>
                </div>
              </div>
            </BorderGradient>
          );
        })}
      </div>
    </div>
  );
}

export default HomeView;
