import React, { useEffect } from 'react';
import CalendarLoaders from 'components/cards/Skeleton/CalendarLoaders';

const ReloadPageAfterTwoSeconds = () => {
  useEffect(() => {
    const timer = setTimeout(() => {
      window.location.reload();
    }, 2000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <div>
      <CalendarLoaders />
    </div>
  );
};

export default ReloadPageAfterTwoSeconds;
