import styled from "styled-components";
import Stats from "./Stats";
import { useRecentBookings } from "../../features/dashboard/useRecentBookings";
import { useRecentStays } from "../../features/dashboard/useRecentStays";
import Spinner from "../../ui/Spinner";
import { useCabins } from "../cabins/useCabins";
import SalesChart from "./SalesChart";
import DurationChart from "./DurationChart";
import TodayActivity from "../check-in-out/TodayActivity";
const StyledDashboardLayout = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr 1fr;
  grid-template-rows: auto 34rem auto;
  gap: 2.4rem;
`;
function DashboardLayout() {
  const { isPending: isPending1, bookings } = useRecentBookings();
  const { isPending: isPending2, confirmedStays, numDays } = useRecentStays();
  console.log(confirmedStays);
  const { isPending: isPending3, cabins } = useCabins();

  if (isPending1 || isPending2 || isPending3) return <Spinner />;
  return (
    <StyledDashboardLayout>
      <Stats
        bookings={bookings}
        confirmedStays={confirmedStays}
        numDays={numDays}
        cabinCount={cabins.length}
      />
      <TodayActivity />
      <DurationChart confirmedStays={confirmedStays} />
      <SalesChart bookings={bookings} numDays={numDays} />
    </StyledDashboardLayout>
  );
}

export default DashboardLayout;
