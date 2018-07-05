import axios from "axios";

export default {
  
  getArticle: function() {
    return axios.get("/api/articles");
  },
  
  postArticle: function(id) {
    return axios.post("/api/articles/" + id);
  },
  
  deleteArticle: function(id) {
    return axios.delete("/api/articles/" + id);
  },

  saveArticle: function(articleData) {
    return axios.post("/api/articles", articleData);
  }
};
