const config = {
	port: process.env.PORT,
	mongoUri: `mongodb+srv://qwert:${process.env.PASSWORD}@cluster0.u5vpd.mongodb.net/${process.env.SERVER_NAME}?retryWrites=true&w=majority`,
}

export default config
