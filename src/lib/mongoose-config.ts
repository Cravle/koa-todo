import * as mongoose from 'mongoose'
import config from './config'

export default () => {
	mongoose
		.connect(config.mongoUri, {
			useNewUrlParser: true,
			useFindAndModify: false,
			useUnifiedTopology: true,
		})
		.then(() => console.log('MongoDB has been connected'))
		.catch(e => console.log(e))
}
