import { addAlias } from 'module-alias'
import { resolve } from 'path'
import { config } from './env'

addAlias('@', resolve(!config.isProd ? 'src' : 'dist'))
