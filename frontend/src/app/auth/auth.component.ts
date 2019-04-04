import {Component, OnInit, ViewEncapsulation} from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class AuthComponent implements OnInit {

  canCancel = false;

  constructor(private router: Router, private route: ActivatedRoute) {
    this.route.queryParams.subscribe(params => {
      this.canCancel = params['canCancel'];
    });
  }

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

  cancel() {
    this.router.navigate(['/main']);
  }

}

interface Provider {
  name: string;
  img: string;
}
