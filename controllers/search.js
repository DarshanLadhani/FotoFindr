import axios from "axios";
import "dotenv/config";

const pixabayApiKey = process.env.pixabay_api_key;

// Common keywords for random images
const commonKeywords = [
  "backgrounds",
  "nature",
  "landscapes",
  "beaches",
  "adventure",
  "asthetic",
  "minimalistic",
  "unique+photos",
];

// Logic to display images 
export async function displayImages(req, res) {
  const { query, page, per_page , orientation } = req.query;

  if (query !== "") {
    try {
      const pixabayResponse = await axios.get(`https://pixabay.com/api/`, {
        params: {
          key: pixabayApiKey,
          q: query,
          page: page,
          per_page: per_page,
          orientation : orientation
        },
      });


      return res.json({ data: pixabayResponse.data.hits, query: query });
    } catch (error) {
      return res.render("home", { user: req.user });
    }
  } else {
    try {
      const pixabayPromises = commonKeywords.map((keyword) =>
        axios.get(`https://pixabay.com/api/`, {
          params: {
            key: pixabayApiKey,
            q: keyword,
            page: page || 1,
            per_page: per_page || 10,
            orientation: orientation
          },
        })
      );

      const pixabayResponses = await Promise.all(pixabayPromises);

      let combinedImages = [];
      pixabayResponses.forEach((response) => {
        combinedImages = combinedImages.concat(response.data.hits);
      });

      return res.json({ data: combinedImages});
    } catch (error) {
      return res.render("home", { user: req.user });
    }
  }
}
