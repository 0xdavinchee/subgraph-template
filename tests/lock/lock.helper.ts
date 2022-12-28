import { BigInt } from "@graphprotocol/graph-ts";
import { newMockEvent } from "matchstick-as";
import { NewOwner, NewUnlockTime, Withdrawal } from "../../generated/Lock/Lock";
import { getAddressEventParam, getBigIntEventParam, getBytesEventParam } from "../converters";

// Mock Event Creators
export function createNewOwnerEvent(
    oldOwner: string,
    newOwner: string
): NewOwner {
    const newOwnerEvent = changetype<NewOwner>(newMockEvent());
    newOwnerEvent.parameters = new Array();
    newOwnerEvent.parameters.push(getAddressEventParam("oldOwner", oldOwner));
    newOwnerEvent.parameters.push(getAddressEventParam("newOwner", newOwner));
    
    return newOwnerEvent;
}

export function createNewUnlockTimeEvent(
    owner: string,
    unlockTime: BigInt
): NewUnlockTime {
    const newUnlockTimeEvent = changetype<NewUnlockTime>(newMockEvent());
    newUnlockTimeEvent.parameters = new Array();
    newUnlockTimeEvent.parameters.push(getAddressEventParam("owner", owner));
    newUnlockTimeEvent.parameters.push(getBigIntEventParam("newUnlockTime", unlockTime));

    return newUnlockTimeEvent;
}

export function createNewWithdrawalEvent(
    amount: BigInt
): Withdrawal {
    const withdrawalEvent = changetype<Withdrawal>(newMockEvent());
    withdrawalEvent.parameters = new Array();
    withdrawalEvent.parameters.push(getBigIntEventParam("amount", amount));

    return withdrawalEvent;
}
