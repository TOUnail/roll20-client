import React from 'react'

const StaticProfile = props => {
    return (
        <div className="w-full">
              <div className="shadow bg-white p-4 my-2 sm:rounded-lg flex flex-col justify-between leading-normal">
                <div className="text-center">
                  <img
                    src={props.profile.imageUrl}
                    alt="profile"
                    className="rounded-full w-20 h-20 object-cover mx-auto"
                  />
                </div>
                <div className="text-center">
                  <h2 className="text-lg my-2">
                    <strong>{props.profile.handle}</strong>
                  </h2>
                  {props.profile.title && (
                    <p className="text-primary-900">
                      {props.profile.title}
                    </p>
                  )}
                  {props.profile.location && (
                    <p className="text-gray-600">
                      {props.profile.location}
                    </p>
                  )}
                  {props.profile.alignment && (
                    <p className="text-gray-600">
                      {props.profile.alignment}
                    </p>
                  )}
                </div>
              </div>
            </div>
    )
}

export default StaticProfile
