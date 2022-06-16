export interface Accommodation {
  id: string;
  name?: string;
  nameFallback: string;
}

export interface AccommodationReview {
  id: string;
  title: string;
  text: string;
  travelDate: number;
  traveledWith: string;
  userName: string;
  entryDate: number;
  updatedDate: number;
  ratings: {
    general: number | null;
    aspects: {
      accessibility: number | null;
      activities: number | null;
      advancedSkiArea: number | null;
      apresSki: number | null;
      atmosphere: number | null;
      beach: number | null;
      childFriendly: number | null;
      culture: number | null;
      entertainment: number | null;
      environmental: number | null;
      food: number | null;
      housing: number | null;
      hygiene: number | null;
      interior: number | null;
      location: number | null;
      nightlife: number | null;
      noviceSkiArea: number | null;
      pool: number | null;
      priceQuality: number | null;
      restaurants: number | null;
      room: number | null;
      sanitaryState: number | null;
      service: number | null;
      size: number | null;
      surrounding: number | null;
      terrace: number | null;
    };
  };
}
