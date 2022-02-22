import { AccountStatus } from '@domain/account/v1/interfaces/account-status';
import crypto from 'crypto';

export const fakeAccountStatus = () => ['BLOCKED', 'UNLOCKED'][crypto.randomInt(1)] as AccountStatus;