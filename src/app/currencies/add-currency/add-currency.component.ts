import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NotificationService } from 'src/app/shared/services/notification.service';
import { CurrenciesService } from '../all-currencies/currencies.service';

@Component({
  selector: 'app-add-currency',
  templateUrl: './add-currency.component.html',
  styleUrls: ['./add-currency.component.scss']
})
export class AddCurrencyComponent {

  currencyForm: FormGroup;

  constructor(private router: Router,
    private fb: FormBuilder,
    private currencyService: CurrenciesService,
    private notificationService: NotificationService) {
      this.currencyForm = this.fb.group({
        id: 0,
        currencyName: ['',
        [
          Validators.required,
          Validators.pattern('^[a-zA-Z]{2,}$')
        ]]
      });
    }

  onSubmit(){
    this.currencyService.addCurrency(this.currencyForm.value)
      .subscribe(() => {
        this.notificationService.showNotification(
          'snackbar-success',
          'Record Added Successfully!',
          'bottom',
          'center'
        );
        this.router.navigate(['/currencies/all-currencies']);
      })
  }

  resetForm(){
    this.currencyForm.reset();
  }

  cancel(){
    this.router.navigate(['/currencies/all-currencies']);
  }

}
