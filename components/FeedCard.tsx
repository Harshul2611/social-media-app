import Image from "next/image";
import { BiMessageRounded } from "react-icons/bi";
import { FaRetweet } from "react-icons/fa6";
import { FaRegHeart } from "react-icons/fa";
import { FiUpload } from "react-icons/fi";
import { Tweet } from "@/gql/graphql";

interface FeedCardProps {
  data: Tweet;
}

export default function FeedCard(props: FeedCardProps) {
  const { data } = props;
  return (
    <div className="border border-gray-700 p-4 border-x-0 border-b-0 transition-all cursor-pointer">
      <div className="grid grid-cols-12">
        <div className="col-span-1">
          <div className="w-[40px] h-[40px] rounded-full overflow-hidden">
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
        <div className="col-span-11 pl-4.5">
          <h2 className="text-base font-semibold">
            {data?.author?.firstName} {data?.author?.lastName}
          </h2>
          <p className="text-sm">{data?.content}</p>
          <div className="flex items-center justify-between text-lg pr-20 mt-3">
            <div className="hover:text-[#1C9BF0]">
              <BiMessageRounded />
            </div>
            <div className="hover:text-[#06BA7C]">
              <FaRetweet />
            </div>
            <div className="hover:text-[#F91980]">
              <FaRegHeart />
            </div>
            <div className="hover:text-[#1C9BF0]">
              <FiUpload />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
