alter table
if exists auth.users 
    add first_name text default '',
    add last_name text default '';