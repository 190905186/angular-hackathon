import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ForexService {

  forexUrl:string="https://v6.exchangerate-api.com/v6/883b9f8576cdd6fa4802a9f2/latest/"

  constructor(private http:HttpClient) { }

  getForexRate(baseCur:string,quoteCur:string){
    return this.http.get<any>(this.forexUrl+baseCur)
   
  }

  convert(baseCur:string,baseCurValue:number,quoteCur:string){
    return this.getForexRate(baseCur,quoteCur).subscribe(res=>{
      const exchangeRate=res.currency_rates[quoteCur]
      return of(baseCurValue*exchangeRate)
    })
  }
}
