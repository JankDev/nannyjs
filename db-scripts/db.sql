create table employees
(
    EmployeeId serial primary key,
    name       varchar
);
create table salaries
(
    SalaryId serial primary key,
    Salary   int,
    UserId   int references employees (EmployeeId)
);

create table acl
(
    TableName varchar not null,
    RoleId    int,
    EntityId  int

);

insert into employees(name)
values ('kacper');
insert into salaries(Salary, UserId)
values (12000, 1);
insert into acl
values ('salaries', 1, 1);
