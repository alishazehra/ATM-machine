#! /usr/bin/env node

import inquirer from 'inquirer';

class ATMSimulator {
  private balance: number = 10000; // Example starting balance

  public async start() {
    let exit = false;

    while (!exit) {
      const answer = await inquirer.prompt({
        name: 'action',
        type: 'list',
        message: 'Welcome to the ATM. Choose an option:',
        choices: ['Check Balance', 'Deposit', 'Withdraw', 'Exit'],
      });

      switch (answer.action) {
        case 'Check Balance':
          console.log(`Your current balance is: $${this.balance}`);
          break;
        case 'Deposit':
          await this.deposit();
          break;
        case 'Withdraw':
          await this.withdraw();
          break;
        case 'Exit':
          exit = true;
          console.log('Thank you for using the ATM. Goodbye!');
          break;
        }
      }
    }
  
    private async deposit() {
      const answer = await inquirer.prompt({
        name: 'amount',
        type: 'number',
        message: 'How much would you like to deposit?',
        validate: value => (value <= 0 ? 'Please enter a positive number.' : true),
      });
      this.balance += answer.amount;
      console.log(`$${answer.amount} deposited. Your new balance is: $${this.balance}.`);
    }
  
    private async withdraw() {
      const answer = await inquirer.prompt({
        name: 'amount',
        type: 'number',
        message: 'How much would you like to withdraw?',
        validate: value =>
          value <= 0
            ? 'Please enter a positive number.'
            : value > this.balance
            ? 'Insufficient balance.'
            : true,
      });
  
      this.balance -= answer.amount;
      console.log(`$${answer.amount} withdrawn. Your remaining balance is: $${this.balance}.`);
    }
  }
  
  const atm = new ATMSimulator();
  atm.start();
    