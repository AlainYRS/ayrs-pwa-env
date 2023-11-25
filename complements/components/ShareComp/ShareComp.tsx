import {
    EmailShareButton,FacebookShareButton,HatenaShareButton,
    InstapaperShareButton,LineShareButton,LinkedinShareButton,
    LivejournalShareButton,MailruShareButton,OKShareButton,
    PinterestShareButton,PocketShareButton,RedditShareButton,
    TelegramShareButton,TumblrShareButton,TwitterShareButton,
    ViberShareButton,VKShareButton,WhatsappShareButton,
    WorkplaceShareButton} from "react-share";
  import {
    FacebookShareCount,HatenaShareCount,OKShareCount,
    PinterestShareCount,RedditShareCount,TumblrShareCount,
    VKShareCount} from "react-share";
  import {
    EmailIcon,FacebookIcon,FacebookMessengerIcon,
    HatenaIcon,InstapaperIcon,LineIcon,
    LinkedinIcon,LivejournalIcon,MailruIcon,
    OKIcon,PinterestIcon,PocketIcon,
    RedditIcon,TelegramIcon,TumblrIcon,
    TwitterIcon,ViberIcon,VKIcon,
    WeiboIcon,WhatsappIcon,WorkplaceIcon,
  } from "react-share";

  interface ISocMed{
    IconSize: number,
    styles?: any,
    email?: {subject:string, body?:string, url:string, disabled?: boolean },
    facebook?: {quote?:string, hashtag?:string, url:string, disabled?: boolean },
    linkedin?: {title?:string, summary?:string, source?:string, url:string, disabled?: boolean },
    pinterest?: {media:string, description?:string, url:string, disabled?: boolean },
    reddit?: {title?:string, url:string, disabled?: boolean },
    telegram?: {title?:string, url:string, disabled?: boolean },
    twitter?: {title?:string, via?:string, hashtags?:[], related?:[], url:string, disabled?: boolean },
    whatsapp?: {title?:string, url:string, disabled?: boolean },
  }
  export default function ShareComp(props:ISocMed){

    return (
        <>
            {props.email &&
                <EmailShareButton
                    style={props.styles}
                    subject={props.email.subject}
                    url={props.email.url}
                    >
                    <EmailIcon size={props.IconSize} round={true}>Email</EmailIcon>
                </EmailShareButton>}
            {props.facebook &&
                <FacebookShareButton
                    style={props.styles}
                    title='Te comparto este ejemplo'
                    url={props.facebook.url}>
                    <FacebookIcon size={props.IconSize} round={true}>Facebook</FacebookIcon>
                </FacebookShareButton>
            }
            {props.linkedin &&
                <LinkedinShareButton
                    style={props.styles}
                    title='Te comparto este ejemplo'
                    url={props.linkedin.url}>
                    <LinkedinIcon size={props.IconSize} round={true}>LinkedIn</LinkedinIcon>
                </LinkedinShareButton>
            }
            {props.pinterest &&
                <PinterestShareButton
                    style={props.styles}
                    title='Te comparto este ejemplo'
                    media='https://www.pinterest.ca/pin/349451252336768469/'
                    url={props.pinterest.url}>
                    <PinterestIcon size={props.IconSize} round={true}>Pinterest</PinterestIcon>
                </PinterestShareButton>
            }
            {props.reddit &&
                <RedditShareButton
                    style={props.styles}
                    title='Te comparto este ejemplo'
                    url={props.reddit.url}>
                    <RedditIcon size={props.IconSize} round={true}>Reddit</RedditIcon>
                </RedditShareButton>
            }
            {props.telegram &&
                <TelegramShareButton
                    style={props.styles}
                    title='Te comparto este ejemplo'
                    url={props.telegram.url}>
                    <TelegramIcon size={props.IconSize} round={true}>Telegram</TelegramIcon>
                </TelegramShareButton>
            }
            {props.twitter && 
                <TwitterShareButton
                    style={props.styles}
                    title='Te comparto este ejemplo'
                    url={props.twitter.url}>
                    <TwitterIcon size={props.IconSize} round={true}>Twitter</TwitterIcon>
                </TwitterShareButton>
            }
            {props.whatsapp &&
                <WhatsappShareButton
                    style={props.styles}
                    title='Te comparto este ejemplo'
                    url={props.whatsapp.url}>
                    <WhatsappIcon size={props.IconSize} round={true}>Whatsapp</WhatsappIcon>
                </WhatsappShareButton>
            }
        </>
    )
  }