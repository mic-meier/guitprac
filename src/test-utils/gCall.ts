/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { graphql, ExecutionResult, GraphQLSchema } from 'graphql';
import Maybe from 'graphql/tsutils/Maybe';
import 'reflect-metadata';
import { createSchema } from '../utils/createSchema';

interface Options {
  source: string;
  variableValues?: Maybe<{
    [key: string]: any;
  }>;
}

let schema: GraphQLSchema;

export const gCall = async ({
  source,
  variableValues,
}: Options): Promise<ExecutionResult> => {
  if (!schema) {
    schema = await createSchema();
  }
  return graphql({
    schema,
    source,
    variableValues,
  });
};
