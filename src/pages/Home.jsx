import React, { useEffect, useState } from 'react';
import { PostCard, Container } from '../components/index';
import service from "../appwrite/conf";
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
const Home = () => {
  const [posts, setposts] = useState([]);

  const userData = useSelector((state)=>state.auth.userData)

  useEffect(() => {
    service.getPost().then((post) => {
      console.log(post)
      if(post && post.documents){
        const yourPost = post.documents.filter((p)=> userData.$id ===p.userId)
        console.log(yourPost)
        setposts(yourPost)
      }
      
      
    });
  }, []);
  console.log(posts)

  if (posts.length===0) {
    return (
      <div className='w-full py-20 bg-gray-50 min-h-screen flex items-center justify-center'>
        <Container>
          <div className='text-center max-w-xl mx-auto'>
            <h1 className='text-3xl font-extrabold text-gray-800 mb-4'>Welcome 👋</h1>
            <p className='text-lg text-gray-600'>Please <Link to = "/login"><span className='font-semibold text-blue-500'>log in</span></Link> to explore amazing posts created by the community.</p>
          </div>
        </Container>
      </div>
    );
  }

  return (
    <div className='w-full py-10 bg-white min-h-screen'>
      <Container>
        <h2 className='text-3xl font-bold text-center mb-10 text-gray-800'>📚 Your Posts</h2>
        <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6'>
          
          {
            
            posts.map((post) => (
              <PostCard key={post.$id} {...post} />
            ))
          }
        </div>
      </Container>
    </div>
  );
};

export default Home;
