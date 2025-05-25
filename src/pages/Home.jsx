import React, { useEffect, useState } from "react";
import appwriteService from "../appwrite/config";
import { Container, PostCard } from "../components";

function Home() {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    appwriteService.getPosts().then((posts) => {
      if (posts) {
        setPosts(posts.documents);
      }
    });
  }, []);

  if (posts.length === 0) {
    return (
      <div className="w-full py-8 mt-4 text-center">
        <Container>
          <div className="flex flex-wrap">
            <div className="p-2 w-full">
              <h1 className="text-2xl font-bold hover:text-gray-500">
                <div className="max-w-3xl mx-auto p-4">
                  <h1 className="text-2xl font-semibold text-center mb-3 text-white font-serif">
                    Welcome to Write Your Thoughts
                  </h1>
                  <p className="text-base text-white italic text-center mb-3">
                    A home for writers, thinkers, and storytellers.
                  </p>
                  <p className="text-sm text-white leading-6 mb-3 font-light">
                    At{" "}
                    <span className="font-medium text-white">
                      Write Your Thoughts
                    </span>
                    , we believe everyone has a story to tell, an idea to share,
                    or a perspective that could inspire others. Whether you're
                    passionate about writing articles, crafting compelling blog
                    posts, or simply looking for a space to express your
                    thoughts — this is your platform.
                  </p>
                  <p className="text-sm text-white leading-6 mb-3 font-light">
                    Designed for curious minds and creative spirits, our
                    community brings together writers from all walks of life who
                    are eager to inform, help, and connect with others. Share
                    your knowledge, express your opinions, explore your
                    creativity, and contribute to a growing hub of insightful
                    content.
                  </p>
                  <p className="text-sm text-white leading-6 mb-3 font-light">
                    Whether you’re a seasoned writer or just starting your
                    journey,{" "}
                    <span className="font-medium text-white">
                      Write Your Thoughts
                    </span>{" "}
                    offers the tools and audience you need to make your voice
                    heard.
                  </p>
                  <p className="text-base font-medium text-center text-indigo-500 mt-5 tracking-wide">
                    Write freely. Share openly. Inspire endlessly.
                  </p>
                </div>
              </h1>
            </div>
          </div>
        </Container>
      </div>
    );
  }
  return (
    <div className="w-full py-8">
      <Container>
        <div className="flex flex-wrap">
          {posts.map((post) => (
            <div key={post.$id} className="p-2 w-1/4">
              <PostCard {...post} />
            </div>
          ))}
        </div>
      </Container>
    </div>
  );
}

export default Home;
