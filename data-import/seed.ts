import * as fs from "fs";
import * as path from "path";
import * as uuid from "uuid";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  const accommodations = JSON.parse(
    await fs.promises.readFile(
      path.join(__dirname, "accommodations.json"),
      "utf-8"
    )
  );
  for (const accommodation of accommodations) {
    const { id, names } = accommodation;

    await prisma.accommodation.upsert({
      where: { id },
      update: {},
      create: {
        id,
        names: {
          createMany: {
            data: Object.entries(names.main).map(([locale, payload]) => ({
              id: uuid.v4(),
              locale,
              payload,
            })) as any,
          },
        },
        namesFallback: names.fallback,
      },
    });
  }

  const reviews = JSON.parse(
    await fs.promises.readFile(path.join(__dirname, "reviews.json"), "utf-8")
  );
  for (const review of reviews) {
    if (
      !accommodations.find(
        (accommodation: any) => review.parents?.[0]?.id === accommodation.id
      )
    ) {
      console.warn(
        `Skipped review '${review.id}' because of missing accommodation '${review.parents?.[0]?.id}'`
      );
      continue;
    }

    const {
      id,
      titles,
      texts,
      locale,
      entryDate,
      updatedDate,
      originalUserName,
      originalUserEmail,
      traveledWith,
      travelDate,
      ratings,
      parents,
      status,
    } = review;
    await prisma.review.upsert({
      where: { id },
      update: {},
      create: {
        id,
        titles: {
          createMany: {
            data: Object.entries(titles).map(([locale, payload]) => ({
              id: uuid.v4(),
              locale,
              payload,
            })) as any,
          },
        },
        texts: {
          createMany: {
            data: Object.entries(texts).map(([locale, payload]) => ({
              id: uuid.v4(),
              locale,
              payload,
            })) as any,
          },
        },
        locale,
        entryDate: new Date(entryDate),
        updatedDate: new Date(updatedDate),
        originalUserName,
        originalUserEmail,
        traveledWith,
        travelDate: new Date(travelDate),
        accommodation: {
          connect: {
            id: parents[0].id,
          },
        },
        generalRating: ratings.general.general,
        aspectRatings: {
          create: {
            id: uuid.v4(),
            ...ratings.aspects,
          },
        },
        status: {
          create: {
            id: uuid.v4(),
            ...status,
          },
        },
      },
    });
  }
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
