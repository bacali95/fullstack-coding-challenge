import { FC, useEffect, useState } from "react";
import { Accommodation } from "../types";
import { Link } from "react-router-dom";
import { request } from "../helpers";
import { Spinner } from "../components/Spinner";
import { ErrorMessage } from "../components/ErrorMessage";

export const Accommodations: FC = () => {
  const [accommodations, setAccommodations] = useState<Accommodation[]>();
  const [error, setError] = useState<boolean>(false);

  useEffect(() => {
    const abortController = new AbortController();

    request("/api/accommodations", abortController.signal)
      .then(setAccommodations)
      .catch(() => setError(true));

    return () => abortController.abort();
  }, []);

  return (
    <div className="flex flex-col items-center gap-2 mx-auto md:max-w-6xl p-4">
      <h1 className="text-5xl text-center my-10">Accommodations</h1>
      {accommodations ? (
        accommodations.map(({ id, name, nameFallback }) => (
          <Link
            key={id}
            className="p-4 border-2 border-gray-300 rounded-lg hover:bg-gray-200 w-full"
            to={`/accommodations/${id}`}
            data-testid="accommodation"
          >
            {name ?? nameFallback}
          </Link>
        ))
      ) : error ? (
        <ErrorMessage />
      ) : (
        <Spinner />
      )}
    </div>
  );
};
