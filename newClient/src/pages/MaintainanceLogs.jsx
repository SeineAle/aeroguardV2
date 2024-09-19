import React, { useState, useEffect } from 'react';
import { End, Header } from '../components/landing/index';
import { useRecoilState } from 'recoil';
import { filterState, isLoggedInState } from '../state'; 
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import Skeleton from '../components/maintananceLogs/Skeleton';
import PostCard from '../components/maintananceLogs/Card';
import PageSlider from '../components/maintananceLogs/Pagination';
import FilterMenu from '../components/maintananceLogs/FilterMenu';

export const MaintainanceLogs = () => {
  const [isLoggedIn, setIsLoggedIn] = useRecoilState(isLoggedInState);
  const [filter, setFilter] = useRecoilState(filterState);
  const [postState, setPostState] = useState({ posts: [], totalPages: 0 });
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem('authToken');
    if (token) {
      setIsLoggedIn(true);
    } else {
      setIsLoggedIn(false);
    }
  }, [setIsLoggedIn]);

  const navigate = useNavigate();

  useEffect(() => {
    if (!isLoggedIn) {
      navigate('/signin'); 
    }
  }, [isLoggedIn, navigate]);

  useEffect(() => {
    fetchPosts();
  }, [filter]);

  const fetchPosts = async () => {
    try {
      setLoading(true);
      const baseUrl = import.meta.env.VITE_API_URL;
      const token = localStorage.getItem('authToken');
      const response = await axios.post(`${baseUrl}api/v1/post/filter`, {
        ...filter 
      },{ headers: {
        authtoken: token
      }});
      console.log(filter);
      if (response.status === 200) {
        const data = response.data;
        console.log(data);
        console.log(filter);
        setPostState({
          posts: data.posts || [], 
          totalPages: data.totalPages
        });
      } else {
        console.error('Failed to fetch posts');
      }
    } catch (error) {
      console.error('Error:', error);
    }finally{
      setLoading(false);
    }
  };

  return (
<>
  <Header />
  <div className="mt-28 flex flex-row justify-center px-4">
    {/* Sidebar filter menu (left-aligned, takes the left side of the screen) */}
    {!loading && (
      <div className="w-1/4 fixed left-0 top-28 hidden lg:block">
        <FilterMenu />
      </div>
    )}

    {/* Posts Section (centered) */}
    <div className="flex flex-col items-center w-full lg:w-3/4 xl:w-1/2 gap-y-6 mx-auto">
      {!loading ? (
        postState.posts.map((post, i) => (
          <PostCard key={i} post={post} />
        ))
      ) : (
        Array.from({ length: 3 }).map((_, i) => <Skeleton key={i} />)
      )}
    </div>
  </div>

  {/* Page slider below posts */}
  {!loading && (
    <div className="flex justify-center mt-10">
      <PageSlider 
        currentPage={filter.page} 
        maxPages={postState.totalPages * filter.limit} 
        limit={filter.limit} 
      />
    </div>
  )}

  <End />
</>



  );
};

export default MaintainanceLogs;
