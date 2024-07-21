import React, { useEffect, useRef, useState } from 'react'
import { Control, Path } from 'react-hook-form';
import { FormData } from '../types/InputTypes';

type OptionType={
    value: string,
    label: string,
}

interface SelectProps{
    name: Path<FormData>,
    control: Control<FormData>
    options: OptionType[];
    placeholder: string,
    value: string | null;
    onChange: (value: string)=> void
}


const Select: React.FC<SelectProps> = ({options , control , name, placeholder, onChange, value}) => {
    const [searchTerm, setSearchTerm]=useState<string>('');
    const [isOpen,setIsOpen]= useState<boolean>(false);
    const [filterOptions, setFilterOptions]=useState<OptionType[]>(options);
    const SelectRef=useRef<HTMLDivElement>(null);
    const [selectedOption , setSelectedOption]=useState<string|null>(null);


    const handleFilterOptions=()=>{
        const getOptions=options.filter(option=>
            option.label.toLowerCase().includes(searchTerm?.toLowerCase())
        );
        console.log(getOptions);
        setFilterOptions(getOptions);
    }

    

    useEffect(()=>{
        console.log(searchTerm);
        handleFilterOptions();
    },[searchTerm]);

    useEffect(()=>{
        const handleClickOutside = (event: MouseEvent) => {
            if (SelectRef.current && !SelectRef.current.contains(event.target as Node)) {
                setIsOpen(false);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    },[]);

    console.log(filterOptions);
    return (
        <div className='select-container' ref={SelectRef}>
            <div className='select-inner-container'>
                <input placeholder={placeholder} autoComplete='off'
                value={selectedOption?selectedOption: searchTerm}
                 onClick={()=>{
                    setIsOpen(true);
                }} onChange={(e)=>{
                    setSelectedOption(null);
                    setIsOpen(true);
                    setSearchTerm(e.target.value);
                }} />
                <div className='arrow' onClick={()=>{
                    setIsOpen((prevIsOpen)=>!prevIsOpen)
                }}>&#9660;</div>
            </div>
            {isOpen&&<div className='select-options-container'>
                <ul>
                    {filterOptions&&filterOptions.map((option)=>{
                        return <li onClick={()=>{
                            setSelectedOption(option.label);
                            setSearchTerm('');
                            setIsOpen(false);
                            onChange(option.label)
                        }}>{option.label}</li>
                    })}
                    {filterOptions.length===0&&<li>No options found</li>}
                </ul>
            </div>}
        </div>

    )
}

export default Select
