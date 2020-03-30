import Management from '../../../src/renderer/components/Management'
import { Button } from '@material-ui/core'
import AddCircleOutlineIcon from '@material-ui/icons/AddCircleOutline'
import ImportProjectIcon from '@material-ui/icons/LibraryAdd'
import BackToMapIcon from '@material-ui/icons/ExitToApp'
import React from 'react'
import { expect } from 'chai'
import sinon from 'sinon'
import { shallow } from 'enzyme'

/* eslint-disable no-undef */
describe('Management', () => {
  const clickCallback = sinon.spy()
  const wrapper = shallow(<Management currentProjectPath={''} onCloseClicked={clickCallback} />)

  it('verify sidebar section', () => {
    const section = wrapper.find('.makeStyles-sidebar-2')
    expect(section, "Section exists").to.have.length(1)
    const backToMapButton = section.childAt(0).find("#backToMap")
    expect(backToMapButton, "Back to map button exists").to.have.length(1)
    backToMapButton.simulate('click')
    sinon.assert.called(clickCallback)
  })

  it('verify management section', () => {
    const section = wrapper.find('.makeStyles-management-1')
    expect(section, "Section exists").to.have.length(1)
    const projectsSection = section.childAt(0).find('.makeStyles-projects-3')
    expect(projectsSection, "Sub Section exists").to.have.length(1)
    const detailsSection = section.childAt(1).find('.makeStyles-details-4')
    expect(detailsSection, "Sub Section exists").to.have.length(1)
  })

  it('verify projects section', () => {
    const section = wrapper.find('.makeStyles-projects-3')
    expect(section, "Section exists").to.have.length(1)
    const importProjectButton = section.childAt(0).childAt(0)
    expect(section.childAt(0).childAt(0).prop('id'), "Import project button exists").to.equal('importProject')
    const newProjectButton = section.childAt(0).childAt(1)
    expect(section.childAt(0).childAt(1).prop('id'), "New project button exists").to.equal('newProject')
    expect(section.childAt(1).prop('id'), "Project list exists").to.equal('projectList')
  })

  it('verify details section', () => {
    const section = wrapper.find('.makeStyles-details-4')
    expect(section).to.have.length(1)
  })

})

