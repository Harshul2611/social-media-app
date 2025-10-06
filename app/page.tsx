"use client";

import FeedCard from "@/components/FeedCard";
import React, { useCallback, useState } from "react";
import { useCurrentUser } from "@/hooks/user";
import Image from "next/image";
import { BiImageAlt } from "react-icons/bi";
import { useCreateTweet, useGetAllTweets } from "@/hooks/tweet";
import { Tweet } from "@/gql/graphql";
import TwitterLayout from "@/components/Layout/TwitterLayout";
import { graphQLClient } from "@/clients/api";
import { getImageURLQuery } from "@/graphql/query/tweet";
import axios from "axios";
import toast from "react-hot-toast";

export default function Home() {
  const { users, isLoading } = useCurrentUser();
  const { tweets, loading } = useGetAllTweets();
  const { mutate } = useCreateTweet();
  const [imageUrl, setImageUrl] = useState<string>("");
  const [content, setContent] = useState<string>("");

  const handleInputFunction = useCallback((input: HTMLInputElement) => {
    return async (e: Event) => {
      e.preventDefault();
      const file: File | null | undefined = input.files?.item(0);
      if (!file) return;

      const { getSignedUrlForTweet } = await graphQLClient.request(
        getImageURLQuery,
        {
          imageName: file.name,
          imageType: file.type,
        }
      );

      if (getSignedUrlForTweet) {
        const toastId = toast.loading("Uploading...");
        await axios.put(getSignedUrlForTweet, file, {
          headers: {
            "Content-Type": file.type,
          },
        });
        toast.success("Image Uploaded", { id: toastId });
        const url = new URL(getSignedUrlForTweet);
        const filePath = `${url.origin}${url.pathname}`;
        setImageUrl(filePath);
      }
    };
  }, []);

  const handleSelectImage = useCallback(() => {
    const input = document.createElement("input");
    input.setAttribute("type", "file");
    input.setAttribute("accept", "image/*");

    const handleInputFunc = handleInputFunction(input);

    input.addEventListener("change", handleInputFunc);
    input.click();
  }, [handleInputFunction]);

  const handleCreateTweet = useCallback(() => {
    mutate({ content, imageUrl });
    setContent("");
    setImageUrl("");
  }, [content, imageUrl, mutate]);

  return (
    <div>
      <TwitterLayout>
        <div>
          <div className="border border-gray-700 p-2 md:p-4 border-x-0 border-b-0 transition-all cursor-pointer">
            <div className="grid grid-cols-12">
              <div className="col-span-1">
                {users?.profileImageURL && (
                  <Image
                    src={users?.profileImageURL}
                    alt="profile"
                    className="rounded-full w-[30px] h-[30px] md:w-[40px] md:h-[40px]"
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
                  className="w-full bg-transparent text-white outline-none text-sm sm:text-base md:text-lg px-3 border-b border-slate-700"
                  placeholder="what's happening"
                ></textarea>
                {imageUrl && (
                  <Image
                    src={imageUrl}
                    alt="post-image"
                    width={300}
                    height={300}
                  />
                )}
                <div className="mt-0.5 sm:mt-1 md:mt-2 flex items-center justify-between">
                  <div className="hover:bg-gray-800 rounded-full px-2 py-2 focus:bg-gray-900">
                    <BiImageAlt
                      onClick={handleSelectImage}
                      className="text-lg md:text-xl"
                    />
                  </div>
                  <button
                    onClick={handleCreateTweet}
                    className="text-white transition-all mr-4 md:mr-0 cursor-pointer hover:bg-[#0e81ce] font-semibold text-xs sm:text-sm md:text-base tracking-wider bg-[#1C9BF0] px-2 md:px-4 py-0.5 md:py-1 rounded-full"
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
      </TwitterLayout>
    </div>
  );
}
