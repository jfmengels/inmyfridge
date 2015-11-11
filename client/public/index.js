import { Observable } from 'rx'
import { run } from '@cycle/core'
import { h, makeDOMDriver } from '@cycle/dom'

const dynamicDIV = (sources) => {
  const model = (props$) => props$
    .map(({value}) => ({ value }))

  const view = (state$) => state$.map(({value}) => h('div', {
    style: {
      alignItems: 'center',
      backgroundColor: '#454545',
      boxSizing: 'border-box',
      color: '#fcfcfc',
      display: 'inline-flex',
      fontFamily: 'sans-serif',
      fontWeight: '700',
      fontSize: '8px',
      height: '32px',
      justifyContent: 'center',
      margin: '8px',
      width: '32px'
    }
  }, `${value}`))

  return {
    DOM: view(model(sources.props$))
  }
}

const dynamicDIVSlider = (sources) => {
  const intent = (DOM) => ({
    inputRangeValue$: DOM
      .select('.InputRange')
      .events('input')
      .map(ev => ev.target.value),
    inputTextValue$: DOM
      .select('.TextValue')
      .events('input')
      .map(ev => ev.target.value)
  })

  const model = (actions) => {
    return Observable.combineLatest(
      actions.inputRangeValue$
        .startWith(0),
      actions.inputTextValue$
        .startWith(''),
      (value, text) => ({ value, text })
    )
  }

  const view = (DOM, state$) => {
    const dynamicDIV$s$ = state$
      .map((state) => Array.apply(null, Array(parseInt(state.value)))
        .map((elt, index) => dynamicDIV({
          DOM,
          props$: Observable.just({
            value: `${state.text} ${index + 1}`,
          })
        }).DOM)
      )

    return state$
      .combineLatest(
        dynamicDIV$s$,
        (state, dynamicDIV$s) => h('div', [
          h('input.InputRange', {
            type: 'range',
            value: state.value
          }),
          `${state.value}`,
          h('input.TextValue', {
            type: 'text'
          }),
          h('div', dynamicDIV$s)
        ])
      )
  }

  const { DOM } = sources

  return {
    DOM: view(DOM, model(intent(DOM)))
  }
}

const main = (sources) => {
  const slider = dynamicDIVSlider(sources)

  const sinks = {
    DOM: slider.DOM
  }

  return sinks
}

run(main, {
  DOM: makeDOMDriver('#app')
})
