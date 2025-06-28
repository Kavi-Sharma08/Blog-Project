import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import service from "../appwrite/conf";
import { Button, Container } from "../components";
import parse from "html-react-parser";
import { useSelector } from "react-redux";

export default function Post() {
  const [post, setPost] = useState(null);
  const [imageUrl, setImageUrl] = useState(null);
  const { slug } = useParams();
  const navigate = useNavigate();

  const userData = useSelector((state) => state.auth.userData);
  const isAuthor = post && userData ? post.userId === userData.$id : false;

  // Fetch post data
  useEffect(() => {
    if (slug) {
      service.getSinglePost(slug).then((post) => {
        if (post) setPost(post);
        else navigate("/");
      });
    } else {
      navigate("/");
    }
  }, [slug, navigate]);

  // Fetch image preview
  useEffect(() => {
    const fetchImage = async () => {
      if (post?.featuredImage) {
        const image = await service.getFilePreview(post.featuredImage);
        setImageUrl(image);
      }
    };
    fetchImage();
  }, [post]);

  const deletePost = () => {
    service.deletePost(post.$id).then((status) => {
      if (status) {
        service.deleteFile(post.featuredImage);
        navigate("/");
      }
    });
  };

  return post ? (
    <div className="py-12 bg-gray-50 min-h-screen">
      <Container>
        {/* Image and Controls */}
        <div className="w-full max-w-4xl mx-auto mb-6 bg-white border rounded-xl shadow p-4 relative">
          <div className="w-full bg-gray-100 rounded-lg overflow-hidden mb-4">
            {imageUrl ? (
              <img
                src={imageUrl}
                alt={post.title}
                className="w-full max-h-96 object-contain"
              />
            ) : (
              <div className="h-48 flex items-center justify-center text-gray-400">
                Loading image...
              </div>
            )}
          </div>

          {isAuthor && (
            <div className="absolute top-4 right-4 flex gap-2">
              <Link to={`/edit-post/${post.$id}`}>
                <Button bgColor="bg-green-500" className="px-4 py-2">
                  Edit
                </Button>
              </Link>
              <Button
                bgColor="bg-red-500"
                onClick={deletePost}
                className="px-4 py-2"
              >
                Delete
              </Button>
            </div>
          )}
        </div>

        {/* Title and Content */}
        <div className="w-full max-w-4xl mx-auto bg-white p-6 rounded-xl shadow border">
          <h1 className="text-3xl font-bold text-gray-800 mb-4">{post.title}</h1>
          <div className="prose prose-lg max-w-none text-gray-700">
            {parse(post.content)}
          </div>
        </div>
      </Container>
    </div>
  ) : null;
}
