'use client';

import React from 'react';
import { nanoid } from 'nanoid';
import ListItem from '../../listItem';
import Button from '../../interaction/button';
import InputList from '../../interaction/input/List';
import SelectMultiple from '@/component/interaction/select/multiple';
import { DataCreateForm } from '@/models/form';
import Select from '@/component/interaction/select';

type Props = {
  data: DataCreateForm[];
  onSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
};

export default function FormCreate({
  data,
  onSubmit,
}: Props): React.ReactElement {
  return (
    <form
      onSubmit={(e): void => {
        e.preventDefault();
        onSubmit(e);
      }}
      className="flex w-full flex-col gap-4"
    >
      {data.map((obj) => (
        <ListItem key={nanoid()} title={obj.label}>
          {obj.type === 'select' && !obj.multiple && obj.options && (
            <Select
              name={obj.name}
              options={obj.options}
              defaultValue={obj.defaultValue}
            />
          )}
          {obj.type === 'select' && obj.multiple && (
            <SelectMultiple
              name={obj.name}
              options={obj.options}
              defaultValue={obj.defaultValue}
            />
          )}
          {(obj.type === 'text' || obj.type === 'number') && (
            <input
              name={obj.name}
              className="px-4 py-2 rounded-full w-64"
              defaultValue={obj.defaultValue}
              type={obj.type}
              required
            />
          )}
          {obj.type === 'listInput' && (
            <InputList name={obj.name} data={obj.defaultValues} />
          )}
        </ListItem>
      ))}

      <div className="flex gap-4 justify-end">
        <Button
          type="submit"
          className="bg-emerald-500 hover:bg-emerald-600 text-sm"
          text="Créer"
        />
      </div>
    </form>
  );
}
