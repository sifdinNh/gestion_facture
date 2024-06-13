----------------------------------------------------------------


-- Function to create a new invoice
create or replace function create_invoice(
    _no varchar,
    _user_id uuid,
    _total_ttc varchar,
    _date_emission date,
    _date_echeance date,
    _receiver_name varchar,
    _receiver_address text,
    _receiver_zip_code varchar,
    _receiver_country varchar
) returns void
language plpgsql
as $$
begin
    insert into invoices (
        no, user_id, total_ttc, date_emission, date_echeance, receiver_name, receiver_address, receiver_zip_code, receiver_country
    ) values (
        _no, _user_id, _total_ttc, _date_emission, _date_echeance, _receiver_name, _receiver_address, _receiver_zip_code, _receiver_country
    );
end;
$$;

-- Function to update the is_archived field of an invoice
create or replace function update_invoice_is_archived(
    _id bigint,
    _is_archived boolean
) returns void
language plpgsql
as $$
begin
    update invoices
    set is_archived = _is_archived,
        updated_at = now()
    where id = _id and auth.uid() = user_id;
end;
$$;

-- Function to create a new payment
create or replace function create_payment(
    _no varchar,
    _invoice_id bigint,
    _penalty varchar,
    _ttc float,
    _penalty_ttc float
) returns void
language plpgsql
as $$
begin

    insert into payments (
        no, invoice_id, penalty, ttc, penalty_ttc
    ) values (
        _no, _invoice_id, _penalty, _ttc, _penalty_ttc
    );
end;
$$;

----------------------------------------------------------------