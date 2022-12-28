# Subgraph Starter Project
<!-- TODO -->
## Main files required:

### Manifest File: `subgraph.yaml`
A configuration file for how the subgraph should behave in general, specifying the specVersion, apiVersion. 

Specify the schema file written by the user and the different types of data sources the subgraph will consume (whether it is a fixed contract or a template, e.g. factory) and includes information about the address, start block, network, abi, location of the abi, entities created in the mapping, the handlers for the different events, given an event, the name of the function handler.

### Schema File: `schema.graphql`
A `.graphql` file which specifies the different types of entities or objects which you would like your subgraph to create. You will write mapping logic which takes events which get mapped into these objects.


### Mapping File(s): `src/mappings/*.ts`
The core logic
<!-- TODO -->
## General Best Practices
<!-- TODO -->
### Unit Tests
Simple tests to ensure that your mapping logic is working as expected. 

> NOTE: this doesn't catch silly mistakes such as having a mismatch in naming between your actual mapping function and the specified mapping function in your manifest file.

### Integration Tests
Slightly more involved tests which involve spinning up a local subgraph, executing transactions against a local blockchain and testing queries to ensure that events are mapped properly and querying the events work as expected.

### Multi-Network Deployment
<!-- TODO -->