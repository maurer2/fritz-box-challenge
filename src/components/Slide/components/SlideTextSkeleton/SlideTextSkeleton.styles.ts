import styled from 'styled-components';

export const SlideTextSkeletonBar = styled.span`
  display: block;
  margin-inline: auto;
  inline-size: 75%;
  aspect-ratio: 7.5/1;
  background: currentColor;

  @media (prefers-reduced-motion: no-preference) {
    animation: pulse 1.5s ease-in-out infinite;
  }
`;
