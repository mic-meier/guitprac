import { buildSchema, Resolver, Query } from 'type-graphql';

@Resolver()
class HelloResolver {
  @Query(() => String)
  hello(): string {
    return 'Hello World';
  }
}

const schema = buildSchema({
  resolvers: [HelloResolver],
});

export default schema;
