import * as React from "react"
import Svg, { Path } from "react-native-svg"

export function CrossBlue(props: any) {
  return (
    <Svg
      width={17}
      height={17}
      viewBox="0 0 17 17"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <Path
        d="M10.377 14.473l-.005-4.895 4.895-.005a.359.359 0 00.356-.357l-.002-2.312a.357.357 0 00-.357-.356l-4.895.005-.005-4.895a.357.357 0 00-.357-.356l-2.312.002a.357.357 0 00-.356.357l.005 4.895-4.895.005a.357.357 0 00-.356.357l.002 2.312a.357.357 0 00.357.356l4.895-.005.005 4.895a.357.357 0 00.357.356l2.312-.003a.356.356 0 00.356-.356z"
        fill="#3A86FF"
      />
    </Svg>
  )
}

