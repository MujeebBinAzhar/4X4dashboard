import requests from './httpService';

const BlogServices = {
  addBlog: async (body) => {
    return requests.post('/blog/add', body);
  },
  
  getAllBlogs: async () => {
    return requests.get('/blog');
  },
  getBlogById: async (id) => {
    return requests.get(`/blog/${id}`);
  },
  updateBlog: async (id, body) => {
    return requests.put(`/blog/${id}`, body);
  },
  
  
  deleteBlog: async (id) => {
    return requests.delete(`/blog/${id}`);
  },
  
};

export default BlogServices;
