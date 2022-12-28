import { assert, beforeEach, clearStore, describe, test } from "matchstick-as";
import { assertEventBaseProperties } from "../assertionHelpers";
import { createNewOwnerEvent, createNewUnlockTimeEvent, createNewWithdrawalEvent } from "./lock.helper";
import { handleNewOwner, handleNewUnlockTime, handleWithdrawal } from "../../src/mappings/lock";
import { BigInt } from "@graphprotocol/graph-ts";

describe("Lock Event Entity Unit Tests", () => {
    beforeEach(() => {
        clearStore();
    });

    test("handleNewOwner() - Should create a new NewOwnerEvent entity", () => {
        const oldOwner = "0x0000000000000000000000000000000000000001";
        const newOwner = "0x0000000000000000000000000000000000000002";
        const newOwnerEvent = createNewOwnerEvent(oldOwner, newOwner);

        handleNewOwner(newOwnerEvent);

        const id = assertEventBaseProperties(newOwnerEvent, "NewOwner");
        assert.fieldEquals("NewOwnerEvent", id, "oldOwner", oldOwner);
        assert.fieldEquals("NewOwnerEvent", id, "newOwner", newOwner);
    });

    test("handleNewUnlockTime() - Should create a new NewUnlockTimeEvent entity", () => {
        const owner = "0x0000000000000000000000000000000000000001";
        const unlockTime = BigInt.fromI32(69420);
        const newUnlockTimeEvent = createNewUnlockTimeEvent(owner, unlockTime);

        handleNewUnlockTime(newUnlockTimeEvent);

        const id = assertEventBaseProperties(newUnlockTimeEvent, "NewUnlockTime");
        assert.fieldEquals("NewUnlockTimeEvent", id, "owner", owner);
        assert.fieldEquals("NewUnlockTimeEvent", id, "newUnlockTime", unlockTime.toString());
    });

    test("handleWithdrawal() - Should create a new WithdrawalEvent entity", () => {
        const amount = BigInt.fromI32(69420);
        const newWithdrawalEvent = createNewWithdrawalEvent(amount);

        handleWithdrawal(newWithdrawalEvent);

        const id = assertEventBaseProperties(newWithdrawalEvent, "Withdrawal");
        assert.fieldEquals("WithdrawalEvent", id, "amount", amount.toString());

    });
});