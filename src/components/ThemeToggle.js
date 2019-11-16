import React from "react";

import { ThemeContext } from "../contexts/ThemeContext";
import styled from "styled-components";
//update
const ThemeToggle = () => {
  return (
    <ThemeContext.Consumer>
      {themeContext => {
        const { isLightTheme, toggleTheme, light, dark } = themeContext;
        let titleButton = "Change to Dark Theme";
        let theme = null;
        if (isLightTheme) {
          titleButton = "Change to Dark Theme";
          theme = light;
        } else {
          titleButton = "Change to Light Theme";
          theme = dark;
        }

        return (
          <Button onClick={toggleTheme} theme={theme}>
            {titleButton}
          </Button>
        );
      }}
    </ThemeContext.Consumer>
  );
};

const Button = styled.button`
  height: 40px;
  padding: 0 20px;
  outline: none;
  border: none;
  cursor: pointer;
  border-radius: 5px;
  background: ${props => props.theme.ui};
  color: ${props => props.theme.syntax};
`;

export default ThemeToggle;
