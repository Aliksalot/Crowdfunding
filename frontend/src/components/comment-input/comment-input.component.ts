import { Component, Input } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FormsModule } from "@angular/forms";
import {HttpClient} from "@angular/common/http";

@Component({
  selector: 'comment-input',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './comment-input.component.html',
  styleUrls: ['./comment-input.component.css'],
})
export class CommentInputComponent{

  @Input() replyToId!: number | null;
  @Input() offerId!: number;
  @Input() placeholder: string = '';

  text: string = "";

  constructor(private http: HttpClient){ }

  submit(){
    this.http.put('/api/offer/comment', { text: this.text, offerId: this.offerId, replyTo: this.replyToId }).subscribe({
      next: (response) => {
        window.location.reload();
      },
      error: (err) => {
        console.log(err);
      }

    });
  }

}

