import { View, TouchableOpacity } from 'react-native'
import React from 'react'
import { IconSettings } from '@assets/icons/icons-navbar/icons'
import { router } from 'expo-router'

export default function SettingsGo() {
    return (
        <TouchableOpacity
            onPress={() => router.push('/page-settings')}
        >
            <IconSettings />
        </TouchableOpacity>
    )
}