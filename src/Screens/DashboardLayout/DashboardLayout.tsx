import React, {useMemo} from 'react';
import {Text, View, Image, ScrollView} from 'react-native';
import createStyles from './styles';

// interface IProps {
//   navigation: any;
// }

const DashboardLayout = () => {
  const styles = useMemo(() => createStyles(), []);
  return (
    <>
      <View style={styles.container}>
        <View style={styles.profile_container}>
          <Text style={styles.welcomeText}>Welcome, Oluwaferanmi👋</Text>
        </View>
      </View>
    </>
  );
};

export default DashboardLayout;
