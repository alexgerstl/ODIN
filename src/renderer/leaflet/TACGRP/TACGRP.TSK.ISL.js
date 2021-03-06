import L from 'leaflet'
import * as R from 'ramda'
import { arc } from '../features/geo-helper'
import { shape } from '../features/react-shape'
import '../features/Arc'

const ISL = L.TACGRP.Arc.extend({

  _shape (group, options) {
    return shape(group, options, {
      points: ({ C, radius, radians }) => {
        const steps = 64
        const delta = radians.delta / steps
        const xs = R.range(0, steps + 1).map(x => radians.start + x * delta)

        const outer = arc(C, radius)(xs)
        const inner = arc(C, radius * 0.8)(xs)

        const teeth = []
        for (let i = 1; i < outer.length - 1; i++) {
          if (i % 5 === 0) {
            teeth.push([outer[i - 1], inner[i], outer[i + 1]])
          }
        }

        return [
          outer, ...teeth,
          this._arrow(outer[outer.length - 1], radians.end, radius / 5)
        ]
      }
    })
  }
})


L.Feature['G*T*E-----'] = (feature, options) => {
  options.labels = () => {
    const alpha = radians => radians.start + radians.delta / 2
    return [{
      placement: ({ C, radius, radians }) => arc(C, radius)([alpha(radians)])[0],
      lines: ['I'],
      'font-size': 18,
      angle: ({ radians }) => alpha(radians) / Math.PI * 180
    }]
  }

  return new ISL(feature, options)
}
