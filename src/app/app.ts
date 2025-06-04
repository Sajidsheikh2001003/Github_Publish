import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Home } from "./home/home";

@Component({
  selector: 'app-root',
  standalone :true,
  imports: [ Home],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  protected title = 'my-portfolio';
}
