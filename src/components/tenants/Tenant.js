import React from 'react'
import PropTypes from 'prop-types'

import { ListItem } from 'react-native-elements';
import {View} from "react-native";

const Tenant = ({ onTenantClick, tenant }) => (
    <View>
        <ListItem
            key={tenant.id}
            roundAvatar
            avatar={{ uri: tenant.imageUrl }}
            title={`${tenant.name.toUpperCase()}`}
            subtitle={`${tenant.site.toUpperCase()}`}
            onPress={() => onTenantClick(tenant)}
        />
    </View>
);

Tenant.propTypes = {

    onTenantClick: PropTypes.func.isRequired,
    tenant: PropTypes.object,
};

export default Tenant;
