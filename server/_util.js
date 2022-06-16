function getAverageRatings(reviews) {
  let generalCount = 0;
  let items = {};
  let itemsCounts = {};
  let aspects = Object.keys(reviews[0].ratings.aspects);
  reviews.forEach((review) => {
    let weight = getReviewWeight(review);
    generalCount += review.ratings.general * weight;
    aspects.forEach((a) => {
      items[a] = items[a] || 0;
      if (review.ratings.aspects[a]) {
        items[a] += review.ratings.aspects[a] * weight;
        itemsCounts[a] = itemsCounts[a] || 0;
        itemsCounts[a]++;
      }
    });
  });
  let generalAvg = (generalCount / reviews.length).toFixed(1);
  Object.keys(itemsCounts).map((item) => {
    itemsCounts[item] = (items[item] / itemsCounts[item]).toFixed(1);
  });
  return { generalAvg, aspectsAvg: itemsCounts };
}

function getAverageTravelledWith(reviews) {
  let categories = {};
  let categoriesCount = {};
  reviews.forEach((item) => {
    let category = item.traveledWith;
    categoriesCount[category] = categoriesCount[category] || 0;
    categoriesCount[category]++;
  });
  Object.keys(categoriesCount).forEach((item) => {
    categories[item] = ((categoriesCount[item] * 10) / reviews.length).toFixed(
      2
    );
  });

  return categories;
}

function getReviewWeight(review) {
  const currentYear = new Date().getFullYear();
  const reviewYear = new Date(review.entryDate).getFullYear();

  if (currentYear - reviewYear >= 5) return 0.5;

  return 1 - 0.1 * (currentYear - reviewYear);
}

module.exports = {
  getAverageRatings,
  getAverageTravelledWith,
};
