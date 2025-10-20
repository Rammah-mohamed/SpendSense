import { IconRotateClockwise2 } from "@tabler/icons-react";
const LoadingSpinner = () => {
  return (
    <div className="flex justify-center items-center h-32">
      <IconRotateClockwise2 stroke={2} className="h-6 w-6 animate-spin text-text-Muted" />
    </div>
  );
};

export default LoadingSpinner;
