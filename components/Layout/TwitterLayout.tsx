import { graphQLClient } from "@/clients/api";
import { verifyUserGoogleTokenQuery } from "@/graphql/query/user";
import { useCurrentUser } from "@/hooks/user";
import { CredentialResponse, GoogleLogin } from "@react-oauth/google";
import { useQueryClient } from "@tanstack/react-query";
import Image from "next/image";
import Link from "next/link";
import React, { useCallback, useMemo } from "react";
import toast from "react-hot-toast";
import { CgMoreO } from "react-icons/cg";
import { FaSearch } from "react-icons/fa";
import { FiHome } from "react-icons/fi";
import { GiBoltShield } from "react-icons/gi";
import { IoPersonOutline } from "react-icons/io5";
import { MdOutlineMailOutline, MdOutlineVerifiedUser } from "react-icons/md";
import { PiBookmarkSimpleBold } from "react-icons/pi";
import { RiNotification4Line } from "react-icons/ri";

interface TwitterLayoutProps {
  children: React.ReactNode;
}

interface Sidebar {
  title: string;
  icon: React.ReactNode;
  link: string;
}

const TwitterLayout: React.FC<TwitterLayoutProps> = (props) => {
  const { users, isLoading } = useCurrentUser();
  const queryClient = useQueryClient();

  const sidebarMenuItems: Sidebar[] = useMemo(
    () => [
      {
        title: "Home",
        icon: <FiHome />,
        link: "/",
      },
      {
        title: "Explore",
        icon: <FaSearch />,
        link: "/explore",
      },
      {
        title: "Notifications",
        icon: <RiNotification4Line />,
        link: "/notifications",
      },
      {
        title: "Messages",
        icon: <MdOutlineMailOutline />,
        link: "/messages",
      },
      {
        title: "Bookmarks",
        icon: <PiBookmarkSimpleBold />,
        link: "/bookmarks",
      },
      {
        title: "VerfiedTag",
        icon: <MdOutlineVerifiedUser />,
        link: "/verifiedtag",
      },
      {
        title: "Profile",
        icon: <IoPersonOutline />,
        link: `/${users?.id}`,
      },
      {
        title: "More",
        icon: <CgMoreO />,
        link: "/more",
      },
    ],
    [users]
  );

  const handleLoginWithGoogle = useCallback(
    async (cred: CredentialResponse) => {
      const googleToken = cred.credential;
      if (!googleToken) {
        return toast.error("Google token not found ");
      }

      const { verifyGoogleToken } = await graphQLClient.request(
        verifyUserGoogleTokenQuery,
        { token: googleToken }
      );
      toast.success("Verified Success ");
      console.log(verifyGoogleToken);

      if (verifyGoogleToken) {
        window.localStorage.setItem("token", verifyGoogleToken);
      }

      await queryClient.invalidateQueries({ queryKey: ["current-user"] });
    },
    []
  );
  return (
    <div>
      <div className="h-screen w-screen grid grid-cols-8 md:grid-cols-22 lg:grid-cols-24 md:px-1 lg:px-16">
        <div className="col-span-1 md:col-span-5 lg:col-span-6 p-2 relative ml-1 sm:ml-5 md:ml-0">
          <div className="text-3xl md:text-4xl hover:bg-zinc-800 transition-all w-fit h-fit rounded-full md:p-2 cursor-pointer">
            <GiBoltShield />
          </div>
          <div className="mt-3">
            <ul className="space-y-2">
              {sidebarMenuItems.map((item, index) => (
                <li key={index}>
                  <Link
                    href={item?.link}
                    className="flex items-center gap-x-3 hover:bg-zinc-900 transition-all px-1 md:px-4 py-2 w-fit h-fit rounded-full cursor-pointer"
                  >
                    <span className="text-lg sm:text-xl lg:text-2xl text-gray-200">
                      {item.icon}
                    </span>
                    <span className="md:block hidden text-base lg:text-xl text-gray-200 font-medium tracking-wider">
                      {item.title}
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          <div className="mt-4 md:mr-12">
            <button className="md:block hidden text-white transition-all cursor-pointer hover:bg-[#0e81ce] font-semibold text-base tracking-wider bg-[#1C9BF0] px-4 py-2.5 w-full rounded-full">
              Post
            </button>
            <button className="md:hidden block text-white transition-all cursor-pointer hover:bg-[#0e81ce] font-semibold bg-[#1C9BF0] text-2xl px-4 py-1 w-full rounded-full">
              <GiBoltShield />
            </button>
          </div>
          <div className="absolute bottom-5 flex items-center hover:bg-zinc-900 px-1 sm:px-2 md:px-5 py-1 md:py-2 rounded-full">
            {users && users?.profileImageURL && (
              <Image
                className="rounded-full w-[30px] h-[30px] md:w-[40px] md:h-[40px]"
                src={users?.profileImageURL}
                alt="profile"
                height={50}
                width={50}
              />
            )}
            <div className="ml-2">
              <h2 className="font-semibold text-sm lg:text-base hidden md:block text-truncate">
                {users?.firstName} {users?.lastName}
              </h2>
              <p className="text-sm hidden lg:block">{users?.email}</p>
            </div>
          </div>
        </div>
        <div className="col-span-7 md:col-span-10 lg:col-span-10 border-x-[0.6px] overflow-y-auto border-gray-600">
          {props.children}
        </div>
        <div className="col-span-0 md:col-span-7 lg:col-span-8 hidden md:block p-5">
          {!isLoading && !users && (
            <div className="p-5 bg-slate-900 rounded-lg">
              <p className="text-lg font-bold mb-2">New to Bolt?</p>
              <GoogleLogin onSuccess={handleLoginWithGoogle} />
            </div>
          )}
          {/* <div>{user?.email}</div> */}
        </div>
      </div>
    </div>
  );
};

export default TwitterLayout;
