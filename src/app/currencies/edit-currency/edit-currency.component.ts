import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { NotificationService } from 'src/app/shared/services/notification.service';
import { Currency } from '../all-currencies/currencies.model';
import { CurrenciesService } from '../all-currencies/currencies.service';

@Component({
  selector: 'app-edit-currency',
  templateUrl: './edit-currency.component.html',
  styleUrls: ['./edit-currency.component.scss']
})
export class EditCurrencyComponent implements OnInit {

  currencyForm: FormGroup;
  currencyDetail: Currency;

  formData = {
    currencyName: ''
  }

  constructor(private router: Router,
    private currencyService: CurrenciesService,
    private fb: FormBuilder,
    private activatedRoute: ActivatedRoute,
    private notificationService: NotificationService) {
      this.currencyForm = this.createCurrencyForm();
    }

  createCurrencyForm() : FormGroup {
    return this.fb.group({
      currencyName: [this.formData.currencyName, [
        Validators.required,
        Validators.pattern('^[a-zA-Z]{2,}$')
      ]]
    })
  }

  ngOnInit() {
    let currencyId = this.activatedRoute.snapshot.params['id'];
    this.currencyService.getCurrency(currencyId)
      .subscribe(currency => {
        this.currencyDetail = currency,
        this.currencyForm.patchValue({
          currencyName: this.currencyDetail.currencyName
        });
      });
  }

  onSubmit(){
    this.currencyService.editCurrency(this.currencyDetail.id, this.currencyForm.value)
      .subscribe(() => {
        this.notificationService.showNotification(
          'snackbar-success',
          'Record Edited Successfully!',
          'bottom',
          'center'
          );
        this.router.navigate(['/currencies/all-currencies']);
      });
  }

  cancel(){
    this.router.navigate(['/currencies/all-currencies']);
  }

}
