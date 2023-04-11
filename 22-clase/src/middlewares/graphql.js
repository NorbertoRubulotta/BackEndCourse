import { buildSchema } from 'graphql'
import { graphqlHTTP } from 'express-graphql'

import {
  controllerGraphqlGetProducts,
  controllerGraphqlPostProducts,
  controllerGraphqlGetProductsById,
  controllerGraphqlPutProductbyId,
  controllerGraphqlDeleteProductByID,
} from '../controllers/graphql.productsController.js'

const schema = buildSchema(`
  
  input ProductInput {
        name: String
        description: String
        price: Float
        image: String
  }

  type Product {
    id: ID!
    name: String!
    description: String!
    price: Float!
    image: String!
  }

  type Deleted{
    acknowledge: Boolean
    deletedCount: Int
  }
  type Query {
    controllerGraphqlGetProductsById(id: ID!): Product
    controllerGraphqlGetProducts(campo: String, valor: String): [Product]
  }
  
  type Mutation {
    controllerGraphqlPostProducts(datos: ProductInput!): Product
    controllerGraphqlPutProductbyId(id: ID!, datos: ProductInput!): Product
    controllerGraphqlDeleteProductByID(id: ID!): Deleted
  }
`)

export const graphqlMiddleware = graphqlHTTP({
  schema,
  rootValue: {
    controllerGraphqlGetProducts,
    controllerGraphqlPostProducts,
    controllerGraphqlGetProductsById,
    controllerGraphqlPutProductbyId,
    controllerGraphqlDeleteProductByID,
  },
  graphiql: true,
})