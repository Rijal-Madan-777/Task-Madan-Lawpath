import { ApolloServer } from '@apollo/server';
import { startServerAndCreateNextHandler } from '@as-integrations/next';
import axios from 'axios';
import { gql } from 'graphql-tag';

// Define GraphQL Schema
const typeDefs = gql`
  type Query {
    searchPostcode(q: String!, state: String!): PostcodeResult
  }

  type PostcodeResult {
    localities: [Locality]
  }

  type Locality {
    category: String
    id: Int
    latitude: Float
    location: String
    longitude: Float
    postcode: Int
    state: String
  }
`;


// Define the expected shape of the resolver's return type
interface PostcodeResult {
  localities: string[];
}

// Define the shape of resolver arguments
interface SearchPostcodeArgs {
  q: string;
  state: string;
}

// Define Resolvers (Mocked for Testing)
const resolvers = {
  Query: {
   searchPostcode: async (_parent: unknown, { q, state }: SearchPostcodeArgs): Promise<PostcodeResult> => {
      try {
        // Make request to the Australia Post API
        const response = await axios.get(
          `${process.env.NEXT_PUBLIC_BASE_URL}?q=${q}&state=${state}`,
          {
            headers: {
              Authorization: `Bearer ${process.env.NEXT_PUBLIC_AUTH_TOKEN}`,
              'Content-Type': 'application/json',
            },
          }
        );
        console.log("🚀 ~ searchPostcode: ~ response:", response)

        // Check if we have a valid response and extract localities
        if (response.data.localities && response.data.localities.locality) {
          const localities: any[] = response.data.localities.locality.map((loc: any) => ({
            category: loc.category,
            id: loc.id,
            latitude: loc.latitude,
            location: loc.location,
            longitude: loc.longitude,
            postcode: loc.postcode,
            state: loc.state,
          }));

          return {
            localities: localities,
          };
        } else {
          throw new Error('No localities found in the response.');
        }

      } catch (error) {
        console.error('Error fetching data from Australia Post API:', error);
        throw new Error('Failed to fetch postcode data from Australia Post API');
      }
    },
  },
};

// Initialize Apollo Server
const apolloServer = new ApolloServer({ typeDefs, resolvers });

// Create the handler for the Next.js API route
const handler = startServerAndCreateNextHandler(apolloServer);

// Export GET and POST as functions (with explicit types)
export async function GET(req: Request): Promise<Response> {
  return handler(req);
}

export async function POST(req: Request): Promise<Response> {
  return handler(req);
}

// Disable body parser for Apollo Server to handle raw GraphQL requests
export const config = {
  api: {
    bodyParser: false,
  },
};
