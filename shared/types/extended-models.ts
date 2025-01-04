import { Offer, Comment, Fund, User } from "@prisma/client";

export * from "@prisma/client";

export type OfferWithRelations = Offer & {
  comments: CommentWithRelations[],
  funds: Fund[]
}

export type CommentWithRelations = Comment & {
  replyTo: CommentWithRelations,
  replies: CommentWithRelations[],
  user: User
}
