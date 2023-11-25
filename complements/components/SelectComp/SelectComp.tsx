/*---------------------------------------------------------
 ------------- README COMPONENT INSTRUCTIONS: -------------
 The component has to be imported as:
 import SelectComp from 'this component path'
 and implemented as an html element with the tag giving its intarface parameters as:
  <SelectComp
    name={'SelectExm'}
    classNames={''}
    disable={false} //
    searchable={false} //
    placeholder={'Testing'} //
    clearable={true} //
    multi={true} //
    autoFocus={false} //
    closeMenuOnSelect={true} //
    rightSide={false} //
    noOptionsMessage={'none'} //
    isLoading={false}
    options={ //
      [
        { value: 'chocolate', label: 'Chocolate' },
        { value: 'strawberry', label: 'Strawberry' },
        { value: 'vanilla', label: 'Vanilla' },
      ]
    }
    value={0} //
    defaultValue={0} //
    styles={{ //
      control: (styles: any) => ({ ...styles, backgroundColor: "none", overflow:'hidden', borderRadius: "7px", border: '1px solid gray', cursor: "pointer"}),
      placeholder: (styles: any) => ({ ...styles, color: 'white' }),
      input: (styles: any) => ({ ...styles, color: 'white'}),
      loadingIndicator: (styles: any) => ({ ...styles, color: 'gray'}),
      dropdownIndicator: (styles: any) => ({ ...styles, color: 'white'}),
      noOptionsMessage: (styles: any) => ({ ...styles, backgroundColor: "none", padding:'0px', color:'gray'}),
      option: (styles: any) => ({ ...styles, padding:'0px 7px', textOverflow:'ellipsis;', backgroundColor: "gray", borderBottom:'1px solid white', height: '1.5rem', fontSize: '1rem'}),
      menu: (styles: any) => ({ ...styles, backgroundColor: "none", border:'1px solid white', borderRadius: '7px' }),
      menuList: (styles: any) => ({ ...styles, padding:'0px', backgroundColor: "none", top: '0px', borderRadius: "7px", color: 'black'}),
      multiValueRemove: (styles: any) => ({ ...styles, width:'max-content', color: 'whitesmoke'  }),
      multiValue: (styles: any) => ({ ...styles, backgroundColor: "none", overflow:'hidden', borderRadius:'7px', border: '1px solid gray', display: "flex", width:'max-content'}),
      multiValueLabel: (styles: any) => ({ ...styles, color:'whitesmoke' }),
      singleValue: (styles: any) => ({ ...styles, color: 'whitesmoke', backgroundColor: "none" }),
      clearIndicator: (styles: any) => ({ ...styles, borderLeft:'1px solid gray', backgroundColor: "none", color:'gray'}),
      indicatorsContainer: (styles: any) => ({ ...styles, backgroundColor: "rgba(35,35,35,0.5)", color:'white'}),
      indicatorSeparator: (styles: any) => ({ ...styles, backgroundColor: "gray"}),
      loadingMessage: (styles: any) => ({ ...styles, backgroundColor: "none", padding:'0px', color:'gray'}),
      valueContainer: (styles: any) => ({ ...styles, padding:'1px'}),
    }}
  />
---------------------------------------------------------*/


//Libraries
import React, { useState, useCallback } from 'react';
import Select from 'react-select';
import makeAnimated from 'react-select/animated'
//Styles
import styles from '@/complements/components/SelectComp/SelectComp.module.css'

interface IStyles{
  control?: any,
  placeholder?: any,
  option?: any,
  dropdownIndicator?: any,
  input?: any,
  loadingIndicator?: any,
  menu?: any,
  menuList?: any,
  multiValue?: any,
  multiValueLabel?: any,
  noOptionsMessage?: any,
  multiValueRemove?: any,
  singleValue?: any,
  clearIndicator?: any,
  downChevron?: any,
  crossIcon?: any,
  group?: any,
  groupHeading?: any,
  indicatorsContainer?: any,
  indicatorSeparator?: any,
  menuPortal?: any,
  loadingMessage?: any,
  multiValueContainer?: any,
  selectContainer?: any,
  valueContainer?: any,
}

interface IOptions{
  value: string | number,
  label: string | number,
}

interface ISelect{
  classNames?: string,
  disable?:boolean,
  multipleChoices?:boolean,
  searchable?:boolean,
  placeholder?: string,
  noOptionsMessage?: string| undefined,
  options?: IOptions[] | any,
  value?: number,
  defaultValue?: number,
  styles?: IStyles,
  clearable?: boolean,
  multi?: boolean,
  autoFocus?: boolean,
  closeMenuOnSelect?: boolean,
  rightSide?: boolean,
  isLoading?: boolean,
  name?: string
}

export default function SelectComp(props:ISelect) {
  const [selectedOption, setSelectedOption] = useState(props.options[(props.value ? (props.value -1) : -1)]);
  const animatedComponents = makeAnimated()
  
  const setState = useCallback((newValue: any, actionMeta: any) => {
    setSelectedOption(newValue)
  }, [])

  return (
    <div className={styles.SelectComp}>
      <Select
        value={selectedOption} // control the current value        
        placeholder={props.placeholder}
        className={props.classNames}
        classNamePrefix='select'
        options={props.options}//
        defaultValue={props.options[(props.defaultValue ? (props.defaultValue -1) : -1)]}
        components={animatedComponents}//Animacion al eliminar elementos
        isSearchable={props.searchable}//Busca entre opciones basado en lo que el usuario captura 
        isDisabled={props.disable}//Inhabilitado
        isLoading={props.isLoading}//Marcas de carga en proceso
        isClearable={props.clearable}//Para eliminar elementos seleccionados
        isMulti={props.multi}//Seleccion multiple
        autoFocus={props.autoFocus}//Enfoque
        closeMenuOnSelect={props.closeMenuOnSelect}//Deja abierta opciones del select
        styles={props.styles} //SelectStyles
        noOptionsMessage={(obj: { inputValue: string; }) => props.noOptionsMessage} // ({ inputValue: string }) => string | null - Text to display when there are no options
        isRtl={props.rightSide}//Fleche del lado derecho
        name={props.name}
        onChange={setState}//Triger
      />
    </div>
  );
}