import { useState, useEffect } from 'react'
import service from '../appwrite/conf'
import { PostCard, Container, Button } from '../components'
import { Link } from 'react-router-dom'
import { FiInbox } from 'react-icons/fi' // icon for empty state

const AllPost = () => {
  const [posts, setPosts] = useState([])

  useEffect(() => {
    service.getPost().then((post) => {
      if (post) {
        setPosts(post.documents)
      }
    })
  }, [])

  return (
    <div className="w-full py-12 bg-gray-50 min-h-screen">
      <Container>
        <h2 className="text-3xl font-bold text-center mb-10 text-gray-800">📝 All Posts</h2>

        {posts.length === 0 ? (
          <div className="flex flex-col items-center justify-center text-center text-gray-500 py-20">
            <FiInbox className="text-6xl mb-4 text-gray-400" />
            <h3 className="text-xl font-semibold mb-2">No posts available</h3>
            <p className="mb-6">Looks like there are no posts yet. Be the first to create one!</p>
            <Link to="/add-post">
              <Button className="bg-blue-600 text-white px-6 py-2 rounded-xl hover:bg-blue-700">
                Create a Post
              </Button>
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
            {posts.map((post) => (
              <PostCard key={post.$id} {...post} />
            ))}
          </div>
        )}
      </Container>
    </div>
  )
}

export default AllPost
