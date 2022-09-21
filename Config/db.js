const mongoose = require('mongoose')



const dbCOnnection = ()=>{
    mongoose.connect(
        'mongodb+srv://ghayas:ghayas@cluster0.knli1.mongodb.net/Linkable?retryWrites=true&w=majority',
        {
            useNewUrlParser: true,
            useUnifiedTopology: true
        }
    ).then(() => { console.warn('connected') }).
    catch(()=>{console.warn('not connected')});
}

module.exports = dbCOnnection