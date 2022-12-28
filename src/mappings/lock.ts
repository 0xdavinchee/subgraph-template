import { NewOwner, NewUnlockTime, Withdrawal } from "../../generated/Lock/Lock";

import { NewOwnerEvent, NewUnlockTimeEvent, WithdrawalEvent } from "../../generated/schema";
import { createEventID, initializeEventEntity } from "../mappingHelpers";

export function handleNewOwner(event: NewOwner): void {
    const ev = new NewOwnerEvent(createEventID("NewOwner", event));
    initializeEventEntity(ev, event);

    ev.newOwner = event.params.newOwner;
    ev.oldOwner = event.params.oldOwner;
    
    ev.save();
}

export function handleNewUnlockTime(event: NewUnlockTime): void {
    const ev = new NewUnlockTimeEvent(createEventID("NewUnlockTime", event));
    initializeEventEntity(ev, event);

    ev.owner = event.params.owner;
    ev.newUnlockTime = event.params.unlockTime;
    
    ev.save();
}

export function handleWithdrawal(event: Withdrawal): void {
    const ev = new WithdrawalEvent(createEventID("Withdrawal", event));
    initializeEventEntity(ev, event);

    ev.amount = event.params.amount;
    
    ev.save();
}