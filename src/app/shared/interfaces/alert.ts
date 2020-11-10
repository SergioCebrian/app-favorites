export interface IAlert {
    cssClass: string,
    header: string,
    message: string,
    buttons: [
        { 
            text: string, 
            role: string, 
            cssClass: string,
            handler?: () => void
        }
    ]
}