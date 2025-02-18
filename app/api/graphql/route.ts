import { ApolloServer } from '@apollo/server';
import { startServerAndCreateNextHandler } from '@as-integrations/next';
import axios from 'axios';
import { gql } from 'graphql-tag';

// Define GraphQL Schema
const typeDefs = gql`
 type Query {
    _empty: String 
  }
  type Mutation {
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
interface PostcodeResult {
  localities: string[];
}
interface SearchPostcodeArgs {
  q: string;
  state: string;
}

const resolvers = {
  Mutation: {
    searchPostcode: async (_parent: unknown, { q, state }: SearchPostcodeArgs): Promise<PostcodeResult> => {
      try {
        const url = `${process.env.NEXT_PUBLIC_BASE_URL}?q=${q}${state ? `&state=${state}` : ''}`;
        console.log("Fetching URL:", url);

        const response = await axios.get(url, {
          headers: {
            Authorization: `Bearer ${process.env.NEXT_PUBLIC_AUTH_TOKEN}`,
            'Content-Type': 'application/json',
          },
        });

        if (response.data.localities && response.data.localities.locality) {
          const localityData = response.data.localities.locality;
          const localities: any[] = Array.isArray(localityData) ? localityData : [localityData];

          return { localities };
        } else {
          throw new Error("No localities found in the response.");
        }
      } catch (error: any) {
        throw new Error("Failed to fetch data. Try again with same input.");
      }
    },
  },
};

const apolloServer = new ApolloServer({ typeDefs, resolvers });

const handler = startServerAndCreateNextHandler(apolloServer);

export async function GET(req: Request): Promise<Response> {
  return handler(req);
}

export async function POST(req: Request): Promise<Response> {
  return handler(req);
}

export const config = {
  api: {
    bodyParser: false,
  },
};
