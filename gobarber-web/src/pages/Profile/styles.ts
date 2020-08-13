import styled from 'styled-components';
import { shade } from 'polished';

export const Container = styled.div`
  flex-direction: column;
  align-items: stretch;

  > header {
    height: 14.4rem;
    background: #28262e;

    display: flex;
    align-items: center;

    div {
      width: 100%;
      max-width: 1120px;
      margin: 0 auto;

      svg {
        color: #999591;
        width: 2.4rem;
        height: 2.4rem;
      }
    }
  }
`;

export const Content = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 100%;
  margin: -50px auto 0;

  form {
    margin: 8rem 0;
    width: 34rem;
    text-align: center;
    display: flex;
    flex-direction: column;

    h1 {
      margin-bottom: 2.4rem;
      font-size: 2rem;
      text-align: left;
    }

    a {
      color: #f4ede8;
      display: block;
      margin-top: 2.4rem;
      text-decoration: none;

      &:hover {
        color: ${shade(0.2, '#f4ede8')};
      }
    }

    input[name='old_password'] {
      padding-top: 2.4rem;
    }
  }
`;

export const AvatarInput = styled.div`
  margin-bottom: 3.2rem;
  position: relative;
  align-self: center;

  img {
    width: 18.6rem;
    height: 18.6rem;
    border-radius: 50%;
  }

  button {
    position: absolute;
    width: 4.8rem;
    height: 4.8rem;
    background: #ff9900;
    border-radius: 50%;
    right: 0;
    bottom: 0;
    border: 0;
    transition: background-color 0.2s;

    display: flex;
    align-items: center;
    justify-content: center;

    svg {
      width: 2rem;
      height: 2rem;
      color: #312e38;
    }

    &:hover {
      background: ${shade(0.2, '#ff9000')};
    }
  }
`;
