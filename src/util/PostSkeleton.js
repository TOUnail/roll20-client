import React, { Fragment } from "react";
import NoImg from "../images/no-img.png";

const PostSkeleton = () => {
  const content = Array.from({ length: 5 }).map((item, index) => (
    <div
      className="shadow bg-white px-4 pt-4 my-2 sm:rounded-lg flex flex-col justify-between leading-normal"
      key={index}
    >
      <div className="flex">
        <img
          className="w-10 h-10 mr-4 rounded-full object-cover"
          src={NoImg}
          alt="user"
        />
        <div className="text-sm flex-1">
          <div className="flex items-center justify-between">
            <div className="animate-pulse bg-gray-400 w-40 h-4 rounded-full" />
          </div>
          <div className="flex items-center justify-between">
            <div className="animate-pulse bg-gray-400 w-64 h-4 rounded-full my-8" />
          </div>
          <div className="flex justify-around">
            <div className="animate-pulse bg-gray-400 w-10 h-2 mt-10 mb-2 rounded-full" />

            <div className="animate-pulse bg-gray-400 w-10 h-2 mt-10 mb-2 rounded-full" />
          </div>
        </div>
      </div>
    </div>
  ));
  return <Fragment>{content}</Fragment>;
};

export default PostSkeleton;
