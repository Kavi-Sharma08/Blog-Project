import { useState , useEffect } from 'react'
import service from '../appwrite/conf';
import { PostCard , Container } from '../components/index'
const AllPost = () => {
    const [posts , setPosts] = useState([]);
    
    useEffect(()=>{
        service.getPost().then((post)=>{
            
            if(post){
            setPosts(post.documents)
            }
        })

    } , [])
    
  return (
    <div className='w-full py-8'>
        <Container>
            {
                <div className='flex flex-wrap'>
                    {
                        posts.map((post)=>{
                            return <div key={post.$id} className=''>
                                <PostCard {...post}/>

                            </div>
                        })
                    }
                </div>
            }
        </Container>
    </div>
  )
}

export default AllPost