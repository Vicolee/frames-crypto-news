"use client";

import { useEffect, useCallback, useState, useMemo } from "react";
import { FixedSizeList } from "react-window";
import useFetchArticles from "~/hooks/useFetchArticles";
import sdk from "@farcaster/frame-sdk";
import { ErrorScreen } from "./ui/Error";

export default function Demo(
  { title }: { title?: string } = { title: "News Articles" }
) {
  const { data, hasNextPage, fetchNextPage, isFetchingNextPage, isLoading, isError, error } = useFetchArticles();
  const [isSDKLoaded, setIsSDKLoaded] = useState(false);
  const [articles, setArticles] = useState<any>([]);

  return <ErrorScreen />;

  useEffect(() => {
    const load = async () => {
      sdk.actions.ready();
    };
    if (sdk && !isSDKLoaded) {
      setIsSDKLoaded(true);
      load();
    }
  }, [isSDKLoaded]);

  useEffect(() => {
    if (data) {
      const flattenedArticles = data.pages.flatMap(page => page.results);
      setArticles(flattenedArticles);
    }
  }, [data]);


  const handleScroll = useCallback(({ scrollOffset }: { scrollOffset: number }) => {
    const listHeight = 400; // Height of your FixedSizeList
    const itemHeight = 100; // Estimated height of each item
    const threshold = 0.1;   // How close to the end to trigger fetch

    if (
      scrollOffset > listHeight - itemHeight * (articles.length + threshold) &&
      hasNextPage &&
      !isFetchingNextPage
    ) {
      fetchNextPage();
    }
  }, [fetchNextPage, hasNextPage, isFetchingNextPage, articles.length]);

  // --- react-window implementation ---
  const Row = ({ index, style }: { index: number; style: React.CSSProperties }) => (
    <div style={style}>
      <h1>{articles[index].title}</h1>
      {/* <p>{articles[index].description}</p> */}
    </div>
  );

  if (!isSDKLoaded || isLoading) {
    return (<div style={{ height: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-purple-700"></div>
    </div>);
  }

  if (isError) return <div>Error fetching articles ${error.message}</div>;

  return (
    <div className="w-[300px] mx-auto py-4 px-2">
      <FixedSizeList
        height={1000}
        itemCount={articles.length}
        itemSize={120}
        width={300}
        onScroll={handleScroll}
      >
        {Row}
      </FixedSizeList>
      {isFetchingNextPage && (
        <div className="flex justify-center items-center mt-4">
          <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-gray-900"></div>
        </div>
      )}
    </div>
  );
}
