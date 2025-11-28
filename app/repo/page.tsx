"use client";
import { useEffect, useState, useRef, useCallback } from "react";
import "../globals.css";
import RepoCard from "@/components/RepoCard";

export default function RepoList() {
  const [repos, setRepos] = useState<any[]>([]);
  const [page, setPage] = useState<any>(1);
  const [loading, setLoading] = useState<any>(false);
  const loaderRef = useRef(null);

  const date10DaysAgo = () => {
    const currentDate = new Date();
    currentDate.setDate(currentDate.getDate() - 10);
    return currentDate.toISOString().split("T")[0];
  };

  const handleFetchRepos = async (pageNum: any) => {
    setLoading(true);

    const date = date10DaysAgo();
    const url = `https://api.github.com/search/repositories?q=created:>${date}&sort=stars&order=desc&page=${pageNum}`;

    try {
      const response = await fetch(url);
      const data = await response.json();

      if (data.items) {
        setRepos((prev: any) => [...prev, ...data.items]);
      }
    } catch (err) {
      console.log("API Error:", err);
    } finally {
      setLoading(false);
    }
  };

  const onObserver = useCallback(
    (entries: any) => {
      if (entries[0].isIntersecting && !loading) {
        setPage((prev: any) => prev + 1);
      }
    },
    [loading]
  );

  useEffect(() => {
    handleFetchRepos(page);
  }, [page]);

  useEffect(() => {
    const observer = new IntersectionObserver(onObserver, {
      root: null,
      rootMargin: "20px",
      threshold: 0,
    });

    if (loaderRef.current) observer.observe(loaderRef.current);
    return () => observer.disconnect();
  }, [onObserver]);

  return (
    <div className="container">
      <header className="header">Trending Repos</header>

      <div>
        {repos?.map((repo) => (
          <RepoCard key={repo?.id+repo?.name} repo={repo} />
        ))}
      </div>

      <p className="loading">{loading && "Loading..."}</p>

      <div ref={loaderRef}></div>
    </div>
  );
}
