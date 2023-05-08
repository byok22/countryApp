import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, tap, map, catchError, of } from 'rxjs';

import { Country } from '../interfaces/country';

@Injectable({providedIn: 'root'})
export class CountriesService {
    
    private apiUrl: string = 'https://restcountries.com/v3.1';

    searchCountryByAlphaCode(code: string ): Observable<Country| null>{
        const url:string = `${ this.apiUrl }/alpha/${code}`;
        return this.http.get<Country[]>(url)
        .pipe(  
            map(countries => countries.length>0 ? countries[0]:null),
             
            catchError(                 
                () => {return of(null)} 
            )
        );   
    }

    
    searchCountry( term: string ): Observable<Country[]>{
        const url:string = `${ this.apiUrl }/name/${term}`;
        return this.returnURL(url);       
    }
    searchRegion( term: string ): Observable<Country[]>{
        const url:string = `${ this.apiUrl }/region/${term}`
        return this.returnURL(url);
    }        
    searchCapital( term: string ): Observable<Country[]>{
        const url:string = `${ this.apiUrl }/capital/${term}`

        return this.http.get<Country[]>(url)
        .pipe(
            /*tap( 
                countries => console.log('Tap1', countries) 
            ),
            map(
                countries => []
                )
                ,
            tap( 
                countries => console.log('Tap2', countries) 
            ),*/
            catchError(                 
                error => {
                    console.log(error);
                    return of([])
                } 
            )
        );        
    }
    returnURL(url: string):Observable<Country[]>{
        return this.http.get<Country[]>(url)
        .pipe(  
             
            catchError(                 
                () => {return of([])} 
            )
        );
    }

    constructor(private http: HttpClient) { }
    
}