from dotenv import load_dotenv
from flask import Flask, abort, jsonify
import psycopg2
import os

from helpers import map_accommodation_to_dto, map_review_to_dto

load_dotenv()

app = Flask(__name__)

db_connection = psycopg2.connect(f"""
    host={os.getenv('DATABASE_HOST')}
    port={os.getenv('DATABASE_PORT')}
    dbname={os.getenv('DATABASE_NAME')}
    user={os.getenv('DATABASE_USER')}
    password={os.getenv('DATABASE_PASSWORD')}
""")

ACCOMMODATIONS_QUERY = """
SELECT "acc"."id", "names"."payload", "acc"."namesFallback" FROM "Accommodation" AS "acc" 
LEFT JOIN "TextTranslation" AS "names" ON "acc"."id" = "names"."accommodationId"
"""
REVIEWS_QUERY = """
SELECT 
    "rev"."id", "titles"."payload", "texts"."payload", "rev"."entryDate", "status"."published",
    "rev"."traveledWith", "rev"."travelDate", "rev"."originalUserName", "rev"."generalRating", "aspectsRatings".*
FROM "Review" AS "rev" 
LEFT JOIN "Accommodation" AS "acc" ON "acc"."id" = "rev"."accommodationId"
LEFT JOIN "TextTranslation" AS "titles" ON "titles"."reviewTitleId" = "rev"."id" AND "titles"."locale" = "rev"."locale"
LEFT JOIN "TextTranslation" AS "texts" ON "texts"."reviewTextId" = "rev"."id" AND "texts"."locale" = "rev"."locale"
LEFT JOIN "ReviewAspectsRatings" AS "aspectsRatings" ON "aspectsRatings"."id" = "rev"."aspectsRatingsId"
LEFT JOIN "ReviewStatus" AS "status" ON "status"."id" = "rev"."statusId"
"""


@app.route('/api/accommodations')
def accommodations():
    db_cursor = db_connection.cursor()
    db_cursor.execute(ACCOMMODATIONS_QUERY)
    data = db_cursor.fetchall()

    return jsonify([map_accommodation_to_dto(item) for item in data])


@app.route('/api/accommodations/<accommodationId>')
def sinfge_accommodation(accommodationId):
    db_cursor = db_connection.cursor()
    db_cursor.execute(f"""
        {ACCOMMODATIONS_QUERY}
        WHERE "acc"."id" = '{accommodationId}'
    """)
    item = db_cursor.fetchone()

    if item is None:
        return abort(404)

    return jsonify(map_accommodation_to_dto(item))


@app.route('/api/accommodations/<accommodationId>/reviews')
def accommodation_reviews(accommodationId):
    db_cursor = db_connection.cursor()

    db_cursor.execute(f"""
        {ACCOMMODATIONS_QUERY}
        WHERE "acc"."id" = '{accommodationId}'
    """)
    accommodation = db_cursor.fetchone()

    if accommodation is None:
        return abort(404)

    db_cursor.execute(f"""
        {REVIEWS_QUERY}
        WHERE "acc"."id" = '{accommodationId}'
    """)
    data = db_cursor.fetchall()

    return jsonify([map_review_to_dto(item) for item in data])


@app.route('/api/accommodations/<accommodationId>/reviews/<reviewId>')
def single_accommodation_review(accommodationId, reviewId):
    db_cursor = db_connection.cursor()
    db_cursor.execute(f"""
        {REVIEWS_QUERY}
        WHERE "acc"."id" = '{accommodationId}' AND "rev"."id" = '{reviewId}'
    """)
    item = db_cursor.fetchone()

    if item is None:
        return abort(404)

    return jsonify(map_review_to_dto(item))


@app.errorhandler(404)
def page_not_found(error):
    return "Item not found", 404


if __name__ == '__main__':
    app.run(host="0.0.0.0", port=os.getenv("PORT", 5000))
