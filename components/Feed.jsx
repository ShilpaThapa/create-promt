'use client';

import { useState, useEffect } from "react";
import PromptCard from "./PromptCard";

const Feed = () => {
  const [searchText, setSearchText] = useState('');
  const [posts, setPosts] = useState([]);
  const [tag, setTag] = useState('');

  const PromptCardList = ({ data, handleTagClick}) => {
    return (
    <div className="mt-16 prompt-layout">
      {data.filter((post) => (post.prompt.toLowerCase().includes(searchText) || 
      post.tag.toLowerCase().includes(searchText) || post.creator.username.toLowerCase().includes(searchText)) && post.tag.includes(tag))
      .map((post) => (
        <PromptCard
        key={post._id}
        post={post}
        handleTagClick={handleTagClick}
        />
      ))}
    </div>
    )
  }

  const handleSearchChange = (e) => {
    setSearchText(e.target.value);
  }

  const handleTagClick = (tag) => {
    setTag(tag);
  }

  const showAllPosts = () => {
    setTag('');
  }

  useEffect(() => {
    const fetchPosts = async () => {
      const response = await fetch('/api/prompt');
      const data = await response.json();
      setPosts(data);
      settotalPages(Math.ceil(data.length / itemsPerPage));
    }
    fetchPosts();
  },[]);

  return (
    <section className="feed">
      <form className="relative w-full flex-center">
      <input 
      type="text"
      placeholder="Search for a tag or a username"
      value={searchText}
      onChange={handleSearchChange}
      required
      className="search_input peer"
      />
      </form>

      {tag !== '' && (
        <button type="button" onClick={showAllPosts} className="black_btn mt-3">All Posts</button>
      )}

      <PromptCardList
        key={posts._id}
        data={posts}
        handleTagClick={handleTagClick} 
      />

    </section>
  )
}

export default Feed