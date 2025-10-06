import Image from "next/image";
import { BiMessageRounded } from "react-icons/bi";
import { FaRetweet } from "react-icons/fa6";
import { FaRegHeart } from "react-icons/fa";
import { FiUpload } from "react-icons/fi";
import { Tweet } from "@/gql/graphql";
import Link from "next/link";

interface FeedCardProps {
  data: Tweet;
}

export default function FeedCard(props: FeedCardProps) {
  const { data } = props;
  return (
    <div className="border border-gray-700 px-2 py-4 md:px-4 border-x-0 border-b-0 transition-all cursor-pointer">
      <div className="grid grid-cols-12">
        <div className="col-span-1">
          <div className="w-[30px] h-[30px] md:w-[40px] md:h-[40px] rounded-full overflow-hidden">
            {data.author.profileImageURL && (
              <Image
                src={data?.author?.profileImageURL}
                alt="profile"
                width={50}
                height={50}
              />
            )}
          </div>
        </div>
        <div className="col-span-11 pl-3 sm:pl-0 md:pl-4.5">
          <Link
            href={`/${data?.author?.id}`}
            className="text-sm md:text-base font-semibold"
          >
            {data?.author?.firstName} {data?.author?.lastName}
          </Link>
          <p className="text-xs md:text-sm">{data?.content}</p>
          {data?.imageUrl && (
            <Image
              src={data?.imageUrl}
              alt="tweet-image"
              width={300}
              height={300}
              className="mt-3"
            />
          )}
          <div className="flex items-center justify-between text-lg pr-6 md:pr-10 lg:pr-14 mt-3">
            <div className="text-sm md:text-base hover:text-[#1C9BF0]">
              <BiMessageRounded />
            </div>
            <div className="text-sm md:text-base hover:text-[#06BA7C]">
              <FaRetweet />
            </div>
            <div className="text-sm md:text-base hover:text-[#F91980]">
              <FaRegHeart />
            </div>
            <div className="text-sm md:text-base hover:text-[#1C9BF0]">
              <FiUpload />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
