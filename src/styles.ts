import styled from 'styled-components/native';

export const Container = styled.SafeAreaView`
  flex: 1;
  align-items: center;
  justify-content: center;
`;
export const UserData = styled.View``;
export const Loading = styled.ActivityIndicator`
  margin-bottom: 10px;
`;

export const UserName = styled.Text`
  font-size: 14px;
  color: #333;
  margin-bottom: 4px;
  font-weight: bold;
  text-align: center;
`;

export const UserEmail = styled.Text`
  font-size: 12px;
  color: #333;
  margin-bottom: 10px;
  text-align: center;
`;
