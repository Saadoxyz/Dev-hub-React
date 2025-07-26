import React, { useState, useMemo, useEffect } from 'react';
import { Search, Calendar, User } from 'lucide-react';

// ✅ Move this outside to fix ESLint warnings
const blogPosts = [
  {
    id: 1,
    title: "Building Modern Web Applications with React",
    description: "Exploring the latest features and best practices in React development, including hooks, context, and performance optimization techniques.",
    category: "Tech",
    date: "2024-07-20",
    image: "https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=400&h=250&fit=crop",
    author: "Alex Johnson"
  },
  {
    id: 2,
    title: "Hidden Gems of Southeast Asia",
    description: "Discover breathtaking destinations off the beaten path, from secluded beaches in Thailand to mountain villages in Vietnam.",
    category: "Travel",
    date: "2024-07-18",
    image: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=400&h=250&fit=crop",
    author: "Alex Johnson"
  },
  {
    id: 3,
    title: "The Art of Italian Pasta Making",
    description: "Learn the traditional techniques for creating authentic Italian pasta from scratch, including regional variations and secret tips.",
    category: "Food",
    date: "2024-07-15",
    image: "https://images.unsplash.com/photo-1551183053-bf91a1d81141?w=400&h=250&fit=crop",
    author: "Alex Johnson"
  },
  {
    id: 4,
    title: "Machine Learning Fundamentals",
    description: "A beginner's guide to understanding machine learning concepts, algorithms, and practical applications in everyday technology.",
    category: "Tech",
    date: "2024-07-12",
    image: "https://images.unsplash.com/photo-1555949963-aa79dcee981c?w=400&h=250&fit=crop",
    author: "Alex Johnson"
  },
  {
    id: 5,
    title: "Street Food Adventures in Mexico City",
    description: "Exploring the vibrant street food scene of Mexico City, from tacos al pastor to churros and everything in between.",
    category: "Food",
    date: "2024-07-10",
    image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRexBia36ixX_U4FoPlg0iqv2hZIvfRyeH8LQ&s",
    author: "Alex Johnson"
  },
  {
    id: 6,
    title: "Backpacking Through the Swiss Alps",
    description: "A comprehensive guide to hiking and camping in the Swiss Alps, including trail recommendations and essential gear.",
    category: "Travel",
    date: "2024-07-08",
    image: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=400&h=250&fit=crop",
    author: "Alex Johnson"
  },
  {
    id: 7,
    title: "Introduction to Cloud Computing",
    description: "Understanding the basics of cloud computing, deployment models, and how businesses leverage cloud services for scalability.",
    category: "Tech",
    date: "2024-07-05",
    image: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=400&h=250&fit=crop",
    author: "Alex Johnson"
  },
  {
    id: 8,
    title: "French Pastry Masterclass",
    description: "Master the delicate art of French pastry making, from croissants to macarons, with step-by-step techniques.",
    category: "Food",
    date: "2024-07-03",
    image: "https://images.unsplash.com/photo-1509440159596-0249088772ff?w=400&h=250&fit=crop",
    author: "Alex Johnson"
  },
  {
    id: 9,
    title: "Digital Nomad Life in Bali",
    description: "Living and working remotely in Bali - coworking spaces, cost of living, and the best areas for digital nomads.",
    category: "Travel",
    date: "2024-07-01",
    image: "https://images.unsplash.com/photo-1537953773345-d172ccf13cf1?w=400&h=250&fit=crop",
    author: "Alex Johnson"
  }
];

const categories = ['All', 'Tech', 'Travel', 'Food'];

