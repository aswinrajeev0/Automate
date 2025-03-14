import { z } from "zod";

import { strongEmailRegex } from "../../../shared/validations/email.validation";

export const loginSchema = z.object({
    email: strongEmailRegex,
})