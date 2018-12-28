import { Component, OnInit } from '@angular/core';
import { HomeService } from './home.service';
import { IGames } from './games';
import { GamesParameterService } from './games.paramter.service';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  response: any[] = [];
  errorMessage: any[] = [];
  canSearch = true;
  filtertext: string = '';
  filteredGames: IGames[];
  games: IGames[];
  showcontent: boolean;
  category: any[] = [];
  cartNumber : number = 0;
  cart : any;
  favourites: any = [];

  constructor(private _homeService: HomeService, private gamesParameterService: GamesParameterService) {

  }

  get listFilter(): string {
    return this.gamesParameterService.filterBy;
  }
  set listFilter(value: string) {
    this.gamesParameterService.filterBy = value;
    this.filteredGames = this.performFilter(this.listFilter);
  }

  performFilter(filterBy: string): IGames[] {
    if (filterBy) {
      filterBy = filterBy.toLocaleLowerCase();
      return this.games.filter((game: IGames) =>
        game.category.toString().toLocaleLowerCase().indexOf(filterBy) !== -1 ||
        game.name.toString().toLocaleLowerCase().indexOf(filterBy) !== -1
        );
    } else {
      return this.games;
    }
  }

  searchCategory(n){
    this.listFilter = String(n);
  }

  onDecrease(index: number): void{
    this.games[index].quantity = this.games[index].quantity - 1;
    this.cartNumber = this.cartNumber - 1;
    this.getFavRecipe();
    // localStorage.setItem("cartQuantity", String(this.cartNumber));
}

onIncrease(index: number): void{
    this.games[index].quantity = this.games[index].quantity + 1;
    this.cartNumber = this.cartNumber + 1;
    this.getFavRecipe();
    // localStorage.setItem("cartQuantity", String(this.cartNumber));
}

goToCart() : void{
    var i:number;
    for(i=0;i<this.games.length;i++){
        this.games[i].quantity = 0;
    }
    // alert("Item Has been Added!");
}

  getGames(): void {
    this._homeService.getFormlyData()
      .subscribe(data => {
        this.games = data.recipes;
        this.category = data.categories;
        var i:number;
        for(i=0;i<this.games.length;i++){
            this.games[i].quantity = 0;
        }
        this.getFavRecipe();
        this.filteredGames = this.performFilter(this.listFilter);
        this.showcontent = true;
      },
        error => this.errorMessage = <any>error);
  }

  getFavRecipe(){
    this.favourites = [];
    var i:number;
    for(i=0;i<this.games.length;i++){
          if(this.games[i].isFavourite){
            this.favourites.push(this.games[i]);
          }
        }
  }

  ngOnInit(): void {
    // this.cart = localStorage.getItem("cartQuantity");
    // this.cartNumber = parseInt(this.cart);
    this.getGames();
  }

}
