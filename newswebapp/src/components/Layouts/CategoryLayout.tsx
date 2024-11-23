import { Outlet } from "react-router-dom";
import styled from "styled-components";
import { Fragment } from "react";

const CategoryLayout = () => {
  return (
    <CategoryLayoutContainer>
      <Outlet />
    </CategoryLayoutContainer>
  );
};

const CategoryLayoutContainer = styled.div`
  display: flex;
  flex-direction: row;
`;

export default CategoryLayout;