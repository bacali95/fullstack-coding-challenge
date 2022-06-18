import { FC } from "react";

export const ErrorMessage: FC = () => (
  <div
    className="p-4 bg-red-100 border-2 border-red-400 text-red-600 text-center rounded-lg"
    data-testid="error-message"
  >
    Oh no! there is something wrong happened :(
  </div>
);
