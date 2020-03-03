import mongoose from 'mongoose'
import config from '../config/env.json'


export const ConnectionBD = mongoose.connect(config.MongoDB.UrlConnection, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
    useFindAndModify: false
})
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    .then(db => console.log('Database is connected'))
    .catch(err => console.log(err))