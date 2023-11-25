import React , { useRef } from 'react';
import Image from 'next/image';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
//Styles
import styles from './AlertComp.module.css'

interface ILoading{
    icon?: string,
    title?: string
    position?: 'top-right'| 'top-center' | 'top-left' | 'bottom-right' | 'bottom-center' | 'bottom-left'
    autoClose?: number | false
    closeButton?: boolean
    hideProgressBar?: boolean
    pauseOnHover?: boolean
    pauseOnFocusLoss?: boolean
    closeOnClick?: boolean
    newestOnTop?: boolean
    draggable?: boolean
    draggablePercent?: 35 | 70 | 100
    draggableDirection?: 'x' | 'y'
    containerId?: any
    limit?: number
    containerClassName?: any
    containerStyles?: any
    progressClassName?: any
    progressStyles?: any
    toastClassName?: any
    bodyClassName?: any
    rtl?: boolean
    transition?: any
    delay?: number
}

function AlertComp(props:ILoading){

    toast(
        <div className={styles.Icons}>
            {props.icon && <Image className={styles.Rotate} src={props.icon} width={35} height={35} alt={(props.title?props.title:"")}/>}
            <label>{props.title}</label>
        </div>
    , { delay: props.delay && props.delay } )

    return(
        <ToastContainer
            position={props.position}                       // top-right, top-center, top-left, bottom-right, bottom-center, bottom-left
            autoClose={props.autoClose}                     // number or false to be closed manually
            closeButton={props.closeButton}                 // Button Component or false to hide the button
            hideProgressBar={props.hideProgressBar}         // false	Display or not the progress bar below the toast(remaining time)
            pauseOnHover={props.pauseOnHover}               // true	Keep the timer running or not on hover
            pauseOnFocusLoss={props.pauseOnFocusLoss}       // true	Pause the timer when the window loses focus
            closeOnClick={props.closeOnClick}               // true	Dismiss toast on click
            newestOnTop={props.newestOnTop}                 // false	Display newest toast on top
            draggable={props.draggable}                     // true	Allow toast to be draggable
            draggablePercent={props.draggablePercent}       // Percentage of the toast's width it takes for a drag to dismiss a toast(value between 0 and 100)
            draggableDirection={props.draggableDirection}   // "y" |"x" Specify the drag direction axis.
            containerId={props.containerId}                 // numberID to identify the ToastContainer when working with multiple container. Also used to set the id attribute
            limit={props.limit}                             // Limit of toast displayed on screen simultaneously
            theme={'dark'}                                  // light, dark, colored
            progressClassName={styles.ProgressBar}          // Optional classes to the progress bar
            toastClassName={styles.AlertMsg}                // Optional classes to the toast
            bodyClassName={styles.Alert}                    // Optional classes to the toast body
            rtl={false}              	                    // false	Support right to left content
            className={props.containerClassName}            // Optional classes
            style={props.containerStyles}                   // Optional inline style
            transition={props.transition}                   // A react-transition-group/Transition component slide, bounce, zoom, flip
            progressStyle={undefined}                       // Optional inline style to the progress bar
        />
    )
}

export default React.memo(AlertComp)