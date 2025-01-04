import { Component, Input } from "@angular/core";
import { CommentComponent } from "../comment/comment.component";
import {CommentWithRelations} from "../../../../shared/types/extended-models";
import {CommonModule} from "@angular/common";

@Component({
  selector: 'comment-list',
  standalone: true,
  imports: [ CommonModule, CommentComponent ],
  templateUrl: './comment-list.component.html',
  styleUrls: ['./comment-list.component.css'],
})

export class CommentListComponent {
  @Input() comments!: CommentWithRelations[] | undefined;
}


