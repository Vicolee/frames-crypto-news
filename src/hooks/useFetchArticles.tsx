import { useInfiniteQuery } from '@tanstack/react-query';

const fetchArticles = async ({ pageParam = undefined }) => {
    var requestUrl = `https://newsdata.io/api/1/latest?apikey=pub_6518665430abfa8b876c5c5ed8991cdbda2d1&q=crypto&page=${pageParam}`;
    if (pageParam === undefined) {
        requestUrl = `https://newsdata.io/api/1/latest?apikey=pub_6518665430abfa8b876c5c5ed8991cdbda2d1&q=crypto`;
    }
    console.log("requestUrl", requestUrl)
    const response = await fetch(requestUrl);
    if (!response.ok) {
        throw new Error('Network response was not ok: requestUrl: ' + requestUrl);
    }
    return response.json();
};

const useFetchArticles = () => {
    return useInfiniteQuery({
        queryKey: ['articles'],
        queryFn: fetchArticles,
        getNextPageParam: (lastPage, allPages) => {
            return lastPage.nextPage ?? undefined;
        },
        initialPageParam: undefined,
    });
};

export default useFetchArticles;
