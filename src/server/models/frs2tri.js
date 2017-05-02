import mongoose, {Schema} from 'mongoose'

const frs2triSchema = new Schema({
  "FRS_ID": Schema.Types.Mixed,
  "TRI_FACILITY_ID": Schema.Types.Mixed
},{collection:"frs2tri"})

module.exports = mongoose.model(
  'frs2tri',
   frs2triSchema
 );
