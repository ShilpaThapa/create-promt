"use client";
import { useState, useEffect, Fragment } from "react";
import { useRouter } from "next/navigation";
import Profile from "@components/Profile";
import { useSession } from "next-auth/react";

const MyProfile = ({params}) => {
  const router = useRouter();
  const { data: session} = useSession();
  const [posts, setPosts] = useState([]);
  const [creator, setCreator] = useState({})

  useEffect(() => {
    const fetchPosts = async() => {
        const response = await fetch(`/api/users/${params.id}/posts`);
        const data = await response.json();
        const creator = data[0].creator;
        setPosts(data);
        setCreator(creator);
    }
    fetchPosts();
  }, []);
  
  const handleEdit = (post) => {
    router.push(`/update-prompt?id=${post._id}`)
  }

  const handleDelete = async (post) => {
    const hasConfirmed = confirm("Are you sure you want to delete this prompt?");
    if (hasConfirmed) {
      try {
        await fetch(`/api/prompt/${post._id.toString()}`,{
          method: 'DELETE'
        });

        const filteredPosts = posts.filter((p) => p._id !== post._id);
        setPosts(filteredPosts);
      } catch (error) { 
        console.log(error);
      }
    }
  }

  return (
    <Profile 
    name={session?.user.id === creator._id ? 'My' : ''}
    desc={session?.user.id === creator._id ? 'Welcome to your personalized profile page' : 'Welcome to ' + creator.username + ' profile page' }
    data={posts}
    handleEdit={handleEdit}
    handleDelete={handleDelete}/>
  )
}

export default MyProfile