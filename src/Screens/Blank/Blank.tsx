import React, {useMemo} from 'react';
import {Text, View} from 'react-native';
import createStyles from "./styles";

const Blank = () => {
    const styles = useMemo(() => createStyles(), []);
    return (
        <View style={styles.container}>
            <Text>Work in Progress</Text>
        </View>
    )
}

export default Blank;