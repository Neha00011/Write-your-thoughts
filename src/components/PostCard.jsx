import React from "react";
import appwriteService from "../appwrite/config";
import { Link } from "react-router-dom";

function PostCard({ $id, title, featuredImage }) {
  return (
    <Link to={`/post/${$id}`} className="w-full">
      <div className="bg-gradient-to-br from-gray-700 to-gray-800 rounded-xl p-4 shadow-lg hover:shadow-2xl transition duration-200 transform hover:scale-105">
        <div className="w-full flex justify-center mb-4">
          <img
            src={appwriteService.getFilePreview(featuredImage)}
            alt={title}
            className="rounded-xl object-cover w-full h-48"
          />
        </div>
        <h2 className="text-lg font-semibold text-white text-center">
          {title}
        </h2>
      </div>
    </Link>
  );
}

export default PostCard;
