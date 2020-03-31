import Management from '../../../src/renderer/components/Management'
import React from 'react'
import { expect } from 'chai'
import sinon from 'sinon'

/* eslint-disable no-undef */
describe('Management', () => {
  const clickCallback = sinon.spy()
<<<<<<< HEAD
  const wrapper = mount(<Management currentProjectPath={''} onCloseClicked={clickCallback} />)
=======
  const wrapper = shallow(<Management currentProjectPath={''} onCloseClicked={clickCallback} />)
  it('verify import button', () => {
    assert(wrapper.containsMatchingElement(<Button id="importProject" variant="outlined" color="primary"
      style={{ float: 'right', marginRight: '1em', marginLeft: '2px' }}
      startIcon={<ImportProjectIcon />} >
      Import
    </Button>), true, 'Verify import button')
  })
>>>>>>> 0.6.0/ol

  it('verify sidebar section', () => {
    const section = wrapper.find('.makeStyles-sidebar-2')
    expect(section, 'Section exists').to.have.length(1)
    const backToMapButton = section.childAt(0)
    expect(backToMapButton.prop('id'), 'Back to map button exists').to.equal('backToMap')
    backToMapButton.simulate('click')
    sinon.assert.called(clickCallback)
  })

  it('verify management section', () => {
    const section = wrapper.find('.makeStyles-management-1')
    expect(section, 'Section exists').to.have.length(1)
    const projectsSection = section.childAt(0).find('.makeStyles-projects-3')
    expect(projectsSection, 'Sub Section exists').to.have.length(1)
    const detailsSection = section.childAt(1).find('.makeStyles-details-4')
    expect(detailsSection, 'Sub Section exists').to.have.length(1)
  })

  it('verify projects section', () => {
    const section = wrapper.find('.makeStyles-projects-3')
    expect(section, 'Section exists').to.have.length(1)
    const importProjectButton = section.childAt(0).childAt(0)
    expect(importProjectButton.prop('id'), 'Import project button exists').to.equal('importProject')
    const newProjectButton = section.childAt(0).childAt(1)
    expect(newProjectButton.prop('id'), 'New project button exists').to.equal('newProject')
    expect(section.childAt(1).prop('id'), 'Project list exists').to.equal('projectList')
  })

  it('verify details section', () => {
    const section = wrapper.find('.makeStyles-details-4')
    expect(section).to.have.length(1)
  })

})
