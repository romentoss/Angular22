import { Injectable, inject } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable, forkJoin, map } from 'rxjs';

export interface DogBreed {
  name: string;
  image_link: string;
  good_with_children: number;
  good_with_other_dogs: number;
  shedding: number;
  grooming: number;
  drooling: number;
  coat_length: number;
  good_with_strangers: number;
  playfulness: number;
  protectiveness: number;
  trainability: number;
  energy: number;
  barking: number;
  min_life_expectancy: number;
  max_life_expectancy: number;
  max_height_male: number;
  max_height_female: number;
  max_weight_male: number;
  max_weight_female: number;
  min_height_male: number;
  min_height_female: number;
  min_weight_male: number;
  min_weight_female: number;
}

@Injectable({ providedIn: 'root' })
export class DogService {
  private API = 'https://api.api-ninjas.com/v1';
  private http = inject(HttpClient);

  getAllBreeds(): Observable<DogBreed[]> {
    const letters = 'abcdefghijklmnopqrstuvwxyz'.split('');
    const requests = letters.map(letter =>
      this.http.get<DogBreed[]>(`${this.API}/dogs`, {
        params: new HttpParams().set('name', letter).set('limit', '100')
      })
    );
    return forkJoin(requests).pipe(
      map(results => {
        const allBreeds = results.flat();
        const unique = allBreeds.filter((breed, index, self) =>
          index === self.findIndex(b => b.name === breed.name)
        );
        return unique.sort((a, b) => a.name.localeCompare(b.name));
      })
    );
  }

  getBreedByName(name: string): Observable<DogBreed[]> {
    const params = new HttpParams().set('name', name);
    return this.http.get<DogBreed[]>(`${this.API}/dogs`, { params });
  }
}
