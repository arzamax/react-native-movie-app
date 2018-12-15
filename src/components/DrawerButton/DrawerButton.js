import React from "react";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";

import { styles } from "./styles";

export default ({ navigation }) =>
    <MaterialIcons
        name='menu'
        style={styles.drawerButton}
        onPress={() => navigation.openDrawer()}
    />;
