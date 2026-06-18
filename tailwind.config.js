import jiti from 'jiti'
import { fileURLToPath } from 'node:url'
import { dirname, join } from 'node:path'

const __dirname = dirname(fileURLToPath(import.meta.url))
const load = jiti(__filename)
const { SHADOW_TOKENS } = load(join(__dirname, 'src/design/tokens.ts'))

/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        surface: '#FDFBF7',
        canvas: '#FFF9F0',
        cheese: {
          DEFAULT: '#FFD54F',
          light: '#FFE082',
          soft: '#FFF3C4',
          dark: '#F9A825',
        },
        tomato: {
          DEFAULT: '#FF6B6B',
          light: '#FF8A80',
          soft: '#FFCDD2',
          dark: '#E53935',
        },
        fresh: {
          DEFAULT: '#4CAF50',
          light: '#81C784',
          soft: '#C8E6C9',
          dark: '#388E3C',
        },
        ink: {
          DEFAULT: '#2D2419',
          muted: '#8A8175',
          faint: '#B5ADA3',
        },
      },
      fontFamily: {
        display: ['Nunito', 'Noto Sans SC', 'PingFang SC', 'Microsoft YaHei', 'sans-serif'],
      },
      borderRadius: {
        clay: '28px',
        'clay-lg': '32px',
        pill: '9999px',
      },
      spacing: {
        gutter: '1rem',
        'nav-offset': '5.5rem',
        'card-gap': '1rem',
        'nav-float': '1rem',
      },
      boxShadow: SHADOW_TOKENS,
    },
  },
  plugins: [],
}
