import { View, Text, SafeAreaView } from 'react-native'
import React from 'react'
import { COLORS } from '../constants/theme'

const index = () => {
    return (
        <SafeAreaView style={{ backgroundColor: COLORS.gray }}>
            <Text style={{ color: "blue" }}>index</Text>
            <View>

            </View>
        </SafeAreaView>
    )
}

export default index