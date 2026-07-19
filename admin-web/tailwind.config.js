/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  // antd 已提供主要样式系统，tailwind 仅做少量辅助
  corePlugins: {
    preflight: false,
  },
  theme: {
    extend: {
      colors: {
        // 与品牌主题对齐的辅助色（暖橙棕系）
        brand: {
          50: '#fdf6ee',
          100: '#f9e7d1',
          500: '#d97742',
          600: '#c25e2c',
          700: '#9f4a22',
        },
      },
    },
  },
  plugins: [],
};
