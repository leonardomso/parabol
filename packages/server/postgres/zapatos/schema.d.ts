/*
** DON'T EDIT THIS FILE **
It's been generated by Zapatos (v3.3.0), and is liable to be overwritten

Zapatos: https://jawj.github.io/zapatos/
Copyright (C) 2020 George MacKerron
Released under the MIT licence: see LICENCE file
*/

declare module 'zapatos/schema' {

  import type * as db from 'zapatos/db';

  // got a type error on schemaVersionCanary below? update by running `npx zapatos`
  export interface schemaVersionCanary extends db.SchemaVersionCanary { version: 101 }

  type JSONSelectableFromSelectable<T> = { [K in keyof T]:
    Date extends T[K] ? Exclude<T[K], Date> | db.DateString :
    Date[] extends T[K] ? Exclude<T[K], Date[]> | db.DateString[] :
    T[K]
  };

  /* === schema: public === */

  /* --- enums --- */

  export type OrganizationUserAuditEventTypeEnum = 'activated' | 'added' | 'inactivated' | 'removed';
  export namespace every {
    export type OrganizationUserAuditEventTypeEnum = ['activated', 'added', 'inactivated', 'removed'];
  }

  /* --- tables --- */

  export namespace OrganizationUserAudit {
    export type Table = 'OrganizationUserAudit';
    export interface Selectable {
      id: number;
      orgId: string;
      userId: string;
      eventDate: Date;
      eventType: OrganizationUserAuditEventTypeEnum;
    }
    export interface Whereable {
      id?: number | db.Parameter<number> | db.SQLFragment | db.ParentColumn | db.SQLFragment<any, number | db.Parameter<number> | db.SQLFragment | db.ParentColumn>;
      orgId?: string | db.Parameter<string> | db.SQLFragment | db.ParentColumn | db.SQLFragment<any, string | db.Parameter<string> | db.SQLFragment | db.ParentColumn>;
      userId?: string | db.Parameter<string> | db.SQLFragment | db.ParentColumn | db.SQLFragment<any, string | db.Parameter<string> | db.SQLFragment | db.ParentColumn>;
      eventDate?: Date | db.Parameter<Date> | db.DateString | db.SQLFragment | db.ParentColumn | db.SQLFragment<any, Date | db.Parameter<Date> | db.DateString | db.SQLFragment | db.ParentColumn>;
      eventType?: OrganizationUserAuditEventTypeEnum | db.Parameter<OrganizationUserAuditEventTypeEnum> | db.SQLFragment | db.ParentColumn | db.SQLFragment<any, OrganizationUserAuditEventTypeEnum | db.Parameter<OrganizationUserAuditEventTypeEnum> | db.SQLFragment | db.ParentColumn>;
    }
    export interface Insertable {
      orgId: string | db.Parameter<string> | db.SQLFragment;
      userId: string | db.Parameter<string> | db.SQLFragment;
      eventDate: Date | db.Parameter<Date> | db.DateString | db.SQLFragment;
      eventType: OrganizationUserAuditEventTypeEnum | db.Parameter<OrganizationUserAuditEventTypeEnum> | db.SQLFragment;
    }
    export interface Updatable {
      orgId?: string | db.Parameter<string> | db.SQLFragment | db.SQLFragment<any, string | db.Parameter<string> | db.SQLFragment>;
      userId?: string | db.Parameter<string> | db.SQLFragment | db.SQLFragment<any, string | db.Parameter<string> | db.SQLFragment>;
      eventDate?: Date | db.Parameter<Date> | db.DateString | db.SQLFragment | db.SQLFragment<any, Date | db.Parameter<Date> | db.DateString | db.SQLFragment>;
      eventType?: OrganizationUserAuditEventTypeEnum | db.Parameter<OrganizationUserAuditEventTypeEnum> | db.SQLFragment | db.SQLFragment<any, OrganizationUserAuditEventTypeEnum | db.Parameter<OrganizationUserAuditEventTypeEnum> | db.SQLFragment>;
    }
    export interface JSONSelectable extends JSONSelectableFromSelectable<Selectable> { }
    export type UniqueIndex = 'OrganizationUserAudit_pkey';
    export type Column = keyof Selectable;
    export type OnlyCols<T extends readonly Column[]> = Pick<Selectable, T[number]>;
    export type SQLExpression = db.GenericSQLExpression | db.ColumnNames<Updatable | (keyof Updatable)[]> | db.ColumnValues<Updatable> | Table | Whereable | Column;
    export type SQL = SQLExpression | SQLExpression[];
  }

