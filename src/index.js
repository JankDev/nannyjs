import { model } from './database';
 

const SalarySecured = model('Salaries')

SalarySecured.fetchAll().then(salaries => console.log(salaries.toJSON()))

