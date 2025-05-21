import styled from "styled-components";
import { useUser } from "../features/authentication/useUser";
import Spinner from "../ui/Spinner";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
const FullPdgae = styled.div`
  height: 100vh;
  background-color: var(--color-grey-50);
  display: flex;
  align-items: center;
  justify-content: center;
`;

function ProtectedRoute({ children }) {
  const { isPending, isAuthenticated, fetchStatus } = useUser();
  const navigate = useNavigate();
  useEffect(() => {
    if (!isAuthenticated && !isPending && fetchStatus !== "fetching")
      navigate("/login");
  }, [isAuthenticated, isPending, navigate, fetchStatus]);
  if (isPending) {
    return (
      <FullPdgae>
        <Spinner />
      </FullPdgae>
    );
  }
  if (isAuthenticated) return children;
}
export default ProtectedRoute;
