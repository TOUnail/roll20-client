import React from "react";

import NoImg from "../images/no-img.png";

const ProfileSkeleton = () => {
  return (
    <div className="w-full">
      <div className="shadow bg-white p-4 my-2 sm:rounded-lg flex flex-col justify-between leading-normal">
        <div className="text-center">
          <img
            src={NoImg}
            alt="profile"
            className="rounded-full w-20 h-20 object-cover mx-auto"
          />
        </div>
        <div className="mx-auto">
          <div className="animate-pulse bg-gray-400 w-40 h-4 rounded-full mt-3 mb-6" />

          <div className="animate-pulse bg-gray-400 w-20 h-2 rounded-full mx-auto mb-2" />
          <div className="animate-pulse bg-gray-400 w-20 h-2 rounded-full mx-auto mb-2" />
          <div className="animate-pulse bg-gray-400 w-20 h-2 rounded-full mx-auto" />
        </div>
      </div>
    </div>
  );
};

export default ProfileSkeleton;
