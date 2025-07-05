// path: @/component/config/provider-config.js

import "@fontsource/montserrat";
import viVN from "antd/locale/vi_VN";
import { theme } from "antd";

const { darkAlgorithm } = theme;

export const PROVIDER_CONFIG = {
  locale: viVN,
  theme: {
    // algorithm: dark ? darkAlgorithm : defaultAlgorithm,
    algorithm: darkAlgorithm,
    components: {
      Button: { fontWeight: 500 },
      Form: {
        labelColor: "rgba(0, 0, 0, 0.56)",
      },
      Drawer: {},
      Badge: { statusSize: 8 },
      Segmented: {
        itemSelectedBg: "#1677ff",
        itemSelectedColor: "#ffffff",
      },
      List: {},
      Card: { bodyPaddingSM: 4 },
    },
    token: { fontFamily: "Montserrat, sans-serif" },
  },
  form: {
    validateMessages: {
      required: "Thông tin bắt buộc",
    },
  },
};
