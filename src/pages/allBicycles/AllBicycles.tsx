/* eslint-disable @typescript-eslint/no-explicit-any */
import ItemsCard, { ItemData } from "@/components/shared/ItemsCard";
import Loading from "@/components/shared/Loading";
import { useGetAllProductsQuery } from "@/redux/api/productApi";
import { setFilter } from "@/redux/features/filterSlice/filterSlice";
import { RootState } from "@/redux/store";
import { MenuOutlined } from "@ant-design/icons";
import { Button, Drawer, Pagination } from "antd";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation } from "react-router-dom";
import { toast } from "sonner";
import AllBicycleFilter from "./AllBicycleFilter";

const AllBicycles = () => {
  const dispatch = useDispatch(); // Redux dispatch function
  const location = useLocation(); // To get URL query params
  const [page, setPage] = useState(1);
  const [limit] = useState(9);
  const [filterOpen, setFilterOpen] = useState(false);
  const [isFilterApplied, setIsFilterApplied] = useState(false);

  const { data, isLoading, isError } = useGetAllProductsQuery({ page, limit });
  const meta = data?.data?.meta;
  const products = data?.data?.result;

  // Get current filters from Redux store
  const filters = useSelector((state: RootState) => state.filter);
  
  // Check if there are URL search params when component mounts
  useEffect(() => {
    // If search query exists in URL, update filter state
    const searchParams = new URLSearchParams(location.search);
    const searchQuery = searchParams.get('search');
    
    if (searchQuery && !filters.search) {
      dispatch(setFilter({ search: searchQuery }));
      setIsFilterApplied(true);
    }
    
    // If filters exist in Redux state, mark filter as applied
    if (filters.search || filters.type || filters.brand || 
        filters.availability || 
        (filters.priceRange && 
         (filters.priceRange[0] > 0 || filters.priceRange[1] < 10000))) {
      setIsFilterApplied(true);
    }
  }, [location.search, dispatch, filters]);

  const handleFilterChange = (key: string, value: any) => {
    dispatch(setFilter({ [key]: value }));
    setIsFilterApplied(true);
  };

  if (isLoading) return <Loading />;
  if (isError) return toast.error("Failed to load products");

  const filteredProducts = isFilterApplied
    ? products?.filter((product: ItemData) => {
        const matchSearch =
          !filters.search ||
          product.name.toLowerCase().includes(filters.search.toLowerCase()) ||
          product.brand.toLowerCase().includes(filters.search.toLowerCase());

        const matchPrice =
          product.price >= filters.priceRange[0] &&
          product.price <= filters.priceRange[1];

        const matchType =
          !filters.type ||
          product.type.toLowerCase() === filters.type.toLowerCase();

        const matchBrand =
          !filters.brand ||
          product.brand.toLowerCase() === filters.brand.toLowerCase();

        const matchAvailability = filters.availability
          ? product.inStock === true
          : true;

        return (
          matchSearch &&
          matchPrice &&
          matchType &&
          matchBrand &&
          matchAvailability
        );
      })
    : products;

  const clearFilters = () => {
    dispatch(setFilter({
      search: "",
      priceRange: [0, 10000],
      type: "",
      brand: "",
      availability: false
    }));
    setIsFilterApplied(false);
  };

  return (
    <div className="w-full">
      {/* Filter Button on Mobile */}
      <div className="flex justify-between px-4 mt-4 lg:hidden">
        <Button onClick={clearFilters} disabled={!isFilterApplied}>
          Clear Filters
        </Button>
        <Button icon={<MenuOutlined />} onClick={() => setFilterOpen(true)}>
          Filter
        </Button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-5 gap-6 px-4 mt-6">
        {/* Products */}
        <div className="lg:col-span-4 col-span-1">
          {/* Search result indicator */}
          {filters.search && (
            <div className="mb-4 bg-gray-100 p-3 rounded-md flex justify-between items-center">
              <span>Search results for: <strong>"{filters.search}"</strong></span>
              <Button size="small" onClick={() => {
                dispatch(setFilter({ search: "" }));
                if (!filters.type && !filters.brand && !filters.availability &&
                    filters.priceRange[0] === 0 && filters.priceRange[1] === 10000) {
                  setIsFilterApplied(false);
                }
              }}>
                Clear Search
              </Button>
            </div>
          )}
          
          {/* Products display */}
          {filteredProducts && filteredProducts.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredProducts.map((product: ItemData) => (
                <ItemsCard
                  key={product._id}
                  data={product}
                  isPending={isLoading}
                />
              ))}
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center h-64">
              <p className="text-xl text-gray-500">No products found</p>
              {isFilterApplied && (
                <Button className="mt-4" onClick={clearFilters}>
                  Clear All Filters
                </Button>
              )}
            </div>
          )}

          {/* Pagination */}
          {meta?.totalPage && meta?.totalPage > 1 && (
            <div className="mt-6 flex justify-center">
              <Pagination
                current={meta.page}
                pageSize={meta.limit}
                total={meta.total}
                onChange={(p) => setPage(p)}
                className="mt-6"
              />
            </div>
          )}
        </div>

        {/* Filter for large screens */}
        <div className="hidden lg:block lg:col-span-1">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-semibold">Filters</h2>
            <Button size="small" onClick={clearFilters} disabled={!isFilterApplied}>
              Clear All
            </Button>
          </div>
          <AllBicycleFilter handleChange={handleFilterChange} />
        </div>
      </div>

      {/* Drawer Filter for small screens */}
      <Drawer
        title="Filter"
        placement="left"
        onClose={() => setFilterOpen(false)}
        open={filterOpen}
        extra={
          <Button size="small" onClick={clearFilters} disabled={!isFilterApplied}>
            Clear All
          </Button>
        }
      >
        <AllBicycleFilter
          handleChange={handleFilterChange}
        />
      </Drawer>
    </div>
  );
};

export default AllBicycles;