-- connections

create type connection_type as enum('ehub-cz');

create table connections (
  id uuid default extensions.uuid_generate_v4() primary key,
  name text not null,
  type connection_type not null,
  credentials jsonb not null,

  user_id uuid default auth.uid() not null
);

alter table connections
  enable row level security;

create policy "User can see their own connections."
  on connections for select using (
    user_id = auth.uid()
  );

create policy "User can create connections."
  on connections for insert with check (
    user_id = auth.uid()
  );

-- campaigns

create table campaigns (
  id uuid default extensions.uuid_generate_v4() primary key,
  identifier text not null,
  name text not null,
  web_url text null,
  logo_url text null,
  maximum_approval_period int2 null,

  connection_id uuid not null,
  constraint connection_id foreign key(connection_id) references connections(id) on delete cascade
);

alter table campaigns
  enable row level security;

create policy "User can see their own campains."
  on campaigns for select using (
    exists(
      select 1 from connections
      where connections.id = campaigns.connection_id and connections.user_id = auth.uid()
    )
  );

-- commisions

create type commission_confirmation_status as enum('pending', 'approved', 'rejected');
create type commission_payout_status as enum('paid', 'unpaid');

create table commissions (
  id uuid default extensions.uuid_generate_v4() primary key,
  identifier text not null,
  confirmation_status commission_confirmation_status default 'pending' not null,
  payout_status commission_payout_status default 'unpaid' not null,
  commission float4 not null,
  amount float4 not null,
  currency text not null,

  locked_until timestamp with time zone not null,
  completed_at timestamp with time zone null,
  created_at timestamp with time zone not null,

  campaign_id uuid not null,
  constraint campaign_id foreign key(campaign_id) references campaigns(id) on delete cascade
);

alter table commissions
  enable row level security;

create policy "User can see their own commisions."
  on commissions for select using (
    exists(
      select 1 from connections
      join campaigns on campaigns.connection_id = connections.id
      where campaigns.id = commissions.campaign_id and connections.user_id = auth.uid()
    )
  );
