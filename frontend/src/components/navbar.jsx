import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';

const NavbarContainer = styled.nav`
  background: #333;
  color: white;
  display: flex;
  justify-content: space-between;
  padding: 1rem;
`;

const NavbarNav = styled.ul`
  list-style: none;
  display: flex;
  margin: 0;
  padding: 0;
`;

const NavItem = styled.li`
  margin: 0 1rem;
`;

const NavbarLink = styled(Link)`
  color: white;
  text-decoration: none;
  &:hover {
    text-decoration: underline;
  }
`;

const Navbar = () => {
  return (
    <NavbarContainer>
      <NavbarNav>
        <NavItem>
          <NavbarLink to="/">Home</NavbarLink>
        </NavItem>
        <NavItem>
          <NavbarLink to="/about">About</NavbarLink>
        </NavItem>
      </NavbarNav>
    </NavbarContainer>
  );
};

export default Navbar;