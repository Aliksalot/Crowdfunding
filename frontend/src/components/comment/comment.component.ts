import { Component, Input } from "@angular/core";
import { CommonModule, DatePipe } from "@angular/common";
import { CommentInputComponent } from "../comment-input/comment-input.component";
import {CommentWithRelations} from "../../../../shared/types/extended-models";

@Component({
  selector: 'comment',
  standalone: true,
  imports: [DatePipe, CommonModule, CommentInputComponent],
  templateUrl: './comment.component.html',
  styleUrls: ['./comment.component.css'],
})

export class CommentComponent {
  @Input() comment!: CommentWithRelations;
  showCommentInput: boolean = false;
}


