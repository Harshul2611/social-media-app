"use client";

import FeedCard from "@/components/FeedCard";
import React, { useCallback, useState } from "react";
import { GiBoltShield } from "react-icons/gi";
import { FiHome } from "react-icons/fi";
import { FaSearch } from "react-icons/fa";
import { RiNotification4Line } from "react-icons/ri";
import { MdOutlineMailOutline, MdOutlineVerifiedUser } from "react-icons/md";
import { PiBookmarkSimpleBold } from "react-icons/pi";
import { IoPersonOutline } from "react-icons/io5";
import { CgMoreO } from "react-icons/cg";
import { CredentialResponse, GoogleLogin } from "@react-oauth/google";
import toast from "react-hot-toast";
import { graphQLClient } from "@/clients/api";
import { verifyUserGoogleTokenQuery } from "@/graphql/query/user";
import { useCurrentUser } from "@/hooks/user";
import { useQueryClient } from "@tanstack/react-query";
import Image from "next/image";
import { BiImageAlt } from "react-icons/bi";
import { useCreateTweet, useGetAllTweets } from "@/hooks/tweet";
import { Tweet } from "@/gql/graphql";

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
  const { user, isLoading } = useCurrentUser();
  const { tweets, loading } = useGetAllTweets();
  const { mutate } = useCreateTweet();
  const queryClient = useQueryClient();
  const [content, setContent] = useState<string>("");

  const handleSelectImage = useCallback(() => {
    const input = document.createElement("input");
    input.setAttribute("type", "file");
    input.setAttribute("accept", "image/*");
    input.click();
  }, []);

  const handleCreateTweet = useCallback(() => {
    mutate({ content });
  }, [content, mutate]);

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
      <div className="h-screen w-screen grid grid-cols-24 px-26">
        <div className="col-span-6 p-2 relative">
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
          <div className="absolute bottom-5 flex items-center hover:bg-zinc-900 px-5 py-2 rounded-full">
            {user && user?.profileImageURL && (
              <Image
                className="rounded-full"
                src={user?.profileImageURL}
                alt="profile"
                height={40}
                width={40}
              />
            )}
            <div className="ml-2">
              <h2 className="font-semibold text-base">
                {user?.firstName} {user?.lastName}
              </h2>
              <p className="text-sm">{user?.email}</p>
            </div>
          </div>
        </div>
        <div className="col-span-10 border-x-[0.6px] overflow-y-auto border-gray-700">
          <div>
            <div className="border border-gray-700 p-4 border-x-0 border-b-0 transition-all cursor-pointer">
              <div className="grid grid-cols-12">
                <div className="col-span-1">
                  {user?.profileImageURL && (
                    <Image
                      src={user?.profileImageURL}
                      alt="profile"
                      className="rounded-full"
                      width={50}
                      height={50}
                    />
                  )}
                </div>
                <div className="col-span-11">
                  <textarea
                    value={content}
                    onChange={(e) => setContent(e.target.value)}
                    rows={3}
                    className="w-full bg-transparent text-white outline-none text-lg px-3 border-b border-slate-700"
                    placeholder="what's happening"
                  ></textarea>
                  <div className="mt-2 flex items-center justify-between">
                    <div className="hover:bg-gray-800 rounded-full px-2 py-2 focus:bg-gray-900">
                      <BiImageAlt
                        onClick={handleSelectImage}
                        className="text-xl"
                      />
                    </div>
                    <button
                      onClick={handleCreateTweet}
                      className="text-white transition-all cursor-pointer hover:bg-[#0e81ce] font-semibold text-base tracking-wider bg-[#1C9BF0] px-4 py-1 rounded-full"
                    >
                      Post
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {tweets?.map((tweet) =>
            tweet ? <FeedCard key={tweet?.id} data={tweet as Tweet} /> : null
          )}
        </div>
        <div className="col-span-8 p-5">
          {!isLoading && !user && (
            <div className="p-5 bg-slate-900 rounded-lg">
              <p className="text-lg font-bold mb-2">New to Bolt?</p>
              <GoogleLogin onSuccess={handleLoginWithGoogle} />
            </div>
          )}
          <div>{user?.email}</div>
        </div>
      </div>
    </div>
  );
}
