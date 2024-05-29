
import {  debounce } from 'lvl-js-utils'
import * as React from 'react'

export function useDebounce (fn, delay) {
  
  return React.useMemo(() => debounce(fn, delay), [fn, delay])
}