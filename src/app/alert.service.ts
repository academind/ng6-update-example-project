import { Injectable } from "@angular/core";

@Injectable({providedIn: 'root'})
export class AlertService {
  showAlert() {
    alert('Hello!');
  }
}
