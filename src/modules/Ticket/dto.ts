import z from "zod";

export type CreateTicket = z.infer<typeof createTicketSchema>;
export type BuyTicket = z.infer<typeof buyTicketSchema>;
export type BuyRequest = z.infer<typeof buyRequestSchema>;

export const createTicketSchema = z.object({
  type: z.string(),
  price: z.number(),
  quantity: z.number(),
});

export const buyTicketSchema = z.object({
  type: z.string(),
  quantity: z.number(),
});

export const buyRequestSchema = z.object({
  buyer: z.string(),
  tickets: z.array(buyTicketSchema),
});
