import { useState, useEffect } from 'react';
import axios from 'axios';

const AllProducts = () => {
  const [products, setProducts] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [filters, setFilters] = useState({
    brand: '',
    category: '',
    minPrice: '',
    maxPrice: '',
  });
  const [sortBy, setSortBy] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const limit = 10; // Number of products per page

  // List of brand names
  const brands = ['Apple', 'Samsung', 'Oppo', 'Vivo', 'Redmi'];

  // List of categories
  const categories = ['Smartphone'];

  useEffect(() => {
    if (searchQuery || Object.values(filters).some(val => val) || sortBy) {
      fetchProducts();
    } else {
      fetchAllProducts();
    }
  }, [currentPage, searchQuery, filters, sortBy]);

  const fetchAllProducts = async () => {
    try {
      const response = await axios.get('https://mobile-store-new-server.vercel.app/allmobile', {
        params: {
          page: currentPage,
          limit,
        },
      });
      setProducts(response.data.mobiles);
      setTotalPages(response.data.totalPages);
    } catch (error) {
      console.error(error);
    }
  };

  const fetchProducts = async () => {
    try {
      const endpoint = searchQuery ? '/search' : '/filter';
      const response = await axios.get(`https://mobile-store-new-server.vercel.app${endpoint}`, {
        params: {
          ...filters,
          sortBy,
          q: searchQuery,
          page: currentPage,
          limit,
        },
      });
      setProducts(response.data);
      // If totalPages is not included in the response, handle pagination accordingly
      // Here you might want to calculate totalPages based on the number of products fetched
    } catch (error) {
      console.error(error);
    }
  };

  const handleSearch = (e) => {
    setSearchQuery(e.target.value);
  };

  const handleFilterChange = (e) => {
    setFilters({ ...filters, [e.target.name]: e.target.value });
  };

  const handleSortChange = (e) => {
    setSortBy(e.target.value);
  };

  const handlePageChange = (newPage) => {
    if (newPage > 0 && newPage <= totalPages) {
      setCurrentPage(newPage);
    }
  };

  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    const date = new Date(dateString);
    return date.toLocaleDateString(undefined, options);
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">All Products</h1>
      <div className="mb-4 flex flex-col md:flex-row gap-4">
        <input
          type="text"
          placeholder="Search by product name..."
          value={searchQuery}
          onChange={handleSearch}
          className="p-2 border border-gray-300 rounded-md"
        />
        <select
          name="brand"
          value={filters.brand}
          onChange={handleFilterChange}
          className="p-2 border border-gray-300 rounded-md"
        >
          <option value="">All Brands</option>
          {brands.map((brand) => (
            <option key={brand} value={brand}>
              {brand}
            </option>
          ))}
        </select>
        <select
          name="category"
          value={filters.category}
          onChange={handleFilterChange}
          className="p-2 border border-gray-300 rounded-md"
        >
          <option value="">All Categories</option>
          {categories.map((category) => (
            <option key={category} value={category}>
              {category}
            </option>
          ))}
        </select>
        <input
          type="number"
          name="minPrice"
          placeholder="Min Price"
          value={filters.minPrice}
          onChange={handleFilterChange}
          className="p-2 border border-gray-300 rounded-md"
        />
        <input
          type="number"
          name="maxPrice"
          placeholder="Max Price"
          value={filters.maxPrice}
          onChange={handleFilterChange}
          className="p-2 border border-gray-300 rounded-md"
        />
        <select
          value={sortBy}
          onChange={handleSortChange}
          className="p-2 border border-gray-300 rounded-md"
        >
          <option value="">Sort By</option>
          <option value="priceLowToHigh">Price: Low to High</option>
          <option value="priceHighToLow">Price: High to Low</option>
          <option value="dateNewest">Date Added: Newest First</option>
        </select>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {products.map((product) => (
          <div key={product._id} className="border border-gray-300 rounded-md p-4">
            <img
              src={product.image}
              alt={product.name}
              className="w-full object-cover mb-4 rounded-md"
            />
            <h2 className="text-xl font-semibold mb-2">{product.name}</h2>
            <p className="text-gray-600 mb-2">Brand: {product.brand}</p>
            <p className="text-gray-600 mb-2">Category: {product.category}</p>
            <p className="text-gray-600 mb-2">Price: ${product.price}</p>
            <p className="text-gray-600 mb-2">Date Added: {formatDate(product.creationDate)}</p>
          </div>
        ))}
      </div>

      {/* Pagination Controls */}
      {products.length >= limit && (
        <div className="flex justify-center mt-6">
          <button
            onClick={() => handlePageChange(currentPage - 1)}
            disabled={currentPage === 1}
            className="px-4 py-2 border border-gray-300 rounded-md mr-2"
          >
            Previous
          </button>
          <span className="px-4 py-2">{`Page ${currentPage} of ${totalPages}`}</span>
          <button
            onClick={() => handlePageChange(currentPage + 1)}
            disabled={currentPage === totalPages}
            className="px-4 py-2 border border-gray-300 rounded-md ml-2"
          >
            Next
          </button>
        </div>
      )}
    </div>
  );
};

export default AllProducts;
