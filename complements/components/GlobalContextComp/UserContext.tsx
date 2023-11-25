//Libraries
import React, { useState, useEffect } from 'react' //React library
import { useRouter } from 'next/router' //Library to manage the routes
import { IntlProvider } from 'react-intl' //Library to manage the translations
//Services
import { Firebase, FirebaseStorage, FirebaseAuthentication, FirebaseFirestore, FirebaseFunctions } from '../../../public/services/firebase' //Firebase suite

//Global Context
import CreateIDFunc from '../CommonFunctions/CreateIDFunc'
import GlobalContext from '@/complements/components/GlobalContextComp/GlobalContextComp' //Global context component
import { UserEnvironment } from './UserEnvironment' //User environment
//Components
import AlertComp from '@/complements/components/AlertComp/AlertComp'
//Files
import en from '@/complements/locales/en.json' //Json files with the translations for Spanish
import es from '@/complements/locales/es.json' //Json files with the translations for English
// import fr from '@/complements/locales/fr.json' //Json files with the translations for French
//styles

const UserContext = (props: any) => {
    const [UsrCookie,setUsrCookie] = useState(null) //cookie flag to save use personal information and preferences or only navigation details
    const [LangLegends, setLangLegends] = useState({}) //Manage temporarly the Json translations with the use chosen language.
    const [Environment, setEnvironment] = useState(() => UserEnvironment) //Manage the user environment based on UserEnvironment.tsx
    const [Locale, setLocale] = useState(() => 'en') //Manage the user locale parameter chosen by user wich trigers the json traslations to be implemented through LatLegens state.
    const [HideHeaderFooterMenuBottom, setHideHeaderFooterMenuBottom] = useState<boolean|null>(null)//Ocultar Heater y footer
    
    const { locale, locales, push } = useRouter() //Deconstructing the useRouter hook to get the locale and locales parameters and the push function to change the locale parameter.
    
    useEffect(() => {
        if (typeof window !== 'undefined') {
          let Init = window.pageYOffset
          window.onscroll = function (){
              let Last = window.pageYOffset
              if(Init >= Last){
                setHideHeaderFooterMenuBottom(false)
            } else {
                setHideHeaderFooterMenuBottom(true)
            }
            Init = Last
          }
        }
    })

    useEffect(() => { //This useEffect sets the locale parameter to the user choice and adds the respective sufix to url path then the Locale state is updated changes.
        push('/', undefined, {locale:Locale}); //Append the respective locale sufix to the url path.
    },[Locale]) //This useEffect is triggered when the Locale state changes.

    useEffect(()=>{ //This useEffect sets the LangLegends state to the respective json file based on the Locale state and trigers the Locale state.
        switch (Locale) { //This switch sets the LangLegends state to the respective json file based on the Locale state.
            case 'es': setLangLegends(es); setLocale('es'); break; //This case sets the LangLegends state to the spanish json file and trigers the Locale state.
            case 'en': setLangLegends(en); setLocale('en'); break; //This case sets the LangLegends state to the english json file and trigers the Locale state.
            // case 'fr': setLangLegends(fr); setLocale('fr'); break; //This case sets the LangLegends state to the french json file and trigers the Locale state.
            default: setLangLegends(en); //This case sets the LangLegends state to the english json file and trigers the Locale state in case there is none previos language applicable.
        }        
    },[Locale]) //This useEffect is triggered when the Locale state changes.
    
    return (
        <GlobalContext.Provider //This provider is used to share the states and functions between the children components.
            value={{ //This value is the object that contains the states and functions to be shared between the children components.
                setEnvironment, //This function is used to set the Environment state.
                setLocale, //This function is used to set the Locale state.
                UsrCookie, //This state has the user Cookie parameter apllicable.
                setUsrCookie, //This function is used to set the UsrCookie state.
                LangLegends, //This state has the user language legends based on user preferences.
                setLangLegends, //This function is used to set the LangLegends state.
                HideHeaderFooterMenuBottom, //This function shows and hides the Navigation menus and footer when scroll up to bottom
                AlertComp, //This function enables the capability to display alerts on demand
                CreateIDFunc, //This function creates an ID for the user in order to create a database
            }}
        >
            <IntlProvider locale={Locale} messages={LangLegends}> {/*This IntlProvider is used to implement the translations based on the user preferences.*/}
                {props.children} {/*This props.children is used to render the children components.*/}
            </IntlProvider>
        </GlobalContext.Provider>
    )
}

export default React.memo(UserContext); //This export is used to export the UserContext component.