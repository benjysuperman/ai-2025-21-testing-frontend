import { bootstrapApplication } from '@angular/platform-browser';
import { appConfig } from './app/app.config';
import { AppComponent } from './app/app.component';
let env = "server"
export const BACKEND_URL = ()  => env === "local" ?  "http://localhost:5000/api/" : "https://ai-2025-21-testing-backend.vercel.app/api/"

bootstrapApplication(AppComponent, appConfig)
  .catch((err) => console.error(err));
