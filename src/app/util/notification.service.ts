import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material';

@Injectable()
export class NotificationService {

  constructor(
    private snackBar: MatSnackBar,
  ) { }

  public success(message: string): void {
    this.snackBar.open(message, 'Success');
  }

  public error(message: string): void {
    this.snackBar.open(message, 'Error');
  }

  public warning(message: string): void {
    this.snackBar.open(message, 'Warning');
  }

}