  export namespace PgMigrations {
    export type Table = 'PgMigrations';
    export interface Selectable {
      id: number;
      name: string;
      run_on: Date;
    }
    export interface Whereable {
      id?: number | db.Parameter<number> | db.SQLFragment | db.ParentColumn | db.SQLFragment<any, number | db.Parameter<number> | db.SQLFragment | db.ParentColumn>;
      name?: string | db.Parameter<string> | db.SQLFragment | db.ParentColumn | db.SQLFragment<any, string | db.Parameter<string> | db.SQLFragment | db.ParentColumn>;
      run_on?: Date | db.Parameter<Date> | db.DateString | db.SQLFragment | db.ParentColumn | db.SQLFragment<any, Date | db.Parameter<Date> | db.DateString | db.SQLFragment | db.ParentColumn>;
    }
    export interface Insertable {
      id?: number | db.Parameter<number> | db.DefaultType | db.SQLFragment;
      name: string | db.Parameter<string> | db.SQLFragment;
      run_on: Date | db.Parameter<Date> | db.DateString | db.SQLFragment;
    }
    export interface Updatable {
      id?: number | db.Parameter<number> | db.DefaultType | db.SQLFragment | db.SQLFragment<any, number | db.Parameter<number> | db.DefaultType | db.SQLFragment>;
      name?: string | db.Parameter<string> | db.SQLFragment | db.SQLFragment<any, string | db.Parameter<string> | db.SQLFragment>;
      run_on?: Date | db.Parameter<Date> | db.DateString | db.SQLFragment | db.SQLFragment<any, Date | db.Parameter<Date> | db.DateString | db.SQLFragment>;
    }
    export interface JSONSelectable extends JSONSelectableFromSelectable<Selectable> { }
    export type UniqueIndex = 'PgMigrations_pkey';
    export type Column = keyof Selectable;
    export type OnlyCols<T extends readonly Column[]> = Pick<Selectable, T[number]>;
    export type SQLExpression = db.GenericSQLExpression | db.ColumnNames<Updatable | (keyof Updatable)[]> | db.ColumnValues<Updatable> | Table | Whereable | Column;
    export type SQL = SQLExpression | SQLExpression[];
  }

  /* === cross-table types === */

  export type Table = OrganizationUserAudit.Table | PgMigrations.Table;
  export type Selectable = OrganizationUserAudit.Selectable | PgMigrations.Selectable;
  export type Whereable = OrganizationUserAudit.Whereable | PgMigrations.Whereable;
  export type Insertable = OrganizationUserAudit.Insertable | PgMigrations.Insertable;
  export type Updatable = OrganizationUserAudit.Updatable | PgMigrations.Updatable;
  export type UniqueIndex = OrganizationUserAudit.UniqueIndex | PgMigrations.UniqueIndex;
  export type Column = OrganizationUserAudit.Column | PgMigrations.Column;
  export type AllTables = [OrganizationUserAudit.Table, PgMigrations.Table];
  export type AllMaterializedViews = [];


  export type SelectableForTable<T extends Table> = {
    OrganizationUserAudit: OrganizationUserAudit.Selectable;
    PgMigrations: PgMigrations.Selectable;
  }[T];

  export type WhereableForTable<T extends Table> = {
    OrganizationUserAudit: OrganizationUserAudit.Whereable;
    PgMigrations: PgMigrations.Whereable;
  }[T];

  export type InsertableForTable<T extends Table> = {
    OrganizationUserAudit: OrganizationUserAudit.Insertable;
    PgMigrations: PgMigrations.Insertable;
  }[T];

  export type UpdatableForTable<T extends Table> = {
    OrganizationUserAudit: OrganizationUserAudit.Updatable;
    PgMigrations: PgMigrations.Updatable;
  }[T];

  export type UniqueIndexForTable<T extends Table> = {
    OrganizationUserAudit: OrganizationUserAudit.UniqueIndex;
    PgMigrations: PgMigrations.UniqueIndex;
  }[T];

  export type ColumnForTable<T extends Table> = {
    OrganizationUserAudit: OrganizationUserAudit.Column;
    PgMigrations: PgMigrations.Column;
  }[T];

  export type SQLForTable<T extends Table> = {
    OrganizationUserAudit: OrganizationUserAudit.SQL;
    PgMigrations: PgMigrations.SQL;
  }[T];

}