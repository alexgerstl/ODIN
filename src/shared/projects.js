import path from 'path'
import fs from 'fs'
import uuid from 'uuid-random'
import { app } from 'electron'

const ODIN_HOME = path.join(app.getPath('home'), 'ODIN')
const ODIN_PROJECTS = path.join(ODIN_HOME, 'projects')
const ODIN_LAYERS = 'layers'

const exists = projectPath => fs.existsSync(projectPath)

const createProject = async (name) => {
  const projectPath = path.join(ODIN_PROJECTS, name)
  if (exists(projectPath)) return
  /* create subfolder structure, too */
  await fs.promises.mkdir(path.join(projectPath, ODIN_LAYERS), { recursive: true })
  return projectPath
}

const enumerateProjects = async () => {
  const enumerateDirectoryEntries = fs.promises.readdir(ODIN_PROJECTS, { withFileTypes: true })
  const foldersOnly = dirEntries => dirEntries.filter(dirEntry => dirEntry.isDirectory())
  const extractNames = dirEntries => dirEntries.map(entry => entry.name)
  return enumerateDirectoryEntries
    .then(foldersOnly)
    .then(extractNames)
}

export default {
  exists,
  createProject,
  brandNew: () => uuid(),
  enumerateProjects
}