export interface ILogger {
    date: {
        day: {
            name: string,
            num: number,
            today: number
        },
        hours: string | number,
        minutes: string | number,
        seconds: string | number,
        month: {
            name: string,
            num: number
        },
        year: number,
        time: {
            end: number,
            start: number
        },
        full: Date,
        formatted: {
            title: string,
            url: string
        }
    },
    url: {
        pathname: string,
        params: string | null
    },
    user: {
        name: string | undefined | null,
        message: string
    }
}