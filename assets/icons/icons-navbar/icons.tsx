import * as React from "react"
import Svg, { G, Path, Defs, ClipPath } from "react-native-svg"

interface IconProps {
    active?: boolean;
}

export function IconCreate({ active = false }: IconProps) {
    return (
        <Svg
            width={30}
            height={30}
            viewBox="0 0 30 30"
            fill="none"
        >
            <Path
                d="M26.25 17.5v6.25a2.5 2.5 0 01-2.5 2.5H6.25a2.5 2.5 0 01-2.5-2.5V6.25a2.5 2.5 0 012.5-2.5h6.25v2.5H6.25v17.5h17.5V17.5h2.5z"
                fill={active ? '#fff' : '#9F9F9F'}
                stroke={active ? '#fff' : '#9F9F9F'}
            />
            <Path
                d="M26.25 8.75h-5v-5h-2.5v5h-5v2.5h5v5h2.5v-5h5v-2.5z"
                fill={active ? '#fff' : '#9F9F9F'}
                stroke={active ? '#fff' : '#9F9F9F'}
            />
        </Svg>
    )
}

export function IconHistory({ active = false }: IconProps) {
    return (
        <Svg
            width={30}
            height={30}
            viewBox="0 0 30 30"
            fill="none"
        >
            <Path
                d="M15 10v5l2.5 2.5"
                stroke={active ? '#fff' : '#9F9F9F'}
                strokeWidth={3}
                strokeLinecap="round"
                strokeLinejoin="round"
            />
            <Path
                d="M3.813 13.75a11.25 11.25 0 11.624 5M3.813 25v-6.25h6.25"
                stroke={active ? '#fff' : '#9F9F9F'}
                strokeWidth={3}
                strokeLinecap="round"
                strokeLinejoin="round"
            />
        </Svg>
    )
}

export function IconScanner({ active = false }: IconProps) {
    return (
        <Svg
            width={30}
            height={30}
            viewBox="0 0 30 30"
            fill="none"
        >
            <G clipPath="url(#clip0_207_293)">
                <Path
                    d="M5 18.125A1.875 1.875 0 016.875 20v3.125h4.375a1.875 1.875 0 110 3.75h-5a3.125 3.125 0 01-3.125-3.125V20A1.875 1.875 0 015 18.125zm20 0a1.875 1.875 0 011.866 1.695l.009.18v3.75a3.125 3.125 0 01-2.92 3.119l-.205.006h-5a1.875 1.875 0 01-.18-3.741l.18-.009h4.375V20A1.875 1.875 0 0125 18.125zm0-5a1.875 1.875 0 01.18 3.741l-.18.009H5a1.875 1.875 0 01-.18-3.741l.18-.009h20zm-13.75-10a1.875 1.875 0 01.18 3.741l-.18.009H6.875V10a1.875 1.875 0 01-3.741.18L3.125 10V6.25a3.125 3.125 0 012.92-3.119l.205-.006h5zm12.5 0a3.125 3.125 0 013.119 2.92l.006.205V10a1.875 1.875 0 01-3.741.18l-.009-.18V6.875H18.75a1.875 1.875 0 01-.18-3.741l.18-.009h5z"
                    fill={active ? '#fff' : '#9F9F9F'}
                />
            </G>
            <Defs>
                <ClipPath id="clip0_207_293">
                    <Path fill={active ? '#fff' : '#9F9F9F'} d="M0 0H30V30H0z" />
                </ClipPath>
            </Defs>
        </Svg>
    )
}

export function IconSettings({ active = false }: IconProps) {
    return (
        <Svg
            width={26}
            height={26}
            viewBox="0 0 26 26"
            fill="none"
        >
            <Path
                d="M21.125 13c0-.25-.01-.488-.032-.737l2.015-1.527a1.09 1.09 0 00.281-1.409l-2.026-3.499a1.07 1.07 0 00-1.354-.455l-2.329.986c-.4-.282-.823-.53-1.267-.737l-.315-2.502a1.087 1.087 0 00-1.072-.953h-4.041a1.09 1.09 0 00-1.083.953l-.314 2.502a8.22 8.22 0 00-1.268.737l-2.33-.986a1.07 1.07 0 00-1.353.455L2.61 9.338a1.092 1.092 0 00.281 1.409l2.015 1.527a7.909 7.909 0 000 1.463l-2.014 1.527a1.09 1.09 0 00-.282 1.409l2.026 3.499c.27.476.856.671 1.354.455l2.329-.986c.4.282.823.53 1.268.737l.314 2.502c.065.542.53.953 1.072.953h4.041c.542 0 1.008-.411 1.072-.953l.315-2.502a8.228 8.228 0 001.267-.737l2.33.986a1.069 1.069 0 001.354-.455l2.025-3.5a1.092 1.092 0 00-.281-1.408l-2.015-1.527a5.6 5.6 0 00.043-.737zm-8.082 3.792c-2.09 0-3.791-1.701-3.791-3.792 0-2.09 1.7-3.792 3.791-3.792S16.835 10.91 16.835 13c0 2.09-1.7 3.792-3.792 3.792z"
                fill="#9F9F9F"
            />
        </Svg>
    )
}