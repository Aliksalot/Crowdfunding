import { Component, Input } from "@angular/core";
import { Comment } from "@prisma/client";
import { CommonModule, DatePipe } from "@angular/common";
import { CommentInputComponent } from "../comment-input/comment-input.component";
import { CommentListComponent } from "../comment-list/comment-list.component";
import {CommentWithRelations} from "../../../../shared/types/extended-models";

@Component({
  selector: 'comment',
  standalone: true,
  imports: [DatePipe, CommentListComponent, CommonModule, CommentInputComponent],
  templateUrl: './comment.component.html',
  styleUrls: ['./comment.component.css'],
})

export class CommentComponent {
  @Input() comment!: CommentWithRelations;
  showCommentInput: boolean = false;
}


