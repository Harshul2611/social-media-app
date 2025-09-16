import Image from "next/image";
import { BiMessageRounded } from "react-icons/bi";
import { FaRetweet } from "react-icons/fa6";
import { FaRegHeart } from "react-icons/fa";
import { FiUpload } from "react-icons/fi";

export default function FeedCard() {
  return (
    <div className="border border-gray-700 p-4 border-x-0 border-b-0 transition-all cursor-pointer">
      <div className="grid grid-cols-12">
        <div className="col-span-1">
          <div className="w-[50px] h-[50px] rounded-full overflow-hidden">
            <Image
              src={`https://img.freepik.com/free-vector/smiling-young-man-illustration_1308-174669.jpg`}
              alt="profile"
              width={50}
              height={50}
            />
          </div>
        </div>
        <div className="col-span-11 pl-4.5">
          <h2 className="text-base font-semibold">Harshul Patel</h2>
          <p className="text-sm">
            #Hyderabad : #RoadSafety A #Speeding Septic Tanker lost control and
            overturned, after crashing into the compound wall of Sri
            Abhayanjaneya Swamy temple, in the middle of the road near NGRI,
            #Uppal, a man doing exercise near the temple was a lucky escape,
            daughter in #CCTV The driver-cum-owner Kumar Naik was seriously
            injured & shifted to Gandhi Hospital.
          </p>
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
