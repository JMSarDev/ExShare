import { Component } from '@angular/core';

export class MenuItem {

  title: String;
  component: Component;
  shareName: String;


  constructor(title: String, component: Component, shareName: String) {
    this.title = title;
    this.component = component;
    this.shareName = shareName;
  }
}