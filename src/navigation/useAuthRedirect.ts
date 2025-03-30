import { useEffect } from 'react';
import { useNavigation, NavigationProp } from '@react-navigation/native';
import { RootTabParamList } from './AppNavigator';

export const useAuthRedirect = (user: any, loading: boolean) => {
  const navigation = useNavigation<NavigationProp<RootTabParamList>>();

  useEffect(() => {
    if (!loading && user) {
      navigation.navigate('Home');
    }
  }, [user, loading, navigation]);
};