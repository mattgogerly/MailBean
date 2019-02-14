import {Component, OnInit, ViewEncapsulation} from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class AuthComponent implements OnInit {

  constructor(private router: Router) { }

  providers: Provider[] = [
    {
      name: 'Gmail',
      img: 'google.png'
    }, {
      name: 'Outlook',
      img: 'outlook.png'
    },
    {
      name: 'Office 365',
      img: 'office365.png'
    },
    {
      name: 'iCloud',
      img: 'icloud.png'
    },
    {
      name: 'Yahoo',
      img: 'yahoo.png'
    }
  ];

  ngOnInit() {
  }

  beginAuth(provider: Provider) {
    if (provider.name === 'Gmail') {
      this.router.navigate(['/auth/google']);
    } else {
      this.router.navigate(['/auth/other']);
    }
  }

}

interface Provider {
  name: string;
  img: string;
}
