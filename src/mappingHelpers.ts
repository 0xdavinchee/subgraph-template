import { Bytes, Entity, ethereum, log, Value } from "@graphprotocol/graph-ts";

export function createEventID(
    eventName: string,
    event: ethereum.Event
): string {
    return (
        eventName +
        "-" +
        event.transaction.hash.toHexString() +
        "-" +
        event.logIndex.toString()
    );
}

/**
 * Initialize event and its base properties on Event interface.
 * @param event the ethereum.Event object
 * @param addresses the addresses array
 * @returns Entity to be casted as original Event type
 */
export function initializeEventEntity(
    entity: Entity,
    event: ethereum.Event
  ): Entity {
    const idValue = entity.get("id");
    if (!idValue) return entity;

    const stringId = idValue.toString();
    const name = stringId.split("-")[0];

    entity.set("timestamp", Value.fromBigInt(event.block.timestamp));
    entity.set("blockNumber", Value.fromBigInt(event.block.number));
    entity.set("transactionHash", Value.fromBytes(event.transaction.hash));
    entity.set("gasPrice", Value.fromBigInt(event.transaction.gasPrice));
    entity.set("logIndex", Value.fromBigInt(event.logIndex));
    entity.set("name", Value.fromString(name));
    entity.set("gasLimit", Value.fromBigInt(event.transaction.gasLimit));
    const receipt = event.receipt;
    if (receipt) {
        entity.set("gasUsed", Value.fromBigInt(receipt.gasUsed));
    } else {
        // @note `gasUsed` is a non-nullable property in our `schema.graphql` file, so when we attempt to save 
        // the entity with a null field, it will halt the subgraph indexing.
        // Nonetheless, we explicitly throw if receipt is null, as this can arise due forgetting to include
        // `receipt: true` under `eventHandlers` in our manifest (`subgraph.template.yaml`) file.
        log.critical("receipt MUST NOT be null", []);
    }

    return entity;
  }