import { Offer, Comment, Fund, User } from "@prisma/client";

export * from "@prisma/client";

export type FundWithRelations = Fund & {
  user: User
}

export type OfferWithRelations = Offer & {
  comments: CommentWithRelations[],
  funds: Fund[]
  daysSinceCreation?: number
}

export type CommentWithRelations = Comment & {
  replyTo: CommentWithRelations,
  replies: CommentWithRelations[],
  user: User
}
