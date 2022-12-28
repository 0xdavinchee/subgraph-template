import { Address, BigInt, ethereum } from "@graphprotocol/graph-ts";
import { assert, log } from "matchstick-as/assembly/index";
import { createEventID } from "../src/mappingHelpers";

// General Assertion Helpers

/**
 * Asserts that the "base" properties on our Event entity are correct
 * @param event The event we are checking
 * @param eventName The name of the event
 * @returns The id of the event (based on our createEventID function)
 */
export function assertEventBaseProperties(
    event: ethereum.Event,
    eventName: string
): string {
    const entityType = eventName + "Event";
    const id = createEventID(eventName, event);

    assert.fieldEquals(entityType, id, "id", id);
    assert.fieldEquals(entityType, id, "blockNumber", event.block.number.toString());
    assert.fieldEquals(entityType, id, "logIndex", event.logIndex.toString());
    assert.fieldEquals(entityType, id, "timestamp", event.block.timestamp.toString());
    assert.fieldEquals(entityType, id, "name", eventName);
    assert.fieldEquals(entityType, id, "transactionHash", event.transaction.hash.toHex());
    assert.fieldEquals(entityType, id, "gasPrice", event.transaction.gasPrice.toString());
    const receipt = event.receipt;
    if (receipt) {
        assert.fieldEquals(entityType, id, "gasUsed", receipt.gasUsed.toString());
    }
    return id;
}
