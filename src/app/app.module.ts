import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {FormsModule} from '@angular/forms';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {MatDialogModule} from '@angular/material/dialog';
import { ToastrModule } from 'ngx-toastr';

import { HttpClientModule} from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { OrdersComponent } from './components/orders/orders.component';
import { OrderComponent } from './components/orders/order/order.component';
import { OrderItemsComponent } from './components/orders/order-items/order-items.component';
import { OrderService } from './shared/order.service';
import { CustomerService } from './shared/customer.service';
import { ItemService } from './shared/item.service';


@NgModule({
  declarations: [
    AppComponent,
    OrdersComponent,
    OrderComponent,
    OrderItemsComponent
    
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    BrowserAnimationsModule,
    MatDialogModule,
    HttpClientModule,
    ToastrModule.forRoot()
  ],
  entryComponents:[OrderItemsComponent],
  providers: [OrderService,CustomerService,ItemService],
  bootstrap: [AppComponent]
})
export class AppModule { }