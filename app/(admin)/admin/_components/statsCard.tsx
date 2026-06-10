import { AdminStatsCardsPage } from "./AdminStats";
import { StatsCardVisibility } from "./stats-card-visibility";

export const StatsCard = () => {
  return (
    <StatsCardVisibility>
      <AdminStatsCardsPage />
    </StatsCardVisibility>
  );
};
