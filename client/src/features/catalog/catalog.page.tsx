import {  rqClient } from "@/shared/api/instance";
import { useInfiniteQuery } from "@tanstack/react-query";
import { fetchClient } from "@/shared/api/instance";


export interface Questionnaire {
  id: string;
  title: string;
  description: string;
  createdAt: string;
  updatedAt: string;
}


function CatalogPage() {
const {
    data,
    fetchNextPage,
    hasNextPage,
    isLoading,
    isError,
    error,
  } = useInfiniteQuery({
    queryKey: ["questionnaires"],
    queryFn: ({ pageParam = 1 }) =>
      fetchClient.GET("/questionnaires", {
        query: { page: pageParam, limit: 10 },
      }).then((res) => res.data),
    initialPageParam: 1,
    getNextPageParam: (lastPage, allPages) =>
      allPages.length < lastPage.totalPages ? allPages.length + 1 : undefined,
  });
console.log("CatalogPage data", data);

if (isLoading) return <p>Загрузка...</p>;

return (
  <div>
    <h1>Каталог</h1>
    {data?.pages.flatMap((page) =>
      page.list.map((q) => (
        <div key={q.id}>
          <h2>{q.title}</h2>
          <p>{q.description}</p>
        </div>
      ))
    )}
    {hasNextPage && (
      <button onClick={() => fetchNextPage()}>Загрузить ещё</button>
    )}
  </div>
);
  
}

export const Component = CatalogPage;