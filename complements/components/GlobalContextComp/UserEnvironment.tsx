export const UserEnvironment = { //This object is used to manage the user environment.
    GoogleApiKey: process.env.NEXT_PUBLIC_COMPONENT_GoogleMap_geolocation_apiKey, //This parameter is used to manage the Google Maps API key.
    MapBoxKey: process.env.NEXT_PUBLIC_COMPONENT_MapBox_token_apiKey, //This parameter is used to manage the MapBox API key.
    DefaultID:null, //This parameter is used to manage the default user ID.
    ClientID:null,  //This parameter is used to manage the user ID.
    FirstName:null, //This parameter is used to manage the user first name.
    MidName:null, //This parameter is used to manage the user middle name.
    LastName:null, //This parameter is used to manage the user last name.
    SignInDate:[], //This parameter is used to manage the user sign in date.
    Status:null, //This parameter is used to manage the user status.
    GLat:null, //This parameter is used to manage the user latitude.
    GLng:null, //This parameter is used to manage the user longitude.
    Email:null, //This parameter is used to manage the user email.
    Phone:null, //This parameter is used to manage the user phone.
    Website:null, //This parameter is used to manage the user website.
    Chat:[ //This parameter is used to manage the user chats.
        {Platform:null,Id:null} //This parameter is used to manage the user chat platform and ID.
    ],
    SocialMedia: [ //This parameter is used to manage the user social media.
        {Platform:null,Id:null} //This parameter is used to manage the user social media platform and ID.
    ],
    Navigator:null, //This parameter is used to manage the user navigator.
    DarkMode: false, //This parameter is used to manage the user dark mode.
    Lang1:null, //This parameter is used to manage the user language 1.
    Lang2:null, //This parameter is used to manage the user language 2.
    Currency:null, //This parameter is used to manage the user currency.
    Authenticated: false, //This parameter is used to manage the user authentication.
    StartNavTime: null, //This parameter is used to manage the user start navigation time.
    Cookies:null, //This parameter is used to manage the user cookies.
    CookiesSaved:null, //This parameter is used to manage the user cookies saved.
    Name:null, //This parameter is used to manage the user company name.
    Brand:null, //This parameter is used to manage the user brand.
    Logo:null, //This parameter is used to manage the user logo.
    Slogan:null, //This parameter is used to manage the user slogan.
    Member:null, //This parameter is used to manage the user type of membership.
    Membership:null, //This parameter is used to manage the user membership status.
    Alerts:[], //This parameter is used to manage the user alerts.
    Favorites:[], //This parameter is used to manage the user favorites.
}