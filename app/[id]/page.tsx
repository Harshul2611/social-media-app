"use client";
import { useParams } from "next/navigation";
import FeedCard from "@/components/FeedCard";
import TwitterLayout from "@/components/Layout/TwitterLayout";
import { Tweet } from "@/gql/graphql";
import { useCurrentUser, useCurrentUserById } from "@/hooks/user";
import type { NextPage } from "next";
import Image from "next/image";
import { FaArrowLeftLong } from "react-icons/fa6";
import Link from "next/link";

const UserProfilePage: NextPage = () => {
  const params = useParams();
  const id = params.id as string;
  const { user, isLoading, isError } = useCurrentUserById(id);

  if (isLoading) {
    console.log("Loading...");
  } else if (isError) {
    console.log("Error in loading");
  } else {
    console.log("User: ", user);
  }
  return (
    <div>
      <TwitterLayout>
        <div>
          <nav className="flex items-center gap-x-3 md:gap-x-5 lg:gap-x-7 p-2 px-3 md:px-5">
            <Link className="cursor-pointer" href={"/"}>
              <FaArrowLeftLong className="text-sm sm:text-base md:text-lg text-white" />
            </Link>
            <div>
              <div className="text-base sm:text-lg md:text-xl font-bold">
                {user?.firstName} {user?.lastName}
              </div>
              <div className="text-xs sm:text-sm text-gray-300">
                {user?.tweets?.length} Tweets
              </div>
            </div>
          </nav>
          <div className="px-3 mt-3 sm:px-4 md:px-6 border-b border-slate-800 pb-2 md:pb-4">
            {user?.profileImageURL && (
              <Image
                src={user?.profileImageURL}
                alt="Profile"
                width={100}
                height={100}
                className="rounded-full w-20 md:w-24 lg:w-26 h-auto"
              />
            )}
            <div className="font-bold mt-3 text-xl">
              {user?.firstName} {user?.lastName}
            </div>
          </div>
          <div>
            {user?.tweets?.map((tweet) => (
              <FeedCard key={tweet?.id} data={tweet as Tweet} />
            ))}
          </div>
        </div>
      </TwitterLayout>
    </div>
  );
};

export default UserProfilePage;
