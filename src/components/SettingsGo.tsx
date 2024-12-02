import { TouchableOpacity } from 'react-native'
import React from 'react'
import { IconSettings } from '@assets/icons/icons-navbar/icons'
import { router } from 'expo-router'

export default function SettingsGo() {

    const goToSettings = () => {
        router.push('/page-settings')
    }

    return (
        <TouchableOpacity
            onPress={goToSettings}
        >
            <IconSettings />
        </TouchableOpacity>
    )
}