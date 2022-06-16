import { FC, useEffect, useState } from "react";
import { Accommodation } from "../types";
import { Link } from "react-router-dom";
import { request } from "../helpers";
import { Spinner } from "../components/Spinner";

export const Accommodations: FC = () => {
  const [accommodations, setAccommodations] = useState<Accommodation[]>();

  useEffect(() => {
    const abortController = new AbortController();

    request("/api/accommodations", abortController.signal).then(
      setAccommodations
    );

    return () => abortController.abort();
  }, []);

  return (
    <div className="flex flex-col gap-2 mx-auto md:max-w-6xl p-4">
      <h1 className="text-5xl text-center my-10">Accommodations</h1>
      {accommodations ? (
        accommodations.map(({ id, name, nameFallback }) => (
          <Link
            key={id}
            className="p-4 border-2 rounded-lg hover:bg-gray-200 w-full"
            to={`/accommodations/${id}`}
          >
            {name ?? nameFallback}
          </Link>
        ))
      ) : (
        <Spinner />
      )}
    </div>
  );
};
