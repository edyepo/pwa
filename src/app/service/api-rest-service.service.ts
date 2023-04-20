import { Injectable, EventEmitter, Output } from '@angular/core';
import { HttpClient } from '@angular/common/http'
@Injectable({
  providedIn: 'root'
})

export class ApiRestService {
  @Output()
  public url = 'http://localhost:9000/'

  constructor(private http:HttpClient) { }

 
  public saveToken(token:string){
    return this.http.post(this.url+'save', token);
  }
}
