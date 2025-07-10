// path: @/component/config/provider-config.js

import "@fontsource/montserrat";
import viVN from "antd/locale/vi_VN";
import { theme } from "antd";

const { darkAlgorithm, defaultAlgorithm } = theme;

// You can make this dynamic by exporting a function instead
export const getProviderConfig = (isDark = true) => ({
  locale: viVN,
  theme: {
    algorithm: isDark ? darkAlgorithm : defaultAlgorithm,
    components: {
      Button: { fontWeight: 600 },
      Form: {
        // Remove labelColor override to let theme algorithm handle it
      },
      Drawer: {},
      Badge: { statusSize: 8 },
      Segmented: {},
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
});

// For backward compatibility, export the dark config as default
export const PROVIDER_CONFIG = getProviderConfig(true);
