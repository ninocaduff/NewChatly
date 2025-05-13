import { Component, ViewEncapsulation } from "@angular/core";

@Component({
  selector: "app-footer",
  standalone: true,
  templateUrl: "./footer.component.html",
  styleUrls: ["./footer.component.css"],
  encapsulation: ViewEncapsulation.None // <- hinzugefügt
})
export class FooterComponent {}
