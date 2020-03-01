import React, { useState } from 'react';
import { StatusBar } from 'react-native';
import {
  LoginButton,
  LoginResult,
  AccessToken,
  GraphRequest,
  GraphRequestManager,
} from 'react-native-fbsdk';

import { Container, UserData, Loading, UserName, UserEmail } from './styles';

interface IUser {
  name: string;
  email: string;
}

const App: React.FC = () => {
  const [user, setUser] = useState<IUser | null>(null);
  const [loading, setLoading] = useState<boolean>(false);

  function getUserCallback(error?: object, result?: object) {
    if (error) {
      console.log('getUserError', error);
    } else if (result) {
      setUser(result);
      setLoading(false);
    }
  }

  function getUserInfo(token: string) {
    const infoRequest = new GraphRequest(
      '/me',
      {
        accessToken: token,
        parameters: {
          fields: { string: 'email, name' },
        },
      },
      getUserCallback,
    );

    new GraphRequestManager().addRequest(infoRequest).start();
  }

  async function finishLogin(error: object, result: LoginResult) {
    if (error) {
      console.log(error);
    } else if (result.isCancelled) {
      console.log('isCancelled');
    } else {
      const accessData = await AccessToken.getCurrentAccessToken();

      if (accessData?.accessToken) {
        setLoading(true);

        getUserInfo(accessData?.accessToken);
      }
    }
  }

  return (
    <>
      <StatusBar barStyle="dark-content" />
      <Container>
        <UserData>
          {loading && <Loading />}
          {user && (
            <>
              <UserName>{user.name}</UserName>
              <UserEmail>{user.email}</UserEmail>
            </>
          )}
        </UserData>
        <LoginButton
          permissions={['public_profile', 'email']}
          onLoginFinished={finishLogin}
          onLogoutFinished={() => setUser(null)}
        />
      </Container>
    </>
  );
};

export default App;
