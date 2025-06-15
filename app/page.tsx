import Pagination from "./components/Pagination";

interface Props {
  searchParams: Promise<{
    page: string;
  }>;
}

const HomePage = async ({ searchParams }: Props) => {
  const params = await searchParams;

  const page = parseInt(params.page) || 1;

  return <Pagination itemCount={100} pageSize={10} currentPage={page} />;
};

export default HomePage;
