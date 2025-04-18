import { randomUUID } from "crypto";

export const generateUniqueId = (prefix: string = "user") => {
	return `amt-${prefix}-${randomUUID().slice(10)}`;
};