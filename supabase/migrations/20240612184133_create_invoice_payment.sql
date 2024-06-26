--                                                            --
--                        public.invoices                     --
--                                                            --
----------------------------------------------------------------


----------------------------------------------------------------

drop table if exists invoices cascade;
drop table if exists payments cascade;

----------------------------------------------------------------

-- Create the Invoice table
create table invoices (
    id bigint generated by default as identity primary key,
    no varchar(255) not null,
    user_id uuid references auth.users(id) on delete cascade not null,
    total_ttc varchar(255) not null,
    date_emission date not null,
    date_echeance date not null,
    is_archived boolean not null default false,
    is_paid boolean not null default false,
    receiver_name varchar(255) not null,
    receiver_address text not null,
    receiver_zip_code varchar(20) not null,
    receiver_country varchar(255) not null,
    created_at timestamptz default now() not null,
    updated_at timestamptz default now() not null
);
comment on column invoices.updated_at is 'on_updated_at';

-- Create the Payment table
create table payments (
    id bigint generated by default as identity primary key,
    no varchar(255) not null,
    invoice_id bigint references invoices(id) on delete cascade not null,
    penalty varchar(255) not null,
    ttc float not null,
    penalty_ttc float not null,
    created_at timestamptz default now() not null
);

----------------------------------------------------------------

-- Secure the tables
alter table invoices enable row level security;
alter table payments enable row level security;

-- Add row-level security policies
-- Add row-level security policies
create policy "User can select their own invoices" on invoices 
for select 
to authenticated 
using ( auth.uid() = user_id );

create policy "User can update their own invoices" on invoices 
for update 
to authenticated 
using ( auth.uid() = user_id );

create policy "User can insert their own invoices" on invoices 
for insert 
to authenticated 
with check ( auth.uid() = user_id );

create policy "User can delete their own invoices" on invoices 
for delete 
to authenticated 
using ( auth.uid() = user_id );

create policy "User can insert their own payments" on payments 
for insert 
to authenticated 
with check ( auth.uid() = (select user_id from invoices where invoices.id = payments.invoice_id) );

create policy "User can delete their own payments" on payments 
for delete 
to authenticated 
using ( auth.uid() = (select user_id from invoices where invoices.id = payments.invoice_id) );

create policy "User can select their own payments" on payments 
for select 
to authenticated 
using ( exists (select 1 from invoices where invoices.id = payments.invoice_id and invoices.user_id = auth.uid()) );
