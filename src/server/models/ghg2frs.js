import mongoose, {Schema} from 'mongoose'

const ghg2frsSchema = new Schema({
  "GHG_ID": Schema.Types.Mixed,
  "FRS_ID": Schema.Types.Mixed
},{"collection":"ghg2frs"})

module.exports = mongoose.model(
  'ghg2frs',
   ghg2frsSchema
 );
