import { FC } from "react";
import { CgSpinnerTwoAlt } from "react-icons/cg";

export const Spinner: FC = () => (
  <div className="flex justify-center w-full py-4">
    <CgSpinnerTwoAlt className="h-6 w-6 animate-spin" />
  </div>
);
