import { connect } from 'mongoose'
import { mongodb } from './config'
connect(mongodb)

import './schemas/user'
