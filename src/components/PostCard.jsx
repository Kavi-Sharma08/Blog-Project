import React, { useEffect, useState } from 'react';
import service from '../appwrite/conf';
import { Link } from 'react-router-dom';

const PostCard = ({ $id, title, featuredImage }) => {
  
  const [imageUrl, setImageUrl] = useState(null);

  useEffect(() => {
    if (featuredImage) {
      service.getFilePreview(featuredImage).then((url) => {
        setImageUrl(url);
      });
    }
  }, [featuredImage]);

  return (
    <Link to={`/post/${$id}`} className="block group m-4">
      <div className="w-full h-full bg-white rounded-xl shadow hover:shadow-lg transition duration-300 border border-gray-200 overflow-hidden">
        {/* Image Section */}
        <div className="bg-gray-100 h-40 flex items-center justify-center overflow-hidden">
          {imageUrl ? (
            <img
              src={imageUrl}
              alt={title}
              className="object-contain h-full w-full transition-transform duration-300 group-hover:scale-105"
            />
          ) : (
            <div className="text-gray-400 text-sm">Loading image...</div>
          )}
        </div>

        {/* Content Section */}
        <div className="p-4">
          <h2 className="text-lg font-semibold text-gray-800 group-hover:text-blue-600 transition">
            {title}
          </h2>
        </div>
      </div>
    </Link>
  );
};

export default PostCard;
