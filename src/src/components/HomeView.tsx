import Image from "next/image";
import Avatar1 from "~/assets/avatar1.png";
import Avatar2 from "~/assets/avatar2.png";
import Avatar3 from "~/assets/avatar3.png";
import BorderGradient from "./BorderGradient";
import HomeCard from "./HomeCard";

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
    <div className="w-full px-6 text-gray-800 dark:text-gray-100 md:flex md:h-full md:max-w-2xl md:flex-col lg:max-w-5xl">
      <h1 className="mb-10 ml-auto mr-auto mt-6 flex items-center justify-center gap-2 text-center text-4xl font-semibold sm:mb-8 sm:mt-[20vh]">
        ChitGPT
      </h1>
      <div className="flex justify-center space-x-5">
        {avatars.map((avatar, idx) => {
          return (
            <BorderGradient className="group cursor-default rounded-[20px] transition-all duration-1000 hover:bg-transparent">
              <div className="m-px flex items-center rounded-[20px] bg-gray-800 duration-700">
                <div className="-m-px">
                  <Image src={avatar.image} alt={"avatar" + idx} />
                </div>
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
      <div className="mt-10 grid grid-cols-7 gap-x-7 gap-y-4">
        <HomeCard
          className="col-span-2 row-span-2"
          title="Jawab Pertanyaan!"
          subtitle="CHITGPT"
          content="Fitur menjawab pertanyaan berdasarkan jawaban pada basis data. Jika pertanyaan tidak ditemukan, kami akan menemukan pertanyaan termirip untukmu."
          textMessage="Siapa presiden Indonesia?"
        />
        <HomeCard
          className="col-span-3 col-start-3 row-start-1"
          title="Kalkulator"
          content="Fitur mengevaluasi masukan sintaks persamaan matematika"
          textMessage="5*10-8/2"
        />
        <HomeCard
          className="col-span-3 col-start-3 row-start-2"
          title="Hari apa ini?"
          content="“Hari apa 24/03/1978”? Ketahuilah hari-hari
          penting di hidup kamu"
          textMessage="Hari apa 24/03/1978?"
        />
        <HomeCard
          className="col-span-2 col-start-6 row-span-2 row-start-1"
          title="Tambah dan Hapus Pertanyaan"
          content="Apakah daftar pertanyaan di basis data kurang? Tenang saja! kamu bisa menambah dan menghapus pertanyaan ke basis data"
          textMessage="Tambah pertanyaan Siapa presiden Indonesia? dengan jawaban Joko Widodo"
        />
      </div>
    </div>
  );
}

export default HomeView;