const BlogHomepage = () => {
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const postsPerPage = 6;

  const filteredPosts = useMemo(() => {
    return blogPosts.filter(post => {
      const matchesCategory = selectedCategory === 'All' || post.category === selectedCategory;
      const matchesSearch = post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        post.description.toLowerCase().includes(searchTerm.toLowerCase());
      return matchesCategory && matchesSearch;
    });
  }, [selectedCategory, searchTerm]);

  useEffect(() => {
    setCurrentPage(1);
  }, [selectedCategory, searchTerm]);

  const totalPages = Math.ceil(filteredPosts.length / postsPerPage);
  const startIndex = (currentPage - 1) * postsPerPage;
  const currentPosts = filteredPosts.slice(startIndex, startIndex + postsPerPage);

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-slate-100 to-blue-50">
      {/* Header */}
      <header className="bg-white shadow-xl border-b-2 border-blue-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 text-center">
          <h1 className="text-6xl font-bold bg-gradient-to-r from-blue-700 via-purple-700 to-indigo-800 bg-clip-text text-transparent mb-4 tracking-tight">
            Saad Khan's Blog
          </h1>
          <p className="text-xl text-gray-700 font-medium max-w-2xl mx-auto">
            Exploring technology, travel, and culinary adventures around the world
          </p>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Search & Filters */}
        <div className="mb-12 space-y-8">
          {/* Enhanced Search Bar */}
          <div className="relative max-w-lg mx-auto">
            <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-500 w-5 h-5" />
            <input
              type="text"
              placeholder="Search posts by title or content..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-12 pr-6 py-4 text-gray-800 bg-white border-2 border-gray-300 rounded-2xl shadow-lg focus:outline-none focus:ring-4 focus:ring-blue-200 focus:border-blue-500 transition-all duration-300 text-lg"
            />
          </div>

          {/* Enhanced Category Buttons */}
          <div className="flex flex-wrap justify-center gap-4">
            {categories.map(category => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`px-8 py-3 rounded-full font-semibold text-lg transition-all duration-300 transform hover:scale-105 ${
                  selectedCategory === category
                    ? 'bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-xl border-2 border-blue-500'
                    : 'bg-white text-gray-700 hover:bg-blue-50 hover:text-blue-700 shadow-md border-2 border-gray-200 hover:border-blue-300'
                }`}
              >
                {category}
              </button>
            ))}
          </div>
        </div>

        {/* Enhanced Results Info */}
        <div className="mb-8 text-center">
          <p className="text-gray-700 font-medium text-lg bg-white px-6 py-3 rounded-full shadow-md inline-block">
            Showing <span className="font-bold text-blue-600">{currentPosts.length}</span> of{' '}
            <span className="font-bold text-blue-600">{filteredPosts.length}</span> posts
            {selectedCategory !== 'All' && <span className="text-purple-600"> in {selectedCategory}</span>}
            {searchTerm && <span className="text-green-600"> matching "{searchTerm}"</span>}
          </p>
        </div>

        {/* Posts Grid */}
        {currentPosts.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10 mb-16">
            {currentPosts.map(post => (
              <article
                key={post.id}
                className="bg-white rounded-3xl shadow-xl hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-3 overflow-hidden group border border-gray-100"
              >
                <div className="relative overflow-hidden">
                  <img
                    src={post.image}
                    alt={post.title}
                    className="w-full h-52 object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  <div className="absolute top-4 right-4">
                    <span className={`px-4 py-2 rounded-full text-sm font-bold shadow-lg ${
                      post.category === 'Tech' ? 'bg-blue-600 text-white' :
                      post.category === 'Travel' ? 'bg-green-600 text-white' :
                      'bg-orange-600 text-white'
                    }`}>
                      {post.category}
                    </span>
                  </div>
                  <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                </div>
                
                <div className="p-8">
                  <h2 className="text-xl font-bold text-gray-900 mb-4 line-clamp-2 group-hover:text-blue-600 transition-colors duration-300">
                    {post.title}
                  </h2>
                  
                  <p className="text-gray-600 mb-6 line-clamp-3 leading-relaxed">
                    {post.description}
                  </p>
                  
                  <div className="flex items-center justify-between text-sm text-gray-500 mb-6">
                    <div className="flex items-center gap-2">
                      <User className="w-4 h-4 text-blue-500" />
                      <span className="font-medium">{post.author}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Calendar className="w-4 h-4 text-green-500" />
                      <span className="font-medium">{formatDate(post.date)}</span>
                    </div>
                  </div>
                  
                  <button className="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white py-3 rounded-xl hover:from-blue-700 hover:to-purple-700 transition-all duration-300 font-semibold text-lg shadow-lg hover:shadow-xl transform hover:scale-105">
                    Read More
                  </button>
                </div>
              </article>
            ))}
          </div>
        ) : (
          <div className="text-center py-20 bg-white rounded-3xl shadow-xl mx-4">
            <Search className="w-20 h-20 mx-auto text-gray-400 mb-6" />
            <h3 className="text-2xl font-bold text-gray-700 mb-3">No posts found</h3>
            <p className="text-gray-500 text-lg">Try adjusting your search terms or category filter.</p>
          </div>
        )}

        {/* Enhanced Pagination */}
        {totalPages > 1 && (
          <div className="flex justify-center items-center gap-3 mt-12">
            <button
              onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
              disabled={currentPage === 1}
              className="px-6 py-3 bg-white border-2 border-gray-300 rounded-xl text-gray-700 font-semibold hover:bg-blue-50 hover:border-blue-300 hover:text-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300 shadow-md"
            >
              Previous
            </button>
            
            <div className="flex gap-2">
              {Array.from({ length: totalPages }, (_, i) => i + 1).map(page => (
                <button
                  key={page}
                  onClick={() => setCurrentPage(page)}
                  className={`px-5 py-3 rounded-xl font-semibold transition-all duration-300 shadow-md ${
                    currentPage === page
                      ? 'bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-lg transform scale-110'
                      : 'bg-white border-2 border-gray-300 text-gray-700 hover:bg-blue-50 hover:border-blue-300 hover:text-blue-700'
                  }`}
                >
                  {page}
                </button>
              ))}
            </div>
            
            <button
              onClick={() => setCurrentPage(Math.min(totalPages, currentPage + 1))}
              disabled={currentPage === totalPages}
              className="px-6 py-3 bg-white border-2 border-gray-300 rounded-xl text-gray-700 font-semibold hover:bg-blue-50 hover:border-blue-300 hover:text-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300 shadow-md"
            >
              Next
            </button>
          </div>
        )}
      </main>

      {/* Enhanced Footer */}
      <footer className="bg-gradient-to-r from-gray-800 to-gray-900 text-white mt-20">
        <div className="max-w-7xl mx-auto px-4 py-12">
          <div className="text-center">
            <h3 className="text-2xl font-bold mb-4">Saad Khan's Blog</h3>
            <p className="text-gray-300 mb-6">Thanks for reading! Stay tuned for more amazing content.</p>
            <div className="border-t border-gray-600 pt-6">
              <p className="text-gray-400">&copy; 2024 Saad Khan's Blog. All rights reserved.</p>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default BlogHomepage;