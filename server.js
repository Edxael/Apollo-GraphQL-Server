// ===[ IMPORTING D. ]==================================================
const bodyParser = require('body-parser')
const cors = require('cors')
const express = require('express')
const app = express()
const { graphqlExpress, graphiqlExpress } = require('apollo-server-express')
const { makeExecutableSchema } = require('graphql-tools')




// ===[ MIDDLEWARE ]=====================================================
app.use( cors(), bodyParser.json() )




// ===[ Queris & Muttations ]============================================
const typeDefs = `
type Query {
    greeting: String
}
`





// ===[ ROUTES ]=========================================================
const resolvers = {
    Query: {
        greeting: () => { return "Hello from my Resolver" }
    }
}

const schema = makeExecutableSchema({ typeDefs: typeDefs, resolvers: resolvers })



app.use('/graphiql', graphiqlExpress({ endpointURL: '/graphiql' }))


app.use( '/graphql', graphqlExpress({ schema }) )




// ===[ SERVER ]=========================================================
app.listen( process.env.PORT || 9000, (err) => {
    if(err){ throw err }
    console.log(" \n ===[ Server Running on Port '9000' ]============== ")
})