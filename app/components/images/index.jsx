// @flow

import React from 'react';
import styled from 'styled-components';
import Closed from 'styles/assets/images/closed.svg';
import Open from 'styles/assets/images/open.svg';

const SVGIcon = styled.div`
  width: 16px;
  height: 16px;
  margin-right: 5px;
`;

export const Images = {
    Closed: () => <SVGIcon><Closed /></SVGIcon>,
    Opened: () => <SVGIcon><Open /></SVGIcon>
};
