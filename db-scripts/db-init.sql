create table employees
(
    Id serial primary key,
    name       varchar
);
create table salaries
(
    Id serial primary key,
    Salary   int,
    EmployeeId   int references employees (Id)
);

create table acl
(
    Id serial primary key,
    TableName varchar not null,
    RoleId    int,
    EntityId  int

);

insert into employees(name)
values ('CEO'),
 ('PM'),
 ('Dev'),
 ('Tester'),
 ('Intern');

insert into salaries(Salary, EmployeeId)
values (50000, 1),
 (10000, 2),
 (15000, 3),
 (7000, 4),
 (3000, 5);

 insert into acl(TableName, RoleId, EntityId)
 values ('Salaries', 1, 1),
 ('Salaries', 1, 2),
 ('Salaries', 1, 3),
 ('Salaries', 1, 4),
 ('Salaries', 1, 5),
 ('Salaries', 2, 2),
 ('Salaries', 2, 5),
 ('Salaries', 3, 3),
 ('Salaries', 3, 4),
 ('Salaries', 6, 5);
