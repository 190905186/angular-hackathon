import { Component } from '@angular/core';
import { ForexService } from '../services/forex.service';

@Component({
  selector: 'app-currency-calculator',
  templateUrl: './currency-calculator.component.html',
  styleUrls: ['./currency-calculator.component.css']
})
export class CurrencyCalculatorComponent {
  constructor(private forexService: ForexService) { }

  baseCur: string = ''
  quoteCur: string = ''
  exchangeRate: number = 0
  option: boolean = false
  baseCurValue: number = 0
  quoteCurValue: number = 0

  getExchangeRate() {
    this.forexService.getForexRate(this.baseCur, this.quoteCur).subscribe(res => {
      this.exchangeRate = res.conversion_rates[this.quoteCur]
    })
  }

  toggle=(option: string)=> {
    if (option === "e") {
      this.option = true
    }
    else {
      this.option = false
    }
  }

  convert() {
    this.forexService.getForexRate(this.baseCur, this.quoteCur).subscribe(res => {
      const exchangeRate = res.conversion_rates[this.quoteCur]
      this.quoteCurValue = this.baseCurValue * exchangeRate
    })
  }
}
