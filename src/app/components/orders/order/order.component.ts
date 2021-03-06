import { Component, OnInit } from '@angular/core';
import { OrderService } from 'src/app/shared/order.service';
import { NgForm } from '@angular/forms';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { OrderItemsComponent } from '../order-items/order-items.component';
import { CustomerService } from 'src/app/shared/customer.service';
import { Customer } from 'src/app/shared/customer.model';
import { ToastrService } from 'ngx-toastr';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-order',
  templateUrl: './order.component.html',
  styles: []
})
export class OrderComponent implements OnInit {
  customersList: Customer[];
  isValid: boolean = true;

  constructor(public service: OrderService,
    private dialog: MatDialog,
    private customerService: CustomerService,
    private toastrService: ToastrService,
    private router: Router,
    private currentRoute: ActivatedRoute) { }

  ngOnInit() {
    let orderID = this.currentRoute.snapshot.paramMap.get('id');
    if (orderID == null) {
      this.resetForm();
    } else {
      this.service.getOrderById(parseInt(orderID)).then(res => {
        this.service.formData = res.order;
        this.service.orderItems = res.orderDetails;
      });
    }

    this.customerService.getCustomerList().then(res => this.customersList = res as Customer[]);
    
  }

  resetForm(form?: NgForm) {
    if (form = null)
      form.resetForm();
    this.service.formData = {
      orderID: null,
      orderNo: Math.floor(10000 + Math.random() * 90000).toString(),
      customerID: 0,
      pMethod: '',
      gTotal: 0,
      deletedOrderItemIDs:''

    };

    this.service.orderItems = [];

  }

  AddOrEditOrderItem(orderItemIndex, orderID) {
    const dilogConfig = new MatDialogConfig();
    dilogConfig.autoFocus = true;
    dilogConfig.disableClose = true;
    dilogConfig.width = "50%";
    dilogConfig.data = { orderItemIndex, orderID };
    this.dialog.open(OrderItemsComponent, dilogConfig).afterClosed().subscribe(res => {
      this.updateGrandTotal();
    });
  }

  onDeleteOrderItem(orderItemID: number, i: number) {
    if(orderItemID != null)
    {
      this.service.formData.deletedOrderItemIDs += orderItemID+","
    }
    this.service.orderItems.splice(i, 1);
    this.updateGrandTotal();
  }

  updateGrandTotal() {
    this.service.formData.gTotal = this.service.orderItems.reduce((prev, current) => {
      return prev + current.total;
    }, 0);

    this.service.formData.gTotal = parseFloat((this.service.formData.gTotal).toFixed(2));
  }

  validateForm() {
    this.isValid = true;
    if (this.service.formData.customerID == 0) {
      this.isValid = false
    }
    else if (this.service.orderItems.length === 0) {
      this.isValid = false;
    }
    return this.isValid;
  }

  onSubmit(form: NgForm) {
    if (this.validateForm()) {
      this.service.saveOrUpdateOrder().subscribe(res => {
        this.resetForm();
        this.toastrService.success('Submitted Successfully!', 'Restaurant App');
        this.router.navigate(['/orders']);
      })
    }
  }
}