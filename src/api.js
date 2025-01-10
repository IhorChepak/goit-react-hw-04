import axios from "axios";

export const fetchArticles = async (query, page) => {
  const { data } = await axios.get(`https://api.unsplash.com/search/photos`, {
    params: {
      client_id: "2-bJ2fciUFoCkOFNWuFZoQUdJiHGeGnjrlmSTEDM5pM",
      query,
      page,
      per_page: 12,
    },
  });
  console.log(data.results);
  return data.results;
};