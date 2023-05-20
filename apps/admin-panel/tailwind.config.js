/** @type {import('tailwindcss').Config} */
const { createGlobPatternsForDependencies } = require('@nx/react/tailwind');
const { join } = require('path');
const plugin = require('tailwindcss/plugin');

module.exports = {
  content: [
    join(
      __dirname,
      '{src,pages,components,app}/**/*!(*.stories|*.spec).{ts,tsx,html}'
    ),
    ...createGlobPatternsForDependencies(__dirname),
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        black: '#09090c',
        darkGray: '#121212',

        brightRed: 'hsl(12, 88%, 59%)',
        brightRedLight: 'hsl(12, 88%, 69%)',
        brightRedSupLight: 'hsl(12, 88%, 95%)',

        darkBlue: 'hsl(228, 39%, 23%)',
        darkGrayishBlue: 'hsl(227, 12%, 61%)',
        veryDarkBlue: 'hsl(233, 12%, 13%)',
      },
    },
  },
  extend: {
    typography: {
      DEFAULT: {
        css: {
          color: '#000',
        },
      },
    },
    colors: {
      primary: {
        50: '#F4FBF7',
        100: '#E1F4EA',
        200: '#B6E7CB',
        300: '#8DDDAD',
        400: '#5FD389',
        500: '#33CC66',
        600: '#2CA056',
        700: '#237644',
        800: '#1B5032',
        900: '#0F291B',
      },
      gray: {
        50: '#F9FAFB',
        100: '#F2F4F7',
        200: '#EAECF0',
        300: '#D0D5DD',
        400: '#98A2B3',
        500: '#667085',
        600: '#475467',
        700: '#344054',
        800: '#1D2939',
        900: '#080c14',
      },
    },
    backgroundColor: ({ theme }) => ({
      body: theme.colors.gray['50'],
    }),
    strokeWidth: {
      3: '3px',
      4: '4px',
      5: '5px',
      6: '6px',
    },
    borderWidth: {
      6: '6px',
      8: '8px',
      10: '10px',
      12: '12px',
    },
    ringWidth: {
      6: '6px',
      8: '8px',
      10: '10px',
      12: '12px',
    },
    textColor: ({ theme }) => ({
      body: theme.colors.black,
      sub: theme.colors.gray['600'],
    }),
    borderColor: ({ theme }) => ({
      light: theme.colors.gray['100'],
    }),
    backgroundImage: {
      request: 'url(/images/footer-illust.png)',
    },
    keyframes: {
      loading: {
        '0%, 100%': { backgroundPosition: '0% 50%' },
        '50%': { backgroundPosition: '100% 50%' },
      },
    },
    animation: {
      loading: 'loading 2s ease infinite',
    },
  },
  plugins: [
    require('@tailwindcss/typography'),

    plugin(function ({ addComponents, matchComponents, theme }) {
      const applyFont = (size) => {
        return {
          fontSize: theme(`fontSize.${size}`),
          lineHeight: theme(`fontSize.${size}[1].lineHeight`),
        };
      };

      addComponents({
        '.chip': {
          ...applyFont('sm'),
          fontWeight: '500',
          borderRadius: '9999px',
          color: theme('colors.gray.700'),
          padding: '0.25rem 0.625rem',
          borderWidth: '1px',
          borderColor: theme('colors.gray.300'),

          '&:hover': {
            backgroundColor: theme('colors.gray.100'),
            color: theme('colors.gray.900'),
          },
        },
        '.label': {
          ...applyFont('sm'),
          fontWeight: '500',
          color: theme('colors.gray.700'),
          cursor: 'pointer',
        },

        '.helper-text': {
          ...applyFont('sm'),
          fontWeight: '400',
          color: theme('colors.gray.600'),
          '&.error': {
            color: theme('colors.red.500'),
          },
        },

        '.input-field': {
          outline: 'none',
          width: '100%',
          height: theme('spacing.10'),
          borderRadius: '.375rem',
          backgroundColor: '#FFFFFF',
          padding: '0.625rem 1rem',
          color: theme('colors.gray.900'),
          borderColor: theme('colors.gray.300'),
          '&::placeholder': {
            color: theme('colors.gray.400'),
          },
          '&:focus': {
            '--tw-ring-color': theme('colors.primary.100'),
            borderColor: theme('colors.primary.300'),
          },
          '&.error': {
            '--tw-ring-color': theme('colors.red.100'),
            borderColor: theme('colors.red.300'),
          },
          '&:disabled': {
            cursor: 'not-allowed',
            backgroundColor: theme('colors.gray.50'),
          },
        },

        '.btn': {
          display: 'inline-flex',
          height: theme('spacing.10'),
          alignItems: 'center',
          gap: '0.5rem',
          outline: 'none',
          borderWidth: '1px',
          borderRadius: '.375rem',
          fontWeight: '500',
          padding: '0.625rem 1rem',
          whiteSpace: 'nowrap',
          userSelect: 'none',
        },

        '.btn-xxs, .btn-xs': {
          fontWeight: '500',
          gap: '0.25rem',
        },

        '.btn-xxs, .input-xxs': {
          ...applyFont('xs'),
          height: theme('spacing.6'),
          padding: '0.25rem 0.5rem',
        },

        '.btn-xs, .input-xs': {
          ...applyFont('sm'),
          height: theme('spacing.8'),
          padding: '0.25rem 0.625rem',
        },

        '.btn-sm, .input-sm': {
          ...applyFont('sm'),
          height: theme('spacing.9'),
          padding: '0.5rem 0.875rem',
        },

        '.btn-lg, .input-lg': {
          ...applyFont('base'),
          height: theme('spacing.11'),
          padding: '0.625rem 1.125rem',
        },

        '.btn-xl, .input-xl': {
          ...applyFont('base'),
          height: theme('spacing.12'),
          padding: '0.75rem 1.25rem',
        },

        '.form-control': {
          position: 'relative',
          display: 'flex',
          width: '100%',
          flexDirection: 'column',
          gap: '0.375rem',
        },
        '.tab-list': {
          borderBottomWidth: '1px',
        },
        '.tab-list-wrapper': {
          marginBottom: '-1px',
          gap: theme('spacing.5'),
          display: 'Flex',
          overflow: 'auto',
        },

        '.tab-trigger': {
          borderBottomWidth: '2px',
          borderColor: 'transparent',
          paddingLeft: theme('spacing[0.5]'),
          paddingRight: theme('spacing[0.5]'),
          paddingBottom: theme('spacing.3'),
          ...applyFont('sm'),
          fontWeight: '600',
          color: theme('colors.gray.500'),
        },
      });

      matchComponents(
        {
          'btn-outlined': (color) => ({
            borderColor: theme(`colors.${color}.300`),
            backgroundColor: '#FFFFFF',
            color: theme(`colors.${color}.600`),
            '&:disabled': {
              borderColor: theme(`colors.${color}.200`),
              color: theme(`colors.${color}.300`),
            },
            '&:hover:not(:disabled)': {
              backgroundColor: theme(`colors.${color}.50`),
              color: theme(`colors.${color}.700`),
            },
            '&:focus': {
              '--tw-ring-color': theme(`colors.${color}.100`),
            },
          }),

          'btn-fill': (color) => ({
            borderColor: theme(`colors.${color}.600`),
            backgroundColor: theme(`colors.${color}.600`),
            color: '#FFFFFF',
            '&:disabled': {
              borderColor: theme(`colors.${color}.200`),
              backgroundColor: theme(`colors.${color}.200`),
            },
            '&:hover:not(:disabled)': {
              borderColor: theme(`colors.${color}.700`),
              backgroundColor: theme(`colors.${color}.700`),
            },
            '&:focus': {
              '--tw-ring-color': theme(`colors.${color}.100`),
            },
          }),

          'btn-light': (color) => ({
            borderColor: theme(`colors.${color}.100`),
            backgroundColor: theme(`colors.${color}.100`),
            color: theme(`colors.${color}.700`),
            '&:disabled': {
              color: theme(`colors.${color}.300`),
            },
            '&:hover:not(:disabled)': {
              borderColor: theme(`colors.${color}.200`),
              backgroundColor: theme(`colors.${color}.200`),
              color: theme(`colors.${color}.700`),
            },
            '&:focus': {
              '--tw-ring-color': theme(`colors.${color}.200`),
              backgroundColor: `${theme(`colors.${color}.100`)}!important`,
            },
          }),

          'btn-ghost': (color) => ({
            borderColor: 'transparent',
            backgroundColor: 'transparent',
            color: theme(`colors.${color}.600`),
            '&:disabled': {
              color: theme(`colors.${color}.300`),
            },
            '&:hover:not(:disabled)': {
              backgroundColor: theme(`colors.${color}.50`),
              color: theme(`colors.${color}.700`),
            },
            '&:focus': {
              '--tw-ring-color': theme(`colors.${color}.100`),
            },
          }),

          'btn-link': (color) => ({
            borderColor: 'transparent',
            backgroundColor: 'transparent',
            color: theme(`colors.${color}.600`),
            '&:disabled': {
              color: theme(`colors.${color}.300`),
            },
            '&:hover:not(:disabled)': {
              color: theme(`colors.${color}.800`),
            },
            '&:focus': {
              '--tw-ring-color': theme(`colors.${color}.100`),
            },
          }),
        },

        {
          values: {
            primary: 'primary',
            gray: 'gray',
            danger: 'red',
          },
        }
      );
    }),
  ],
};
