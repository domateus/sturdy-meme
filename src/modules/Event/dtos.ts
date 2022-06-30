import { createTicketSchema } from "@Ticket/dto";
import z from "zod";

const formCreateEvent = z.object({
  title: z.string(),
  description: z.string(),
  date: z.string(),
  location: z.string(),
  logo: z.string(),
  tickets: z.array(createTicketSchema),
  promoterId: z.string(),
});

export type FormCreateEvent = z.infer<typeof formCreateEvent>;

export interface FormUpdateEvent {
  readonly id: string;
  readonly title?: string;
  readonly description?: string;
  readonly date?: Date;
  readonly location?: string;
  readonly logo?: string;
}
