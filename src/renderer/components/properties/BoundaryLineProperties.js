import React from 'react'
import {
  Paper, TextField, FormControlLabel, Checkbox,
  Select, MenuItem, FormLabel, RadioGroup, Radio } from '@material-ui/core'
import { withStyles } from '@material-ui/core/styles'
import PropTypes from 'prop-types'
import { SelectEchelon } from './SelectEchelon'
import FeatureProperties from './FeatureProperties'

class BoundaryLineProperties extends FeatureProperties {

  extractState (feature) {
    const { title, properties } = feature
    const { sidc } = properties

    return {
      name: title || '',
      uniqueDesignationRight: properties.t || '',
      uniqueDesignationLeft: properties.t1 || '',
      echelon: sidc[11],
      status: sidc[3],
      hostile: properties.n || '',
      hostility: sidc[1]
    }
  }

  feature () {
    const sidc =
      this.props.feature.properties.sidc.substring(0, 1) +
      this.state.hostility +
      this.props.feature.properties.sidc.substring(2, 3) +
      this.state.status +
      this.props.feature.properties.sidc.substring(4, 11) +
      this.state.echelon +
      this.props.feature.properties.sidc.substring(12)

    const properties = {
      ...this.props.feature.properties,
      sidc,
      n: this.state.hostile,
      t: this.state.uniqueDesignationRight,
      t1: this.state.uniqueDesignationLeft
    }

    return {
      title: this.state.name,
      properties
    }
  }

  updateHostile (value) {
    const hostility = value === 'ENY' ? 'H' : this.state.hostility
    this.updateFields({
      hostile: value,
      hostility
    })
  }

  updateHostility (value) {
    const hostile = value !== 'H' ? '' : this.state.hostile
    this.updateFields({
      hostility: value,
      hostile
    })
  }

  render () {
    const hostile = event => event.target.checked ? 'ENY' : ''
    const { status } = this.state

    return (
      <Paper
        className={ this.props.classes.paper }
        elevation={ 4 }
      >
        <TextField
          className={ this.props.classes.name }
          label={'Name'}
          value={ this.state.name }
          onChange={ event => this.updateField('name', event.target.value) }
        />

        <TextField
          className={ this.props.classes.uniqueDesignation }
          label={'Unique Designation (R)'}
          value={ this.state.uniqueDesignationRight }
          onChange={ event => this.updateField('uniqueDesignationRight', event.target.value) }
        />

        <TextField
          className={ this.props.classes.uniqueDesignation }
          label={'Unique Designation (L)'}
          value={ this.state.uniqueDesignationLeft }
          onChange={ event => this.updateField('uniqueDesignationLeft', event.target.value) }
        />

        <Select
          className={ this.props.classes.hostility }
          label={'Hostility'}
          value={ this.state.hostility }
          onChange={ event => this.updateHostility(event.target.value) }
        >
          <MenuItem value={'*'}>N/A</MenuItem>
          <MenuItem value={'F'}>Friend</MenuItem>
          <MenuItem value={'H'}>Hostile</MenuItem>
          <MenuItem value={'N'}>Neutral</MenuItem>
          <MenuItem value={'U'}>Unknown</MenuItem>
        </Select>

        <SelectEchelon
          className={ this.props.classes.echelon }
          label={'Echelon'}
          value={ this.state.echelon }
          onChange={ event => this.updateField('echelon', event.target.value) }
        />

        <FormLabel component="legend" className={ this.props.classes.statusLabel }>Status</FormLabel>
        <RadioGroup
          value={ this.state.status }
          onChange={ event => this.updateField('status', event.target.value) }
        >
          <FormControlLabel
            className={ this.props.classes.present }
            value="P"
            control={<Radio checked={ status !== 'A' } />}
            label="Present"
            checked={ status !== 'A' }
          />

          <FormControlLabel
            className={ this.props.classes.anticipated }
            value="A"
            control={<Radio checked={ status === 'A' } />}
            label="Anticipated/Planned"
            checked={ status === 'A' }
          />
        </RadioGroup>

        <FormControlLabel
          className={ this.props.classes.hostile }
          control={ <Checkbox color="secondary" checked={ this.state.hostile === 'ENY' } /> }
          label="Hostile (Enemy)"
          labelPlacement="end"
          onChange={ event => this.updateHostile(hostile(event)) }
        />
      </Paper>
    )
  }
}

const styles = theme => ({
  paper: {
    padding: theme.spacing(4),
    height: 'auto',
    pointerEvents: 'auto',
    gridArea: 'R',

    display: 'grid',
    gridGap: '0.5em',
    gridTemplateColumns: 'auto auto',
    gridAutoRows: 'min-content'
  },
  name: { gridColumn: '1 / span 2' },
  uniqueDesignation: { gridColumn: '1 / span 2' },
  statusLabel: { gridColumn: '1 / span 2' },
  present: { gridColumn: 1 },
  anticipated: { gridColumn: 1 },
  hostile: { gridColumn: '1 / span 2' }
})

BoundaryLineProperties.propTypes = {
  classes: PropTypes.any.isRequired
}

export default withStyles(styles)(BoundaryLineProperties)
