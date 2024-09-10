import {
  IconCreate,
  IconHistory,
  IconScanner,
  IconSettings,
} from "@assets/icons/icons-navbar/icons";

export const imgCards = [
  {
    source: require("@assets/icons/icons-png/wifi.png"),
    type: "wifi",
  },
  {
    source: require("@assets/icons/icons-png/web.png"),
    type: "web",
  },
  {
    source: require("@assets/icons/icons-png/contact.png"),
    type: "contact",
  },
  {
    source: require("@assets/icons/icons-png/email.png"),
    type: "email",
  },
  {
    source: require("@assets/icons/icons-png/number.png"),
    type: "number",
  },
  {
    source: require("@assets/icons/icons-png/sms.png"),
    type: "sms",
  },
  {
    source: require("@assets/icons/icons-png/url.png"),
    type: "url",
  },
  {
    source: require("@assets/icons/icons-png/text.png"),
    type: "text",
  },
];

export const imgCardsCamera = [
  {
    source: require("@assets/icons/icons-png/flash.png"),
    type: "flash",
  },
  {
    source: require("@assets/icons/icons-png/image.png"),
    type: "image",
  },
  {
    source: require("@assets/icons/icons-png/camera-switch.png"),
    type: "switch",
  },
];

export const screens = [
  {
    module: IconScanner,
    name: "scanner",
  },
  {
    module: IconHistory,
    name: "history",
  },
  {
    module: IconCreate,
    name: "create",
  },
  /*   {
        module: IconSettings,
        name: 'settings'
    } */
];
