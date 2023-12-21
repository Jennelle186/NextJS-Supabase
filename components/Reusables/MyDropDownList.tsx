import React, { Fragment, useState, useEffect } from 'react';
import { Listbox, Transition } from '@headlessui/react';
import { CheckIcon, ChevronUpDownIcon } from '@heroicons/react/20/solid';

type Props = {
  options: string[];
  selected: string;
  onSelect: (value: string) => void;
  required: boolean;
  placeholder: string;
  value: string;
  title: string;
};

function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(' ');
}

const DropdownList: React.FC<Props> = ({ options, selected, onSelect, required, placeholder , value, title}) => {
  // Initialize the selected state with the default selected value from the parent
  const [currentSelected, setCurrentSelected] = useState<string | null>(selected);

  // Update the selected state when the selected prop changes
  useEffect(() => {
    setCurrentSelected(selected);
  }, [selected]);

  return (
    <Listbox value={currentSelected} onChange={(value) => { 
        if (value !== null) {
          setCurrentSelected(value); 
          onSelect(value);
        }
      }}>
      {({ open }) => (
        <>
          <Listbox.Label className="block text-sm font-medium leading-6 text-cyan-600">
          {title}
          </Listbox.Label>
          <div className="relative mt-2">
            <Listbox.Button className={`block w-full cursor-default rounded-md bg-white py-1.5 pl-3 pr-10 text-left text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:outline-none focus:ring-2 focus-ring-indigo-500 sm:text-sm sm:leading-6 ${required ? 'required' : ''}`}>
              <span className="ml-3 block truncate">{currentSelected || placeholder}</span>
              <span className="pointer-events-none absolute inset-y-0 right-0 ml-3 flex items-center pr-2">
                <ChevronUpDownIcon className="h-5 w-5 text-gray-400" aria-hidden="true" />
              </span>
            </Listbox.Button>

            <Transition
              show={open}
              as={Fragment}
              leave="transition ease-in duration-100"
              leaveFrom="opacity-100"
              leaveTo="opacity-0"
            >
              <Listbox.Options className="absolute z-10 mt-1 max-h-56 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
                {/* Add a placeholder option */}
                <Listbox.Option key="placeholder" value="" disabled>
                  {({ active }) => (
                    <span className={classNames('text-gray-500', 'ml-3 block truncate')}>
                      {placeholder}
                    </span>
                  )}
                </Listbox.Option>

                {options.map((option, i) => (
                  <Listbox.Option
                    key={i}
                    className={({ active }) =>
                      classNames(
                        active ? 'bg-indigo-600 text-white' : 'text-gray-900',
                        'relative cursor-default select-none py-2 pl-3 pr-9'
                      )
                    }
                    value={option}
                  >
                    {({ selected, active }) => (
                      <>
                        <span className={classNames(selected ? 'font-semibold' : 'font-normal', 'ml-3 block truncate')}>
                          {option}
                        </span>

                        {selected ? (
                          <span
                            className={classNames(
                              active ? 'text-white' : 'text-indigo-600',
                              'absolute inset-y-0 right-0 flex items-center pr-4'
                            )}
                          >
                            <CheckIcon className="h-5 w-5" aria-hidden="true" />
                          </span>
                        ) : null}
                      </>
                    )}
                  </Listbox.Option>
                ))}
              </Listbox.Options>
            </Transition>
          </div>
        </>
      )}
    </Listbox>
  );
};

export default DropdownList;
