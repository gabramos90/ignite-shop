import { globalCss } from ".";

export const globalStyles = globalCss({
  '*': {
    margin: 0,
    padding: 0,
    bp
  },

  body: {
    '-webkit-font-smoothing': 'antialised',
    backgroundColor: '$gray900',
    color: '$gray100'
  },

  'body, input, textarea, button': {
    fontFamily: 'Roboto',
    fontWeight: 400
  }
})
