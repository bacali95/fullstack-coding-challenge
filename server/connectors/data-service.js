const axios = require("axios");

class DataService {
  constructor(endpoint) {
    this.endpoint = endpoint;
  }

  async getAllAccommodations() {
    try {
      const response = await axios.get("/api/accommodations", {
        baseURL: this.endpoint,
      });
      return response.data;
    } catch (e) {
      console.error(e.message);
    }
  }

  async getAccommodationById(accommodationId) {
    try {
      const response = await axios.get(
        `/api/accommodations/${accommodationId}`,
        { baseURL: this.endpoint }
      );
      return response.data;
    } catch (e) {
      console.error(e.message);
      return undefined;
    }
  }

  async getAccommodationReviews(accommodationId) {
    try {
      const response = await axios.get(
        `/api/accommodations/${accommodationId}/reviews`,
        { baseURL: this.endpoint }
      );

      return response.data;
    } catch (e) {
      console.error(e.message);
      return undefined;
    }
  }
}

module.exports.dataSourceConnector = new DataService(
  process.env.DATA_SERVICE_URL
);
