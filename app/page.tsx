import FeedCard from "@/components/FeedCard";
import React from "react";
import { GiBoltShield } from "react-icons/gi";
import { FiHome } from "react-icons/fi";
import { FaSearch } from "react-icons/fa";
import { RiNotification4Line } from "react-icons/ri";
import { MdOutlineMailOutline, MdOutlineVerifiedUser } from "react-icons/md";
import { PiBookmarkSimpleBold } from "react-icons/pi";
import { IoPersonOutline } from "react-icons/io5";
import { CgMoreO } from "react-icons/cg";

interface Sidebar {
  title: String;
  icon: React.ReactNode;
}

const manageSideBar: Sidebar[] = [
  {
    title: "Home",
    icon: <FiHome />,
  },
  {
    title: "Explore",
    icon: <FaSearch />,
  },
  {
    title: "Notifications",
    icon: <RiNotification4Line />,
  },
  {
    title: "Messages",
    icon: <MdOutlineMailOutline />,
  },
  {
    title: "Bookmarks",
    icon: <PiBookmarkSimpleBold />,
  },
  {
    title: "VerfiedTag",
    icon: <MdOutlineVerifiedUser />,
  },
  {
    title: "Profile",
    icon: <IoPersonOutline />,
  },
  {
    title: "More",
    icon: <CgMoreO />,
  },
];

export default function Home() {
  return (
    <div>
      <div className="h-screen w-screen grid grid-cols-24 px-26">
        <div className="col-span-6 p-2">
          <div className="text-4xl hover:bg-zinc-800 transition-all w-fit h-fit rounded-full p-2 cursor-pointer">
            <GiBoltShield />
          </div>
          <div className="mt-3">
            <ul className="space-y-2">
              {manageSideBar.map((item, index) => (
                <li
                  key={index}
                  className="flex items-center gap-x-3 hover:bg-zinc-900 transition-all px-4 py-2 w-fit h-fit rounded-full cursor-pointer"
                >
                  <span className="text-2xl text-gray-200">{item.icon}</span>
                  <span className="text-xl text-gray-200 font-medium tracking-wider">
                    {item.title}
                  </span>
                </li>
              ))}
            </ul>
          </div>
          <div className="mt-4 mr-12">
            <button className="text-white transition-all cursor-pointer hover:bg-[#0e81ce] font-semibold text-base tracking-wider bg-[#1C9BF0] px-4 py-2.5 w-full rounded-full">
              Post
            </button>
          </div>
        </div>
        <div className="col-span-10 border-x-[0.6px] overflow-y-auto border-gray-700">
          <FeedCard />
          <FeedCard />
          <FeedCard />
          <FeedCard />
          <FeedCard />
          <FeedCard />
        </div>
        <div className="col-span-8"></div>
      </div>
    </div>
  );
}
