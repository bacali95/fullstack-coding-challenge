def map_accommodation_to_dto(item):
    return {
        "id": item[0],
        "name": item[1],
        "nameFallback": item[2],
    }


def map_review_to_dto(item):
    return {
        "id": item[0],
        "title": item[1],
        "text": item[2],
        "entryDate": int(item[3].timestamp() * 1000),
        "updatedDate": int(item[4].timestamp() * 1000),
        "traveledWith": item[5],
        "travelDate": int(item[6].timestamp() * 1000),
        "userName": item[7],
        "ratings": {
            "general": item[8],
            "aspects": {
                "location": item[10],
                "service": item[11],
                "priceQuality": item[12],
                "food": item[13],
                "room": item[14],
                "childFriendly": item[15],
                "interior": item[16],
                "size": item[17],
                "activities": item[18],
                "restaurants": item[19],
                "sanitaryState": item[20],
                "accessibility": item[21],
                "nightlife": item[22],
                "culture": item[23],
                "surrounding": item[24],
                "atmosphere": item[25],
                "noviceSkiArea": item[26],
                "advancedSkiArea": item[27],
                "apresSki": item[28],
                "beach": item[29],
                "entertainment": item[30],
                "environmental": item[31],
                "pool": item[32],
                "terrace": item[33],
                "housing": item[34],
                "hygiene": item[35]
            }
        }
    }
