import React, {FC, useMemo, ReactNode} from 'react';
import {Text, View} from 'react-native';
import createStyles from './styles';
import {MAIL, PHONE, USER} from '../../Assets/svgImages';

interface IProps {
  name: string;
  phone: string;
  email: string;
  address: string;
  children?: ReactNode;
}

const OrderDetailsCard: FC<IProps> = ({
  name,
  phone,
  email,
  address,
  children,
}) => {
  const styles = useMemo(() => createStyles(), []);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Customer details</Text>
      <View style={styles.profile_container}>
        <View style={styles.profile_detail_container}>
          <USER />
          <Text style={styles.profile_detail}>{name}</Text>
        </View>
        <View style={styles.profile_detail_container}>
          <PHONE />
          <Text style={styles.profile_detail}>{phone}</Text>
        </View>
        <View style={styles.profile_detail_container}>
          <MAIL />
          <Text style={styles.profile_detail}>{email}</Text>
        </View>
        <View style={styles.profile_detail_container}>
          <MAIL />
          <Text style={styles.profile_detail}>{address}</Text>
        </View>
      </View>
      <Text style={styles.order_details}>Ordered items</Text>
      {children}
    </View>
  );
};
export default OrderDetailsCard;
