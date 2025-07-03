import DocumentCard from "@/components/dashboard/DocumentCard";
import Search from "@/components/dashboard/Search";
import SortBy from "@/components/dashboard/SortBy";
import Master from "@/components/global/Master";

const data = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];

export default function Home() {
  return (
    <Master>
      <div className="flex flex-col gap-10">
        <div className="flex items-center justify-between">
          <Search />
          <SortBy />
        </div>
        <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 2xl:grid-cols-5 gap-10">
          {data.map((item) => (
            <DocumentCard item={item} key={item} />
          ))}
        </div>
      </div>
    </Master>
  );
}
