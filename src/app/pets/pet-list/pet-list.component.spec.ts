/*
 *
 *  * Copyright 2016-2017 the original author or authors.
 *  *
 *  * Licensed under the Apache License, Version 2.0 (the "License");
 *  * you may not use this file except in compliance with the License.
 *  * You may obtain a copy of the License at
 *  *
 *  *      http://www.apache.org/licenses/LICENSE-2.0
 *  *
 *  * Unless required by applicable law or agreed to in writing, software
 *  * distributed under the License is distributed on an "AS IS" BASIS,
 *  * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 *  * See the License for the specific language governing permissions and
 *  * limitations under the License.
 *
 */

/* tslint:disable:no-unused-variable */

/**
 * @author Vitaliy Fedoriv
 */

import { ComponentFixture, TestBed, waitForAsync } from "@angular/core/testing";
import { CUSTOM_ELEMENTS_SCHEMA } from "@angular/core";

import { PetListComponent } from "./pet-list.component";
import { FormsModule } from "@angular/forms";
import { PetService } from "../pet.service";
import { ActivatedRoute, Router } from "@angular/router";
import { ActivatedRouteStub, RouterStub } from "../../testing/router-stubs";
import { Pet } from "../pet";
import { Observable, of } from "rxjs";
import Spy = jasmine.Spy;

class PetServiceStub {
  deletePet(petId: string): Observable<number> {
    return of();
  }
}

describe("PetListComponent", () => {
  let component: PetListComponent;
  let fixture: ComponentFixture<PetListComponent>;
  let inputPet: Pet;
  let petService: PetService;
  let spy: Spy;

  beforeEach(
    waitForAsync(() => {
      TestBed.configureTestingModule({
        declarations: [PetListComponent],
        schemas: [CUSTOM_ELEMENTS_SCHEMA],
        imports: [FormsModule],
        providers: [
          { provide: PetService, useClass: PetServiceStub },
          { provide: Router, useClass: RouterStub },
          { provide: ActivatedRoute, useClass: ActivatedRouteStub },
        ],
      }).compileComponents();
    })
  );

  beforeEach(() => {
    fixture = TestBed.createComponent(PetListComponent);
    component = fixture.componentInstance;
    inputPet = {
      id: 1,
      name: "Leo",
      birthDate: "2010-09-07",
      type: { id: 1, name: "cat" },
      owner: {
        id: 1,
        firstName: "George",
        lastName: "Franklin",
        address: "110 W. Liberty St.",
        city: "Madison",
        telephone: "6085551023",
        pets: null,
      },
      visits: null,
    };
    component.pet = inputPet;
    petService = fixture.debugElement.injector.get(PetService);
    spy = spyOn(petService, "deletePet").and.returnValue(of(1));

    fixture.detectChanges();
  });

  it("should create PetListComponent", () => {
    expect(component).toBeTruthy();
  });

  it("should call deletePet() method", () => {
    fixture.detectChanges();
    component.deletePet(component.pet);
    expect(spy.calls.any()).toBe(true, "deletePet called");
  });
});
