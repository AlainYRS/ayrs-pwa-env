/*---------------------------------------------------------
 ------------- README FUNCTION INSTRUCTIONS: --------------
 Type: Component and Function
 Import statements:
    import TextValidatorComp from '@/...path.../TextValidatorComp'

 Import modules:
    import { useRef } from 'react

 Instructions:
    1) create references and states:

    const ComponentRef = useRef(null)//Referencia de textarea de Description
    const TextToValidate = useRef(null)//Referencia de label para contador de palabras o caracteres a encontrar
    const [InvalidChart, setInvalidChart] = useState<any>(0)//Contador de  de palabras o caracteres encontrados

    <TextValidatorComp 
        StringToValidate={ComponentRef}
        ElementForAnswer={TextToValidate}
        placeholder={'Holder'}
        ArrayKeyWordsToCheckLang={LangNumbers.all.concat(["Alain",'yOsSEph']).concat(BlogSEOHref.Custom)}
        allowOverlapping={true}
        setInvalidChart={setInvalidChart}
        className={'TextValidator'}
        style={{backgroundColor:"whitesmoke"}}
        PopupDescr={LangLegends['txt.tooltipWarning']}
        CounterStyle={{backgroundColor:"white", padding:"1px", borderRadius:"7px", border:"1px solid gray", color:"red", fontWeight:"bold"}}
    />

---------------------------------------------------------*/
//Libraries
import React from 'react'
//Functions
import TextValidationFunc, { LangNumbers, BlogSEOHref } from '@/complements/components/TextValidatorComp/TextValidationFunc'//Validador de textos especificados en la captura textual del usuario
//Styles
import styles from './TextValidatorComp.module.css'

interface ITextValidator{ //Props
    StringToValidate: any|null, //Reference of textarea
    placeholder?: string|undefined, //Placeholder
    ElementForAnswer: any|null, //Reference of label for counter of words or characters to find
    ArrayKeyWordsToCheckLang: string[]|null, //Array of strings to validate
    allowOverlapping: boolean|null, //Allow overlaping
    setInvalidChart: any|null, //share state for counter of findings
    style?: React.CSSProperties|undefined, //Inline styles
    className?: string | undefined, //Classes to style component as global style or module style
    PopupDescr?: string|undefined, //Description for tooltip popup when user hover over
    CounterStyle?: React.CSSProperties|undefined, //Inline styles
}

export default function TextValidatorFunComp(props:ITextValidator){ //Text validation component
    return ( //Component
        <div className={styles.Validator}>
            <textarea //Textarea to validate strings
                ref={props.StringToValidate} //Reference of textarea
                className={(props.className, styles.TextToValidate)} //Classes to style component as global style or module style
                style={props.style} //Inline styles
                placeholder={props.placeholder} //Placeholder
                onChange={() => { //Event to validate when user type
                    TextValidationFunc( //Function to validate strings when user type
                        props.StringToValidate, //String to validate
                        props.ElementForAnswer, //Reference of label for counter of words or characters found
                        props.ArrayKeyWordsToCheckLang, //Array of strings to validate
                        props.allowOverlapping, //Allow overlaping
                        props.setInvalidChart //share state for counter of findings
                    )}}
                required title={props.PopupDescr} //Title for tooltip popup when user hover over
            />
            <span 
                ref={props.ElementForAnswer}
                title={props.PopupDescr}
                style={props.CounterStyle}
            >
            </span> {/*Label for counter of words or characters found*/}
        </div>
    )
}